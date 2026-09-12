import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public/images/rv-parks");
const IMAGES_PATH = path.join(ROOT, "src/data/rv-parks/images.server.ts");
const REGISTRY_PATH = path.join(ROOT, "src/data/rv-parks/registry.server.ts");
const AUDIT_PATH = path.join(ROOT, "scripts/data/audit-rv-inventory-classification.mjs");
const STATE_MAP_PATH = path.join(ROOT, "src/data/state-park-hero-map.ts");
const STATE_REPORT_PATH = path.join(ROOT, "scripts/data/state-park-hero-report.json");
const REPORT_PATH = path.join(ROOT, "scripts/data/rv-park-hero-report.json");
const SEED_FILES = [
  ["hill-country", "src/data/rv-parks/hill-country.ts"],
  ["gulf-coast", "src/data/rv-parks/gulf-coast.ts"],
  ["piney-woods-east-texas", "src/data/rv-parks/piney-woods-east-texas.ts"],
  ["panhandle-north-texas", "src/data/rv-parks/panhandle-north-texas.ts"],
  ["big-bend-west-texas", "src/data/rv-parks/big-bend-west-texas.ts"],
];

const REGION_LABELS = {
  "hill-country": "Texas Hill Country",
  "gulf-coast": "Texas Gulf Coast",
  "piney-woods-east-texas": "Piney Woods and East Texas",
  "panhandle-north-texas": "Panhandle Plains and North Texas",
  "big-bend-west-texas": "Big Bend and West Texas",
};

const USER_AGENT = "TexasDefined/1.0 (RV image reconciliation; https://texasdefined.com)";
const CLOUDFLARE_MODEL = "@cf/black-forest-labs/flux-1-schnell";
const API_GAP_MS = 450;
const VERIFIED_AT = new Date().toISOString().slice(0, 10);
const GENERIC_WORDS = new Set([
  "rv", "park", "parks", "campground", "campgrounds", "camp", "camping", "resort", "resorts", "area", "loop", "loops", "site", "sites",
  "state", "county", "city", "municipal", "lake", "the", "and", "at", "of", "texas", "tx", "marina", "ranch",
]);
let lastApiRequestAt = 0;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return normalize(value).replace(/\s+/g, "-");
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

function decodeQuoted(value) {
  return JSON.parse(`"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`);
}

function tsString(value) {
  return JSON.stringify(String(value ?? ""));
}

function baseIdentityName(name) {
  return String(name || "")
    .replace(/\s+(?:RV|Recreational Vehicle)\s+(?:Area|Loop|Loops|Sites?|Campground|Park|Resort).*$/i, "")
    .replace(/\s+(?:RV\s*)?(?:Area|Loop|Loops|Sites?)$/i, "")
    .trim();
}

function parseSeeds(groupId, source) {
  const records = [];
  const row = /\[\s*"((?:\\.|[^"\\])*)"\s*,\s*"((?:\\.|[^"\\])*)"\s*,\s*"((?:\\.|[^"\\])*)"\s*,\s*"([a-z0-9][a-z0-9-]*)"(?:\s*,\s*"([a-z0-9-]+)")?\s*\]/g;
  for (const match of source.matchAll(row)) {
    records.push({
      groupId,
      name: decodeQuoted(match[1]),
      town: decodeQuoted(match[2]),
      county: decodeQuoted(match[3]),
      slug: match[4],
      regionOverride: match[5] ?? null,
    });
  }
  return records;
}

async function loadSeeds() {
  const groups = [];
  for (const [groupId, relativePath] of SEED_FILES) {
    groups.push(...parseSeeds(groupId, await fs.readFile(path.join(ROOT, relativePath), "utf8")));
  }
  return groups;
}

function parseExistingImageSlugs(source) {
  const body = source.match(/RV_PARK_LICENSED_IMAGES:[\s\S]*?=\s*\{([\s\S]*?)\n\};\n\nexport function rvParkLicensedImage/)?.[1] || "";
  return new Set([...body.matchAll(/^\s*["']([a-z0-9][a-z0-9-]*)["']\s*:\s*\{/gm)].map((match) => match[1]));
}

function parseStateParkMap(source) {
  const map = new Map();
  const row = /^\s*"([^"]+)":\s*\{\s*src:\s*"([^"]+)",\s*alt:\s*"([^"]*)",\s*width:\s*(\d+),\s*height:\s*(\d+),\s*credit:\s*"([^"]*)"\s*\},?$/gm;
  for (const match of source.matchAll(row)) {
    map.set(match[1], {
      slug: match[1],
      src: match[2],
      alt: match[3],
      width: Number(match[4]),
      height: Number(match[5]),
      credit: match[6],
    });
  }
  return map;
}

function stateParkKey(record) {
  const match = record.name.match(/^(.+?\b(?:State Park|State Natural Area|National Park|National Recreation Area))\b/i);
  return match ? slugify(match[1]) : null;
}

function licenseUrlForName(name) {
  const value = normalize(name);
  if (value.includes("cc by sa 4 0")) return "https://creativecommons.org/licenses/by-sa/4.0/";
  if (value.includes("cc by sa 3 0")) return "https://creativecommons.org/licenses/by-sa/3.0/";
  if (value.includes("cc by sa 2 0")) return "https://creativecommons.org/licenses/by-sa/2.0/";
  if (value.includes("cc by 4 0")) return "https://creativecommons.org/licenses/by/4.0/";
  if (value.includes("cc by 3 0")) return "https://creativecommons.org/licenses/by/3.0/";
  if (value.includes("cc by 2 0")) return "https://creativecommons.org/licenses/by/2.0/";
  if (value.includes("cc0")) return "https://creativecommons.org/publicdomain/zero/1.0/";
  if (value.includes("public domain")) return "https://creativecommons.org/publicdomain/mark/1.0/";
  return "https://creativecommons.org/";
}

function stateParkReuse(record, stateMap, stateReport) {
  const key = stateParkKey(record);
  if (!key) return null;
  const hero = stateMap.get(key);
  if (!hero) return null;
  const parts = hero.credit.split(" · ").map((item) => item.trim()).filter(Boolean);
  const isAi = /AI-generated/i.test(hero.credit);
  if (isAi) {
    return {
      kind: "generated-representative",
      src: hero.src,
      alt: `AI-generated representative editorial image for ${record.name} near ${record.town}, Texas`,
      width: hero.width,
      height: hero.height,
      creator: "Texas Defined",
      license: "AI-generated representative editorial image",
      licenseUrl: "https://texasdefined.com/",
      sourceUrl: "https://texasdefined.com/",
      subjectScope: "representative",
      actualLocation: false,
      sourceKind: "generated-representative",
      reusedStateParkSlug: key,
    };
  }

  const downloaded = stateReport?.downloaded?.find((item) => item.slug === key);
  if (!downloaded?.sourceTitle || !/Wikimedia Commons/i.test(hero.credit)) return null;
  const creator = parts[0] || "Wikimedia Commons contributor";
  const license = parts[1] || "free license";
  return {
    kind: "licensed-location",
    src: hero.src,
    alt: `${record.name} at ${baseIdentityName(record.name)} in Texas`,
    width: hero.width,
    height: hero.height,
    creator,
    license,
    licenseUrl: licenseUrlForName(license),
    sourceUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(downloaded.sourceTitle).replace(/%3A/i, ":")}`,
    subjectScope: "park-property",
    actualLocation: true,
    sourceKind: "licensed-location",
    reusedStateParkSlug: key,
  };
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
      await sleep(retryAfter > 0 ? retryAfter * 1000 : Math.min(10_000, 1200 * (2 ** attempt)));
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
      if (attempt < attempts - 1) await sleep(Math.min(10_000, 1200 * (2 ** attempt)));
    }
  }
  throw lastError || new Error("request failed");
}

async function apiJson(base, params) {
  const response = await pacedFetch(`${base}?${params.toString()}`);
  return response.json();
}

function licenseAllowed(metadata) {
  const text = normalize(cleanHtml(metadata?.LicenseShortName?.value || metadata?.UsageTerms?.value));
  if (!text) return false;
  if (/\b(?:nc|noncommercial|non commercial|nd|no derivatives|non derivative)\b/.test(text)) return false;
  return [
    /^public domain(?: mark)?(?: \d+ \d+)?$/,
    /^cc0(?: \d+ \d+)?$/,
    /^cc by(?: \d+ \d+)?$/,
    /^cc by sa(?: \d+ \d+)?$/,
  ].some((pattern) => pattern.test(text));
}

function distinctiveTokens(record) {
  return normalize(baseIdentityName(record.name))
    .split(" ")
    .filter((token) => token.length > 2 && !GENERIC_WORDS.has(token));
}

function candidateEvidence(page) {
  const info = page.imageinfo?.[0];
  const meta = info?.extmetadata || {};
  return [page.title, meta.ObjectName?.value, meta.ImageDescription?.value, meta.Categories?.value]
    .map(cleanHtml)
    .join(" ");
}

function specificityScore(page, record) {
  const evidenceRaw = candidateEvidence(page);
  const evidence = normalize(evidenceRaw);
  const title = normalize(page.title || "");
  const identity = normalize(baseIdentityName(record.name));
  const tokens = distinctiveTokens(record);
  if (!tokens.length && !identity) return -1;

  const matched = tokens.filter((token) => evidence.includes(token));
  const required = tokens.length <= 2 ? Math.min(1, tokens.length) : Math.max(2, Math.ceil(tokens.length * 0.6));
  if (required > 0 && matched.length < required && !evidence.includes(identity)) return -1;

  let score = matched.length * 14;
  if (identity && evidence.includes(identity)) score += 70;
  if (identity && title.includes(identity)) score += 50;
  if (record.town && evidence.includes(normalize(record.town))) score += 12;
  if (record.county && evidence.includes(normalize(record.county))) score += 8;
  if (/camp|campground|rv|park|marina|lake|river|canyon|forest|beach|entrance|pavilion|day use|trail/i.test(evidenceRaw)) score += 6;
  if (/logo|map|brochure|poster|advertisement|screenshot/i.test(page.title || "")) score -= 40;
  if (/sign/i.test(page.title || "")) score -= 10;
  const info = page.imageinfo?.[0];
  const width = Number(info?.thumbwidth || info?.width || 0);
  if (width >= 1400) score += 6;
  else if (width >= 1000) score += 3;
  return score;
}

function validCandidates(pages, record, usedTitles) {
  const rows = [];
  for (const page of pages) {
    if (!page?.title || usedTitles.has(page.title)) continue;
    const info = page.imageinfo?.[0];
    if (!info || info.mime !== "image/jpeg" || !licenseAllowed(info.extmetadata)) continue;
    const score = specificityScore(page, record);
    if (score < 55) continue;
    rows.push({ page, score });
  }
  return rows.sort((a, b) => b.score - a.score);
}

async function commonsSearch(query, limit = 35) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: query,
    gsrnamespace: "6",
    gsrlimit: String(limit),
    prop: "imageinfo",
    iiprop: "url|mime|size|extmetadata",
    iiurlwidth: "1800",
    format: "json",
    origin: "*",
  });
  const payload = await apiJson("https://commons.wikimedia.org/w/api.php", params);
  return Object.values(payload.query?.pages || {});
}

async function chooseCommonsImage(record, usedTitles) {
  const identity = baseIdentityName(record.name);
  const queries = [
    `intitle:\"${identity}\"`,
    `\"${identity}\" ${record.town} Texas`,
    `${identity} ${record.county} Texas`,
  ];
  for (const query of queries) {
    const rows = validCandidates(await commonsSearch(query), record, usedTitles);
    if (rows[0]) return rows[0].page;
  }
  return null;
}

async function normalizeToJpeg(bytes, destinationPath) {
  const temp = `${destinationPath}.source`;
  await fs.writeFile(temp, bytes);
  try {
    await execFileAsync("convert", [
      temp,
      "-auto-orient",
      "-strip",
      "-resize", "1600x900^",
      "-gravity", "center",
      "-extent", "1600x900",
      "-sampling-factor", "4:2:0",
      "-quality", "82",
      destinationPath,
    ]);
  } finally {
    await fs.rm(temp, { force: true });
  }
}

async function downloadCommonsJpeg(page, destinationPath) {
  const info = page.imageinfo?.[0];
  const url = info?.thumburl || info?.url;
  if (!url) throw new Error("Wikimedia candidate has no image URL");
  const response = await pacedFetch(url, { headers: { Accept: "image/jpeg,image/*;q=0.8" } });
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 20_000) throw new Error(`image suspiciously small (${bytes.length} bytes)`);
  await normalizeToJpeg(bytes, destinationPath);
}

function commonsRecord(page, record, relativeSrc) {
  const info = page.imageinfo?.[0];
  const meta = info?.extmetadata || {};
  const creator = cleanHtml(meta.Artist?.value || meta.Credit?.value || "Wikimedia Commons contributor");
  const license = cleanHtml(meta.LicenseShortName?.value || meta.UsageTerms?.value || "free license");
  const licenseUrl = cleanHtml(meta.LicenseUrl?.value) || licenseUrlForName(license);
  const sourceUrl = `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title).replace(/%3A/i, ":")}`;
  return {
    kind: "licensed-location",
    src: relativeSrc,
    alt: `${baseIdentityName(record.name)} near ${record.town}, Texas`,
    width: 1600,
    height: 900,
    creator,
    license,
    licenseUrl,
    sourceUrl,
    subjectScope: /campground|camping|rv/i.test(candidateEvidence(page)) ? "campground" : "park-property",
    actualLocation: true,
    sourceKind: "licensed-location",
    sourceTitle: page.title,
  };
}

function imageAiConfigured() {
  return Boolean(process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN);
}

function aiPrompt(record) {
  const region = REGION_LABELS[record.groupId] || "Texas";
  return [
    `Create a unique photorealistic 16:9 editorial hero image inspired by the RV camping context of ${record.name} near ${record.town}, ${record.county} County, in ${region}.`,
    `No rights-cleared documentary photograph was found, so this image must be representative rather than pretending to reproduce an exact camera view of the property.`,
    `Show a plausible Texas RV campground setting for the region, with realistic motorhomes or travel trailers, campsites, local vegetation, sky and terrain.`,
    `Do not invent or reproduce branded signage, logos, distinctive buildings, named landmarks, readable text, license plates, watermarks, or recognizable faces.`,
    `Natural Texas light, realistic photography aesthetic, useful negative space for a travel-guide hero, no illustration or fantasy styling.`,
  ].join(" ");
}

async function generateAiJpeg(record, destinationPath) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) return false;
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${CLOUDFLARE_MODEL}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: aiPrompt(record).slice(0, 2048), steps: 4 }),
  });
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Cloudflare Workers AI ${response.status}: ${body.slice(0, 220)}`);
  }
  const contentType = response.headers.get("content-type") || "";
  let bytes;
  if (contentType.includes("application/json")) {
    const payload = await response.json();
    const encoded = payload?.result?.image || payload?.image || (typeof payload?.result === "string" ? payload.result : null);
    if (!encoded) throw new Error("Cloudflare Workers AI returned no image data");
    bytes = Buffer.from(encoded, "base64");
  } else {
    bytes = Buffer.from(await response.arrayBuffer());
  }
  if (bytes.length < 20_000) throw new Error(`AI image suspiciously small (${bytes.length} bytes)`);
  await normalizeToJpeg(bytes, destinationPath);
  return true;
}

function generatedRecord(record, relativeSrc) {
  return {
    kind: "generated-representative",
    src: relativeSrc,
    alt: `AI-generated representative editorial image for ${record.name} near ${record.town}, Texas`,
    width: 1600,
    height: 900,
    creator: "Texas Defined",
    license: "AI-generated representative editorial image",
    licenseUrl: "https://texasdefined.com/",
    sourceUrl: "https://texasdefined.com/",
    subjectScope: "representative",
    actualLocation: false,
    sourceKind: "generated-representative",
  };
}

function renderEntry(slug, image) {
  return [
    `  ${tsString(slug)}: {`,
    `    src: ${tsString(image.src)},`,
    `    sourceUrl: ${tsString(image.sourceUrl)},`,
    `    alt: ${tsString(image.alt)},`,
    `    width: ${Number(image.width) || 1600},`,
    `    height: ${Number(image.height) || 900},`,
    `    creator: ${tsString(image.creator)},`,
    `    license: ${tsString(image.license)},`,
    `    licenseUrl: ${tsString(image.licenseUrl)},`,
    `    verifiedAt: ${tsString(VERIFIED_AT)},`,
    `    actualLocation: ${image.actualLocation ? "true" : "false"},`,
    `    subjectScope: ${tsString(image.subjectScope)},`,
    `    sourceKind: ${tsString(image.sourceKind)},`,
    `  },`,
  ].join("\n");
}

function patchImagesSource(source, entries) {
  let next = source;
  const oldType = "  actualLocation: true;\n  subjectScope: 'campground' | 'park-property';";
  const newType = "  actualLocation: boolean;\n  subjectScope: 'campground' | 'park-property' | 'representative';\n  sourceKind?: 'licensed-location' | 'generated-representative';";
  if (!next.includes(oldType) && !next.includes("sourceKind?: 'licensed-location' | 'generated-representative';")) {
    throw new Error("RV image type marker changed; refusing unsafe patch");
  }
  if (next.includes(oldType)) next = next.replace(oldType, newType);
  if (!entries.length) return next;
  const marker = "\n};\n\nexport function rvParkLicensedImage";
  if (!next.includes(marker)) throw new Error("RV image registry closing marker changed; refusing unsafe patch");
  next = next.replace(marker, `\n${entries.join("\n")}\n};\n\nexport function rvParkLicensedImage`);
  return next;
}

function patchRegistrySource(source) {
  const oldCredit = "    credit: `${licensedImage.creator} · ${licensedImage.license} · Wikimedia Commons · ${licensedImage.sourceUrl}`,";
  const newCredit = "    credit: licensedImage.sourceKind === \"generated-representative\"\n      ? `${licensedImage.creator} · ${licensedImage.license}`\n      : `${licensedImage.creator} · ${licensedImage.license} · Wikimedia Commons · ${licensedImage.sourceUrl}`,";
  if (source.includes(newCredit)) return source;
  if (!source.includes(oldCredit)) throw new Error("RV registry credit marker changed; refusing unsafe patch");
  return source.replace(oldCredit, newCredit);
}

function patchAuditSource(source) {
  const oldFunction = `function imageComplete(block) {\n  return hasAll(block, [\n    'src:',\n    'sourceUrl:',\n    'alt:',\n    'width:',\n    'height:',\n    'creator:',\n    'license:',\n    'licenseUrl:',\n    'verifiedAt',\n    'actualLocation: true',\n    'subjectScope:',\n  ]);\n}`;
  const newFunction = `function imageComplete(block) {\n  const common = hasAll(block, [\n    'src:',\n    'sourceUrl:',\n    'alt:',\n    'width:',\n    'height:',\n    'creator:',\n    'license:',\n    'licenseUrl:',\n    'verifiedAt',\n    'subjectScope:',\n  ]);\n  if (!common) return false;\n  const licensedLocation = block.includes('actualLocation: true');\n  const generatedRepresentative = hasAll(block, [\n    'actualLocation: false',\n    \"subjectScope: 'representative'\",\n    \"sourceKind: 'generated-representative'\",\n  ]);\n  return licensedLocation || generatedRepresentative;\n}`;
  let next = source;
  if (!next.includes(newFunction)) {
    if (!next.includes(oldFunction)) throw new Error("RV audit imageComplete marker changed; refusing unsafe patch");
    next = next.replace(oldFunction, newFunction);
  }
  next = next.replaceAll("rights-cleared exact-location image incomplete", "governed destination image incomplete");
  return next;
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const seeds = await loadSeeds();
  if (seeds.length !== 250) throw new Error(`RV seed integrity check failed: expected 250, found ${seeds.length}`);

  const imagesSource = await fs.readFile(IMAGES_PATH, "utf8");
  const existingSlugs = parseExistingImageSlugs(imagesSource);
  const stateMap = parseStateParkMap(await fs.readFile(STATE_MAP_PATH, "utf8").catch(() => ""));
  const stateReport = JSON.parse(await fs.readFile(STATE_REPORT_PATH, "utf8").catch(() => "{}"));
  const missing = seeds.filter((record) => !existingSlugs.has(record.slug));
  const usedTitles = new Set();
  const resolved = [];
  const report = {
    generatedAt: new Date().toISOString(),
    totalSeeds: seeds.length,
    governedBefore: existingSlugs.size,
    backlogBefore: missing.length,
    reusedStatePark: [],
    commonsLicensed: [],
    aiGenerated: [],
    unresolved: [],
    aiAvailable: imageAiConfigured(),
  };

  for (let index = 0; index < missing.length; index += 1) {
    const record = missing[index];
    console.log(`[${index + 1}/${missing.length}] ${record.name} — resolving governed image`);

    const reused = stateParkReuse(record, stateMap, stateReport);
    if (reused) {
      resolved.push({ record, image: reused });
      report.reusedStatePark.push({ slug: record.slug, name: record.name, stateParkSlug: reused.reusedStateParkSlug, kind: reused.kind });
      console.log(`  reused state-park hero: ${reused.reusedStateParkSlug} (${reused.kind})`);
      continue;
    }

    const relativeSrc = `/images/rv-parks/${record.slug}.jpg`;
    const destinationPath = path.join(OUT_DIR, `${record.slug}.jpg`);
    let done = false;

    try {
      const page = await chooseCommonsImage(record, usedTitles);
      if (page) {
        await downloadCommonsJpeg(page, destinationPath);
        usedTitles.add(page.title);
        const image = commonsRecord(page, record, relativeSrc);
        resolved.push({ record, image });
        report.commonsLicensed.push({ slug: record.slug, name: record.name, sourceTitle: page.title, sourceUrl: image.sourceUrl });
        console.log(`  free exact-location candidate: ${page.title}`);
        done = true;
      }
    } catch (error) {
      console.warn(`  Commons lookup failed: ${error?.message || error}`);
    }

    if (!done && imageAiConfigured()) {
      try {
        await generateAiJpeg(record, destinationPath);
        const image = generatedRecord(record, relativeSrc);
        resolved.push({ record, image });
        report.aiGenerated.push({ slug: record.slug, name: record.name, town: record.town, county: record.county });
        console.log("  AI representative hero generated");
        done = true;
      } catch (error) {
        console.warn(`  AI fallback failed: ${error?.message || error}`);
      }
    }

    if (!done) {
      report.unresolved.push({
        slug: record.slug,
        name: record.name,
        reason: imageAiConfigured() ? "no exact free photo and AI generation failed" : "no exact free photo; Cloudflare image generation unavailable",
      });
    }
    await sleep(180);
  }

  const entries = resolved.map(({ record, image }) => renderEntry(record.slug, image));
  const nextImages = patchImagesSource(imagesSource, entries);
  const nextRegistry = patchRegistrySource(await fs.readFile(REGISTRY_PATH, "utf8"));
  const nextAudit = patchAuditSource(await fs.readFile(AUDIT_PATH, "utf8"));

  await fs.writeFile(IMAGES_PATH, nextImages, "utf8");
  await fs.writeFile(REGISTRY_PATH, nextRegistry, "utf8");
  await fs.writeFile(AUDIT_PATH, nextAudit, "utf8");
  await fs.writeFile(REPORT_PATH, `${JSON.stringify({
    ...report,
    resolvedThisRun: resolved.length,
    governedAfter: existingSlugs.size + resolved.length,
    backlogAfter: report.unresolved.length,
  }, null, 2)}\n`, "utf8");

  console.log(JSON.stringify({
    totalSeeds: seeds.length,
    governedBefore: existingSlugs.size,
    backlogBefore: missing.length,
    reusedStatePark: report.reusedStatePark.length,
    commonsLicensed: report.commonsLicensed.length,
    aiGenerated: report.aiGenerated.length,
    unresolved: report.unresolved.length,
    governedAfter: existingSlugs.size + resolved.length,
  }, null, 2));

  if (report.unresolved.length) process.exitCode = 3;
}

await main();
