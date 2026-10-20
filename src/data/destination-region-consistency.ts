import type { Destination, TexasRegion } from "./types";

/**
 * Canonical travel-region corrections for independently identifiable attractions.
 *
 * Keep this evidence-led: entries below are backed by the actual city/county and
 * coordinates in the site's curated destination sources, not by a keyword in a
 * venue description. The seven Explore regions are an editorial travel taxonomy,
 * so overlapping boundary areas must not be reclassified by a crude statewide
 * coordinate formula. Only clearly unambiguous assignments belong here.
 *
 * This map overrides stale/mistagged rows after all remote and local catalogs
 * merge; it also protects server-rendered regional pages, related cards and
 * JSON-LD from the same bad upstream classification.
 */
export const CANONICAL_DESTINATION_TRAVEL_REGIONS: Readonly<Record<string, TexasRegion>> = {
  "abilene-state-park": "panhandle",
  "big-bend-national-park": "big-bend",
  "guadalupe-mountains-national-park": "big-bend",
  "fort-davis-national-historic-site": "big-bend",
  "palo-duro-canyon-state-park": "panhandle",
  "caprock-canyons-state-park": "panhandle",
  "caprock-canyons-state-park-trailway": "panhandle",
  "cadillac-ranch": "panhandle",
  "texas-state-aquarium": "gulf-coast",
  "moody-gardens": "gulf-coast",
  "galveston-island-historic-pleasure-pier": "gulf-coast",
  "padre-island-national-seashore": "gulf-coast",
  "houston-zoo": "gulf-coast",
  "downtown-aquarium-houston": "gulf-coast",
  "houston-interactive-aquarium-animal-preserve": "gulf-coast",
  "space-center-houston": "gulf-coast",
  "houston-museum-of-natural-science": "gulf-coast",
  "brazos-bend-state-park": "gulf-coast",
  "sixth-floor-museum-at-dealey-plaza": "prairies-lakes",
  "fort-worth-stockyards": "prairies-lakes",
  "dallas-arboretum-and-botanical-garden": "prairies-lakes",
  "dinosaur-valley-state-park": "prairies-lakes",
  "texas-state-capitol": "hill-country",
  "bullock-texas-state-history-museum": "hill-country",
  "natural-bridge-caverns": "hill-country",
  "hamilton-pool-preserve": "hill-country",
  "fredericksburg-historic-district": "hill-country",
  "inner-space-cavern": "hill-country",
  "natural-bridge-wildlife-ranch": "hill-country",
  "lady-bird-johnson-wildflower-center": "hill-country",
  "gruene-historic-district": "hill-country",
} as const;

// City-level corrections apply only where the seven TexasDefined travel regions
// are unambiguous. Do not infer a destination's region from an arbitrary county
// postal address, nearby metro, or a rough statewide coordinate rectangle.
// Border cities such as San Antonio are deliberately excluded for manual review.
export const UNAMBIGUOUS_CITY_TRAVEL_REGIONS: Readonly<Record<string, TexasRegion>> = {
  "houston": "gulf-coast",
  "galveston": "gulf-coast",
  "corpus christi": "gulf-coast",
  "webster": "gulf-coast",
  "league city": "gulf-coast",
  "port aransas": "gulf-coast",
  "rockport": "gulf-coast",
  "amarillo": "panhandle",
  "canyon": "panhandle",
  "lubbock": "panhandle",
  "quitaque": "panhandle",
  "dallas": "prairies-lakes",
  "fort worth": "prairies-lakes",
  "arlington": "prairies-lakes",
  "denton": "prairies-lakes",
  "glen rose": "prairies-lakes",
  "el paso": "big-bend",
  "alpine": "big-bend",
  "marfa": "big-bend",
  "terlingua": "big-bend",
  "fort davis": "big-bend",
  "balmorhea": "big-bend",
  "tyler": "piney-woods",
  "nacogdoches": "piney-woods",
  "lufkin": "piney-woods",
  "jefferson": "piney-woods",
  "brownsville": "south-texas",
  "mcallen": "south-texas",
  "laredo": "south-texas",
  "edinburg": "south-texas",
  "fredericksburg": "hill-country",
  "kerrville": "hill-country",
  "wimberley": "hill-country",
  "blanco": "hill-country",
  "boerne": "hill-country",
} as const;

export function correctDestinationTravelRegion(destination: Destination): Destination {
  // Exact verified venue assignments take precedence over a mailing city.
  const city = destination.nearestTown?.trim().toLocaleLowerCase("en-US") ?? "";
  const verifiedRegion = CANONICAL_DESTINATION_TRAVEL_REGIONS[destination.slug]
    ?? UNAMBIGUOUS_CITY_TRAVEL_REGIONS[city];
  return verifiedRegion && verifiedRegion !== destination.region
    ? { ...destination, region: verifiedRegion }
    : destination;
}

/**
 * Guard against indisputably distant places being labeled Hill Country.
 * This is a conservative exclusion envelope, NOT a statewide 7-region
 * classifier. Near-boundary areas (e.g. San Antonio and Uvalde County) stay
 * governed by a fact-checked editorial assignment rather than an inferred
 * rectangular boundary.
 */
export function isGeographicallyPlausibleForTravelRegion(
  destination: Destination,
  requestedRegion: TexasRegion,
): boolean {
  const { lat, lng } = destination.coordinates ?? { lat: 0, lng: 0 };
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || (lat === 0 && lng === 0)) {
    return true; // Unknown coordinates require individual research, not a guess.
  }
  if (requestedRegion === "hill-country") {
    return lat >= 28.5 && lat <= 32 && lng >= -101 && lng <= -97;
  }
  return true;
}
