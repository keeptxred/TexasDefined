import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

export const Route = createFileRoute('/wedding-venue/$slug')({
  head: ({ params }) => {
    const canonicalPath = `/wedding-venue/${params.slug}`;
    const description = 'TexasDefined wedding venue profile with regional context and practical planning questions to confirm directly with the venue before booking.';
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: 'Texas Wedding Venue Profile | TexasDefined',
        description,
        canonicalPath,
        robots: 'noindex, follow, max-image-preview:large',
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
});
