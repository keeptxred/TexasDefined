import { createFileRoute, notFound } from '@tanstack/react-router';

export const Route = createFileRoute('/wedding-venues/region/$region')({
  loader: async ({ params }) => {
    const { getWeddingVenueRegionPage } = await import('@/data/wedding-venues.functions');
    const data = await getWeddingVenueRegionPage({ data: { regionSlug: params.region } });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: 'Wedding venue region unavailable' }, { name: 'robots', content: 'noindex, nofollow' }] };
    const canonicalPath = `/wedding-venues/region/${params.region}`;
    const pageTitle = `Top Wedding Venues in ${loaderData.region.name}`;
    const description = `Browse wedding venues in ${loaderData.region.name}, with TexasDefined county connections where location data is curated and direct links to venue profiles for deeper planning.`;
    return {
      meta: [
        { title: pageTitle },
        { name: 'description', content: description },
      ],
      links: [{ rel: 'canonical', href: `https://texasdefined.com${canonicalPath}` }],
    };
  },
});
