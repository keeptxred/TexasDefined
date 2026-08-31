import { austinMuseumDestinations } from "./museum-expansion-austin";
import { dfwMuseumDestinations } from "./museum-expansion-dfw";
import { houstonGalvestonMuseumDestinations } from "./museum-expansion-houston-galveston";
import { sanAntonioContemporaryMuseumDestinations } from "./museum-expansion-san-antonio-contemporary";
import { sanAntonioMuseumDestinations } from "./museum-expansion-san-antonio";
import { wacoMuseumDestinations } from "./museum-expansion-waco";
import type { Destination } from "./types";

const EXPANSION_MUSEUM_SLUGS = new Set([
  ...houstonGalvestonMuseumDestinations,
  ...dfwMuseumDestinations,
  ...austinMuseumDestinations,
  ...sanAntonioMuseumDestinations,
  ...sanAntonioContemporaryMuseumDestinations,
  ...wacoMuseumDestinations,
].map((destination) => destination.slug));

/**
 * Visitor-facing historic sites in the existing catalog that function as
 * museums or interpreted museum campuses even when "museum" is not in the name.
 * Keep this list conservative; ordinary monuments and outdoor-only landmarks
 * belong on Historic Sites & Museums rather than the museum collection.
 */
const INTERPRETED_MUSEUM_SITE_SLUGS = new Set([
  "space-center-houston",
  "varner-hogg-plantation",
  "san-felipe-de-austin",
  "french-legation",
  "waco-mammoth-national-monument",
  "washington-on-the-brazos",
  "casa-navarro",
  "fulton-mansion",
  "presidio-la-bahia",
  "bush-family-home",
  "magoffin-home",
  "caddo-mounds-state-historic-site",
]);

const MUSEUM_NAME_PATTERN = /\b(museum|museums|library|hall of fame|science center|space center|heritage center|cultural center)\b/i;

export function isMuseumCollectionDestination(destination: Destination) {
  if (EXPANSION_MUSEUM_SLUGS.has(destination.slug) || INTERPRETED_MUSEUM_SITE_SLUGS.has(destination.slug)) return true;
  if (destination.category !== "historic-sites") return false;
  return MUSEUM_NAME_PATTERN.test(`${destination.name} ${destination.summary}`);
}

export function museumCollectionDestinations(destinations: Destination[]) {
  return destinations
    .filter(isMuseumCollectionDestination)
    .sort((left, right) => left.nearestTown.localeCompare(right.nearestTown) || left.name.localeCompare(right.name));
}
