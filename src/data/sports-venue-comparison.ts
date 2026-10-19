import { applyCurrentEntityCorrections } from './knowledge-graph/current-entity-corrections';
import { canonicalEntityPath } from './knowledge-graph/relationships';
import { CURATED_KNOWLEDGE_GRAPH_SEED } from './knowledge-graph/seed';
import type { TexasEntityRecord } from './knowledge-graph/types';
import { getSportsVenueEnrichmentAll } from './sports-venue-enrichment-all';

export type SportsVenueComparisonRow = {
  venue: TexasEntityRecord;
  canonicalPath: string;
  city?: string;
  county?: string;
  region?: string;
  type: string;
  capacity?: string;
  opened?: string;
  verifiedAt?: string;
  officialUrl?: string;
};

const venueRecords = [...new Map(
  CURATED_KNOWLEDGE_GRAPH_SEED
    .filter((entity) => entity.kind === 'sports-venue')
    .map(applyCurrentEntityCorrections)
    .map((entity) => [entity.slug, entity] as const),
).values()];

export const SPORTS_VENUE_COMPARISON_ROWS: readonly SportsVenueComparisonRow[] = venueRecords
  .map((venue) => {
    const enrichment = getSportsVenueEnrichmentAll(venue.slug);
    return {
      venue,
      canonicalPath: canonicalEntityPath(venue),
      city: enrichment?.city,
      county: venue.countySlug ? `${titleCase(venue.countySlug)} County` : undefined,
      region: venue.region ? titleCase(venue.region) : undefined,
      type: sportsVenueComparisonType(venue),
      capacity: enrichment?.capacity,
      opened: enrichment?.opened,
      verifiedAt: enrichment?.verifiedAt ?? venue.sourceCheckedAt,
      officialUrl: venue.officialUrl,
    };
  })
  .sort((left, right) => left.type.localeCompare(right.type) || left.venue.name.localeCompare(right.venue.name));

export const SPORTS_VENUE_COMPARISON_WITH_CAPACITY = SPORTS_VENUE_COMPARISON_ROWS.filter((row) => Boolean(row.capacity)).length;
export const SPORTS_VENUE_COMPARISON_WITH_OPENED = SPORTS_VENUE_COMPARISON_ROWS.filter((row) => Boolean(row.opened)).length;
export const SPORTS_VENUE_COMPARISON_LATEST_REVIEW = SPORTS_VENUE_COMPARISON_ROWS
  .map((row) => row.verifiedAt)
  .filter((value): value is string => Boolean(value))
  .sort()
  .at(-1);

export function sportsVenueComparisonType(venue: TexasEntityRecord) {
  const tags = new Set(venue.tags ?? []);
  if (tags.has('motorsports')) return 'Motorsports';
  if (tags.has('golf')) return 'Golf';
  if (tags.has('high-school')) return 'High-school football';
  if (tags.has('rodeo') || tags.has('equestrian') || tags.has('western-sports')) return 'Rodeo / Western sports';
  if (tags.has('tournament-complex')) return 'Tournament complex';
  if (tags.has('shooting-sports')) return 'Shooting sports';
  if (tags.has('action-sports')) return 'Action sports';
  if (tags.has('horse-racing')) return 'Horse racing';
  if (tags.has('college-baseball')) return 'College baseball';
  if (tags.has('college')) return 'College sports';
  if (tags.has('professional')) return 'Professional sports';
  if (tags.has('minor-league')) return 'Minor league';
  return 'Sports venue';
}

function titleCase(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}
