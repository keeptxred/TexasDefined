import test from "node:test";
import assert from "node:assert/strict";
import { plannedAuthorityChecks, readCanonical, hasNoindex, extractVisibleText, assertCampingGuideGoogleSignals, isTransientNetworkFailure, retryOneAuthorityTransport } from "./verify-authority-category-live.mjs";

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

test("camping authority SSR contract checks actual JSON-LD and source-backed editorial signals", () => {
  const url = "https://texasdefined.com/best-places-to-go-camping-in-texas";
  const itemListElement = Array.from({ length: 72 }, (_, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: { "@type": "Campground", name: "Example park " + index, url: url + "#park-" + index },
  }));
  const document = { "@graph": [
    { "@type": "CollectionPage", "@id": url, mainEntity: { "@id": url + "#camping-directory" },
      author: { name: "Texas Defined" }, publisher: { name: "Texas Defined" },
      dateModified: "2026-11-04" },
    { "@type": "ItemList", "@id": url + "#camping-directory",
      numberOfItems: 72, itemListElement },
  ] };
  const build = (data = document) => '<html><head><link rel="canonical" href="' + url +
    '"><script type="application/ld+json">' + JSON.stringify(data) + '</script></head><body>' +
    '<a href="https://tpwd.texas.gov/state-parks/park-information/frequently-asked-questions/">TPWD pets</a></body></html>';
  assert.doesNotThrow(() => assertCampingGuideGoogleSignals(build()));
  assert.throws(() => assertCampingGuideGoogleSignals(build().replace("</head>", '<link rel="canonical" href="' + url + '"></head>')), /exactly one/);
  assert.throws(() => assertCampingGuideGoogleSignals(build().replace('application/ld+json', 'text/plain')), /structured data/);
  assert.throws(() => assertCampingGuideGoogleSignals(build({
    "@graph": [document["@graph"][0], { ...document["@graph"][1], numberOfItems: 71 }],
  })), /ItemList/);
  assert.throws(() => assertCampingGuideGoogleSignals(build({
    "@graph": [{ ...document["@graph"][0], author: { name: "Invented Expert" } }, document["@graph"][1]],
  })), /authentic author/);
});

test("only genuine one-off transport failures are retried, never HTTP responses or arbitrary TypeErrors", async () => {
  assert.equal(isTransientNetworkFailure(Object.assign(new TypeError("fetch failed"), { cause: { code: "ECONNRESET" } })), true);
  assert.equal(isTransientNetworkFailure(Object.assign(new TypeError("fetch failed"), { cause: { code: "UND_ERR_CONNECT_TIMEOUT" } })), true);
  assert.equal(isTransientNetworkFailure({ name: "TimeoutError" }), true);
  assert.equal(isTransientNetworkFailure(new TypeError("bad URL")), false);
  assert.equal(isTransientNetworkFailure({ name: "Error", code: "UNEXPECTED" }), false);
  let attempts = 0, delays = 0;
  const result = await retryOneAuthorityTransport(async () => {
    attempts++;
    if (attempts === 1) throw Object.assign(new TypeError("fetch failed"), { cause: { code: "ECONNRESET" } });
    return { status: 200 };
  }, async (ms) => { assert.equal(ms, 1000); delays++; });
  assert.equal(result.status, 200);
  assert.equal(attempts, 2);
  assert.equal(delays, 1);
  attempts = 0;
  await assert.rejects(retryOneAuthorityTransport(async () => {
    attempts++;
    throw Object.assign(new TypeError("fetch failed"), { cause: { code: "ECONNRESET" } });
  }, async () => {}), /fetch failed/);
  assert.equal(attempts, 2, "at most one retry");
  attempts = 0;
  const badHttp = await retryOneAuthorityTransport(async () => { attempts++; return { status: 503 }; }, async () => { throw new Error("HTTP must not retry"); });
  assert.equal(badHttp.status, 503);
  assert.equal(attempts, 1);
  attempts = 0;
  await assert.rejects(retryOneAuthorityTransport(async () => { attempts++; throw new TypeError("bad URL"); }), /bad URL/);
  assert.equal(attempts, 1);
});
