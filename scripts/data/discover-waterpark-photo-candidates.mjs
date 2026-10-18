#!/usr/bin/env node
/**
 * Bounded, rights-aware Wikimedia Commons discovery for TexasDefined waterparks.
 *
 * This produces an editorial REVIEW QUEUE only. It never modifies the venue registry,
 * grants publication permission or changes authorityReady/noindex.
 *
 * Examples:
 *   node scripts/data/discover-waterpark-photo-candidates.mjs --self-test
 *   node scripts/data/discover-waterpark-photo-candidates.mjs --offset=0 --limit=20
 */
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, mkdirSync, appendFileSync } from "node:fs";
import { dirname } from "node:path";

const DATA_PATH = "src/data/texas-water-parks.ts";
const REPORT_PATH = ".artifacts/waterpark-photo-candidates.json";
const COMMONS_API = "https://commons.wikimedia.org/w/api.php";
const MAX_BATCH = 25;
const MAX_RESULTS = 8;
const SKIP_WORDS = new Set(["the","of","at","and","a","in","water","waterpark","waterparks","park","parks","aquatic","aquatics","center","centre","family","resort","resorts","pool","pools","indoor","outdoor","hotel","experience","adventure","springs"]);
const normalized = (value) => String(value ?? "").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
const textOnly = (value) => String(value ?? "").replace(/<[^>]*>/g," ").replace(/&(?:nbsp|amp|quot|lt|gt);/g," ").replace(/\s+/g," ").trim();
const nameTokens = (name) => normalized(name).split(" ").filter(t => t.length > 2 && !SKIP_WORDS.has(t));
const stripFile = (file) => file.startsWith("File:") ? file.slice(5) : file;
function mediaLicense(ext) {
  const raw = String(ext?.LicenseUrl?.value ?? "");
  if (!raw || !/^https?:\/\/|^\/\//i.test(raw)) return null;
  let uri;
  try { uri = new URL(raw.startsWith("//") ? "https:" + raw : raw); } catch { return null; }
  if (uri.protocol !== "https:" || uri.hostname !== "creativecommons.org") return null;
  if (!/^\/(?:licenses\/(?:by|by-sa|by-nd|by-nc|by-nc-sa|by-nc-nd)\/\d+(?:\.\d+)?\/|publicdomain\/(?:zero|mark)\/1\.0\/?)/.test(uri.pathname)) return null;
  // Noncommercial and NoDerivatives permissions are excluded from commercial editorial proposals.
  if (/\/(?:by-nd|by-nc)/.test(uri.pathname)) return null;
  return { url: uri.toString(), label: textOnly(ext?.LicenseShortName?.value ?? ext?.License?.value ?? "Creative Commons") };
}
function candidateFor(park, page) {
  if (!page?.title?.startsWith("File:")) return null;
  if (!/\.(?:jpe?g|png|webp)$/i.test(page.title)) return null;
  const info = page.imageinfo?.[0];
  if (!info || info.width < 800 || info.height < 450) return null;
  const ext = info.extmetadata ?? {};
  const license = mediaLicense(ext);
  if (!license) return null;
  const filename = stripFile(page.title);
  const description = textOnly(ext.ImageDescription?.value ?? "");
  const haystack = normalized(filename + " " + description);
  const city = normalized(park.city);
  const cityMatched = Boolean(city && haystack.includes(city));
  const tokens = nameTokens(park.name);
  const matched = tokens.filter(token => haystack.split(" ").includes(token));
  // Place brand names alone are not enough: more than one branch may exist.
  if (!cityMatched || matched.length === 0) return null;
  // A matching city and brand merely qualify for editorial review, NOT publication.
  return {
    file: filename,
    sourceUrl: "https://commons.wikimedia.org/wiki/" + encodeURIComponent(page.title).replace(/%3A/i, ":"),
    suggestedImageUrl: info.thumburl ?? info.url,
    photographer: textOnly(ext.Artist?.value ?? ""),
    licenseUrl: license.url,
    licenseLabel: license.label,
    description: description.slice(0, 500),
    width: info.width,
    height: info.height,
    matchedNameTokens: matched,
    cityMatched,
    reviewStatus: "UNVERIFIED_LOCATION_AND_RIGHTS_REVIEW_REQUIRED",
    publishableWithoutEditorialReview: false,
  };
}
function tests() {
  const park = { name: "Doug Russell Aquatic Center", city: "Midland" };
  const meta = { width: 3000, height: 1000, url: "https://upload.wikimedia.org/test.jpg", extmetadata: { LicenseUrl: { value: "https://creativecommons.org/licenses/by-sa/3.0/" }, LicenseShortName: { value: "CC BY-SA 3.0" }, Artist: { value: "Texas.pics" } } };
  assert.ok(candidateFor(park, { title: "File:Doug Russell Pool Midland Texas.jpg", imageinfo: [meta] }));
  assert.equal(candidateFor(park, { title: "File:Doug Russell Pool Arlington Texas.jpg", imageinfo: [meta] }), null);
  assert.equal(candidateFor(park, { title: "File:Doug Russell Pool Midland Texas.jpg", imageinfo: [{ ...meta, extmetadata: { LicenseUrl: { value: "https://example.com/license" } } }] }), null);
  assert.equal(candidateFor(park, { title: "File:Doug Russell Pool Midland Texas.jpg", imageinfo: [{ ...meta, extmetadata: { LicenseUrl: { value: "https://creativecommons.org/licenses/by-nc/4.0/" } } }] }), null);
  assert.equal(candidateFor(park, { title: "File:Doug Russell Pool Midland Texas.jpg", imageinfo: [{ ...meta, width: 100 }] }), null);
  assert.equal(candidateFor(park, { title: "File:Doug Russell Pool Midland Texas.svg", imageinfo: [meta] }), null);
  assert.equal(candidateFor({ name: "Hawaiian Waters Garland", city: "Garland" }, { title: "File:Hawaiian Falls The Colony Texas.jpg", imageinfo: [meta] }), null);
  console.log("Waterpark candidate sourcing fail-closed self-tests passed.");
}
const option = (prefix, fallback) => process.argv.find(a => a.startsWith(prefix))?.slice(prefix.length) ?? fallback;
async function run() {
  if (process.argv.includes("--self-test")) { tests(); return; }
  const match = readFileSync(DATA_PATH, "utf8").match(/export const texasWaterParks: WaterParkGuide\[\] = (\[[\s\S]*?\]);\nexport const texasWaterParksBySlug/);
  if (!match) throw new Error("Canonical waterpark registry cannot be parsed.");
  const all = JSON.parse(match[1]);
  const pending = all.filter(p => !p.licensedMedia);
  const limit = Number(option("--limit=", "20"));
  const rotation = process.argv.includes("--rotation=weekly");
  const weeklyWindow = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  const offset = rotation ? (weeklyWindow % Math.ceil(pending.length / limit)) * limit : Number(option("--offset=", "0"));
  if (!Number.isInteger(limit) || limit < 1 || limit > MAX_BATCH || !Number.isInteger(offset) || offset < 0 || offset >= pending.length) {
    throw new Error("Use an offset within the unphotographed park count and a limit between 1 and 25.");
  }
  const selected = pending.slice(offset, offset + limit);
  const report = {
    generatedAt: new Date().toISOString(),
    publicationPolicy: "REVIEW_ONLY_NEVER_AUTO_PUBLISH",
    totalVenueRecords: all.length,
    alreadyPhotographed: all.length - pending.length,
    remainingWithoutPhoto: pending.length,
    offset, limit, selected: selected.length,
    entries: [],
  };
  for (const park of selected) {
    const query = nameTokens(park.name).slice(0, 3).join(" ") + " " + park.city + " Texas";
    const u = new URL(COMMONS_API);
    for (const [key, value] of Object.entries({
      action:"query",generator:"search",gsrsearch:query,gsrnamespace:"6",
      gsrlimit:String(MAX_RESULTS),prop:"imageinfo",iiprop:"extmetadata|url|size",
      iiurlwidth:"1280",format:"json",formatversion:"2",
    })) u.searchParams.set(key,value);
    const record = { slug:park.slug, name:park.name, city:park.city, officialUrl:park.officialUrl, query, candidates:[], error:null };
    try {
      const response = await fetch(u, { headers: { "User-Agent":"TexasDefined-Editorial-RightsResearch/1.0 (https://texasdefined.com)" }, signal:AbortSignal.timeout(12000) });
      if (!response.ok) throw new Error("Wikimedia HTTP " + response.status);
      const json = await response.json();
      if (json.error) throw new Error("Wikimedia response error: " + String(json.error.code));
      const pages = json.query?.pages;
      if (pages && !Array.isArray(pages)) throw new Error("Unexpected Commons query result");
      record.candidates = (pages ?? []).map(item => candidateFor(park, item)).filter(Boolean).slice(0, 4);
    } catch (error) {
      record.error = String(error?.message ?? error).slice(0, 200);
    }
    report.entries.push(record);
  }
  mkdirSync(dirname(REPORT_PATH), { recursive:true });
  writeFileSync(REPORT_PATH, JSON.stringify(report,null,2)+"\n");
  const matchCount = report.entries.filter(x => x.candidates.length).length;
  const errorCount = report.entries.filter(x => x.error).length;
  const result = "Commons photo candidate research: "+selected.length+" individual venue requests; "+matchCount+" with licensed possible matches; "+errorCount+" source request failures; 0 auto-published.";
  console.log(result);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, result+"\n\nAll candidates require **human file/venue/license review** before any registry image can be added. No indexing flags were changed.\n");
  // Fail visible for provider outage; still preserve the report artifact.
  if (errorCount === selected.length) process.exitCode = 1;
}
await run();
