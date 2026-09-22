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

/**
 * Lightweight sitemap-only football URL generation.
 *
 * Keep this module free of football directory/search/profile imports. The public
 * sitemap runs on the Worker request path and must not initialize live TEA,
 * venue, history or profile-resolution code just to emit canonical URLs.
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

export function privateFootballProgramSitemapEntries() {
  return FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS
    .filter((program) => !featuredProgramMatchesUil(program))
    .map((program) => ({
      path: `/texas-high-school-football-teams/${program.slug}`,
      lastmod: '2026-09-19',
    }));
}
