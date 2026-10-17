import { createFileRoute, notFound } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';

import { buildMeta, canonicalLink } from '@/lib/seo';

export const Route = createFileRoute('/horse-racing/$slug')({
  loader: async ({ params }) => {
    const { findTexasHorseRacingInstitution } = await import('@/data/horse-racing-authority');
    const record = findTexasHorseRacingInstitution(params.slug);
    if (!record || record.canonicalPath !== `/horse-racing/${params.slug}`) throw notFound();
    return { record };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { record } = loaderData;
    const isLive = record.category === 'live';
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: isLive
          ? 'Gillespie County Fairgrounds Horse Racing: Fredericksburg Track & Dates'
          : `${record.name} Texas: Racetrack History, License Status & Location`,
        description: isLive
          ? 'Plan a Gillespie County Fairgrounds horse racing visit in Fredericksburg: summer Thoroughbred and Quarter Horse racing, official calendars, admission, parking, hotels and Gillespie County guide.'
          : `Learn about ${record.name} in ${record.city}, Texas, its inactive horse-racing license record, status, history and official Texas Racing Commission sources. No live races advertised.`,
        canonicalPath: record.canonicalPath,
      }),
      links: [canonicalLink(texasDefinedBrand, record.canonicalPath)],
    };
  },
});
