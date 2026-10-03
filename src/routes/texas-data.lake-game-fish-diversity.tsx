import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const LakeGameFishDiversityContent = lazy(() => import('@/components/data/LakeGameFishDiversityContent'));
const canonicalPath = '/texas-data/lake-game-fish-diversity';
const csvPath = '/texas-data/lake-game-fish-diversity.csv';
const description = 'TexasDefined calculates which maintained Texas lake profiles have the widest documented mix of game-fish targets, with a secondary comparison normalized by lake surface area.';

export const Route = createFileRoute('/texas-data/lake-game-fish-diversity')({
  loader: async () => {
    const { loadLakeGameFishDiversity } = await import('@/data/lake-game-fish-diversity');
    return loadLakeGameFishDiversity();
  },
  head: ({ loaderData }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Lakes With the Most Documented Game-Fish Targets', description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Dataset',
            '@id': `${pageUrl}#dataset`,
            name: 'Texas Lakes With the Most Documented Game-Fish Targets',
            description,
            url: pageUrl,
            dateModified: '2026-10-03',
            spatialCoverage: { '@type': 'State', name: 'Texas' },
            creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            isBasedOn: 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/',
            measurementTechnique: 'Count unique verified TexasDefined lake-to-fish relationships; divide by surface acres and multiply by 1,000 for the secondary normalized measure.',
            variableMeasured: ['documented fishing targets', 'surface acres', 'targets per 1,000 acres'],
            distribution: { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: absoluteUrl(texasDefinedBrand, csvPath) },
            ...(loaderData ? { size: loaderData.rows.length } : {}),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
              { '@type': 'ListItem', position: 2, name: 'Texas Data', item: absoluteUrl(texasDefinedBrand, '/texas-data') },
              { '@type': 'ListItem', position: 3, name: 'Original Research', item: absoluteUrl(texasDefinedBrand, '/texas-data/research') },
              { '@type': 'ListItem', position: 4, name: 'Lake game-fish diversity', item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: Page,
});

function Page() {
  const data = Route.useLoaderData();
  return <>
    <DepartmentHero current="Lake Fish Diversity" eyebrow="TexasDefined Research" title="Which Texas lakes have the widest documented mix of game-fish targets?" description={description} tone="surface" />
    <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-10 text-sm text-muted-foreground" role="status">Calculating lake diversity…</div>}><LakeGameFishDiversityContent data={data} /></Suspense>
  </>;
}
