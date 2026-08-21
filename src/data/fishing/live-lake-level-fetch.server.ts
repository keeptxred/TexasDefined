import type { LiveLakeLevelSnapshot } from "./live-lake-level.server";
import {
  parseWaterDataForTexasRecentConditions,
  parseWaterDataForTexasReservoirCsv,
  parseWaterDataForTexasReservoirPage,
} from "./live-lake-level.server";

const RECENT_CONDITIONS_URL = "https://waterdatafortexas.org/reservoirs/recent-conditions.json";
const MAX_DISPLAY_AGE_DAYS = 7;
const PRIMARY_TIMEOUT_MS = 10_000;
const HTML_TIMEOUT_MS = 5_000;
const BROWSER_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36";

function snapshotIsFresh(snapshot: LiveLakeLevelSnapshot, now = new Date()) {
  const measured = Date.parse(`${snapshot.measuredAt}T23:59:59Z`);
  if (!Number.isFinite(measured)) return false;
  const ageDays = (now.getTime() - measured) / 86_400_000;
  return ageDays >= -1 && ageDays <= MAX_DISPLAY_AGE_DAYS;
}

function headers(accept: string) {
  return {
    accept,
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    pragma: "no-cache",
    referer: "https://waterdatafortexas.org/reservoirs/statewide",
    "user-agent": BROWSER_USER_AGENT,
  };
}

async function fetchRecentSnapshot(canonicalSourceUrl: string) {
  try {
    const response = await fetch(RECENT_CONDITIONS_URL, {
      cache: "no-store",
      redirect: "follow",
      headers: headers("application/json,text/plain;q=0.9,*/*;q=0.1"),
      signal: AbortSignal.timeout(PRIMARY_TIMEOUT_MS),
    });
    if (!response.ok) return null;
    const snapshot = parseWaterDataForTexasRecentConditions(canonicalSourceUrl, await response.json());
    return snapshot && snapshotIsFresh(snapshot) ? snapshot : null;
  } catch {
    return null;
  }
}

async function fetchCsvSnapshot(canonicalSourceUrl: string) {
  try {
    const response = await fetch(`${canonicalSourceUrl}-30day.csv`, {
      cache: "no-store",
      redirect: "follow",
      headers: headers("text/csv,text/plain;q=0.9,*/*;q=0.1"),
      signal: AbortSignal.timeout(PRIMARY_TIMEOUT_MS),
    });
    if (!response.ok) return null;
    const snapshot = parseWaterDataForTexasReservoirCsv(canonicalSourceUrl, await response.text());
    return snapshot && snapshotIsFresh(snapshot) ? snapshot : null;
  } catch {
    return null;
  }
}

async function fetchHtmlSnapshot(canonicalSourceUrl: string) {
  try {
    const response = await fetch(canonicalSourceUrl, {
      cache: "no-store",
      redirect: "follow",
      headers: headers("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"),
      signal: AbortSignal.timeout(HTML_TIMEOUT_MS),
    });
    if (!response.ok) return null;
    const snapshot = parseWaterDataForTexasReservoirPage(canonicalSourceUrl, await response.text());
    return snapshot && snapshotIsFresh(snapshot) ? snapshot : null;
  } catch {
    return null;
  }
}

export async function loadLiveLakeLevelResilient(sourceUrl: string): Promise<LiveLakeLevelSnapshot | null> {
  if (!/^https:\/\/(?:www\.)?waterdatafortexas\.org\/reservoirs\/individual\/[a-z0-9-]+\/?$/i.test(sourceUrl)) return null;

  const canonicalSourceUrl = sourceUrl.replace(/\/$/, "");
  const [recent, csv] = await Promise.all([
    fetchRecentSnapshot(canonicalSourceUrl),
    fetchCsvSnapshot(canonicalSourceUrl),
  ]);
  if (recent) return recent;
  if (csv) return csv;
  return fetchHtmlSnapshot(canonicalSourceUrl);
}
