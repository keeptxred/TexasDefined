import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const accessKey = z.string().min(20).max(200);
const outcomeSchema = z.object({
  accessKey,
  plannerRequestId: z.string().uuid(),
  venueSlug: z.string().regex(/^[a-z0-9-]+$/).max(120),
  outcomeType: z.enum([
    'quote_requested','quote_received','referral_sent','booking_confirmed',
    'booking_cancelled','dispute_opened','dispute_resolved','revenue_verified',
  ]),
  occurredAt: z.string().datetime({ offset: true }),
  evidenceReference: z.string().trim().min(20).max(500),
  evidenceKey: z.string().trim().min(6).max(120).regex(/^[A-Za-z0-9][A-Za-z0-9:._-]{5,119}$/),
  amountCents: z.number().int().min(1).max(1_000_000_000).nullable(),
  confirmIndependentEvidence: z.literal(true),
}).superRefine((data, ctx) => {
  if (data.outcomeType === 'revenue_verified' ? data.amountCents === null : data.amountCents !== null) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Only independently received revenue may include money.' });
  }
});

export const getCorporateEventOutcomes = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ accessKey }))
  .handler(async ({ data }) => {
    const { loadCorporateEventOutcomes } = await import('@/data/corporate-event-outcomes.server');
    return loadCorporateEventOutcomes(data.accessKey);
  });

export const attestCorporateEventOutcome = createServerFn({ method: 'POST' })
  .inputValidator(outcomeSchema)
  .handler(async ({ data }) => {
    const { recordCorporateEventOutcome } = await import('@/data/corporate-event-outcomes.server');
    return recordCorporateEventOutcome(data.accessKey, {
      plannerRequestId: data.plannerRequestId,
      venueSlug: data.venueSlug,
      outcomeType: data.outcomeType,
      occurredAt: new Date(data.occurredAt).toISOString(),
      evidenceReference: data.evidenceReference,
      evidenceKey: data.evidenceKey,
      amountCents: data.amountCents,
      confirmIndependentEvidence: true,
    });
  });
