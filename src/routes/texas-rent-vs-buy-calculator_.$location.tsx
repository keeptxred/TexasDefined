import { createFileRoute, notFound } from '@tanstack/react-router';

import { getLocalRentVsBuyPage } from '@/data/local-rent-vs-buy-page';

export const Route = createFileRoute('/texas-rent-vs-buy-calculator/$location')({
  loader: async ({ params }) => {
    const page = await getLocalRentVsBuyPage(params.location);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => loaderData?.page.head ?? {},
});