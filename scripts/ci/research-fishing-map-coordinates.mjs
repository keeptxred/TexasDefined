/**
 * Prepare reviewable, exact-name reservoir coordinates from the Texas Water
 * Development Board's statewide GeoJSON. Discovery does not publish anything.
 * Coordinates represent the TWDB monitoring/reference point, NOT a boat ramp.
 * Run: node scripts/ci/research-fishing-map-coordinates.mjs
 */
import fs from "node:fs";
import path from "node:path";

const URL = "https://waterdatafortexas.org/reservoirs/statewide/recent-conditions.geojson";
const definitions = fs.readFileSync("src/data/fishing/statewide-lake-network.ts", "utf8");
const start = definitions.indexOf("export const statewideNetworkLakeDefinitions");
const end = definitions.indexOf("\n];", start);
if (start === -1 || end <= start) throw new Error("Cannot locate statewide fishing definitions");
const lakes = [...definitions.slice(start, end).matchAll(/^\s{4}slug:\s*"([^"]+)",\s*name:\s*"([^"]+)"/gm)]
  .map((match) => ({ slug: match[1], name: match[2] }));
if (lakes.length !== 57 || new Set(lakes.map((lake) => lake.slug)).size !== 57) {
  throw new Error("Unexpected lake inventory; review definitions before matching coordinates");
}

const key = (name) => name
  .toLowerCase()
  .replace(/&/g, " and ")
  .replace(/\b(?:lake|reservoir)\b/g, " ")
  .replace(/[^a-z0-9]+/g, " ")
  .replace(/\s+/g, " ")
  .trim();
// Narrow, named equivalents for TWDB nomenclature; these are only candidates,
// not accepted coordinates, until a source-by-source review.
const officialNameOverrides = {
  "alan-henry-reservoir": "Lake Alan Henry",
  "lake-lbj": "Lake Lyndon B Johnson",
  "lake-o-the-pines": "Lake O the Pines",
  "lake-casa-blanca": "Lake Casa Blanca",
  "lake-bob-sandlin": "Lake Bob Sandlin",
  "e-v-spence-reservoir": "E V Spence Reservoir",
};

const response = await fetch(URL, {
  headers: { "User-Agent": "TexasDefinedFishingMapSourceReview/1.0 (+https://texasdefined.com/fishing/plan)" },
  signal: AbortSignal.timeout(25_000),
});
if (!response.ok) throw new Error("TWDB source returned HTTP " + response.status);
const source = await response.json();
if (!Array.isArray(source.features) || source.features.length < 90) {
  throw new Error("TWDB reservoir GeoJSON is missing substantial expected coverage");
}
const byName = new Map();
for (const feature of source.features) {
  const name = feature?.properties?.full_name;
  const coordinates = feature?.geometry?.coordinates;
  if (typeof name !== "string" || !Array.isArray(coordinates) || coordinates.length < 2) continue;
  const [lng, lat] = coordinates;
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || lat < 25 || lat > 37 || lng < -107 || lng > -93) continue;
  const normalized = key(name);
  byName.set(normalized, [...(byName.get(normalized) ?? []), { name, lat, lng, dataAt: feature.properties.timestamp }]);
}

const matches = [];
const unmatched = [];
const ambiguous = [];
for (const lake of lakes) {
  const officialName = officialNameOverrides[lake.slug] ?? lake.name;
  const candidates = byName.get(key(officialName)) ?? [];
  if (candidates.length === 1) {
    matches.push({
      slug: lake.slug,
      catalogName: lake.name,
      sourceName: candidates[0].name,
      lat: candidates[0].lat,
      lng: candidates[0].lng,
      sourceUrl: URL,
      dataAt: candidates[0].dataAt,
      matchMethod: officialNameOverrides[lake.slug] ? "review-named-alias" : "exact-normalized-name",
    });
  } else if (candidates.length) ambiguous.push({ ...lake, officialName, candidates });
  else unmatched.push({ ...lake, officialName });
}
const report = {
  sourceUrl: URL,
  sourceRecords: source.features.length,
  catalogRecords: lakes.length,
  matched: matches.length,
  unmatched,
  ambiguous,
  matches,
  note: "Unreviewed discovery only. Do not publish ambiguous, estimated, or municipality-centroid locations.",
};
fs.mkdirSync(".artifacts", { recursive: true });
const output = path.join(".artifacts", "fishing-planner-twdb-coordinate-candidates.json");
fs.writeFileSync(output, JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report));
if (ambiguous.length) process.exitCode = 1;
