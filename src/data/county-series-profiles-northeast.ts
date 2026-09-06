import type { CountySeriesProfile } from "@/data/county-series";

export const COUNTY_SERIES_PROFILES_NORTHEAST: CountySeriesProfile[] = [
  {
    countySlug: "hopkins",
    articleSlug: "hopkins-county-sulphur-springs-dairy-railroads-northeast-texas",
    loadArticle: () => import("@/data/fixtures/hopkins-county-sulphur-springs-dairy-railroads-northeast-texas")
      .then((module) => module.hopkinsCountySulphurSpringsDairyRailroadsNortheastTexasArticle),
  },
  {
    countySlug: "hunt",
    articleSlug: "hunt-county-greenville-cotton-railroads-blackland-prairie-texas",
    loadArticle: () => import("@/data/fixtures/hunt-county-greenville-cotton-railroads-blackland-prairie-texas")
      .then((module) => module.huntCountyGreenvilleCottonRailroadsBlacklandPrairieArticle),
  },
  {
    countySlug: "rains",
    articleSlug: "rains-county-emory-lake-tawakoni-lake-fork-texas",
    loadArticle: () => import("@/data/fixtures/rains-county-emory-lake-tawakoni-lake-fork-texas")
      .then((module) => module.rainsCountyEmoryLakeTawakoniLakeForkTexasArticle),
  },
  {
    countySlug: "fannin",
    articleSlug: "fannin-county-bonham-bois-darc-lake-rayburn-northeast-texas",
    loadArticle: () => import("@/data/fixtures/fannin-county-bonham-bois-darc-lake-rayburn-northeast-texas")
      .then((module) => module.fanninCountyBonhamBoisDArcLakeRayburnNortheastTexasArticle),
  },
  {
    countySlug: "van-zandt",
    articleSlug: "van-zandt-county-canton-grand-saline-first-monday-east-texas",
    loadArticle: () => import("@/data/fixtures/van-zandt-county-canton-grand-saline-first-monday-east-texas")
      .then((module) => module.vanZandtCountyCantonGrandSalineFirstMondayEastTexasArticle),
  },
  {
    countySlug: "wood",
    articleSlug: "wood-county-quitman-mineola-lake-fork-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/wood-county-quitman-mineola-lake-fork-piney-woods-texas")
      .then((module) => module.woodCountyQuitmanMineolaLakeForkPineyWoodsTexasArticle),
  },
  {
    countySlug: "rockwall",
    articleSlug: "rockwall-county-rockwall-heath-lake-ray-hubbard-blackland-prairie-texas",
    loadArticle: () => import("@/data/fixtures/rockwall-county-rockwall-heath-lake-ray-hubbard-blackland-prairie-texas")
      .then((module) => module.rockwallCountyRockwallHeathLakeRayHubbardBlacklandPrairieTexasArticle),
  },
  {
    countySlug: "kaufman",
    articleSlug: "kaufman-county-kaufman-terrell-forney-blackland-prairie-texas",
    loadArticle: () => import("@/data/fixtures/kaufman-county-kaufman-terrell-forney-blackland-prairie-texas")
      .then((module) => module.kaufmanCountyKaufmanTerrellForneyBlacklandPrairieTexasArticle),
  },
  {
    countySlug: "franklin",
    articleSlug: "franklin-county-mount-vernon-cypress-springs-northeast-texas",
    loadArticle: () => import("@/data/fixtures/franklin-county-mount-vernon-cypress-springs-northeast-texas")
      .then((module) => module.franklinCountyMountVernonCypressSpringsNortheastTexasArticle),
  },
  {
    countySlug: "titus",
    articleSlug: "titus-county-mount-pleasant-caddo-railroads-lake-bob-sandlin-northeast-texas",
    loadArticle: () => import("@/data/fixtures/titus-county-mount-pleasant-caddo-railroads-lake-bob-sandlin-northeast-texas")
      .then((module) => module.titusCountyMountPleasantCaddoRailroadsLakeBobSandlinNortheastTexasArticle),
  },
  {
    countySlug: "morris",
    articleSlug: "morris-county-daingerfield-steel-state-park-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/morris-county-daingerfield-steel-state-park-piney-woods-texas")
      .then((module) => module.morrisCountyDaingerfieldSteelStateParkPineyWoodsTexasArticle),
  },
  {
    countySlug: "grayson",
    articleSlug: "grayson-county-sherman-denison-lake-texoma-railroads-north-texas",
    loadArticle: () => import("@/data/fixtures/grayson-county-sherman-denison-lake-texoma-railroads-north-texas")
      .then((module) => module.graysonCountyShermanDenisonLakeTexomaRailroadsNorthTexasArticle),
  },
  {
    countySlug: "montague",
    articleSlug: "montague-county-bowie-nocona-chisholm-trail-red-river-texas",
    loadArticle: () => import("@/data/fixtures/montague-county-bowie-nocona-chisholm-trail-red-river-texas")
      .then((module) => module.montagueCountyBowieNoconaChisholmTrailRedRiverTexasArticle),
  },
  {
    countySlug: "cooke",
    articleSlug: "cooke-county-gainesville-red-river-muenster-north-texas",
    loadArticle: () => import("@/data/fixtures/cooke-county-gainesville-red-river-muenster-north-texas")
      .then((module) => module.cookeCountyGainesvilleRedRiverMuensterNorthTexasArticle),
  },
  {
    countySlug: "cass",
    articleSlug: "cass-county-linden-atlanta-piney-woods-wright-patman-texas",
    loadArticle: () => import("@/data/fixtures/cass-county-linden-atlanta-piney-woods-wright-patman-texas")
      .then((module) => module.cassCountyLindenAtlantaPineyWoodsWrightPatmanTexasArticle),
  },
  {
    countySlug: "camp",
    articleSlug: "camp-county-pittsburg-railroads-poultry-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/camp-county-pittsburg-railroads-poultry-piney-woods-texas")
      .then((module) => module.campCountyPittsburgRailroadsPoultryPineyWoodsTexasArticle),
  },
  {
    countySlug: "clay",
    articleSlug: "clay-county-henrietta-red-river-lake-arrowhead-north-texas",
    loadArticle: () => import("@/data/fixtures/clay-county-henrietta-red-river-lake-arrowhead-north-texas")
      .then((module) => module.clayCountyHenriettaRedRiverLakeArrowheadNorthTexasArticle),
  },
  {
    countySlug: "henderson",
    articleSlug: "henderson-county-athens-lakes-fisheries-east-texas",
    loadArticle: () => import("@/data/fixtures/henderson-county-athens-lakes-fisheries-east-texas")
      .then((module) => module.hendersonCountyAthensLakesFisheriesEastTexasArticle),
  },
  {
    countySlug: "wichita",
    articleSlug: "wichita-county-wichita-falls-sheppard-oil-red-river-texas",
    loadArticle: () => import("@/data/fixtures/wichita-county-wichita-falls-sheppard-oil-red-river-texas")
      .then((module) => module.wichitaCountyWichitaFallsSheppardOilRedRiverTexasArticle),
  },
  {
    countySlug: "archer",
    articleSlug: "archer-county-archer-city-ranching-oil-larry-mcmurtry-north-texas",
    loadArticle: () => import("@/data/fixtures/archer-county-archer-city-ranching-oil-larry-mcmurtry-north-texas")
      .then((module) => module.archerCountyArcherCityRanchingOilLarryMcMurtryNorthTexasArticle),
  },
  {
    countySlug: "foard",
    articleSlug: "foard-county-crowell-pease-river-ranching-oil-rolling-plains-texas",
    loadArticle: () => import("@/data/fixtures/foard-county-crowell-pease-river-ranching-oil-rolling-plains-texas")
      .then((module) => module.foardCountyCrowellPeaseRiverRanchingOilRollingPlainsTexasArticle),
  },
  {
    countySlug: "baylor",
    articleSlug: "baylor-county-seymour-brazos-ranching-railroads-rolling-plains-texas",
    loadArticle: () => import("@/data/fixtures/baylor-county-seymour-brazos-ranching-railroads-rolling-plains-texas")
      .then((module) => module.baylorCountySeymourBrazosRanchingRailroadsRollingPlainsTexasArticle),
  },
  {
    countySlug: "wilbarger",
    articleSlug: "wilbarger-county-vernon-doans-crossing-red-river-rolling-plains-texas",
    loadArticle: () => import("@/data/fixtures/wilbarger-county-vernon-doans-crossing-red-river-rolling-plains-texas")
      .then((module) => module.wilbargerCountyVernonDoansCrossingRedRiverRollingPlainsTexasArticle),
  },
];
