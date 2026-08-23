import { createFileRoute, notFound } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

import { getTexasLandscapePage } from '@/data/texas-landscapes.functions';

const TexasLandscapeDetailPage = lazy(() => import('@/components/editorial/TexasLandscapeDetailPage').then((module) => ({ default: module.TexasLandscapeDetailPage })));

export const Route = createFileRoute('/explore/landscapes/$slug')({
  loader: async ({ params }) => {
    const result = await getTexasLandscapePage({ data: { slug: params.slug } });
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => loaderData?.head ?? {},
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
