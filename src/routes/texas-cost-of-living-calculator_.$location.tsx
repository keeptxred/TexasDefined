import { createFileRoute, notFound, redirect } from '@tanstack/react-router';
import { LOCAL_COST_OF_LIVING_PROFILE_BY_SLUG } from '@/data/local-cost-of-living';

export const Route = createFileRoute('/texas-cost-of-living-calculator/$location')({
  beforeLoad: ({ params }) => {
    if (!LOCAL_COST_OF_LIVING_PROFILE_BY_SLUG.has(params.location)) throw notFound();
    throw redirect({ href: `/texas-cost-of-living-calculator#${params.location}`, statusCode: 301 });
  },
});
