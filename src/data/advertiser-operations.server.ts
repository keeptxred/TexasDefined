import { assertSportsPartnerAccess } from '@/data/sports-partner-leads.server';
import type {
  AdvertiserAgreementStatus,
  AdvertiserDisclosureStatus,
  AdvertiserInvoiceStatus,
  AdvertiserOperationsDashboard,
  AdvertiserOperationsRecord,
  AdvertiserPaymentStatus,
} from '@/data/advertiser-operations.types';
import { supabaseAdmin } from '@/integrations/supabase/client.server';

const DASHBOARD_LIMIT = 200;

export type AdvertiserOperationalUpdate = {
  paymentStatus: AdvertiserPaymentStatus;
  invoiceStatus: AdvertiserInvoiceStatus;
  campaignStartDate: string | null;
  campaignEndDate: string | null;
  destinationUrl: string | null;
  assets: string[];
  placementLocations: string[];
  disclosureStatus: AdvertiserDisclosureStatus;
  internalNotes: string | null;
  stripeCustomerId: string | null;
  stripeInvoiceId: string | null;
  stripeSubscriptionId: string | null;
};

function stringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string').map((item) => item.trim()).filter(Boolean).slice(0, 30);
}

function nullableString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function toRecord(row: Record<string, unknown>): AdvertiserOperationsRecord {
  return {
    id: String(row.id),
    createdAt: String(row.created_at),
    status: String(row.status) as AdvertiserAgreementStatus,
    agreementVersion: String(row.agreement_version),
    agreementSnapshotSha256: String(row.agreement_snapshot_sha256),
    tier: String(row.tier) as AdvertiserOperationsRecord['tier'],
    billingCycle: String(row.billing_cycle) as AdvertiserOperationsRecord['billingCycle'],
    publishedPriceCents: typeof row.published_price_cents === 'number' ? row.published_price_cents : null,
    legalName: String(row.legal_name),
    businessName: String(row.business_name),
    signerName: String(row.signer_name),
    signerTitle: String(row.signer_title),
    signerEmail: String(row.signer_email),
    billingEmail: String(row.billing_email),
    billingAddress: String(row.billing_address),
    companyWebsite: nullableString(row.company_website),
    requestedStart: nullableString(row.requested_start),
    campaignNotes: nullableString(row.campaign_notes),
    signerAcceptedAt: String(row.signer_accepted_at),
    publisherAcceptedAt: nullableString(row.publisher_accepted_at),
    publisherAcceptedBy: nullableString(row.publisher_accepted_by),
    stripeCustomerId: nullableString(row.stripe_customer_id),
    stripeInvoiceId: nullableString(row.stripe_invoice_id),
    stripeSubscriptionId: nullableString(row.stripe_subscription_id),
    paymentStatus: String(row.payment_status) as AdvertiserPaymentStatus,
    invoiceStatus: String(row.invoice_status) as AdvertiserInvoiceStatus,
    campaignStartDate: nullableString(row.campaign_start_date),
    campaignEndDate: nullableString(row.campaign_end_date),
    destinationUrl: nullableString(row.destination_url),
    assets: stringArray(row.assets),
    placementLocations: stringArray(row.placement_locations),
    disclosureStatus: String(row.disclosure_status) as AdvertiserDisclosureStatus,
    internalNotes: nullableString(row.internal_notes),
  };
}

export async function loadAdvertiserOperationsDashboard(accessKey: string): Promise<AdvertiserOperationsDashboard> {
  await assertSportsPartnerAccess(accessKey);
  const client = supabaseAdmin as any;
  const { data, error } = await client
    .from('texasdefined_advertiser_agreements')
    .select('id,created_at,status,agreement_version,agreement_snapshot_sha256,tier,billing_cycle,published_price_cents,legal_name,business_name,signer_name,signer_title,signer_email,billing_email,billing_address,company_website,requested_start,campaign_notes,signer_accepted_at,publisher_accepted_at,publisher_accepted_by,stripe_customer_id,stripe_invoice_id,stripe_subscription_id,payment_status,invoice_status,campaign_start_date,campaign_end_date,destination_url,assets,placement_locations,disclosure_status,internal_notes')
    .order('created_at', { ascending: false })
    .limit(DASHBOARD_LIMIT + 1);

  if (error) throw new Error(`Advertiser agreements could not be loaded: ${error.message}`);
  const rows = Array.isArray(data) ? data : [];
  const truncated = rows.length > DASHBOARD_LIMIT;
  return {
    generatedAt: new Date().toISOString(),
    limit: DASHBOARD_LIMIT,
    truncated,
    agreements: rows.slice(0, DASHBOARD_LIMIT).map((row: Record<string, unknown>) => toRecord(row)),
  };
}

export async function setAdvertiserPublisherDecision(
  accessKey: string,
  agreementId: string,
  decision: 'accepted' | 'declined' | 'void',
  publisherName: string | null,
) {
  await assertSportsPartnerAccess(accessKey);
  const client = supabaseAdmin as any;
  const patch: Record<string, unknown> = { status: decision };

  if (decision === 'accepted') {
    if (!publisherName?.trim()) throw new Error('Publisher name is required to accept an agreement.');
    patch.publisher_accepted_at = new Date().toISOString();
    patch.publisher_accepted_by = publisherName.trim();
  }

  let query = client.from('texasdefined_advertiser_agreements').update(patch).eq('id', agreementId);
  if (decision === 'accepted' || decision === 'declined') query = query.eq('status', 'pending_publisher_acceptance');
  const { data, error } = await query.select('id,status,publisher_accepted_at,publisher_accepted_by').maybeSingle();

  if (error) throw new Error(`Advertiser agreement decision could not be saved: ${error.message}`);
  if (!data?.id) throw new Error('Agreement was not found or is no longer eligible for that decision.');
  return {
    id: String(data.id),
    status: String(data.status) as AdvertiserAgreementStatus,
    publisherAcceptedAt: nullableString(data.publisher_accepted_at),
    publisherAcceptedBy: nullableString(data.publisher_accepted_by),
  };
}

function normalizeDestinationUrl(value: string | null) {
  if (!value?.trim()) return null;
  const parsed = new URL(value.trim());
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') throw new Error('Destination URL must use http or https.');
  return parsed.toString();
}

export async function updateAdvertiserOperationalState(
  accessKey: string,
  agreementId: string,
  value: AdvertiserOperationalUpdate,
) {
  await assertSportsPartnerAccess(accessKey);
  if (value.campaignStartDate && value.campaignEndDate && value.campaignEndDate < value.campaignStartDate) {
    throw new Error('Campaign end date cannot be before campaign start date.');
  }

  const client = supabaseAdmin as any;
  const { data, error } = await client
    .from('texasdefined_advertiser_agreements')
    .update({
      payment_status: value.paymentStatus,
      invoice_status: value.invoiceStatus,
      campaign_start_date: value.campaignStartDate,
      campaign_end_date: value.campaignEndDate,
      destination_url: normalizeDestinationUrl(value.destinationUrl),
      assets: value.assets,
      placement_locations: value.placementLocations,
      disclosure_status: value.disclosureStatus,
      internal_notes: value.internalNotes,
      stripe_customer_id: value.stripeCustomerId,
      stripe_invoice_id: value.stripeInvoiceId,
      stripe_subscription_id: value.stripeSubscriptionId,
    })
    .eq('id', agreementId)
    .select('id,payment_status,invoice_status,disclosure_status')
    .maybeSingle();

  if (error) throw new Error(`Advertiser operational state could not be saved: ${error.message}`);
  if (!data?.id) throw new Error('Advertiser agreement was not found.');
  return {
    id: String(data.id),
    paymentStatus: String(data.payment_status) as AdvertiserPaymentStatus,
    invoiceStatus: String(data.invoice_status) as AdvertiserInvoiceStatus,
    disclosureStatus: String(data.disclosure_status) as AdvertiserDisclosureStatus,
  };
}
