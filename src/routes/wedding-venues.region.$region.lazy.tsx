import { createLazyFileRoute } from '@tanstack/react-router';

import { WeddingVenueRegionPage } from '@/components/weddings/WeddingVenuePages';

export const Route = createLazyFileRoute('/wedding-venues/region/$region')({ component: WeddingVenueRegionRoute });

function WeddingVenueRegionRoute() {
  const data = Route.useLoaderData();
  return <WeddingVenueRegionPage region={data.region} venues={data.venues} />;
}