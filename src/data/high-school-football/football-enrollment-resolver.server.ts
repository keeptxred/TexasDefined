import { displayUilSchoolName, UIL_FOOTBALL_PROGRAMS_2026 } from './uil-football-alignments-2026.server';
import {
  UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28,
  type UilFootballExactEnrollment,
} from './uil-football-enrollments-2026.generated';

const EXACT_ENROLLMENT_BY_DISPLAY_NAME = new Map<string, UilFootballExactEnrollment>();

for (const [sourceSchoolName, enrollment] of Object.entries(UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28)) {
  const displayName = displayUilSchoolName(sourceSchoolName);
  const existing = EXACT_ENROLLMENT_BY_DISPLAY_NAME.get(displayName);
  if (
    existing
    && (
      existing.enrollment !== enrollment.enrollment
      || existing.submittedConference !== enrollment.submittedConference
    )
  ) {
    throw new Error(`UIL football enrollment display-name collision for ${displayName}.`);
  }
  EXACT_ENROLLMENT_BY_DISPLAY_NAME.set(displayName, enrollment);
}

if (EXACT_ENROLLMENT_BY_DISPLAY_NAME.size !== 1268) {
  throw new Error(`UIL football enrollment resolver expected 1,268 unique display names; found ${EXACT_ENROLLMENT_BY_DISPLAY_NAME.size}.`);
}

const missingPrograms = UIL_FOOTBALL_PROGRAMS_2026.filter(
  (program) => !EXACT_ENROLLMENT_BY_DISPLAY_NAME.has(program.schoolName),
);
if (missingPrograms.length) {
  throw new Error(
    `UIL football enrollment resolver is missing ${missingPrograms.length} aligned programs: ${missingPrograms
      .slice(0, 10)
      .map((program) => program.schoolName)
      .join(', ')}`,
  );
}

export function getExactUilFootballEnrollment(schoolName: string) {
  return EXACT_ENROLLMENT_BY_DISPLAY_NAME.get(schoolName) ?? null;
}
