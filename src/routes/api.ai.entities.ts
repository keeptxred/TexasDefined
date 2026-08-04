import { createFileRoute } from '@tanstack/react-router';
import { findCompleteTexasEntity, loadTexasKnowledgeGraph, searchCompleteTexasKnowledgeGraph } from '@/data/knowledge-graph';
import { canonicalEntityPath, rankRelatedEntities } from '@/data/knowledge-graph/relationships';

export const Route = createFileRoute('/api/ai/entities')({
  server: { handlers: { GET: async ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const q = url.searchParams.get('q');
    const limit = Math.min(50, Math.max(1, Number(url.searchParams.get('limit') || 20)));
    const graph = await loadTexasKnowledgeGraph();
    if (id) {
      const entity = await findCompleteTexasEntity(id);
      if (!entity) return Response.json({ error: 'Entity not found' }, { status: 404 });
      const related = rankRelatedEntities(entity, graph, 12).map(({ entity: item, reasons }) => ({ '@id': `https://texasdefined.com${canonicalEntityPath(item)}#entity`, name: item.name, type: item.kind, reasons }));
      return json({ '@context': 'https://schema.org', '@type': 'Dataset', name: `TexasDefined entity record: ${entity.name}`, about: toJsonLd(entity), mentions: related, source: entity.officialUrl, dateModified: entity.sourceCheckedAt });
    }
    const entities = q ? await searchCompleteTexasKnowledgeGraph(q, limit) : graph.slice(0, limit);
    return json({ '@context': 'https://schema.org', '@type': 'ItemList', name: q ? `TexasDefined entity search: ${q}` : 'TexasDefined knowledge graph', numberOfItems: entities.length, itemListElement: entities.map((entity, index) => ({ '@type': 'ListItem', position: index + 1, item: toJsonLd(entity) })) });
  } } },
});

function toJsonLd(entity: Awaited<ReturnType<typeof findCompleteTexasEntity>> extends infer T ? Exclude<T, null> : never) {
  return { '@type': schemaType(entity.kind), '@id': `https://texasdefined.com${canonicalEntityPath(entity)}#entity`, name: entity.name, alternateName: entity.aliases, description: entity.description, url: `https://texasdefined.com${canonicalEntityPath(entity)}`, sameAs: entity.officialUrl ? [entity.officialUrl] : undefined, geo: entity.coordinates ? { '@type': 'GeoCoordinates', latitude: entity.coordinates.latitude, longitude: entity.coordinates.longitude } : undefined, containedInPlace: entity.countySlug ? { '@type': 'AdministrativeArea', name: entity.countySlug } : entity.region ? { '@type': 'Place', name: entity.region } : undefined };
}
function schemaType(kind: string) { if (['county','city','region','metro-area'].includes(kind)) return 'AdministrativeArea'; if (['fair','rodeo','festival','holiday-event','sporting-event'].includes(kind)) return 'Event'; if (['museum','historic-site','mission','battlefield','attraction'].includes(kind)) return 'TouristAttraction'; return 'Place'; }
function json(body: unknown) { return Response.json(body, { headers: { 'cache-control': 'public, max-age=300, stale-while-revalidate=3600', 'access-control-allow-origin': '*' } }); }
