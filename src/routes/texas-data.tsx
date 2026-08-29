import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export const description = 'Useful Texas facts, local finders and practical guidance gathered in one place — whether you are researching a move, comparing costs, planning sports travel or simply getting to know the state better.';
export const sportsComparisonPath = '/sports-venues/compare';
export const sportsComparisonCsvPath = '/sports-venues/compare.csv';

export const nextStops = [
  ['Plan a move to Texas', '/moving-to-texas', 'Use the relocation research center for metro guides, city matching, address-level source checks, moving tasks and cost tools.'],
  ['Find your county', '/browse/counties', 'Explore all 254 counties and find trusted local information for each one.'],
  ['County population growth', '/texas-data/county-growth', 'Compare Census Vintage 2025 county population change from the 2020 estimates base to July 1, 2025.'],
  ['County housing costs', '/texas-data/county-housing-costs', 'Compare official ACS median home values, gross rent, owner costs and household income across Texas counties.'],
  ['Compare sports venues', sportsComparisonPath, 'Compare 84 verified Texas sports venue guides by location, type, capacity and opening information where available.'],
  ['Find a city', '/browse/cities', 'Get to know major cities, regional centers and communities across the state.'],
  ['City-to-county relationships', '/texas-data/city-county-relationships', 'See the current Texas Defined city directory mapped to counties and regions.'],
  ['Explore Texas', '/explore', 'Find parks, lakes, caverns, road trips and memorable corners of Texas.'],
  ['Property-tax help', '/decide/property-taxes', 'Estimate a property-tax bill and understand the numbers behind it.'],
  ['Money & Property', '/decide/financial-tools', 'Compare household costs, homeownership expenses and moving decisions.'],
  ['Texas resources', '/texas-resources', 'Find official contacts, local information and practical guides.'],
] as const;

export const Route = createFileRoute('/texas-data')({
  loader: async () => {
    const { TEXAS_DATASETS } = await import('@/data/texas-data-center');
    return { datasets: TEXAS_DATASETS };
  },
  head: ({ loaderData }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, '/texas-data');
    const datasets = loaderData?.datasets ?? [];
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath: '/texas-data', title: 'Texas Facts and Figures', description }),
      links: [canonicalLink(texasDefinedBrand, '/texas-data')],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': ['CollectionPage', 'DataCatalog'], '@id': `${pageUrl}#page`, url: pageUrl, name: 'Texas Facts and Figures', description,
            publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` }, isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` },
            dataset: [
              ...datasets.map((dataset) => ({ '@type': 'Dataset', '@id': `${absoluteUrl(texasDefinedBrand, `/texas-data/${dataset.slug}`)}#dataset`, name: dataset.title, description: dataset.description, url: absoluteUrl(texasDefinedBrand, `/texas-data/${dataset.slug}`), dateModified: dataset.updated, temporalCoverage: String(dataset.year) })),
              {
                '@type': 'Dataset',
                '@id': `${absoluteUrl(texasDefinedBrand, sportsComparisonPath)}#dataset`,
                name: 'Texas Sports Venue Comparison',
                description: 'A maintained comparison of 84 verified Texas sports venue guides by location, venue type, capacity and opening information where available.',
                url: absoluteUrl(texasDefinedBrand, sportsComparisonPath),
                spatialCoverage: { '@type': 'State', name: 'Texas' },
                distribution: {
                  '@type': 'DataDownload',
                  encodingFormat: 'text/csv',
                  contentUrl: absoluteUrl(texasDefinedBrand, sportsComparisonCsvPath),
                },
              },
            ],
          },
          { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') }, { '@type': 'ListItem', position: 2, name: 'Texas Data', item: pageUrl }] },
        ],
      })],
    };
  },
});
