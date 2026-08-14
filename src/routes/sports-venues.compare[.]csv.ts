import { createFileRoute } from '@tanstack/react-router';

import { SPORTS_VENUE_COMPARISON_ROWS } from '@/data/sports-venue-comparison';

const siteUrl = 'https://texasdefined.com';
const headers = [
  'venue_name',
  'canonical_url',
  'city',
  'county',
  'region',
  'venue_type',
  'capacity',
  'opened',
  'source_checked_at',
  'official_url',
] as const;

export const Route = createFileRoute('/sports-venues/compare.csv')({
  server: {
    handlers: {
      GET: async () => {
        const lines = [
          headers.join(','),
          ...SPORTS_VENUE_COMPARISON_ROWS.map((row) => [
            row.venue.name,
            `${siteUrl}${row.canonicalPath}`,
            row.city ?? '',
            row.county ?? '',
            row.region ?? '',
            row.type,
            row.capacity ?? '',
            row.opened ?? '',
            row.verifiedAt ?? '',
            row.officialUrl ?? '',
          ].map(csvCell).join(',')),
        ];

        return new Response(`${lines.join('\n')}\n`, {
          headers: {
            'content-type': 'text/csv; charset=utf-8',
            'content-disposition': 'attachment; filename="texasdefined-sports-venue-comparison.csv"',
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
