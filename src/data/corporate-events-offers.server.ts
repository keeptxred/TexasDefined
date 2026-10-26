import { corporateEventProviders } from '@/data/corporate-events';
import { corporateEventTexasToday } from '@/data/corporate-event-dates';
import { supabaseAdmin } from '@/integrations/supabase/client.server';
import { corporateEventEvidenceTimestampIsValid, corporateEventVerifiedRedemptionUrl } from '@/data/corporate-event-offer-provenance';

/** Public subset only: never include a partner's contact details or unapproved draft. */
export type PublicCorporateEventOffer = {
  id: string;
  providerSlug: string;
  title: string;
  benefit: string;
  code: string | null;
  redemptionUrl: string;
  endsOn: string;
};

type ApprovedOfferRow = {
  id: string;
  partner_application_id: string;
  provider_slug: string;
  title: string;
  benefit: string;
  code: string | null;
  redemption_url: string;
  starts_on: string;
  ends_on: string;
  reviewed_at: string | null;
};
type ApprovedBusiness = {
  id: string;
  status: string;
  business_name: string;
  website: string;
  identity_verified_at: string | null;
  commercial_agreement_verified_at: string | null;
  commercial_agreement_covers_offers: boolean;
  commercial_agreement_expires_on: string | null;
};
function normalizedBusinessName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * An approved internal offer is not automatically public. The active date
 * window, reviewer stamp, approved applicant, verified directory identity,
 * and HTTPS partner-hosted redemption destination must ALL still match.
 */
export async function loadPublicCorporateEventOffers(): Promise<PublicCorporateEventOffer[]> {
  const client = supabaseAdmin as any;
  const today = corporateEventTexasToday();
  const { data: offers, error: offersError } = await client
    .from('texasdefined_group_event_offers')
    .select('id,partner_application_id,provider_slug,title,benefit,code,redemption_url,starts_on,ends_on,reviewed_at')
    .eq('status', 'approved')
    .lte('starts_on', today)
    .gte('ends_on', today)
    .not('reviewed_at', 'is', null)
    .limit(100);
  if (offersError) throw new Error('Approved event offers are unavailable.');
  if (!Array.isArray(offers) || !offers.length) return [];

  const applicationIds = [...new Set((offers as ApprovedOfferRow[]).map((offer) => offer.partner_application_id))];
  const { data: businesses, error: businessError } = await client
    .from('texasdefined_group_event_partner_applications')
    .select('id,status,business_name,website,identity_verified_at,commercial_agreement_verified_at,commercial_agreement_covers_offers,commercial_agreement_expires_on')
    .in('id', applicationIds)
    .eq('status', 'approved')
    .limit(100);
  if (businessError) throw new Error('Partner approval verification is unavailable.');
  const approvedBusinesses = new Map<string, ApprovedBusiness>(
    ((businesses ?? []) as ApprovedBusiness[]).map((business) => [business.id, business]),
  );
  const directory = new Map(corporateEventProviders.map((provider) => [provider.slug, provider]));
  const verified: PublicCorporateEventOffer[] = [];
  for (const offer of offers as ApprovedOfferRow[]) {
    const business = approvedBusinesses.get(offer.partner_application_id);
    const provider = directory.get(offer.provider_slug);
    if (!business || !provider) continue;
    if (!corporateEventEvidenceTimestampIsValid(offer.reviewed_at)
      || !corporateEventEvidenceTimestampIsValid(business.identity_verified_at)
      || !corporateEventEvidenceTimestampIsValid(business.commercial_agreement_verified_at)) continue;
    if (business.commercial_agreement_covers_offers !== true
      || (business.commercial_agreement_expires_on && business.commercial_agreement_expires_on < offer.ends_on)) continue;
    if (normalizedBusinessName(provider.name) !== normalizedBusinessName(business.business_name)) continue;
    if (!corporateEventVerifiedRedemptionUrl(offer.redemption_url, business.website, provider.officialUrl)) continue;
    if (offer.starts_on > today || offer.ends_on < today) continue;
    verified.push({
      id: offer.id,
      providerSlug: provider.slug,
      title: offer.title,
      benefit: offer.benefit,
      code: offer.code,
      redemptionUrl: offer.redemption_url,
      endsOn: offer.ends_on,
    });
  }
  // Editorial ordering stays independent of commercial offers.
  return verified.sort((a, b) => a.providerSlug.localeCompare(b.providerSlug) || a.endsOn.localeCompare(b.endsOn));
}
