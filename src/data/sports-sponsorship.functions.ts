import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const surfacePathSchema = z.string().regex(/^\/(?:sports-venues|sports-venue\/[a-z0-9-]+)$/);
const accessKeySchema = z.string().min(20).max(200);
const httpsUrlSchema = z.string().url().refine((value) => value.startsWith('https://'), 'URL must use https.');
const optionalIsoSchema = z.string().datetime().nullable().optional();

export const getActiveSportsSponsorPlacement = createServerFn({ method: 'POST' })
  .validator(z.object({ surfacePath: surfacePathSchema }))
  .handler(async ({ data }) => {
    try {
      const { loadActiveSportsSponsorPlacement } = await import('@/data/sports-sponsorship.server');
      return await loadActiveSportsSponsorPlacement(data.surfacePath);
    } catch (error) {
      console.error('Sports sponsor lookup failed closed; rendering editorial page without sponsorship.', error);
      return null;
    }
  });

export const trackSportsSponsorMetric = createServerFn({ method: 'POST' })
  .validator(z.object({
    placementId: z.string().uuid(),
    event: z.enum(['impression', 'click']),
  }))
  .handler(async ({ data }) => {
    const { recordSportsSponsorMetric } = await import('@/data/sports-sponsorship.server');
    return { recorded: await recordSportsSponsorMetric(data.placementId, data.event) };
  });

export const getSportsSponsorAdminDashboard = createServerFn({ method: 'POST' })
  .validator(z.object({ accessKey: accessKeySchema }))
  .handler(async ({ data }) => {
    const { loadSportsSponsorAdminDashboard } = await import('@/data/sports-sponsorship.server');
    return loadSportsSponsorAdminDashboard(data.accessKey);
  });

export const createSportsSponsorProspect = createServerFn({ method: 'POST' })
  .validator(z.object({
    accessKey: accessKeySchema,
    companyName: z.string().trim().min(2).max(180),
    website: httpsUrlSchema,
    contactEmail: z.string().trim().email().max(320).nullable().optional(),
    sourceInquiryId: z.string().uuid().nullable().optional(),
    notes: z.string().trim().max(2000).nullable().optional(),
  }))
  .handler(async ({ data }) => {
    const { createSportsSponsor } = await import('@/data/sports-sponsorship.server');
    return createSportsSponsor(data.accessKey, data);
  });

export const updateSportsSponsorStatus = createServerFn({ method: 'POST' })
  .validator(z.object({
    accessKey: accessKeySchema,
    sponsorId: z.string().uuid(),
    status: z.enum(['prospect', 'approved', 'inactive']),
  }))
  .handler(async ({ data }) => {
    const { setSportsSponsorStatus } = await import('@/data/sports-sponsorship.server');
    return setSportsSponsorStatus(data.accessKey, data.sponsorId, data.status);
  });

const placementContentSchema = z.object({
  surfacePath: surfacePathSchema,
  headline: z.string().trim().min(2).max(120),
  body: z.string().trim().min(10).max(320),
  ctaLabel: z.string().trim().min(2).max(60),
  destinationUrl: httpsUrlSchema,
  startsAt: optionalIsoSchema,
  endsAt: optionalIsoSchema,
});

export const createSportsSponsorPlacementDraft = createServerFn({ method: 'POST' })
  .validator(placementContentSchema.extend({
    accessKey: accessKeySchema,
    sponsorId: z.string().uuid(),
  }))
  .handler(async ({ data }) => {
    const { createSportsSponsorPlacement } = await import('@/data/sports-sponsorship.server');
    return createSportsSponsorPlacement(data.accessKey, data);
  });

export const reviseSportsSponsorPlacementDraft = createServerFn({ method: 'POST' })
  .validator(placementContentSchema.extend({
    accessKey: accessKeySchema,
    placementId: z.string().uuid(),
  }))
  .handler(async ({ data }) => {
    const { reviseSportsSponsorPlacement } = await import('@/data/sports-sponsorship.server');
    return reviseSportsSponsorPlacement(data.accessKey, data.placementId, data);
  });

export const updateSportsSponsorPlacementStatus = createServerFn({ method: 'POST' })
  .validator(z.object({
    accessKey: accessKeySchema,
    placementId: z.string().uuid(),
    status: z.enum(['draft', 'approved', 'paused', 'ended']),
  }))
  .handler(async ({ data }) => {
    const { setSportsSponsorPlacementStatus } = await import('@/data/sports-sponsorship.server');
    return setSportsSponsorPlacementStatus(data.accessKey, data.placementId, data.status);
  });
