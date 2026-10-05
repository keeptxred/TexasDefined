import { createFileRoute, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { getTexasDataset } from '@/data/texas-data-center';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const schoolDistrictSlug = 'school-district-tax-rates';

export const Route = createFileRoute('/texas-data/$datasetSlug')({
  loader: async ({ params }) => {
    const dataset = await getTexasDataset(params.datasetSlug);
    if (!dataset) throw notFound();
    const schoolRates = params.datasetSlug === schoolDistrictSlug
      ? await import('@/data/school-district-tax-rates').then(({ getSchoolDistrictTaxRateData }) => getSchoolDistrictTaxRateData())
      : null;
    return { ...dataset, schoolRates };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const canonicalPath = `/texas-data/${loaderData.slug}`;
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: loaderData.title,
        description: loaderData.description,
        robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Dataset',
            '@id': `${pageUrl}#dataset`,
            name: loaderData.title,
            description: loaderData.description,
            url: pageUrl,
            datePublished: loaderData.slug === schoolDistrictSlug ? '2026-07-30' : undefined,
            dateModified: loaderData.updated,
            temporalCoverage: loaderData.schoolRates ? `${loaderData.schoolRates.priorYear}/${loaderData.schoolRates.year}` : String(loaderData.year),
            spatialCoverage: { '@type': 'State', name: 'Texas' },
            keywords: [loaderData.category, 'Texas data', 'TexasDefined'],
            creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            isIncludedIn: { '@id': `${absoluteUrl(texasDefinedBrand, '/texas-data')}#page` },
            isBasedOn: loaderData.sourceUrl,
            citation: loaderData.sourceUrl,
            measurementTechnique: loaderData.methodology,
            variableMeasured: loaderData.rows.map((row) => ({
              '@type': 'PropertyValue',
              name: row.label,
              value: row.value,
              unitText: loaderData.unit,
              ...(row.note ? { description: row.note } : {}),
            })),
            ...(loaderData.schoolRates ? {
              distribution: [
                { '@type': 'DataDownload', encodingFormat: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', contentUrl: loaderData.schoolRates.sourceWorkbook },
                { '@type': 'DataDownload', encodingFormat: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', contentUrl: loaderData.schoolRates.priorWorkbook },
              ],
            } : {}),
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
              { '@type': 'ListItem', position: 2, name: 'Texas Facts', item: absoluteUrl(texasDefinedBrand, '/texas-data') },
              { '@type': 'ListItem', position: 3, name: loaderData.title, item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
});
