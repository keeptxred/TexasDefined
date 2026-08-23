import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const ENV_PATH = path.join(ROOT, ".env");
const LEGACY_PATH = path.join(ROOT, "src/data/fixtures/legacy-explore.ts");
const OUT_DIR = path.join(ROOT, "public/images/state-parks");
const MAP_PATH = path.join(ROOT, "src/data/state-park-hero-map.ts");
const REPORT_PATH = path.join(ROOT, "scripts/data/state-park-hero-report.json");
const PLACEHOLDER_MARKERS = ["texasdefined-destination-placeholder", "texasdefined-placeholder"];
const LICENSE_OK = ["public domain", "cc0", "cc by", "cc-by", "cc by-sa", "cc-by-sa"];
const USER_AGENT = "TexasDefined/1.0 (park-photo sync; https://texasdefined.com)";
const API_GAP_MS = 850;
const CLOUDFLARE_MODEL = "@cf/black-forest-labs/flux-1-schnell";
let lastApiRequestAt = 0;

const GENERIC_WORDS = new Set([
  "state", "park", "parks", "natural", "area", "historic", "site", "trailway", "environmental",
  "educational", "learning", "center", "the", "and", "unit", "texas", "recreation", "management",
  "world", "birding",
]);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseEnv(text) {
  const result = {};
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const index = line.indexOf("=");
    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    result[key] = value;
  }
  return result;
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function distinctiveTokens(name) {
  return normalize(name)
    .split(" ")
    .filter((token) => token.length > 2 && !GENERIC_WORDS.has(token));
}

function cleanHtml(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function isJpeg(url) {
  const value = String(url || "");
  return Boolean(value)
    && !PLACEHOLDER_MARKERS.some((marker) => value.includes(marker))
    && /\.jpe?g(?:$|\?|#)/i.test(value);
}

function isStateParkType(type) {
  const normalized = String(type || "").toLowerCase().replace(/[\s-]+/g, "_");
  if (["national_park", "national_monument", "national_preserve", "national_seashore"].some((value) => normalized.includes(value))) return false;
  return ["state_park", "park", "natural_area", "campground", "trail"].some(
    (value) => normalized === value || normalized.includes(value),
  );
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function imageAiConfigured() {
  return Boolean(process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN);
}

async function loadParks() {
  const envText = await fs.readFile(ENV_PATH, "utf8").catch(() => "");
  const env = parseEnv(envText);
  if (!process.env.CLOUDFLARE_ACCOUNT_ID && env.CLOUDFLARE_ACCOUNT_ID) process.env.CLOUDFLARE_ACCOUNT_ID = env.CLOUDFLARE_ACCOUNT_ID;
  if (!process.env.CLOUDFLARE_API_TOKEN && env.CLOUDFLARE_API_TOKEN) process.env.CLOUDFLARE_API_TOKEN = env.CLOUDFLARE_API_TOKEN;
  const supabaseUrl = String(env.VITE_TEXASDEFINED_SUPABASE_URL || env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
  const supabaseKey = String(env.VITE_TEXASDEFINED_SUPABASE_ANON_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY || "");
  const rows = [];

  if (supabaseUrl && supabaseKey) {
    const params = new URLSearchParams({
      select: "name,slug,entity_type,city,county,region,latitude,longitude,hero_image_url,hero_image_alt,summary,description,activities",
      limit: "5000",
    });
    const response = await fetch(`${supabaseUrl}/rest/v1/explore_public_entities?${params}`, {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, "User-Agent": USER_AGENT },
    });
    if (response.ok) {
      const remote = await response.json();
      if (Array.isArray(remote)) {
        for (const row of remote) {
          if (!isStateParkType(row.entity_type)) continue;
          rows.push({
            slug: String(row.slug || slugify(row.name)),
            name: String(row.name || "Texas State Park"),
            city: String(row.city || ""),
            county: String(row.county || ""),
            lat: Number(row.latitude || 0),
            lng: Number(row.longitude || 0),
            summary: String(row.summary || row.description || ""),
            activities: Array.isArray(row.activities) ? row.activities.map(String) : [],
            existingHero: String(row.hero_image_url || ""),
            existingAlt: String(row.hero_image_alt || ""),
            source: "remote",
          });
        }
      }
    } else {
      console.warn(`Explore public catalog returned ${response.status}; using preserved records too.`);
    }
  }

  const legacy = await fs.readFile(LEGACY_PATH, "utf8").catch(() => "");
  const block = legacy.match(/const records = `([\s\S]*?)`\.trim\(\)/)?.[1] || "";
  for (const line of block.split(/\r?\n/).map((item) => item.trim()).filter(Boolean)) {
    const [slug, name, type, town, county, , lat, lng, summary, , activities] = line.split("|");
    if (!isStateParkType(type)) continue;
    rows.push({
      slug,
      name,
      city: town,
      county,
      lat: Number(lat || 0),
      lng: Number(lng || 0),
      summary: summary || "",
      activities: String(activities || "").split(",").map((item) => item.trim()).filter(Boolean),
      existingHero: "",
      existingAlt: "",
      source: "preserved",
    });
  }

  const merged = new Map();
  for (const row of rows) {
    if (!row.slug) continue;
    const current = merged.get(row.slug);
    if (!current || (row.source === "remote" && current.source !== "remote")) merged.set(row.slug, row);
  }
  return [...merged.values()].sort((a, b) => a.name.localeCompare(b.name));
}

async function pacedFetch(url, options = {}, attempts = 5) {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const elapsed = Date.now() - lastApiRequestAt;
    if (elapsed < API_GAP_MS) await sleep(API_GAP_MS - elapsed);
    lastApiRequestAt = Date.now();

    try {
      const response = await fetch(url, {
        ...options,
        headers: { "User-Agent": USER_AGENT, Accept: "application/json", ...(options.headers || {}) },
      });
      if (response.ok) return response;
      if (![429, 500, 502, 503, 504].includes(response.status)) throw new Error(`HTTP ${response.status}`);
      const retryAfter = Number(response.headers.get("retry-after") || 0);
      const wait = retryAfter > 0 ? retryAfter * 1000 : Math.min(12_000, 1_500 * (2 ** attempt));
      console.warn(`HTTP ${response.status}; waiting ${wait}ms before retry ${attempt + 2}/${attempts}`);
      await sleep(wait);
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
      if (attempt < attempts - 1) await sleep(Math.min(12_000, 1_500 * (2 ** attempt)));
    }
  }
  throw lastError || new Error("request failed");
}

async function apiJson(base, params) {
  const response = await pacedFetch(`${base}?${params.toString()}`);
  return response.json();
}

function licenseAllowed(metadata) {
  const text = cleanHtml(metadata?.LicenseShortName?.value || metadata?.UsageTerms?.value).toLowerCase();
  return LICENSE_OK.some((allowed) => text.includes(allowed));
}

function candidateEvidence(page) {
  const info = page.imageinfo?.[0];
  const meta = info?.extmetadata || {};
  return [page.title, meta.ObjectName?.value, meta.ImageDescription?.value, meta.Categories?.value]
    .map(cleanHtml)
    .join(" ");
}

function compactParkName(name) {
  return normalize(
    name
      .replace(/^World Birding Center\s*-\s*/i, "")
      .replace(/\s+State Park & Environmental Learning Center$/i, " State Park")
      .replace(/\s+State Park Lodge$/i, "")
      .replace(/\s+State Park & Historic Site$/i, "")
      .replace(/\s+State Natural Area$/i, "")
      .replace(/\s+State Park$/i, "")
      .replace(/\s+State Park & Trailway$/i, ""),
  );
}

function specificityScore(page, park) {
  const evidenceRaw = candidateEvidence(page);
  const evidence = normalize(evidenceRaw);
  const title = normalize(page.title || "");
  const tokens = distinctiveTokens(park.name);
  if (!tokens.length) return -1;
  const matched = tokens.filter((token) => evidence.includes(token));
  const required = tokens.length <= 2 ? 1 : Math.max(2, Math.ceil(tokens.length * 0.5));
  if (matched.length < required) return -1;
  let score = matched.length * 12;
  const compact = compactParkName(park.name);
  if (compact && evidence.includes(compact)) score += 60;
  if (compact && title.includes(compact)) score += 45;
  if (park.city && evidence.includes(normalize(park.city))) score += 8;
  if (park.county && evidence.includes(normalize(park.county))) score += 5;
  if (/landscape|view|overlook|trail|lake|river|falls|canyon|mountain|pool|spring|beach|camp|entrance|ccc|historic|pavilion|day use|scenic/i.test(evidenceRaw)) score += 10;
  if (/bird|deer|insect|flower|snake|spider|portrait|sign only/i.test(page.title || "")) score -= 8;
  const info = page.imageinfo?.[0];
  const width = Number(info?.thumbwidth || info?.width || 0);
  if (width >= 1400) score += 6;
  else if (width >= 1000) score += 3;
  return score;
}

function validCandidates(pages, park, usedSourceTitles) {
  const rows = [];
  for (const page of pages) {
    if (!page?.title || usedSourceTitles.has(page.title)) continue;
    const info = page.imageinfo?.[0];
    if (!info || info.mime !== "image/jpeg" || !licenseAllowed(info.extmetadata)) continue;
    const src = info.thumburl || info.url;
    if (!src || !isJpeg(src)) continue;
    const score = specificityScore(page, park);
    if (score < 0) continue;
    rows.push({ page, score });
  }
  return rows.sort((a, b) => b.score - a.score);
}

async function commonsSearch(query, limit = 40) {
  const params = new URLSearchParams({
    action: "query", generator: "search", gsrsearch: query, gsrnamespace: "6", gsrlimit: String(limit),
    prop: "imageinfo", iiprop: "url|mime|size|extmetadata", iiurlwidth: "1600", format: "json", origin: "*",
  });
  const payload = await apiJson("https://commons.wikimedia.org/w/api.php", params);
  return Object.values(payload.query?.pages || {});
}

async function commonsCategory(name) {
  const params = new URLSearchParams({
    action: "query", generator: "categorymembers", gcmtitle: `Category:${name}`, gcmtype: "file", gcmlimit: "50",
    prop: "imageinfo", iiprop: "url|mime|size|extmetadata", iiurlwidth: "1600", format: "json", origin: "*",
  });
  const payload = await apiJson("https://commons.wikimedia.org/w/api.php", params);
  return Object.values(payload.query?.pages || {});
}

async function chooseCommonsImage(park, usedSourceTitles) {
  const exactQueries = [`intitle:\"${park.name}\"`, `\"${park.name}\" Texas`, `${park.name} Texas`];
  for (const query of exactQueries) {
    const rows = validCandidates(await commonsSearch(query), park, usedSourceTitles);
    if (rows[0] && rows[0].score >= 45) return rows[0].page;
  }
  const categoryNames = [park.name, park.name.replace(/ & Historic Site$/i, ""), park.name.replace(/^World Birding Center\s*-\s*/i, "")];
  for (const categoryName of [...new Set(categoryNames)]) {
    const rows = validCandidates(await commonsCategory(categoryName), park, usedSourceTitles);
    if (rows[0]) return rows[0].page;
  }
  const base = park.name
    .replace(/^World Birding Center\s*-\s*/i, "")
    .replace(/ State Park & Environmental Learning Center$/i, " State Park")
    .replace(/ State Park Lodge$/i, "")
    .replace(/ & Historic Site$/i, "");
  const location = park.city || park.county || "Texas";
  const fallbackRows = validCandidates(await commonsSearch(`${base} ${location}`, 50), park, usedSourceTitles);
  return fallbackRows[0]?.page || null;
}

function creditFor(page) {
  const meta = page.imageinfo?.[0]?.extmetadata || {};
  const artist = cleanHtml(meta.Artist?.value || meta.Credit?.value || "Wikimedia Commons contributor");
  const license = cleanHtml(meta.LicenseShortName?.value || meta.UsageTerms?.value || "free license");
  return `${artist} · ${license} · Wikimedia Commons`;
}

async function downloadJpeg(url, destinationPath) {
  const response = await pacedFetch(url, { headers: { Accept: "image/jpeg,image/*;q=0.8" } });
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("image/jpeg")) throw new Error(`expected JPEG, got ${contentType}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 20_000) throw new Error(`JPEG suspiciously small (${bytes.length} bytes)`);
  await fs.writeFile(destinationPath, bytes);
}

function aiPrompt(park) {
  const features = [park.summary, park.activities.length ? `Documented activities/features: ${park.activities.join(", ")}.` : ""]
    .filter(Boolean).join(" ");
  return [
    `Create a unique photorealistic editorial landscape image inspired specifically by ${park.name} near ${park.city || "its documented Texas location"}${park.county ? ` in ${park.county} County` : ""}, Texas.`,
    features,
    `Use only landscape, vegetation, water, geology, recreation features, and built features that are plausible from this supplied park context. Do not invent a famous landmark that is not described.`,
    `This is an AI-generated representative editorial image, not a documentary claim that the exact camera view exists.`,
    `Natural Texas light, realistic photography aesthetic, 16:9 landscape composition, no text, no signs, no logos, no watermarks, no recognizable faces.`,
    `Make the composition visibly distinct from other Texas state park hero images.`,
  ].join(" ");
}

async function generateAiJpeg(park, destinationPath) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) return null;
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${CLOUDFLARE_MODEL}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: aiPrompt(park).slice(0, 2048),
      steps: 4,
    }),
  });
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Cloudflare Workers AI ${response.status}: ${body.slice(0, 220)}`);
  }

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
  if (bytes.length < 20_000) throw new Error(`AI image suspiciously small (${bytes.length} bytes)`);

  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    await fs.writeFile(destinationPath, bytes);
    return true;
  }

  const temp = `${destinationPath}.generated`;
  await fs.writeFile(temp, bytes);
  try {
    await execFileAsync("convert", [temp, "-auto-orient", "-strip", "-resize", "1600x1600>", "-quality", "88", destinationPath]);
  } finally {
    await fs.rm(temp, { force: true });
  }
  return true;
}

function tsString(value) {
  return JSON.stringify(String(value || ""));
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const parks = await loadParks();
  if (parks.length !== 99) throw new Error(`State Parks catalog integrity check failed: expected 99 listings, found ${parks.length}.`);

  const heroCounts = new Map();
  for (const park of parks) if (isJpeg(park.existingHero)) heroCounts.set(park.existingHero, (heroCounts.get(park.existingHero) || 0) + 1);

  const usedSourceTitles = new Set();
  const mapRows = [];
  const report = {
    generatedAt: new Date().toISOString(), totalParks: parks.length,
    retainedUniqueExisting: [], downloaded: [], aiGenerated: [], unresolved: [], rejectedDuplicateExisting: [],
    aiAvailable: imageAiConfigured(),
  };

  for (let index = 0; index < parks.length; index += 1) {
    const park = parks[index];
    const existingUnique = isJpeg(park.existingHero) && heroCounts.get(park.existingHero) === 1;
    if (existingUnique) {
      report.retainedUniqueExisting.push(park.slug);
      console.log(`[${index + 1}/${parks.length}] ${park.name} — retained existing JPEG`);
      continue;
    }
    if (isJpeg(park.existingHero) && heroCounts.get(park.existingHero) > 1) report.rejectedDuplicateExisting.push(park.slug);

    console.log(`[${index + 1}/${parks.length}] ${park.name} — resolving exact park JPEG`);
    let resolved = false;
    try {
      const page = await chooseCommonsImage(park, usedSourceTitles);
      if (page) {
        const info = page.imageinfo?.[0];
        const src = info.thumburl || info.url;
        const relative = `/images/state-parks/${park.slug}.jpg`;
        await downloadJpeg(src, path.join(OUT_DIR, `${park.slug}.jpg`));
        usedSourceTitles.add(page.title);
        mapRows.push({ slug: park.slug, src: relative, alt: `${park.name} in Texas`, width: Number(info.thumbwidth || info.width || 1600), height: Number(info.thumbheight || info.height || 900), credit: creditFor(page) });
        report.downloaded.push({ slug: park.slug, name: park.name, sourceTitle: page.title });
        console.log(`  free photo: ${page.title}`);
        resolved = true;
      }
    } catch (error) {
      console.warn(`  free-photo lookup failed: ${error?.message || error}`);
    }

    if (!resolved && imageAiConfigured()) {
      try {
        const relative = `/images/state-parks/${park.slug}.jpg`;
        await generateAiJpeg(park, path.join(OUT_DIR, `${park.slug}.jpg`));
        mapRows.push({ slug: park.slug, src: relative, alt: `AI-generated editorial landscape for ${park.name}`, width: 1600, height: 900, credit: "AI-generated editorial image · Texas Defined" });
        report.aiGenerated.push({ slug: park.slug, name: park.name });
        console.log("  AI-generated park-specific JPEG");
        resolved = true;
      } catch (error) {
        console.warn(`  AI generation failed: ${error?.message || error}`);
      }
    }

    if (!resolved) report.unresolved.push({ slug: park.slug, name: park.name, reason: imageAiConfigured() ? "no exact free photo and AI generation failed" : "no exact free photo; Cloudflare image generation unavailable" });
    await sleep(300);
  }

  const lines = [
    'import type { ImageRef } from "./types";', "",
    "/** Generated by scripts/data/sync-state-park-hero-assets.mjs. Do not hand-edit. */",
    "export const stateParkHeroMap: Record<string, ImageRef> = {",
    ...mapRows.map((row) => `  ${tsString(row.slug)}: { src: ${tsString(row.src)}, alt: ${tsString(row.alt)}, width: ${row.width || 1600}, height: ${row.height || 900}, credit: ${tsString(row.credit)} },`),
    "};", "",
  ];
  await fs.writeFile(MAP_PATH, lines.join("\n"), "utf8");
  await fs.writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  console.log(JSON.stringify({ totalParks: report.totalParks, retainedUniqueExisting: report.retainedUniqueExisting.length, downloaded: report.downloaded.length, aiGenerated: report.aiGenerated.length, unresolved: report.unresolved.length, rejectedDuplicateExisting: report.rejectedDuplicateExisting.length, aiAvailable: report.aiAvailable }, null, 2));
  if (report.unresolved.length) process.exitCode = 3;
}

await main();
