import { createFileRoute, Link } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { TEXAS_WILDLIFE_SPECIES } from '@/data/knowledge-graph/wildlife-species';
import { canonicalEntityPath } from '@/data/knowledge-graph/relationships';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/explore/wildlife-species';
const title = 'Texas Wildlife Species Guide: Animals, Birds & Habitats';
const description = 'Explore source-verified Texas wildlife profiles for mammals, birds, reptiles and seasonal wildlife, with habitat context and links to current TPWD guidance.';

export const Route = createFileRoute('/explore/wildlife-species')({
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
                { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl(texasDefinedBrand, '/') },
                { '@type': 'ListItem', position: 2, name: 'Explore', item: absoluteUrl(texasDefinedBrand, '/explore') },
                { '@type': 'ListItem', position: 3, name: 'Wildlife species', item: pageUrl },
              ],
            },
          ],
        }),
      ],
    };
  },
  component: WildlifeSpeciesHub,
});

function WildlifeSpeciesHub() {
  return (
    <Container className="py-12 sm:py-16">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link to="/explore" className="hover:text-foreground">Explore</Link>
        <span aria-hidden="true" className="px-2">/</span>
        <span>Wildlife species</span>
      </nav>

      <header className="mt-8 max-w-4xl">
        <p className="eyebrow text-primary">Texas wildlife field guide</p>
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">Texas wildlife species</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">Source-verified profiles for notable Texas mammals, birds and reptiles. Use these pages to understand habitat and seasonal context, then follow the official TPWD source on each profile for current regulations, conservation guidance and time-sensitive information.</p>
      </header>

      <section className="mt-10 grid gap-5 md:grid-cols-2" aria-labelledby="species-directory-heading">
        <h2 id="species-directory-heading" className="sr-only">Texas wildlife species directory</h2>
        {TEXAS_WILDLIFE_SPECIES.map((species) => (
          <article key={species.id} className="border border-border bg-surface/40 p-6">
            <p className="eyebrow text-primary">{species.tags?.includes('birds') ? 'Bird' : species.tags?.includes('reptiles') ? 'Reptile' : 'Mammal'}</p>
            <h3 className="mt-2 font-display text-2xl text-foreground">
              <Link to={canonicalEntityPath(species)} className="hover:text-primary">{species.name}</Link>
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{species.description}</p>
            <Link to={canonicalEntityPath(species)} className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Open species profile →</Link>
          </article>
        ))}
      </section>

      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-display text-2xl">Plan wildlife trips by place</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Species ranges are not guarantees of sightings. Pair the field guide with Texas Defined refuge, wildlife-management-area and outdoor destination pages, and always check the managing agency before travel.</p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          <Link to="/explore/outdoors" className="underline decoration-border underline-offset-4 hover:text-foreground">Texas outdoors & wildlife</Link>
          <Link to="/article/texas-wildlife-guide" className="underline decoration-border underline-offset-4 hover:text-foreground">Texas wildlife guide</Link>
        </div>
      </section>
    </Container>
  );
}
