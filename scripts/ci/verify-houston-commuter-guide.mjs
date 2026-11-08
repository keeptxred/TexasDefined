#!/usr/bin/env node
// Focused editorial gate: checks source-backed coverage and deployed HTML.
// Never updates the review date automatically or invents route travel times.
import { readFileSync } from "node:fs";
const source = readFileSync("src/data/fixtures/relocation-authority-expansion.ts", "utf8");
const stub = readFileSync("src/data/fixtures/lazy-relocation-authority-expansion.ts", "utf8");
const tool = readFileSync("src/components/relocation/HoustonCommuterPlanner.tsx", "utf8");
const route = readFileSync("src/routes/article.$slug.tsx", "utf8");
const slug = "best-houston-suburbs-for-commuters";
const start = source.indexOf("const houstonCommuters = base({");
const end = source.indexOf('}, "relocation-authority-houston-commuters");', start);
const fail = (message) => { throw new Error("Houston commuter guide: " + message); };
if (start < 0 || end < start) fail("article source not found");
const article = source.slice(start, end);
function required(content, tokens, name) {
  for (const token of tokens) if (!content.includes(token)) fail(name + " missing: " + token);
}
required(article, [
  slug, "31.1-minute", "2024 ACS 1-year", "2025 congestion",
  "The Woodlands Express", "Fort Bend Transit", "METRO", "Houston TranStar",
  "Texas Medical Center", "Port/Ship Channel", "Richmond/Rosenberg",
  "Friendswood", "Missouri City", "Kingwood", "sources:",
  "2024 five-year", "27.0 ± 2.6", "32.7 ± 1.0",
  "2025 weekday historical freeway review", "79%", "57%", "46%",
  "Methodology, sources and what this guide cannot claim",
  "not a measured drive-time dataset", "three normal weekdays"
], "editorial content");
required(tool, [
  "houston-commute-planner", "Regional orientation map",
  "www.openstreetmap.org/export/embed.html", "The Woodlands Express",
  "Fort Bend Transit", "Candidate home A", "Candidate home B",
  "Round-trip miles", "52 / 12", "not rankings or measured journey times",
  "ACS 2024 five-year", "The Woodlands CDP", "Sugar Land city",
  "League City city", "Katy city proper", "Pearland city",
  "censusreporter.org/profiles/16000US4872656", "31.3 ± 1.6 min",
  'mode: "drive" | "transit"', "Round-trip transit fares per office day",
  "Station access, parking and last-mile cost per office day",
  "Drive to workplace", "Scheduled transit (if verified)"
], "comparison tool");
required(route, [
  'import("@/components/relocation/HoustonCommuterPlanner")',
  'article.slug === "best-houston-suburbs-for-commuters"',
  "<HoustonCommuterPlanner />",
  "houstonCommuterImageRights",
  "acquireLicensePage: houstonCommuterImageRights.sourceUrl",
  "license: houstonCommuterImageRights.licenseUrl",
  'creator: { "@type": "Person", name: "Famartin" }'
], "article route");
required(stub, [slug, "Best Houston Suburbs for Commuters: Compare by Job Corridor", 'updatedAt: "2026-11-08"'], "catalog");
required(article, ["Best Houston Suburbs for Commuters: Compare by Job Corridor", 'updatedAt: "2026-11-08"'], "article");
if (article.includes("guaranteed commute") || article.includes("universally best suburb")) fail("unsubstantiated commute guarantee");
const reviewed = article.match(/updatedAt:\s*"(\d{4}-\d{2}-\d{2})"/);
if (!reviewed) fail("review date missing");
const age = (Date.now() - Date.parse(reviewed[1] + "T00:00:00Z")) / 86400000;
if (age > 125 && !process.argv.includes("--no-age-check")) fail("review date older than 125 days: re-check and update truthfully");
if (age < -2) fail("future review date");
console.log("PASS local Houston editorial, map, calculator and source coverage");

const references = [
  ["METRO", "https://www.ridemetro.org/riding-metro/transit-services/park-and-ride-bus"],
  ["The Woodlands Express", "https://www.woodlandstransit.com/Express/Schedules"],
  ["Fort Bend Transit", "https://www.fortbendcountytx.gov/government/departments/public-transportation/services/commuter-park-and-ride-services"],
  ["Houston TranStar", "https://traffic.houstontranstar.org/hist/hist_traveltimes_menu.aspx"],
  ["TxDOT", "https://www.txdot.gov/about/newsroom/stories/2025/state-transportation-investments-continue-to-save-texas-commuters-millions.html"],
  ["ACS 2024 metro", "https://censusreporter.org/profiles/31000US26420-houston-pasadena-the-woodlands-tx-metro-area/"],
];
async function fetchChecked(url) {
  let lastFailure = null;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        cache: "no-store",
        signal: AbortSignal.timeout(18000),
        headers: {
          "user-agent": "TexasDefined-Editorial-Source-Verification/1.0",
          "cache-control": "no-cache",
          pragma: "no-cache",
        },
      });
      if (!response.ok || response.headers.get("cf-mitigated") === "challenge") {
        throw new Error("HTTP " + response.status + (response.headers.get("cf-mitigated") ? " (Cloudflare challenge)" : ""));
      }
      const body = await response.text();
      if (body.length < 150) throw new Error("suspiciously empty HTTP response");
      return body;
    } catch (error) {
      lastFailure = error;
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
    }
  }
  fail("HTTP/source verification needed: " + url + " — " + String(lastFailure));
}
if (process.argv.includes("--sources")) {
  const errors = [];
  for (const [label, url] of references) {
    try { await fetchChecked(url); console.log("PASS upstream: " + label); }
    catch (error) { errors.push(label + ": " + String(error)); }
  }
  if (errors.length) fail("upstream source accessibility requires review: " + errors.join(" | "));
}
if (process.argv.includes("--live")) {
  const origin = process.env.PRODUCTION_ORIGIN || "https://texasdefined.com";
  const html = await fetchChecked(origin + "/article/" + slug + "?commuter_probe=" + Date.now());
  required(html, [
    "Best Houston Suburbs for Commuters: Compare by Job Corridor",
    "The Woodlands Express", "Fort Bend Transit",
    "31.1-minute", "79% of the time",
    "Methodology, sources and what this guide cannot claim"
  ], "live HTML");
  const canonical = origin + "/article/" + slug;
  const canonicalTags = html.match(/<link\b[^>]*>/gi) ?? [];
  if (!canonicalTags.some((tag) => /\brel=["']canonical["']/i.test(tag) && tag.includes(canonical))) {
    fail("exact canonical link missing for " + canonical);
  }
  if (/<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) fail("noindex tag found");
  if (!html.includes("application/ld+json")) fail("JSON-LD absent");
  // Google's ImageObject licensing feature requires metadata in the rendered
  // structured data, not just a visible attribution link or fixture constant.
  if (!html.includes("acquireLicensePage") || !html.includes("creativecommons.org/licenses/by-sa/4.0")) {
    fail("Houston hero photo ImageObject licensing fields are missing in live HTML");
  }
  if (!html.includes("Famartin")) fail("licensed Houston hero photographer attribution missing");
  console.log("PASS deployed content, indexability meta and structured data presence");
}
