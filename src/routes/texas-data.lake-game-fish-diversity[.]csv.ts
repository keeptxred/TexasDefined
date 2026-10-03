import { createFileRoute } from '@tanstack/react-router';
import type {} from '@tanstack/react-start';

export const Route = createFileRoute('/texas-data/lake-game-fish-diversity.csv')({
  server: {
    handlers: {
      GET: async () => {
        const { loadLakeFishDiversityServer } = await import('@/data/research/lake-game-fish-diversity.server');
        const data = loadLakeFishDiversityServer();
        if (!data.available) {
          return new Response('Verified lake-profile dataset is temporarily unavailable', {
            status: 503,
            headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store', 'retry-after': '300', 'x-robots-tag': 'noindex, follow' },
          });
        }
        const header = ['lake_name', 'slug', 'region', 'counties', 'surface_acres', 'documented_fishing_target_count', 'targets_per_1000_acres', 'documented_targets', 'verified_at', 'primary_source_url'];
        const rows = data.rows
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((row) => [row.name, row.slug, row.region, row.counties.join('|'), row.surfaceAcres, row.fishTargetCount, row.targetsPerThousandAcres.toFixed(6), row.fishTargets.join('|'), row.verifiedAt, row.sourceUrl]);
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
