import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const REPORT = path.join(ROOT, "scripts/data/direct-svg-hero-report.json");
const USER_AGENT = "TexasDefined/1.0 (zero-SVG hero remediation; https://texasdefined.com)";
const LICENSE_OK = ["public domain", "cc0", "cc by", "cc-by", "cc by-sa", "cc-by-sa"];
const CLOUDFLARE_MODEL = "@cf/black-forest-labs/flux-1-schnell";
const API_GAP_MS = 550;
let lastRequest = 0;

const PLACEHOLDER_MARKERS = ["texasdefined-destination-placeholder.svg", "texasdefined-placeholder.svg"];
const GENERIC_WORDS = new Set(["texas", "hero", "image", "editorial", "guide", "explained", "the", "and", "for", "with", "from"]);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const cleanHtml = (value) => String(value || "").replace(/<[^>]*>/g, " ").replace(/&amp;/gi, "&").replace(/&nbsp;/gi, " ").replace(/&#39;|&apos;/gi, "'").replace(/&quot;/gi, '"').replace(/\s+/g, " ").trim();
const normalize = (value) => cleanHtml(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
const tokens = (value) => normalize(value).split(" ").filter((token) => token.length > 2 && !GENERIC_WORDS.has(token));
const isSvgUrl = (value) => /\.svg(?:$|[?#])/i.test(String(value || "")) || /^data:image\/svg\+xml/i.test(String(value || ""));
const isPlaceholder = (value) => PLACEHOLDER_MARKERS.some((marker) => String(value || "").includes(marker));
const imageAiConfigured = () => Boolean(process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN);

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
    const elapsed = Date.now() - lastRequest;
    if (elapsed < API_GAP_MS) await sleep(API_GAP_MS - elapsed);
    lastRequest = Date.now();
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
  return LICENSE_OK.some((allowed) => value.includes(allowed)) && !/noncommercial|no derivatives|\bnc\b|\bnd\b/i.test(value);
}

async function commonsSearch(query, limit = 50) {
  const params = new URLSearchParams({ action: "query", generator: "search", gsrsearch: query, gsrnamespace: "6", gsrlimit: String(limit), prop: "imageinfo", iiprop: "url|mime|size|extmetadata", iiurlwidth: "1800", format: "json", origin: "*" });
  const response = await pacedFetch(`https://commons.wikimedia.org/w/api.php?${params}`, { headers: { Accept: "application/json" } });
  return Object.values((await response.json()).query?.pages || {});
}

function candidateEvidence(page) {
  const info = page.imageinfo?.[0];
  const metadata = info?.extmetadata || {};
  return [page.title, metadata.ObjectName?.value, metadata.ImageDescription?.value, metadata.Categories?.value].map(cleanHtml).join(" ");
}

function scoreCandidate(page, query, key) {
  const info = page.imageinfo?.[0];
  if (!info || info.mime !== "image/jpeg" || !licenseAllowed(info.extmetadata)) return -999;
  const evidence = normalize(candidateEvidence(page));
  let score = 0;
  for (const token of tokens(query)) if (evidence.includes(token)) score += 9;
  for (const token of tokens(key)) if (evidence.includes(token)) score += 14;
  if (evidence.includes("texas")) score += 10;
  if (Number(info.thumbwidth || info.width || 0) >= 1400) score += 6;
  if (/logo|seal|map|diagram|flag|icon|poster|brochure|screenshot/i.test(page.title || "")) score -= 35;
  return score;
}

async function chooseFreeImage(query, key, usedTitles) {
  const searches = [`\"${query}\"`, `${query} Texas`, query];
  let best = null;
  for (const search of searches) {
    for (const page of await commonsSearch(search)) {
      if (!page?.title || usedTitles.has(page.title)) continue;
      const score = scoreCandidate(page, query, key);
      if (!best || score > best.score) best = { page, score };
    }
    if (best?.score >= 45) break;
  }
  return best?.score >= 22 ? best.page : null;
}

async function normalizeJpeg(bytes, destinationPath) {
  if (bytes.length < 12000) throw new Error(`image too small (${bytes.length} bytes)`);
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

function aiPrompt(query) {
  return [
    `Create a unique photorealistic editorial hero photograph for this TexasDefined subject: ${query}.`,
    "Ground the scene in the named Texas subject and documented setting implied by the prompt. Do not invent a famous landmark, logo, sponsor mark, exact sign text, or a documentary claim that an exact camera view exists.",
    "Natural realistic photography, credible Texas light and weather, 16:9 landscape composition, no text, no logos, no watermarks, no recognizable private individuals.",
    "This must look like a high-quality editorial photograph, never an illustration, vector graphic, gradient, collage, icon, map, or procedural placeholder.",
  ].join(" ");
}

async function generateAiJpeg(query, destinationPath) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) throw new Error("Cloudflare AI credentials unavailable");
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${CLOUDFLARE_MODEL}`;
  const response = await fetch(endpoint, { method: "POST", headers: { Authorization: `Bearer ${apiToken}`, "Content-Type": "application/json" }, body: JSON.stringify({ prompt: aiPrompt(query).slice(0, 2048), steps: 4 }) });
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

function nearestIdentity(text, index, fallback) {
  const before = text.slice(Math.max(0, index - 5000), index);
  const after = text.slice(index, Math.min(text.length, index + 1000));
  const slugMatches = [...before.matchAll(/(?:slug\s*:\s*|^[ \t]*["'])([a-z0-9][a-z0-9-]{3,})["']?\s*(?::|,)/gm)];
  const titleMatches = [...before.matchAll(/(?:title|name)\s*:\s*["']([^"']{5,180})["']/g)];
  const altMatch = after.match(/alt\s*:\s*["']([^"']{8,220})["']/);
  const slug = slugMatches.at(-1)?.[1] || fallback;
  const label = altMatch?.[1] || titleMatches.at(-1)?.[1] || slug.replace(/[-_]+/g, " ");
  return { slug, query: label };
}

function safeKey(value) {
  return String(value || "hero").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120) || "hero";
}

function targetForReference(reference, text, index) {
  if (!isSvgUrl(reference) || isPlaceholder(reference)) return null;
  const basename = path.basename(reference.split(/[?#]/)[0], ".svg");
  const identity = nearestIdentity(text, index, basename);
  const key = safeKey(identity.slug || basename);
  if (reference.startsWith("@/assets/")) {
    const relative = reference.replace(/^@\//, "src/").replace(/\.svg(?:$|[?#].*)/i, ".jpg");
    return { reference, outputRelative: relative, replacement: relative.replace(/^src\//, "@/"), key, query: identity.query };
  }
  if (reference.startsWith("/images/")) {
    const relative = `public${reference.split(/[?#]/)[0]}`.replace(/\.svg$/i, ".jpg");
    return { reference, outputRelative: relative, replacement: relative.replace(/^public/, ""), key, query: identity.query };
  }
  if (/^https?:\/\//i.test(reference)) {
    const relative = `public/images/generated/heroes/${key}.jpg`;
    return { reference, outputRelative: relative, replacement: relative.replace(/^public/, ""), key, query: identity.query };
  }
  return null;
}

function collectTargets(file, text) {
  const targets = [];
  const seen = new Set();
  const regexes = [
    /["'](@\/assets\/[^"']+\.svg(?:\?[^"']*)?)["']/gi,
    /src\s*:\s*["']((?:\/images\/|https?:\/\/)[^"']+\.svg(?:\?[^"']*)?)["']/gi,
    /hero\s*:\s*\w+\(\s*["']((?:\/images\/|https?:\/\/)[^"']+\.svg(?:\?[^"']*)?)["']/gi,
  ];
  for (const regex of regexes) {
    for (const match of text.matchAll(regex)) {
      const reference = match[1];
      if (seen.has(reference) || isPlaceholder(reference)) continue;
      const nearby = text.slice(Math.max(0, match.index - 800), Math.min(text.length, match.index + 800));
      if (!/hero|src\s*:|Hero/.test(nearby)) continue;
      const target = targetForReference(reference, text, match.index);
      if (!target) continue;
      target.file = file;
      seen.add(reference);
      targets.push(target);
    }
  }
  return targets;
}

async function main() {
  const sourceFiles = (await walk(SRC)).filter((file) => /\.(ts|tsx)$/.test(file));
  const targetsByReference = new Map();
  for (const file of sourceFiles) {
    const text = await fs.readFile(file, "utf8");
    for (const target of collectTargets(file, text)) {
      const current = targetsByReference.get(target.reference) || { ...target, files: [] };
      current.files.push(file);
      targetsByReference.set(target.reference, current);
    }
  }

  const usedTitles = new Set();
  const resolved = [];
  const unresolved = [];
  for (const target of targetsByReference.values()) {
    const destinationPath = path.join(ROOT, target.outputRelative);
    let source = "";
    let sourceTitle = "";
    let credit = "";
    try {
      const page = await chooseFreeImage(target.query, target.key, usedTitles);
      if (page) {
        const info = page.imageinfo?.[0];
        await downloadJpeg(info.thumburl || info.url, destinationPath);
        usedTitles.add(page.title);
        source = "free-use";
        sourceTitle = page.title;
        credit = creditFor(page);
      }
    } catch (error) {
      console.warn(`${target.key}: reusable-image lookup failed (${error?.message || error})`);
    }
    if (!source) {
      try {
        await generateAiJpeg(target.query, destinationPath);
        source = "ai-generated";
        credit = "AI-generated photorealistic editorial image · Cloudflare Workers AI / FLUX.1 schnell · Texas Defined";
      } catch (error) {
        unresolved.push({ reference: target.reference, key: target.key, query: target.query, files: target.files.map((file) => path.relative(ROOT, file)), error: String(error?.message || error) });
        continue;
      }
    }
    for (const file of [...new Set(target.files)]) {
      const text = await fs.readFile(file, "utf8");
      const updated = text.split(target.reference).join(target.replacement);
      if (updated !== text) await fs.writeFile(file, updated, "utf8");
    }
    resolved.push({ reference: target.reference, replacement: target.replacement, output: target.outputRelative, key: target.key, query: target.query, source, sourceTitle, credit, files: [...new Set(target.files)].map((file) => path.relative(ROOT, file)) });
    console.log(`${target.key}: ${source}${sourceTitle ? ` — ${sourceTitle}` : ""}`);
  }

  const remaining = [];
  for (const file of sourceFiles) {
    const text = await fs.readFile(file, "utf8");
    for (const match of text.matchAll(/(?:src\s*:\s*|hero\s*:\s*\w+\(\s*)["']([^"']+)["']/gi)) {
      if (isSvgUrl(match[1]) && !isPlaceholder(match[1])) remaining.push({ file: path.relative(ROOT, file), reference: match[1] });
    }
  }
  const report = {
    generatedAt: new Date().toISOString(),
    targeted: targetsByReference.size,
    resolved: resolved.length,
    freeUse: resolved.filter((item) => item.source === "free-use").length,
    aiGenerated: resolved.filter((item) => item.source === "ai-generated").length,
    unresolved,
    remainingDirectSvgHeroReferences: remaining,
    aiAvailable: imageAiConfigured(),
    images: resolved,
  };
  await fs.writeFile(REPORT, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({ targeted: report.targeted, resolved: report.resolved, freeUse: report.freeUse, aiGenerated: report.aiGenerated, unresolved: unresolved.length, remaining: remaining.length }, null, 2));
  if (unresolved.length || remaining.length) throw new Error(`SVG hero remediation is incomplete: ${unresolved.length} unresolved target(s), ${remaining.length} direct SVG hero reference(s) remain.`);
}

await main();
