import {
  LAKE_CONROE_SECTION_SLUGS,
  LAKE_CONROE_VERIFIED_AT,
  lakeConroeCanonicalPath,
} from "./lake-conroe-prototype";

export const FISHING_SITEMAP_ENTRIES = [
  { path: lakeConroeCanonicalPath(), lastmod: LAKE_CONROE_VERIFIED_AT },
  ...LAKE_CONROE_SECTION_SLUGS.map((section) => ({
    path: lakeConroeCanonicalPath(section),
    lastmod: LAKE_CONROE_VERIFIED_AT,
  })),
] as const;
