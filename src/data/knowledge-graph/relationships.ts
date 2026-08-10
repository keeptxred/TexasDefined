import type { TexasEntityRecord } from './types';

export type RankedRelatedEntity = { entity: TexasEntityRecord; score: number; reasons: string[] };

export function rankRelatedEntities(entity: TexasEntityRecord, graph: TexasEntityRecord[], limit = 12): RankedRelatedEntity[] {
  const explicit = new Set(entity.relationships.map((relationship) => relationship.targetId));
  return graph
    .filter((candidate) => candidate.id !== entity.id && candidate.status !== 'retired')
    .map((candidate) => {
      let score = 0;
      const reasons: string[] = [];
      if (explicit.has(candidate.id)) { score += 100; reasons.push('direct relationship'); }
      if (candidate.relationships.some((relationship) => relationship.targetId === entity.id)) { score += 80; reasons.push('incoming relationship'); }
      if (entity.countySlug && candidate.countySlug === entity.countySlug) { score += 25; reasons.push('same county'); }
      if (entity.region && candidate.region === entity.region) { score += 12; reasons.push('same region'); }
      const sharedTags = (entity.tags ?? []).filter((tag) => candidate.tags?.includes(tag));
      if (sharedTags.length) { score += Math.min(20, sharedTags.length * 4); reasons.push(`shared: ${sharedTags.slice(0, 3).join(', ')}`); }
      if (entity.kind === candidate.kind) score += 3;
      return { entity: candidate, score, reasons };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.entity.name.localeCompare(b.entity.name))
    .slice(0, Math.max(1, limit));
}

export function canonicalEntityPath(entity: Pick<TexasEntityRecord, 'kind' | 'slug'>) {
  return `/${entity.kind}/${entity.slug}`;
}

const LOCAL_GOVERNMENT_KINDS = new Set([
  'county',
  'appraisal-district',
  'tax-office',
  'county-clerk',
  'dps-office',
]);

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
  if (!['active', 'seasonal'].includes(entity.status)) return false;

  const description = entity.description?.trim() ?? '';
  if (description.length < 180) return false;

  if (!entity.sourceCheckedAt) return false;
  if (!hasEntitySpecificOfficialUrl(entity)) return false;
  if (!['official', 'high'].includes(entity.sourceConfidence)) return false;

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
