import { createFileRoute } from '@tanstack/react-router';
import { findCompleteTexasEntity, loadTexasKnowledgeGraph, searchCompleteTexasKnowledgeGraph, type TexasEntityRecord } from '@/data/knowledge-graph';
import { canonicalEntityPath, rankRelatedEntities } from '@/data/knowledge-graph/relationships';

const siteUrl = 'https://texasdefined.com';
const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;
const apiUrl = `${siteUrl}/api/ai/entities`;
const publicHeaders = {
  'cache-control': 'public, max-age=300, stale-while-revalidate=3600',
  'access-control-allow-origin': '*',
  'x-robots-tag': 'noindex, follow',
};

export const Route = createFileRoute('/api/ai/entities')({
  server: { handlers: { GET: async ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('id')?.trim();
    const q = url.searchParams.get('q')?.trim() ?? '';
    const requestedLimit = Number(url.searchParams.get('limit') ?? 20);
    const limit = Number.isFinite(requestedLimit) ? Math.min(50, Math.max(1, Math.trunc(requestedLimit))) : 20;
    const graph = await loadTexasKnowledgeGraph();

    if (id) {
      const entity = await findCompleteTexasEntity(id);
      if (!entity) return json({ error: 'Entity not found' }, { status: 404, cacheControl: 'no-store' });
      const related = rankRelatedEntities(entity, graph, 12).map(({ entity: item, reasons }) => ({
        '@id': `${siteUrl}${canonicalEntityPath(item)}#entity`,
        name: item.name,
        type: item.kind,
        url: `${siteUrl}${canonicalEntityPath(item)}`,
        reasons,
      }));
      return json({
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        '@id': `${apiUrl}?id=${encodeURIComponent(entity.id)}#dataset`,
        name: `TexasDefined entity record: ${entity.name}`,
        url: `${apiUrl}?id=${encodeURIComponent(entity.id)}`,
        creator: { '@id': organizationId },
        publisher: { '@id': organizationId },
        isPartOf: { '@id': websiteId },
        about: toJsonLd(entity),
        mentions: related,
        source: entity.officialUrl,
        dateModified: entity.sourceCheckedAt,
        keywords: entity.tags,
        measurementTechnique: entity.sourceConfidence,
        additionalProperty: provenanceProperties(entity),
      });
    }

    const entities = q ? await searchCompleteTexasKnowledgeGraph(q, limit) : graph.slice(0, limit);
    return json({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${apiUrl}#results`,
      name: q ? `TexasDefined entity search: ${q}` : 'TexasDefined knowledge graph',
      url: url.toString(),
      isPartOf: { '@id': websiteId },
      numberOfItems: entities.length,
      itemListElement: entities.map((entity, index) => ({ '@type': 'ListItem', position: index + 1, item: toJsonLd(entity) })),
    });
  } } },
});

function provenanceProperties(entity: TexasEntityRecord) {
  return [
    { '@type': 'PropertyValue', name: 'entityId', value: entity.id },
    { '@type': 'PropertyValue', name: 'entityKind', value: entity.kind },
    { '@type': 'PropertyValue', name: 'status', value: entity.status },
    { '@type': 'PropertyValue', name: 'sourceId', value: entity.sourceId },
    { '@type': 'PropertyValue', name: 'sourceConfidence', value: entity.sourceConfidence },
    ...(entity.sourceCheckedAt ? [{ '@type': 'PropertyValue', name: 'sourceCheckedAt', value: entity.sourceCheckedAt }] : []),
    ...(entity.reviewDueAt ? [{ '@type': 'PropertyValue', name: 'reviewDueAt', value: entity.reviewDueAt }] : []),
  ];
}

function toJsonLd(entity: TexasEntityRecord) {
  const canonicalUrl = `${siteUrl}${canonicalEntityPath(entity)}`;
  return {
    '@type': schemaType(entity.kind),
    '@id': `${canonicalUrl}#entity`,
    name: entity.name,
    alternateName: entity.aliases.length ? entity.aliases : undefined,
    description: entity.description,
    url: canonicalUrl,
    sameAs: entity.officialUrl ? [entity.officialUrl] : undefined,
    geo: entity.coordinates ? { '@type': 'GeoCoordinates', latitude: entity.coordinates.latitude, longitude: entity.coordinates.longitude } : undefined,
    containedInPlace: entity.countySlug
      ? { '@type': 'AdministrativeArea', name: entity.countySlug.replace(/-/g, ' ') }
      : entity.region
        ? { '@type': 'Place', name: entity.region.replace(/-/g, ' ') }
        : undefined,
    keywords: entity.tags?.length ? entity.tags : undefined,
    dateModified: entity.sourceCheckedAt,
    additionalType: entity.kind,
    additionalProperty: provenanceProperties(entity),
    subjectOf: { '@type': 'Dataset', '@id': `${apiUrl}?id=${encodeURIComponent(entity.id)}#dataset` },
  };
}

function schemaType(kind: string) {
  if (['county','city','region','metro-area'].includes(kind)) return 'AdministrativeArea';
  if (['fair','rodeo','festival','holiday-event','sporting-event'].includes(kind)) return 'Event';
  if (['museum','historic-site','mission','battlefield','attraction'].includes(kind)) return 'TouristAttraction';
  return 'Place';
}

function json(body: unknown, options: { status?: number; cacheControl?: string } = {}) {
  return Response.json(body, {
    status: options.status,
    headers: { ...publicHeaders, 'cache-control': options.cacheControl ?? publicHeaders['cache-control'] },
  });
}
