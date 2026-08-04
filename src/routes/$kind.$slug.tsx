import { createFileRoute, notFound } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { findCompleteTexasEntity, loadTexasKnowledgeGraph } from '@/data/knowledge-graph';
import { canonicalEntityPath, rankRelatedEntities } from '@/data/knowledge-graph/relationships';

export const Route = createFileRoute('/$kind/$slug')({
  loader: async ({ params }) => {
    const graph = await loadTexasKnowledgeGraph();
    const entity = await findCompleteTexasEntity(`${params.kind}:${params.slug}`) ?? await findCompleteTexasEntity(params.slug);
    if (!entity || entity.kind !== params.kind) throw notFound();
    return { entity, related: rankRelatedEntities(entity, graph, 12) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.entity.name} | TexasDefined` },
      { name: 'description', content: loaderData.entity.description ?? `Official information, location, relationships and Texas travel context for ${loaderData.entity.name}.` },
    ] : [],
    links: loaderData ? [{ rel: 'canonical', href: `https://texasdefined.com${canonicalEntityPath(loaderData.entity)}` }] : [],
  }),
  component: EntityPage,
});

function EntityPage() {
  const { entity, related } = Route.useLoaderData();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': schemaType(entity.kind),
    '@id': `https://texasdefined.com${canonicalEntityPath(entity)}#entity`,
    name: entity.name,
    alternateName: entity.aliases.length ? entity.aliases : undefined,
    description: entity.description,
    url: `https://texasdefined.com${canonicalEntityPath(entity)}`,
    sameAs: entity.officialUrl ? [entity.officialUrl] : undefined,
    geo: entity.coordinates ? { '@type': 'GeoCoordinates', latitude: entity.coordinates.latitude, longitude: entity.coordinates.longitude } : undefined,
    containedInPlace: entity.countySlug ? { '@type': 'AdministrativeArea', name: `${title(entity.countySlug)} County` } : entity.region ? { '@type': 'Place', name: title(entity.region) } : undefined,
  };
  return <Container className="py-16 sm:py-24">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <article className="mx-auto max-w-5xl">
      <p className="eyebrow text-primary">{title(entity.kind)}</p>
      <h1 className="mt-3 font-display text-4xl sm:text-6xl">{entity.name}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{entity.description ?? `A governed TexasDefined entity with verified source and relationship metadata.`}</p>
      <dl className="mt-10 grid gap-4 rounded-md border border-border p-6 sm:grid-cols-2 lg:grid-cols-4">
        <Fact label="County" value={entity.countySlug ? `${title(entity.countySlug)} County` : undefined} />
        <Fact label="Region" value={entity.region ? title(entity.region) : undefined} />
        <Fact label="Status" value={title(entity.status)} />
        <Fact label="Source confidence" value={title(entity.sourceConfidence)} />
        {entity.coordinates && <Fact label="Coordinates" value={`${entity.coordinates.latitude.toFixed(5)}, ${entity.coordinates.longitude.toFixed(5)}`} />}
        {entity.sourceCheckedAt && <Fact label="Source checked" value={entity.sourceCheckedAt.slice(0, 10)} />}
      </dl>
      <div className="mt-8 flex flex-wrap gap-4">
        {entity.officialUrl && <a className="underline underline-offset-4" href={entity.officialUrl} target="_blank" rel="noreferrer">Official website</a>}
        {entity.coordinates && <a className="underline underline-offset-4" href={`https://www.google.com/maps/search/?api=1&query=${entity.coordinates.latitude},${entity.coordinates.longitude}`} target="_blank" rel="noreferrer">Open map</a>}
      </div>
      {entity.tags?.length ? <section className="mt-12"><h2 className="font-display text-3xl">What it is known for</h2><div className="mt-4 flex flex-wrap gap-2">{entity.tags.map((tag) => <span key={tag} className="rounded-full bg-muted px-3 py-1 text-sm">{title(tag)}</span>)}</div></section> : null}
      {related.length ? <section className="mt-14"><h2 className="font-display text-3xl">Related Texas places and resources</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{related.map(({ entity: candidate, reasons }) => <a key={candidate.id} href={canonicalEntityPath(candidate)} className="rounded-md border border-border p-5 transition-colors hover:border-primary"><span className="eyebrow text-primary">{title(candidate.kind)}</span><strong className="mt-2 block font-display text-xl">{candidate.name}</strong><small className="mt-2 block text-muted-foreground">{reasons.join(' · ')}</small></a>)}</div></section> : null}
    </article>
  </Container>;
}

function Fact({ label, value }: { label: string; value?: string }) { return value ? <div><dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div> : null; }
function title(value: string) { return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase()); }
function schemaType(kind: string) { if (['county','city','region','metro-area'].includes(kind)) return 'AdministrativeArea'; if (['museum','historic-site','mission','battlefield','attraction'].includes(kind)) return 'TouristAttraction'; if (['fair','rodeo','festival','holiday-event','sporting-event'].includes(kind)) return 'Event'; return 'Place'; }
