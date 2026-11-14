import { supabaseAdmin } from '@/integrations/supabase/client.server';
import { loadPublicCorporateEventOffers } from '@/data/corporate-events-offers.server';

/**
 * Records an anonymous, directional link activation, not a conversion.
 * Never accept an external URL or visitor identity from the client.
 */
export async function recordCorporateEventApprovedOfferClick(offerId: string): Promise<void> {
  const approved = await loadPublicCorporateEventOffers();
  if (!approved.some((offer) => offer.id === offerId)) {
    throw new Error('The partner offer is no longer available.');
  }
  const client = supabaseAdmin as any;
  const { error } = await client.rpc('td_record_corporate_event_offer_click', { p_offer_id: offerId });
  if (error) throw new Error('Offer link measurement temporarily unavailable.');
}
