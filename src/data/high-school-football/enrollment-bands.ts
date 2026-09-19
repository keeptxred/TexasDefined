export type UilFootballClassification = '1A' | '2A' | '3A' | '4A' | '5A' | '6A';
export type UilFootballDivision = 1 | 2 | null;

export type UilFootballEnrollmentBand = {
  classification: UilFootballClassification;
  division: UilFootballDivision;
  label: string;
  minEnrollment: number | null;
  maxEnrollment: number | null;
};

export const UIL_FOOTBALL_ENROLLMENT_BANDS_2026_28: readonly UilFootballEnrollmentBand[] = [
  { classification: '6A', division: null, label: '2,215 and above', minEnrollment: 2215, maxEnrollment: null },
  { classification: '5A', division: 1, label: '1,870–2,214', minEnrollment: 1870, maxEnrollment: 2214 },
  { classification: '5A', division: 2, label: '1,305–1,869', minEnrollment: 1305, maxEnrollment: 1869 },
  { classification: '4A', division: 1, label: '896–1,304', minEnrollment: 896, maxEnrollment: 1304 },
  { classification: '4A', division: 2, label: '550–895', minEnrollment: 550, maxEnrollment: 895 },
  { classification: '3A', division: 1, label: '367–549', minEnrollment: 367, maxEnrollment: 549 },
  { classification: '3A', division: 2, label: '246–366.9', minEnrollment: 246, maxEnrollment: 366.9 },
  { classification: '2A', division: 1, label: '175.6–245.9', minEnrollment: 175.6, maxEnrollment: 245.9 },
  { classification: '2A', division: 2, label: '105–175.5', minEnrollment: 105, maxEnrollment: 175.5 },
  { classification: '1A', division: 1, label: '57.6–104.9', minEnrollment: 57.6, maxEnrollment: 104.9 },
  { classification: '1A', division: 2, label: '57.5 and below', minEnrollment: null, maxEnrollment: 57.5 },
] as const;

export const UIL_FOOTBALL_CONFERENCE_BANDS_2026_28: Readonly<Record<UilFootballClassification, string>> = {
  '6A': '2,215 and above',
  '5A': '1,305–2,214',
  '4A': '550–1,304',
  '3A': '246–549',
  '2A': '105–245',
  '1A': '104.9 and below',
} as const;

export const UIL_FOOTBALL_ENROLLMENT_BANDS_SOURCE = {
  label: 'UIL 2026–28 conference and football division cutoffs',
  url: 'https://www.uiltexas.org/athletics/conference-cutoffs',
  cycle: '2026–28',
} as const;

export function uilFootballEnrollmentBand(
  classification: UilFootballClassification,
  division: UilFootballDivision,
) {
  return UIL_FOOTBALL_ENROLLMENT_BANDS_2026_28.find((band) =>
    band.classification === classification && band.division === division,
  ) ?? null;
}

export function uilFootballConferenceBand(classification: UilFootballClassification) {
  return UIL_FOOTBALL_CONFERENCE_BANDS_2026_28[classification];
}
