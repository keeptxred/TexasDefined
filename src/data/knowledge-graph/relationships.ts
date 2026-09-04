import type { TexasEntityRecord } from './types';

export type RankedRelatedEntity = { entity: TexasEntityRecord; score: number; reasons: string[] };
type CanonicalEntityRef = Pick<TexasEntityRecord, 'kind' | 'slug'> & Partial<Pick<TexasEntityRecord, 'sourceId' | 'tags'>>;

const LOCAL_GOVERNMENT_KINDS = new Set([
  'county',
  'appraisal-district',
  'tax-office',
  'county-clerk',
  'dps-office',
]);

const GOVERNMENT_REFERENCE_KINDS = new Set([
  'agency',
  'appraisal-district',
  'tax-office',
  'county-clerk',
  'dps-office',
]);

const DESTINATION_MIRROR_IDS = new Set([
  'lake:caddo-lake',
  'state-park:palo-duro-canyon-state-park',
  'state-park:enchanted-rock-state-natural-area',
  'national-park:big-bend-national-park',
  'cavern:natural-bridge-caverns',
  'beach:padre-island-national-seashore',
  'historic-site:the-alamo',
]);

const APPRAISAL_DISTRICT_SUFFIX = '-appraisal-district';

function isDestinationMirror(entity: CanonicalEntityRef) {
  return DESTINATION_MIRROR_IDS.has(`${entity.kind}:${entity.slug}`);
}

export function rankRelatedEntities(entity: TexasEntityRecord, graph: TexasEntityRecord[], limit = 12): RankedRelatedEntity[] {
  const explicit = new Set(entity.relationships.map((relationship) => relationship.targetId));
  const entityCounty = countyContext(entity);

  return graph
    .filter((candidate) => {
      if (candidate.id === entity.id || candidate.status === 'retired') return false;
      if (!isIndexableEntityPage(candidate)) return false;
      return true;
    })
    .map((candidate) => {
      let score = 0;
      const reasons: string[] = [];
      const candidateCounty = countyContext(candidate);
      const directlyRelated = explicit.has(candidate.id);
      const incomingRelated = candidate.relationships.some((relationship) => relationship.targetId === entity.id);
      const sameCounty = Boolean(entityCounty && candidateCounty && entityCounty === candidateCounty);

      if (directlyRelated) { score += 120; reasons.push('direct relationship'); }
      if (incomingRelated) { score += 100; reasons.push('incoming relationship'); }
      if (sameCounty) { score += 70; reasons.push('same county'); }

      const miles = distanceMiles(entity, candidate);
      if (miles != null) {
        if (miles <= 25) { score += 45; reasons.push('within 25 miles'); }
        else if (miles <= 75) { score += 30; reasons.push('within 75 miles'); }
        else if (miles <= 150) { score += 15; reasons.push('within 150 miles'); }
      }

      if (entity.region && candidate.region === entity.region) {
        score += 18;
        reasons.push('same region');
      }

      const sharedTags = (entity.tags ?? []).filter((tag) => candidate.tags?.includes(tag));
      if (sharedTags.length) {
        score += Math.min(24, sharedTags.length * 6);
        reasons.push(`shared: ${sharedTags.slice(0, 3).join(', ')}`);
      }

      if (entity.kind === candidate.kind && (sameCounty || miles != null || Boolean(entity.region && candidate.region === entity.region) || sharedTags.length > 0)) {
        score += 4;
        reasons.push('same guide type');
      }

      if (LOCAL_GOVERNMENT_KINDS.has(entity.kind) && !sameCounty && !directlyRelated && !incomingRelated) {
        score = 0;
        reasons.length = 0;
      }

      return { entity: candidate, score, reasons };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || proximityTieBreak(entity, a.entity, b.entity) || a.entity.name.localeCompare(b.entity.name))
    .slice(0, Math.max(1, limit));
}

function countyContext(entity: TexasEntityRecord) {
  if (entity.kind === 'county') return entity.slug;
  if (entity.countySlug) return entity.countySlug;
  const countyRelationship = entity.relationships.find((relationship) => relationship.targetId.startsWith('county:'));
  return countyRelationship?.targetId.slice('county:'.length);
}

function distanceMiles(a: TexasEntityRecord, b: TexasEntityRecord) {
  if (!a.coordinates || !b.coordinates) return undefined;
  const toRadians = (degrees: number) => degrees * Math.PI / 180;
  const earthRadiusMiles = 3958.7613;
  const lat1 = toRadians(a.coordinates.latitude);
  const lat2 = toRadians(b.coordinates.latitude);
  const deltaLat = toRadians(b.coordinates.latitude - a.coordinates.latitude);
  const deltaLon = toRadians(b.coordinates.longitude - a.coordinates.longitude);
  const haversine = Math.sin(deltaLat / 2) ** 2
    + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;
  return 2 * earthRadiusMiles * Math.asin(Math.min(1, Math.sqrt(haversine)));
}

function proximityTieBreak(origin: TexasEntityRecord, a: TexasEntityRecord, b: TexasEntityRecord) {
  const aMiles = distanceMiles(origin, a);
  const bMiles = distanceMiles(origin, b);
  if (aMiles == null && bMiles == null) return 0;
  if (aMiles == null) return 1;
  if (bMiles == null) return -1;
  return aMiles - bMiles;
}

export function canonicalEntityPath(entity: CanonicalEntityRef) {
  if (isDestinationMirror(entity)) return `/destination/${entity.slug}`;
  if (entity.kind === 'sporting-event' && entity.tags?.includes('tournament')) return `/tournament/${entity.slug}`;
  if (entity.kind === 'appraisal-district' && entity.slug.endsWith(APPRAISAL_DISTRICT_SUFFIX)) {
    const countySlug = entity.slug.slice(0, -APPRAISAL_DISTRICT_SUFFIX.length);
    if (countySlug) return `/property-tax/county/${countySlug}`;
  }
  return `/${entity.kind}/${entity.slug}`;
}

const NON_SPECIFIC_OFFICIAL_URLS = new Set([
  'https://www.texas.gov/texas-county-websites.html',
]);

function hasEntitySpecificOfficialUrl(entity: TexasEntityRecord) {
  if (!entity.officialUrl) return false;
  try {
    const url = new URL(entity.officialUrl);
    if (url.protocol !== 'https:') return false;
    return !NON_SPECIFIC_OFFICIAL_URLS.has(url.href);
  } catch {
    return false;
  }
}

/**
 * Search-index quality gate for generic knowledge-graph entity pages.
 * Generated pages are intentionally noindex until the underlying record is
 * substantively written, source-verified, and specific enough to stand alone
 * as a useful search result.
 */
export function isIndexableEntityPage(entity: TexasEntityRecord) {
  if (isDestinationMirror(entity)) return false;

  if (GOVERNMENT_REFERENCE_KINDS.has(entity.kind)) return false;

  if (!['active', 'seasonal'].includes(entity.status)) return false;
  if (!entity.sourceCheckedAt) return false;
  if (!['official', 'high'].includes(entity.sourceConfidence)) return false;

  const description = entity.description?.trim() ?? '';

  if (entity.kind === 'county') {
    const editorialComplete = entity.tags?.includes('county-series-complete') ?? false;
    return description.length >= 180
      && entity.sourceConfidence === 'official'
      && entity.status === 'active'
      && Boolean(entity.coordinates)
      && (editorialComplete || entity.relationships.length >= 2);
  }

  if (description.length < 180) return false;
  if (!hasEntitySpecificOfficialUrl(entity)) return false;

  if (LOCAL_GOVERNMENT_KINDS.has(entity.kind)) {
    if (entity.sourceConfidence !== 'official') return false;
    if (entity.status !== 'active') return false;
  }

  const contextSignals = [
    Boolean(entity.coordinates),
    Boolean(entity.countySlug),
    Boolean(entity.region),
    Boolean(entity.tags?.length && entity.tags.length >= 2),
    Boolean(entity.relationships.length),
  ].filter(Boolean).length;

  return contextSignals >= 3;
}
