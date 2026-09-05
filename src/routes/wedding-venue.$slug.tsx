import { createFileRoute, notFound } from '@tanstack/react-router';

export const Route = createFileRoute('/wedding-venue/$slug')({
  loader: async ({ params }) => {
    const { getWeddingVenueProfile } = await import('@/data/wedding-venues.functions');
    const data = await getWeddingVenueProfile({ data: { slug: params.slug } });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData?.head ?? { meta: [{ name: 'robots', content: 'noindex, follow' }] },
});