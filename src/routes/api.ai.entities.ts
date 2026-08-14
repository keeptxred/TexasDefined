import { createFileRoute } from '@tanstack/react-router';
import { findCompleteTexasEntity, loadTexasKnowledgeGraph, type TexasEntityRecord } from '@/data/knowledge-graph';
import { applyCurrentEntityCorrections } from '@/data/knowledge-graph/current-entity-corrections';
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
    const graph = (await loadTexasKnowledgeGraph()).map(applyCurrentEntityCorrections);

    if (id) {
      const resolved = await findCompleteTexasEntity(id);
      const entity = resolved ? applyCurrentEntityCorrections(resolved) : undefined;
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

    const entities = q ? searchCorrectedGraph(graph, q, limit) : graph.slice(0, limit);
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

function searchCorrectedGraph(graph: TexasEntityRecord[], query: string, limit: number) {
  const normalized = query.trim().toLowerCase();
  const tokens = normalized.split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  return graph
    .map((entity) => {
      const haystack = [entity.name, entity.slug, ...entity.aliases, entity.kind, entity.countySlug, entity.region, ...(entity.tags ?? [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      const score = tokens.reduce((total, token) => total + (haystack.includes(token) ? 1 : 0), 0)
        + (entity.name.toLowerCase() === normalized ? 5 : 0)
        + (entity.aliases.some((alias) => alias.toLowerCase() === normalized) ? 4 : 0);
      return { entity, score };
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.entity.name.localeCompare(right.entity.name))
    .slice(0, limit)
    .map(({ entity }) => entity);
}

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
  if (kind === 'sports-venue') return 'SportsActivityLocation';
  if (['museum','historic-site','mission','battlefield','attraction'].includes(kind)) return 'TouristAttraction';
  return 'Place';
}

function json(body: unknown, options: { status?: number; cacheControl?: string } = {}) {
  return Response.json(body, {
    status: options.status,
    headers: { ...publicHeaders, 'cache-control': options.cacheControl ?? publicHeaders['cache-control'] },
  });
}
