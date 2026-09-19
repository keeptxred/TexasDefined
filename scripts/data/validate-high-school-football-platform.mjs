import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const errors = [];
const requireText = (source, marker, label) => {
  if (!source.includes(marker)) errors.push(`${label} missing: ${marker}`);
};

const files = [
  'src/data/high-school-football/uil-football-alignments-2026.server.ts',
  'src/data/high-school-football/football-directory.server.ts',
  'src/data/high-school-football/uil-football-recent-history.server.ts',
  'src/routes/api.high-school-football.ts',
  'src/components/sports/HighSchoolFootballLookup.tsx',
  'src/components/sports/CountyHighSchoolFootball.tsx',
  'src/routes/texas-high-school-football-teams.tsx',
  'src/routes/texas-high-school-football-teams.lazy.tsx',
  'src/routes/find-my-school-district.lazy.tsx',
  'src/components/relocation/RelocationServiceFinder.tsx',
  'src/routes/$kind.$slug.lazy.tsx',
  'src/routes/sports.friday-night-lights.lazy.tsx',
  'src/lib/public-routes.ts',
  'src/data/texas-data-sources.ts',
];

const allTimeHistoryPath = 'src/data/high-school-football/uil-football-all-time-history.server.ts';
const programProfilePath = 'src/routes/high-school-football.$teamSlug.tsx';
const sitemapPath = 'src/routes/sitemap[.]xml.ts';

const authorityFiles = [
  'src/data/fixtures/high-school-football-newcomers.ts',
  'src/data/fixtures/texas-high-school-football-classifications.ts',
  'src/data/fixtures/texas-high-school-football-playoffs.ts',
  'src/data/fixtures/texas-six-man-football-explained.ts',
  'src/data/friday-night-lights-structured-data.server.ts',
];

for (const file of [...files, ...authorityFiles, allTimeHistoryPath, programProfilePath, sitemapPath]) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`Missing high-school football platform file: ${file}`);
}

if (!errors.length) {
  const alignment = read(files[0]);
  const directory = read(files[1]);
  const history = read(files[2]);
  const allTimeHistory = read(allTimeHistoryPath);
  const programProfile = read(programProfilePath);
  const sitemap = read(sitemapPath);
  const api = read(files[3]);
  const finder = read(files[4]);
  const countyModule = read(files[5]);
  const route = read(files[6]);
  const page = read(files[7]);
  const schoolDistrict = read(files[8]);
  const relocationFinder = read(files[9]);
  const entityPage = read(files[10]);
  const footballHub = read(files[11]);
  const publicRoutes = read(files[12]);
  const dataSources = read(files[13]);
  const newcomerGuide = read(authorityFiles[0]);
  const classificationGuide = read(authorityFiles[1]);
  const playoffGuide = read(authorityFiles[2]);
  const sixManGuide = read(authorityFiles[3]);
  const footballHubSchema = read(authorityFiles[4]);

  for (const marker of [
    'UIL_FOOTBALL_PROGRAM_COUNT !== 1268',
    "'1A': 159",
    "'2A': 205",
    "'3A': 204",
    "'4A': 205",
    "'5A': 246",
    "'6A': 249",
    "alignmentCycle: '2026-28'",
    "footballType:'6-Man'",
    "footballType:'11-Man'",
    'https://realignment.uiltexas.org/alignments/2026/6ABBFB2026.pdf',
  ]) requireText(alignment, marker, 'UIL football alignment');

  for (const marker of [
    'DownloadSite.aspx',
    'loadTeaSchoolDirectory',
    'searchFootballPrograms',
    'districtName',
    'countyName',
    'CACHE_TTL_MS',
    'loadUilRecentFootballHistory',
    'loadUilAllTimeFootballHistory',
    'recentHistory',
    'allTimeHistory',
    'historyAvailable',
    'allTimeHistoryAvailable',
    'footballProgramSlug',
    'footballProgramPath',
    'PROGRAM_BY_SLUG',
    'UIL football program slug collision',
    'getFootballProgramProfile',
    'districtPeers',
    'footballProgramSitemapEntries',
  ]) requireText(directory, marker, 'Football directory');

  for (const marker of [
    "const UIL_FOOTBALL_ARCHIVE_URL = 'https://www.uiltexas.org/football/archives'",
    "const HISTORY_START_SEASON = '2018-2019'",
    "const HISTORY_END_SEASON = '2025-2026'",
    'ARCHIVE_PAGE_OFFSETS',
    'stateTitles',
    'stateFinalAppearances',
    "matchMethod: 'exact-normalized-uil-name'",
    'recentFootballHistoryFromLoaded',
  ]) requireText(history, marker, 'UIL recent football history');

  for (const marker of [
    "const UIL_FOOTBALL_ALL_TIME_APPEARANCES_URL = 'https://www.uiltexas.org/football/all-time-appearances'",
    'ALL_TIME_CACHE_TTL_MS',
    'parseAllTimeRows',
    'rows.length < 300',
    'publishedThroughYear < 2024',
    'supplementedFinals',
    "Number.parseInt(final.season.slice(0, 4), 10) > history.publishedThroughYear",
    "matchMethod: 'exact-normalized-uil-name'",
    'allTimeFootballHistoryFromLoaded',
  ]) requireText(allTimeHistory, marker, 'UIL all-time football history');

  for (const marker of [
    "createFileRoute('/api/high-school-football')",
    'searchFootballPrograms',
    "'x-robots-tag': 'noindex, nofollow'",
    "alignmentCycle: '2026-28'",
    'recentStateFinals',
    'allTimeStateFinals',
  ]) requireText(api, marker, 'Football lookup API');

  for (const marker of [
    '/api/high-school-football',
    'High school, ISD, city or county',
    'Official UIL alignment',
    'This is not a “best school” rating.',
    'Attendance zones, transfers, eligibility and campus assignments can change',
    'initialQuery',
    'runQuery',
    'All-time UIL state-final history',
    'All-time titles',
    'All-time state finals',
    'allTimeHistoryAvailable',
    'UIL all-time appearances ↗',
    'Recent UIL state-final history · 2018–19 to 2025–26',
    'No history badge does not mean a weak program',
    'UIL state archives ↗',
    'Compare this program',
    'Compare football programs',
    'Select up to three programs',
    'Three-program comparison limit reached',
    'it does not rank academics, roster opportunity, coaching quality or overall student fit',
    'profilePath',
    'Open full program profile →',
  ]) requireText(finder, marker, 'Football lookup component');

  for (const marker of [
    "createFileRoute('/high-school-football/$teamSlug')",
    'getFootballProgramProfile',
    "'@type': 'SportsTeam'",
    'Program snapshot',
    'District competition',
    'How to enroll at',
    'Verify the exact home address',
    'Complete the district’s student-enrollment process',
    'Ask the football program about participation',
    'Verify UIL athletic eligibility before making a football-driven move',
    'https://www.uiltexas.org/policy/eligibility',
    'https://www.uiltexas.org/policy/constitution/general/eligibility',
    '/find-my-school-district',
    'Open program profile →',
    'Questions worth asking beyond trophies',
  ]) requireText(programProfile, marker, 'Football program profile');

  requireText(countyModule, 'High school football in', 'County football module');
  requireText(countyModule, 'countyName={countyName}', 'County football module');

  requireText(route, "createFileRoute(canonicalPath)", 'Football finder route');
  requireText(route, "const canonicalPath = '/texas-high-school-football-teams'", 'Football finder route');
  requireText(route, 'validateSearch:', 'Football finder route');
  requireText(route, "q: typeof search.q === 'string'", 'Football finder route');
  for (const marker of [
    "createLazyFileRoute('/texas-high-school-football-teams')",
    'Find a Texas high school football team',
    'What “good football fit” should mean',
    '/find-my-school-district',
    '/sports-venues/high-school-football',
    '/article/texas-high-school-football-playoffs-explained',
    '/article/texas-six-man-football-rules-explained',
    'Route.useSearch()',
    'initialQuery={q}',
    'official UIL all-time state-title and state-final totals',
    'lets families compare up to three programs side by side',
    'Full season-by-season records, current schedules, standings and coaching continuity remain future layers',
  ]) requireText(page, marker, 'Football finder page');

  requireText(schoolDistrict, 'HighSchoolFootballLookup', 'School-district integration');
  requireText(schoolDistrict, 'Research the football program after you identify the ISD', 'School-district integration');
  requireText(relocationFinder, 'texas-high-school-football-teams?q=', 'School lookup football handoff');
  requireText(relocationFinder, 'See football programs →', 'School lookup football handoff');
  requireText(entityPage, 'CountyHighSchoolFootball', 'County page integration');
  requireText(footballHub, '/texas-high-school-football-teams', 'Friday Night Lights discovery');
  requireText(footballHub, '/article/texas-high-school-football-classifications-1a-6a', 'Friday Night Lights classification discovery');
  requireText(footballHub, '/article/texas-high-school-football-playoffs-explained', 'Friday Night Lights playoff discovery');
  requireText(footballHub, '/article/texas-six-man-football-rules-explained', 'Friday Night Lights six-man discovery');
  requireText(newcomerGuide, '/texas-high-school-football-teams', 'Newcomer football finder discovery');
  requireText(newcomerGuide, '/article/texas-high-school-football-classifications-1a-6a', 'Newcomer classification discovery');
  requireText(newcomerGuide, '/article/texas-high-school-football-playoffs-explained', 'Newcomer playoff discovery');
  requireText(classificationGuide, '/texas-high-school-football-teams', 'Classification guide football finder discovery');
  requireText(classificationGuide, '/article/texas-high-school-football-playoffs-explained', 'Classification guide playoff discovery');
  requireText(classificationGuide, '/article/texas-six-man-football-rules-explained', 'Classification guide six-man discovery');
  for (const marker of [
    'How Do the Texas High School Football Playoffs Work?',
    'https://www.uiltexas.org/football/playoff-brackets',
    'top two teams from each 1A six-man district',
    'top four teams from each district advance in 2A through 6A',
    'the two schools with the larger enrollments go to the Division I bracket',
    'What \'bi-district\' means',
    'first round in 5A and 6A',
    '/texas-high-school-football-teams',
  ]) requireText(playoffGuide, marker, 'Football playoff guide');
  requireText(playoffGuide, '/article/texas-six-man-football-rules-explained', 'Football playoff guide six-man discovery');
  for (const marker of [
    'Texas Six-Man Football Explained: Rules, Scoring and Why It Looks So Different',
    'https://www.uiltexas.org/football/rules-guidelines',
    '2026-UIL-6-Player-Exceptions-to-NCAA-Rules_AUGUST_2026_REVISION.pdf',
    '80 yards long by 40 yards wide',
    'must advance 15 yards for a new first down',
    'until an exchange has occurred',
    'A field goal is worth 4 points',
    'successful place kick or drop kick is worth 2 points',
    '45-point ending rule',
    '10-minute quarters',
    '/texas-high-school-football-teams',
  ]) requireText(sixManGuide, marker, 'Six-man football guide');
  requireText(classificationGuide, 'Prairie View Interscholastic League', 'Classification guide history');
  requireText(classificationGuide, 'https://www.uiltexas.org/history/timeline', 'Classification guide UIL history source');
  requireText(classificationGuide, 'https://www.uiltexas.org/football/rules-guidelines', 'Classification guide rules source');
  requireText(footballHubSchema, '/article/texas-high-school-football-classifications-1a-6a', 'Friday Night Lights schema classification discovery');
  requireText(footballHubSchema, '/article/texas-high-school-football-playoffs-explained', 'Friday Night Lights schema playoff discovery');
  requireText(footballHubSchema, '/article/texas-six-man-football-rules-explained', 'Friday Night Lights schema six-man discovery');
  requireText(footballHubSchema, '/texas-high-school-football-teams', 'Friday Night Lights schema finder discovery');
  requireText(publicRoutes, '"/texas-high-school-football-teams"', 'Public route governance');
  requireText(dataSources, "id:'uil-football-alignments'", 'Texas source registry');
  requireText(dataSources, "domain:'sports'", 'Texas source registry');
  requireText(sitemap, 'footballProgramSitemapEntries', 'Football profile sitemap');
  requireText(sitemap, '...highSchoolFootballProfiles', 'Football profile sitemap');

  for (const [file, source] of [
    [files[4], finder],
    [files[5], countyModule],
    [files[7], page],
    [files[8], schoolDistrict],
    [files[9], relocationFinder],
    [files[10], entityPage],
  ]) {
    if (
      source.includes('uil-football-alignments-2026.server')
      || source.includes('football-directory.server')
      || source.includes('uil-football-all-time-history.server')
    ) {
      errors.push(`Client surface must not import the server-only football dataset directly: ${file}`);
    }
  }
}

if (errors.length) {
  console.error('High-school football platform validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('High-school football platform validation passed.');
