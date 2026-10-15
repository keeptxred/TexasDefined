import { createFileRoute, Link, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
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
    const liveSchoolYear = loaderData.schoolRates?.year;
    const liveSchoolImported = loaderData.schoolRates?.generatedAt?.slice(0, 10);
    const title = liveSchoolYear ? `Texas School District Property Tax Rates — ${liveSchoolYear}` : loaderData.title;
    const description = liveSchoolYear
      ? `Search statewide ${liveSchoolYear} school-district adopted property-tax rates, compare ${loaderData.schoolRates?.priorYear}, and review M&O and I&S components.`
      : loaderData.description;
    const dateModified = liveSchoolImported && liveSchoolImported > loaderData.updated ? liveSchoolImported : loaderData.updated;
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title,
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Dataset',
            '@id': `${pageUrl}#dataset`,
            name: title,
            description,
            url: pageUrl,
            dateModified,
            temporalCoverage: String(liveSchoolYear ?? loaderData.year),
            spatialCoverage: { '@type': 'State', name: 'Texas' },
            keywords: [loaderData.category, 'Texas data', 'TexasDefined'],
            creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            isIncludedIn: { '@id': `${absoluteUrl(texasDefinedBrand, '/texas-data')}#page` },
            isBasedOn: loaderData.sourceUrl,
            citation: loaderData.sourceUrl,
            measurementTechnique: loaderData.methodology,
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
              { '@type': 'ListItem', position: 3, name: title, item: pageUrl },
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
});

