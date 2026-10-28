/**
 * Build 1 marketplace domain contract. This is additive to the existing
 * /corporate-events directory; no portal, booking, payment or quote transport.
 * Independent editorial entries are NOT participating or sponsored partners.
 */
import type { CorporateEventProvider } from './corporate-events.ts';

export const marketplaceOccasions = [
  'corporate-events','team-building','employee-appreciation','company-parties',
  'client-entertainment','family-reunions','birthdays','graduations','anniversaries',
  'bachelor-parties','bachelorette-parties','weddings','rehearsal-dinners','private-gatherings',
] as const;
export const marketplaceActivities = [
  'escape-room','mini-golf','golf-entertainment','bowling','arcade','virtual-reality',
  'laser-tag','cooking-class','group-cruise','fishing-charter','guided-tour',
  'outdoor-adventure','private-dining','group-sports','team-competition',
] as const;
export const marketplaceAmenities = [
  'food-available','full-restaurant','catering-available','outside-catering-permitted',
  'bar-available','separate-alcohol-billing','parking','wheelchair-accessibility',
  'audiovisual-equipment','private-meeting-space',
] as const;
export type OccasionKey = typeof marketplaceOccasions[number];
export type ActivityKey = typeof marketplaceActivities[number];
export type AmenityKey = typeof marketplaceAmenities[number];
export type MarketplaceSetting = 'indoor'|'outdoor'|'mixed'|'unknown';
export type MarketplaceVerification = 'unverified'|'verified'|'stale';
export type MarketplaceParticipation = 'independent'|'participating'|'sponsored';
export type MarketplaceMediaRights = 'authorized'|'licensed'|'owned'|'approved-promo'|'unconfirmed';
export type MarketplaceSource = {
  officialUrl: string | null;
  lastCheckedAt: string | null;
  lastVerifiedAt: string | null;
  status: MarketplaceVerification;
};
export type MarketplaceProvider = {
  /** Existing Explore entity UUID, once identity has been resolved. */
  entityId: string | null;
  /** Existing corporate venue slug until a trusted entity link is established. */
  legacySlug: string | null;
  name: string;
  source: MarketplaceSource;
};
export type MarketplaceLocation = {
  /** Existing Explore location UUID; do not copy addresses into a new table. */
  locationId: string | null;
  provider: MarketplaceProvider;
  city: string | null;
  area: string | null;
  /** A location capacity does not imply that any given activity can host this many. */
  publishedVenueMaximum: number | null;
  setting: MarketplaceSetting;
  source: MarketplaceSource;
};
export type MarketplacePackage = {
  id: string;
  experienceId: string;
  name: string;
  minParticipants: number | null;
  maxParticipants: number | null;
  durationMinutes: number | null;
  pricePerPersonCents: number | null;
  minimumSpendCents: number | null;
  validFrom: string | null;
  validUntil: string | null;
  source: MarketplaceSource;
};
export type MarketplaceExperience = {
  id: string;
  provider: MarketplaceProvider;
  /** Null for mobile/multi-location services, not a fabricated home address. */
  locationId: string | null;
  servedCities: readonly string[];
  name: string;
  minParticipants: number | null;
  maxParticipants: number | null;
  simultaneousCapacity: number | null;
  rotationsConfirmed: boolean;
  durationMinutes: number | null;
  setting: MarketplaceSetting;
  groupBookingStatus: 'eligible'|'ineligible'|'unknown';
  foodStatus: 'available'|'unavailable'|'unknown';
  occasions: readonly OccasionKey[];
  activities: readonly ActivityKey[];
  verifiedAmenities: readonly AmenityKey[];
  participation: MarketplaceParticipation;
  participationApprovedAt: string | null;
  /** Server-verified partner agreement/identity approval; never inferred from an application. */
  participationEvidenceVerified: boolean;
  sponsorshipApprovedAt: string | null;
  source: MarketplaceSource;
  /** Only rights-cleared media may be displayed as real venue imagery. */
  primaryMediaId: string | null;
  mediaRights: MarketplaceMediaRights;
  published: boolean;
};
export type MarketplaceSearch = {
  city?: string;
  groupSize?: number;
  occasion?: OccasionKey;
  activity?: ActivityKey;
  indoorOnly?: boolean;
  foodRequired?: boolean;
  amenities?: readonly AmenityKey[];
  participatingOnly?: boolean;
};
export type MarketplaceMatch = {
  experience: MarketplaceExperience;
  fit: 'simultaneous' | 'rotating' | 'unspecified';
};

const validHttps = (value: string | null) => {
  if (!value) return false;
  try { const url = new URL(value); return url.protocol === 'https:' && !!url.hostname; }
  catch { return false; }
};
const positiveIntegerOrNull = (value: number | null) =>
  value === null || (Number.isSafeInteger(value) && value > 0);

export function validateMarketplaceExperience(item: MarketplaceExperience): string[] {
  const errors: string[] = [];
  if (!item.id || !item.name.trim()) errors.push('Missing experience identity or name');
  if (!item.provider.entityId && !item.provider.legacySlug) errors.push('Missing provider identity');
  if (!validHttps(item.source.officialUrl)) errors.push('Missing official HTTPS evidence');
  if (!positiveIntegerOrNull(item.minParticipants) || !positiveIntegerOrNull(item.maxParticipants)
    || !positiveIntegerOrNull(item.simultaneousCapacity) || !positiveIntegerOrNull(item.durationMinutes)) {
    errors.push('Invalid numerical capacity or duration');
  }
  if (item.minParticipants !== null && item.maxParticipants !== null
    && item.maxParticipants < item.minParticipants) errors.push('Minimum group exceeds maximum');
  if (item.simultaneousCapacity !== null && item.maxParticipants !== null
    && item.simultaneousCapacity > item.maxParticipants) errors.push('Simultaneous capacity exceeds event maximum');
  if (item.participation !== 'independent'
    && (!item.participationApprovedAt || !item.participationEvidenceVerified)) {
    errors.push('Partner participation must be explicitly verified and approved');
  }
  if (item.participation === 'sponsored' && !item.sponsorshipApprovedAt) {
    errors.push('Sponsored status requires explicit promotional approval');
  }
  if (item.primaryMediaId && item.mediaRights === 'unconfirmed') {
    errors.push('Real venue imagery requires approved rights');
  }
  for (const occasion of item.occasions) {
    if (!(marketplaceOccasions as readonly string[]).includes(occasion)) errors.push('Unsupported occasion');
  }
  for (const activity of item.activities) {
    if (!(marketplaceActivities as readonly string[]).includes(activity)) errors.push('Unsupported activity');
  }
  for (const amenity of item.verifiedAmenities) {
    if (!(marketplaceAmenities as readonly string[]).includes(amenity)) errors.push('Unsupported amenity');
  }
  return errors;
}
export function marketplaceCapacityFit(
  item: MarketplaceExperience, size: number | undefined,
): MarketplaceMatch['fit'] | null {
  if (size === undefined) return 'unspecified';
  if (!Number.isSafeInteger(size) || size < 1) return null;
  if (item.maxParticipants === null || item.maxParticipants < size) return null;
  if (item.minParticipants !== null && size < item.minParticipants) return null;
  if (item.simultaneousCapacity !== null && item.simultaneousCapacity >= size) return 'simultaneous';
  if (item.rotationsConfirmed) return 'rotating';
  // Unknown simultaneous capacity is not a verified group-size match.
  return null;
}
/** Editorial eligibility never uses sponsorship as a ranking boost. */
export function findMarketplaceExperiences(
  experiences: readonly MarketplaceExperience[], search: MarketplaceSearch,
): MarketplaceMatch[] {
  const requestedCity = search.city?.trim().toLowerCase();
  const matches: MarketplaceMatch[] = [];
  for (const item of experiences) {
    if (!item.published || item.source.status !== 'verified' || !item.source.lastVerifiedAt) continue;
    if (validateMarketplaceExperience(item).length) continue;
    if (search.participatingOnly && item.participation === 'independent') continue;
    if (requestedCity && !item.servedCities.some(city => city.toLowerCase() === requestedCity)) continue;
    if (search.occasion && !item.occasions.includes(search.occasion)) continue;
    if (search.activity && !item.activities.includes(search.activity)) continue;
    if (search.indoorOnly && item.setting !== 'indoor') continue;
    if (search.foodRequired && item.foodStatus !== 'available') continue;
    if (search.groupSize !== undefined && item.groupBookingStatus !== 'eligible') continue;
    if (search.amenities?.some(amenity => !item.verifiedAmenities.includes(amenity))) continue;
    const fit = marketplaceCapacityFit(item, search.groupSize);
    if (fit === null) continue;
    matches.push({ experience: item, fit });
  }
  return matches;
}
/** Reject duplicate identities and malformed records before catalog publication. */
export function validateMarketplaceCatalog(items: readonly MarketplaceExperience[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const item of items) {
    if (ids.has(item.id)) errors.push('Duplicate experience ID: ' + item.id);
    ids.add(item.id);
    errors.push(...validateMarketplaceExperience(item).map(message => item.id + ': ' + message));
  }
  return errors;
}
export function packageFitsGroup(pkg: MarketplacePackage, size: number, asOf?: string): boolean {
  if (pkg.validFrom && (!asOf || asOf < pkg.validFrom)) return false;
  if (pkg.validUntil && (!asOf || asOf > pkg.validUntil)) return false;
  return Number.isSafeInteger(size) && size > 0
    && pkg.minParticipants !== null && pkg.maxParticipants !== null
    && pkg.minParticipants <= size && size <= pkg.maxParticipants
    && pkg.source.status === 'verified' && !!pkg.source.lastVerifiedAt;
}
/**
 * Preserve the existing editorial venue inventory, URLs, and capacities.
 * A legacy provider becomes an independent location candidate, NOT a verified
 * activity, partner, package, or one-address-per-brand assertion.
 */
export function legacyCorporateVenueLocation(
  venue: CorporateEventProvider,
): MarketplaceLocation {
  return {
    locationId: null,
    provider: {
      entityId: null, legacySlug: venue.slug, name: venue.name,
      source: { officialUrl: venue.sourceUrl, lastCheckedAt: null,
        lastVerifiedAt: venue.verifiedOn, status: 'verified' },
    },
    city: venue.city, area: venue.area,
    publishedVenueMaximum: venue.maxGroup, setting: 'unknown',
    source: { officialUrl: venue.sourceUrl, lastCheckedAt: null,
      lastVerifiedAt: venue.verifiedOn, status: 'verified' },
  };
}
