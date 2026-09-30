export type LcraLakeLevelSnapshot = {
  sourceUrl: string;
  measuredAt: string;
  percentFull: null;
  elevationFeet: number;
};

const SITE_HEADERS = ["site_number", "site", "site_no", "station_number", "station", "gauge", "gauge_number"];
const NAME_HEADERS = ["lake", "lake_name", "name", "location", "site_name", "station_name", "description"];
const DATE_HEADERS = ["read_date", "date_time", "datetime", "date", "timestamp", "last_update", "reading_time", "observation_time"];
const LEVEL_HEADERS = ["current_level", "lake_level", "water_level", "elevation", "head", "level", "lake_level_ft", "water_surface_elevation"];

function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      if (quoted && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }
    if (char === "," && !quoted) {
      values.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  values.push(current.trim());
  return values;
}

function normalizeHeader(value: string) {
  return value.toLowerCase().trim().replace(/\([^)]*\)/g, " ").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

function firstHeaderIndex(headers: string[], candidates: string[]) {
  return candidates.map((candidate) => headers.indexOf(candidate)).find((index) => index >= 0) ?? -1;
}

function parseNumber(value: string | undefined) {
  if (!value) return null;
  const match = value.replace(/,/g, "").match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;
  const parsed = Number(match[0]);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseMeasuredDate(value: string | undefined) {
  if (!value) return null;
  const raw = value.trim();
  const iso = raw.match(/\d{4}-\d{2}-\d{2}/)?.[0];
  if (iso) return iso;
  const timestamp = Date.parse(raw);
  if (!Number.isFinite(timestamp)) return null;
  return new Date(timestamp).toISOString().slice(0, 10);
}

function findHeader(lines: string[]) {
  for (let lineIndex = 0; lineIndex < Math.min(lines.length, 20); lineIndex += 1) {
    const headers = parseCsvLine(lines[lineIndex]).map(normalizeHeader);
    const siteIndex = firstHeaderIndex(headers, SITE_HEADERS);
    const nameIndex = firstHeaderIndex(headers, NAME_HEADERS);
    const dateIndex = firstHeaderIndex(headers, DATE_HEADERS);
    const levelIndex = firstHeaderIndex(headers, LEVEL_HEADERS);
    if (dateIndex >= 0 && levelIndex >= 0 && (siteIndex >= 0 || nameIndex >= 0)) {
      return { lineIndex, siteIndex, nameIndex, dateIndex, levelIndex };
    }
  }
  return null;
}

export function parseLcraLakeLevelCsv(
  sourceUrl: string,
  siteNumber: string,
  csv: string,
): LcraLakeLevelSnapshot | null {
  if (!/^\d{3,6}$/.test(siteNumber)) return null;
  const lines = csv.replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.trim().length > 0);
  const header = findHeader(lines);
  if (!header) return null;

  let best: { timestamp: number; snapshot: LcraLakeLevelSnapshot } | null = null;
  for (const line of lines.slice(header.lineIndex + 1)) {
    const values = parseCsvLine(line);
    const rowSite = header.siteIndex >= 0 ? String(values[header.siteIndex] ?? "").replace(/\D/g, "") : "";
    const rowName = header.nameIndex >= 0 ? String(values[header.nameIndex] ?? "").trim().toLowerCase() : "";
    const matchesSite = rowSite.length > 0 && rowSite === siteNumber;
    const matchesFayetteName = siteNumber === "5634" && rowName.includes("fayette");
    if (!matchesSite && !matchesFayetteName) continue;

    const measuredAt = parseMeasuredDate(values[header.dateIndex]);
    const elevationFeet = parseNumber(values[header.levelIndex]);
    if (!measuredAt || elevationFeet == null || elevationFeet < 0 || elevationFeet > 10_000) continue;

    const timestamp = Date.parse(`${measuredAt}T12:00:00Z`);
    if (!Number.isFinite(timestamp)) continue;
    const snapshot: LcraLakeLevelSnapshot = { sourceUrl, measuredAt, percentFull: null, elevationFeet };
    if (!best || timestamp > best.timestamp) best = { timestamp, snapshot };
  }

  return best?.snapshot ?? null;
}
