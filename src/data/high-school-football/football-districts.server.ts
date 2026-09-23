import { footballClassificationRank, footballProgramProfilePath } from './program-slugs';
import { UIL_FOOTBALL_PROGRAMS_2026, type UilFootballProgram } from './uil-football-alignments-2026.server';
import { getExactUilFootballEnrollment } from './uil-football-exact-enrollment.server';
import { UIL_FOOTBALL_EXACT_ENROLLMENT_SOURCE } from './uil-football-enrollments-2026.generated';

export type UilFootballDistrictProgram = {
  schoolName: string;
  profilePath: string;
  uilEnrollment: number;
  submittedConference: '1A' | '2A' | '3A' | '4A' | '5A' | '6A';
};

export type UilFootballDistrictSummary = {
  slug: string;
  profilePath: string;
  classification: UilFootballProgram['classification'];
  division: UilFootballProgram['division'];
  district: number;
  footballType: UilFootballProgram['footballType'];
  alignmentCycle: UilFootballProgram['alignmentCycle'];
  sourceUrl: string;
  enrollmentSourceUrl: string;
  programCount: number;
};

export type UilFootballDistrictProfile = UilFootballDistrictSummary & {
  programs: UilFootballDistrictProgram[];
};

function divisionSlug(division: UilFootballProgram['division']) {
  if (division === 1) return 'division-i';
  if (division === 2) return 'division-ii';
  return null;
}

export function footballDistrictSlug(
  classification: UilFootballProgram['classification'],
  division: UilFootballProgram['division'],
  district: number,
) {
  const divisionPart = divisionSlug(division);
  return [classification.toLowerCase(), divisionPart, 'district', String(district)]
    .filter(Boolean)
    .join('-');
}

export function footballDistrictProfilePath(
  classification: UilFootballProgram['classification'],
  division: UilFootballProgram['division'],
  district: number,
) {
  return `/texas-high-school-football-districts/${footballDistrictSlug(classification, division, district)}`;
}

const DISTRICT_BY_SLUG = new Map<string, UilFootballDistrictProfile>();

for (const program of UIL_FOOTBALL_PROGRAMS_2026) {
  const slug = footballDistrictSlug(program.classification, program.division, program.district);
  const existing = DISTRICT_BY_SLUG.get(slug);
  const exactEnrollment = getExactUilFootballEnrollment(program.schoolName);
  if (!exactEnrollment) {
    throw new Error(`UIL football district enrollment missing for ${program.schoolName}.`);
  }
  const entry: UilFootballDistrictProgram = {
    schoolName: program.schoolName,
    profilePath: footballProgramProfilePath(program.schoolName),
    uilEnrollment: exactEnrollment.enrollment,
    submittedConference: exactEnrollment.submittedConference,
  };

  if (existing) {
    if (
      existing.classification !== program.classification
      || existing.division !== program.division
      || existing.district !== program.district
      || existing.footballType !== program.footballType
      || existing.sourceUrl !== program.sourceUrl
    ) {
      throw new Error(`UIL football district collision for ${slug}.`);
    }
    existing.programs.push(entry);
    existing.programCount = existing.programs.length;
    continue;
  }

  DISTRICT_BY_SLUG.set(slug, {
    slug,
    profilePath: footballDistrictProfilePath(program.classification, program.division, program.district),
    classification: program.classification,
    division: program.division,
    district: program.district,
    footballType: program.footballType,
    alignmentCycle: program.alignmentCycle,
    sourceUrl: program.sourceUrl,
    enrollmentSourceUrl: UIL_FOOTBALL_EXACT_ENROLLMENT_SOURCE.url,
    programCount: 1,
    programs: [entry],
  });
}

if (DISTRICT_BY_SLUG.size !== 192) {
  throw new Error(`UIL football district index expected 192 current districts; found ${DISTRICT_BY_SLUG.size}.`);
}

for (const district of DISTRICT_BY_SLUG.values()) {
  district.programs.sort((left, right) => left.schoolName.localeCompare(right.schoolName));
}

export function getFootballDistrictProfile(slug: string) {
  return DISTRICT_BY_SLUG.get(slug) ?? null;
}

export function getAllFootballDistricts(): UilFootballDistrictSummary[] {
  return [...DISTRICT_BY_SLUG.values()]
    .map(({ programs: _programs, ...summary }) => summary)
    .sort((left, right) => {
      const classDiff = footballClassificationRank(right.classification) - footballClassificationRank(left.classification);
      if (classDiff) return classDiff;
      const leftDivision = left.division ?? 0;
      const rightDivision = right.division ?? 0;
      if (leftDivision !== rightDivision) return leftDivision - rightDivision;
      return left.district - right.district;
    });
}

export function footballDistrictSitemapEntries() {
  return getAllFootballDistricts().map((district) => ({
    path: district.profilePath,
    lastmod: '2026-09-19',
  }));
}
