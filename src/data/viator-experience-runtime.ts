export interface ViatorExperienceRuntimeMarket {
  slug: string;
  name: string;
  regionLabel: string;
  priority: "primary" | "secondary" | "emerging";
  experienceLaneCount: number;
  anchorIdeaCount: number;
  summary?: string;
  featuredAnchors?: readonly string[];
  matchText: string;
}

export interface ViatorRuntimeCategory {
  label: string;
  description: string;
}

/**
 * Client-safe projection of the richer Viator research catalog.
 *
 * Keep source URLs, search queries, full category arrays, complete attraction
 * lists, nearby-market relationships and research timestamps in
 * viator-experiences.ts. Shipping those fields to every destination page added
 * unnecessary weight to the main client bundle.
 */
export const VIATOR_RUNTIME_CATEGORIES: readonly ViatorRuntimeCategory[] = [
  { label: "City sightseeing", description: "Walking, driving, bike, e-bike, trolley and overview tours that help visitors orient quickly." },
  { label: "History & landmarks", description: "Guided history, architecture, heritage districts, missions, presidential history and landmark-focused experiences." },
  { label: "Food & barbecue", description: "Texas barbecue, Tex-Mex, tacos, food walks, cooking experiences and destination dining tours." },
  { label: "Wine, beer & spirits", description: "Hill Country wineries, brewery crawls, distillery visits and tasting-focused day trips." },
  { label: "Outdoor adventure", description: "Hiking, biking, horseback riding, wildlife, caves, paddling and guided nature experiences." },
  { label: "On the water", description: "Kayaking, paddleboarding, sailing, dolphin watching, harbor cruises and lake activities." },
  { label: "Ghost tours & nightlife", description: "Haunted-history walks, ghost tours, pub crawls, live-music crawls and evening experiences." },
  { label: "Western & ranch", description: "Cowboy culture, Stockyards, rodeo, ranch, horseback and Old West experiences." },
  { label: "Museums & culture", description: "Museum tickets, art districts, cultural tours, music heritage and science attractions." },
  { label: "Family attractions", description: "Aquariums, zoos, theme parks, science centers, caverns and other family-friendly bookable stops." },
  { label: "Sports & stadiums", description: "Stadium tours, motorsports, sports districts and fan-oriented experiences where inventory is available." },
  { label: "Day trips", description: "Excursions connecting visitor hubs with another Texas city, park, wine region or landmark corridor." },
] as const;

export const VIATOR_RUNTIME_MARKETS: readonly ViatorExperienceRuntimeMarket[] = [
  {
    slug: "austin", name: "Austin", regionLabel: "Austin & Central Texas", priority: "primary", experienceLaneCount: 9, anchorIdeaCount: 8,
    summary: "Texas capital sightseeing, live music, barbecue, bats, Lady Bird Lake and Hill Country day trips make Austin one of the state's deepest experience markets.",
    featuredAnchors: ["Texas Capitol", "Congress Avenue Bridge bats", "Lady Bird Lake", "Barton Springs", "South Congress"],
    matchText: "austin travis texas capitol congress avenue bridge bats lady bird lake barton springs south congress sixth street lbj presidential library",
  },
  {
    slug: "san-antonio", name: "San Antonio", regionLabel: "San Antonio & Hill Country", priority: "primary", experienceLaneCount: 10, anchorIdeaCount: 8,
    summary: "The Alamo, River Walk, UNESCO missions, ghost tours and Hill Country excursions support a broad mix of history, sightseeing and day-trip inventory.",
    featuredAnchors: ["The Alamo", "San Antonio River Walk", "San Antonio Missions", "Mission San José", "Tower of the Americas"],
    matchText: "san antonio bexar the alamo river walk san antonio missions mission san jose tower of the americas historic market square king william natural bridge caverns",
  },
  {
    slug: "dallas", name: "Dallas", regionLabel: "Dallas–Fort Worth & North Texas", priority: "primary", experienceLaneCount: 8, anchorIdeaCount: 8,
    summary: "JFK history, architecture, arts, sports and day trips into Fort Worth give Dallas a high-intent sightseeing and stadium-tour market.",
    featuredAnchors: ["Dealey Plaza", "The Sixth Floor Museum area", "Reunion Tower", "Dallas Arts District", "Bishop Arts District"],
    matchText: "dallas dealey plaza sixth floor museum reunion tower dallas arts district bishop arts district dallas arboretum",
  },
  {
    slug: "fort-worth", name: "Fort Worth", regionLabel: "Dallas–Fort Worth & North Texas", priority: "primary", experienceLaneCount: 9, anchorIdeaCount: 8,
    summary: "The Stockyards, cattle drives, rodeo culture, museums and Western heritage make Fort Worth the state's clearest cowboy-experience hub.",
    featuredAnchors: ["Fort Worth Stockyards", "Stockyards cattle drive", "Billy Bob's Texas", "Sundance Square", "National Cowgirl Museum"],
    matchText: "fort worth tarrant stockyards cattle drive billy bobs texas sundance square national cowgirl museum kimbell art museum fort worth zoo texas motor speedway",
  },
  {
    slug: "arlington", name: "Arlington", regionLabel: "Dallas–Fort Worth & North Texas", priority: "secondary", experienceLaneCount: 4, anchorIdeaCount: 5,
    matchText: "arlington at t stadium globe life field six flags over texas hurricane harbor entertainment district",
  },
  {
    slug: "houston", name: "Houston", regionLabel: "Houston & Upper Gulf Coast", priority: "primary", experienceLaneCount: 10, anchorIdeaCount: 8,
    summary: "Space Center Houston, museums, food, tunnels, neighborhoods and Gulf Coast side trips support one of Texas's largest activity markets.",
    featuredAnchors: ["Space Center Houston", "Houston Museum District", "Downtown tunnels", "Buffalo Bayou", "Discovery Green"],
    matchText: "houston harris space center houston johnson space center museum district downtown tunnels buffalo bayou discovery green downtown aquarium the heights kemah boardwalk",
  },
  {
    slug: "galveston", name: "Galveston", regionLabel: "Gulf Coast", priority: "primary", experienceLaneCount: 8, anchorIdeaCount: 8,
    summary: "Island history, harbor cruises, dolphin watching, ghost tours, architecture and beach activities make Galveston a natural coastal booking hub.",
    featuredAnchors: ["The Strand Historic District", "Galveston Harbor", "Bishop's Palace", "Moody Gardens", "Galveston Island Historic Pleasure Pier"],
    matchText: "galveston the strand historic district galveston harbor bishops palace moody gardens pleasure pier seawall east end historic district port of galveston",
  },
  {
    slug: "fredericksburg", name: "Fredericksburg & Texas Wine Country", regionLabel: "Texas Hill Country", priority: "primary", experienceLaneCount: 6, anchorIdeaCount: 8,
    summary: "Wineries, German-Texas heritage, LBJ history, Enchanted Rock and scenic Hill Country routes make Fredericksburg central to wine and day-trip monetization.",
    featuredAnchors: ["Fredericksburg wineries", "Main Street Fredericksburg", "National Museum of the Pacific War", "Enchanted Rock", "Luckenbach"],
    matchText: "fredericksburg gillespie texas wine country wineries main street national museum pacific war enchanted rock luckenbach lbj ranch wildseed farms wine road 290",
  },
  {
    slug: "new-braunfels-gruene", name: "New Braunfels & Gruene", regionLabel: "Texas Hill Country", priority: "secondary", experienceLaneCount: 7, anchorIdeaCount: 6,
    matchText: "new braunfels comal gruene historic district gruene hall comal river guadalupe river natural bridge caverns schlitterbahn",
  },
  {
    slug: "san-marcos", name: "San Marcos", regionLabel: "Central Texas", priority: "secondary", experienceLaneCount: 4, anchorIdeaCount: 4,
    matchText: "san marcos hays san marcos river spring lake meadows center glass bottom boats downtown san marcos",
  },
  {
    slug: "bandera", name: "Bandera & Cowboy Country", regionLabel: "Texas Hill Country", priority: "secondary", experienceLaneCount: 5, anchorIdeaCount: 5,
    matchText: "bandera cowboy country ranches horseback riding frontier times museum medina river",
  },
  {
    slug: "marble-falls-lake-travis", name: "Marble Falls, Lake Travis & Highland Lakes", regionLabel: "Texas Hill Country", priority: "secondary", experienceLaneCount: 5, anchorIdeaCount: 5,
    matchText: "marble falls burnet lake travis lake marble falls highland lakes balcones canyonlands hill country wineries",
  },
  {
    slug: "waco", name: "Waco", regionLabel: "Central Texas", priority: "secondary", experienceLaneCount: 6, anchorIdeaCount: 6,
    matchText: "waco mclennan magnolia market waco mammoth dr pepper museum texas ranger hall of fame brazos river cameron park zoo",
  },
  {
    slug: "college-station-bryan", name: "Bryan–College Station", regionLabel: "Brazos Valley", priority: "secondary", experienceLaneCount: 6, anchorIdeaCount: 5,
    matchText: "bryan college station brazos george h w bush presidential library texas a m university kyle field downtown bryan messina hof",
  },
  {
    slug: "corpus-christi", name: "Corpus Christi", regionLabel: "Coastal Bend", priority: "primary", experienceLaneCount: 7, anchorIdeaCount: 6,
    summary: "Aquarium, USS Lexington, bayfront sightseeing, wildlife and water activities make Corpus Christi the Coastal Bend's main urban experience hub.",
    featuredAnchors: ["Texas State Aquarium", "USS Lexington", "Corpus Christi Bayfront", "Padre Island National Seashore", "Oso Bay"],
    matchText: "corpus christi nueces texas state aquarium uss lexington corpus christi bayfront padre island national seashore oso bay mustang island",
  },
  {
    slug: "port-aransas", name: "Port Aransas & Mustang Island", regionLabel: "Coastal Bend", priority: "secondary", experienceLaneCount: 4, anchorIdeaCount: 5,
    matchText: "port aransas mustang island harbor dolphin watching whooping crane coastal birding lydia ann channel",
  },
  {
    slug: "south-padre-island", name: "South Padre Island", regionLabel: "Rio Grande Valley & Gulf Coast", priority: "primary", experienceLaneCount: 4, anchorIdeaCount: 6,
    summary: "Dolphins, parasailing, sailing, eco-tours, beach activities and nearby wildlife refuges make South Padre one of Texas's most experience-oriented coastal markets.",
    featuredAnchors: ["Laguna Madre", "South Padre Island beaches", "Dolphin watching", "Sea Turtle Inc.", "South Padre Island Birding and Nature Center"],
    matchText: "south padre island cameron laguna madre beaches dolphin watching sea turtle inc birding nature center port isabel lighthouse",
  },
  {
    slug: "rio-grande-valley", name: "Rio Grande Valley", regionLabel: "South Texas & Rio Grande Valley", priority: "secondary", experienceLaneCount: 6, anchorIdeaCount: 5,
    matchText: "rio grande valley hidalgo mcallen brownsville edinburg mission world birding center santa ana national wildlife refuge bentsen quinta mazatlan",
  },
  {
    slug: "el-paso", name: "El Paso", regionLabel: "Far West Texas", priority: "secondary", experienceLaneCount: 6, anchorIdeaCount: 6,
    matchText: "el paso mission trail franklin mountains san jacinto plaza el paso museum of art magoffin home scenic drive",
  },
  {
    slug: "big-bend-terlingua", name: "Big Bend & Terlingua", regionLabel: "Big Bend", priority: "primary", experienceLaneCount: 5, anchorIdeaCount: 6,
    summary: "Guided desert trips, river outings, stargazing and remote-landscape experiences make Big Bend highly valuable despite a smaller supplier base.",
    featuredAnchors: ["Big Bend National Park", "Rio Grande", "Santa Elena Canyon", "Terlingua Ghost Town", "Dark-sky stargazing"],
    matchText: "big bend brewster terlingua big bend national park santa elena canyon terlingua ghost town dark sky stargazing big bend ranch state park",
  },
  {
    slug: "marfa-alpine", name: "Marfa, Alpine & Davis Mountains", regionLabel: "Far West Texas", priority: "secondary", experienceLaneCount: 5, anchorIdeaCount: 6,
    matchText: "marfa alpine presidio jeff davis davis mountains marfa lights mcdonald observatory fort davis chinati foundation",
  },
  {
    slug: "amarillo-palo-duro", name: "Amarillo & Palo Duro Canyon", regionLabel: "Texas Panhandle", priority: "secondary", experienceLaneCount: 7, anchorIdeaCount: 6,
    matchText: "amarillo potter randall palo duro canyon cadillac ranch route 66 american quarter horse hall of fame big texan panhandle plains historical museum",
  },
  {
    slug: "lubbock", name: "Lubbock", regionLabel: "South Plains", priority: "emerging", experienceLaneCount: 6, anchorIdeaCount: 5,
    matchText: "lubbock buddy holly center national ranching heritage center wineries texas tech university museum texas tech",
  },
  {
    slug: "beaumont-golden-triangle", name: "Beaumont & the Golden Triangle", regionLabel: "Upper Gulf Coast", priority: "emerging", experienceLaneCount: 6, anchorIdeaCount: 5,
    matchText: "beaumont jefferson orange golden triangle spindletop gladys city boomtown cattail marsh sabine pass big thicket",
  },
  {
    slug: "jefferson-east-texas", name: "Jefferson & East Texas", regionLabel: "East Texas & Piney Woods", priority: "secondary", experienceLaneCount: 7, anchorIdeaCount: 5,
    matchText: "jefferson marion east texas caddo lake bayou boat tours ghost history piney woods",
  },
] as const;

function normalizePlace(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+county$/, "");
}

export function runtimeMarketsForPlace(place: string) {
  const normalized = normalizePlace(place);
  if (!normalized) return [];
  return VIATOR_RUNTIME_MARKETS.filter((market) => market.matchText.includes(normalized));
}
