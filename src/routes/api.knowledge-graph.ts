import { createFileRoute } from '@tanstack/react-router';
import {
  findCompleteTexasEntity,
  graphNeighbors,
  loadTexasKnowledgeGraph,
  searchCompleteTexasKnowledgeGraph,
} from '@/data/knowledge-graph';
import type { TexasEntityKind, TexasEntityRecord } from '@/data/knowledge-graph';

const PUBLIC_HEADERS = {
  'cache-control': 'public, max-age=300, stale-while-revalidate=3600',
  'access-control-allow-origin': '*',
};

const PUBLIC_FIELDS = (entity: TexasEntityRecord) => ({
  id: entity.id,
  kind: entity.kind,
  name: entity.name,
  slug: entity.slug,
  aliases: entity.aliases,
  description: entity.description,
  countySlug: entity.countySlug,
  region: entity.region,
  coordinates: entity.coordinates,
  officialUrl: entity.officialUrl,
  canonicalUrl: `https://texasdefined.com/${entity.kind}/${entity.slug}`,
  sourceId: entity.sourceId,
  sourceConfidence: entity.sourceConfidence,
  sourceCheckedAt: entity.sourceCheckedAt,
  reviewDueAt: entity.reviewDueAt,
  status: entity.status,
  relationships: entity.relationships,
  tags: entity.tags,
});

export const Route = createFileRoute('/api/knowledge-graph')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const id = url.searchParams.get('id')?.trim();
        const query = url.searchParams.get('q')?.trim() ?? '';
        const kind = url.searchParams.get('kind')?.trim() as TexasEntityKind | undefined;
        const county = url.searchParams.get('county')?.trim();
        const region = url.searchParams.get('region')?.trim();
        const includeRelationships = url.searchParams.get('relationships') === '1';
        const requestedLimit = Number(url.searchParams.get('limit') ?? 25);
        const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(Math.trunc(requestedLimit), 1), 100) : 25;

        const graph = await loadTexasKnowledgeGraph();

        if (id) {
          const entity = await findCompleteTexasEntity(id);
          if (!entity) return json({ error: 'Entity not found' }, { status: 404, cacheControl: 'no-store' });
          return json({
            entity: PUBLIC_FIELDS(entity),
            neighbors: includeRelationships
              ? graphNeighbors(entity.id).map((item) => ({
                  direction: item.direction,
                  relationship: item.relationship,
                  entity: item.entity ? PUBLIC_FIELDS(item.entity) : null,
                }))
              : undefined,
          });
        }

        let entities = query
          ? await searchCompleteTexasKnowledgeGraph(query, limit)
          : graph;

        if (kind) entities = entities.filter((entity) => entity.kind === kind);
        if (county) entities = entities.filter((entity) => entity.countySlug === county || entity.relationships.some((relationship) => relationship.targetId === `county:${county}`));
        if (region) entities = entities.filter((entity) => entity.region === region || entity.relationships.some((relationship) => relationship.targetId === `region:${region}`));

        const countsByKind = entities.reduce<Record<string, number>>((counts, entity) => {
          counts[entity.kind] = (counts[entity.kind] ?? 0) + 1;
          return counts;
        }, {});

        return json({
          total: entities.length,
          countsByKind,
          entities: entities.slice(0, limit).map(PUBLIC_FIELDS),
          filters: { query: query || null, kind: kind || null, county: county || null, region: region || null, limit },
        });
      },
    },
  },
});

function json(body: unknown, options: { status?: number; cacheControl?: string } = {}) {
  return Response.json(body, {
    status: options.status,
    headers: { ...PUBLIC_HEADERS, 'cache-control': options.cacheControl ?? PUBLIC_HEADERS['cache-control'] },
  });
}
