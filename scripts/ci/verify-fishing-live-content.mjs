/**
 * Read the actual production HTML through a GitHub runner (not a cached search
 * result) after a fishing change deploys. Refuse to certify missing content.
 * Invoke with: node scripts/ci/verify-fishing-live-content.mjs
 */
import assert from "node:assert/strict";

const origin = process.env.FISHING_BASE_URL ?? "https://texasdefined.com";
const reports = [];
async function page(path) {
  let last;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const url = new URL(path, origin);
      url.searchParams.set("fishing_live_acceptance", Date.now().toString());
      const response = await fetch(url, {
        headers: { "Cache-Control": "no-cache, no-store", Pragma: "no-cache" },
        signal: AbortSignal.timeout(20000),
        redirect: "follow",
      });
      const body = await response.text();
      assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
      assert.ok(body.includes("<html"), `${path}: no rendered HTML document`);
      reports.push({ path, status: response.status, bytes: body.length });
      return body;
    } catch (error) {
      last = error;
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
    }
  }
  throw last;
}

function has(body, phrase, path) {
  assert.ok(body.includes(phrase), `${path}: missing production copy: ${phrase}`);
}
function lacks(body, phrase, path) {
  assert.ok(!body.includes(phrase), `${path}: forbidden stale/empty content: ${phrase}`);
}
function noindex(body, path) {
  const robots = (body.match(/<meta\b[^>]*name=["']robots["'][^>]*>/gi) ?? []).join(" ");
  assert.ok(/noindex/i.test(robots), `${path}: missing HTML robots noindex; found ${robots.slice(0, 200)}`);
}

const hub = await page("/fishing");
has(hub, "Fishery labels such as Excellent, Good and Fair summarize longer-term, source-backed", "/fishing");
has(hub, "They are not live catch reports", "/fishing");
has(hub, "Texas Parks", "/fishing");
has(hub, "Fishing access", "/fishing");
lacks(hub, "title=\"Fishing reports\"", "/fishing");
lacks(hub, "title=\"Fishing guides\"", "/fishing");
lacks(hub, "then move into lake guides, fish-species pages, seasonal patterns, access, regulations and current reports.", "/fishing");
assert.ok(/rel=["']canonical["'][^>]*href=["']https:\/\/texasdefined\.com\/fishing["']/.test(hub) ||
          /href=["']https:\/\/texasdefined\.com\/fishing["'][^>]*rel=["']canonical["']/.test(hub),
          "/fishing: canonical link missing or incorrect");

const access = await page("/fishing/access");
has(access, "Current directory coverage:", "/fishing/access");
for (const name of ["Stubblefield Lake", "Cagle Recreation Area", "Stow-a-way Marina", "Scott", "FM 830 Ramp", "April Plaza Marina", "Pier 105", "Lakeview Marina"]) {
  has(access, name, "/fishing/access");
}
lacks(access, "No Access Listings Match These Filters", "/fishing/access");
noindex(access, "/fishing/access");

const facility = await page("/fishing/access/cagle-recreation-area");
has(facility, "Cagle Recreation Area", "/fishing/access/cagle-recreation-area");
has(facility, "Texas Parks", "/fishing/access/cagle-recreation-area");
noindex(facility, "/fishing/access/cagle-recreation-area");

const bass = await page("/fishing/species/largemouth-bass");
has(bass, "Largemouth Bass Fishing in Texas", "/fishing/species/largemouth-bass");
// React SSR may place comment markers between text nodes for hydration.
const normalizedBass = bass.replace(/<!--\s*-->/g, "");
assert.ok(/<strong[^>]*>Spring:<\/strong>/.test(normalizedBass), "Bass lake seasons must have visitor-friendly Spring labels");
assert.ok(/<strong[^>]*>Year-round:<\/strong>/.test(normalizedBass), "Bass lake seasons must have visitor-friendly Year-round labels");

console.log(JSON.stringify({ result: "PASS", checks: ["hub copy", "verified dynamic resource links", "canonical", "eight source-backed access facilities", "directory and facility noindex", "human-readable bass season labels"], pages: reports }, null, 2));
