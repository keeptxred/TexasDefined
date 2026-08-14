import { FISHING_GUIDES_DIRECTORY_PATH, FISHING_GUIDES_VERIFIED_AT } from "./guide-routing";
import { LAKE_CONROE_SECTION_SLUGS, LAKE_CONROE_VERIFIED_AT, lakeConroeCanonicalPath } from "./lake-conroe-routing";
import { FISHING_REPORTS_DIRECTORY_PATH, FISHING_REPORTS_VERIFIED_AT } from "./report-routing";
import { SHOWCASE_LAKE_SECTION_SLUGS, SHOWCASE_LAKE_SLUGS, SHOWCASE_LAKE_VERIFIED_AT, showcaseLakeCanonicalPath } from "./showcase-lake-routing";
import { FISHING_SPECIES_DIRECTORY_PATH, FISHING_SPECIES_VERIFIED_AT, fishingSpeciesCanonicalPath } from "./species-routing";

export const FISHING_LAKES_DIRECTORY_PATH = "/fishing/lakes";
export const FISHING_LAKES_DIRECTORY_VERIFIED_AT = SHOWCASE_LAKE_VERIFIED_AT;

export const FISHING_SITEMAP_ENTRIES = [
  { path: FISHING_LAKES_DIRECTORY_PATH, lastmod: FISHING_LAKES_DIRECTORY_VERIFIED_AT },
  { path: FISHING_GUIDES_DIRECTORY_PATH, lastmod: FISHING_GUIDES_VERIFIED_AT },
  { path: FISHING_REPORTS_DIRECTORY_PATH, lastmod: FISHING_REPORTS_VERIFIED_AT },
  { path: lakeConroeCanonicalPath(), lastmod: LAKE_CONROE_VERIFIED_AT },
  ...LAKE_CONROE_SECTION_SLUGS.map((section) => ({ path: lakeConroeCanonicalPath(section), lastmod: LAKE_CONROE_VERIFIED_AT })),
  ...SHOWCASE_LAKE_SLUGS.flatMap((slug) => [
    { path: showcaseLakeCanonicalPath(slug), lastmod: SHOWCASE_LAKE_VERIFIED_AT },
    ...SHOWCASE_LAKE_SECTION_SLUGS.map((section) => ({ path: showcaseLakeCanonicalPath(slug, section), lastmod: SHOWCASE_LAKE_VERIFIED_AT })),
  ]),
  { path: FISHING_SPECIES_DIRECTORY_PATH, lastmod: FISHING_SPECIES_VERIFIED_AT },
  { path: fishingSpeciesCanonicalPath("largemouth-bass"), lastmod: FISHING_SPECIES_VERIFIED_AT },
] as const;
