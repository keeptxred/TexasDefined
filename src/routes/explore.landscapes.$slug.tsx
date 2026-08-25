import { createFileRoute, notFound } from '@tanstack/react-router';

export const Route = createFileRoute('/explore/landscapes/$slug')({
  loader: async ({ params }) => {
    const { getTexasLandscapePage } = await import('@/data/texas-landscapes.functions');
    const result = await getTexasLandscapePage({ data: { slug: params.slug } });
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => loaderData?.head ?? {},
});
