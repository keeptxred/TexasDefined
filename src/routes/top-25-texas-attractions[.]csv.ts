import { createFileRoute } from '@tanstack/react-router';

import { topAttractionExpansionDestinations } from '@/data/destination-curation-top-attractions-fallbacks';
import { topAttractionDestinations } from '@/data/destination-curation-top-attractions';
import { resolveTopAttractionAuthority } from '@/data/top-attraction-authority-resolver';
import { TOP_TEXAS_ATTRACTIONS } from '@/data/top-texas-attractions';
import type { Destination } from '@/data/types';

const siteUrl = 'https://texasdefined.com';
const methodologyUrl = `${siteUrl}/explore/top-attractions/methodology`;
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
  'methodology_url',
] as const;

const catalog = [...topAttractionDestinations, ...topAttractionExpansionDestinations];
const bySlug = new Map<string, Destination>(catalog.map((destination) => [destination.slug, destination]));

export const Route = createFileRoute('/top-25-texas-attractions.csv')({
  server: {
    handlers: {
      GET: async () => {
        const lines = [
          headers.join(','),
          ...TOP_TEXAS_ATTRACTIONS.flatMap((entry) => {
            const base = bySlug.get(entry.slug);
            if (!base) return [];
            const destination = resolveTopAttractionAuthority(base);
            const assessment = destination.authorityGuide?.assessment;
            const sources = destination.authorityGuide?.sources ?? [];
            return [[
              String(entry.rank),
              destination.name,
              `${siteUrl}/destination/${destination.slug}`,
              destination.nearestTown,
              destination.county ?? '',
              destination.region,
              destination.category,
              assessment?.recommendedVisit ?? '',
              assessment?.physicalEffort ?? '',
              assessment?.weatherExposure ?? '',
              assessment?.planningLevel ?? '',
              assessment?.familyFit ?? '',
              assessment?.firstTimeValue ?? '',
              destination.sourceCheckedAt ?? '',
              destination.officialUrl ?? '',
              String(sources.length),
              sources.map((source) => source.url).join('; '),
              methodologyUrl,
            ].map(csvCell).join(',')];
          }),
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
