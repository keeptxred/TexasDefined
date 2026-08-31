import { createFileRoute, notFound } from '@tanstack/react-router';

import { getLocalMortgagePage } from '@/data/local-mortgage-page';

export const Route = createFileRoute('/texas-mortgage-calculator/$location')({
  loader: async ({ params }) => {
    const page = await getLocalMortgagePage(params.location);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => loaderData?.page.head ?? {},
});
