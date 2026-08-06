import { createFileRoute, Link } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { TEXAS_DATASETS } from '@/data/texas-data-center';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description = 'Useful Texas facts, local finders and practical guidance gathered in one place — whether you are researching a move, comparing costs or simply getting to know the state better.';

const nextStops = [
  ['Find your county', '/browse/counties', 'Explore all 254 counties and find trusted local information for each one.'],
  ['Find a city', '/browse/cities', 'Get to know major cities, regional centers and communities across the state.'],
  ['Places worth exploring', '/explore', 'Find parks, lakes, caverns, road trips and memorable corners of Texas.'],
  ['Property-tax help', '/decide/property-taxes', 'Estimate a property-tax bill and understand the numbers behind it.'],
  ['Money Made Clearer', '/decide/financial-tools', 'Compare household costs, homeownership expenses and moving decisions.'],
  ['Start Here', '/texas-resources', 'Find official contacts, local information and practical guides.'],
] as const;

const editorialLabel = (value: string) =>
  value
    .replaceAll('-', ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());

export const Route = createFileRoute('/texas-data')({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, '/texas-data');
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath: '/texas-data',
        title: 'Texas Facts and Figures',
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, '/texas-data')],
      scripts: [
        jsonLd({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': ['CollectionPage', 'DataCatalog'],
              '@id': `${pageUrl}#page`,
              url: pageUrl,
              name: 'Texas Facts and Figures',
              description,
              publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
              isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` },
              dataset: TEXAS_DATASETS.map((dataset) => ({
                '@type': 'Dataset',
                '@id': `${absoluteUrl(texasDefinedBrand, `/texas-data/${dataset.slug}`)}#dataset`,
                name: dataset.title,
                description: dataset.description,
                url: absoluteUrl(texasDefinedBrand, `/texas-data/${dataset.slug}`),
                dateModified: dataset.updated,
                temporalCoverage: String(dataset.year),
              })),
            },
            {
              '@type': 'BreadcrumbList',
              '@id': `${pageUrl}#breadcrumb`,
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Front page',
                  item: absoluteUrl(texasDefinedBrand, '/'),
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Texas Facts and Figures',
                  item: pageUrl,
                },
              ],
            },
          ],
        }),
      ],
    };
  },
  component: Page,
});

function Page() {
  return (
    <Container className="py-16 sm:py-24">
      <main className="mx-auto max-w-6xl">
        <p className="eyebrow text-primary">Texas at a glance</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl">The numbers behind everyday Texas</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p>

        <section className="mt-12" aria-labelledby="figures-heading">
          <h2 id="figures-heading" className="font-display text-3xl">A closer look at the numbers</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            Clear comparisons drawn from public sources, with review dates and links back to the original information.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TEXAS_DATASETS.map((dataset) => (
              <Link
                key={dataset.slug}
                to="/texas-data/$datasetSlug"
                params={{ datasetSlug: dataset.slug }}
                className="rounded-lg border border-border p-6 transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                <p className="eyebrow text-primary">{editorialLabel(dataset.category)} · {dataset.year}</p>
                <h3 className="mt-2 font-display text-2xl">{dataset.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{dataset.description}</p>
                <span className="mt-5 block text-sm font-medium text-primary">See the numbers →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="help-heading">
          <h2 id="help-heading" className="font-display text-3xl">Where to go next</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {nextStops.map(([title, to, copy]) => (
              <Link
                key={to}
                to={to}
                className="rounded-lg border border-border p-6 transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                <h3 className="font-display text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
                <span className="mt-5 block text-sm font-medium text-primary">Start here →</span>
              </Link>
            ))}
          </div>
        </section>

        <aside className="mt-10 rounded-lg border border-border p-5 text-sm leading-6 text-muted-foreground">
          We favor clear explanations and trusted public sources so you can use these pages as a starting point, not a substitute for official advice.
        </aside>
      </main>
    </Container>
  );
}
