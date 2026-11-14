import { createServerFn } from '@tanstack/react-start';
import type { PublicCorporateEventOffer } from '@/data/corporate-events-offers.server';

// Reads only approved, active, verified offers. Never accept a provider ID,
// unreviewed code, or arbitrary redemption URL from the browser.
export const getPublicCorporateEventOffers = createServerFn({ method: 'GET' })
  .handler(async (): Promise<PublicCorporateEventOffer[]> => {
    const { loadPublicCorporateEventOffers } = await import('@/data/corporate-events-offers.server');
    return loadPublicCorporateEventOffers();
  });
