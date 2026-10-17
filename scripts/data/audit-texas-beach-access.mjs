/**
 * Read-only GLO coastal-access reconciliation.
 *
 * Run:
 *   node scripts/data/audit-texas-beach-access.mjs --live
 *   node scripts/data/audit-texas-beach-access.mjs --input=/path/to/arcgis.json
 *
 * This script NEVER publishes pages. It clusters access points by site and
 * county for editorial review. A GLO beach-access point is not a beach.
 * No polling, retries, or broad-site audits.
 */
import fs from "node:fs";
import path from "node:path";

const SERVICE = "https://services1.arcgis.com/YWG34dhJxrbxQWdF/ArcGIS/rest/services/Texas_Beach_and_Bay_Access_%28Public%29/FeatureServer/0/query";
const FIELDS = ["TCAPID", "SiteName", "AlternateSiteName", "County", "SiteType", "AccessType", "Swimming", "ParkingAvailable", "Restrooms", "DisabledFriendly", "LastUpdateDate", "Latitude", "Longitude", "VehicularAccess", "ParkingPermit"];
const args = process.argv.slice(2);
const live = args.includes("--live");
const input = args.find((arg) => arg.startsWith("--input="))?.slice(8);
const output = args.find((arg) => arg.startsWith("--out="))?.slice(6);
if (live === Boolean(input)) {
  console.error("Provide exactly one of --live or --input=/path/to/existing/arcgis.json. Never run as a default build-time network check.");
  process.exit(2);
}
const clean = (value) => String(value ?? "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
const readCoastalNames = () => {
  const coastal = fs.readFileSync(path.resolve("src/data/coastal-places.ts"), "utf8");
  const names = [...coastal.matchAll(/\bslug: "([^"]+)",\s*\n\s*name: "([^"]+)"/g)].map((match) => ({ slug: match[1], name: match[2], cleanName: clean(match[2]) }));
  if (names.length < 52) throw new Error("Existing coastal catalog count dropped; stop and investigate instead of silently treating matches as absent.");
  return names;
};
async function loadCountyDomain() {
  if (input) return null;
  const layer = SERVICE.replace(/\/query$/, "");
  const r = await fetch(`${layer}?f=json`, { signal: AbortSignal.timeout(20000) });
  if (!r.ok) throw new Error(`GLO official layer metadata HTTP ${r.status}`);
  const metadata = await r.json();
  if (metadata.error) throw new Error(`GLO layer metadata error: ${JSON.stringify(metadata.error)}`);
  const countyValues = metadata.fields?.find((field) => field.name === "County")?.domain?.codedValues;
  if (!Array.isArray(countyValues) || countyValues.length < 10) {
    throw new Error("GLO county codes could not be validated against current official layer metadata.");
  }
  return {
    codeToName: new Map(countyValues.map((entry) => [String(entry.code), String(entry.name)])),
    editedAt: metadata.editingInfo?.lastEditDate ?? null,
  };
}
async function load() {
  if (input) return JSON.parse(fs.readFileSync(path.resolve(input), "utf8"));
  const query = new URLSearchParams({
    where: "1=1",
    outFields: FIELDS.join(","),
    returnGeometry: "false",
    resultRecordCount: "1000",
    f: "json",
  });
  const response = await fetch(`${SERVICE}?${query}`, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`GLO ArcGIS HTTP ${response.status}`);
  return response.json();
}
const countyDomain = await loadCountyDomain();
const payload = await load();
if (payload.error) throw new Error(`GLO ArcGIS returned error: ${JSON.stringify(payload.error).slice(0,500)}`);
if (payload.exceededTransferLimit === true) throw new Error("GLO ArcGIS result exceeded single-page limit. Do not treat a partial extract as complete.");
if (!Array.isArray(payload.features)) throw new Error("Expected ArcGIS features[].attributes; inspect source schema before retrying.");
const existing = readCoastalNames();
const groups = new Map();
for (const feature of payload.features) {
  const a = feature?.attributes ?? {};
  const name = String(a.SiteName || a.AlternateSiteName || "").trim();
  if (!name) continue;
  const countyCode = String(a.County ?? "unknown");
  const county = countyDomain?.codeToName.get(countyCode) ?? (input ? countyCode : `Unresolved GLO county code ${countyCode}`);
  // Same site + county can have multiple legitimate entrances. Do not
  // collapse different access points into a published destination.
  const key = `${clean(name)}|${clean(county)}`;
  let group = groups.get(key);
  if (!group) {
    const nameKey = clean(name);
    const altKey = clean(a.AlternateSiteName);
    const matches = existing.filter((v) => v.cleanName === nameKey || v.cleanName === altKey);
    group = {
      name, county, accessPointCount: 0, sites: [],
      existingExactNameSlugs: matches.map((v) => v.slug),
      reviewStatus: matches.length === 0 ? "needs-editorial-reconciliation" : "candidate-existing-match",
    };
    groups.set(key, group);
  }
  group.accessPointCount += 1;
  group.sites.push({
    id: a.TCAPID || null,
    type: a.SiteType || null,
    accessType: a.AccessType || null,
    swimming: a.Swimming || null,
    parking: a.ParkingAvailable || null,
    restrooms: a.Restrooms || null,
    accessibility: a.DisabledFriendly || null,
    lastUpdate: a.LastUpdateDate || null,
    latitude: a.Latitude || null,
    longitude: a.Longitude || null,
    vehicleAccess: a.VehicularAccess || null,
    parkingPermit: a.ParkingPermit || null,
  });
}
const catalog = [...groups.values()].sort((a,b) => a.county.localeCompare(b.county) || a.name.localeCompare(b.name));
const report = {
  source: SERVICE,
  fetchedAt: new Date().toISOString(),
  sourcePointCount: payload.features.length,
  namedSiteClusters: catalog.length,
  exactMatchClusters: catalog.filter((g) => g.existingExactNameSlugs.length > 0).length,
  needsReviewClusters: catalog.filter((g) => g.existingExactNameSlugs.length === 0).length,
  unmatchedBeachSwimmingCandidates: catalog.filter((g) => g.reviewStatus === "needs-editorial-reconciliation" && g.possibleBeachSwimSite).length,
  sourceLayerEditDate: countyDomain?.editedAt ?? null,
  warning: "Exact-name matches only; a candidate is not a confirmed missing beach. Access points, bay sites, boat ramps and already known shoreline aliases are not unique beaches. Do not auto-publish; compare official county/beach plans first.",
  sites: catalog,
};
const json = JSON.stringify(report, null, 2);
if (output) fs.writeFileSync(path.resolve(output), json + "\n");
else process.stdout.write(json + "\n");
