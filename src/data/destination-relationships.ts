import type { CategorySlug, Destination } from "./types";

export type DestinationRelationshipGroup = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  destinations: Destination[];
};

const COMPLEMENTARY_CATEGORIES: Partial<Record<CategorySlug, CategorySlug[]>> = {
  "state-parks": ["lakes-rivers", "major-springs", "caverns", "small-towns", "outdoors"],
  "national-parks": ["state-parks", "road-trips", "small-towns", "historic-sites", "outdoors"],
  "lakes-rivers": ["state-parks", "major-springs", "small-towns", "outdoors"],
  "major-springs": ["lakes-rivers", "state-parks", "small-towns", "outdoors"],
  caverns: ["state-parks", "major-springs", "small-towns", "historic-sites"],
  "beaches-coast": ["historic-sites", "small-towns", "food-bbq", "outdoors"],
  "historic-sites": ["small-towns", "food-bbq", "state-parks", "road-trips"],
  "small-towns": ["historic-sites", "food-bbq", "road-trips", "state-parks"],
  "food-bbq": ["small-towns", "historic-sites", "road-trips"],
  "road-trips": ["small-towns", "historic-sites", "state-parks", "food-bbq"],
  outdoors: ["state-parks", "lakes-rivers", "major-springs", "small-towns"],
};

const WATER_CATEGORIES = new Set<CategorySlug>(["lakes-rivers", "major-springs", "beaches-coast"]);
const HISTORY_CATEGORIES = new Set<CategorySlug>(["historic-sites", "small-towns", "road-trips"]);
const OUTDOOR_CATEGORIES = new Set<CategorySlug>(["state-parks", "national-parks", "outdoors", "caverns"]);
const WEEKEND_CATEGORIES = new Set<CategorySlug>(["small-towns", "food-bbq", "road-trips", "historic-sites", "state-parks", "lakes-rivers"]);

function validCoordinates(destination: Destination) {
  const { lat, lng } = destination.coordinates;
  return Number.isFinite(lat) && Number.isFinite(lng) && !(lat === 0 && lng === 0);
}

export function distanceMiles(left: Destination, right: Destination): number | null {
  if (!validCoordinates(left) || !validCoordinates(right)) return null;
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const earthRadiusMiles = 3958.8;
  const latitudeDelta = toRadians(right.coordinates.lat - left.coordinates.lat);
  const longitudeDelta = toRadians(right.coordinates.lng - left.coordinates.lng);
  const leftLatitude = toRadians(left.coordinates.lat);
  const rightLatitude = toRadians(right.coordinates.lat);
  const haversine = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(leftLatitude) * Math.cos(rightLatitude) * Math.sin(longitudeDelta / 2) ** 2;
  return earthRadiusMiles * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function unique(items: Destination[]) {
  return [...new Map(items.map((item) => [item.slug, item])).values()];
}

function nearest(origin: Destination, candidates: Destination[], limit: number) {
  return candidates
    .map((destination) => ({ destination, miles: distanceMiles(origin, destination) }))
    .filter((item): item is { destination: Destination; miles: number } => item.miles !== null)
    .sort((left, right) => left.miles - right.miles)
    .slice(0, limit)
    .map((item) => item.destination);
}

export function buildDestinationRelationshipGroups(
  destination: Destination,
  catalog: Destination[],
): DestinationRelationshipGroup[] {
  const others = catalog.filter((item) => item.slug && item.slug !== destination.slug);
  const used = new Set<string>();
  const take = (items: Destination[], limit = 6) => unique(items)
    .filter((item) => !used.has(item.slug))
    .slice(0, limit)
    .map((item) => {
      used.add(item.slug);
      return item;
    });

  const nearby = take(nearest(destination, others, 8).filter((item) => {
    const miles = distanceMiles(destination, item);
    return miles !== null && miles <= 75;
  }));

  const sameTown = take(others.filter((item) =>
    item.nearestTown.trim().toLowerCase() === destination.nearestTown.trim().toLowerCase(),
  ));

  const complementary = new Set(COMPLEMENTARY_CATEGORIES[destination.category] ?? []);
  const nearbyComplementary = take(nearest(
    destination,
    others.filter((item) => complementary.has(item.category)),
    6,
  ));

  const nearbyWater = take(nearest(destination, others.filter((item) => WATER_CATEGORIES.has(item.category)), 6), 4);
  const nearbyHistory = take(nearest(destination, others.filter((item) => HISTORY_CATEGORIES.has(item.category)), 6), 4);
  const nearbyOutdoors = take(nearest(destination, others.filter((item) => OUTDOOR_CATEGORIES.has(item.category)), 6), 4);
  const weekendPairings = take(nearest(destination, others.filter((item) => WEEKEND_CATEGORIES.has(item.category)), 8), 6);

  const similar = take([
    ...nearest(destination, others.filter((item) => item.category === destination.category), 8),
    ...others.filter((item) => item.category === destination.category && item.region === destination.region),
  ]);

  const regional = take(others.filter((item) => item.region === destination.region));

  return [
    {
      id: "nearby",
      eyebrow: "Close enough for the same trip",
      title: "Nearby places",
      description: "Places ordered by straight-line distance when reliable coordinates are available.",
      destinations: nearby,
    },
    {
      id: "same-town",
      eyebrow: `Around ${destination.nearestTown}`,
      title: "More near the closest town",
      description: `Other destinations connected to ${destination.nearestTown}.`,
      destinations: sameTown,
    },
    {
      id: "pair-the-trip",
      eyebrow: "Build a better day",
      title: "Pair this stop with something different",
      description: "Nearby parks, water, towns, history and outdoor places that complement this destination.",
      destinations: nearbyComplementary,
    },
    {
      id: "nearby-water",
      eyebrow: "Add some water",
      title: "Nearby water stops",
      description: "Lakes, rivers, springs and coastal places that can fit into the same trip.",
      destinations: nearbyWater,
    },
    {
      id: "history-nearby",
      eyebrow: "Add some Texas context",
      title: "Historic stops nearby",
      description: "Historic sites, small towns and road-trip stops that add context to the route.",
      destinations: nearbyHistory,
    },
    {
      id: "outdoors-nearby",
      eyebrow: "Keep the day outside",
      title: "More outdoors nearby",
      description: "Parks, caverns and outdoor destinations that pair naturally with this stop.",
      destinations: nearbyOutdoors,
    },
    {
      id: "weekend",
      eyebrow: "Make a weekend of it",
      title: "Build a full weekend",
      description: "A mix of towns, food, history, parks and water that can turn one stop into a fuller itinerary.",
      destinations: weekendPairings,
    },
    {
      id: "similar",
      eyebrow: "More like this",
      title: "People also visit",
      description: "Similar destinations, favoring the same region and the shortest available distance.",
      destinations: similar,
    },
    {
      id: "region",
      eyebrow: "Keep exploring the region",
      title: "More in this part of Texas",
      description: "Additional places from the same Texas region.",
      destinations: regional,
    },
  ].filter((group) => group.destinations.length > 0);
}
