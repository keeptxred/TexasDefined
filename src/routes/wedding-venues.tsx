import { createFileRoute } from '@tanstack/react-router';

const canonicalPath = '/wedding-venues';
const pageTitle = 'Top Wedding Venues in Texas: 249 Places to Start';
const description = 'Explore a TexasDefined starting shortlist of wedding venues across Austin and the Hill Country, Dallas–Fort Worth, Houston and the Gulf Coast, San Antonio and South Texas, East Texas, West Texas and the Panhandle.';

export const Route = createFileRoute('/wedding-venues')({
  loader: async () => {
    const { getWeddingVenueDirectory } = await import('@/data/wedding-venues.functions');
    return getWeddingVenueDirectory();
  },
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: 'description', content: description },
    ],
    links: [{ rel: 'canonical', href: `https://texasdefined.com${canonicalPath}` }],
  }),
});
