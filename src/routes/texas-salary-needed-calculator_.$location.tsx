import { createFileRoute, notFound } from '@tanstack/react-router';

import { getLocalSalaryNeededPage } from '@/data/local-salary-needed-page';

export const Route = createFileRoute('/texas-salary-needed-calculator/$location')({
  loader: async ({ params }) => {
    const page = await getLocalSalaryNeededPage(params.location);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => loaderData?.page.head ?? {},
});