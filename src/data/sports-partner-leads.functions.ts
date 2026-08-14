import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const accessKeySchema = z.string().min(20).max(200);
const statusSchema = z.enum(['new', 'reviewing', 'contacted', 'closed']);

export const getSportsPartnerLeadDashboard = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: accessKeySchema }))
  .handler(async ({ data }) => {
    const { loadSportsPartnerLeadDashboard } = await import('@/data/sports-partner-leads.server');
    return loadSportsPartnerLeadDashboard(data.accessKey);
  });

export const setSportsPartnerLeadStatus = createServerFn({ method: 'POST' })
  .inputValidator(z.object({
    accessKey: accessKeySchema,
    leadId: z.string().uuid(),
    status: statusSchema,
  }))
  .handler(async ({ data }) => {
    const { updateSportsPartnerLeadStatus } = await import('@/data/sports-partner-leads.server');
    return updateSportsPartnerLeadStatus(data.accessKey, data.leadId, data.status);
  });
