#!/usr/bin/env node
/**
 * Source-driven, read-only THC Atlas coverage census.
 *
 * This compares exact property/district/site names from the public THC GIS
 * FeatureServer with names/slugs in the TexasDefined codebase. It is NOT a
 * page generator, a completed content audit or permission to visit a site.
 * A source match only proves the name appears somewhere in code, not that a
 * URL exists or meets editorial acceptance standards.
 *
 * No geocoordinates, private addresses, sensitive archaeology or user data
 * are persisted. THC's public data is unfiltered and may contain errors.
 * Output is a candidate reconciliation artifact, not a published attraction.
 */
import fs from "node:fs";
import path from "node:path";

const BASE = "https://gis.thc.texas.gov/arcgis/rest/services/Historical/FeatureServer";
const LAYERS = [
  { id: 1, slug: "museum", priority: "museum-authority", publicVisit: "verify-with-operator" },
  { id: 2, slug: "historical-marker", priority: "contextual-reference", publicVisit: "marker-location-only" },
  { id: 3, slug: "national-register-property", priority: "individual-history", publicVisit: "verify-ownership" },
  { id: 4, slug: "national-register-district", priority: "district-history", publicVisit: "no-implied-public-access" },
  { id: 5, slug: "historic-cemetery", priority: "cemetery-heritage", publicVisit: "respect-steward-rules" },
  { id: 6, slug: "county-courthouse", priority: "courthouse-authority", publicVisit: "check-public-access" },
  { id: 23, slug: "historic-highway", priority: "route-authority", publicVisit: "road-conditions-change" },
  { id: 24, slug: "state-historic-site", priority: "site-authority", publicVisit: "verify-with-operator" },
];
const REPORT_DIR = path.resolve("artifacts");
const live = process.argv.includes("--live");
const OUTPUT = path.join(REPORT_DIR, "thc-atlas-census.json");
const SOURCE_SUFFIX = " National Register of Historic Places"; // normalized only for alias comparison

function normalize(value) {
  return String(value || "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/&amp;/ig, "&").replace(/['’`]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ").trim().toLowerCase().replace(/\s+/g, " ");
}
function slugify(value) {
  return normalize(value).replace(/ /g, "-");
}
function walk(root) {
  const queue = [root];
  const files = [];
  while (queue.length) {
    const dir = queue.pop();
    if (!fs.existsSync(dir)) continue;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory() && !["node_modules", "dist", ".git", "generated"].includes(entry.name)) queue.push(full);
      else if (entry.isFile() && /\.(?:ts|tsx)$/.test(entry.name) && !/routeTree\.gen\./.test(entry.name)) files.push(full);
    }
  }
  return files;
}
function indexCodeNames() {
  const knownNames = new Set(), knownSlugs = new Set();
  const files = [...walk("src/data"), ...walk("src/routes")];
  for (const file of files) {
    const data = fs.readFileSync(file, "utf8");
    for (const match of data.matchAll(/\b(?:name|title)\s*:\s*["']([^"'\n]{4,150})["']/g)) {
      const name = normalize(match[1]);
      if (name) knownNames.add(name);
    }
    for (const match of data.matchAll(/\bslug\s*:\s*["']([^"'\n]{3,150})["']/g)) {
      knownSlugs.add(match[1].toLowerCase());
    }
  }
  return { files: files.length, knownNames, knownSlugs };
}
function matchCode(name, idx) {
  const key = normalize(name);
  const keys = [key, normalize(key.replace(SOURCE_SUFFIX.toLowerCase(), ""))];
  if (keys.some(k => idx.knownNames.has(k))) return "possible-name-reference";
  if (keys.some(k => idx.knownSlugs.has(slugify(k)))) return "possible-slug-reference";
  return "no-exact-name-or-slug-reference";
}
function safeName(attributes, displayField, layer) {
  const a = attributes || {};
  let name = a[displayField];
  if (!name) {
    const key = Object.keys(a).find((k) => /^(?:courthouse_)?(?:name|title|site_name|property_name|marker_title)$/i.test(k))
      ?? Object.keys(a).find((k) => /name|title/i.test(k));
    if (key) name = a[key];
  }
  const raw = String(name || "").trim().replace(/\s+/g," ");
  return raw && raw.length <= 350 && !/^unknown|unnamed$/i.test(raw) ? raw : null;
}
function offlineTest() {
  const idx = indexCodeNames();
  if (normalize("José Antonio Navarro") !== "jose antonio navarro") throw Error("Normalizer regression");
  if (slugify("Fort McKavett State Historic Site") !== "fort-mckavett-state-historic-site") throw Error("Slug normalizer regression");
  if (!idx.knownSlugs.has("olivewood-cemetery")) throw Error("Olivewood not registered in source code");
  if (!idx.knownSlugs.has("fort-griffin")) throw Error("Existing historic site missing from source catalog");
  if (LAYERS.map(x=>x.id).length !== new Set(LAYERS.map(x=>x.id)).size) throw Error("Duplicate source layers");
  console.log(JSON.stringify({ status: "pass", sourceFileCount: idx.files, knownNames: idx.knownNames.size, knownSlugs: idx.knownSlugs.size, layers: LAYERS.map(({slug,id})=>({slug,id})) },null,2));
}
async function jsonGet(url) {
  let last;
  for (let attempt=1;attempt<=3;attempt++) {
    try {
      const response=await fetch(url,{headers:{accept:"application/json","user-agent":"TexasDefined-Atlas-Census/1.0 (+https://texasdefined.com/texas-historic-landmarks)"},signal:AbortSignal.timeout(25000)});
      if (!response.ok) throw Error(`HTTP ${response.status}`);
      const result=await response.json();
      if (result.error) throw Error(`ArcGIS: ${JSON.stringify(result.error).slice(0,500)}`);
      return result;
    } catch (error) {
      last=error;
      if (attempt<3) await new Promise(resolve=>setTimeout(resolve,attempt*1200));
    }
  }
  throw last;
}
async function inspectLayer(layer, idx) {
  const metadata = await jsonGet(`${BASE}/${layer.id}?f=json`);
  const oid = metadata.objectIdField || metadata.fields?.find(field=>field.type==="esriFieldTypeOID")?.name || "OBJECTID";
  const displayField = metadata.displayField;
  if (!displayField && !metadata.fields?.length) throw Error(`Layer ${layer.id} missing metadata fields`);
  const qs = (extra) => new URLSearchParams({f:"json",where:"1=1", ...extra}).toString();
  const countData=await jsonGet(`${BASE}/${layer.id}/query?${qs({returnCountOnly:"true"})}`);
  const count=Number(countData.count);
  if (!Number.isInteger(count)||count<0||count>300000) throw Error(`Unexpected source count for layer ${layer.slug}: ${countData.count}`);
  const limit=1000, max=50000;
  if (count>max) throw Error(`Layer ${layer.slug} exceeds ${max} rows: split this scan responsibly`);
  const seenIds = new Set();
  const candidates=[];
  let referenced=0,missing=0,unnamed=0,read=0;
  for (let offset=0;offset<count;offset+=limit) {
    const q=qs({outFields:"*",returnGeometry:"false",resultOffset:String(offset),resultRecordCount:String(limit),orderByFields:`${oid} ASC`});
    const result=await jsonGet(`${BASE}/${layer.id}/query?${q}`);
    if (!Array.isArray(result.features)) throw Error(`Missing ArcGIS features in ${layer.slug} offset ${offset}`);
    if (!result.features.length) throw Error(`Unexpected empty page in ${layer.slug}: offset ${offset} of ${count}`);
    for (const feature of result.features) {
      const a=feature.attributes||{},id=a[oid];
      if(id===null||id===undefined)throw Error(`Missing object ID in ${layer.slug}`);
      if(seenIds.has(String(id)))throw Error(`Duplicate ArcGIS object ID in paginated results: ${id}`);
      seenIds.add(String(id));read++;
      const name=safeName(a,displayField,layer);
      if(!name){unnamed++;continue}
      const resultStatus=matchCode(name,idx);
      if(resultStatus==="no-exact-name-or-slug-reference")missing++;else referenced++;
      // Store no exact coordinates or street addresses. Record names need
      // expert identity matching before any publication.
      candidates.push({
        sourceObjectId: String(id), name, matching: resultStatus,
        priority: layer.priority, accessStatus: layer.publicVisit,
      });
    }
  }
  if (read!==count)throw Error(`Layer ${layer.slug} incomplete: expected ${count}, read ${read}`);
  return { category:layer.slug, layerId:layer.id, sourceRecordCount:count,
    named:referenced+missing, alreadyMentionedPossibly:referenced,
    unmatchedCandidateCount:missing, unnamed, sourceUrl:`${BASE}/${layer.id}`,
    candidates };
}

async function main() {
  const idx=indexCodeNames();
  const report={generatedAt:new Date().toISOString(),officialArcgisService:BASE,
    operator:"Texas Historical Commission",coverage:"selected public GIS layers, not entire Atlas",
    sourceCodeFiles:idx.files,matchingMethod:"exact normalized name or slug; no proof of a published page",
    caveats:[
      "Not a complete 300K-record resource survey, nor an authoritative list of missing published pages.",
      "A name mentioned in code is not proof that a complete authority page exists.",
      "A missing code string is not proof that the place lacks an alternate-name or canonical URL.",
      "National Register designation does not guarantee public access. Historic cultural/archaeological sites can have sensitive locations.",
      "No individual pages or images are generated automatically. Every source requires separate verification and editorial work.",
    ],
    layers:[],errors:[]};
  for(const layer of LAYERS){
    try {
      const result=await inspectLayer(layer,idx);
      report.layers.push(result);
      console.log(`${layer.slug}: ${result.sourceRecordCount} source records, ${result.unmatchedCandidateCount} possible name gaps`);
    }catch(error) {
      report.errors.push({layer:layer.slug,error:String(error)});
      console.error(`THC GIS ${layer.slug} check failed:`,error);
    }
  }
  fs.mkdirSync(REPORT_DIR,{recursive:true});
  fs.writeFileSync(OUTPUT,JSON.stringify(report,null,2)+"\n");
  const summary=[
    "# TexasDefined statewide THC Atlas source census",
    `Checked: ${report.generatedAt}`,
    `Official source: ${BASE}`,
    "",
    "| Official category | Source rows | Possible name gaps | Code mentions |",
    "|---|---:|---:|---:|",
    ...report.layers.map(l=>`| ${l.category} | ${l.sourceRecordCount} | ${l.unmatchedCandidateCount} | ${l.alreadyMentionedPossibly} |`),
    "",
    ...report.errors.map(e=>`- Source failed: ${e.layer}: ${e.error}`),
    "",
    "Exact-name matching is an initial discovery signal, **not** page-level authority certification.",
    "See the JSON artifact for the complete candidate name list, without geocoordinates or private addresses.",
  ].join("\n");
  fs.writeFileSync(path.join(REPORT_DIR,"thc-atlas-census.md"),summary+"\n");
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,summary+"\n");
  if (report.errors.length) process.exitCode=1;
}
if(live)await main();else offlineTest();
