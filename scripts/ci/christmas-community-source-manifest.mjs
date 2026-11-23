import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Exact two literal 2026 source manifests consumed by the live
 * getVerifiedChristmasCommunityEvents2026() renderer. This audit reads the
 * files instead of importing TS from a Node-only production smoke script.
 * Fail closed if either source moves, stops being JSON literal, or duplicates.
 */
const SOURCES = [
  { path: "src/data/events/christmas-community-2026.server.ts", marker: "const verifiedOccurrences" },
  { path: "src/data/events/christmas-community-2026-county-backfill.server.ts", marker: "export const verifiedCountyChristmasEvents2026" },
];

export function parseChristmasOccurrenceLiteral(content, marker) {
  const markerAt = content.indexOf(marker);
  if (markerAt < 0) throw new Error(`Christmas source marker not found: ${marker}`);
  const equalsAt = content.indexOf("= [", markerAt);
  const endAt = content.indexOf("\n];", equalsAt);
  if (equalsAt < 0 || endAt < equalsAt) throw new Error(`Christmas source literal array boundaries missing: ${marker}`);
  const parsed = JSON.parse(content.slice(equalsAt + 2, endAt + 2).trim());
  if (!Array.isArray(parsed) || !parsed.length) throw new Error(`Christmas source literal must contain events: ${marker}`);
  for (const event of parsed) {
    if (!event || typeof event.slug !== "string" || typeof event.title !== "string" ||
        !/^20\d\d-\d\d-\d\d$/.test(event.startDate || "") ||
        (event.endDate && ( !/^20\d\d-\d\d-\d\d$/.test(event.endDate) || event.endDate < event.startDate )))
      throw new Error(`Invalid dated Christmas source event in ${marker}: ${event?.slug ?? "missing slug"}`);
  }
  return parsed;
}

export function readVerifiedChristmasOccurrenceSources(root = process.cwd()) {
  const [primary, countyBackfill] = SOURCES.map(({ path, marker }) =>
    parseChristmasOccurrenceLiteral(readFileSync(resolve(root, path), "utf8"), marker));
  const combined = [...primary, ...countyBackfill];
  const seen = new Set();
  for (const event of combined) {
    const key = `${event.slug}:${event.startDate}`;
    if (seen.has(key)) throw new Error(`Duplicate community Christmas source occurrence ${key}`);
    seen.add(key);
  }
  return { primary, countyBackfill, combined };
}

export function activeVerifiedChristmasOccurrences(date, root = process.cwd()) {
  if (!/^20\d\d-\d\d-\d\d$/.test(date)) throw new Error("Christmas source date must be YYYY-MM-DD");
  return readVerifiedChristmasOccurrenceSources(root).combined.filter((event) =>
    (event.endDate ?? event.startDate) >= date);
}
