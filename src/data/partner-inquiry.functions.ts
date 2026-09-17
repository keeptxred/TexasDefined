import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

import { savePartnerInquiry } from '@/data/partner-inquiry.server';

const partnerInquirySchema = z.object({
  contactName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  company: z.string().trim().min(2).max(180),
  phone: z.string().trim().max(80).default(''),
  website: z.string().trim().max(500),
  partnershipType: z.enum(['insurance', 'mortgage', 'real-estate', 'moving', 'travel', 'sports-travel', 'brand-retail', 'sponsorship', 'other']),
  targetTexasLocations: z.string().trim().max(1000).default(''),
  requestedTier: z.enum(['local', 'growth', 'premier', 'custom']).nullable().default(null),
  billingCycle: z.enum(['monthly', 'annual']).nullable().default(null),
  desiredStartDate: z.union([z.literal(''), z.string().regex(/^\d{4}-\d{2}-\d{2}$/)]).default(''),
  objectives: z.string().trim().min(20).max(3000),
  notes: z.string().trim().max(3000).default(''),
  sourcePath: z.union([
    z.string().trim().max(500).regex(/^\/(?:partner-with-us|sports-venues|sports-venue\/[a-z0-9-]+)$/),
    z.literal('/things-unique-to-texas/texas-brands'),
  ]).default('/partner-with-us'),
  addressLine2: z.string().max(200).default(''),
});

export const submitPartnerInquiry = createServerFn({ method: 'POST' })
  .inputValidator(partnerInquirySchema)
  .handler(async ({ data }) => {
    // Quietly accept honeypot submissions so bots do not learn the filter.
    if (data.addressLine2.trim()) return { ok: true };

    let website: string | null = null;
    if (data.website) {
      const parsed = new URL(data.website);
      if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') throw new Error('Website must use http or https.');
      website = parsed.toString();
    }

    await savePartnerInquiry({
      contact_name: data.contactName,
      email: data.email.toLowerCase(),
      company: data.company,
      phone: data.phone || null,
      website,
      partnership_type: data.partnershipType,
      target_texas_locations: data.targetTexasLocations || null,
      requested_tier: data.requestedTier,
      billing_cycle: data.billingCycle,
      desired_start_date: data.desiredStartDate || null,
      objectives: data.objectives,
      notes: data.notes || null,
      // Keep the legacy message field populated for existing internal review surfaces.
      message: data.objectives,
      source_path: data.sourcePath || '/partner-with-us',
    });

    return { ok: true };
  });
