export type ViatorExperienceCategory =
  | "city-sightseeing"
  | "history-landmarks"
  | "food-bbq"
  | "wine-spirits"
  | "outdoors"
  | "water"
  | "ghost-nightlife"
  | "western"
  | "museums-culture"
  | "family"
  | "sports"
  | "day-trips";

export interface ViatorExperienceCategoryInfo {
  id: ViatorExperienceCategory;
  label: string;
  description: string;
}

export interface ViatorExperienceMarket {
  slug: string;
  name: string;
  regionLabel: string;
  summary: string;
  searchQuery: string;
  viatorDestinationUrl?: string;
  categories: ViatorExperienceCategory[];
  anchorAttractions: readonly string[];
  nearbyMarkets?: readonly string[];
  priority: "primary" | "secondary" | "emerging";
  sourceCheckedAt: string;
}

export const VIATOR_EXPERIENCE_CATEGORIES: readonly ViatorExperienceCategoryInfo[] = [
  { id: "city-sightseeing", label: "City sightseeing", description: "Walking, driving, bike, e-bike, trolley and overview tours that help visitors orient quickly." },
  { id: "history-landmarks", label: "History & landmarks", description: "Guided history, architecture, heritage districts, missions, presidential history and landmark-focused experiences." },
  { id: "food-bbq", label: "Food & barbecue", description: "Texas barbecue, Tex-Mex, tacos, food walks, cooking experiences and destination dining tours." },
  { id: "wine-spirits", label: "Wine, beer & spirits", description: "Hill Country wineries, brewery crawls, distillery visits and tasting-focused day trips." },
  { id: "outdoors", label: "Outdoor adventure", description: "Hiking, biking, horseback riding, wildlife, caves, paddling and guided nature experiences." },
  { id: "water", label: "On the water", description: "Kayaking, paddleboarding, sailing, dolphin watching, harbor cruises, fishing-adjacent sightseeing and lake activities." },
  { id: "ghost-nightlife", label: "Ghost tours & nightlife", description: "Haunted-history walks, ghost tours, pub crawls, live-music crawls and evening experiences." },
  { id: "western", label: "Western & ranch", description: "Cowboy culture, Stockyards, rodeo, ranch, horseback and Old West experiences." },
  { id: "museums-culture", label: "Museums & culture", description: "Museum tickets, art districts, cultural tours, music heritage and science attractions." },
  { id: "family", label: "Family attractions", description: "Aquariums, zoos, theme parks, science centers, caverns and other family-friendly bookable stops." },
  { id: "sports", label: "Sports & stadiums", description: "Stadium tours, motorsports, sports districts and fan-oriented experiences where inventory is available." },
  { id: "day-trips", label: "Day trips", description: "Bookable excursions that connect a visitor hub with another Texas city, park, wine region or landmark corridor." },
] as const;

export const VIATOR_TEXAS_MARKETS: readonly ViatorExperienceMarket[] = [
  {
    slug: "austin",
    name: "Austin",
    regionLabel: "Austin & Central Texas",
    summary: "Texas capital sightseeing, live music, barbecue, bats, Lady Bird Lake and Hill Country day trips make Austin one of the state's deepest experience markets.",
    searchQuery: "Austin Texas tours and activities",
    viatorDestinationUrl: "https://www.viator.com/Austin/d5021",
    categories: ["city-sightseeing", "history-landmarks", "food-bbq", "wine-spirits", "outdoors", "water", "ghost-nightlife", "museums-culture", "day-trips"],
    anchorAttractions: ["Texas Capitol", "Congress Avenue Bridge bats", "Lady Bird Lake", "Barton Springs", "South Congress", "Sixth Street", "LBJ Presidential Library", "Texas Hill Country"],
    nearbyMarkets: ["san-marcos", "new-braunfels-gruene", "fredericksburg", "marble-falls-lake-travis"],
    priority: "primary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "san-antonio",
    name: "San Antonio",
    regionLabel: "San Antonio & Hill Country",
    summary: "The Alamo, River Walk, UNESCO missions, ghost tours and Hill Country excursions support a broad mix of history, sightseeing and day-trip inventory.",
    searchQuery: "San Antonio Texas tours and activities",
    viatorDestinationUrl: "https://www.viator.com/San-Antonio/d910",
    categories: ["city-sightseeing", "history-landmarks", "food-bbq", "wine-spirits", "outdoors", "water", "ghost-nightlife", "museums-culture", "family", "day-trips"],
    anchorAttractions: ["The Alamo", "San Antonio River Walk", "San Antonio Missions", "Mission San José", "Tower of the Americas", "Historic Market Square", "King William Historic District", "Natural Bridge Caverns"],
    nearbyMarkets: ["new-braunfels-gruene", "fredericksburg", "bandera", "san-marcos"],
    priority: "primary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "dallas",
    name: "Dallas",
    regionLabel: "Dallas–Fort Worth & North Texas",
    summary: "JFK history, architecture, arts, sports and day trips into Fort Worth give Dallas a high-intent sightseeing and stadium-tour market.",
    searchQuery: "Dallas Texas tours and activities",
    viatorDestinationUrl: "https://www.viator.com/Dallas/d918",
    categories: ["city-sightseeing", "history-landmarks", "food-bbq", "ghost-nightlife", "museums-culture", "family", "sports", "day-trips"],
    anchorAttractions: ["Dealey Plaza", "The Sixth Floor Museum area", "Reunion Tower", "Dallas Arts District", "Bishop Arts District", "Dallas Arboretum", "AT&T Stadium", "Globe Life Field"],
    nearbyMarkets: ["fort-worth", "arlington"],
    priority: "primary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "fort-worth",
    name: "Fort Worth",
    regionLabel: "Dallas–Fort Worth & North Texas",
    summary: "The Stockyards, cattle drives, rodeo culture, museums and Western heritage make Fort Worth the state's clearest cowboy-experience hub.",
    searchQuery: "Fort Worth Texas tours and activities",
    categories: ["city-sightseeing", "history-landmarks", "food-bbq", "ghost-nightlife", "western", "museums-culture", "family", "sports", "day-trips"],
    anchorAttractions: ["Fort Worth Stockyards", "Stockyards cattle drive", "Billy Bob's Texas", "Sundance Square", "National Cowgirl Museum", "Kimbell Art Museum", "Fort Worth Zoo", "Texas Motor Speedway"],
    nearbyMarkets: ["dallas", "arlington"],
    priority: "primary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "arlington",
    name: "Arlington",
    regionLabel: "Dallas–Fort Worth & North Texas",
    summary: "Major-league stadiums, theme parks and DFW combination tours give Arlington a focused family-and-sports booking role.",
    searchQuery: "Arlington Texas tours stadium theme park",
    categories: ["family", "sports", "city-sightseeing", "day-trips"],
    anchorAttractions: ["AT&T Stadium", "Globe Life Field", "Six Flags Over Texas", "Hurricane Harbor Arlington", "Entertainment District"],
    nearbyMarkets: ["dallas", "fort-worth"],
    priority: "secondary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "houston",
    name: "Houston",
    regionLabel: "Houston & Upper Gulf Coast",
    summary: "Space Center Houston, museums, food, tunnels, neighborhoods and Gulf Coast side trips support one of Texas's largest activity markets.",
    searchQuery: "Houston Texas tours and activities",
    viatorDestinationUrl: "https://www.viator.com/Houston/d5186",
    categories: ["city-sightseeing", "history-landmarks", "food-bbq", "wine-spirits", "outdoors", "water", "ghost-nightlife", "museums-culture", "family", "day-trips"],
    anchorAttractions: ["Space Center Houston", "Houston Museum District", "Downtown tunnels", "Buffalo Bayou", "Discovery Green", "Downtown Aquarium", "The Heights", "Kemah Boardwalk"],
    nearbyMarkets: ["galveston", "beaumont-golden-triangle", "college-station-bryan"],
    priority: "primary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "galveston",
    name: "Galveston",
    regionLabel: "Gulf Coast",
    summary: "Island history, harbor cruises, dolphin watching, ghost tours, architecture and beach activities make Galveston a natural coastal booking hub.",
    searchQuery: "Galveston Texas tours dolphin cruise ghost history",
    categories: ["city-sightseeing", "history-landmarks", "food-bbq", "water", "ghost-nightlife", "museums-culture", "family", "day-trips"],
    anchorAttractions: ["The Strand Historic District", "Galveston Harbor", "Bishop's Palace", "Moody Gardens", "Galveston Island Historic Pleasure Pier", "Seawall", "East End Historic District", "Port of Galveston"],
    nearbyMarkets: ["houston"],
    priority: "primary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "fredericksburg",
    name: "Fredericksburg & Texas Wine Country",
    regionLabel: "Texas Hill Country",
    summary: "Wineries, German-Texas heritage, LBJ history, Enchanted Rock and scenic Hill Country routes make Fredericksburg central to wine and day-trip monetization.",
    searchQuery: "Fredericksburg Texas wine tours Hill Country",
    categories: ["history-landmarks", "food-bbq", "wine-spirits", "outdoors", "museums-culture", "day-trips"],
    anchorAttractions: ["Fredericksburg wineries", "Main Street Fredericksburg", "National Museum of the Pacific War", "Enchanted Rock", "Luckenbach", "LBJ Ranch", "Wildseed Farms", "Texas Wine Road 290"],
    nearbyMarkets: ["austin", "san-antonio", "marble-falls-lake-travis", "bandera"],
    priority: "primary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "new-braunfels-gruene",
    name: "New Braunfels & Gruene",
    regionLabel: "Texas Hill Country",
    summary: "River recreation, Gruene Hall, caverns, family attractions and easy access from Austin and San Antonio support water and Hill Country experiences.",
    searchQuery: "New Braunfels Gruene Texas tours tubing activities",
    categories: ["history-landmarks", "food-bbq", "outdoors", "water", "ghost-nightlife", "family", "day-trips"],
    anchorAttractions: ["Gruene Historic District", "Gruene Hall", "Comal River", "Guadalupe River", "Natural Bridge Caverns", "Schlitterbahn New Braunfels"],
    nearbyMarkets: ["san-antonio", "austin", "san-marcos"],
    priority: "secondary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "san-marcos",
    name: "San Marcos",
    regionLabel: "Central Texas",
    summary: "Spring-fed river recreation, glass-bottom boat heritage and the Austin–San Antonio corridor give San Marcos strong water and short-trip potential.",
    searchQuery: "San Marcos Texas river tours activities",
    categories: ["outdoors", "water", "family", "day-trips"],
    anchorAttractions: ["San Marcos River", "Spring Lake", "Meadows Center glass-bottom boats", "Downtown San Marcos"],
    nearbyMarkets: ["austin", "new-braunfels-gruene", "san-antonio"],
    priority: "secondary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "bandera",
    name: "Bandera & Cowboy Country",
    regionLabel: "Texas Hill Country",
    summary: "Ranch stays, horseback riding, Western culture and scenic Hill Country drives make Bandera a high-fit niche for experiential travel.",
    searchQuery: "Bandera Texas ranch horseback cowboy tours",
    categories: ["outdoors", "western", "history-landmarks", "food-bbq", "day-trips"],
    anchorAttractions: ["Bandera cowboy culture", "Hill Country ranches", "Horseback riding", "Frontier Times Museum", "Medina River"],
    nearbyMarkets: ["san-antonio", "fredericksburg"],
    priority: "secondary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "marble-falls-lake-travis",
    name: "Marble Falls, Lake Travis & Highland Lakes",
    regionLabel: "Texas Hill Country",
    summary: "Lake outings, boating, scenic Hill Country drives and winery connections extend Austin booking intent west into the Highland Lakes.",
    searchQuery: "Lake Travis Marble Falls Texas boat tours Hill Country",
    categories: ["outdoors", "water", "wine-spirits", "family", "day-trips"],
    anchorAttractions: ["Lake Travis", "Lake Marble Falls", "Highland Lakes", "Balcones Canyonlands", "Hill Country wineries"],
    nearbyMarkets: ["austin", "fredericksburg"],
    priority: "secondary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "waco",
    name: "Waco",
    regionLabel: "Central Texas",
    summary: "Magnolia-area tourism, Texas history, museums and Brazos River attractions create a compact stop between Dallas–Fort Worth and Austin.",
    searchQuery: "Waco Texas tours Magnolia activities",
    categories: ["city-sightseeing", "history-landmarks", "food-bbq", "museums-culture", "family", "day-trips"],
    anchorAttractions: ["Magnolia Market area", "Waco Mammoth National Monument", "Dr Pepper Museum", "Texas Ranger Hall of Fame and Museum", "Brazos River", "Cameron Park Zoo"],
    nearbyMarkets: ["dallas", "austin", "college-station-bryan"],
    priority: "secondary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "college-station-bryan",
    name: "Bryan–College Station",
    regionLabel: "Brazos Valley",
    summary: "Texas A&M, presidential history, sports weekends and nearby food-and-wine experiences create event-driven booking opportunities.",
    searchQuery: "College Station Bryan Texas tours activities",
    categories: ["history-landmarks", "food-bbq", "wine-spirits", "museums-culture", "sports", "day-trips"],
    anchorAttractions: ["George H.W. Bush Presidential Library", "Texas A&M University", "Kyle Field", "Historic Downtown Bryan", "Messina Hof"],
    nearbyMarkets: ["houston", "waco", "austin"],
    priority: "secondary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "corpus-christi",
    name: "Corpus Christi",
    regionLabel: "Coastal Bend",
    summary: "Aquarium, USS Lexington, bayfront sightseeing, wildlife and water activities make Corpus Christi the Coastal Bend's main urban experience hub.",
    searchQuery: "Corpus Christi Texas tours boat wildlife activities",
    categories: ["city-sightseeing", "history-landmarks", "outdoors", "water", "museums-culture", "family", "day-trips"],
    anchorAttractions: ["Texas State Aquarium", "USS Lexington", "Corpus Christi Bayfront", "Padre Island National Seashore", "Oso Bay", "Mustang Island"],
    nearbyMarkets: ["port-aransas", "south-padre-island"],
    priority: "primary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "port-aransas",
    name: "Port Aransas & Mustang Island",
    regionLabel: "Coastal Bend",
    summary: "Dolphin cruises, bay trips, wildlife, boating and beach experiences make Port Aransas a strong water-activity market.",
    searchQuery: "Port Aransas Texas dolphin boat tours activities",
    categories: ["outdoors", "water", "family", "day-trips"],
    anchorAttractions: ["Port Aransas harbor", "Mustang Island", "Dolphin watching", "Whooping Crane and coastal birding areas", "Lydia Ann Channel"],
    nearbyMarkets: ["corpus-christi"],
    priority: "secondary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "south-padre-island",
    name: "South Padre Island",
    regionLabel: "Rio Grande Valley & Gulf Coast",
    summary: "Dolphins, parasailing, sailing, eco-tours, beach activities and nearby wildlife refuges make South Padre one of Texas's most experience-oriented coastal markets.",
    searchQuery: "South Padre Island Texas dolphin parasailing tours",
    categories: ["outdoors", "water", "family", "day-trips"],
    anchorAttractions: ["Laguna Madre", "South Padre Island beaches", "Dolphin watching", "Sea Turtle Inc.", "South Padre Island Birding and Nature Center", "Port Isabel Lighthouse"],
    nearbyMarkets: ["rio-grande-valley", "corpus-christi"],
    priority: "primary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "rio-grande-valley",
    name: "Rio Grande Valley",
    regionLabel: "South Texas & Rio Grande Valley",
    summary: "World-class birding, wildlife refuges, cultural heritage and South Padre access create a nature-heavy experience corridor from McAllen to Brownsville.",
    searchQuery: "Rio Grande Valley Texas birding wildlife tours McAllen Brownsville",
    categories: ["history-landmarks", "food-bbq", "outdoors", "museums-culture", "family", "day-trips"],
    anchorAttractions: ["World Birding Center sites", "Santa Ana National Wildlife Refuge", "Bentsen-Rio Grande Valley State Park", "Quinta Mazatlan", "Brownsville heritage district"],
    nearbyMarkets: ["south-padre-island"],
    priority: "secondary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "el-paso",
    name: "El Paso",
    regionLabel: "Far West Texas",
    summary: "Mission Trail history, desert landscapes, food culture and Franklin Mountains outings make El Paso a distinct borderland experience market.",
    searchQuery: "El Paso Texas tours Mission Trail Franklin Mountains",
    categories: ["city-sightseeing", "history-landmarks", "food-bbq", "outdoors", "museums-culture", "day-trips"],
    anchorAttractions: ["El Paso Mission Trail", "Franklin Mountains", "San Jacinto Plaza", "El Paso Museum of Art", "Magoffin Home", "Scenic Drive"],
    nearbyMarkets: ["big-bend-terlingua", "marfa-alpine"],
    priority: "secondary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "big-bend-terlingua",
    name: "Big Bend & Terlingua",
    regionLabel: "Big Bend",
    summary: "Guided desert trips, river outings, stargazing and remote-landscape experiences make Big Bend highly valuable despite a smaller supplier base.",
    searchQuery: "Big Bend Terlingua Texas guided tours stargazing river",
    categories: ["history-landmarks", "outdoors", "water", "ghost-nightlife", "day-trips"],
    anchorAttractions: ["Big Bend National Park", "Rio Grande", "Santa Elena Canyon", "Terlingua Ghost Town", "Dark-sky stargazing", "Big Bend Ranch State Park"],
    nearbyMarkets: ["marfa-alpine", "el-paso"],
    priority: "primary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "marfa-alpine",
    name: "Marfa, Alpine & Davis Mountains",
    regionLabel: "Far West Texas",
    summary: "Art, dark skies, frontier history and Davis Mountains landscapes create a distinctive cultural-and-outdoor companion market to Big Bend.",
    searchQuery: "Marfa Alpine Davis Mountains Texas tours stargazing",
    categories: ["history-landmarks", "outdoors", "ghost-nightlife", "museums-culture", "day-trips"],
    anchorAttractions: ["Marfa art district", "Marfa Lights viewing area", "McDonald Observatory", "Davis Mountains", "Fort Davis National Historic Site", "Chinati Foundation area"],
    nearbyMarkets: ["big-bend-terlingua", "el-paso"],
    priority: "secondary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "amarillo-palo-duro",
    name: "Amarillo & Palo Duro Canyon",
    regionLabel: "Texas Panhandle",
    summary: "Route 66, Palo Duro Canyon, Western heritage and roadside icons support sightseeing, outdoor and road-trip experiences in the Panhandle.",
    searchQuery: "Amarillo Palo Duro Canyon Texas tours Route 66",
    categories: ["city-sightseeing", "history-landmarks", "food-bbq", "outdoors", "western", "museums-culture", "day-trips"],
    anchorAttractions: ["Palo Duro Canyon", "Cadillac Ranch", "Historic Route 66 district", "American Quarter Horse Hall of Fame", "Big Texan", "Panhandle-Plains Historical Museum"],
    nearbyMarkets: ["lubbock"],
    priority: "secondary",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "lubbock",
    name: "Lubbock",
    regionLabel: "South Plains",
    summary: "Music history, wineries, museums and West Texas culture give Lubbock a smaller but differentiated experience niche.",
    searchQuery: "Lubbock Texas tours Buddy Holly wineries activities",
    categories: ["history-landmarks", "food-bbq", "wine-spirits", "museums-culture", "sports", "day-trips"],
    anchorAttractions: ["Buddy Holly Center", "National Ranching Heritage Center", "Lubbock wineries", "Texas Tech University", "Museum of Texas Tech University"],
    nearbyMarkets: ["amarillo-palo-duro"],
    priority: "emerging",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "beaumont-golden-triangle",
    name: "Beaumont & the Golden Triangle",
    regionLabel: "Upper Gulf Coast",
    summary: "Spindletop history, Cajun-Texas food, bayou nature and Gulf access create an emerging experience market on the Louisiana border.",
    searchQuery: "Beaumont Texas Golden Triangle tours activities",
    categories: ["history-landmarks", "food-bbq", "outdoors", "water", "museums-culture", "day-trips"],
    anchorAttractions: ["Spindletop-Gladys City Boomtown", "Beaumont museums", "Cattail Marsh", "Sabine Pass", "Big Thicket gateways"],
    nearbyMarkets: ["houston", "jefferson-east-texas"],
    priority: "emerging",
    sourceCheckedAt: "2026-09-03",
  },
  {
    slug: "jefferson-east-texas",
    name: "Jefferson & East Texas",
    regionLabel: "East Texas & Piney Woods",
    summary: "Historic Jefferson, Caddo Lake, bayou scenery, ghost lore and Piney Woods heritage make East Texas a strong niche for history and nature experiences.",
    searchQuery: "Jefferson Texas Caddo Lake tours ghost boat activities",
    categories: ["history-landmarks", "food-bbq", "outdoors", "water", "ghost-nightlife", "museums-culture", "day-trips"],
    anchorAttractions: ["Historic Jefferson", "Caddo Lake", "Bayou boat tours", "Jefferson ghost history", "Piney Woods scenic routes"],
    nearbyMarkets: ["dallas", "beaumont-golden-triangle"],
    priority: "secondary",
    sourceCheckedAt: "2026-09-03",
  },
] as const;

export function getViatorMarket(slug: string) {
  return VIATOR_TEXAS_MARKETS.find((market) => market.slug === slug);
}

export function getViatorCategory(id: ViatorExperienceCategory) {
  return VIATOR_EXPERIENCE_CATEGORIES.find((category) => category.id === id);
}

export function marketsForPlace(place: string) {
  const normalized = place.trim().toLowerCase();
  if (!normalized) return [];
  return VIATOR_TEXAS_MARKETS.filter((market) =>
    market.name.toLowerCase().includes(normalized)
    || market.searchQuery.toLowerCase().includes(normalized)
    || market.anchorAttractions.some((anchor) => anchor.toLowerCase().includes(normalized)),
  );
}
