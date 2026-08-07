import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const root = process.cwd();
const mapPath = path.join(root, "src/data/explore-hero-map.ts");
const reportPath = path.join(root, "scripts/data/explore-hero-report.json");
const userAgent = "TexasDefined/1.0 (Explore hero final repair; https://texasdefined.com)";

const free = [
  ["fort-richardson-state-park-state-historic-site", "Fort Richardson State Park/State Historic Site", "historic-sites", "File:0011Fort Richardson Officers Quarters Jacksboro Texas.jpg"],
  ["hancock-springs-park", "Hancock Springs Park", "major-springs", "File:Hancock Park Pool Lampasas Texas.jpg"],
  ["village-creek-state-park", "Village Creek State Park", "lakes-rivers", "File:Cane Slough Village Creek State Park Texas 2023.jpg"],
];

const clean = (v) => String(v || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&#39;|&apos;/gi, "'").replace(/&quot;/gi, '"').replace(/\s+/g, " ").trim();

async function commons(title) {
  const q = new URLSearchParams({ action: "query", titles: title, prop: "imageinfo", iiprop: "url|mime|size|extmetadata", iiurlwidth: "1600", format: "json", origin: "*" });
  const r = await fetch(`https://commons.wikimedia.org/w/api.php?${q}`, { headers: { "User-Agent": userAgent } });
  if (!r.ok) throw new Error(`Commons ${r.status}: ${title}`);
  const p = Object.values((await r.json()).query?.pages || {})[0];
  const i = p?.imageinfo?.[0];
  if (!i || i.mime !== "image/jpeg") throw new Error(`No JPEG: ${title}`);
  const license = clean(i.extmetadata?.LicenseShortName?.value || i.extmetadata?.UsageTerms?.value);
  if (!/(public domain|cc0|cc by|cc-by)/i.test(license)) throw new Error(`Unapproved license ${license}: ${title}`);
  return p;
}

async function download(page, out) {
  const i = page.imageinfo[0];
  const r = await fetch(i.thumburl || i.url, { headers: { "User-Agent": userAgent, Accept: "image/jpeg,image/*" } });
  if (!r.ok) throw new Error(`Download ${r.status}: ${page.title}`);
  const b = Buffer.from(await r.arrayBuffer());
  if (b.length < 20000) throw new Error(`Small JPEG: ${page.title}`);
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, b);
  const meta = i.extmetadata || {};
  return {
    width: Number(i.thumbwidth || i.width || 1600),
    height: Number(i.thumbheight || i.height || 900),
    credit: `${clean(meta.Artist?.value || meta.Credit?.value || "Wikimedia Commons contributor")} · ${clean(meta.LicenseShortName?.value || meta.UsageTerms?.value || "free license")} · Wikimedia Commons`,
  };
}

function line(slug, src, alt, width, height, credit) {
  return `  ${JSON.stringify(slug)}: { src: ${JSON.stringify(src)}, alt: ${JSON.stringify(alt)}, width: ${width}, height: ${height}, credit: ${JSON.stringify(credit)} },`;
}

function upsert(text, slug, replacement) {
  const lines = text.split("\n");
  const prefix = `  ${JSON.stringify(slug)}:`;
  const index = lines.findIndex((x) => x.startsWith(prefix));
  if (index >= 0) lines[index] = replacement;
  else {
    const close = lines.findIndex((x) => x.trim() === "};");
    if (close < 0) throw new Error("Explore hero map closing brace not found");
    lines.splice(close, 0, replacement);
  }
  return lines.join("\n");
}

async function generateLipantitlan(out) {
  await fs.mkdir(path.dirname(out), { recursive: true });
  await execFileAsync("convert", [
    "-size", "1600x900", "gradient:#d6b37d-#6e8f9e",
    "-fill", "#79694e", "-draw", "rectangle 0,650 1600,900",
    "-fill", "#8d7a54", "-draw", "polygon 0,690 220,620 450,680 720,610 1040,675 1300,625 1600,690 1600,900 0,900",
    "-fill", "#496553", "-draw", "circle 220,650 220,560 circle 470,675 470,590 circle 1240,675 1240,575 circle 1450,680 1450,600",
    "-fill", "#39584b", "-draw", "polygon 140,660 180,505 205,660 polygon 430,675 475,520 500,675 polygon 1210,675 1250,510 1275,675 polygon 1440,680 1480,535 1505,680",
    "-fill", "#8db0b3", "-draw", "polygon 0,770 350,730 670,760 980,715 1260,755 1600,720 1600,805 1250,795 980,820 650,790 330,815 0,800",
    "-fill", "#b59a67", "-draw", "polygon 620,900 700,760 815,740 930,900",
    "-fill", "#4f4335", "-draw", "rectangle 745,690 870,750 polygon 730,690 808,640 885,690",
    "-fill", "#c7ad79", "-draw", "rectangle 770,700 845,750",
    "-fill", "#3b352c", "-draw", "rectangle 800,715 820,750",
    "-quality", "88", out,
  ]);
  if ((await fs.stat(out)).size < 20000) throw new Error("Generated Lipantitlan JPEG is too small");
}

let map = await fs.readFile(mapPath, "utf8");
const repairedFree = [];
for (const [slug, name, category, title] of free) {
  const page = await commons(title);
  const src = `/images/explore/${category}/${slug}.jpg`;
  const meta = await download(page, path.join(root, "public", src.replace(/^\/images\//, "images/")));
  map = upsert(map, slug, line(slug, src, `${name} in Texas`, meta.width, meta.height, meta.credit));
  repairedFree.push({ slug, name, category, sourceTitle: title });
}

const lipSlug = "lipantitlan-state-historic-site";
const lipSrc = `/images/explore/historic-sites/${lipSlug}.jpg`;
await generateLipantitlan(path.join(root, "public", lipSrc.replace(/^\/images\//, "images/")));
map = upsert(map, lipSlug, line(lipSlug, lipSrc, "Generated representative editorial landscape for Lipantitlan State Historic Site", 1600, 900, "Generated representative editorial illustration · Texas Defined"));

const entries = [...map.matchAll(/^\s*"([^"]+)": \{ src: "([^"]+)"/gm)];
const slugs = entries.map((m) => m[1]);
const sources = entries.map((m) => m[2]);
if (slugs.length !== 63) throw new Error(`Expected 63 reconciled Explore heroes, found ${slugs.length}`);
if (new Set(slugs).size !== slugs.length) throw new Error("Duplicate Explore hero slugs detected");
if (new Set(sources).size !== sources.length) throw new Error("Duplicate Explore hero paths detected");
if (/Wynne AR|Arkansas/i.test(map)) throw new Error("Wrong-state Village Creek source remains");
if (/texasdefined-(?:destination-)?placeholder/i.test(map)) throw new Error("Placeholder remains in Explore hero map");
await fs.writeFile(mapPath, map, "utf8");

const report = JSON.parse(await fs.readFile(reportPath, "utf8"));
report.repairedAt = new Date().toISOString();
report.repairedFree = repairedFree;
report.generatedRepresentative = [{ slug: lipSlug, name: "Lipantitlan State Historic Site", category: "historic-sites" }];
report.unresolved = [];
if (report.byCategory?.["historic-sites"]) Object.assign(report.byCategory["historic-sites"], { downloaded: 29, generatedRepresentative: 1, unresolved: 0 });
if (report.byCategory?.["major-springs"]) Object.assign(report.byCategory["major-springs"], { downloaded: 8, generatedRepresentative: 0, unresolved: 0 });
report.validation = { reconciledHeroEntries: 63, uniqueHeroSources: 63, unresolved: 0, wrongStateVillageCreekCorrected: true };
await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report.validation));
