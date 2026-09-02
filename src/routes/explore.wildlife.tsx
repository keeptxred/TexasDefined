import { createFileRoute, Link } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { TEXAS_WILDLIFE_SPECIES } from '@/data/knowledge-graph/wildlife-species';
import { canonicalEntityPath } from '@/data/knowledge-graph/relationships';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/explore/wildlife';
const title = 'Texas Wildlife Guide: Species, Refuges & Habitats';
const description = 'Explore source-verified Texas wildlife profiles for mammals, birds and reptiles, then connect them to wildlife refuges, management areas and current official guidance.';

export const Route = createFileRoute('/explore/wildlife')({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [
        jsonLd({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              '@id': `${pageUrl}#page`,
              url: pageUrl,
              name: title,
              description,
              isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` },
              publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
              mainEntity: { '@id': `${pageUrl}#species` },
              about: [
                { '@type': 'Thing', name: 'Texas wildlife refuges' },
                { '@type': 'Thing', name: 'Texas wildlife viewing' },
                { '@type': 'Thing', name: 'Texas birding destinations' },
              ],
            },
            {
              '@type': 'ItemList',
              '@id': `${pageUrl}#species`,
              name: 'Texas wildlife species profiles',
              numberOfItems: TEXAS_WILDLIFE_SPECIES.length,
              itemListElement: TEXAS_WILDLIFE_SPECIES.map((species, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: absoluteUrl(texasDefinedBrand, canonicalEntityPath(species)),
                item: {
                  '@type': 'WebPage',
                  name: species.name,
                  description: species.description,
                  url: absoluteUrl(texasDefinedBrand, canonicalEntityPath(species)),
                  sameAs: species.officialUrl,
                },
              })),
            },
            {
              '@type': 'BreadcrumbList',
              '@id': `${pageUrl}#breadcrumb`,
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
                { '@type': 'ListItem', position: 2, name: 'Explore Texas', item: absoluteUrl(texasDefinedBrand, '/explore') },
                { '@type': 'ListItem', position: 3, name: 'Wildlife', item: pageUrl },
              ],
            },
          ],
        }),
      ],
    };
  },
  component: WildlifeHub,
});

function WildlifeHub() {
  return (
    <Container className="py-12 sm:py-16">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link to="/explore" className="hover:text-foreground">Explore</Link>
        <span aria-hidden="true" className="px-2">/</span>
        <span>Wildlife</span>
      </nav>

      <header className="mt-8 max-w-4xl">
        <p className="eyebrow text-primary">Texas outdoors & wildlife</p>
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">Texas wildlife guide</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">Explore source-verified profiles for notable Texas mammals, birds and reptiles, then connect them to refuges, wildlife management areas and broader outdoor planning. Species ranges do not guarantee sightings; always check the managing agency before travel and use current official guidance for regulations or conservation-sensitive information.</p>
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Wildlife discovery paths">
        <a href="/explore/national-wildlife-refuges" className="border border-border bg-surface/40 p-5 hover:border-primary"><span className="eyebrow text-primary">Public lands</span><strong className="mt-2 block font-display text-xl">National wildlife refuges</strong></a>
        <a href="/explore/wildlife-management-areas" className="border border-border bg-surface/40 p-5 hover:border-primary"><span className="eyebrow text-primary">Public lands</span><strong className="mt-2 block font-display text-xl">Wildlife management areas</strong></a>
        <Link to="/explore/outdoors" className="border border-border bg-surface/40 p-5 hover:border-primary"><span className="eyebrow text-primary">Explore</span><strong className="mt-2 block font-display text-xl">Outdoors & wildlife</strong></Link>
        <a href="/article/texas-wildlife-guide" className="border border-border bg-surface/40 p-5 hover:border-primary"><span className="eyebrow text-primary">Field guide</span><strong className="mt-2 block font-display text-xl">Wildlife planning guide</strong></a>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-2" aria-labelledby="species-directory-heading">
        <div className="md:col-span-2">
          <p className="eyebrow text-primary">Species authority</p>
          <h2 id="species-directory-heading" className="mt-2 font-display text-3xl">Texas wildlife species</h2>
        </div>
        {TEXAS_WILDLIFE_SPECIES.map((species) => {
          const path = canonicalEntityPath(species);
          return (
            <article key={species.id} className="border border-border bg-surface/40 p-6">
              <p className="eyebrow text-primary">{species.tags?.includes('birds') ? 'Bird' : species.tags?.includes('reptiles') ? 'Reptile' : 'Mammal'}</p>
              <h3 className="mt-2 font-display text-2xl text-foreground">
                <a href={path} className="hover:text-primary">{species.name}</a>
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{species.description}</p>
              <a href={path} className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Open species profile →</a>
            </article>
          );
        })}
      </section>
    </Container>
  );
}
