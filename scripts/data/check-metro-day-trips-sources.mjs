#!/usr/bin/env node
/**
 * Non-destructive scheduled health check for curated metro day-trip operator URLs.
 * Never rewrite researched destination copy, affiliate tracking or the index gate.
 *
 * Local static check: node scripts/data/check-metro-day-trips-sources.mjs --offline
 * Weekly live check:  node scripts/data/check-metro-day-trips-sources.mjs
 */
import fs from "node:fs";
import path from "node:path";

const offline = process.argv.includes("--offline");
const source = fs.readFileSync("src/data/metro-day-trip-editorial.ts", "utf8");
const elPasoOutings = source.split("export const EL_PASO_SOURCE_BACKED_OUTINGS = [")[1]?.split("] as const;")[0];
if (!elPasoOutings) throw new Error("Source-backed El Paso operator outing registry missing");
const elPasoOutingUrls = [...new Set([...elPasoOutings.matchAll(/sourceUrl:\s*"(https:\/\/[^"]+)"/g)].map((match) => match[1]))];
if (elPasoOutingUrls.length !== 5) throw new Error("El Paso source-backed outing coverage must retain five distinct operator references");
const metroPage = fs.readFileSync("src/routes/explore.near.$metro.$collection.lazy.tsx", "utf8");
// El Paso's close-in trips and permit/route decision guides live outside the
// governed 18–150-mile catalog. Check those additional official visitor URLs
// along with the separate five-source editorial registry every week.
const elPasoSection = metroPage.split('data-el-paso-short-trips="separate-from-distance-results"')[1]?.split("{featuredCityTrips.length")[0];
if (!elPasoSection) throw new Error("El Paso close-in trip source section missing");
const elPasoOperatorLinks = [...elPasoSection.matchAll(/href="(https:\/\/[^"]+)"/g)].map((match) => match[1]);
if (!elPasoOperatorLinks.includes("https://tpwd.texas.gov/state-parks/parks/franklin-mountains/")
  || !elPasoOperatorLinks.includes("https://www.nps.gov/cham/planyourvisit/hours.htm")
  || !elPasoOperatorLinks.includes("https://www.elpasomissions.org/faqs/")
  || !elPasoOperatorLinks.includes("https://tpwd.texas.gov/state-parks/hueco-tanks/alert")
  || !elPasoOperatorLinks.includes("https://www.nps.gov/gumo/planyourvisit/dunes.htm")) {
  throw new Error("El Paso close-in official operator source coverage incomplete");
}
const urls = [...new Set([
  ...[...source.matchAll(/sourceUrl:\s*"(https:\/\/[^"]+)"/g)].map((match) => match[1]),
  ...elPasoOperatorLinks,
])];
const expectedOperators = new Set(["tpwd.texas.gov", "www.nps.gov", "www.fws.gov", "www.elpasomissions.org", "www.vanhorntexas.org"]);
if (urls.length < 20) throw new Error("Day-trip source registry unexpectedly lost operator coverage");
for (const url of urls) {
  const parsed = new URL(url);
  if (!expectedOperators.has(parsed.hostname)) throw new Error("Unapproved curated operator host: " + parsed.hostname);
}
const checkedAt = new Date().toISOString();
const report = { checkedAt, offline, total: urls.length, good: 0, notFound: [], uncertain: [], sources: [] };
if (!offline) {
  // Do not treat a single HEAD rejection, rate limit or network error as proof
  // that an official page no longer exists. Confirm 404/410 using a GET.
  async function inspect(url, method) {
    try {
      const response = await fetch(url, {
        method,
        redirect: "follow",
        headers: { "User-Agent": "TexasDefinedDayTripSourceMonitor/1.0 (+https://texasdefined.com)" },
        signal: AbortSignal.timeout(18000),
      });
      await response.body?.cancel();
      return { status: response.status, finalUrl: response.url };
    } catch (error) {
      return { status: null, error: String(error?.message ?? error) };
    }
  }
  for (let index = 0; index < urls.length; index += 4) {
    const group = urls.slice(index, index + 4);
    const results = await Promise.all(group.map(async (url) => {
      let checked = await inspect(url, "HEAD");
      if (checked.status === null || checked.status >= 400) checked = await inspect(url, "GET");
      return { url, ...checked };
    }));
    for (const entry of results) {
      report.sources.push(entry);
      if (entry.status !== null && entry.status >= 200 && entry.status < 400) report.good++;
      else if (entry.status === 404 || entry.status === 410) report.notFound.push(entry);
      else report.uncertain.push(entry); // 403/429/5xx/timeouts require human investigation
    }
  }
}
const out = path.join("reports", "metro-day-trips-sources.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ checkedAt, urls: report.total, good: report.good, notFound: report.notFound.length, uncertain: report.uncertain.length, offline }, null, 2));
for (const failure of report.notFound) console.error("::error::Curated day-trip official source 404/410: " + failure.url);
for (const warning of report.uncertain) console.warn("::warning::Curated day-trip source unconfirmed: " + warning.url + " [" + (warning.status ?? warning.error) + "]");
if (report.notFound.length) process.exitCode = 1;
