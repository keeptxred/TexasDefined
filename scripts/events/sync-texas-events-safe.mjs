#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const OUTPUT_PATH = resolve("src/data/generated/texas-events.ts");
const NOW = new Date();
const TODAY = new Date(Date.UTC(NOW.getUTCFullYear(), NOW.getUTCMonth(), NOW.getUTCDate()));
const HORIZON = new Date(TODAY);
HORIZON.setUTCMonth(HORIZON.getUTCMonth() + 18);

const EVENTS = [
  {
    key: "state-fair-of-texas",
    name: "State Fair of Texas",
    city: "Dallas",
    region: "prairies-lakes",
    category: "seasonal",
    url: "https://bigtex.com/",
    sourceUrls: ["https://tickets.bigtex.com/", "https://bigtex.com/"],
    score: 98,
    months: [9, 10],
  },
  { key: "houston-livestock-show-and-rodeo", name: "Houston Livestock Show and Rodeo", city: "Houston", region: "gulf-coast", category: "rodeo", url: "https://www.rodeohouston.com/", score: 98, months: [2, 3] },
  { key: "fiesta-san-antonio", name: "Fiesta San Antonio", city: "San Antonio", region: "south-texas", category: "culture", url: "https://fiestasanantonio.org/", score: 96, months: [4] },
  {
    key: "wurstfest",
    name: "Wurstfest",
    city: "New Braunfels",
    region: "hill-country",
    category: "food",
    url: "https://wurstfest.com/",
    sourceUrls: ["https://wurstfest.com/employment/", "https://wurstfest.com/"],
    score: 94,
    months: [11],
  },
  {
    key: "ennis-bluebonnet-trails",
    name: "Ennis Bluebonnet Trails",
    city: "Ennis",
    region: "prairies-lakes",
    category: "seasonal",
    url: "https://www.bluebonnettrail.org/",
    sourceUrls: ["https://www.bluebonnettrail.org/"],
    score: 92,
    months: [4],
  },
  {
    key: "marfa-lights-festival",
    name: "Marfa Lights Festival",
    city: "Marfa",
    region: "big-bend",
    category: "music",
    url: "https://visitmarfa.com/",
    sourceUrls: [
      "https://visitmarfa.com/events/39th-annual-marfa-lights-festival",
      "https://visitmarfa.com/events/",
      "https://visitmarfa.com/",
    ],
    combineFirstTwoDates: true,
    score: 88,
    months: [8, 9],
  },
];

const MONTHS = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};
const MONTH_PATTERN = "(January|February|March|April|May|June|July|August|September|October|November|December|Jan\\.?|Feb\\.?|Mar\\.?|Apr\\.?|Jun\\.?|Jul\\.?|Aug\\.?|Sep(?:t)?\\.?|Oct\\.?|Nov\\.?|Dec\\.?)";

function stripHtml(value) {
  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&ndash;|&#8211;|&#x2013;/gi, "–")
    .replace(/&mdash;|&#8212;|&#x2014;/gi, "—")
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

function parseDate(monthText, dayText, yearText) {
  const monthKey = String(monthText || "").toLowerCase().replace(/\.$/, "").slice(0, 3);
  const month = MONTHS[monthKey];
  const day = Number(dayText);
  const year = Number(yearText);
  if (!month || !day || !year) return null;
  const date = new Date(Date.UTC(year, month - 1, day));
  return Number.isNaN(date.getTime()) ? null : date;
}

function inExpectedMonth(date, event) {
  return Boolean(date) && event.months.includes(date.getUTCMonth() + 1);
}

function validForEvent(date, event) {
  const recentBridgeStart = Boolean(
    event.combineFirstTwoDates &&
    date &&
    date < TODAY &&
    (TODAY - date) / 86400000 <= 14
  );
  return inExpectedMonth(date, event) && (date >= TODAY || recentBridgeStart) && date <= HORIZON;
}

function pushCandidate(candidates, start, end, raw, event, futureOnly) {
  const validRange = Boolean(
    end &&
    inExpectedMonth(start, event) &&
    inExpectedMonth(end, event) &&
    start <= HORIZON &&
    end >= TODAY &&
    end <= HORIZON &&
    end >= start
  );
  const validStart = futureOnly
    ? (validRange || validForEvent(start, event))
    : inExpectedMonth(start, event);
  if (!validStart) return;
  const validEnd = end && (futureOnly ? validRange : inExpectedMonth(end, event));
  candidates.push({ start, ...(validEnd ? { end } : {}), raw });
}

function findDates(text, event, { futureOnly = true } = {}) {
  const candidates = [];
  const crossRangePattern = new RegExp(`${MONTH_PATTERN}\\s+(\\d{1,2})\\s*(?:[-–—]|to)\\s*${MONTH_PATTERN}\\s+(\\d{1,2}),?\\s+(20\\d{2})`, "gi");
  for (const match of text.matchAll(crossRangePattern)) {
    const start = parseDate(match[1], match[2], match[5]);
    const end = parseDate(match[3], match[4], match[5]);
    pushCandidate(candidates, start, end, match[0], event, futureOnly);
  }

  const sameMonthRangePattern = new RegExp(`${MONTH_PATTERN}\\s+(\\d{1,2})\\s*(?:[-–—]|to)\\s*(\\d{1,2}),?\\s+(20\\d{2})`, "gi");
  for (const match of text.matchAll(sameMonthRangePattern)) {
    const start = parseDate(match[1], match[2], match[4]);
    const end = parseDate(match[1], match[3], match[4]);
    pushCandidate(candidates, start, end, match[0], event, futureOnly);
  }

  const explicitCrossRangePattern = new RegExp(`${MONTH_PATTERN}\\s+(\\d{1,2}),?\\s+(20\\d{2})\\s*(?:[-–—]|to)\\s*${MONTH_PATTERN}\\s+(\\d{1,2}),?\\s+(20\\d{2})`, "gi");
  for (const match of text.matchAll(explicitCrossRangePattern)) {
    const start = parseDate(match[1], match[2], match[3]);
    const end = parseDate(match[4], match[5], match[6]);
    pushCandidate(candidates, start, end, match[0], event, futureOnly);
  }

  const singlePattern = new RegExp(`${MONTH_PATTERN}\\s+(\\d{1,2}),?\\s+(20\\d{2})`, "gi");
  for (const match of text.matchAll(singlePattern)) {
    const start = parseDate(match[1], match[2], match[3]);
    pushCandidate(candidates, start, undefined, match[0], event, futureOnly);
  }

  candidates.sort((a, b) => a.start - b.start || Number(Boolean(b.end)) - Number(Boolean(a.end)));
  return candidates.filter((candidate, index, all) => {
    const key = `${candidate.start.toISOString()}|${candidate.end?.toISOString() || ""}`;
    return all.findIndex((other) => `${other.start.toISOString()}|${other.end?.toISOString() || ""}` === key) === index;
  });
}

function iso(date) {
  return date.toISOString().slice(0, 10);
}

async function collectEvent(event) {
  const sourceUrls = event.sourceUrls?.length ? event.sourceUrls : [event.url];
  const historicalCandidates = [];

  for (const sourceUrl of sourceUrls) {
    try {
      const text = await fetchText(sourceUrl);
      const nameIndex = text.toLowerCase().indexOf(event.name.toLowerCase());
      const nearby = nameIndex >= 0 ? text.slice(Math.max(0, nameIndex - 5000), nameIndex + 12000) : text;
      let candidates = findDates(nearby, event);
      if (!candidates.length) candidates = findDates(text, event);
      historicalCandidates.push(...findDates(nearby, event, { futureOnly: false }));

      if (!candidates.length) continue;

      const chosen = { ...candidates[0] };
      if (!chosen.end && event.combineFirstTwoDates) {
        const next = candidates.find((candidate) => candidate.start > chosen.start);
        if (next && (next.start - chosen.start) / 86400000 <= 14) chosen.end = next.start;
      }
      // A recent past singleton is admitted only so separately rendered opening
      // and closing dates can be paired. Never publish it unless that pairing
      // produced an end date that still includes today.
      if (chosen.start < TODAY && (!chosen.end || chosen.end < TODAY)) continue;

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
      console.warn(`${event.name}: source check failed for ${sourceUrl} (${error.message}).`);
    }
  }

  if (historicalCandidates.length) {
    historicalCandidates.sort((a, b) => b.start - a.start);
    console.warn(`${event.name}: latest official date ${iso(historicalCandidates[0].start)} is not upcoming; waiting for the next official announcement.`);
  } else {
    console.warn(`${event.name}: no plausible official date found in expected months.`);
  }
  return null;
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
