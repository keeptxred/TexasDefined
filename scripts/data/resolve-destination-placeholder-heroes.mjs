import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "src/data");
const OUT_DIR = path.join(ROOT, "public/images/destination-heroes");
const OVERRIDES_PATH = path.join(ROOT, "src/data/destination-hero-overrides.ts");
const EXPLORE_MAP_PATH = path.join(ROOT, "src/data/explore-hero-map.ts");
const STATE_MAP_PATH = path.join(ROOT, "src/data/state-park-hero-map.ts");
const REPORT_PATH = path.join(ROOT, "scripts/data/destination-placeholder-hero-report.json");
const USER_AGENT = "TexasDefined/1.0 (destination placeholder hero remediation; https://texasdefined.com)";
const CLOUDFLARE_MODEL = "@cf/black-forest-labs/flux-1-schnell";
const API_GAP_MS = 500;
const LICENSE_OK = ["public domain", "cc0", "cc by", "cc-by", "cc by-sa", "cc-by-sa"];
const GENERIC_WORDS = new Set(["texas", "state", "national", "county", "city", "museum", "park", "area", "center", "centre", "historic", "historical", "wildlife", "management", "refuge", "the", "and", "of", "at"]);
let lastRequestAt = 0;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const cleanHtml = (value) => String(value || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&#39;|&apos;/gi, "'").replace(/&quot;/gi, '"').replace(/\s+/g, " ").trim();
const normalize = (value) => cleanHtml(value).toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (["node_modules", "dist", "build", ".git"].includes(entry.name)) continue;
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(absolute));
    else out.push(absolute);
  }
  return out;
}

async function pacedFetch(url, options = {}, attempts = 4) {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const elapsed = Date.now() - lastRequestAt;
    if (elapsed < API_GAP_MS) await sleep(API_GAP_MS - elapsed);
    lastRequestAt = Date.now();
    try {
      const response = await fetch(url, { ...options, headers: { "User-Agent": USER_AGENT, ...(options.headers || {}) } });
      if (response.ok) return response;
      if (![429, 500, 502, 503, 504].includes(response.status)) throw new Error(`HTTP ${response.status}`);
      lastError = new Error(`HTTP ${response.status}`);
      await sleep(Math.min(10000, 1000 * (2 ** attempt)));
    } catch (error) {
      lastError = error;
      if (attempt < attempts - 1) await sleep(Math.min(10000, 1000 * (2 ** attempt)));
    }
  }
  throw lastError || new Error("request failed");
}

function licenseAllowed(metadata) {
  const value = cleanHtml(metadata?.LicenseShortName?.value || metadata?.UsageTerms?.value).toLowerCase();
  if (/noncommercial|no derivatives|\bnc\b|\bnd\b/i.test(value)) return false;
  return LICENSE_OK.some((allowed) => value.includes(allowed));
}

function distinctiveTokens(name) {
  return normalize(name).split(" ").filter((token) => token.length > 2 && !GENERIC_WORDS.has(token));
}

function evidence(page) {
  const info = page.imageinfo?.[0];
  const metadata = info?.extmetadata || {};
  return [page.title, metadata.ObjectName?.value, metadata.ImageDescription?.value, metadata.Categories?.value].map(cleanHtml).join(" ");
}

function scoreCandidate(page, destination) {
  const info = page.imageinfo?.[0];
  if (!info || info.mime !== "image/jpeg" || !licenseAllowed(info.extmetadata)) return -999;
  const raw = evidence(page);
  const normalized = normalize(raw);
  const title = normalize(page.title || "");
  const fullName = normalize(destination.name);
  const tokens = distinctiveTokens(destination.name);
  const matched = tokens.filter((token) => normalized.includes(token));
  const required = tokens.length <= 2 ? Math.min(1, tokens.length) : Math.max(2, Math.ceil(tokens.length * 0.55));
  if (required > 0 && matched.length < required && !normalized.includes(fullName)) return -999;
  let score = matched.length * 16;
  if (fullName && normalized.includes(fullName)) score += 75;
  if (fullName && title.includes(fullName)) score += 45;
  if (destination.nearestTown && normalized.includes(normalize(destination.nearestTown))) score += 12;
  if (destination.county && normalized.includes(normalize(destination.county))) score += 8;
  if (normalized.includes("texas")) score += 8;
  if (/building|exterior|landscape|entrance|gallery|trail|wetland|prairie|forest|river|lake|canyon|grounds|historic|museum|wildlife/i.test(raw)) score += 5;
  if (/logo|seal|map|diagram|flag|poster|brochure|screenshot|advertisement/i.test(page.title || "")) score -= 45;
  if (Number(info.thumbwidth || info.width || 0) >= 1400) score += 6;
  return score;
}

async function commonsSearch(query, limit = 40) {
  const params = new URLSearchParams({ action: "query", generator: "search", gsrsearch: query, gsrnamespace: "6", gsrlimit: String(limit), prop: "imageinfo", iiprop: "url|mime|size|extmetadata", iiurlwidth: "1800", format: "json", origin: "*" });
  const response = await pacedFetch(`https://commons.wikimedia.org/w/api.php?${params}`, { headers: { Accept: "application/json" } });
  return Object.values((await response.json()).query?.pages || {});
}

async function chooseCommonsImage(destination, usedTitles) {
  const searches = [`intitle:\"${destination.name}\"`, `\"${destination.name}\" Texas`, `${destination.name} ${destination.nearestTown || "Texas"}`, `${destination.name} Texas`];
  let best = null;
  for (const query of searches) {
    for (const page of await commonsSearch(query)) {
      if (!page?.title || usedTitles.has(page.title)) continue;
      const score = scoreCandidate(page, destination);
      if (!best || score > best.score) best = { page, score };
    }
    if (best?.score >= 70) break;
  }
  return best?.score >= 45 ? best.page : null;
}

async function normalizeJpeg(bytes, destinationPath) {
  if (bytes.length < 15000) throw new Error(`image too small (${bytes.length} bytes)`);
  await fs.mkdir(path.dirname(destinationPath), { recursive: true });
  const temporary = `${destinationPath}.tmp`;
  await fs.writeFile(temporary, bytes);
  try {
    await execFileAsync("convert", [temporary, "-auto-orient", "-strip", "-resize", "1800x1800>", "-quality", "88", destinationPath]);
  } finally {
    await fs.rm(temporary, { force: true });
  }
}

async function downloadJpeg(url, destinationPath) {
  const response = await pacedFetch(url, { headers: { Accept: "image/jpeg,image/*;q=0.8" } });
  await normalizeJpeg(Buffer.from(await response.arrayBuffer()), destinationPath);
}

function aiPrompt(destination) {
  const context = [destination.summary, destination.nearestTown ? `Nearest town: ${destination.nearestTown}, Texas.` : "", destination.county ? `County context: ${destination.county}.` : ""].filter(Boolean).join(" ");
  return [
    `Create a unique photorealistic editorial hero photograph inspired specifically by ${destination.name} in Texas.`,
    context,
    "Use only architecture, landscape, vegetation, terrain, water, streetscape, museum/visitor-site features, or wildlife habitat that are plausible from the supplied subject context. Do not fabricate logos, readable signs, monuments, or a famous exact feature unless the supplied context supports it.",
    "This is an AI-generated representative editorial image, not a claim that the exact camera view exists.",
    "Natural realistic photography, 16:9 landscape composition, no text, no logos, no watermarks, no recognizable private individuals. Never create a vector illustration, diagram, gradient, icon, or generic placeholder.",
  ].join(" ");
}

async function generateAiJpeg(destination, destinationPath) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) throw new Error("Cloudflare AI credentials unavailable");
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${CLOUDFLARE_MODEL}`;
  const response = await fetch(endpoint, { method: "POST", headers: { Authorization: `Bearer ${apiToken}`, "Content-Type": "application/json" }, body: JSON.stringify({ prompt: aiPrompt(destination).slice(0, 2048), steps: 4 }) });
  if (!response.ok) throw new Error(`Cloudflare Workers AI ${response.status}: ${(await response.text().catch(() => "")).slice(0, 220)}`);
  const contentType = response.headers.get("content-type") || "";
  let bytes;
  if (contentType.includes("application/json")) {
    const payload = await response.json();
    const base64 = payload?.result?.image || payload?.image;
    if (!base64) throw new Error("Cloudflare Workers AI returned no image data");
    bytes = Buffer.from(base64, "base64");
  } else {
    bytes = Buffer.from(await response.arrayBuffer());
  }
  await normalizeJpeg(bytes, destinationPath);
}

function creditFor(page) {
  const metadata = page.imageinfo?.[0]?.extmetadata || {};
  return `${cleanHtml(metadata.Artist?.value || metadata.Credit?.value || "Wikimedia Commons contributor")} · ${cleanHtml(metadata.LicenseShortName?.value || metadata.UsageTerms?.value || "free license")} · Wikimedia Commons`;
}

function keysFromMap(source) {
  return new Set([...source.matchAll(/^\s*["']([a-z0-9][a-z0-9-]+)["']\s*:/gm)].map((match) => match[1]));
}

function parseCandidateRecord(text, slugMatch) {
  const slug = slugMatch[1];
  const window = text.slice(slugMatch.index, Math.min(text.length, slugMatch.index + 7000));
  const name = window.match(/\bname\s*:\s*["']([^"']{3,220})["']/)?.[1];
  if (!name) return null;
  const nearestTown = window.match(/\bnearestTown\s*:\s*["']([^"']{2,120})["']/)?.[1] || window.match(/\btown\s*:\s*["']([^"']{2,120})["']/)?.[1] || "";
  const county = window.match(/\bcounty\s*:\s*["']([^"']{2,160})["']/)?.[1] || "";
  const summary = window.match(/\bsummary\s*:\s*["']([^"']{30,1000})["']/)?.[1] || "";
  return { slug, name, nearestTown, county, summary };
}

async function discoverCandidates(covered) {
  const files = (await walk(DATA_DIR)).filter((file) => /\.ts$/.test(file));
  const candidates = new Map();
  for (const file of files) {
    const relative = path.relative(ROOT, file).replace(/\\/g, "/");
    if (relative.includes("/rv-parks/") || relative.endsWith("destination-hero-overrides.ts") || relative.endsWith("destination-hero-placeholder.ts") || relative.endsWith("explore-hero-reconciliation.ts") || relative.endsWith("explore-remote.ts") || relative.endsWith("state-park-heroes.ts")) continue;
    const text = await fs.readFile(file, "utf8");
    if (!text.includes("DESTINATION_PHOTO_PLACEHOLDER")) continue;
    for (const slugMatch of text.matchAll(/\bslug\s*:\s*["']([a-z0-9][a-z0-9-]{2,})["']/g)) {
      const candidate = parseCandidateRecord(text, slugMatch);
      if (!candidate || covered.has(candidate.slug) || candidates.has(candidate.slug)) continue;
      candidates.set(candidate.slug, { ...candidate, sourceFile: relative });
    }
  }
  return [...candidates.values()].sort((a, b) => a.slug.localeCompare(b.slug));
}

function overrideEntry(row) {
  return [`  ${JSON.stringify(row.slug)}: {`, `    src: ${JSON.stringify(row.src)},`, `    alt: ${JSON.stringify(row.alt)},`, `    width: ${row.width},`, `    height: ${row.height},`, `    credit: ${JSON.stringify(row.credit)},`, "  },"].join("\n");
}

async function appendOverrides(rows) {
  if (!rows.length) return;
  const source = await fs.readFile(OVERRIDES_PATH, "utf8");
  const index = source.lastIndexOf("\n};");
  if (index < 0) throw new Error("Destination hero override closing marker not found");
  const insertion = `\n${rows.map(overrideEntry).join("\n")}\n`;
  await fs.writeFile(OVERRIDES_PATH, `${source.slice(0, index)}${insertion}${source.slice(index)}`, "utf8");
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const [overrideSource, exploreMapSource, stateMapSource] = await Promise.all([
    fs.readFile(OVERRIDES_PATH, "utf8"),
    fs.readFile(EXPLORE_MAP_PATH, "utf8").catch(() => ""),
    fs.readFile(STATE_MAP_PATH, "utf8").catch(() => ""),
  ]);
  const covered = new Set([...keysFromMap(overrideSource), ...keysFromMap(exploreMapSource), ...keysFromMap(stateMapSource)]);
  const candidates = await discoverCandidates(covered);
  const usedTitles = new Set();
  const resolved = [];
  const unresolved = [];

  for (let index = 0; index < candidates.length; index += 1) {
    const destination = candidates[index];
    const outputRelative = `public/images/destination-heroes/${destination.slug}.jpg`;
    const destinationPath = path.join(ROOT, outputRelative);
    console.log(`[${index + 1}/${candidates.length}] ${destination.name}`);
    let source = "";
    let sourceTitle = "";
    let credit = "";
    let width = 1800;
    let height = 1013;
    try {
      const page = await chooseCommonsImage(destination, usedTitles);
      if (page) {
        const info = page.imageinfo?.[0];
        await downloadJpeg(info.thumburl || info.url, destinationPath);
        usedTitles.add(page.title);
        source = "free-use";
        sourceTitle = page.title;
        credit = creditFor(page);
        width = Number(info.thumbwidth || info.width || 1800);
        height = Number(info.thumbheight || info.height || 1013);
      }
    } catch (error) {
      console.warn(`  reusable-image lookup failed: ${error?.message || error}`);
    }
    if (!source) {
      try {
        await generateAiJpeg(destination, destinationPath);
        source = "ai-generated";
        credit = "AI-generated representative editorial image · Cloudflare Workers AI / FLUX.1 schnell · Texas Defined";
      } catch (error) {
        unresolved.push({ ...destination, error: String(error?.message || error) });
        continue;
      }
    }
    resolved.push({ ...destination, src: `/images/destination-heroes/${destination.slug}.jpg`, alt: source === "free-use" ? `${destination.name} in Texas` : `AI-generated representative editorial image for ${destination.name} in Texas`, width, height, credit, source, sourceTitle });
  }

  await appendOverrides(resolved);
  const report = {
    generatedAt: new Date().toISOString(),
    previouslyCovered: covered.size,
    targeted: candidates.length,
    resolved: resolved.length,
    freeUse: resolved.filter((row) => row.source === "free-use").length,
    aiGenerated: resolved.filter((row) => row.source === "ai-generated").length,
    unresolved,
    images: resolved.map(({ slug, name, sourceFile, src, source, sourceTitle, credit }) => ({ slug, name, sourceFile, src, source, sourceTitle, credit })),
  };
  await fs.writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({ targeted: report.targeted, resolved: report.resolved, freeUse: report.freeUse, aiGenerated: report.aiGenerated, unresolved: unresolved.length }, null, 2));
  if (unresolved.length) throw new Error(`${unresolved.length} destination placeholder hero(s) remain unresolved.`);
}

await main();
