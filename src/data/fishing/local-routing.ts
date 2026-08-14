import { assertCanonicalFishingSlug } from "./slugs";

export const FISHING_ACCESS_DIRECTORY_PATH = "/fishing/access";
export const FISHING_SERVICES_DIRECTORY_PATH = "/fishing/services";
export const FISHING_LOCAL_VERIFIED_AT = "2026-08-14";

export function fishingAccessCanonicalPath(slug: string) {
  return `${FISHING_ACCESS_DIRECTORY_PATH}/${assertCanonicalFishingSlug(slug)}`;
}

export function fishingServiceCanonicalPath(slug: string) {
  return `${FISHING_SERVICES_DIRECTORY_PATH}/${assertCanonicalFishingSlug(slug)}`;
}
