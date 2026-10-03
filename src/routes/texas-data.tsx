import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { getTexasDatasets } from '@/data/texas-data-center';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export const description = 'Texas Defined’s maintained data and reference library: sourced Texas datasets, directories, comparison tables and downloadable records built for research, reporting, planning and citation.';
export const sportsComparisonPath = '/sports-venues/compare';
export const sportsComparisonCsvPath = '/sports-venues/compare.csv';
export const dataHubNavigationPaths = {
  counties: '/browse/counties',
  cities: '/browse/cities',
  explore: '/explore',
  resources: '/texas-resources',
  industries: '/texas-industries',
  countyGrowth: '/texas-data/county-growth',
  cityCountyRelationships: '/texas-data/city-county-relationships',
} as const;
export const countyHousingNextStop = ['County housing costs', '/texas-data/county-housing-costs', 'Compare official ACS median home values, gross rent, owner costs and household income across Texas counties.'] as const;

const referenceDatasets = [
  ['Texas Lighthouse Database', '/explore/lighthouses', '/texas-lighthouses.csv', null],
  ['Texas Painted Churches Directory', '/explore/painted-churches', '/painted-churches.csv', '/painted-churches.json'],
  ['Texas Fishing Species & Lake Reference Matrix', '/fishing/species', '/fishing-lake-species.csv', null],
  ['Texas UIL Football District Reference', '/texas-high-school-football-districts', '/texas-high-school-football-districts.csv', null],
] as const;

export const Route = createFileRoute('/texas-data')({
  loader: async () => ({ datasets: await getTexasDatasets() }),
  head: ({ loaderData }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, '/texas-data');
    const datasets = loaderData?.datasets ?? [];
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath: '/texas-data', title: 'Texas Data & Reference Library', description }),
      links: [canonicalLink(texasDefinedBrand, '/texas-data')],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': ['CollectionPage', 'DataCatalog'], '@id': `${pageUrl}#page`, url: pageUrl, name: 'Texas Data & Reference Library', description,
            publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` }, isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` },
            dataset: [
              ...datasets.map((dataset) => ({ '@type': 'Dataset', '@id': `${absoluteUrl(texasDefinedBrand, `/texas-data/${dataset.slug}`)}#dataset`, name: dataset.title, description: dataset.description, url: absoluteUrl(texasDefinedBrand, `/texas-data/${dataset.slug}`), dateModified: dataset.updated, temporalCoverage: String(dataset.year) })),
              ...referenceDatasets.map(([name, href, csvHref, jsonHref]) => ({
                '@type': 'Dataset',
                '@id': `${absoluteUrl(texasDefinedBrand, href)}#dataset`,
                name,
                url: absoluteUrl(texasDefinedBrand, href),
                spatialCoverage: { '@type': 'State', name: 'Texas' },
                distribution: [
                  { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: absoluteUrl(texasDefinedBrand, csvHref) },
                  ...(jsonHref ? [{ '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: absoluteUrl(texasDefinedBrand, jsonHref) }] : []),
                ],
              })),
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
