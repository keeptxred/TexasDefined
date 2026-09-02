import fs from "node:fs";

const serverResolver = fs.readFileSync("src/data/event-place-links.server.ts", "utf8");
const sharedContract = fs.readFileSync("src/data/event-place-links.ts", "utf8");
const eagerRoute = fs.readFileSync("src/routes/$kind.$slug.tsx", "utf8");
const lazyRoute = fs.readFileSync("src/routes/$kind.$slug.lazy.tsx", "utf8");
const component = fs.readFileSync("src/components/events/PlaceUpcomingEvents.tsx", "utf8");

const failures = [];
const requireMarker = (source, marker, label) => {
  if (!source.includes(marker)) failures.push(`${label} missing: ${marker}`);
};

for (const marker of [
  'loadMajorEventGuideDirectoryServer()',
  '(event.endDate ?? event.startDate) >= today',
  'if (input.kind === "city") return eventCitySlug === input.citySlug;',
  'if (input.kind === "county") return normalizeCountySlug(event.countyName) === input.countySlug;',
  'if (input.kind === "metro-area") return input.citySlugs.has(eventCitySlug);',
  'id.startsWith("city:")',
  'timeZone: "America/Chicago"',
  '.map((event) => [event.href, event])',
  'Math.max(1, Math.min(input.limit ?? 4, 8))',
]) requireMarker(serverResolver, marker, "place-event server resolver");

for (const marker of [
  'export interface PlaceUpcomingEventLink',
  'href: string;',
  'sourceCheckedAt?: string;',
]) requireMarker(sharedContract, marker, "client-safe place-event contract");

for (const marker of [
  'loadUpcomingEventGuidesForPlaceServer',
  'relationshipTargetIds: entity.relationships.map((relationship) => relationship.targetId)',
  'limit: 4',
  'upcomingEvents',
]) requireMarker(eagerRoute, marker, "entity route loader");

for (const marker of [
  'PlaceUpcomingEvents',
  'events={upcomingEvents}',
]) requireMarker(lazyRoute, marker, "entity route UI");

for (const marker of [
  'import type { PlaceUpcomingEventLink } from "@/data/event-place-links";',
  'if (!events.length || !["city", "county", "metro-area"].includes(entityKind)) return null;',
  'key={event.href}',
  'href={event.href}',
  'Source-verified recurring events with permanent Texas Defined planning guides.',
]) requireMarker(component, marker, "place-event component");

if (component.includes("event-place-links.server") || lazyRoute.includes("major-event-directory.server") || lazyRoute.includes("major-event-page.server")) {
  failures.push("client event reverse-link surfaces must not import server-only event authority modules");
}
if (/event\.region\s*===|input\.region|entity\.region/.test(serverResolver)) {
  failures.push("place-event reverse links must not broaden matching to region-wide guesses");
}
if (serverResolver.includes("coordinates") || serverResolver.includes("distance")) {
  failures.push("place-event reverse links must not infer proximity without an explicit geographic relationship");
}

if (failures.length) {
  console.error("Event place reverse-link validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Event place reverse-link validation passed: exact city/county and explicit metro-core-city matching, Texas-local freshness, canonical href dedupe, bounded payloads, and server/client isolation are intact.");
