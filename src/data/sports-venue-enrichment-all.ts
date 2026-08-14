import { getSportsVenueEnrichment, sportsVenueMapUrl } from './sports-venue-enrichment';
import { getSportsVenueEnrichmentBatch2 } from './sports-venue-enrichment-batch2';
import { getSportsVenueEnrichmentBatch3 } from './sports-venue-enrichment-batch3';

export { sportsVenueMapUrl };

export function getSportsVenueEnrichmentAll(slug: string) {
  return getSportsVenueEnrichment(slug)
    ?? getSportsVenueEnrichmentBatch2(slug)
    ?? getSportsVenueEnrichmentBatch3(slug);
}
