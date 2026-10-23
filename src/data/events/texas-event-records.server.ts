import { getGeneratedTexasEvents } from "../events-generated";
import { loadTicketmasterEventsServer } from "./ticketmaster-events.server";
import { getOfficialVenueEventSnapshots } from "./official-venue-events.server";
import { getVerifiedChristmasCommunityEvents2026 } from "./christmas-community-2026.server";
import { loadTpwdEventRecordsServer } from "./tpwd-event-records.server";
import { loadMajorEventGuideDirectoryServer, type MajorEventGuideDirectoryItem } from "../major-event-directory.server";
import { getMajorEventRecordServer, getMajorEventOccurrenceWindowsServer } from "../major-event-page.server";
import {
  getMajorEventSchemaEnrichmentServer,
  isCompliantMajorEventImage,
  getMajorEventSchemaOccurrenceEnrichmentServer,
  type EventSchemaOffer,
  type MajorEventSchemaEnrichment,
} from "../major-event-schema-enrichment.server";
import { getSportsVenuePhoto } from "../sports-venue-images-all";
import { resolveSportsVenueEventLink } from "../sports-venue-event-links";
import type { TexasEvent } from "../types";
import { mergeEventTicketing } from "./ticketing";
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
  const uniqueTicketUrls = [...new Set(offers.map((offer) => offer.url))];
  return {
    links: uniqueTicketUrls.map((url, index) => ({
      provider: "official",
      officialTicketUrl: url,
      saleStatus: "unknown",
      source: {
        kind: "official-event",
        name: sourceName ?? "Official event ticket source",
        url,
      },
      lastVerifiedAt,
      priority: index,
    })),
    offers: offers.map((offer) => ({ name: offer.name, url: offer.url, price: offer.price, priceCurrency: offer.priceCurrency })),
  };
}

function buildEventImage(enrichment: MajorEventSchemaEnrichment | null): TexasEventImageMetadata | undefined {
  if (!enrichment?.image) return undefined;
  // Authority-page imagery already passes the event source/rights/exact-location
  // validator. Reuse the SAME decision for calendar and carousel cards; neither
  // blindly suppress approved imagery nor infer permission from an image URL.
  const image = enrichment.image;
  const approved = isCompliantMajorEventImage(image);
  return {
    url: image.url,
    alt: image.alt,
    sourceUrl: image.sourceUrl,
    rightsStatus: approved ? "verified-reusable" : "unknown",
    licenseName: approved ? image.licenseName : undefined,
    licenseUrl: approved ? image.licenseUrl : undefined,
    credit: approved ? image.rightsNote : undefined,
    displayAllowed: approved,
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
  const occurrenceLabel = authority?.occurrenceWindows?.find((window) =>
    window.startDate === startDate && (window.endDate ?? window.startDate) === (endDate ?? startDate)
  )?.label;
  const lifecycle = getMajorEventSchemaOccurrenceEnrichmentServer(authoritySlug, occurrenceLabel)?.lifecycle;

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
    status: lifecycle?.status ?? "scheduled",
    lastVerifiedAt,
    lastUpdatedAt: [enrichment?.verifiedAt, lifecycle?.verifiedAt, lastVerifiedAt].filter((value): value is string => Boolean(value)).sort().at(-1) ?? lastVerifiedAt,
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

  // These destination guides are indexable, but have non-contiguous ticketed
  // operating nights. The separate community occurrence records below are the
  // authoritative day-by-day calendar; never fill in the closed nights between.
  const occurrenceWindowOnlyGuides = new Set([
    "grapevine-north-pole-express", "dallas-zoo-lights",
  ]);
  for (const guide of guides) {
    if (occurrenceWindowOnlyGuides.has(guide.slug)) continue;
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

  // A season envelope is NOT evidence of operation every day inside it.
  // Expand sourced multi-window seasonal authorities into their exact
  // date windows before the shared calendar counts days or accepts tickets.
  // This also fixes Main Street Bethlehem's two discrete December weekends.
  const windowScopedRecords = records.flatMap((record) => {
    if (record.category !== "seasonal") return [record];
    const authority = getMajorEventRecordServer(record.slug);
    if (!authority) return [record];
    const windows = getMajorEventOccurrenceWindowsServer(authority);
    if (windows.length <= 1) return [record];
    return windows.map((window, index) => ({
      ...record,
      id: `${record.id}:verified-window-${index + 1}`,
      startDate: window.startDate,
      endDate: window.endDate,
      // A single scheduled event time must never be projected onto every
      // holiday date window, where the operating hours can be different.
      startTime: undefined,
    }));
  });
  records.splice(0, records.length, ...windowScopedRecords);

  // Small-town and community holiday attractions use the same verified,
  // date-scoped calendar pipeline as major event guides. These are calendar
  // occurrences, not thin automatically generated authority pages.
  const knownCommunity = new Set(records.map((record) => `${eventIdentity(record.title, record.city)}:${record.startDate}`));
  // These attractions already have a single continuous-season authority record.
  // Do not show a duplicate ticketed attraction from the calendar-first intake.
  const authorityCoveredCommunity = new Set([
    "johnson-city-lights-spectacular",
    "grand-prairie-prairie-lights",
    "moody-gardens-holiday-lights-trail",
  ]);
  for (const holiday of getVerifiedChristmasCommunityEvents2026()) {
    if (authorityCoveredCommunity.has(holiday.slug)) continue;
    const key = `${eventIdentity(holiday.title, holiday.city)}:${holiday.startDate}`;
    if (knownCommunity.has(key)) continue;
    records.push(holiday);
    knownCommunity.add(key);
  }

  // Curated primary-source event snapshots fill documented gaps in the
  // statewide registry. Avoid duplicates when other ingestion catches up.
  const knownEvents = new Set(records.map((record) =>
    `${record.venueId ?? ""}:${record.startDate}:${record.title.toLowerCase()}`));
  for (const snapshot of getOfficialVenueEventSnapshots()) {
    const key = `${snapshot.venueId ?? ""}:${snapshot.startDate}:${snapshot.title.toLowerCase()}`;
    if (!knownEvents.has(key)) {
      records.push(snapshot);
      knownEvents.add(key);
    }
  }

  // TPWD activities live inside the shared calendar and on known park destinations.
  // These short-lived factual links never create thin standalone event routes.
  const knownActivities = new Set(records.map(record =>
    `${eventIdentity(record.title, record.city)}:${record.startDate}:${record.venueId ?? ""}`));
  for (const activity of loadTpwdEventRecordsServer()) {
    const key = `${eventIdentity(activity.title, activity.city)}:${activity.startDate}:${activity.venueId ?? ""}`;
    if (knownActivities.has(key)) continue;
    records.push(activity);
    knownActivities.add(key);
  }

  // Preserve the reviewed editorial record when Ticketmaster has the same event,
  // but merge its current affiliate ticketing so richer authority coverage does not
  // suppress monetizable provider inventory.
  const existing = new Map(records.map((record, index) => [`${eventIdentity(record.title, record.city)}:${record.startDate}`, index] as const));
  for (const providerRecord of loadTicketmasterEventsServer()) {
    const key = `${eventIdentity(providerRecord.title, providerRecord.city)}:${providerRecord.startDate}`;
    const index = existing.get(key);
    if (index === undefined) {
      existing.set(key, records.length);
      records.push(providerRecord);
      continue;
    }

    const editorialRecord = records[index];
    records[index] = {
      ...editorialRecord,
      startTime: editorialRecord.startTime ?? providerRecord.startTime,
      venueId: editorialRecord.venueId ?? providerRecord.venueId,
      venueName: editorialRecord.venueName ?? providerRecord.venueName,
      venuePath: editorialRecord.venuePath ?? providerRecord.venuePath,
      ticketing: mergeEventTicketing(editorialRecord.ticketing, providerRecord.ticketing),
      lastUpdatedAt: [editorialRecord.lastUpdatedAt, providerRecord.lastUpdatedAt].sort().at(-1) ?? editorialRecord.lastUpdatedAt,
    };
  }
  return [...new Map(records.map((record) => [record.id, record] as const)).values()]
    .sort((left, right) => left.startDate.localeCompare(right.startDate) || left.title.localeCompare(right.title));
}

export function queryTexasEventRecordsServer(query: TexasEventQuery = {}) {
  return selectTexasEventRecords(loadTexasEventRecordsServer(), query);
}

/** Keep the full inventory on the server so later dates/cities survive filtering.
 * The calendar projection still returns at most 48 results and 12 carousel items.
 */
export function loadUpcomingTexasCalendarRecordsServer() {
  const today = texasTodayIso();
  return loadTexasEventRecordsServer().filter(record =>
    (record.endDate ?? record.startDate) >= today && record.status !== "cancelled");
}

export function loadUpcomingTexasEventRecordsServer(query: TexasEventQuery = {}) {
  return queryTexasEventRecordsServer({
    ...query,
    startsOnOrAfter: query.startsOnOrAfter ?? texasTodayIso(),
    statuses: query.statuses ?? ["scheduled", "postponed", "rescheduled"],
  });
}
