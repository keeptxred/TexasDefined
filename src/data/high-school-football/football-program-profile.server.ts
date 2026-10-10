import { getFeaturedFootballProgramProfile } from './featured-program-profile.server';
import {
  FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS,
  getFeaturedFootballProgram,
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
import { getFootballProgramEditorial } from './program-editorial';
import { buildFootballProfileFaq, buildFootballProfileQuickFacts, buildFootballProfileSummary } from './football-profile-content';
import {
  UIL_FOOTBALL_EXPECTED_COUNTS,
  UIL_FOOTBALL_PROGRAMS_2026,
  type UilFootballProgram,
} from './uil-football-alignments-2026.server';

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
  editorial: ReturnType<typeof getFootballProgramEditorial>;
  profileSummary: string;
  quickFacts: ReturnType<typeof buildFootballProfileQuickFacts>;
  faq: ReturnType<typeof buildFootballProfileFaq>;
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
    const editorial = getFootballProgramEditorial(legacy.featured.slug);
    const profileContent = {
      displayName: legacy.featured.displayName,
      program: legacy.program,
      identity: legacy.identity,
      privateAlignment: legacy.privateAlignment,
      venueLinks: [],
      editorial,
    };
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
      editorial,
      profileSummary: buildFootballProfileSummary(profileContent),
      quickFacts: buildFootballProfileQuickFacts(profileContent),
      faq: buildFootballProfileFaq(profileContent),
    };
  }

  const result = await searchFootballPrograms({ query: seed.schoolName, limit: 100 });
  const exactEnrollment = UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28[seed.sourceSchoolName];
  const matchedProgram: FootballProgramDirectoryResult = exactProgramMatch(seed, result.programs) ?? {
    ...seed,
    profilePath: footballProgramProfilePath(seed.schoolName),
    ...(exactEnrollment ? {
      uilEnrollment: exactEnrollment.enrollment,
      uilSubmittedConference: exactEnrollment.submittedConference,
    } : {}),
  };
  const canonicalSlug = footballProgramSlug(seed.schoolName);
  // Katy High's campus is in Fort Bend County (NCES campus ID 482517002809).
  // The optional TEA/UIL name join can return Harris County because Katy ISD
  // serves both counties. Correct this individual school without changing the
  // county attribution of any other Katy ISD program or the general matcher.
  // UIL calls Austin ISD's LBJ Jaguars "Austin Johnson" in its 2026–28
  // alignment. A generic name-only AskTED join can instead select an unrelated
  // Johnson campus in Round Rock ISD / Williamson County. Keep UIL's alignment
  // and enrollment, but source this particular school identity from Austin ISD.
  // Do not carry over unmatched TEA IDs, URLs, history or county metadata.
  const austinLbjProgram: FootballProgramDirectoryResult = {
    ...seed,
    profilePath: footballProgramProfilePath(seed.schoolName),
    ...(exactEnrollment ? {
      uilEnrollment: exactEnrollment.enrollment,
      uilSubmittedConference: exactEnrollment.submittedConference,
    } : {}),
    officialSchoolName: 'LBJ Early College High School',
    districtName: 'Austin ISD',
    countyName: 'Travis County',
    city: 'Austin',
    schoolWebsite: 'https://www.austinisd.org/schools/lbj',
    districtWebsite: 'https://www.austinisd.org/',
  };
  // Additional Batch 004 campus-directory join exceptions confirmed against
  // official district school rosters and NCES campus county, not ZIP code or ISD
  // headquarters. Preserve UIL program alignment, discarding mismatched TEA IDs.
  const otherCampusCorrections: Record<string, Pick<FootballProgramDirectoryResult,
    'officialSchoolName' | 'districtName' | 'countyName' | 'city' | 'schoolWebsite' | 'districtWebsite'>> = {
    'austin-northeast': {
      officialSchoolName: 'Northeast Early College High School',
      districtName: 'Austin ISD', countyName: 'Travis County', city: 'Austin',
      schoolWebsite: 'https://www.austinisd.org/schools/northeast',
      districtWebsite: 'https://www.austinisd.org/',
    },
    'austin-vandegrift': {
      officialSchoolName: 'Vandegrift High School',
      districtName: 'Leander ISD', countyName: 'Travis County', city: 'Austin',
      schoolWebsite: 'https://vhs.leanderisd.org/',
      districtWebsite: 'https://www.leanderisd.org/',
    },
    'austin-travis': {
      officialSchoolName: 'Travis Early College High School',
      districtName: 'Austin ISD', countyName: 'Travis County', city: 'Austin',
      schoolWebsite: 'https://www.austinisd.org/schools/travis',
      districtWebsite: 'https://www.austinisd.org/',
    },
    austin: {
      officialSchoolName: 'Austin High School',
      districtName: 'Austin ISD', countyName: 'Travis County', city: 'Austin',
      schoolWebsite: 'https://austin.austinschools.org/',
      districtWebsite: 'https://www.austinisd.org/',
    },
  };
  const primaryCampus = otherCampusCorrections[canonicalSlug];
  const program: FootballProgramDirectoryResult = canonicalSlug === 'katy'
    ? { ...matchedProgram, countyName: 'Fort Bend County' }
    : canonicalSlug === 'austin-johnson' ? austinLbjProgram
    : primaryCampus ? {
      ...seed, profilePath: footballProgramProfilePath(seed.schoolName),
      ...(exactEnrollment ? {
        uilEnrollment: exactEnrollment.enrollment,
        uilSubmittedConference: exactEnrollment.submittedConference,
      } : {}),
      ...primaryCampus,
    } : matchedProgram;
  const displayName = canonicalSlug === 'austin-johnson' ? 'Austin LBJ' : seed.schoolName;

  const identity = getVerifiedFootballSchoolIdentity(canonicalSlug) ?? null;
  const venueLinks = getVerifiedFootballVenueLinks({
    schoolName: program.schoolName,
    officialSchoolName: program.officialSchoolName,
    districtName: program.districtName,
  });
  const editorial = getFootballProgramEditorial(canonicalSlug);
  const profileContent = {
    displayName,
    program,
    identity,
    privateAlignment: null,
    venueLinks,
    editorial,
  };

  return {
    slug: canonicalSlug,
    displayName,
    program,
    identity,
    enrollmentLink: getOfficialFootballEnrollmentLink(program.districtName) ?? null,
    districtPeers: districtPeers(seed),
    districtPath: footballDistrictProfilePath(seed.classification, seed.division, seed.district),
    venueLinks,
    privateAlignment: null,
    privateAdmissions: null,
    editorial,
    profileSummary: buildFootballProfileSummary(profileContent),
    quickFacts: buildFootballProfileQuickFacts(profileContent),
    faq: buildFootballProfileFaq(profileContent),
  };
}

const ALL_UIL_FOOTBALL_PROGRAMS: readonly FootballProgramDirectoryEntry[] = UIL_FOOTBALL_PROGRAMS_2026
  .map((program) => ({
    slug: footballProgramSlug(program.schoolName),
    profilePath: footballProgramProfilePath(program.schoolName),
    schoolName: program.schoolName,
    classification: program.classification,
    division: program.division,
    district: program.district,
    footballType: program.footballType,
    uilEnrollment: UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28[program.sourceSchoolName]?.enrollment ?? 0,
  }))
  .sort((left, right) => {
    const classDiff = footballClassificationRank(right.classification) - footballClassificationRank(left.classification);
    if (classDiff) return classDiff;
    const leftDivision = left.division ?? 0;
    const rightDivision = right.division ?? 0;
    if (leftDivision !== rightDivision) return leftDivision - rightDivision;
    return left.schoolName.localeCompare(right.schoolName);
  });

function assertAllUilDirectoryInvariant() {
  if (ALL_UIL_FOOTBALL_PROGRAMS.length !== 1268) {
    throw new Error(`UIL football directory expected 1,268 programs; found ${ALL_UIL_FOOTBALL_PROGRAMS.length}.`);
  }

  const counts = ALL_UIL_FOOTBALL_PROGRAMS.reduce<Record<string, number>>((acc, program) => {
    acc[program.classification] = (acc[program.classification] ?? 0) + 1;
    return acc;
  }, {});
  for (const [classification, expected] of Object.entries(UIL_FOOTBALL_EXPECTED_COUNTS)) {
    if (counts[classification] !== expected) {
      throw new Error(`UIL football directory ${classification} expected ${expected} programs; found ${counts[classification] ?? 0}.`);
    }
  }

  for (let index = 1; index < ALL_UIL_FOOTBALL_PROGRAMS.length; index += 1) {
    const previous = ALL_UIL_FOOTBALL_PROGRAMS[index - 1];
    const current = ALL_UIL_FOOTBALL_PROGRAMS[index];
    const previousClassRank = footballClassificationRank(previous.classification);
    const currentClassRank = footballClassificationRank(current.classification);
    if (previousClassRank < currentClassRank) {
      throw new Error(`UIL football directory ordering regression: ${previous.schoolName} (${previous.classification}) appears before ${current.schoolName} (${current.classification}).`);
    }
    if (previous.classification === current.classification) {
      const previousDivision = previous.division ?? 0;
      const currentDivision = current.division ?? 0;
      if (previousDivision > currentDivision) {
        throw new Error(`UIL football directory division ordering regression inside ${current.classification}.`);
      }
    }
  }
}

assertAllUilDirectoryInvariant();

export function getAllUilFootballPrograms(): FootballProgramDirectoryEntry[] {
  return [...ALL_UIL_FOOTBALL_PROGRAMS];
}

export function footballProgramSitemapEntries() {
  const entries = ALL_UIL_FOOTBALL_PROGRAMS.map((program) => ({
    path: program.profilePath,
    lastmod: '2026-09-19',
  }));
  if (entries.length !== 1268) {
    throw new Error(`UIL football sitemap expected 1,268 school profiles; found ${entries.length}.`);
  }
  return entries;
}

export function privateFootballProgramSitemapEntries() {
  return FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS
    .filter((program) => !findLegacyUilProgram(program.slug))
    .map((program) => ({
      path: `/texas-high-school-football-teams/${program.slug}`,
      lastmod: '2026-09-19',
    }));
}
