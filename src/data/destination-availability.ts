import type { Destination } from "./types";

/**
 * Records we preserve for direct historical/future reference but should not
 * recommend as ordinary visitable Trip Planner stops today.
 */
const UNAVAILABLE_DESTINATION_SLUGS = new Set([
  "albert-bessie-kronkosky-state-natural-area",
  "powderhorn-state-park",
  "fairfield-lake-state-park",
  "davis-hill-state-park",
  "battleship-texas",
  "battleship-texas-state-historic-site",
]);

export function isCurrentlyVisitableDestination(destination: Destination): boolean {
  return !UNAVAILABLE_DESTINATION_SLUGS.has(destination.slug);
}

export function filterCurrentlyVisitableDestinations(destinations: Destination[]): Destination[] {
  return destinations.filter(isCurrentlyVisitableDestination);
}

export function unavailableDestinationSlugs(): string[] {
  return [...UNAVAILABLE_DESTINATION_SLUGS];
}
