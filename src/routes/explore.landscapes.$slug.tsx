import { createFileRoute, notFound } from '@tanstack/react-router';

import { getTexasLandscapePage } from '@/data/texas-landscapes.functions';

export const Route = createFileRoute('/explore/landscapes/$slug')({
  loader: async ({ params }) => {
    const result = await getTexasLandscapePage({ data: { slug: params.slug } });
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => loaderData?.head ?? {},
});
