import type { TexasEvent, TexasRegion } from "../types";

export type TexasEventLifecycleStatus = "scheduled" | "cancelled" | "postponed";
export type TexasEventImageRightsStatus = "verified-reusable" | "official-source-only" | "unknown";
export type TexasEventTicketStatus = "available" | "registration" | "sold-out" | "unknown";

export interface TexasEventTicketOffer {
  name: string;
  url: string;
  price?: number;
  priceCurrency?: "USD";
}

export interface TexasEventTicketingMetadata {
  primaryUrl?: string;
  provider?: string;
  status: TexasEventTicketStatus;
  offers: TexasEventTicketOffer[];
}

export interface TexasEventImageMetadata {
  url: string;
  alt: string;
  sourceUrl: string;
  rightsStatus: TexasEventImageRightsStatus;
  licenseName?: string;
  licenseUrl?: string;
  credit?: string;
  displayAllowed: boolean;
}

export interface TexasEventSportClassification {
  sport?: string;
  league?: string;
  teamIds: string[];
  teamNames: string[];
}

/** Canonical reusable event projection for statewide and contextual event surfaces. */
export interface TexasEventRecord {
  id: string;
  slug: string;
  title: string;
  summary: string;
  guidePath: string;
  startDate: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  venueId?: string;
  venueName?: string;
  venuePath?: string;
  city: string;
  countySlug?: string;
  countyName?: string;
  region: TexasRegion;
  category: TexasEvent["category"];
  sport?: TexasEventSportClassification;
  officialEventUrl: string;
  ticketing?: TexasEventTicketingMetadata;
  image?: TexasEventImageMetadata;
  status: TexasEventLifecycleStatus;
  lastVerifiedAt: string;
  lastUpdatedAt: string;
  sourceName?: string;
}

export interface TexasEventQuery {
  venueId?: string;
  city?: string;
  countySlug?: string;
  region?: TexasRegion;
  category?: TexasEvent["category"];
  statuses?: TexasEventLifecycleStatus[];
  startsOnOrAfter?: string;
  startsOnOrBefore?: string;
  limit?: number;
}

export function selectTexasEventRecords(records: readonly TexasEventRecord[], query: TexasEventQuery = {}) {
  const statuses = query.statuses?.length ? new Set(query.statuses) : null;
  const limit = Math.max(1, Math.min(query.limit ?? 24, 250));
  const normalizedCity = query.city?.trim().toLocaleLowerCase("en-US");

  return records
    .filter((event) => !query.venueId || event.venueId === query.venueId)
    .filter((event) => !normalizedCity || event.city.trim().toLocaleLowerCase("en-US") === normalizedCity)
    .filter((event) => !query.countySlug || event.countySlug === query.countySlug)
    .filter((event) => !query.region || event.region === query.region)
    .filter((event) => !query.category || event.category === query.category)
    .filter((event) => !statuses || statuses.has(event.status))
    .filter((event) => !query.startsOnOrAfter || (event.endDate ?? event.startDate) >= query.startsOnOrAfter)
    .filter((event) => !query.startsOnOrBefore || event.startDate <= query.startsOnOrBefore)
    .sort((left, right) => left.startDate.localeCompare(right.startDate) || left.title.localeCompare(right.title))
    .slice(0, limit);
}

export function eventsForVenue(records: readonly TexasEventRecord[], venueId: string, query: Omit<TexasEventQuery, "venueId"> = {}) {
  return selectTexasEventRecords(records, { ...query, venueId });
}

export function eventsForCity(records: readonly TexasEventRecord[], city: string, query: Omit<TexasEventQuery, "city"> = {}) {
  return selectTexasEventRecords(records, { ...query, city });
}

export function eventsForCounty(records: readonly TexasEventRecord[], countySlug: string, query: Omit<TexasEventQuery, "countySlug"> = {}) {
  return selectTexasEventRecords(records, { ...query, countySlug });
}

export function eventsForRegion(records: readonly TexasEventRecord[], region: TexasRegion, query: Omit<TexasEventQuery, "region"> = {}) {
  return selectTexasEventRecords(records, { ...query, region });
}

export function eventsForCategory(records: readonly TexasEventRecord[], category: TexasEvent["category"], query: Omit<TexasEventQuery, "category"> = {}) {
  return selectTexasEventRecords(records, { ...query, category });
}
