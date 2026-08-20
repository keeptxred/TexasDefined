import rodeoHero from "@/assets/rodeo-101-hero-photo.jpg";
import footballHero from "@/assets/high-school-football-hero.jpg";
import kolacheHero from "@/assets/kolache-klobasnek-hero-photo.jpg";
import orderingBbqHero from "@/assets/ordering-bbq-hero-photo.jpg";
import sixFlagsHero from "@/assets/six-flags-hero-photo.jpg";
import type { Article } from "../types";

const rodeo101Stub: Article = {
  id: "evergreen-rodeo-101", brandId: "texasdefined", slug: "rodeo-101-guide-events-rules-traditions",
  title: "Rodeo 101: A Texan’s Guide to the Events, Rules and Traditions",
  dek: "From bronc riding and bull riding to barrels and roping, here is what you are actually watching when the chute opens.",
  category: "sports", hero: { src: rodeoHero, alt: "A cowboy riding a bucking bronc in a dusty Texas rodeo arena at dusk", width: 1600, height: 900 },
  authorId: "a-marisol", publishedAt: "2026-08-07", readingMinutes: 11,
  tags: ["texas rodeo", "bull riding", "barrel racing", "bronc riding", "texas culture", "rodeo guide"], featured: true,
  body: [], relatedCollections: [], relatedDestinations: [],
};

const highSchoolFootballNewcomersStub: Article = {
  id: "evergreen-high-school-football-newcomers", brandId: "texasdefined", slug: "texas-high-school-football-newcomers",
  title: "Texas High School Football for Newcomers: Why Friday Night Matters",
  dek: "The bands, stadium lights and rivalries are only the surface. Texas high school football is part sport, part civic ritual and part small-town calendar.",
  category: "sports", hero: { src: footballHero, alt: "Illustrated Texas high school football players walking toward a lit stadium at sunset", width: 1600, height: 900 },
  authorId: "a-marisol", publishedAt: "2026-08-07", readingMinutes: 10,
  tags: ["texas high school football", "friday night lights", "texas sports", "uil football", "texas culture"], featured: true,
  body: [], relatedCollections: [], relatedDestinations: [],
};

const kolacheOrKlobasnekStub: Article = {
  id: "evergreen-kolache-klobasnek", brandId: "texasdefined", slug: "kolache-or-klobasnek-texas-story",
  title: "Kolache or Klobasnek? The Texas Story Behind Both",
  dek: "Fruit-filled kolaches and sausage-filled klobasneks share Czech roots, but they are not the same pastry. Texas made room for both—and blurred the names along the way.",
  category: "food-bbq", hero: { src: kolacheHero, alt: "Fruit and cheese kolaches beside sausage-filled klobasniky on a Texas bakery tray", width: 1600, height: 900 },
  authorId: "a-marisol", publishedAt: "2026-08-07", readingMinutes: 9,
  tags: ["kolache", "klobasnek", "czech texas", "texas food", "west texas", "czech heritage"], featured: true,
  body: [], relatedCollections: [], relatedDestinations: [],
};

const orderingTexasBarbecueStub: Article = {
  id: "evergreen-ordering-texas-barbecue", brandId: "texasdefined", slug: "beginners-guide-ordering-texas-barbecue",
  title: "A Beginner’s Guide to Ordering Texas Barbecue",
  dek: "New to a Texas barbecue counter? Here is how to order brisket, ribs, sausage, sides and sauce without turning lunch into a vocabulary test.",
  category: "food-bbq", hero: { src: orderingBbqHero, alt: "A Texas barbecue tray with sliced brisket, sausage, pork ribs, pickles, onions and white bread", width: 1600, height: 900 },
  authorId: "a-marisol", publishedAt: "2026-08-07", readingMinutes: 9,
  tags: ["texas barbecue", "brisket", "bbq etiquette", "texas food", "barbecue guide"], featured: true,
  body: [], relatedCollections: [], relatedDestinations: [],
};

const sixFlagsOverTexasMeaningStub: Article = {
  id: "evergreen-six-flags-over-texas-meaning", brandId: "texasdefined", slug: "six-flags-over-texas-meaning",
  title: "What the Six Flags Over Texas Actually Mean",
  dek: "The six flags are more than a theme-park name. They trace the governments that claimed Texas across centuries—and explain why the phrase still carries so much weight here.",
  category: "texas-history", hero: { src: sixFlagsHero, alt: "The Texas State Capitol in Austin with flags flying on poles out front", width: 1600, height: 900 },
  authorId: "a-marisol", publishedAt: "2026-08-07", readingMinutes: 10,
  tags: ["six flags over texas", "texas history", "texas flags", "republic of texas", "texas identity"], featured: true,
  body: [], relatedCollections: [], relatedDestinations: [],
};

const texasRevolutionHistoricSitesRoadTripStub: Article = {
  id: "evergreen-texas-revolution-historic-sites-road-trip", brandId: "texasdefined", slug: "texas-revolution-historic-sites-road-trip",
  title: "Texas Revolution Road Trip: Where Independence Happened",
  dek: "Follow the Texas Revolution through the places where colonists organized, delegates declared independence, armies surrendered and the campaign ended at San Jacinto.",
  category: "texas-history",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/San_felipe_de_austin_shs_cabin_2007.jpg?width=1600", alt: "Replica log cabin at San Felipe de Austin State Historic Site in Texas", width: 1600, height: 1067, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 14,
  tags: ["texas revolution", "texas independence", "texas history road trip", "san felipe de austin", "washington on the brazos", "goliad", "san jacinto"], featured: true,
  sourceName: "Texas Historical Commission", sourceUrl: "https://thc.texas.gov/historic-sites",
  body: [], relatedCollections: [], relatedDestinations: ["san-felipe-de-austin", "washington-on-the-brazos", "star-of-the-republic-museum", "fannin-battleground", "presidio-la-bahia", "san-jacinto-battleground"],
};

const texasFrontierFortsRoadTripStub: Article = {
  id: "evergreen-texas-frontier-forts-road-trip", brandId: "texasdefined", slug: "texas-frontier-forts-road-trip",
  title: "Texas Frontier Forts Road Trip: Four Army Posts That Explain the West",
  dek: "Fort Martin Scott, Fort Griffin, Fort McKavett and Fort Lancaster reveal how soldiers, settlers, travelers, ranchers and Native nations collided across the Texas frontier.",
  category: "texas-history",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/0011FortGriffinTxAdminBuilding.jpg", alt: "Ruins of the administration building at Fort Griffin State Historic Site in Texas", width: 1024, height: 685, credit: "Mark Fisher · CC BY-SA 3.0 · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 14,
  tags: ["texas frontier forts", "texas history road trip", "fort martin scott", "fort griffin", "fort mckavett", "fort lancaster", "buffalo soldiers"], featured: true,
  sourceName: "Texas Historical Commission", sourceUrl: "https://thc.texas.gov/historic-sites",
  body: [], relatedCollections: [], relatedDestinations: ["fort-martin-scott", "fort-griffin", "fort-mckavett", "fort-lancaster", "official-texas-longhorn-herd"],
};

const presidentialTexasHistoricHomesStub: Article = {
  id: "evergreen-presidential-texas-historic-homes", brandId: "texasdefined", slug: "presidential-texas-historic-homes",
  title: "Presidential Texas: Historic Homes of Eisenhower, Bush and Sam Rayburn",
  dek: "Three modest Texas homes reveal how national political careers grew from railroad towns, oil-boom neighborhoods and rural North Texas rather than monumental settings.",
  category: "texas-history",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/2022_03_26_Eisenhour_Birth_Place%2C_Denison%2C_TX_%2828%29.jpg?width=1600", alt: "Eisenhower Birthplace State Historic Site in Denison, Texas", width: 1600, height: 900, credit: "E's & D's Adventures in Life · CC BY 2.0 · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 13,
  tags: ["texas presidents", "eisenhower birthplace", "bush family home", "sam rayburn house", "texas political history", "historic homes"], featured: true,
  sourceName: "Texas Historical Commission", sourceUrl: "https://thc.texas.gov/historic-sites",
  body: [], relatedCollections: [], relatedDestinations: ["eisenhower-birthplace", "bush-family-home", "sam-rayburn-house", "casa-navarro"],
};

const brazoriaPlantationsSlaveryEmancipationHistoryStub: Article = {
  id: "evergreen-brazoria-plantations-slavery-emancipation-history", brandId: "texasdefined", slug: "brazoria-plantations-slavery-emancipation-history",
  title: "Brazoria County Plantation History: Slavery, Emancipation and Archaeology",
  dek: "Levi Jordan and Varner-Hogg preserve two difficult, essential Texas landscapes where enslaved labor, emancipation, Reconstruction, sharecropping, ranching and archaeology can be read together.",
  category: "texas-history",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Levi_Jordan_Plantation_State_Historic_Site.jpg", alt: "Levi Jordan Plantation State Historic Site in Brazoria County, Texas", width: 960, height: 720, credit: "Texas Historical Commission · CC BY 4.0 · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 15,
  tags: ["texas slavery history", "brazoria county history", "levi jordan plantation", "varner hogg plantation", "emancipation", "reconstruction", "texas archaeology"], featured: true,
  sourceName: "Texas Historical Commission", sourceUrl: "https://thc.texas.gov/historic-sites",
  body: [], relatedCollections: [], relatedDestinations: ["levi-jordan-plantation", "varner-hogg-plantation", "first-capitol-of-texas", "stephen-f-austin-memorial"],
};

const texasBorderlandsHistoricSitesGuideStub: Article = {
  id: "evergreen-texas-borderlands-historic-sites-guide", brandId: "texasdefined", slug: "texas-borderlands-historic-sites-guide",
  title: "Texas Borderlands Historic Sites: Missions, Tejano Politics and the Rio Grande World",
  dek: "Connect Old Socorro Mission, Magoffin Home, Casa Navarro, Lipantitlán and Mission Dolores to the Indigenous, Spanish, Mexican, Tejano and American histories that overlap across Texas borderlands.",
  category: "texas-history",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Magoffin_home_2009.jpg?width=1600", alt: "Magoffin Home State Historic Site in El Paso, Texas", width: 1600, height: 965, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 13,
  tags: ["texas borderlands", "tejano history", "old socorro mission", "magoffin home", "casa navarro", "lipantitlan", "mission dolores"], featured: true,
  sourceName: "Texas Historical Commission", sourceUrl: "https://thc.texas.gov/historic-sites",
  body: [], relatedCollections: [], relatedDestinations: ["old-socorro-mission", "magoffin-home", "casa-navarro", "lipantitlan", "mission-dolores"],
};

const texasWorldWarIIHistoricSitesGuideStub: Article = {
  id: "evergreen-texas-world-war-ii-historic-sites-guide", brandId: "texasdefined", slug: "texas-world-war-ii-historic-sites-guide",
  title: "Texas and World War II: Five Historic Places That Connect the State to a Global War",
  dek: "Battleship Texas, Eisenhower's Denison birthplace, the National Museum of the Pacific War, Harlingen's Iwo Jima monument and Slaton's Harvey House connect Texas to combat, command, memory and wartime mobility.",
  category: "texas-history",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fredericksburg_July_2017_7_%28Admiral_Nimitz_Museum%29.jpg?width=1600", alt: "Admiral Nimitz Museum, part of the National Museum of the Pacific War in Fredericksburg, Texas", width: 1600, height: 1067, credit: "Michael Barera · CC BY-SA 4.0 · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 16,
  tags: ["texas world war ii", "battleship texas", "eisenhower birthplace", "national museum pacific war", "iwo jima monument harlingen", "slaton harvey house", "texas military history"], featured: true,
  sourceName: "Texas Historical Commission", sourceUrl: "https://thc.texas.gov/historic-sites",
  body: [], relatedCollections: [], relatedDestinations: ["battleship-texas", "eisenhower-birthplace", "national-museum-pacific-war", "iwo-jima-museum-monument", "slaton-harvey-house"],
};

const battleshipTexasBB35HistoryRestorationStub: Article = {
  id: "evergreen-battleship-texas-bb-35-history-restoration", brandId: "texasdefined", slug: "battleship-texas-bb-35-history-restoration",
  title: "Battleship Texas (BB-35): The Last Dreadnought and Its Return to Galveston",
  dek: "Commissioned in 1914, Battleship Texas served in both World Wars, fired on Normandy, Iwo Jima and Okinawa, became a museum ship in 1948 and is now being restored for a new permanent home at Pier 15 in Galveston.",
  category: "texas-history", region: "gulf-coast",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/USS_Texas_%28BB-35%29_underway_off_San_Pedro%2C_California_%28USA%29%2C_in_December_1944_%2880-G-288338%29.jpg?width=1600", alt: "USS Texas BB-35 underway off San Pedro, California, in December 1944", width: 1600, height: 997, credit: "U.S. Navy · Public domain · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 16,
  tags: ["Battleship Texas", "USS Texas BB-35", "Texas military history", "Texas naval history", "World War I", "World War II", "D-Day", "Galveston"], featured: true,
  sourceName: "Battleship Texas Foundation", sourceUrl: "https://battleshiptexas.org/",
  body: [], relatedCollections: [], relatedDestinations: ["battleship-texas", "galveston-island-historic-pleasure-pier", "moody-gardens", "galveston-island-state-park"],
};

export const standaloneEvergreenStubs: Article[] = [
  rodeo101Stub,
  highSchoolFootballNewcomersStub,
  kolacheOrKlobasnekStub,
  orderingTexasBarbecueStub,
  sixFlagsOverTexasMeaningStub,
  texasRevolutionHistoricSitesRoadTripStub,
  texasFrontierFortsRoadTripStub,
  presidentialTexasHistoricHomesStub,
  brazoriaPlantationsSlaveryEmancipationHistoryStub,
  texasBorderlandsHistoricSitesGuideStub,
  texasWorldWarIIHistoricSitesGuideStub,
  battleshipTexasBB35HistoryRestorationStub,
];

export async function loadStandaloneEvergreenArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined") return null;
  if (slug === rodeo101Stub.slug) return import("./rodeo-101").then((module) => module.rodeo101Article);
  if (slug === highSchoolFootballNewcomersStub.slug) return import("./high-school-football-newcomers").then((module) => module.highSchoolFootballNewcomersArticle);
  if (slug === kolacheOrKlobasnekStub.slug) return import("./kolache-or-klobasnek").then((module) => module.kolacheOrKlobasnekArticle);
  if (slug === orderingTexasBarbecueStub.slug) return import("./ordering-texas-barbecue").then((module) => module.orderingTexasBarbecueArticle);
  if (slug === sixFlagsOverTexasMeaningStub.slug) return import("./six-flags-over-texas-meaning").then((module) => module.sixFlagsOverTexasMeaningArticle);
  if (slug === texasRevolutionHistoricSitesRoadTripStub.slug) return import("./texas-revolution-historic-sites-road-trip").then((module) => module.texasRevolutionHistoricSitesRoadTripArticle);
  if (slug === texasFrontierFortsRoadTripStub.slug) return import("./texas-frontier-forts-road-trip").then((module) => module.texasFrontierFortsRoadTripArticle);
  if (slug === presidentialTexasHistoricHomesStub.slug) return import("./presidential-texas-historic-homes").then((module) => module.presidentialTexasHistoricHomesArticle);
  if (slug === brazoriaPlantationsSlaveryEmancipationHistoryStub.slug) return import("./brazoria-plantations-slavery-emancipation-history").then((module) => module.brazoriaPlantationsSlaveryEmancipationHistoryArticle);
  if (slug === texasBorderlandsHistoricSitesGuideStub.slug) return import("./texas-borderlands-historic-sites-guide").then((module) => module.texasBorderlandsHistoricSitesGuideArticle);
  if (slug === texasWorldWarIIHistoricSitesGuideStub.slug) return import("./texas-world-war-ii-historic-sites-guide").then((module) => module.texasWorldWarIIHistoricSitesGuideArticle);
  if (slug === battleshipTexasBB35HistoryRestorationStub.slug) return import("./battleship-texas-bb-35-history-restoration").then((module) => module.battleshipTexasBB35HistoryRestorationArticle);
  return null;
}
