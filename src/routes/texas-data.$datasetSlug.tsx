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
            dateModified: loaderData.updated,
            spatialCoverage: { '@type': 'State', name: 'Texas' },
            keywords: [loaderData.category, 'Texas data', 'TexasDefined'],
            isBasedOn: loaderData.sourceUrl,
            ...(loaderData.schoolRates ? {
              distribution: {
                '@type': 'DataDownload',
                encodingFormat: 'text/csv',
                contentUrl: absoluteUrl(texasDefinedBrand, '/texas-data/school-district-tax-rates.csv'),
              },
            } : {}),
            variableMeasured: loaderData.schoolRates ? [
              { '@type': 'PropertyValue', name: 'Adopted total school-district property-tax rate', unitText: 'dollars per $100 taxable value' },
              { '@type': 'PropertyValue', name: 'Maintenance and operations (M&O) rate', unitText: 'dollars per $100 taxable value' },
              { '@type': 'PropertyValue', name: 'Interest and sinking (I&S) rate', unitText: 'dollars per $100 taxable value' },
            ] : loaderData.rows.map((row) => ({
              '@type': 'PropertyValue',
              name: row.label,
              value: row.value,
              unitText: loaderData.unit,
              ...(row.note ? { description: row.note } : {}),
            })),
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
