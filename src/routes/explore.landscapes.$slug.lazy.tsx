import { createLazyFileRoute } from '@tanstack/react-router';

import { TexasLandscapeDetailPage } from '@/components/editorial/TexasLandscapeDetailPage';
import { TexasRiverValleysLandscapePage } from '@/components/editorial/TexasRiverValleysLandscapePage';

export const Route = createLazyFileRoute('/explore/landscapes/$slug')({
  component: LandscapeDetailRoute,
});

function LandscapeDetailRoute() {
  const { item, nearby } = Route.useLoaderData();
  const { slug } = Route.useParams();

  if (slug === 'rivers-and-river-valleys' && 'name' in item) {
    return <TexasRiverValleysLandscapePage item={item} nearby={nearby} />;
  }

  return <TexasLandscapeDetailPage item={item} nearby={nearby} />;
}
