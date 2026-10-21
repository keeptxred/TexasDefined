import assert from "node:assert/strict";
import test from "node:test";
import { reviewDestinationVisitorFacts } from "./destination-visitor-facts.ts";
import { applyCuratedDestination } from "./destination-curation.ts";
import { applyCuratedDestinationBatch2 } from "./destination-curation-batch2.ts";
import { applyCuratedDestinationBatch4 } from "./destination-curation-batch4.ts";
import { applyCuratedDestinationBatch5 } from "./destination-curation-batch5.ts";
import { applyCuratedDestinationBatch6 } from "./destination-curation-batch6.ts";
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

test("nine more individually verified TPWD parks retain their exact visitor details and freshness rules", () => {
  const parks: Array<[string, (destination: Destination) => Destination, number]> = [
    ["enchanted-rock-state-natural-area", applyCuratedDestinationBatch2, 3],
    ["palo-duro-canyon-state-park", applyCuratedDestinationBatch2, 2],
    ["caddo-lake-state-park", applyCuratedDestinationBatch2, 2],
    ["balmorhea-state-park", applyCuratedDestinationBatch2, 2],
    ["guadalupe-river-state-park", applyCuratedDestinationBatch2, 2],
    ["inks-lake-state-park", applyCuratedDestinationBatch2, 2],
    ["lost-maples-state-natural-area", applyCuratedDestinationBatch2, 2],
    ["monahans-sandhills-state-park", applyCuratedDestinationBatch2, 2],
    ["mckinney-falls-state-park", applyCuratedDestinationBatch4, 2],
  ];
  for (const [slug, apply, total] of parks) {
    const destination = apply({ slug } as Destination);
    const facts = destination.visitorFacts;
    const { visible, issues } = reviewDestinationVisitorFacts(facts, "2026-10-21");
    assert.equal(visible.length, total, slug);
    assert.deepEqual(issues, [], slug);
    assert.ok(visible.some(({ topic }) => topic === "admission"), slug);
    assert.ok(visible.every(({ sourceUrl, checkedAt }) =>
      sourceUrl.startsWith("https://tpwd.texas.gov/state-parks/") && checkedAt === "2026-10-21"), slug);
    assert.equal(reviewDestinationVisitorFacts(facts, "2027-03-01").visible.length, 0, slug);
  }
});

test("Balmorhea timed pool entry and Enchanted Rock gate hours are not replaced by generic park hours", () => {
  const balm = applyCuratedDestinationBatch2({ slug: "balmorhea-state-park" } as Destination);
  assert.ok(balm.visitorFacts?.some((fact) => fact.topic === "access" && fact.detail.includes("3 p.m.") && fact.detail.includes("early entry")));
  const rock = applyCuratedDestinationBatch2({ slug: "enchanted-rock-state-natural-area" } as Destination);
  assert.ok(rock.visitorFacts?.some((fact) => fact.topic === "hours" && fact.detail.includes("6:30 a.m.") && fact.detail.includes("8 p.m.")));
});

test("eight more researched state park guides carry official facts with expiry and no generic defaults", () => {
  const parks: Array<[string, number]> = [
    ["tyler-state-park", 3],
    ["stephen-f-austin-state-park", 2],
    ["village-creek-state-park", 2],
    ["sea-rim-state-park", 3],
    ["goose-island-state-park", 2],
    ["seminole-canyon-state-park-historic-site", 2],
    ["kickapoo-cavern-state-park", 3],
    ["lake-tawakoni-state-park", 2],
  ];
  for (const [slug, count] of parks) {
    const destination = applyCuratedDestinationBatch4({ slug } as Destination);
    const verified = reviewDestinationVisitorFacts(destination.visitorFacts, "2026-10-21");
    assert.equal(verified.visible.length, count, slug);
    assert.deepEqual(verified.issues, [], slug);
    assert.ok(verified.visible.some(({ topic }) => topic === "admission"), slug);
    assert.ok(verified.visible.every(({ sourceUrl }) => sourceUrl.startsWith("https://tpwd.texas.gov/state-parks/")), slug);
    assert.equal(reviewDestinationVisitorFacts(destination.visitorFacts, "2027-03-01").visible.length, 0, slug);
  }
});

test("coastal beach and cave visit schedules preserve venue-specific limitations", () => {
  const seaRim = applyCuratedDestinationBatch4({ slug: "sea-rim-state-park" } as Destination);
  assert.ok(seaRim.visitorFacts?.some(({ topic, detail }) => topic === "access" && detail.includes("Late-arriving campers")));
  const kickapoo = applyCuratedDestinationBatch4({ slug: "kickapoo-cavern-state-park" } as Destination);
  assert.ok(kickapoo.visitorFacts?.some(({ topic, detail }) => topic === "hours" && detail.includes("closed Tuesday through Thursday")));
  assert.ok(kickapoo.visitorFacts?.some(({ topic, detail }) => topic === "access" && detail.includes("without authorization")));
});

test("ten additional TPWD state parks preserve site-specific exact-source visitor guidance", () => {
  const parkFacts: Array<[string, number]> = [
    ["mother-neff-state-park", 3], ["lockhart-state-park", 3],
    ["longhorn-cavern-state-park", 3], ["martin-dies-jr-state-park", 2],
    ["mission-tejas-state-park", 2], ["meridian-state-park", 2],
    ["martin-creek-lake-state-park", 2], ["atlanta-state-park", 2],
    ["bonham-state-park", 2], ["buescher-state-park", 2],
  ];
  for (const [slug, count] of parkFacts) {
    const destination = applyCuratedDestinationBatch5({ slug } as Destination);
    const fresh = reviewDestinationVisitorFacts(destination.visitorFacts, "2026-10-21");
    assert.deepEqual(fresh.issues, [], slug);
    assert.equal(fresh.visible.length, count, slug);
    assert.ok(fresh.visible.every(({ sourceUrl, checkedAt }) =>
      sourceUrl.startsWith("https://tpwd.texas.gov/state-parks/") && checkedAt === "2026-10-21"), slug);
    const afterFourMonths = reviewDestinationVisitorFacts(destination.visitorFacts, "2027-03-01").visible;
    assert.deepEqual(afterFourMonths.map(({ topic }) => topic), slug === "longhorn-cavern-state-park" ? ["camping"] : [], slug);
    assert.equal(reviewDestinationVisitorFacts(destination.visitorFacts, "2027-10-23").visible.length, 0, slug);
  }
});

test("Longhorn Cavern does not invent a standard park admission or campground", () => {
  const destination = applyCuratedDestinationBatch5({ slug: "longhorn-cavern-state-park" } as Destination);
  const facts = destination.visitorFacts ?? [];
  assert.equal(facts.filter((fact) => fact.topic === "admission").length, 0);
  assert.ok(facts.some((fact) => fact.topic === "camping" && fact.detail.includes("no overnight camping")));
  assert.ok(facts.some((fact) => fact.topic === "reservations" && fact.detail.includes("tour operator")));
});

test("Mother Neff south gate and Lockhart seasonal office schedule remain visible", () => {
  const neff = applyCuratedDestinationBatch5({ slug: "mother-neff-state-park" } as Destination);
  assert.ok(neff.visitorFacts?.some((fact) => fact.topic === "access" && fact.detail.includes("closed indefinitely")));
  const lockhart = applyCuratedDestinationBatch5({ slug: "lockhart-state-park" } as Destination);
  assert.ok(lockhart.visitorFacts?.some((fact) => fact.topic === "hours" && fact.detail.includes("October–February")));
});

test("nine TPWD destinations use exact operator visitor rules rather than generic park defaults", () => {
  const parks: Array<[string, number]> = [
    ["bastrop-state-park", 2], ["blanco-state-park", 2],
    ["copper-breaks-state-park", 2], ["devils-sinkhole-state-natural-area", 3],
    ["fort-parker-state-park", 2], ["galveston-island-state-park", 2],
    ["goliad-state-park-and-historic-site", 2], ["hill-country-state-natural-area", 3],
    ["indian-lodge", 2],
  ];
  for (const [slug, count] of parks) {
    const destination = applyCuratedDestinationBatch6({ slug } as Destination);
    const fresh = reviewDestinationVisitorFacts(destination.visitorFacts, "2026-10-21");
    assert.deepEqual(fresh.issues, [], slug);
    assert.equal(fresh.visible.length, count, slug);
    assert.ok(fresh.visible.every(({ sourceUrl }) => sourceUrl.startsWith("https://tpwd.texas.gov/state-parks/")), slug);
    assert.ok(fresh.visible.every(({ checkedAt }) => checkedAt === "2026-10-21"), slug);
    assert.equal(reviewDestinationVisitorFacts(destination.visitorFacts, "2027-03-01").visible.length, 0, slug);
  }
});

test("Devil's Sinkhole remains tour-only and Indian Lodge is treated as lodging rather than day use", () => {
  const sinkhole = applyCuratedDestinationBatch6({ slug: "devils-sinkhole-state-natural-area" } as Destination);
  const facts = sinkhole.visitorFacts ?? [];
  assert.ok(facts.some((fact) => fact.topic === "access" && fact.detail.includes("reserved guided tour")));
  assert.ok(facts.some((fact) => fact.topic === "reservations" && fact.detail.includes("830-683-2287")));
  assert.equal(facts.filter((fact) => fact.topic === "hours").length, 0);
  const lodge = applyCuratedDestinationBatch6({ slug: "indian-lodge" } as Destination);
  assert.ok(lodge.visitorFacts?.some((fact) => fact.topic === "admission" && fact.detail.includes("Overnight rooms")));
  assert.ok(lodge.visitorFacts?.some((fact) => fact.topic === "hours" && fact.detail.includes("Black Bear Restaurant")));
});

test("Goliad historic buildings and Hill Country backcountry closures remain distinct from gate hours", () => {
  const goliad = applyCuratedDestinationBatch6({ slug: "goliad-state-park-and-historic-site" } as Destination);
  assert.ok(goliad.visitorFacts?.some((fact) => fact.topic === "hours" && fact.detail.includes("historic buildings")));
  const hill = applyCuratedDestinationBatch6({ slug: "hill-country-state-natural-area" } as Destination);
  assert.ok(hill.visitorFacts?.some((fact) => fact.topic === "access" && fact.detail.includes("poor weather")));
});
