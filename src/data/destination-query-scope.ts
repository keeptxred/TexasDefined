import type { Destination } from "./types";
import { correctDestinationTravelRegion, isGeographicallyPlausibleForTravelRegion } from "./destination-region-consistency";
import type { DestinationQuery } from "./repositories";

/** Apply category and region constraints after all remote/local catalogs have merged.
 * Remote Explore feeds and fallback catalogs are not region-aware by themselves. */
export function filterDestinationsByScope(
  destinations: Destination[],
  query: Pick<DestinationQuery, "category" | "region">,
): Destination[] {
  if (!query.category && !query.region) return destinations;
  return destinations.map(correctDestinationTravelRegion).filter((destination) =>
    (!query.category || destination.category === query.category) &&
    (!query.region || (
      destination.region === query.region &&
      isGeographicallyPlausibleForTravelRegion(destination, query.region)
    )),
  );
}
