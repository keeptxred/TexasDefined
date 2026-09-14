import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const REPORT_PATH = path.join(ROOT, "scripts/data/direct-svg-hero-report.json");
const CLOUDFLARE_MODEL = "@cf/black-forest-labs/flux-1-schnell";

// Known ambiguous Commons collisions where location-token overlap is not enough
// to prove that the photograph depicts the page subject.
const REQUIRED_SOURCE_TERMS = new Map([
  ["san-antonio-aquarium", ["aquarium"]],
  ["texas-ecoregions-habitats", ["ecoregion", "habitat"]],
]);

function normalize(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}

function sourceMatches(item) {
  const required = REQUIRED_SOURCE_TERMS.get(item.key);
  if (!required?.length || item.source !== "free-use") return true;
  const title = normalize(item.sourceTitle);
  return required.some((term) => title.includes(normalize(term)));
}

function aiPrompt(item) {
  return [
    `Create a unique photorealistic editorial hero photograph for this TexasDefined subject: ${item.query}.`,
    `The previous reusable-photo search produced a false subject match, so prioritize the actual named subject rather than merely the city or region.`,
    "Ground the scene in the named Texas subject without inventing readable signs, logos, sponsor marks, or a claim that an exact documentary camera view exists.",
    "Natural realistic photography, 16:9 landscape composition, no text, no logos, no watermarks, no recognizable private individuals.",
    "Never create a vector illustration, diagram, gradient, icon, collage, or generic placeholder.",
  ].join(" ");
}

async function generateReplacement(item) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) throw new Error(`Cloudflare AI credentials unavailable for ${item.key}`);

  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${CLOUDFLARE_MODEL}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: aiPrompt(item).slice(0, 2048), steps: 4 }),
  });
  if (!response.ok) throw new Error(`Cloudflare Workers AI ${response.status}: ${(await response.text().catch(() => "")).slice(0, 220)}`);

  const contentType = response.headers.get("content-type") || "";
  let bytes;
  if (contentType.includes("application/json")) {
    const payload = await response.json();
    const base64 = payload?.result?.image || payload?.image;
    if (!base64) throw new Error(`Cloudflare Workers AI returned no image data for ${item.key}`);
    bytes = Buffer.from(base64, "base64");
  } else {
    bytes = Buffer.from(await response.arrayBuffer());
  }
  if (bytes.length < 12000) throw new Error(`AI replacement too small for ${item.key} (${bytes.length} bytes)`);

  const destination = path.join(ROOT, item.output);
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
  const replaced = [];

  for (const item of report.images || []) {
    if (sourceMatches(item)) continue;
    await generateReplacement(item);
    replaced.push({ key: item.key, rejectedSourceTitle: item.sourceTitle });
    item.source = "ai-generated";
    item.sourceTitle = "";
    item.credit = "AI-generated photorealistic editorial image · Cloudflare Workers AI / FLUX.1 schnell · Texas Defined";
  }

  report.freeUse = (report.images || []).filter((item) => item.source === "free-use").length;
  report.aiGenerated = (report.images || []).filter((item) => item.source === "ai-generated").length;
  report.subjectMatchEnforcement = { replaced, rejectedCount: replaced.length };
  await fs.writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({ replaced: replaced.length, keys: replaced.map((item) => item.key) }, null, 2));
}

await main();
