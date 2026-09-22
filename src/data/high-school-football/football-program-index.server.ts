import { footballClassificationRank, footballProgramProfilePath, footballProgramSlug } from './program-slugs';
import { UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28 } from './uil-football-enrollments-2026.generated';
import {
  UIL_FOOTBALL_EXPECTED_COUNTS,
  UIL_FOOTBALL_PROGRAMS_2026,
  type UilFootballProgram,
} from './uil-football-alignments-2026.server';

export type FootballProgramIndexEntry = {
  slug: string;
  profilePath: string;
  schoolName: string;
  classification: UilFootballProgram['classification'];
  division: UilFootballProgram['division'];
  district: number;
  footballType: UilFootballProgram['footballType'];
  uilEnrollment: number;
};

const ALL_UIL_FOOTBALL_PROGRAMS: readonly FootballProgramIndexEntry[] = UIL_FOOTBALL_PROGRAMS_2026
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

function assertFootballProgramIndexInvariant() {
  if (ALL_UIL_FOOTBALL_PROGRAMS.length !== 1268) {
    throw new Error(`UIL football index expected 1,268 programs; found ${ALL_UIL_FOOTBALL_PROGRAMS.length}.`);
  }

  const counts = ALL_UIL_FOOTBALL_PROGRAMS.reduce<Record<string, number>>((acc, program) => {
    acc[program.classification] = (acc[program.classification] ?? 0) + 1;
    return acc;
  }, {});
  for (const [classification, expected] of Object.entries(UIL_FOOTBALL_EXPECTED_COUNTS)) {
    if (counts[classification] !== expected) {
      throw new Error(
        `UIL football index ${classification} expected ${expected} programs; found ${counts[classification] ?? 0}.`,
      );
    }
  }

  for (let index = 1; index < ALL_UIL_FOOTBALL_PROGRAMS.length; index += 1) {
    const previous = ALL_UIL_FOOTBALL_PROGRAMS[index - 1];
    const current = ALL_UIL_FOOTBALL_PROGRAMS[index];
    const previousClassRank = footballClassificationRank(previous.classification);
    const currentClassRank = footballClassificationRank(current.classification);
    if (previousClassRank < currentClassRank) {
      throw new Error(
        `UIL football index ordering regression: ${previous.schoolName} (${previous.classification}) appears before ${current.schoolName} (${current.classification}).`,
      );
    }
    if (previous.classification === current.classification) {
      const previousDivision = previous.division ?? 0;
      const currentDivision = current.division ?? 0;
      if (previousDivision > currentDivision) {
        throw new Error(`UIL football index division ordering regression inside ${current.classification}.`);
      }
    }
  }
}

assertFootballProgramIndexInvariant();

export function getAllUilFootballProgramIndexEntries(): FootballProgramIndexEntry[] {
  return [...ALL_UIL_FOOTBALL_PROGRAMS];
}
