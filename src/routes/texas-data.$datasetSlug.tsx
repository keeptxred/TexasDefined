import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { getTexasDataset } from '@/data/texas-data-center';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const DatasetPage = lazy(() => import('@/components/texas-data/TexasDataDatasetPage').then((module) => ({ default: module.TexasDataDatasetPage })));
const schoolDistrictSlug = 'school-district-tax-rates';
const schoolPublishedDate = '2026-07-30';

export const Route = createFileRoute('/texas-data/$datasetSlug')({
  loader: async ({ params }) => {
    const dataset = await getTexasDataset(params.datasetSlug);
    if (!dataset) throw notFound();
    const schoolRates = params.datasetSlug === schoolDistrictSlug
      ? await import('@/data/school-district-tax-rates').then(({ getSchoolDistrictTaxRateData }) => getSchoolDistrictTaxRateData())
      : null;
    return { dataset, schoolRates };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { dataset, schoolRates } = loaderData;
    const canonicalPath = `/texas-data/${dataset.slug}`;
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const isSchoolRates = dataset.slug === schoolDistrictSlug && schoolRates;
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: dataset.title,
        description: dataset.description,
        robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Dataset',
            '@id': `${pageUrl}#dataset`,
            name: dataset.title,
            description: dataset.description,
            url: pageUrl,
            ...(isSchoolRates ? { datePublished: schoolPublishedDate } : {}),
            dateModified: dataset.updated,
            temporalCoverage: isSchoolRates ? `${schoolRates.priorYear}/${schoolRates.year}` : String(dataset.year),
            spatialCoverage: { '@type': 'State', name: 'Texas' },
            keywords: [dataset.category, 'Texas data', 'TexasDefined'],
            creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            isIncludedIn: { '@id': `${absoluteUrl(texasDefinedBrand, '/texas-data')}#page` },
            isBasedOn: isSchoolRates ? schoolRates.sourceWorkbook : dataset.sourceUrl,
            citation: isSchoolRates ? schoolRates.sourcePage : dataset.sourceUrl,
            measurementTechnique: dataset.methodology,
            variableMeasured: isSchoolRates ? [
              { '@type': 'PropertyValue', name: `${schoolRates.year} total adopted tax rate`, unitText: 'dollars per $100 taxable value' },
              { '@type': 'PropertyValue', name: `${schoolRates.priorYear} total adopted tax rate`, unitText: 'dollars per $100 taxable value' },
              { '@type': 'PropertyValue', name: 'Maintenance and Operations rate', unitText: 'dollars per $100 taxable value' },
              { '@type': 'PropertyValue', name: 'Interest and Sinking rate', unitText: 'dollars per $100 taxable value' },
            ] : dataset.rows.map((row) => ({
              '@type': 'PropertyValue',
              name: row.label,
              value: row.value,
              unitText: dataset.unit,
              ...(row.note ? { description: row.note } : {}),
            })),
            ...(isSchoolRates ? { distribution: [
              { '@type': 'DataDownload', encodingFormat: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', contentUrl: schoolRates.sourceWorkbook },
              { '@type': 'DataDownload', encodingFormat: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', contentUrl: schoolRates.priorWorkbook },
            ] } : {}),
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
              { '@type': 'ListItem', position: 2, name: 'Texas Facts', item: absoluteUrl(texasDefinedBrand, '/texas-data') },
              { '@type': 'ListItem', position: 3, name: dataset.title, item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  notFoundComponent: () => (
    <Container className="py-24">
      <p className="eyebrow text-primary">Texas data</p>
      <h1 className="mt-3 font-display text-4xl">We could not find that data brief</h1>
      <p className="mt-4 text-sm text-muted-foreground"><Link to="/texas-data" className="font-semibold underline underline-offset-4">Return to Texas Facts and Figures.</Link></p>
    </Container>
  ),
  component: Page,
});

function Page() {
  const loaderData = Route.useLoaderData();
  return <Suspense fallback={<Container className="py-24"><p className="text-sm text-muted-foreground">Loading Texas data…</p></Container>}><DatasetPage {...loaderData} /></Suspense>;
}
