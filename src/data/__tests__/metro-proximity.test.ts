import assert from "node:assert/strict";
import { test } from "node:test";

import {
  METRO_PROXIMITY_METROS,
  METRO_PROXIMITY_ROUTES,
  countySlug,
  isMetroProximityPageIndexReady,
  metroProximityRoute,
  resolveMetroProximityPage,
  straightLineMiles,
} from "../metro-proximity.ts";
import type { Destination } from "../types.ts";

const hero = { src: "/images/test.jpg", alt: "Test destination", width: 1200, height: 800 };

function destination(index: number, overrides: Partial<Destination> = {}): Destination {
  return {
    id: `test-${index}`,
    brandId: "texasdefined",
    slug: `test-place-${index}`,
    name: `Test Place ${index}`,
    summary: `Test Place ${index} has enough destination-specific planning context to clear the metro-proximity summary quality guard for this deterministic unit test.`,
    category: "small-towns",
    region: "gulf-coast",
    nearestTown: `Town ${index}`,
    county: `County ${index}`,
    coordinates: { lat: 29.7604 + (index * 0.08), lng: -95.3698 },
    hero,
    bestSeason: "Fall through spring for comfortable outdoor conditions.",
    entryNote: "Check current hours and access before leaving.",
    highlights: ["historic downtown", "local food", "parks"],
    body: ["A sufficiently detailed destination body."],
    ...overrides,
  };
}

test("launch inventory creates exactly eight governed landing patterns for each of four metros", () => {
  assert.equal(METRO_PROXIMITY_METROS.length, 4);
  assert.equal(METRO_PROXIMITY_ROUTES.length, 32);
  assert.equal(new Set(METRO_PROXIMITY_ROUTES.map((route) => route.slug)).size, METRO_PROXIMITY_ROUTES.length);
});

test("unknown or malformed generated slugs are not recognized", () => {
  assert.equal(metroProximityRoute("small-towns-within-1-hours-of-houston"), undefined, "malformed pluralized slug must fail closed");
  assert.equal(metroProximityRoute("small-towns-within-1-hour-of-houston?x=1"), undefined);
  assert.equal(metroProximityRoute("weekend-trips-from-el-paso"), undefined, "unlaunched metro must fail closed");
  assert.ok(metroProximityRoute("small-towns-within-1-hour-of-houston"));
});

test("distance helper is deterministic and uses straight-line miles rather than invented route minutes", () => {
  assert.equal(Math.round(straightLineMiles({ lat: 29.7604, lng: -95.3698 }, { lat: 29.7604, lng: -95.3698 })), 0);
  const houstonToAustin = straightLineMiles({ lat: 29.7604, lng: -95.3698 }, { lat: 30.2672, lng: -97.7431 });
  assert.ok(houstonToAustin > 140 && houstonToAustin < 155);
});

test("thin pages fail indexing even when a valid route exists", () => {
  const page = resolveMetroProximityPage("houston", "small-towns-1-hour", [
    destination(1, { coordinates: { lat: 29.95, lng: -95.3698 }, county: "Fort Bend" }),
    destination(2, { coordinates: { lat: 30.03, lng: -95.3698 }, county: "Montgomery" }),
  ]);
  assert.equal(page.indexReady, false);
  assert.equal(isMetroProximityPageIndexReady(page), false);
});

test("duplicate destinations can never inflate an index-readiness count", () => {
  const repeated = destination(1, { coordinates: { lat: 29.95, lng: -95.3698 }, county: "Fort Bend" });
  const page = resolveMetroProximityPage("houston", "small-towns-1-hour", [repeated, repeated, repeated, repeated, repeated]);
  assert.equal(page.items.length, 1);
  assert.equal(page.indexReady, false);
});

test("a diverse, substantive page can clear the small-town launch gate", () => {
  const candidates = [
    destination(1, { coordinates: { lat: 29.95, lng: -95.3698 }, county: "Fort Bend" }),
    destination(2, { coordinates: { lat: 30.00, lng: -95.3698 }, county: "Montgomery" }),
    destination(3, { coordinates: { lat: 29.55, lng: -95.3698 }, county: "Brazoria" }),
    destination(4, { coordinates: { lat: 29.50, lng: -95.3698 }, county: "Galveston" }),
    destination(5, { coordinates: { lat: 29.45, lng: -95.3698 }, county: "Galveston" }),
  ];
  const page = resolveMetroProximityPage("houston", "small-towns-1-hour", candidates);
  assert.ok(page.items.length >= 4);
  assert.equal(page.indexReady, true);
});

test("county links normalize County suffixes and punctuation", () => {
  assert.equal(countySlug("Fort Bend County"), "fort-bend");
  assert.equal(countySlug("DeWitt"), "dewitt");
});
