import { FISHING_HABITAT_VERIFIED_AT, FISHING_STRUCTURE_PATH, FISHING_VEGETATION_PATH } from "./habitat-guides";
import { LAKE_CONROE_SECTION_SLUGS, LAKE_CONROE_VERIFIED_AT, lakeConroeCanonicalPath } from "./lake-conroe-routing";
import { FISHING_LAKE_COMPARE_PATH, FISHING_PLANNER_VERIFIED_AT, FISHING_TRIP_PLANNER_PATH } from "./planner-routing";
import { FISHING_REGULATIONS_PATH, FISHING_REGULATIONS_VERIFIED_AT } from "./regulations-routing";
import { FISHING_SEASONS_PATH, FISHING_SEASONS_VERIFIED_AT } from "./season-routing";
import { EXPANDED_SHOWCASE_LAKE_SLUGS, SHOWCASE_LAKE_SECTION_SLUGS, SHOWCASE_LAKE_SLUGS, SHOWCASE_LAKE_VERIFIED_AT, STATEWIDE_NETWORK_SHOWCASE_LAKE_SLUGS, STATEWIDE_NETWORK_SHOWCASE_LAKE_VERIFIED_AT, WAVE2_SHOWCASE_LAKE_SLUGS, WAVE2_SHOWCASE_LAKE_VERIFIED_AT, showcaseLakeCanonicalPath } from "./showcase-lake-routing";
import { COMPLETE_FISHING_SPECIES_SLUGS } from "./slugs";
import { FISHING_SPECIES_DIRECTORY_PATH, FISHING_SPECIES_VERIFIED_AT, fishingSpeciesCanonicalPath } from "./species-routing";
import { isFishingTechniqueHeroReady } from "./technique-images";
import { FISHING_TECHNIQUES_DIRECTORY_PATH, FISHING_TECHNIQUES_VERIFIED_AT, PUBLISHED_FISHING_TECHNIQUE_SLUGS, fishingTechniqueCanonicalPath } from "./technique-routing";

export const FISHING_LAKES_DIRECTORY_PATH = "/fishing/lakes";
export const FISHING_LAKES_DIRECTORY_VERIFIED_AT = "2026-10-12";
const ALL_SHOWCASE_LAKE_SLUGS = [...SHOWCASE_LAKE_SLUGS, ...EXPANDED_SHOWCASE_LAKE_SLUGS, ...WAVE2_SHOWCASE_LAKE_SLUGS, ...STATEWIDE_NETWORK_SHOWCASE_LAKE_SLUGS] as const;
const WAVE2_SET = new Set<string>(WAVE2_SHOWCASE_LAKE_SLUGS);
const STATEWIDE_SET = new Set<string>(STATEWIDE_NETWORK_SHOWCASE_LAKE_SLUGS);
const OCTOBER_12_NEW_LAKES = new Set<string>(["lake-stamford", "lake-sweetwater", "lake-georgetown", "benbrook-lake", "granger-lake", "aquilla-lake", "white-rock-lake"]);
const OCTOBER_13_NEW_LAKES = new Set<string>(["bardwell-lake", "lake-bastrop", "lake-arlington", "cedar-lake-cleburne-state-park", "lake-worth", "lake-nasworthy", "lake-tyler", "fort-parker-state-park-lake", "medina-lake", "lake-weatherford"]);
const OCTOBER_14_NEW_LAKES = new Set<string>(["lake-abilene", "lake-cypress-springs", "bachman-lake", "e-v-spence-reservoir", "brady-creek-reservoir"]);
const lakeSitemapDate = (slug: string) => OCTOBER_14_NEW_LAKES.has(slug) ? "2026-10-14" : OCTOBER_13_NEW_LAKES.has(slug) ? "2026-10-13" : OCTOBER_12_NEW_LAKES.has(slug) ? "2026-10-12" : STATEWIDE_SET.has(slug) ? STATEWIDE_NETWORK_SHOWCASE_LAKE_VERIFIED_AT : WAVE2_SET.has(slug) ? WAVE2_SHOWCASE_LAKE_VERIFIED_AT : SHOWCASE_LAKE_VERIFIED_AT;

// FISHING_GUIDES_DIRECTORY_PATH, FISHING_REPORTS_DIRECTORY_PATH,
// FISHING_ACCESS_DIRECTORY_PATH and FISHING_SERVICES_DIRECTORY_PATH are conditional:
// their server sitemap loaders emit the directory only when verified public records exist.
export const FISHING_SITEMAP_ENTRIES = [
  { path: FISHING_LAKES_DIRECTORY_PATH, lastmod: FISHING_LAKES_DIRECTORY_VERIFIED_AT },
  { path: FISHING_TRIP_PLANNER_PATH, lastmod: FISHING_PLANNER_VERIFIED_AT },
  { path: FISHING_LAKE_COMPARE_PATH, lastmod: FISHING_PLANNER_VERIFIED_AT },
  { path: FISHING_SEASONS_PATH, lastmod: FISHING_SEASONS_VERIFIED_AT },
  { path: FISHING_TECHNIQUES_DIRECTORY_PATH, lastmod: FISHING_TECHNIQUES_VERIFIED_AT },
  { path: FISHING_STRUCTURE_PATH, lastmod: FISHING_HABITAT_VERIFIED_AT },
  { path: FISHING_VEGETATION_PATH, lastmod: FISHING_HABITAT_VERIFIED_AT },
  ...PUBLISHED_FISHING_TECHNIQUE_SLUGS
    .filter((slug) => isFishingTechniqueHeroReady(slug))
    .map((slug) => ({ path: fishingTechniqueCanonicalPath(slug), lastmod: FISHING_TECHNIQUES_VERIFIED_AT })),
  { path: FISHING_REGULATIONS_PATH, lastmod: FISHING_REGULATIONS_VERIFIED_AT },
  { path: lakeConroeCanonicalPath(), lastmod: LAKE_CONROE_VERIFIED_AT },
  // Guides/reports receive noindex until verified records actually exist. The
  // qualified section URLs are emitted from the corresponding server loaders.
  ...LAKE_CONROE_SECTION_SLUGS
    .filter((section) => section !== "guides" && section !== "reports")
    .map((section) => ({ path: lakeConroeCanonicalPath(section), lastmod: LAKE_CONROE_VERIFIED_AT })),
  ...ALL_SHOWCASE_LAKE_SLUGS.flatMap((slug) => [
    { path: showcaseLakeCanonicalPath(slug), lastmod: lakeSitemapDate(slug) },
    ...SHOWCASE_LAKE_SECTION_SLUGS
      .filter((section) => section !== "guides" && section !== "reports")
      .map((section) => ({ path: showcaseLakeCanonicalPath(slug, section), lastmod: lakeSitemapDate(slug) })),
  ]),
  { path: FISHING_SPECIES_DIRECTORY_PATH, lastmod: FISHING_SPECIES_VERIFIED_AT },
  ...COMPLETE_FISHING_SPECIES_SLUGS.map((slug) => ({ path: fishingSpeciesCanonicalPath(slug), lastmod: FISHING_SPECIES_VERIFIED_AT })),
] as const;
