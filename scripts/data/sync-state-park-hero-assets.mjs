import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const ENV_PATH = path.join(ROOT, ".env");
const LEGACY_PATH = path.join(ROOT, "src/data/fixtures/legacy-explore.ts");
const OUT_DIR = path.join(ROOT, "public/images/state-parks");
const MAP_PATH = path.join(ROOT, "src/data/state-park-hero-map.ts");
const REPORT_PATH = path.join(ROOT, "scripts/data/state-park-hero-report.json");
const PLACEHOLDER_MARKERS = ["texasdefined-destination-placeholder", "texasdefined-placeholder"];
const GENERIC_WORDS = new Set([
  "state", "park", "parks", "natural", "area", "historic", "site", "trailway", "environmental",
  "learning", "center", "the", "and", "unit", "texas", "recreation", "management",
]);
const LICENSE_OK = ["public domain", "cc0", "cc by", "cc-by", "cc by-sa", "cc-by-sa"];

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
  return normalize(name).split(" ").filter((token) => token.length > 2 && !GENERIC_WORDS.has(token));
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
  return Boolean(value) && !PLACEHOLDER_MARKERS.some((marker) => value.includes(marker)) && /\.jpe?g(?:$|\?|#)/i.test(value);
}

function isStateParkType(type) {
  const normalized = String(type || "").toLowerCase().replace(/[\s-]+/g, "_");
  return ["state_park", "park", "natural_area", "campground", "trail"].some((needle) => normalized === needle || normalized.includes(needle));
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

async function loadParks() {
  const envText = await fs.readFile(ENV_PATH, "utf8").catch(() => "");
  const env = parseEnv(envText);
  const supabaseUrl = String(env.VITE_TEXASDEFINED_SUPABASE_URL || env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
  const supabaseKey = String(env.VITE_TEXASDEFINED_SUPABASE_ANON_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY || "");
  const rows = [];

  if (supabaseUrl && supabaseKey) {
    const params = new URLSearchParams({
      select: "name,slug,entity_type,city,county,region,latitude,longitude,hero_image_url,hero_image_alt",
      limit: "5000",
    });
    const response = await fetch(`${supabaseUrl}/rest/v1/explore_public_entities?${params}`, {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
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
    const [slug, name, type, town, county, , lat, lng] = line.split("|");
    if (!isStateParkType(type)) continue;
    rows.push({
      slug,
      name,
      city: town,
      county,
      lat: Number(lat || 0),
      lng: Number(lng || 0),
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

function specificityScore(page, park) {
  const evidence = normalize(candidateEvidence(page));
  const title = normalize(page.title || "");
  const tokens = distinctiveTokens(park.name);
  if (!tokens.length) return -1;

  const matched = tokens.filter((token) => evidence.includes(token));
  const required = tokens.length <= 2 ? tokens.length : Math.max(2, Math.ceil(tokens.length * 0.6));
  if (matched.length < required) return -1;

  let score = matched.length * 10;
  const compactName = normalize(park.name.replace(/state park|state natural area|state historic site/gi, ""));
  if (compactName && evidence.includes(compactName)) score += 45;
  if (compactName && title.includes(compactName)) score += 35;
  if (/landscape|view|overlook|trail|lake|river|falls|canyon|mountain|pool|spring|beach|camp|entrance|ccc|historic|pavilion|day use/i.test(candidateEvidence(page))) score += 12;
  if (/bird|deer|insect|flower|snake|spider|portrait/i.test(page.title || "")) score -= 8;
  const info = page.imageinfo?.[0];
  const width = Number(info?.thumbwidth || info?.width || 0);
  if (width >= 1400) score += 6;
  else if (width >= 1000) score += 3;
  return score;
}

async function commonsSearch(query) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: query,
    gsrnamespace: "6",
    gsrlimit: "30",
    prop: "imageinfo",
    iiprop: "url|mime|size|extmetadata",
    iiurlwidth: "1600",
    format: "json",
    origin: "*",
  });
  const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`);
  if (!response.ok) return [];
  const payload = await response.json();
  return Object.values(payload.query?.pages || {});
}

async function commonsCategory(name) {
  const variants = [name, name.replace(/ & Historic Site$/i, ""), name.replace(/ State Natural Area$/i, " State Natural Area")];
  const pages = [];
  for (const variant of variants) {
    const params = new URLSearchParams({
      action: "query",
      generator: "categorymembers",
      gcmtitle: `Category:${variant}`,
      gcmtype: "file",
      gcmlimit: "50",
      prop: "imageinfo",
      iiprop: "url|mime|size|extmetadata",
      iiurlwidth: "1600",
      format: "json",
      origin: "*",
    });
    const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`);
    if (!response.ok) continue;
    const payload = await response.json();
    pages.push(...Object.values(payload.query?.pages || {}));
  }
  return pages;
}

async function wikipediaLeadImage(park) {
  const titleVariants = [
    park.name,
    park.name.replace(/ & Trailway$/i, ""),
    park.name.replace(/ & Historic Site$/i, ""),
    park.name.replace(/ State Park & Environmental Learning Center$/i, " State Park"),
  ];
  for (const title of titleVariants) {
    const params = new URLSearchParams({
      action: "query",
      prop: "pageimages",
      piprop: "name",
      redirects: "1",
      titles: title,
      format: "json",
      origin: "*",
    });
    const response = await fetch(`https://en.wikipedia.org/w/api.php?${params}`);
    if (!response.ok) continue;
    const payload = await response.json();
    const page = Object.values(payload.query?.pages || {})[0];
    const file = page?.pageimage;
    if (!file) continue;
    const commonsParams = new URLSearchParams({
      action: "query",
      titles: `File:${file}`,
      prop: "imageinfo",
      iiprop: "url|mime|size|extmetadata",
      iiurlwidth: "1600",
      format: "json",
      origin: "*",
    });
    const commonsResponse = await fetch(`https://commons.wikimedia.org/w/api.php?${commonsParams}`);
    if (!commonsResponse.ok) continue;
    const commonsPayload = await commonsResponse.json();
    const commonsPage = Object.values(commonsPayload.query?.pages || {})[0];
    if (commonsPage) return [commonsPage];
  }
  return [];
}

async function chooseCommonsImage(park, usedSourceTitles) {
  const base = park.name
    .replace(/ & Trailway$/i, "")
    .replace(/ & Historic Site$/i, "")
    .replace(/ State Park & Environmental Learning Center$/i, " State Park");
  const queries = [
    `"${park.name}" Texas`,
    `"${base}" Texas`,
    `${base} ${park.city || park.county || "Texas"}`,
  ];
  const batches = [await wikipediaLeadImage(park), await commonsCategory(park.name)];
  for (const query of queries) batches.push(await commonsSearch(query));

  const candidates = new Map();
  for (const page of batches.flat()) {
    if (!page?.title || usedSourceTitles.has(page.title)) continue;
    const info = page.imageinfo?.[0];
    if (!info || info.mime !== "image/jpeg" || !licenseAllowed(info.extmetadata)) continue;
    const src = info.thumburl || info.url;
    if (!src || !isJpeg(src)) continue;
    const score = specificityScore(page, park);
    if (score < 0) continue;
    const current = candidates.get(page.title);
    if (!current || score > current.score) candidates.set(page.title, { page, score });
  }
  return [...candidates.values()].sort((a, b) => b.score - a.score)[0]?.page || null;
}

function creditFor(page) {
  const meta = page.imageinfo?.[0]?.extmetadata || {};
  const artist = cleanHtml(meta.Artist?.value || meta.Credit?.value || "Wikimedia Commons contributor");
  const license = cleanHtml(meta.LicenseShortName?.value || meta.UsageTerms?.value || "free license");
  return `${artist} · ${license} · Wikimedia Commons`;
}

async function downloadJpeg(url, destinationPath) {
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) throw new Error(`image download ${response.status}`);
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("image/jpeg")) throw new Error(`expected JPEG, got ${contentType}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 20_000) throw new Error(`JPEG suspiciously small (${bytes.length} bytes)`);
  await fs.writeFile(destinationPath, bytes);
}

function tsString(value) {
  return JSON.stringify(String(value || ""));
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const parks = await loadParks();
  const heroCounts = new Map();
  for (const park of parks) if (isJpeg(park.existingHero)) heroCounts.set(park.existingHero, (heroCounts.get(park.existingHero) || 0) + 1);

  const usedSourceTitles = new Set();
  const mapRows = [];
  const report = {
    generatedAt: new Date().toISOString(),
    totalParks: parks.length,
    retainedUniqueExisting: [],
    downloaded: [],
    unresolved: [],
    rejectedDuplicateExisting: [],
  };

  for (let index = 0; index < parks.length; index += 1) {
    const park = parks[index];
    const existingUnique = isJpeg(park.existingHero) && heroCounts.get(park.existingHero) === 1;
    if (existingUnique) {
      report.retainedUniqueExisting.push(park.slug);
      continue;
    }
    if (isJpeg(park.existingHero) && heroCounts.get(park.existingHero) > 1) report.rejectedDuplicateExisting.push(park.slug);

    console.log(`[${index + 1}/${parks.length}] ${park.name}`);
    try {
      const page = await chooseCommonsImage(park, usedSourceTitles);
      if (!page) {
        report.unresolved.push({ slug: park.slug, name: park.name, reason: "no exact freely licensed JPEG found" });
        continue;
      }
      const info = page.imageinfo?.[0];
      const src = info.thumburl || info.url;
      const relative = `/images/state-parks/${park.slug}.jpg`;
      await downloadJpeg(src, path.join(OUT_DIR, `${park.slug}.jpg`));
      usedSourceTitles.add(page.title);
      mapRows.push({
        slug: park.slug,
        src: relative,
        alt: `${park.name} in Texas`,
        width: Number(info.thumbwidth || info.width || 1600),
        height: Number(info.thumbheight || info.height || 900),
        credit: creditFor(page),
        sourceTitle: page.title,
      });
      report.downloaded.push({ slug: park.slug, name: park.name, sourceTitle: page.title });
    } catch (error) {
      report.unresolved.push({ slug: park.slug, name: park.name, reason: String(error?.message || error) });
    }
    await new Promise((resolve) => setTimeout(resolve, 80));
  }

  const lines = [
    'import type { ImageRef } from "./types";',
    "",
    "/** Generated by scripts/data/sync-state-park-hero-assets.mjs. Do not hand-edit. */",
    "export const stateParkHeroMap: Record<string, ImageRef> = {",
    ...mapRows.map((row) => `  ${tsString(row.slug)}: { src: ${tsString(row.src)}, alt: ${tsString(row.alt)}, width: ${row.width || 1600}, height: ${row.height || 900}, credit: ${tsString(row.credit)} },`),
    "};",
    "",
  ];
  await fs.writeFile(MAP_PATH, lines.join("\n"), "utf8");
  await fs.writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  console.log(JSON.stringify({
    totalParks: report.totalParks,
    retainedUniqueExisting: report.retainedUniqueExisting.length,
    downloaded: report.downloaded.length,
    unresolved: report.unresolved.length,
    rejectedDuplicateExisting: report.rejectedDuplicateExisting.length,
  }, null, 2));

  if (report.totalParks < 80) {
    console.error(`Expected a near-complete Texas state park catalog; found only ${report.totalParks}.`);
    process.exitCode = 2;
  }
}

await main();
