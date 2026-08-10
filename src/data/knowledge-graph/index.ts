import { TEXAS_ENTITY_REGISTRY, findTexasEntity, relationshipsFor, validateTexasEntityRegistry } from '../texas-entity-registry';
import { countyProfileDescription, loadCountyProfile } from '../county-profile';
import { loadLocalGovernmentProfile, localOfficeDescription } from '../local-government-profile';
import { fetchExploreGraphEntities, hasRemoteExploreGraph } from './explore-adapter';
import type { TexasEntityKind, TexasEntityRecord } from './types';

export type { TexasEntityKind, TexasEntityRecord, EntityRelationship, GeoPoint, KnowledgeGraphValidation } from './types';
export { TEXAS_ENTITY_REGISTRY, findTexasEntity, relationshipsFor, validateTexasEntityRegistry, fetchExploreGraphEntities, hasRemoteExploreGraph };

export function entitiesByKind(kind: TexasEntityKind) {
  return TEXAS_ENTITY_REGISTRY.filter((entity) => entity.kind === kind);
}

export function entitiesInCounty(countySlug: string) {
  return TEXAS_ENTITY_REGISTRY.filter((entity) => entity.countySlug === countySlug || entity.relationships.some((relationship) => relationship.targetId === `county:${countySlug}`));
}

export function entitiesInRegion(regionSlug: string) {
  return TEXAS_ENTITY_REGISTRY.filter((entity) => entity.region === regionSlug || entity.relationships.some((relationship) => relationship.targetId === `region:${regionSlug}`));
}

function scoreEntities(entities: TexasEntityRecord[], query: string, limit: number) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  const tokens = normalized.split(/\s+/).filter(Boolean);
  return entities
    .map((entity) => {
      const haystack = [entity.name, entity.slug, ...entity.aliases, entity.kind, entity.countySlug, entity.region, ...(entity.tags ?? [])].filter(Boolean).join(' ').toLowerCase();
      const score = tokens.reduce((total, token) => total + (haystack.includes(token) ? 1 : 0), 0) + (entity.name.toLowerCase() === normalized ? 5 : 0);
      return { entity, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.entity.name.localeCompare(b.entity.name))
    .slice(0, Math.max(1, limit))
    .map((result) => result.entity);
}

export function searchTexasKnowledgeGraph(query: string, limit = 25): TexasEntityRecord[] {
  return scoreEntities(TEXAS_ENTITY_REGISTRY, query, limit);
}

export async function loadTexasKnowledgeGraph(options: { query?: string; limit?: number } = {}): Promise<TexasEntityRecord[]> {
  let remote: TexasEntityRecord[] = [];
  try {
    remote = await fetchExploreGraphEntities(options);
  } catch (error) {
    console.error('Explore knowledge graph unavailable; using static registry', error);
  }
  const merged = new Map<string, TexasEntityRecord>();
  for (const entity of TEXAS_ENTITY_REGISTRY) merged.set(entity.id, entity);
  for (const entity of remote) {
    const existing = merged.get(entity.id);
    merged.set(entity.id, existing ? {
      ...existing,
      ...entity,
      aliases: [...new Set([...existing.aliases, ...entity.aliases])],
      relationships: [...existing.relationships, ...entity.relationships.filter((relationship) => !existing.relationships.some((item) => item.type === relationship.type && item.targetId === relationship.targetId))],
      tags: [...new Set([...(existing.tags ?? []), ...(entity.tags ?? [])])],
    } : entity);
  }
  return [...merged.values()];
}

export async function searchCompleteTexasKnowledgeGraph(query: string, limit = 25): Promise<TexasEntityRecord[]> {
  const entities = await loadTexasKnowledgeGraph({ query, limit: Math.max(limit * 4, 100) });
  return scoreEntities(entities, query, limit);
}

export async function findCompleteTexasEntity(value: string): Promise<TexasEntityRecord | undefined> {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  const staticMatch = findTexasEntity(value);
  if (staticMatch) return enrichGovernmentEntity(staticMatch);
  const remote = await fetchExploreGraphEntities({ query: value, limit: 50 });
  const match = remote.find((entity) => entity.id.toLowerCase() === normalized || entity.slug.toLowerCase() === normalized || entity.name.toLowerCase() === normalized || entity.aliases.some((alias) => alias.toLowerCase() === normalized));
  return match ? enrichGovernmentEntity(match) : undefined;
}

async function enrichGovernmentEntity(entity: TexasEntityRecord): Promise<TexasEntityRecord> {
  if (entity.kind === 'county') return enrichCountyEntity(entity);
  if (entity.kind === 'appraisal-district' || entity.kind === 'tax-office') return enrichLocalOfficeEntity(entity);
  return entity;
}

async function enrichCountyEntity(entity: TexasEntityRecord): Promise<TexasEntityRecord> {
  try {
    const [profile, localGovernment] = await Promise.all([
      loadCountyProfile(entity.slug, entity.name),
      loadLocalGovernmentProfile(entity.slug, entity.name),
    ]);
    const coordinates = profile.latitude != null && profile.longitude != null
      ? { latitude: profile.latitude, longitude: profile.longitude }
      : entity.coordinates;
    return {
      ...entity,
      description: countyProfileDescription(entity.name, profile),
      coordinates,
      officialUrl: localGovernment.countyWebsiteUrl ?? entity.officialUrl,
      sourceCheckedAt: localGovernment.countyWebsiteUrl ? new Date().toISOString().slice(0, 10) : entity.sourceCheckedAt,
      tags: [...new Set([...(entity.tags ?? []), 'county-government', 'county-reference'])],
    };
  } catch (error) {
    console.error(`County government enrichment unavailable for ${entity.slug}`, error);
    try {
      const profile = await loadCountyProfile(entity.slug, entity.name);
      return {
        ...entity,
        description: countyProfileDescription(entity.name, profile),
        coordinates: profile.latitude != null && profile.longitude != null
          ? { latitude: profile.latitude, longitude: profile.longitude }
          : entity.coordinates,
      };
    } catch {
      return entity;
    }
  }
}

async function enrichLocalOfficeEntity(entity: TexasEntityRecord): Promise<TexasEntityRecord> {
  if (!entity.countySlug) return entity;
  const county = TEXAS_ENTITY_REGISTRY.find((candidate) => candidate.kind === 'county' && candidate.slug === entity.countySlug);
  const countyName = county?.name ?? `${titleSlug(entity.countySlug)} County`;
  try {
    const profile = await loadLocalGovernmentProfile(entity.countySlug, countyName);
    const office = entity.kind === 'appraisal-district' ? profile.appraisalDistrict : profile.taxOffice;
    if (!office.websiteUrl && !office.phone && !office.address && !office.email) return entity;
    return {
      ...entity,
      description: localOfficeDescription(countyName, entity.kind, office),
      officialUrl: office.websiteUrl ?? entity.officialUrl,
      sourceCheckedAt: office.lastUpdated ?? new Date().toISOString().slice(0, 10),
      tags: [...new Set([
        ...(entity.tags ?? []),
        entity.kind === 'appraisal-district' ? 'property-appraisal' : 'county-tax-services',
        'property-tax',
      ])],
    };
  } catch (error) {
    console.error(`Local government office enrichment unavailable for ${entity.id}`, error);
    return entity;
  }
}

function titleSlug(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}

export function graphNeighbors(entityId: string) {
  const entity = TEXAS_ENTITY_REGISTRY.find((candidate) => candidate.id === entityId);
  if (!entity) return [];
  const outgoing = entity.relationships.map((relationship) => ({ direction: 'outgoing' as const, relationship, entity: TEXAS_ENTITY_REGISTRY.find((candidate) => candidate.id === relationship.targetId) }));
  const incoming = TEXAS_ENTITY_REGISTRY.flatMap((candidate) => candidate.relationships.filter((relationship) => relationship.targetId === entityId).map((relationship) => ({ direction: 'incoming' as const, relationship, entity: candidate })));
  return [...outgoing, ...incoming];
}
