import { assertCanonicalFishingSlug } from "./slugs";

export const FISHING_GUIDES_DIRECTORY_PATH = "/fishing/guides" as const;
export const FISHING_GUIDES_VERIFIED_AT = "2026-08-14" as const;

export function fishingGuideCanonicalPath(slug: string) {
  return `${FISHING_GUIDES_DIRECTORY_PATH}/${assertCanonicalFishingSlug(slug, "fishing guide slug")}`;
}
