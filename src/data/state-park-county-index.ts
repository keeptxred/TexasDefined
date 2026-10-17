import { stateParkMatchesCounty } from "./state-park-official-counties";
import { isCurrentlyVisitableDestination, isPrimaryTripPlannerDestination } from "./destination-availability";
import { isSeoReadyDestination } from "./destination-audit";
import { applyAllCuratedDestination } from "./destination-curation-all";
import { preservedExploreDestinations } from "./destination-preserved-catalog";
import { improveDestinationQuality } from "./destination-quality";
import { applyExploreHeroAsset } from "./explore-heroes";
import { applyStateParkHeroAsset } from "./state-park-heroes";
import { isTexasStateParkDestination } from "./state-park-authority";

/** Static, county-exact, indexable local parks only: never link readers to unverified aliases or 404s. */
export function getCountyStateParkLinks(countySlug: string) {
  const normalized = countySlug.trim().toLowerCase();
  const matches = preservedExploreDestinations
    .filter((park) => stateParkMatchesCounty(park, normalized))
    .map((park) => improveDestinationQuality(applyAllCuratedDestination(applyExploreHeroAsset(applyStateParkHeroAsset(park)))))
    .filter((destination) => {
      return isTexasStateParkDestination(destination)
        && isCurrentlyVisitableDestination(destination)
        && isPrimaryTripPlannerDestination(destination)
        && isSeoReadyDestination(destination);
    });
  return [...new Map(matches.map((park) => [park.slug, {
    slug: park.slug,
    name: park.name,
    summary: park.summary,
  }])).values()].sort((a, b) => a.name.localeCompare(b.name));
}

/** Nearby-city relationship: only where the recorded nearest town matches the city entity. */
export function getCityStateParkLinks(citySlug: string) {
  const normalized = citySlug.trim().toLowerCase();
  const matches = preservedExploreDestinations
    .filter((park) => park.nearestTown.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") === normalized)
    .map((park) => improveDestinationQuality(applyAllCuratedDestination(applyExploreHeroAsset(applyStateParkHeroAsset(park)))))
    .filter((park) => isTexasStateParkDestination(park)
      && isPrimaryTripPlannerDestination(park)
      && isSeoReadyDestination(park));
  return [...new Map(matches.map((park) => [park.slug, { slug: park.slug, name: park.name, summary: park.summary }])).values()]
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 8);
}
