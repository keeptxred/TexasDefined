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
 * Legacy unit, trailhead and duplicate import records that are not useful as
 * independent itinerary stops. Their parent destination remains available.
 * Keeping these out of the recommendation catalog prevents duplicate trips,
 * stale unit names and thin access-point pages from competing with the real
 * destination guide.
 */
const NON_PRIMARY_TRIP_PLANNER_SLUGS = new Set([
  "barton-warnock-environmental-educational-center-state-park",
  "caprock-canyons-trailway-estelline-terminal-state-park",
  "choke-canyon-north-shore-unit-state-park",
  "choke-canyon-south-shore-unit-state-park",
  "cooper-lake-doctors-creek-unit-state-park",
  "cooper-lake-johns-creek-unit-state-park",
  "devils-river-big-satan-unit-state-natural-area",
  "hill-country-louise-merrick-unit-state-natural-area",
  "lake-mineral-wells-trailway-garner-th-state-park",
  "lake-somerville-trailway-newman-bottom-th-state-park",
  "palo-duro-canyon",
  "ray-roberts-lake-jordon-unit-state-park",
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
