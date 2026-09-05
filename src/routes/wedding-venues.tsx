import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { getWeddingVenueDirectory } from '@/data/wedding-venues.functions';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/wedding-venues';
const description = 'Explore a TexasDefined starting shortlist of wedding venues across Austin and the Hill Country, Dallas–Fort Worth, Houston and the Gulf Coast, San Antonio and South Texas, East Texas, West Texas and the Panhandle.';

export const Route = createFileRoute('/wedding-venues')({
  loader: () => getWeddingVenueDirectory(),
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      title: 'Top Wedding Venues in Texas: 249 Places to Start',
      description,
      canonicalPath,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
