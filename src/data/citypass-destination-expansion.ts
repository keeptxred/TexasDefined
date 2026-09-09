import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-08";
type Base = Pick<Destination, "region" | "nearestTown" | "county">;
type Row = [
  id: string, slug: string, name: string, summary: string, category: Destination["category"],
  lat: number, lng: number, hero: [string, string, number, number, string], bestSeason: string,
  entryNote: string, highlights: string[], body: string[], officialUrl: string,
  managingAuthority: string, address: string,
];

const KEMAH: Base = { region: "gulf-coast", nearestTown: "Kemah", county: "Galveston" };
const SAN_ANTONIO: Base = { region: "south-texas", nearestTown: "San Antonio", county: "Bexar" };
const DALLAS: Base = { region: "prairies-lakes", nearestTown: "Dallas", county: "Dallas" };

function destination(base: Base, row: Row): Destination {
  const [id, slug, name, summary, category, lat, lng, hero, bestSeason, entryNote, highlights, body, officialUrl, managingAuthority, address] = row;
  const [src, alt, width, height, credit] = hero;
  return {
    id, brandId: "texasdefined", slug, name, summary, category,
    region: base.region, nearestTown: base.nearestTown, county: base.county,
    coordinates: { lat, lng }, hero: { src, alt, width, height, credit },
    bestSeason, entryNote, highlights, body, officialUrl, managingAuthority, address,
    sourceCheckedAt: SOURCE_CHECKED_AT,
  };
}

export const cityPassDestinationExpansion: Destination[] = [
  destination(KEMAH, [
    "citypass-kemah-boardwalk", "kemah-boardwalk", "Kemah Boardwalk",
    "Kemah Boardwalk is a Galveston Bay amusement-and-dining district with rides, games, restaurants, seasonal entertainment and waterfront views about 30 miles southeast of central Houston.",
    "outdoors", 29.5478, -95.0184,
    ["https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Boardwalk.jpg?width=1600", "Kemah Boardwalk amusement rides and waterfront on Galveston Bay in Kemah, Texas", 1600, 1200, "Gracieotripp · Wikimedia Commons · reusable Creative Commons photo"],
    "Fall through spring for milder waterfront weather; summer brings more heat, humidity and crowds.",
    "Entry is free, but rides and games require tickets or passes. Houston CityPASS® currently includes an All-Day Ride Pass with stated exclusions; verify current terms before arrival.",
    ["Boardwalk Bullet wooden coaster", "Galveston Bay waterfront", "Family rides and midway games", "Restaurants and seasonal entertainment"],
    [
      "Kemah Boardwalk combines Galveston Bay views with rides, games, restaurants and seasonal entertainment. The Boardwalk Bullet is the signature coaster, while family rides and the marina keep the district useful for non-riders.",
      "Summer has the fullest entertainment calendar but also stronger heat, humidity and weekend crowds; fall through spring is easier for strolling. Concerts, festivals and holiday events change through the year.",
      "Kemah pairs naturally with Space Center Houston and Clear Lake. Check ride-pass exclusions, parking and weather before arrival; the Boardwalk Beast, zip line or animal encounters can require separate tickets.",
    ],
    "https://www.kemahboardwalk.com/", "Kemah Boardwalk / Landry's, Inc.", "215 Kipp Ave, Kemah, TX 77565",
  ]),
  destination(SAN_ANTONIO, [
    "citypass-go-rio-river-cruises", "go-rio-san-antonio-river-cruises", "GO RIO San Antonio River Cruises",
    "GO RIO operates colorful electric sightseeing boats on the downtown River Walk, including a narrated 35-minute cruise covering city history, architecture and riverfront landmarks.",
    "outdoors", 29.424, -98.4885,
    ["https://commons.wikimedia.org/wiki/Special:Redirect/file/Go_Rio_Riverboat_at_The_Westin_Riverwalk%2C_San_Antonio_%2849223774063%29.jpg?width=1600", "GO RIO sightseeing riverboat cruising the San Antonio River Walk at night", 1600, 1067, "Nan Palmero · Wikimedia Commons · reusable Creative Commons photo"],
    "Fall through spring for comfortable open-air cruising; summer evenings avoid the strongest daytime heat.",
    "Narrated cruises currently run daily, subject to conditions. San Antonio CityPASS® currently includes the narrated River Walk cruise; verify boarding and redemption instructions.",
    ["35-minute narrated River Walk cruise", "Electric colorful riverboats", "Downtown architecture and history", "Multiple central boarding locations"],
    [
      "GO RIO's electric boats orient first-time visitors to downtown San Antonio from the River Walk. The narrated cruise highlights architecture, bridges, public art and local history that can be harder to connect below street level.",
      "The standard sightseeing cruise suits families and mixed-age groups; specialty cruises, charters and river shuttles are separate. Weather and operating conditions can affect service, so check current boarding details.",
      "Several downtown docks serve GO RIO. Pair the cruise with the Alamo, Tower of the Americas, a River Walk stroll or a meal along the river rather than treating it as a separate cross-city trip.",
    ],
    "https://www.goriocruises.com/overview/", "GO RIO San Antonio River Cruises", "706 E River Walk, San Antonio, TX 78205",
  ]),
  destination(SAN_ANTONIO, [
    "citypass-tower-of-the-americas", "tower-of-the-americas", "Tower of the Americas",
    "Tower of the Americas is San Antonio's 750-foot Hemisfair landmark, combining a high observation deck, panoramic city views, a 4D theater experience and elevated dining.",
    "historic-sites", 29.419, -98.4836,
    ["https://commons.wikimedia.org/wiki/Special:Redirect/file/Tower_of_Americas%2C_San_Antonio.jpg?width=1600", "Tower of the Americas rising above downtown San Antonio and Hemisfair", 1600, 2133, "Greverod · Wikimedia Commons · CC BY-SA 3.0"],
    "Year-round; clear fall, winter and spring days usually provide the best long-distance visibility.",
    "General admission currently includes the observation deck and 4D theater. San Antonio CityPASS® currently includes general admission; check current hours and redemption details.",
    ["750-foot San Antonio landmark", "Flags Over Texas Observation Deck", "360-degree skyline views", "Skies Over Texas 4D Theater"],
    [
      "Built for HemisFair '68, the 750-foot Tower of the Americas remains a defining San Antonio landmark. Its observation level looks across downtown, Hemisfair, the River Walk corridor and the broader city.",
      "General admission currently includes the Flags Over Texas Observation Deck and Skies Over Texas 4D Theater; restaurants and other experiences are separate. Clear weather matters most for long-distance views.",
      "Hemisfair, the Convention Center, River Walk and Alamo core are nearby, so the tower fits a downtown day. Check current hours because events, holidays, weather or facility work can affect access.",
    ],
    "https://www.toweroftheamericas.com/location/tower-of-the-americas/", "Tower of the Americas", "739 E Cesar E. Chavez Blvd, San Antonio, TX 78205",
  ]),
  destination(SAN_ANTONIO, [
    "citypass-san-antonio-botanical-garden", "san-antonio-botanical-garden", "San Antonio Botanical Garden",
    "San Antonio Botanical Garden is a 39-acre campus of Texas landscapes, themed gardens, a family adventure area and the glass Lucile Halsell Conservatory near Brackenridge Park.",
    "outdoors", 29.4577, -98.4574,
    ["https://commons.wikimedia.org/wiki/Special:Redirect/file/Entrance_to_San_Antonio_Botanical_Garden%2C_TX_IMG_5308.JPG?width=1600", "Entrance to the San Antonio Botanical Garden in San Antonio, Texas", 1600, 1067, "Billy Hathorn · Wikimedia Commons · CC BY 3.0"],
    "Spring for blooms and mild walking weather; fall and winter are also comfortable, while summer mornings are cooler.",
    "Hours and special-event access can change. San Antonio CityPASS® currently includes general admission to the themed gardens, Family Adventure Garden and conservatory.",
    ["Lucile Halsell Conservatory", "Texas Native Trail", "Family Adventure Garden", "Seasonal gardens and collections"],
    [
      "San Antonio Botanical Garden moves through formal gardens, native Texas landscapes and specialty collections, while the Lucile Halsell Conservatory adds tropical, desert and other climate-controlled plant environments.",
      "The Family Adventure Garden gives children room to explore, while other areas emphasize regional ecology, water-wise design and seasonal collections. Summer visits are more comfortable in cooler morning hours.",
      "The Broadway-area location pairs with the Witte Museum, The DoSeum, Brackenridge Park or San Antonio Zoo. Check current hours and special-event access before visiting the 39-acre campus.",
    ],
    "https://www.sabot.org/", "San Antonio Botanical Garden", "555 Funston Pl, San Antonio, TX 78209",
  ]),
  destination(SAN_ANTONIO, [
    "citypass-witte-museum", "witte-museum", "Witte Museum",
    "The Witte Museum in Brackenridge Park connects Texas natural history, science and culture through dinosaur, wildlife, regional-history and changing-exhibition galleries.",
    "historic-sites", 29.4624, -98.4673,
    ["https://commons.wikimedia.org/wiki/Special:Redirect/file/Entrance_to_Witte_Museum%2C_San_Antonio%2C_TX_IMG_3113.JPG?width=1600", "Entrance to the Witte Museum in Brackenridge Park in San Antonio, Texas", 1600, 1200, "Billy Hathorn · Wikimedia Commons · reusable Creative Commons photo"],
    "Year-round for indoor galleries; fall through spring is especially pleasant for Brackenridge Park.",
    "General admission covers permanent galleries and grounds; some special exhibitions cost extra. San Antonio CityPASS® currently includes general admission.",
    ["Texas Deep Time and dinosaur galleries", "Texas wildlife and ecology", "South Texas heritage", "Brackenridge Park riverside campus"],
    [
      "The Witte Museum connects Texas natural history and culture through dinosaurs, wildlife, water, archaeology and regional heritage. Its galleries can support a focused stop or several hours of broader Texas context.",
      "The Brackenridge Park setting beside the San Antonio River adds outdoor space around the visit. Permanent exhibits form the core experience, while changing exhibitions can alter visit length and ticket needs.",
      "Families can pair the Witte with The DoSeum, zoo or Botanical Garden nearby. History-focused visitors can use it as context before the missions and Alamo; confirm current hours and special exhibits.",
    ],
    "https://www.wittemuseum.org/plan-your-visit/", "Witte Museum", "3801 Broadway, San Antonio, TX 78209",
  ]),
  destination(SAN_ANTONIO, [
    "citypass-the-doseum", "the-doseum", "The DoSeum",
    "The DoSeum is San Antonio's hands-on children's museum on Broadway, centered on learning through interactive science, engineering, creative, literacy and outdoor experiences.",
    "historic-sites", 29.4526, -98.47216,
    ["https://media.citypass.com/_gallery/get_file/?file_ext=.jpg&file_id=64249b012cfac2614a23f6e8&page_id=5deee4512cfac228a505f39e", "Entrance to The DoSeum children's museum on Broadway in San Antonio, Texas", 2000, 1333, "Courtesy of The DoSeum · CityPASS media library · authorized CityPASS partner-promotion asset"],
    "Year-round; large indoor galleries help during summer heat or wet weather, while mild seasons favor outdoor play.",
    "Hours can vary by weekday and member periods. San Antonio CityPASS® currently includes general admission to galleries and temporary exhibits.",
    ["Hands-on children's museum galleries", "Science and engineering play", "Creative and literacy experiences", "Outdoor play areas"],
    [
      "The DoSeum centers on active learning: children build, test, role-play, move, create and solve problems across hands-on galleries, making it a strong family choice when a passive museum visit is unlikely to work.",
      "The Broadway campus spans science, technology, engineering, art, literacy and imaginative play, with outdoor areas extending the visit when weather cooperates. This campus opened in 2015.",
      "The nearby Witte Museum, Botanical Garden, Brackenridge Park and San Antonio Zoo form a useful family cluster. Check current tickets, weekday hours and member-access periods before arrival.",
    ],
    "https://www.thedoseum.org/plan-your-visit", "The DoSeum", "2800 Broadway, San Antonio, TX 78209",
  ]),
  destination(DALLAS, [
    "citypass-reunion-tower", "reunion-tower-dallas", "Reunion Tower GeO-Deck",
    "Reunion Tower GeO-Deck is Dallas's signature skyline observation experience, placing visitors 470 feet above downtown with indoor-outdoor 360-degree views and interactive city displays.",
    "historic-sites", 32.77536, -96.80894,
    ["https://commons.wikimedia.org/wiki/Special:Redirect/file/Reunion_tower_dallas.jpg?width=1600", "Reunion Tower and Hyatt Regency rising above the downtown Dallas skyline", 1600, 1143, "Batrak · Wikimedia Commons · CC BY-SA 2.0"],
    "Year-round; clear fall and spring days favor long-distance views, while evening visits emphasize skyline lights.",
    "GeO-Deck admission uses timed entry. Dallas CityPASS® currently requires a Reunion Tower reservation after pass purchase, so secure a visit time before arrival.",
    ["470-foot-high GeO-Deck", "360-degree Dallas views", "Indoor and outdoor observation areas", "Interactive city displays and telescopes"],
    [
      "Reunion Tower's GeO-Deck gives indoor-outdoor views 470 feet above Dallas, revealing downtown districts, freeway and rail corridors and the broad North Texas horizon from one recognizable skyline landmark.",
      "Telescopes and interactive displays add context. Daylight makes the city easier to read, while dusk and night emphasize skyline lights; clear weather is the main variable for long-distance views.",
      "The downtown location pairs with Dealey Plaza, the West End and Perot Museum. Timed admission is the key constraint, especially for Dallas CityPASS® users, so reserve before building the day around the tower.",
    ],
    "https://reuniontower.com/plan-your-visit/", "Reunion Tower", "300 Reunion Blvd E, Dallas, TX 75207",
  ]),
  destination(DALLAS, [
    "citypass-dallas-zoo", "dallas-zoo", "Dallas Zoo",
    "Dallas Zoo is a 106-acre zoological park south of downtown with more than 2,000 animals, major African habitats, family areas and a long-running conservation and education mission.",
    "outdoors", 32.744626, -96.813284,
    ["https://commons.wikimedia.org/wiki/Special:Redirect/file/DallasZooEntrance.jpg?width=1600", "Main entrance signage at the Dallas Zoo in Dallas, Texas", 1600, 1200, "Kevin1086 · Wikimedia Commons · CC BY-SA 3.0"],
    "Fall through spring for milder walking weather; summer favors early arrival and current seasonal hours.",
    "Regular visitors are asked to reserve online. Current CityPASS® instructions say pass holders present their mobile ticket at a zoo booth for timed admission; confirm the current policy.",
    ["Giants of the Savanna", "More than 2,000 animals", "Family and children's zoo experiences", "Conservation and keeper programs"],
    [
      "Dallas Zoo spans 106 acres across ZooNorth and the Wilds of Africa, with Giants of the Savanna as a major anchor. Families should choose priority animals or zones rather than expecting every habitat in a short visit.",
      "Most of the day is outdoors, so North Texas heat affects comfort and animal activity. Seasonal hours, shade and an early start matter in warm months; fall through spring is easier for a longer loop.",
      "The zoo sits just south of downtown and can stand on its own for families. Dallas CityPASS® users may prefer downtown attractions on another day within the pass window; confirm timed-entry instructions first.",
    ],
    "https://www.dallaszoo.com/plan-your-visit/", "Dallas Zoo Management, Inc. / City of Dallas", "650 S R.L. Thornton Fwy, Dallas, TX 75203",
  ]),
];