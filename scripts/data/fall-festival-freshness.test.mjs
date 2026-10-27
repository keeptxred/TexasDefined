import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { resolveTemporalEventCollectionServer } from "../../src/data/event-temporal-collections.server.ts";
import { activeOfficialFallPicks } from "../../src/data/fall-festival-official-picks.server.ts";

const example = (name, startDate, endDate = startDate, overrides = {}) => ({
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  href: "/event/test",
  city: "Austin",
  region: "hill-country",
  category: "seasonal",
  detail: `Austin · ${startDate}–${endDate}`,
  startDate,
  endDate,
  sourceCheckedAt: "2026-10-25",
  ...overrides,
});

const october = new Date("2026-10-26T16:00:00Z");

test("fall page excludes expired dates, Christmas, unrelated events, and guessed recurrences", () => {
  const rows = [
    example("Texas Pumpkin Festival", "2026-10-10", "2026-11-01"),
    example("Hill Country Wurstfest", "2026-11-06", "2026-11-15"),
    example("Bluebonnet Jazz Festival", "2026-10-27", "2026-10-27"),
    example("September County Fair", "2026-09-01", "2026-09-10"),
    example("Polar Express", "2026-11-01", "2026-12-30"),
    example("Houston Zoo Lights", "2026-11-02", "2026-12-30"),
    example("Moody Gardens ICE LAND", "2026-11-05", "2026-12-31"),
    example("A Texas business expo", "2026-11-01", "2026-11-02"),
    example("Unconfirmed Pumpkin Festival", "2026-11-02", "2026-11-03", { sourceCheckedAt: undefined }),
    example("Projected Folk Festival", "2026-11-02", "2026-11-03", { detail: "Recurrence-derived planning window" }),
    example("Texas Bowl Festival", "2026-11-01", "2026-11-02", { category: "sport" }),
  ];
  const result = resolveTemporalEventCollectionServer("fall-festivals", rows, october);
  assert.ok(result);
  assert.deepEqual(result.items.map((event) => event.name), [
    "Texas Pumpkin Festival",
    "Bluebonnet Jazz Festival",
    "Hill Country Wurstfest",
  ]);
  assert.equal(result.shouldIndex, false, "never pad indexable count with stale/unverified events");
  assert.equal(result.items.every((item) => (item.endDate || item.startDate) >= "2026-10-26"), true);
});

test("fall page rolls into next September only after November without reviving old dates", () => {
  const rows = [
    example("Old Festival", "2026-10-01", "2026-10-31"),
    example("Next Year's Festival", "2027-09-12", "2027-09-14"),
  ];
  const result = resolveTemporalEventCollectionServer("fall-festivals", rows, new Date("2026-12-02T18:00:00Z"));
  assert.ok(result);
  assert.deepEqual(result.items.map((item) => item.name), ["Next Year's Festival"]);
  assert.match(result.dateContext, /2027/);
});

test("official fall-source picks expire by the last confirmed date, without guessing a new edition", () => {
  assert.equal(activeOfficialFallPicks(october).length, 3);
  const afterNovember = activeOfficialFallPicks(new Date("2026-11-09T18:00:00Z"));
  assert.equal(afterNovember.length, 0);
  const followingSeason = activeOfficialFallPicks(new Date("2027-10-26T18:00:00Z"));
  assert.equal(followingSeason.length, 0);
});

test("daily official-source sync can surface a new confirmed year without rolling 2026 dates forward", () => {
  const verified2027 = {
    id: "official:texas-pumpkin-fest:2027-10-09",
    name: "Texas Pumpkin Fest", city: "Leander", startDate: "2027-10-09",
    endDate: "2027-11-01", officialUrl: "https://texaspumpkinfest.com/",
    sourceCheckedAt: "2027-07-14T08:00:00Z", status: "published",
  };
  const december = new Date("2026-12-15T17:00:00Z");
  assert.equal(activeOfficialFallPicks(december, []).length, 0, "2026 dates must not recur automatically");
  const nextSeason = activeOfficialFallPicks(december, [verified2027]);
  assert.equal(nextSeason.length, 1);
  assert.equal(nextSeason[0].name, "Texas Pumpkin Fest");
  assert.equal(nextSeason[0].startDate, "2027-10-09");
  assert.equal(nextSeason[0].sourceCheckedAt, "2027-07-14");
  assert.equal(activeOfficialFallPicks(december, [{ ...verified2027, officialUrl: "https://example.com/" }]).length, 0);
  assert.equal(activeOfficialFallPicks(december, [{ ...verified2027, sourceCheckedAt: "" }]).length, 0);
  assert.equal(activeOfficialFallPicks(december, [{ ...verified2027, status: "pending" }]).length, 0);
  assert.equal(activeOfficialFallPicks(december, [{ ...verified2027, startDate: "2026-10-09" }]).length, 0);
  assert.equal(activeOfficialFallPicks(new Date("2027-11-02T17:00:00Z"), [verified2027]).length, 0);
});

test("daily sync is limited to three named first-party autumn sources", () => {
  const sync = readFileSync("scripts/events/sync-texas-events-safe.mjs", "utf8");
  for (const name of ['key: "texas-pumpkin-fest"', 'key: "houston-pumpkin-festival"', 'key: "uhland-fall-fest"', "requireNamedSource: true"]) {
    assert.ok(sync.includes(name), `missing safe official-source guard: ${name}`);
  }
});

test("page exposes filter controls and machine-readable expiration attributes for the daily live check", () => {
  const view = [readFileSync("src/routes/events.$collection.tsx", "utf8"), readFileSync("src/routes/events.$collection.lazy.tsx", "utf8")].join("\n");
  for (const feature of ["FallFestivalBrowser", "data-fall-end-date", "data-fall-name", "Filter festivals by Texas region", "Filter festivals by month", "Filter festivals by type", "fall-festival-hotel-search", "/events/christmas-events"]) {
    assert.ok(view.includes(feature), `missing fall feature: ${feature}`);
  }
});
