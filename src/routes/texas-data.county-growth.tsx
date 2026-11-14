import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const CountyGrowthContent = lazy(() => import('@/components/data/CountyGrowthContent'));
const canonicalPath = '/texas-data/county-growth';
const description = 'Compare the latest verified annual U.S. Census Texas county population estimates with the official 2020 estimates base.';

export const Route = createFileRoute('/texas-data/county-growth')({
  loader: async () => {
    const { loadTexasCountyGrowth } = await import('@/data/census-county-growth');
    return loadTexasCountyGrowth();
  },
  head: ({ loaderData }) => ({
    meta: [
      ...buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas County Population Growth — 2020 to ' + (loaderData?.vintage ?? 'latest'), description }),
      { name: 'robots', content: loaderData?.available ? 'index, follow, max-image-preview:large' : 'noindex, follow' },
    ],
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: loaderData?.available ? [jsonLd({
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'Texas County Population Growth — 2020 to ' + loaderData.vintage,
      description,
      url: absoluteUrl(texasDefinedBrand, canonicalPath),
      dateModified: loaderData.verifiedAt,
      temporalCoverage: '2020/' + loaderData.vintage,
      creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
      isBasedOn: loaderData.sourceFileUrl,
      variableMeasured: ['2020 population estimates base', String(loaderData.vintage) + ' population estimate', 'population change', 'population change percent'],
      distribution: {
        '@type': 'DataDownload',
        encodingFormat: 'text/csv',
        contentUrl: absoluteUrl(texasDefinedBrand, '/texas-data/county-growth.csv'),
      },
    })] : [],
  }),
  component: Page,
});

function Page() {
  const data = Route.useLoaderData();
  return <>
    <DepartmentHero current="County Growth" eyebrow="Texas Data" title={'Texas county population growth, 2020–' + data.vintage} description={description} tone="surface" />
    <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-10 text-sm text-muted-foreground" role="status">Loading county growth data…</div>}><CountyGrowthContent data={data} /></Suspense>
  </>;
}
