import {
  FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS,
  normalizeFeaturedFootballName,
  type FeaturedFootballProgram,
} from './featured-programs';
import { footballProgramProfilePath } from './program-slugs';
import { UIL_FOOTBALL_PROGRAMS_2026 } from './uil-football-alignments-2026.server';

const UIL_NORMALIZED_PROGRAM_NAMES = new Set(
  UIL_FOOTBALL_PROGRAMS_2026.map((program) => normalizeFeaturedFootballName(program.schoolName)),
);

function featuredProgramMatchesUil(program: FeaturedFootballProgram) {
  return [program.displayName, program.searchName, ...program.aliases]
    .map(normalizeFeaturedFootballName)
    .some((name) => UIL_NORMALIZED_PROGRAM_NAMES.has(name));
}

function footballDistrictProfilePath(classification: string, division: 1 | 2 | null, district: number) {
  const divisionPart = division === 1 ? 'division-i' : division === 2 ? 'division-ii' : null;
  const slug = [classification.toLowerCase(), divisionPart, 'district', String(district)]
    .filter(Boolean)
    .join('-');
  return `/texas-high-school-football-districts/${slug}`;
}

/**
 * Lightweight sitemap/directory football URL generation.
 *
 * Keep this module free of live TEA, venue, history or profile-resolution code.
 * The private-school rows are the same explicit non-UIL profiles already emitted
 * by the sitemap; exposing them here guarantees every indexable private profile
 * can also be linked from the canonical football-team directory.
 */
export function footballProgramSitemapEntries() {
  const entries = UIL_FOOTBALL_PROGRAMS_2026.map((program) => ({
    path: footballProgramProfilePath(program.schoolName),
    lastmod: '2026-09-19',
  }));

  if (entries.length !== 1268) {
    throw new Error(`UIL football sitemap expected 1,268 school profiles; found ${entries.length}.`);
  }

  const uniquePaths = new Set(entries.map((entry) => entry.path));
  if (uniquePaths.size !== entries.length) {
    throw new Error(`UIL football sitemap expected 1,268 unique school profile paths; found ${uniquePaths.size}.`);
  }

  return entries;
}

export function privateFootballProgramDirectoryEntries() {
  const entries = FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS
    .filter((program) => !featuredProgramMatchesUil(program))
    .map((program) => ({
      slug: program.slug,
      name: program.displayName,
      association: program.governingBodyHint ?? 'Private-school football',
      classification: program.associationClassification ?? null,
      path: `/texas-high-school-football-teams/${program.slug}`,
    }))
    .sort((left, right) => left.name.localeCompare(right.name));

  if (entries.length !== 24) {
    throw new Error(`Private football directory expected 24 non-UIL profiles; found ${entries.length}.`);
  }
  if (new Set(entries.map((entry) => entry.path)).size !== entries.length) {
    throw new Error('Private football directory contains duplicate profile paths.');
  }
  return entries;
}

export function privateFootballProgramSitemapEntries() {
  return privateFootballProgramDirectoryEntries().map((program) => ({
    path: program.path,
    lastmod: '2026-09-19',
  }));
}

export function footballDistrictSitemapEntries() {
  const entries = [...new Map(UIL_FOOTBALL_PROGRAMS_2026.map((program) => {
    const path = footballDistrictProfilePath(program.classification, program.division, program.district);
    return [path, { path, lastmod: '2026-09-19' }] as const;
  })).values()];

  if (entries.length !== 192) {
    throw new Error(`UIL football district sitemap expected 192 district profiles; found ${entries.length}.`);
  }

  return entries;
}
