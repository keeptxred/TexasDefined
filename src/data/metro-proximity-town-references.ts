import type { GeoPoint } from "./types";

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

const sourceCheckedAt = "2026-10-04";

/**
 * Geographic town references fill discovery gaps where TexasDefined does not
 * yet have a full destination authority guide. They are intentionally kept
 * separate from the Destination catalog so proximity pages can answer the
 * geography-first question without manufacturing thin destination pages.
 */
export const METRO_PROXIMITY_TOWN_REFERENCES: readonly MetroProximityTownReference[] = [
  {
    metroSlug: "san-angelo",
    slug: "miles",
    name: "Miles",
    county: "Runnels",
    coordinates: { lat: 31.5993, lng: -100.1823 },
    summary: "Miles is a small Runnels County community east of San Angelo with a historic brick-street core and an easy location for a short Concho Valley drive without committing to a full-day trip.",
    bestFor: ["short drives", "historic downtown", "Concho Valley scenery"],
    officialUrl: "https://www.milestexas.com/",
    sourceCheckedAt,
  },
  {
    metroSlug: "san-angelo",
    slug: "christoval",
    name: "Christoval",
    county: "Tom Green",
    coordinates: { lat: 31.1932, lng: -100.4998 },
    summary: "Christoval is a small South Concho River community south of San Angelo where river recreation, local history and a compact village setting make it one of the most natural close-in escapes from the city.",
    bestFor: ["river time", "easy half-day trip", "local history"],
    officialUrl: "https://www.christovaltx.com/",
    sourceCheckedAt,
  },
  {
    metroSlug: "san-angelo",
    slug: "mertzon",
    name: "Mertzon",
    county: "Irion",
    coordinates: { lat: 31.2618, lng: -100.8173 },
    summary: "Mertzon is the Irion County seat west of San Angelo, set along Spring Creek in ranch country with a small courthouse-town center and a practical role as a quick westbound Concho Valley outing.",
    bestFor: ["courthouse towns", "ranch country", "short westbound drive"],
    officialUrl: "https://www.mertzontexas.com/",
    sourceCheckedAt,
  },
  {
    metroSlug: "san-angelo",
    slug: "robert-lee",
    name: "Robert Lee",
    county: "Coke",
    coordinates: { lat: 31.8951, lng: -100.4840 },
    summary: "Robert Lee is the Coke County seat north of San Angelo, pairing a small courthouse-town setting with nearby Lake E. V. Spence and the open Colorado River country of west-central Texas.",
    bestFor: ["lake access", "courthouse towns", "west-central Texas drives"],
    officialUrl: "https://www.robertleetexas.org/",
    sourceCheckedAt,
  },
  {
    metroSlug: "san-angelo",
    slug: "bronte",
    name: "Bronte",
    county: "Coke",
    coordinates: { lat: 31.8874, lng: -100.2920 },
    summary: "Bronte is a small Coke County town northeast of San Angelo with railroad-era landmarks, nearby Fort Chadbourne history and access to the Oak Creek Lake landscape for a varied short day trip.",
    bestFor: ["Texas history", "railroad heritage", "lake country"],
    officialUrl: "https://www.brontetexas.org/",
    sourceCheckedAt,
  },
  {
    metroSlug: "san-angelo",
    slug: "paint-rock",
    name: "Paint Rock",
    county: "Concho",
    coordinates: { lat: 31.5085, lng: -99.9204 },
    summary: "Paint Rock is the Concho County seat east of San Angelo, known regionally for the nearby Indigenous pictograph site and a quiet courthouse-town setting along the Concho River corridor.",
    bestFor: ["regional history", "courthouse towns", "Concho River country"],
    officialUrl: "https://paintrock.texas.gov/visit-paint-rock",
    sourceCheckedAt,
  },
  {
    metroSlug: "san-angelo",
    slug: "ballinger",
    name: "Ballinger",
    county: "Runnels",
    coordinates: { lat: 31.7382, lng: -99.9473 },
    summary: "Ballinger is the Runnels County seat northeast of San Angelo, with a courthouse-centered historic district and enough local services to work as an easy small-town day trip or a stop on a longer regional loop.",
    bestFor: ["historic downtown", "courthouse architecture", "easy day trips"],
    officialUrl: "https://www.baltx.org/",
    sourceCheckedAt,
  },
  {
    metroSlug: "san-angelo",
    slug: "eden",
    name: "Eden",
    county: "Concho",
    coordinates: { lat: 31.2163, lng: -99.8457 },
    summary: "Eden sits southeast of San Angelo in Concho County and works as a quiet ranch-country stop with city parks, local history and a central position for exploring the broad agricultural landscape around the county.",
    bestFor: ["ranch-country drives", "parks", "regional loops"],
    officialUrl: "https://www.edentexas.com/",
    sourceCheckedAt,
  },
  {
    metroSlug: "san-angelo",
    slug: "sterling-city",
    name: "Sterling City",
    county: "Sterling",
    coordinates: { lat: 31.8360, lng: -100.9848 },
    summary: "Sterling City is the Sterling County seat northwest of San Angelo, a compact ranching community whose windmill identity and courthouse-town setting fit naturally into a longer West Texas day drive.",
    bestFor: ["courthouse towns", "ranching history", "West Texas scenery"],
    officialUrl: "https://www.sterlingcitytexas.com/",
    sourceCheckedAt,
  },
  {
    metroSlug: "san-angelo",
    slug: "eldorado",
    name: "Eldorado",
    county: "Schleicher",
    coordinates: { lat: 30.8602, lng: -100.6009 },
    summary: "Eldorado is the Schleicher County seat south of San Angelo, a small ranch-country town on US 277 that provides a practical courthouse, local-history and open-range stop on routes toward Sonora.",
    bestFor: ["ranch country", "courthouse towns", "US 277 road trips"],
    officialUrl: "https://www.eldorado-texas.com/",
    sourceCheckedAt,
  },
  {
    metroSlug: "san-angelo",
    slug: "winters",
    name: "Winters",
    county: "Runnels",
    coordinates: { lat: 31.9565, lng: -99.9623 },
    summary: "Winters is a Runnels County town northeast of San Angelo with a traditional small-town center and nearby Elm Creek Reservoir, making it useful for a relaxed regional drive with a water-and-outdoors component.",
    bestFor: ["small-town drives", "reservoir access", "regional history"],
    officialUrl: "https://www.cityofwinters.net/",
    sourceCheckedAt,
  },
  {
    metroSlug: "san-angelo",
    slug: "big-lake",
    name: "Big Lake",
    county: "Reagan",
    coordinates: { lat: 31.1915, lng: -101.4604 },
    summary: "Big Lake is the Reagan County seat west of San Angelo and an important Permian Basin history stop, with the Santa Rita No. 1 story giving the town a clear reason to include it on a longer regional drive.",
    bestFor: ["oil history", "courthouse towns", "longer West Texas drives"],
    officialUrl: "https://sites.google.com/cityofbiglaketx.org/cityofbiglaketx/home",
    sourceCheckedAt,
  },
];

export function getMetroProximityTownReferences(metroSlug: string) {
  return METRO_PROXIMITY_TOWN_REFERENCES.filter((town) => town.metroSlug === metroSlug);
}
