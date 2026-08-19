import type { CountySeriesProfile } from "@/data/county-series";

export const COUNTY_SERIES_PROFILES_CONTINUED: CountySeriesProfile[] = [
  {
    countySlug: "johnson",
    articleSlug: "johnson-county-cleburne-chisholm-trail-railroad-prairies-texas",
    loadArticle: () => import("@/data/fixtures/johnson-county-cleburne-chisholm-trail-railroad-prairies")
      .then((module) => module.johnsonCountyCleburneChisholmTrailRailroadPrairiesArticle),
  },
  {
    countySlug: "hill",
    articleSlug: "hill-county-hillsboro-lake-whitney-cotton-prairies-texas",
    loadArticle: () => import("@/data/fixtures/hill-county-hillsboro-lake-whitney-cotton-prairies")
      .then((module) => module.hillCountyHillsboroLakeWhitneyCottonPrairiesArticle),
  },
  {
    countySlug: "ellis",
    articleSlug: "ellis-county-waxahachie-ennis-blackland-prairie-texas",
    loadArticle: () => import("@/data/fixtures/ellis-county-waxahachie-ennis-blackland-prairie-texas")
      .then((module) => module.ellisCountyWaxahachieEnnisBlacklandPrairieArticle),
  },
  {
    countySlug: "navarro",
    articleSlug: "navarro-county-corsicana-oil-blackland-prairie-texas",
    loadArticle: () => import("@/data/fixtures/navarro-county-corsicana-oil-blackland-prairie-texas")
      .then((module) => module.navarroCountyCorsicanaOilBlacklandPrairieArticle),
  },
  {
    countySlug: "limestone",
    articleSlug: "limestone-county-groesbeck-mexia-fort-parker-navasota-prairie-texas",
    loadArticle: () => import("@/data/fixtures/limestone-county-groesbeck-mexia-fort-parker-navasota-prairie")
      .then((module) => module.limestoneCountyGroesbeckMexiaFortParkerNavasotaPrairieArticle),
  },
  {
    countySlug: "freestone",
    articleSlug: "freestone-county-fairfield-teague-wortham-trinity-prairie-texas",
    loadArticle: () => import("@/data/fixtures/freestone-county-fairfield-teague-wortham-trinity-prairie")
      .then((module) => module.freestoneCountyFairfieldTeagueWorthamTrinityPrairieArticle),
  },
  {
    countySlug: "leon",
    articleSlug: "leon-county-centerville-buffalo-jewett-trinity-prairie-texas",
    loadArticle: () => import("@/data/fixtures/leon-county-centerville-buffalo-jewett-trinity-prairie")
      .then((module) => module.leonCountyCentervilleBuffaloJewettTrinityPrairieArticle),
  },
  {
    countySlug: "madison",
    articleSlug: "madison-county-madisonville-midway-north-zulch-trinity-navasota-texas",
    loadArticle: () => import("@/data/fixtures/madison-county-madisonville-midway-north-zulch-trinity-navasota")
      .then((module) => module.madisonCountyMadisonvilleMidwayNorthZulchTrinityNavasotaArticle),
  },
  {
    countySlug: "grimes",
    articleSlug: "grimes-county-anderson-navasota-fanthorp-railroads-texas",
    loadArticle: () => import("@/data/fixtures/grimes-county-anderson-navasota-fanthorp-railroads-texas")
      .then((module) => module.grimesCountyAndersonNavasotaFanthorpRailroadsArticle),
  },
  {
    countySlug: "walker",
    articleSlug: "walker-county-huntsville-sam-houston-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/walker-county-huntsville-sam-houston-piney-woods-texas")
      .then((module) => module.walkerCountyHuntsvilleSamHoustonPineyWoodsArticle),
  },
];
