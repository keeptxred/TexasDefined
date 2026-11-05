import assert from "node:assert/strict";
import test from "node:test";
import { selectHomepageEvents } from "../../src/lib/homepage-events.ts";

const date = "2026-11-05";
const event = (name, startDate, endDate = startDate, extras = {}) => ({
  id: name + ":" + startDate,
  brandId: "texasdefined",
  slug: name.toLowerCase().replace(/\s+/g, "-"),
  name,
  city: "Houston",
  region: "gulf-coast",
  startDate,
  endDate,
  category: "seasonal",
  blurb: "A verified event and travel planning information.",
  officialUrl: "https://example.org/event",
  sourceCheckedAt: "2026-10-29",
  ...extras,
});

test("homepage promotes nearby events ahead of next spring, with at most two ongoing", () => {
  const fixtures = [
    event("March rodeo", "2027-03-02"),
    event("Late-fall festival", "2026-10-10", "2026-11-29"),
    event("Now festival", "2026-11-02", "2026-11-07"),
    event("Last-day festival", "2026-10-01", "2026-11-05"),
    event("Tomorrow festival", "2026-11-06", "2026-11-15"),
    event("Weekend show", "2026-11-07"),
    event("December festival", "2026-12-04"),
    event("Holiday parade", "2026-11-26"),
  ];
  const selected = selectHomepageEvents(fixtures, { today: date, limit: 6 });
  assert.equal(selected.length, 6);
  assert.ok(selected.some((item) => item.name === "Tomorrow festival"));
  assert.ok(selected.some((item) => item.name === "Weekend show"));
  assert.ok(selected.some((item) => item.name === "Holiday parade"));
  assert.ok(!selected.some((item) => item.name === "March rodeo"));
  assert.ok(selected.filter((item) => item.startDate <= date).length <= 2);
});

test("homepage never promotes expired, stale, future-verified or invalid occurrences", () => {
  const selected = selectHomepageEvents([
    event("Expired", "2026-10-01", "2026-10-31"),
    event("Invalid dates", "2026-11-06", "2026-11-05"),
    event("Not source verified", "2026-11-06", "2026-11-10", { sourceCheckedAt: "" }),
    event("Old source", "2026-11-06", "2026-11-10", { sourceCheckedAt: "2025-10-01" }),
    event("Future verification", "2026-11-06", "2026-11-10", { sourceCheckedAt: "2027-01-01" }),
    event("Bad source URL", "2026-11-06", "2026-11-10", { officialUrl: "http://example.org" }),
    event("Valid", "2026-11-06", "2026-11-10"),
  ], { today: date });
  assert.deepEqual(selected.map((item) => item.name), ["Valid"]);
});

test("duplicate generated and guide records collapse to the descriptive, verified event", () => {
  const fallback = event("Sample festival", "2026-11-06", "2026-11-15", { blurb: "Major annual event in Houston. Confirm current details with the organizer before traveling.", sourceCheckedAt: "2026-08-26" });
  const generated = event("Sample festival", "2026-11-06", "2026-11-15", { blurb: "Ten days of music and German-Texan heritage in New Braunfels.", sourceCheckedAt: "2026-10-21" });
  const selected = selectHomepageEvents([fallback, generated], { today: date });
  assert.equal(selected.length, 1);
  assert.equal(selected[0].blurb, generated.blurb);
});


test("homepage substitutes specific, evergreen details for known major-event boilerplate", () => {
  const selected = selectHomepageEvents([
    event("Austin Celtic Festival", "2026-11-07", "2026-11-08", {
      slug: "austin-celtic-festival",
      city: "Austin",
      blurb: "Major annual event in Austin. Confirm current details with the organizer before traveling.",
    }),
  ], { today: date });
  assert.equal(selected.length, 1);
  assert.match(selected[0].blurb, /Celtic music.*Highland Games/);
  assert.doesNotMatch(selected[0].blurb, /Major annual event/);
});
