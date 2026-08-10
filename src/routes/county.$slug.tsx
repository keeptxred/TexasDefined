import { createFileRoute, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { AutoEntityLinks } from '@/components/content/AutoEntityLinks';
import { CountyEditorialSections } from '@/components/content/CountyEditorialSections';
import { CountyGuideSections } from '@/components/content/CountyGuideSections';
import { Container } from '@/components/layout/Container';
import { loadCountyEditorial } from '@/data/county-editorial';
import { loadCountyProfile } from '@/data/county-profile';
import { findCompleteTexasEntity, loadTexasKnowledgeGraph } from '@/data/knowledge-graph';
import { canonicalEntityPath, isIndexableEntityPage, rankRelatedEntities } from '@/data/knowledge-graph/relationships';
import { loadLocalGovernmentProfile } from '@/data/local-government-profile';
import { absoluteUrl, buildMeta, canonicalLink } from '@/lib/seo';

const siteUrl = 'https://texasdefined.com';

export const Route = createFileRoute('/county/$slug')({
  loader: async ({ params }) => {
    const graph = await loadTexasKnowledgeGraph();
    const entity = await findCompleteTexasEntity(`county:${params.slug}`) ?? await findCompleteTexasEntity(params.slug);
    if (!entity || entity.kind !== 'county') throw notFound();

    const [countyProfile, localGovernment, editorial] = await Promise.all([
      loadCountyProfile(entity.slug, entity.name),
      loadLocalGovernmentProfile(entity.slug, entity.name),
      loadCountyEditorial(entity.slug),
    ]);

    return {
      entity,
      graph,
      related: rankRelatedEntities(entity, graph, 12),
      countyProfile,
      localGovernment,
      editorial,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { entity, editorial } = loaderData;
    const canonicalPath = `/county/${entity.slug}`;
    const description = editorial?.dek ?? entity.description ?? `${entity.name} county guide from Texas Defined, combining verified geography, communities, Census facts, official local resources and an original editorial profile.`;
    const indexable = isIndexableEntityPage(entity);

    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: editorial ? `${entity.name} Guide` : entity.name,
        description,
        image: editorial?.hero.src,
        imageAlt: editorial?.hero.alt,
        imageWidth: editorial?.hero.width,
        imageHeight: editorial?.hero.height,
        robots: indexable ? undefined : 'noindex, follow, max-image-preview:large',
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
  component: CountyPage,
});

function CountyPage() {
  const { entity, graph, related, countyProfile, localGovernment, editorial } = Route.useLoaderData();
  const relatedEntities = related.map((item) => item.entity);
  const canonicalPath = `/county/${entity.slug}`;
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const description = editorial?.dek ?? entity.description ?? `${entity.name} county guide from Texas Defined.`;
  const imageUrl = editorial ? absoluteUrl(texasDefinedBrand, editorial.hero.src) : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AdministrativeArea',
        '@id': `${canonicalUrl}#entity`,
        name: entity.name,
        alternateName: entity.aliases.length ? entity.aliases : undefined,
        description,
        url: canonicalUrl,
        sameAs: entity.officialUrl ? [entity.officialUrl] : undefined,
        geo: entity.coordinates ? { '@type': 'GeoCoordinates', latitude: entity.coordinates.latitude, longitude: entity.coordinates.longitude } : undefined,
        additionalProperty: [
          countyProfile.countySeat ? { '@type': 'PropertyValue', name: 'County seat', value: countyProfile.countySeat } : undefined,
          countyProfile.population2020 != null ? { '@type': 'PropertyValue', name: '2020 Census population', value: countyProfile.population2020 } : undefined,
          countyProfile.landAreaSquareMiles != null ? { '@type': 'PropertyValue', name: 'Land area (square miles)', value: Math.round(countyProfile.landAreaSquareMiles) } : undefined,
        ].filter(Boolean),
      },
      ...(editorial ? [{
        '@type': 'Article',
        '@id': `${canonicalUrl}#county-story`,
        headline: editorial.title,
        description: editorial.dek,
        datePublished: editorial.publishedAt,
        image: imageUrl,
        mainEntityOfPage: { '@id': canonicalUrl },
        about: { '@id': `${canonicalUrl}#entity` },
        publisher: { '@id': `${siteUrl}/#organization` },
      }] : []),
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Texas counties', item: `${siteUrl}/county` },
          { '@type': 'ListItem', position: 3, name: entity.name, item: canonicalUrl },
        ],
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <a href="/" className="hover:text-foreground">Front page</a>
          <span aria-hidden="true" className="mx-2">/</span>
          <a href="/county" className="hover:text-foreground">Texas counties</a>
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">{entity.name}</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">County Guide</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{entity.name}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              <AutoEntityLinks text={description} entities={relatedEntities} maxLinks={4} policy={{ excludedEntityIds: [entity.id] }} />
            </p>
          </div>
          <dl className="border-y border-border py-4 text-sm lg:border-y-0 lg:border-l lg:py-0 lg:pl-6">
            <Fact label="Guide type" value={editorial ? 'Complete county guide' : 'Texas county guide'} />
            <Fact label="County seat" value={countyProfile.countySeat} />
            <Fact label="Part of Texas" value={entity.region ? title(entity.region) : undefined} />
            <Fact label="2020 population" value={countyProfile.population2020?.toLocaleString('en-US')} />
          </dl>
        </header>

        <div className="flex flex-wrap gap-x-7 gap-y-3 border-b border-border py-5 text-sm font-semibold">
          {entity.officialUrl && <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={entity.officialUrl} target="_blank" rel="noreferrer">Official county website ↗</a>}
          {entity.coordinates && <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={`https://www.google.com/maps/search/?api=1&query=${entity.coordinates.latitude},${entity.coordinates.longitude}`} target="_blank" rel="noreferrer">Open in maps ↗</a>}
        </div>

        <CountyGuideSections entity={entity} profile={countyProfile} localGovernment={localGovernment} related={related} />
        {editorial ? <CountyEditorialSections article={editorial} entities={graph} /> : null}
      </article>
    </Container>
  </>;
}

function Fact({ label, value }: { label: string; value?: string }) {
  return value ? <div className="border-b border-border py-3 last:border-b-0 lg:first:pt-0 lg:last:pb-0"><dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div> : null;
}

function title(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}
