import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  readVerifiedChristmasOccurrenceSources,
  parseChristmasOccurrenceLiteral,
  activeVerifiedChristmasOccurrences,
} from "./christmas-community-source-manifest.mjs";

test("production Christmas source count includes the full separately published county backfill, never just the old manifest", () => {
  const { primary, countyBackfill, combined } = readVerifiedChristmasOccurrenceSources();
  assert.ok(primary.length >= 264);
  assert.ok(countyBackfill.length >= 95, "At least 95 original 2026 source-qualified county holiday occurrences must be counted");
  assert.equal(combined.length, primary.length + countyBackfill.length);
  const date = "2026-11-23";
  const active = activeVerifiedChristmasOccurrences(date);
  assert.equal(active.length,
    combined.filter((x) => (x.endDate ?? x.startDate) >= date).length);
  assert.equal(active.length,
    primary.filter(x => (x.endDate ?? x.startDate) >= date).length +
    countyBackfill.filter(x => (x.endDate ?? x.startDate) >= date).length);
  assert.ok(active.length > primary.filter(x => (x.endDate ?? x.startDate) >= date).length,
    "Historical regression: the Nov 23 production gate ignored 95 current county additions and expected 240 instead of 335");
  for (const slug of ["gilmer-upshur-yulefest-2026", "post-lighted-christmas-parade-light-up-post-2026"])
    assert.ok(active.some(x => x.slug === slug), "New source-qualified county holiday missing: " + slug);
  assert.equal(new Set(combined.map(x=>x.slug + ":" + x.startDate)).size, combined.length);
});

test("production verifier is aligned to the actual live two-manifest renderer and includes both county-source witnesses", () => {
  const renderer = readFileSync("src/data/events/christmas-community-2026.server.ts", "utf8");
  const verifier = readFileSync("scripts/ci/verify-christmas-hub-production.mjs", "utf8");
  assert.match(renderer, /return \[\.\.\.verifiedOccurrences, \.\.\.verifiedCountyChristmasEvents2026\]/);
  assert.match(verifier, /const remainingCommunityEvents = activeVerifiedChristmasOccurrences\(date\);/);
  assert.match(verifier, /"gilmer-upshur-yulefest-2026"/);
  assert.match(verifier, /"post-lighted-christmas-parade-light-up-post-2026"/);
  assert.doesNotMatch(verifier, /const allCommunityEvents = JSON\.parse\(literal\)/,
    "Single-manifest production count caused a false GitHub postdeploy failure");
});

test("source parser fails closed on absent backfill, malformed date ranges and collisions", () => {
  assert.throws(() => parseChristmasOccurrenceLiteral("const verifiedOccurrences=[]", "wrong marker"), /marker not found/);
  assert.throws(() => parseChristmasOccurrenceLiteral("const verifiedOccurrences = [];",
    "const verifiedOccurrences"), /array boundaries missing|literal must contain events/);
  const invalid = 'const verifiedOccurrences = [\n{"slug":"bad-date","title":"Bad event","startDate":"2026-12-10","endDate":"2026-12-05"}\n];';
  assert.throws(() => parseChristmasOccurrenceLiteral(invalid, "const verifiedOccurrences"), /Invalid dated/);
  assert.throws(() => activeVerifiedChristmasOccurrences("Nov 23, 2026"), /YYYY-MM-DD/);
});

test("date-scoped Christmas count removes expired original and backfill events without projecting a future year", () => {
  const { combined } = readVerifiedChristmasOccurrenceSources();
  let previous = Number.POSITIVE_INFINITY;
  for(const day of ["2026-10-23","2026-11-22","2026-11-23","2026-12-01","2026-12-25","2027-01-05"]){
    const active = activeVerifiedChristmasOccurrences(day);
    assert.equal(active.length, combined.filter(e=>(e.endDate??e.startDate)>=day).length);
    assert.ok(active.length <= previous, "Dates must stop appearing after last verified day");
    previous = active.length;
  }
});
