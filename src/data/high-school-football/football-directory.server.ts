import { footballIsdProfilePath } from './football-isd-slugs';
import { footballProgramProfilePath } from './program-slugs';
import { getExactUilFootballEnrollment } from './football-enrollment-resolver.server';
import type { UilFootballExactEnrollment } from './uil-football-enrollments-2026.generated';
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
  schoolNumber?: string;
  districtNumber?: string;
  schoolWebsite?: string;
  districtWebsite?: string;
};

export type FootballProgramDirectoryResult = UilFootballProgram & {
  profilePath: string;
  officialSchoolName?: string;
  districtName?: string;
  isdProfilePath?: string;
  countyName?: string;
  city?: string;
  teaSchoolNumber?: string;
  teaDistrictNumber?: string;
  teaSchoolProfileUrl?: string;
  teaDistrictProfileUrl?: string;
  schoolWebsite?: string;
  districtWebsite?: string;
  uilEnrollment?: number;
  uilSubmittedConference?: UilFootballExactEnrollment['submittedConference'];
  recentHistory?: UilRecentFootballHistory;
  allTimeHistory?: UilAllTimeFootballHistory;
};

let directoryCache: { loadedAt: number; rows: TeaSchoolDirectoryRecord[] } | null = null;
let allProgramDirectoryCache: { loadedAt: number; programs: FootballProgramDirectoryResult[] } | null = null;

function normalizeHeader(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function normalizeTeaId(value: string | undefined, expectedLength: number) {
  if (!value) return undefined;
  const digits = value.replace(/^'+/, '').replace(/\D/g, '');
  return digits.length === expectedLength ? digits : undefined;
}

function normalizeOfficialUrl(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed.replace(/^\/+/, '')}`;
  try {
    const url = new URL(candidate);
    if (!['http:', 'https:'].includes(url.protocol)) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

function teaSchoolProfileUrl(schoolNumber?: string) {
  const id = normalizeTeaId(schoolNumber, 9);
  return id ? `https://txschools.gov/?id=${id}&view=school` : undefined;
}

function teaDistrictProfileUrl(districtNumber?: string) {
  const id = normalizeTeaId(districtNumber, 6);
  return id ? `https://txschools.gov/?id=${id}&view=district` : undefined;
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
  const schoolNumberIndex = findColumn(headers, ['schoolnumber', 'campusnumber', 'campusid', 'schoolid']);
  const districtNumberIndex = findColumn(headers, ['districtnumber', 'districtid', 'leanumber', 'leaid']);
  const schoolWebsiteIndex = findColumn(headers, ['schoolwebsite', 'campuswebsite', 'schoolwebaddress', 'campuswebaddress']);
  const districtWebsiteIndex = findColumn(headers, ['districtwebsite', 'districtwebaddress', 'leawebsite']);

  if (schoolIndex < 0 || districtIndex < 0) {
    throw new Error('AskTED school and district columns were not found.');
  }

  return parsed
    .map((row) => ({
      schoolName: row[schoolIndex]?.trim() ?? '',
      districtName: row[districtIndex]?.trim() ?? '',
      countyName: countyIndex >= 0 ? (row[countyIndex]?.trim() ?? '') : '',
      city: cityIndex >= 0 ? (row[cityIndex]?.trim() ?? '') : '',
      schoolNumber: schoolNumberIndex >= 0 ? normalizeTeaId(row[schoolNumberIndex], 9) : undefined,
      districtNumber: districtNumberIndex >= 0 ? normalizeTeaId(row[districtNumberIndex], 6) : undefined,
      schoolWebsite: schoolWebsiteIndex >= 0 ? normalizeOfficialUrl(row[schoolWebsiteIndex]) : undefined,
      districtWebsite: districtWebsiteIndex >= 0 ? normalizeOfficialUrl(row[districtWebsiteIndex]) : undefined,
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

type PreparedTeaDirectoryRecord = {
  record: TeaSchoolDirectoryRecord;
  schoolKey: string;
  districtSchool: string;
  citySchool: string;
  schoolTokens: string[];
};

type TeaDirectoryMatcher = {
  rows: PreparedTeaDirectoryRecord[];
  byDistrictSchool: Map<string, PreparedTeaDirectoryRecord[]>;
  byCitySchool: Map<string, PreparedTeaDirectoryRecord[]>;
  bySchool: Map<string, PreparedTeaDirectoryRecord[]>;
};

function addDirectoryIndex(
  index: Map<string, PreparedTeaDirectoryRecord[]>,
  key: string,
  row: PreparedTeaDirectoryRecord,
) {
  if (!key) return;
  const current = index.get(key);
  if (current) current.push(row);
  else index.set(key, [row]);
}

function buildDirectoryMatcher(rows: TeaSchoolDirectoryRecord[]): TeaDirectoryMatcher {
  const prepared = rows.map((record) => {
    const schoolKey = cleanName(record.schoolName);
    const districtKey = cleanName(record.districtName);
    const cityKey = cleanName(record.city);
    return {
      record,
      schoolKey,
      districtSchool: cleanName(`${districtKey} ${schoolKey}`),
      citySchool: cleanName(`${cityKey} ${schoolKey}`),
      schoolTokens: schoolKey.split(' ').filter(Boolean),
    } satisfies PreparedTeaDirectoryRecord;
  });

  const byDistrictSchool = new Map<string, PreparedTeaDirectoryRecord[]>();
  const byCitySchool = new Map<string, PreparedTeaDirectoryRecord[]>();
  const bySchool = new Map<string, PreparedTeaDirectoryRecord[]>();

  for (const row of prepared) {
    addDirectoryIndex(byDistrictSchool, row.districtSchool, row);
    addDirectoryIndex(byCitySchool, row.citySchool, row);
    addDirectoryIndex(bySchool, row.schoolKey, row);
  }

  return { rows: prepared, byDistrictSchool, byCitySchool, bySchool };
}

function fuzzyMatchScore(
  programKey: string,
  programTokens: Set<string>,
  row: PreparedTeaDirectoryRecord,
) {
  const { schoolKey, districtSchool, citySchool, schoolTokens } = row;
  if (!programKey || !schoolKey) return 0;
  if (schoolKey.length >= 6 && (programKey.endsWith(` ${schoolKey}`) || programKey.startsWith(`${schoolKey} `))) return 96;
  if (districtSchool.length >= 7 && (programKey.includes(districtSchool) || districtSchool.includes(programKey))) return 94;
  if (citySchool.length >= 7 && (programKey.includes(citySchool) || citySchool.includes(programKey))) return 92;
  if (schoolTokens.length >= 2 && schoolTokens.every((token) => programTokens.has(token))) return 88;
  return 0;
}

function bestDirectoryMatch(program: UilFootballProgram, matcher: TeaDirectoryMatcher) {
  const programKey = cleanName(program.schoolName);
  if (!programKey) return null;

  const districtExact = matcher.byDistrictSchool.get(programKey);
  if (districtExact?.length) return districtExact[0].record;

  const cityExact = matcher.byCitySchool.get(programKey);
  if (cityExact?.length) return cityExact[0].record;

  const schoolExact = matcher.bySchool.get(programKey);
  if (schoolExact?.length === 1) return schoolExact[0].record;
  if ((schoolExact?.length ?? 0) > 1) return null;

  const programTokens = new Set(programKey.split(' ').filter(Boolean));
  let best: { record: TeaSchoolDirectoryRecord; score: number } | null = null;
  for (const row of matcher.rows) {
    const score = fuzzyMatchScore(programKey, programTokens, row);
    if (score > (best?.score ?? 0)) best = { record: row.record, score };
  }
  return best && best.score >= 88 ? best.record : null;
}

function withDirectory(program: UilFootballProgram, matcher: TeaDirectoryMatcher): FootballProgramDirectoryResult {
  const record = bestDirectoryMatch(program, matcher);
  const exactEnrollment = getExactUilFootballEnrollment(program.schoolName);
  const exactFields = exactEnrollment ? {
    uilEnrollment: exactEnrollment.enrollment,
    uilSubmittedConference: exactEnrollment.submittedConference,
  } : {};
  return record ? {
    ...program,
    ...exactFields,
    profilePath: footballProgramProfilePath(program.schoolName),
    officialSchoolName: record.schoolName,
    districtName: record.districtName,
    isdProfilePath: footballIsdProfilePath(record.districtName),
    countyName: record.countyName,
    city: record.city,
    teaSchoolNumber: record.schoolNumber,
    teaDistrictNumber: record.districtNumber,
    teaSchoolProfileUrl: teaSchoolProfileUrl(record.schoolNumber),
    teaDistrictProfileUrl: teaDistrictProfileUrl(record.districtNumber),
    schoolWebsite: record.schoolWebsite,
    districtWebsite: record.districtWebsite,
  } : {
    ...program,
    ...exactFields,
    profilePath: footballProgramProfilePath(program.schoolName),
  };
}

function includesQuery(value: string, query: string) {
  const normalizedValue = cleanName(value);
  return normalizedValue.includes(query) || cleanName(expandSearchName(value)).includes(query);
}

export async function loadAllFootballProgramsWithDirectory() {
  if (allProgramDirectoryCache && Date.now() - allProgramDirectoryCache.loadedAt < CACHE_TTL_MS) {
    return allProgramDirectoryCache.programs;
  }

  const directory = await loadTeaSchoolDirectory();
  const directoryMatcher = buildDirectoryMatcher(directory);
  const programs = UIL_FOOTBALL_PROGRAMS_2026
    .map((program) => withDirectory(program, directoryMatcher))
    .sort((a, b) => {
      const classDiff = Number(b.classification[0]) - Number(a.classification[0]);
      if (classDiff) return classDiff;
      if ((a.division ?? 0) !== (b.division ?? 0)) return (a.division ?? 0) - (b.division ?? 0);
      return a.schoolName.localeCompare(b.schoolName);
    });

  allProgramDirectoryCache = { loadedAt: Date.now(), programs };
  return programs;
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
    const relevantMatcher = buildDirectoryMatcher(relevantDirectory);
    candidates = candidates.filter((program) => bestDirectoryMatch(program, relevantMatcher));
  } else if (query) {
    const direct = candidates.filter((program) => includesQuery(program.schoolName, query));
    if (directoryAvailable) {
      const queryRows = directory.filter((record) =>
        includesQuery(record.schoolName, query)
        || includesQuery(record.districtName, query)
        || includesQuery(record.countyName, query)
        || includesQuery(record.city, query),
      );
      const queryMatcher = queryRows.length ? buildDirectoryMatcher(queryRows) : null;
      const fromDirectory = queryMatcher
        ? candidates.filter((program) => bestDirectoryMatch(program, queryMatcher))
        : [];
      candidates = [...new Map([...direct, ...fromDirectory].map((program) => [
        `${program.classification}:${program.division ?? 'x'}:${program.district}:${program.schoolName}`,
        program,
      ])).values()];
    } else {
      candidates = direct;
    }
  }

  const directoryMatcher = buildDirectoryMatcher(directoryAvailable ? directory : []);
  const enriched = candidates
    .map((program) => {
      const base = withDirectory(program, directoryMatcher);
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
