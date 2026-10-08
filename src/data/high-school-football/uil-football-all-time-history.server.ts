import type { UilRecentFootballHistory } from './uil-football-recent-history.server';

const UIL_FOOTBALL_ALL_TIME_APPEARANCES_URL = 'https://www.uiltexas.org/football/all-time-appearances';
const UIL_FOOTBALL_ALL_TIME_FALLBACK_URL = 'https://wwwprod.uiltexas.org/football/all-time-appearances';
const ALL_TIME_CACHE_TTL_MS = 12 * 60 * 60 * 1000;

type UilAllTimeAppearanceRow = {
  schoolName: string;
  stateTitles: number;
  stateFinalAppearances: number;
  appearanceYears: string;
};

export type UilAllTimeFootballHistory = {
  stateTitles: number;
  stateFinalAppearances: number;
  appearanceYears: string;
  publishedThroughYear: number;
  supplementedFinals: Array<{
    season: string;
    conference: string;
    result: 'Champion' | 'Runner-Up';
    opponent: string;
  }>;
  sourceUrl: string;
  recentArchiveSourceUrl?: string;
  matchMethod: 'exact-normalized-uil-name';
  documentedCorrection?: { note: string; sourceUrl: string };
};

let allTimeHistoryCache: {
  loadedAt: number;
  publishedThroughYear: number;
  rows: UilAllTimeAppearanceRow[];
  bySchool: Map<string, UilAllTimeAppearanceRow>;
} | null = null;

function decodeHtml(value: string) {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&ndash;|&#8211;/gi, '–')
    .replace(/&mdash;|&#8212;/gi, '—')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCharCode(Number.parseInt(code, 16)));
}

function cellText(value: string) {
  return decodeHtml(
    value
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ').trim();
}

function normalizeSchoolName(value: string) {
  return value
    .toLowerCase()
    .replace(/\bde\s+soto\b/g, 'desoto')
    .replace(/\bft\.?\s+/g, 'fort ')
    .replace(/\bst\.?\s+/g, 'saint ')
    .replace(/\bcons\.?\b/g, 'consolidated')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseCount(value: string) {
  const parsed = Number.parseInt(value.replace(/[^0-9-]/g, ''), 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function parseAllTimeRows(html: string) {
  const rows: UilAllTimeAppearanceRow[] = [];

  for (const rowMatch of html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells = [...rowMatch[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)]
      .map((match) => cellText(match[1]));
    if (cells.length < 4) continue;

    const [schoolName, titlesText, appearancesText, appearanceYears] = cells;
    const stateTitles = parseCount(titlesText);
    const stateFinalAppearances = parseCount(appearancesText);
    if (!schoolName || stateTitles === null || stateFinalAppearances === null || !appearanceYears) continue;

    rows.push({ schoolName, stateTitles, stateFinalAppearances, appearanceYears });
  }

  return rows;
}

function inferPublishedThroughYear(rows: UilAllTimeAppearanceRow[]) {
  let latest = 0;
  for (const row of rows) {
    for (const match of row.appearanceYears.matchAll(/\b(?:19|20)\d{2}\b/g)) {
      latest = Math.max(latest, Number(match[0]));
    }
  }
  return latest;
}

export async function loadUilAllTimeFootballHistory() {
  if (allTimeHistoryCache && Date.now() - allTimeHistoryCache.loadedAt < ALL_TIME_CACHE_TTL_MS) {
    return allTimeHistoryCache;
  }

  let lastError: unknown = null;

  for (const sourceUrl of [UIL_FOOTBALL_ALL_TIME_APPEARANCES_URL, UIL_FOOTBALL_ALL_TIME_FALLBACK_URL]) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8_000);

    try {
      const response = await fetch(sourceUrl, {
        headers: {
          accept: 'text/html,application/xhtml+xml',
          'user-agent': 'TexasDefined-Football-Research/1.0',
        },
        redirect: 'follow',
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`UIL football all-time appearances returned ${response.status} from ${sourceUrl}.`);

      const rows = parseAllTimeRows(await response.text());
      const publishedThroughYear = inferPublishedThroughYear(rows);
      if (rows.length < 300 || publishedThroughYear < 2024) {
        throw new Error(
          `UIL all-time football appearances look incomplete from ${sourceUrl}: ${rows.length} schools, latest year ${publishedThroughYear || 'unknown'}.`,
        );
      }

      allTimeHistoryCache = {
        loadedAt: Date.now(),
        publishedThroughYear,
        rows,
        bySchool: new Map(rows.map((row) => [normalizeSchoolName(row.schoolName), row])),
      };
      return allTimeHistoryCache;
    } catch (error) {
      lastError = error;
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error('UIL football all-time appearances could not be loaded from either official endpoint.');
}

export function allTimeFootballHistoryFromLoaded(
  history: Awaited<ReturnType<typeof loadUilAllTimeFootballHistory>>,
  recentHistory: UilRecentFootballHistory | null,
  ...schoolNames: Array<string | undefined>
): UilAllTimeFootballHistory | null {
  const keys = [...new Set(
    schoolNames
      .filter((value): value is string => Boolean(value?.trim()))
      .map(normalizeSchoolName)
      .filter(Boolean),
  )];

  let base: UilAllTimeAppearanceRow | undefined;
  for (const key of keys) {
    base = history.bySchool.get(key);
    if (base) break;
  }
  if (!base) return null;

  // The UIL's aggregated all-time row currently marks Southlake Carroll's 2003
  // title-game appearance as a championship. The UIL's own direct 2003 recap
  // documents Katy 16, Carroll 15, and Carroll ISD confirms eight titles.
  // This surgical correction changes only the demonstrably disputed row.
  // Drop the adjustment automatically if UIL corrects the upstream table.
  const isCarroll2003Typo = normalizeSchoolName(base.schoolName) === 'southlake carroll'
    && base.stateTitles === 9
    && /(?:^|[,;])03\\*/.test(base.appearanceYears);
  const documentedCorrection = isCarroll2003Typo ? {
    note: "UIL's summary incorrectly marks the 2003 Carroll appearance as a title. UIL's direct game recap says Katy won 16–15; Carroll ISD counts eight actual championships.",
    sourceUrl: 'https://www.uiltexas.org/100/football',
  } : undefined;

  const supplementedFinals = (recentHistory?.finals ?? [])
    .filter((final) => Number.parseInt(final.season.slice(0, 4), 10) > history.publishedThroughYear)
    .map((final) => ({
      season: final.season,
      conference: final.conference,
      result: final.result,
      opponent: final.opponent,
    }));

  return {
    stateTitles: base.stateTitles - (isCarroll2003Typo ? 1 : 0) + supplementedFinals.filter((final) => final.result === 'Champion').length,
    stateFinalAppearances: base.stateFinalAppearances + supplementedFinals.length,
    appearanceYears: isCarroll2003Typo ? base.appearanceYears.replace(/03\\*/, '03') : base.appearanceYears,
    documentedCorrection,
    publishedThroughYear: history.publishedThroughYear,
    supplementedFinals,
    sourceUrl: UIL_FOOTBALL_ALL_TIME_APPEARANCES_URL,
    recentArchiveSourceUrl: supplementedFinals.length ? recentHistory?.sourceUrl : undefined,
    matchMethod: 'exact-normalized-uil-name',
  };
}

export const UIL_ALL_TIME_FOOTBALL_HISTORY_SOURCE = {
  sourceUrl: UIL_FOOTBALL_ALL_TIME_APPEARANCES_URL,
  fallbackUrl: UIL_FOOTBALL_ALL_TIME_FALLBACK_URL,
  cacheTtlMs: ALL_TIME_CACHE_TTL_MS,
} as const;
