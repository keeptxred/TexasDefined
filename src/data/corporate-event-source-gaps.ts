import type { CorporateEventProvider } from './corporate-events';

/** Editorial gaps, not a certification of live capacity, group packages or price. */
export type CorporateVenueEvidenceFilter =
  | 'all' | 'no-numeric-capacity-ceiling' | 'no-numeric-starting-rate' | 'published-ceiling-covers-45';

export function corporateVenueMatchesEvidenceFilter(
  provider: Pick<CorporateEventProvider, 'maxGroup' | 'minGroup' | 'startingPricePerPerson'>,
  filter: CorporateVenueEvidenceFilter,
): boolean {
  switch (filter) {
    case 'all': return true;
    case 'no-numeric-capacity-ceiling': return provider.maxGroup === null;
    case 'no-numeric-starting-rate': return provider.startingPricePerPerson === null;
    case 'published-ceiling-covers-45':
      return provider.maxGroup !== null && provider.maxGroup >= 45
        && (provider.minGroup == null || provider.minGroup <= 45);
    default: return false;
  }
}
