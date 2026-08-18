import { createFileRoute } from '@tanstack/react-router';

import { TOP_ATTRACTION_REFERENCE_ROWS } from '@/data/top-attraction-reference-data';

const headers = [
  'rank',
  'attraction_name',
  'canonical_url',
  'nearest_town',
  'county',
  'region',
  'category',
  'recommended_visit',
  'physical_effort',
  'weather_exposure',
  'advance_planning',
  'family_fit',
  'first_time_texas_value',
  'source_checked_at',
  'official_url',
  'authority_source_count',
  'authority_source_urls',
  'road_trip_names',
  'methodology_url',
] as const;

export const Route = createFileRoute('/top-25-texas-attractions.csv')({
  server: {
    handlers: {
      GET: async () => {
        const lines = [
          headers.join(','),
          ...TOP_ATTRACTION_REFERENCE_ROWS.map((row) => [
            String(row.rank),
            row.name,
            row.canonicalUrl,
            row.nearestTown,
            row.county ?? '',
            row.region,
            row.category,
            row.recommendedVisit,
            row.physicalEffort,
            row.weatherExposure,
            row.advancePlanning,
            row.familyFit,
            row.firstTimeTexasValue,
            row.sourceCheckedAt ?? '',
            row.officialUrl ?? '',
            String(row.authoritySources.length),
            row.authoritySources.map((source) => source.url).join('; '),
            row.roadTrips.map((trip) => trip.name).join('; '),
            row.methodologyUrl,
          ].map(csvCell).join(',')),
        ];

        return new Response(`${lines.join('\n')}\n`, {
          headers: {
            'content-type': 'text/csv; charset=utf-8',
            'content-disposition': 'attachment; filename="texasdefined-top-25-texas-attractions.csv"',
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
