import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const accessKeySchema = z.string().min(20).max(200);
const statusSchema = z.enum(['new', 'reviewing', 'contacted', 'closed']);

export const getFishingEditorialReviewDashboard = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: accessKeySchema }))
  .handler(async ({ data }) => {
    const { loadFishingEditorialReviewDashboard } = await import('./editorial-review.server');
    return loadFishingEditorialReviewDashboard(data.accessKey);
  });

export const setFishingEditorialSubmissionStatus = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: accessKeySchema, submissionId: z.string().uuid(), status: statusSchema }))
  .handler(async ({ data }) => {
    const { updateFishingEditorialSubmissionStatus } = await import('./editorial-review.server');
    return updateFishingEditorialSubmissionStatus(data.accessKey, data.submissionId, data.status);
  });
