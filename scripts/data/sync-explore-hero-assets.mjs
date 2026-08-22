import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const ENV_PATH = path.join(ROOT, ".env");
const LEGACY_EXPLORE_PATH = path.join(ROOT, "src/data/fixtures/legacy-explore.ts");
const LEGACY_LAKES_PATH = path.join(ROOT, "src/data/fixtures/legacy-lakes.ts");
const OUT_DIR = path.join(ROOT, "public/images/explore");
const MAP_PATH = path.join(ROOT, "src/data/explore-hero-map.ts");
const REPORT_PATH = path.join(ROOT, "scripts/data/explore-hero-report.json");
const PLACEHOLDER_MARKERS = ["texasdefined-destination-placeholder", "texasdefined-placeholder"];
const LICENSE_OK = ["public domain", "cc0", "cc by", "cc-by", "cc by-sa", "cc-by-sa"];
const USER_AGENT = "TexasDefined/1.0 (Explore photo reconciliation; https://texasdefined.com)";
const API_GAP_MS = 500;
const CLOUDFLARE_MODEL = "@cf/black-forest-labs/flux-1-schnell";
let lastApiRequestAt = 0;

const GENERIC_WORDS = new Set([
  "texas", "state", "national", "park", "parks", "natural", "area", "historic", "historical", "site",
  "recreation", "management", "wildlife", "refuge", "lake", "river", "spring", "cavern", "cave", "beach",
  "coast", "island", "town", "city", "community", "the", "and", "of", "at", "in", "unit", "center",
]);

function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
function parseEnv(text) {
  const result = {};
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const i = line.indexOf("=");
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    result[key] = value;
  }
  return result;
}
function normalize(value) { return String(value || "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim(); }
function slugify(value) { return normalize(value).replace(/\s+/g, "-"); }
function cleanHtml(value) { return String(value || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&#39;|&apos;/gi, "'").replace(/&quot;/gi, '"').replace(/\s+/g, " ").trim(); }
function isPlaceholder(src) { return !src || PLACEHOLDER_MARKERS.some((marker) => String(src).includes(marker)); }
function isJpeg(url) { const value = String(url || ""); return !isPlaceholder(value) && /\.jpe?g(?:$|\?|#)/i.test(value); }
function categoryForType(value) {
  const n = String(value || "").toLowerCase().replace(/[\s-]+/g, "_");
  if (["national_park", "national_monument", "national_preserve", "national_seashore", "national_recreation_area"].some((x) => n.includes(x))) return "national-parks";
  if (["major_spring", "spring", "spring_fed_pool"].some((x) => n.includes(x))) return "major-springs";
  if (["cavern", "cave", "karst"].some((x) => n.includes(x))) return "caverns";
  if (["lighthouse", "beach", "coast", "seashore", "island", "bay", "shore"].some((x) => n.includes(x))) return "beaches-coast";
  if (["museum", "historic_site", "historical_site", "mission", "battlefield", "monument", "heritage"].some((x) => n.includes(x))) return "historic-sites";
  if (["lake", "river", "reservoir", "waterfall", "swimming_hole"].some((x) => n.includes(x))) return "lakes-rivers";
  if (["wildlife_refuge", "wildlife_management_area", "wildlife_area", "birding_center"].some((x) => n.includes(x))) return "outdoors";
  if (["state_park", "park", "natural_area", "campground", "trail"].some((x) => n.includes(x))) return "state-parks";
  if (["town", "city", "community", "county"].some((x) => n.includes(x))) return "small-towns";
  if (["restaurant", "barbecue", "bbq", "winery", "brewery", "food"].some((x) => n.includes(x))) return "food-bbq";
  if (["road_trip", "scenic_drive", "highway"].some((x) => n.includes(x))) return "road-trips";
  return "outdoors";
}
function distinctiveTokens(name) { return normalize(name).split(" ").filter((token) => token.length > 2 && !GENERIC_WORDS.has(token)); }
function sourceKey(row) { return `${row.category}:${row.slug}`; }
function imageAiConfigured() { return Boolean(process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN); }

async function loadDestinations() {
  const envText = await fs.readFile(ENV_PATH, "utf8").catch(() => "");
  const env = parseEnv(envText);
  if (!process.env.CLOUDFLARE_ACCOUNT_ID && env.CLOUDFLARE_ACCOUNT_ID) process.env.CLOUDFLARE_ACCOUNT_ID = env.CLOUDFLARE_ACCOUNT_ID;
  if (!process.env.CLOUDFLARE_API_TOKEN && env.CLOUDFLARE_API_TOKEN) process.env.CLOUDFLARE_API_TOKEN = env.CLOUDFLARE_API_TOKEN;
  const supabaseUrl = String(env.VITE_TEXASDEFINED_SUPABASE_URL || env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
  const supabaseKey = String(env.VITE_TEXASDEFINED_SUPABASE_ANON_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY || "");
  const rows = [];

  if (supabaseUrl && supabaseKey) {
    const params = new URLSearchParams({ select: "name,slug,entity_type,city,county,region,latitude,longitude,hero_image_url,hero_image_alt,summary,description,activities", limit: "5000" });
    const response = await fetch(`${supabaseUrl}/rest/v1/explore_public_entities?${params}`, { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, "User-Agent": USER_AGENT } });
    if (response.ok) {
      const remote = await response.json();
      for (const row of Array.isArray(remote) ? remote : []) {
        const category = categoryForType(row.entity_type);
        if (category === "state-parks") continue;
        rows.push({
          slug: String(row.slug || slugify(row.name)), name: String(row.name || "Texas destination"), category,
          city: String(row.city || ""), county: String(row.county || ""), lat: Number(row.latitude || 0), lng: Number(row.longitude || 0),
          summary: String(row.summary || row.description || ""), activities: Array.isArray(row.activities) ? row.activities.map(String) : [],
          existingHero: String(row.hero_image_url || ""), existingAlt: String(row.hero_image_alt || ""), source: "remote",
        });
      }
    } else console.warn(`Explore public catalog returned ${response.status}; preserved records will still be processed.`);
  }

  const legacyExplore = await fs.readFile(LEGACY_EXPLORE_PATH, "utf8").catch(() => "");
  const exploreBlock = legacyExplore.match(/const records = `([\s\S]*?)`\.trim\(\)/)?.[1] || "";
  for (const line of exploreBlock.split(/\r?\n/).map((item) => item.trim()).filter(Boolean)) {
    const [slug, name, type, town, county, , lat, lng, summary, , activities] = line.split("|");
    const category = categoryForType(type);
    if (category === "state-parks") continue;
    rows.push({ slug, name, category, city: town, county, lat: Number(lat || 0), lng: Number(lng || 0), summary: summary || "", activities: String(activities || "").split(",").map((x) => x.trim()).filter(Boolean), existingHero: "", existingAlt: "", source: "preserved" });
  }

  const legacyLakes = await fs.readFile(LEGACY_LAKES_PATH, "utf8").catch(() => "");
  const lakesBlock = legacyLakes.match(/const records = `([\s\S]*?)`\.trim\(\)\.split/)?.[1] || "";
  for (const line of lakesBlock.split(/\r?\n/).map((item) => item.trim()).filter(Boolean)) {
    const [slug, name, town, county, , lat, lng, summary, , activities] = line.split("|");
    if (!slug || !name || /state-park/i.test(slug)) continue;
    rows.push({ slug, name, category: "lakes-rivers", city: town, county, lat: Number(lat || 0), lng: Number(lng || 0), summary: summary || "", activities: String(activities || "").split(",").map((x) => x.trim()).filter(Boolean), existingHero: "", existingAlt: "", source: "preserved" });
  }

  const merged = new Map();
  for (const row of rows) {
    if (!row.slug) continue;
    const current = merged.get(row.slug);
    if (!current || (row.source === "remote" && current.source !== "remote")) merged.set(row.slug, row);
  }
  return [...merged.values()].sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
}

async function pacedFetch(url, options = {}, attempts = 5) {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const elapsed = Date.now() - lastApiRequestAt;
    if (elapsed < API_GAP_MS) await sleep(API_GAP_MS - elapsed);
    lastApiRequestAt = Date.now();
    try {
      const response = await fetch(url, { ...options, headers: { "User-Agent": USER_AGENT, ...(options.headers || {}) } });
      if (response.ok) return response;
      if (![429, 500, 502, 503, 504].includes(response.status)) throw new Error(`HTTP ${response.status}`);
      await sleep(Math.min(12000, 1200 * (2 ** attempt)));
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) { lastError = error; if (attempt < attempts - 1) await sleep(Math.min(12000, 1200 * (2 ** attempt))); }
  }
  throw lastError || new Error("request failed");
}
async function apiJson(base, params) { const response = await pacedFetch(`${base}?${params.toString()}`, { headers: { Accept: "application/json" } }); return response.json(); }
function licenseAllowed(meta) { const text = cleanHtml(meta?.LicenseShortName?.value || meta?.UsageTerms?.value).toLowerCase(); return LICENSE_OK.some((allowed) => text.includes(allowed)); }
function evidence(page) { const info = page.imageinfo?.[0]; const meta = info?.extmetadata || {}; return [page.title, meta.ObjectName?.value, meta.ImageDescription?.value, meta.Categories?.value].map(cleanHtml).join(" "); }
function specificityScore(page, destination) {
  const raw = evidence(page); const normalized = normalize(raw); const title = normalize(page.title || ""); const tokens = distinctiveTokens(destination.name);
  if (!tokens.length) return -1;
  const matched = tokens.filter((token) => normalized.includes(token));
  const required = tokens.length <= 2 ? 1 : Math.max(2, Math.ceil(tokens.length * 0.5));
  if (matched.length < required) return -1;
  let score = matched.length * 14;
  const compact = normalize(destination.name.replace(/\s+(National|State).*$/i, ""));
  if (compact && normalized.includes(compact)) score += 55;
  if (compact && title.includes(compact)) score += 40;
  if (destination.city && normalized.includes(normalize(destination.city))) score += 10;
  if (destination.county && normalized.includes(normalize(destination.county))) score += 5;
  if (/landscape|view|overlook|trail|lake|river|falls|canyon|mountain|pool|spring|beach|cave|cavern|mission|downtown|street|square|historic|scenic|shore/i.test(raw)) score += 8;
  if (/portrait|logo|map|diagram|flag|seal|sign only/i.test(page.title || "")) score -= 15;
  return score;
}
function validCandidates(pages, destination, usedTitles) {
  const rows = [];
  for (const page of pages) {
    if (!page?.title || usedTitles.has(page.title)) continue;
    const info = page.imageinfo?.[0];
    if (!info || info.mime !== "image/jpeg" || !licenseAllowed(info.extmetadata)) continue;
    const src = info.thumburl || info.url;
    if (!src || !isJpeg(src)) continue;
    const score = specificityScore(page, destination);
    if (score >= 0) rows.push({ page, score });
  }
  return rows.sort((a, b) => b.score - a.score);
}
async function commonsSearch(query, limit = 40) {
  const params = new URLSearchParams({ action: "query", generator: "search", gsrsearch: query, gsrnamespace: "6", gsrlimit: String(limit), prop: "imageinfo", iiprop: "url|mime|size|extmetadata", iiurlwidth: "1600", format: "json", origin: "*" });
  const payload = await apiJson("https://commons.wikimedia.org/w/api.php", params);
  return Object.values(payload.query?.pages || {});
}
async function commonsCategory(name) {
  const params = new URLSearchParams({ action: "query", generator: "categorymembers", gcmtitle: `Category:${name}`, gcmtype: "file", gcmlimit: "50", prop: "imageinfo", iiprop: "url|mime|size|extmetadata", iiurlwidth: "1600", format: "json", origin: "*" });
  const payload = await apiJson("https://commons.wikimedia.org/w/api.php", params);
  return Object.values(payload.query?.pages || {});
}
async function chooseCommonsImage(destination, usedTitles) {
  const exactQueries = [`intitle:\"${destination.name}\"`, `\"${destination.name}\" Texas`, `${destination.name} Texas`, `${destination.name} ${destination.city || "Texas"}`];
  for (const query of exactQueries) {
    const rows = validCandidates(await commonsSearch(query), destination, usedTitles);
    if (rows[0] && rows[0].score >= 42) return rows[0].page;
  }
  for (const categoryName of [...new Set([destination.name, destination.name.replace(/\s+(National|State).*$/i, "")])]) {
    const rows = validCandidates(await commonsCategory(categoryName), destination, usedTitles);
    if (rows[0]) return rows[0].page;
  }
  return null;
}
function creditFor(page) { const meta = page.imageinfo?.[0]?.extmetadata || {}; const artist = cleanHtml(meta.Artist?.value || meta.Credit?.value || "Wikimedia Commons contributor"); const license = cleanHtml(meta.LicenseShortName?.value || meta.UsageTerms?.value || "free license"); return `${artist} · ${license} · Wikimedia Commons`; }
async function downloadJpeg(url, destinationPath) {
  const response = await pacedFetch(url, { headers: { Accept: "image/jpeg,image/*;q=0.8" } });
  const type = response.headers.get("content-type") || "";
  if (!type.includes("image/jpeg")) throw new Error(`expected JPEG, got ${type}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 20000) throw new Error(`JPEG suspiciously small (${bytes.length} bytes)`);
  await fs.writeFile(destinationPath, bytes);
}
function aiPrompt(destination) {
  const features = [destination.summary, destination.activities.length ? `Documented activities or features: ${destination.activities.join(", ")}.` : ""].filter(Boolean).join(" ");
  return [
    `Create a unique photorealistic editorial landscape image inspired specifically by ${destination.name} near ${destination.city || "its documented Texas location"}${destination.county ? ` in ${destination.county} County` : ""}, Texas.`,
    `Category: ${destination.category}. ${features}`,
    "Use only geography, vegetation, water, geology, architecture, streetscape, recreation features, and built features plausible from the supplied location context. Do not invent a famous landmark not supported by the description.",
    "This is an AI-generated representative editorial image, not a documentary claim that the exact camera view exists.",
    "Natural Texas light, realistic photography aesthetic, 16:9 landscape composition, no text, no signs, no logos, no watermarks, no recognizable faces.",
    "Make the composition visibly distinct from all other Texas Defined destination hero images.",
  ].join(" ");
}
async function generateAiJpeg(destination, destinationPath) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) return false;
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${CLOUDFLARE_MODEL}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: aiPrompt(destination).slice(0, 2048), steps: 4 }),
  });
  if (!response.ok) throw new Error(`Cloudflare Workers AI ${response.status}: ${(await response.text().catch(() => "")).slice(0, 220)}`);

  const contentType = response.headers.get("content-type") || "";
  let bytes;
  if (contentType.includes("application/json")) {
    const payload = await response.json();
    const b64 = payload?.result?.image || payload?.image;
    if (!b64) throw new Error("Cloudflare Workers AI returned no image data");
    bytes = Buffer.from(b64, "base64");
  } else {
    bytes = Buffer.from(await response.arrayBuffer());
  }
  if (bytes.length < 20000) throw new Error(`AI image suspiciously small (${bytes.length} bytes)`);
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) { await fs.writeFile(destinationPath, bytes); return true; }
  const temp = `${destinationPath}.generated`; await fs.writeFile(temp, bytes);
  try { await execFileAsync("convert", [temp, "-auto-orient", "-strip", "-resize", "1600x1600>", "-quality", "88", destinationPath]); } finally { await fs.rm(temp, { force: true }); }
  return true;
}
function tsString(value) { return JSON.stringify(String(value || "")); }

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const destinations = await loadDestinations();
  if (!destinations.length) throw new Error("No non-state Explore destinations were found.");
  const heroCounts = new Map();
  for (const destination of destinations) if (!isPlaceholder(destination.existingHero)) heroCounts.set(destination.existingHero, (heroCounts.get(destination.existingHero) || 0) + 1);
  const usedTitles = new Set();
  const mapRows = [];
  const report = { generatedAt: new Date().toISOString(), totalDestinations: destinations.length, byCategory: {}, retainedUniqueExisting: [], downloaded: [], aiGenerated: [], unresolved: [], rejectedDuplicateExisting: [], aiAvailable: imageAiConfigured() };

  for (let index = 0; index < destinations.length; index += 1) {
    const destination = destinations[index];
    report.byCategory[destination.category] ||= { total: 0, retained: 0, downloaded: 0, aiGenerated: 0, unresolved: 0 };
    report.byCategory[destination.category].total += 1;
    const existingUnique = !isPlaceholder(destination.existingHero) && heroCounts.get(destination.existingHero) === 1;
    if (existingUnique) {
      report.retainedUniqueExisting.push(sourceKey(destination)); report.byCategory[destination.category].retained += 1;
      console.log(`[${index + 1}/${destinations.length}] ${destination.name} — retained unique existing hero`); continue;
    }
    if (!isPlaceholder(destination.existingHero) && heroCounts.get(destination.existingHero) > 1) report.rejectedDuplicateExisting.push(sourceKey(destination));

    console.log(`[${index + 1}/${destinations.length}] ${destination.name} — resolving destination-specific hero`);
    let resolved = false;
    try {
      const page = await chooseCommonsImage(destination, usedTitles);
      if (page) {
        const info = page.imageinfo?.[0]; const src = info.thumburl || info.url;
        const categoryDir = path.join(OUT_DIR, destination.category); await fs.mkdir(categoryDir, { recursive: true });
        const relative = `/images/explore/${destination.category}/${destination.slug}.jpg`;
        await downloadJpeg(src, path.join(categoryDir, `${destination.slug}.jpg`));
        usedTitles.add(page.title);
        mapRows.push({ slug: destination.slug, src: relative, alt: `${destination.name} in Texas`, width: Number(info.thumbwidth || info.width || 1600), height: Number(info.thumbheight || info.height || 900), credit: creditFor(page) });
        report.downloaded.push({ slug: destination.slug, name: destination.name, category: destination.category, sourceTitle: page.title }); report.byCategory[destination.category].downloaded += 1;
        resolved = true;
      }
    } catch (error) { console.warn(`  free-photo lookup failed: ${error?.message || error}`); }

    if (!resolved && imageAiConfigured()) {
      try {
        const categoryDir = path.join(OUT_DIR, destination.category); await fs.mkdir(categoryDir, { recursive: true });
        const relative = `/images/explore/${destination.category}/${destination.slug}.jpg`;
        await generateAiJpeg(destination, path.join(categoryDir, `${destination.slug}.jpg`));
        mapRows.push({ slug: destination.slug, src: relative, alt: `AI-generated representative editorial landscape for ${destination.name}`, width: 1600, height: 900, credit: "AI-generated representative editorial image · Texas Defined" });
        report.aiGenerated.push({ slug: destination.slug, name: destination.name, category: destination.category }); report.byCategory[destination.category].aiGenerated += 1;
        resolved = true;
      } catch (error) { console.warn(`  AI generation failed: ${error?.message || error}`); }
    }

    if (!resolved) { report.unresolved.push({ slug: destination.slug, name: destination.name, category: destination.category, reason: imageAiConfigured() ? "free photo lookup and AI generation both failed" : "no free photo found and Cloudflare image generation unavailable" }); report.byCategory[destination.category].unresolved += 1; }
    await sleep(200);
  }

  const duplicateResolved = new Map();
  for (const row of mapRows) duplicateResolved.set(row.src, (duplicateResolved.get(row.src) || 0) + 1);
  const duplicates = [...duplicateResolved.entries()].filter(([, count]) => count > 1);
  if (duplicates.length) throw new Error(`Generated Explore hero map contains ${duplicates.length} duplicate source paths.`);

  const lines = ['import type { ImageRef } from "./types";', "", "/** Generated by scripts/data/sync-explore-hero-assets.mjs. Do not hand-edit. */", "export const exploreHeroMap: Record<string, ImageRef> = {", ...mapRows.map((row) => `  ${tsString(row.slug)}: { src: ${tsString(row.src)}, alt: ${tsString(row.alt)}, width: ${row.width || 1600}, height: ${row.height || 900}, credit: ${tsString(row.credit)} },`), "};", ""];
  await fs.writeFile(MAP_PATH, lines.join("\n"), "utf8");
  await fs.writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({ totalDestinations: report.totalDestinations, retainedUniqueExisting: report.retainedUniqueExisting.length, downloaded: report.downloaded.length, aiGenerated: report.aiGenerated.length, unresolved: report.unresolved.length, byCategory: report.byCategory }, null, 2));
  if (report.unresolved.length) process.exitCode = 3;
}

await main();
