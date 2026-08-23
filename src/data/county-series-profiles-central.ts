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
  {
    countySlug: "gonzales",
    articleSlug: "gonzales-county-gonzales-guadalupe-come-and-take-it-texas",
    loadArticle: () => import("@/data/fixtures/gonzales-county-gonzales-guadalupe-come-and-take-it-texas")
      .then((module) => module.gonzalesCountyGonzalesGuadalupeComeAndTakeItTexasArticle),
  },
  {
    countySlug: "menard",
    articleSlug: "menard-county-menard-fort-mckavett-san-saba-river-texas",
    loadArticle: () => import("@/data/fixtures/menard-county-menard-fort-mckavett-san-saba-river-texas")
      .then((module) => module.menardCountyMenardFortMcKavettSanSabaRiverTexasArticle),
  },
  {
    countySlug: "schleicher",
    articleSlug: "schleicher-county-eldorado-edwards-plateau-ranching-west-texas",
    loadArticle: () => import("@/data/fixtures/schleicher-county-eldorado-edwards-plateau-ranching-west-texas")
      .then((module) => module.schleicherCountyEldoradoEdwardsPlateauRanchingWestTexasArticle),
  },
  {
    countySlug: "mcculloch",
    articleSlug: "mcculloch-county-brady-heart-of-texas-ranching-texas",
    loadArticle: () => import("@/data/fixtures/mcculloch-county-brady-heart-of-texas-ranching-texas")
      .then((module) => module.mcCullochCountyBradyHeartOfTexasRanchingTexasArticle),
  },
  {
    countySlug: "waller",
    articleSlug: "waller-county-hempstead-prairie-view-brazos-prairie-texas",
    loadArticle: () => import("@/data/fixtures/waller-county-hempstead-prairie-view-brazos-prairie-texas")
      .then((module) => module.wallerCountyHempsteadPrairieViewBrazosPrairieTexasArticle),
  },
  {
    countySlug: "sutton",
    articleSlug: "sutton-county-sonora-caverns-ranching-edwards-plateau-texas",
    loadArticle: () => import("@/data/fixtures/sutton-county-sonora-caverns-ranching-edwards-plateau-texas")
      .then((module) => module.suttonCountySonoraCavernsRanchingEdwardsPlateauTexasArticle),
  },
  {
    countySlug: "irion",
    articleSlug: "irion-county-mertzon-sherwood-middle-concho-ranching-texas",
    loadArticle: () => import("@/data/fixtures/irion-county-mertzon-sherwood-middle-concho-ranching-texas")
      .then((module) => module.irionCountyMertzonSherwoodMiddleConchoRanchingTexasArticle),
  },
  {
    countySlug: "coke",
    articleSlug: "coke-county-robert-lee-bronte-fort-chadbourne-colorado-river-texas",
    loadArticle: () => import("@/data/fixtures/coke-county-robert-lee-bronte-fort-chadbourne-colorado-river-texas")
      .then((module) => module.cokeCountyRobertLeeBronteFortChadbourneColoradoRiverTexasArticle),
  },
  {
    countySlug: "crockett",
    articleSlug: "crockett-county-ozona-pecos-edwards-plateau-ranching-texas",
    loadArticle: () => import("@/data/fixtures/crockett-county-ozona-pecos-edwards-plateau-ranching-texas")
      .then((module) => module.crockettCountyOzonaPecosEdwardsPlateauRanchingTexasArticle),
  },
  {
    countySlug: "terrell",
    articleSlug: "terrell-county-sanderson-rio-grande-canyons-ranching-west-texas",
    loadArticle: () => import("@/data/fixtures/terrell-county-sanderson-rio-grande-canyons-ranching-west-texas")
      .then((module) => module.terrellCountySandersonRioGrandeCanyonsRanchingWestTexasArticle),
  },
  {
    countySlug: "bosque",
    articleSlug: "bosque-county-meridian-clifton-norwegian-heritage-central-texas",
    loadArticle: () => import("@/data/fixtures/bosque-county-meridian-clifton-norwegian-heritage-central-texas")
      .then((module) => module.bosqueCountyMeridianCliftonNorwegianHeritageCentralTexasArticle),
  },
];
