import { searchCompleteTexasKnowledgeGraph } from "../data/knowledge-graph";
import type { TexasEntityRecord } from "../data/knowledge-graph/types";
import type { TexasBrandLocatorLocation } from "../data/texas-brand-locator.types";

type TexasPlace = Pick<TexasEntityRecord, "kind" | "name" | "slug">;

export type TexasBrandLocationPlaceScope = {
  results: TexasBrandLocatorLocation[];
  mode: "within-city" | "within-county" | "nearest";
  exact: boolean;
};

function normalizePlaceName(value: string) {
  return value
    .toLowerCase()
    .replace(/\b(?:city|county)\b/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeCountySlug(value: string) {
  return value.toLowerCase().replace(/-county$/, "").replace(/[^a-z0-9-]/g, "");
}

async function canonicalCityCountySlug(city: string) {
  const candidates = await searchCompleteTexasKnowledgeGraph(`${city}, Texas`, 12);
  const normalizedCity = normalizePlaceName(city);
  const match = candidates.find((entity) =>
    (entity.kind === "city" || entity.kind === "census-place")
    && normalizePlaceName(entity.name) === normalizedCity
    && typeof entity.countySlug === "string"
    && entity.countySlug.length > 0,
  );
  return match?.countySlug ? normalizeCountySlug(match.countySlug) : null;
}

async function locationsWithinCounty(results: TexasBrandLocatorLocation[], countySlug: string) {
  const expectedCounty = normalizeCountySlug(countySlug);
  const uniqueCities = [...new Set(results.map((result) => result.city).filter((city): city is string => Boolean(city)))];
  const countyByCity = new Map<string, string | null>();

  await Promise.all(uniqueCities.map(async (city) => {
    countyByCity.set(normalizePlaceName(city), await canonicalCityCountySlug(city));
  }));

  return results.filter((result) => {
    if (!result.city) return false;
    return countyByCity.get(normalizePlaceName(result.city)) === expectedCounty;
  });
}

/**
 * Tightens an already-grounded nearest-location result to the Texas place the
 * reader actually asked for. We never widen the result set here: if the
 * upstream locator cannot verify a store inside the requested city/county,
 * the deterministic answer returns no in-place match instead of relabeling a
 * nearby store as being inside that place.
 */
export async function scopeTexasBrandLocationsToPlace(
  results: TexasBrandLocatorLocation[],
  place: TexasPlace,
): Promise<TexasBrandLocationPlaceScope> {
  if (place.kind === "city") {
    const expectedCity = normalizePlaceName(place.name);
    const matches = results.filter((result) => result.city && normalizePlaceName(result.city) === expectedCity);
    return { results: matches, mode: "within-city", exact: matches.length > 0 };
  }

  if (place.kind === "county") {
    const matches = await locationsWithinCounty(results, place.slug);
    return { results: matches, mode: "within-county", exact: matches.length > 0 };
  }

  return { results, mode: "nearest", exact: results.length > 0 };
}
