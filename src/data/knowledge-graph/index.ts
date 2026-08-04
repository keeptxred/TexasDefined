import { TEXAS_ENTITY_REGISTRY, findTexasEntity, relationshipsFor, validateTexasEntityRegistry } from '../texas-entity-registry';
import type { TexasEntityKind, TexasEntityRecord } from './types';

export type { TexasEntityKind, TexasEntityRecord, EntityRelationship, GeoPoint, KnowledgeGraphValidation } from './types';
export { TEXAS_ENTITY_REGISTRY, findTexasEntity, relationshipsFor, validateTexasEntityRegistry };

export function entitiesByKind(kind: TexasEntityKind) {
  return TEXAS_ENTITY_REGISTRY.filter((entity) => entity.kind === kind);
}

export function entitiesInCounty(countySlug: string) {
  return TEXAS_ENTITY_REGISTRY.filter((entity) => entity.countySlug === countySlug || entity.relationships.some((relationship) => relationship.targetId === `county:${countySlug}`));
}

export function entitiesInRegion(regionSlug: string) {
  return TEXAS_ENTITY_REGISTRY.filter((entity) => entity.region === regionSlug || entity.relationships.some((relationship) => relationship.targetId === `region:${regionSlug}`));
}

export function searchTexasKnowledgeGraph(query: string, limit = 25): TexasEntityRecord[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  const tokens = normalized.split(/\s+/).filter(Boolean);
  return TEXAS_ENTITY_REGISTRY
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

export function graphNeighbors(entityId: string) {
  const entity = TEXAS_ENTITY_REGISTRY.find((candidate) => candidate.id === entityId);
  if (!entity) return [];
  const outgoing = entity.relationships.map((relationship) => ({ direction: 'outgoing' as const, relationship, entity: TEXAS_ENTITY_REGISTRY.find((candidate) => candidate.id === relationship.targetId) }));
  const incoming = TEXAS_ENTITY_REGISTRY.flatMap((candidate) => candidate.relationships.filter((relationship) => relationship.targetId === entityId).map((relationship) => ({ direction: 'incoming' as const, relationship, entity: candidate })));
  return [...outgoing, ...incoming];
}
