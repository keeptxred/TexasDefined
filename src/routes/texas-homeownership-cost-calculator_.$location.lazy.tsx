import { createLazyFileRoute } from '@tanstack/react-router';

import { LocalHomeownershipCostPage } from '@/components/calculators/LocalHomeownershipCostPage';

export const Route = createLazyFileRoute('/texas-homeownership-cost-calculator/$location')({
  component: Page,
});

function Page() {
  const { page } = Route.useLoaderData();
  return <LocalHomeownershipCostPage profile={page.profile} />;
}
