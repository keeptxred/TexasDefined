const CANONICAL_FISHING_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type FishingRouteKind = "lake" | "species" | "guide" | "report";

const routeBase: Record<FishingRouteKind, string> = {
  lake: "/fishing/lake",
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
 * During the foundation release, entity search results land on anchors on the
 * statewide fishing page. Dedicated entity routes replace these anchors as
 * each template ships, without changing the entity slugs themselves.
 */
export function fishingFoundationAnchor(kind: "lake" | "species", slug: string) {
  return `/fishing#${kind}-${assertCanonicalFishingSlug(slug)}`;
}
