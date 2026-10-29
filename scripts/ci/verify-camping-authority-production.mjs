import assert from "node:assert/strict";
import fs from "node:fs";

const CANONICAL = "https://texasdefined.com/best-places-to-go-camping-in-texas";
const MAX_ATTEMPTS = 3;
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const generated = fs.readFileSync("src/data/camping/official-alerts.generated.ts", "utf8");
const captured = generated.match(/export const CAMPING_OPERATIONAL_ALERTS = (\[[\s\S]*?\]) as const;/);
if (!captured) throw Error("Official camping advisory snapshot could not be parsed");
const expectedAlerts = JSON.parse(captured[1]);
if (expectedAlerts.length !== 5 || expectedAlerts.some(x => !["confirmed", "needs-review"].includes(x.status)))
  throw Error("Camping advisory snapshot invalid or unexpectedly changed");

function verify(html, { synthetic = false } = {}) {
  const errors = [];
  if (!synthetic && html.length < 25_000) errors.push("unexpectedly short SSR document");
  const text = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&").replace(/&#(?:x27|39);|&apos;/gi, "'").replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ");
  const mustHave = [
    "Best Places to Go Camping in Texas",
    "Best camping destinations by trip type",
    "Recent official park advisories",
    "Campground finder",
    "Park camping / reservation instructions",
  ];
  for (const expected of mustHave) if (!text.includes(expected)) errors.push("missing: " + expected);
  const profileCount = /(?:Showing\s+)?(\d+) of (\d+) verified profiles/i.exec(text);
  const count = profileCount ? Number(profileCount[2]) : 0;
  if (!profileCount || Number(profileCount[1]) !== count || count < 72) errors.push("campground profile count less than verified baseline 72");
  for (const alert of expectedAlerts) {
    if (!text.includes(alert.parkName)) errors.push("missing monitored park: " + alert.parkName);
    if (!text.includes(alert.notice.slice(0, 48))) errors.push("live notice differs from committed source snapshot: " + alert.parkName);
    if (!html.includes(alert.sourceUrl)) errors.push("missing live operator source: " + alert.parkName);
  }
  if (!text.includes("Notice verified") && !text.includes("Changed; recheck official source"))
    errors.push("missing official advisory status labels");
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map(m => m[0]);
  const canonical = links.some(link => /rel=["']canonical["']/i.test(link)
    && link.includes(CANONICAL));
  if (!canonical) errors.push("missing exact canonical link");
  const robotTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map(m => m[0])
    .filter(tag => /name=["']robots["']/i.test(tag));
  if (robotTags.some(tag => /noindex|nofollow/i.test(tag))) errors.push("unexpected noindex/nofollow robots directive");
  for (const href of [
    "https://www.recreation.gov/camping/campgrounds/258851",
    "https://www.recreation.gov/camping/campgrounds/258852",
    "https://www.recreation.gov/camping/campgrounds/234362",
    "https://tpwd.texas.gov/state-parks/lake-mineral-wells/fees-facilities/campsites",
  ]) if (!html.includes(href)) errors.push("missing specific campground destination: " + href);
  if (/<h2[^>]*>\s*Visit a State Park\s*<\/h2>/i.test(html)) errors.push("outdated park-only heading");
  if (text.includes("Official reservations/details")) errors.push("generic reservation CTA remains visible");
  if (errors.length) throw Error(errors.join("; "));
  return { campgrounds: count, advisories: expectedAlerts.length, specificBookingLinks: 4 };
}

if (process.argv.includes("--self-test")) {
  const fixtures = [
    '<link rel="canonical" href="' + CANONICAL + '">',
    '<h1>Best Places to Go Camping in Texas</h1>',
    '<h2>Best camping destinations by trip type</h2>',
    '<h2>Recent official park advisories</h2>',
    '<div>Campground finder Showing 72 of 72 verified profiles.</div>',
    '<div>Park camping / reservation instructions Notice verified</div>',
    ...expectedAlerts.map(alert => '<div>' + alert.parkName + ' ' + alert.notice + '</div><a href="' + alert.sourceUrl + '">Official park alerts</a>'),
    ...[
      "https://www.recreation.gov/camping/campgrounds/258851",
      "https://www.recreation.gov/camping/campgrounds/258852",
      "https://www.recreation.gov/camping/campgrounds/234362",
      "https://tpwd.texas.gov/state-parks/lake-mineral-wells/fees-facilities/campsites",
    ].map(href => '<a href="' + href + '">Source</a>'),
  ].join("");
  assert.deepEqual(verify(fixtures, { synthetic: true }), { campgrounds: 72, advisories: 5, specificBookingLinks: 4 });
  assert.throws(() => verify(fixtures.replace("Recent official park advisories", "Old alerts"), { synthetic: true }), /missing/);
  assert.throws(() => verify(fixtures.replace('<link rel="canonical"', '<link rel="alternate"'), { synthetic: true }), /canonical/);
  assert.throws(() => verify(fixtures.replace(expectedAlerts[0].notice, "Outdated park information"), { synthetic: true }), /live notice differs/);
  assert.throws(() => verify(fixtures.replace("Showing 72 of 72 verified profiles", "Showing 12 of 12 verified profiles"), { synthetic: true }), /count less/);
  console.log("Camping production verifier self-test passed.");
  process.exit(0);
}

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
  const url = new URL(CANONICAL);
  url.searchParams.set("camping_verify", (process.env.GITHUB_RUN_ID || "manual") + "-" + attempt);
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "TexasDefined Camping Authority Production Monitor/1.0", "cache-control": "no-cache" },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok || new URL(response.url).pathname !== new URL(CANONICAL).pathname)
      throw Error("HTTP " + response.status + " final URL " + response.url);
    const html = await response.text();
    const result = verify(html);
    console.log("PASS Camping live SSR / canonical / booking targets / notices:", JSON.stringify(result));
    process.exit(0);
  } catch (error) {
    console.error("FAIL camping live check attempt " + attempt + "/" + MAX_ATTEMPTS + ": " + (error instanceof Error ? error.message : String(error)));
    if (attempt < MAX_ATTEMPTS) await wait(5000);
  }
}
process.exit(1);
