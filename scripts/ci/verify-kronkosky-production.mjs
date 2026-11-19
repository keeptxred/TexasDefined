import fs from "node:fs";
import path from "node:path";

/**
 * Never certify only a nonce URL. The public clean URL is what search engines
 * and ordinary visitors request, and may retain an old Cloudflare cache key.
 * Each deploy checks both independently on the canonical host and direct Worker.
 */
const slug = "albert-bessie-kronkosky-state-natural-area";
const route = "/destination/" + slug;
const origins = [
  "https://texasdefined.com",
  "https://texasdefined-site.freddy-coppola.workers.dev",
];
const report = {
  checkedAt: new Date().toISOString(),
  commit: process.env.GITHUB_SHA ?? null,
  run: process.env.GITHUB_RUN_ID ?? null,
  results: [],
  failures: [],
};
const attemptId = [report.commit ?? "manual", report.run ?? "0", Date.now()].join("-");
const hasNoindex = html => [...html.matchAll(/<meta\b[^>]*>/gi)]
  .some(([tag]) => /\bname\s*=\s*["']robots["']/i.test(tag) && /\bnoindex\b/i.test(tag));
const check = (ok, label) => {
  if (!ok) report.failures.push(label);
};
async function request(origin, pathname, bust) {
  const url = new URL(pathname, origin);
  if (bust) url.searchParams.set("verify-kronkosky", attemptId);
  let lastError;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(20000),
        redirect: "follow",
        headers: {
          Accept: pathname.endsWith(".xml") ? "application/xml" : "text/html",
          "User-Agent": "TexasDefined-Kronkosky-live-acceptance/2.0",
          ...(bust ? { "Cache-Control": "no-cache" } : {}),
        },
      });
      if (response.status !== 200) throw new Error("HTTP " + response.status);
      const type = response.headers.get("content-type") ?? "";
      if (!/text\/html|(?:application|text)\/xml/i.test(type)) throw new Error("Unexpected type " + type);
      const body = await response.text();
      if (body.length > 9000000) throw new Error("Oversized HTML/XML");
      report.results.push({
        origin, pathname, mode: bust ? "nonce" : "clean", status: response.status,
        bytes: body.length, cache: response.headers.get("cf-cache-status"),
        age: response.headers.get("age"), finalUrl: response.url,
      });
      return body;
    } catch (error) {
      lastError = error;
      if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 800 * (attempt + 1)));
    }
  }
  throw lastError;
}
function validatePage(html, label) {
  check(html.includes("Albert &amp; Bessie Kronkosky") || html.includes("Albert & Bessie Kronkosky"), label + ": title");
  check(html.includes("December 1, 2026"), label + ": day-use opening");
  check(html.includes("December 15"), label + ": overnight opening");
  check(html.includes("26 miles of trails"), label + ": documented trail mileage");
  check(html.includes("7754 State Highway 46"), label + ": official entrance");
  check(html.includes("Red Bluff"), label + ": researched camping");
  check(html.includes("Extreme Motus"), label + ": accessibility evidence");
  check(html.includes("ABK_SNA_Entrance_2026.jpg"), label + ": exact-site Commons photograph");
  check(html.includes("Larry D. Moore"), label + ": photographer credit");
  check(html.includes("creativecommons.org/licenses/by/4.0/"), label + ": image license");
  check(html.includes("tpwd.texas.gov/newsmedia/releases"), label + ": primary source");
  check(html.includes("https://texasdefined.com" + route), label + ": canonical link");
  check(!hasNoindex(html), label + ": unexpected noindex");
  check(!html.includes("no opening date has been announced"), label + ": stale no-date content");
  check(!html.includes("currently under development and not yet open for ordinary public visitation"), label + ": legacy summary");
  check(html.length > 32000, label + ": suspiciously thin SSR");
}
for (const origin of origins) {
  const versions = {};
  for (const bust of [false, true]) {
    const label = origin + " " + (bust ? "nonce" : "clean");
    try {
      const html = await request(origin, route, bust);
      validatePage(html, label);
      versions[bust ? "nonce" : "clean"] = html;
    } catch (error) {
      report.failures.push(label + ": " + String(error));
    }
  }
  if (versions.clean && versions.nonce) {
    const cleanHasOpening = versions.clean.includes("December 1, 2026");
    const nonceHasOpening = versions.nonce.includes("December 1, 2026");
    check(cleanHasOpening === nonceHasOpening, origin + ": clean and nonce diverged");
  }
  for (const bust of [false, true]) {
    const label = origin + " sitemap " + (bust ? "nonce" : "clean");
    try {
      const sitemap = await request(origin, "/sitemap-explore.xml", bust);
      check(sitemap.includes("<loc>https://texasdefined.com" + route + "</loc>"), label + ": canonical URL missing");
      check(sitemap.includes("2026-11-18") || sitemap.includes("2026-11-19"), label + ": source-dated lastmod missing");
    } catch (error) {
      report.failures.push(label + ": " + String(error));
    }
  }
}
fs.mkdirSync(path.join(".artifacts"), { recursive: true });
fs.writeFileSync(".artifacts/kronkosky-live-acceptance.json", JSON.stringify(report, null, 2) + "\n");
if (report.failures.length) {
  report.failures.forEach(failure => console.error("FAIL " + failure));
  process.exitCode = 1;
} else {
  console.log("Kronkosky dual-origin clean+nonce page, canonical and sitemap PASS");
}
