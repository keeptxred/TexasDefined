import { getSportsVenueEnrichment, sportsVenueMapUrl } from './sports-venue-enrichment';
import { getSportsVenueEnrichmentBatch2 } from './sports-venue-enrichment-batch2';

export { sportsVenueMapUrl };

export function getSportsVenueEnrichmentAll(slug: string) {
  return getSportsVenueEnrichment(slug) ?? getSportsVenueEnrichmentBatch2(slug);
}
