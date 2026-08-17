import type { Article } from "@/data/types";

export type CountySeriesProfile = {
  countySlug: string;
  articleSlug: string;
  loadArticle: () => Promise<Article>;
};

const profile = (
  countySlug: string,
  articleSlug: string,
  loadArticle: () => Promise<Article>,
): CountySeriesProfile => ({ countySlug, articleSlug, loadArticle });

export const COUNTY_SERIES_PROFILES: CountySeriesProfile[] = [
  profile("brewster", "brewster-county-big-bend-texas", () => import("@/data/fixtures/brewster-county-big-bend").then((module) => module.brewsterCountyBigBendArticle)),
  profile("presidio", "presidio-county-marfa-borderlands-texas", () => import("@/data/fixtures/presidio-county-marfa-borderlands").then((module) => module.presidioCountyMarfaBorderlandsArticle)),
  profile("jeff-davis", "jeff-davis-county-fort-davis-mountains-texas", () => import("@/data/fixtures/jeff-davis-county-fort-davis-mountains").then((module) => module.jeffDavisCountyFortDavisMountainsArticle)),
  profile("culberson", "culberson-county-van-horn-guadalupe-mountains-texas", () => import("@/data/fixtures/culberson-county-van-horn-guadalupe-mountains").then((module) => module.culbersonCountyVanHornGuadalupeMountainsArticle)),
  profile("hudspeth", "hudspeth-county-sierra-blanca-salt-flats-texas", () => import("@/data/fixtures/hudspeth-county-sierra-blanca-salt-flats").then((module) => module.hudspethCountySierraBlancaSaltFlatsArticle)),
  profile("el-paso", "el-paso-county-missions-rio-grande-texas", () => import("@/data/fixtures/el-paso-county-pass-missions-borderlands").then((module) => module.elPasoCountyPassMissionsBorderlandsArticle)),
  profile("reeves", "reeves-county-pecos-balmorhea-texas", () => import("@/data/fixtures/reeves-county-pecos-balmorhea").then((module) => module.reevesCountyPecosBalmorheaArticle)),
  profile("pecos", "pecos-county-fort-stockton-comanche-springs-texas", () => import("@/data/fixtures/pecos-county-fort-stockton-comanche-springs").then((module) => module.pecosCountyFortStocktonComancheSpringsArticle)),
  profile("ward", "ward-county-monahans-sandhills-texas", () => import("@/data/fixtures/ward-county-monahans-sandhills").then((module) => module.wardCountyMonahansSandhillsArticle)),
  profile("winkler", "winkler-county-kermit-wink-oil-texas", () => import("@/data/fixtures/winkler-county-kermit-wink-oil").then((module) => module.winklerCountyKermitWinkOilArticle)),
  profile("andrews", "andrews-county-andrews-oil-shafter-lake-texas", () => import("@/data/fixtures/andrews-county-andrews-oil-shafter-lake").then((module) => module.andrewsCountyAndrewsOilShafterLakeArticle)),
  profile("ector", "ector-county-odessa-oil-stonehenge-texas", () => import("@/data/fixtures/ector-county-odessa-oil-stonehenge").then((module) => module.ectorCountyOdessaOilStonehengeArticle)),
  profile("randall", "randall-county-canyon-palo-duro-texas", () => import("@/data/fixtures/randall-county-canyon-palo-duro").then((module) => module.randallCountyCanyonPaloDuroArticle)),
  profile("tom-green", "tom-green-county-san-angelo-concho-texas", () => import("@/data/fixtures/tom-green-county-san-angelo-concho").then((module) => module.tomGreenCountySanAngeloConchoArticle)),
  profile("midland", "midland-county-railroad-oil-high-plains-texas", () => import("@/data/fixtures/midland-county-railroad-oil-high-plains").then((module) => module.midlandCountyRailroadOilHighPlainsArticle)),
  profile("galveston", "galveston-county-island-port-juneteenth-texas", () => import("@/data/fixtures/galveston-county-island-port-juneteenth").then((module) => module.galvestonCountyIslandPortJuneteenthArticle)),
  profile("gillespie", "gillespie-county-fredericksburg-stonewall-hill-country-texas", () => import("@/data/fixtures/gillespie-county-fredericksburg-stonewall-hill-country").then((module) => module.gillespieCountyFredericksburgStonewallHillCountryArticle)),
  profile("bexar", "bexar-county-san-antonio-missions-river-texas", () => import("@/data/fixtures/bexar-county-san-antonio-missions-river").then((module) => module.bexarCountySanAntonioMissionsRiverArticle)),
  profile("travis", "travis-county-austin-capitol-springs-hill-country-texas", () => import("@/data/fixtures/travis-county-austin-capitol-springs-hill-country").then((module) => module.travisCountyAustinCapitolSpringsHillCountryArticle)),
  profile("harris", "harris-county-houston-bayous-port-space-texas", () => import("@/data/fixtures/harris-county-houston-bayous-port-space").then((module) => module.harrisCountyHoustonBayousPortSpaceArticle)),
  profile("fort-bend", "fort-bend-county-brazos-richmond-sugar-land-texas", () => import("@/data/fixtures/fort-bend-county-brazos-richmond-sugar-land").then((module) => module.fortBendCountyBrazosRichmondSugarLandArticle)),
  profile("montgomery", "montgomery-county-conroe-lake-piney-woods-texas", () => import("@/data/fixtures/montgomery-county-conroe-lake-piney-woods").then((module) => module.montgomeryCountyConroeLakePineyWoodsArticle)),
  profile("brazoria", "brazoria-county-brazos-gulf-angleton-texas", () => import("@/data/fixtures/brazoria-county-brazos-gulf-angleton").then((module) => module.brazoriaCountyBrazosGulfAngletonArticle)),
  profile("dallas", "dallas-county-dallas-trinity-old-red-texas", () => import("@/data/fixtures/dallas-county-dallas-trinity-old-red").then((module) => module.dallasCountyDallasTrinityOldRedArticle)),
  profile("tarrant", "tarrant-county-fort-worth-trinity-western-heritage-texas", () => import("@/data/fixtures/tarrant-county-fort-worth-trinity-western-heritage").then((module) => module.tarrantCountyFortWorthTrinityWesternHeritageArticle)),
  profile("collin", "collin-county-mckinney-prairie-growth-texas", () => import("@/data/fixtures/collin-county-mckinney-prairie-growth").then((module) => module.collinCountyMcKinneyPrairieGrowthArticle)),
  profile("denton", "denton-county-denton-lakes-universities-growth-texas", () => import("@/data/fixtures/denton-county-denton-lakes-universities-growth").then((module) => module.dentonCountyDentonLakesUniversitiesGrowthArticle)),
  profile("williamson", "williamson-county-georgetown-round-rock-san-gabriel-texas", () => import("@/data/fixtures/williamson-county-georgetown-round-rock-san-gabriel").then((module) => module.williamsonCountyGeorgetownRoundRockSanGabrielArticle)),
  profile("hays", "hays-county-san-marcos-blanco-hill-country-texas", () => import("@/data/fixtures/hays-county-san-marcos-blanco-hill-country").then((module) => module.haysCountySanMarcosBlancoHillCountryArticle)),
  profile("comal", "comal-county-new-braunfels-canyon-lake-guadalupe-texas", () => import("@/data/fixtures/comal-county-new-braunfels-canyon-lake-guadalupe").then((module) => module.comalCountyNewBraunfelsCanyonLakeGuadalupeArticle)),
  profile("bell", "bell-county-belton-temple-fort-hood-lakes-texas", () => import("@/data/fixtures/bell-county-belton-temple-fort-hood-lakes").then((module) => module.bellCountyBeltonTempleFortHoodLakesArticle)),
  profile("mclennan", "mclennan-county-waco-brazos-baylor-mammoths-texas", () => import("@/data/fixtures/mclennan-county-waco-brazos-baylor-mammoths").then((module) => module.mclennanCountyWacoBrazosBaylorMammothsArticle)),
  profile("brazos", "brazos-county-bryan-college-station-aggieland-rivers-texas", () => import("@/data/fixtures/brazos-county-bryan-college-station-aggieland-rivers").then((module) => module.brazosCountyBryanCollegeStationAggielandRiversArticle)),
  profile("bastrop", "bastrop-county-lost-pines-colorado-river-history-texas", () => import("@/data/fixtures/bastrop-county-lost-pines-colorado-river-history").then((module) => module.bastropCountyLostPinesColoradoRiverHistoryArticle)),
];

const articlePromiseCache = new Map<string, Promise<Article | null>>();

export function hasCountySeriesProfile(countySlug: string) {
  return COUNTY_SERIES_PROFILES.some((item) => item.countySlug === countySlug);
}

export function loadCountySeriesArticle(countySlug: string): Promise<Article | null> {
  const cached = articlePromiseCache.get(countySlug);
  if (cached) return cached;

  const countyProfile = COUNTY_SERIES_PROFILES.find((item) => item.countySlug === countySlug);
  const promise = countyProfile?.loadArticle() ?? Promise.resolve(null);
  articlePromiseCache.set(countySlug, promise);
  return promise;
}

export function countySlugForLegacyArticle(articleSlug: string) {
  return COUNTY_SERIES_PROFILES.find((item) => item.articleSlug === articleSlug)?.countySlug ?? null;
}

export function isLegacyCountySeriesArticle(articleSlug: string) {
  return countySlugForLegacyArticle(articleSlug) !== null;
}
