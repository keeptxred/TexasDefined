import { canonicalFishingPath } from "./slugs";

export const SHOWCASE_LAKE_VERIFIED_AT = "2026-08-15" as const;
export const SHOWCASE_LAKE_SLUGS = ["lake-fork", "sam-rayburn-reservoir", "lake-livingston", "lake-texoma"] as const;
export type ShowcaseLakeSlug = (typeof SHOWCASE_LAKE_SLUGS)[number];

export const EXPANDED_SHOWCASE_LAKE_SLUGS = ["toledo-bend-reservoir", "possum-kingdom-reservoir", "canyon-lake", "choke-canyon-reservoir", "amistad-reservoir"] as const;
export type ExpandedShowcaseLakeSlug = (typeof EXPANDED_SHOWCASE_LAKE_SLUGS)[number];
export type PublishedShowcaseLakeSlug = ShowcaseLakeSlug | ExpandedShowcaseLakeSlug;

export const SHOWCASE_LAKE_SECTION_SLUGS = ["fish", "access", "boating", "regulations", "camping", "nearby", "reports", "guides"] as const;
export type ShowcaseLakeSection = (typeof SHOWCASE_LAKE_SECTION_SLUGS)[number];

export function isShowcaseLakeSlug(value: string): value is PublishedShowcaseLakeSlug {
  return [...SHOWCASE_LAKE_SLUGS, ...EXPANDED_SHOWCASE_LAKE_SLUGS].includes(value as never);
}

export function isShowcaseLakeSection(value: string): value is ShowcaseLakeSection {
  return (SHOWCASE_LAKE_SECTION_SLUGS as readonly string[]).includes(value);
}

export function showcaseLakeCanonicalPath(slug: PublishedShowcaseLakeSlug, section?: ShowcaseLakeSection) {
  const base = canonicalFishingPath("lake", slug);
  return section ? `${base}/${section}` : base;
}
