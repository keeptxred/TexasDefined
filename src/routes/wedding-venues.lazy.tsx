import { use } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';

import { WeddingVenueDirectoryPage } from '@/components/weddings/WeddingVenuePages';
import { getWeddingVenueDirectory } from '@/data/wedding-venues.functions';

export const Route = createLazyFileRoute('/wedding-venues')({ component: TexasWeddingVenuesPage });

function TexasWeddingVenuesPage() {
  const data = use(getWeddingVenueDirectory());
  return <WeddingVenueDirectoryPage {...data} />;
}
