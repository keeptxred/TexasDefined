import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "src", "data");
const EVENT_IMAGE_DIR = path.join(ROOT, "public", "images", "events");
const REPORT = path.join(ROOT, "scripts", "data", "major-event-hero-backfill-report.json");
const CLOUDFLARE_MODEL = "@cf/black-forest-labs/flux-1-schnell";
const MAX_ATTEMPTS = 3;
const REQUEST_GAP_MS = 900;
let lastRequestAt = 0;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function matchingObjectEnd(source, start) {
  let depth = 0;
  let quote = "";
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (lineComment) {
      if (char === "\n") lineComment = false;
      continue;
    }
    if (blockComment) {
      if (char === "*" && next === "/") {
        blockComment = false;
        index += 1;
      }
      continue;
    }
    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === quote) quote = "";
      continue;
    }
    if (char === "/" && next === "/") {
      lineComment = true;
      index += 1;
      continue;
    }
    if (char === "/" && next === "*") {
      blockComment = true;
      index += 1;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) return index + 1;
    }
  }
  return -1;
}

function enrichmentRecords(source, file) {
  const records = [];
  const pattern = /\bslug\s*:\s*["']([^"']+)["']/g;
  for (const match of source.matchAll(pattern)) {
    const objectStart = source.lastIndexOf("{", match.index);
    if (objectStart < 0) throw new Error(`${file}: could not locate object start for ${match[1]}`);
    const objectEnd = matchingObjectEnd(source, objectStart);
    if (objectEnd < 0) throw new Error(`${file}: could not locate object end for ${match[1]}`);
    records.push({ slug: match[1], file, source: source.slice(objectStart, objectEnd) });
  }
  return records;
}

function hasImage(record) {
  return /\bimage\s*:\s*\{/.test(record.source);
}

function titleFromSlug(slug) {
  const acronyms = new Map([
    ["uil", "UIL"],
    ["nsca", "NSCA"],
    ["sxsw", "SXSW"],
    ["us", "U.S."],
    ["meca", "MECA"],
    ["cj", "CJ"],
  ]);
  return slug
    .split("-")
    .map((part) => acronyms.get(part) || `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

function sceneHint(slug) {
  const rules = [
    [/science|engineering/, "Texas science and engineering fair atmosphere with exhibition tables and student project displays, no readable text"],
    [/skeet|sporting-clays|shooting/, "Texas sporting-clays competition venue atmosphere with safe range setting and distant competitors"],
    [/football|(?:^|-)bowl(?:-|$)/, "Texas football stadium event atmosphere with field, stands, and game-day energy"],
    [/basketball/, "indoor Texas basketball arena event atmosphere with court and spectator seating"],
    [/baseball/, "Texas baseball ballpark event atmosphere with diamond and grandstands"],
    [/softball/, "Texas softball stadium event atmosphere with diamond and grandstands"],
    [/soccer/, "Texas soccer stadium event atmosphere with pitch and grandstands"],
    [/tennis|clay-court/, "professional tennis venue atmosphere with court and spectator seating"],
    [/relays|cross-country|wrestling|volleyball|spirit/, "Texas championship competition atmosphere appropriate to the named sport, with venue context and distant participants"],
    [/charles-schwab|cj-cup|houston-open|chevron|golf/, "Texas golf tournament atmosphere with manicured fairway, gallery areas, and tournament setting"],
    [/wine|food|bar-b-que|bbq|shrimp|chili|kolache|pecan/, "Texas food festival atmosphere with outdoor tasting booths and regional culinary setting"],
    [/rodeo|stock-show|cattle|(?:^|-)fair(?:-|$)/, "Texas fairgrounds or rodeo arena atmosphere with livestock and western event context"],
    [/oktoberfest|wurstfest/, "Texas German-heritage festival atmosphere with outdoor gathering space, traditional decor, and food stalls"],
    [/renaissance/, "Texas renaissance festival atmosphere with period-inspired outdoor market architecture and costumed figures seen only at a distance"],
    [/film/, "Texas film festival atmosphere with theater exterior, audience arrival, and cinematic event lighting, no logos or readable text"],
    [/fiddler|music|songwriter|blues|celtic/, "Texas live-music festival atmosphere with outdoor stage and crowd seen at a distance, no identifiable performers"],
    [/diwali/, "Texas Diwali festival atmosphere with warm decorative lights and community celebration, no identifiable faces"],
    [/dia-de-muertos|viva-la-vida/, "Texas cultural festival atmosphere with colorful festival decor and community gathering, no copyrighted art or identifiable faces"],
    [/parade/, "Texas downtown parade-route atmosphere with spectators and festive street scene, no logos or identifiable faces"],
    [/hummerbird|bird/, "Texas Gulf Coast birding-festival atmosphere with native habitat, observation areas, and birdwatchers seen from a distance"],
    [/bluebonnet|rose|peanut|citrus|sandfest/, "Texas seasonal festival atmosphere centered on the named regional tradition, with landscape or festival grounds and distant visitors"],
    [/championship|tournament/, "Texas championship event atmosphere appropriate to the named competition, with venue context and distant participants"],
  ];
  return rules.find(([pattern]) => pattern.test(slug))?.[1] || "Texas festival or major public event atmosphere appropriate to the event name";
}

function aiPrompt(slug) {
  const title = titleFromSlug(slug);
  return [
    `Create a unique photorealistic editorial hero image representing ${title}, a major Texas event.`,
    sceneHint(slug),
    "This is a representative editorial depiction, not documentary photography of a specific moment or exact camera view.",
    "Use a credible Texas setting and natural realistic photography aesthetic, 16:9 landscape composition, daylight or plausible event lighting.",
    "No text, no logos, no sponsor marks, no trademarked signage, no copyrighted poster art, no watermarks, and no recognizable faces.",
    `Make this composition visually distinct for the event identifier ${slug}.`,
  ].join(" ");
}

async function normalizeJpeg(bytes, destination) {
  if (bytes.length < 12000) throw new Error("generated image payload is too small");
  await fs.mkdir(path.dirname(destination), { recursive: true });
  const temporary = `${destination}.tmp`;
  await fs.writeFile(temporary, bytes);
  try {
    await execFileAsync("convert", [
      temporary,
      "-auto-orient",
      "-strip",
      "-resize", "1600x900^",
      "-gravity", "center",
      "-extent", "1600x900",
      "-quality", "88",
      destination,
    ]);
  } finally {
    await fs.rm(temporary, { force: true });
  }
  const stat = await fs.stat(destination);
  if (stat.size < 20000) throw new Error("normalized image is too small");
}

async function generateAiJpeg(slug, destination) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) throw new Error("Cloudflare AI credentials unavailable");

  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${CLOUDFLARE_MODEL}`;
  let lastError = null;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const elapsed = Date.now() - lastRequestAt;
    if (elapsed < REQUEST_GAP_MS) await sleep(REQUEST_GAP_MS - elapsed);
    lastRequestAt = Date.now();
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt(slug).slice(0, 2048), steps: 4 }),
      });
      if (!response.ok) throw new Error(`Cloudflare Workers AI ${response.status}: ${(await response.text()).slice(0, 220)}`);

      const contentType = response.headers.get("content-type") || "";
      let bytes;
      if (contentType.includes("application/json")) {
        const payload = await response.json();
        const encoded = payload?.result?.image || payload?.image;
        if (!encoded) throw new Error("Cloudflare Workers AI returned no image data");
        bytes = Buffer.from(encoded, "base64");
      } else {
        bytes = Buffer.from(await response.arrayBuffer());
      }
      await normalizeJpeg(bytes, destination);
      return;
    } catch (error) {
      lastError = error;
      if (attempt < MAX_ATTEMPTS) await sleep(1500 * attempt);
    }
  }
  throw lastError || new Error("image generation failed");
}

function imageBlock(slug) {
  const title = titleFromSlug(slug);
  const url = `https://texasdefined.com/images/events/${slug}.jpg`;
  const alt = `AI-generated photorealistic editorial depiction representing ${title} in Texas`;
  return [
    "    image: {",
    `      url: ${JSON.stringify(url)},`,
    `      alt: ${JSON.stringify(alt)},`,
    `      sourceUrl: ${JSON.stringify(url)},`,
    '      sourceType: "ai-generated",',
    '      rightsNote: "Generated by TexasDefined with Cloudflare Workers AI (FLUX.1 schnell) for TexasDefined-owned editorial use; no third-party source image was used.",',
    "      exactLocation: false,",
    "      approvedForCommercialUse: true,",
    "      aiGenerated: true,",
    "    },",
  ].join("\n");
}

async function patchRecord(file, slug) {
  const filePath = path.join(DATA_DIR, file);
  const source = await fs.readFile(filePath, "utf8");
  const record = enrichmentRecords(source, file).find((item) => item.slug === slug);
  if (!record) throw new Error(`${file}: could not rediscover ${slug} before patching`);
  if (hasImage(record)) return false;

  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const slugPattern = new RegExp(`(\\bslug\\s*:\\s*["']${escapedSlug}["']\\s*,)`);
  const updatedRecord = record.source.replace(slugPattern, `$1\n${imageBlock(slug)}`);
  if (updatedRecord === record.source) throw new Error(`${file}: could not insert image metadata for ${slug}`);
  const recordOffset = source.indexOf(record.source);
  const updated = `${source.slice(0, recordOffset)}${updatedRecord}${source.slice(recordOffset + record.source.length)}`;
  await fs.writeFile(filePath, updated, "utf8");
  return true;
}

async function loadEffectiveRecords(batchFiles, overrideFile) {
  const batchRecords = [];
  for (const file of batchFiles) {
    const source = await fs.readFile(path.join(DATA_DIR, file), "utf8");
    batchRecords.push(...enrichmentRecords(source, file));
  }
  let overrideRecords = [];
  try {
    overrideRecords = enrichmentRecords(await fs.readFile(path.join(DATA_DIR, overrideFile), "utf8"), overrideFile);
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
  const effectiveBySlug = new Map(batchRecords.map((record) => [record.slug, record]));
  for (const record of overrideRecords) effectiveBySlug.set(record.slug, record);
  return effectiveBySlug;
}

async function main() {
  const names = await fs.readdir(DATA_DIR);
  const batchFiles = names
    .filter((name) => /^major-event-schema-enrichment-batch\d+\.server\.ts$/.test(name))
    .sort((a, b) => Number(a.match(/batch(\d+)/)?.[1] || 0) - Number(b.match(/batch(\d+)/)?.[1] || 0));
  const overrideFile = "major-event-schema-enrichment-overrides.server.ts";
  const effectiveBySlug = await loadEffectiveRecords(batchFiles, overrideFile);
  const pending = [...effectiveBySlug.values()].filter((record) => !hasImage(record));
  const requestedSlugs = [...new Set(
    String(process.env.EVENT_IMAGE_SLUGS || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  )];
  const unknownRequestedSlugs = requestedSlugs.filter((slug) => !effectiveBySlug.has(slug));
  if (unknownRequestedSlugs.length > 0) {
    throw new Error(`Unknown EVENT_IMAGE_SLUGS: ${unknownRequestedSlugs.join(", ")}`);
  }

  const scopedPending = requestedSlugs.length > 0
    ? requestedSlugs
      .map((slug) => effectiveBySlug.get(slug))
      .filter((record) => record && !hasImage(record))
    : pending;
  if (requestedSlugs.length > 0 && scopedPending.length === 0) {
    console.log(`MAJOR_EVENT_HERO_BACKFILL=${JSON.stringify({ requestedSlugs, attempted: 0, resolved: 0, remainingRequestedAfterThisRun: 0, status: "already-complete" })}`);
    return;
  }

  const limit = Math.max(0, Number.parseInt(process.env.EVENT_IMAGE_LIMIT || "0", 10) || 0);
  const targets = limit > 0 ? scopedPending.slice(0, limit) : scopedPending;
  const resolved = [];
  const unresolved = [];

  await fs.mkdir(EVENT_IMAGE_DIR, { recursive: true });
  for (const [index, record] of targets.entries()) {
    const destination = path.join(EVENT_IMAGE_DIR, `${record.slug}.jpg`);
    console.log(`[${index + 1}/${targets.length}] ${record.slug}`);
    try {
      await generateAiJpeg(record.slug, destination);
      const patched = await patchRecord(record.file, record.slug);
      if (!patched) throw new Error("record became image-complete before patching");
      resolved.push({ slug: record.slug, file: record.file, asset: `public/images/events/${record.slug}.jpg`, sourceType: "ai-generated" });
    } catch (error) {
      await fs.rm(destination, { force: true });
      unresolved.push({ slug: record.slug, file: record.file, error: error?.message || String(error) });
      console.error(`${record.slug}: ${error?.message || error}`);
    }
  }

  const effectiveAfter = await loadEffectiveRecords(batchFiles, overrideFile);
  const pendingAfter = [...effectiveAfter.values()].filter((record) => !hasImage(record));
  const remainingRequestedAfterThisRun = requestedSlugs
    .filter((slug) => {
      const record = effectiveAfter.get(slug);
      return record ? !hasImage(record) : true;
    });
  const report = {
    generatedAt: new Date().toISOString(),
    reviewedLeaves: effectiveBySlug.size,
    compliantBefore: effectiveBySlug.size - pending.length,
    pendingBefore: pending.length,
    requestedSlugs,
    scopedPendingBefore: scopedPending.length,
    attempted: targets.length,
    resolved: resolved.length,
    unresolved,
    remainingAfterThisRun: pendingAfter.length,
    remainingRequestedAfterThisRun,
    model: CLOUDFLARE_MODEL,
    policy: "Missing Event heroes remain fail-closed until generated assets and structured provenance are reviewed and merged.",
    images: resolved,
  };
  await fs.writeFile(REPORT, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(`MAJOR_EVENT_HERO_BACKFILL=${JSON.stringify({ reviewedLeaves: report.reviewedLeaves, pendingBefore: report.pendingBefore, requestedSlugs: report.requestedSlugs, scopedPendingBefore: report.scopedPendingBefore, resolved: report.resolved, unresolved: report.unresolved.length, remainingAfterThisRun: report.remainingAfterThisRun, remainingRequestedAfterThisRun: report.remainingRequestedAfterThisRun.length })}`);

  if (unresolved.length > 0) throw new Error(`${unresolved.length} Event hero image(s) failed generation; no incomplete review PR should be created.`);
  if (requestedSlugs.length > 0 && remainingRequestedAfterThisRun.length > 0) {
    throw new Error(`Requested Event hero(s) remain unresolved: ${remainingRequestedAfterThisRun.join(", ")}`);
  }
  if (requestedSlugs.length === 0 && limit === 0 && pendingAfter.length !== 0) {
    throw new Error(`${pendingAfter.length} Event hero(s) remain after full backfill run.`);
  }
}

await main();
