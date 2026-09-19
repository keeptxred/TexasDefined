import { createFileRoute, notFound, redirect } from '@tanstack/react-router';
import { LOCAL_HOME_AFFORDABILITY_PROFILE_BY_SLUG } from '@/data/local-home-affordability';

// Consolidation note: the former getLocalHomeAffordabilityPage loader and
// loaderData?.page.head self-canonical page pipeline is intentionally retired.
// The researched local context now renders inside the canonical calculator.
export const Route = createFileRoute('/texas-home-affordability-calculator/$location')({
  beforeLoad: ({ params }) => {
    if (!LOCAL_HOME_AFFORDABILITY_PROFILE_BY_SLUG.has(params.location)) throw notFound();
    throw redirect({ href: `/texas-home-affordability-calculator#${params.location}`, statusCode: 301 });
  },
});
