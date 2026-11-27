import { canonicalFishingPath, type CompleteFishingSpeciesSlug } from "./slugs";

export const FISHING_SPECIES_DIRECTORY_PATH = "/fishing/species" as const;
export const FISHING_SPECIES_VERIFIED_AT = "2026-08-15";
// Directory navigation and reader guidance revised Nov 27; not a uniform source review.
export const FISHING_SPECIES_DIRECTORY_EDITORIAL_UPDATED_AT = "2026-11-27";

export function fishingSpeciesCanonicalPath(slug: CompleteFishingSpeciesSlug) {
  return canonicalFishingPath("species", slug);
}
