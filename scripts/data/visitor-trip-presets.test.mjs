import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { tripDefaultsForDestination } from "../../src/data/authority/category-trip-presets.ts";

const route = readFileSync("src/routes/explore.trip-planner.tsx", "utf8");
const planner = readFileSync("src/routes/explore.trip-planner.lazy.tsx", "utf8");
const presets = readFileSync("src/data/authority/category-trip-presets.ts", "utf8");
const toolkit = readFileSync("src/components/editorial/VisitorPlanningToolkit.tsx", "utf8");

test("curated article presets reuse a single non-indexable trip planner URL", () => {
  assert.match(toolkit, /encodeURIComponent\(route\.id\)/);
  assert.match(route, /match\.search\.destination \|\| match\.search\.trip \|\| match\.search\.plan/);
  assert.match(route, /canonicalPath: "\/explore\/trip-planner"/);
  assert.match(route, /robots: hasQueryState \? "noindex, follow"/);
  for (const id of ["downtown-day", "two-night", "three-day"]) {
    assert.ok(route.includes('"' + id + '"'), "missing URL preset gate: " + id);
    assert.ok(presets.includes('"' + id + '":'), "missing curated article preset: " + id);
  }
  assert.match(planner, /tripDefaultsForDestination\(seed, search\.plan\)/);
});

test("destination-seeded planner never displays an unrelated saved itinerary", () => {
  assert.match(planner, /if \(search\.destination\) \{ setTrip\(null\); return; \}/);
  assert.match(planner, /recommendations are not a copy of a researched itinerary/);
});

test("category defaults adapt across real content families without duplicating pages", () => {
  const cases = [
    ["small-towns", "Wimberley", 2, "history"],
    ["historic-sites", "USS Lexington Museum", 1, "museums"],
    ["state-parks", "Enchanted Rock State Natural Area", 1, "hiking"],
    ["lakes-rivers", "Lake Conroe", 1, "fishing"],
    ["rv-parks", "Garner State Park", 2, "camping"],
    ["road-trips", "Scenic Hill Country Drive", 2, "scenic"],
  ];
  for (const [category, name, days, interest] of cases) {
    const value = tripDefaultsForDestination({slug:name.toLowerCase().replace(/[^a-z]+/g,"-"),name,category});
    assert.equal(value.days,days);
    assert.ok(value.interests.includes(interest));
    assert.ok(value.title.startsWith(name));
  }
  assert.equal(tripDefaultsForDestination(undefined),undefined);
  assert.equal(tripDefaultsForDestination({slug:"foo",name:"Foo",category:"sports"}),undefined);
  const fred = tripDefaultsForDestination({slug:"fredericksburg",name:"Fredericksburg",category:"small-towns"},"downtown-day");
  assert.equal(fred.days,1);
  assert.match(fred.title,/Fredericksburg history/);
});

test("reusable map label follows page identity instead of hardcoded Fredericksburg title", () => {
  assert.match(toolkit, /directionsLabel=\{profile\.title \+ " locations"\}/);
  assert.doesNotMatch(toolkit, /directionsLabel="Fredericksburg-area wineries"/);
});
