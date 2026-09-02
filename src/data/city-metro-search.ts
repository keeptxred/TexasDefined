import { cityMetroAuthoritySeedEntities, enrichCityMetroAuthorityEntity } from './city-metro-authority-seeds';
import { canonicalEntityPath, isIndexableEntityPage } from './knowledge-graph/relationships';
import type { TexasEntityRecord } from './knowledge-graph/types';
import { TEXAS_ENTITY_REGISTRY } from './texas-entity-registry';
import type { SearchDocument } from './types';

function cityMetroCandidates(): TexasEntityRecord[] {
  const byId = new Map<string, TexasEntityRecord>();

  for (const entity of TEXAS_ENTITY_REGISTRY) {
    if (entity.kind !== 'city' && entity.kind !== 'metro-area') continue;
    const enriched = enrichCityMetroAuthorityEntity(entity);
    byId.set(enriched.id, enriched);
  }

  for (const entity of cityMetroAuthoritySeedEntities()) {
    byId.set(entity.id, entity);
  }

  return [...byId.values()];
}

export function buildCityMetroSearchDocuments(): SearchDocument[] {
  return cityMetroCandidates()
    .filter((entity) => (entity.kind === 'city' || entity.kind === 'metro-area') && isIndexableEntityPage(entity))
    .map((entity) => {
      const kind = entity.kind === 'metro-area' ? 'metro-area' : 'city';
      const keywords = [
        ...entity.aliases,
        ...(entity.tags ?? []),
        entity.countySlug,
        entity.region,
        kind === 'metro-area' ? 'Texas metro' : 'Texas city',
      ].filter((value): value is string => Boolean(value));

      return {
        id: entity.id,
        brandId: 'texasdefined',
        kind,
        title: entity.name,
        summary: entity.description ?? '',
        keywords: [...new Set(keywords)],
        href: canonicalEntityPath(entity),
      };
    });
}
