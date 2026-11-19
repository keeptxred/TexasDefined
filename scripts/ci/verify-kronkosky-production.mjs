import fs from "node:fs";
import path from "node:path";

/**
 * Postdeploy-only dual-origin proof for the newly announced Kronkosky SNA opening.
 * This deliberately uses HTTP to the deployed Worker and public canonical;
 * static repository assertions are not evidence the public guide was updated.
 */
const slug = "albert-bessie-kronkosky-state-natural-area";
const route = "/destination/" + slug;
const origins = [
  "https://texasdefined.com",
  "https://texasdefined-site.freddy-coppola.workers.dev",
];
const results = [];
const failures = [];
const attemptId = [process.env.GITHUB_SHA ?? "manual", process.env.GITHUB_RUN_ID ?? "0", Date.now()].join("-");
const request = async (origin, pathname) => {
  const u = new URL(pathname, origin);
  u.searchParams.set("verify-kronkosky", attemptId);
  let failure;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(u, {
        signal: AbortSignal.timeout(20000),
        redirect: "follow",
        headers: {
          "User-Agent": "TexasDefined-Kronkosky-live-acceptance/1.0",
          "Cache-Control": "no-cache",
          "Accept": pathname.endsWith(".xml") ? "application/xml" : "text/html",
        },
      });
      if (response.status !== 200) throw new Error("HTTP " + response.status);
      const type = response.headers.get("content-type") ?? "";
      if (!/text\/html|(?:application|text)\/xml/i.test(type)) throw new Error("Unexpected content type " + type);
      const bytes = Number(response.headers.get("content-length") ?? 0);
      if (bytes > 9000000) throw new Error("Oversized HTML/XML " + bytes);
      const text = await response.text();
      if (text.length > 9000000) throw new Error("Oversized text response");
      return { html: text, type, status: response.status, url: response.url, cache: response.headers.get("cf-cache-status") };
    } catch (error) {
      failure = error;
      if (attempt < 3) await new Promise(resolve => setTimeout(resolve, 800 * attempt));
    }
  }
  throw failure;
};
const hasNoindex = html => [...html.matchAll(/<meta\b[^>]*>/gi)]
  .some(([tag]) => /\bname\s*=\s*["']robots["']/i.test(tag) && /\bnoindex\b/i.test(tag));
const check = (ok, origin, label) => {
  if (!ok) failures.push(origin + ": " + label);
};
for (const origin of origins) {
  try {
    const { html, cache, url } = await request(origin, route);
    check(html.includes("Albert &amp; Bessie Kronkosky") || html.includes("Albert & Bessie Kronkosky"), origin, "Named destination missing");
    check(html.includes("December 1, 2026"), origin, "Announced day-use opening absent");
    check(html.includes("December 15"), origin, "Overnight opening absent");
    check(html.includes("26 miles of trails"), origin, "Verified trail mileage absent");
    check(html.includes("7754 State Highway 46"), origin, "Official entrance address absent");
    check(html.includes("Red Bluff"), origin, "Research depth / primitive stay advice absent");
    check(html.includes("Extreme Motus"), origin, "Accessibility research absent");
    check(html.includes("golden-cheeked"), origin, "Conservation research absent");
    check(html.includes("ABK_SNA_Entrance_2026.jpg"), origin, "Exact-site photo missing");
    check(html.includes("Larry D. Moore"), origin, "Photographer attribution missing");
    check(html.includes("creativecommons.org/licenses/by/4.0/"), origin, "License link missing");
    check(html.includes("tpwd.texas.gov/newsmedia/releases"), origin, "Source citation absent");
    check(html.includes('href="https://texasdefined.com/destination/' + slug + '"') ||
      html.includes('https://texasdefined.com/destination/' + slug), origin, "Canonical URL absent");
    check(!hasNoindex(html), origin, "Unexpected robots noindex");
    check(!html.includes("no opening date has been announced"), origin, "Stale no-opening-date copy still served");
    check(html.length > 32000, origin, "SSR HTML is implausibly short or thin");
    results.push({ origin, path: route, status: "fetched", size: html.length, cache, url });
  } catch (error) {
    failures.push(origin + " HTML fetch failed: " + String(error));
  }
  try {
    const { html, cache, url } = await request(origin, "/sitemap-explore.xml");
    check(html.includes("<loc>https://texasdefined.com" + route + "</loc>"), origin, "Canonical destination absent from Explore sitemap");
    check(html.includes("<lastmod>2026-11-18</lastmod>") || html.includes("2026-11-18"), origin, "No sourced update date in sitemap");
    results.push({ origin, path: "/sitemap-explore.xml", status: "fetched", size: html.length, cache, url });
  } catch (error) {
    failures.push(origin + " sitemap fetch failed: " + String(error));
  }
}
fs.mkdirSync(path.join(".artifacts"), { recursive: true });
const report = { commit: process.env.GITHUB_SHA ?? null, run: process.env.GITHUB_RUN_ID ?? null, checkedAt: new Date().toISOString(), results, failures };
fs.writeFileSync(".artifacts/kronkosky-live-acceptance.json", JSON.stringify(report, null, 2) + "\n");
if (failures.length) {
  for (const failure of failures) console.error("FAIL " + failure);
  process.exitCode = 1;
} else {
  console.log("Kronkosky authority: exact current HTML, licensing, opening dates, 2 origins, canonical, robots and sitemap PASS");
}
