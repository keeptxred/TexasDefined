import { canonicalFishingPath } from "./slugs";

export const FISHING_SPECIES_DIRECTORY_PATH = "/fishing/species" as const;
export const FISHING_SPECIES_VERIFIED_AT = "2026-08-13";
export const COMPLETE_FISHING_SPECIES_SLUGS = ["largemouth-bass"] as const;

export type CompleteFishingSpeciesSlug = (typeof COMPLETE_FISHING_SPECIES_SLUGS)[number];

export function isCompleteFishingSpeciesSlug(slug: string): slug is CompleteFishingSpeciesSlug {
  return (COMPLETE_FISHING_SPECIES_SLUGS as readonly string[]).includes(slug);
}

export function fishingSpeciesCanonicalPath(slug: CompleteFishingSpeciesSlug) {
  return canonicalFishingPath("species", slug);
}
