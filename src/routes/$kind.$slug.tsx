import { createFileRoute, notFound } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { AutoEntityLinks } from '@/components/content/AutoEntityLinks';
import { findCompleteTexasEntity, loadTexasKnowledgeGraph } from '@/data/knowledge-graph';
import { canonicalEntityPath, rankRelatedEntities } from '@/data/knowledge-graph/relationships';
import { buildMeta, canonicalLink } from '@/lib/seo';

const siteUrl = 'https://texasdefined.com';

export const Route = createFileRoute('/$kind/$slug')({
  loader: async ({ params }) => {
    const graph = await loadTexasKnowledgeGraph();
    const entity = await findCompleteTexasEntity(`${params.kind}:${params.slug}`) ?? await findCompleteTexasEntity(params.slug);
    if (!entity || entity.kind !== params.kind) throw notFound();
    return { entity, related: rankRelatedEntities(entity, graph, 12) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const canonicalPath = canonicalEntityPath(loaderData.entity);
    const description = loaderData.entity.description ?? `What to know about ${loaderData.entity.name}, where it is, and what is nearby.`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: loaderData.entity.name,
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
  component: EntityPage,
});

function EntityPage() {
  const { entity, related } = Route.useLoaderData();
  const relatedEntities = related.map((item) => item.entity);
  const description = entity.description ?? `A closer look at ${entity.name}, where to find it, and what else is worth seeing nearby.`;
  const canonicalPath = canonicalEntityPath(entity);
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': schemaType(entity.kind),
        '@id': `${canonicalUrl}#entity`,
        name: entity.name,
        alternateName: entity.aliases.length ? entity.aliases : undefined,
        description: entity.description,
        url: canonicalUrl,
        sameAs: entity.officialUrl ? [entity.officialUrl] : undefined,
        geo: entity.coordinates ? { '@type': 'GeoCoordinates', latitude: entity.coordinates.latitude, longitude: entity.coordinates.longitude } : undefined,
        containedInPlace: entity.countySlug ? { '@type': 'AdministrativeArea', name: `${title(entity.countySlug)} County` } : entity.region ? { '@type': 'Place', name: title(entity.region) } : undefined,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Explore', item: `${siteUrl}/explore` },
          { '@type': 'ListItem', position: 3, name: entity.name, item: canonicalUrl },
        ],
      },
    ],
  };
  return <Container className="py-16 sm:py-24">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <article className="mx-auto max-w-5xl">
      <p className="eyebrow text-primary">{readerLabel(entity.kind)}</p>
      <h1 className="mt-3 font-display text-4xl sm:text-6xl">{entity.name}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
        <AutoEntityLinks text={description} entities={relatedEntities} maxLinks={4} policy={{ excludedEntityIds: [entity.id] }} />
      </p>
      <dl className="mt-10 grid gap-4 rounded-md border border-border p-6 sm:grid-cols-2 lg:grid-cols-3">
        <Fact label="County" value={entity.countySlug ? `${title(entity.countySlug)} County` : undefined} />
        <Fact label="Part of Texas" value={entity.region ? title(entity.region) : undefined} />
        {entity.sourceCheckedAt && <Fact label="Details reviewed" value={formatCheckedDate(entity.sourceCheckedAt)} />}
      </dl>
      <div className="mt-8 flex flex-wrap gap-4">
        {entity.officialUrl && <a className="underline underline-offset-4" href={entity.officialUrl} target="_blank" rel="noreferrer">Visit the official website</a>}
        {entity.coordinates && <a className="underline underline-offset-4" href={`https://www.google.com/maps/search/?api=1&query=${entity.coordinates.latitude},${entity.coordinates.longitude}`} target="_blank" rel="noreferrer">Find it on the map</a>}
      </div>
      {entity.tags?.length ? <section className="mt-12"><h2 className="font-display text-3xl">What makes it worth knowing</h2><div className="mt-4 flex flex-wrap gap-2">{entity.tags.map((tag) => <span key={tag} className="rounded-full bg-muted px-3 py-1 text-sm">{title(tag)}</span>)}</div></section> : null}
      {related.length ? <section className="mt-14"><h2 className="font-display text-3xl">Keep exploring nearby</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{related.map(({ entity: candidate }) => <a key={candidate.id} href={canonicalEntityPath(candidate)} className="rounded-md border border-border p-5 transition-colors hover:border-primary"><span className="eyebrow text-primary">{readerLabel(candidate.kind)}</span><strong className="mt-2 block font-display text-xl">{candidate.name}</strong><small className="mt-2 block text-muted-foreground">See why it is worth a stop</small></a>)}</div></section> : null}
    </article>
  </Container>;
}

function Fact({ label, value }: { label: string; value?: string }) { return value ? <div><dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div> : null; }
function title(value: string) { return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase()); }
function formatCheckedDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
function readerLabel(kind: string) {
  const labels: Record<string, string> = {
    county: 'County guide', city: 'City guide', region: 'Around the state', 'metro-area': 'City life',
    museum: 'Worth a visit', 'historic-site': 'Then & Now', mission: 'Texas History', battlefield: 'Texas History',
    attraction: 'Worth the drive', fair: 'This Weekend', rodeo: 'This Weekend', festival: 'This Weekend',
    'holiday-event': 'Seasonal favorite', 'sporting-event': 'The Texas Game',
  };
  return labels[kind] ?? title(kind);
}
function schemaType(kind: string) {
  if (kind === 'city') return 'City';
  if (['county','region','metro-area'].includes(kind)) return 'AdministrativeArea';
  if (kind === 'museum') return 'Museum';
  if (['historic-site','mission','battlefield','attraction'].includes(kind)) return 'TouristAttraction';
  if (['fair','rodeo','festival','holiday-event','sporting-event'].includes(kind)) return 'Event';
  return 'Place';
}
