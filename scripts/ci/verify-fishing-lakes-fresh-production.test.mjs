import assert from "node:assert/strict";
import test from "node:test";
import { checkFishingReleaseHtml } from "./verify-fishing-lakes-fresh-production.mjs";

const lakeLinks = Array.from({ length: 72 }, (_, i) =>
  '<a href="/fishing/lakes/lake-' + i + '">Lake ' + i + '</a>').join("");
const directory = '<!doctype html><html><head>' +
  '<link rel="canonical" href="https://texasdefined.com/fishing/lakes">' +
  '<script type="application/ld+json">{"@type":"ItemList","numberOfItems":72}</script>' +
  '</head><body><h1>Texas fishing lakes</h1>' +
  '<p>Find the right Texas fishing lake by region</p>' +
  '<nav aria-label="All matching fishing lake guides">' + lakeLinks + '</nav>' +
  '<p>Showing 72 of 72 lake guides</p>' +
  '<button>Show 12 more lake cards (60 remaining)</button></body></html>';
const falcon = '<!doctype html><html><head>' +
  '<link rel="canonical" href="https://texasdefined.com/fishing/lakes/falcon-international-reservoir">' +
  '</head><body><h1>Falcon International Reservoir</h1>' +
  '<p>Alligator gar — Not graded by TPWD</p>' +
  '<p>TPWD documents alligator gar and special harvest restrictions.</p></body></html>';

test("72 link directory proof protects indexed, compact, helpful page", () => {
  assert.deepEqual(checkFishingReleaseHtml(directory).failures, []);
});
test("72-link guard rejects missing guide even with ItemList schema", () => {
  const altered = directory.replace('<a href="/fishing/lakes/lake-71">Lake 71</a>', "");
  assert.ok(checkFishingReleaseHtml(altered).failures.includes("allGuideLinks"));
});
test("old defensive intro cannot satisfy the updated release", () => {
  const altered = directory.replace("Find the right Texas fishing lake",
    "72 complete Texas fishing lake guides are published");
  const failures = checkFishingReleaseHtml(altered).failures;
  assert.ok(failures.includes("helpfulIntro"));
  assert.ok(failures.includes("oldDefensiveIntroGone"));
});
test("noindex is rejected on a complete public directory", () => {
  const altered = directory.replace("<head>", '<head><meta name="robots" content="noindex,follow">');
  assert.ok(checkFishingReleaseHtml(altered).failures.includes("indexable"));
});
test("Falcon alligator gar must explicitly remain without a TPWD quality grade", () => {
  assert.deepEqual(checkFishingReleaseHtml(falcon, "text/html", "falcon").failures, []);
  const altered = falcon.replace("Not graded by TPWD", "Good");
  assert.ok(checkFishingReleaseHtml(altered, "text/html", "falcon").failures.includes("garUngraded"));
});
