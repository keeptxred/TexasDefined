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

export const getNetworkRevisionQueue = createServerFn({ method:'POST' })
  .inputValidator(z.object({accessKey:z.string().min(20).max(200)}))
  .handler(async ({data})=>{const {listNetworkRevisions}=await import('@/data/network-review.server');return listNetworkRevisions(data.accessKey)});
export const reviewFeaturedRevision = createServerFn({method:'POST'})
  .inputValidator(z.object({accessKey:z.string().min(20).max(200),id:z.string().uuid(),decision:z.enum(['approve','reject'])}))
  .handler(async ({data})=>{const {reviewNetworkRevision}=await import('@/data/network-review.server');return reviewNetworkRevision(data.accessKey,data.id,data.decision)});

export const publishApprovedNetworkApplication = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: z.string().min(20).max(200), id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const { publishReviewedNetworkApplication } = await import('@/data/network-review.server');
    return publishReviewedNetworkApplication(data.accessKey, data.id);
  });

export const publishNetworkListing = createServerFn({method:'POST'})
 .inputValidator(z.object({accessKey:z.string().min(20).max(200),id:z.string().uuid()}))
 .handler(async ({data})=>{const {publishApprovedNetworkListing}=await import('@/data/network-review.server');return publishApprovedNetworkListing(data.accessKey,data.id)});

export const unpublishReviewedNetworkListing = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: z.string().min(20).max(200), id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const { unpublishNetworkListing } = await import('@/data/network-review.server');
    return unpublishNetworkListing(data.accessKey, data.id);
  });
