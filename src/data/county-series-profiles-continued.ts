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
  {
    countySlug: "trinity",
    articleSlug: "trinity-county-groveton-lumber-trinity-river-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/trinity-county-groveton-lumber-trinity-river-piney-woods")
      .then((module) => module.trinityCountyGrovetonLumberTrinityRiverPineyWoodsArticle),
  },
  {
    countySlug: "houston",
    articleSlug: "houston-county-crockett-mission-tejas-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/houston-county-crockett-mission-tejas-piney-woods-texas")
      .then((module) => module.houstonCountyCrockettMissionTejasPineyWoodsArticle),
  },
  {
    countySlug: "angelina",
    articleSlug: "angelina-county-lufkin-diboll-sam-rayburn-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/angelina-county-lufkin-diboll-sam-rayburn-piney-woods-texas")
      .then((module) => module.angelinaCountyLufkinDibollSamRayburnPineyWoodsArticle),
  },
  {
    countySlug: "nacogdoches",
    articleSlug: "nacogdoches-county-nacogdoches-caddo-el-camino-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/nacogdoches-county-nacogdoches-caddo-el-camino-piney-woods-texas")
      .then((module) => module.nacogdochesCountyNacogdochesCaddoElCaminoPineyWoodsArticle),
  },
  {
    countySlug: "san-augustine",
    articleSlug: "san-augustine-county-san-augustine-mission-dolores-el-camino-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/san-augustine-county-san-augustine-mission-dolores-el-camino-piney-woods-texas")
      .then((module) => module.sanAugustineCountySanAugustineMissionDoloresElCaminoPineyWoodsArticle),
  },
  {
    countySlug: "sabine",
    articleSlug: "sabine-county-hemphill-toledo-bend-sabine-river-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/sabine-county-hemphill-toledo-bend-sabine-river-piney-woods-texas")
      .then((module) => module.sabineCountyHemphillToledoBendSabineRiverPineyWoodsArticle),
  },
  {
    countySlug: "shelby",
    articleSlug: "shelby-county-center-regulator-moderator-sabine-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/shelby-county-center-regulator-moderator-sabine-piney-woods-texas")
      .then((module) => module.shelbyCountyCenterRegulatorModeratorSabinePineyWoodsArticle),
  },
  {
    countySlug: "panola",
    articleSlug: "panola-county-carthage-sabine-timber-music-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/panola-county-carthage-sabine-timber-music-piney-woods-texas")
      .then((module) => module.panolaCountyCarthageSabineTimberMusicPineyWoodsArticle),
  },
  {
    countySlug: "rusk",
    articleSlug: "rusk-county-henderson-east-texas-oil-field-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/rusk-county-henderson-east-texas-oil-field-piney-woods-texas")
      .then((module) => module.ruskCountyHendersonEastTexasOilFieldPineyWoodsArticle),
  },
  {
    countySlug: "cherokee",
    articleSlug: "cherokee-county-rusk-jacksonville-caddo-mounds-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/cherokee-county-rusk-jacksonville-caddo-mounds-piney-woods-texas")
      .then((module) => module.cherokeeCountyRuskJacksonvilleCaddoMoundsPineyWoodsArticle),
  },
  {
    countySlug: "smith",
    articleSlug: "smith-county-tyler-roses-railroads-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/smith-county-tyler-roses-railroads-piney-woods-texas")
      .then((module) => module.smithCountyTylerRosesRailroadsPineyWoodsArticle),
  },
  {
    countySlug: "gregg",
    articleSlug: "gregg-county-longview-kilgore-oil-railroads-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/gregg-county-longview-kilgore-oil-railroads-piney-woods-texas")
      .then((module) => module.greggCountyLongviewKilgoreOilRailroadsPineyWoodsArticle),
  },
  {
    countySlug: "upshur",
    articleSlug: "upshur-county-gilmer-yamboree-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/upshur-county-gilmer-yamboree-piney-woods-texas")
      .then((module) => module.upshurCountyGilmerYamboreePineyWoodsArticle),
  },
  {
    countySlug: "harrison",
    articleSlug: "harrison-county-marshall-caddo-lake-railroads-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/harrison-county-marshall-caddo-lake-railroads-piney-woods-texas")
      .then((module) => module.harrisonCountyMarshallCaddoLakeRailroadsPineyWoodsArticle),
  },
  {
    countySlug: "marion",
    articleSlug: "marion-county-jefferson-caddo-lake-riverport-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/marion-county-jefferson-caddo-lake-riverport-piney-woods-texas")
      .then((module) => module.marionCountyJeffersonCaddoLakeRiverportPineyWoodsArticle),
  },
  {
    countySlug: "cass",
    articleSlug: "cass-county-linden-atlanta-wright-patman-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/cass-county-linden-atlanta-wright-patman-piney-woods-texas")
      .then((module) => module.cassCountyLindenAtlantaWrightPatmanPineyWoodsArticle),
  },
  {
    countySlug: "bowie",
    articleSlug: "bowie-county-texarkana-new-boston-red-river-piney-woods-texas",
    loadArticle: () => import("@/data/fixtures/bowie-county-texarkana-new-boston-red-river-piney-woods-texas")
      .then((module) => module.bowieCountyTexarkanaNewBostonRedRiverPineyWoodsArticle),
  },
  {
    countySlug: "red-river",
    articleSlug: "red-river-county-clarksville-red-river-gateway-northeast-texas",
    loadArticle: () => import("@/data/fixtures/red-river-county-clarksville-red-river-gateway-northeast-texas")
      .then((module) => module.redRiverCountyClarksvilleRedRiverGatewayNortheastTexasArticle),
  },
  {
    countySlug: "lamar",
    articleSlug: "lamar-county-paris-red-river-railroads-northeast-texas",
    loadArticle: () => import("@/data/fixtures/lamar-county-paris-red-river-railroads-northeast-texas")
      .then((module) => module.lamarCountyParisRedRiverRailroadsNortheastTexasArticle),
  },
];
