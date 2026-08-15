import type { FishingTechniqueCategory } from "./types";

export const FISHING_TECHNIQUES_DIRECTORY_PATH = "/fishing/techniques";
export const FISHING_TECHNIQUES_VERIFIED_AT = "2026-08-13";

export const PUBLISHED_FISHING_TECHNIQUE_SLUGS = [
  "soft-plastics",
  "crankbaits",
  "spinnerbaits",
  "topwater",
  "trolling",
  "vertical-jigging",
  "jigs-and-minnows",
  "live-bait",
  "cut-bait",
] as const;

// Explicit crawl-discovery paths mirror the server-rendered directory links.
// Keeping the concrete URLs here lets route governance verify every dynamic profile has an inbound public reference.
export const PUBLISHED_FISHING_TECHNIQUE_PATHS = [
  "/fishing/techniques/soft-plastics",
  "/fishing/techniques/crankbaits",
  "/fishing/techniques/spinnerbaits",
  "/fishing/techniques/topwater",
  "/fishing/techniques/trolling",
  "/fishing/techniques/vertical-jigging",
  "/fishing/techniques/jigs-and-minnows",
  "/fishing/techniques/live-bait",
  "/fishing/techniques/cut-bait",
] as const;

export const FISHING_TECHNIQUE_CATEGORIES = [
  "casting",
  "trolling",
  "vertical",
  "bait",
  "fly",
  "shore",
  "other",
] as const satisfies readonly FishingTechniqueCategory[];

export type PublishedFishingTechniqueSlug = (typeof PUBLISHED_FISHING_TECHNIQUE_SLUGS)[number];

export function isPublishedFishingTechniqueSlug(value: string): value is PublishedFishingTechniqueSlug {
  return (PUBLISHED_FISHING_TECHNIQUE_SLUGS as readonly string[]).includes(value);
}

export function fishingTechniqueCanonicalPath(slug: string) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid fishing technique slug: ${slug}`);
  return `${FISHING_TECHNIQUES_DIRECTORY_PATH}/${slug}`;
}
