import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const partnerApplicationSchema = z.object({
  contactName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(50).default(''),
  businessName: z.string().trim().min(2).max(180),
  city: z.string().trim().min(2).max(90),
  website: z.string().trim().url().max(500).refine((value) => {
    try { return new URL(value).protocol === 'https:'; } catch { return false; }
  }, 'Use an HTTPS business website'),
  publishedCapacity: z.number().int().min(2).max(100000).nullable(),
  proposal: z.string().trim().max(2000).default(''),
  proposedPromoCode: z.string().trim().max(60).default(''),
  notes: z.string().trim().max(2000).default(''),
  consentContact: z.literal(true),
  companyAddress2: z.string().max(200).default(''),
});

export const submitGroupEventPartnerApplication = createServerFn({ method: 'POST' })
  .inputValidator(partnerApplicationSchema)
  .handler(async ({ data }) => {
    // Quietly absorb spambots rather than tell them the honeypot was hit.
    if (data.companyAddress2.trim()) return { ok: true };
    const { saveGroupEventPartnerApplication } = await import('@/data/corporate-events.server');
    await saveGroupEventPartnerApplication({
      contact_name: data.contactName,
      email: data.email.toLowerCase(),
      phone: data.phone || null,
      business_name: data.businessName,
      city: data.city,
      website: data.website,
      published_capacity: data.publishedCapacity,
      proposal: data.proposal || null,
      proposed_promo_code: data.proposedPromoCode || null,
      notes: data.notes || null,
      consent_contact: true,
    });
    return { ok: true };
  });
