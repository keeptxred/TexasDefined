import { test } from "node:test";
import assert from "node:assert/strict";
import { parseYouthCalendar, mergeCalendar } from "./refresh-youth-hunting-calendar.mjs";

// TPWD text structure is mirrored without assuming its CSS, JavaScript or layout.
const fixture = [
"Youth-Only 2026-2027 Seasons & Regulations",
"Youth-Only Seasons & County Regulations",
"Duck",
"South Zone Oct. 31 - Nov. 1, 2026",
"High Plains Mallard Management Unit Oct. 17 - 18, 2026",
"North Zone Nov. 7 - 8, 2026",
"View Duck Youth-Only hunting regulations for your county.",
"Squirrel East Texas Sept. 25 - 27, 2026",
"View Squirrel Youth-Only hunting regulations for your county.",
"Wild Turkey",
"North Zone Oct. 30 - Nov. 1, 2026 Jan. 4 - 17, 2027",
"North Zone Mar. 27 - 28, 2027 May 22 - 23, 2027",
"Brooks, Kenedy, Kleberg, and Willacy Counties Oct. 30 - Nov. 1, 2026",
"South Zone Mar. 13 - 14, 2027 May 8 - 9, 2027",
"South Zone Oct. 30 - Nov. 1, 2026 Jan. 18 - 31, 2027",
"View Wild Turkey Youth-Only hunting regulations for your county.",
"White-tailed Deer North Zone Oct. 30 - Nov. 1, 2026 Jan. 4 - 17, 2027",
"South Zone Oct. 30 - Nov. 1, 2026",
"View White-tailed Deer Youth-Only hunting regulations for your county.",
"About Youth-only Seasons"
].join(" ");

// Freeze a synthetic 2026–27 baseline. Tests must stay valid after the real
// maintained snapshot advances to 2027–28, 2028–29, and later seasons.
function fixtureSnapshot() {
  const calendar = parseYouthCalendar(fixture);
  return [
    'export const YOUTH_HUNTING_LAST_CHECKED = "2026-10-28";',
    'export const YOUTH_HUNTING_SEASON_YEAR = "2026–27";',
    ...calendar.rows.map(([species, region, dates]) =>
      `  { species: "${species}", region: "${region}", dates: "${dates}", detail: "Fixture" },`),
  ].join("\n");
}

test("extracts 11 official species/zone dates without guessing", () => {
  const parsed = parseYouthCalendar("<html><body>" + fixture + "</body></html>");
  assert.equal(parsed.year,"2026–27");
  assert.equal(parsed.rows.length,11);
  assert.deepEqual(parsed.rows[0],["White-tailed deer","North & South — early","Oct. 30–Nov. 1, 2026"]);
  assert.deepEqual(parsed.rows[4],["Wild turkey","Brooks, Kenedy, Kleberg & Willacy","Oct. 30–Nov. 1, 2026"]);
  assert.deepEqual(parsed.rows[5],["Wild turkey","North — spring","Mar. 27–28, 2027; May 22–23, 2027"]);
  const data=fixtureSnapshot();
  assert.equal(mergeCalendar(data,parsed,"2026-10-28"),data,"unchanged verified dates must not churn timestamps or PRs");
});

test("fails closed on a divergent South Zone deer opening", () => {
  const bad = fixture.replace("South Zone Oct. 30 - Nov. 1, 2026 View White-tailed Deer","South Zone Nov. 1 - 3, 2026 View White-tailed Deer");
  assert.throws(()=>parseYouthCalendar(bad),/deer North\/South early calendar/);
});

test("rejects missing required special-county turkey rules", () => {
  const bad = fixture.replace("Brooks, Kenedy, Kleberg, and Willacy Counties","Unknown County Group");
  assert.throws(()=>parseYouthCalendar(bad),/zone count changed/);
});

test("rejects future dates outside the TPWD license-year window", () => {
  const bad = fixture.replace("May 22 - 23, 2027","May 22 - 23, 2029");
  assert.throws(()=>parseYouthCalendar(bad),/out-of-period season date/);
});

test("future-year calendar cannot displace an active license year early", () => {
  const nextSeason = fixture.replace(/\b(2026|2027)\b/g, (_match, year) => String(Number(year) + 1));
  const parsed = parseYouthCalendar(nextSeason);
  assert.equal(parsed.year, "2027–28");
  const data = fixtureSnapshot();
  assert.throws(() => mergeCalendar(data, parsed, "2027-08-15"), /before September 1/);
  const changed = mergeCalendar(data, parsed, "2027-09-01");
  assert.match(changed, /YOUTH_HUNTING_SEASON_YEAR = "2027–28"/);
  assert.match(changed, /YOUTH_HUNTING_LAST_CHECKED = "2027-09-01"/);
  assert.match(changed, /Oct\. 30–Nov\. 1, 2027/);
});

test("expired season cannot be treated as current without a new official calendar", () => {
  const parsed = parseYouthCalendar(fixture);
  const data = fixtureSnapshot();
  assert.throws(() => mergeCalendar(data, parsed, "2027-09-01"), /archived calendar expired/);
});
