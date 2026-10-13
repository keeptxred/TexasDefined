#!/usr/bin/env node
/**
 * Statewide incorporated-place coverage audit against the U.S. Census Bureau
 * 2026 BAS listing (state of the boundaries as of 2025-11-30).
 *
 * Run: node scripts/data/audit-statewide-texas-towns.mjs --output=statewide-town-gaps.json
 *
 * A missing municipality is a RESEARCH QUEUE ENTRY, not permission to publish a
 * generic city stub. Unincorporated towns and census-designated places must be
 * reconciled in a separate evidence-backed inventory.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
const sourceUrl = "https://tigerweb.geo.census.gov/tigerwebmain/Files/acs26/tigerweb_acs26_incplace_2026_bas26_tx.html";
const read = (p) => readFileSync(p, "utf8");
const slugify = (s) => s.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const decode = (s) => s.replace(/&amp;/gi, "&").replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'")
  .replace(/&nbsp;/gi, " ").replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(Number(num)))
  .replace(/<[^>]*>/g, "").trim();

function censusPlaces(html) {
  const rows = [...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)]
    .map((row) => [...row[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((cell) => decode(cell[1])));
  let header = rows.find((cells) => cells.includes("BASENAME") && cells.includes("GEOID"));
  if (!header) throw new Error("Census incorporated-place columns changed: BASENAME/GEOID header not found");
  const nameCol = header.indexOf("BASENAME");
  const geoidCol = header.indexOf("GEOID");
  const fullNameCol = header.indexOf("NAME");
  const latCol = header.indexOf("CENTLAT"), lonCol = header.indexOf("CENTLON");
  const byGeoid = new Map();
  for (const cells of rows) {
    const geoid = cells[geoidCol];
    if (!/^48\d{5}$/.test(geoid ?? "")) continue;
    const name = cells[nameCol];
    if (!name) continue;
    byGeoid.set(geoid, {
      geoid, name, slug: slugify(name),
      censusName: cells[fullNameCol], lat: Number(cells[latCol]), lon: Number(cells[lonCol]),
    });
  }
  if (byGeoid.size < 1100 || byGeoid.size > 1400) {
    throw new Error("Unexpected Texas municipality roster size " + byGeoid.size + "; inspect Census source before updating any inventory");
  }
  return [...byGeoid.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function researchedTownSlugs() {
  const result = new Set();
  const waves = readdirSync("src/data")
    .filter((filename) => /^small-town-destinations-wave\d+\.ts$/.test(filename))
    .map((filename) => "src/data/" + filename);
  for (const path of [...waves, "src/data/small-town-authority-wave16.ts"]) {
    for (const match of read(path).matchAll(/\bslug:\s*["']([a-z0-9-]+)["']/g)) result.add(match[1]);
  }
  return result;
}
function knownCitySlugs() {
  const cities = read("src/data/texas-places.ts");
  const start = cities.indexOf("export const TEXAS_CITIES");
  const end = cities.indexOf("].map(", start);
  const rows = cities.slice(start, end);
  return new Set([...rows.matchAll(/\['([^']+)','[^']+','[^']+'\]/g)].map((match) => slugify(match[1])));
}
function majorCityAuthorities() {
  const index = read("src/data/city-authority-index.ts");
  return new Set([...index.matchAll(/\bslug:\s*'([a-z-]+)'/g)].map((m) => m[1]));
}
async function main() {
  const response = await fetch(sourceUrl, { headers: { Accept: "text/html" }, signal: AbortSignal.timeout(25000) });
  if (!response.ok) throw new Error("Census roster unavailable: HTTP " + response.status);
  const places = censusPlaces(await response.text());
  const towns = researchedTownSlugs();
  const cities = knownCitySlugs();
  const authorities = majorCityAuthorities();
  const rows = places.map((place) => ({
    ...place,
    status: towns.has(place.slug) ? "researched-town-guide"
      : authorities.has(place.slug) ? "major-city-authority"
      : cities.has(place.slug) ? "city-reference-needs-depth-review"
      : "no-dedicated-authority-guide",
  }));
  const totals = Object.fromEntries([...new Set(rows.map((r) => r.status))].map((status) => [
    status, rows.filter((r) => r.status === status).length,
  ]));
  const output = {
    generatedAt: new Date().toISOString(), source: sourceUrl, sourceBoundaryDate: "2025-11-30",
    note: "Incorporated cities/towns/villages only. Texas unincorporated communities and Census-designated places are separate.",
    summary: { totalIncorporated: places.length, ...totals },
    places: rows,
  };
  const outputArg = process.argv.find((a) => a.startsWith("--output="));
  if (outputArg) {
    const dest = outputArg.split("=").slice(1).join("=");
    if (!dest) throw new Error("Missing --output path");
    writeFileSync(dest, JSON.stringify(output, null, 2) + "\n");
  }
  console.log(JSON.stringify(output.summary, null, 2));
  console.log("Research required, not publishable stubs. First missing incorporated places:");
  console.log(rows.filter((row) => row.status === "no-dedicated-authority-guide").slice(0, 25)
    .map((row) => row.name + " (" + row.geoid + ")").join(", "));
}
await main();
