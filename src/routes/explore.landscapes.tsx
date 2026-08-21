import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { getTexasLandscapeHub } from '@/data/texas-landscapes.functions';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const TexasLandscapesHubPage = lazy(() => import('@/components/editorial/TexasLandscapesHubPage').then((module) => ({ default: module.TexasLandscapesHubPage })));

const description = 'A field guide to the landscapes that define Texas: Hill Country limestone, Piney Woods forest, Gulf marshes, prairie, canyon, desert, mountain, river and more.';
const pagePath = '/explore/landscapes';

export const Route = createFileRoute('/explore/landscapes')({
  loader: () => getTexasLandscapeHub(),
  head: ({ loaderData }) => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath: pagePath, title: 'Texas Landscapes: The Complete Guide', description }),
    links: [canonicalLink(texasDefinedBrand, pagePath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${absoluteUrl(texasDefinedBrand, pagePath)}#page`,
          url: absoluteUrl(texasDefinedBrand, pagePath),
          name: 'Texas Landscapes: The Complete Guide',
          description,
          isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` },
          mainEntity: { '@id': `${absoluteUrl(texasDefinedBrand, pagePath)}#landscapes` },
        },
        {
          '@type': 'ItemList',
          '@id': `${absoluteUrl(texasDefinedBrand, pagePath)}#landscapes`,
          name: 'Landscapes of Texas',
          numberOfItems: loaderData?.landscapes.length ?? 0,
          itemListElement: (loaderData?.landscapes ?? []).map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'WebPage',
              name: item.name,
              description: item.dek,
              url: absoluteUrl(texasDefinedBrand, `/explore/landscapes/${item.slug}`),
            },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${absoluteUrl(texasDefinedBrand, pagePath)}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
            { '@type': 'ListItem', position: 2, name: 'Explore Texas', item: absoluteUrl(texasDefinedBrand, '/explore') },
            { '@type': 'ListItem', position: 3, name: 'Texas Landscapes', item: absoluteUrl(texasDefinedBrand, pagePath) },
          ],
        },
      ],
    })],
  }),
  component: TexasLandscapesRoute,
});

function TexasLandscapesRoute() {
  const { landscapes, guides } = Route.useLoaderData();
  return (
    <Suspense fallback={<div className="min-h-[36rem]" aria-hidden="true" />}>
      <TexasLandscapesHubPage description={description} landscapes={landscapes} guides={guides} />
    </Suspense>
  );
}
