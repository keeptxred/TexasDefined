#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const DRY_RUN = process.argv.includes("--dry-run");
const OUTPUT_PATH = resolve("src/data/generated/texas-events.ts");

const SOURCES = [
  {
    key: "tpwd-calendar",
    name: "Texas Parks and Wildlife Department",
    url: "https://tpwd.texas.gov/calendar",
    authority: 100,
    kind: "tpwd-html",
  },
];

const ANNUAL_EVENTS = [
  ["state-fair-of-texas", "State Fair of Texas", "Dallas", "prairies-lakes", "seasonal", "https://bigtex.com/", 98],
  ["houston-livestock-show-and-rodeo", "Houston Livestock Show and Rodeo", "Houston", "gulf-coast", "rodeo", "https://www.rodeohouston.com/", 98],
  ["fiesta-san-antonio", "Fiesta San Antonio", "San Antonio", "south-texas", "culture", "https://fiestasanantonio.org/", 96],
  ["wurstfest", "Wurstfest", "New Braunfels", "hill-country", "food", "https://wurstfest.com/", 94],
  ["ennis-bluebonnet-trails", "Ennis Bluebonnet Trails", "Ennis", "prairies-lakes", "seasonal", "https://www.bluebonnettrail.org/", 92],
  ["marfa-lights-festival", "Marfa Lights Festival", "Marfa", "big-bend", "music", "https://visitmarfa.com/", 88],
];

function stripHtml(value) {
  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return stripHtml(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90);
}

function regionFromPlace(place) {
  const value = String(place || "").toLowerCase();
  if (/marfa|alpine|terlingua|fort davis|big bend/.test(value)) return "big-bend";
  if (/amarillo|canyon|lubbock|palo duro|caprock/.test(value)) return "panhandle";
  if (/beaumont|tyler|nacogdoches|caddo|east texas/.test(value)) return "piney-woods";
  if (/corpus|galveston|houston|port aransas|coast/.test(value)) return "gulf-coast";
  if (/san antonio|laredo|mcallen|brownsville|valley/.test(value)) return "south-texas";
  if (/austin|fredericksburg|wimberley|new braunfels|hill country/.test(value)) return "hill-country";
  return "prairies-lakes";
}

function categoryFromText(value) {
  const text = String(value || "").toLowerCase();
  if (/rodeo|livestock/.test(text)) return "rodeo";
  if (/concert|music|dance/.test(text)) return "music";
  if (/food|cook|fair|festival/.test(text)) return "food";
  if (/run|race|sport|bike/.test(text)) return "sport";
  if (/history|culture|art|museum|heritage/.test(text)) return "culture";
  return "seasonal";
}

function editorialBlurb(name, category, venue, city) {
  const place = venue && venue !== city ? `${venue} in ${city}` : city || venue || "Texas";
  const templates = {
    rodeo: `${name} brings rodeo, livestock traditions and a full Texas crowd to ${place}.`,
    music: `${name} puts live music and a strong sense of place on the calendar in ${place}.`,
    food: `${name} is the kind of Texas gathering built around food, local tradition and a reason to make the drive to ${place}.`,
    sport: `${name} gives visitors a reason to get outside and join the action in ${place}.`,
    culture: `${name} celebrates Texas history, art and local culture in ${place}.`,
    seasonal: `${name} is a timely Texas outing worth planning around in ${place}.`,
  };
  return templates[category] || templates.seasonal;
}

function parseTpwd(html) {
  const rows = [];
  const blockPattern = /<h3[^>]*>\s*<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/h3>([\s\S]*?)(?=<h3|<h2|$)/gi;
  let match;
  while ((match = blockPattern.exec(html))) {
    const href = new URL(match[1], "https://tpwd.texas.gov").toString();
    const name = stripHtml(match[2]);
    const tail = stripHtml(match[3]);
    const dateMatch = match[0].match(/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2}(?:,\s+\d{4})?/i);
    if (!name || !dateMatch) continue;
    const hasYear = /20\d{2}/.test(dateMatch[0]);
    const parsed = new Date(hasYear ? dateMatch[0] : `${dateMatch[0]}, ${new Date().getFullYear()}`);
    if (Number.isNaN(parsed.getTime())) continue;
    if (!hasYear && parsed < new Date(Date.now() - 86400000 * 2)) parsed.setFullYear(parsed.getFullYear() + 1);
    const venue = tail.split(/(?<=[.!?])\s/)[0]?.slice(0, 120) || "Texas state park";
    const city = venue.replace(/State Park|State Natural Area|Historic Site/gi, "").trim() || "Texas";
    const startDate = parsed.toISOString().slice(0, 10);
    const category = categoryFromText(`${name} ${tail}`);
    const editorialScore = /festival|fair|rodeo|concert|star|paddle|bird|history|tour/i.test(`${name} ${tail}`) ? 84 : 68;
    rows.push({
      id: `tpwd:${slugify(name)}:${startDate}`,
      brandId: "texasdefined",
      slug: `${slugify(name)}-${startDate}`,
      name,
      blurb: editorialBlurb(name, category, venue, city),
      city,
      region: regionFromPlace(venue),
      startDate,
      category,
      venue,
      officialUrl: href,
      sourceName: "Texas Parks and Wildlife Department",
      sourceCheckedAt: new Date().toISOString(),
      confidenceScore: 94,
      editorialScore,
      status: "published",
      autoPublish: true,
    });
  }
  return rows;
}

async function fetchText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "user-agent": "TexasDefined event calendar (+https://texasdefined.com)" },
    });
    if (!response.ok) throw new Error(`${url} returned ${response.status}`);
    return response.text();
  } finally {
    clearTimeout(timer);
  }
}

function dateCandidates(text) {
  return [...text.matchAll(/(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:\s*[–-]\s*\d{1,2})?,?\s+20\d{2}/gi)].map((item) => item[0]);
}

async function annualAnchorRows() {
  const rows = [];
  for (const [key, name, city, region, category, url, score] of ANNUAL_EVENTS) {
    try {
      const html = await fetchText(url);
      const text = stripHtml(html).slice(0, 30000);
      const candidate = dateCandidates(text).find((item) => {
        const first = item.split(/[–-]/)[0].trim();
        const date = new Date(first);
        return !Number.isNaN(date.getTime()) && date.getTime() >= Date.now() - 86400000 * 7;
      });
      if (!candidate) continue;
      const firstDate = candidate.split(/[–-]/)[0].trim();
      const parsed = new Date(firstDate);
      if (Number.isNaN(parsed.getTime())) continue;
      const startDate = parsed.toISOString().slice(0, 10);
      rows.push({
        id: `official:${key}:${startDate}`,
        brandId: "texasdefined",
        slug: `${key}-${startDate}`,
        name,
        blurb: editorialBlurb(name, category, city, city),
        city,
        region,
        startDate,
        category,
        venue: city,
        officialUrl: url,
        sourceName: name,
        sourceCheckedAt: new Date().toISOString(),
        confidenceScore: score,
        editorialScore: score,
        status: score >= 90 ? "published" : "pending",
        autoPublish: score >= 90,
      });
    } catch (error) {
      console.warn(`Annual source ${name} skipped: ${error.message}`);
    }
  }
  return rows;
}

function dedupe(rows) {
  const map = new Map();
  for (const row of rows) {
    const key = `${slugify(row.name)}:${row.startDate}:${slugify(row.city)}`;
    const current = map.get(key);
    if (!current || row.confidenceScore + row.editorialScore > current.confidenceScore + current.editorialScore) map.set(key, row);
  }
  return [...map.values()];
}

function sortRows(rows) {
  return [...rows].sort((a, b) => a.startDate.localeCompare(b.startDate) || b.editorialScore - a.editorialScore || b.confidenceScore - a.confidenceScore);
}

async function writeGeneratedCatalog(rows) {
  const header = `// AUTO-GENERATED by scripts/events/sync-texas-events.mjs.\n// Do not hand-edit; the scheduled Sync Texas Events workflow refreshes this file.\n\n`;
  const body = `export const generatedTexasEvents = ${JSON.stringify(rows, null, 2)} as const;\n`;
  if (DRY_RUN) {
    console.log(body);
    return;
  }
  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, header + body, "utf8");
}

const collected = [];
for (const source of SOURCES) {
  try {
    const html = await fetchText(source.url);
    if (source.kind === "tpwd-html") collected.push(...parseTpwd(html));
  } catch (error) {
    console.warn(`${source.name} skipped: ${error.message}`);
  }
}
collected.push(...await annualAnchorRows());

const rows = sortRows(dedupe(collected).filter((row) => row.startDate && row.officialUrl && row.blurb));
if (!rows.length) {
  console.warn("Texas events sync found no usable events; existing generated catalog was left unchanged.");
  process.exit(0);
}

await writeGeneratedCatalog(rows);
console.log(`Texas events sync complete: ${rows.length} authoritative events written to ${OUTPUT_PATH}.`);
