import { getGeneratedTexasEvents } from "../events-generated";
import { loadMajorEventGuideDirectoryServer, type MajorEventGuideDirectoryItem } from "../major-event-directory.server";
import { getMajorEventRecordServer } from "../major-event-page.server";
import {
  getMajorEventSchemaEnrichmentServer,
  type EventSchemaOffer,
  type MajorEventSchemaEnrichment,
} from "../major-event-schema-enrichment.server";
import { getSportsVenuePhoto } from "../sports-venue-images";
import { resolveSportsVenueEventLink } from "../sports-venue-event-links";
import type { TexasEvent } from "../types";
import {
  selectTexasEventRecords,
  type TexasEventImageMetadata,
  type TexasEventQuery,
  type TexasEventRecord,
  type TexasEventTicketingMetadata,
} from "./texas-event-record";

function texasTodayIso(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = (type: "year" | "month" | "day") => parts.find((part) => part.type === type)?.value ?? "00";
  return `${value("year")}-${value("month")}-${value("day")}`;
}

function countySlugFromName(value: string | undefined) {
  if (!value) return undefined;
  return value.replace(/\s+County$/i, "").normalize("NFKD").toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function baseEventSlug(value: string) {
  return value.replace(/-\d{4}-\d{2}-\d{2}$/, "");
}

function eventIdentity(name: string, city: string) {
  return `${name.trim().toLowerCase()}:${city.trim().toLowerCase()}`;
}

function buildTicketing(offers: EventSchemaOffer[] | undefined, lastVerifiedAt: string, sourceName?: string): TexasEventTicketingMetadata | undefined {
  if (!offers?.length) return undefined;
  return {
    links: offers.map((offer, index) => ({
      provider: "official",
      officialTicketUrl: offer.url,
      saleStatus: "unknown",
      source: {
        kind: "official-event",
        name: sourceName ?? "Official event ticket source",
        url: offer.url,
      },
      lastVerifiedAt,
      priority: index,
    })),
    offers: offers.map((offer) => ({ name: offer.name, url: offer.url, price: offer.price, priceCurrency: offer.priceCurrency })),
  };
}

function buildEventImage(enrichment: MajorEventSchemaEnrichment | null): TexasEventImageMetadata | undefined {
  if (!enrichment?.image) return undefined;
  return {
    url: enrichment.image.url,
    alt: enrichment.image.alt,
    sourceUrl: enrichment.image.sourceUrl,
    rightsStatus: "unknown",
    displayAllowed: false,
  };
}

function buildDisplayImage(enrichment: MajorEventSchemaEnrichment | null, venueSlug: string | undefined): TexasEventImageMetadata | undefined {
  const eventImage = buildEventImage(enrichment);
  if (eventImage?.displayAllowed || !venueSlug) return eventImage;
  const photo = getSportsVenuePhoto(venueSlug);
  if (!photo) return eventImage;
  return {
    url: photo.imageUrl,
    alt: photo.alt,
    sourceUrl: photo.sourcePage,
    rightsStatus: "verified-reusable",
    licenseName: photo.licenseName,
    licenseUrl: photo.licenseUrl,
    credit: photo.author,
    displayAllowed: true,
  };
}

function normalizeEvent(event: TexasEvent, guide?: MajorEventGuideDirectoryItem): TexasEventRecord | null {
  const authoritySlug = guide?.slug ?? baseEventSlug(event.slug);
  const authority = getMajorEventRecordServer(authoritySlug);
  const officialEventUrl = authority?.officialUrl ?? event.officialUrl;
  const lastVerifiedAt = authority?.sourceCheckedAt ?? guide?.sourceCheckedAt ?? event.sourceCheckedAt;
  if (!officialEventUrl || !lastVerifiedAt) return null;

  const venueText = authority?.venue ?? event.venue;
  const venueLink = resolveSportsVenueEventLink(venueText);
  const venueSlug = venueLink?.href.split("/").filter(Boolean).at(-1);
  const enrichment = getMajorEventSchemaEnrichmentServer(authoritySlug);
  const countyName = authority?.countyName ?? guide?.countyName;
  const startDate = guide?.startDate ?? event.startDate;
  const endDate = guide?.endDate ?? event.endDate;
  const calendarPath = `/events?start=${startDate}&end=${endDate ?? startDate}`;

  return {
    id: event.id || `event:${authoritySlug}:${startDate}`,
    slug: authoritySlug,
    title: guide?.name ?? authority?.name ?? event.name,
    summary: authority?.whyItMatters ?? event.blurb ?? guide?.detail ?? "",
    guidePath: guide?.href ?? calendarPath,
    startDate,
    endDate,
    venueId: venueSlug ? `sports-venue:${venueSlug}` : undefined,
    venueName: venueLink?.venueName ?? venueText,
    venuePath: venueLink?.href,
    city: guide?.city ?? authority?.city ?? event.city,
    countySlug: authority?.countySlug ?? countySlugFromName(countyName),
    countyName,
    region: guide?.region ?? authority?.region ?? event.region,
    category: guide?.category ?? authority?.category ?? event.category,
    officialEventUrl,
    ticketing: buildTicketing(enrichment?.offers, enrichment?.verifiedAt ?? lastVerifiedAt, event.sourceName ?? authority?.sources[0]?.label),
    image: buildDisplayImage(enrichment, venueSlug),
    status: "scheduled",
    lastVerifiedAt,
    lastUpdatedAt: enrichment?.verifiedAt ?? lastVerifiedAt,
    sourceName: event.sourceName ?? authority?.sources[0]?.label,
  };
}

/** Normalize every source-qualified upcoming event into one reusable server-side shape. */
export function loadTexasEventRecordsServer(): TexasEventRecord[] {
  const guides = loadMajorEventGuideDirectoryServer();
  const guideBySlug = new Map(guides.map((guide) => [guide.slug, guide] as const));
  const guideByIdentity = new Map(guides.map((guide) => [eventIdentity(guide.name, guide.city), guide] as const));
  const seenGuides = new Set<string>();
  const records: TexasEventRecord[] = [];

  for (const event of getGeneratedTexasEvents(500)) {
    const guide = guideBySlug.get(baseEventSlug(event.slug)) ?? guideByIdentity.get(eventIdentity(event.name, event.city));
    if (guide) seenGuides.add(guide.slug);
    const record = normalizeEvent(event, guide);
    if (record) records.push(record);
  }

  for (const guide of guides) {
    if (seenGuides.has(guide.slug)) continue;
    const authority = getMajorEventRecordServer(guide.slug);
    const officialUrl = authority?.officialUrl;
    if (!officialUrl) continue;
    const record = normalizeEvent({
      id: `authority:${guide.slug}`,
      brandId: "texasdefined",
      slug: guide.slug,
      name: guide.name,
      blurb: guide.detail,
      city: guide.city,
      region: guide.region,
      startDate: guide.startDate,
      endDate: guide.endDate,
      category: guide.category,
      venue: authority?.venue,
      officialUrl,
      sourceName: authority?.sources[0]?.label,
      sourceCheckedAt: authority?.sourceCheckedAt ?? guide.sourceCheckedAt,
    }, guide);
    if (record) records.push(record);
  }

  return [...new Map(records.map((record) => [record.id, record] as const)).values()]
    .sort((left, right) => left.startDate.localeCompare(right.startDate) || left.title.localeCompare(right.title));
}

export function queryTexasEventRecordsServer(query: TexasEventQuery = {}) {
  return selectTexasEventRecords(loadTexasEventRecordsServer(), query);
}

export function loadUpcomingTexasEventRecordsServer(query: TexasEventQuery = {}) {
  return queryTexasEventRecordsServer({
    ...query,
    startsOnOrAfter: query.startsOnOrAfter ?? texasTodayIso(),
    statuses: query.statuses ?? ["scheduled", "postponed"],
  });
}
