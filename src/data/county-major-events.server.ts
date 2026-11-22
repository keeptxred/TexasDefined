import { buildTexasEventCarouselItemsServer } from "./events/texas-event-calendar.server";
import { loadUpcomingTexasEventRecordsServer } from "./events/texas-event-records.server";
import { loadMajorEventGuideDirectoryServer } from "./major-event-directory.server";
import { getMajorEventRecordServer } from "./major-event-page.server";

export interface CountyMajorEventItem {
  slug: string;
  href: string;
  name: string;
  detail: string;
  startDate: string;
  endDate?: string;
  isUpcoming: boolean;
}

/** Explicit cross-county places; never infer second county membership from city name. */
const additionalCountySlugsByEvent: Readonly<Record<string, readonly string[]>> = {
  "christmas-in-gusherville": ["upshur"],
};

function texasTodayIso(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const get = (kind: "year" | "month" | "day") => parts.find((part) => part.type === kind)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function matchesCounty(eventSlug: string, primary: string | undefined, countySlug: string) {
  return primary === countySlug || (additionalCountySlugsByEvent[eventSlug] ?? []).includes(countySlug);
}

/**
 * County pages retain durable annual event guides after the last confirmed edition.
 * A past date is NEVER relabeled as an upcoming occurrence. Calendar-only local
 * events are included when official/verified future occurrence records exist.
 */
export function loadCountyMajorEventsServer(countySlug: string, now = new Date()): CountyMajorEventItem[] {
  const county = countySlug.trim().toLowerCase();
  const today = texasTodayIso(now);
  // Include an ongoing multi-day event whose first day was earlier than today.
  // The generic upcoming query starts by startDate, which otherwise hides a
  // weekend celebration from its own county page on Saturday or Sunday.
  const upcoming = loadUpcomingTexasEventRecordsServer({
    countySlug: county, startsOnOrAfter: "2000-01-01", limit: 250,
  }).filter((event) => (event.endDate ?? event.startDate) >= today);
  const crossCountyUpcoming = Object.entries(additionalCountySlugsByEvent)
    .filter(([, extra]) => extra.includes(county))
    .flatMap(([slug]) => loadUpcomingTexasEventRecordsServer({ limit: 250 }).filter((event) => event.slug === slug));
  const records = [...upcoming, ...crossCountyUpcoming]
    .filter((event) => event.guidePath.startsWith("/event/") || event.guidePath.startsWith("/events/"));
  const upcomingItems = buildTexasEventCarouselItemsServer(records).map((event) => ({
    slug: event.guidePath.startsWith("/event/") ? event.guidePath.slice("/event/".length) : event.guidePath,
    href: event.guidePath,
    name: event.title,
    detail: `${event.city} · ${event.dateLabel}`,
    startDate: event.startDate,
    endDate: event.endDate,
    isUpcoming: true,
  }));
  const byHref = new Map<string, CountyMajorEventItem>();
  for (const event of upcomingItems) if (!byHref.has(event.href)) byHref.set(event.href, event);

  // The canonical guide directory includes expired editions; this permits annual
  // traditions to stay linked year-round on all 254 county templates.
  for (const guide of loadMajorEventGuideDirectoryServer()) {
    if (!guide.href.startsWith("/event/")) continue;
    const authority = getMajorEventRecordServer(guide.slug);
    if (!matchesCounty(guide.slug, authority?.countySlug, county)) continue;
    if (byHref.has(guide.href)) continue;
    const isUpcoming = (guide.endDate ?? guide.startDate) >= today;
    byHref.set(guide.href, {
      slug: guide.slug,
      href: guide.href,
      name: guide.name,
      detail: isUpcoming
        ? guide.detail
        : `${guide.city} · Last confirmed ${guide.startDate.slice(0, 4)} edition ended; next dates not yet verified`,
      startDate: guide.startDate,
      endDate: guide.endDate,
      isUpcoming,
    });
  }

  const items = [...byHref.values()];
  return items.sort((a, b) =>
    Number(b.isUpcoming) - Number(a.isUpcoming) ||
    (a.isUpcoming ? a.startDate.localeCompare(b.startDate) : b.startDate.localeCompare(a.startDate)) ||
    a.name.localeCompare(b.name)
  ).slice(0, 16);
}
