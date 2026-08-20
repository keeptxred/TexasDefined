import type { CountySeriesProfile } from "@/data/county-series";

export const COUNTY_SERIES_PROFILES_ROLLING_PLAINS: CountySeriesProfile[] = [
  {
    countySlug: "childress",
    articleSlug: "childress-county-childress-railroads-red-river-rolling-plains-texas",
    loadArticle: () => import("@/data/fixtures/childress-county-childress-railroads-red-river-rolling-plains-texas")
      .then((module) => module.childressCountyChildressRailroadsRedRiverRollingPlainsTexasArticle),
  },
  {
    countySlug: "cottle",
    articleSlug: "cottle-county-paducah-pease-river-ranching-railroads-rolling-plains-texas",
    loadArticle: () => import("@/data/fixtures/cottle-county-paducah-pease-river-ranching-railroads-rolling-plains-texas")
      .then((module) => module.cottleCountyPaducahPeaseRiverRanchingRailroadsRollingPlainsTexasArticle),
  },
  {
    countySlug: "motley",
    articleSlug: "motley-county-matador-roaring-springs-matador-ranch-rolling-plains-texas",
    loadArticle: () => import("@/data/fixtures/motley-county-matador-roaring-springs-matador-ranch-rolling-plains-texas")
      .then((module) => module.motleyCountyMatadorRoaringSpringsMatadorRanchRollingPlainsTexasArticle),
  },
];
