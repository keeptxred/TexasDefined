import { createLazyFileRoute } from '@tanstack/react-router';

import { WeddingVenueProfilePage } from '@/components/weddings/WeddingVenuePages';

export const Route = createLazyFileRoute('/wedding-venue/$slug')({ component: WeddingVenueProfileRoute });

function WeddingVenueProfileRoute() {
  const data = Route.useLoaderData();
  return <WeddingVenueProfilePage {...data} />;
}
