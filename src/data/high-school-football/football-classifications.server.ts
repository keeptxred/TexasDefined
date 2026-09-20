import {
  UIL_FOOTBALL_CONFERENCE_BANDS_2026_28,
  UIL_FOOTBALL_ENROLLMENT_BANDS_2026_28,
  type UilFootballClassification,
} from './enrollment-bands';
import { getAllFootballDistricts } from './football-districts.server';
import { getAllUilFootballPrograms } from './football-program-profile.server';
import { UIL_FOOTBALL_EXPECTED_COUNTS } from './uil-football-alignments-2026.server';

export const UIL_FOOTBALL_CLASSIFICATIONS = ['6A', '5A', '4A', '3A', '2A', '1A'] as const;

export type FootballClassificationProfile = {
  slug: string;
  profilePath: string;
  classification: UilFootballClassification;
  alignmentCycle: '2026-28';
  enrollmentBand: string;
  programCount: number;
  districtCount: number;
  programs: ReturnType<typeof getAllUilFootballPrograms>;
  divisionBands: Array<{
    division: 1 | 2;
    label: string;
    programCount: number;
  }>;
};

export function footballClassificationSlug(classification: UilFootballClassification) {
  return classification.toLowerCase();
}

export function footballClassificationProfilePath(classification: UilFootballClassification) {
  return `/texas-high-school-football-classifications/${footballClassificationSlug(classification)}`;
}

export function isUilFootballClassification(value: string): value is UilFootballClassification {
  return (UIL_FOOTBALL_CLASSIFICATIONS as readonly string[]).includes(value.toUpperCase());
}

export function getFootballClassificationProfile(slug: string): FootballClassificationProfile | null {
  const classification = slug.toUpperCase();
  if (!isUilFootballClassification(classification)) return null;

  const programs = getAllUilFootballPrograms().filter((program) => program.classification === classification);
  const districts = getAllFootballDistricts().filter((district) => district.classification === classification);
  const expected = UIL_FOOTBALL_EXPECTED_COUNTS[classification];

  if (programs.length !== expected) {
    throw new Error(`UIL ${classification} classification directory expected ${expected} programs; found ${programs.length}.`);
  }

  const divisionBands = UIL_FOOTBALL_ENROLLMENT_BANDS_2026_28
    .filter((band) => band.classification === classification && band.division !== null)
    .map((band) => ({
      division: band.division as 1 | 2,
      label: band.label,
      programCount: programs.filter((program) => program.division === band.division).length,
    }));

  return {
    slug: footballClassificationSlug(classification),
    profilePath: footballClassificationProfilePath(classification),
    classification,
    alignmentCycle: '2026-28',
    enrollmentBand: UIL_FOOTBALL_CONFERENCE_BANDS_2026_28[classification],
    programCount: programs.length,
    districtCount: districts.length,
    programs,
    divisionBands,
  };
}

export function getAllFootballClassifications() {
  return UIL_FOOTBALL_CLASSIFICATIONS.map((classification) => {
    const profile = getFootballClassificationProfile(classification.toLowerCase());
    if (!profile) throw new Error(`UIL classification profile missing for ${classification}.`);
    return profile;
  });
}

export function footballClassificationSitemapEntries() {
  return getAllFootballClassifications().map((profile) => ({
    path: profile.profilePath,
    lastmod: '2026-09-20',
  }));
}
