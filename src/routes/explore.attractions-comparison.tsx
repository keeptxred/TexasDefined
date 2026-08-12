import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { ExploreDestinationComparison } from '@/components/explore/ExploreDestinationComparison';
import { Container } from '@/components/layout/Container';
import { destinationsQuery } from '@/data/queries';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/explore/attractions-comparison';
const description = 'Compare the maintained Texas Defined destination catalog by category, region, nearby town, season guidance, highlights, planning notes and official source.';

export const Route = createFileRoute('/explore/attractions-comparison')({
  loader: ({ context }) => context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 })),
  head: ({ loaderData }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const destinations = loaderData ?? [];
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Attractions Comparison | Texas Defined', description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            '@id': `${pageUrl}#page`,
            url: pageUrl,
            name: 'Texas Attractions Comparison',
            description,
            mainEntity: { '@id': `${pageUrl}#destinations` },
          },
          {
            '@type': 'ItemList',
            '@id': `${pageUrl}#destinations`,
            numberOfItems: destinations.length,
            itemListElement: destinations.map((destination, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: destination.name,
              url: absoluteUrl(texasDefinedBrand, `/destination/${destination.slug}`),
            })),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
              { '@type': 'ListItem', position: 2, name: 'Explore Texas', item: absoluteUrl(texasDefinedBrand, '/explore') },
              { '@type': 'ListItem', position: 3, name: 'Attractions comparison', item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: AttractionsComparisonPage,
});

function AttractionsComparisonPage() {
  const destinations = Route.useLoaderData();
  return (
    <>
      <Container className="pb-10 pt-12 sm:pt-16">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground"><Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/explore">Explore</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">Attractions comparison</span></nav>
        <header className="py-10"><p className="eyebrow text-primary">Texas destination catalog</p><h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Compare Texas attractions and destinations</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Compare the destinations currently maintained in Texas Defined. This is a structured research view of the catalog, not a claim to include every attraction in Texas and not a popularity ranking.</p></header>
      </Container>
      <ExploreDestinationComparison destinations={destinations} kind="attractions" />
    </>
  );
}
