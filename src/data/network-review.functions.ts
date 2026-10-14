import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

export const getNetworkApplications = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: z.string().min(32).max(200) }))
  .handler(async ({ data }) => {
    const { listNetworkApplications } = await import('@/data/network-review.server');
    return listNetworkApplications(data.accessKey);
  });

export const reviewNetworkApplication = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: z.string().min(32).max(200), id: z.string().uuid(), action: z.enum(['approve','reject','reopen']) }))
  .handler(async ({ data }) => {
    const { setNetworkApplicationReview } = await import('@/data/network-review.server');
    return setNetworkApplicationReview(data.accessKey, data.id, data.action);
  });

export const getNetworkRevisionQueue = createServerFn({ method:'POST' })
  .inputValidator(z.object({accessKey:z.string().min(32).max(200)}))
  .handler(async ({data})=>{const {listNetworkRevisions}=await import('@/data/network-review.server');return listNetworkRevisions(data.accessKey)});
export const reviewFeaturedRevision = createServerFn({method:'POST'})
  .inputValidator(z.object({accessKey:z.string().min(32).max(200),id:z.string().uuid(),decision:z.enum(['approve','reject'])}))
  .handler(async ({data})=>{const {reviewNetworkRevision}=await import('@/data/network-review.server');return reviewNetworkRevision(data.accessKey,data.id,data.decision)});

export const publishApprovedNetworkApplication = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: z.string().min(32).max(200), id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const { publishReviewedNetworkApplication } = await import('@/data/network-review.server');
    return publishReviewedNetworkApplication(data.accessKey, data.id);
  });

export const publishNetworkListing = createServerFn({method:'POST'})
 .inputValidator(z.object({accessKey:z.string().min(32).max(200),id:z.string().uuid()}))
 .handler(async ({data})=>{const {publishApprovedNetworkListing}=await import('@/data/network-review.server');return publishApprovedNetworkListing(data.accessKey,data.id)});

export const unpublishReviewedNetworkListing = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: z.string().min(32).max(200), id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const { unpublishNetworkListing } = await import('@/data/network-review.server');
    return unpublishNetworkListing(data.accessKey, data.id);
  });

export const provisionNetworkOwner = createServerFn({method:'POST'})
 .inputValidator(z.object({
  accessKey:z.string().min(32).max(200),applicationId:z.string().uuid(),userId:z.string().uuid(),
  ownershipVerified:z.literal(true),
  verificationMethod:z.enum(['official_domain','registry_documents','verified_public_phone','in_person','other_documented']),
  evidenceReference:z.string().trim().min(20).max(500),reviewerLabel:z.string().trim().min(3).max(100)
 }))
 .handler(async ({data})=>{
  const {provisionReviewedNetworkOwner}=await import('@/data/network-review.server');
  return provisionReviewedNetworkOwner(data.accessKey,data.applicationId,data.userId,data.ownershipVerified,data.verificationMethod,data.evidenceReference,data.reviewerLabel);
 });

export const previewNetworkDraftCleanup=createServerFn({method:'POST'})
 .inputValidator(z.object({accessKey:z.string().min(32).max(200)}))
 .handler(async({data})=>{
  const {previewNetworkOrphanDrafts}=await import('@/data/network-review.server');
  return previewNetworkOrphanDrafts(data.accessKey);
 });

export const previewNetworkPublishedMediaCleanup=createServerFn({method:'POST'})
 .inputValidator(z.object({accessKey:z.string().min(32).max(200)}))
 .handler(async({data})=>{
  const {previewNetworkOrphanPublishedMedia}=await import('@/data/network-review.server');
  return previewNetworkOrphanPublishedMedia(data.accessKey);
 });

/** Sole-owner-only notification recovery; no customer-visible outbox endpoints. */
export const getNetworkNotificationRecovery=createServerFn({method:'POST'})
 .inputValidator(z.object({accessKey:z.string().min(32).max(200)}))
 .handler(async({data})=>{
  const {listNetworkNotificationRecovery}=await import('@/data/network-notification-recovery.server');
  return listNetworkNotificationRecovery(data.accessKey);
 });
export const reconcileNetworkNotification=createServerFn({method:'POST'})
 .inputValidator(z.object({
  accessKey:z.string().min(32).max(200),id:z.string().uuid(),
  resolution:z.enum(['sent_verified','not_delivered_retry','failed_verified','suppress_uncertain']),
  evidenceReference:z.string().trim().min(20).max(500),
  reviewerLabel:z.string().trim().min(3).max(100),
  verifiedProviderId:z.string().max(300).nullable().optional(),
  confirmedNoDelivery:z.boolean().optional(),
 }))
 .handler(async({data})=>{
  const {reconcileNetworkNotificationRecovery}=await import('@/data/network-notification-recovery.server');
  return reconcileNetworkNotificationRecovery(data.accessKey,data);
 });
