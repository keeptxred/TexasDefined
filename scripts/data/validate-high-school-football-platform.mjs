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
const featuredProfileFunctionPath = 'src/data/high-school-football/featured-program-profile.functions.ts';
const officialEnrollmentLinksPath = 'src/data/high-school-football/official-enrollment-links.ts';
const privateFootballAlignmentsPath = 'src/data/high-school-football/private-football-alignments.ts';
const privateSchoolAdmissionsPath = 'src/data/high-school-football/private-school-admissions.ts';
const programSlugsPath = 'src/data/high-school-football/program-slugs.ts';
const programProfileServerPath = 'src/data/high-school-football/football-program-profile.server.ts';
const footballVenueLinksPath = 'src/data/high-school-football/football-venue-links.server.ts';
const programProfileFunctionsPath = 'src/data/high-school-football/football-program-profile.functions.ts';
const uilDirectoryComponentPath = 'src/components/sports/UilFootballProgramDirectory.tsx';
const obsoleteSeedListComponentPath = 'src/components/sports/FeaturedFootballResearchList.tsx';
const legacyMetadataFiles = [
  'src/data/high-school-football/featured-programs.ts',
  'src/data/high-school-football/school-identities.ts',
  'src/data/high-school-football/featured-program-profile.server.ts',
  'src/routes/texas-high-school-football-teams_.$slug.tsx',
  'src/routes/texas-high-school-football-teams_.$slug.lazy.tsx',
  'src/routes/sitemap[.]xml.ts',
];

const authorityFiles = [
  'src/data/fixtures/high-school-football-newcomers.ts',
  'src/data/fixtures/texas-high-school-football-classifications.ts',
  'src/data/fixtures/texas-high-school-football-playoffs.ts',
  'src/data/fixtures/texas-six-man-football-explained.ts',
  'src/data/friday-night-lights-structured-data.server.ts',
];

for (const file of [
  ...files,
  ...authorityFiles,
  allTimeHistoryPath,
  featuredProfileFunctionPath,
  officialEnrollmentLinksPath,
  privateFootballAlignmentsPath,
  privateSchoolAdmissionsPath,
  programSlugsPath,
  programProfileServerPath,
  footballVenueLinksPath,
  programProfileFunctionsPath,
  uilDirectoryComponentPath,
  ...legacyMetadataFiles,
]) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`Missing high-school football platform file: ${file}`);
}

if (fs.existsSync(path.join(root, obsoleteSeedListComponentPath))) {
  errors.push('Obsolete 250-school football research-list component must not exist; all UIL programs belong to the canonical 1,268-program directory.');
}

if (!errors.length) {
  const alignment = read(files[0]);
  const directory = read(files[1]);
  const history = read(files[2]);
  const allTimeHistory = read(allTimeHistoryPath);
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
  const featuredProfileFunction = read(featuredProfileFunctionPath);
  const officialEnrollmentLinks = read(officialEnrollmentLinksPath);
  const privateFootballAlignments = read(privateFootballAlignmentsPath);
  const privateSchoolAdmissions = read(privateSchoolAdmissionsPath);
  const programSlugs = read(programSlugsPath);
  const programProfileServer = read(programProfileServerPath);
  const footballVenueLinks = read(footballVenueLinksPath);
  const programProfileFunctions = read(programProfileFunctionsPath);
  const uilDirectoryComponent = read(uilDirectoryComponentPath);
  const legacyProgramMetadata = read(legacyMetadataFiles[0]);
  const schoolIdentities = read(legacyMetadataFiles[1]);
  const featuredProfileLoader = read(legacyMetadataFiles[2]);
  const featuredProfileRoute = read(legacyMetadataFiles[3]);
  const featuredProfilePage = read(legacyMetadataFiles[4]);
  const sitemap = read(legacyMetadataFiles[5]);

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
    'profilePath',
    'footballProgramProfilePath',
    'Math.min(Math.max(options.limit ?? 50, 1), 500)',
    'schoolNumber?: string',
    'siteStreetAddress?: string',
    'siteCity?: string',
    'siteState?: string',
    'siteZip?: string',
    'phone?: string',
    'webAddress?: string',
    'gradeRange?: string',
    'enrollment?: number',
    'enrollmentLabel?: string',
    "findColumn(headers, ['schoolsitecity', 'sitecity', 'schoolcity', 'city'])",
    "findColumn(headers, ['schoolenrollmentasof', 'schoolenrollment'])",
    "rawEnrollment.replace(/,/g, '')",
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
    'Math.min(Math.max(parsed, 1), 500)',
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
    'School profile, enrollment & mascot →',
    "limit: '500'",
    'showAllMatches',
    'Show all {programs.length.toLocaleString()} matched programs',
    'Results stay ordered by UIL classification, with 6A before 5A through 1A.',
  ]) requireText(finder, marker, 'Football lookup component');
  if (finder.includes('Research list #')) errors.push('Football lookup must not expose seed-list rank or priority treatment.');

  for (const marker of [
    'Legacy source metadata from the user\'s original starter list.',
    'NOT the TexasDefined UIL school directory, ranking, priority list',
    'complete 1,268-program UIL 2026-28 alignment',
    'Numeric source positions must never be',
    'FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS',
    'SEARCH_NAME_OVERRIDES',
    'ASSOCIATION_OVERRIDES',
    'matchFeaturedFootballProgram',
    'featuredFootballProfilePath',
    '"Austin LBJ": "Austin Johnson"',
    '"Plano Senior": "Plano"',
    '"Calallen": "Corpus Christi Calallen"',
  ]) requireText(legacyProgramMetadata, marker, 'Legacy football alias/private-school metadata');

  for (const marker of [
    'VERIFIED_FOOTBALL_SCHOOL_IDENTITIES',
    "slug: 'north-shore'",
    "slug: 'cypress-ranch'",
    "slug: 'south-oak-cliff'",
    "slug: 'allen'",
    "slug: 'lake-travis'",
    "slug: 'katy'",
    "slug: 'smithson-valley'",
    "slug: 'rockwall'",
    "slug: 'pleasant-grove'",
    "slug: 'willis'",
    "slug: 'san-antonio-johnson'",
    "slug: 'dripping-springs'",
    "slug: 'klein-collins'",
    "slug: 'rockwall-heath'",
    "slug: 'round-rock'",
    "slug: 'harker-heights'",
    "slug: 'richland'",
    'sourceUrl',
    'verifiedAt',
  ]) requireText(schoolIdentities, marker, 'Football school identity data');
  const verifiedFootballIdentityCount = (schoolIdentities.match(/slug: '/g) ?? []).length;
  if (verifiedFootballIdentityCount < 42) {
    errors.push(`Football school identity data fell below 42 verified profiles; found ${verifiedFootballIdentityCount}.`);
  }

  for (const marker of [
    'getFeaturedFootballProgramProfile',
    'seedUilProgram',
    'searchFootballPrograms',
    'getVerifiedFootballSchoolIdentity',
  ]) requireText(featuredProfileLoader, marker, 'Featured football profile loader');
  requireText(featuredProfileLoader, 'getOfficialFootballEnrollmentLink', 'Featured football profile loader');
  requireText(featuredProfileLoader, 'enrollmentLink:', 'Featured football profile loader');
  requireText(featuredProfileLoader, 'getVerifiedPrivateFootballAlignment', 'Featured football profile loader');
  requireText(featuredProfileLoader, 'privateAlignment:', 'Featured football profile loader');
  requireText(featuredProfileLoader, 'getVerifiedPrivateSchoolAdmissions', 'Featured football profile loader');
  requireText(featuredProfileLoader, 'privateAdmissions:', 'Featured football profile loader');

  for (const marker of [
    'OFFICIAL_FOOTBALL_ENROLLMENT_LINKS',
    'getOfficialFootballEnrollmentLink',
    "districtName: 'Denton ISD'",
    "districtName: 'Prosper ISD'",
    "districtName: 'Lake Travis ISD'",
    "districtName: 'Katy ISD'",
    "districtName: 'Humble ISD'",
    "districtName: 'Rockwall ISD'",
    "districtName: 'Clear Creek ISD'",
    "districtName: 'Leander ISD'",
    "districtName: 'Round Rock ISD'",
    "districtName: 'Pearland ISD'",
    "districtName: 'Alief ISD'",
    "districtName: 'Pflugerville ISD'",
    "districtName: 'Judson ISD'",
    "districtName: 'Northside ISD'",
    'enrollmentUrl',
    'verifiedAt',
  ]) requireText(officialEnrollmentLinks, marker, 'Official football enrollment links');
  const verifiedEnrollmentLinkCount = (officialEnrollmentLinks.match(/districtName: '/g) ?? []).length;
  if (verifiedEnrollmentLinkCount < 21) {
    errors.push(`Official football enrollment-link data fell below 21 verified districts; found ${verifiedEnrollmentLinkCount}.`);
  }

  for (const marker of [
    'VERIFIED_PRIVATE_FOOTBALL_ALIGNMENTS',
    "association: 'SPC'",
    "association: 'TAPPS'",
    "association: 'TAIAO'",
    "slug: 'kinkaid'",
    "slug: 'liberty-christian-argyle'",
    "slug: 'parish-episcopal'",
    "slug: 'fort-bend-christian'",
    "slug: 'all-saints-fort-worth'",
    "slug: 'lubbock-christian'",
    "slug: 'first-baptist-dallas'",
    "slug: 'san-antonio-central-catholic'",
    "slug: 'san-antonio-antonian'",
    "slug: 'san-antonio-holy-cross'",
    "slug: 'san-antonio-christian'",
    "slug: 'new-braunfels-christian'",
    "slug: 'geneva-boerne'",
    "slug: 'castle-hills'",
    "slug: 'texas-wind-waco'",
    "slug: 'harvest-christian-bartonville'",
    "slug: 'grace-academy-georgetown'",
    "divisionLabel: 'Six-Man Division I'",
    "sourceKind: 'official-association'",
    "sourceKind: 'current-secondary'",
  ]) requireText(privateFootballAlignments, marker, 'Private football alignments');
  const verifiedPrivateAlignmentCount = (privateFootballAlignments.match(/slug: '/g) ?? []).length;
  if (verifiedPrivateAlignmentCount < 19) {
    errors.push(`Private football alignment data fell below 19 verified programs; found ${verifiedPrivateAlignmentCount}.`);
  }

  for (const marker of [
    'VERIFIED_PRIVATE_SCHOOL_ADMISSIONS',
    'getVerifiedPrivateSchoolAdmissions',
    "slug: 'liberty-christian-argyle'",
    "slug: 'parish-episcopal'",
    "slug: 'fort-bend-christian'",
    "slug: 'all-saints-fort-worth'",
    "slug: 'lubbock-christian'",
    "slug: 'first-baptist-dallas'",
    "slug: 'san-antonio-central-catholic'",
    "slug: 'san-antonio-antonian'",
    "slug: 'san-antonio-holy-cross'",
    "slug: 'san-antonio-christian'",
    "slug: 'geneva-boerne'",
    "slug: 'castle-hills'",
    "slug: 'kinkaid'",
    "slug: 'oakridge-arlington'",
    "slug: 'tmi-episcopal'",
    "slug: 'grace-academy-georgetown'",
    "slug: 'harvest-christian-bartonville'",
    'admissionsUrl',
    'verifiedAt',
  ]) requireText(privateSchoolAdmissions, marker, 'Private-school admissions');
  const verifiedPrivateAdmissionsCount = (privateSchoolAdmissions.match(/slug: '/g) ?? []).length;
  if (verifiedPrivateAdmissionsCount < 17) {
    errors.push(`Private-school admissions data fell below 17 verified profiles; found ${verifiedPrivateAdmissionsCount}.`);
  }

  for (const marker of [
    'createServerFn',
    'featured-program-profile.server',
    'loadFeaturedFootballProgramProfile',
    'getFeaturedFootballProgramProfile',
  ]) requireText(featuredProfileFunction, marker, 'Legacy/private football profile server-function bridge');

  for (const marker of [
    'footballProgramSlug',
    'footballProgramProfilePath',
    'footballClassificationRank',
  ]) requireText(programSlugs, marker, 'UIL football profile slug helpers');

  for (const marker of [
    'PROGRAM_BY_SLUG',
    'PROGRAM_BY_SLUG.size !== 1268',
    'UIL football program slug collision',
    'getFootballProgramProfile',
    'getAllUilFootballPrograms',
    'footballProgramSitemapEntries',
    'privateFootballProgramSitemapEntries',
    'districtPeers',
    'profilePath: footballProgramProfilePath',
    'getVerifiedFootballVenueLinks',
    'venueLinks:',
  ]) requireText(programProfileServer, marker, 'Universal UIL football profile resolver');

  for (const marker of [
    'VERIFIED_FOOTBALL_VENUE_RULES',
    'getVerifiedFootballVenueLinks',
    'getSportsVenueEnrichmentAll',
    "venueSlug: 'eagle-stadium-allen'",
    "venueSlug: 'mckinney-isd-stadium'",
    "venueSlug: 'childrens-health-stadium-prosper'",
    "venueSlug: 'legacy-stadium-katy'",
    "venueSlug: 'ratliff-stadium'",
    "venueSlug: 'cy-fair-fcu-stadium'",
    "venueSlug: 'mesquite-memorial-stadium'",
    "relationship: 'district-football-venue'",
    'VERIFIED_FOOTBALL_VENUE_RELATIONSHIP_COUNT',
  ]) requireText(footballVenueLinks, marker, 'Verified football venue relationships');

  for (const marker of [
    "createServerFn({ method: 'GET' })",
    'loadFootballProgramProfile',
    'loadFootballProgramDirectory',
    "import('./football-program-profile.server')",
    'getFootballProgramProfilePage',
    'getFootballProgramDirectoryPage',
  ]) requireText(programProfileFunctions, marker, 'Universal UIL football profile server functions');

  for (const marker of [
    'Browse all 1,268 Texas high school football programs',
    "const CLASSIFICATIONS = ['6A', '5A', '4A', '3A', '2A', '1A']",
    'Every current UIL football program gets the same directory and profile treatment.',
    'All 1,268',
    '6A → 1A · enrollment classification',
    'Open school football profile →',
    'not because TexasDefined has rated its football program as better',
  ]) requireText(uilDirectoryComponent, marker, 'All-UIL football directory');

  // The original supplied list remains available only as alias/private-school research metadata.
  // It must not control the public UIL directory, profile availability, profile order or search handoff.
  if (page.includes('FeaturedFootballResearchList')) errors.push('Football finder page must not use the old seed-list directory.');
  if (page.includes('242 canonical school profiles')) errors.push('Football finder page must not present the old seed list as the profile universe.');
  if (featuredProfilePage.includes('Research list position')) errors.push('Football school profiles must not display seed-list positions.');
  if (featuredProfilePage.includes('preserving every supplied list position')) errors.push('Football school profiles must not give the supplied seed list public priority treatment.');

  for (const marker of [
    "createFileRoute('/texas-high-school-football-teams/$slug')",
    'getFootballProgramProfilePage',
    'football-program-profile.functions',
    'Football: Class, District, Enrollment & School Guide',
    'streetAddress: program?.siteStreetAddress',
    'telephone: program?.phone',
    'url: program?.webAddress ? normalizeExternalUrl(program.webAddress)',
  ]) requireText(featuredProfileRoute, marker, 'Football school profile route');

  for (const marker of [
    "createLazyFileRoute('/texas-high-school-football-teams/$slug')",
    'How to enroll at',
    'Official district enrollment',
    'Official school admissions',
    'Start with {admissions.sourceLabel} ↗',
    'Start with {enrollmentLink.sourceLabel} ↗',
    'Mascot & identity',
    'All-time UIL state-final record',
    'Freshman, JV and varsity path',
    'Football eligibility is a separate question from school admission.',
    'UIL eligibility standards ↗',
    'UIL detailed eligibility rules ↗',
    'Current district',
    'Every opponent links to the same school-profile system.',
    'Verified football venue relationships',
    'Texas high schools often share district stadiums.',
    'Open TexasDefined stadium guide →',
    'Official venue source ↗',
    'Association placement not yet verified',
    'Private-school football uses its association’s own alignment system.',
    "privateAlignment.sourceKind === 'official-association'",
    'privateAlignmentLabel',
    'All current UIL football programs use the same profile system.',
    'AskTED campus facts',
    'TEA campus number',
    'TEA campus enrollment',
    'Physical campus address',
    'Official school website ↗',
    'The campus-enrollment snapshot can update on a different schedule from UIL realignment',
    'program.enrollmentLabel.replace',
  ]) requireText(featuredProfilePage, marker, 'Football school profile page');

  requireText(finder, 'School profile, enrollment & mascot →', 'Football finder profile handoff');
  requireText(page, 'UilFootballProgramDirectory', 'Football finder all-UIL directory integration');
  requireText(page, 'all 1,268 current UIL football programs as the authoritative school universe', 'Football finder all-UIL scope');
  requireText(page, '6A, 5A, 4A, 3A, 2A, 1A', 'Football finder classification ordering');
  requireText(sitemap, 'footballProgramSitemapEntries', 'Football school profile sitemap');
  requireText(sitemap, 'privateFootballProgramSitemapEntries', 'Private football profile sitemap');
  requireText(sitemap, '...footballProfileEntries', 'Football school profile sitemap');
  requireText(sitemap, '...privateFootballProfileEntries', 'Private football profile sitemap');

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
    'Official UIL all-time state-title and state-final totals',
    'three-program comparison remain part of the finder',
    'all 1,268 current UIL football programs as the authoritative school universe',
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

  for (const [file, source] of [
    [files[4], finder],
    [files[5], countyModule],
    [files[7], page],
    [files[8], schoolDistrict],
    [files[9], relocationFinder],
    [files[10], entityPage],
    [legacyMetadataFiles[4], featuredProfilePage],
    [uilDirectoryComponentPath, uilDirectoryComponent],
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
