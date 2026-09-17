import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const accessKeySchema = z.string().min(20).max(200);
const statusSchema = z.enum([
  'new', 'reviewing', 'contacted', 'approved', 'agreement_sent', 'agreement_signed',
  'awaiting_payment', 'paid', 'assets_needed', 'scheduled', 'live', 'completed', 'declined', 'closed',
]);

export const getAdvertiserLeadDashboard = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: accessKeySchema }))
  .handler(async ({ data }) => {
    const { loadAdvertiserLeadDashboard } = await import('@/data/advertiser-leads.server');
    return loadAdvertiserLeadDashboard(data.accessKey);
  });

export const setAdvertiserLeadStatus = createServerFn({ method: 'POST' })
  .inputValidator(z.object({
    accessKey: accessKeySchema,
    leadId: z.string().uuid(),
    status: statusSchema,
  }))
  .handler(async ({ data }) => {
    const { updateAdvertiserLeadStatus } = await import('@/data/advertiser-leads.server');
    return updateAdvertiserLeadStatus(data.accessKey, data.leadId, data.status);
  });
