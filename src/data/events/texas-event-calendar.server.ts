import type { TexasEventRecord } from "./texas-event-record";
import { resolveEventTicketCta } from "./ticketing";

export interface GlobalEventCalendarSearch {
  featured: string;
  location: string;
  start: string;
  end: string;
  category: string;
  venue: string;
}

const categoryLabels: Record<TexasEventRecord["category"], string> = {
  music: "Live Music",
  food: "Food & Drink",
  rodeo: "Rodeo",
  seasonal: "Seasonal",
  sport: "Sports",
  culture: "Arts & Culture",
};

function matchesLocation(event: TexasEventRecord, value: string) {
  if (!value) return true;
  const divider = value.indexOf(":");
  const kind = divider > 0 ? value.slice(0, divider) : "city";
  const target = divider > 0 ? value.slice(divider + 1) : value;
  if (kind === "region") return event.region === target;
  if (kind === "county") return event.countySlug === target;
  return event.city.toLowerCase() === target.toLowerCase();
}

function overlapsRange(event: TexasEventRecord, start: string, end: string) {
  if (!start && !end) return true;
  const lower = start || end;
  const upper = end || start;
  return event.startDate <= upper && (event.endDate ?? event.startDate) >= lower;
}

function validDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function texasTodayIso(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: "year" | "month" | "day") => parts.find((part) => part.type === type)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function monthBounds(monthKey: string) {
  const [year, month] = monthKey.split("-").map(Number);
  const end = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return { start: `${monthKey}-01`, end: `${monthKey}-${String(end).padStart(2, "0")}` };
}

function shiftMonth(monthKey: string, amount: number) {
  const [year, month] = monthKey.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1 + amount, 1));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

function calendarDays(monthKey: string) {
  const [year, month] = monthKey.split("-").map(Number);
  const first = new Date(Date.UTC(year, month - 1, 1));
  const start = new Date(Date.UTC(year, month - 1, 1 - first.getUTCDay()));
  return Array.from({ length: 42 }, (_, index) => new Date(start.getTime() + index * 86400000).toISOString().slice(0, 10));
}

function calendarHref(search: GlobalEventCalendarSearch, dates: { start: string; end: string }) {
  const params = new URLSearchParams();
  const values = {
    featured: search.featured,
    location: search.location,
    category: search.category,
    venue: search.venue,
    ...dates,
  };
  for (const [key, value] of Object.entries(values)) if (value) params.set(key, value);
  const query = params.toString();
  return `/events${query ? `?${query}` : ""}#calendar`;
}

function formatDay(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
}

function formatShortDay(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
}

function formatMonth(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}-01T12:00:00Z`));
}

function formatRange(event: TexasEventRecord) {
  const start = formatDay(event.startDate);
  if (event.endDate && event.endDate !== event.startDate) return `${start}–${formatDay(event.endDate)}`;
  return `${start}${event.startTime ? ` · ${event.startTime}` : ""}`;
}

function formatCarouselRange(event: TexasEventRecord) {
  const start = formatShortDay(event.startDate);
  const end = event.endDate && event.endDate !== event.startDate ? formatShortDay(event.endDate) : "";
  return `${start}${end ? `–${end}` : ""}${event.startTime ? ` · ${event.startTime}` : ""}`;
}

export function buildTexasEventCarouselItemsServer(records: readonly TexasEventRecord[]) {
  return records.map((event) => ({
    ...event,
    categoryLabel: categoryLabels[event.category],
    dateLabel: formatCarouselRange(event),
    locationLabel: `${event.city}${event.venueName ? ` · ${event.venueName}` : ""}`,
    guideLabel: event.guidePath.startsWith("/events?") ? "View in calendar" : "Event guide",
    statusLabel: event.status === "scheduled" ? "" : event.status,
    lastVerifiedLabel: formatShortDay(event.lastVerifiedAt.slice(0, 10)),
    ticketCta: resolveEventTicketCta(event.ticketing),
  }));
}

export function buildGlobalEventCalendarServer(
  records: readonly TexasEventRecord[],
  search: GlobalEventCalendarSearch,
) {
  const today = texasTodayIso();
  const contextMatches = records.filter((event) =>
    (!search.category || event.category === search.category)
    && matchesLocation(event, search.location)
    && (!search.venue || event.venueId === search.venue));
  const filtered = contextMatches.filter((event) => overlapsRange(event, search.start, search.end));
  const displayed = filtered.slice(0, 48);
  const monthKey = validDate(search.start) ? search.start.slice(0, 7) : today.slice(0, 7);
  const { start: monthStart, end: monthEnd } = monthBounds(monthKey);
  const exactDay = search.start && search.start === search.end ? search.start : "";
  const nextEvent = contextMatches.find((event) => (event.endDate ?? event.startDate) >= today);
  const categories = [...new Set(records.map((event) => event.category))].sort();
  const cityOptions = [...new Set(records.map((event) => event.city).filter(Boolean))].sort();
  const countyOptions = [...new Map(records
    .filter((event) => event.countySlug && event.countyName)
    .map((event) => [event.countySlug!, event.countyName!] as const)).entries()]
    .sort((a, b) => a[1].localeCompare(b[1]));
  const venueOptions = [...new Map(records
    .filter((event) => event.venueId && event.venueName)
    .map((event) => [event.venueId!, event.venueName!] as const)).entries()]
    .sort((a, b) => a[1].localeCompare(b[1]));

  return {
    monthLabel: formatMonth(monthKey),
    totalCount: filtered.length,
    dateSummary: exactDay
      ? `Selected ${formatDay(exactDay)}.`
      : search.start || search.end
        ? `${formatDay(search.start || monthStart)} through ${formatDay(search.end || search.start || monthEnd)}.`
        : "Showing the source-qualified upcoming calendar.",
    resultsHeading: exactDay ? `Events on ${formatDay(exactDay)}` : "Events matching this view",
    truncated: filtered.length > displayed.length,
    showClearDates: Boolean(search.start || search.end),
    previousHref: calendarHref(search, monthBounds(shiftMonth(monthKey, -1))),
    todayHref: calendarHref(search, { start: today, end: today }),
    nextHref: calendarHref(search, monthBounds(shiftMonth(monthKey, 1))),
    clearDatesHref: calendarHref(search, { start: "", end: "" }),
    nextEventHref: nextEvent ? calendarHref(search, { start: nextEvent.startDate, end: nextEvent.startDate }) : "",
    categories,
    cityOptions,
    countyOptions,
    venueOptions,
    calendarDays: calendarDays(monthKey).map((day) => {
      const count = contextMatches.filter((event) => event.startDate <= day && (event.endDate ?? event.startDate) >= day).length;
      return {
        date: day,
        dayNumber: Number(day.slice(8)),
        count,
        inMonth: day >= monthStart && day <= monthEnd,
        selected: day === exactDay,
        href: calendarHref(search, { start: day, end: day }),
        ariaLabel: `${formatDay(day)}${count ? `, ${count} events` : ", no events"}`,
      };
    }),
    results: displayed.map((event) => ({
      ...event,
      dateLabel: formatRange(event),
      lastVerifiedLabel: formatDay(event.lastVerifiedAt.slice(0, 10)),
      ticketCta: resolveEventTicketCta(event.ticketing),
    })),
  };
}
