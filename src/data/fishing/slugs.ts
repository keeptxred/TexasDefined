const CANONICAL_FISHING_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type FishingRouteKind = "lake" | "species" | "guide" | "report";

const routeBase: Record<FishingRouteKind, string> = {
  lake: "/fishing/lakes",
  species: "/fishing/species",
  guide: "/fishing/guide",
  report: "/fishing/report",
};

export const COMPLETE_FISHING_LAKE_SLUGS = [
  "lake-conroe",
  "lake-fork",
  "sam-rayburn-reservoir",
  "lake-livingston",
  "lake-texoma",
  "toledo-bend-reservoir",
  "possum-kingdom-reservoir",
  "canyon-lake",
  "choke-canyon-reservoir",
  "amistad-reservoir",
] as const;
export type CompleteFishingLakeSlug = (typeof COMPLETE_FISHING_LAKE_SLUGS)[number];

export const COMPLETE_FISHING_SPECIES_SLUGS = [
  "largemouth-bass",
  "smallmouth-bass",
  "crappie",
  "catfish",
  "blue-catfish",
  "channel-catfish",
  "white-bass",
  "striped-bass",
  "hybrid-striped-bass",
] as const;
export type CompleteFishingSpeciesSlug = (typeof COMPLETE_FISHING_SPECIES_SLUGS)[number];

export function isCompleteFishingLakeSlug(value: string): value is CompleteFishingLakeSlug {
  return (COMPLETE_FISHING_LAKE_SLUGS as readonly string[]).includes(value);
}

export function isCompleteFishingSpeciesSlug(value: string): value is CompleteFishingSpeciesSlug {
  return (COMPLETE_FISHING_SPECIES_SLUGS as readonly string[]).includes(value);
}

export function normalizeFishingSlug(value: string) {
  return value.trim().toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").replace(/-{2,}/g, "-");
}

export function isCanonicalFishingSlug(value: string) { return CANONICAL_FISHING_SLUG.test(value); }
export function assertCanonicalFishingSlug(value: string, label = "fishing slug") { if (!isCanonicalFishingSlug(value)) throw new Error(`${label} must be lowercase kebab-case: ${value}`); return value; }
export function canonicalFishingPath(kind: FishingRouteKind, slug: string) { return `${routeBase[kind]}/${assertCanonicalFishingSlug(slug)}`; }

/** Complete entities resolve to detail pages; unpublished-depth entities remain directory anchors. */
export function fishingFoundationAnchor(kind: "lake" | "species", slug: string) {
  const canonicalSlug = assertCanonicalFishingSlug(slug);
  if (kind === "lake" && isCompleteFishingLakeSlug(canonicalSlug)) return canonicalFishingPath("lake", canonicalSlug);
  if (kind === "species" && isCompleteFishingSpeciesSlug(canonicalSlug)) return canonicalFishingPath("species", canonicalSlug);
  if (kind === "species") return `/fishing/species#species-${canonicalSlug}`;
  return `/fishing#lake-${canonicalSlug}`;
}
