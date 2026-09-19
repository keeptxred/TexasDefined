import { createFileRoute, notFound, redirect } from '@tanstack/react-router';
import { LOCAL_HOMEOWNERSHIP_COST_PROFILE_BY_SLUG } from '@/data/local-homeownership-cost';

export const Route = createFileRoute('/texas-homeownership-cost-calculator/$location')({
  beforeLoad: ({ params }) => {
    if (!LOCAL_HOMEOWNERSHIP_COST_PROFILE_BY_SLUG.has(params.location)) throw notFound();
    throw redirect({ href: `/texas-homeownership-cost-calculator#${params.location}`, statusCode: 301 });
  },
});
