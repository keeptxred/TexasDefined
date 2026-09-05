import { use } from 'react';
import { createLazyFileRoute, notFound } from '@tanstack/react-router';

import { WeddingVenueProfilePage } from '@/components/weddings/WeddingVenuePages';
import { getWeddingVenueProfile } from '@/data/wedding-venues.functions';

export const Route = createLazyFileRoute('/wedding-venue/$slug')({ component: WeddingVenueProfileRoute });

function WeddingVenueProfileRoute() {
  const { slug } = Route.useParams();
  const data = use(getWeddingVenueProfile({ data: { slug } }));
  if (!data) throw notFound();
  return <WeddingVenueProfilePage {...data} />;
}
