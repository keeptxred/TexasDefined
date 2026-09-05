import { createLazyFileRoute } from '@tanstack/react-router';

import { WeddingVenueDirectoryPage } from '@/components/weddings/WeddingVenuePages';

export const Route = createLazyFileRoute('/wedding-venues')({ component: TexasWeddingVenuesPage });

function TexasWeddingVenuesPage() {
  const data = Route.useLoaderData();
  return <WeddingVenueDirectoryPage regions={data.regions} stats={data.stats} venues={data.venues} />;
}