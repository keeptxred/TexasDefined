import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/texas-river-basins.csv')({
  server: {
    handlers: {
      GET: async () => {
        const {
          texasCoastalRiverBasins,
          texasMajorRiverBasins,
          texasRiverBasinReferenceMetadata,
        } = await import('@/data/texas-river-basin-reference');

        const headers = [
          'basin',
          'basin_type',
          'area_in_texas_square_miles',
          'river_length_in_texas_miles',
          'average_annual_flow_acre_feet',
          'source_name',
          'source_url',
          'last_verified',
          'canonical_page',
        ];

        const majorRows = texasMajorRiverBasins.map((row) => [
          row.basin,
          'major',
          String(row.areaSquareMiles),
          String(row.riverMilesInTexas),
          String(row.averageAnnualFlowAcreFeet),
          texasRiverBasinReferenceMetadata.sourceName,
          texasRiverBasinReferenceMetadata.sourceUrl,
          texasRiverBasinReferenceMetadata.lastVerified,
          texasRiverBasinReferenceMetadata.canonicalPage,
        ]);

        const coastalRows = texasCoastalRiverBasins.map((basin) => [
          basin,
          'coastal',
          '',
          '',
          '',
          texasRiverBasinReferenceMetadata.sourceName,
          texasRiverBasinReferenceMetadata.sourceUrl,
          texasRiverBasinReferenceMetadata.lastVerified,
          texasRiverBasinReferenceMetadata.canonicalPage,
        ]);

        const lines = [
          headers.join(','),
          ...[...majorRows, ...coastalRows].map((row) => row.map(csvCell).join(',')),
        ];

        return new Response(`${lines.join('\n')}\n`, {
          headers: {
            'content-type': 'text/csv; charset=utf-8',
            'content-disposition': 'attachment; filename="texasdefined-texas-river-basins.csv"',
            'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
            'x-robots-tag': 'noindex, follow',
          },
        });
      },
    },
  },
});

function csvCell(value: string) {
  const normalized = value.replace(/\r?\n/g, ' ').trim();
  return /[",]/.test(normalized) ? `"${normalized.replaceAll('"', '""')}"` : normalized;
}
