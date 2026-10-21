import assert from "node:assert/strict";
import test from "node:test";
import { reviewDestinationVisitorFacts } from "./destination-visitor-facts.ts";
import { applyCuratedDestination } from "./destination-curation.ts";
import { applyCuratedDestinationBatch26 } from "./destination-curation-batch26.ts";
import type { Destination } from "./types.ts";

const fact = {
  topic: "hours" as const,
  label: "Cultural Center",
  detail: "Open Tuesday through Saturday, 10 a.m. to 5 p.m.",
  sourceUrl: "https://www.nps.gov/cham/planyourvisit/hours.htm",
  checkedAt: "2026-10-21",
};

test("source-verified facts render while fresh without demanding other categories", () => {
  const result = reviewDestinationVisitorFacts([fact], "2026-10-21");
  assert.equal(result.visible.length, 1);
  assert.equal(result.issues.length, 0);
  assert.deepEqual(reviewDestinationVisitorFacts([], "2026-10-21").visible, []);
});

test("outdated hours are suppressed rather than represented as current", () => {
  const result = reviewDestinationVisitorFacts([fact], "2027-03-01");
  assert.equal(result.visible.length, 0);
  assert.equal(result.issues[0]?.code, "visitor-fact-stale");
});

test("duplicate questions and unverifiable facts never reach the visitor", () => {
  const other = { ...fact, label: " cultural  CENTER " };
  const result = reviewDestinationVisitorFacts([fact, other], "2026-10-21");
  assert.equal(result.visible.length, 1);
  assert.ok(result.issues.some((issue) => issue.code === "visitor-fact-duplicate"));
  assert.equal(result.issues[0]?.severity, "error");
});

test("bad links, future dates and fabricated labels fail closed", () => {
  const result = reviewDestinationVisitorFacts([
    { ...fact, sourceUrl: "http://example.test/info" },
    { ...fact, label: "Another", checkedAt: "2027-01-01" },
    { ...fact, label: " ", detail: "Short" },
  ], "2026-10-21");
  assert.equal(result.visible.length, 0);
  assert.deepEqual(new Set(result.issues.map((issue) => issue.code)), new Set([
    "visitor-fact-source", "visitor-fact-date", "visitor-fact-content",
  ]));
});

test("stable accessibility guidance has longer review window than schedules", () => {
  const result = reviewDestinationVisitorFacts([
    { ...fact, topic: "accessibility", label: "Access", checkedAt: "2026-01-01" },
    fact,
  ], "2026-10-21");
  assert.equal(result.visible.length, 2);
});

test("calendar dates must be real Gregorian dates", () => {
  const result = reviewDestinationVisitorFacts([{ ...fact, checkedAt: "2026-02-30" }], "2026-10-21");
  assert.equal(result.visible.length, 0);
  assert.equal(result.issues[0]?.code, "visitor-fact-date");
});

test("actual Sheldon Lake and Chamizal curated facts pass the same display gate", () => {
  for (const [slug, apply] of [
    ["sheldon-lake-state-park", applyCuratedDestination],
    ["chamizal-national-memorial", applyCuratedDestinationBatch26],
  ] as const) {
    const destination = apply({ slug } as Destination);
    assert.equal(destination.visitorFacts?.length, 1, slug + " should not repeat existing logistics");
    const { visible, issues } = reviewDestinationVisitorFacts(destination.visitorFacts, "2026-10-21");
    assert.equal(visible.length, 1, slug);
    assert.deepEqual(issues, [], slug);
  }
});

test("six researched state park records provide two independently sourced, expiring visitor answers each", () => {
  const parks = [
    "brazos-bend-state-park",
    "garner-state-park",
    "dinosaur-valley-state-park",
    "pedernales-falls-state-park",
    "colorado-bend-state-park",
    "caprock-canyons-state-park",
  ];
  for (const slug of parks) {
    const destination = applyCuratedDestination({ slug } as Destination);
    const { visible, issues } = reviewDestinationVisitorFacts(destination.visitorFacts, "2026-10-21");
    assert.deepEqual(issues, [], slug);
    assert.deepEqual(new Set(visible.map(({ topic }) => topic)), new Set(["admission", "hours"]), slug);
    assert.equal(visible.length, 2, slug);
    assert.ok(visible.every(({ sourceUrl }) => sourceUrl.startsWith("https://tpwd.texas.gov/state-parks/")), slug);
    assert.equal(reviewDestinationVisitorFacts(destination.visitorFacts, "2027-03-01").visible.length, 0, slug);
  }
});
