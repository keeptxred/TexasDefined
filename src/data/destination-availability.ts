import type { Destination } from "./types";

/**
 * Records we preserve for direct historical/future reference but should not
 * recommend as ordinary visitable Trip Planner stops today.
 */
const UNAVAILABLE_DESTINATION_SLUGS = new Set([
  "albert-bessie-kronkosky-state-natural-area",
  "powderhorn-state-park",
  "chinati-mountains-state-natural-area",
  "fairfield-lake-state-park",
  "davis-hill-state-park",
  "battleship-texas",
  "battleship-texas-state-historic-site",
]);

/**
 * Legacy unit, trailhead, renamed-site and duplicate import records that should
 * not compete with the canonical destination guide. Most of these slugs are
 * retained only so old links still resolve while curation can reuse the richer
 * canonical record. They stay out of Trip Planner, search publication and the
 * Explore sitemap. Curation-only spelling adapters whose canonical target is not
 * guaranteed to exist as a public route (for example Possum/Possums Kingdom)
 * are intentionally not added here.
 *
 * Porretto Beach is also retained here as a researched coastal reference because
 * it is privately owned and its 2026 public-access status is not reliable enough
 * to recommend as an ordinary visitable public-beach destination.
 */
const NON_PRIMARY_TRIP_PLANNER_SLUGS = new Set([
  "barton-warnock-environmental-educational-center-state-park",
  "caprock-canyons-trailway-estelline-terminal-state-park",
  "choke-canyon-calliham-unit-state-park",
  "choke-canyon-north-shore-unit-state-park",
  "choke-canyon-south-shore-unit-state-park",
  "cooper-lake-doctors-creek-unit-state-park",
  "cooper-lake-johns-creek-unit-state-park",
  "cooper-lake-south-sulphur-unit-state-park",
  "devil-s-sinkhole-state-natural-area",
  "devils-river-big-satan-unit-state-natural-area",
  "devils-river-del-norte-unit-state-natural-area",
  "enchanted-rock",
  "goliad-state-park",
  "goliad-state-park-state-historic-site",
  "hill-country-louise-merrick-unit-state-natural-area",
  "hueco-tanks-state-park",
  "hueco-tanks-state-park-state-historic-site",
  "indian-lodge-state-park-lodge",
  "lake-mineral-wells-trailway-garner-th-state-park",
  "lake-somerville-birch-creek-unit",
  "lake-somerville-birch-creek-unit-state-park",
  "lake-somerville-nails-creek-unit",
  "lake-somerville-nails-creek-unit-state-park",
  "lake-somerville-trailway-newman-bottom-th-state-park",
  "lyndon-b-johnson-state-park-historic-site",
  "lyndon-b-johnson-state-park-state-historic-site",
  "monument-hill-kreische-brewery-state-historic-site",
  "palo-duro-canyon",
  "porretto-beach",
  "port-isabel-lighthouse-state-park",
  "ray-roberts-lake-isle-du-bois-unit",
  "ray-roberts-lake-isle-du-bois-unit-state-park",
  "ray-roberts-lake-johnson-branch-unit",
  "ray-roberts-lake-johnson-branch-unit-state-park",
  "ray-roberts-lake-jordon-unit-state-park",
  "san-jacinto-battleground",
  "san-jacinto-monument-state-historic-site",
  "san-marcos-springs-spring-lake",
  "seminole-canyon-state-park",
  "seminole-canyon-state-park-state-historic-site",
  "sheldon-lake-state-park-environmental-learning-center",
  "washington-on-the-brazos",
  "world-birding-center-bentsen-rio-grande-valley-state-park",
  "world-birding-center-estero-llano-grande-state-park",
  "world-birding-center-resaca-de-la-palma-state-park",
]);

export function isCurrentlyVisitableDestination(destination: Destination): boolean {
  return !UNAVAILABLE_DESTINATION_SLUGS.has(destination.slug);
}

export function isPrimaryTripPlannerDestination(destination: Destination): boolean {
  return isCurrentlyVisitableDestination(destination) && !NON_PRIMARY_TRIP_PLANNER_SLUGS.has(destination.slug);
}

export function filterCurrentlyVisitableDestinations(destinations: Destination[]): Destination[] {
  return destinations.filter(isPrimaryTripPlannerDestination);
}

export function unavailableDestinationSlugs(): string[] {
  return [...UNAVAILABLE_DESTINATION_SLUGS];
}

export function nonPrimaryTripPlannerSlugs(): string[] {
  return [...NON_PRIMARY_TRIP_PLANNER_SLUGS];
}
