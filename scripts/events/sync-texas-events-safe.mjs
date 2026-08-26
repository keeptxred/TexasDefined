#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const OUTPUT_PATH = resolve("src/data/generated/texas-events.ts");
const NOW = new Date();
const TODAY = new Date(Date.UTC(NOW.getUTCFullYear(), NOW.getUTCMonth(), NOW.getUTCDate()));
const HORIZON = new Date(TODAY);
HORIZON.setUTCMonth(HORIZON.getUTCMonth() + 18);

const EVENTS = [
  { key: "state-fair-of-texas", name: "State Fair of Texas", city: "Dallas", region: "prairies-lakes", category: "seasonal", url: "https://bigtex.com/", score: 98, months: [9, 10] },
  { key: "houston-livestock-show-and-rodeo", name: "Houston Livestock Show and Rodeo", city: "Houston", region: "gulf-coast", category: "rodeo", url: "https://www.rodeohouston.com/", score: 98, months: [2, 3] },
  { key: "fiesta-san-antonio", name: "Fiesta San Antonio", city: "San Antonio", region: "south-texas", category: "culture", url: "https://fiestasanantonio.org/", score: 96, months: [4] },
  { key: "wurstfest", name: "Wurstfest", city: "New Braunfels", region: "hill-country", category: "food", url: "https://wurstfest.com/", score: 94, months: [11] },
  { key: "ennis-bluebonnet-trails", name: "Ennis Bluebonnet Trails", city: "Ennis", region: "prairies-lakes", category: "seasonal", url: "https://www.bluebonnettrail.org/", score: 92, months: [4] },
  { key: "marfa-lights-festival", name: "Marfa Lights Festival", city: "Marfa", region: "big-bend", category: "music", url: "https://visitmarfa.com/", score: 88, months: [8, 9] },
];

const MONTHS = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

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
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90);
}

function editorialBlurb(event) {
  const templates = {
    rodeo: `${event.name} brings rodeo, livestock traditions and a full Texas crowd to ${event.city}.`,
    music: `${event.name} puts live music and a strong sense of place on the calendar in ${event.city}.`,
    food: `${event.name} is the kind of Texas gathering built around food, local tradition and a reason to make the drive to ${event.city}.`,
    culture: `${event.name} celebrates Texas history, local culture and a city-wide reason to show up in ${event.city}.`,
    seasonal: `${event.name} is one of those Texas traditions worth planning a weekend around in ${event.city}.`,
  };
  return templates[event.category] || `${event.name} is an upcoming Texas event worth putting on the calendar.`;
}

async function fetchText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "user-agent": "TexasDefined event calendar (+https://texasdefined.com)" },
    });
    if (!response.ok) throw new Error(`${response.status}`);
    return stripHtml(await response.text()).slice(0, 60000);
  } finally {
    clearTimeout(timer);
  }
}

function parseDate(monthName, dayText, yearText) {
  const month = MONTHS[monthName.toLowerCase()];
  const day = Number(dayText);
  const year = Number(yearText);
  if (!month || !day || !year) return null;
  const date = new Date(Date.UTC(year, month - 1, day));
  return Number.isNaN(date.getTime()) ? null : date;
}

function validForEvent(date, event) {
  if (!date || date < TODAY || date > HORIZON) return false;
  return event.months.includes(date.getUTCMonth() + 1);
}

function findDates(text, event) {
  const candidates = [];
  const rangePattern = /(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})\s*(?:[-–—]|to)\s*(\d{1,2}),?\s+(20\d{2})/gi;
  for (const match of text.matchAll(rangePattern)) {
    const start = parseDate(match[1], match[2], match[4]);
    const end = parseDate(match[1], match[3], match[4]);
    if (validForEvent(start, event)) candidates.push({ start, end: validForEvent(end, event) ? end : undefined, raw: match[0] });
  }

  const singlePattern = /(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),?\s+(20\d{2})/gi;
  for (const match of text.matchAll(singlePattern)) {
    const start = parseDate(match[1], match[2], match[3]);
    if (validForEvent(start, event)) candidates.push({ start, raw: match[0] });
  }

  candidates.sort((a, b) => a.start - b.start);
  return candidates;
}

function iso(date) {
  return date.toISOString().slice(0, 10);
}

async function collectEvent(event) {
  try {
    const text = await fetchText(event.url);
    const nameIndex = text.toLowerCase().indexOf(event.name.toLowerCase());
    const nearby = nameIndex >= 0 ? text.slice(Math.max(0, nameIndex - 5000), nameIndex + 12000) : text;
    let candidates = findDates(nearby, event);
    if (!candidates.length) candidates = findDates(text, event);
    if (!candidates.length) {
      console.warn(`${event.name}: no plausible official date found in expected months.`);
      return null;
    }

    const chosen = candidates[0];
    const startDate = iso(chosen.start);
    return {
      id: `official:${event.key}:${startDate}`,
      brandId: "texasdefined",
      slug: `${event.key}-${startDate}`,
      name: event.name,
      blurb: editorialBlurb(event),
      city: event.city,
      region: event.region,
      startDate,
      ...(chosen.end ? { endDate: iso(chosen.end) } : {}),
      category: event.category,
      venue: event.city,
      officialUrl: event.url,
      sourceName: event.name,
      sourceCheckedAt: new Date().toISOString(),
      confidenceScore: event.score,
      editorialScore: event.score,
      status: event.score >= 90 ? "published" : "pending",
      autoPublish: event.score >= 90,
    };
  } catch (error) {
    console.warn(`${event.name}: source check failed (${error.message}).`);
    return null;
  }
}

async function loadExistingRows() {
  try {
    const source = await readFile(OUTPUT_PATH, "utf8");
    const match = source.match(/export const generatedTexasEvents = ([\s\S]*?) as const;\s*$/);
    if (!match) return [];
    const parsed = JSON.parse(match[1]);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function withoutSourceCheckedAt(row) {
  const { sourceCheckedAt: _sourceCheckedAt, ...stable } = row;
  return stable;
}

function stableEventEquals(previous, current) {
  return JSON.stringify(withoutSourceCheckedAt(previous)) === JSON.stringify(withoutSourceCheckedAt(current));
}

const existingRows = await loadExistingRows();
const existingById = new Map(existingRows.map((row) => [row.id, row]));
let preservedCheckTimestamps = 0;

const rows = (await Promise.all(EVENTS.map(collectEvent)))
  .filter(Boolean)
  .map((row) => {
    const previous = existingById.get(row.id);
    if (previous?.sourceCheckedAt && stableEventEquals(previous, row)) {
      preservedCheckTimestamps += 1;
      return { ...row, sourceCheckedAt: previous.sourceCheckedAt };
    }
    return row;
  })
  .sort((a, b) => a.startDate.localeCompare(b.startDate) || b.editorialScore - a.editorialScore);

const header = `// AUTO-GENERATED by scripts/events/sync-texas-events-safe.mjs.\n// Do not hand-edit; the scheduled Sync Texas Events workflow refreshes this file.\n\n`;
const body = `export const generatedTexasEvents = ${JSON.stringify(rows, null, 2)} as const;\n`;
await mkdir(dirname(OUTPUT_PATH), { recursive: true });
await writeFile(OUTPUT_PATH, header + body, "utf8");
console.log(`Texas events sync complete: ${rows.length} verified annual events written; ${preservedCheckTimestamps} unchanged records retained their prior sourceCheckedAt timestamp.`);
