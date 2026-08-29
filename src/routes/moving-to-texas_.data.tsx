import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { getTexasDatasets, type TexasDataset } from '@/data/texas-data-center';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/moving-to-texas/data';
export const description = 'A source-backed Texas relocation data center for migration, jobs, homeowners insurance, traffic, county research and the practical numbers behind a move to Texas.';
const relocationDatasetSlugs = [
  'texas-population-and-migration-2025',
  'texas-population-and-migration-2024',
  'where-new-texans-came-from-2024',
  'texas-homeowners-premium-history',
  'texas-metro-payrolls-june-2026',
  'texas-traffic-monitoring-coverage',
] as const;

export const Route = createFileRoute('/moving-to-texas/data')({
  loader: async () => {
    const [{ RELOCATION_METROS, RELOCATION_SOURCES, RELOCATION_SOURCE_VERIFIED }, texasDatasets] = await Promise.all([
      import('@/data/relocation-authority'),
      getTexasDatasets(),
    ]);
    const relocationDatasets = relocationDatasetSlugs
      .map((slug) => texasDatasets.find((dataset) => dataset.slug === slug))
      .filter((dataset): dataset is TexasDataset => Boolean(dataset));
    return {
      relocationDatasets,
      relocationMetros: RELOCATION_METROS,
      relocationSources: RELOCATION_SOURCES,
      relocationSourceVerified: RELOCATION_SOURCE_VERIFIED,
    };
  },
  head: ({ loaderData }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const relocationDatasets = loaderData?.relocationDatasets ?? [];
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: 'Texas Relocation Data Center: Migration, Jobs, Insurance & More',
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': ['CollectionPage', 'DataCatalog'],
            '@id': `${pageUrl}#page`,
            url: pageUrl,
            name: 'Texas Relocation Data Center',
            description,
            publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` },
            dataset: relocationDatasets.map((dataset) => ({
              '@type': 'Dataset',
              '@id': `${absoluteUrl(texasDefinedBrand, `/texas-data/${dataset.slug}`)}#dataset`,
              name: dataset.title,
              description: dataset.description,
              url: absoluteUrl(texasDefinedBrand, `/texas-data/${dataset.slug}`),
              dateModified: dataset.updated,
              temporalCoverage: String(dataset.year),
              creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            })),
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
              { '@type': 'ListItem', position: 2, name: 'Moving to Texas', item: absoluteUrl(texasDefinedBrand, '/moving-to-texas') },
              { '@type': 'ListItem', position: 3, name: 'Relocation Data Center', item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
});
