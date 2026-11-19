#!/usr/bin/env node
/**
 * Exact-release, two-origin acceptance for the three researched Texas heritage
 * guides. This verifies publication evidence, not Google's indexing or rank.
 * It runs AFTER the guarded Cloudflare publish; it does not waive unrelated gates.
 */
import { mkdir, writeFile } from "node:fs/promises";

const canonicalOrigin = "https://texasdefined.com";
const origins = [canonicalOrigin, "https://texasdefined-site.freddy-coppola.workers.dev"];
const revision = process.env.GITHUB_SHA || "manual";
const source = [
  {
    path: "/destination/texas-state-capitol",
    title: "Texas State Capitol",
    markers: ["Goddess of Liberty", "1936 Texas Centennial", "XIT Ranch", "North Entrance", "1201 San Jacinto"],
    operator: "tspb.texas.gov",
    imageCreator: "Daderot",
    imageLicense: "https://creativecommons.org/publicdomain/zero/1.0/",
    companions: ["/destination/lbj-presidential-library-austin"],
  },
  {
    path: "/destination/lbj-presidential-library-austin",
    alias: "/destination/lbj-presidential-library",
    title: "LBJ Presidential Library",
    markers: ["Origins of Ambition", "Poverty", "45 million pages", "March 2026", "January 10, 2027"],
    operator: "lbjlibrary.org",
    imageCreator: "ajay_suresh",
    imageLicense: "https://creativecommons.org/licenses/by/4.0/",
    companions: ["/destination/texas-state-capitol"],
  },
  {
    path: "/destination/mission-san-jose-san-antonio",
    alias: "/destination/mission-san-jose",
    title: "Mission San José",
    markers: ["1758", "281 Indigenous", "28 plots", "Pedro Huizar", "5 p.m.", "26–30 inches"],
    operator: "nps.gov",
    imageCreator: "Steven B Yount",
    imageLicense: "https://creativecommons.org/licenses/by-sa/4.0/",
    companions: ["/destination/mission-concepcion-san-antonio"],
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'").replaceAll("&nbsp;", " ");
async function get(origin, path, redirect = "follow") {
  let failure;
  for (let attempt = 0; attempt < 3; attempt++) {
    const url = new URL(path, origin);
    url.searchParams.set("heritage_release", revision.slice(0, 12));
    try {
      const response = await fetch(url, {
        redirect,
        headers: { "User-Agent": "TexasDefined-Heritage-ExactRelease/1.0", "Cache-Control": "no-cache" },
        signal: AbortSignal.timeout(25000),
      });
      if (response.status < 500) return response;
      failure = new Error(`${origin}${path} returned HTTP ${response.status}`);
    } catch (error) {
      failure = error;
    }
    if (attempt < 2) await sleep(1200 * (attempt + 1));
  }
  throw failure;
}
function canonicalMatches(html, target) {
  const links = html.match(/<link\b[^>]*>/gi) || [];
  return links.some((tag) =>
    /\brel=["']canonical["']/i.test(tag) &&
    decode(tag).includes(`href="${target}"`) || (
      /\brel=['"]canonical['"]/i.test(tag) &&
      decode(tag).includes(`href='${target}'`)
    )
  );
}
function rejectsIndexing(html) {
  return (html.match(/<meta\b[^>]*>/gi) || []).some((tag) =>
    /\bname=["']robots["']/i.test(tag) && /noindex/i.test(tag)
  );
}
/**
 * Parse actual shipped JSON-LD rather than matching a license string anywhere
 * in the HTML. Require the exact primaryimage node's verified creator/rights.
 */
function imageLicenseMetadataValid(html, item, canonicalUrl) {
  const scriptRx = /<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const script of html.matchAll(scriptRx)) {
    let parsed;
    try { parsed = JSON.parse(script[1]); } catch { continue; }
    const nodes = Array.isArray(parsed["@graph"]) ? parsed["@graph"] : [parsed];
    for (const node of nodes) {
      const images = Array.isArray(node.image) ? node.image : node.image ? [node.image] : [];
      for (const img of images) {
        if (img?.["@id"] !== canonicalUrl + "#primaryimage") continue;
        if (img?.license !== item.imageLicense ||
          img?.creator?.name !== item.imageCreator ||
          !img?.copyrightNotice || !img?.acquireLicensePage ||
          !img?.creditText || !img?.contentUrl ||
          img?.contentUrl !== img?.url) return false;
        const source = new URL(img.acquireLicensePage);
        if (source.hostname !== "commons.wikimedia.org" ||
          !source.pathname.startsWith("/wiki/File:")) return false;
        return true;
      }
    }
  }
  return false;
}
function htmlHasUsefulImage(html, title) {
  const images = html.match(/<img\b[^>]*>/gi) || [];
  return images.some((tag) =>
    /\balt=["'][^"']{12,}["']/i.test(tag) &&
    (/\bsrc=["']https?:/i.test(tag) || /\bsrc=["']\//i.test(tag)) &&
    !/alt=["']\s*["']/i.test(tag)
  ) && html.includes(title);
}

const results = [];
const failures = [];
for (const origin of origins) {
  for (const item of source) {
    const result = { origin, path: item.path, expectedCanonical: canonicalOrigin + item.path };
    try {
      const response = await get(origin, item.path);
      result.status = response.status;
      if (response.status !== 200) throw Error(`HTTP ${response.status}`);
      const html = decode(await response.text());
      result.canonical = canonicalMatches(html, result.expectedCanonical);
      result.indexable = !rejectsIndexing(html);
      result.markers = item.markers.filter((marker) => html.includes(marker));
      result.operatorLinked = html.includes(item.operator);
      result.companionsLinked = item.companions.every((path) => html.includes(path));
      result.documentaryImage = htmlHasUsefulImage(html, item.title) && /commons.wikimedia.org|creativecommon|public domain/i.test(html);
      result.jsonLd = html.includes("application/ld+json");
      result.imageLicenseMetadata = imageLicenseMetadataValid(html, item, result.expectedCanonical);
      result.h1 = /<h1\b[^>]*>[\s\S]*?<\/h1>/i.test(html);
      if (!result.canonical || !result.indexable || !result.operatorLinked ||
          !result.companionsLinked || !result.documentaryImage || !result.jsonLd ||
          !result.h1 || !result.imageLicenseMetadata || result.markers.length !== item.markers.length) {
        throw Error("Production HTML missing required facts, source, linked companions, exact-file image licensing JSON-LD, or SEO metadata");
      }
      result.ok = true;
    } catch (error) {
      result.ok = false;
      result.error = String(error);
      failures.push(`${origin}${item.path}: ${result.error}`);
    }
    results.push(result);
    if (item.alias) {
      const aliasResult = { origin, path: item.alias, target: item.path };
      try {
        const response = await get(origin, item.alias, "manual");
        aliasResult.status = response.status;
        aliasResult.location = response.headers.get("location");
        const destination = aliasResult.location && new URL(aliasResult.location, origin);
        aliasResult.ok = aliasResult.status === 301 && destination?.pathname === item.path;
        if (!aliasResult.ok) throw Error("Short alias must return HTTP 301 to existing canonical route");
      } catch (error) {
        aliasResult.ok = false;
        aliasResult.error = String(error);
        failures.push(`${origin}${item.alias}: ${aliasResult.error}`);
      }
      results.push(aliasResult);
    }
  }
}
// A meaningful incoming link from the published, established Alamo attraction
// strengthens discoverability without misleading users or creating duplicate URLs.
try {
  const inbound = await get(canonicalOrigin, "/destination/the-alamo");
  if (inbound.status !== 200) throw Error("Alamo authority page did not serve HTTP 200");
  const html = await inbound.text();
  const linked = html.includes('href="/destination/mission-san-jose-san-antonio"');
  results.push({ path: "/destination/the-alamo", target: "/destination/mission-san-jose-san-antonio", missionSanJoseLinked: linked });
  if (!linked) failures.push("Alamo authority page lacks contextual inbound link to canonical Mission San José");
} catch (error) {
  failures.push("Mission San José crosslink discovery verification: " + String(error));
}
try {
  const sitemapResponse = await get(canonicalOrigin, "/sitemap-explore.xml");
  if (!sitemapResponse.ok) throw Error(`sitemap-explore.xml HTTP ${sitemapResponse.status}`);
  const xml = await sitemapResponse.text();
  for (const item of source) {
    const found = xml.includes(`<loc>${canonicalOrigin}${item.path}</loc>`);
    results.push({ path: item.path, sitemap: found });
    if (!found) failures.push(`Explore sitemap missing ${item.path}`);
  }
} catch (error) {
  failures.push("Explore sitemap verification: " + String(error));
}
await mkdir(".artifacts", { recursive: true });
await writeFile(".artifacts/heritage-three-production.json", JSON.stringify({
  sourceSha: revision, checkedAt: new Date().toISOString(), results, failures,
}, null, 2) + "\n");
console.log(JSON.stringify({ sourceSha: revision, checked: results.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
