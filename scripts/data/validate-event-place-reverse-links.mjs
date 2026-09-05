import fs from "node:fs";

const serverResolver = fs.readFileSync("src/data/event-place-links.server.ts", "utf8");
const serverFunction = fs.readFileSync("src/data/event-place-links.functions.ts", "utf8");
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
  'return { html, count: events.length };',
]) requireMarker(serverResolver, marker, "place-event server resolver");

for (const marker of [
  'createServerFn({ method: "GET" })',
  '.inputValidator((input: PlaceEventLinkInput) => input)',
  '.handler(async ({ data }) => loadUpcomingEventGuidesForPlaceServer(data))',
]) requireMarker(serverFunction, marker, "place-event server-function bridge");

for (const marker of [
  'export interface PlaceUpcomingEventPayload',
  'html: string;',
  'count: number;',
]) requireMarker(sharedContract, marker, "client-safe place-event contract");

for (const marker of [
  'getUpcomingEventGuidesForPlace',
  'await getUpcomingEventGuidesForPlace({ data: {',
  'relationshipTargetIds: entity.relationships.map((relationship) => relationship.targetId)',
  'limit: 4',
  'upcomingEvents',
]) requireMarker(eagerRoute, marker, "entity route loader");

for (const marker of [
  'PlaceUpcomingEvents',
  'events={upcomingEvents}',
]) requireMarker(lazyRoute, marker, "entity route UI");

for (const marker of [
  'import type { PlaceUpcomingEventPayload } from "@/data/event-place-links";',
  'if (!events.count || !["city", "county", "metro-area"].includes(entityKind)) return null;',
  'dangerouslySetInnerHTML={{ __html: events.html }}',
]) requireMarker(component, marker, "place-event component");

if (eagerRoute.includes("event-place-links.server") || component.includes("event-place-links.server") || lazyRoute.includes("major-event-directory.server") || lazyRoute.includes("major-event-page.server")) {
  failures.push("route/client event reverse-link surfaces must not import server-only event authority modules directly");
}
if (!serverFunction.includes('from "./event-place-links.server"')) {
  failures.push("only the server-function bridge should import the server-only place-event resolver");
}
if (/event\.region\s*===|input\.region|entity\.region/.test(serverResolver)) {
  failures.push("place-event reverse links must not broaden matching to region-wide guesses");
}
if (serverResolver.includes("coordinates") || serverResolver.includes("distance")) {
  failures.push("place-event reverse links must not infer proximity without an explicit geographic relationship");
}
if (!serverResolver.includes('replace(/&/g, "&amp;")')) {
  failures.push("server-rendered event link HTML must escape dynamic text");
}

if (failures.length) {
  console.error("Event place reverse-link validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Event place reverse-link validation passed: exact city/county and explicit metro-core-city matching, Texas-local freshness, canonical href dedupe, bounded server-rendered payloads, createServerFn isolation, escaping, and client-safe rendering are intact.");
