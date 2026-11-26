#!/usr/bin/env node
// Bounded, daily production acceptance for Google's alternate-canonical sample.
// These query URLs are functional filtered/prefilled views, not independent
// authority pages. Exact historical GSC exceptions are covered separately from
// the original six representative probes so no false recrawl claim is made.
const origin = String(process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const checks = [
  ["/events", "/events", false, true],
  ["/fishing/plan", "/fishing/plan", false, false],
  // Exact November 22 owner GSC duplicate report and Google-selected planner alias.
  ["/events?venue=sports-venue%3Adickies-arena&start=2026-10-29&end=2026-10-29", "/events", true, true],
  ["/fishing/plan?species=%5B%22hybrid-striped-bass%22%5D&view=map", "/fishing/plan", false, false],
  ["/fishing/plan?species=hybrid-striped-bass&view=map", "/fishing/plan", false, false, "/fishing/plan?species=%5B%22hybrid-striped-bass%22%5D&view=map"],
  ["/texas-property-tax-estimator", "/texas-property-tax-estimator", false, false],
  ["/corporate-events", "/corporate-events", false, false],
  ["/moving-to-texas", "/moving-to-texas", false, false],
  ["/partner-with-us", "/partner-with-us", false, false],
  ["/events?venue=sports-venue%3Aeagle-stadium-allen&start=2027-04-15&end=2027-04-15", "/events", true, true],
  ["/texas-property-tax-estimator?county=bailey", "/texas-property-tax-estimator", false, false],
  ["/corporate-events?city=Texas&guests=45&type=meetings", "/corporate-events", false, false],
  // Owner-GSC URL Inspection still saw these two parameterized URLs indexed as
  // their own canonicals on Nov 18. They must declare the clean parent in live HTML.
  ["/corporate-events?city=Dallas&guests=45&type=company-parties", "/corporate-events", false, false],
  ["/corporate-events?city=Abilene&guests=45&type=company-parties", "/corporate-events", false, false],
  ["/moving-to-texas?originState=Oregon", "/moving-to-texas", false, false],
  ["/partner-with-us?type=sports-travel&source=%2Fsports-venues&partnershipType=sports-travel&sourcePath=%2Fsports-venues", "/partner-with-us", false, false],
  // Its two-key historical Google-selected URL must also remain a prefilled
  // functional form with a single clean parent canonical after PR #7095.
  ["/partner-with-us?type=sports-travel&source=%2Fsports-venues", "/partner-with-us", false, false],
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
async function fetchPage(path, normalizedPath) {
  let last = "";
  for (let attempt = 0; attempt < 3; attempt++) {
    const url = new URL(path, origin);
    url.searchParams.set("_gsc_proof", String(process.env.GITHUB_SHA || "local").slice(0, 9) + "-" + attempt);
    try {
      const options = {
        signal: AbortSignal.timeout(20_000),
        cache: "no-store",
        redirect: "manual", // Never hide an accidental 301/302/307/308 or a redirect loop.
        headers: { "user-agent": "TexasDefined-GSC-Canonical-Acceptance/1.0" },
      };
      let response = await fetch(url, options);
      // Only the documented planner scalar-to-array normalization may redirect.
      // Check the exact destination and retained nonce before fetching once more.
      if (normalizedPath && [301, 302, 303, 307, 308].includes(response.status)) {
        const location = response.headers.get("location");
        assert(location, path + ": normalization redirect missing Location");
        const actual = new URL(location, url);
        const expected = new URL(normalizedPath, origin);
        expected.searchParams.set("_gsc_proof", url.searchParams.get("_gsc_proof"));
        actual.searchParams.sort(); expected.searchParams.sort();
        assert(actual.href === expected.href, path + ": unexpected normalization redirect " + actual.href);
        await response.body?.cancel();
        response = await fetch(actual, options);
      }
      const html = await response.text();
      if (response.status === 200 && response.headers.get("cf-mitigated") !== "challenge" &&
          (response.headers.get("content-type") || "").toLowerCase().includes("text/html")) {
        return { html, response };
      }
      last = "HTTP " + response.status + "; content-type=" + (response.headers.get("content-type") || "missing") +
        "; location=" + (response.headers.get("location") || "none");
    } catch (e) { last = String(e); }
    if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 1500));
  }
  throw new Error("Production fetch failed for " + path + ": " + last);
}

// HTTP Link canonical headers are optional. If present, they may not contradict
// the one explicit server-rendered HTML canonical.
function httpCanonicalLinks(value) {
  return value.split(/,(?=\s*<)/).flatMap(part => {
    const link = part.match(/<([^>]+)>/);
    const rel = part.match(/(?:^|;)\s*rel\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s;,]+))/i);
    if (!link || !rel) return [];
    const tokens = (rel[1] || rel[2] || rel[3]).toLowerCase().split(/\s+/);
    return tokens.includes("canonical") ? [link[1]] : [];
  });
}
function ogCanonicalUrls(html) {
  return (html.match(/<meta\b[^>]*>/gi) || [])
    .filter(tag => attr(tag, "property").toLowerCase() === "og:url")
    .map(tag => attr(tag, "content"));
}
function queryBearingPageSchemaUrls(html, preferred) {
  const bad = [];
  for (const script of html.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) || []) {
    const openTag = script.slice(0, script.indexOf(">") + 1);
    if (!/type\s*=\s*(["'])application\/ld\+json\1/i.test(openTag)) continue;
    let data;
    try { data = JSON.parse(script.slice(openTag.length).replace(/<\/script>$/i, "")); }
    catch (error) { throw new Error("Unparseable SSR JSON-LD: " + String(error)); }
    function walk(node) {
      if (!node || typeof node !== "object") return;
      if (Array.isArray(node)) { for (const item of node) walk(item); return; }
      for (const [key, value] of Object.entries(node)) {
        if ((key === "url" || key === "@id") && typeof value === "string") {
          try {
            const ref = new URL(value);
            if (ref.origin === origin && ref.pathname === preferred && ref.search) bad.push(value);
          } catch { /* IDs and relative schema references need not be URLs. */ }
        } else if (value && typeof value === "object") walk(value);
      }
    }
    walk(data);
  }
  return bad;
}
function anyNoindex(value) {
  return /(?:^|[,\s:])noindex(?:$|[,\s;])/i.test(value);
}
async function verifyPrimarySitemap() {
  let last = "";
  for (let attempt = 0; attempt < 3; attempt++) {
    const url = new URL("/sitemap.xml", origin);
    url.searchParams.set("_gsc_proof", String(process.env.GITHUB_SHA || "local").slice(0, 9) + "-" + attempt);
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(25_000),
        cache: "no-store",
        redirect: "manual",
        headers: { "user-agent": "TexasDefined-GSC-Canonical-Acceptance/1.0" },
      });
      const xml = await response.text();
      if (response.status === 200 && /<urlset\b/i.test(xml)) {
        const sitemapUrls = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)]
          .map(match => match[1].replace(/&amp;/gi, "&").trim());
        for (const parent of ["/events", "/texas-property-tax-estimator", "/corporate-events", "/moving-to-texas", "/partner-with-us", "/fishing/plan"]) {
          const count = sitemapUrls.filter(url => url === origin + parent).length;
          assert(count === 1, "Primary sitemap must list clean " + parent + " exactly once; found " + count);
        }
        assert(!sitemapUrls.some(item => {
          try { return new URL(item).search.length > 0; }
          catch { return true; }
        }), "Primary sitemap contains a parameterized or invalid <loc>");
        console.log("[GSC alternate] OK primary sitemap: six clean parents, zero query URLs");
        return;
      }
      last = "HTTP " + response.status + "; location=" + (response.headers.get("location") || "none") +
        "; XML bytes=" + xml.length;
    } catch (error) { last = String(error); }
    if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 1500));
  }
  throw new Error("Primary canonical sitemap unavailable: " + last);
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
for (const [path, preferred, filtered, calendar, normalizedPath] of checks) {
  const { html, response } = await fetchPage(path, normalizedPath);
  const links = canonicalLinks(html);
  assert(links.length === 1, path + ": must render exactly one canonical, found " + links.length);
  assert(links[0] === origin + preferred, path + ": canonical mismatch " + links[0]);
  const headerLinks = httpCanonicalLinks(response.headers.get("link") || "");
  assert(headerLinks.length <= 1 && headerLinks.every(url => url === origin + preferred),
    path + ": conflicting HTTP Link canonical headers: " + JSON.stringify(headerLinks));
  const ogUrls = ogCanonicalUrls(html);
  assert(ogUrls.every(url => url === origin + preferred),
    path + ": conflicting Open Graph URL(s): " + JSON.stringify(ogUrls));
  const schemaConflicts = queryBearingPageSchemaUrls(html, preferred);
  assert(schemaConflicts.length === 0,
    path + ": JSON-LD references a query-bearing canonical page: " + JSON.stringify(schemaConflicts));
  const metaRobots = robots(html);
  const headerRobots = response.headers.get("x-robots-tag") || "";
  if (filtered) {
    assert(anyNoindex(metaRobots), path + ": filtered calendar must noindex");
    // A specific Googlebot `index` meta left behind after replacing the
    // general robots tag is contradictory and may prevent consolidation.
    assert(!/(?:^|[,\s])index(?:$|[,\s;])/i.test(metaRobots + "," + headerRobots),
      path + ": filtered calendar has a contradictory index directive: " + metaRobots + "; header=" + headerRobots);
  }
  else assert(!anyNoindex(metaRobots) && !anyNoindex(headerRobots),
    path + ": clean canonical landing must not noindex in meta/header; meta=" + metaRobots + "; header=" + headerRobots);
  if (calendar) assertCalendarButtons(html, path);
  if (path.startsWith("/fishing/plan?")) {
    const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    assert(/Hybrid Striped Bass/i.test(visible) && /Map coverage:/i.test(visible), path + ": species/map view lost");
  }
  if (path.startsWith("/partner-with-us?")) {
    assert(/Sports-travel partnership is preselected/i.test(html), path + ": partner prefill lost");
  }
  console.log("[GSC alternate] OK " + path + " -> " + preferred +
    "; HTTP=200 final; robots=" + (metaRobots || "default") +
    "; X-Robots-Tag=" + (headerRobots || "absent") +
    "; HTTP canonical=" + (headerLinks[0] || "absent"));
}
await verifyPrimarySitemap();
console.log("PASS: " + checks.length + " GSC parent/alternate HTML responses plus primary sitemap, HTTP headers, JSON-LD, calendar crawl space, and functional queries.");
