import {
  loadAllFootballProgramsWithDirectory,
  type FootballProgramDirectoryResult,
} from './football-directory.server';
import { footballIsdProfilePath, footballIsdSlug } from './football-isd-slugs';
import { getOfficialFootballEnrollmentLink } from './official-enrollment-links';
import { footballClassificationRank } from './program-slugs';

export type FootballIsdProgram = Pick<
  FootballProgramDirectoryResult,
  | 'schoolName'
  | 'officialSchoolName'
  | 'profilePath'
  | 'classification'
  | 'division'
  | 'district'
  | 'footballType'
  | 'uilEnrollment'
  | 'city'
  | 'countyName'
  | 'teaSchoolProfileUrl'
  | 'schoolWebsite'
>;

export type FootballIsdSummary = {
  slug: string;
  profilePath: string;
  districtName: string;
  programCount: number;
  highestClassification: FootballProgramDirectoryResult['classification'];
  countyNames: string[];
  cities: string[];
  teaDistrictProfileUrl?: string;
  districtWebsite?: string;
};

export type FootballIsdProfile = FootballIsdSummary & {
  programs: FootballIsdProgram[];
  enrollmentLink: ReturnType<typeof getOfficialFootballEnrollmentLink> | null;
};

type BuiltFootballIsdDirectory = {
  isds: FootballIsdProfile[];
  matchedProgramCount: number;
  unmatchedProgramCount: number;
};

function comparePrograms(left: FootballIsdProgram, right: FootballIsdProgram) {
  const classDiff = footballClassificationRank(right.classification) - footballClassificationRank(left.classification);
  if (classDiff) return classDiff;
  const leftDivision = left.division ?? 0;
  const rightDivision = right.division ?? 0;
  if (leftDivision !== rightDivision) return leftDivision - rightDivision;
  return left.schoolName.localeCompare(right.schoolName);
}

function uniqueSorted(values: Array<string | undefined>) {
  return [...new Set(values.filter((value): value is string => Boolean(value?.trim())).map((value) => value.trim()))]
    .sort((left, right) => left.localeCompare(right));
}

// Match the upstream AskTED cache's six-hour lifetime. This directory previously
// regrouped all 1,268 UIL programs for every SSR ISD profile request even when
// the underlying matched program data had not changed.
const ISD_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
let isdDirectoryCache: { loadedAt: number; built: BuiltFootballIsdDirectory } | null = null;
let isdDirectoryInFlight: Promise<BuiltFootballIsdDirectory> | null = null;

async function assembleFootballIsdDirectory(): Promise<BuiltFootballIsdDirectory> {
  const programs = await loadAllFootballProgramsWithDirectory();
  const grouped = new Map<string, FootballProgramDirectoryResult[]>();
  const districtNameBySlug = new Map<string, string>();
  let unmatchedProgramCount = 0;

  for (const program of programs) {
    if (!program.districtName) {
      unmatchedProgramCount += 1;
      continue;
    }

    const slug = footballIsdSlug(program.districtName);
    if (!slug) {
      unmatchedProgramCount += 1;
      continue;
    }

    const existingName = districtNameBySlug.get(slug);
    if (existingName && existingName !== program.districtName) {
      throw new Error(`Football ISD slug collision: ${existingName} and ${program.districtName} -> ${slug}`);
    }
    districtNameBySlug.set(slug, program.districtName);

    const current = grouped.get(slug) ?? [];
    current.push(program);
    grouped.set(slug, current);
  }

  const isds = [...grouped.entries()].map(([slug, rows]) => {
    const ordered = [...rows].sort(comparePrograms);
    const sourceDistrictName = districtNameBySlug.get(slug)!;
    const enrollmentLink = getOfficialFootballEnrollmentLink(sourceDistrictName) ?? null;
    const districtName = enrollmentLink?.districtName ?? sourceDistrictName;
    const first = ordered[0];

    return {
      slug,
      profilePath: footballIsdProfilePath(sourceDistrictName),
      districtName,
      programCount: ordered.length,
      highestClassification: first.classification,
      countyNames: uniqueSorted(ordered.map((program) => program.countyName)),
      cities: uniqueSorted(ordered.map((program) => program.city)),
      teaDistrictProfileUrl: ordered.find((program) => program.teaDistrictProfileUrl)?.teaDistrictProfileUrl,
      districtWebsite: ordered.find((program) => program.districtWebsite)?.districtWebsite,
      programs: ordered.map((program) => ({
        schoolName: program.schoolName,
        officialSchoolName: program.officialSchoolName,
        profilePath: program.profilePath,
        classification: program.classification,
        division: program.division,
        district: program.district,
        footballType: program.footballType,
        uilEnrollment: program.uilEnrollment,
        city: program.city,
        countyName: program.countyName,
        teaSchoolProfileUrl: program.teaSchoolProfileUrl,
        schoolWebsite: program.schoolWebsite,
      })),
      enrollmentLink,
    } satisfies FootballIsdProfile;
  }).sort((left, right) => left.districtName.localeCompare(right.districtName));

  const matchedProgramCount = isds.reduce((sum, district) => sum + district.programCount, 0);
  if (matchedProgramCount + unmatchedProgramCount !== 1268) {
    throw new Error(
      `Football ISD directory expected 1,268 UIL programs; matched ${matchedProgramCount} and left ${unmatchedProgramCount} unmatched.`,
    );
  }

  return { isds, matchedProgramCount, unmatchedProgramCount };
}

// Share both the completed index and concurrent cold-start builds across SSR
// requests. Never memoize a rejected remote-directory fetch.
async function buildFootballIsdDirectory(): Promise<BuiltFootballIsdDirectory> {
  if (isdDirectoryCache && Date.now() - isdDirectoryCache.loadedAt < ISD_CACHE_TTL_MS) {
    return isdDirectoryCache.built;
  }
  if (isdDirectoryInFlight) return isdDirectoryInFlight;
  isdDirectoryInFlight = assembleFootballIsdDirectory();
  try {
    const built = await isdDirectoryInFlight;
    isdDirectoryCache = { loadedAt: Date.now(), built };
    return built;
  } finally {
    isdDirectoryInFlight = null;
  }
}

export async function getFootballIsdDirectory() {
  const built = await buildFootballIsdDirectory();
  return {
    isds: built.isds.map(({ programs: _programs, enrollmentLink: _enrollmentLink, ...summary }) => summary),
    matchedProgramCount: built.matchedProgramCount,
    unmatchedProgramCount: built.unmatchedProgramCount,
  };
}

export async function getFootballIsdProfile(slug: string) {
  const built = await buildFootballIsdDirectory();
  return built.isds.find((district) => district.slug === slug) ?? null;
}

export async function footballIsdSitemapEntries() {
  const built = await buildFootballIsdDirectory();
  return built.isds.map((district) => ({
    path: district.profilePath,
    lastmod: '2026-09-20',
  }));
}
