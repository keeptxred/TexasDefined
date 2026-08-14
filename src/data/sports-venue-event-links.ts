import { MAJOR_TEXAS_SPORTS_VENUES } from './knowledge-graph/major-sports-venues';
import { applyCurrentEntityCorrections } from './knowledge-graph/current-entity-corrections';
import { TEXAS_SPORTS_VENUE_TIER2_ENTITIES } from './knowledge-graph/sports-venues-tier2';

export interface SportsVenueEventLink {
  venueName: string;
  href: string;
  matchedOn: string;
}

type VenueTarget = { venueName: string; href: string };

function normalizeVenueName(value: string) {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function buildExactVenueIndex() {
  const venues = [...MAJOR_TEXAS_SPORTS_VENUES, ...TEXAS_SPORTS_VENUE_TIER2_ENTITIES]
    .map(applyCurrentEntityCorrections);
  const bySlug = new Map(venues.map((venue) => [venue.slug, venue] as const));
  const candidates = new Map<string, VenueTarget[]>();

  const add = (label: string, target: VenueTarget) => {
    const key = normalizeVenueName(label);
    if (!key) return;
    const existing = candidates.get(key) ?? [];
    if (!existing.some((row) => row.href === target.href)) existing.push(target);
    candidates.set(key, existing);
  };

  for (const venue of bySlug.values()) {
    const target = { venueName: venue.name, href: `/sports-venue/${venue.slug}` };
    add(venue.name, target);
    for (const alias of venue.aliases) add(alias, target);
  }

  // Reliant Stadium is a governed current-name record with the former NRG name
  // retained as an explicit alias even when the standalone entity is supplied
  // outside the two sports seed arrays.
  const reliant = { venueName: 'Reliant Stadium', href: '/sports-venue/reliant-stadium' };
  add('Reliant Stadium', reliant);
  add('NRG Stadium', reliant);

  const exact = new Map<string, VenueTarget>();
  for (const [key, targets] of candidates) {
    if (targets.length === 1) exact.set(key, targets[0]);
  }
  return exact;
}

const EXACT_VENUE_INDEX = buildExactVenueIndex();

/**
 * Resolve an event venue only when the complete venue string exactly matches a
 * verified sports-venue name or explicit alias after punctuation/whitespace
 * normalization. Broad cities, substrings and fuzzy similarities never match.
 * Alias collisions fail closed because ambiguous keys are excluded from the
 * exact index.
 */
export function resolveSportsVenueEventLink(venue: string | undefined): SportsVenueEventLink | undefined {
  if (!venue) return undefined;
  const key = normalizeVenueName(venue);
  if (!key) return undefined;
  const target = EXACT_VENUE_INDEX.get(key);
  return target ? { ...target, matchedOn: venue } : undefined;
}

export function sportsVenueEventLinkKey(value: string) {
  return normalizeVenueName(value);
}
