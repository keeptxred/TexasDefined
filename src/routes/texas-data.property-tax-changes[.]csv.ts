import { createFileRoute } from '@tanstack/react-router';
import type {} from '@tanstack/react-start';

export const Route = createFileRoute('/texas-data/property-tax-changes.csv')({
  server: {
    handlers: {
      GET: async () => {
        const { loadTexasPropertyTaxChanges } = await import('@/data/property/property-tax-change-research.server');
        const data = await loadTexasPropertyTaxChanges();
        if (!data.available) return new Response('Finalized Texas property-tax rate comparison temporarily unavailable', { status: 503, headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex, follow' } });
        const header = ['type', 'slug', 'name', 'county_slugs', 'previous_year', 'previous_rate', 'current_year', 'current_rate', 'rate_point_change', 'rate_change_percent', 'source_url'];
        const rows = data.rows.map((row) => [row.type, row.slug, row.name, row.countySlugs.join('; '), row.previousYear, row.previousRate.toFixed(6), row.currentYear, row.currentRate.toFixed(6), row.rateChange.toFixed(6), row.rateChangePercent.toFixed(6), row.sourceUrl]);
        const csv = [header, ...rows].map((row) => row.map(csvCell).join(',')).join('\n');
        return new Response(`${csv}\n`, { headers: { 'content-type': 'text/csv; charset=utf-8', 'content-disposition': `attachment; filename="texas-property-tax-rate-changes-${data.previousYear}-${data.currentYear}.csv"`, 'cache-control': 'public, max-age=86400, stale-while-revalidate=604800', 'x-robots-tag': 'noindex, follow' } });
      },
    },
  },
});

function csvCell(value: string | number) { const text = String(value); return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text; }
