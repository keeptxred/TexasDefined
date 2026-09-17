import { createHash, randomBytes } from 'node:crypto';

import {
  ADVERTISING_AGREEMENT_VERSION,
  advertiserAgreementSnapshot,
  getAdvertiserTier,
  type AdvertiserBillingCycle,
  type AdvertiserTierId,
} from '@/data/advertising-program';
import { assertSportsPartnerAccess } from '@/data/sports-partner-leads.server';
import { supabaseAdmin } from '@/integrations/supabase/client.server';

export type AdvertiserAgreementInsert = {
  agreement_version: string;
  agreement_snapshot: string;
  tier: AdvertiserTierId;
  billing_cycle: AdvertiserBillingCycle;
  published_price_cents: number | null;
  legal_name: string;
  business_name: string;
  signer_name: string;
  signer_title: string;
  signer_email: string;
  billing_email: string;
  billing_address: string;
  company_website: string | null;
  requested_start: string | null;
  campaign_notes: string | null;
  typed_signature: string;
  authority_confirmed: boolean;
  esign_consent: boolean;
  source_path: string;
};

type StoredAdvertiserAgreementInsert = AdvertiserAgreementInsert & {
  agreement_snapshot_sha256: string;
};

type InsertResult = { error: { message: string } | null };
type AdvertiserAgreementAdminClient = {
  from: (table: string) => {
    insert: (value: StoredAdvertiserAgreementInsert) => PromiseLike<InsertResult>;
  };
};

export type AdvertiserAgreementOffer = {
  legalName: string;
  businessName: string;
  contactEmail: string;
  billingEmail: string;
  billingAddress: string;
  companyWebsite: string | null;
  tier: AdvertiserTierId;
  billingCycle: AdvertiserBillingCycle;
  publishedPriceCents: number | null;
  campaignStartDate: string | null;
  campaignEndDate: string | null;
  negotiatedAdditions: string | null;
  paymentTerms: string;
  expiresAt: string;
  agreementVersion: string;
  agreementSnapshot: string;
};

export type CreateAdvertiserAgreementOfferInput = {
  inquiryId: string;
  tier: AdvertiserTierId;
  billingCycle: AdvertiserBillingCycle;
  legalName: string;
  businessName?: string;
  billingEmail?: string;
  billingAddress: string;
  companyWebsite?: string;
  campaignStartDate?: string;
  campaignEndDate?: string;
  negotiatedAdditions?: string;
  paymentTerms: string;
  customPriceCents?: number | null;
  expiresInDays?: number;
  createdBy?: string;
};

function sha256Hex(value: string) {
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

function buildOrderSnapshot(input: {
  base: string;
  legalName: string;
  businessName: string;
  tierName: string;
  billingCycle: AdvertiserBillingCycle;
  priceCents: number | null;
  campaignStartDate?: string;
  campaignEndDate?: string;
  negotiatedAdditions?: string;
  paymentTerms: string;
}) {
  const price = input.priceCents == null
    ? 'Custom quote stated in this approved order'
    : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(input.priceCents / 100);
  return [
    input.base,
    '',
    'APPROVED ORDER TERMS',
    `Advertiser legal name: ${input.legalName}`,
    `Business / trade name: ${input.businessName}`,
    `Package: ${input.tierName}`,
    `Billing: ${input.billingCycle}`,
    `Approved price: ${price}`,
    `Campaign start: ${input.campaignStartDate || 'To be scheduled after payment/assets'}`,
    `Campaign end: ${input.campaignEndDate || 'Per package term/order'}`,
    `Payment terms: ${input.paymentTerms}`,
    `Negotiated additions: ${input.negotiatedAdditions?.trim() || 'None'}`,
  ].join('\n');
}

export async function saveAdvertiserAgreement(value: AdvertiserAgreementInsert) {
  const client = supabaseAdmin as unknown as AdvertiserAgreementAdminClient;
  const agreement_snapshot_sha256 = sha256Hex(value.agreement_snapshot);
  const { error } = await client.from('texasdefined_advertiser_agreements').insert({
    ...value,
    agreement_snapshot_sha256,
  });
  if (error) throw new Error(`Advertiser agreement could not be saved: ${error.message}`);
}

export async function createAdvertiserAgreementOffer(accessKey: string, input: CreateAdvertiserAgreementOfferInput) {
  await assertSportsPartnerAccess(accessKey);
  const client = supabaseAdmin as any;
  const { data: inquiry, error: inquiryError } = await client
    .from('texasdefined_partner_inquiries')
    .select('id,email,company,website,status')
    .eq('id', input.inquiryId)
    .maybeSingle();
  if (inquiryError) throw new Error(`Advertiser inquiry could not be loaded: ${inquiryError.message}`);
  if (!inquiry?.id) throw new Error('Advertiser inquiry was not found.');
  if (inquiry.status === 'declined' || inquiry.status === 'completed' || inquiry.status === 'closed') {
    throw new Error('This advertiser inquiry is not eligible for a new agreement offer.');
  }

  const tier = getAdvertiserTier(input.tier);
  const standardDollars = input.billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice;
  const publishedPriceCents = input.tier === 'custom'
    ? (input.customPriceCents ?? null)
    : (standardDollars == null ? null : standardDollars * 100);
  const businessName = input.businessName?.trim() || String(inquiry.company);
  const billingEmail = input.billingEmail?.trim().toLowerCase() || String(inquiry.email).toLowerCase();
  const companyWebsite = input.companyWebsite?.trim() || (typeof inquiry.website === 'string' ? inquiry.website : null);
  const baseSnapshot = advertiserAgreementSnapshot(input.tier, input.billingCycle);
  const agreementSnapshot = buildOrderSnapshot({
    base: baseSnapshot,
    legalName: input.legalName.trim(),
    businessName,
    tierName: tier.name,
    billingCycle: input.billingCycle,
    priceCents: publishedPriceCents,
    campaignStartDate: input.campaignStartDate,
    campaignEndDate: input.campaignEndDate,
    negotiatedAdditions: input.negotiatedAdditions,
    paymentTerms: input.paymentTerms.trim(),
  });
  const rawToken = randomBytes(32).toString('hex');
  const tokenHash = sha256Hex(rawToken);
  const expiresInDays = Math.min(Math.max(input.expiresInDays ?? 14, 1), 60);
  const expiresAt = new Date(Date.now() + expiresInDays * 86_400_000).toISOString();

  const { error: revokeError } = await client
    .from('texasdefined_advertiser_agreement_offers')
    .update({ status: 'revoked' })
    .eq('inquiry_id', input.inquiryId)
    .eq('status', 'active');
  if (revokeError) throw new Error(`Prior agreement links could not be revoked: ${revokeError.message}`);

  const { data: offer, error: insertError } = await client
    .from('texasdefined_advertiser_agreement_offers')
    .insert({
      inquiry_id: input.inquiryId,
      token_hash: tokenHash,
      agreement_version: ADVERTISING_AGREEMENT_VERSION,
      agreement_snapshot: agreementSnapshot,
      agreement_snapshot_sha256: sha256Hex(agreementSnapshot),
      tier: input.tier,
      billing_cycle: input.billingCycle,
      published_price_cents: publishedPriceCents,
      legal_name: input.legalName.trim(),
      business_name: businessName,
      contact_email: String(inquiry.email).toLowerCase(),
      billing_email: billingEmail,
      billing_address: input.billingAddress.trim(),
      company_website: companyWebsite || null,
      campaign_start_date: input.campaignStartDate || null,
      campaign_end_date: input.campaignEndDate || null,
      negotiated_additions: input.negotiatedAdditions?.trim() || null,
      payment_terms: input.paymentTerms.trim(),
      expires_at: expiresAt,
      created_by: input.createdBy?.trim() || 'texasdefined-admin',
    })
    .select('id,expires_at')
    .single();
  if (insertError) throw new Error(`Agreement offer could not be created: ${insertError.message}`);

  const { error: statusError } = await client
    .from('texasdefined_partner_inquiries')
    .update({ status: 'agreement_sent' })
    .eq('id', input.inquiryId);
  if (statusError) throw new Error(`Advertiser workflow status could not be updated: ${statusError.message}`);

  return {
    offerId: String(offer.id),
    agreementUrl: `/partner-with-us/agreement?token=${encodeURIComponent(rawToken)}`,
    expiresAt: String(offer.expires_at),
  };
}

export async function loadAdvertiserAgreementOffer(rawToken: string): Promise<AdvertiserAgreementOffer> {
  if (!/^[a-f0-9]{64}$/i.test(rawToken)) throw new Error('Agreement link is invalid.');
  const client = supabaseAdmin as any;
  const tokenHash = sha256Hex(rawToken);
  const { data, error } = await client
    .from('texasdefined_advertiser_agreement_offers')
    .select('status,agreement_version,agreement_snapshot,tier,billing_cycle,published_price_cents,legal_name,business_name,contact_email,billing_email,billing_address,company_website,campaign_start_date,campaign_end_date,negotiated_additions,payment_terms,expires_at')
    .eq('token_hash', tokenHash)
    .maybeSingle();
  if (error) throw new Error('Agreement link could not be verified.');
  if (!data) throw new Error('Agreement link is invalid.');
  if (data.status !== 'active') throw new Error('Agreement link is no longer active.');
  if (new Date(String(data.expires_at)).getTime() <= Date.now()) {
    await client.from('texasdefined_advertiser_agreement_offers').update({ status: 'expired' }).eq('token_hash', tokenHash).eq('status', 'active');
    throw new Error('Agreement link has expired.');
  }
  if (data.agreement_version !== ADVERTISING_AGREEMENT_VERSION) {
    throw new Error('This agreement link uses an outdated agreement version. Texas Defined must issue a new link.');
  }
  return {
    legalName: String(data.legal_name),
    businessName: String(data.business_name),
    contactEmail: String(data.contact_email),
    billingEmail: String(data.billing_email),
    billingAddress: String(data.billing_address),
    companyWebsite: typeof data.company_website === 'string' ? data.company_website : null,
    tier: String(data.tier) as AdvertiserTierId,
    billingCycle: String(data.billing_cycle) as AdvertiserBillingCycle,
    publishedPriceCents: typeof data.published_price_cents === 'number' ? data.published_price_cents : null,
    campaignStartDate: typeof data.campaign_start_date === 'string' ? data.campaign_start_date : null,
    campaignEndDate: typeof data.campaign_end_date === 'string' ? data.campaign_end_date : null,
    negotiatedAdditions: typeof data.negotiated_additions === 'string' ? data.negotiated_additions : null,
    paymentTerms: String(data.payment_terms),
    expiresAt: String(data.expires_at),
    agreementVersion: String(data.agreement_version),
    agreementSnapshot: String(data.agreement_snapshot),
  };
}

export async function completeAdvertiserAgreementOffer(rawToken: string, input: {
  signerName: string;
  signerTitle: string;
  signerEmail: string;
  typedSignature: string;
  authorityConfirmed: boolean;
  esignConsent: boolean;
}) {
  if (!/^[a-f0-9]{64}$/i.test(rawToken)) throw new Error('Agreement link is invalid.');
  const client = supabaseAdmin as any;
  const { data, error } = await client.rpc('complete_texasdefined_advertiser_agreement_offer', {
    p_token_hash: sha256Hex(rawToken),
    p_signer_name: input.signerName.trim(),
    p_signer_title: input.signerTitle.trim(),
    p_signer_email: input.signerEmail.trim().toLowerCase(),
    p_typed_signature: input.typedSignature.trim(),
    p_authority_confirmed: input.authorityConfirmed,
    p_esign_consent: input.esignConsent,
  });
  if (error) throw new Error(error.message || 'Agreement acceptance could not be recorded.');
  return { agreementId: String(data) };
}
