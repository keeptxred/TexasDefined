import { createFileRoute, notFound } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { getTexasLandscapePage } from '@/data/texas-landscapes.functions';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const TexasLandscapeDetailPage = lazy(() => import('@/components/editorial/TexasLandscapeDetailPage').then((module) => ({ default: module.TexasLandscapeDetailPage })));

export const Route = createFileRoute('/explore/landscapes/$slug')({
  loader: async ({ params }) => {
    const result = await getTexasLandscapePage({ data: { slug: params.slug } });
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => {
    const item = loaderData?.item;
    if (!item) return {};
    const path = `/explore/landscapes/${item.slug}`;
    const isLandscape = 'name' in item;
    const title = isLandscape ? `${item.name}: Texas Landscape Guide` : item.title;
    const description = item.dek;
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath: path, title, description }),
      links: [canonicalLink(texasDefinedBrand, path)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            '@id': `${absoluteUrl(texasDefinedBrand, path)}#article`,
            url: absoluteUrl(texasDefinedBrand, path),
            headline: title,
            description,
            isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` },
            about: isLandscape ? [item.terrain, item.geology, item.vegetation, item.water] : item.sections.map((section) => section.heading),
            mainEntityOfPage: absoluteUrl(texasDefinedBrand, path),
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${absoluteUrl(texasDefinedBrand, path)}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
              { '@type': 'ListItem', position: 2, name: 'Explore Texas', item: absoluteUrl(texasDefinedBrand, '/explore') },
              { '@type': 'ListItem', position: 3, name: 'Texas Landscapes', item: absoluteUrl(texasDefinedBrand, '/explore/landscapes') },
              { '@type': 'ListItem', position: 4, name: isLandscape ? item.name : item.title, item: absoluteUrl(texasDefinedBrand, path) },
            ],
          },
        ],
      })],
    };
  },
  component: LandscapeDetailRoute,
});

function LandscapeDetailRoute() {
  const { item, nearby } = Route.useLoaderData();
  return (
    <Suspense fallback={<div className="min-h-[36rem]" aria-hidden="true" />}>
      <TexasLandscapeDetailPage item={item} nearby={nearby} />
    </Suspense>
  );
}
