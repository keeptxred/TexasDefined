import { searchCompleteTexasKnowledgeGraph } from "../data/knowledge-graph";
import {
  findTexasBrandLocationsNearPointServer,
  findTexasBrandLocationsServer,
} from "../data/texas-brand-locator.server";
import type {
  TexasBrandLocatorBrand,
  TexasBrandLocatorLocation,
  TexasBrandLocatorResponse,
} from "../data/texas-brand-locator.types";
import type { SearchDocument } from "../data/types";
import type { OfficialResearchSource } from "./texas-defined-official-research.server";
import {
  scopeTexasBrandLocationsToPlace,
  type TexasBrandLocationPlaceScope,
} from "./texas-defined-ai-location-place.server";

const BRAND_LOCATION_INTENT_PATTERN = /\b(?:nearest|closest|nearby|near|find|where|location|locations|store|stores|around|by|in)\b/i;
const WITHIN_PLACE_PATTERN = /\b(?:in|inside|within)\b/i;
const HEB_PATTERN = /\b(?:h\s*[-.]?\s*e\s*[-.]?\s*b|heb)\b/i;
const BUCEES_PATTERN = /\bbuc[-’']?ee['’]?s\b/i;
const STREET_ADDRESS_PATTERN = /\b\d{1,6}\s+[A-Za-z0-9.'#-]+(?:\s+[A-Za-z0-9.'#-]+){0,7}\s+(?:st|street|rd|road|ave|avenue|blvd|boulevard|ln|lane|dr|drive|ct|court|way|pkwy|parkway|hwy|highway|fm|rm)\b[^?\n]{0,100}/i;
const PLACE_KINDS = new Set(["city", "county", "metro-area"]);
const MAX_RESULTS_PER_BRAND = 3;

type TexasBrandLocationAnswerMode = "address" | TexasBrandLocationPlaceScope["mode"];

export type TexasBrandLocationIntent = {
  brands: TexasBrandLocatorBrand[];
  isLocationQuestion: boolean;
  address: string | null;
  placeScope: "within" | "nearest";
};

export type TexasBrandLocationAiAnswer = {
  answer: string;
  sources: Array<{
    title: string;
    href: string;
    summary: string;
    kind: SearchDocument["kind"];
  }>;
  officialSources: OfficialResearchSource[];
  brands: TexasBrandLocatorBrand[];
  texasPlace: string | null;
  locationMode: TexasBrandLocationAnswerMode;
  sourceCount: number;
  resultCount: number;
  answerStatus: "answered" | "partial" | "unanswered";
};

export function classifyTexasBrandLocationQuestion(question: string): TexasBrandLocationIntent {
  const brands: TexasBrandLocatorBrand[] = [];
  if (HEB_PATTERN.test(question)) brands.push("heb");
  if (BUCEES_PATTERN.test(question)) brands.push("bucees");
  const address = question.match(STREET_ADDRESS_PATTERN)?.[0]?.trim().replace(/[?.!,;:]+$/, "") ?? null;
  return {
    brands,
    isLocationQuestion: brands.length > 0 && (BRAND_LOCATION_INTENT_PATTERN.test(question) || Boolean(address)),
    address,
    placeScope: WITHIN_PLACE_PATTERN.test(question) ? "within" : "nearest",
  };
}

function placeQuery(name: string, kind: string) {
  if (/\btexas\b|,\s*tx\b/i.test(name)) return name;
  return kind === "county" ? `${name}, Texas` : `${name}, TX`;
}

async function resolveTexasPlace(question: string) {
  const candidates = await searchCompleteTexasKnowledgeGraph(question, 16);
  return candidates.find((entity) => PLACE_KINDS.has(entity.kind) && entity.coordinates
    && Number.isFinite(entity.coordinates.latitude)
    && Number.isFinite(entity.coordinates.longitude));
}

function formatDistance(value?: number) {
  return typeof value === "number" && Number.isFinite(value) ? `${value.toFixed(1)} miles` : "distance unavailable";
}

function answerLines(
  response: TexasBrandLocatorResponse,
  brands: TexasBrandLocatorBrand[],
  placeLabel: string,
  mode: TexasBrandLocationAnswerMode,
) {
  const lines: string[] = [];
  for (const brand of brands) {
    const locations = response.results.filter((location) => location.brand === brand).slice(0, MAX_RESULTS_PER_BRAND);
    const label = brand === "heb" ? "H-E-B" : "Buc-ee's";
    if (!locations.length) continue;
    const heading = mode === "within-city" || mode === "within-county"
      ? `${label} locations I could verify in ${placeLabel}:`
      : `Nearest ${label} locations to ${placeLabel}:`;
    lines.push(heading);
    locations.forEach((location, index) => {
      lines.push(`${index + 1}. ${location.name} — ${location.address} — ${formatDistance(location.distanceMiles)}.`);
    });
  }
  return lines;
}

function texasBrandsSource() {
  return {
    title: "Legendary Texas Brands & Retail Institutions",
    href: "/things-unique-to-texas/texas-brands",
    summary: "TexasDefined's Texas Brands chapter includes the Find Your H-E-B / Buc-ee's locator and direct links to the brands' official location sources.",
    kind: "guide" as const,
  };
}

function buildAnswer(
  response: TexasBrandLocatorResponse,
  brands: TexasBrandLocatorBrand[],
  placeLabel: string,
  signalPlace: string | null,
  locationMode: TexasBrandLocationAnswerMode,
): TexasBrandLocationAiAnswer {
  const lines = answerLines(response, brands, placeLabel, locationMode);
  const resultCount = response.results.filter((item) => brands.includes(item.brand)).length;
  if (lines.length) {
    lines.push("Distances are approximate straight-line distances for Buc-ee's. For the latest hours, services, closures or location changes, use the direct official links in TexasDefined's Texas Brands locator.");
    if (response.notices.length) lines.push(response.notices.join(" "));
  } else {
    const scopeLanguage = locationMode === "within-city" || locationMode === "within-county"
      ? `inside ${placeLabel}`
      : `near ${placeLabel}`;
    lines.push(`I could not verify a ${brands.map((brand) => brand === "heb" ? "H-E-B" : "Buc-ee's").join(" or ")} result ${scopeLanguage} right now.`);
    lines.push("Use the TexasDefined Texas Brands locator, which links directly to official H-E-B and Buc-ee's location sources, to continue without guessing.");
    if (response.notices.length) lines.push(response.notices.join(" "));
  }

  return {
    answer: lines.join("\n"),
    sources: [texasBrandsSource()],
    // H-E-B may be queried live, while Buc-ee's is served from TexasDefined's
    // verified registry. Do not place either in the shared "live official
    // research" renderer, which would overstate freshness for registry data.
    officialSources: [],
    brands,
    texasPlace: signalPlace,
    locationMode,
    sourceCount: 1,
    resultCount,
    answerStatus: resultCount > 0 ? "answered" : response.fallbackLinks.length > 0 ? "partial" : "unanswered",
  };
}

export async function answerTexasBrandLocationQuestion(question: string): Promise<TexasBrandLocationAiAnswer | null> {
  const intent = classifyTexasBrandLocationQuestion(question);
  if (!intent.isLocationQuestion) return null;

  if (intent.address) {
    const response = await findTexasBrandLocationsServer({ address: intent.address, brands: intent.brands });
    return buildAnswer(response, intent.brands, response.matchedAddress || "that Texas address", null, "address");
  }

  const place = await resolveTexasPlace(question);
  if (!place?.coordinates) {
    return {
      answer: `I can look up nearby ${intent.brands.map((brand) => brand === "heb" ? "H-E-B" : "Buc-ee's").join(" and ")}, but include a Texas city, county, or street address so I can anchor the search. The Texas Brands locator also accepts a full Texas street address.`,
      sources: [texasBrandsSource()],
      officialSources: [],
      brands: intent.brands,
      texasPlace: null,
      locationMode: "nearest",
      sourceCount: 1,
      resultCount: 0,
      answerStatus: "partial",
    };
  }

  const query = placeQuery(place.name, place.kind);
  const response = await findTexasBrandLocationsNearPointServer({
    query,
    origin: place.coordinates,
    matchedAddress: place.name,
    brands: intent.brands,
  });

  if (intent.placeScope !== "within") {
    return buildAnswer(response, intent.brands, place.name, place.name, "nearest");
  }

  const scoped = await scopeTexasBrandLocationsToPlace(response.results, place);
  const scopedResponse: TexasBrandLocatorResponse = {
    ...response,
    results: scoped.results,
    notices: scoped.exact || scoped.mode === "nearest"
      ? response.notices
      : [
          ...response.notices,
          `TexasDefined did not relabel nearby results as being inside ${place.name}; no in-place match was verified from the grounded locator results.`,
        ],
  };
  return buildAnswer(scopedResponse, intent.brands, place.name, place.name, scoped.mode);
}

export function locationResultCities(results: TexasBrandLocatorLocation[]) {
  return [...new Set(results.map((item) => item.city).filter((city): city is string => Boolean(city)))];
}
