import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export const description = 'Useful Texas facts, local finders and practical guidance gathered in one place — whether you are researching a move, comparing costs, planning sports travel or simply getting to know the state better.';
export const sportsComparisonPath = '/sports-venues/compare';
export const sportsComparisonCsvPath = '/sports-venues/compare.csv';


export const Route = createFileRoute('/texas-data')({
  loader: async () => {
    const { getTexasDatasets } = await import('@/data/texas-data-center');
    return { datasets: await getTexasDatasets() };
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
