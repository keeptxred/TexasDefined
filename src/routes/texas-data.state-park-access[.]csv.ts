import { createFileRoute } from '@tanstack/react-router';
import type {} from '@tanstack/react-start';

export const Route = createFileRoute('/texas-data/state-park-access.csv')({
  server: {
    handlers: {
      GET: async () => {
        const { loadStateParkAccessServer } = await import('@/data/research/state-park-access.server');
        const data = await loadStateParkAccessServer();
        if (!data.available) return new Response('Complete state-park access dataset is temporarily unavailable', { status: 503, headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store', 'retry-after': '300', 'x-robots-tag': 'noindex, follow' } });
        const header = ['county_name', 'county_slug', 'fips', 'population_2020', 'county_reference_latitude', 'county_reference_longitude', 'nearest_state_park', 'nearest_state_park_slug', 'park_county', 'straight_line_miles', 'park_source_url'];
        const rows = data.rows.slice().sort((a, b) => a.countyName.localeCompare(b.countyName)).map((row) => [row.countyName, row.countySlug, row.fips, row.population2020 ?? '', row.referenceLatitude.toFixed(6), row.referenceLongitude.toFixed(6), row.nearestParkName, row.nearestParkSlug, row.parkCounty ?? '', row.distanceMiles.toFixed(4), row.parkSourceUrl ?? '']);
        const csv = [header, ...rows].map((row) => row.map(csvCell).join(',')).join('\n');
        return new Response(`${csv}\n`, { headers: { 'content-type': 'text/csv; charset=utf-8', 'content-disposition': 'attachment; filename="texas-county-state-park-access.csv"', 'cache-control': 'public, max-age=86400, stale-while-revalidate=604800', 'x-robots-tag': 'noindex, follow' } });
      },
    },
  },
});

function csvCell(value: string | number) {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
