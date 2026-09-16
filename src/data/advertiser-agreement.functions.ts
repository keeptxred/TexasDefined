import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

import {
  ADVERTISING_AGREEMENT_VERSION,
  advertiserAgreementSnapshot,
  getAdvertiserTier,
  type AdvertiserBillingCycle,
  type AdvertiserTierId,
} from '@/data/advertising-program';
import { saveAdvertiserAgreement } from '@/data/advertiser-agreement.server';

const advertiserAgreementSchema = z.object({
  tier: z.enum(['local', 'growth', 'premier', 'custom']),
  billingCycle: z.enum(['monthly', 'annual']),
  legalName: z.string().trim().min(2).max(180),
  signerName: z.string().trim().min(2).max(120),
  signerTitle: z.string().trim().min(2).max(120),
  signerEmail: z.string().trim().email().max(320),
  billingAddress: z.string().trim().min(10).max(500),
  companyWebsite: z.string().trim().max(500),
  requestedStart: z.string().trim().max(40),
  campaignNotes: z.string().trim().max(2500),
  typedSignature: z.string().trim().min(2).max(120),
  authorityConfirmed: z.literal(true),
  esignConsent: z.literal(true),
  agreementVersion: z.literal(ADVERTISING_AGREEMENT_VERSION),
  sourcePath: z.string().trim().max(500).default('/partner-with-us'),
  addressLine2: z.string().max(200).default(''),
});

export const submitAdvertiserAgreement = createServerFn({ method: 'POST' })
  .inputValidator(advertiserAgreementSchema)
  .handler(async ({ data }) => {
    // Quietly accept honeypot submissions so bots do not learn the filter.
    if (data.addressLine2.trim()) return { ok: true };

    if (data.typedSignature.localeCompare(data.signerName, undefined, { sensitivity: 'accent' }) !== 0) {
      throw new Error('Typed signature must match the signer name.');
    }

    let companyWebsite: string | null = null;
    if (data.companyWebsite) {
      const parsed = new URL(data.companyWebsite);
      if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') throw new Error('Website must use http or https.');
      companyWebsite = parsed.toString();
    }

    const tierId = data.tier as AdvertiserTierId;
    const billingCycle = data.billingCycle as AdvertiserBillingCycle;
    const tier = getAdvertiserTier(tierId);
    const dollars = billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice;

    await saveAdvertiserAgreement({
      agreement_version: ADVERTISING_AGREEMENT_VERSION,
      agreement_snapshot: advertiserAgreementSnapshot(tierId, billingCycle),
      tier: tierId,
      billing_cycle: billingCycle,
      published_price_cents: dollars == null ? null : dollars * 100,
      legal_name: data.legalName,
      signer_name: data.signerName,
      signer_title: data.signerTitle,
      signer_email: data.signerEmail.toLowerCase(),
      billing_address: data.billingAddress,
      company_website: companyWebsite,
      requested_start: data.requestedStart || null,
      campaign_notes: data.campaignNotes || null,
      typed_signature: data.typedSignature,
      authority_confirmed: data.authorityConfirmed,
      esign_consent: data.esignConsent,
      source_path: data.sourcePath || '/partner-with-us',
    });

    return { ok: true, requiresPublisherAcceptance: true };
  });
