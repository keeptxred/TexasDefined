import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

// Restricted operator action; no browser-supplied contact data or recipient.
export const prepareCorporateEventQuoteDraft = createServerFn({ method: 'POST' })
  .inputValidator(z.object({
    accessKey: z.string().min(20).max(200),
    leadId: z.string().uuid(),
    providerSlug: z.string().regex(/^[a-z0-9-]+$/).max(100),
  }))
  .handler(async ({ data }) => {
    const { prepareCorporateEventPartnerQuote } = await import('@/data/corporate-event-quote.server');
    return prepareCorporateEventPartnerQuote(data.accessKey, data.leadId, data.providerSlug);
  });
