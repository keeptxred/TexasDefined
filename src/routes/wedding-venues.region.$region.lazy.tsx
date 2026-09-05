import { use } from 'react';
import { createLazyFileRoute, notFound } from '@tanstack/react-router';

import { WeddingVenueRegionPage } from '@/components/weddings/WeddingVenuePages';
import { getWeddingVenueRegionPage } from '@/data/wedding-venues.functions';

export const Route = createLazyFileRoute('/wedding-venues/region/$region')({ component: WeddingVenueRegionRoute });

function WeddingVenueRegionRoute() {
  const { region } = Route.useParams();
  const data = use(getWeddingVenueRegionPage({ data: { regionSlug: region } }));
  if (!data) throw notFound();
  return <WeddingVenueRegionPage {...data} />;
}
