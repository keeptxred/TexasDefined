import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { getPropertyTaxDataCenter } from '@/data/property/texas-tax-rates.functions';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-property-tax-rate-history';
const description = 'Search Texas county, city, school-district and special-district property-tax rates, compare year-over-year changes, inspect historical records and download the latest finalized statewide dataset.';
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
const csvUrl = absoluteUrl(texasDefinedBrand, '/texas-property-tax-rate-history.csv');

export const Route = createFileRoute('/texas-property-tax-rate-history')({
  loader: async () => getPropertyTaxDataCenter(),
  head: ({ loaderData }) => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Property Tax Data Center — Rates, History & Comparisons', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Dataset',
          '@id': `${pageUrl}#dataset`,
          name: 'Texas Property Tax Data Center',
          description,
          url: pageUrl,
          spatialCoverage: { '@type': 'State', name: 'Texas' },
          temporalCoverage: loaderData ? `${loaderData.availableYears[0]}/${loaderData.latestYear}` : undefined,
          dateModified: loaderData?.generatedAt ?? undefined,
          creator: { '@type': 'Organization', name: 'TexasDefined', url: absoluteUrl(texasDefinedBrand, '/') },
          publisher: { '@type': 'Organization', name: 'TexasDefined', url: absoluteUrl(texasDefinedBrand, '/') },
          isBasedOn: loaderData?.sourcePage,
          citation: loaderData?.sourcePage,
          variableMeasured: ['Total property-tax rate', 'Maintenance and operations rate', 'Debt-service / I&S rate', 'Reported levy', 'Year-over-year fixed-rate change'],
          distribution: [{ '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: csvUrl }],
        },
        {
          '@type': 'WebApplication',
          '@id': `${pageUrl}#tool`,
          name: 'Texas Property Tax Rate History Explorer',
          description,
          url: pageUrl,
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Any',
          isPartOf: { '@id': `${pageUrl}#dataset` },
        },
      ],
    })],
  }),
});
