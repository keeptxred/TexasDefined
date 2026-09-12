import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public/images/sports-venues");
const MAP_PATH = path.join(ROOT, "src/data/sports-venue-images-additions-wave7.ts");
const REPORT_PATH = path.join(ROOT, "scripts/data/sports-venue-hero-wave7-report.json");
const USER_AGENT = "TexasDefined/1.0 (sports-venue-photo sync; https://texasdefined.com)";
const LICENSE_OK = ["public domain", "cc0", "cc by", "cc-by", "cc by-sa", "cc-by-sa"];
const CLOUDFLARE_MODEL = "@cf/black-forest-labs/flux-1-schnell";
const API_GAP_MS = 750;
let lastApiRequestAt = 0;

const venues = [
  { slug: "amarillo-national-center", name: "Amarillo National Center", city: "Amarillo", type: "indoor equestrian and event arena" },
  { slug: "childrens-health-stadium-prosper", name: "Children's Health Stadium", city: "Prosper", type: "high school football and soccer stadium" },
  { slug: "colonial-country-club", name: "Colonial Country Club", city: "Fort Worth", type: "historic championship golf course" },
  { slug: "cy-fair-fcu-stadium", name: "Cy-Fair FCU Stadium", city: "Cypress", type: "high school football stadium" },
  { slug: "expo-center-taylor-county", name: "Taylor County Expo Center", city: "Abilene", type: "multi-purpose arena and expo complex" },
  { slug: "hodgetown", name: "Hodgetown", city: "Amarillo", type: "downtown minor league baseball stadium" },
  { slug: "houston-motorsports-park", name: "Houston Motorsports Park", city: "Houston", type: "short-track motorsports facility" },
  { slug: "legacy-stadium-katy", name: "Legacy Stadium", city: "Katy", type: "high school football stadium" },
  { slug: "memorial-park-golf-course", name: "Memorial Park Golf Course", city: "Houston", type: "municipal championship golf course" },
  { slug: "national-shooting-complex", name: "National Shooting Complex", city: "San Antonio", type: "outdoor shooting sports complex" },
  { slug: "pga-frisco-fields-ranch", name: "PGA Frisco / Fields Ranch", city: "Frisco", type: "championship golf resort and tournament course" },
  { slug: "retama-park", name: "Retama Park", city: "Selma", type: "horse racing track" },
  { slug: "round-rock-sports-center", name: "Round Rock Sports Center", city: "Round Rock", type: "indoor basketball and volleyball sports complex" },
  { slug: "texas-motorplex", name: "Texas Motorplex", city: "Ennis", type: "NHRA drag racing facility" },
  { slug: "tpc-san-antonio", name: "TPC San Antonio", city: "San Antonio", type: "championship golf course" },
  { slug: "waco-surf", name: "Waco Surf", city: "Waco", type: "surf lagoon and action sports facility" },
];

function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
function cleanHtml(value) {
  return String(value || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&#39;|&apos;/gi, "'").replace(/&quot;/gi, '"').replace(/\s+/g, " ").trim();
}
function normalize(value) { return String(value || "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim(); }
function imageAiConfigured() { return Boolean(process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN); }

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
      const retryAfter = Number(response.headers.get("retry-after") || 0);
      await sleep(retryAfter > 0 ? retryAfter * 1000 : Math.min(10_000, 1200 * (2 ** attempt)));
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
      if (attempt < attempts - 1) await sleep(Math.min(10_000, 1200 * (2 ** attempt)));
    }
  }
  throw lastError || new Error("request failed");
}

async function commonsSearch(query, limit = 50) {
  const params = new URLSearchParams({
    action: "query", generator: "search", gsrsearch: query, gsrnamespace: "6", gsrlimit: String(limit),
    prop: "imageinfo", iiprop: "url|mime|size|extmetadata", iiurlwidth: "1600", format: "json", origin: "*",
  });
  const response = await pacedFetch(`https://commons.wikimedia.org/w/api.php?${params}`);
  const payload = await response.json();
  return Object.values(payload.query?.pages || {});
}

function licenseAllowed(meta) {
  const text = cleanHtml(meta?.LicenseShortName?.value || meta?.UsageTerms?.value).toLowerCase();
  return LICENSE_OK.some((allowed) => text.includes(allowed));
}

function evidence(page) {
  const info = page.imageinfo?.[0];
  const meta = info?.extmetadata || {};
  return normalize([page.title, meta.ObjectName?.value, meta.ImageDescription?.value, meta.Categories?.value].map(cleanHtml).join(" "));
}

function scoreCandidate(page, venue) {
  const info = page.imageinfo?.[0];
  if (!info || info.mime !== "image/jpeg" || !licenseAllowed(info.extmetadata)) return -1;
  const text = evidence(page);
  const exactName = normalize(venue.name.replace(" / Fields Ranch", ""));
  const compact = exactName.replace(/ country club| stadium| center| complex| park| golf course| motorplex| motorsports park| surf/g, "").trim();
  let score = 0;
  if (text.includes(exactName)) score += 100;
  if (compact && text.includes(compact)) score += 35;
  if (text.includes(normalize(venue.city))) score += 15;
  if (text.includes("texas")) score += 5;
  const width = Number(info.thumbwidth || info.width || 0);
  if (width >= 1200) score += 5;
  return score;
}

async function chooseCommonsImage(venue, usedTitles) {
  const queries = [`intitle:\"${venue.name}\"`, `\"${venue.name}\" ${venue.city} Texas`, `${venue.name} ${venue.city} Texas`];
  for (const query of queries) {
    const candidates = (await commonsSearch(query))
      .filter((page) => page?.title && !usedTitles.has(page.title))
      .map((page) => ({ page, score: scoreCandidate(page, venue) }))
      .filter((row) => row.score >= 100)
      .sort((a, b) => b.score - a.score);
    if (candidates[0]) return candidates[0].page;
  }
  return null;
}

async function downloadJpeg(url, destinationPath) {
  const response = await pacedFetch(url, { headers: { Accept: "image/jpeg,image/*;q=0.8" } });
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("image/jpeg")) throw new Error(`expected JPEG, got ${contentType}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 20_000) throw new Error(`JPEG suspiciously small (${bytes.length} bytes)`);
  await fs.writeFile(destinationPath, bytes);
}

function creditMeta(page) {
  const info = page.imageinfo?.[0] || {};
  const meta = info.extmetadata || {};
  return {
    sourcePage: info.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title)}`,
    sourceName: "Wikimedia Commons",
    author: cleanHtml(meta.Artist?.value || meta.Credit?.value || "Wikimedia Commons contributor"),
    licenseName: cleanHtml(meta.LicenseShortName?.value || meta.UsageTerms?.value || "free license"),
    licenseUrl: cleanHtml(meta.LicenseUrl?.value || "https://commons.wikimedia.org/"),
    width: Number(info.thumbwidth || info.width || 1600),
    height: Number(info.thumbheight || info.height || 900),
  };
}

function aiPrompt(venue) {
  return [
    `Create a unique photorealistic editorial landscape image inspired specifically by ${venue.name} in ${venue.city}, Texas, a ${venue.type}.`,
    `Represent the real venue category and regional setting plausibly without inventing branded signage, sponsor marks, team logos, or copyrighted artwork.`,
    `This is an AI-generated representative editorial image, not a documentary claim that the exact camera view exists.`,
    `Natural Texas light, realistic photography aesthetic, 16:9 landscape composition, no text, no signs, no logos, no watermarks, no recognizable faces.`,
  ].join(" ");
}

async function generateAiJpeg(venue, destinationPath) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) return false;
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${CLOUDFLARE_MODEL}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: aiPrompt(venue).slice(0, 2048), steps: 4 }),
  });
  if (!response.ok) throw new Error(`Cloudflare Workers AI ${response.status}: ${(await response.text()).slice(0, 220)}`);
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
  const temp = `${destinationPath}.generated`;
  await fs.writeFile(temp, bytes);
  try {
    await execFileAsync("convert", [temp, "-auto-orient", "-strip", "-resize", "1600x1600>", "-quality", "88", destinationPath]);
  } finally {
    await fs.rm(temp, { force: true });
  }
  return true;
}

function ts(value) { return JSON.stringify(String(value ?? "")); }

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const usedTitles = new Set();
  const rows = [];
  const report = { generatedAt: new Date().toISOString(), total: venues.length, freePhotos: [], aiGenerated: [], unresolved: [], aiAvailable: imageAiConfigured() };

  for (let index = 0; index < venues.length; index += 1) {
    const venue = venues[index];
    const destinationPath = path.join(OUT_DIR, `${venue.slug}.jpg`);
    console.log(`[${index + 1}/${venues.length}] ${venue.name}`);
    let resolved = false;
    try {
      const page = await chooseCommonsImage(venue, usedTitles);
      if (page) {
        const info = page.imageinfo?.[0];
        await downloadJpeg(info.thumburl || info.url, destinationPath);
        usedTitles.add(page.title);
        rows.push({ slug: venue.slug, alt: `${venue.name} in ${venue.city}, Texas`, imageUrl: `/images/sports-venues/${venue.slug}.jpg`, ...creditMeta(page) });
        report.freePhotos.push({ slug: venue.slug, sourceTitle: page.title });
        console.log(`  free photo: ${page.title}`);
        resolved = true;
      }
    } catch (error) {
      console.warn(`  free-photo lookup failed: ${error?.message || error}`);
    }

    if (!resolved && imageAiConfigured()) {
      try {
        await generateAiJpeg(venue, destinationPath);
        rows.push({
          slug: venue.slug,
          alt: `AI-generated photorealistic editorial depiction of ${venue.name} in ${venue.city}, Texas`,
          imageUrl: `/images/sports-venues/${venue.slug}.jpg`,
          sourcePage: `https://texasdefined.com/sports-venue/${venue.slug}`,
          sourceName: "Texas Defined generated media",
          author: "Cloudflare Workers AI / FLUX.1 schnell",
          licenseName: "AI-generated image supplied for TexasDefined use",
          licenseUrl: `https://texasdefined.com/sports-venue/${venue.slug}`,
          width: 1600,
          height: 900,
        });
        report.aiGenerated.push({ slug: venue.slug });
        console.log("  AI-generated venue-specific JPEG");
        resolved = true;
      } catch (error) {
        console.warn(`  AI generation failed: ${error?.message || error}`);
      }
    }

    if (!resolved) report.unresolved.push({ slug: venue.slug, name: venue.name });
    await sleep(250);
  }

  const lines = [
    "import type { SportsVenuePhoto } from './sports-venue-images';",
    "",
    "/** Generated by scripts/data/sync-sports-venue-hero-assets-wave7.mjs. Do not hand-edit. */",
    "export const sportsVenuePhotoAdditionsWave7: Record<string, SportsVenuePhoto> = {",
    ...rows.map((row) => [
      `  ${ts(row.slug)}: {`,
      `    slug: ${ts(row.slug)},`,
      `    alt: ${ts(row.alt)},`,
      `    imageUrl: ${ts(row.imageUrl)},`,
      `    sourcePage: ${ts(row.sourcePage)},`,
      `    sourceName: ${ts(row.sourceName)},`,
      `    author: ${ts(row.author)},`,
      `    licenseName: ${ts(row.licenseName)},`,
      `    licenseUrl: ${ts(row.licenseUrl)},`,
      `    width: ${Number(row.width || 1600)},`,
      `    height: ${Number(row.height || 900)},`,
      "  },",
    ].join("\n")),
    "};",
    "",
    "export function getSportsVenuePhotoAdditionWave7(slug: string) {",
    "  return sportsVenuePhotoAdditionsWave7[slug];",
    "}",
    "",
  ];
  await fs.writeFile(MAP_PATH, lines.join("\n"), "utf8");
  await fs.writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({ freePhotos: report.freePhotos.length, aiGenerated: report.aiGenerated.length, unresolved: report.unresolved.length, aiAvailable: report.aiAvailable }, null, 2));
  if (rows.length !== venues.length || report.unresolved.length) process.exitCode = 3;
}

await main();
