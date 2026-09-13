import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const REPORT_PATH = path.join(ROOT, "scripts/data/rv-park-hero-report.json");
const IMAGES_PATH = path.join(ROOT, "src/data/rv-parks/images.server.ts");
const OUT_DIR = path.join(ROOT, "public/images/rv-parks");
const CLOUDFLARE_MODEL = "@cf/black-forest-labs/flux-1-schnell";
const VERIFIED_AT = new Date().toISOString().slice(0, 10);
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
      regionOverride: match[5] ?? null,
    });
  }
  return records;
}

async function loadSeeds() {
  const records = [];
  for (const [groupId, relativePath] of SEED_FILES) {
    records.push(...parseSeeds(groupId, await fs.readFile(path.join(ROOT, relativePath), "utf8")));
  }
  return new Map(records.map((record) => [record.slug, record]));
}

function heroSubjectRejection(entry) {
  const title = String(entry.sourceTitle || "");
  const evidence = String(entry.evidence || "");
  const combined = `${title} ${evidence}`;

  // A wildlife image can still be useful when the frame is explicitly a campground scene.
  if (/\b(?:campground|campsite|camp site|rv park|rv resort|rv campground|rv loop|camping area)\b/i.test(title)) return null;

  if (/\b(?:rescue|flood waters?|border patrol|emergency response|evacuation|accident scene)\b/i.test(combined)) {
    return "emergency-response image is not suitable as a destination hero";
  }

  if (/\b(?:egret|dove|swallow|sparrow|warbler|hawk|eagle|owl|heron|bird|nest|bison|goat|deer|snake|lizard|butterfly|flower|moss|mosses|stalactite|ipomoea)\b/i.test(title)) {
    return "flora/fauna close-up does not show the destination clearly enough";
  }

  if (/\b(?:mayor cage|animals in political offices)\b/i.test(combined)) {
    return "novelty subject does not show the destination clearly enough";
  }

  return null;
}

function assertQualityRegressions() {
  const rejected = [
    { sourceTitle: "File:Snowy Egret McKinney Falls State Park 2022.jpg", evidence: "McKinney Falls State Park Austin Texas" },
    { sourceTitle: "File:Common Ground Dove, Bentsen - Rio Grande Valley State Park, Texas 1.jpg", evidence: "Mission Texas" },
    { sourceTitle: "File:Barn Swallow Daingerfield State Park Texas 2023.jpg", evidence: "Daingerfield State Park Texas" },
    { sourceTitle: "File:Ipomoea cordatotriloba var. cordatotriloba.jpg", evidence: "Purtis Creek State Park Texas flower" },
    { sourceTitle: "File:Del Rio Sector Border Patrol Agents Help Rescue Families Stranded by Flood Waters.jpg", evidence: "Uvalde Texas" },
    { sourceTitle: "File:Mosses around Stalactite with Waterdrop.jpg", evidence: "Lost Maples State Natural Area Texas" },
    { sourceTitle: "File:Clay Henry Mayor Cage Lajitas Texas.jpg", evidence: "Outside Maverick Ranch RV Park. Animals in political offices" },
    { sourceTitle: "File:Bison San Angelo State Park Texas.jpg", evidence: "San Angelo State Park Texas" },
  ];
  for (const entry of rejected) {
    if (!heroSubjectRejection(entry)) throw new Error(`RV hero quality regression: weak subject accepted: ${entry.sourceTitle}`);
  }

  const retained = [
    { sourceTitle: "File:Bison in Campground Caprock Canyons State Park Texas.jpg", evidence: "Honey Flats campground" },
    { sourceTitle: "File:Boat Ramp Atlanta State Park Texas 2023.jpg", evidence: "Atlanta State Park Texas" },
    { sourceTitle: "File:Sea Rim State Park, Gambusia Nature Trail Boardwalk, Texas.jpg", evidence: "Sea Rim State Park Texas" },
  ];
  for (const entry of retained) {
    if (heroSubjectRejection(entry)) throw new Error(`RV hero quality regression: useful destination scene rejected: ${entry.sourceTitle}`);
  }
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

function aiPrompt(record) {
  const region = REGION_LABELS[record.groupId] || "Texas";
  return [
    `Create a unique photorealistic 16:9 editorial hero image inspired by the RV camping context of ${record.name} near ${record.town}, ${record.county} County, in ${region}.`,
    "A reusable documentary photo was rejected because its subject did not clearly depict the destination, so this replacement must be representative rather than pretending to reproduce the exact property.",
    "Show a plausible Texas RV campground setting for the region with realistic motorhomes or travel trailers, campsites, local vegetation, sky and terrain.",
    "Do not invent or reproduce branded signage, logos, distinctive buildings, named landmarks, readable text, license plates, watermarks, or recognizable faces.",
    "Natural Texas light, realistic photography aesthetic, useful negative space for a travel-guide hero, no illustration or fantasy styling.",
  ].join(" ");
}

async function generateAiJpeg(record, destinationPath) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) throw new Error("Cloudflare Workers AI is not configured for RV hero quality replacements");
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${CLOUDFLARE_MODEL}`;
  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
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
      return;
    } catch (error) {
      lastError = error;
      if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 1200 * (2 ** attempt)));
    }
  }
  throw lastError || new Error(`AI image generation failed for ${record.slug}`);
}

function tsString(value) {
  return JSON.stringify(String(value ?? ""));
}

function renderGeneratedEntry(record) {
  const src = `/images/rv-parks/${record.slug}.jpg`;
  return [
    `  ${tsString(record.slug)}: {`,
    `    src: ${tsString(src)},`,
    `    sourceUrl: "https://texasdefined.com/",`,
    `    alt: ${tsString(`AI-generated representative editorial image for ${record.name} near ${record.town}, Texas`)},`,
    "    width: 1600,",
    "    height: 900,",
    `    creator: "Texas Defined",`,
    `    license: "AI-generated representative editorial image",`,
    `    licenseUrl: "https://texasdefined.com/",`,
    `    verifiedAt: ${tsString(VERIFIED_AT)},`,
    "    actualLocation: false,",
    `    subjectScope: "representative",`,
    `    sourceKind: "generated-representative",`,
    "  },",
  ].join("\n");
}

function replaceImageEntry(source, record) {
  const escaped = record.slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`^\\s*["']${escaped}["']\\s*:\\s*\\{[\\s\\S]*?^\\s*\\},`, "m");
  if (!pattern.test(source)) throw new Error(`Could not locate generated RV image registry entry for ${record.slug}`);
  return source.replace(pattern, renderGeneratedEntry(record));
}

async function main() {
  assertQualityRegressions();
  const report = JSON.parse(await fs.readFile(REPORT_PATH, "utf8"));
  const seeds = await loadSeeds();
  const commons = Array.isArray(report.commonsLicensed) ? report.commonsLicensed : [];
  const rejected = commons
    .map((entry) => ({ entry, reason: heroSubjectRejection(entry) }))
    .filter((row) => row.reason);

  if (!rejected.length) {
    report.heroSubjectQuality = { reviewedCommons: commons.length, rejectedToRepresentative: 0, retainedCommons: commons.length };
    await fs.writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
    console.log(`RV hero subject quality: ${commons.length} Commons images reviewed; none rejected.`);
    return;
  }

  let imagesSource = await fs.readFile(IMAGES_PATH, "utf8");
  const rejectedSlugs = new Set(rejected.map(({ entry }) => entry.slug));
  const generated = Array.isArray(report.aiGenerated) ? report.aiGenerated : [];

  for (const { entry, reason } of rejected) {
    const record = seeds.get(entry.slug);
    if (!record) throw new Error(`RV hero quality guard could not find seed for ${entry.slug}`);
    const destinationPath = path.join(OUT_DIR, `${record.slug}.jpg`);
    await generateAiJpeg(record, destinationPath);
    imagesSource = replaceImageEntry(imagesSource, record);
    if (!generated.some((item) => item.slug === record.slug)) {
      generated.push({ slug: record.slug, name: record.name, town: record.town, county: record.county, reason: "hero-subject-quality" });
    }
    console.log(`Replaced weak Commons hero for ${record.slug}: ${reason}`);
  }

  await fs.writeFile(IMAGES_PATH, imagesSource);
  report.commonsLicensed = commons.filter((entry) => !rejectedSlugs.has(entry.slug));
  report.aiGenerated = generated;
  report.heroSubjectRejected = rejected.map(({ entry, reason }) => ({
    slug: entry.slug,
    name: entry.name,
    sourceTitle: entry.sourceTitle,
    sourceUrl: entry.sourceUrl,
    reason,
  }));
  report.heroSubjectQuality = {
    reviewedCommons: commons.length,
    rejectedToRepresentative: rejected.length,
    retainedCommons: commons.length - rejected.length,
  };
  await fs.writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`RV hero subject quality: ${commons.length} Commons images reviewed; ${rejected.length} replaced with governed representative images.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
