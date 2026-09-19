import { getFeaturedFootballProgramProfile } from './featured-program-profile.server';
import {
  FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS,
  getFeaturedFootballProgram,
  matchFeaturedFootballProgram,
  normalizeFeaturedFootballName,
} from './featured-programs';
import { searchFootballPrograms, type FootballProgramDirectoryResult } from './football-directory.server';
import { getOfficialFootballEnrollmentLink } from './official-enrollment-links';
import { getVerifiedFootballVenueLinks, type VerifiedFootballVenueLink } from './football-venue-links.server';
import { footballDistrictProfilePath } from './football-districts.server';
import type { VerifiedPrivateFootballAlignment } from './private-football-alignments';
import type { VerifiedPrivateSchoolAdmissions } from './private-school-admissions';
import { footballClassificationRank, footballProgramProfilePath, footballProgramSlug } from './program-slugs';
import { UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28 } from './uil-football-enrollments-2026.generated';
import { getVerifiedFootballSchoolIdentity } from './school-identities';
import { UIL_FOOTBALL_PROGRAMS_2026, type UilFootballProgram } from './uil-football-alignments-2026.server';

export type FootballProgramProfilePeer = {
  schoolName: string;
  classification: UilFootballProgram['classification'];
  division: UilFootballProgram['division'];
  district: number;
  footballType: UilFootballProgram['footballType'];
  profilePath: string;
};

export type FootballProgramProfile = {
  slug: string;
  displayName: string;
  program: FootballProgramDirectoryResult | null;
  identity: ReturnType<typeof getVerifiedFootballSchoolIdentity> | null;
  enrollmentLink: ReturnType<typeof getOfficialFootballEnrollmentLink> | null;
  districtPeers: FootballProgramProfilePeer[];
  districtPath: string | null;
  venueLinks: VerifiedFootballVenueLink[];
  governingBodyHint?: 'SPC' | 'TAPPS' | 'TCAL';
  associationClassification?: string;
  associationSourceUrl?: string;
  privateAlignment: VerifiedPrivateFootballAlignment | null;
  privateAdmissions: VerifiedPrivateSchoolAdmissions | null;
};

export type FootballProgramDirectoryEntry = {
  slug: string;
  profilePath: string;
  schoolName: string;
  classification: UilFootballProgram['classification'];
  division: UilFootballProgram['division'];
  district: number;
  footballType: UilFootballProgram['footballType'];
  uilEnrollment: number;
};

const PROGRAM_BY_SLUG = new Map<string, UilFootballProgram>();

for (const program of UIL_FOOTBALL_PROGRAMS_2026) {
  const slug = footballProgramSlug(program.schoolName);
  if (!slug) throw new Error(`UIL football program is missing a canonical slug: ${program.schoolName}`);
  const existing = PROGRAM_BY_SLUG.get(slug);
  if (existing) {
    throw new Error(`UIL football program slug collision: ${existing.schoolName} and ${program.schoolName} -> ${slug}`);
  }
  PROGRAM_BY_SLUG.set(slug, program);
}

if (PROGRAM_BY_SLUG.size !== 1268) {
  throw new Error(`UIL football profile index expected 1,268 programs; found ${PROGRAM_BY_SLUG.size}.`);
}

function findLegacyUilProgram(slug: string) {
  const legacy = getFeaturedFootballProgram(slug);
  if (!legacy) return null;
  const aliases = new Set(
    [legacy.displayName, legacy.searchName, ...legacy.aliases]
      .map(normalizeFeaturedFootballName)
      .filter(Boolean),
  );
  return UIL_FOOTBALL_PROGRAMS_2026.find((program) =>
    aliases.has(normalizeFeaturedFootballName(program.schoolName)),
  ) ?? null;
}

function findUilProgram(slug: string) {
  return PROGRAM_BY_SLUG.get(slug) ?? findLegacyUilProgram(slug);
}

function exactProgramMatch(program: UilFootballProgram, candidates: FootballProgramDirectoryResult[]) {
  return candidates.find((candidate) =>
    candidate.schoolName === program.schoolName
    && candidate.classification === program.classification
    && candidate.division === program.division
    && candidate.district === program.district,
  );
}

function districtPeers(program: UilFootballProgram): FootballProgramProfilePeer[] {
  return UIL_FOOTBALL_PROGRAMS_2026
    .filter((candidate) =>
      candidate.schoolName !== program.schoolName
      && candidate.classification === program.classification
      && candidate.division === program.division
      && candidate.district === program.district,
    )
    .map((candidate) => ({
      schoolName: candidate.schoolName,
      classification: candidate.classification,
      division: candidate.division,
      district: candidate.district,
      footballType: candidate.footballType,
      profilePath: footballProgramProfilePath(candidate.schoolName),
    }))
    .sort((left, right) => left.schoolName.localeCompare(right.schoolName));
}

export async function getFootballProgramProfile(slug: string): Promise<FootballProgramProfile | null> {
  const seed = findUilProgram(slug);

  if (!seed) {
    const legacy = await getFeaturedFootballProgramProfile(slug);
    if (!legacy) return null;
    return {
      slug: legacy.featured.slug,
      displayName: legacy.featured.displayName,
      program: legacy.program,
      identity: legacy.identity,
      enrollmentLink: legacy.enrollmentLink,
      districtPeers: [],
      districtPath: null,
      venueLinks: [],
      governingBodyHint: legacy.featured.governingBodyHint,
      associationClassification: legacy.featured.associationClassification,
      associationSourceUrl: legacy.featured.associationSourceUrl,
      privateAlignment: legacy.privateAlignment,
      privateAdmissions: legacy.privateAdmissions,
    };
  }

  const result = await searchFootballPrograms({ query: seed.schoolName, limit: 100 });
  const exactEnrollment = UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28[seed.schoolName];
  const program: FootballProgramDirectoryResult = exactProgramMatch(seed, result.programs) ?? {
    ...seed,
    profilePath: footballProgramProfilePath(seed.schoolName),
    ...(exactEnrollment ? {
      uilEnrollment: exactEnrollment.enrollment,
      uilSubmittedConference: exactEnrollment.submittedConference,
    } : {}),
  };
  const legacyIdentity = matchFeaturedFootballProgram(program.schoolName, program.officialSchoolName);
  const canonicalSlug = footballProgramSlug(seed.schoolName);
  const displayName = program.officialSchoolName || seed.schoolName;

  return {
    slug: canonicalSlug,
    displayName,
    program,
    identity: getVerifiedFootballSchoolIdentity(legacyIdentity?.slug ?? canonicalSlug) ?? null,
    enrollmentLink: getOfficialFootballEnrollmentLink(program.districtName) ?? null,
    districtPeers: districtPeers(seed),
    districtPath: footballDistrictProfilePath(seed.classification, seed.division, seed.district),
    venueLinks: getVerifiedFootballVenueLinks({
      schoolName: program.schoolName,
      officialSchoolName: program.officialSchoolName,
      districtName: program.districtName,
    }),
    privateAlignment: null,
    privateAdmissions: null,
  };
}

export function getAllUilFootballPrograms(): FootballProgramDirectoryEntry[] {
  return UIL_FOOTBALL_PROGRAMS_2026
    .map((program) => ({
      slug: footballProgramSlug(program.schoolName),
      profilePath: footballProgramProfilePath(program.schoolName),
      schoolName: program.schoolName,
      classification: program.classification,
      division: program.division,
      district: program.district,
      footballType: program.footballType,
      uilEnrollment: UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28[program.schoolName]?.enrollment ?? 0,
    }))
    .sort((left, right) => {
      const classDiff = footballClassificationRank(right.classification) - footballClassificationRank(left.classification);
      if (classDiff) return classDiff;
      const leftDivision = left.division ?? 0;
      const rightDivision = right.division ?? 0;
      if (leftDivision !== rightDivision) return leftDivision - rightDivision;
      return left.schoolName.localeCompare(right.schoolName);
    });
}

export function footballProgramSitemapEntries() {
  return getAllUilFootballPrograms().map((program) => ({
    path: program.profilePath,
    lastmod: '2026-09-19',
  }));
}

export function privateFootballProgramSitemapEntries() {
  return FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS
    .filter((program) => !findLegacyUilProgram(program.slug))
    .map((program) => ({
      path: `/texas-high-school-football-teams/${program.slug}`,
      lastmod: '2026-09-19',
    }));
}
