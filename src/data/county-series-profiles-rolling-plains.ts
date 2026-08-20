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
  {
    countySlug: "dickens",
    articleSlug: "dickens-county-dickens-spur-ranch-caprock-rolling-plains-texas",
    loadArticle: () => import("@/data/fixtures/dickens-county-dickens-spur-ranch-caprock-rolling-plains-texas")
      .then((module) => module.dickensCountyDickensSpurRanchCaprockRollingPlainsTexasArticle),
  },
  {
    countySlug: "archer",
    articleSlug: "archer-county-archer-city-ranching-oil-cross-timbers-north-texas",
    loadArticle: () => import("@/data/fixtures/archer-county-archer-city-ranching-oil-cross-timbers-north-texas")
      .then((module) => module.archerCountyArcherCityRanchingOilCrossTimbersNorthTexasArticle),
  },
  {
    countySlug: "king",
    articleSlug: "king-county-guthrie-four-sixes-ranch-rolling-plains-texas",
    loadArticle: () => import("@/data/fixtures/king-county-guthrie-four-sixes-ranch-rolling-plains-texas")
      .then((module) => module.kingCountyGuthrieFourSixesRanchRollingPlainsTexasArticle),
  },
  {
    countySlug: "knox",
    articleSlug: "knox-county-benjamin-munday-brazos-ranching-rolling-plains-texas",
    loadArticle: () => import("@/data/fixtures/knox-county-benjamin-munday-brazos-ranching-rolling-plains-texas")
      .then((module) => module.knoxCountyBenjaminMundayBrazosRanchingRollingPlainsTexasArticle),
  },
  {
    countySlug: "stonewall",
    articleSlug: "stonewall-county-aspermont-double-mountain-brazos-rolling-plains-texas",
    loadArticle: () => import("@/data/fixtures/stonewall-county-aspermont-double-mountain-brazos-rolling-plains-texas")
      .then((module) => module.stonewallCountyAspermontDoubleMountainBrazosRollingPlainsTexasArticle),
  },
  {
    countySlug: "haskell",
    articleSlug: "haskell-county-haskell-rice-springs-railroads-brazos-rolling-plains-texas",
    loadArticle: () => import("@/data/fixtures/haskell-county-haskell-rice-springs-railroads-brazos-rolling-plains-texas")
      .then((module) => module.haskellCountyHaskellRiceSpringsRailroadsBrazosRollingPlainsTexasArticle),
  },
  {
    countySlug: "kent",
    articleSlug: "kent-county-jayton-clairemont-brazos-ranching-rolling-plains-texas",
    loadArticle: () => import("@/data/fixtures/kent-county-jayton-clairemont-brazos-ranching-rolling-plains-texas")
      .then((module) => module.kentCountyJaytonClairemontBrazosRanchingRollingPlainsTexasArticle),
  },
  {
    countySlug: "throckmorton",
    articleSlug: "throckmorton-county-throckmorton-clear-fork-ranching-rolling-plains-texas",
    loadArticle: () => import("@/data/fixtures/throckmorton-county-throckmorton-clear-fork-ranching-rolling-plains-texas")
      .then((module) => module.throckmortonCountyThrockmortonClearForkRanchingRollingPlainsTexasArticle),
  },
];
