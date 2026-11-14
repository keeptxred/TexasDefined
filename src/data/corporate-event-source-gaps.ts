import type { CorporateEventProvider } from './corporate-events';

/** Staff editorial triage, never proof of bookability, availability or room capacity. */
export type CorporateVenueEvidenceFilter =
  | 'all' | 'no-numeric-capacity-ceiling' | 'no-numeric-starting-rate'
  | 'published-ceiling-covers-45' | 'published-ceiling-below-45'
  | 'published-minimum-exceeds-45' | 'room-configuration-needs-review';

type PublishedGroupFacts = Pick<CorporateEventProvider, 'maxGroup' | 'minGroup' | 'startingPricePerPerson'>;
type PublishedRoomFacts = PublishedGroupFacts & Pick<CorporateEventProvider, 'capacityDetail'>;

export type CorporateVenuePublished45Status =
  | 'unknown-maximum' | 'published-below-45' | 'published-minimum-above-45'
  | 'published-range-includes-45';

/** Numeric editorial source fields, not a confirmed simultaneous reservation. */
export function corporateVenuePublished45Status(provider: PublishedGroupFacts): CorporateVenuePublished45Status {
  if (provider.maxGroup === null) return 'unknown-maximum';
  if (provider.maxGroup < 45) return 'published-below-45';
  if (provider.minGroup != null && provider.minGroup > 45) return 'published-minimum-above-45';
  return 'published-range-includes-45';
}

/** Only a text-triage queue: official package/room proof must still be reviewed. */
export function corporateVenueRoomDetailsNeedReview(provider: PublishedRoomFacts): boolean {
  const detail = provider.capacityDetail.trim();
  return !detail || /\b(?:confirm|conflict(?:ing|s)?|varies|vary|rotat(?:e|es|ing|ion|ions)|multiple|parallel|buyout|different|separate|room(?:s)?|layout(?:s)?)\b/i.test(detail);
}

export function corporateVenueMatchesEvidenceFilter(
  provider: PublishedRoomFacts,
  filter: CorporateVenueEvidenceFilter,
): boolean {
  switch (filter) {
    case 'all': return true;
    case 'no-numeric-capacity-ceiling': return provider.maxGroup === null;
    case 'no-numeric-starting-rate': return provider.startingPricePerPerson === null;
    case 'published-ceiling-covers-45':
      return corporateVenuePublished45Status(provider) === 'published-range-includes-45';
    case 'published-ceiling-below-45':
      return corporateVenuePublished45Status(provider) === 'published-below-45';
    case 'published-minimum-exceeds-45':
      return corporateVenuePublished45Status(provider) === 'published-minimum-above-45';
    case 'room-configuration-needs-review':
      return corporateVenueRoomDetailsNeedReview(provider);
    default: return false;
  }
}
