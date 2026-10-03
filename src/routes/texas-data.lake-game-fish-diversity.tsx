import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { LakeFishDiversityContent } from '@/components/data/LakeFishDiversityContent';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-data/lake-game-fish-diversity';
const description = 'TexasDefined compares the documented fishing-target mix across its verified Texas lake profiles and calculates targets per 1,000 surface acres.';

export const Route = createFileRoute('/texas-data/lake-game-fish-diversity')({
  loader: async () => {
    const { loadLakeFishDiversityServer } = await import('@/data/research/lake-game-fish-diversity.server');
    return loadLakeFishDiversityServer();
  },
  head: ({ loaderData }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: [
        ...buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Lake Game-Fish Diversity', description }),
        { name: 'robots', content: loaderData?.available ? 'index, follow, max-image-preview:large' : 'noindex, follow' },
      ],
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: loaderData?.available ? [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Dataset',
            '@id': `${pageUrl}#dataset`,
            name: 'Texas Lake Game-Fish Diversity',
            description,
            url: pageUrl,
            dateModified: loaderData.lastVerified ?? undefined,
            spatialCoverage: { '@type': 'State', name: 'Texas' },
            creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            isBasedOn: loaderData.sourceUrl,
            measurementTechnique: 'TexasDefined count of de-duplicated documented fishing targets per verified lake profile, plus target count divided by surface acres / 1,000.',
            variableMeasured: ['surface acreage', 'documented fishing-target count', 'fishing targets per 1,000 surface acres'],
            distribution: { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: absoluteUrl(texasDefinedBrand, '/texas-data/lake-game-fish-diversity.csv') },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
              { '@type': 'ListItem', position: 2, name: 'Texas Data', item: absoluteUrl(texasDefinedBrand, '/texas-data') },
              { '@type': 'ListItem', position: 3, name: 'Original Research', item: absoluteUrl(texasDefinedBrand, '/texas-data/research') },
              { '@type': 'ListItem', position: 4, name: 'Lake Game-Fish Diversity', item: pageUrl },
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
    <DepartmentHero current="Lake Game-Fish Diversity" eyebrow="TexasDefined Research" title="Which Texas lakes have the broadest documented fishing-target mix?" description={description} tone="surface" />
    <LakeFishDiversityContent data={data} />
  </>;
}
