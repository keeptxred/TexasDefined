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
  {
    countySlug: "burleson",
    articleSlug: "burleson-county-caldwell-somerville-brazos-central-texas",
    loadArticle: () => import("@/data/fixtures/burleson-county-caldwell-somerville-brazos-central-texas")
      .then((module) => module.burlesonCountyCaldwellSomervilleBrazosCentralTexasArticle),
  },
  {
    countySlug: "caldwell",
    articleSlug: "caldwell-county-lockhart-luling-plum-creek-san-marcos-river-texas",
    loadArticle: () => import("@/data/fixtures/caldwell-county-lockhart-luling-plum-creek-san-marcos-river-texas")
      .then((module) => module.caldwellCountyLockhartLulingPlumCreekSanMarcosRiverTexasArticle),
  },
  {
    countySlug: "kimble",
    articleSlug: "kimble-county-junction-llano-rivers-hill-country-texas",
    loadArticle: () => import("@/data/fixtures/kimble-county-junction-llano-rivers-hill-country-texas")
      .then((module) => module.kimbleCountyJunctionLlanoRiversHillCountryTexasArticle),
  },
];
