import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const key = z.string().min(20).max(200);
const id = z.string().uuid();
const leadStatuses = z.enum(['new', 'reviewing', 'contacted', 'closed', 'spam']);
const applicationStatuses = z.enum(['pending', 'reviewing', 'approved', 'rejected', 'spam']);
const offerStatuses = z.enum(['draft', 'approved', 'paused', 'expired']);
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const getCorporateEventOperations = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: key }))
  .handler(async ({ data }) => {
    const { loadCorporateEventOperations } = await import('@/data/corporate-events.admin.server');
    return loadCorporateEventOperations(data.accessKey);
  });

export const changeCorporateEventLeadStatus = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: key, id, status: leadStatuses }))
  .handler(async ({ data }) => {
    const { setCorporateEventLeadStatus } = await import('@/data/corporate-events.admin.server');
    return setCorporateEventLeadStatus(data.accessKey, data.id, data.status);
  });

export const changeCorporateEventApplicationStatus = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: key, id, status: applicationStatuses,
    verifiedIdentity: z.boolean().default(false), verificationNote: z.string().trim().max(500).default(''),
  }))
  .handler(async ({ data }) => {
    const { setCorporateEventApplicationStatus } = await import('@/data/corporate-events.admin.server');
    return setCorporateEventApplicationStatus(data.accessKey, data.id, data.status, data.verifiedIdentity, data.verificationNote);
  });

export const draftCorporateEventOffer = createServerFn({ method: 'POST' })
  .inputValidator(z.object({
    accessKey: key,
    applicationId: id,
    providerSlug: z.string().regex(/^[a-z0-9-]+$/).max(100),
    title: z.string().trim().min(5).max(160),
    benefit: z.string().trim().min(10).max(500),
    code: z.string().trim().max(60).nullable(),
    redemptionUrl: z.string().url().max(500),
    startsOn: isoDate,
    endsOn: isoDate,
  }).refine((data) => data.endsOn >= data.startsOn, 'End date must not precede start date'))
  .handler(async ({ data }) => {
    const { proposeCorporateEventOffer } = await import('@/data/corporate-events.admin.server');
    return proposeCorporateEventOffer(data.accessKey, {
      applicationId: data.applicationId,
      providerSlug: data.providerSlug,
      title: data.title,
      benefit: data.benefit,
      code: data.code || null,
      redemptionUrl: data.redemptionUrl,
      startsOn: data.startsOn,
      endsOn: data.endsOn,
    });
  });

export const changeCorporateEventOfferStatus = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: key, id, status: offerStatuses }))
  .handler(async ({ data }) => {
    const { setCorporateEventOfferStatus } = await import('@/data/corporate-events.admin.server');
    return setCorporateEventOfferStatus(data.accessKey, data.id, data.status);
  });
