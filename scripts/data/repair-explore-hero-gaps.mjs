import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const MAP_PATH = path.join(ROOT, "src/data/explore-hero-map.ts");
const REPORT_PATH = path.join(ROOT, "scripts/data/explore-hero-report.json");
const OUT_ROOT = path.join(ROOT, "public/images/explore");
const USER_AGENT = "TexasDefined/1.0 (Explore hero repair; https://texasdefined.com)";

const FREE_PHOTO_REPAIRS = [
  {
    slug: "fort-richardson-state-park-state-historic-site",
    name: "Fort Richardson State Park/State Historic Site",
    category: "historic-sites",
    commonsTitle: "File:0011Fort Richardson Officers Quarters Jacksboro Texas.jpg",
  },
  {
    slug: "hancock-springs-park",
    name: "Hancock Springs Park",
    category: "major-springs",
    commonsTitle: "File:Hancock Park Pool Lampasas Texas.jpg",
  },
  {
    slug: "village-creek-state-park",
    name: "Village Creek State Park",
    category: "lakes-rivers",
    commonsTitle: "File:Cane Slough Village Creek State Park Texas 2023.jpg",
  },
];

const GENERATED_REPAIRS = [
  {
    slug: "lipantitlan-state-historic-site",
    name: "Lipantitlan State Historic Site",
    category: "historic-sites",
  },
];

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

function creditFor(page) {
  const meta = page.imageinfo?.[0]?.extmetadata || {};
  const artist = cleanHtml(meta.Artist?.value || meta.Credit?.value || "Wikimedia Commons contributor");
  const license = cleanHtml(meta.LicenseShortName?.value || meta.UsageTerms?.value || "free license");
  return `${artist} · ${license} · Wikimedia Commons`;
}

async function commonsFile(title) {
  const params = new URLSearchParams({
    action: "query",
    titles: title,
    prop: "imageinfo",
    iiprop: "url|mime|size|extmetadata",
    iiurlwidth: "1600",
    format: "json",
    origin: "*",
  });
  const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`Commons API ${response.status} for ${title}`);
  const payload = await response.json();
  const page = Object.values(payload.query?.pages || {})[0];
  const info = page?.imageinfo?.[0];
  if (!page || !info || info.mime !== "image/jpeg") throw new Error(`No JPEG found for ${title}`);
  const license = cleanHtml(info.extmetadata?.LicenseShortName?.value || info.extmetadata?.UsageTerms?.value).toLowerCase();
  if (!/(public domain|cc0|cc by|cc-by)/i.test(license)) throw new Error(`License not approved for ${title}: ${license}`);
  return page;
}

async function downloadJpeg(page, destinationPath) {
  const info = page.imageinfo[0];
  const url = info.thumburl || info.url;
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT, Accept: "image/jpeg,image/*;q=0.8" } });
  if (!response.ok) throw new Error(`Image download ${response.status}: ${page.title}`);
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("image/jpeg")) throw new Error(`Expected JPEG for ${page.title}, got ${contentType}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 20000) throw new Error(`Image suspiciously small for ${page.title}`);
  await fs.mkdir(path.dirname(destinationPath), { recursive: true });
  await fs.writeFile(destinationPath, bytes);
  return {
    width: Number(info.thumbwidth || info.width || 1600),
    height: Number(info.thumbheight || info.height || 900),
  };
}

async function generateLipantitlan(destinationPath) {
  await fs.mkdir(path.dirname(destinationPath), { recursive: true });
  const args = [
    "-size", "1600x900",
    "gradient:#d6b37d-#6e8f9e",
    "-gravity", "south",
    "-fill", "#79694e", "-draw", "rectangle 0,650 1600,900",
    "-fill", "#8d7a54", "-draw", "polygon 0,690 220,620 450,680 720,610 1040,675 1300,625 1600,690 1600,900 0,900",
    "-fill", "#496553", "-draw", "ellipse 110,565 330,740 ellipse 370,590 580,750 ellipse 1120,575 1360,755 ellipse 1320,600 1540,760",
    "-fill", "#39584b", "-draw", "polygon 140,660 180,505 205,660 polygon 430,675 475,520 500,675 polygon 1210,675 1250,510 1275,675 polygon 1440,680 1480,535 1505,680",
    "-fill", "#8db0b3", "-draw", "polygon 0,770 350,730 670,760 980,715 1260,755 1600,720 1600,805 1250,795 980,820 650,790 330,815 0,800",
    "-fill", "#b59a67", "-draw", "polygon 620,900 700,760 815,740 930,900",
    "-fill", "#4f4335", "-draw", "rectangle 745,690 870,750 polygon 730,690 808,640 885,690",
    "-fill", "#c7ad79", "-draw", "rectangle 770,700 845,750",
    "-fill", "#3b352c", "-draw", "rectangle 800,715 820,750",
    "-quality", "88",
    destinationPath,
  ];
  await execFileAsync("convert", args);
  const stat = await fs.stat(destinationPath);
  if (stat.size < 20000) throw new Error("Generated Lipantitlan image is unexpectedly small");
}

function rowLine({ slug, src, alt, width, height, credit }) {
  return `  ${JSON.stringify(slug)}: { src: ${JSON.stringify(src)}, alt: ${JSON.stringify(alt)}, width: ${width}, height: ${height}, credit: ${JSON.stringify(credit)} },`;
}

function upsertMapRow(text, slug, line) {
  const escaped = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`^\\s*${JSON.stringify(slug).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}: \\{.*\\},\\s*$`, "m");
  if (pattern.test(text)) return text.replace(pattern, line);
  return text.replace(/\n};\s*$/, `\n${line}\n};\n`);
}

async function main() {
  let mapText = await fs.readFile(MAP_PATH, "utf8");
  const repairedFree = [];
  const generatedRepresentative = [];

  for (const repair of FREE_PHOTO_REPAIRS) {
    const page = await commonsFile(repair.commonsTitle);
    const relative = `/images/explore/${repair.category}/${repair.slug}.jpg`;
    const dimensions = await downloadJpeg(page, path.join(ROOT, relative.replace(/^\//, "public/")));
    mapText = upsertMapRow(mapText, repair.slug, rowLine({
      slug: repair.slug,
      src: relative,
      alt: `${repair.name} in Texas`,
      width: dimensions.width,
      height: dimensions.height,
      credit: creditFor(page),
    }));
    repairedFree.push({ slug: repair.slug, name: repair.name, category: repair.category, sourceTitle: repair.commonsTitle });
  }

  for (const repair of GENERATED_REPAIRS) {
    const relative = `/images/explore/${repair.category}/${repair.slug}.jpg`;
    await generateLipantitlan(path.join(ROOT, relative.replace(/^\//, "public/")));
    mapText = upsertMapRow(mapText, repair.slug, rowLine({
      slug: repair.slug,
      src: relative,
      alt: `Generated representative editorial landscape for ${repair.name}`,
      width: 1600,
      height: 900,
      credit: "Generated representative editorial illustration · Texas Defined",
    }));
    generatedRepresentative.push({ slug: repair.slug, name: repair.name, category: repair.category });
  }

  const entryMatches = [...mapText.matchAll(/^\s*"([^"]+)": \{ src: "([^"]+)"/gm)];
  const slugs = entryMatches.map((match) => match[1]);
  const sources = entryMatches.map((match) => match[2]);
  if (new Set(slugs).size !== slugs.length) throw new Error("Explore hero map contains duplicate slugs");
  if (new Set(sources).size !== sources.length) throw new Error("Explore hero map contains duplicate hero source paths");
  if (slugs.length !== 63) throw new Error(`Expected 63 reconciled non-state Explore heroes, found ${slugs.length}`);
  if (mapText.includes("Village Creek State Park Wynne AR")) throw new Error("Wrong-state Village Creek source remains in map");

  await fs.writeFile(MAP_PATH, mapText, "utf8");

  const report = JSON.parse(await fs.readFile(REPORT_PATH, "utf8"));
  report.repairedAt = new Date().toISOString();
  report.repairedFree = repairedFree;
  report.generatedRepresentative = generatedRepresentative;
  report.unresolved = [];
  report.aiGenerated = report.aiGenerated || [];
  if (report.byCategory?.["historic-sites"]) {
    report.byCategory["historic-sites"].downloaded = 29;
    report.byCategory["historic-sites"].generatedRepresentative = 1;
    report.byCategory["historic-sites"].unresolved = 0;
  }
  if (report.byCategory?.["major-springs"]) {
    report.byCategory["major-springs"].downloaded = 8;
    report.byCategory["major-springs"].generatedRepresentative = 0;
    report.byCategory["major-springs"].unresolved = 0;
  }
  report.validation = {
    reconciledHeroEntries: slugs.length,
    uniqueHeroSources: new Set(sources).size,
    unresolved: 0,
    wrongStateVillageCreekCorrected: true,
  };
  await fs.writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  console.log(JSON.stringify({ repairedFree: repairedFree.length, generatedRepresentative: generatedRepresentative.length, reconciledHeroEntries: slugs.length, unresolved: 0 }, null, 2));
}

await main();
