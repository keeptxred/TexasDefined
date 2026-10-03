import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/texas-river-basins.json')({
  server: {
    handlers: {
      GET: async () => {
        const {
          texasCoastalRiverBasins,
          texasMajorRiverBasins,
          texasRiverBasinReferenceMetadata,
        } = await import('@/data/texas-river-basin-reference');

        const payload = {
          name: 'Texas river basin reference',
          description: 'Texas Defined reference data for the 15 major Texas river basins and eight coastal basins.',
          source: {
            name: texasRiverBasinReferenceMetadata.sourceName,
            url: texasRiverBasinReferenceMetadata.sourceUrl,
          },
          lastVerified: texasRiverBasinReferenceMetadata.lastVerified,
          canonicalPage: texasRiverBasinReferenceMetadata.canonicalPage,
          methodology: 'Texas Defined transcribes TWDB statewide basin statistics into normalized numeric fields for comparison. Coastal basin names are included without inferred statistics when the shared reference does not provide those values.',
          majorBasins: texasMajorRiverBasins,
          coastalBasins: texasCoastalRiverBasins,
        };

        return new Response(`${JSON.stringify(payload, null, 2)}\n`, {
          headers: {
            'content-type': 'application/json; charset=utf-8',
            'content-disposition': 'attachment; filename="texasdefined-texas-river-basins.json"',
            'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
            'x-robots-tag': 'noindex, follow',
          },
        });
      },
    },
  },
});
