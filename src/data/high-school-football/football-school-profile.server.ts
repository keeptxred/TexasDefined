import { getFeaturedFootballProgramProfile } from './featured-program-profile.server';
import { searchFootballPrograms, type FootballProgramDirectoryResult } from './football-directory.server';
import { getOfficialFootballEnrollmentLink } from './official-enrollment-links';
import { matchFeaturedFootballProgram } from './featured-programs';
import { getVerifiedFootballSchoolIdentity } from './school-identities';
import { UIL_FOOTBALL_PROGRAMS_2026 } from './uil-football-alignments-2026.server';
import {
  getUilFootballProfileRecord,
  UIL_FOOTBALL_PROFILE_RECORDS,
  uilFootballProfilePath,
  type UilFootballProfileRecord,
} from './uil-football-profile-index.server';

export type FootballSchoolProfile = {
  school: {
    slug: string;
    displayName: string;
    governingBody: 'UIL' | 'SPC' | 'TAPPS' | 'TCAL' | 'Unverified';
    associationClassification?: string;
    associationSourceUrl?: string;
    isUil: boolean;
  };
  program: FootballProgramDirectoryResult | null;
  identity: ReturnType<typeof getVerifiedFootballSchoolIdentity> | null;
  enrollmentLink: ReturnType<typeof getOfficialFootballEnrollmentLink> | null;
  districtPeers: Array<{
    schoolName: string;
    displayName: string;
    classification: UilFootballProfileRecord['classification'];
    division: UilFootballProfileRecord['division'];
    district: number;
    footballType: UilFootballProfileRecord['footballType'];
    profilePath: string;
  }>;
};

function exactProgramForRecord(record: UilFootballProfileRecord) {
  return UIL_FOOTBALL_PROGRAMS_2026.find((program) =>
    program.schoolName === record.schoolName
    && program.classification === record.classification
    && program.division === record.division
    && program.district === record.district
  ) ?? null;
}

async function loadUilProfile(record: UilFootballProfileRecord): Promise<FootballSchoolProfile> {
  const seed = exactProgramForRecord(record);
  if (!seed) throw new Error(`UIL football profile index could not resolve source program: ${record.schoolName}`);

  const result = await searchFootballPrograms({ query: seed.schoolName, limit: 100 });
  const program = result.programs.find((candidate) =>
    candidate.schoolName === seed.schoolName
    && candidate.classification === seed.classification
    && candidate.division === seed.division
    && candidate.district === seed.district
  ) ?? { ...seed };

  const existingProfile = matchFeaturedFootballProgram(seed.schoolName);
  const identitySlug = existingProfile?.slug ?? record.slug;

  const districtPeers = UIL_FOOTBALL_PROFILE_RECORDS
    .filter((candidate) =>
      candidate.schoolName !== record.schoolName
      && candidate.classification === record.classification
      && candidate.division === record.division
      && candidate.district === record.district,
    )
    .map((candidate) => ({
      schoolName: candidate.schoolName,
      displayName: candidate.displayName,
      classification: candidate.classification,
      division: candidate.division,
      district: candidate.district,
      footballType: candidate.footballType,
      profilePath: uilFootballProfilePath(candidate),
    }))
    .sort((left, right) => left.displayName.localeCompare(right.displayName));

  return {
    school: {
      slug: record.slug,
      displayName: record.displayName,
      governingBody: 'UIL',
      isUil: true,
    },
    program,
    identity: getVerifiedFootballSchoolIdentity(identitySlug) ?? null,
    enrollmentLink: getOfficialFootballEnrollmentLink(program.districtName) ?? null,
    districtPeers,
  };
}

export async function getFootballSchoolProfile(slug: string): Promise<FootballSchoolProfile | null> {
  const uilRecord = getUilFootballProfileRecord(slug);
  if (uilRecord) return loadUilProfile(uilRecord);

  const legacy = await getFeaturedFootballProgramProfile(slug);
  if (!legacy || legacy.program) return null;

  return {
    school: {
      slug: legacy.featured.slug,
      displayName: legacy.featured.displayName,
      governingBody: legacy.featured.governingBodyHint ?? 'Unverified',
      associationClassification: legacy.featured.associationClassification,
      associationSourceUrl: legacy.featured.associationSourceUrl,
      isUil: false,
    },
    program: null,
    identity: legacy.identity,
    enrollmentLink: legacy.enrollmentLink,
    districtPeers: [],
  };
}
