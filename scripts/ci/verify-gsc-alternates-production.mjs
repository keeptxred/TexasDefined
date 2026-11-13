#!/usr/bin/env node
// Bounded, daily production acceptance for Google's alternate-canonical sample.
// These query URLs are functional filtered/prefilled views, not indexable articles.
const origin = String(process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const checks = [
  ["/events", "/events", false, true],
  ["/events?venue=sports-venue%3Aeagle-stadium-allen&start=2027-04-15&end=2027-04-15", "/events", true, true],
  ["/texas-property-tax-estimator?county=bailey", "/texas-property-tax-estimator", false, false],
  ["/corporate-events?city=Texas&guests=45&type=meetings", "/corporate-events", false, false],
  ["/moving-to-texas?originState=Oregon", "/moving-to-texas", false, false],
  ["/partner-with-us?type=sports-travel&source=%2Fsports-venues&partnershipType=sports-travel&sourcePath=%2Fsports-venues", "/partner-with-us", false, false],
];
function assert(ok, message) { if (!ok) throw new Error(message); }
function attr(tag, name) {
  const re = new RegExp("\\b" + name + "\\s*=\\s*([\\\"'])(.*?)\\1", "i");
  return (tag.match(re)?.[2] || "").replace(/&amp;/gi, "&").replace(/&#38;/gi, "&");
}
function canonicalLinks(html) {
  return (html.match(/<link\b[^>]*>/gi) || [])
    .filter(tag => attr(tag, "rel").toLowerCase().split(/\s+/).includes("canonical"))
    .map(tag => attr(tag, "href"));
}
function robots(html) {
  return (html.match(/<meta\b[^>]*>/gi) || [])
    .filter(tag => ["robots", "googlebot"].includes(attr(tag, "name").toLowerCase()))
    .map(tag => attr(tag, "content").toLowerCase()).join(",");
}
async function fetchPage(path) {
  let last = "";
  for (let attempt = 0; attempt < 3; attempt++) {
    const url = new URL(path, origin);
    url.searchParams.set("_gsc_proof", String(process.env.GITHUB_SHA || "local").slice(0, 9) + "-" + attempt);
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(20_000),
        cache: "no-store",
        headers: { "user-agent": "TexasDefined-GSC-Canonical-Acceptance/1.0" },
      });
      const html = await response.text();
      if (response.ok && response.headers.get("cf-mitigated") !== "challenge") return html;
      last = "HTTP " + response.status;
    } catch (e) { last = String(e); }
    if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 1500));
  }
  throw new Error("Production fetch failed for " + path + ": " + last);
}
function assertCalendarButtons(html, path) {
  const grid = html.match(/class=["']ev-days["'][^>]*>([\s\S]*?)<\/div>/i)?.[1] || "";
  const nav = html.match(/class=["']ev-cal-nav["'][^>]*>([\s\S]*?)<\/div>/i)?.[1] || "";
  assert(grid, path + ": SSR calendar day grid missing");
  assert(nav, path + ": SSR calendar month navigation missing");
  assert((grid.match(/<button\b/gi) || []).length === 42, path + ": expected 42 keyboard-accessible day buttons");
  assert((nav.match(/<button\b/gi) || []).length === 4, path + ": expected four month/date navigation buttons");
  assert(!/<a\b/gi.test(grid + nav), path + ": crawlable calendar date/month link graph reintroduced");
  assert(grid.includes("aria-label="), path + ": calendar day buttons need accessible names");
}
for (const [path, preferred, filtered, calendar] of checks) {
  const html = await fetchPage(path);
  const links = canonicalLinks(html);
  assert(links.length === 1, path + ": must render exactly one canonical, found " + links.length);
  assert(links[0] === origin + preferred, path + ": canonical mismatch " + links[0]);
  const robot = robots(html);
  if (filtered) assert(/(?:^|[,\s])noindex(?:$|[,\s])/.test(robot), path + ": filtered calendar must noindex");
  else assert(!/(?:^|[,\s])noindex(?:$|[,\s])/.test(robot), path + ": clean canonical landing must not noindex");
  if (calendar) assertCalendarButtons(html, path);
  console.log("[GSC alternate] OK " + path + " -> " + preferred + "; robots=" + (robot || "default"));
}
console.log("PASS: GSC alternate canonical destinations, calendar crawl space, and shareable functional query views.");
