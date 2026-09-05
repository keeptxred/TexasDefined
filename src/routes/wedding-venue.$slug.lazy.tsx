import { createLazyFileRoute } from '@tanstack/react-router';

import { WeddingVenueImageBlock } from '@/components/weddings/WeddingVenueImageBlock';
import { WeddingVenueProfilePage } from '@/components/weddings/WeddingVenuePages';

export const Route = createLazyFileRoute('/wedding-venue/$slug')({ component: WeddingVenueProfileRoute });

function WeddingVenueProfileRoute() {
  const data = Route.useLoaderData();
  return <>
    <WeddingVenueProfilePage venue={data.venue} region={data.region} />
    <WeddingVenueImageBlock slug={data.venue.slug} name={data.venue.name} />
  </>;
}
