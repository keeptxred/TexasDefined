import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const REPORT = path.join(ROOT, "scripts/data/missing-site-image-report.json");
const USER_AGENT = "TexasDefined/1.0 (site image reconciliation; https://texasdefined.com)";
const LICENSE_OK = ["public domain", "cc0", "cc by", "cc-by", "cc by-sa", "cc-by-sa"];
const CLOUDFLARE_MODEL = "@cf/black-forest-labs/flux-1-schnell";
const API_GAP_MS = 550;
let lastRequest = 0;

const OVERRIDES = {
  "texas-barbecue-styles-unique": "Texas barbecue brisket smokehouse",
  "texas-home-maintenance-calendar-unique": "Texas house exterior residential",
  "texas-native-plants-yard-unique": "Texas native plants garden landscape",
  "texas-regions-explained-unique": "Texas landscape geography",
  "why-texas-has-254-counties-unique": "Texas courthouse county",
  "hill-country-identity": "Texas Hill Country landscape",
  "texas-courthouse-square": "Texas courthouse square historic",
  "texas-electricity-plan": "Texas power lines electricity",
  "texas-foundation-clay-drought": "Texas drought cracked clay soil house",
  "texas-freeze-prep": "Texas winter freeze house",
  "texas-hurricane-prep": "Texas Gulf Coast hurricane storm",
  "texas-roofs-hail-wind-heat": "Texas roof hail storm house",
  "texas-school-districts": "Texas public school building",
  "texas-special-districts": "Texas municipal water district infrastructure",
  "texas-town-cultural-roots": "Texas small town main street historic",
  "high-school-football-hero": "Texas high school football stadium Friday night",
  "kolache-klobasnek-hero": "Texas Czech kolache klobasnek bakery",
  "ordering-bbq-hero": "Texas barbecue counter brisket tray",
  "rodeo-101-hero": "Texas rodeo arena cowboy",
  "six-flags-hero": "Six Flags Over Texas Arlington amusement park",
};

const GENERIC = new Set(["texas", "unique", "hero", "what", "why", "how", "has", "the", "and", "for", "with", "from", "explained", "identity"]);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function cleanHtml(v) { return String(v || "").replace(/<[^>]*>/g, " ").replace(/&amp;/gi, "&").replace(/&nbsp;/gi, " ").replace(/&#39;|&apos;/gi, "'").replace(/&quot;/gi, '"').replace(/\s+/g, " ").trim(); }
function norm(v) { return cleanHtml(v).toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim(); }
function tokens(v) { return norm(v).split(" ").filter((t) => t.length > 2 && !GENERIC.has(t)); }
function imageAiConfigured() { return Boolean(process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN); }

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (["node_modules", "dist", "build"].includes(entry.name)) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(p)); else out.push(p);
  }
  return out;
}

async function paced(url, options = {}) {
  const elapsed = Date.now() - lastRequest;
  if (elapsed < API_GAP_MS) await sleep(API_GAP_MS - elapsed);
  lastRequest = Date.now();
  const r = await fetch(url, { ...options, headers: { "User-Agent": USER_AGENT, ...(options.headers || {}) } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r;
}

function licenseAllowed(meta) {
  const t = cleanHtml(meta?.LicenseShortName?.value || meta?.UsageTerms?.value).toLowerCase();
  return LICENSE_OK.some((x) => t.includes(x));
}

async function commonsSearch(query, limit = 50) {
  const p = new URLSearchParams({ action: "query", generator: "search", gsrsearch: query, gsrnamespace: "6", gsrlimit: String(limit), prop: "imageinfo", iiprop: "url|mime|size|extmetadata", iiurlwidth: "1600", format: "json", origin: "*" });
  const data = await (await paced(`https://commons.wikimedia.org/w/api.php?${p}`)).json();
  return Object.values(data.query?.pages || {});
}

function score(page, query, key) {
  const info = page.imageinfo?.[0];
  if (!info || info.mime !== "image/jpeg" || !licenseAllowed(info.extmetadata)) return -999;
  const meta = info.extmetadata || {};
  const evidence = norm([page.title, meta.ObjectName?.value, meta.ImageDescription?.value, meta.Categories?.value].map(cleanHtml).join(" "));
  const q = tokens(query);
  const k = tokens(key);
  let s = 0;
  for (const t of q) if (evidence.includes(t)) s += 8;
  for (const t of k) if (evidence.includes(t)) s += 12;
  if (evidence.includes("texas")) s += 12;
  const width = Number(info.thumbwidth || info.width || 0);
  if (width >= 1400) s += 5;
  if (/logo|map|diagram|seal|flag|sign only|icon/i.test(page.title || "")) s -= 15;
  return s;
}

async function choose(query, key, usedTitles) {
  const searches = [`\"${query}\"`, `${query} Texas`, query];
  let best = null;
  for (const q of searches) {
    const pages = await commonsSearch(q);
    for (const p of pages) {
      if (usedTitles.has(p.title)) continue;
      const s = score(p, query, key);
      if (!best || s > best.s) best = { p, s };
    }
    if (best?.s >= 35) break;
  }
  return best?.s >= 18 ? best.p : null;
}

async function normalizeJpeg(bytes, dest) {
  if (bytes.length < 12000) throw new Error("image too small");
  await fs.mkdir(path.dirname(dest), { recursive: true });
  const temp = `${dest}.tmp`;
  await fs.writeFile(temp, bytes);
  try {
    await execFileAsync("convert", [temp, "-auto-orient", "-strip", "-resize", "1600x1600>", "-quality", "88", dest]);
  } finally {
    await fs.rm(temp, { force: true });
  }
}

async function downloadJpeg(url, dest) {
  const r = await paced(url, { headers: { Accept: "image/jpeg,image/*;q=0.8" } });
  const bytes = Buffer.from(await r.arrayBuffer());
  await normalizeJpeg(bytes, dest);
}

function aiPrompt(query) {
  return [
    `Create a unique photorealistic editorial landscape image for this TexasDefined subject: ${query}.`,
    "Use the actual subject category and Texas setting as faithfully as the prompt supports, but do not invent a documentary claim that an exact camera view exists.",
    "Natural realistic photography aesthetic, 16:9 landscape composition, no text, no logos, no sponsor marks, no copyrighted poster art, no watermarks, no recognizable faces.",
    "The image must be suitable as a credible editorial hero, not an illustration, gradient, icon, collage, or abstract placeholder.",
  ].join(" ");
}

async function generateAiJpeg(query, dest) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) throw new Error("Cloudflare AI credentials unavailable");
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${CLOUDFLARE_MODEL}`;
  const r = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: aiPrompt(query).slice(0, 2048), steps: 4 }),
  });
  if (!r.ok) throw new Error(`Cloudflare Workers AI ${r.status}: ${(await r.text()).slice(0, 220)}`);
  const contentType = r.headers.get("content-type") || "";
  let bytes;
  if (contentType.includes("application/json")) {
    const payload = await r.json();
    const b64 = payload?.result?.image || payload?.image;
    if (!b64) throw new Error("Cloudflare Workers AI returned no image data");
    bytes = Buffer.from(b64, "base64");
  } else {
    bytes = Buffer.from(await r.arrayBuffer());
  }
  await normalizeJpeg(bytes, dest);
}

function creditFor(page) {
  const m = page.imageinfo?.[0]?.extmetadata || {};
  return `${cleanHtml(m.Artist?.value || m.Credit?.value || "Wikimedia Commons contributor")} · ${cleanHtml(m.LicenseShortName?.value || m.UsageTerms?.value || "free license")} · Wikimedia Commons`;
}

async function main() {
  const files = (await walk(SRC)).filter((p) => /\.(ts|tsx)$/.test(p));
  const refs = new Map();
  for (const file of files) {
    const text = await fs.readFile(file, "utf8");
    const re = /["'](@\/assets\/(?:generated\/[^"']+\.svg|[^"']*hero\.svg))["']/g;
    let m;
    while ((m = re.exec(text))) {
      const rel = m[1].replace(/^@\//, "src/");
      const base = path.basename(rel, ".svg");
      if (!refs.has(base)) refs.set(base, { base, svgRel: rel, files: [] });
      refs.get(base).files.push(file);
    }
  }

  const usedTitles = new Set();
  const rows = [];
  const unresolved = [];
  for (const item of refs.values()) {
    const query = OVERRIDES[item.base] || item.base.replace(/[-_]+/g, " ");
    const jpgRel = item.svgRel.replace(/\.svg$/i, ".jpg");
    const jpgAbs = path.join(ROOT, jpgRel);
    let resolved = false;
    let row = null;

    try {
      const page = await choose(query, item.base, usedTitles);
      if (page) {
        const info = page.imageinfo[0];
        await downloadJpeg(info.thumburl || info.url, jpgAbs);
        usedTitles.add(page.title);
        row = { key: item.base, query, jpeg: jpgRel, source: "free-use", credit: creditFor(page), sourceTitle: page.title, references: [...new Set(item.files)].map((f) => path.relative(ROOT, f)) };
        resolved = true;
      }
    } catch (e) {
      console.warn(`${item.base}: free-use lookup failed (${e.message})`);
    }

    if (!resolved) {
      try {
        await generateAiJpeg(query, jpgAbs);
        row = { key: item.base, query, jpeg: jpgRel, source: "ai-generated", credit: "AI-generated photorealistic editorial image · Cloudflare Workers AI / FLUX.1 schnell · Texas Defined", sourceTitle: "", references: [...new Set(item.files)].map((f) => path.relative(ROOT, f)) };
        resolved = true;
      } catch (e) {
        console.warn(`${item.base}: AI fallback failed (${e.message})`);
      }
    }

    if (!resolved) {
      unresolved.push({ key: item.base, query, svg: item.svgRel, references: [...new Set(item.files)].map((f) => path.relative(ROOT, f)) });
      console.error(`${item.base}: unresolved; preserving placeholder and failing closed`);
      continue;
    }

    for (const file of [...new Set(item.files)]) {
      const text = await fs.readFile(file, "utf8");
      const updated = text.split(item.svgRel.replace(/^src\//, "@/")).join(jpgRel.replace(/^src\//, "@/"));
      if (updated !== text) await fs.writeFile(file, updated, "utf8");
    }
    rows.push(row);
    console.log(`${item.base}: ${row.source}${row.sourceTitle ? ` — ${row.sourceTitle}` : ""}`);
  }

  const remaining = [];
  for (const file of files) {
    const text = await fs.readFile(file, "utf8");
    for (const line of text.split(/\r?\n/)) {
      if (/texasdefined-(?:destination-)?placeholder\.svg/.test(line) || /assets\/(?:generated\/[^"']+\.svg|[^"']*hero\.svg)/.test(line)) {
        remaining.push({ file: path.relative(ROOT, file), line: line.trim().slice(0, 240) });
      }
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    targeted: refs.size,
    resolved: rows.length,
    freeUse: rows.filter((r) => r.source === "free-use").length,
    aiGenerated: rows.filter((r) => r.source === "ai-generated").length,
    unresolved,
    aiAvailable: imageAiConfigured(),
    remainingPublishedSvgOrPlaceholderRefs: remaining,
    images: rows,
  };
  await fs.writeFile(REPORT, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ targeted: report.targeted, resolved: report.resolved, freeUse: report.freeUse, aiGenerated: report.aiGenerated, unresolved: unresolved.length, remaining: remaining.length }, null, 2));

  if (unresolved.length > 0) {
    throw new Error(`${unresolved.length} image target(s) remain unresolved; no procedural placeholder was substituted.`);
  }
}

await main();
