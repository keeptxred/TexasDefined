import { canonicalFishingPath, type CompleteFishingSpeciesSlug } from "./slugs";

export const FISHING_SPECIES_DIRECTORY_PATH = "/fishing/species" as const;
export const FISHING_SPECIES_VERIFIED_AT = "2026-08-15";

export function fishingSpeciesCanonicalPath(slug: CompleteFishingSpeciesSlug) {
  return canonicalFishingPath("species", slug);
}
