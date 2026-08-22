import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

import { getTexasLandscapeHub } from '@/data/texas-landscapes.functions';

const TexasLandscapesHubPage = lazy(() => import('@/components/editorial/TexasLandscapesHubPage').then((module) => ({ default: module.TexasLandscapesHubPage })));

const description = 'A field guide to the landscapes that define Texas: Hill Country limestone, Piney Woods forest, Gulf marshes, prairie, canyon, desert, mountain, river and more.';

export const Route = createFileRoute('/explore/landscapes')({
  loader: () => getTexasLandscapeHub(),
  head: ({ loaderData }) => loaderData?.head ?? {},
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
