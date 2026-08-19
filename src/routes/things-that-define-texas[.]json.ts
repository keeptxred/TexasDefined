import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/things-that-define-texas.json')({
  server: {
    handlers: {
      GET: async () => {
        const {
          TEXAS_ICON_REFERENCE_ROWS,
          TEXAS_ICONS_COLLECTION_URL,
          TEXAS_ICONS_METHODOLOGY_URL,
        } = await import('@/data/things-unique-to-texas-reference');

        const payload = {
          schemaVersion: 1,
          publisher: 'Texas Defined',
          canonicalCollection: TEXAS_ICONS_COLLECTION_URL,
          methodology: TEXAS_ICONS_METHODOLOGY_URL,
          asOf: '2026-08-19',
          scope: 'TexasDefined editorial reference to 250 foods, places, landscapes, brands, traditions, wildlife, sayings and cultural markers associated with Texas. The collection distinguishes official facts, Texas origins, Texas adoption and editorial cultural context.',
          fields: {
            id: 'Stable editorial item number from 1 through 250.',
            chapter: 'One of the eight Things That Define Texas editorial chapters.',
            description: 'TexasDefined editorial summary of why the item belongs in the collection.',
            deeperGuide: 'Canonical TexasDefined page when a direct, high-confidence deeper guide exists; null when the collection entry is the maintained reference.',
          },
          count: TEXAS_ICON_REFERENCE_ROWS.length,
          items: TEXAS_ICON_REFERENCE_ROWS,
        };

        return new Response(`${JSON.stringify(payload, null, 2)}\n`, {
          headers: {
            'content-type': 'application/json; charset=utf-8',
            'content-disposition': 'attachment; filename="texasdefined-things-that-define-texas.json"',
            'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
            'x-robots-tag': 'noindex, follow',
          },
        });
      },
    },
  },
});
