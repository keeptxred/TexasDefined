import { createFileRoute } from '@tanstack/react-router';
import type {} from '@tanstack/react-start';

export const Route = createFileRoute('/texas-data/property-tax-changes.csv')({
  server: {
    handlers: {
      GET: async () => {
        const { loadPropertyTaxChangesServer } = await import('@/data/research/property-tax-changes.server');
        const data = await loadPropertyTaxChangesServer();
        if (!data.available) {
          return new Response('Comparable Texas property-tax rate records are temporarily unavailable', {
            status: 503,
            headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store', 'retry-after': '300', 'x-robots-tag': 'noindex, follow' },
          });
        }
        const header = ['type', 'taxing_unit_name', 'slug', 'counties', 'previous_year', 'previous_rate_percent', 'current_year', 'current_rate_percent', 'change_percentage_points', 'relative_change_percent', 'source_url'];
        const rows = data.rows
          .slice()
          .sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name))
          .map((row) => [row.type, row.name, row.slug, row.countySlugs.join('|'), row.previousYear, row.previousRate.toFixed(4), row.currentYear, row.currentRate.toFixed(4), row.changePoints.toFixed(4), row.changePercent.toFixed(4), row.sourceUrl]);
        const csv = [header, ...rows].map((row) => row.map(csvCell).join(',')).join('\n');
        return new Response(`${csv}\n`, {
          headers: {
            'content-type': 'text/csv; charset=utf-8',
            'content-disposition': `attachment; filename="texas-property-tax-rate-changes-${data.previousYear}-${data.currentYear}.csv"`,
            'cache-control': 'public, max-age=21600, stale-while-revalidate=86400',
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
