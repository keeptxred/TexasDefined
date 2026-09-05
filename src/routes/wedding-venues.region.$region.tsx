import { createFileRoute, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { getWeddingVenueRegionPage } from '@/data/wedding-venues.functions';
import { buildMeta, canonicalLink } from '@/lib/seo';

export const Route = createFileRoute('/wedding-venues/region/$region')({
  loader: async ({ params }) => {
    const result = await getWeddingVenueRegionPage({ data: { regionSlug: params.region } });
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { region, venues } = loaderData;
    const canonicalPath = `/wedding-venues/region/${region.slug}`;
    const description = `Browse ${venues.length} wedding venues in ${region.name}, with TexasDefined county connections where location data is curated and direct links to venue profiles for deeper planning.`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: `Top Wedding Venues in ${region.name}`,
        description,
        canonicalPath,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
});
