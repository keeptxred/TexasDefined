import { createFileRoute } from '@tanstack/react-router';
import type {} from '@tanstack/react-start';

import { TEXAS_CITIES, TEXAS_COUNTIES } from '@/data/texas-places';

export const Route = createFileRoute('/texas-data/city-county-relationships.csv')({
  server: {
    handlers: {
      GET: async () => {
        const countyByName = new Map(TEXAS_COUNTIES.map((county) => [county.name.replace(/ County$/, ''), county] as const));
        const header = ['city_name', 'city_slug', 'county_name', 'county_slug', 'region', 'county_registry_match'];
        const rows = TEXAS_CITIES
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((city) => {
            const county = countyByName.get(city.county) ?? null;
            return [city.name, city.slug, `${city.county} County`, county?.slug ?? '', city.region, county ? 'matched' : 'pending'];
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
