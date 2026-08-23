export type LiveLakeLevelSnapshot = {
  sourceUrl: string;
  measuredAt: string;
  percentFull: number;
  elevationFeet?: number | null;
};

const TIMEOUT_MS = 5000;
const MAX_DISPLAY_AGE_DAYS = 7;
const RECENT_CONDITIONS_URL = "https://waterdatafortexas.org/reservoirs/recent-conditions.json";

function stripHtml(value: string) {
  return value
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function parseNumber(value: string | undefined) {
  if (!value) return null;
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

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

function normalizeCsvHeader(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

function normalizeReservoirIdentity(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function snapshotIsFresh(snapshot: LiveLakeLevelSnapshot, now = new Date()) {
  const measured = Date.parse(`${snapshot.measuredAt}T23:59:59Z`);
  if (!Number.isFinite(measured)) return false;
  const ageDays = (now.getTime() - measured) / 86_400_000;
  return ageDays >= -1 && ageDays <= MAX_DISPLAY_AGE_DAYS;
}

export function parseWaterDataForTexasRecentConditions(sourceUrl: string, payload: unknown): LiveLakeLevelSnapshot | null {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null;
  const slug = sourceUrl.match(/\/reservoirs\/individual\/([a-z0-9-]+)\/?$/i)?.[1];
  if (!slug) return null;
  const wanted = normalizeReservoirIdentity(slug);
  const records = Object.values(payload as Record<string, unknown>);

  let partialMatch: Record<string, unknown> | null = null;
  for (const value of records) {
    if (!value || typeof value !== "object" || Array.isArray(value)) continue;
    const record = value as Record<string, unknown>;
    const names = [record.condensed_name, record.short_name, record.full_name]
      .filter((name): name is string => typeof name === "string")
      .map(normalizeReservoirIdentity);
    if (names.some((name) => name === wanted)) {
      partialMatch = record;
      break;
    }
    if (!partialMatch && names.some((name) => name.includes(wanted) || wanted.includes(name))) partialMatch = record;
  }

  if (!partialMatch) return null;
  const percentFull = typeof partialMatch.percent_full === "number" ? partialMatch.percent_full : Number(partialMatch.percent_full);
  const measuredAt = typeof partialMatch.timestamp === "string" ? partialMatch.timestamp.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? null : null;
  const elevationValue = typeof partialMatch.elevation === "number" ? partialMatch.elevation : Number(partialMatch.elevation);
  if (!measuredAt || !Number.isFinite(percentFull) || percentFull < 0 || percentFull > 150) return null;

  return {
    sourceUrl,
    measuredAt,
    percentFull,
    elevationFeet: Number.isFinite(elevationValue) ? elevationValue : null,
  };
}

export function parseWaterDataForTexasReservoirCsv(sourceUrl: string, csv: string): LiveLakeLevelSnapshot | null {
  const lines = csv.replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.trim().length > 0);
  const headerIndex = lines.findIndex((line) => {
    const headers = parseCsvLine(line).map(normalizeCsvHeader);
    return headers.includes("date") && headers.includes("percent_full");
  });
  if (headerIndex < 0) return null;

  const headers = parseCsvLine(lines[headerIndex]).map(normalizeCsvHeader);
  const dateIndex = headers.indexOf("date");
  const percentIndex = headers.indexOf("percent_full");
  const elevationIndex = ["mean_water_level", "water_level", "elevation"].map((key) => headers.indexOf(key)).find((index) => index >= 0) ?? -1;

  let best: { timestamp: number; snapshot: LiveLakeLevelSnapshot } | null = null;
  for (const line of lines.slice(headerIndex + 1)) {
    const values = parseCsvLine(line);
    const rawDate = values[dateIndex]?.trim();
    const percentFull = parseNumber(values[percentIndex]);
    const measuredAt = rawDate?.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? null;
    if (!measuredAt || percentFull == null || percentFull < 0 || percentFull > 150) continue;
    const timestamp = Date.parse(`${measuredAt}T12:00:00Z`);
    if (!Number.isFinite(timestamp)) continue;
    const elevationFeet = elevationIndex >= 0 ? parseNumber(values[elevationIndex]) : null;
    const snapshot: LiveLakeLevelSnapshot = { sourceUrl, measuredAt, percentFull, elevationFeet };
    if (!best || timestamp > best.timestamp) best = { timestamp, snapshot };
  }

  return best?.snapshot ?? null;
}

export function parseWaterDataForTexasReservoirPage(sourceUrl: string, html: string): LiveLakeLevelSnapshot | null {
  const text = stripHtml(html);
  const headline = text.match(/([A-Za-z0-9 .&'()\/-]+):\s*([0-9]{1,3}(?:\.[0-9]+)?)%\s+full\s+as\s+of\s+(\d{4}-\d{2}-\d{2})/i);
  const alternate = text.match(/([0-9]{1,3}(?:\.[0-9]+)?)%\s+full[^0-9]{0,80}(\d{4}-\d{2}-\d{2})/i);
  const percentFull = parseNumber(headline?.[2] ?? alternate?.[1]);
  const measuredAt = headline?.[3] ?? alternate?.[2] ?? null;
  if (percentFull == null || percentFull < 0 || percentFull > 150 || !measuredAt) return null;
  const elevationMatch = text.match(/(?:water\s+level|elevation)[^0-9]{0,30}([0-9]{2,4}(?:\.[0-9]+)?)\s*(?:ft|feet)/i);
  return { sourceUrl, measuredAt, percentFull, elevationFeet: parseNumber(elevationMatch?.[1]) };
}

export async function loadLiveLakeLevel(sourceUrl: string): Promise<LiveLakeLevelSnapshot | null> {
  if (!/^https:\/\/(?:www\.)?waterdatafortexas\.org\/reservoirs\/individual\/[a-z0-9-]+\/?$/i.test(sourceUrl)) return null;

  const canonicalSourceUrl = sourceUrl.replace(/\/$/, "");
  const csvUrl = `${canonicalSourceUrl}-30day.csv`;
  try {
    const recentResponse = await fetch(RECENT_CONDITIONS_URL, {
      cache: "no-store",
      headers: {
        accept: "application/json",
        "user-agent": "TexasDefined-Live-Lake-Level/1.3",
      },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (recentResponse.ok) {
      const recentSnapshot = parseWaterDataForTexasRecentConditions(canonicalSourceUrl, await recentResponse.json());
      if (recentSnapshot && snapshotIsFresh(recentSnapshot)) return recentSnapshot;
    }

    const csvResponse = await fetch(csvUrl, {
      cache: "no-store",
      headers: {
        accept: "text/csv,text/plain;q=0.9,*/*;q=0.1",
        "user-agent": "TexasDefined-Live-Lake-Level/1.3",
      },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (csvResponse.ok) {
      const csvSnapshot = parseWaterDataForTexasReservoirCsv(canonicalSourceUrl, await csvResponse.text());
      if (csvSnapshot && snapshotIsFresh(csvSnapshot)) return csvSnapshot;
    }

    const htmlResponse = await fetch(canonicalSourceUrl, {
      cache: "no-store",
      headers: {
        accept: "text/html,application/xhtml+xml",
        "user-agent": "TexasDefined-Live-Lake-Level/1.3",
      },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!htmlResponse.ok) return null;
    const htmlSnapshot = parseWaterDataForTexasReservoirPage(canonicalSourceUrl, await htmlResponse.text());
    return htmlSnapshot && snapshotIsFresh(htmlSnapshot) ? htmlSnapshot : null;
  } catch {
    return null;
  }
}
