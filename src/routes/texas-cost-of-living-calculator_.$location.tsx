import { createFileRoute, notFound } from '@tanstack/react-router';

import { getLocalCostOfLivingPage } from '@/data/local-cost-of-living-page';

export const Route = createFileRoute('/texas-cost-of-living-calculator/$location')({
  loader: async ({ params }) => {
    const page = await getLocalCostOfLivingPage(params.location);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => loaderData?.page.head ?? {},
});