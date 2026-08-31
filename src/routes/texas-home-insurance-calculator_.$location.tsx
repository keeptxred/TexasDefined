import { createFileRoute, notFound } from '@tanstack/react-router';

import { getLocalHomeInsurancePage } from '@/data/local-home-insurance-page';

export const Route = createFileRoute('/texas-home-insurance-calculator/$location')({
  loader: async ({ params }) => {
    const page = await getLocalHomeInsurancePage(params.location);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => loaderData?.page.head ?? {},
});
