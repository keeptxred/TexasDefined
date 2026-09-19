import { createFileRoute, notFound, redirect } from '@tanstack/react-router';
import { LOCAL_PROPERTY_TAX_PROFILE_BY_SLUG } from '@/data/local-property-tax-calculators';

// Consolidation note: the former getLocalPropertyTaxCalculatorPage loader and
// loaderData?.page.head self-canonical page pipeline is intentionally retired.
// These legacy URLs now preserve location state by redirecting to the statewide estimator.
export const Route = createFileRoute('/property-tax-calculator/$location')({
  beforeLoad: ({ params }) => {
    if (!LOCAL_PROPERTY_TAX_PROFILE_BY_SLUG.has(params.location)) throw notFound();
    throw redirect({ href: `/texas-property-tax-estimator#${params.location}`, statusCode: 301 });
  },
});
