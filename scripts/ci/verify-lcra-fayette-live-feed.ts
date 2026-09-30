import assert from "node:assert/strict";

import { parseLcraLakeLevelCsv } from "../../src/data/fishing/lcra-lake-level-csv.ts";

const CSV_URL = "https://hydromet.lcra.org/media/LakeLevel.csv";
const ALL_SITES_URL = "https://hydromet.lcra.org/api/GetLakeLevelsForAllSites/";
const SOURCE_URL = "https://hydromet.lcra.org/Charts/?agency=LCRA&siteNumber=5634&siteType=lakelevel";
const requestHeaders = {
  "user-agent": "TexasDefined-LCRA-Feed-Verification/1.0",
  referer: SOURCE_URL,
};

const csvResponse = await fetch(CSV_URL, {
  redirect: "follow",
  headers: { ...requestHeaders, accept: "text/csv,text/plain;q=0.9,*/*;q=0.1" },
  signal: AbortSignal.timeout(15_000),
});
assert.equal(csvResponse.ok, true, `LCRA LakeLevel.csv returned HTTP ${csvResponse.status}`);

const csv = await csvResponse.text();
const lines = csv.replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.trim().length > 0);
assert.ok(lines.length >= 2, "LCRA LakeLevel.csv did not contain a header and data row");
console.log("LCRA LakeLevel.csv current rows:");
for (const [index, line] of lines.entries()) console.log(`${index + 1}: ${line}`);

const csvFayette = parseLcraLakeLevelCsv(SOURCE_URL, "5634", csv);
if (csvFayette) {
  console.log(`Fayette found in CSV: ${csvFayette.elevationFeet.toFixed(2)} ft on ${csvFayette.measuredAt}`);
} else {
  console.log("Fayette/site 5634 is not present in current LakeLevel.csv; checking official all-sites API.");
}

const allSitesResponse = await fetch(ALL_SITES_URL, {
  redirect: "follow",
  headers: { ...requestHeaders, accept: "application/json,text/plain;q=0.9,*/*;q=0.1" },
  signal: AbortSignal.timeout(15_000),
});
assert.equal(allSitesResponse.ok, true, `LCRA all-sites API returned HTTP ${allSitesResponse.status}`);
const allSitesPayload: unknown = await allSitesResponse.json();

const matches: unknown[] = [];
function collectMatches(value: unknown): void {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    for (const item of value) collectMatches(item);
    return;
  }
  const text = JSON.stringify(value);
  if (/fayette|5634/i.test(text)) matches.push(value);
  for (const child of Object.values(value as Record<string, unknown>)) collectMatches(child);
}
collectMatches(allSitesPayload);

assert.ok(matches.length > 0, "Official LCRA all-sites API did not expose Fayette/site 5634");
console.log(`LCRA all-sites Fayette match: ${JSON.stringify(matches[0])}`);
