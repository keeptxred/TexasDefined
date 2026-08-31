import type { Destination } from "./types";

/**
 * Visitor-facing historic sites that function as interpreted museums even when
 * their public name does not include a museum keyword. Keep this list small and
 * literal so the collection route does not import the full destination catalogs
 * into the client bundle merely to discover their slugs.
 */
const INTERPRETED_MUSEUM_SITE_SLUGS = new Set([
  "space-center-houston",
  "varner-hogg-plantation",
  "san-felipe-de-austin",
  "french-legation",
  "waco-mammoth-national-monument",
  "washington-on-the-brazos",
  "casa-navarro",
  "spanish-governors-palace-san-antonio",
  "fulton-mansion",
  "presidio-la-bahia",
  "bush-family-home",
  "magoffin-home",
  "caddo-mounds-state-historic-site",
]);

const MUSEUM_NAME_PATTERN = /\b(museum|museums|library|hall of fame|science center|space center|heritage center|cultural center)\b/i;

export function isMuseumCollectionDestination(destination: Destination) {
  if (INTERPRETED_MUSEUM_SITE_SLUGS.has(destination.slug)) return true;
  if (destination.category !== "historic-sites") return false;
  return MUSEUM_NAME_PATTERN.test(`${destination.name} ${destination.summary}`);
}

export function museumCollectionDestinations(destinations: Destination[]) {
  return destinations
    .filter(isMuseumCollectionDestination)
    .sort((left, right) => left.nearestTown.localeCompare(right.nearestTown) || left.name.localeCompare(right.name));
}
