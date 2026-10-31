#!/usr/bin/env node
/**
 * Small, release-blocking live regression for the completed El Paso canonical
 * migration and Fredericksburg Explore sitemap. No broad crawl or cache purge.
 */
const canonicalOrigin = "https://texasdefined.com";
const directWorkerOrigin = "https://texasdefined-site.freddy-coppola.workers.dev";
const token = [process.env.GITHUB_SHA || "local", process.env.GITHUB_RUN_ID || "manual"].join("-");
const headers = { "cache-control": "no-cache", "user-agent": "TexasDefined-ElPaso-Fredericksburg-Release/1.0" };

async function request(url, redirect = "manual") {
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      return await fetch(url, { redirect, cache: "no-store", headers, signal: AbortSignal.timeout(30000) });
    } catch (error) {
      if (attempt === 2 || !["AbortError", "TimeoutError"].includes(error?.name)) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

for (const origin of [canonicalOrigin, directWorkerOrigin]) {
  const legacy = new URL("/destination/el-paso", origin);
  legacy.searchParams.set("td_verify", token);
  legacy.searchParams.set("source", "legacy-seo");
  const response = await request(legacy);
  if (response.headers.get("cf-mitigated")?.toLowerCase() === "challenge" || response.status !== 301) {
    throw new Error(`El Paso legacy URL must return HTTP 301 on ${origin}; received ${response.status}`);
  }
  const location = response.headers.get("location");
  if (!location) throw new Error(`El Paso legacy URL missing Location on ${origin}`);
  const target = new URL(location, origin);
  if (![origin, canonicalOrigin].includes(target.origin) ||
      target.pathname !== "/city/el-paso" ||
      target.searchParams.get("td_verify") !== token ||
      target.searchParams.get("source") !== "legacy-seo") {
    throw new Error(`El Paso canonical redirect target or query changed on ${origin}: ${target.href}`);
  }
  console.log(JSON.stringify({ kind: "el-paso-legacy-redirect", origin, status: response.status, target: target.pathname, queryPreserved: true, ok: true }));
}

const sitemapUrl = new URL("/sitemap-explore.xml", canonicalOrigin);
sitemapUrl.searchParams.set("td_verify", token);
const sitemapResponse = await request(sitemapUrl, "error");
if (sitemapResponse.status !== 200 ||
    sitemapResponse.headers.get("cf-mitigated")?.toLowerCase() === "challenge" ||
    !/^(application|text)\/(?:[a-z0-9.+-]*\+)?xml\b/i.test(sitemapResponse.headers.get("content-type") || "")) {
  throw new Error(`Explore sitemap HTTP/content type failed: ${sitemapResponse.status} ${sitemapResponse.headers.get("content-type")}`);
}
const sitemap = await sitemapResponse.text();
const expected = "<loc>https://texasdefined.com/destination/fredericksburg</loc>";
if (!sitemap.startsWith("<?xml") || sitemap.split(expected).length !== 2) {
  throw new Error("Fredericksburg canonical is absent, duplicated or not XML in live Explore sitemap");
}
if (sitemap.includes("<loc>https://texasdefined.com/destination/el-paso</loc>")) {
  throw new Error("Legacy El Paso destination should not remain indexable in Explore sitemap");
}
console.log(JSON.stringify({ kind: "fredericksburg-explore-sitemap", origin: canonicalOrigin, status: sitemapResponse.status, canonical: expected, matches: 1, ok: true }));


// Exact, bounded production acceptance for the rewritten Fredericksburg article.
// A successful Worker deployment or sitemap entry does not prove that the normal
// visitor URL no longer serves the old, duplicative 50+ winery roster.
const fredericksburgArticlePath = "/article/fredericksburg-texas-wineries-things-to-do-guide";
const fredericksburgArticleUrl = new URL(fredericksburgArticlePath, canonicalOrigin).href;
const expectedFredericksburgTitle = "Fredericksburg Weekend Guide: Winery Routes, Itineraries & Things to Do";
const expectedFredericksburgSections = [
  "The first decision: downtown, the 290 corridor or a countryside base",
  "Which winery experience should you choose?",
  "A realistic two-night, wine-focused itinerary",
  "Booking order that prevents wasted driving",
  "How Texas Defined checked this guide",
  "Sources and further reading",
];

function visibleArticleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, " ")
    .replace(/<!--[ \t\S\s]*?-->/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;|&#38;|&#x26;/gi, "&")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/\s+/g, " ");
}

function assertFredericksburgRewrite(html, origin, surface) {
  const text = visibleArticleText(html);
  for (const marker of [expectedFredericksburgTitle, ...expectedFredericksburgSections]) {
    if (!text.includes(marker)) {
      throw new Error(`Fredericksburg article ${surface} on ${origin} missing rewritten section: ${marker}`);
    }
  }
  for (const old of [
    "Fredericksburg winery and tasting-room research roster",
    "Augusta Vin — Highway 290 winery and hospitality property",
  ]) {
    if (text.includes(old)) {
      throw new Error(`Fredericksburg article ${surface} on ${origin} still serves retired winery-directory text: ${old}`);
    }
  }
  const canon = [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((hit) => hit[0])
    .find((tag) => /\brel=["']canonical["']/i.test(tag));
  if (!canon || !canon.includes(fredericksburgArticleUrl)) {
    throw new Error(`Fredericksburg article ${surface} on ${origin} missing its stable canonical URL`);
  }
  const robots = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0])
    .filter((tag) => /\bname=["']robots["']/i.test(tag));
  if (robots.some((tag) => /\bnoindex\b/i.test(tag))) {
    throw new Error(`Fredericksburg article ${surface} on ${origin} unexpectedly noindexed`);
  }
}

for (const origin of [canonicalOrigin, directWorkerOrigin]) {
  for (const surface of ["canonical-visitor", "cache-busted-release"]) {
    const url = new URL(fredericksburgArticlePath, origin);
    if (surface === "cache-busted-release") url.searchParams.set("td_verify", token);
    const response = await request(url, "error");
    if (response.status !== 200 || response.headers.get("cf-mitigated")?.toLowerCase() === "challenge"
      || !/^text\/html\b/i.test(response.headers.get("content-type") || "")) {
      throw new Error(`Fredericksburg article ${surface} on ${origin} failed HTML response: HTTP ${response.status}`);
    }
    const html = await response.text();
    assertFredericksburgRewrite(html, origin, surface);
    console.log(JSON.stringify({
      kind: "fredericksburg-article-live",
      origin,
      surface,
      status: response.status,
      cache: response.headers.get("cf-cache-status"),
      rewritten: true,
      oldRosterRemoved: true,
      canonical: fredericksburgArticleUrl,
      ok: true,
    }));
  }
}
