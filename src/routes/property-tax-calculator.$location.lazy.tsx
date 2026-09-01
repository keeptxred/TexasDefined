import { createLazyFileRoute } from '@tanstack/react-router';

import { LocalPropertyTaxCalculatorPage } from '@/components/property/LocalPropertyTaxCalculatorPage';

export const Route = createLazyFileRoute('/property-tax-calculator/$location')({
  component: Page,
});

function Page() {
  const { page } = Route.useLoaderData();
  return <LocalPropertyTaxCalculatorPage profile={page.profile} verifiedCountyGuide={page.verifiedCountyGuide} />;
}
