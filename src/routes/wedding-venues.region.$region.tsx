import { createFileRoute, notFound } from '@tanstack/react-router';

export const Route = createFileRoute('/wedding-venues/region/$region')({
  loader: async ({ params }) => {
    const { getWeddingVenueRegionPage } = await import('@/data/wedding-venues.functions');
    const data = await getWeddingVenueRegionPage({ data: { regionSlug: params.region } });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData?.head ?? {},
});