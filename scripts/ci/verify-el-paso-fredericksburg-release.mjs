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
