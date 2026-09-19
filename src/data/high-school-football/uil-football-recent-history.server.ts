const UIL_FOOTBALL_ARCHIVE_URL = 'https://www.uiltexas.org/football/archives';
const HISTORY_START_SEASON = '2018-2019';
const HISTORY_END_SEASON = '2025-2026';
const HISTORY_CACHE_TTL_MS = 12 * 60 * 60 * 1000;
const ARCHIVE_PAGE_OFFSETS = [0, 24, 48, 72] as const;

export type UilRecentFootballFinal = {
  season: string;
  conference: string;
  champion: string;
  runnerUp: string;
  score: string;
};

export type UilRecentFootballHistory = {
  windowStartSeason: typeof HISTORY_START_SEASON;
  windowEndSeason: typeof HISTORY_END_SEASON;
  stateTitles: number;
  stateRunnerUpFinishes: number;
  stateFinalAppearances: number;
  mostRecentTitleSeason?: string;
  mostRecentFinalSeason?: string;
  finals: Array<{
    season: string;
    conference: string;
    result: 'Champion' | 'Runner-Up';
    opponent: string;
    score: string;
  }>;
  sourceUrl: string;
  matchMethod: 'exact-normalized-uil-name';
};

let recentHistoryCache: {
  loadedAt: number;
  finals: UilRecentFootballFinal[];
  bySchool: Map<string, UilRecentFootballHistory>;
} | null = null;

function decodeHtml(value: string) {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&ndash;|&#8211;/gi, '–')
    .replace(/&mdash;|&#8212;/gi, '—')
    .replace(/&#(d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
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

function parseArchiveRows(html: string): UilRecentFootballFinal[] {
  const rows: UilRecentFootballFinal[] = [];
  const rowMatches = html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi);

  for (const rowMatch of rowMatches) {
    const cells = [...rowMatch[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)]
      .map((match) => cellText(match[1]));
    if (cells.length < 5 || !/^\d{4}-\d{4}$/.test(cells[0])) continue;

    const [season, conference, champion, runnerUp, score] = cells;
    if (!champion || champion === 'None' || !runnerUp) continue;

    rows.push({ season, conference, champion, runnerUp, score });
  }

  return rows;
}

async function fetchArchivePage(offset: number) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6_000);
  const url = offset ? `${UIL_FOOTBALL_ARCHIVE_URL}/P${offset}` : UIL_FOOTBALL_ARCHIVE_URL;

  try {
    const response = await fetch(url, {
      headers: {
        accept: 'text/html,application/xhtml+xml',
        'user-agent': 'TexasDefined-Football-Research/1.0',
      },
      redirect: 'follow',
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`UIL football archive returned ${response.status} for offset ${offset}.`);
    return parseArchiveRows(await response.text());
  } finally {
    clearTimeout(timeout);
  }
}

function seasonInWindow(season: string) {
  return season >= HISTORY_START_SEASON && season <= HISTORY_END_SEASON;
}

function buildHistoryIndex(finals: UilRecentFootballFinal[]) {
  const appearances = new Map<string, UilRecentFootballHistory['finals']>();

  function add(
    school: string,
    final: UilRecentFootballFinal,
    result: 'Champion' | 'Runner-Up',
    opponent: string,
  ) {
    const key = normalizeSchoolName(school);
    if (!key) return;
    const rows = appearances.get(key) ?? [];
    rows.push({
      season: final.season,
      conference: final.conference,
      result,
      opponent,
      score: final.score,
    });
    appearances.set(key, rows);
  }

  for (const final of finals) {
    add(final.champion, final, 'Champion', final.runnerUp);
    add(final.runnerUp, final, 'Runner-Up', final.champion);
  }

  return new Map([...appearances].map(([key, rows]) => {
    const ordered = [...rows].sort((a, b) => b.season.localeCompare(a.season));
    const titles = ordered.filter((row) => row.result === 'Champion');
    const runnerUps = ordered.filter((row) => row.result === 'Runner-Up');
    return [key, {
      windowStartSeason: HISTORY_START_SEASON,
      windowEndSeason: HISTORY_END_SEASON,
      stateTitles: titles.length,
      stateRunnerUpFinishes: runnerUps.length,
      stateFinalAppearances: ordered.length,
      mostRecentTitleSeason: titles[0]?.season,
      mostRecentFinalSeason: ordered[0]?.season,
      finals: ordered,
      sourceUrl: UIL_FOOTBALL_ARCHIVE_URL,
      matchMethod: 'exact-normalized-uil-name' as const,
    }];
  }));
}

export async function loadUilRecentFootballHistory() {
  if (recentHistoryCache && Date.now() - recentHistoryCache.loadedAt < HISTORY_CACHE_TTL_MS) {
    return recentHistoryCache;
  }

  const pages = await Promise.all(ARCHIVE_PAGE_OFFSETS.map(fetchArchivePage));
  const finals = pages
    .flat()
    .filter((row) => seasonInWindow(row.season))
    .filter((row, index, all) =>
      all.findIndex((candidate) =>
        candidate.season === row.season
        && candidate.conference === row.conference
        && candidate.champion === row.champion
        && candidate.runnerUp === row.runnerUp
      ) === index,
    );

  const seasons = new Set(finals.map((row) => row.season));
  if (!seasons.has(HISTORY_START_SEASON) || !seasons.has(HISTORY_END_SEASON) || finals.length < 80) {
    throw new Error(
      `UIL recent football archive window is incomplete: ${finals.length} finals across ${seasons.size} seasons.`,
    );
  }

  recentHistoryCache = {
    loadedAt: Date.now(),
    finals,
    bySchool: buildHistoryIndex(finals),
  };
  return recentHistoryCache;
}

export function recentFootballHistoryFromLoaded(
  history: Awaited<ReturnType<typeof loadUilRecentFootballHistory>>,
  ...schoolNames: Array<string | undefined>
) {
  const keys = [...new Set(
    schoolNames
      .filter((value): value is string => Boolean(value?.trim()))
      .map(normalizeSchoolName)
      .filter(Boolean),
  )];

  if (!keys.length) return null;
  for (const key of keys) {
    const match = history.bySchool.get(key);
    if (match) return match;
  }
  return null;
}

export async function recentFootballHistoryForSchool(...schoolNames: Array<string | undefined>) {
  const history = await loadUilRecentFootballHistory();
  return recentFootballHistoryFromLoaded(history, ...schoolNames);
}

export const UIL_RECENT_FOOTBALL_HISTORY_WINDOW = {
  startSeason: HISTORY_START_SEASON,
  endSeason: HISTORY_END_SEASON,
  sourceUrl: UIL_FOOTBALL_ARCHIVE_URL,
  pageOffsets: ARCHIVE_PAGE_OFFSETS,
} as const;
