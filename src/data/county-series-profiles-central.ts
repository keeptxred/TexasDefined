import type { CountySeriesProfile } from "@/data/county-series";

export const COUNTY_SERIES_PROFILES_CENTRAL: CountySeriesProfile[] = [
  {
    countySlug: "robertson",
    articleSlug: "robertson-county-franklin-hearne-calvert-brazos-railroads-texas",
    loadArticle: () => import("@/data/fixtures/robertson-county-franklin-hearne-calvert-brazos-railroads-texas")
      .then((module) => module.robertsonCountyFranklinHearneCalvertBrazosRailroadsTexasArticle),
  },
  {
    countySlug: "falls",
    articleSlug: "falls-county-marlin-brazos-hot-wells-railroads-texas",
    loadArticle: () => import("@/data/fixtures/falls-county-marlin-brazos-hot-wells-railroads-texas")
      .then((module) => module.fallsCountyMarlinBrazosHotWellsRailroadsTexasArticle),
  },
  {
    countySlug: "milam",
    articleSlug: "milam-county-cameron-rockdale-little-river-central-texas",
    loadArticle: () => import("@/data/fixtures/milam-county-cameron-rockdale-little-river-central-texas")
      .then((module) => module.milamCountyCameronRockdaleLittleRiverCentralTexasArticle),
  },
];
