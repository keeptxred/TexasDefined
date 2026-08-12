import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const CountyGrowthContent = lazy(() => import('@/components/data/CountyGrowthContent'));
const canonicalPath = '/texas-data/county-growth';
const description = 'Compare population change across Texas counties from the U.S. Census Bureau Vintage 2025 estimates base to the July 1, 2025 population estimate.';

export const Route = createFileRoute('/texas-data/county-growth')({
  loader: async () => {
    const { loadTexasCountyGrowth } = await import('@/data/census-county-growth');
    return loadTexasCountyGrowth();
  },
  head: ({ loaderData }) => ({
    meta: [
      ...buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas County Population Growth — 2020 to 2025', description }),
      { name: 'robots', content: loaderData?.available ? 'index, follow, max-image-preview:large' : 'noindex, follow' },
    ],
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: loaderData?.available ? [jsonLd({
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'Texas County Population Growth — 2020 to 2025',
      description,
      url: absoluteUrl(texasDefinedBrand, canonicalPath),
      dateModified: '2026-03-17',
      temporalCoverage: '2020/2025',
      creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
      isBasedOn: loaderData.sourceFileUrl,
      variableMeasured: ['2020 population estimates base', '2025 population estimate', 'population change', 'population change percent'],
    })] : [],
  }),
  component: Page,
});

function Page() {
  const data = Route.useLoaderData();
  return <>
    <DepartmentHero current="County Growth" eyebrow="Texas Data" title="Texas county population growth, 2020–2025" description={description} tone="surface" />
    <Suspense fallback={null}><CountyGrowthContent data={data} /></Suspense>
  </>;
}
