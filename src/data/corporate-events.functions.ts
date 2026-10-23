import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { corporateEventCategories, corporateEventProviders } from '@/data/corporate-events';

const categoryValues = corporateEventCategories.map((item) => item.value);
const requestSchema = z.object({
  contactName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  company: z.string().trim().min(2).max(180),
  phone: z.string().trim().max(50).default(''),
  city: z.string().trim().min(2).max(90),
  groupSize: z.number().int().min(2).max(3000),
  category: z.string().refine((value) => categoryValues.includes(value as never), 'Invalid category'),
  eventDate: z.union([z.literal(''), z.string().regex(/^\d{4}-\d{2}-\d{2}$/)]),
  budgetPerPerson: z.number().int().min(1).max(10000).nullable(),
  providerSlugs: z.array(z.string().max(100)).max(5),
  notes: z.string().trim().max(3000).default(''),
  consentContact: z.literal(true),
  companyAddress2: z.string().max(200).default(''),
});

export const submitGroupEventRequest = createServerFn({ method: 'POST' })
  .inputValidator(requestSchema)
  .handler(async ({ data }) => {
    if (data.companyAddress2.trim()) return { ok: true };
    const validSlugs = new Set(corporateEventProviders.map((provider) => provider.slug));
    const allowedSlugs = [...new Set(data.providerSlugs)].filter((slug) => validSlugs.has(slug));
    if (allowedSlugs.length !== data.providerSlugs.length) throw new Error('Please refresh the page and select venues again.');
    if (data.eventDate && Number.isNaN(Date.parse(data.eventDate + 'T12:00:00Z'))) throw new Error('Please use a valid event date.');

    const { saveGroupEventRequest } = await import('@/data/corporate-events.server');
    await saveGroupEventRequest({
      contact_name: data.contactName,
      email: data.email.toLowerCase(),
      company: data.company,
      phone: data.phone || null,
      city: data.city,
      group_size: data.groupSize,
      event_category: data.category,
      event_date: data.eventDate || null,
      budget_per_person: data.budgetPerPerson,
      provider_slugs: allowedSlugs,
      notes: data.notes || null,
      consent_contact: true,
      source_path: '/corporate-events',
    });
    return { ok: true };
  });
