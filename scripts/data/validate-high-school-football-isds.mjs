import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const errors = [];
const requireText = (source, marker, label) => {
  if (!source.includes(marker)) errors.push(`${label} missing: ${marker}`);
};

const files = {
  slugs: 'src/data/high-school-football/football-isd-slugs.ts',
  directory: 'src/data/high-school-football/football-directory.server.ts',
  server: 'src/data/high-school-football/football-isds.server.ts',
  functions: 'src/data/high-school-football/football-isds.functions.ts',
  indexRoute: 'src/routes/texas-high-school-football-isds.tsx',
  indexPage: 'src/routes/texas-high-school-football-isds.lazy.tsx',
  detailRoute: 'src/routes/texas-high-school-football-isds_.$slug.tsx',
  detailPage: 'src/routes/texas-high-school-football-isds_.$slug.lazy.tsx',
  schoolProfile: 'src/routes/texas-high-school-football-teams_.$slug.lazy.tsx',
  finder: 'src/components/sports/HighSchoolFootballLookup.tsx',
  relocation: 'src/routes/find-my-school-district.lazy.tsx',
  publicRoutes: 'src/lib/public-routes.ts',
  sitemap: 'src/routes/sitemap[.]xml.ts',
  teamHub: 'src/routes/texas-high-school-football-teams.lazy.tsx',
};

for (const file of Object.values(files)) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`Missing football ISD file: ${file}`);
}

if (!errors.length) {
  const slugs = read(files.slugs);
  const directory = read(files.directory);
  const server = read(files.server);
  const functions = read(files.functions);
  const indexRoute = read(files.indexRoute);
  const indexPage = read(files.indexPage);
  const detailRoute = read(files.detailRoute);
  const detailPage = read(files.detailPage);
  const schoolProfile = read(files.schoolProfile);
  const finder = read(files.finder);
  const relocation = read(files.relocation);
  const publicRoutes = read(files.publicRoutes);
  const sitemap = read(files.sitemap);
  const teamHub = read(files.teamHub);

  for (const marker of [
    'footballIsdSlug',
    'footballIsdProfilePath',
    '/texas-high-school-football-isds/',
  ]) requireText(slugs, marker, 'Football ISD slug helper');

  for (const marker of [
    'isdProfilePath?: string',
    'footballIsdProfilePath(record.districtName)',
    'loadAllFootballProgramsWithDirectory',
    'allProgramDirectoryCache',
  ]) requireText(directory, marker, 'Football directory ISD integration');

  for (const marker of [
    'loadAllFootballProgramsWithDirectory',
    'Football ISD slug collision',
    'Football ISD directory expected 1,268 UIL programs',
    'matchedProgramCount + unmatchedProgramCount !== 1268',
    'footballClassificationRank(right.classification)',
    'left.districtName.localeCompare(right.districtName)',
    'getFootballIsdDirectory',
    'getFootballIsdProfile',
    'footballIsdSitemapEntries',
    'getOfficialFootballEnrollmentLink',
  ]) requireText(server, marker, 'Football ISD server');

  for (const marker of [
    "createServerFn({ method: 'GET' })",
    "import('./football-isds.server')",
    'getFootballIsdDirectoryPage',
    'getFootballIsdProfilePage',
  ]) requireText(functions, marker, 'Football ISD server-function bridge');

  for (const marker of [
    "const canonicalPath = '/texas-high-school-football-isds'",
    'getFootballIsdDirectoryPage',
    'Texas High School Football by ISD',
  ]) requireText(indexRoute, marker, 'Football ISD index route');

  for (const marker of [
    "createLazyFileRoute('/texas-high-school-football-isds')",
    'Texas high school football by ISD',
    'The ISD list itself is alphabetical',
    'school lists inside each ISD are ordered by UIL enrollment classification from 6A through 1A',
    'Browse all 1,268 UIL programs',
  ]) requireText(indexPage, marker, 'Football ISD index page');

  for (const marker of [
    "createFileRoute('/texas-high-school-football-isds/$slug')",
    'getFootballIsdProfilePage',
    "'@type': 'CollectionPage'",
    "'@type': 'ItemList'",
  ]) requireText(detailRoute, marker, 'Football ISD detail route');

  for (const marker of [
    "createLazyFileRoute('/texas-high-school-football-isds/$slug')",
    'Every matched UIL football school in',
    'Programs are ordered by UIL enrollment classification—6A first through 1A',
    'UIL enrollment',
    'Verify the district, campus and football eligibility separately',
    'TEA district locator ↗',
    'UIL eligibility standards ↗',
    'Do not confuse the school district/ISD with the UIL football competition district.',
  ]) requireText(detailPage, marker, 'Football ISD detail page');

  requireText(schoolProfile, 'program.isdProfilePath', 'School-to-ISD handoff');
  requireText(schoolProfile, 'football programs →', 'School-to-ISD handoff');

  requireText(finder, 'isdProfilePath?: string', 'Finder ISD type');
  requireText(finder, 'program.isdProfilePath', 'Finder ISD handoff');
  requireText(finder, 'football programs →', 'Finder ISD handoff');

  requireText(relocation, '/texas-high-school-football-isds', 'Relocation ISD handoff');
  requireText(relocation, 'Browse football programs by ISD →', 'Relocation ISD handoff');

  requireText(publicRoutes, '"/texas-high-school-football-isds"', 'Public-route governance');
  requireText(teamHub, '/texas-high-school-football-isds', 'Statewide football hub ISD discovery');
  requireText(teamHub, 'Browse football programs by ISD', 'Statewide football hub ISD discovery');

  for (const marker of [
    'footballIsdSitemapEntries',
    'footballIsdEntries',
    'Football ISD sitemap entries unavailable; continuing without dynamic ISD profiles.',
    '...footballIsdEntries',
  ]) requireText(sitemap, marker, 'Football ISD sitemap');

  for (const [file, source] of [
    [files.indexPage, indexPage],
    [files.detailPage, detailPage],
    [files.schoolProfile, schoolProfile],
    [files.finder, finder],
    [files.relocation, relocation],
  ]) {
    if (source.includes('football-isds.server') || source.includes('football-directory.server')) {
      errors.push(`Client surface must not import football server modules directly: ${file}`);
    }
  }
}

if (errors.length) {
  console.error('High-school football ISD validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('High-school football ISD validation passed.');
