import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { HighSchoolFootballRegionsContent } from '@/components/data/HighSchoolFootballRegionsContent';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { loadFootballRegionResearch } from '@/data/research/high-school-football-regions';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-data/high-school-football-regions';
const description = 'TexasDefined calculates how the complete 2026–28 UIL football alignment is distributed across Regions I–IV, classifications and six-man versus eleven-man programs.';

export const Route = createFileRoute('/texas-data/high-school-football-regions')({
  loader: () => loadFootballRegionResearch(),
  head: ({ loaderData }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: [
        ...buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas High-School Football Programs by UIL Region — 2026–28', description }),
        { name: 'robots', content: loaderData?.available ? 'index, follow, max-image-preview:large' : 'noindex, follow' },
      ],
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: loaderData?.available ? [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Dataset',
            '@id': `${pageUrl}#dataset`,
            name: 'Texas High-School Football Programs by UIL Region — 2026–28',
            description,
            url: pageUrl,
            temporalCoverage: '2026/2028',
            spatialCoverage: { '@type': 'State', name: 'Texas' },
            creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            isBasedOn: 'https://realignment.uiltexas.org/',
            measurementTechnique: 'TexasDefined grouping of the complete 2026–28 UIL football alignment into Regions I–IV by district number, with program counts by classification and football format.',
            variableMeasured: ['UIL region', 'classification', 'district', 'football program count', 'six-man or eleven-man format'],
            distribution: { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: absoluteUrl(texasDefinedBrand, '/texas-data/high-school-football-regions.csv') },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
              { '@type': 'ListItem', position: 2, name: 'Texas Data', item: absoluteUrl(texasDefinedBrand, '/texas-data') },
              { '@type': 'ListItem', position: 3, name: 'Original Research', item: absoluteUrl(texasDefinedBrand, '/texas-data/research') },
              { '@type': 'ListItem', position: 4, name: 'High-School Football Regions', item: pageUrl },
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
    <DepartmentHero current="Football by Region" eyebrow="TexasDefined Research" title="Texas high-school football programs by UIL region" description={description} tone="surface" />
    <HighSchoolFootballRegionsContent data={data} />
  </>;
}
