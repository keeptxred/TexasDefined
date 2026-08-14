import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

export const promoteSportsPartnerLeadToSponsor = createServerFn({ method: 'POST' })
  .inputValidator(z.object({
    accessKey: z.string().min(20).max(200),
    leadId: z.string().uuid(),
  }))
  .handler(async ({ data }) => {
    const { promoteSportsPartnerLead } = await import('@/data/sports-partner-promotion.server');
    return promoteSportsPartnerLead(data.accessKey, data.leadId);
  });
