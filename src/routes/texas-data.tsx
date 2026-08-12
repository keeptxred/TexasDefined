import { createFileRoute, Link } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';
import { TEXAS_DATASETS } from '@/data/texas-data-center';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description = 'Useful Texas facts, local finders and practical guidance gathered in one place — whether you are researching a move, comparing costs or simply getting to know the state better.';

const nextStops = [
  ['Find your county', '/browse/counties', 'Explore all 254 counties and find trusted local information for each one.'],
  ['Find a city', '/browse/cities', 'Get to know major cities, regional centers and communities across the state.'],
  ['City-to-county relationships', '/texas-data/city-county-relationships', 'See the current Texas Defined city directory mapped to counties and regions.'],
  ['Explore Texas', '/explore', 'Find parks, lakes, caverns, road trips and memorable corners of Texas.'],
  ['Property-tax help', '/decide/property-taxes', 'Estimate a property-tax bill and understand the numbers behind it.'],
  ['Money & Property', '/decide/financial-tools', 'Compare household costs, homeownership expenses and moving decisions.'],
  ['Texas resources', '/texas-resources', 'Find official contacts, local information and practical guides.'],
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
                { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
                { '@type': 'ListItem', position: 2, name: 'Texas Data', item: pageUrl },
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
    <>
      <DepartmentHero current="Texas Data" eyebrow="Texas at a glance" title="The numbers behind everyday Texas" description={description} />

      <Container className="py-12 sm:py-16">
        <aside className="max-w-3xl border-y border-border py-5 text-sm leading-7 text-muted-foreground">
          <p className="eyebrow text-primary">About the data</p>
          <p className="mt-3">Public data is most useful when it has context. Each dataset includes source notes, review dates and a path back to the original information.</p>
        </aside>

        <section className="py-12" aria-labelledby="figures-heading">
          <div className="border-b border-border pb-4">
            <p className="eyebrow text-primary">The data desk</p>
            <h2 id="figures-heading" className="mt-2 font-display text-4xl">A closer look at the numbers</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {TEXAS_DATASETS.map((dataset, index) => (
              <Link
                key={dataset.slug}
                to="/texas-data/$datasetSlug"
                params={{ datasetSlug: dataset.slug }}
                className={`group border-b border-border py-7 sm:px-5 ${index % 3 !== 0 ? 'lg:border-l lg:border-border' : ''}`}
              >
                <p className="eyebrow text-primary">{editorialLabel(dataset.category)} · {dataset.year}</p>
                <h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">{dataset.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{dataset.description}</p>
                <span className="mt-5 block text-sm font-semibold">Open the data brief →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-border py-12" aria-labelledby="help-heading">
          <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
            <div>
              <p className="eyebrow text-primary">Use the numbers</p>
              <h2 id="help-heading" className="mt-2 font-display text-4xl">Where to go next</h2>
            </div>
            <div className="grid sm:grid-cols-2">
              {nextStops.map(([title, to, copy]) => (
                <Link key={to} to={to} className="group border-t border-border py-5 sm:px-5">
                  <h3 className="font-display text-2xl group-hover:text-primary">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
                  <span className="mt-3 block text-sm font-semibold">Continue →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <aside className="border-y border-border py-5 text-sm leading-6 text-muted-foreground">
          Texas Defined uses public information as a starting point for understanding the state. For official decisions, deadlines or eligibility, follow the source links to the responsible agency.
        </aside>
      </Container>
    </>
  );
}