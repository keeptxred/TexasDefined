import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const PropertyTaxChangesContent = lazy(() => import('@/components/data/PropertyTaxChangesContent'));
const canonicalPath = '/texas-data/property-tax-changes';
const csvPath = '/texas-data/property-tax-changes.csv';
const description = 'TexasDefined compares matched, finalized Texas county, city and school-district adopted property-tax rates across the two latest completed Comptroller years.';

export const Route = createFileRoute('/texas-data/property-tax-changes')({
  loader: async () => {
    const { loadTexasPropertyTaxChanges } = await import('@/data/property/property-tax-change-research.server');
    return loadTexasPropertyTaxChanges();
  },
  head: ({ loaderData }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const title = loaderData ? `Texas Property-Tax Rate Changes, ${loaderData.previousYear}–${loaderData.currentYear}` : 'Texas Property-Tax Rate Changes';
    return {
      meta: [
        ...buildMeta(texasDefinedBrand, { canonicalPath, title, description }),
        { name: 'robots', content: loaderData?.available ? 'index, follow, max-image-preview:large' : 'noindex, follow' },
      ],
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: loaderData?.available ? [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Dataset', '@id': `${pageUrl}#dataset`, name: title, description, url: pageUrl,
            dateModified: '2026-10-03', temporalCoverage: `${loaderData.previousYear}/${loaderData.currentYear}`,
            spatialCoverage: { '@type': 'State', name: 'Texas' },
            creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` }, publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            isBasedOn: loaderData.sourceUrl,
            measurementTechnique: 'Match reported-final county, city and school-district taxing units across the two latest finalized years; calculate adopted total-rate point and percent changes.',
            variableMeasured: ['prior-year adopted total tax rate', 'current-year adopted total tax rate', 'rate-point change', 'percent change'],
            distribution: { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: absoluteUrl(texasDefinedBrand, csvPath) },
          },
          { '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
            { '@type': 'ListItem', position: 2, name: 'Texas Data', item: absoluteUrl(texasDefinedBrand, '/texas-data') },
            { '@type': 'ListItem', position: 3, name: 'Original Research', item: absoluteUrl(texasDefinedBrand, '/texas-data/research') },
            { '@type': 'ListItem', position: 4, name: 'Property-tax rate changes', item: pageUrl },
          ] },
        ],
      })] : [],
    };
  },
  component: Page,
});

function Page() {
  const data = Route.useLoaderData();
  return <>
    <DepartmentHero current="Property-Tax Changes" eyebrow="TexasDefined Research" title={`How did Texas local property-tax rates change from ${data.previousYear} to ${data.currentYear}?`} description={description} tone="surface" />
    <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-10 text-sm text-muted-foreground" role="status">Calculating adopted-rate changes…</div>}><PropertyTaxChangesContent data={data} /></Suspense>
  </>;
}
