import type { TexasEntityKind } from "./knowledge-graph/types";
import { loadMajorEventGuideDirectoryServer, type MajorEventGuideDirectoryItem } from "./major-event-directory.server";

export interface PlaceUpcomingEventLink extends Pick<MajorEventGuideDirectoryItem,
  "slug" | "href" | "name" | "city" | "countyName" | "region" | "category" | "detail" | "startDate" | "endDate" | "sourceCheckedAt"
> {}

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
): PlaceUpcomingEventLink[] {
  if (!isSupportedPlaceKind(input.kind)) return [];

  const today = texasTodayIso(now);
  const citySlugs = input.kind === "metro-area"
    ? new Set((input.relationshipTargetIds ?? []).filter((id) => id.startsWith("city:")).map((id) => id.slice("city:".length)))
    : new Set<string>();
  const countySlug = input.kind === "county" ? normalizeSlug(input.slug.replace(/-county$/, "")) : undefined;
  const citySlug = input.kind === "city" ? normalizeSlug(input.slug) : undefined;
  const limit = Math.max(1, Math.min(input.limit ?? 4, 8));

  return [...new Map(
    loadMajorEventGuideDirectoryServer()
      .filter((event) => (event.endDate ?? event.startDate) >= today)
      .filter((event) => matchesPlace(event, { kind: input.kind, citySlug, countySlug, citySlugs }))
      .sort((left, right) => left.startDate.localeCompare(right.startDate) || left.name.localeCompare(right.name))
      .map((event) => [event.href, event]),
  ).values()].slice(0, limit);
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
