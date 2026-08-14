import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const accessKeySchema = z.string().min(20).max(200);
const httpsUrlSchema = z.string().url().refine((value) => value.startsWith('https://'), 'URL must use https.');
const surfacePathSchema = z.string().regex(/^\/fishing(?:\/[a-z0-9][a-z0-9/-]*)?$/);
const optionalIsoSchema = z.string().datetime().nullable().optional();
const kindSchema = z.enum(['featured-guide','lake-guide','regional-guide','species-guide','lake-sponsor','featured-marina','featured-tackle-shop','featured-lodging','featured-campground','featured-restaurant','regional-advertiser','statewide-advertiser']);

export const getActiveFishingSponsorPlacements = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ surfacePath: surfacePathSchema }))
  .handler(async ({ data }) => {
    try {
      const { loadActiveFishingSponsorPlacements } = await import('@/data/fishing-sponsorship.server');
      return await loadActiveFishingSponsorPlacements(data.surfacePath);
    } catch (error) {
      console.error('Fishing sponsor lookup failed closed; rendering editorial page without sponsorship.', error);
      return [];
    }
  });

export const trackFishingSponsorMetric = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ placementId: z.string().uuid(), event: z.enum(['impression', 'click']) }))
  .handler(async ({ data }) => {
    const { recordFishingSponsorMetric } = await import('@/data/fishing-sponsorship.server');
    return { recorded: await recordFishingSponsorMetric(data.placementId, data.event) };
  });

export const getFishingSponsorAdminDashboard = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: accessKeySchema }))
  .handler(async ({ data }) => {
    const { loadFishingSponsorAdminDashboard } = await import('@/data/fishing-sponsorship.server');
    return loadFishingSponsorAdminDashboard(data.accessKey);
  });

export const createFishingSponsorProspect = createServerFn({ method: 'POST' })
  .inputValidator(z.object({
    accessKey: accessKeySchema,
    companyName: z.string().trim().min(2).max(180),
    website: httpsUrlSchema,
    contactEmail: z.string().trim().email().max(320).nullable().optional(),
    sourceInquiryId: z.string().uuid().nullable().optional(),
    notes: z.string().trim().max(2000).nullable().optional(),
  }))
  .handler(async ({ data }) => {
    const { createFishingSponsor } = await import('@/data/fishing-sponsorship.server');
    return createFishingSponsor(data.accessKey, data);
  });

export const updateFishingSponsorStatus = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: accessKeySchema, sponsorId: z.string().uuid(), status: z.enum(['prospect','approved','inactive']) }))
  .handler(async ({ data }) => {
    const { setFishingSponsorStatus } = await import('@/data/fishing-sponsorship.server');
    return setFishingSponsorStatus(data.accessKey, data.sponsorId, data.status);
  });

export const createFishingSponsorPlacementDraft = createServerFn({ method: 'POST' })
  .inputValidator(z.object({
    accessKey: accessKeySchema,
    sponsorId: z.string().uuid(),
    surfacePath: surfacePathSchema,
    kind: kindSchema,
    headline: z.string().trim().min(2).max(120),
    body: z.string().trim().min(10).max(320),
    ctaLabel: z.string().trim().min(2).max(60),
    destinationUrl: httpsUrlSchema,
    priority: z.number().int().min(0).max(1000),
    exclusive: z.boolean(),
    monthlyPriceCents: z.number().int().min(0).nullable().optional(),
    startsAt: optionalIsoSchema,
    endsAt: optionalIsoSchema,
    renewalAt: optionalIsoSchema,
  }))
  .handler(async ({ data }) => {
    const { createFishingSponsorPlacement } = await import('@/data/fishing-sponsorship.server');
    return createFishingSponsorPlacement(data.accessKey, data);
  });

export const updateFishingSponsorPlacementStatus = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey: accessKeySchema, placementId: z.string().uuid(), status: z.enum(['draft','approved','paused','ended']) }))
  .handler(async ({ data }) => {
    const { setFishingSponsorPlacementStatus } = await import('@/data/fishing-sponsorship.server');
    return setFishingSponsorPlacementStatus(data.accessKey, data.placementId, data.status);
  });
