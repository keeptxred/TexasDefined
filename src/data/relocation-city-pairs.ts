import { RELOCATION_METROS, RELOCATION_SOURCE_VERIFIED, RELOCATION_SOURCES } from "./relocation-authority";

export const RELOCATION_CITY_PAIR_VERIFIED_AT = "2026-09-29";

export const RELOCATION_CITY_PAIRS = [
  { slug: "houston-vs-dallas", cityA: "Houston", cityB: "Dallas", metroA: "houston", metroB: "dfw" },
  { slug: "houston-vs-austin", cityA: "Houston", cityB: "Austin", metroA: "houston", metroB: "austin" },
  { slug: "houston-vs-san-antonio", cityA: "Houston", cityB: "San Antonio", metroA: "houston", metroB: "san-antonio" },
  { slug: "dallas-vs-austin", cityA: "Dallas", cityB: "Austin", metroA: "dfw", metroB: "austin" },
  { slug: "dallas-vs-san-antonio", cityA: "Dallas", cityB: "San Antonio", metroA: "dfw", metroB: "san-antonio" },
  { slug: "austin-vs-san-antonio", cityA: "Austin", cityB: "San Antonio", metroA: "austin", metroB: "san-antonio" },
] as const;

export type RelocationCityPairSlug = (typeof RELOCATION_CITY_PAIRS)[number]["slug"];
export type RelocationCityPair = (typeof RELOCATION_CITY_PAIRS)[number];

const CITY_TOOL_SLUGS: Record<string, string> = {
  Houston: "houston",
  Dallas: "dallas",
  Austin: "austin",
  "San Antonio": "san-antonio",
};

export function getRelocationCityPair(slug: string): RelocationCityPair | undefined {
  return RELOCATION_CITY_PAIRS.find((pair) => pair.slug === slug);
}

export function relocationCityPairPath(slug: RelocationCityPairSlug) {
  return `/compare-texas-cities/${slug}`;
}

export function relocationCityPairTitle(pair: RelocationCityPair) {
  return `${pair.cityA} vs ${pair.cityB}: Cost, Commute & Moving Guide`;
}

export function relocationCityPairDescription(pair: RelocationCityPair) {
  return `Compare ${pair.cityA} and ${pair.cityB} for a Texas move using metro, county, commute, housing, insurance, school and household-budget planning context with official-source links.`;
}

export function relocationCityPairProfile(pair: RelocationCityPair) {
  const metroA = RELOCATION_METROS.find((metro) => metro.id === pair.metroA);
  const metroB = RELOCATION_METROS.find((metro) => metro.id === pair.metroB);
  if (!metroA || !metroB) return null;
  const slugA = CITY_TOOL_SLUGS[pair.cityA];
  const slugB = CITY_TOOL_SLUGS[pair.cityB];
  if (!slugA || !slugB) return null;
  return {
    pair,
    metroA,
    metroB,
    cityA: {
      name: pair.cityA,
      toolSlug: slugA,
      countyContext: metroA.counties,
      places: metroA.places,
      guideHref: metroA.guideHref,
      researchNote: metroA.researchNote,
    },
    cityB: {
      name: pair.cityB,
      toolSlug: slugB,
      countyContext: metroB.counties,
      places: metroB.places,
      guideHref: metroB.guideHref,
      researchNote: metroB.researchNote,
    },
    sources: [
      RELOCATION_SOURCES.blsMetro,
      RELOCATION_SOURCES.txdotTraffic,
      RELOCATION_SOURCES.tdiInsurance,
      RELOCATION_SOURCES.femaFlood,
      RELOCATION_SOURCES.teaSchools,
      RELOCATION_SOURCES.comptrollerProperty,
      RELOCATION_SOURCES.pucUtilities,
    ],
    sourceVerifiedLabel: RELOCATION_SOURCE_VERIFIED,
  };
}

export function relocationCityPairSitemapEntries() {
  return RELOCATION_CITY_PAIRS.map((pair) => ({
    path: relocationCityPairPath(pair.slug),
    lastmod: RELOCATION_CITY_PAIR_VERIFIED_AT,
  }));
}
