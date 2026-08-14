import { getSportsVenueEnrichment, sportsVenueMapUrl } from './sports-venue-enrichment';
import { getSportsVenueEnrichmentBatch2 } from './sports-venue-enrichment-batch2';
import { getSportsVenueEnrichmentBatch3 } from './sports-venue-enrichment-batch3';
import { getSportsVenueEnrichmentBatch4Racing } from './sports-venue-enrichment-batch4-racing';
import { getSportsVenueEnrichmentBatch5 } from './sports-venue-enrichment-batch5';
import { getSportsVenueEnrichmentBatch6 } from './sports-venue-enrichment-batch6';
import { getSportsVenueEnrichmentBatch7MajorCompletion } from './sports-venue-enrichment-batch7-major-completion';
import { getSportsVenueEnrichmentBatch8ACompletion } from './sports-venue-enrichment-batch8a-completion';
import { getSportsVenueEnrichmentBatch8BCompletion } from './sports-venue-enrichment-batch8b-completion';

export { sportsVenueMapUrl };

export function getSportsVenueEnrichmentAll(slug: string) {
  const lookupSlug = slug === 'galaxy-stadium' ? 'jones-att-stadium' : slug;
  return getSportsVenueEnrichment(lookupSlug)
    ?? getSportsVenueEnrichmentBatch2(lookupSlug)
    ?? getSportsVenueEnrichmentBatch3(lookupSlug)
    ?? getSportsVenueEnrichmentBatch4Racing(lookupSlug)
    ?? getSportsVenueEnrichmentBatch5(lookupSlug)
    ?? getSportsVenueEnrichmentBatch6(lookupSlug)
    ?? getSportsVenueEnrichmentBatch7MajorCompletion(lookupSlug)
    ?? getSportsVenueEnrichmentBatch8ACompletion(lookupSlug)
    ?? getSportsVenueEnrichmentBatch8BCompletion(lookupSlug);
}
