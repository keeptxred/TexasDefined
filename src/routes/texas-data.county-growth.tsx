import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const CountyGrowthContent = lazy(() => import('@/components/data/CountyGrowthContent'));
const canonicalPath = '/texas-data/county-growth';
const description = 'TexasDefined calculates population change across every Texas county from the U.S. Census Bureau Vintage 2025 estimates base to the July 1, 2025 population estimate.';

export const Route = createFileRoute('/texas-data/county-growth')({
  loader: async () => {
    const { loadTexasCountyGrowth } = await import('@/data/census-county-growth');
    return loadTexasCountyGrowth();
  },
  head: ({ loaderData }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: [
        ...buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas County Population Growth — 2020 to 2025', description }),
        { name: 'robots', content: loaderData?.available ? 'index, follow, max-image-preview:large' : 'noindex, follow' },
      ],
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: loaderData?.available ? [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Dataset',
            '@id': `${pageUrl}#dataset`,
            name: 'Texas County Population Growth — 2020 to 2025',
            description,
            url: pageUrl,
            dateModified: '2026-10-03',
            temporalCoverage: '2020/2025',
            spatialCoverage: { '@type': 'State', name: 'Texas' },
            creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            isBasedOn: loaderData.sourceFileUrl,
            measurementTechnique: 'TexasDefined subtracts ESTIMATESBASE2020 from POPESTIMATE2025 for numeric change and divides that change by ESTIMATESBASE2020 for percentage change.',
            variableMeasured: ['2020 population estimates base', '2025 population estimate', 'population change', 'population change percent'],
            distribution: {
              '@type': 'DataDownload',
              encodingFormat: 'text/csv',
              contentUrl: absoluteUrl(texasDefinedBrand, '/texas-data/county-growth.csv'),
            },
          },
          { '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
            { '@type': 'ListItem', position: 2, name: 'Texas Data', item: absoluteUrl(texasDefinedBrand, '/texas-data') },
            { '@type': 'ListItem', position: 3, name: 'Original Research', item: absoluteUrl(texasDefinedBrand, '/texas-data/research') },
            { '@type': 'ListItem', position: 4, name: 'County population growth', item: pageUrl },
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
    <DepartmentHero current="County Growth" eyebrow="TexasDefined Research" title="Which Texas counties gained population fastest from 2020 to 2025?" description={description} tone="surface" />
    <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-10 text-sm text-muted-foreground" role="status">Loading county growth data…</div>}><CountyGrowthContent data={data} /></Suspense>
  </>;
}
