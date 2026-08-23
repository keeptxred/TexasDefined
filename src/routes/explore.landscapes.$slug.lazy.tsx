import { createLazyFileRoute } from '@tanstack/react-router';

import { TexasLandscapeDetailPage } from '@/components/editorial/TexasLandscapeDetailPage';

export const Route = createLazyFileRoute('/explore/landscapes/$slug')({
  component: LandscapeDetailRoute,
});

function LandscapeDetailRoute() {
  const { item, nearby } = Route.useLoaderData();
  return <TexasLandscapeDetailPage item={item} nearby={nearby} />;
}
