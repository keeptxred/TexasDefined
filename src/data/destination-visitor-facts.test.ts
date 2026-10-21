import assert from "node:assert/strict";
import test from "node:test";
import { reviewDestinationVisitorFacts } from "./destination-visitor-facts.ts";

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
