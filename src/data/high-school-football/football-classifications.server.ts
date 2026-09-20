import {
  UIL_FOOTBALL_ENROLLMENT_BANDS_SOURCE,
  uilFootballConferenceBand,
  type UilFootballClassification,
} from './enrollment-bands';
import { getAllFootballDistricts } from './football-districts.server';
import { getAllUilFootballPrograms } from './football-program-profile.server';

export const UIL_FOOTBALL_CLASSIFICATION_ORDER = ['6A', '5A', '4A', '3A', '2A', '1A'] as const;

export type FootballClassificationSummary = {
  slug: string;
  profilePath: string;
  classification: UilFootballClassification;
  programCount: number;
  districtCount: number;
  enrollmentBand: string;
  footballType: '6-Man' | '11-Man';
};

export type FootballClassificationProfile = FootballClassificationSummary & {
  programs: ReturnType<typeof getAllUilFootballPrograms>;
  districts: ReturnType<typeof getAllFootballDistricts>;
  source: typeof UIL_FOOTBALL_ENROLLMENT_BANDS_SOURCE;
};

export function footballClassificationSlug(classification: UilFootballClassification) {
  return classification.toLowerCase();
}

export function footballClassificationProfilePath(classification: UilFootballClassification) {
  return `/texas-high-school-football-classifications/${footballClassificationSlug(classification)}`;
}

function parseClassification(slug: string): UilFootballClassification | null {
  const normalized = slug.trim().toUpperCase();
  return UIL_FOOTBALL_CLASSIFICATION_ORDER.includes(normalized as UilFootballClassification)
    ? normalized as UilFootballClassification
    : null;
}

export function getAllFootballClassifications(): FootballClassificationSummary[] {
  const programs = getAllUilFootballPrograms();
  const districts = getAllFootballDistricts();

  return UIL_FOOTBALL_CLASSIFICATION_ORDER.map((classification) => ({
    slug: footballClassificationSlug(classification),
    profilePath: footballClassificationProfilePath(classification),
    classification,
    programCount: programs.filter((program) => program.classification === classification).length,
    districtCount: districts.filter((district) => district.classification === classification).length,
    enrollmentBand: uilFootballConferenceBand(classification),
    footballType: classification === '1A' ? '6-Man' : '11-Man',
  }));
}

export function getFootballClassificationProfile(slug: string): FootballClassificationProfile | null {
  const classification = parseClassification(slug);
  if (!classification) return null;

  const programs = getAllUilFootballPrograms().filter((program) => program.classification === classification);
  const districts = getAllFootballDistricts().filter((district) => district.classification === classification);
  const summary = getAllFootballClassifications().find((item) => item.classification === classification);
  if (!summary) return null;

  return {
    ...summary,
    programs,
    districts,
    source: UIL_FOOTBALL_ENROLLMENT_BANDS_SOURCE,
  };
}

export function footballClassificationSitemapEntries() {
  return getAllFootballClassifications().map((classification) => ({
    path: classification.profilePath,
    lastmod: '2026-09-20',
  }));
}

const expectedCounts: Readonly<Record<UilFootballClassification, number>> = {
  '6A': 249,
  '5A': 246,
  '4A': 205,
  '3A': 204,
  '2A': 205,
  '1A': 159,
};

for (const summary of getAllFootballClassifications()) {
  if (summary.programCount !== expectedCounts[summary.classification]) {
    throw new Error(`UIL ${summary.classification} classification hub expected ${expectedCounts[summary.classification]} programs; found ${summary.programCount}.`);
  }
}

if (getAllFootballClassifications().reduce((sum, item) => sum + item.programCount, 0) !== 1268) {
  throw new Error('UIL football classification hubs must cover all 1,268 current programs exactly once.');
}
