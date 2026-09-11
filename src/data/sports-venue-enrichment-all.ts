import { getSportsVenueContentRemediation } from './sports-venue-content-remediation';
import { getSportsVenueContentRemediationWave2 } from './sports-venue-content-remediation-wave2';
import { getSportsVenueContentRemediationWave3 } from './sports-venue-content-remediation-wave3';
import { getSportsVenueContentRemediationWave4 } from './sports-venue-content-remediation-wave4';
import { getSportsVenueContentRemediationWave5 } from './sports-venue-content-remediation-wave5';
import { getSportsVenueContentRemediationWave6 } from './sports-venue-content-remediation-wave6';
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
  return getSportsVenueContentRemediation(lookupSlug)
    ?? getSportsVenueContentRemediationWave2(lookupSlug)
    ?? getSportsVenueContentRemediationWave3(lookupSlug)
    ?? getSportsVenueContentRemediationWave4(lookupSlug)
    ?? getSportsVenueContentRemediationWave5(lookupSlug)
    ?? getSportsVenueContentRemediationWave6(lookupSlug)
    ?? getSportsVenueEnrichment(lookupSlug)
    ?? getSportsVenueEnrichmentBatch2(lookupSlug)
    ?? getSportsVenueEnrichmentBatch3(lookupSlug)
    ?? getSportsVenueEnrichmentBatch4Racing(lookupSlug)
    ?? getSportsVenueEnrichmentBatch5(lookupSlug)
    ?? getSportsVenueEnrichmentBatch6(lookupSlug)
    ?? getSportsVenueEnrichmentBatch7MajorCompletion(lookupSlug)
    ?? getSportsVenueEnrichmentBatch8ACompletion(lookupSlug)
    ?? getSportsVenueEnrichmentBatch8BCompletion(lookupSlug);
}
