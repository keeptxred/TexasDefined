import assert from "node:assert/strict";
import test from "node:test";
import { parseTpwdDailyAdultFee, applyVerifiedPrices, SOURCES } from "./refresh-outdoor-admission.mjs";
const fixture = (park, amount = 7) => "<h1>"+park+"</h1><h2>Entrance Fees</h2><h3>Adult</h3><p>Per person 13 years &amp; older.</p><span>$"+amount+"</span><p>Daily</p><h3>Child 12 years and under</h3><p>Free</p>";
test("matches both actual TPWD age-heading formats", () => {
  assert.equal(parseTpwdDailyAdultFee(fixture(SOURCES[0].park), SOURCES[0].park).adult, 7);
  assert.equal(parseTpwdDailyAdultFee(fixture(SOURCES[2].park, 5).replace("years &amp; older", "years and older"), SOURCES[2].park).adult, 5);
});
test("rejects changed age, paid children, wrong park, ambiguous amounts and non-daily fee", () => {
  const p = SOURCES[0].park, html = fixture(p);
  for (const bad of [html.replace("13 years", "14 years"), html.replace("Free", "$2"), fixture("Other State Park"), html+html, html.replace("Daily", "Weekly")]) assert.throws(() => parseTpwdDailyAdultFee(bad, p));
});
test("only changed independently verified prices move their own evidence date", () => {
  const previous = {schemaVersion:1,huntsville:{adult:7,evidenceDate:"2026-11-24"},rayRoberts:{adult:7,evidenceDate:"2026-11-24"},caprock:{adult:5,evidenceDate:"2026-11-24"}};
  const observations = SOURCES.map(s => ({key:s.key,url:s.url,adult:previous[s.key].adult}));
  assert.deepEqual(applyVerifiedPrices(previous, observations, "2026-12-01").next, previous);
  observations[0].adult = 8;
  const result = applyVerifiedPrices(previous, observations, "2026-12-01");
  assert.equal(result.changes.length, 1);
  assert.deepEqual(result.next.huntsville, {adult:8,evidenceDate:"2026-12-01"});
  assert.deepEqual(result.next.rayRoberts, previous.rayRoberts);
  assert.deepEqual(result.next.caprock, previous.caprock);
  assert.throws(() => applyVerifiedPrices(previous, observations.slice(1), "2026-12-01"));
});
