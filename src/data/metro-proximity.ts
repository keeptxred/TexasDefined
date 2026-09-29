import type { CategorySlug, Destination, GeoPoint } from "./types";

export const METRO_PROXIMITY_VERIFIED_AT = "2026-09-28";

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
    categories: CORE_TRAVEL_CATEGORIES,
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
    categories: CORE_TRAVEL_CATEGORIES,
    summary: "Destinations far enough from the city core to feel like a real outing, but close enough to consider for a single-day trip.",
    searchIntent: "day trips and weekend drives",
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
    categories: ["state-parks"] as const,
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
    categories: ["small-towns"] as const,
    summary: "Small-town destinations that can work as lunch stops, history trips, scenic drives or full-day escapes.",
    searchIntent: "small towns nearby",
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
    categories: ["lakes-rivers", "major-springs"] as const,
    summary: "Lakes, rivers and major spring destinations with source-backed visitor pages and practical trip-planning context.",
    searchIntent: "lakes, rivers and swimming water nearby",
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
    categories: ["historic-sites"] as const,
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

function categoryMatches(destination: Destination, collection: MetroProximityCollection) {
  return (collection.categories as readonly CategorySlug[]).includes(destination.category);
}

export function selectMetroProximityDestinations(
  destinations: Destination[],
  metro: MetroProximityMetro,
  collection: MetroProximityCollection,
): MetroProximityResult[] {
  const rows = destinations
    .filter((destination) => destination.slug && categoryMatches(destination, collection))
    .map((destination) => ({ destination, distanceMiles: distanceFromPointMiles(metro.center, destination) }))
    .filter((row): row is { destination: Destination; distanceMiles: number } => row.distanceMiles !== null)
    .filter((row) => row.distanceMiles >= collection.minimumMiles && row.distanceMiles <= collection.radiusMiles)
    .sort((left, right) => left.distanceMiles - right.distanceMiles || left.destination.name.localeCompare(right.destination.name))
    .slice(0, collection.maxResults);

  return rows.map((row) => ({
    ...row,
    distanceBand: distanceBand(row.distanceMiles),
  }));
}

export function isMetroProximityCollectionIndexReady(
  destinations: Destination[],
  metro: MetroProximityMetro,
  collection: MetroProximityCollection,
) {
  return selectMetroProximityDestinations(destinations, metro, collection).length >= collection.minResults;
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
  return `Compare ${count} ${collection.searchIntent} around ${metro.name}, ordered by approximate distance, with TexasDefined destination guides, planning notes and official-source links.`;
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
