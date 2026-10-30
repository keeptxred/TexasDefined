import test from "node:test";
import assert from "node:assert/strict";
import { extractOfficialFoliageReport, SOURCE_URL } from "./refresh-lost-maples-foliage.mjs";

const html = (year, sections) => "<!doctype html><html><body><h1>" + year +
  " Fall Foliage Color Report</h1><p>Report from Texas Parks and Wildlife</p>" +
  sections + "<h2>Visiting the park in Fall Foliage season</h2><p>Reserve online.</p></body></html>";

test("selects newest official dated observation, not earlier conditions", () => {
  const page = html(2026,
    "<h2>Oct. 14, 2026</h2><p>Our maples are still green.</p>" +
    "<h2>Oct. 21, 2026</h2><p>Our sycamores have turned a nice golden yellow and are beginning to lose leaves. Our maples are still green, but a few are starting to get a light color change just on the edges.</p>");
  const found = extractOfficialFoliageReport(page, new Date("2026-10-30T12:00:00Z"));
  assert.equal(found.sourceUrl, SOURCE_URL);
  assert.equal(found.reportDate, "2026-10-21");
  assert.deepEqual(found.observations, [
    "TPWD describes the maples as still green, with early color on some leaf edges.",
    "TPWD describes the sycamores as yellowing.",
  ]);
});
test("next season requires a matching official report year", () => {
  const page = html(2026, "<h2>Oct. 21, 2026</h2><p>Our maples are green.</p>");
  assert.throws(() => extractOfficialFoliageReport(page, new Date("2027-10-30T00:00:00Z")), /calendar year/);
});
test("does not infer peak from unfamiliar observations", () => {
  const page = html(2027, "<h2>Nov. 3, 2027</h2><p>Fall color along the canyon looks spectacular this week and many leaves can be seen.</p>");
  const found = extractOfficialFoliageReport(page, new Date("2027-11-04T12:00:00Z"));
  assert.equal(found.reportDate, "2027-11-03");
  assert.deepEqual(found.observations, []);
});
test("rejects old and future observations, impossible dates and missing paragraphs", () => {
  const recent = new Date("2026-10-30T12:00:00Z");
  assert.throws(() => extractOfficialFoliageReport(html(2026, "<h2>May 1, 2026</h2><p>Old report.</p>"), recent), /previous season/);
  assert.throws(() => extractOfficialFoliageReport(html(2026, "<h2>Nov. 5, 2026</h2><p>Future report.</p>"), recent), /future-dated/);
  assert.throws(() => extractOfficialFoliageReport(html(2026, "<h2>Feb. 31, 2026</h2><p>Invalid report.</p>"), recent), /No dated/);
  assert.throws(() => extractOfficialFoliageReport(html(2026, "<h2>Oct. 21, 2026</h2><img src='photo.jpg' />"), recent), /No dated/);
});
test("source layout or official heading changes fail closed", () => {
  assert.throws(() => extractOfficialFoliageReport("unavailable", new Date("2026-10-30T12:00:00Z")), /Unexpected size/);
  assert.throws(() => extractOfficialFoliageReport(html(2026, "<h2>Oct. 21, 2026</h2><p>Valid!</p>").replace("Fall Foliage Color Report", "Hiking Map"), new Date("2026-10-30T12:00:00Z")), /calendar year/);
});
