import { createLazyFileRoute } from '@tanstack/react-router';

import { LocalMortgagePage } from '@/components/calculators/LocalMortgagePage';

export const Route = createLazyFileRoute('/texas-mortgage-calculator/$location')({
  component: Page,
});

function Page() {
  const { page } = Route.useLoaderData();
  return <LocalMortgagePage profile={page.profile} />;
}
