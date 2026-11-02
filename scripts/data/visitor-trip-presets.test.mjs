import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const route = readFileSync("src/routes/explore.trip-planner.tsx", "utf8");
const planner = readFileSync("src/routes/explore.trip-planner.lazy.tsx", "utf8");
const toolkit = readFileSync("src/components/editorial/VisitorPlanningToolkit.tsx", "utf8");

test("curated visitor presets reuse a single non-indexable trip-planner URL", () => {
  assert.match(toolkit, /encodeURIComponent\(route\.id\)/);
  assert.match(route, /match\.search\.destination \|\| match\.search\.trip \|\| match\.search\.plan/);
  assert.match(route, /canonicalPath: "\/explore\/trip-planner"/);
  assert.match(route, /robots: hasQueryState \? "noindex, follow"/);
  for (const id of ["downtown-day", "two-night", "three-day"]) {
    assert.ok(route.includes('"' + id + '"'), "missing validated preset " + id);
    assert.ok(planner.includes('"' + id + '":'), "missing planner configuration " + id);
  }
});
test("preset does not render an older saved trip and does not invent the editorial route", () => {
  assert.match(planner, /if \(search\.plan\) \{ setTrip\(null\); return; \}/);
  assert.match(planner, /resulting stops may differ from the researched article schedule/);
});
