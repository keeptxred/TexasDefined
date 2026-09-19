import { matchFeaturedFootballProgram } from './featured-programs';
import { UIL_FOOTBALL_PROGRAMS_2026, type UilFootballProgram } from './uil-football-alignments-2026.server';

export type UilFootballProfileRecord = {
  slug: string;
  displayName: string;
  schoolName: string;
  classification: UilFootballProgram['classification'];
  division: UilFootballProgram['division'];
  district: number;
  footballType: UilFootballProgram['footballType'];
  alignmentCycle: UilFootballProgram['alignmentCycle'];
  sourceUrl: string;
};

const CLASS_PRIORITY: Record<UilFootballProgram['classification'], number> = {
  '6A': 6,
  '5A': 5,
  '4A': 4,
  '3A': 3,
  '2A': 2,
  '1A': 1,
};

function slugify(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const UIL_FOOTBALL_PROFILE_RECORDS: readonly UilFootballProfileRecord[] = UIL_FOOTBALL_PROGRAMS_2026.map((program) => {
  const existingProfile = matchFeaturedFootballProgram(program.schoolName);
  return {
    slug: existingProfile?.slug ?? slugify(program.schoolName),
    displayName: existingProfile?.displayName ?? program.schoolName,
    schoolName: program.schoolName,
    classification: program.classification,
    division: program.division,
    district: program.district,
    footballType: program.footballType,
    alignmentCycle: program.alignmentCycle,
    sourceUrl: program.sourceUrl,
  };
});

const bySlug = new Map<string, UilFootballProfileRecord>();
const bySchoolName = new Map<string, UilFootballProfileRecord>();

for (const record of UIL_FOOTBALL_PROFILE_RECORDS) {
  const existing = bySlug.get(record.slug);
  if (existing) {
    throw new Error(`UIL football profile slug collision: ${existing.schoolName} and ${record.schoolName} -> ${record.slug}`);
  }
  bySlug.set(record.slug, record);
  bySchoolName.set(record.schoolName, record);
}

if (UIL_FOOTBALL_PROFILE_RECORDS.length !== 1268 || bySlug.size !== 1268) {
  throw new Error(`Expected 1,268 canonical UIL football profiles; found ${UIL_FOOTBALL_PROFILE_RECORDS.length} records and ${bySlug.size} unique slugs.`);
}

export const UIL_FOOTBALL_PROFILE_DIRECTORY: readonly UilFootballProfileRecord[] = [...UIL_FOOTBALL_PROFILE_RECORDS]
  .sort((left, right) =>
    CLASS_PRIORITY[right.classification] - CLASS_PRIORITY[left.classification]
    || left.schoolName.localeCompare(right.schoolName),
  );

export function getUilFootballProfileRecord(slug: string) {
  return bySlug.get(slug);
}

export function getUilFootballProfileRecordForProgram(program: Pick<UilFootballProgram, 'schoolName'>) {
  return bySchoolName.get(program.schoolName);
}

export function uilFootballProfilePath(record: Pick<UilFootballProfileRecord, 'slug'>) {
  return `/texas-high-school-football-teams/${record.slug}`;
}

export const UIL_FOOTBALL_PROFILE_COUNTS = {
  total: UIL_FOOTBALL_PROFILE_DIRECTORY.length,
  byClassification: UIL_FOOTBALL_PROFILE_DIRECTORY.reduce<Record<string, number>>((counts, record) => {
    counts[record.classification] = (counts[record.classification] ?? 0) + 1;
    return counts;
  }, {}),
} as const;
