import { createFileRoute } from '@tanstack/react-router';
import type {} from '@tanstack/react-start';

export const Route = createFileRoute('/texas-data/county-growth.csv')({
  server: {
    handlers: {
      GET: async () => {
        const { loadTexasCountyGrowth } = await import('@/data/census-county-growth');
        const data = await loadTexasCountyGrowth();
        if (!data.available) {
          return new Response('Official Census county growth source temporarily unavailable', {
            status: 503,
            headers: {
              'content-type': 'text/plain; charset=utf-8',
              'cache-control': 'no-store',
              'retry-after': '300',
              'x-robots-tag': 'noindex, follow',
            },
          });
        }

        const header = ['fips', 'county_name', 'population_base_2020', 'population_estimate_2025', 'population_change', 'population_change_percent'];
        const rows = data.rows
          .slice()
          .sort((a, b) => a.fips.localeCompare(b.fips))
          .map((row) => [
            row.fips,
            row.countyName,
            row.populationBase2020,
            row.populationEstimate2025,
            row.populationChange,
            row.populationChangePercent.toFixed(4),
          ]);
        const csv = [header, ...rows].map((row) => row.map(csvCell).join(',')).join('\n');

        return new Response(`${csv}\n`, {
          headers: {
            'content-type': 'text/csv; charset=utf-8',
            'content-disposition': 'attachment; filename="texas-county-population-growth-2020-2025.csv"',
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
