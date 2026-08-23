import { createLazyFileRoute } from '@tanstack/react-router';

import { TexasLandscapesHubPage } from '@/components/editorial/TexasLandscapesHubPage';

const description = 'A field guide to the landscapes that define Texas: Hill Country limestone, Piney Woods forest, Gulf marshes, prairie, canyon, desert, mountain, river and more.';

export const Route = createLazyFileRoute('/explore/landscapes')({
  component: TexasLandscapesRoute,
});

function TexasLandscapesRoute() {
  const { landscapes, guides } = Route.useLoaderData();
  return <TexasLandscapesHubPage description={description} landscapes={landscapes} guides={guides} />;
}
