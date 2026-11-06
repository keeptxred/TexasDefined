/**
 * Read the actual production HTML through a GitHub runner (not a cached search
 * result) after a fishing change deploys. Refuse to certify missing content.
 * Invoke with: node scripts/ci/verify-fishing-live-content.mjs
 */
import assert from "node:assert/strict";

const origin = process.env.FISHING_BASE_URL ?? "https://texasdefined.com";
const reports = [];
async function page(path, { cacheBust = true } = {}) {
  let last;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const url = new URL(path, origin);
      if (cacheBust) url.searchParams.set("fishing_live_acceptance", Date.now().toString());
      const response = await fetch(url, {
        headers: cacheBust ? { "Cache-Control": "no-cache, no-store", Pragma: "no-cache" } : {},
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
has(hub, "Fishery labels such as Excellent, Good and Fair are qualitative", "/fishing");
has(hub, "not measured catch probabilities, live bite reports or guarantees", "/fishing");
has(hub, "Texas Parks", "/fishing");
has(hub, "How we research Texas fishing", "/fishing");
has(hub, "Read our corrections policy and send an update", "/fishing");
const hubOrdinary = await page("/fishing", { cacheBust: false });
// What crawlers and visitors see on the normal, unmodified URL must not be a
// stale pre-release page while a cache-busted URL is correct.
has(hubOrdinary, "How we research Texas fishing", "/fishing ordinary URL");
has(hubOrdinary, "Read our corrections policy and send an update", "/fishing ordinary URL");
has(hub, "Fishing access", "/fishing");
has(hub, "Historical fishing reports", "/fishing");
has(hub, "/fishing/guides", "/fishing");
has(hub, "/fishing/reports", "/fishing");
lacks(hub, "then move into lake guides, fish-species pages, seasonal patterns, access, regulations and current reports.", "/fishing");
assert.ok(/rel=["']canonical["'][^>]*href=["']https:\/\/texasdefined\.com\/fishing["']/.test(hub) ||
          /href=["']https:\/\/texasdefined\.com\/fishing["'][^>]*rel=["']canonical["']/.test(hub),
          "/fishing: canonical link missing or incorrect");

const access = await page("/fishing/access");
has(access, "Current source-backed coverage:", "/fishing/access");
has(access, "Email an access correction or listing tip", "/fishing/access");
has(access, "Read our corrections policy", "/fishing/access");
has(access, "mailto:admin@texasdefined.com?subject=Texas%20Defined%20fishing%20access", "/fishing/access");
lacks(access, "Use Partner With Us for a new ramp", "/fishing/access");
const accessText = access.replace(/<!--\s*-->/g, "").replace(/<[^>]+>/g, " ");
const publishedCoverage = accessText.match(/Current source-backed coverage:\s*([\d,]+)\s*facilities across\s*([\d,]+)\s*Texas lakes/i);
assert.ok(publishedCoverage, "/fishing/access: expected machine-verifiable live coverage totals");
const liveFacilities = Number(publishedCoverage[1].replaceAll(",", ""));
const liveLakes = Number(publishedCoverage[2].replaceAll(",", ""));
assert.ok(liveLakes >= 20 && liveFacilities >= 100, "/fishing/access: not yet a meaningful statewide inventory");
function directoryVisibleText(html) {
  return html.replace(/<script\\b[^>]*>[\\s\\S]*?<\\/script>/gi, " ")
    .replace(/<head\\b[^>]*>[\\s\\S]*?<\\/head>/gi, " ")
    .replace(/<!--\\s*-->/g, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\\s+/g, " ")
    .trim();
}
function checkFacilityKind(html, name, expectedKind, label) {
  const visible = directoryVisibleText(html).toLowerCase();
  assert.ok(visible.includes((expectedKind + " " + name).toLowerCase()),
    label + ": " + name + " is not visibly classified as " + expectedKind);
}
checkFacilityKind(access, "Arkansas Bend", "boat ramp", "/fishing/access fresh");
checkFacilityKind(access, "Bachman Lake public bank-fishing shoreline", "shore", "/fishing/access fresh");
checkFacilityKind(access, "Paddle Point Park", "kayak launch", "/fishing/access fresh");
checkFacilityKind(access, "Bear Creek Park", "boat ramp", "/fishing/access fresh");
const ordinaryAccess = await page("/fishing/access", { cacheBust: false });
has(ordinaryAccess, "Email an access correction or listing tip", "/fishing/access ordinary URL");
has(ordinaryAccess, "Read our corrections policy", "/fishing/access ordinary URL");
for (const [name, kind] of [
  ["Arkansas Bend", "boat ramp"],
  ["Bachman Lake public bank-fishing shoreline", "shore"],
  ["Paddle Point Park", "kayak launch"],
  ["Bear Creek Park", "boat ramp"],
]) checkFacilityKind(ordinaryAccess, name, kind, "/fishing/access ordinary URL");
assert.ok(/rel=["']canonical["'][^>]*href=["']https:\\/\\/texasdefined\\.com\\/fishing\\/access["']/.test(ordinaryAccess) ||
  /href=["']https:\\/\\/texasdefined\\.com\\/fishing\\/access["'][^>]*rel=["']canonical["']/.test(ordinaryAccess),
  "/fishing/access ordinary URL canonical mismatch");
lacks(ordinaryAccess, "Use Partner With Us for a new ramp", "/fishing/access ordinary URL");
const ordinaryAccessText = ordinaryAccess.replace(/<!--\s*-->/g, "").replace(/<[^>]+>/g, " ");
const ordinaryCoverage = ordinaryAccessText.match(/Current source-backed coverage:\s*([\d,]+)\s*facilities across\s*([\d,]+)\s*Texas lakes/i);
assert.ok(ordinaryCoverage, "/fishing/access ordinary URL: missing current directory inventory; potential stale edge cache");
assert.equal(Number(ordinaryCoverage[1].replaceAll(",", "")), liveFacilities, "/fishing/access ordinary URL has stale facility count");
assert.equal(Number(ordinaryCoverage[2].replaceAll(",", "")), liveLakes, "/fishing/access ordinary URL has stale lake count");
assert.ok(!/<meta\b[^>]*name=["\u0027]robots["\u0027][^>]*content=["\u0027]noindex/i.test(ordinaryAccess), "/fishing/access ordinary URL has stale noindex, though fresh directory is indexable");
for (const sourceBacked of ["Lake Fork", "Lake Buchanan", "Lake Travis", "Lake Waco", "Lake Georgetown"]) has(access, sourceBacked, "/fishing/access");
for (const name of ["Stubblefield Lake", "Cagle Recreation Area", "Stow-a-way Marina", "Scott", "FM 830 Ramp", "April Plaza Marina", "Pier 105", "Lakeview Marina"]) {
  has(access, name, "/fishing/access");
}
lacks(access, "No Access Listings Match These Filters", "/fishing/access");
// With 20+ lakes and 100+ source-reviewed facilities, the statewide directory
// should become indexable; incomplete *individual* facility profiles stay noindex.
assert.ok(!/<meta\b[^>]*name=["\u0027]robots["\u0027][^>]*content=["\u0027]noindex/i.test(access), "/fishing/access: substantive statewide inventory must not remain noindex");

// Exercise server-rendered search filters, not only unfiltered headlines.
for (const [filter, must, excluded] of [
  ["boat-ramp", [["Arkansas Bend", "boat ramp"], ["Bear Creek Park", "boat ramp"]], ["Bachman Lake public bank-fishing shoreline", "Paddle Point Park"]],
  ["shore", [["Bachman Lake public bank-fishing shoreline", "shore"]], ["Arkansas Bend", "Bear Creek Park"]],
  ["kayak-launch", [["Paddle Point Park", "kayak launch"]], ["Arkansas Bend", "Bachman Lake public bank-fishing shoreline"]],
]) {
  const filtered = await page("/fishing/access?kind=" + filter);
  for (const [name, kind] of must) checkFacilityKind(filtered, name, kind, "filtered " + filter);
  const text = directoryVisibleText(filtered);
  for (const name of excluded) assert.ok(!text.includes(name), "filtered " + filter + " includes unrelated " + name);
}
const facility = await page("/fishing/access/cagle-recreation-area");
has(facility, "Cagle Recreation Area", "/fishing/access/cagle-recreation-area");
has(facility, "Texas Parks", "/fishing/access/cagle-recreation-area");
noindex(facility, "/fishing/access/cagle-recreation-area");

const guides = await page("/fishing/guides");
has(guides, "Texas Fishing Guides", "/fishing/guides");
has(guides, "Ray Hunt Lake Conroe Fishing Guide", "/fishing/guides");
has(guides, "Striper Express", "/fishing/guides");
lacks(guides, "No fishing guide listings are published yet.", "/fishing/guides");

const guideProfile = await page("/fishing/guides/ray-hunt-lake-conroe-fishing-guide");
has(guideProfile, "Ray Hunt Lake Conroe Fishing Guide", "/fishing/guides/ray-hunt-lake-conroe-fishing-guide");
noindex(guideProfile, "/fishing/guides/ray-hunt-lake-conroe-fishing-guide");

const historical = await page("/fishing/reports");
has(historical, "TPWD weekly fishing reports are currently paused", "/fishing/reports");
has(historical, "Historical snapshot", "/fishing/reports");
noindex(historical, "/fishing/reports");
lacks(historical, "No fishing reports are published yet.", "/fishing/reports");

const archive = await page("/fishing/reports/tpwd-conroe-february-25-2026");
has(archive, "Lake Conroe fishing report", "/fishing/reports/tpwd-conroe-february-25-2026");
noindex(archive, "/fishing/reports/tpwd-conroe-february-25-2026");

const bass = await page("/fishing/species/largemouth-bass");
has(bass, "Largemouth Bass Fishing in Texas", "/fishing/species/largemouth-bass");
// React SSR may place comment markers between text nodes for hydration.
const normalizedBass = bass.replace(/<!--\s*-->/g, "");
assert.ok(/<strong[^>]*>Spring:<\/strong>/.test(normalizedBass), "Bass lake seasons must have visitor-friendly Spring labels");
assert.ok(/<strong[^>]*>Year-round:<\/strong>/.test(normalizedBass), "Bass lake seasons must have visitor-friendly Year-round labels");

console.log(JSON.stringify({ result: "PASS", coverage: { lakes: liveLakes, facilities: liveFacilities }, checks: ["ordinary-vs-fresh canonical URL parity", "hub copy", "real directory links", "canonical", "statewide lake and facility coverage", "facility-profile noindex", "verified guide businesses", "historical reports noindex", "human-readable bass seasons"], pages: reports }, null, 2));
