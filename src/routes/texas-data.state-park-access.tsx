import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { StateParkAccessContent } from '@/components/data/StateParkAccessContent';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { loadStateParkAccess } from '@/data/research/state-park-access';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-data/state-park-access';
const description = 'TexasDefined calculates the straight-line distance from each Texas county Census internal point to the nearest verified TPWD state-park profile.';

export const Route = createFileRoute('/texas-data/state-park-access')({
  loader: () => loadStateParkAccess(),
  head: ({ loaderData }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: [
        ...buildMeta(texasDefinedBrand, { canonicalPath, title: 'How Far Is Each Texas County From a State Park?', description }),
        { name: 'robots', content: loaderData?.available ? 'index, follow, max-image-preview:large' : 'noindex, follow' },
      ],
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: loaderData?.available ? [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Dataset',
            '@id': `${pageUrl}#dataset`,
            name: 'Texas County-to-State-Park Access Proxy',
            description,
            url: pageUrl,
            dateModified: loaderData.lastVerified ?? undefined,
            spatialCoverage: { '@type': 'State', name: 'Texas' },
            creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            isBasedOn: loaderData.sourceUrls,
            measurementTechnique: 'Haversine straight-line distance from each Census county internal point to the nearest compared Texas Parks & Wildlife state park profile.',
            variableMeasured: ['county reference latitude', 'county reference longitude', 'nearest state park', 'straight-line distance in miles'],
            distribution: { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: absoluteUrl(texasDefinedBrand, '/texas-data/state-park-access.csv') },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
              { '@type': 'ListItem', position: 2, name: 'Texas Data', item: absoluteUrl(texasDefinedBrand, '/texas-data') },
              { '@type': 'ListItem', position: 3, name: 'Original Research', item: absoluteUrl(texasDefinedBrand, '/texas-data/research') },
              { '@type': 'ListItem', position: 4, name: 'State Park Access', item: pageUrl },
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
    <DepartmentHero current="State Park Access" eyebrow="TexasDefined Research" title="How far is each Texas county from a state park?" description={description} tone="surface" />
    <StateParkAccessContent data={data} />
  </>;
}
