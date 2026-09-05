import type { TexasEntityKind } from "./knowledge-graph/types";
import type { PlaceUpcomingEventPayload } from "./event-place-links";
import { loadMajorEventGuideDirectoryServer, type MajorEventGuideDirectoryItem } from "./major-event-directory.server";

interface PlaceEventLinkInput {
  kind: TexasEntityKind;
  name: string;
  slug: string;
  relationshipTargetIds?: string[];
  limit?: number;
}

export function loadUpcomingEventGuidesForPlaceServer(
  input: PlaceEventLinkInput,
  now = new Date(),
): PlaceUpcomingEventPayload {
  if (!isSupportedPlaceKind(input.kind)) return { html: "", count: 0 };

  const today = texasTodayIso(now);
  const citySlugs = input.kind === "metro-area"
    ? new Set((input.relationshipTargetIds ?? []).filter((id) => id.startsWith("city:")).map((id) => id.slice("city:".length)))
    : new Set<string>();
  const countySlug = input.kind === "county" ? normalizeSlug(input.slug.replace(/-county$/, "")) : undefined;
  const citySlug = input.kind === "city" ? normalizeSlug(input.slug) : undefined;
  const limit = Math.max(1, Math.min(input.limit ?? 4, 8));
  const events = [...new Map(
    loadMajorEventGuideDirectoryServer()
      .filter((event) => (event.endDate ?? event.startDate) >= today)
      .filter((event) => matchesPlace(event, { kind: input.kind, citySlug, countySlug, citySlugs }))
      .sort((left, right) => left.startDate.localeCompare(right.startDate) || left.name.localeCompare(right.name))
      .map((event) => [event.href, event]),
  ).values()].slice(0, limit);

  if (!events.length) return { html: "", count: 0 };
  const placeLabel = input.kind === "county" && !/ County$/i.test(input.name) ? `${input.name} County` : input.name;
  const cards = events.map((event) => `<a href="${esc(event.href)}" class="group bg-background p-5"><span class="eyebrow text-primary">${esc(eventCategoryLabel(event.category))}</span><strong class="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">${esc(event.name)}</strong><span class="mt-3 block text-sm leading-6 text-muted-foreground">${esc(event.detail)}</span><span class="mt-4 block text-sm font-semibold text-primary">Plan the event →</span></a>`).join("");
  const html = `<section class="border-b border-border py-10"><div class="grid gap-6 lg:grid-cols-[14rem_1fr] lg:items-start"><div><p class="eyebrow text-primary">Upcoming events</p><h2 class="mt-2 font-display text-3xl">Events in ${esc(placeLabel)}</h2><p class="mt-4 text-sm leading-6 text-muted-foreground">Source-verified recurring events with permanent Texas Defined planning guides.</p></div><div class="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">${cards}</div></div></section>`;
  return { html, count: events.length };
}

function matchesPlace(
  event: MajorEventGuideDirectoryItem,
  input: { kind: TexasEntityKind; citySlug?: string; countySlug?: string; citySlugs: Set<string> },
) {
  const eventCitySlug = normalizeSlug(event.city);
  if (input.kind === "city") return eventCitySlug === input.citySlug;
  if (input.kind === "county") return normalizeCountySlug(event.countyName) === input.countySlug;
  if (input.kind === "metro-area") return input.citySlugs.has(eventCitySlug);
  return false;
}

function isSupportedPlaceKind(kind: TexasEntityKind) {
  return kind === "city" || kind === "county" || kind === "metro-area";
}

function eventCategoryLabel(category: MajorEventGuideDirectoryItem["category"]) {
  return ({ music: "Live music", food: "Food & drink", rodeo: "Rodeo & western", seasonal: "Seasonal tradition", sport: "Sports event", culture: "Arts & culture" } as const)[category];
}

function esc(value: string | undefined) {
  return (value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
}

function normalizeCountySlug(value?: string) {
  if (!value) return undefined;
  return normalizeSlug(value.replace(/\s+County$/i, "").replace(/-county$/i, ""));
}

function normalizeSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function texasTodayIso(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = (type: "year" | "month" | "day") => parts.find((part) => part.type === type)?.value ?? "00";
  return `${value("year")}-${value("month")}-${value("day")}`;
}
