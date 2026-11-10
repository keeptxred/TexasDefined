/**
 * Bounded independent production acceptance for /fishing/seasons.
 * Runs against real server-rendered visitor URLs on a GitHub runner.
 * No editorial dates are restamped by this checker; no sitewide crawl.
 */
import assert from "node:assert/strict";

const ORIGIN = "https://texasdefined.com";
const DIRECT_WORKER = "https://texasdefined-site.freddy-coppola.workers.dev";
const EXPECTED_CANONICAL = ORIGIN + "/fishing/seasons";
const focus = [
  "Cold-front planning", "Late-winter variability", "Spring transition checks",
  "Rainfall and access", "Late-spring travel planning", "Early-summer heat",
  "Heat and recreation traffic", "Low-water and launch checks",
  "Early-fall transitions", "Autumn lake changes", "Late-fall fronts",
  "Winter safety and access",
];
const checks = [];

async function fetchPage(origin, path, cacheBust = false) {
  const url = new URL(path, origin);
  if (cacheBust) url.searchParams.set("seasons_authority_release_check", Date.now().toString());
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { "cache-control": "no-cache", "user-agent": "TexasDefinedFishingSeasonsAuthority/1.0" },
        signal: AbortSignal.timeout(20_000),
        redirect: "follow",
      });
      assert.equal(response.status, 200, url + ": HTTP " + response.status);
      const html = await response.text();
      return { html, url: url.href, bytes: html.length };
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
    }
  }
  throw new Error(url + ": source unavailable after retries: " + String(lastError));
}

const visible = (html) => html.replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, " ")
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
  .replace(/<!--\s*-->/g, "")
  .replace(/<[^>]+>/g, " ")
  .replace(/&(?:nbsp|#160);/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/\s+/g, " ").trim();

function canonical(html) {
  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    if (!/\brel=["']canonical["']/i.test(tag)) continue;
    return tag.match(/\bhref=["']([^"']+)["']/i)?.[1] ?? "";
  }
  return "";
}
function assertCanonical(html, scope) {
  assert.equal(canonical(html), EXPECTED_CANONICAL, scope + ": canonical URL mismatch");
  assert.ok(!/<meta\b[^>]*name=["'](?:robots|googlebot)["'][^>]*content=["'][^"']*noindex/i.test(html),
    scope + ": unexpected noindex");
}
function assertLanding(html, scope) {
  assertCanonical(html, scope);
  const text = visible(html);
  for (const phrase of [
    "What to check in each Texas fishing month",
    "Start with verified lake examples across Texas",
    "Lake-and-species source dataset last reviewed:",
    "Page editorial and safety presentation reviewed:",
    "November 9, 2026", "August 14, 2026",
    "An absent warning here is not confirmation",
  ]) assert.ok(text.includes(phrase), scope + ": missing visible " + phrase);
  for (const name of focus) assert.ok(text.includes(name), scope + ": missing monthly focus " + name);
  assert.ok(/tpwd\.texas\.gov/i.test(html), scope + ": no official TPWD link");
  assert.ok(!text.includes("Last reviewed: August 14, 2026"), scope + ": old editorial date label");
  checks.push({ scope, type: "landing", months: focus.length, bytes: html.length });
}
function assertNovember(html, scope) {
  assertCanonical(html, scope);
  const text = visible(html);
  for (const phrase of [
    "November planning focus", "Late-fall fronts",
    "Alan Henry Reservoir", "Fish-consumption advisory:",
    "mercury-related fish-consumption restrictions",
    "Read TPWD",
  ]) assert.ok(text.includes(phrase), scope + ": missing visible " + phrase);
  assert.ok(/tpwd\.texas\.gov\/regulations\/outdoor-annual\/fishing\/general-rules-regulations\/fish-consumption-bans-and-advisories/.test(html),
    scope + ": no direct official fish-consumption source");
  checks.push({ scope, type: "November catfish Panhandle / Alan Henry", bytes: html.length });
}
for (const origin of [ORIGIN, DIRECT_WORKER]) {
  for (const cacheBust of [false, true]) {
    const mode = cacheBust ? "fresh" : "ordinary";
    const root = await fetchPage(origin, "/fishing/seasons", cacheBust);
    assertLanding(root.html, origin + " " + mode);
    const filtered = await fetchPage(origin, "/fishing/seasons?month=nov&species=catfish&region=panhandle", cacheBust);
    assertNovember(filtered.html, origin + " " + mode);
  }
}
const { html: robots } = await fetchPage(ORIGIN, "/robots.txt");
assert.ok(robots.includes("Disallow: /fishing/seasons?"),
  "robots.txt must avoid combinatorial crawl demand while leaving canonical root accessible");
checks.push({ scope: ORIGIN, type: "robots filtering verified" });
const { html: sitemap } = await fetchPage(ORIGIN, "/sitemap.xml");
assert.ok(sitemap.includes("<loc>" + EXPECTED_CANONICAL + "</loc>"),
  "Canonical fishing seasons URL missing from sitemap");
assert.ok(!sitemap.includes("<loc>" + EXPECTED_CANONICAL + "?"),
  "Parameter URLs should not be emitted in sitemap");
checks.push({ scope: ORIGIN, type: "sitemap canonical verified" });
console.log(JSON.stringify({ status: "PASS", subject: EXPECTED_CANONICAL,
  limitation: "Technical SSR, source-display and crawl acceptance; not a 95+ editorial certification or Google's indexing decision.",
  checks }, null, 2));
