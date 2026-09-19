import { footballProgramProfilePath } from './program-slugs';
import { UIL_FOOTBALL_PROGRAMS_2026, type UilFootballProgram } from './uil-football-alignments-2026.server';
import {
  loadUilRecentFootballHistory,
  recentFootballHistoryFromLoaded,
  type UilRecentFootballHistory,
} from './uil-football-recent-history.server';
import {
  allTimeFootballHistoryFromLoaded,
  loadUilAllTimeFootballHistory,
  type UilAllTimeFootballHistory,
} from './uil-football-all-time-history.server';

const TEA_DIRECTORY_URL = 'https://tealprod.tea.state.tx.us/Tea.AskTed.Web/Forms/DownloadSite.aspx';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

export type TeaSchoolDirectoryRecord = {
  schoolName: string;
  districtName: string;
  countyName: string;
  city: string;
};

export type FootballProgramDirectoryResult = UilFootballProgram & {
  profilePath: string;
  officialSchoolName?: string;
  districtName?: string;
  countyName?: string;
  city?: string;
  recentHistory?: UilRecentFootballHistory;
  allTimeHistory?: UilAllTimeFootballHistory;
};

let directoryCache: { loadedAt: number; rows: TeaSchoolDirectoryRecord[] } | null = null;

function normalizeHeader(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function cleanName(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\bhigh\s+school\b/g, ' ')
    .replace(/\bh\s*s\b/g, ' ')
    .replace(/\bindependent\s+school\s+district\b/g, ' ')
    .replace(/\bschool\s+district\b/g, ' ')
    .replace(/\bisd\b/g, ' ')
    .replace(/\bconsolidated\s+independent\s+school\s+district\b/g, ' ')
    .replace(/\bcisd\b/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9 ]/g, '')
    .trim();
}

function expandSearchName(value: string) {
  return value
    .replace(/^cypress\s+/i, 'cyp ')
    .replace(/^corpus christi\s+/i, 'cc ')
    .replace(/^san antonio\s+/i, 'sa ')
    .replace(/^fort worth\s+/i, 'ft worth ')
    .replace(/^wichita falls\s+/i, 'wf ')
    .replace(/^league city\s+/i, 'lc ')
    .replace(/^round rock\s+/i, 'rr ');
}

function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
      continue;
    }
    if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(field.trim());
      field = '';
    } else if (char === '\n') {
      row.push(field.trim().replace(/\r$/, ''));
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }
  if (field.length || row.length) {
    row.push(field.trim());
    rows.push(row);
  }
  return rows;
}

function findColumn(headers: string[], candidates: string[]) {
  const normalized = headers.map(normalizeHeader);
  for (const candidate of candidates) {
    const exact = normalized.indexOf(candidate);
    if (exact >= 0) return exact;
  }
  for (const candidate of candidates) {
    const partial = normalized.findIndex((header) => header.includes(candidate));
    if (partial >= 0) return partial;
  }
  return -1;
}

function parseTeaDirectory(text: string): TeaSchoolDirectoryRecord[] {
  const parsed = parseCsv(text);
  const headers = parsed.shift();
  if (!headers) return [];

  const schoolIndex = findColumn(headers, ['schoolname', 'campusname']);
  const districtIndex = findColumn(headers, ['districtname', 'leaname']);
  const countyIndex = findColumn(headers, ['countyname', 'county']);
  const cityIndex = findColumn(headers, ['sitecity', 'schoolcity', 'city']);

  if (schoolIndex < 0 || districtIndex < 0) {
    throw new Error('AskTED school and district columns were not found.');
  }

  return parsed
    .map((row) => ({
      schoolName: row[schoolIndex]?.trim() ?? '',
      districtName: row[districtIndex]?.trim() ?? '',
      countyName: countyIndex >= 0 ? (row[countyIndex]?.trim() ?? '') : '',
      city: cityIndex >= 0 ? (row[cityIndex]?.trim() ?? '') : '',
    }))
    .filter((row) => row.schoolName && row.districtName);
}

export async function loadTeaSchoolDirectory() {
  if (directoryCache && Date.now() - directoryCache.loadedAt < CACHE_TTL_MS) return directoryCache.rows;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const response = await fetch(TEA_DIRECTORY_URL, {
      headers: { accept: 'text/csv,text/plain;q=0.9,*/*;q=0.1' },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`AskTED returned ${response.status}`);
    const rows = parseTeaDirectory(await response.text());
    if (!rows.length) throw new Error('AskTED returned no school rows.');
    directoryCache = { loadedAt: Date.now(), rows };
    return rows;
  } finally {
    clearTimeout(timeout);
  }
}

function matchScore(program: UilFootballProgram, record: TeaSchoolDirectoryRecord) {
  const programKey = cleanName(program.schoolName);
  const schoolKey = cleanName(record.schoolName);
  const districtKey = cleanName(record.districtName);
  const cityKey = cleanName(record.city);
  if (!programKey || !schoolKey) return 0;

  const districtSchool = cleanName(`${districtKey} ${schoolKey}`);
  const citySchool = cleanName(`${cityKey} ${schoolKey}`);

  if (programKey === districtSchool) return 130;
  if (programKey === citySchool) return 125;
  if (programKey === schoolKey) return 100;
  if (schoolKey.length >= 6 && (programKey.endsWith(` ${schoolKey}`) || programKey.startsWith(`${schoolKey} `))) return 96;
  if (districtSchool.length >= 7 && (programKey.includes(districtSchool) || districtSchool.includes(programKey))) return 94;
  if (citySchool.length >= 7 && (programKey.includes(citySchool) || citySchool.includes(programKey))) return 92;

  const programTokens = new Set(programKey.split(' ').filter(Boolean));
  const schoolTokens = schoolKey.split(' ').filter(Boolean);
  if (schoolTokens.length >= 2 && schoolTokens.every((token) => programTokens.has(token))) return 88;
  return 0;
}

function bestDirectoryMatch(program: UilFootballProgram, rows: TeaSchoolDirectoryRecord[]) {
  let best: { record: TeaSchoolDirectoryRecord; score: number } | null = null;
  let tied = false;
  for (const record of rows) {
    const score = matchScore(program, record);
    if (score > (best?.score ?? 0)) {
      best = { record, score };
      tied = false;
    } else if (best && score === best.score && score >= 100) {
      tied = true;
    }
  }
  if (!best || best.score < 88 || (tied && best.score <= 100)) return null;
  return best.record;
}

function withDirectory(program: UilFootballProgram, rows: TeaSchoolDirectoryRecord[]): FootballProgramDirectoryResult {
  const record = bestDirectoryMatch(program, rows);
  return record ? {
    ...program,
    profilePath: footballProgramProfilePath(program.schoolName),
    officialSchoolName: record.schoolName,
    districtName: record.districtName,
    countyName: record.countyName,
    city: record.city,
  } : {
    ...program,
    profilePath: footballProgramProfilePath(program.schoolName),
  };
}

function includesQuery(value: string, query: string) {
  const normalizedValue = cleanName(value);
  return normalizedValue.includes(query) || cleanName(expandSearchName(value)).includes(query);
}

export async function searchFootballPrograms(options: {
  query?: string;
  county?: string;
  district?: string;
  limit?: number;
}) {
  const query = cleanName(options.query ?? '');
  const county = cleanName(options.county ?? '').replace(/\bcounty\b/g, '').trim();
  const district = cleanName(options.district ?? '');
  const limit = Math.min(Math.max(options.limit ?? 50, 1), 500);

  const [directoryResult, historyResult, allTimeHistoryResult] = await Promise.allSettled([
    loadTeaSchoolDirectory(),
    loadUilRecentFootballHistory(),
    loadUilAllTimeFootballHistory(),
  ]);

  const directoryAvailable = directoryResult.status === 'fulfilled';
  const historyAvailable = historyResult.status === 'fulfilled';
  const allTimeHistoryAvailable = allTimeHistoryResult.status === 'fulfilled';
  const directory: TeaSchoolDirectoryRecord[] = directoryAvailable ? directoryResult.value : [];
  const recentHistory = historyAvailable ? historyResult.value : null;
  const allTimeHistory = allTimeHistoryAvailable ? allTimeHistoryResult.value : null;

  let relevantDirectory = directory;
  if (county) {
    relevantDirectory = relevantDirectory.filter((record) => cleanName(record.countyName).replace(/\bcounty\b/g, '').trim() === county);
  }
  if (district) {
    relevantDirectory = relevantDirectory.filter((record) => cleanName(record.districtName).includes(district));
  }

  let candidates: readonly UilFootballProgram[] = UIL_FOOTBALL_PROGRAMS_2026;

  if (county || district) {
    if (!directoryAvailable) {
      return {
        programs: [] as FootballProgramDirectoryResult[],
        directoryAvailable,
        historyAvailable,
        allTimeHistoryAvailable,
        matchedTotal: 0,
      };
    }
    candidates = candidates.filter((program) => bestDirectoryMatch(program, relevantDirectory));
  } else if (query) {
    const direct = candidates.filter((program) => includesQuery(program.schoolName, query));
    if (directoryAvailable) {
      const queryRows = directory.filter((record) =>
        includesQuery(record.schoolName, query)
        || includesQuery(record.districtName, query)
        || includesQuery(record.countyName, query)
        || includesQuery(record.city, query),
      );
      const fromDirectory = queryRows.length
        ? candidates.filter((program) => bestDirectoryMatch(program, queryRows))
        : [];
      candidates = [...new Map([...direct, ...fromDirectory].map((program) => [
        `${program.classification}:${program.division ?? 'x'}:${program.district}:${program.schoolName}`,
        program,
      ])).values()];
    } else {
      candidates = direct;
    }
  }

  const enriched = candidates
    .map((program) => {
      const base = withDirectory(program, directoryAvailable ? directory : []);
      const history = recentHistory
        ? recentFootballHistoryFromLoaded(recentHistory, base.schoolName, base.officialSchoolName)
        : null;
      const allTime = allTimeHistory
        ? allTimeFootballHistoryFromLoaded(allTimeHistory, history, base.schoolName, base.officialSchoolName)
        : null;
      return {
        ...base,
        ...(history ? { recentHistory: history } : {}),
        ...(allTime ? { allTimeHistory: allTime } : {}),
      };
    })
    .sort((a, b) => {
      const classDiff = Number(b.classification[0]) - Number(a.classification[0]);
      if (classDiff) return classDiff;
      if ((a.division ?? 0) !== (b.division ?? 0)) return (a.division ?? 0) - (b.division ?? 0);
      return a.schoolName.localeCompare(b.schoolName);
    });

  return {
    programs: enriched.slice(0, limit),
    directoryAvailable,
    historyAvailable,
    allTimeHistoryAvailable,
    matchedTotal: enriched.length,
  };
}

export const FOOTBALL_DIRECTORY_SOURCES = {
  uil: 'https://realignment.uiltexas.org/',
  tea: TEA_DIRECTORY_URL,
  uilRecentHistory: 'https://www.uiltexas.org/football/archives',
  uilAllTimeHistory: 'https://www.uiltexas.org/football/all-time-appearances',
} as const;
