import { createFileRoute, notFound } from '@tanstack/react-router';

import { getLocalHomeownershipCostPage } from '@/data/local-homeownership-cost-page';

export const Route = createFileRoute('/texas-homeownership-cost-calculator_/$location')({
  loader: async ({ params }) => {
    const page = await getLocalHomeownershipCostPage(params.location);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => loaderData?.page.head ?? {},
});
