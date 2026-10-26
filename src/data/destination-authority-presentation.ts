import { topTexasAttractionRank } from "./top-texas-attractions";
import type { Destination } from "./types";

// Canonical guide-placement contract. Both destination rendering surfaces must
// use this one predicate to avoid repeating significance, itineraries and sources.
const SAM_HOUSTON_MUSEUM_SLUG = "sam-houston-memorial-museum-republic-texas-presidential-library-huntsville";

const AUTHORITY_GUIDE_DESTINATION_SLUGS = new Set([
  SAM_HOUSTON_MUSEUM_SLUG,
  "whirlyball-hurst",
  "my-story-museum-crystal-city",
  // Include live history destinations curated under other public categories.
  "fort-davis-national-historic-site",
  "san-jacinto-battleground",
  "the-alamo",
  "goliad-state-park",
  "fort-lancaster",
  "fort-griffin",
  "fort-mckavett",
  "washington-on-the-brazos",
  "presidio-la-bahia",
  "palo-alto-battlefield-national-historical-park",
]);


/** True only when the dedicated complete authority guide is rendered below the destination. */
export function shouldRenderFullDestinationAuthorityGuide(destination: Destination): boolean {
  if (!destination.authorityGuide || destination.slug === "chamizal-national-memorial" || destination.slug === "moody-gardens") return false;
  const historicGuide = destination.category === "historic-sites" ||
    ["goliad-state-park-and-historic-site", "san-jacinto-battleground-state-historic-site", "washington-on-the-brazos-state-historic-site"].includes(destination.slug);
  const individuallyRegisteredGuide = AUTHORITY_GUIDE_DESTINATION_SLUGS.has(destination.slug);
  return Boolean(topTexasAttractionRank(destination.slug)) || individuallyRegisteredGuide || historicGuide;
}
