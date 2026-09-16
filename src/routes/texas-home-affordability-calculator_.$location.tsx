import { createFileRoute, notFound } from '@tanstack/react-router';

import { getLocalHomeAffordabilityPage } from '@/data/local-home-affordability-page';

export const Route = createFileRoute('/texas-home-affordability-calculator_/$location')({
  loader: async ({ params }) => {
    const page = await getLocalHomeAffordabilityPage(params.location);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => loaderData?.page.head ?? {},
});
