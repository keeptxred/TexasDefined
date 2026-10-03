import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { PropertyTaxChangesContent } from '@/components/data/PropertyTaxChangesContent';
import { loadPropertyTaxChanges } from '@/data/research/property-tax-changes';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-data/property-tax-changes';
const description = 'TexasDefined independently compares finalized Texas Comptroller adopted property-tax rates year over year for counties, cities and school districts with clean matches.';

export const Route = createFileRoute('/texas-data/property-tax-changes')({
  loader: () => loadPropertyTaxChanges(),
  head: ({ loaderData }) => {
    const currentYear = loaderData?.currentYear ?? 2025;
    const previousYear = loaderData?.previousYear ?? currentYear - 1;
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: [
        ...buildMeta(texasDefinedBrand, { canonicalPath, title: `Texas Property-Tax Rate Changes — ${previousYear} to ${currentYear}`, description }),
        { name: 'robots', content: loaderData?.available ? 'index, follow, max-image-preview:large' : 'noindex, follow' },
      ],
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: loaderData?.available ? [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Dataset',
            '@id': `${pageUrl}#dataset`,
            name: `Texas Property-Tax Rate Changes — ${previousYear} to ${currentYear}`,
            description,
            url: pageUrl,
            dateModified: loaderData.generatedAt ?? undefined,
            temporalCoverage: `${previousYear}/${currentYear}`,
            spatialCoverage: { '@type': 'State', name: 'Texas' },
            creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            isBasedOn: loaderData.sourceUrl,
            measurementTechnique: 'TexasDefined year-over-year matching and calculation of adopted property-tax rate point and relative changes.',
            variableMeasured: ['prior adopted property-tax rate', 'current adopted property-tax rate', 'percentage-point change', 'relative percentage change'],
            distribution: { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: absoluteUrl(texasDefinedBrand, '/texas-data/property-tax-changes.csv') },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
              { '@type': 'ListItem', position: 2, name: 'Texas Data', item: absoluteUrl(texasDefinedBrand, '/texas-data') },
              { '@type': 'ListItem', position: 3, name: 'Original Research', item: absoluteUrl(texasDefinedBrand, '/texas-data/research') },
              { '@type': 'ListItem', position: 4, name: 'Property-tax rate changes', item: pageUrl },
            ],
          },
        ],
      })] : [],
    };
  },
  component: Page,
});

function Page() {
  const data = Route.useLoaderData();
  return <>
    <DepartmentHero current="Property-Tax Changes" eyebrow="TexasDefined Research" title={`Texas property-tax rate changes, ${data.previousYear}–${data.currentYear}`} description={description} tone="surface" />
    <PropertyTaxChangesContent data={data} />
  </>;
}
