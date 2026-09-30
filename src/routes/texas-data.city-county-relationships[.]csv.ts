import { createFileRoute } from '@tanstack/react-router';
import type {} from '@tanstack/react-start';
import { buildCityCountyRelationships } from '@/data/city-county-relationships';

export const Route = createFileRoute('/texas-data/city-county-relationships.csv')({
  server: {
    handlers: {
      GET: async () => {
        const { TEXAS_CITIES, TEXAS_COUNTIES } = await import('@/data/texas-places');
        const relationships = buildCityCountyRelationships(TEXAS_CITIES, TEXAS_COUNTIES);
        const header = ['city_name', 'city_slug', 'primary_directory_county', 'all_counties', 'county_count', 'region', 'county_registry_match'];
        const rows = relationships
          .slice()
          .sort((a, b) => a.city.name.localeCompare(b.city.name))
          .map(({ city, counties }) => {
            const allMatched = counties.every(({ county }) => Boolean(county));
            return [
              city.name,
              city.slug,
              `${city.county} County`,
              counties.map(({ name }) => `${name} County`).join('; '),
              String(counties.length),
              city.region,
              allMatched ? 'matched' : 'pending',
            ];
          });
        const csv = [header, ...rows].map((row) => row.map(csvCell).join(',')).join('\n');

        return new Response(`${csv}\n`, {
          headers: {
            'content-type': 'text/csv; charset=utf-8',
            'content-disposition': 'attachment; filename="texasdefined-city-county-relationships.csv"',
            'cache-control': 'public, max-age=86400, stale-while-revalidate=604800',
            'x-robots-tag': 'noindex, follow',
          },
        });
      },
    },
  },
});

function csvCell(value: string) {
  return /[",\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
}
