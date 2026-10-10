import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

export const getNetworkApplications = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: z.string().min(20).max(200) }))
  .handler(async ({ data }) => {
    const { listNetworkApplications } = await import('@/data/network-review.server');
    return listNetworkApplications(data.accessKey);
  });

export const reviewNetworkApplication = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: z.string().min(20).max(200), id: z.string().uuid(), action: z.enum(['approve','reject','reopen']) }))
  .handler(async ({ data }) => {
    const { setNetworkApplicationReview } = await import('@/data/network-review.server');
    return setNetworkApplicationReview(data.accessKey, data.id, data.action);
  });
