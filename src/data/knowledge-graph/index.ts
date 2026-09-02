import { TEXAS_ENTITY_REGISTRY, findTexasEntity, relationshipsFor, validateTexasEntityRegistry } from '../texas-entity-registry';
import { countyProfileDescription, loadCountyProfile } from '../county-profile';
import { hasCountySeriesProfile } from '../county-series';
import { loadLocalGovernmentProfile, localOfficeDescription } from '../local-government-profile';
import { getCountyPropertyRecordBySlug } from '../property/county-property-data';
import { isCountyPropertyIndexReady } from '../property/county-property-schema';
import { fetchExploreGraphEntities, hasRemoteExploreGraph } from './explore-adapter';
import type { TexasEntityKind, TexasEntityRecord } from './types';

export type { TexasEntityKind, TexasEntityRecord, EntityRelationship, GeoPoint, KnowledgeGraphValidation } from './types';
export { TEXAS_ENTITY_REGISTRY, findTexasEntity, relationshipsFor, validateTexasEntityRegistry, fetchExploreGraphEntities, hasRemoteExploreGraph };

type CityMetroAuthorityModule = typeof import('../city-metro-authority-seeds');
let cityMetroAuthorityPromise: Promise<CityMetroAuthorityModule> | undefined;

type WildlifeSpeciesModule = typeof import('./wildlife-species');
let wildlifeSpeciesPromise: Promise<WildlifeSpeciesModule> | undefined;

function loadCityMetroAuthorityModule() {
  cityMetroAuthorityPromise ??= import('../city-metro-authority-seeds');
  return cityMetroAuthorityPromise;
}

function loadWildlifeSpeciesModule() {
  wildlifeSpeciesPromise ??= import('./wildlife-species');
  return wildlifeSpeciesPromise;
}

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
  let cityMetroAuthority: CityMetroAuthorityModule | undefined;
  let wildlifeSpecies: WildlifeSpeciesModule | undefined;
  try {
    [remote, cityMetroAuthority, wildlifeSpecies] = await Promise.all([
      fetchExploreGraphEntities(options).catch((error) => {
        console.error('Explore knowledge graph unavailable; using static registry', error);
        return [];
      }),
      loadCityMetroAuthorityModule().catch((error) => {
        console.error('City/metro authority enrichment unavailable; keeping verified placeholders gated', error);
        return undefined;
      }),
      loadWildlifeSpeciesModule().catch((error) => {
        console.error('Wildlife species authority unavailable; keeping core graph available', error);
        return undefined;
      }),
    ]);
  } catch (error) {
    console.error('Knowledge graph enrichment unavailable; using static registry', error);
  }

  const merged = new Map<string, TexasEntityRecord>();
  for (const entity of TEXAS_ENTITY_REGISTRY) merged.set(entity.id, entity);
  for (const entity of wildlifeSpecies?.TEXAS_WILDLIFE_SPECIES ?? []) merged.set(entity.id, entity);
  for (const entity of cityMetroAuthority?.cityMetroAuthoritySeedEntities() ?? []) merged.set(entity.id, entity);
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

  const graph = [...merged.values()];
  const countyEntries = graph.filter((entity) => entity.kind === 'county');
  const enrichedCounties = await Promise.all(countyEntries.map(enrichCountyGeographyEntity));
  const enrichedById = new Map(enrichedCounties.map((entity) => [entity.id, entity]));

  if (cityMetroAuthority) {
    for (const entity of graph) {
      if (entity.kind !== 'city' && entity.kind !== 'metro-area') continue;
      const enriched = cityMetroAuthority.enrichCityMetroAuthorityEntity(entity);
      if (enriched !== entity) enrichedById.set(entity.id, enriched);
    }
  }

  // Local-office sitemap eligibility must use the same checked-in verified data
  // as the public property-tax pages. Do not make sitemap publication depend on
  // live request-time scraping of 508 office pages.
  for (const entity of graph) {
    if (entity.kind !== 'appraisal-district' && entity.kind !== 'tax-office') continue;
    const enriched = enrichLocalOfficeEntityFromSnapshot(entity);
    if (enriched !== entity) enrichedById.set(entity.id, enriched);
  }

  return graph.map((entity) => enrichedById.get(entity.id) ?? entity);
}

export async function searchCompleteTexasKnowledgeGraph(query: string, limit = 25): Promise<TexasEntityRecord[]> {
  const entities = await loadTexasKnowledgeGraph({ query, limit: Math.max(limit * 4, 100) });
  return scoreEntities(entities, query, limit);
}

export async function findCompleteTexasEntity(value: string): Promise<TexasEntityRecord | undefined> {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  const staticMatch = findTexasEntity(value);
  if (staticMatch) return enrichAuthoritativeEntity(staticMatch);

  try {
    const wildlifeSpecies = await loadWildlifeSpeciesModule();
    const wildlifeMatch = wildlifeSpecies.TEXAS_WILDLIFE_SPECIES.find((entity) =>
      entity.id.toLowerCase() === normalized
      || entity.slug.toLowerCase() === normalized
      || entity.name.toLowerCase() === normalized
      || entity.aliases.some((alias) => alias.toLowerCase() === normalized),
    );
    if (wildlifeMatch) return wildlifeMatch;
  } catch (error) {
    console.error('Wildlife species authority lookup unavailable', error);
  }

  try {
    const cityMetroAuthority = await loadCityMetroAuthorityModule();
    const authorityMatch = cityMetroAuthority.findCityMetroAuthoritySeed(value);
    if (authorityMatch) return authorityMatch;
  } catch (error) {
    console.error('City/metro authority lookup unavailable', error);
  }

  const remote = await fetchExploreGraphEntities({ query: value, limit: 50 });
  const match = remote.find((entity) => entity.id.toLowerCase() === normalized || entity.slug.toLowerCase() === normalized || entity.name.toLowerCase() === normalized || entity.aliases.some((alias) => alias.toLowerCase() === normalized));
  return match ? enrichAuthoritativeEntity(match) : undefined;
}

async function enrichAuthoritativeEntity(entity: TexasEntityRecord): Promise<TexasEntityRecord> {
  if (entity.kind === 'county') return enrichCountyEntity(entity);
  if (entity.kind === 'appraisal-district' || entity.kind === 'tax-office') return enrichLocalOfficeEntity(entity);
  if (entity.kind === 'city' || entity.kind === 'metro-area') {
    try {
      const cityMetroAuthority = await loadCityMetroAuthorityModule();
      return cityMetroAuthority.enrichCityMetroAuthorityEntity(entity);
    } catch (error) {
      console.error(`City/metro enrichment unavailable for ${entity.id}`, error);
    }
  }
  return entity;
}

async function enrichCountyGeographyEntity(entity: TexasEntityRecord): Promise<TexasEntityRecord> {
  try {
    const [profile, editorialComplete] = await Promise.all([
      loadCountyProfile(entity.slug, entity.name),
      hasCountySeriesProfile(entity.slug),
    ]);
    return {
      ...entity,
      // A generated Census/geography reference description is not the same as
      // a completed TexasDefined county-series editorial profile. Keep the
      // description empty for unfinished counties so SSR and hydration agree
      // on the existing in-progress state used by the county route.
      description: editorialComplete ? countyProfileDescription(entity.name, profile) : undefined,
      coordinates: profile.latitude != null && profile.longitude != null
        ? { latitude: profile.latitude, longitude: profile.longitude }
        : entity.coordinates,
      tags: [...new Set([
        ...(entity.tags ?? []),
        'county-reference',
        editorialComplete ? 'county-series-complete' : 'county-guide-in-progress',
      ])],
    };
  } catch {
    return entity;
  }
}

async function enrichCountyEntity(entity: TexasEntityRecord): Promise<TexasEntityRecord> {
  const geographic = await enrichCountyGeographyEntity(entity);
  try {
    const localGovernment = await loadLocalGovernmentProfile(entity.slug, entity.name);
    return {
      ...geographic,
      officialUrl: localGovernment.countyWebsiteUrl ?? geographic.officialUrl,
      sourceCheckedAt: geographic.sourceCheckedAt,
      tags: [...new Set([...(geographic.tags ?? []), 'county-government', 'county-reference'])],
    };
  } catch (error) {
    console.error(`County government enrichment unavailable for ${entity.slug}`, error);
    return geographic;
  }
}

function enrichLocalOfficeEntityFromSnapshot(entity: TexasEntityRecord): TexasEntityRecord {
  if (!entity.countySlug || (entity.kind !== 'appraisal-district' && entity.kind !== 'tax-office')) return entity;
  const record = getCountyPropertyRecordBySlug(entity.countySlug);
  if (!record || !isCountyPropertyIndexReady(record) || !record.lastVerifiedAt) return entity;

  const countyName = record.name;
  const office = entity.kind === 'appraisal-district' ? record.appraisalDistrict : record.taxOffice;
  if (!office.websiteUrl || (!office.phone && !office.address && !office.email)) return entity;

  const profile = {
    name: office.name ?? undefined,
    websiteUrl: office.websiteUrl ?? undefined,
    phone: office.phone ?? undefined,
    address: office.address ?? undefined,
    email: office.email ?? undefined,
    lastUpdated: record.lastVerifiedAt,
  };
  const description = localOfficeDescription(countyName, entity.kind, profile);
  if (description.length < 180) return entity;

  return {
    ...entity,
    description,
    officialUrl: office.websiteUrl,
    sourceCheckedAt: record.lastVerifiedAt,
    status: 'active',
    tags: [...new Set([
      ...(entity.tags ?? []),
      entity.kind === 'appraisal-district' ? 'property-appraisal' : 'county-tax-services',
      'property-tax',
    ])],
  };
}

async function enrichLocalOfficeEntity(entity: TexasEntityRecord): Promise<TexasEntityRecord> {
  const snapshot = enrichLocalOfficeEntityFromSnapshot(entity);
  if (snapshot !== entity) return snapshot;
  if (!entity.countySlug) return entity;
  const county = TEXAS_ENTITY_REGISTRY.find((candidate) => candidate.kind === 'county' && candidate.slug === entity.countySlug);
  const countyName = county?.name ?? `${titleSlug(entity.countySlug)} County`;
  try {
    const profile = await loadLocalGovernmentProfile(entity.countySlug, countyName);
    const office = entity.kind === 'appraisal-district' ? profile.appraisalDistrict : profile.taxOffice;
    if (!office.websiteUrl && !office.phone && !office.address && !office.email) return entity;

    const description = localOfficeDescription(countyName, entity.kind, office);
    const hasVerifiedWebsite = Boolean(office.websiteUrl);
    const hasUsefulContact = Boolean(office.phone || office.address || office.email);
    const readyForPublication = hasVerifiedWebsite && hasUsefulContact && description.length >= 180;

    return {
      ...entity,
      description,
      officialUrl: office.websiteUrl ?? entity.officialUrl,
      sourceCheckedAt: office.lastUpdated ?? entity.sourceCheckedAt,
      status: readyForPublication ? 'active' : entity.status,
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