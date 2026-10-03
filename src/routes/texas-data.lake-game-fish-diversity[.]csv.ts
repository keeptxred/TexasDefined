import { createFileRoute } from '@tanstack/react-router';
import type {} from '@tanstack/react-start';

export const Route = createFileRoute('/texas-data/lake-game-fish-diversity.csv')({
  server: {
    handlers: {
      GET: async () => {
        const { loadLakeGameFishDiversity } = await import('@/data/lake-game-fish-diversity');
        const data = await loadLakeGameFishDiversity();
        const header = ['lake_slug', 'lake_name', 'counties', 'surface_acres', 'river_basin', 'documented_target_count', 'targets_per_1000_acres', 'documented_targets', 'verified_at', 'source_urls'];
        const rows = data.rows.map((row) => [
          row.slug,
          row.name,
          row.counties.join('; '),
          row.surfaceAcres ?? '',
          row.riverBasin ?? '',
          row.targetCount,
          row.targetsPerThousandAcres?.toFixed(6) ?? '',
          row.targets.join('; '),
          row.verifiedAt ?? '',
          row.sourceUrls.join('; '),
        ]);
        const csv = [header, ...rows].map((row) => row.map(csvCell).join(',')).join('\n');
        return new Response(`${csv}\n`, {
          headers: {
            'content-type': 'text/csv; charset=utf-8',
            'content-disposition': 'attachment; filename="texas-lake-game-fish-diversity.csv"',
            'cache-control': 'public, max-age=86400, stale-while-revalidate=604800',
            'x-robots-tag': 'noindex, follow',
          },
        });
      },
    },
  },
});

function csvCell(value: string | number) {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
