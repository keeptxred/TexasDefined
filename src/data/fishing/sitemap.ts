import { LAKE_CONROE_SECTION_SLUGS, LAKE_CONROE_VERIFIED_AT, lakeConroeCanonicalPath } from "./lake-conroe-routing";
import { FISHING_LAKE_COMPARE_PATH, FISHING_PLANNER_VERIFIED_AT, FISHING_TRIP_PLANNER_PATH } from "./planner-routing";
import { FISHING_REGULATIONS_PATH, FISHING_REGULATIONS_VERIFIED_AT } from "./regulations-routing";
import { FISHING_SEASONS_PATH, FISHING_SEASONS_VERIFIED_AT } from "./season-routing";
import { EXPANDED_SHOWCASE_LAKE_SLUGS, SHOWCASE_LAKE_SECTION_SLUGS, SHOWCASE_LAKE_SLUGS, SHOWCASE_LAKE_VERIFIED_AT, showcaseLakeCanonicalPath } from "./showcase-lake-routing";
import { COMPLETE_FISHING_SPECIES_SLUGS } from "./slugs";
import { FISHING_SPECIES_DIRECTORY_PATH, FISHING_SPECIES_VERIFIED_AT, fishingSpeciesCanonicalPath } from "./species-routing";
import { FISHING_TECHNIQUES_DIRECTORY_PATH, FISHING_TECHNIQUES_VERIFIED_AT, PUBLISHED_FISHING_TECHNIQUE_SLUGS, fishingTechniqueCanonicalPath } from "./technique-routing";

export const FISHING_LAKES_DIRECTORY_PATH = "/fishing/lakes";
export const FISHING_LAKES_DIRECTORY_VERIFIED_AT = SHOWCASE_LAKE_VERIFIED_AT;
const ALL_SHOWCASE_LAKE_SLUGS = [...SHOWCASE_LAKE_SLUGS, ...EXPANDED_SHOWCASE_LAKE_SLUGS] as const;

// FISHING_GUIDES_DIRECTORY_PATH, FISHING_REPORTS_DIRECTORY_PATH,
// FISHING_ACCESS_DIRECTORY_PATH and FISHING_SERVICES_DIRECTORY_PATH are conditional:
// their server sitemap loaders emit the directory only when verified public records exist.
export const FISHING_SITEMAP_ENTRIES = [
  { path: FISHING_LAKES_DIRECTORY_PATH, lastmod: FISHING_LAKES_DIRECTORY_VERIFIED_AT },
  { path: FISHING_TRIP_PLANNER_PATH, lastmod: FISHING_PLANNER_VERIFIED_AT },
  { path: FISHING_LAKE_COMPARE_PATH, lastmod: FISHING_PLANNER_VERIFIED_AT },
  { path: FISHING_SEASONS_PATH, lastmod: FISHING_SEASONS_VERIFIED_AT },
  { path: FISHING_TECHNIQUES_DIRECTORY_PATH, lastmod: FISHING_TECHNIQUES_VERIFIED_AT },
  ...PUBLISHED_FISHING_TECHNIQUE_SLUGS.map((slug) => ({ path: fishingTechniqueCanonicalPath(slug), lastmod: FISHING_TECHNIQUES_VERIFIED_AT })),
  { path: FISHING_REGULATIONS_PATH, lastmod: FISHING_REGULATIONS_VERIFIED_AT },
  { path: lakeConroeCanonicalPath(), lastmod: LAKE_CONROE_VERIFIED_AT },
  ...LAKE_CONROE_SECTION_SLUGS.map((section) => ({ path: lakeConroeCanonicalPath(section), lastmod: LAKE_CONROE_VERIFIED_AT })),
  ...ALL_SHOWCASE_LAKE_SLUGS.flatMap((slug) => [
    { path: showcaseLakeCanonicalPath(slug), lastmod: SHOWCASE_LAKE_VERIFIED_AT },
    ...SHOWCASE_LAKE_SECTION_SLUGS.map((section) => ({ path: showcaseLakeCanonicalPath(slug, section), lastmod: SHOWCASE_LAKE_VERIFIED_AT })),
  ]),
  { path: FISHING_SPECIES_DIRECTORY_PATH, lastmod: FISHING_SPECIES_VERIFIED_AT },
  ...COMPLETE_FISHING_SPECIES_SLUGS.map((slug) => ({ path: fishingSpeciesCanonicalPath(slug), lastmod: FISHING_SPECIES_VERIFIED_AT })),
] as const;
