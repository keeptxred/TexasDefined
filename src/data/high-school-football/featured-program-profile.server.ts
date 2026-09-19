import {
  getFeaturedFootballProgram,
  normalizeFeaturedFootballName,
  type FeaturedFootballProgram,
} from './featured-programs';
import { searchFootballPrograms, type FootballProgramDirectoryResult } from './football-directory.server';
import { getOfficialFootballEnrollmentLink } from './official-enrollment-links';
import { getVerifiedPrivateFootballAlignment } from './private-football-alignments';
import { getVerifiedPrivateSchoolAdmissions } from './private-school-admissions';
import { getVerifiedFootballSchoolIdentity } from './school-identities';
import { UIL_FOOTBALL_PROGRAMS_2026 } from './uil-football-alignments-2026.server';

export type FeaturedFootballProgramProfile = {
  featured: FeaturedFootballProgram;
  program: FootballProgramDirectoryResult | null;
  identity: ReturnType<typeof getVerifiedFootballSchoolIdentity> | null;
  enrollmentLink: ReturnType<typeof getOfficialFootballEnrollmentLink> | null;
  privateAlignment: ReturnType<typeof getVerifiedPrivateFootballAlignment> | null;
  privateAdmissions: ReturnType<typeof getVerifiedPrivateSchoolAdmissions> | null;
};

function normalizedAliases(featured: FeaturedFootballProgram) {
  return new Set(
    [featured.displayName, featured.searchName, ...featured.aliases]
      .map(normalizeFeaturedFootballName)
      .filter(Boolean),
  );
}

function seedUilProgram(featured: FeaturedFootballProgram) {
  const aliases = normalizedAliases(featured);
  return UIL_FOOTBALL_PROGRAMS_2026.find((program) =>
    aliases.has(normalizeFeaturedFootballName(program.schoolName)),
  ) ?? null;
}

export async function getFeaturedFootballProgramProfile(slug: string): Promise<FeaturedFootballProgramProfile | null> {
  const featured = getFeaturedFootballProgram(slug);
  if (!featured) return null;

  const seed = seedUilProgram(featured);
  let program: FootballProgramDirectoryResult | null = null;

  if (seed) {
    const result = await searchFootballPrograms({ query: seed.schoolName, limit: 100 });
    program = result.programs.find((candidate) =>
      candidate.schoolName === seed.schoolName
      && candidate.classification === seed.classification
      && candidate.district === seed.district
      && candidate.division === seed.division
    ) ?? {
      ...seed,
    };
  }

  return {
    featured,
    program,
    identity: getVerifiedFootballSchoolIdentity(slug) ?? null,
    enrollmentLink: getOfficialFootballEnrollmentLink(program?.districtName) ?? null,
    privateAlignment: getVerifiedPrivateFootballAlignment(slug) ?? null,
    privateAdmissions: getVerifiedPrivateSchoolAdmissions(slug) ?? null,
  };
}
