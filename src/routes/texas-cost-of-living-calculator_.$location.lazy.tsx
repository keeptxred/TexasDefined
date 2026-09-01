import { createLazyFileRoute } from '@tanstack/react-router';

import { LocalCostOfLivingPage } from '@/components/calculators/LocalCostOfLivingPage';

export const Route = createLazyFileRoute('/texas-cost-of-living-calculator/$location')({ component: LocalCostOfLivingRoute });

function LocalCostOfLivingRoute() {
  const { page } = Route.useLoaderData();
  return <LocalCostOfLivingPage profile={page.profile} />;
}