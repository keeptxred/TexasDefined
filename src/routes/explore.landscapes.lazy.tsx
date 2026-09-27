import { Outlet, createLazyFileRoute, useRouterState } from '@tanstack/react-router';

import { TexasLandscapesHubPage } from '@/components/editorial/TexasLandscapesHubPage';

const description = 'A field guide to the landscapes that define Texas: Hill Country limestone, Piney Woods forest, Gulf marshes, prairie, canyon, desert, mountain, river and more.';

export const Route = createLazyFileRoute('/explore/landscapes')({
  component: TexasLandscapesBoundary,
});

function TexasLandscapesBoundary() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (pathname !== '/explore/landscapes' && pathname !== '/explore/landscapes/') return <Outlet />;
  return <TexasLandscapesRoute />;
}

function TexasLandscapesRoute() {
  const { landscapes, guides } = Route.useLoaderData();
  return <TexasLandscapesHubPage description={description} landscapes={landscapes} guides={guides} />;
}
