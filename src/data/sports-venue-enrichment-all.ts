import { getSportsVenueContentRemediation, getSportsVenueQualityProfile } from './sports-venue-content-remediation';
import { getSportsVenueContentRemediationWave2, getSportsVenueQualityProfileWave2 } from './sports-venue-content-remediation-wave2';
import { getSportsVenueContentRemediationWave3, getSportsVenueQualityProfileWave3 } from './sports-venue-content-remediation-wave3';
import { getSportsVenueContentRemediationWave4, getSportsVenueQualityProfileWave4 } from './sports-venue-content-remediation-wave4';
import { getSportsVenueContentRemediationWave5, getSportsVenueQualityProfileWave5 } from './sports-venue-content-remediation-wave5';
import { getSportsVenueContentRemediationWave6, getSportsVenueQualityProfileWave6 } from './sports-venue-content-remediation-wave6';
import { getSportsVenueContentRemediationWave7, getSportsVenueQualityProfileWave7 } from './sports-venue-content-remediation-wave7';
import { getSportsVenueContentRemediationWave8, getSportsVenueQualityProfileWave8 } from './sports-venue-content-remediation-wave8';
import { getSportsVenueContentRemediationWave9, getSportsVenueQualityProfileWave9 } from './sports-venue-content-remediation-wave9';
import { getSportsVenueEnrichment, sportsVenueMapUrl } from './sports-venue-enrichment';
import { getSportsVenueEnrichmentBatch2 } from './sports-venue-enrichment-batch2';
import { getSportsVenueEnrichmentBatch3 } from './sports-venue-enrichment-batch3';
import { getSportsVenueEnrichmentBatch4Racing } from './sports-venue-enrichment-batch4-racing';
import { getSportsVenueEnrichmentBatch5 } from './sports-venue-enrichment-batch5';
import { getSportsVenueEnrichmentBatch6 } from './sports-venue-enrichment-batch6';
import { getSportsVenueEnrichmentBatch7MajorCompletion } from './sports-venue-enrichment-batch7-major-completion';
import { getSportsVenueEnrichmentBatch8ACompletion } from './sports-venue-enrichment-batch8a-completion';
import { getSportsVenueEnrichmentBatch8BCompletion } from './sports-venue-enrichment-batch8b-completion';
import { getSportsVenueHistoryCompletion } from './sports-venue-history-completion';
import { applySportsVenueMaintenance } from './sports-venue-maintenance';

export { sportsVenueMapUrl };

export function getSportsVenueQualityProfileAll(slug: string) {
  const lookupSlug = slug === 'galaxy-stadium' ? 'jones-att-stadium' : slug;
  return getSportsVenueQualityProfile(lookupSlug)
    ?? getSportsVenueQualityProfileWave2(lookupSlug)
    ?? getSportsVenueQualityProfileWave3(lookupSlug)
    ?? getSportsVenueQualityProfileWave4(lookupSlug)
    ?? getSportsVenueQualityProfileWave5(lookupSlug)
    ?? getSportsVenueQualityProfileWave6(lookupSlug)
    ?? getSportsVenueQualityProfileWave7(lookupSlug)
    ?? getSportsVenueQualityProfileWave8(lookupSlug)
    ?? getSportsVenueQualityProfileWave9(lookupSlug);
}

export function getSportsVenueEnrichmentAll(slug: string) {
  const lookupSlug = slug === 'galaxy-stadium' ? 'jones-att-stadium' : slug;
  const profile = getSportsVenueContentRemediation(lookupSlug)
    ?? getSportsVenueContentRemediationWave2(lookupSlug)
    ?? getSportsVenueContentRemediationWave3(lookupSlug)
    ?? getSportsVenueContentRemediationWave4(lookupSlug)
    ?? getSportsVenueContentRemediationWave5(lookupSlug)
    ?? getSportsVenueContentRemediationWave6(lookupSlug)
    ?? getSportsVenueContentRemediationWave7(lookupSlug)
    ?? getSportsVenueContentRemediationWave8(lookupSlug)
    ?? getSportsVenueContentRemediationWave9(lookupSlug)
    ?? getSportsVenueEnrichment(lookupSlug)
    ?? getSportsVenueEnrichmentBatch2(lookupSlug)
    ?? getSportsVenueEnrichmentBatch3(lookupSlug)
    ?? getSportsVenueEnrichmentBatch4Racing(lookupSlug)
    ?? getSportsVenueEnrichmentBatch5(lookupSlug)
    ?? getSportsVenueEnrichmentBatch6(lookupSlug)
    ?? getSportsVenueEnrichmentBatch7MajorCompletion(lookupSlug)
    ?? getSportsVenueEnrichmentBatch8ACompletion(lookupSlug)
    ?? getSportsVenueEnrichmentBatch8BCompletion(lookupSlug);

  const maintained = applySportsVenueMaintenance(lookupSlug, profile);
  const completion = getSportsVenueHistoryCompletion(lookupSlug);
  if (!maintained || !completion || maintained.history) return maintained;

  return {
    ...maintained,
    history: completion.history,
    planningLinks: maintained.planningLinks.some((link) => link.url === completion.source.url)
      ? maintained.planningLinks
      : [...maintained.planningLinks, completion.source],
  };
}
