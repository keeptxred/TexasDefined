import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

/** Only the server checks/records approved offers; links navigate normally if counting fails. */
export const recordCorporateEventOfferOutboundClick = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ offerId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const { recordCorporateEventApprovedOfferClick } = await import('@/data/corporate-event-offer-clicks.server');
    await recordCorporateEventApprovedOfferClick(data.offerId);
    return { ok: true };
  });
