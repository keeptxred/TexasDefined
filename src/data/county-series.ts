import { createServerFn } from "@tanstack/react-start";
import type { Article } from "@/data/types";

export type CountySeriesProfile = {
  countySlug: string;
  articleSlug: string;
  loadArticle: () => Promise<Article>;
};

const LEGACY_ARTICLE_TO_COUNTY = new Map<string, string>([
  ["brewster-county-big-bend-texas", "brewster"],
  ["presidio-county-marfa-borderlands-texas", "presidio"],
  ["jeff-davis-county-fort-davis-mountains-texas", "jeff-davis"],
  ["culberson-county-van-horn-guadalupe-mountains-texas", "culberson"],
  ["hudspeth-county-sierra-blanca-salt-flats-texas", "hudspeth"],
  ["el-paso-county-missions-rio-grande-texas", "el-paso"],
  ["reeves-county-pecos-balmorhea-texas", "reeves"],
  ["pecos-county-fort-stockton-comanche-springs-texas", "pecos"],
  ["ward-county-monahans-sandhills-texas", "ward"],
  ["winkler-county-kermit-wink-oil-texas", "winkler"],
  ["andrews-county-andrews-oil-shafter-lake-texas", "andrews"],
  ["ector-county-odessa-oil-stonehenge-texas", "ector"],
  ["randall-county-canyon-palo-duro-texas", "randall"],
  ["tom-green-county-san-angelo-concho-texas", "tom-green"],
  ["midland-county-railroad-oil-high-plains-texas", "midland"],
  ["galveston-county-island-port-juneteenth-texas", "galveston"],
  ["gillespie-county-fredericksburg-stonewall-hill-country-texas", "gillespie"],
  ["bexar-county-san-antonio-missions-river-texas", "bexar"],
  ["travis-county-austin-capitol-springs-hill-country-texas", "travis"],
  ["harris-county-houston-bayous-port-space-texas", "harris"],
  ["fort-bend-county-brazos-richmond-sugar-land-texas", "fort-bend"],
  ["montgomery-county-conroe-lake-piney-woods-texas", "montgomery"],
  ["brazoria-county-brazos-gulf-angleton-texas", "brazoria"],
  ["dallas-county-dallas-trinity-old-red-texas", "dallas"],
  ["tarrant-county-fort-worth-trinity-western-heritage-texas", "tarrant"],
  ["collin-county-mckinney-prairie-growth-texas", "collin"],
  ["denton-county-denton-lakes-universities-growth-texas", "denton"],
  ["williamson-county-georgetown-round-rock-san-gabriel-texas", "williamson"],
  ["hays-county-san-marcos-blanco-hill-country-texas", "hays"],
  ["comal-county-new-braunfels-canyon-lake-guadalupe-texas", "comal"],
  ["bell-county-belton-temple-fort-hood-lakes-texas", "bell"],
  ["mclennan-county-waco-brazos-baylor-mammoths-texas", "mclennan"],
  ["brazos-county-bryan-college-station-aggieland-rivers-texas", "brazos"],
  ["bastrop-county-lost-pines-colorado-river-history-texas", "bastrop"],
  ["lee-county-giddings-serbin-wendish-heritage-texas", "lee"],
  ["fayette-county-la-grange-painted-churches-colorado-river-texas", "fayette"],
  ["washington-county-brenham-washington-brazos-independence-texas", "washington"],
  ["austin-county-bellville-san-felipe-sealy-brazos-texas", "austin"],
  ["colorado-county-columbus-weimar-eagle-lake-prairie-texas", "colorado"],
  ["wharton-county-wharton-el-campo-colorado-river-prairie-texas", "wharton"],
  ["matagorda-county-bay-city-palacios-colorado-river-bays-texas", "matagorda"],
  ["jackson-county-edna-ganado-lake-texana-lavaca-navidad-texas", "jackson"],
  ["lavaca-county-hallettsville-shiner-yoakum-rivers-texas", "lavaca"],
  ["calhoun-county-port-lavaca-indianola-seadrift-bays-texas", "calhoun"],
  ["victoria-county-victoria-guadalupe-de-leon-crossroads-texas", "victoria"],
  ["goliad-county-goliad-la-bahia-san-antonio-river-texas", "goliad"],
  ["refugio-county-refugio-mission-river-coastal-prairie-texas", "refugio"],
  ["aransas-county-rockport-fulton-bays-coastal-heritage-texas", "aransas"],
  ["san-patricio-county-sinton-irish-colony-coastal-prairie-texas", "san-patricio"],
  ["nueces-county-corpus-christi-bay-islands-coastal-bend-texas", "nueces"],
  ["kleberg-county-kingsville-king-ranch-padre-island-texas", "kleberg"],
  ["kenedy-county-sarita-ranches-padre-island-wild-horse-desert-texas", "kenedy"],
  ["willacy-county-raymondville-port-mansfield-laguna-madre-texas", "willacy"],
  ["cameron-county-brownsville-harlingen-south-padre-rio-grande-texas", "cameron"],
  ["hidalgo-county-edinburg-mcallen-mission-rio-grande-valley-texas", "hidalgo"],
  ["starr-county-rio-grande-city-roma-fort-ringgold-borderlands-texas", "starr"],
  ["zapata-county-zapata-san-ygnacio-falcon-rio-grande-texas", "zapata"],
  ["webb-county-laredo-rio-grande-trade-borderlands-texas", "webb"],
  ["maverick-county-eagle-pass-fort-duncan-rio-grande-texas", "maverick"],
  ["kinney-county-brackettville-fort-clark-las-moras-texas", "kinney"],
  ["val-verde-county-del-rio-amistad-devils-river-lower-pecos-texas", "val-verde"],
  ["edwards-county-rocksprings-devils-sinkhole-nueces-plateau-texas", "edwards"],
  ["real-county-leakey-camp-wood-frio-nueces-canyons-texas", "real"],
  ["uvalde-county-uvalde-garner-frio-fort-inge-texas", "uvalde"],
  ["zavala-county-crystal-city-winter-garden-nueces-texas", "zavala"],
  ["dimmit-county-carrizo-springs-winter-garden-nueces-texas", "dimmit"],
  ["la-salle-county-cotulla-nueces-winter-garden-brush-country-texas", "la-salle"],
  ["mcmullen-county-tilden-frio-nueces-ranch-country-texas", "mcmullen"],
  ["brooks-county-falfurrias-ranching-dairy-brush-country-texas", "brooks"],
  ["jim-hogg-county-hebbronville-ranching-railroad-brush-country-texas", "jim-hogg"],
  ["duval-county-san-diego-freer-benavides-brush-country-texas", "duval"],
  ["jim-wells-county-alice-ranching-oil-brush-country-texas", "jim-wells"],
  ["live-oak-county-george-west-three-rivers-choke-canyon-texas", "live-oak"],
  ["atascosa-county-jourdanton-pleasanton-poteet-ranch-country-texas", "atascosa"],
  ["bee-county-beeville-railroads-ranching-coastal-bend-texas", "bee"],
  ["frio-county-pearsall-dilley-frio-river-winter-garden-texas", "frio"],
  ["karnes-county-karnes-city-kenedy-panna-maria-san-antonio-river-texas", "karnes"],
  ["wilson-county-floresville-la-vernia-stockdale-san-antonio-river-texas", "wilson"],
  ["gonzales-county-gonzales-come-and-take-it-guadalupe-palmetto-texas", "gonzales"],
  ["guadalupe-county-seguin-cibolo-guadalupe-river-texas", "guadalupe"],
  ["dewitt-county-cuero-yorktown-guadalupe-river-texas", "dewitt"],
  ["medina-county-hondo-castroville-medina-river-texas", "medina"],
  ["bandera-county-bandera-medina-river-cowboy-hill-country-texas", "bandera"],
  ["kendall-county-boerne-comfort-guadalupe-hill-country-texas", "kendall"],
  ["kerr-county-kerrville-guadalupe-hunt-hill-country-texas", "kerr"],
  ["blanco-county-johnson-city-blanco-pedernales-hill-country-texas", "blanco"],
  ["burnet-county-burnet-marble-falls-highland-lakes-granite-texas", "burnet"],
  ["llano-county-llano-river-granite-highland-lakes-texas", "llano"],
  ["mason-county-mason-fort-llano-river-hill-country-texas", "mason"],
  ["san-saba-county-san-saba-pecans-rivers-hill-country-texas", "san-saba"],
  ["lampasas-county-lampasas-springs-rivers-central-texas", "lampasas"],
  ["mills-county-goldthwaite-colorado-river-ranch-country-texas", "mills"],
  ["hamilton-county-hamilton-hico-rivers-ranch-country-texas", "hamilton"],
  ["coryell-county-gatesville-fort-cavazos-leon-river-central-texas", "coryell"],
  ["bosque-county-meridian-clifton-norwegian-heritage-bosque-river-texas", "bosque"],
  ["erath-county-stephenville-dublin-tarleton-cross-timbers-texas", "erath"],
  ["comanche-county-comanche-de-leon-proctor-lake-cross-timbers-texas", "comanche"],
  ["eastland-county-eastland-cisco-ranger-oil-cross-timbers-texas", "eastland"],
  ["palo-pinto-county-mineral-wells-possum-kingdom-brazos-cross-timbers-texas", "palo-pinto"],
  ["hood-county-granbury-lake-brazos-acton-cross-timbers-texas", "hood"],
  ["somervell-county-glen-rose-dinosaur-valley-paluxy-brazos-texas", "somervell"],
  ["johnson-county-cleburne-chisholm-trail-railroad-prairies-texas", "johnson"],
  ["hill-county-hillsboro-lake-whitney-cotton-prairies-texas", "hill"],
  ["ellis-county-waxahachie-ennis-blackland-prairie-texas", "ellis"],
  ["navarro-county-corsicana-oil-blackland-prairie-texas", "navarro"],
  ["limestone-county-groesbeck-mexia-fort-parker-navasota-prairie-texas", "limestone"],
  ["freestone-county-fairfield-teague-wortham-trinity-prairie-texas", "freestone"],
  ["leon-county-centerville-buffalo-jewett-trinity-prairie-texas", "leon"],
  ["madison-county-madisonville-midway-north-zulch-trinity-navasota-texas", "madison"],
  ["grimes-county-anderson-navasota-fanthorp-railroads-texas", "grimes"],
  ["walker-county-huntsville-sam-houston-piney-woods-texas", "walker"],
  ["trinity-county-groveton-lumber-trinity-river-piney-woods-texas", "trinity"],
  ["houston-county-crockett-mission-tejas-piney-woods-texas", "houston"],
  ["angelina-county-lufkin-diboll-sam-rayburn-piney-woods-texas", "angelina"],
  ["nacogdoches-county-nacogdoches-caddo-el-camino-piney-woods-texas", "nacogdoches"],
  ["san-augustine-county-san-augustine-mission-dolores-el-camino-piney-woods-texas", "san-augustine"],
  ["sabine-county-hemphill-toledo-bend-sabine-river-piney-woods-texas", "sabine"],
  ["shelby-county-center-regulator-moderator-sabine-piney-woods-texas", "shelby"],
  ["panola-county-carthage-sabine-timber-music-piney-woods-texas", "panola"],
  ["rusk-county-henderson-east-texas-oil-field-piney-woods-texas", "rusk"],
  ["cherokee-county-rusk-jacksonville-caddo-mounds-piney-woods-texas", "cherokee"],
  ["smith-county-tyler-roses-railroads-piney-woods-texas", "smith"],
  ["gregg-county-longview-kilgore-oil-railroads-piney-woods-texas", "gregg"],
  ["upshur-county-gilmer-yamboree-piney-woods-texas", "upshur"],
]);

const COUNTY_SLUGS = new Set(LEGACY_ARTICLE_TO_COUNTY.values());

const loadCountySeriesArticleServerFn = createServerFn({ method: "GET" })
  .inputValidator((data: { countySlug: string }) => data)
  .handler(async ({ data }) => {
    const { loadCountySeriesArticleServer } = await import("./county-series.server");
    return loadCountySeriesArticleServer(data.countySlug);
  });

export function hasCountySeriesProfile(countySlug: string) {
  return COUNTY_SLUGS.has(countySlug);
}

export function loadCountySeriesArticle(countySlug: string): Promise<Article | null> {
  return loadCountySeriesArticleServerFn({ data: { countySlug } });
}

export function countySlugForLegacyArticle(articleSlug: string) {
  return LEGACY_ARTICLE_TO_COUNTY.get(articleSlug) ?? null;
}

export function isLegacyCountySeriesArticle(articleSlug: string) {
  return LEGACY_ARTICLE_TO_COUNTY.has(articleSlug);
}
