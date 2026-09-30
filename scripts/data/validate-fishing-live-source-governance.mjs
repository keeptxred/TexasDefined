import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const fail = (message) => { throw new Error(`Fishing live-source governance validation failed: ${message}`); };
const requireText = (source, token, label) => { if (!source.includes(token)) fail(label); };

const exceptions = read("src/data/fishing/live-lake-level-exceptions.ts");
const network = read("src/data/fishing/statewide-lake-network.ts");
const sourceMap = read("src/data/fishing/live-lake-level-source.ts");
const loader = read("src/data/fishing/live-lake-level.server.ts");
const workflow = read(".github/workflows/verify-live-lake-levels.yml");
const lcraTest = read("src/data/fishing/__tests__/lcra-lake-level.test.ts");

for (const token of [
  'slug: "calaveras-lake"',
  'reason: "noPublicLiveLevelSource"',
  'authority: "CPS Energy"',
  'verifiedAt: "2026-09-30"',
  "Texas Water Development Board",
  "U.S. Geological Survey",
  "NOAA National Water Prediction Service",
  "Texas Parks and Wildlife Department",
  "Texas Commission on Environmental Quality",
  "San Antonio Water System",
  "Public ArcGIS/feature services",
]) requireText(exceptions, token, `Calaveras exception metadata missing ${token}`);

const exceptionSlugs = [...exceptions.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((match) => match[1]);
if (exceptionSlugs.length !== 1 || exceptionSlugs[0] !== "calaveras-lake") {
  fail(`expected Calaveras to be the sole live-level exception, found ${exceptionSlugs.join(", ") || "none"}`);
}

for (const token of [
  'slug: "calaveras-lake"',
  "No public real-time pool-elevation feed is currently published for Calaveras Lake.",
  "485.0 ft MSL",
  "484.0 ft MSL",
  "CPS Energy",
]) requireText(network, token, `Calaveras public fallback disclosure missing ${token}`);

for (const token of [
  '"fayette-county-reservoir": "5634"',
  "hydromet.lcra.org",
  "LCRA Hydromet",
]) requireText(sourceMap, token, `Fayette LCRA source mapping missing ${token}`);

for (const token of [
  "https://hydromet.lcra.org/media/LakeLevel.csv",
  "https://hydromet.lcra.org/api/GetLakeLevelsForAllSites/",
  "GetDataBySite/${lcraSiteNumber}/lakelevel",
  "findCsvColumn",
  "if ((siteIndex < 0 && nameIndex < 0) || dateIndex < 0 || levelIndex < 0) return null;",
  "percentFull: null",
]) requireText(loader, token, `Fayette resilient LCRA loader/parser missing ${token}`);

for (const token of [
  "reordered columns",
  "alternative documented header spellings",
  "rejects unknown column layouts",
  "different reservoir",
]) requireText(lcraTest, token, `LCRA regression coverage missing ${token}`);

for (const token of [
  "fayette-county-reservoir",
  "provider_marker='LCRA Hydromet'",
  "All 40 monitored lake page-data snapshots",
  "Verify Calaveras no-public-gauge disclosure",
  "Calaveras must not render a fake live-level strip",
]) requireText(workflow, token, `protected production verification missing ${token}`);

console.log("Fishing live-source governance validation passed: Fayette uses the official three-stage LCRA chain with header-driven regression coverage; Calaveras is the sole intentional no-public-live-level exception.");
