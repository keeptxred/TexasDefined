import type { CorporateEventProvider } from './corporate-events';

/**
 * Evidence-backed point for either a provider entrance/parcel or an official
 * ZIP Code Tabulation Area (ZCTA) representative point.
 *
 * A city centroid, guessed address, venue-area label or user IP is NOT a venue
 * coordinate. No coordinates have been enrolled yet: source checks are required.
 */
export type VerifiedCorporateEventPoint = {
  latitude: number;
  longitude: number;
  sourceUrl: string;
  verifiedOn: string;
  precision: 'venue-entrance' | 'venue-premises' | 'zcta-representative';
};
export type VerifiedVenueLocation = {
  providerSlug: string;
  point: VerifiedCorporateEventPoint;
};
export type VerifiedZipLocation = {
  zip: string;
  point: VerifiedCorporateEventPoint;
};
export type CorporateEventRadiusMatch = {
  provider: CorporateEventProvider;
  straightLineMiles: number;
  estimateOnly: true;
};

const EARTH_RADIUS_MILES = 3958.7613;
const bounded = (v: number, lo: number, hi: number) => Number.isFinite(v) && v >= lo && v <= hi;

/** Reject unsourced, future-dated, imprecise or implausible coordinates. */
export function validVerifiedCorporateEventPoint(
  point: VerifiedCorporateEventPoint,
  expected: 'venue' | 'zcta',
  asOf: string,
) {
  if (!point || !bounded(point.latitude, 25.8, 36.6) || !bounded(point.longitude, -106.7, -93.4)) return false;
  if (expected === 'venue' && !['venue-entrance', 'venue-premises'].includes(point.precision)) return false;
  if (expected === 'zcta' && point.precision !== 'zcta-representative') return false;
  try {
    const source = new URL(point.sourceUrl);
    if (source.protocol !== 'https:' || !source.hostname) return false;
  } catch { return false; }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(point.verifiedOn) || !/^\d{4}-\d{2}-\d{2}$/.test(asOf)) return false;
  const stamp = new Date(point.verifiedOn + 'T12:00:00Z');
  return Number.isFinite(stamp.getTime()) && stamp.toISOString().slice(0, 10) === point.verifiedOn
    && point.verifiedOn <= asOf;
}

function degreesToRadians(n: number) { return n * Math.PI / 180; }

/** Geographic great-circle approximation; NEVER a drive-time or road-mile claim. */
export function corporateEventAirMiles(a: VerifiedCorporateEventPoint, b: VerifiedCorporateEventPoint) {
  const lat = degreesToRadians(b.latitude - a.latitude);
  const lon = degreesToRadians(b.longitude - a.longitude);
  const h = Math.sin(lat / 2) ** 2 + Math.cos(degreesToRadians(a.latitude))
    * Math.cos(degreesToRadians(b.latitude)) * Math.sin(lon / 2) ** 2;
  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(Math.min(1, Math.max(0, h))));
}

/**
 * Pure, privacy-safe matching. Neither coordinates nor ZIP queries are saved.
 * Missing provider/ZIP evidence must never masquerade as "no nearby venues".
 * A ZCTA representative point is an approximation, not a household location.
 */
export function searchCorporateEventVerifiedRadius(
  providers: readonly CorporateEventProvider[],
  zip: string,
  radiusMiles: number,
  zipLocations: readonly VerifiedZipLocation[],
  venueLocations: readonly VerifiedVenueLocation[],
  asOf: string,
): {
  status: 'unsupported_zip' | 'no_verified_venues' | 'ready';
  matches: CorporateEventRadiusMatch[];
  excludedUnverified: number;
  originType: 'zcta-representative' | null;
  distanceBasis: 'straight-line-estimate-not-driving';
} {
  const empty = (status: 'unsupported_zip' | 'no_verified_venues', count: number) => ({
    status, matches: [] as CorporateEventRadiusMatch[], excludedUnverified: count,
    originType: null, distanceBasis: 'straight-line-estimate-not-driving' as const,
  });
  if (!/^\d{5}$/.test(zip) || !bounded(radiusMiles, 1, 250)) return empty('unsupported_zip', providers.length);
  const candidates = zipLocations.filter((item) => item.zip === zip
    && validVerifiedCorporateEventPoint(item.point, 'zcta', asOf));
  if (candidates.length !== 1) return empty('unsupported_zip', providers.length);
  const origin = candidates[0].point;
  const sourceBySlug = new Map<string, VerifiedCorporateEventPoint[]>();
  for (const v of venueLocations) {
    if (!validVerifiedCorporateEventPoint(v.point, 'venue', asOf)) continue;
    const list = sourceBySlug.get(v.providerSlug) || [];
    list.push(v.point); sourceBySlug.set(v.providerSlug, list);
  }
  let excludedUnverified = 0;
  const matches: CorporateEventRadiusMatch[] = [];
  for (const provider of providers) {
    const located = sourceBySlug.get(provider.slug);
    if (!located || located.length !== 1) { excludedUnverified++; continue; }
    const distance = corporateEventAirMiles(origin, located[0]);
    if (distance <= radiusMiles) {
      matches.push({ provider, straightLineMiles: Math.round(distance * 10) / 10, estimateOnly: true });
    }
  }
  if (excludedUnverified === providers.length) return empty('no_verified_venues', excludedUnverified);
  matches.sort((a, b) => a.straightLineMiles - b.straightLineMiles || a.provider.name.localeCompare(b.provider.name));
  return { status: 'ready', matches, excludedUnverified,
    originType: 'zcta-representative', distanceBasis: 'straight-line-estimate-not-driving' };
}
