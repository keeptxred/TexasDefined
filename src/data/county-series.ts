import type { Article } from "@/data/types";

export type CountySeriesProfile = {
  countySlug: string;
  articleSlug: string;
  loadArticle: () => Promise<Article>;
};

export const COUNTY_SERIES_PROFILES: CountySeriesProfile[] = [
  { countySlug: "brewster", articleSlug: "brewster-county-big-bend-texas", loadArticle: () => import("@/data/fixtures/brewster-county-big-bend").then((module) => module.brewsterCountyBigBendArticle) },
  { countySlug: "presidio", articleSlug: "presidio-county-marfa-borderlands-texas", loadArticle: () => import("@/data/fixtures/presidio-county-marfa-borderlands").then((module) => module.presidioCountyMarfaBorderlandsArticle) },
  { countySlug: "jeff-davis", articleSlug: "jeff-davis-county-fort-davis-mountains-texas", loadArticle: () => import("@/data/fixtures/jeff-davis-county-fort-davis-mountains").then((module) => module.jeffDavisCountyFortDavisMountainsArticle) },
  { countySlug: "culberson", articleSlug: "culberson-county-van-horn-guadalupe-mountains-texas", loadArticle: () => import("@/data/fixtures/culberson-county-van-horn-guadalupe-mountains").then((module) => module.culbersonCountyVanHornGuadalupeMountainsArticle) },
  { countySlug: "hudspeth", articleSlug: "hudspeth-county-sierra-blanca-salt-flats-texas", loadArticle: () => import("@/data/fixtures/hudspeth-county-sierra-blanca-salt-flats").then((module) => module.hudspethCountySierraBlancaSaltFlatsArticle) },
  { countySlug: "el-paso", articleSlug: "el-paso-county-missions-rio-grande-texas", loadArticle: () => import("@/data/fixtures/el-paso-county-pass-missions-borderlands").then((module) => module.elPasoCountyPassMissionsBorderlandsArticle) },
  { countySlug: "reeves", articleSlug: "reeves-county-pecos-balmorhea-texas", loadArticle: () => import("@/data/fixtures/reeves-county-pecos-balmorhea").then((module) => module.reevesCountyPecosBalmorheaArticle) },
  { countySlug: "pecos", articleSlug: "pecos-county-fort-stockton-comanche-springs-texas", loadArticle: () => import("@/data/fixtures/pecos-county-fort-stockton-comanche-springs").then((module) => module.pecosCountyFortStocktonComancheSpringsArticle) },
  { countySlug: "ward", articleSlug: "ward-county-monahans-sandhills-texas", loadArticle: () => import("@/data/fixtures/ward-county-monahans-sandhills").then((module) => module.wardCountyMonahansSandhillsArticle) },
  { countySlug: "winkler", articleSlug: "winkler-county-kermit-wink-oil-texas", loadArticle: () => import("@/data/fixtures/winkler-county-kermit-wink-oil").then((module) => module.winklerCountyKermitWinkOilArticle) },
  { countySlug: "andrews", articleSlug: "andrews-county-andrews-oil-shafter-lake-texas", loadArticle: () => import("@/data/fixtures/andrews-county-andrews-oil-shafter-lake").then((module) => module.andrewsCountyAndrewsOilShafterLakeArticle) },
  { countySlug: "ector", articleSlug: "ector-county-odessa-oil-stonehenge-texas", loadArticle: () => import("@/data/fixtures/ector-county-odessa-oil-stonehenge").then((module) => module.ectorCountyOdessaOilStonehengeArticle) },
  { countySlug: "randall", articleSlug: "randall-county-canyon-palo-duro-texas", loadArticle: () => import("@/data/fixtures/randall-county-canyon-palo-duro").then((module) => module.randallCountyCanyonPaloDuroArticle) },
  { countySlug: "tom-green", articleSlug: "tom-green-county-san-angelo-concho-texas", loadArticle: () => import("@/data/fixtures/tom-green-county-san-angelo-concho").then((module) => module.tomGreenCountySanAngeloConchoArticle) },
  { countySlug: "midland", articleSlug: "midland-county-railroad-oil-high-plains-texas", loadArticle: () => import("@/data/fixtures/midland-county-railroad-oil-high-plains").then((module) => module.midlandCountyRailroadOilHighPlainsArticle) },
  { countySlug: "galveston", articleSlug: "galveston-county-island-port-juneteenth-texas", loadArticle: () => import("@/data/fixtures/galveston-county-island-port-juneteenth").then((module) => module.galvestonCountyIslandPortJuneteenthArticle) },
  { countySlug: "gillespie", articleSlug: "gillespie-county-fredericksburg-stonewall-hill-country-texas", loadArticle: () => import("@/data/fixtures/gillespie-county-fredericksburg-stonewall-hill-country").then((module) => module.gillespieCountyFredericksburgStonewallHillCountryArticle) },
  { countySlug: "bexar", articleSlug: "bexar-county-san-antonio-missions-river-texas", loadArticle: () => import("@/data/fixtures/bexar-county-san-antonio-missions-river").then((module) => module.bexarCountySanAntonioMissionsRiverArticle) },
  { countySlug: "travis", articleSlug: "travis-county-austin-capitol-springs-hill-country-texas", loadArticle: () => import("@/data/fixtures/travis-county-austin-capitol-springs-hill-country").then((module) => module.travisCountyAustinCapitolSpringsHillCountryArticle) },
  { countySlug: "harris", articleSlug: "harris-county-houston-bayous-port-space-texas", loadArticle: () => import("@/data/fixtures/harris-county-houston-bayous-port-space").then((module) => module.harrisCountyHoustonBayousPortSpaceArticle) },
  { countySlug: "fort-bend", articleSlug: "fort-bend-county-brazos-richmond-sugar-land-texas", loadArticle: () => import("@/data/fixtures/fort-bend-county-brazos-richmond-sugar-land").then((module) => module.fortBendCountyBrazosRichmondSugarLandArticle) },
  { countySlug: "montgomery", articleSlug: "montgomery-county-conroe-lake-piney-woods-texas", loadArticle: () => import("@/data/fixtures/montgomery-county-conroe-lake-piney-woods").then((module) => module.montgomeryCountyConroeLakePineyWoodsArticle) },
  { countySlug: "brazoria", articleSlug: "brazoria-county-brazos-gulf-angleton-texas", loadArticle: () => import("@/data/fixtures/brazoria-county-brazos-gulf-angleton").then((module) => module.brazoriaCountyBrazosGulfAngletonArticle) },
];

export function loadCountySeriesArticle(countySlug: string): Promise<Article | null> {
  return COUNTY_SERIES_PROFILES.find((profile) => profile.countySlug === countySlug)?.loadArticle() ?? Promise.resolve(null);
}

export function countySlugForLegacyArticle(articleSlug: string) {
  return COUNTY_SERIES_PROFILES.find((profile) => profile.articleSlug === articleSlug)?.countySlug ?? null;
}

export function isLegacyCountySeriesArticle(articleSlug: string) {
  return countySlugForLegacyArticle(articleSlug) !== null;
}
