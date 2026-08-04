import { TEXAS_ENTITY_REGISTRY, findTexasEntity, relationshipsFor, validateTexasEntityRegistry } from '../texas-entity-registry';
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
  if (staticMatch) return staticMatch;
  const remote = await fetchExploreGraphEntities({ query: value, limit: 50 });
  return remote.find((entity) => entity.id.toLowerCase() === normalized || entity.slug.toLowerCase() === normalized || entity.name.toLowerCase() === normalized || entity.aliases.some((alias) => alias.toLowerCase() === normalized));
}

export function graphNeighbors(entityId: string) {
  const entity = TEXAS_ENTITY_REGISTRY.find((candidate) => candidate.id === entityId);
  if (!entity) return [];
  const outgoing = entity.relationships.map((relationship) => ({ direction: 'outgoing' as const, relationship, entity: TEXAS_ENTITY_REGISTRY.find((candidate) => candidate.id === relationship.targetId) }));
  const incoming = TEXAS_ENTITY_REGISTRY.flatMap((candidate) => candidate.relationships.filter((relationship) => relationship.targetId === entityId).map((relationship) => ({ direction: 'incoming' as const, relationship, entity: candidate })));
  return [...outgoing, ...incoming];
}
