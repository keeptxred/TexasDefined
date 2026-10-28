import assert from "node:assert/strict";

const CANONICAL = "https://texasdefined.com/best-places-to-go-camping-in-texas";
const MAX_ATTEMPTS = 3;
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

function verify(html, { synthetic = false } = {}) {
  const errors = [];
  if (!synthetic && html.length < 25_000) errors.push("unexpectedly short SSR document");
  const text = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&").replace(/\s+/g, " ");
  const mustHave = [
    "Best Places to Go Camping in Texas",
    "Best camping destinations by trip type",
    "Recent official park advisories",
    "Campground finder",
    "57 of 57 verified profiles",
    "Enchanted Rock State Natural Area",
    "Goose Island State Park",
    "Palo Pinto Mountains State Park",
    "Brazos Bend State Park",
    "Big Bend National Park",
    "Park camping / reservation instructions",
    "TPWD reports a wood-fire burn ban",
    "Official park advisory",
  ];
  for (const expected of mustHave) if (!text.includes(expected)) errors.push("missing: " + expected);
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
  return { campgrounds: 57, advisories: 5, specificBookingLinks: 4 };
}

if (process.argv.includes("--self-test")) {
  const fixtures = [
    '<link rel="canonical" href="' + CANONICAL + '">',
    '<h1>Best Places to Go Camping in Texas</h1>',
    '<h2>Best camping destinations by trip type</h2>',
    '<h2>Recent official park advisories</h2>',
    '<div>Campground finder Showing 57 of 57 verified profiles.</div>',
    '<div>Enchanted Rock State Natural Area Goose Island State Park Palo Pinto Mountains State Park Brazos Bend State Park Big Bend National Park Official park advisory TPWD reports a wood-fire burn ban Park camping / reservation instructions</div>',
    ...[
      "https://www.recreation.gov/camping/campgrounds/258851",
      "https://www.recreation.gov/camping/campgrounds/258852",
      "https://www.recreation.gov/camping/campgrounds/234362",
      "https://tpwd.texas.gov/state-parks/lake-mineral-wells/fees-facilities/campsites",
    ].map(href => '<a href="' + href + '">Source</a>'),
  ].join("");
  assert.deepEqual(verify(fixtures, { synthetic: true }), { campgrounds: 57, advisories: 5, specificBookingLinks: 4 });
  assert.throws(() => verify(fixtures.replace("Recent official park advisories", "Old alerts"), { synthetic: true }), /missing/);
  assert.throws(() => verify(fixtures.replace('<link rel="canonical"', '<link rel="alternate"'), { synthetic: true }), /canonical/);
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
