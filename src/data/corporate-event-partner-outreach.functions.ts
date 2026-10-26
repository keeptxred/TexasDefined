import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const accessKey = z.string().min(20).max(200);
const contactKinds = z.enum(['initial_contact', 'partner_reply', 'meeting_held', 'package_received', 'declined']);

export const getCorporateVenueOutreach = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey }))
  .handler(async ({ data }) => {
    const { loadCorporateVenueOutreach } = await import('@/data/corporate-event-partner-outreach.server');
    return loadCorporateVenueOutreach(data.accessKey);
  });

export const attestCorporateVenueOutreach = createServerFn({ method: 'POST' })
  .inputValidator(z.object({
    accessKey,
    venueSlug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(100),
    contactKind: contactKinds,
    occurredAt: z.string().datetime({ offset: false }),
    evidenceKey: z.string().trim().min(6).max(120),
    evidenceReference: z.string().trim().min(20).max(500),
    followupOn: z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.null()]),
    independentlyVerifiedActualContact: z.literal(true),
  }))
  .handler(async ({ data }) => {
    const { recordCorporateVenueOutreach } = await import('@/data/corporate-event-partner-outreach.server');
    return recordCorporateVenueOutreach(data.accessKey, data);
  });
