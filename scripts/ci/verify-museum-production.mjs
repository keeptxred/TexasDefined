#!/usr/bin/env node
/**
 * Bounded, post-deployment museum acceptance.
 *
 * Distinguish page transport and search-index readiness from a full independent
 * editorial certification. Exactly one HTTP request per URL; do not poll CI or
 * accept unrelated stock photography to make an unverified guide indexable.
 */
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { primaryDestinationHeroSrc, primaryDestinationHeroAlt, isMissingPrimaryDestinationHero } from "./museum-primary-hero.mjs";

const origin = (process.env.TD_PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/+$/, "");
const local = JSON.parse(readFileSync("public/museum-verification-manifest.json", "utf8"));
const expectedPaths = new Set(local.museums.map(item => item.path));
const required = [
  { slug: "alvin-historical-museum", indexed: true, image: "Former_alvin_tx_post_office.jpg" },
  { slug: "museum-of-the-american-railroad-frisco", indexed: true, image: "Frisco_June_2019_28_" },
  { slug: "the-history-center-diboll", indexed: true, image: "Texas_South-Eastern_Railroad_Engine_4.jpg" },
  { slug: "port-isabel-historical-museum", indexed: true, image: "Part_of_an_elaborate_", phrase: "Fish mural across the historic" },
  { slug: "sixth-floor-museum-at-dealey-plaza", indexed: true, phrase: "Is the museum accessible by DART or the TRE train?" },
  { slug: "uss-lexington-museum-corpus-christi", indexed: true, phrase: "Can visitors buy ordinary USS Lexington admission tickets online?" },
  { slug: "texas-country-music-hall-of-fame-carthage", indexed: true, image: "Texas_Country_Music_Hall_of_Fame_and_Tex_Ritter_Museum_IMG_2956.JPG", phrase: "Are Hall of Fame induction concerts included in museum admission?", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/", primaryAlt: "Texas Country Music Hall of Fame and Tex Ritter Museum building in Carthage", commonsFile: "Texas_Country_Music_Hall_of_Fame_and_Tex_Ritter_Museum_IMG_2956.JPG" },
  { slug: "bryan-museum-galveston", indexed: true, image: "Galveston_Texas_-_The_Bryan_Museum_-_January_2025_-_1.jpg", phrase: "Was The Bryan Museum originally the Galveston Orphans Home?", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", primaryAlt: "The Bryan Museum in Galveston, photographed January 2025", commonsFile: "Galveston_Texas_-_The_Bryan_Museum_-_January_2025_-_1.jpg" },
  { slug: "menil-collection-houston", indexed: true, image: "Menil_Collection_Houston_(5887512203).jpg", phrase: "Is admission to the Menil Collection in Houston always free?", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" },
  { slug: "grace-museum-abilene", indexed: true, image: "The_Grace_Museum_Abilene_Texas_2015.jpg", phrase: "Is the Spark Science Center inside The Grace Museum building?", licenseUrl: "https://creativecommons.org/licenses/by/4.0/" },
  { slug: "frontiers-of-flight-museum-dallas", indexed: true, image: "Frontiers_of_Flight_Museum_December_2015_107_", phrase: "Can I see the Apollo 7 command module at Frontiers of Flight?", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  { slug: "museum-of-texas-tech-university-lubbock", indexed: true, image: "Museum_of_Texas_Tech_University_IMG_0038.JPG", phrase: "Is Moody Planetarium included with the free museum admission?", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" },
  { slug: "museum-of-south-texas-history-edinburg", indexed: true, image: "Old_Hidalgo_County_Jail_Edinburg_Texas_2021.jpg", phrase: "Is the museum free on Saturday mornings in Edinburg?", licenseUrl: "https://creativecommons.org/licenses/by/4.0/" },
  { slug: "mcnay-art-museum-san-antonio", indexed: true, image: "McNay_Art_Museum_May_2018_2_(Courtyard).jpg", phrase: "When are the McNay's free-admission hours, and do they cover special exhibitions?", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  { slug: "texas-military-forces-museum", indexed: true, image: "Ceremonies_at_Camp_Mabry_190112-Z-DZ751-0199_", phrase: "What documents do I need to enter Camp Mabry to visit the museum?", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" },
  { slug: "museum-of-the-gulf-coast-port-arthur", indexWhenPhotoCleared: true },
  { slug: "el-paso-holocaust-museum", indexWhenPhotoCleared: true },
  { slug: "texas-broadcast-museum-kilgore", indexWhenPhotoCleared: true },
  { slug: "johnny-nelson-katy-heritage-museum", indexWhenPhotoCleared: true },
];
const errors = [], observations = [], openPhotoGaps = [];
// Existing bounded 19-page smoke remains default for manual workflows.
// Protected deploys can opt into complete canonical route acceptance for every
// published museum through MUSEUM_VERIFY_ALL_GUIDES=1. Source HTTP and SSR do
// not independently certify museum editorial content or image pixels.
const fullManifestSweep = process.env.MUSEUM_VERIFY_ALL_GUIDES === "1";
const decode = value => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'");
function attr(markup, name) {
  const match = name === "href" ? markup.match(/href="([^"]*)"/i) : markup.match(/content="([^"]*)"/i);
  return decode(match?.[1] || "");
}
async function get(path) {
  const response = await fetch(origin + path, {
    redirect: "follow",
    signal: AbortSignal.timeout(25000),
    headers: { "Cache-Control": "no-cache", "User-Agent": "TexasDefined-Museum-Production/1.0" },
  });
  return { status: response.status, type: response.headers.get("content-type") || "", body: await response.text() };
}
function analyzeRoute(c, doc) {
  const path = "/destination/" + c.slug, issues = [];
  if (doc.status !== 200) issues.push("HTTP " + doc.status);
  if (!doc.type.includes("text/html")) issues.push("not HTML");
  const canonicalTag = (doc.body.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/i) || [])[0] || "";
  const canonical = attr(canonicalTag, "href");
  if (canonical !== origin + path) issues.push("wrong canonical: " + canonical);
  const robotTag = (doc.body.match(/<meta\b[^>]*name=["']robots["'][^>]*>/i) || [])[0] || "";
  const robots = attr(robotTag, "content");
  const noindex = robots.includes("noindex");
  const primaryHero = primaryDestinationHeroSrc(doc.body);
  const primaryAlt = primaryDestinationHeroAlt(doc.body);
  const hasMissingHero = isMissingPrimaryDestinationHero(doc.body);
  if (!doc.body.includes(c.slug.split("-").slice(0,2).join("-")) && !doc.body.includes("<h1")) issues.push("no recognizable page heading");
  if (c.indexed && noindex) issues.push("previously recovered guide reverted to noindex");
  if (c.indexed && hasMissingHero) issues.push("indexable guide reverted to missing-photo placeholder");
  if (!hasMissingHero && !primaryAlt) issues.push("museum primary photograph missing alt text");
  if (hasMissingHero && !noindex) issues.push("unlicensed or missing primary museum image is indexable");
  if (c.primaryAlt && !primaryAlt.includes(c.primaryAlt))
    issues.push("primary museum image alt mismatches photographed site: " + primaryAlt);
  if (c.image && !primaryHero.includes(c.image)) issues.push("required subject-specific primary hero missing: " + c.image);
  if (c.licenseUrl && !doc.body.includes(`href="${c.licenseUrl}"`)) issues.push("missing clickable Creative Commons hero license: " + c.licenseUrl);
  if (c.licenseUrl && !doc.body.includes("https://commons.wikimedia.org/wiki/File:"))
    issues.push("missing clickable Commons original-photo credit");
  if (c.commonsFile) {
    const originalLinks = [...doc.body.matchAll(/<a\b[^>]*href=["'](https:\/\/commons\.wikimedia\.org\/wiki\/File:[^"']+)["'][^>]*>/gi)]
      .map(match => decode(match[1]));
    if (!originalLinks.some(href => href.includes(c.commonsFile)))
      issues.push("wrong or missing exact original Commons photograph link: " + c.commonsFile);
  }
  if (c.phrase && !decode(doc.body).includes(c.phrase)) issues.push("researched visible visitor information absent: " + c.phrase);
  if (c.indexWhenPhotoCleared) {
    if (hasMissingHero && !noindex) issues.push("missing-photo page improperly indexable");
    if (hasMissingHero && noindex) openPhotoGaps.push(path);
    if (!hasMissingHero && noindex) issues.push("photo available but page still noindex");
  }
  return { path, status: doc.status, canonical, robots, primaryHero, primaryAlt, missingPhoto: hasMissingHero, issues };
}
try {
  const doc = await get("/museum-verification-manifest.json");
  if (doc.status !== 200 || !doc.type.includes("application/json")) throw Error("Production museum source manifest unavailable, HTTP " + doc.status);
  const live = JSON.parse(doc.body);
  const served = new Map((live.museums || []).map(entry => [entry.path, entry]));
  if (!Array.isArray(live.museums)) errors.push("Production museum manifest invalid");
  for (const path of expectedPaths) {
    if (!served.has(path)) errors.push("Missing production manifest path: " + path);
    else if (served.get(path).faqCount !== local.museums.find(x => x.path === path).faqCount)
      errors.push("FAQ count differs in production manifest: " + path);
  }
  observations.push({ manifest: { http: doc.status, recorded: live.museums?.length || 0, expectedAtLeast: local.museums.length, missing: [...expectedPaths].filter(x => !served.has(x)) } });
} catch (error) {
  errors.push("Manifest request failed: " + String(error));
}
await Promise.all(required.map(async c => {
  try {
    const result = analyzeRoute(c, await get("/destination/" + c.slug));
    observations.push(result);
    errors.push(...result.issues.map(issue => c.slug + ": " + issue));
  } catch (error) {
    errors.push(c.slug + ": " + String(error));
  }
}));
const requiredSlugs = new Set(required.map(c => c.slug));
const extraPaths = fullManifestSweep
  ? [...expectedPaths].filter(path => !requiredSlugs.has(path.slice("/destination/".length)))
  : [];
// Limit concurrent requests. An expanded museum inventory should not turn one
// release smoke into an unbounded Cloudflare request burst.
const workers = Array.from({ length: Math.min(8, extraPaths.length) }, async (_, index) => {
  for (let i = index; i < extraPaths.length; i += 8) {
    const path = extraPaths[i];
    try {
      const result = analyzeRoute({ slug: path.slice("/destination/".length) }, await get(path));
      observations.push(result);
      errors.push(...result.issues.map(issue => path + ": " + issue));
    } catch (error) {
      errors.push(path + ": " + String(error));
    }
  }
});
await Promise.all(workers);
const report = {
  checkedAt: new Date().toISOString(),
  origin,
  verifiedFrom: process.env.GITHUB_SHA || null,
  scope: fullManifestSweep
    ? `Live manifest and all ${local.museums.length} museum destination routes (SSR/transport, not browser/editorial certification)`
    : `Manifest and ${required.length} specific visitor routes, not every Texas museum`,
  fullManifestSweep,
  authorityCertified: false,
  checkedRoutes: required.length + extraPaths.length,
  remainingPhotographicGaps: openPhotoGaps.sort(),
  errors,
  observations,
};
mkdirSync(".artifacts", { recursive: true });
writeFileSync(".artifacts/museum-production-acceptance.json", JSON.stringify(report, null, 2) + "\n");
console.log("Museum production acceptance:", JSON.stringify({
  manifestExpectedAtLeast: local.museums.length,
  checkedRoutes: required.length + extraPaths.length,
  openPhotoGaps: openPhotoGaps.length,
  failures: errors.length,
}));
for (const issue of errors) console.error(" - " + issue);
if (errors.length) process.exitCode = 1;
