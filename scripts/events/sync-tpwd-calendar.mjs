#!/usr/bin/env node
/**
 * TPWD public event discovery. Stores only short factual labels, occurrence dates,
 * park identifiers and links. Do not copy TPWD descriptions, imagery or page HTML.
 * The resulting records are calendar entries, never standalone SEO pages.
 */
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const SOURCE = "https://tpwd.texas.gov/calendar";
const OUTPUT = resolve("src/data/generated/tpwd-events.json");
const DAY_MS = 86400000;
// A dated TPWD calendar listing is already a primary-source discovery candidate.
// Keyword inclusion used to discard useful programs such as Trail of Terror,
// Picnic in the Park and Pirates of the Canyon. Fail closed on non-visitor events.
const EXCLUSION = /visitor cent(er|re)|nature center(?: hours)?$|education cent(er|re)|office hours|park store|gift shop|recruit|career fair|job fair|internship|public meeting|commission|closed|closure|volunteer|self.guided viewing|staff training|teacher workshop|instructor workshop|professional development|administrative|office open|facility open|headquarters hours|annual business meeting|cancel(?:led|ed|lation)|postponed|rescheduled/i;

function clean(value) {
  return String(value).replace(/<[^>]*>/g, " ").replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'")
    .replace(/&nbsp;/gi, " ").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/\s+/g, " ").trim();
}

export function parseTpwdCalendar(html, now = new Date()) {
  const min = now.toISOString().slice(0, 10);
  const horizon = new Date(Date.parse(min + "T00:00:00Z") + 90 * DAY_MS).toISOString().slice(0, 10);
  const events = new Map();
  // Each event instance in TPWD's calendar normally has a dated official URL.
  // Parse the URL date instead of guessing a year from nearby month headings.
  const anchors = /<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi;
  for (const match of String(html).matchAll(anchors)) {
    let url;
    try { url = new URL(match[2].replace(/&amp;/gi, "&"), SOURCE); } catch { continue; }
    if (url.origin !== "https://tpwd.texas.gov") continue;
    const parts = url.pathname.replace(/\/$/, "").split("/").filter(Boolean);
    if (parts.length !== 4 || parts[0] !== "calendar") continue;
    const [ , parkKey, , date ] = parts;
    if (!/^[a-z0-9-]+$/.test(parkKey) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
    const parsedDate = new Date(date + "T12:00:00Z");
    if (Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date) continue;
    if (date < min || date > horizon) continue;
    const title = clean(match[3]);
    if (title.length < 5 || title.length > 120 || EXCLUSION.test(title)) continue;
    const officialUrl = url.origin + url.pathname;
    events.set(officialUrl, { title, startDate: date, parkKey, officialUrl });
  }
  return [...events.values()].sort((a, b) => a.startDate.localeCompare(b.startDate) || a.title.localeCompare(b.title));
}

async function main() {
  const response = await fetch(SOURCE, {
    headers: { "user-agent": "TexasDefined public park events discovery (https://texasdefined.com)" },
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error("TPWD calendar HTTP " + response.status);
  const events = parseTpwdCalendar(await response.text());
  if (!events.length) throw new Error("No dated TPWD activities detected; leaving prior catalog untouched");
  let previous;
  try { previous = JSON.parse(await readFile(OUTPUT, "utf8")); } catch { /* first run */ }
  const unchanged = JSON.stringify(previous?.events) === JSON.stringify(events);
  // Avoid daily PR churn for an unchanged source, but force periodic freshness.
  if (unchanged && previous?.generatedAt &&
      Date.now() - Date.parse(previous.generatedAt) < 48 * 3600000) {
    console.log("TPWD calendar unchanged: " + events.length + " entries");
    return;
  }
  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, JSON.stringify({ generatedAt: new Date().toISOString(), sourceUrl: SOURCE, events }, null, 2) + "\n", "utf8");
  console.log("TPWD calendar synchronized: " + events.length + " factual records across the next 90 days");
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch(error => { console.error(error); process.exitCode = 1; });
}
