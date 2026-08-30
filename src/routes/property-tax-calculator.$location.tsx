import { createFileRoute, notFound } from '@tanstack/react-router';

import { getLocalPropertyTaxCalculatorPage } from '@/data/local-property-tax-calculator-page';

export const Route = createFileRoute('/property-tax-calculator/$location')({
  loader: async ({ params }) => {
    const page = await getLocalPropertyTaxCalculatorPage(params.location);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => loaderData?.page.head ?? {},
});
