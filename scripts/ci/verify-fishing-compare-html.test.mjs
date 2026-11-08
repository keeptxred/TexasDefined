import test from "node:test";
import assert from "node:assert/strict";
import { assessFishingCompareHtml } from "./verify-fishing-compare-html.mjs";

const selected = ["alan-henry-reservoir", "amistad-reservoir", "aquilla-lake"];
function sample({ stale = false, noindex = false, omit = "" } = {}) {
  const lakeLinks = selected.filter((slug) => slug !== omit)
    .map((slug) => `<th scope="col"><a href="/fishing/lakes/${slug}">${slug}</a></th>`).join("");
  return `<!doctype html><html><head>
    <link rel="canonical" href="${stale ? "https://texasdefined.com/fishing/lakes" : "https://texasdefined.com/fishing/compare"}">
    ${noindex ? '<meta name="robots" content="noindex,follow">' : ""}
    </head><body><h1>Compare Texas Fishing Lakes Side by Side</h1>
    <div role="region" aria-label="Lake comparison table" tabindex="0">
      <table><thead><tr><th scope="col">Topic</th>${lakeLinks}</tr></thead>
      <tbody><tr><th scope="row">Source-backed fishery grades</th>
      <td>Largemouth Bass — good; Crappie — poor</td></tr></tbody></table>
    </div>
    <p>Recorded access, not open-now status. Access inventory is not a count of usable boat ramps.</p>
    <p>Official lake level and conditions</p>
    <p>Reviewed source dates</p><p>Regulations, hazards and launch restrictions</p>
    <p>How to Read This Comparison. This tool does not rank the selected lakes.
    The comparison engine does not accept paid weighting.</p>
    <a href="https://tpwd.texas.gov/fishboat/fish/recreational/lakes/alan_henry">Official fishery profile</a>
    <a href="/corrections-policy">Corrections</a>
  </body></html>`;
}
test("accepts fully rendered sourced compare with chosen lake columns", () => {
  const r = assessFishingCompareHtml(sample(), selected);
  assert.deepEqual(r.failures, []);
  assert.deepEqual(r.comparedLakeSlugs, [...selected].sort());
});
test("fails closed on wrong canonical and noindex", () => {
  const r = assessFishingCompareHtml(sample({ stale: true, noindex: true }), selected);
  assert.ok(r.failures.includes("canonical"));
  assert.ok(r.failures.includes("indexable"));
});
test("detects a selected lake silently missing from the table", () => {
  const r = assessFishingCompareHtml(sample({ omit: "amistad-reservoir" }), selected);
  assert.ok(r.failures.includes("requestedLakesActuallyCompared"));
});
test("rejects stale Alan Henry grade and missing comparison disclosure", () => {
  const body = sample().replace("Crappie — poor", "Crappie — good")
    .replace("does not accept paid weighting", "accepts paid weighting");
  const r = assessFishingCompareHtml(body, selected);
  assert.ok(r.failures.includes("alanHenryOfficialGrades"));
  assert.ok(r.failures.includes("editorialDisclosure"));
});
