import {
  featuredFootballProfilePath,
  getFeaturedFootballProgram,
  matchFeaturedFootballProgram,
  normalizeFeaturedFootballName,
  type FeaturedFootballProgram,
} from './featured-programs';
import { searchFootballPrograms, type FootballProgramDirectoryResult } from './football-directory.server';
import { getVerifiedFootballSchoolIdentity } from './school-identities';
import { UIL_FOOTBALL_PROGRAMS_2026 } from './uil-football-alignments-2026.server';

export type FeaturedFootballDistrictPeer = {
  schoolName: string;
  classification: FootballProgramDirectoryResult['classification'];
  division: FootballProgramDirectoryResult['division'];
  district: number;
  footballType: FootballProgramDirectoryResult['footballType'];
  profilePath?: string;
  profileLabel?: string;
};

export type FeaturedFootballProgramProfile = {
  featured: FeaturedFootballProgram;
  program: FootballProgramDirectoryResult | null;
  identity: ReturnType<typeof getVerifiedFootballSchoolIdentity> | null;
  districtPeers: FeaturedFootballDistrictPeer[];
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
  let districtPeers: FeaturedFootballDistrictPeer[] = [];

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

    districtPeers = UIL_FOOTBALL_PROGRAMS_2026
      .filter((candidate) =>
        candidate.schoolName !== seed.schoolName
        && candidate.classification === seed.classification
        && candidate.division === seed.division
        && candidate.district === seed.district,
      )
      .map((candidate) => {
        const peerProfile = matchFeaturedFootballProgram(candidate.schoolName);
        return {
          schoolName: candidate.schoolName,
          classification: candidate.classification,
          division: candidate.division,
          district: candidate.district,
          footballType: candidate.footballType,
          ...(peerProfile ? {
            profilePath: featuredFootballProfilePath(peerProfile),
            profileLabel: peerProfile.displayName,
          } : {}),
        };
      })
      .sort((left, right) => (left.profileLabel || left.schoolName).localeCompare(right.profileLabel || right.schoolName));
  }

  return {
    featured,
    program,
    identity: getVerifiedFootballSchoolIdentity(slug) ?? null,
    districtPeers,
  };
}
