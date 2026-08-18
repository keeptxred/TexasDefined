import { createFileRoute } from '@tanstack/react-router';

import {
  TOP_ATTRACTION_REFERENCE_ROWS,
  TOP_ATTRACTIONS_COLLECTION_URL,
  TOP_ATTRACTIONS_METHODOLOGY_URL,
} from '@/data/top-attraction-reference-data';

export const Route = createFileRoute('/top-25-texas-attractions.json')({
  server: {
    handlers: {
      GET: async () => {
        const payload = {
          schemaVersion: 1,
          publisher: 'Texas Defined',
          canonicalCollection: TOP_ATTRACTIONS_COLLECTION_URL,
          methodology: TOP_ATTRACTIONS_METHODOLOGY_URL,
          asOf: '2026-08-18',
          scope: 'TexasDefined editorial Top 25 attraction reference data. Controlling visitor sources govern current operations; planning assessments are TexasDefined editorial synthesis.',
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
