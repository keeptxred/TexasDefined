import { createLazyFileRoute } from '@tanstack/react-router';

import { LocalHomeAffordabilityPage } from '@/components/calculators/LocalHomeAffordabilityPage';

export const Route = createLazyFileRoute('/texas-home-affordability-calculator/$location')({
  component: Page,
});

function Page() {
  const { page } = Route.useLoaderData();
  return <LocalHomeAffordabilityPage profile={page.profile} />;
}
