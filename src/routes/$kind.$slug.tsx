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

  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <a href="/" className="hover:text-foreground">Front page</a>
          <span aria-hidden="true" className="mx-2">/</span>
          <a href="/explore" className="hover:text-foreground">Explore</a>
          <span aria-hidden="true" className="mx-2">/</span>
          <span className="text-foreground">{readerLabel(entity.kind)}</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">{readerLabel(entity.kind)}</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{entity.name}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              <AutoEntityLinks text={description} entities={relatedEntities} maxLinks={4} policy={{ excludedEntityIds: [entity.id] }} />
            </p>
          </div>
          <dl className="border-y border-border py-4 text-sm lg:border-y-0 lg:border-l lg:py-0 lg:pl-6">
            <Fact label="County" value={entity.countySlug ? `${title(entity.countySlug)} County` : undefined} />
            <Fact label="Part of Texas" value={entity.region ? title(entity.region) : undefined} />
            {entity.sourceCheckedAt && <Fact label="Details reviewed" value={formatCheckedDate(entity.sourceCheckedAt)} />}
          </dl>
        </header>

        <div className="flex flex-wrap gap-x-7 gap-y-3 border-b border-border py-5 text-sm font-semibold">
          {entity.officialUrl && <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={entity.officialUrl} target="_blank" rel="noreferrer">Official information ↗</a>}
          {entity.coordinates && <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={`https://www.google.com/maps/search/?api=1&query=${entity.coordinates.latitude},${entity.coordinates.longitude}`} target="_blank" rel="noreferrer">Open in maps ↗</a>}
        </div>

        {entity.tags?.length ? <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-[14rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Field notes</p>
            <h2 className="mt-2 font-display text-3xl">Why it belongs in the guide</h2>
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {entity.tags.map((tag) => <li key={tag} className="border-t border-border py-3 text-sm font-medium">{title(tag)}</li>)}
          </ul>
        </section> : null}

        {related.length ? <section className="py-12">
          <div className="flex items-end justify-between gap-6 border-b border-border pb-4">
            <div>
              <p className="eyebrow text-primary">Continue exploring</p>
              <h2 className="mt-2 font-display text-4xl">Nearby and related</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {related.map(({ entity: candidate }, index) => <a key={candidate.id} href={canonicalEntityPath(candidate)} className={`group py-6 sm:px-5 ${index % 3 !== 0 ? 'lg:border-l lg:border-border' : ''} border-b border-border`}>
              <span className="eyebrow text-primary">{readerLabel(candidate.kind)}</span>
              <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{candidate.name}</strong>
              <small className="mt-3 block text-sm leading-6 text-muted-foreground">Open the field guide →</small>
            </a>)}
          </div>
        </section> : null}
      </article>
    </Container>
  </main>;
}

function Fact({ label, value }: { label: string; value?: string }) {
  return value ? <div className="border-b border-border py-3 last:border-b-0 lg:first:pt-0 lg:last:pb-0"><dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div> : null;
}
function title(value: string) { return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase()); }
function formatCheckedDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
function readerLabel(kind: string) {
  const labels: Record<string, string> = {
    county: 'County Guide', city: 'City Guide', region: 'Around the State', 'metro-area': 'City Life',
    museum: 'Museum Guide', 'historic-site': 'Then & Now', mission: 'Texas History', battlefield: 'Texas History',
    attraction: 'Worth the Drive', fair: 'Texas Calendar', rodeo: 'Texas Calendar', festival: 'Texas Calendar',
    'holiday-event': 'Seasonal Guide', 'sporting-event': 'The Texas Game',
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
