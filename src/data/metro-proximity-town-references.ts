import {
  isMetroProximityCollectionIndexReady,
  selectMetroProximityDestinations,
  type MetroProximityCollection,
  type MetroProximityMetro,
  type MetroProximityResult,
} from "./metro-proximity.ts";
import type { Destination, GeoPoint } from "./types";

export interface MetroProximityTownReference {
  metroSlug: string;
  slug: string;
  name: string;
  county: string;
  coordinates: GeoPoint;
  summary: string;
  bestFor: readonly string[];
  officialUrl: string;
  sourceCheckedAt: string;
}

export interface MetroProximityTownResult {
  town: MetroProximityTownReference;
  distanceMiles: number;
  distanceBand: MetroProximityResult["distanceBand"];
}

const sourceCheckedAt = "2026-10-04";

/**
 * Geographic town references fill discovery gaps where TexasDefined does not
 * yet have a full destination authority guide. They are intentionally kept
 * separate from the Destination catalog so proximity pages can answer the
 * geography-first question without manufacturing thin destination pages.
 */
export const METRO_PROXIMITY_TOWN_REFERENCES: readonly MetroProximityTownReference[] = [
  { metroSlug: "san-angelo", slug: "miles", name: "Miles", county: "Runnels", coordinates: { lat: 31.5993, lng: -100.1823 }, summary: "Miles is a small Runnels County community east of San Angelo with a historic brick-street core and an easy location for a short Concho Valley drive without committing to a full-day trip.", bestFor: ["short drives", "historic downtown", "Concho Valley scenery"], officialUrl: "https://www.milestexas.com/", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "christoval", name: "Christoval", county: "Tom Green", coordinates: { lat: 31.1932, lng: -100.4998 }, summary: "Christoval is a small South Concho River community south of San Angelo where river recreation, local history and a compact village setting make it one of the most natural close-in escapes from the city.", bestFor: ["river time", "easy half-day trip", "local history"], officialUrl: "https://www.christovaltx.com/", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "mertzon", name: "Mertzon", county: "Irion", coordinates: { lat: 31.2618, lng: -100.8173 }, summary: "Mertzon is the Irion County seat west of San Angelo, set along Spring Creek in ranch country with a small courthouse-town center and a practical role as a quick westbound Concho Valley outing.", bestFor: ["courthouse towns", "ranch country", "short westbound drive"], officialUrl: "https://www.mertzontexas.com/", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "robert-lee", name: "Robert Lee", county: "Coke", coordinates: { lat: 31.8951, lng: -100.4840 }, summary: "Robert Lee is the Coke County seat north of San Angelo, pairing a small courthouse-town setting with nearby Lake E. V. Spence and the open Colorado River country of west-central Texas.", bestFor: ["lake access", "courthouse towns", "west-central Texas drives"], officialUrl: "https://www.robertleetexas.org/", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "bronte", name: "Bronte", county: "Coke", coordinates: { lat: 31.8874, lng: -100.2920 }, summary: "Bronte is a small Coke County town northeast of San Angelo with railroad-era landmarks, nearby Fort Chadbourne history and access to the Oak Creek Lake landscape for a varied short day trip.", bestFor: ["Texas history", "railroad heritage", "lake country"], officialUrl: "https://www.brontetexas.org/", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "paint-rock", name: "Paint Rock", county: "Concho", coordinates: { lat: 31.5085, lng: -99.9204 }, summary: "Paint Rock is the Concho County seat east of San Angelo, known regionally for the nearby Indigenous pictograph site and a quiet courthouse-town setting along the Concho River corridor.", bestFor: ["regional history", "courthouse towns", "Concho River country"], officialUrl: "https://paintrock.texas.gov/visit-paint-rock", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "ballinger", name: "Ballinger", county: "Runnels", coordinates: { lat: 31.7382, lng: -99.9473 }, summary: "Ballinger is the Runnels County seat northeast of San Angelo, with a courthouse-centered historic district and enough local services to work as an easy small-town day trip or a stop on a longer regional loop.", bestFor: ["historic downtown", "courthouse architecture", "easy day trips"], officialUrl: "https://www.baltx.org/", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "eden", name: "Eden", county: "Concho", coordinates: { lat: 31.2163, lng: -99.8457 }, summary: "Eden sits southeast of San Angelo in Concho County and works as a quiet ranch-country stop with city parks, local history and a central position for exploring the broad agricultural landscape around the county.", bestFor: ["ranch-country drives", "parks", "regional loops"], officialUrl: "https://www.edentexas.com/", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "sterling-city", name: "Sterling City", county: "Sterling", coordinates: { lat: 31.8360, lng: -100.9848 }, summary: "Sterling City is the Sterling County seat northwest of San Angelo, a compact ranching community whose windmill identity and courthouse-town setting fit naturally into a longer West Texas day drive.", bestFor: ["courthouse towns", "ranching history", "West Texas scenery"], officialUrl: "https://www.sterlingcitytexas.com/", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "eldorado", name: "Eldorado", county: "Schleicher", coordinates: { lat: 30.8602, lng: -100.6009 }, summary: "Eldorado is the Schleicher County seat south of San Angelo, a small ranch-country town on US 277 that provides a practical courthouse, local-history and open-range stop on routes toward Sonora.", bestFor: ["ranch country", "courthouse towns", "US 277 road trips"], officialUrl: "https://www.eldorado-texas.com/", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "winters", name: "Winters", county: "Runnels", coordinates: { lat: 31.9565, lng: -99.9623 }, summary: "Winters is a Runnels County town northeast of San Angelo with a traditional small-town center and nearby Elm Creek Reservoir, making it useful for a relaxed regional drive with a water-and-outdoors component.", bestFor: ["small-town drives", "reservoir access", "regional history"], officialUrl: "https://www.cityofwinters.net/", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "big-lake", name: "Big Lake", county: "Reagan", coordinates: { lat: 31.1915, lng: -101.4604 }, summary: "Big Lake is the Reagan County seat west of San Angelo and an important Permian Basin history stop, with the Santa Rita No. 1 story giving the town a clear reason to include it on a longer regional drive.", bestFor: ["oil history", "courthouse towns", "longer West Texas drives"], officialUrl: "https://sites.google.com/cityofbiglaketx.org/cityofbiglaketx/home", sourceCheckedAt },
];

function pointDistanceMiles(origin: GeoPoint, target: GeoPoint) {
  const radians = (value: number) => value * Math.PI / 180;
  const earthRadiusMiles = 3958.8;
  const dLat = radians(target.lat - origin.lat);
  const dLng = radians(target.lng - origin.lng);
  const leftLat = radians(origin.lat);
  const rightLat = radians(target.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(leftLat) * Math.cos(rightLat) * Math.sin(dLng / 2) ** 2;
  return earthRadiusMiles * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function distanceBand(miles: number): MetroProximityTownResult["distanceBand"] {
  if (miles <= 35) return "close-in";
  if (miles <= 80) return "easy-day-trip";
  return "longer-day-trip";
}

export function isSmallTownProximityCollection(collection: MetroProximityCollection) {
  return collection.slug === "small-towns" || collection.slug.startsWith("small-towns-");
}

export function getMetroProximityTownReferences(metroSlug: string) {
  return METRO_PROXIMITY_TOWN_REFERENCES.filter((town) => town.metroSlug === metroSlug);
}

export function selectMetroProximityTownReferences(metro: MetroProximityMetro, collection: MetroProximityCollection, destinationRows: MetroProximityResult[] = []): MetroProximityTownResult[] {
  if (!isSmallTownProximityCollection(collection)) return [];
  const destinationSlugs = new Set(destinationRows.map((row) => row.destination.slug));
  const destinationNames = new Set(destinationRows.flatMap((row) => [row.destination.name, row.destination.nearestTown]).map((value) => value.trim().toLowerCase()));
  const allowance = Math.max(0, collection.maxResults - destinationRows.length);
  return getMetroProximityTownReferences(metro.slug)
    .filter((town) => !destinationSlugs.has(town.slug) && !destinationNames.has(town.name.toLowerCase()))
    .map((town) => ({ town, distanceMiles: pointDistanceMiles(metro.center, town.coordinates) }))
    .filter((row) => (collection.minimumMiles === 0 ? row.distanceMiles >= 0 : row.distanceMiles > collection.minimumMiles) && row.distanceMiles <= collection.radiusMiles)
    .sort((left, right) => left.distanceMiles - right.distanceMiles || left.town.name.localeCompare(right.town.name))
    .slice(0, allowance)
    .map((row) => ({ ...row, distanceBand: distanceBand(row.distanceMiles) }));
}

export function isMetroProximityCollectionIndexReadyWithTownReferences(destinations: Destination[], metro: MetroProximityMetro, collection: MetroProximityCollection) {
  if (!isSmallTownProximityCollection(collection)) return isMetroProximityCollectionIndexReady(destinations, metro, collection);
  const destinationRows = selectMetroProximityDestinations(destinations, metro, collection);
  const townRows = selectMetroProximityTownReferences(metro, collection, destinationRows);
  const combinedCount = destinationRows.length + townRows.length;
  if (combinedCount < collection.minResults) return false;
  const slugs = [...destinationRows.map((row) => row.destination.slug), ...townRows.map((row) => row.town.slug)];
  if (new Set(slugs).size !== slugs.length) return false;
  const towns = [...destinationRows.map((row) => row.destination.nearestTown.trim().toLowerCase()).filter(Boolean), ...townRows.map((row) => row.town.name.trim().toLowerCase())];
  if (new Set(towns).size < collection.minTowns) return false;
  const counties = [
    ...destinationRows.map((row) => row.destination.county?.replace(/\s+County$/i, "").trim().toLowerCase()).filter((value): value is string => Boolean(value)),
    ...townRows.map((row) => row.town.county.replace(/\s+County$/i, "").trim().toLowerCase()),
  ];
  if (new Set(counties).size < collection.minCounties) return false;
  const destinationQuality = destinationRows.every((row) => row.destination.summary.trim().length >= 80 && Boolean(row.destination.hero?.src));
  const townQuality = townRows.every((row) => row.town.summary.trim().length >= 80 && Boolean(row.town.officialUrl));
  return destinationQuality && townQuality;
}
