import { getSportsVenueEnrichment, sportsVenueMapUrl } from './sports-venue-enrichment';
import { getSportsVenueEnrichmentBatch2 } from './sports-venue-enrichment-batch2';
import { getSportsVenueEnrichmentBatch3 } from './sports-venue-enrichment-batch3';

export { sportsVenueMapUrl };

export function getSportsVenueEnrichmentAll(slug: string) {
  const lookupSlug = slug === 'galaxy-stadium' ? 'jones-att-stadium' : slug;
  return getSportsVenueEnrichment(lookupSlug)
    ?? getSportsVenueEnrichmentBatch2(lookupSlug)
    ?? getSportsVenueEnrichmentBatch3(lookupSlug);
}
