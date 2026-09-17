import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

import { ADVERTISING_AGREEMENT_VERSION } from '@/data/advertising-program';

const agreementToken = z.string().trim().regex(/^[a-f0-9]{64}$/i, 'Agreement link is invalid.');

const advertiserAgreementAcceptanceSchema = z.object({
  token: agreementToken,
  signerName: z.string().trim().min(2).max(120),
  signerTitle: z.string().trim().min(2).max(120),
  signerEmail: z.string().trim().email().max(320),
  typedSignature: z.string().trim().min(2).max(120),
  authorityConfirmed: z.literal(true),
  esignConsent: z.literal(true),
  addressLine2: z.string().max(200).default(''),
});

const advertiserAgreementOfferSchema = z.object({
  accessKey: z.string().min(16).max(500),
  inquiryId: z.string().uuid(),
  tier: z.enum(['local', 'growth', 'premier', 'custom']),
  billingCycle: z.enum(['monthly', 'annual']),
  legalName: z.string().trim().min(2).max(180),
  businessName: z.string().trim().max(180).optional().default(''),
  billingEmail: z.union([z.literal(''), z.string().trim().email().max(320)]).optional().default(''),
  billingAddress: z.string().trim().min(10).max(500),
  companyWebsite: z.string().trim().max(500).optional().default(''),
  campaignStartDate: z.union([z.literal(''), z.string().regex(/^\d{4}-\d{2}-\d{2}$/)]).optional().default(''),
  campaignEndDate: z.union([z.literal(''), z.string().regex(/^\d{4}-\d{2}-\d{2}$/)]).optional().default(''),
  negotiatedAdditions: z.string().trim().max(5000).optional().default(''),
  paymentTerms: z.string().trim().min(2).max(1000),
  customPriceCents: z.number().int().nonnegative().nullable().optional().default(null),
  expiresInDays: z.number().int().min(1).max(60).optional().default(14),
  createdBy: z.string().trim().max(180).optional().default('texasdefined-admin'),
});

export const loadAdvertiserAgreement = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ token: agreementToken }))
  .handler(async ({ data }) => {
    const { loadAdvertiserAgreementOffer } = await import('@/data/advertiser-agreement.server');
    return loadAdvertiserAgreementOffer(data.token);
  });

export const submitAdvertiserAgreement = createServerFn({ method: 'POST' })
  .inputValidator(advertiserAgreementAcceptanceSchema)
  .handler(async ({ data }) => {
    // Quietly accept honeypot submissions so bots do not learn the filter.
    if (data.addressLine2.trim()) return { ok: true };
    if (data.typedSignature.localeCompare(data.signerName, undefined, { sensitivity: 'accent' }) !== 0) {
      throw new Error('Typed signature must match the signer name.');
    }
    const { completeAdvertiserAgreementOffer } = await import('@/data/advertiser-agreement.server');
    const result = await completeAdvertiserAgreementOffer(data.token, {
      signerName: data.signerName,
      signerTitle: data.signerTitle,
      signerEmail: data.signerEmail,
      typedSignature: data.typedSignature,
      authorityConfirmed: data.authorityConfirmed,
      esignConsent: data.esignConsent,
    });
    return { ok: true, agreementId: result.agreementId, requiresPublisherAcceptance: true };
  });

export const createAdvertiserAgreementOffer = createServerFn({ method: 'POST' })
  .inputValidator(advertiserAgreementOfferSchema)
  .handler(async ({ data }) => {
    const { createAdvertiserAgreementOffer: createOffer } = await import('@/data/advertiser-agreement.server');
    return createOffer(data.accessKey, {
      inquiryId: data.inquiryId,
      tier: data.tier,
      billingCycle: data.billingCycle,
      legalName: data.legalName,
      businessName: data.businessName,
      billingEmail: data.billingEmail,
      billingAddress: data.billingAddress,
      companyWebsite: data.companyWebsite,
      campaignStartDate: data.campaignStartDate,
      campaignEndDate: data.campaignEndDate,
      negotiatedAdditions: data.negotiatedAdditions,
      paymentTerms: data.paymentTerms,
      customPriceCents: data.customPriceCents,
      expiresInDays: data.expiresInDays,
      createdBy: data.createdBy,
    });
  });

export { ADVERTISING_AGREEMENT_VERSION };
