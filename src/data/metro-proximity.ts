import type { CategorySlug, Destination, GeoPoint } from "./types";

export const METRO_PROXIMITY_VERIFIED_AT = "2026-09-29";

export const METRO_PROXIMITY_METROS = [
  {
    slug: "houston",
    name: "Houston",
    shortName: "Houston",
    center: { lat: 29.7604, lng: -95.3698 },
    regionLabel: "Gulf Coast",
    context: "Houston's huge footprint makes geography matter. These pages favor places that can realistically fit a day trip or weekend without pretending straight-line distance equals drive time.",
  },
  {
    slug: "dallas",
    name: "Dallas",
    shortName: "Dallas",
    center: { lat: 32.7767, lng: -96.7970 },
    regionLabel: "North Texas",
    context: "Dallas sits inside a much larger Metroplex, so nearby discovery spans city attractions, prairie lakes, historic towns and state parks in several directions.",
  },
  {
    slug: "fort-worth",
    name: "Fort Worth",
    shortName: "Fort Worth",
    center: { lat: 32.7555, lng: -97.3308 },
    regionLabel: "North Texas",
    context: "Fort Worth opens quickly into Cross Timbers, prairie lakes, ranch country and smaller historic towns, making it one of Texas's strongest day-trip bases.",
  },
  {
    slug: "austin",
    name: "Austin",
    shortName: "Austin",
    center: { lat: 30.2672, lng: -97.7431 },
    regionLabel: "Central Texas",
    context: "Austin sits at the edge of the Hill Country and Blackland Prairie, putting springs, lakes, state parks, barbecue towns and historic communities inside a compact drive market.",
  },
  {
    slug: "san-antonio",
    name: "San Antonio",
    shortName: "San Antonio",
    center: { lat: 29.4241, lng: -98.4936 },
    regionLabel: "South-Central Texas",
    context: "San Antonio is surrounded by Hill Country rivers, mission-era history, limestone parks and small towns, with very different day-trip options in each direction.",
  },
  {
    slug: "corpus-christi",
    name: "Corpus Christi",
    shortName: "Corpus Christi",
    center: { lat: 27.8006, lng: -97.3964 },
    regionLabel: "Coastal Bend",
    context: "Corpus Christi anchors the Coastal Bend, where barrier-island beaches, bays, birding, fishing towns and South Texas history create a different nearby-trip network from the inland metros.",
  },
  {
    slug: "waco",
    name: "Waco",
    shortName: "Waco",
    center: { lat: 31.5493, lng: -97.1467 },
    regionLabel: "Central Texas",
    context: "Waco sits on the Brazos and Interstate 35 between North and Central Texas, making it a practical base for lake country, prairie towns, historic sites and longer Hill Country day trips.",
  },
  {
    slug: "beaumont-port-arthur",
    name: "Beaumont–Port Arthur",
    shortName: "Beaumont–Port Arthur",
    center: { lat: 29.9826, lng: -94.0333 },
    regionLabel: "Golden Triangle",
    context: "The Beaumont–Port Arthur hub represents the Golden Triangle between East Texas and the Gulf, with bayous, wildlife refuges, coastal history, beaches and Piney Woods destinations in several directions.",
  },
  {
    slug: "amarillo",
    name: "Amarillo",
    shortName: "Amarillo",
    center: { lat: 35.2220, lng: -101.8313 },
    regionLabel: "Texas Panhandle",
    context: "Amarillo is the Panhandle launch point for canyon country, historic Route 66 stops, High Plains towns, state parks and wide-open drives where distance matters more than metro traffic.",
  },
  {
    slug: "el-paso",
    name: "El Paso",
    shortName: "El Paso",
    center: { lat: 31.7619, lng: -106.4850 },
    regionLabel: "Far West Texas",
    context: "El Paso anchors Far West Texas at the Franklin Mountains, with desert parks, mission history, mountain drives and long-distance weekend routes that need a western-Texas planning lens.",
  },
  {
    slug: "lubbock",
    name: "Lubbock",
    shortName: "Lubbock",
    center: { lat: 33.5779, lng: -101.8552 },
    regionLabel: "South Plains",
    context: "Lubbock is the South Plains base for caprock scenery, ranching and music history, prairie lakes, smaller High Plains towns and road trips that spread across a broad regional grid.",
  },
  {
    slug: "mcallen",
    name: "McAllen",
    shortName: "McAllen",
    center: { lat: 26.2034, lng: -98.2300 },
    regionLabel: "Rio Grande Valley",
    context: "McAllen anchors the western Lower Rio Grande Valley, where birding centers, subtropical wildlife, borderland history and Gulf Coast side trips create a travel network unlike the rest of Texas.",
  },
  {
    slug: "midland-odessa",
    name: "Midland–Odessa",
    shortName: "Midland–Odessa",
    center: { lat: 31.9215, lng: -102.2228 },
    regionLabel: "Permian Basin",
    context: "Midland–Odessa anchors the Permian Basin, with oil history, desert landscapes, state parks, small West Texas towns and long scenic routes spreading across a wide-open drive market.",
  },
  {
    slug: "tyler",
    name: "Tyler",
    shortName: "Tyler",
    center: { lat: 32.3513, lng: -95.3011 },
    regionLabel: "East Texas",
    context: "Tyler sits near the center of East Texas lake and pine country, making it a practical base for reservoir trips, historic towns, state parks and Piney Woods weekends.",
  },
  {
    slug: "college-station",
    name: "College Station",
    shortName: "College Station",
    center: { lat: 30.6279, lng: -96.3344 },
    regionLabel: "Brazos Valley",
    context: "College Station and neighboring Bryan sit in the Brazos Valley between the state's largest metros, with lakes, historic communities, prairie landscapes and Central Texas road trips in several directions.",
  },
  {
    slug: "abilene",
    name: "Abilene",
    shortName: "Abilene",
    center: { lat: 32.4487, lng: -99.7331 },
    regionLabel: "Big Country",
    context: "Abilene anchors the Big Country, where frontier history, state parks, ranching towns, reservoirs and west-central Texas drives create a distinct regional trip market.",
  },
] as const;

export type MetroProximityMetroSlug = (typeof METRO_PROXIMITY_METROS)[number]["slug"];

const CORE_TRAVEL_CATEGORIES: readonly CategorySlug[] = [
  "state-parks",
  "national-parks",
  "lakes-rivers",
  "major-springs",
  "caverns",
  "beaches-coast",
  "historic-sites",
  "road-trips",
  "small-towns",
  "food-bbq",
  "outdoors",
];

export const METRO_PROXIMITY_COLLECTIONS = [
  {
    slug: "things-to-do",
    label: "Things to do",
    navLabel: "Things to do nearby",
    titlePrefix: "Things to Do Near",
    radiusMiles: 90,
    minimumMiles: 0,
    minResults: 12,
    maxResults: 30,
    minTowns: 8,
    minCounties: 4,
    minCategories: 4,
    categories: CORE_TRAVEL_CATEGORIES,
    matchTerms: [] as const,
    summary: "A broad nearby guide spanning parks, water, towns, history, food and outdoor destinations.",
    searchIntent: "nearby attractions and things to do",
  },
  {
    slug: "day-trips",
    label: "Day trips",
    navLabel: "Day trips",
    titlePrefix: "Best Day Trips From",
    radiusMiles: 150,
    minimumMiles: 18,
    minResults: 10,
    maxResults: 30,
    minTowns: 7,
    minCounties: 4,
    minCategories: 3,
    categories: CORE_TRAVEL_CATEGORIES,
    matchTerms: [] as const,
    summary: "Destinations far enough from the city core to feel like a real outing, but close enough to consider for a single-day trip.",
    searchIntent: "day trips and weekend drives",
  },
  {
    slug: "weekend-trips",
    label: "Weekend trips",
    navLabel: "Weekend trips",
    titlePrefix: "Weekend Trips From",
    radiusMiles: 230,
    minimumMiles: 45,
    minResults: 10,
    maxResults: 30,
    minTowns: 7,
    minCounties: 4,
    minCategories: 3,
    categories: ["small-towns", "state-parks", "national-parks", "lakes-rivers", "major-springs", "caverns", "beaches-coast", "historic-sites", "food-bbq", "outdoors"] as const,
    matchTerms: [] as const,
    summary: "Overnight-worthy towns, parks, water, caves, coast and history that can anchor a one- or two-night escape from the metro.",
    searchIntent: "weekend trips and overnight getaways",
  },
  {
    slug: "road-trips",
    label: "Road trips",
    navLabel: "Road trips",
    titlePrefix: "Road Trips From",
    radiusMiles: 220,
    minimumMiles: 25,
    minResults: 8,
    maxResults: 30,
    minTowns: 6,
    minCounties: 4,
    minCategories: 3,
    categories: ["road-trips", "small-towns", "state-parks", "historic-sites", "lakes-rivers", "major-springs", "caverns"] as const,
    matchTerms: [] as const,
    summary: "Route anchors for scenic drives and multi-stop Texas trips, emphasizing towns, parks, water, history and dedicated road-trip destinations.",
    searchIntent: "road trips and scenic drives",
  },
  {
    slug: "state-parks",
    label: "State parks",
    navLabel: "State parks nearby",
    titlePrefix: "State Parks Near",
    radiusMiles: 150,
    minimumMiles: 0,
    minResults: 4,
    maxResults: 24,
    minTowns: 3,
    minCounties: 3,
    minCategories: 1,
    categories: ["state-parks"] as const,
    matchTerms: [] as const,
    summary: "Texas state parks ordered by geographic proximity, with each park linked to its full TexasDefined visitor guide.",
    searchIntent: "state parks nearby",
  },
  {
    slug: "small-towns",
    label: "Small towns",
    navLabel: "Small towns nearby",
    titlePrefix: "Small Towns Near",
    radiusMiles: 150,
    minimumMiles: 12,
    minResults: 6,
    maxResults: 28,
    minTowns: 6,
    minCounties: 3,
    minCategories: 1,
    categories: ["small-towns"] as const,
    matchTerms: [] as const,
    summary: "Small-town destinations that can work as lunch stops, history trips, scenic drives or full-day escapes.",
    searchIntent: "small towns nearby",
  },
  {
    slug: "small-towns-1-hour",
    label: "Small towns · about 1 hour",
    navLabel: "Small towns about 1 hour away",
    titlePrefix: "Small Towns About 1 Hour From",
    radiusMiles: 35,
    minimumMiles: 12,
    minResults: 4,
    maxResults: 18,
    minTowns: 4,
    minCounties: 2,
    minCategories: 1,
    categories: ["small-towns"] as const,
    matchTerms: [] as const,
    summary: "The closest small-town ring for an easy day trip. The one-hour wording is planning shorthand; actual drive times vary by starting point, traffic and route.",
    searchIntent: "small towns within about one hour",
  },
  {
    slug: "small-towns-2-hours",
    label: "Small towns · about 2 hours",
    navLabel: "Small towns about 2 hours away",
    titlePrefix: "Small Towns About 2 Hours From",
    radiusMiles: 80,
    minimumMiles: 35,
    minResults: 6,
    maxResults: 22,
    minTowns: 6,
    minCounties: 3,
    minCategories: 1,
    categories: ["small-towns"] as const,
    matchTerms: [] as const,
    summary: "A distinct middle-distance small-town ring for fuller day trips, screened by geography rather than invented minute-by-minute drive estimates.",
    searchIntent: "small towns within about two hours",
  },
  {
    slug: "small-towns-3-hours",
    label: "Small towns · about 3 hours",
    navLabel: "Small towns about 3 hours away",
    titlePrefix: "Small Towns About 3 Hours From",
    radiusMiles: 135,
    minimumMiles: 80,
    minResults: 6,
    maxResults: 24,
    minTowns: 6,
    minCounties: 3,
    minCategories: 1,
    categories: ["small-towns"] as const,
    matchTerms: [] as const,
    summary: "The farther small-town ring for long day trips and overnights, kept separate from the closer pages to avoid duplicate doorway content.",
    searchIntent: "small towns within about three hours",
  },
  {
    slug: "lakes-rivers",
    label: "Lakes & rivers",
    navLabel: "Lakes & rivers nearby",
    titlePrefix: "Lakes and Rivers Near",
    radiusMiles: 130,
    minimumMiles: 0,
    minResults: 5,
    maxResults: 28,
    minTowns: 4,
    minCounties: 2,
    minCategories: 1,
    categories: ["lakes-rivers", "major-springs"] as const,
    matchTerms: [] as const,
    summary: "Lakes, rivers and major spring destinations with source-backed visitor pages and practical trip-planning context.",
    searchIntent: "lakes, rivers and swimming water nearby",
  },
  {
    slug: "lakes",
    label: "Lakes",
    navLabel: "Lakes nearby",
    titlePrefix: "Lakes Near",
    radiusMiles: 140,
    minimumMiles: 0,
    minResults: 4,
    maxResults: 24,
    minTowns: 3,
    minCounties: 2,
    minCategories: 1,
    categories: ["lakes-rivers"] as const,
    matchTerms: ["lake", "reservoir"] as const,
    summary: "Lake and reservoir destinations close enough to compare for fishing, paddling, swimming, camping and general water-day planning.",
    searchIntent: "lakes and reservoirs nearby",
  },
  {
    slug: "swimming-holes",
    label: "Swimming holes",
    navLabel: "Swimming holes nearby",
    titlePrefix: "Swimming Holes Near",
    radiusMiles: 150,
    minimumMiles: 0,
    minResults: 5,
    maxResults: 24,
    minTowns: 4,
    minCounties: 3,
    minCategories: 2,
    categories: ["lakes-rivers", "major-springs", "state-parks", "outdoors"] as const,
    matchTerms: ["swim", "swimming", "spring", "spring-fed", "tubing", "tube", "float", "blue hole", "pool"] as const,
    summary: "Source-backed spring, river, pool and swimming destinations, with current access, flow, water-quality and reservation checks left to the destination guide and official source.",
    searchIntent: "swimming holes and spring-fed water nearby",
  },
  {
    slug: "historic-sites",
    label: "Historic sites",
    navLabel: "Historic sites nearby",
    titlePrefix: "Historic Sites Near",
    radiusMiles: 120,
    minimumMiles: 0,
    minResults: 5,
    maxResults: 28,
    minTowns: 4,
    minCounties: 3,
    minCategories: 1,
    categories: ["historic-sites"] as const,
    matchTerms: [] as const,
    summary: "Historic destinations close enough to build into a city-based day trip, ordered by approximate geographic distance.",
    searchIntent: "historic places nearby",
  },
] as const;

export type MetroProximityCollectionSlug = (typeof METRO_PROXIMITY_COLLECTIONS)[number]["slug"];
export type MetroProximityMetro = (typeof METRO_PROXIMITY_METROS)[number];
export type MetroProximityCollection = (typeof METRO_PROXIMITY_COLLECTIONS)[number];

export interface MetroProximityResult {
  destination: Destination;
  distanceMiles: number;
  distanceBand: "close-in" | "easy-day-trip" | "longer-day-trip";
}

function validPoint(point: GeoPoint) {
  return Number.isFinite(point.lat)
    && Number.isFinite(point.lng)
    && point.lat >= -90
    && point.lat <= 90
    && point.lng >= -180
    && point.lng <= 180
    && !(point.lat === 0 && point.lng === 0);
}

export function distanceFromPointMiles(origin: GeoPoint, destination: Destination): number | null {
  if (!validPoint(origin) || !validPoint(destination.coordinates)) return null;
  const radians = (value: number) => value * Math.PI / 180;
  const earthRadiusMiles = 3958.8;
  const dLat = radians(destination.coordinates.lat - origin.lat);
  const dLng = radians(destination.coordinates.lng - origin.lng);
  const leftLat = radians(origin.lat);
  const rightLat = radians(destination.coordinates.lat);
  const h = Math.sin(dLat / 2) ** 2
    + Math.cos(leftLat) * Math.cos(rightLat) * Math.sin(dLng / 2) ** 2;
  return earthRadiusMiles * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export function getMetroProximityMetro(slug: string): MetroProximityMetro | undefined {
  return METRO_PROXIMITY_METROS.find((metro) => metro.slug === slug);
}

export function getMetroProximityCollection(slug: string): MetroProximityCollection | undefined {
  return METRO_PROXIMITY_COLLECTIONS.find((collection) => collection.slug === slug);
}

function distanceBand(miles: number): MetroProximityResult["distanceBand"] {
  if (miles <= 35) return "close-in";
  if (miles <= 80) return "easy-day-trip";
  return "longer-day-trip";
}

function destinationSearchText(destination: Destination) {
  return [
    destination.name,
    destination.summary,
    destination.nearestTown,
    destination.entryNote,
    ...destination.highlights,
    ...destination.body,
  ].filter(Boolean).join(" ").toLowerCase();
}

function categoryMatches(destination: Destination, collection: MetroProximityCollection) {
  if (!(collection.categories as readonly CategorySlug[]).includes(destination.category)) return false;
  if (collection.matchTerms.length === 0) return true;
  const haystack = destinationSearchText(destination);
  return collection.matchTerms.some((term) => haystack.includes(term.toLowerCase()));
}

export function selectMetroProximityDestinations(
  destinations: Destination[],
  metro: MetroProximityMetro,
  collection: MetroProximityCollection,
): MetroProximityResult[] {
  const seen = new Set<string>();
  const rows = destinations
    .filter((destination) => destination.slug && !seen.has(destination.slug) && (seen.add(destination.slug), true))
    .filter((destination) => categoryMatches(destination, collection))
    .map((destination) => ({ destination, distanceMiles: distanceFromPointMiles(metro.center, destination) }))
    .filter((row): row is { destination: Destination; distanceMiles: number } => row.distanceMiles !== null)
    .filter((row) => (collection.minimumMiles === 0 ? row.distanceMiles >= 0 : row.distanceMiles > collection.minimumMiles) && row.distanceMiles <= collection.radiusMiles)
    .sort((left, right) => left.distanceMiles - right.distanceMiles || left.destination.name.localeCompare(right.destination.name))
    .slice(0, collection.maxResults);

  return rows.map((row) => ({
    ...row,
    distanceBand: distanceBand(row.distanceMiles),
  }));
}

function normalizedCounty(destination: Destination) {
  return destination.county?.replace(/\s+County$/i, "").trim().toLowerCase() ?? "";
}

export function isMetroProximityCollectionIndexReady(
  destinations: Destination[],
  metro: MetroProximityMetro,
  collection: MetroProximityCollection,
) {
  const rows = selectMetroProximityDestinations(destinations, metro, collection);
  if (rows.length < collection.minResults) return false;
  if (new Set(rows.map((row) => row.destination.slug)).size !== rows.length) return false;
  if (new Set(rows.map((row) => row.destination.nearestTown.trim().toLowerCase()).filter(Boolean)).size < collection.minTowns) return false;
  if (new Set(rows.map((row) => normalizedCounty(row.destination)).filter(Boolean)).size < collection.minCounties) return false;
  if (new Set(rows.map((row) => row.destination.category)).size < collection.minCategories) return false;
  return rows.every((row) => row.destination.summary.trim().length >= 80 && Boolean(row.destination.hero?.src));
}

export function metroProximityCanonicalPath(metroSlug: MetroProximityMetroSlug, collectionSlug?: MetroProximityCollectionSlug) {
  return collectionSlug
    ? `/explore/near/${metroSlug}/${collectionSlug}`
    : `/explore/near/${metroSlug}`;
}

export function metroProximityTitle(metro: MetroProximityMetro, collection: MetroProximityCollection) {
  return `${collection.titlePrefix} ${metro.name}, Texas`;
}

export function metroProximityDescription(metro: MetroProximityMetro, collection: MetroProximityCollection, count: number) {
  return `Compare ${count} ${collection.searchIntent} around ${metro.name}, ordered by approximate straight-line distance, with TexasDefined destination guides, seasonal planning notes and official-source links. Actual road mileage and drive time vary.`;
}

export function metroProximityHubReady(destinations: Destination[], metro: MetroProximityMetro) {
  return METRO_PROXIMITY_COLLECTIONS.filter((collection) => isMetroProximityCollectionIndexReady(destinations, metro, collection)).length >= 4;
}

export function metroProximitySitemapEntries(destinations: Destination[]) {
  const entries: { path: string; lastmod: string }[] = [];
  for (const metro of METRO_PROXIMITY_METROS) {
    if (metroProximityHubReady(destinations, metro)) {
      entries.push({ path: metroProximityCanonicalPath(metro.slug), lastmod: METRO_PROXIMITY_VERIFIED_AT });
    }
    for (const collection of METRO_PROXIMITY_COLLECTIONS) {
      if (!isMetroProximityCollectionIndexReady(destinations, metro, collection)) continue;
      entries.push({ path: metroProximityCanonicalPath(metro.slug, collection.slug), lastmod: METRO_PROXIMITY_VERIFIED_AT });
    }
  }
  return entries;
}
