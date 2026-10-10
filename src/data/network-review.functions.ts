import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

export const getNetworkApplications = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: z.string().min(20).max(200) }))
  .handler(async ({ data }) => {
    const { listNetworkApplications } = await import('@/data/network-review.server');
    return listNetworkApplications(data.accessKey);
  });
