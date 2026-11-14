import {
  FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS,
  normalizeFeaturedFootballName,
  type FeaturedFootballProgram,
} from './featured-programs';
import { footballProgramProfilePath } from './program-slugs';
import { isFootballTeamGoogleIndexReady, isFootballDistrictGoogleIndexReady } from './google-index-eligibility';
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

  return entries.filter((e) => isFootballTeamGoogleIndexReady(e.path.split('/').at(-1) ?? ''));
}

export function privateFootballProgramSitemapEntries() {
  return FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS
    .filter((program) => !featuredProgramMatchesUil(program))
    .map((program) => ({
      path: `/texas-high-school-football-teams/${program.slug}`,
      lastmod: '2026-09-19',
    }))
    .filter((e) => isFootballTeamGoogleIndexReady(e.path.split('/').at(-1) ?? ''));
}

export function footballDistrictSitemapEntries() {
  const entries = [...new Map(UIL_FOOTBALL_PROGRAMS_2026.map((program) => {
    const path = footballDistrictProfilePath(program.classification, program.division, program.district);
    return [path, { path, lastmod: '2026-09-19' }] as const;
  })).values()];

  if (entries.length !== 192) {
    throw new Error(`UIL football district sitemap expected 192 district profiles; found ${entries.length}.`);
  }

  return entries.filter((e) => isFootballDistrictGoogleIndexReady(e.path.split('/').at(-1) ?? ''));
}

export function footballGameSitemapEntries() {
  // Lightweight curated paths; do not load live directory or scan the site.
  return [
    { path: '/texas-high-school-football-matchups', lastmod: '2026-10-16' },
    { path: '/texas-high-school-football-playoff-brackets', lastmod: '2026-10-16' },
    { path: '/texas-high-school-football-matchups/2026-10-16-houston-memorial-at-alief-taylor', lastmod: '2026-10-16' },
    { path: '/texas-high-school-football-matchups/2026-10-23-houston-lamar-at-houston-memorial', lastmod: '2026-10-16' },
  ];
}
/**
 * Supplemental Bing-only discovery feed for football details that have
 * Googlebot-only noindex metadata. This URL is intentionally NOT referenced
 * in robots.txt, Google's sitemap index, or the public sitemap.xml.
 *
 * The source inventory is the same as the regular UIL/private football sitemap.
 * Indexability is NEVER changed here; Bingbot still sees the original page.
 */
export function bingExcludedFootballSitemapEntries() {
  const uilNames = new Set(
    UIL_FOOTBALL_PROGRAMS_2026.map((program) => normalizeFeaturedFootballName(program.schoolName)),
  );

  const teamPaths = [
    ...UIL_FOOTBALL_PROGRAMS_2026.map((program) => footballProgramProfilePath(program.schoolName)),
    ...FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS
      .filter((program) =>
        ![program.displayName, program.searchName, ...program.aliases]
          .map(normalizeFeaturedFootballName)
          .some((name) => uilNames.has(name)),
      )
      .map((program) => `/texas-high-school-football-teams/${program.slug}`),
  ];

  const allTeams = new Set(teamPaths);
  if (allTeams.size !== 1292) {
    throw new Error(`Bing football feed expected 1,292 unique team profiles; found ${allTeams.size}.`);
  }

  const districtPaths = new Set(UIL_FOOTBALL_PROGRAMS_2026.map((program) =>
    footballDistrictProfilePath(program.classification, program.division, program.district),
  ));
  if (districtPaths.size !== 192) {
    throw new Error(`Bing football feed expected 192 unique district profiles; found ${districtPaths.size}.`);
  }

  const stagedTeams = [...allTeams].filter((path) =>
    !isFootballTeamGoogleIndexReady(path.split('/').at(-1) ?? ''),
  );
  const stagedDistricts = [...districtPaths].filter((path) =>
    !isFootballDistrictGoogleIndexReady(path.split('/').at(-1) ?? ''),
  );

  return {
    stagedTeams: stagedTeams.sort(),
    stagedDistricts: stagedDistricts.sort(),
    paths: [...stagedTeams, ...stagedDistricts].sort(),
  };
}
