import { createLazyFileRoute } from '@tanstack/react-router';

import { LocalHomeInsurancePage } from '@/components/calculators/LocalHomeInsurancePage';

export const Route = createLazyFileRoute('/texas-home-insurance-calculator/$location')({
  component: Page,
});

function Page() {
  const { page } = Route.useLoaderData();
  return <LocalHomeInsurancePage profile={page.profile} />;
}
