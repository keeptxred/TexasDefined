import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/top-25-texas-attractions.json')({
  server: {
    handlers: {
      GET: async () => {
        const {
          TOP_ATTRACTION_REFERENCE_ROWS,
          TOP_ATTRACTIONS_COLLECTION_URL,
          TOP_ATTRACTIONS_METHODOLOGY_URL,
        } = await import('@/data/top-attraction-reference-data');
        const payload = {
          schemaVersion: 1,
          publisher: 'Texas Defined',
          canonicalCollection: TOP_ATTRACTIONS_COLLECTION_URL,
          methodology: TOP_ATTRACTIONS_METHODOLOGY_URL,
          asOf: '2026-08-18',
          scope: 'TexasDefined editorial Top 25 attraction reference data. Controlling visitor sources govern current operations; planning assessments are TexasDefined editorial synthesis.',
          fields: {
            authoritySources: 'Ordered evidence list. The first source is the controlling visitor source when available; later sources provide supporting institutional context and do not override current operator guidance.',
            roadTrips: 'TexasDefined editorial route memberships, not live driving directions or operating guidance.',
            recommendedVisit: 'TexasDefined editorial estimate of useful visit duration.',
            physicalEffort: 'TexasDefined editorial trip-planning assessment, not a medical accessibility rating.',
            weatherExposure: 'TexasDefined editorial description of typical indoor/outdoor exposure.',
            advancePlanning: 'TexasDefined editorial assessment of reservation, capacity, permit, distance and scheduling friction.',
            sourceCheckedAt: 'Date the destination visitor-information layer was last reviewed.',
          },
          count: TOP_ATTRACTION_REFERENCE_ROWS.length,
          attractions: TOP_ATTRACTION_REFERENCE_ROWS,
        };

        return new Response(`${JSON.stringify(payload, null, 2)}\n`, {
          headers: {
            'content-type': 'application/json; charset=utf-8',
            'content-disposition': 'attachment; filename="texasdefined-top-25-texas-attractions.json"',
            'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
            'x-robots-tag': 'noindex, follow',
          },
        });
      },
    },
  },
});
