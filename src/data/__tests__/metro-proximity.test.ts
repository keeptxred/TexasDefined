import assert from "node:assert/strict";
import { test } from "node:test";

import { selectMetroProximityAffiliateEvents } from "../metro-proximity-event-selection.ts";
import {
  METRO_PROXIMITY_COLLECTIONS,
  getMetroProximityCollection,
  getMetroProximityMetro,
  isMetroProximityCollectionIndexReady,
  selectMetroProximityDestinations,
  type MetroProximityResult,
} from "../metro-proximity.ts";
import type { CategorySlug, Destination } from "../types.ts";

const hero = { src: "/images/test.jpg", alt: "Test place", width: 1200, height: 800 };

function destination(
  index: number,
  category: CategorySlug,
  overrides: Partial<Destination> = {},
): Destination {
  return {
    id: `test-${index}`,
    brandId: "texasdefined",
    slug: `test-place-${index}`,
    name: `Test Place ${index}`,
    summary: `Test Place ${index} has enough destination-specific planning context to satisfy the metro-proximity quality floor while exercising geographic diversity and search-intent filtering.`,
    category,
    region: "gulf-coast",
    nearestTown: `Town ${index % 8}`,
    county: `County ${index % 4}`,
    coordinates: { lat: 29.7604 + ((index % 6) * 0.08), lng: -95.3698 + ((index % 5) * 0.07) },
    hero,
    bestSeason: "Fall through spring for comfortable conditions.",
    entryNote: "Verify current access and hours before traveling.",
    highlights: ["local character", "outdoor stop", "day trip"],
    body: ["A sufficiently detailed destination body for deterministic testing."],
    ...overrides,
  };
}

function event(
  id: string,
  title: string,
  city: string,
  affiliate = true,
  href = "https://tickets.example.com/event",
  startDate = "2026-10-03",
) {
  return {
    id,
    title,
    city,
    startDate,
    endDate: null,
    ticketCta: { href, isAffiliate: affiliate },
  };
}

test("unknown metro and collection slugs fail closed", () => {
  assert.equal(getMetroProximityMetro("not-a-metro"), undefined);
  assert.equal(getMetroProximityCollection("not-a-collection"), undefined);
});

test("small-town hour-intent rings are non-overlapping", () => {
  const one = getMetroProximityCollection("small-towns-1-hour")!;
  const two = getMetroProximityCollection("small-towns-2-hours")!;
  const three = getMetroProximityCollection("small-towns-3-hours")!;
  assert.equal(one.radiusMiles, two.minimumMiles);
  assert.equal(two.radiusMiles, three.minimumMiles);
  assert.ok(one.minimumMiles < one.radiusMiles);
  assert.ok(two.minimumMiles < two.radiusMiles);
  assert.ok(three.minimumMiles < three.radiusMiles);
});

test("duplicate destination slugs cannot inflate collection inventory", () => {
  const metro = getMetroProximityMetro("houston")!;
  const collection = getMetroProximityCollection("things-to-do")!;
  const place = destination(1, "small-towns");
  const rows = selectMetroProximityDestinations([place, place, place], metro, collection);
  assert.equal(rows.length, 1);
});

test("swimming-hole intent requires water-use language, not only a broad outdoor category", () => {
  const metro = getMetroProximityMetro("houston")!;
  const collection = getMetroProximityCollection("swimming-holes")!;
  const swimming = destination(1, "state-parks", { summary: "A spring-fed swimming pool and tubing destination with enough detailed visitor context for families planning a summer water day near Houston." });
  const dry = destination(2, "outdoors", { summary: "A dry prairie hiking preserve with birding trails and enough detailed visitor context, but no designated aquatic recreation or water access." });
  const rows = selectMetroProximityDestinations([swimming, dry], metro, collection);
  assert.deepEqual(rows.map((row) => row.destination.slug), [swimming.slug]);
});

test("thin or geographically narrow collections remain noindex", () => {
  const metro = getMetroProximityMetro("houston")!;
  const collection = getMetroProximityCollection("things-to-do")!;
  const thin = Array.from({ length: collection.minResults }, (_, index) =>
    destination(index + 1, "small-towns", { county: "One County", nearestTown: "One Town" }),
  );
  assert.equal(isMetroProximityCollectionIndexReady(thin, metro, collection), false);
});

test("substantive, diverse inventory can clear the index gate", () => {
  const metro = getMetroProximityMetro("houston")!;
  const collection = getMetroProximityCollection("things-to-do")!;
  const categories: CategorySlug[] = ["small-towns", "state-parks", "lakes-rivers", "historic-sites"];
  const rows = Array.from({ length: 16 }, (_, index) =>
    destination(index + 1, categories[index % categories.length], {
      nearestTown: `Town ${index % 10}`,
      county: `County ${index % 5}`,
    }),
  );
  assert.equal(isMetroProximityCollectionIndexReady(rows, metro, collection), true);
});

test("launch registry includes requested trip-intent expansions", () => {
  const slugs = new Set(METRO_PROXIMITY_COLLECTIONS.map((collection) => collection.slug));
  for (const slug of [
    "weekend-trips",
    "road-trips",
    "small-towns-1-hour",
    "small-towns-2-hours",
    "small-towns-3-hours",
    "lakes",
    "swimming-holes",
  ]) assert.ok(slugs.has(slug as never), `missing ${slug}`);
});

test("things-to-do event selection stays geographic, fresh, useful without tickets and affiliate-safe", () => {
  const metro = getMetroProximityMetro("houston")!;
  const collection = getMetroProximityCollection("things-to-do")!;
  const galveston = destination(20, "small-towns", { name: "Galveston", nearestTown: "Galveston" });
  const results: MetroProximityResult[] = [
    { destination: galveston, distanceMiles: 47, distanceBand: "easy-day-trip" },
  ];
  const noTicket = { ...event("free", "Free Festival", "Houston"), ticketCta: null };
  const selected = selectMetroProximityAffiliateEvents(metro, collection, results, [
    event("houston", "Houston Show", "Houston"),
    event("galveston-a", "Island Festival", "Galveston"),
    event("galveston-b", "Island Festival", "Galveston"),
    event("austin", "Austin Show", "Austin"),
    event("official", "Official Only", "Houston", false),
    event("unsafe", "Unsafe Affiliate", "Houston", true, "javascript:alert(1)"),
    noTicket,
    event("past", "Past Show", "Houston", true, "https://tickets.example.com/past", "2026-09-29"),
    event("future", "Far Future Show", "Houston", true, "https://tickets.example.com/future", "2026-10-15"),
  ], { todayIso: "2026-09-30", horizonIso: "2026-10-14" });
  assert.deepEqual(selected.map((item) => item.id), ["houston", "galveston-a", "official", "unsafe", "free"]);
  assert.equal(selected.find((item) => item.id === "houston")?.ticketCta?.isAffiliate, true);
  assert.equal(selected.find((item) => item.id === "official")?.ticketCta, null);
  assert.equal(selected.find((item) => item.id === "unsafe")?.ticketCta, null);
  assert.equal(selected.find((item) => item.id === "free")?.ticketCta, null);
});

test("ongoing events remain eligible when their end date is current", () => {
  const metro = getMetroProximityMetro("houston")!;
  const collection = getMetroProximityCollection("things-to-do")!;
  const ongoing = { ...event("ongoing", "Ongoing Fair", "Houston", true, "https://tickets.example.com/ongoing", "2026-09-28"), endDate: "2026-10-02" };
  const selected = selectMetroProximityAffiliateEvents(metro, collection, [], [ongoing], { todayIso: "2026-09-30", horizonIso: "2026-10-14" });
  assert.deepEqual(selected.map((item) => item.id), ["ongoing"]);
});

test("weekend-trip event selection is limited to destination towns and other intents remain event-free", () => {
  const metro = getMetroProximityMetro("houston")!;
  const weekend = getMetroProximityCollection("weekend-trips")!;
  const dayTrips = getMetroProximityCollection("day-trips")!;
  const brenham = destination(21, "small-towns", { name: "Brenham", nearestTown: "Brenham" });
  const results: MetroProximityResult[] = [
    { destination: brenham, distanceMiles: 75, distanceBand: "easy-day-trip" },
  ];
  const candidates = [
    event("houston", "Houston Show", "Houston"),
    event("brenham", "Brenham Festival", "Brenham"),
  ];
  assert.deepEqual(selectMetroProximityAffiliateEvents(metro, weekend, results, candidates).map((item) => item.id), ["brenham"]);
  assert.deepEqual(selectMetroProximityAffiliateEvents(metro, dayTrips, results, candidates), []);
});
