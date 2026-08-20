import "../military-history-internal-links";

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

const texasMilitaryHistoryTimelineStub: Article = {
  id: "evergreen-texas-military-history-timeline", brandId: "texasdefined", slug: "texas-military-history-timeline",
  title: "Texas Military History: From the Revolution to the World Wars",
  dek: "A chronological guide to the battles, frontier posts, state forces, naval history, border mobilizations and global wars that shaped Texas from 1835 into the modern era.",
  category: "texas-history",
  hero: { src: "/images/explore/historic-sites/battleship-texas.jpg", alt: "Battleship Texas, the historic battleship that served in both World Wars", width: 1600, height: 1067, credit: "Daniel Schwen · CC BY-SA 4.0 · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 17,
  tags: ["texas military history", "texas revolution", "republic of texas army", "texas frontier forts", "texas civil war", "texas national guard", "texas world war ii", "battleship texas"], featured: true,
  sourceName: "Texas Military Department", sourceUrl: "https://tmd.texas.gov/texas-military-department-history",
  body: [], relatedCollections: [], relatedDestinations: ["the-alamo", "san-jacinto-battleground", "fort-martin-scott", "fort-griffin", "fort-mckavett", "fort-lancaster", "sabine-pass-battleground", "palmito-ranch-battlefield", "battleship-texas", "national-museum-pacific-war", "iwo-jima-museum-monument"],
};

const texasCivilWarSitesGuideStub: Article = {
  id: "evergreen-texas-civil-war-sites-guide", brandId: "texasdefined", slug: "texas-civil-war-sites-guide",
  title: "Texas in the Civil War: Battlefields, Emancipation, Reconstruction and Memory",
  dek: "Follow Texas from secession and Gulf Coast fighting through Palmito Ranch, Juneteenth, emancipation, Reconstruction and the later places where Texans preserved—and reshaped—the war's memory.",
  category: "texas-history",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Richard_Dowling_Memorial_Sabine_Pass_TX.jpg?width=1600", alt: "Richard Dowling Memorial at Sabine Pass Battleground State Historic Site in Texas", width: 1600, height: 1200, credit: "Junglecat · CC BY-SA 4.0 · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 16,
  tags: ["texas civil war", "reconstruction texas", "sabine pass", "palmito ranch", "juneteenth", "texas military history", "emancipation texas", "civil war memory"], featured: true,
  sourceName: "Texas Historical Commission", sourceUrl: "https://thc.texas.gov/learn/military-history/texas-civil-war",
  body: [], relatedCollections: [], relatedDestinations: ["sabine-pass-battleground", "palmito-ranch-battlefield", "confederate-reunion-grounds", "sam-bell-maxey-house", "levi-jordan-plantation", "varner-hogg-plantation", "starr-family-home"],
};

const republicOfTexasGovernmentTrailStub: Article = {
  id: "evergreen-republic-of-texas-government-trail", brandId: "texasdefined", slug: "republic-of-texas-government-trail",
  title: "Republic of Texas Government Trail: San Felipe, Washington, Columbia and Austin",
  dek: "Follow Texas government from Austin's colonial capital and the provisional government through the independence convention, the Republic's first Congress, international diplomacy and the final years before statehood.",
  category: "texas-history",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/First_Capitol_of_the_Republic_of_Texas_%283967003172%29.jpg", alt: "Historic photograph of the First Capitol of the Republic of Texas in West Columbia", width: 575, height: 725, credit: "F. E. Beach / DeGolyer Library, SMU · no known copyright restrictions · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 15,
  tags: ["republic of texas", "texas capitals", "san felipe de austin", "washington on the brazos", "west columbia texas", "french legation", "texas government history", "sam houston"], featured: true,
  sourceName: "Texas Historical Commission", sourceUrl: "https://thc.texas.gov/historic-sites",
  body: [], relatedCollections: [], relatedDestinations: ["san-felipe-de-austin", "washington-on-the-brazos", "star-of-the-republic-museum", "first-capitol-of-texas", "stephen-f-austin-memorial", "french-legation", "barrington-living-history-farm"],
};

const washingtonOnTheBrazosWeekendGuideStub: Article = {
  id: "evergreen-washington-on-the-brazos-weekend-guide", brandId: "texasdefined", slug: "washington-on-the-brazos-weekend-guide",
  title: "A History Weekend at Washington-on-the-Brazos",
  dek: "Plan a history-first day or overnight around Independence Hall, the Star of the Republic Museum and Barrington Living History Farm without rushing the Brazos landscape that connects them.",
  category: "road-trips",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Brazos_River_at_Washington_on_the_Brazos.jpg?width=1600", alt: "The Brazos River at Washington-on-the-Brazos State Historic Site", width: 1600, height: 900, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 11,
  tags: ["washington on the brazos", "texas history weekend", "star of the republic museum", "barrington living history farm", "texas road trip", "washington county"], featured: true,
  sourceName: "Texas Historical Commission", sourceUrl: "https://thc.texas.gov/historic-sites/washington-brazos",
  body: [], relatedCollections: [], relatedDestinations: ["washington-on-the-brazos", "star-of-the-republic-museum", "barrington-living-history-farm", "san-felipe-de-austin", "fanthorp-inn"],
};

const goliadHistoryWeekendGuideStub: Article = {
  id: "evergreen-goliad-history-weekend-guide", brandId: "texasdefined", slug: "goliad-history-weekend-guide",
  title: "A Goliad History Weekend: Fannin Battleground to Presidio La Bahía",
  dek: "Follow the Goliad campaign in the right order—from the Coleto battlefield to Presidio La Bahía—then slow down enough to see the Spanish, Mexican and Republic-era layers around the story.",
  category: "road-trips",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Presidio_Nuestra_Senora_de_Loreto_de_la_Bahia%2C_commonly_known_as_Presidio_La_Bahia%2C_Goliad%2C_Texas.jpg?width=1600", alt: "Presidio La Bahía in Goliad, Texas", width: 1600, height: 1195, credit: "Jkulick · CC BY-SA 4.0 · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 11,
  tags: ["goliad texas", "fannin battleground", "presidio la bahia", "texas revolution road trip", "goliad weekend", "texas history"], featured: true,
  sourceName: "Texas Historical Commission", sourceUrl: "https://thc.texas.gov/historic-sites/presidio-la-bahia",
  body: [], relatedCollections: [], relatedDestinations: ["fannin-battleground", "presidio-la-bahia"],
};

const fredericksburgHistoryWeekendGuideStub: Article = {
  id: "evergreen-fredericksburg-history-weekend-guide", brandId: "texasdefined", slug: "fredericksburg-history-weekend-guide",
  title: "A History-First Weekend in Fredericksburg",
  dek: "Build a Fredericksburg weekend around the National Museum of the Pacific War, Fort Martin Scott and the town's German-Texas heritage instead of treating history as an afterthought to Main Street.",
  category: "road-trips",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fort_martin_scott_2008.jpg?width=1600", alt: "Fort Martin Scott State Historic Site in Fredericksburg, Texas", width: 1600, height: 1200, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 12,
  tags: ["fredericksburg texas history", "national museum pacific war", "fort martin scott", "german texas", "fredericksburg weekend", "texas hill country history"], featured: true,
  sourceName: "National Museum of the Pacific War", sourceUrl: "https://www.pacificwarmuseum.org/visit",
  body: [], relatedCollections: [], relatedDestinations: ["national-museum-pacific-war", "fort-martin-scott"],
};

const texasUsMexicanWarRioGrandeGuideStub: Article = {
  id: "evergreen-texas-us-mexican-war-rio-grande-guide", brandId: "texasdefined", slug: "texas-us-mexican-war-rio-grande-guide",
  title: "Texas and the U.S.–Mexican War: Palo Alto, Resaca de la Palma and Fort Brown",
  dek: "The first major battles of the U.S.–Mexican War were fought beside Brownsville before Congress formally declared war. Connect annexation, the disputed border, Fort Texas, Palo Alto and Resaca de la Palma.",
  category: "texas-history", region: "south-texas",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Nebel_Mexican_War_01_Battle_of_Palo_Alto_%28cropped%29.jpg?width=1600", alt: "Hand-colored 1851 lithograph depicting the Battle of Palo Alto near Brownsville", width: 1600, height: 1060, credit: "Carl Nebel / Adolphe Jean-Baptiste Bayot · Public domain · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 16,
  tags: ["U.S.-Mexican War", "Palo Alto Battlefield", "Resaca de la Palma", "Fort Brown", "Brownsville history", "Texas military history"], featured: true,
  sourceName: "National Park Service", sourceUrl: "https://www.nps.gov/paal/",
  body: [], relatedCollections: [], relatedDestinations: [],
};

const buffaloSoldiersTexasFrontierGuideStub: Article = {
  id: "evergreen-buffalo-soldiers-texas-frontier-guide", brandId: "texasdefined", slug: "buffalo-soldiers-texas-frontier-guide",
  title: "Buffalo Soldiers in Texas: The Black Regulars Who Manned the Frontier",
  dek: "After the Civil War, African American soldiers served across Texas in the 9th and 10th Cavalry and the 24th and 25th Infantry. Fort Davis, Fort Concho, Fort McKavett and Fort Lancaster preserve parts of that complicated frontier story.",
  category: "texas-history", region: "big-bend",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fort_Davis_National_Historic_Site_%28790ae2ca-cd05-44da-bfd4-b713441c231b%29.jpg?width=1600", alt: "Historic image of mounted African American soldiers associated with Fort Davis National Historic Site", width: 1600, height: 1067, credit: "National Park Service · Public domain · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 17,
  tags: ["Buffalo Soldiers", "Black Regulars", "African American Texas history", "Fort Davis", "Fort McKavett", "Fort Concho", "Texas military history"], featured: true,
  sourceName: "National Park Service", sourceUrl: "https://www.nps.gov/foda/learn/historyculture/buffalo-soldiers.htm",
  body: [], relatedCollections: [], relatedDestinations: ["fort-davis-national-historic-site", "fort-mckavett", "fort-lancaster"],
};

const texasNationalGuardCampMabryHistoryStub: Article = {
  id: "evergreen-texas-national-guard-camp-mabry-history", brandId: "texasdefined", slug: "texas-national-guard-camp-mabry-history",
  title: "Camp Mabry and the Texas National Guard: From Volunteer Guard to the 36th Division",
  dek: "Austin's Camp Mabry began as an 1892 training ground for the Texas Volunteer Guard and grew into the headquarters landscape of the Texas Military Department, connecting state militia history, two world wars and the modern Guard.",
  category: "texas-history", region: "hill-country",
  hero: { src: "https://tmd.texas.gov/Data/Sites/1/media/news/ngarmy/2017/april/23april/1000w_q95.jpg", alt: "Living-history program at Camp Mabry in Austin", width: 1000, height: 667, credit: "U.S. Army photo by Sgt. Mark Otte · Public domain · Texas Military Department" },
  authorId: "a-marisol", publishedAt: "2026-08-19", readingMinutes: 16,
  tags: ["Camp Mabry", "Texas National Guard", "Texas Military Department", "36th Infantry Division", "Texas military history"], featured: true,
  sourceName: "Texas Military Department", sourceUrl: "https://tmd.texas.gov/museum",
  body: [], relatedCollections: [], relatedDestinations: [],
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
  texasMilitaryHistoryTimelineStub,
  texasCivilWarSitesGuideStub,
  republicOfTexasGovernmentTrailStub,
  washingtonOnTheBrazosWeekendGuideStub,
  goliadHistoryWeekendGuideStub,
  fredericksburgHistoryWeekendGuideStub,
  texasUsMexicanWarRioGrandeGuideStub,
  buffaloSoldiersTexasFrontierGuideStub,
  texasNationalGuardCampMabryHistoryStub,
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
  if (slug === texasMilitaryHistoryTimelineStub.slug) return import("./texas-military-history-timeline").then((module) => module.texasMilitaryHistoryTimelineArticle);
  if (slug === texasCivilWarSitesGuideStub.slug) return import("./texas-civil-war-sites-guide").then((module) => module.texasCivilWarSitesGuideArticle);
  if (slug === republicOfTexasGovernmentTrailStub.slug) return import("./republic-of-texas-government-trail").then((module) => module.republicOfTexasGovernmentTrailArticle);
  if (slug === washingtonOnTheBrazosWeekendGuideStub.slug) return import("./washington-on-the-brazos-weekend-guide").then((module) => module.washingtonOnTheBrazosWeekendGuideArticle);
  if (slug === goliadHistoryWeekendGuideStub.slug) return import("./goliad-history-weekend-guide").then((module) => module.goliadHistoryWeekendGuideArticle);
  if (slug === fredericksburgHistoryWeekendGuideStub.slug) return import("./fredericksburg-history-weekend-guide").then((module) => module.fredericksburgHistoryWeekendGuideArticle);
  if (slug === texasUsMexicanWarRioGrandeGuideStub.slug) return import("./texas-us-mexican-war-rio-grande-guide").then((module) => module.texasUsMexicanWarRioGrandeGuideArticle);
  if (slug === buffaloSoldiersTexasFrontierGuideStub.slug) return import("./buffalo-soldiers-texas-frontier-guide").then((module) => module.buffaloSoldiersTexasFrontierGuideArticle);
  if (slug === texasNationalGuardCampMabryHistoryStub.slug) return import("./texas-national-guard-camp-mabry-history").then((module) => module.texasNationalGuardCampMabryHistoryArticle);
  return null;
}
