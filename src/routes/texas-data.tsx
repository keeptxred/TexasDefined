import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { getTexasDatasets } from '@/data/texas-data-center';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export const description = 'Explore sourced Texas population, housing, jobs, taxes, insurance and county statistics.';
export const sportsComparisonPath = '/sports-venues/compare';
export const sportsComparisonCsvPath = '/sports-venues/compare.csv';

export const featuredDataProducts = [
  {
    title: 'Texas County Population Growth',
    path: '/texas-data/county-growth',
    csvPath: '/texas-data/county-growth.csv',
    category: 'Population & migration',
    description: 'Compare Census Vintage 2025 population change across Texas counties from the 2020 estimates base through July 1, 2025.',
    source: 'U.S. Census Bureau',
    temporalCoverage: '2020/2025',
  },
  {
    title: 'Texas County Housing Costs',
    path: '/texas-data/county-housing-costs',
    csvPath: '/texas-data/county-housing-costs.csv',
    category: 'Housing & cost of living',
    description: 'Compare official ACS median home values, gross rent, monthly owner costs and household income across Texas counties.',
    source: 'U.S. Census Bureau American Community Survey',
    temporalCoverage: '2020/2024',
  },
  {
    title: 'Texas City-to-County Relationships',
    path: '/texas-data/city-county-relationships',
    csvPath: '/texas-data/city-county-relationships.csv',
    category: 'Cities & counties',
    description: 'Browse the maintained Texas Defined city directory mapped to counties and regions, with direct paths into local guides.',
    source: 'Texas Defined maintained geography directory',
    temporalCoverage: 'Current',
  },
  {
    title: 'Texas Sports Venue Comparison',
    path: sportsComparisonPath,
    csvPath: sportsComparisonCsvPath,
    category: 'Sports & places',
    description: 'Compare verified Texas stadiums, arenas, ballparks, racetracks and other sports destinations by location, venue type and available reference fields.',
    source: 'Texas Defined verified venue profiles',
    temporalCoverage: 'Current',
  },
] as const;

export const nextStops = [
  ['Texas homeowners premiums vs. coverage', '/texas-data/research/texas-homeowners-premiums-vs-coverage', 'Explore Texas homeowners insurance premiums and coverage.'],
  ['County housing costs', '/texas-data/county-housing-costs', 'Compare ACS home values, rent, costs and income.'],
  ['Find your county', '/browse/counties', 'Explore all 254 counties and local guides.'],
  ['Find a city', '/browse/cities', 'Browse Texas cities and communities.'],
  ['Plan a move to Texas', '/moving-to-texas', 'Explore relocation and metro guides.'],
  ['Texas industries', '/texas-industries', 'Explore Texas industry guides.'],
] as const;

export const Route = createFileRoute('/texas-data')({
  loader: async () => ({ datasets: await getTexasDatasets() }),
  head: ({ loaderData }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, '/texas-data');
    const datasets = loaderData?.datasets ?? [];
    const catalogDatasets = [
      ...datasets.map((dataset) => ({
        '@type': 'Dataset',
        '@id': `${absoluteUrl(texasDefinedBrand, `/texas-data/${dataset.slug}`)}#dataset`,
        name: dataset.title,
        description: dataset.description,
        url: absoluteUrl(texasDefinedBrand, `/texas-data/${dataset.slug}`),
        dateModified: dataset.updated,
        temporalCoverage: String(dataset.year),
        creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
        isBasedOn: dataset.sourceUrl,
      })),
      ...featuredDataProducts.filter((dataset) => dataset.path !== sportsComparisonPath).map((dataset) => ({
        '@type': 'Dataset',
        '@id': `${absoluteUrl(texasDefinedBrand, dataset.path)}#dataset`,
        name: dataset.title,
        description: dataset.description,
        url: absoluteUrl(texasDefinedBrand, dataset.path),
        temporalCoverage: dataset.temporalCoverage,
        creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
        distribution: {
          '@type': 'DataDownload',
          encodingFormat: 'text/csv',
          contentUrl: absoluteUrl(texasDefinedBrand, dataset.csvPath),
        },
      })),
      { '@type': 'Dataset', name: 'Texas Sports Venue Comparison', url: absoluteUrl(texasDefinedBrand, sportsComparisonPath), distribution: { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: absoluteUrl(texasDefinedBrand, sportsComparisonCsvPath) } },
    ];
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath: '/texas-data',
        title: 'Texas Data & Statistics: Population, Housing, Jobs & Counties',
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, '/texas-data')],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': ['CollectionPage', 'DataCatalog'],
            '@id': `${pageUrl}#page`,
            url: pageUrl,
            name: 'Texas Data & Statistics',
            description,
            publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` },
            dataset: catalogDatasets,
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
      })],
    };
  },
});
