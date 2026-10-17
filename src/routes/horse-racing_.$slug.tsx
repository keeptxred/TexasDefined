import { createFileRoute, notFound } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';

import { buildMeta, canonicalLink } from '@/lib/seo';

export const Route = createFileRoute('/horse-racing/$slug')({
  loader: async ({ params }) => {
    const { findTexasHorseRacingInstitution, findTexasRacingOrganization, findTexasHorseRacingCalendar } = await import('@/data/horse-racing-authority');
    const record = findTexasHorseRacingInstitution(params.slug) ?? findTexasRacingOrganization(params.slug) ?? findTexasHorseRacingCalendar(params.slug);
    if (!record || record.canonicalPath !== `/horse-racing/${params.slug}`) throw notFound();
    return { record };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { record } = loaderData;
    const isLive = record.category === 'live';
    const isOrganization = record.category === 'organization';
    const isCalendar = record.category === 'calendar';
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: isCalendar
          ? 'Texas Horse Racing Calendar 2026–27: Live Tracks, Dates & Comparison'
          : isOrganization
          ? `${record.name}: Texas Horse Racing Authority, Programs & Official Resources`
          : isLive
            ? 'Gillespie County Fairgrounds Horse Racing: Fredericksburg Track & Dates'
            : `${record.name} Texas: Racetrack History, License Status & Location`,
        description: isCalendar
          ? 'Compare the four live horse racing tracks in Texas. See published 2026–27 meet dates, official schedules, Quarter Horse and Thoroughbred racing and future season status.'
          : isOrganization
          ? `${record.introduction} Official programs, office, primary sources, Texas county guide and links to the state's four live racing tracks.`
          : isLive
            ? 'Plan a Gillespie County Fairgrounds horse racing visit in Fredericksburg: summer Thoroughbred and Quarter Horse racing, official calendars, admission, parking, hotels and Gillespie County guide.'
            : `Learn about ${record.name} in ${record.city}, Texas, its inactive horse-racing license record, status, history and official Texas Racing Commission sources. No live races advertised.`,
        canonicalPath: record.canonicalPath,
      }),
      links: [canonicalLink(texasDefinedBrand, record.canonicalPath)],
    };
  },
});
