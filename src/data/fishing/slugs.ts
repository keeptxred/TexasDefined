const CANONICAL_FISHING_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type FishingRouteKind = "lake" | "species" | "guide" | "report";

const routeBase: Record<FishingRouteKind, string> = {
  lake: "/fishing/lakes",
  species: "/fishing/species",
  guide: "/fishing/guide",
  report: "/fishing/report",
};

export function normalizeFishingSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function isCanonicalFishingSlug(value: string) {
  return CANONICAL_FISHING_SLUG.test(value);
}

export function assertCanonicalFishingSlug(value: string, label = "fishing slug") {
  if (!isCanonicalFishingSlug(value)) throw new Error(`${label} must be lowercase kebab-case: ${value}`);
  return value;
}

export function canonicalFishingPath(kind: FishingRouteKind, slug: string) {
  return `${routeBase[kind]}/${assertCanonicalFishingSlug(slug)}`;
}

/**
 * Foundation entities resolve to their deepest published destination. Lake
 * Conroe and largemouth bass have complete guides; other lake/species records
 * remain crawlable anchors on their canonical directory until their dedicated
 * page reaches the same quality gate.
 */
export function fishingFoundationAnchor(kind: "lake" | "species", slug: string) {
  const canonicalSlug = assertCanonicalFishingSlug(slug);
  if (kind === "lake" && canonicalSlug === "lake-conroe") return canonicalFishingPath("lake", canonicalSlug);
  if (kind === "species" && canonicalSlug === "largemouth-bass") return canonicalFishingPath("species", canonicalSlug);
  if (kind === "species") return `/fishing/species#species-${canonicalSlug}`;
  return `/fishing#lake-${canonicalSlug}`;
}
