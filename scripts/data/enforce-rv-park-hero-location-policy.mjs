import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public/images/rv-parks");
const IMAGES_PATH = path.join(ROOT, "src/data/rv-parks/images.server.ts");
const REPORT_PATH = path.join(ROOT, "scripts/data/rv-park-hero-report.json");
const CLOUDFLARE_MODEL = "@cf/black-forest-labs/flux-1-schnell";
const VERIFIED_AT = new Date().toISOString().slice(0, 10);
const CONCURRENCY = 3;
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/^file\s*/i, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeQuoted(value) {
  return JSON.parse(`"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`);
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
    });
  }
  return records;
}

async function loadSeedMap() {
  const map = new Map();
  for (const [groupId, relativePath] of SEED_FILES) {
    const source = await fs.readFile(path.join(ROOT, relativePath), "utf8");
    for (const record of parseSeeds(groupId, source)) map.set(record.slug, record);
  }
  if (map.size !== 250) throw new Error(`RV seed integrity check failed: expected 250, found ${map.size}`);
  return map;
}

function publicLandIdentity(name) {
  const match = String(name || "").match(/^(.+?\b(?:State Park|State Natural Area|National Park|National Recreation Area|National Wildlife Refuge|National Forest|State Historic Site))\b/i);
  return match?.[1]?.trim() || null;
}

function strictCommonsMatch(record, sourceTitle) {
  const title = normalize(sourceTitle);
  const town = normalize(record.town);
  const county = normalize(record.county);
  const locationConfirmed = Boolean(
    title.includes("texas") ||
    (town && title.includes(town)) ||
    (county && title.includes(county))
  );

  const publicIdentity = publicLandIdentity(record.name);
  if (publicIdentity) {
    return title.includes(normalize(publicIdentity)) && locationConfirmed;
  }

  return title.includes(normalize(record.name)) && locationConfirmed;
}

function assertStrictMatcher() {
  const cases = [
    [{ name: "Roadrunner RV Park", town: "Johnson City", county: "Blanco" }, "File:Greater Roadrunner - Flickr - GregTheBusker (3).jpg", false],
    [{ name: "Fredericksburg RV Park", town: "Fredericksburg", county: "Gillespie" }, "File:Fredericksburg-Spotsylvania National Military Park LOC 93681942.jpg", false],
    [{ name: "Pecan Park RV Resort", town: "San Marcos", county: "Hays" }, "File:Pecan Park south of Readhimer, LA IMG 2101.JPG", false],
    [{ name: "Marina Bay RV Resort", town: "Kemah", county: "Galveston" }, "File:Singapore Marina-Bay-at-night-01.jpg", false],
    [{ name: "Inks Lake State Park RV Loop", town: "Burnet", county: "Burnet" }, "File:Devils Waterhole Inks Lake State Park Texas 2023.jpg", true],
    [{ name: "Lost Maples State Natural Area RV Campground", town: "Vanderpool", county: "Bandera" }, "File:Lost Maples State Natural Area, Edwards Plateau, Texas, United States.jpg", true],
    [{ name: "Example RV Resort", town: "Austin", county: "Travis" }, "File:Example RV Resort Austin Texas.jpg", true],
  ];
  for (const [record, title, expected] of cases) {
    const actual = strictCommonsMatch(record, title);
    if (actual !== expected) throw new Error(`strict Commons matcher regression for ${record.name}: expected ${expected}, got ${actual}`);
  }
}

function aiPrompt(record) {
  const region = REGION_LABELS[record.groupId] || "Texas";
  return [
    `Create a unique photorealistic 16:9 editorial hero image inspired by the RV camping context of ${record.name} near ${record.town}, ${record.county} County, in ${region}.`,
    `This is a representative image because no rights-cleared documentary photograph passed strict exact-property and Texas-location verification.`,
    `Show a plausible Texas RV campground setting for the region, with realistic motorhomes or travel trailers, campsites, local vegetation, sky and terrain.`,
    `Do not invent or reproduce branded signage, logos, distinctive buildings, named landmarks, readable text, license plates, watermarks, or recognizable faces.`,
    `Natural Texas light, realistic photography aesthetic, useful negative space for a travel-guide hero, no illustration or fantasy styling.`,
  ].join(" ");
}

async function normalizeToJpeg(bytes, destinationPath) {
  const temp = `${destinationPath}.strict-source`;
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

async function generateAiJpeg(record, destinationPath) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) throw new Error("Cloudflare image-generation credentials are required for strict-policy fallbacks");
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${CLOUDFLARE_MODEL}`;

  let lastError;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt(record).slice(0, 2048), steps: 4 }),
      });
      if (!response.ok) {
        const body = await response.text().catch(() => "");
        if ((response.status === 429 || response.status >= 500) && attempt < 3) {
          await sleep(1200 * (2 ** attempt));
          continue;
        }
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
      return;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await sleep(1200 * (2 ** attempt));
    }
  }
  throw lastError || new Error("AI image generation failed");
}

function renderGeneratedEntry(record) {
  return [
    `  ${JSON.stringify(record.slug)}: {`,
    `    src: ${JSON.stringify(`/images/rv-parks/${record.slug}.jpg`)},`,
    `    sourceUrl: "https://texasdefined.com/",`,
    `    alt: ${JSON.stringify(`AI-generated representative editorial image for ${record.name} near ${record.town}, Texas`)},`,
    `    width: 1600,`,
    `    height: 900,`,
    `    creator: "Texas Defined",`,
    `    license: "AI-generated representative editorial image",`,
    `    licenseUrl: "https://texasdefined.com/",`,
    `    verifiedAt: ${JSON.stringify(VERIFIED_AT)},`,
    `    actualLocation: false,`,
    `    subjectScope: "representative",`,
    `    sourceKind: "generated-representative",`,
    `  },`,
  ].join("\n");
}

function replaceImageEntry(source, record) {
  const marker = `  ${JSON.stringify(record.slug)}: {`;
  const start = source.indexOf(marker);
  if (start < 0) throw new Error(`Generated RV image entry not found for ${record.slug}`);
  const endMarker = "\n  },";
  const end = source.indexOf(endMarker, start);
  if (end < 0) throw new Error(`Generated RV image entry closing marker not found for ${record.slug}`);
  return `${source.slice(0, start)}${renderGeneratedEntry(record)}${source.slice(end + endMarker.length)}`;
}

async function runPool(items, worker, concurrency = CONCURRENCY) {
  let cursor = 0;
  const errors = [];
  async function next() {
    while (true) {
      const index = cursor;
      cursor += 1;
      if (index >= items.length) return;
      try {
        await worker(items[index], index);
      } catch (error) {
        errors.push({ item: items[index], error });
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length || 1) }, () => next()));
  return errors;
}

async function main() {
  assertStrictMatcher();
  const seedMap = await loadSeedMap();
  const report = JSON.parse(await fs.readFile(REPORT_PATH, "utf8"));
  const commons = Array.isArray(report.commonsLicensed) ? report.commonsLicensed : [];
  const accepted = [];
  const rejected = [];

  for (const candidate of commons) {
    const record = seedMap.get(candidate.slug);
    if (!record) throw new Error(`Report references unknown RV seed ${candidate.slug}`);
    if (strictCommonsMatch(record, candidate.sourceTitle)) accepted.push(candidate);
    else rejected.push({ candidate, record });
  }

  console.log(`Strict Commons policy: ${accepted.length} accepted, ${rejected.length} rejected from ${commons.length} candidates.`);
  for (const { candidate, record } of rejected.slice(0, 20)) {
    console.log(`  reject ${record.slug}: ${candidate.sourceTitle}`);
  }
  if (rejected.length > 20) console.log(`  ... plus ${rejected.length - 20} additional rejected candidates`);

  const failures = await runPool(rejected, async ({ record }, index) => {
    console.log(`[strict fallback ${index + 1}/${rejected.length}] ${record.name}`);
    await generateAiJpeg(record, path.join(OUT_DIR, `${record.slug}.jpg`));
  });
  if (failures.length) {
    const details = failures.slice(0, 8).map(({ item, error }) => `${item.record.slug}: ${error?.message || error}`).join("; ");
    throw new Error(`Strict-policy AI fallback failed for ${failures.length} RV destinations: ${details}`);
  }

  let imagesSource = await fs.readFile(IMAGES_PATH, "utf8");
  for (const { record } of rejected) imagesSource = replaceImageEntry(imagesSource, record);
  await fs.writeFile(IMAGES_PATH, imagesSource, "utf8");

  report.commonsLicensed = accepted;
  report.commonsRejected = rejected.map(({ candidate, record }) => ({
    slug: record.slug,
    name: record.name,
    sourceTitle: candidate.sourceTitle,
    sourceUrl: candidate.sourceUrl,
    reason: "failed strict exact-property plus Texas/town/county title verification",
  }));
  report.aiGenerated = [
    ...(Array.isArray(report.aiGenerated) ? report.aiGenerated : []),
    ...rejected.map(({ record }) => ({
      slug: record.slug,
      name: record.name,
      town: record.town,
      county: record.county,
      reason: "strict Commons location-policy fallback",
    })),
  ];
  report.strictLocationPolicy = {
    commonsReviewed: commons.length,
    commonsAccepted: accepted.length,
    commonsRejected: rejected.length,
    generatedFallbacks: rejected.length,
    matcher: "exact named property/public-land identity plus Texas/town/county evidence in Wikimedia file title",
  };

  await fs.writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(report.strictLocationPolicy, null, 2));
}

await main();
