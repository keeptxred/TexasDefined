import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const REPORT_PATH = path.join(ROOT, "scripts/data/destination-placeholder-hero-report.json");
const CLOUDFLARE_MODEL = "@cf/black-forest-labs/flux-1-schnell";

const GENERIC_WORDS = new Set([
  "texas", "state", "national", "county", "city", "museum", "park", "area", "center", "centre",
  "historic", "historical", "wildlife", "management", "refuge", "sanctuary", "the", "and", "of", "at",
]);

function normalize(value) {
  return String(value || "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}

function words(value) {
  return normalize(value).split(" ").filter(Boolean);
}

function contextFromRecord(text, slug) {
  const marker = new RegExp(`\\bslug\\s*:\\s*["']${slug.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}["']`);
  const match = marker.exec(text);
  if (!match) return { nearestTown: "", county: "", summary: "" };
  const window = text.slice(match.index, Math.min(text.length, match.index + 7000));
  const nearestTown = window.match(/\bnearestTown\s*:\s*["']([^"']{2,120})["']/)?.[1]
    || window.match(/\btown\s*:\s*["']([^"']{2,120})["']/)?.[1]
    || "";
  const county = window.match(/\bcounty\s*:\s*["']([^"']{2,160})["']/)?.[1] || "";
  const summary = window.match(/\bsummary\s*:\s*["']([^"']{20,1200})["']/)?.[1] || "";
  return { nearestTown, county, summary };
}

function categoryProof(name, title) {
  const normalizedName = normalize(name);
  const normalizedTitle = normalize(title);
  if (normalizedName.includes("museum")) return normalizedTitle.includes("museum");
  if (normalizedName.includes("wildlife management area")) return normalizedTitle.includes("wildlife management") || /\bwma\b/.test(normalizedTitle);
  if (normalizedName.includes("refuge")) return normalizedTitle.includes("refuge");
  if (normalizedName.includes("sanctuary")) return normalizedTitle.includes("sanctuary");
  return true;
}

function sourceMatches(item, context) {
  if (item.source !== "free-use") return true;
  const title = normalize(item.sourceTitle);
  const fullName = normalize(item.name);
  if (!title) return false;
  if (fullName && title.includes(fullName)) return true;

  if (!categoryProof(item.name, item.sourceTitle)) return false;

  const locality = new Set([
    ...words(context.nearestTown),
    ...words(context.county),
    "texas",
  ]);
  const identityTokens = words(item.name).filter((token) => token.length > 2 && !GENERIC_WORDS.has(token) && !locality.has(token));
  const matchedIdentity = identityTokens.filter((token) => title.includes(token));

  if (identityTokens.length) {
    const required = identityTokens.length <= 2 ? 1 : Math.max(2, Math.ceil(identityTokens.length * 0.5));
    return matchedIdentity.length >= required;
  }

  const localityMatched = [...locality].some((token) => token.length > 2 && title.includes(token));
  return localityMatched && categoryProof(item.name, item.sourceTitle);
}

function aiPrompt(item, context) {
  const location = context.nearestTown ? ` near ${context.nearestTown}, Texas` : " in Texas";
  return [
    `Create a unique photorealistic editorial hero photograph inspired specifically by ${item.name}${location}.`,
    context.summary,
    `A previous reusable-photo candidate could not prove the exact destination identity from its own title, so do not imitate or reuse that ambiguous subject.`,
    `Use architecture, landscape, vegetation, terrain, water, museum/visitor-site features, or wildlife habitat that are plausible for the named destination and supplied context.`,
    `This is a representative editorial image, not a documentary claim that the exact camera view exists.`,
    `Natural realistic photography, 16:9 landscape composition, no text, no logos, no watermarks, no recognizable private individuals. Never create a vector illustration, diagram, gradient, icon, or generic placeholder.`,
  ].filter(Boolean).join(" ");
}

async function generateReplacement(item, context) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) throw new Error(`Cloudflare AI credentials unavailable for ${item.slug}`);

  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${CLOUDFLARE_MODEL}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: aiPrompt(item, context).slice(0, 2048), steps: 4 }),
  });
  if (!response.ok) throw new Error(`Cloudflare Workers AI ${response.status}: ${(await response.text().catch(() => "")).slice(0, 220)}`);

  const contentType = response.headers.get("content-type") || "";
  let bytes;
  if (contentType.includes("application/json")) {
    const payload = await response.json();
    const base64 = payload?.result?.image || payload?.image;
    if (!base64) throw new Error(`Cloudflare Workers AI returned no image data for ${item.slug}`);
    bytes = Buffer.from(base64, "base64");
  } else {
    bytes = Buffer.from(await response.arrayBuffer());
  }
  if (bytes.length < 15000) throw new Error(`AI replacement too small for ${item.slug} (${bytes.length} bytes)`);

  const relative = String(item.src || "");
  if (!relative.startsWith("/images/") || !/\.jpe?g$/i.test(relative)) throw new Error(`Unexpected destination hero output path for ${item.slug}: ${relative}`);
  const destination = path.join(ROOT, `public${relative}`);
  const temporary = `${destination}.subject-match.tmp`;
  await fs.writeFile(temporary, bytes);
  try {
    await execFileAsync("convert", [temporary, "-auto-orient", "-strip", "-resize", "1800x1800>", "-quality", "88", destination]);
  } finally {
    await fs.rm(temporary, { force: true });
  }
}

async function main() {
  const report = JSON.parse(await fs.readFile(REPORT_PATH, "utf8"));
  const sourceCache = new Map();
  const replaced = [];

  for (const item of report.images || []) {
    if (item.source !== "free-use") continue;
    const sourcePath = path.join(ROOT, item.sourceFile || "");
    let sourceText = sourceCache.get(sourcePath);
    if (sourceText === undefined) {
      sourceText = await fs.readFile(sourcePath, "utf8");
      sourceCache.set(sourcePath, sourceText);
    }
    const context = contextFromRecord(sourceText, item.slug);
    if (sourceMatches(item, context)) continue;

    const rejectedSourceTitle = item.sourceTitle;
    await generateReplacement(item, context);
    item.source = "ai-generated";
    item.sourceTitle = "";
    item.credit = "AI-generated representative editorial image · Cloudflare Workers AI / FLUX.1 schnell · Texas Defined";
    replaced.push({ slug: item.slug, name: item.name, rejectedSourceTitle });
  }

  report.freeUse = (report.images || []).filter((item) => item.source === "free-use").length;
  report.aiGenerated = (report.images || []).filter((item) => item.source === "ai-generated").length;
  report.subjectIdentityEnforcement = {
    policy: "free-use image title must prove destination identity beyond locality-only overlap; ambiguous candidates fall back to labeled representative AI",
    rejectedCount: replaced.length,
    replaced,
  };
  await fs.writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({ rejectedCount: replaced.length, slugs: replaced.map((item) => item.slug) }, null, 2));
}

await main();
