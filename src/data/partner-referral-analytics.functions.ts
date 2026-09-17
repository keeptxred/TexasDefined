import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const accessKeySchema = z.string().min(20).max(200);

export const getPartnerReferralAnalyticsDashboard = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: accessKeySchema }))
  .handler(async ({ data }) => {
    const { loadPartnerReferralAnalyticsDashboard } = await import('@/data/partner-referral-analytics.server');
    return loadPartnerReferralAnalyticsDashboard(data.accessKey);
  });
