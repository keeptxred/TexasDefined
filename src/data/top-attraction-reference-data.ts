import { topAttractionExpansionDestinations } from "./destination-curation-top-attractions-fallbacks";
import { topAttractionDestinations } from "./destination-curation-top-attractions";
import { resolveTopAttractionAuthority } from "./top-attraction-authority-resolver";
import { TOP_ATTRACTION_ROAD_TRIPS } from "./top-attraction-road-trips";
import { TOP_TEXAS_ATTRACTIONS, type TopTexasAttractionSlug } from "./top-texas-attractions";
import type { Destination } from "./types";

const siteUrl = "https://texasdefined.com";
export const TOP_ATTRACTIONS_METHODOLOGY_URL = `${siteUrl}/explore/top-attractions/methodology`;
export const TOP_ATTRACTIONS_COLLECTION_URL = `${siteUrl}/explore/top-attractions`;

const catalog = [...topAttractionDestinations, ...topAttractionExpansionDestinations];
const bySlug = new Map<string, Destination>(catalog.map((destination) => [destination.slug, destination]));

const roadTripsBySlug = new Map<TopTexasAttractionSlug, Array<{ id: string; name: string; duration: string }>>();
for (const trip of TOP_ATTRACTION_ROAD_TRIPS) {
  for (const slug of trip.stops) {
    const trips = roadTripsBySlug.get(slug) ?? [];
    trips.push({ id: trip.id, name: trip.name, duration: trip.duration });
    roadTripsBySlug.set(slug, trips);
  }
}

export type TopAttractionReferenceRow = {
  rank: number;
  slug: TopTexasAttractionSlug;
  name: string;
  canonicalUrl: string;
  nearestTown: string;
  county: string | null;
  region: string;
  category: string;
  recommendedVisit: string;
  physicalEffort: string;
  weatherExposure: string;
  advancePlanning: string;
  familyFit: string;
  firstTimeTexasValue: string;
  sourceCheckedAt: string | null;
  officialUrl: string | null;
  methodologyUrl: string;
  authoritySources: Array<{ label: string; url: string; scope: string }>;
  roadTrips: Array<{ id: string; name: string; duration: string }>;
};

export const TOP_ATTRACTION_REFERENCE_ROWS: readonly TopAttractionReferenceRow[] = TOP_TEXAS_ATTRACTIONS.flatMap((entry) => {
  const base = bySlug.get(entry.slug);
  if (!base) return [];
  const destination = resolveTopAttractionAuthority(base);
  const assessment = destination.authorityGuide?.assessment;
  const authoritySources = destination.authorityGuide?.sources ?? [];
  if (!assessment) return [];
  return [{
    rank: entry.rank,
    slug: entry.slug,
    name: destination.name,
    canonicalUrl: `${siteUrl}/destination/${destination.slug}`,
    nearestTown: destination.nearestTown,
    county: destination.county ?? null,
    region: destination.region,
    category: destination.category,
    recommendedVisit: assessment.recommendedVisit,
    physicalEffort: assessment.physicalEffort,
    weatherExposure: assessment.weatherExposure,
    advancePlanning: assessment.planningLevel,
    familyFit: assessment.familyFit,
    firstTimeTexasValue: assessment.firstTimeValue,
    sourceCheckedAt: destination.sourceCheckedAt ?? null,
    officialUrl: destination.officialUrl ?? null,
    methodologyUrl: TOP_ATTRACTIONS_METHODOLOGY_URL,
    authoritySources: authoritySources.map((source) => ({ ...source })),
    roadTrips: [...(roadTripsBySlug.get(entry.slug) ?? [])],
  }];
});
