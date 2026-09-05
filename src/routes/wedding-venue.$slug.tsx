import { createFileRoute, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { getWeddingVenueProfile } from '@/data/wedding-venues.functions';
import { buildMeta, canonicalLink } from '@/lib/seo';

export const Route = createFileRoute('/wedding-venue/$slug')({
  loader: async ({ params }) => {
    const result = await getWeddingVenueProfile({ data: { slug: params.slug } });
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { venue, region } = loaderData;
    const canonicalPath = `/wedding-venue/${venue.slug}`;
    const location = venue.city ? `${venue.city}, Texas` : region.name;
    const description = `${venue.name} wedding venue profile for ${location}. Compare its Texas region and county context, plus the planning questions to confirm directly before booking.`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: `${venue.name} Wedding Venue | TexasDefined`,
        description,
        canonicalPath,
        robots: 'noindex, follow, max-image-preview:large',
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
});
