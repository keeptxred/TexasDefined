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

const BRAND_LOCATION_INTENT_PATTERN = /\b(?:nearest|closest|nearby|near|find|where|location|locations|store|stores|around|by|in)\b/i;
const HEB_PATTERN = /\b(?:h\s*[-.]?\s*e\s*[-.]?\s*b|heb)\b/i;
const BUCEES_PATTERN = /\bbuc[-’']?ee['’]?s\b/i;
const STREET_ADDRESS_PATTERN = /\b\d{1,6}\s+[A-Za-z0-9.'#-]+(?:\s+[A-Za-z0-9.'#-]+){0,7}\s+(?:st|street|rd|road|ave|avenue|blvd|boulevard|ln|lane|dr|drive|ct|court|way|pkwy|parkway|hwy|highway|fm|rm)\b[^?\n]{0,100}/i;
const PLACE_KINDS = new Set(["city", "county", "metro-area"]);
const MAX_RESULTS_PER_BRAND = 3;

export type TexasBrandLocationIntent = {
  brands: TexasBrandLocatorBrand[];
  isLocationQuestion: boolean;
  address: string | null;
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

function answerLines(response: TexasBrandLocatorResponse, brands: TexasBrandLocatorBrand[], placeLabel: string) {
  const lines: string[] = [];
  for (const brand of brands) {
    const locations = response.results.filter((location) => location.brand === brand).slice(0, MAX_RESULTS_PER_BRAND);
    const label = brand === "heb" ? "H-E-B" : "Buc-ee's";
    if (!locations.length) continue;
    lines.push(`Nearest ${label} locations to ${placeLabel}:`);
    locations.forEach((location, index) => {
      lines.push(`${index + 1}. ${location.name} — ${location.address} — ${formatDistance(location.distanceMiles)}.`);
    });
  }
  return lines;
}

function officialSources(response: TexasBrandLocatorResponse): OfficialResearchSource[] {
  const seen = new Set<string>();
  const now = new Date().toISOString();
  const sources: OfficialResearchSource[] = [];
  for (const link of response.fallbackLinks) {
    const baseUrl = link.brand === "heb" ? "https://www.heb.com/store-locations" : "https://buc-ees.com/locations/";
    if (seen.has(baseUrl)) continue;
    seen.add(baseUrl);
    sources.push({
      authority: link.brand === "heb" ? "H-E-B" : "Buc-ee's",
      title: link.brand === "heb" ? "H-E-B official store locator" : "Buc-ee's official locations",
      url: baseUrl,
      retrievedAt: now,
      snippet: link.brand === "heb"
        ? "Official H-E-B store-location source used for this lookup."
        : "Official Buc-ee's location source used by TexasDefined's verified Texas registry.",
    });
  }
  return sources;
}

function texasBrandsSource() {
  return {
    title: "Legendary Texas Brands & Retail Institutions",
    href: "/things-unique-to-texas/texas-brands",
    summary: "TexasDefined's Texas Brands chapter includes the Find Your H-E-B / Buc-ee's locator and editorial brand guides.",
    kind: "guide" as const,
  };
}

function buildAnswer(
  response: TexasBrandLocatorResponse,
  brands: TexasBrandLocatorBrand[],
  placeLabel: string,
  signalPlace: string | null,
): TexasBrandLocationAiAnswer {
  const lines = answerLines(response, brands, placeLabel);
  const resultCount = response.results.filter((item) => brands.includes(item.brand)).length;
  if (lines.length) {
    lines.push("Distances are approximate straight-line distances for Buc-ee's and should be verified with the official brand link before traveling.");
    if (response.notices.length) lines.push(response.notices.join(" "));
  } else {
    lines.push(`I could not verify a nearby ${brands.map((brand) => brand === "heb" ? "H-E-B" : "Buc-ee's").join(" or ")} result for ${placeLabel} right now.`);
    lines.push("Use the official brand locator links below or the TexasDefined Texas Brands locator to continue without guessing.");
    if (response.notices.length) lines.push(response.notices.join(" "));
  }

  return {
    answer: lines.join("\n"),
    sources: [texasBrandsSource()],
    officialSources: officialSources(response),
    brands,
    texasPlace: signalPlace,
    sourceCount: 1 + response.fallbackLinks.length,
    resultCount,
    answerStatus: resultCount > 0 ? "answered" : response.fallbackLinks.length > 0 ? "partial" : "unanswered",
  };
}

export async function answerTexasBrandLocationQuestion(question: string): Promise<TexasBrandLocationAiAnswer | null> {
  const intent = classifyTexasBrandLocationQuestion(question);
  if (!intent.isLocationQuestion) return null;

  if (intent.address) {
    const response = await findTexasBrandLocationsServer({ address: intent.address, brands: intent.brands });
    return buildAnswer(response, intent.brands, response.matchedAddress || "that Texas address", null);
  }

  const place = await resolveTexasPlace(question);
  if (!place?.coordinates) {
    return {
      answer: `I can look up nearby ${intent.brands.map((brand) => brand === "heb" ? "H-E-B" : "Buc-ee's").join(" and ")}, but include a Texas city, county, or street address so I can anchor the search. The Texas Brands locator also accepts a full Texas street address.`,
      sources: [texasBrandsSource()],
      officialSources: [],
      brands: intent.brands,
      texasPlace: null,
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
  return buildAnswer(response, intent.brands, place.name, place.name);
}

export function locationResultCities(results: TexasBrandLocatorLocation[]) {
  return [...new Set(results.map((item) => item.city).filter((city): city is string => Boolean(city)))];
}
