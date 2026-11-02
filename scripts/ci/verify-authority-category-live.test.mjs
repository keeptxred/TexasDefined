import test from "node:test";
import assert from "node:assert/strict";
import { plannedAuthorityChecks, readCanonical, hasNoindex, extractVisibleText } from "./verify-authority-category-live.mjs";

test("small sitewide ownership sample is fixed, bounded and excludes football", () => {
  assert.equal(plannedAuthorityChecks.length, 7);
  assert.equal(new Set(plannedAuthorityChecks).size, 7);
  assert.ok(plannedAuthorityChecks.includes("/fishing/lakes/lake-conroe"));
  assert.ok(plannedAuthorityChecks.includes("/best-places-to-go-camping-in-texas"));
  assert.ok(plannedAuthorityChecks.every((path) => !path.includes("football") && !path.includes("?")));
});
test("canonical and robots are read from raw HTML, not text snippets or cached search output", () => {
  const html = '<html><head><link href="https://texasdefined.com/explore/trip-planner" rel="canonical"/>' +
    '<meta content="noindex, follow" name="robots" /></head><body><h1>Trip planner</h1></body></html>';
  assert.equal(readCanonical(html), "https://texasdefined.com/explore/trip-planner");
  assert.equal(hasNoindex(html,null), true);
  assert.equal(hasNoindex(html.replace("noindex, follow", "index, follow"),null), false);
  assert.equal(hasNoindex(html,"noindex"),true);
});
test("readable SSR text ignores scripts and style blocks", () => {
  const html = '<html><head><style>hidden test</style><script>alert("false article")</script></head>' +
    '<body><h1>Real authority content</h1><p>Source-verified visit details</p></body></html>';
  assert.match(extractVisibleText(html), /Real authority content/);
  assert.doesNotMatch(extractVisibleText(html), /false article|hidden test/);
});
