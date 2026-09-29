import type { CategorySlug, Destination, GeoPoint } from "./types";

export type MetroProximityMetroSlug = "houston" | "dallas-fort-worth" | "austin" | "san-antonio";
export type MetroProximityGuideKind =
  | "small-towns-1-hour"
  | "small-towns-2-hours"
  | "small-towns-3-hours"
  | "weekend-trips"
  | "state-parks"
  | "lakes"
  | "swimming-holes"
  | "road-trips";

export interface MetroProximityMetro {
  slug: MetroProximityMetroSlug;
  name: string;
  shortName: string;
  center: GeoPoint;
}

interface MetroProximityGuideDefinition {
  kind: MetroProximityGuideKind;
  pathPrefix: string;
  pathSuffix: "of" | "from" | "near";
  searchLabel: string;
  minMiles: number;
  maxMiles: number;
  minItems: number;
  minTowns: number;
  minCounties: number;
  minCategories: number;
  categories: readonly CategorySlug[];
  matcher?: (destination: Destination) => boolean;
}

export interface MetroProximityItem {
  destination: Destination;
  distanceMiles: number;
  distanceLabel: string;
  travelContext: string;
  bestFor: readonly string[];
}

export interface MetroProximityPage {
  slug: string;
  canonicalPath: string;
  metro: MetroProximityMetro;
  guide: MetroProximityGuideDefinition;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  intro: string;
  methodology: string;
  searchIntent: string;
  items: MetroProximityItem[];
  totalMatches: number;
  uniqueTowns: number;
  uniqueCounties: number;
  uniqueCategories: number;
  indexReady: boolean;
}

export const METRO_PROXIMITY_METROS: readonly MetroProximityMetro[] = [
  { slug: "houston", name: "Houston", shortName: "Houston", center: { lat: 29.7604, lng: -95.3698 } },
  { slug: "dallas-fort-worth", name: "Dallas–Fort Worth", shortName: "DFW", center: { lat: 32.8998, lng: -97.0403 } },
  { slug: "austin", name: "Austin", shortName: "Austin", center: { lat: 30.2672, lng: -97.7431 } },
  { slug: "san-antonio", name: "San Antonio", shortName: "San Antonio", center: { lat: 29.4241, lng: -98.4936 } },
] as const;

const WATER_WORDS = /\b(swim|swimming|tube|tubing|float|spring|spring-fed|river|pool|paddl)/i;
const LAKE_WORDS = /\b(lake|reservoir)\b/i;

export const METRO_PROXIMITY_GUIDES: readonly MetroProximityGuideDefinition[] = [
  {
    kind: "small-towns-1-hour",
    pathPrefix: "small-towns-within-1-hour",
    pathSuffix: "of",
    searchLabel: "small towns within 1 hour",
    minMiles: 10,
    maxMiles: 35,
    minItems: 4,
    minTowns: 4,
    minCounties: 2,
    minCategories: 1,
    categories: ["small-towns"],
  },
  {
    kind: "small-towns-2-hours",
    pathPrefix: "small-towns-within-2-hours",
    pathSuffix: "of",
    searchLabel: "small towns within 2 hours",
    minMiles: 35,
    maxMiles: 80,
    minItems: 6,
    minTowns: 6,
    minCounties: 3,
    minCategories: 1,
    categories: ["small-towns"],
  },
  {
    kind: "small-towns-3-hours",
    pathPrefix: "small-towns-within-3-hours",
    pathSuffix: "of",
    searchLabel: "small towns within 3 hours",
    minMiles: 80,
    maxMiles: 135,
    minItems: 8,
    minTowns: 8,
    minCounties: 4,
    minCategories: 1,
    categories: ["small-towns"],
  },
  {
    kind: "weekend-trips",
    pathPrefix: "weekend-trips",
    pathSuffix: "from",
    searchLabel: "weekend trips",
    minMiles: 30,
    maxMiles: 180,
    minItems: 10,
    minTowns: 6,
    minCounties: 4,
    minCategories: 3,
    categories: ["small-towns", "state-parks", "lakes-rivers", "major-springs", "historic-sites", "caverns", "beaches-coast", "outdoors"],
  },
  {
    kind: "state-parks",
    pathPrefix: "state-parks",
    pathSuffix: "near",
    searchLabel: "state parks near",
    minMiles: 10,
    maxMiles: 130,
    minItems: 4,
    minTowns: 3,
    minCounties: 3,
    minCategories: 1,
    categories: ["state-parks"],
  },
  {
    kind: "lakes",
    pathPrefix: "lakes",
    pathSuffix: "near",
    searchLabel: "lakes near",
    minMiles: 10,
    maxMiles: 130,
    minItems: 4,
    minTowns: 3,
    minCounties: 2,
    minCategories: 1,
    categories: ["lakes-rivers"],
    matcher: (destination) => LAKE_WORDS.test(destinationText(destination)),
  },
  {
    kind: "swimming-holes",
    pathPrefix: "swimming-holes",
    pathSuffix: "near",
    searchLabel: "swimming holes near",
    minMiles: 10,
    maxMiles: 130,
    minItems: 5,
    minTowns: 4,
    minCounties: 3,
    minCategories: 2,
    categories: ["lakes-rivers", "major-springs", "state-parks", "outdoors"],
    matcher: (destination) => WATER_WORDS.test(destinationText(destination)),
  },
  {
    kind: "road-trips",
    pathPrefix: "road-trips",
    pathSuffix: "from",
    searchLabel: "road trips",
    minMiles: 25,
    maxMiles: 190,
    minItems: 10,
    minTowns: 6,
    minCounties: 4,
    minCategories: 3,
    categories: ["small-towns", "state-parks", "lakes-rivers", "major-springs", "historic-sites", "caverns", "beaches-coast", "outdoors", "road-trips"],
  },
] as const;

const metrosBySlug = new Map(METRO_PROXIMITY_METROS.map((metro) => [metro.slug, metro]));
const guidesByKind = new Map(METRO_PROXIMITY_GUIDES.map((guide) => [guide.kind, guide]));

function destinationText(destination: Destination) {
  return [
    destination.name,
    destination.summary,
    destination.nearestTown,
    destination.entryNote,
    ...destination.highlights,
  ].filter(Boolean).join(" ");
}

function degreesToRadians(value: number) {
  return value * Math.PI / 180;
}

export function straightLineMiles(from: GeoPoint, to: GeoPoint) {
  const earthRadiusMiles = 3958.8;
  const deltaLat = degreesToRadians(to.lat - from.lat);
  const deltaLng = degreesToRadians(to.lng - from.lng);
  const fromLat = degreesToRadians(from.lat);
  const toLat = degreesToRadians(to.lat);
  const a = Math.sin(deltaLat / 2) ** 2
    + Math.cos(fromLat) * Math.cos(toLat) * Math.sin(deltaLng / 2) ** 2;
  return 2 * earthRadiusMiles * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function roundedDistance(distance: number) {
  return Math.max(5, Math.round(distance / 5) * 5);
}

function categoryBestFor(category: CategorySlug): readonly string[] {
  switch (category) {
    case "small-towns": return ["downtown strolls", "local food", "easy overnights"];
    case "state-parks": return ["hiking", "camping", "outdoor weekends"];
    case "lakes-rivers": return ["water days", "paddling", "fishing"];
    case "major-springs": return ["spring-fed water", "summer outings", "scenic stops"];
    case "historic-sites": return ["Texas history", "museums", "heritage trips"];
    case "caverns": return ["all-weather stops", "geology", "family trips"];
    case "beaches-coast": return ["coast weekends", "beach time", "birding"];
    case "road-trips": return ["scenic drives", "multi-stop routes", "weekends"];
    default: return ["day trips", "weekend planning", "Texas exploring"];
  }
}

function guideSlug(metro: MetroProximityMetro, guide: MetroProximityGuideDefinition) {
  return `${guide.pathPrefix}-${guide.pathSuffix}-${metro.slug}`;
}

function guideTitle(metro: MetroProximityMetro, guide: MetroProximityGuideDefinition) {
  switch (guide.kind) {
    case "small-towns-1-hour": return `Small Towns Within About 1 Hour of ${metro.name}`;
    case "small-towns-2-hours": return `Small Towns 1–2 Hours from ${metro.name}`;
    case "small-towns-3-hours": return `Small Towns 2–3 Hours from ${metro.name}`;
    case "weekend-trips": return `Weekend Trips From ${metro.name}`;
    case "state-parks": return `State Parks Near ${metro.name}`;
    case "lakes": return `Lakes Near ${metro.name}`;
    case "swimming-holes": return `Swimming Holes Near ${metro.name}`;
    case "road-trips": return `Road Trips From ${metro.name}`;
  }
}

function guideMetaTitle(metro: MetroProximityMetro, guide: MetroProximityGuideDefinition) {
  switch (guide.kind) {
    case "small-towns-1-hour": return `Small Towns Within 1 Hour of ${metro.name}`;
    case "small-towns-2-hours": return `Small Towns Within 2 Hours of ${metro.name}`;
    case "small-towns-3-hours": return `Small Towns Within 3 Hours of ${metro.name}`;
    case "weekend-trips": return `Best Weekend Trips From ${metro.name}`;
    case "state-parks": return `Best State Parks Near ${metro.name}`;
    case "lakes": return `Best Lakes Near ${metro.name}`;
    case "swimming-holes": return `Swimming Holes Near ${metro.name}`;
    case "road-trips": return `Best Road Trips From ${metro.name}`;
  }
}

function guideIntro(metro: MetroProximityMetro, guide: MetroProximityGuideDefinition) {
  const base = `This TexasDefined guide uses the site's source-checked destination catalog to build a practical shortlist around ${metro.name}.`;
  switch (guide.kind) {
    case "small-towns-1-hour":
      return `${base} It focuses on the closest small-town band for a half-day or easy day trip, without pretending traffic is the same every day.`;
    case "small-towns-2-hours":
      return `${base} It emphasizes the next ring beyond the closest outings so this page adds genuinely different towns instead of repeating the one-hour guide.`;
    case "small-towns-3-hours":
      return `${base} It emphasizes the farther day-trip ring where an early start or overnight becomes more useful, rather than duplicating the closer guides.`;
    case "weekend-trips":
      return `${base} The mix favors destinations with enough substance for an overnight or a two-day itinerary: towns, parks, water, history, caves and coast where the catalog supports them.`;
    case "state-parks":
      return `${base} Compare nearby state parks by distance context, season and the experience each park supports, then confirm current TPWD reservations and alerts before leaving.`;
    case "lakes":
      return `${base} The list is restricted to lake and reservoir destinations with useful visitor context rather than every water-related place in the database.`;
    case "swimming-holes":
      return `${base} The shortlist favors source-checked places associated with swimming, springs, rivers or float trips; always verify current access, flow, water quality and reservation rules.`;
    case "road-trips":
      return `${base} Treat these as route anchors: combine a town, park, lake or historic stop into a drive that matches the time you actually have.`;
  }
}

function guideDescription(metro: MetroProximityMetro, guide: MetroProximityGuideDefinition) {
  const noun = guideMetaTitle(metro, guide);
  return `${noun}: source-checked Texas destinations with approximate distance context, reasons to go, seasonal planning, maps and related guides. Travel-time bands are planning ranges, not live routing estimates.`;
}

export const METRO_PROXIMITY_DISTANCE_METHOD = "TexasDefined groups destinations by conservative straight-line distance bands from a consistent metro reference point. These are planning bands, not promised drive times: road mileage, traffic, construction, weather and the traveler's starting neighborhood can materially change a trip. Check a live route before leaving.";

function qualifiesForGuide(destination: Destination, metro: MetroProximityMetro, guide: MetroProximityGuideDefinition) {
  if (!guide.categories.includes(destination.category)) return false;
  const { lat, lng } = destination.coordinates;
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || (lat === 0 && lng === 0)) return false;
  if (guide.matcher && !guide.matcher(destination)) return false;
  const distance = straightLineMiles(metro.center, destination.coordinates);
  return distance >= guide.minMiles && distance < guide.maxMiles;
}

function uniqueDestinations(destinations: readonly Destination[]) {
  return [...new Map(destinations.filter((destination) => destination.slug).map((destination) => [destination.slug, destination])).values()];
}

function qualityCounts(items: readonly MetroProximityItem[]) {
  return {
    uniqueTowns: new Set(items.map((item) => item.destination.nearestTown.trim().toLowerCase()).filter(Boolean)).size,
    uniqueCounties: new Set(items.map((item) => item.destination.county?.replace(/\s+County$/i, "").trim().toLowerCase()).filter(Boolean)).size,
    uniqueCategories: new Set(items.map((item) => item.destination.category)).size,
  };
}

export function isMetroProximityPageIndexReady(page: Pick<MetroProximityPage, "items" | "guide" | "uniqueTowns" | "uniqueCounties" | "uniqueCategories">) {
  const uniqueSlugs = new Set(page.items.map((item) => item.destination.slug));
  if (page.items.length !== uniqueSlugs.size) return false;
  if (page.items.length < page.guide.minItems) return false;
  if (page.uniqueTowns < page.guide.minTowns) return false;
  if (page.uniqueCounties < page.guide.minCounties) return false;
  if (page.uniqueCategories < page.guide.minCategories) return false;
  return page.items.every((item) => item.destination.summary.trim().length >= 80 && Boolean(item.destination.hero?.src));
}

export function resolveMetroProximityPage(
  metroSlug: MetroProximityMetroSlug,
  guideKind: MetroProximityGuideKind,
  destinations: readonly Destination[],
): MetroProximityPage {
  const metro = metrosBySlug.get(metroSlug);
  const guide = guidesByKind.get(guideKind);
  if (!metro || !guide) throw new Error(`Unknown metro proximity definition: ${metroSlug}/${guideKind}`);

  const items = uniqueDestinations(destinations)
    .filter((destination) => qualifiesForGuide(destination, metro, guide))
    .map((destination) => {
      const distanceMiles = straightLineMiles(metro.center, destination.coordinates);
      const roundedMiles = roundedDistance(distanceMiles);
      return {
        destination,
        distanceMiles,
        distanceLabel: `About ${roundedMiles} straight-line miles from ${metro.name}`,
        travelContext: `${guide.searchLabel} ${metro.shortName} planning band · verify the live driving route`,
        bestFor: categoryBestFor(destination.category),
      };
    })
    .sort((left, right) => left.distanceMiles - right.distanceMiles || left.destination.name.localeCompare(right.destination.name));

  const counts = qualityCounts(items);
  const slug = guideSlug(metro, guide);
  const title = guideTitle(metro, guide);
  const page: MetroProximityPage = {
    slug,
    canonicalPath: `/explore/${slug}`,
    metro,
    guide,
    title,
    metaTitle: guideMetaTitle(metro, guide),
    description: guideDescription(metro, guide),
    eyebrow: `${metro.shortName} trip planning`,
    intro: guideIntro(metro, guide),
    methodology: METRO_PROXIMITY_DISTANCE_METHOD,
    searchIntent: `${guide.searchLabel} ${metro.name}`,
    items,
    totalMatches: items.length,
    ...counts,
    indexReady: false,
  };
  return { ...page, indexReady: isMetroProximityPageIndexReady(page) };
}

export interface MetroProximityRouteDefinition {
  slug: string;
  metroSlug: MetroProximityMetroSlug;
  guideKind: MetroProximityGuideKind;
}

export const METRO_PROXIMITY_ROUTES: readonly MetroProximityRouteDefinition[] = METRO_PROXIMITY_METROS.flatMap((metro) =>
  METRO_PROXIMITY_GUIDES.map((guide) => ({ slug: guideSlug(metro, guide), metroSlug: metro.slug, guideKind: guide.kind })),
);

const routesBySlug = new Map(METRO_PROXIMITY_ROUTES.map((route) => [route.slug, route]));

export function metroProximityRoute(slug: string) {
  return routesBySlug.get(slug);
}

export function resolveMetroProximityPageBySlug(slug: string, destinations: readonly Destination[]) {
  const route = metroProximityRoute(slug);
  return route ? resolveMetroProximityPage(route.metroSlug, route.guideKind, destinations) : null;
}

export function listIndexableMetroProximityPaths(destinations: readonly Destination[]) {
  return METRO_PROXIMITY_ROUTES
    .map((route) => resolveMetroProximityPage(route.metroSlug, route.guideKind, destinations))
    .filter((page) => page.indexReady)
    .map((page) => page.canonicalPath);
}

export function metroProximityLinksForCategory(category: string) {
  const guideKinds: MetroProximityGuideKind[] = category === "small-towns"
    ? ["small-towns-1-hour", "small-towns-2-hours", "small-towns-3-hours"]
    : category === "state-parks"
      ? ["state-parks"]
      : category === "lakes-rivers"
        ? ["lakes"]
        : category === "swimming-holes-river-tubing"
          ? ["swimming-holes"]
          : category === "road-trips"
            ? ["road-trips", "weekend-trips"]
            : [];
  return METRO_PROXIMITY_ROUTES
    .filter((route) => guideKinds.includes(route.guideKind))
    .map((route) => {
      const metro = metrosBySlug.get(route.metroSlug)!;
      const guide = guidesByKind.get(route.guideKind)!;
      return { href: `/explore/${route.slug}`, label: guideTitle(metro, guide), metro: metro.name };
    });
}

export function relatedMetroProximityLinks(page: MetroProximityPage) {
  const sameMetro = METRO_PROXIMITY_ROUTES
    .filter((route) => route.metroSlug === page.metro.slug && route.slug !== page.slug)
    .slice(0, 7)
    .map((route) => {
      const guide = guidesByKind.get(route.guideKind)!;
      return { href: `/explore/${route.slug}`, label: guideTitle(page.metro, guide) };
    });
  const sameIntent = METRO_PROXIMITY_ROUTES
    .filter((route) => route.guideKind === page.guide.kind && route.metroSlug !== page.metro.slug)
    .map((route) => {
      const metro = metrosBySlug.get(route.metroSlug)!;
      return { href: `/explore/${route.slug}`, label: guideTitle(metro, page.guide) };
    });
  return [...sameMetro, ...sameIntent];
}

export function countySlug(county: string) {
  return county.replace(/\s+County$/i, "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
