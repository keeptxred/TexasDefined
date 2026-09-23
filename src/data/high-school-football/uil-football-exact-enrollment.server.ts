import { displayUilSchoolName } from './uil-football-alignments-2026.server';
import {
  UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28,
  type UilFootballExactEnrollment,
} from './uil-football-enrollments-2026.generated';

const EXPECTED_UIL_FOOTBALL_PROGRAMS = 1268;
const EXACT_ENROLLMENTS_BY_DISPLAY_NAME = new Map<string, UilFootballExactEnrollment>();

for (const [officialName, enrollment] of Object.entries(UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28)) {
  const displayName = displayUilSchoolName(officialName);
  if (EXACT_ENROLLMENTS_BY_DISPLAY_NAME.has(displayName)) {
    throw new Error(`UIL football exact-enrollment display-name collision: ${officialName} -> ${displayName}.`);
  }
  EXACT_ENROLLMENTS_BY_DISPLAY_NAME.set(displayName, enrollment);
}

if (EXACT_ENROLLMENTS_BY_DISPLAY_NAME.size !== EXPECTED_UIL_FOOTBALL_PROGRAMS) {
  throw new Error(
    `UIL football exact-enrollment resolver expected ${EXPECTED_UIL_FOOTBALL_PROGRAMS} unique display names; found ${EXACT_ENROLLMENTS_BY_DISPLAY_NAME.size}.`,
  );
}

export function getExactUilFootballEnrollment(schoolName: string) {
  return EXACT_ENROLLMENTS_BY_DISPLAY_NAME.get(displayUilSchoolName(schoolName)) ?? null;
}
