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
const enrollmentBandsPath = 'src/data/high-school-football/enrollment-bands.ts';
const exactEnrollmentsPath = 'src/data/high-school-football/uil-football-enrollments-2026.generated.ts';
const exactEnrollmentGeneratorPath = 'scripts/data/generate-uil-football-enrollments.mjs';
const footballDistrictServerPath = 'src/data/high-school-football/football-districts.server.ts';
const footballDistrictFunctionsPath = 'src/data/high-school-football/football-districts.functions.ts';
const footballDistrictIndexRoutePath = 'src/routes/texas-high-school-football-districts.tsx';
const footballDistrictIndexPagePath = 'src/routes/texas-high-school-football-districts.lazy.tsx';
const footballDistrictRoutePath = 'src/routes/texas-high-school-football-districts_.$slug.tsx';
const footballDistrictPagePath = 'src/routes/texas-high-school-football-districts_.$slug.lazy.tsx';
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
  enrollmentBandsPath,
  exactEnrollmentsPath,
  exactEnrollmentGeneratorPath,
  footballDistrictServerPath,
  footballDistrictFunctionsPath,
  footballDistrictIndexRoutePath,
  footballDistrictIndexPagePath,
  footballDistrictRoutePath,
  footballDistrictPagePath,
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
  const enrollmentBands = read(enrollmentBandsPath);
  const exactEnrollments = read(exactEnrollmentsPath);
  const exactEnrollmentGenerator = read(exactEnrollmentGeneratorPath);
  const footballDistrictServer = read(footballDistrictServerPath);
  const footballDistrictFunctions = read(footballDistrictFunctionsPath);
  const footballDistrictIndexRoute = read(footballDistrictIndexRoutePath);
  const footballDistrictIndexPage = read(footballDistrictIndexPagePath);
  const footballDistrictRoute = read(footballDistrictRoutePath);
  const footballDistrictPage = read(footballDistrictPagePath);
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
    "slug: 'el-paso-coronado'",
    "slug: 'el-paso-eastlake'",
    "slug: 'el-paso-eastwood'",
    "slug: 'el-paso-pebble-hills'",
    "slug: 'midland'",
    "slug: 'midland-lee'",
    "slug: 'odessa'",
    "slug: 'san-angelo-central'",
    "slug: 'el-paso-franklin'",
    "slug: 'el-paso-montwood'",
    "slug: 'el-paso-socorro'",
    "slug: 'odessa-permian'",
    "slug: 'arlington'",
    "slug: 'arlington-bowie'",
    "slug: 'arlington-houston'",
    "slug: 'arlington-lamar'",
    "slug: 'arlington-martin'",
    "slug: 'granbury'",
    'sourceUrl',
    'verifiedAt',
  ]) requireText(schoolIdentities, marker, 'Football school identity data');
  const verifiedFootballIdentityCount = (schoolIdentities.match(/slug: '/g) ?? []).length;
  if (verifiedFootballIdentityCount < 60) {
    errors.push(`Football school identity data fell below 60 verified profiles; found ${verifiedFootballIdentityCount}.`);
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
    "districtName: 'Keller ISD'",
    "districtName: 'Plano ISD'",
    "districtName: 'McKinney ISD'",
    "districtName: 'Lewisville ISD'",
    "districtName: 'Richardson ISD'",
    "districtName: 'Mansfield ISD'",
    "districtName: 'Northwest ISD'",
    "districtName: 'Garland ISD'",
    "districtName: 'Irving ISD'",
    "districtName: 'Grand Prairie ISD'",
    'enrollmentUrl',
    'verifiedAt',
  ]) requireText(officialEnrollmentLinks, marker, 'Official football enrollment links');
  const verifiedEnrollmentLinkCount = (officialEnrollmentLinks.match(/districtName: '/g) ?? []).length;
  if (verifiedEnrollmentLinkCount < 31) {
    errors.push(`Official football enrollment-link data fell below 31 verified districts; found ${verifiedEnrollmentLinkCount}.`);
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
    'ALL_UIL_FOOTBALL_PROGRAMS',
    'assertAllUilDirectoryInvariant',
    'ALL_UIL_FOOTBALL_PROGRAMS.length !== 1268',
    'UIL_FOOTBALL_EXPECTED_COUNTS',
    'UIL football directory ordering regression',
    'UIL football directory division ordering regression',
    'footballProgramSitemapEntries',
    'UIL football sitemap expected 1,268 school profiles',
    'privateFootballProgramSitemapEntries',
    'districtPeers',
    'districtPath',
    'footballDistrictProfilePath',
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
    'UIL_FOOTBALL_EXACT_ENROLLMENT_SOURCE',
    'UIL 2026–28 Realignment Alphabetical Listing',
    'https://www.uiltexas.org/files/alignments/Alpha_26-28.pdf',
    '"Allen": {"enrollment":6798',
    '"Katy": {"enrollment":3401',
    '"Abbott": {"enrollment":91',
  ]) requireText(exactEnrollments, marker, 'Exact UIL football enrollment data');
  const exactEnrollmentCount = (exactEnrollments.match(/^\s*"[^"]+": \{"enrollment":[0-9.]+,"submittedConference":"[1-6]A"\},$/gm) ?? []).length;
  if (exactEnrollmentCount !== 1268) errors.push(`Exact UIL football enrollment data expected 1,268 schools; found ${exactEnrollmentCount}.`);

  for (const marker of [
    'const EXPECTED_TOTAL = 1268',
    'Exact UIL school-name join failed',
    'Football type mismatch',
    'UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28',
  ]) requireText(exactEnrollmentGenerator, marker, 'Exact UIL football enrollment generator');

  for (const marker of [
    "classification: '6A', division: null, label: '2,215 and above'",
    "classification: '5A', division: 1, label: '1,870–2,214'",
    "classification: '5A', division: 2, label: '1,305–1,869'",
    "classification: '4A', division: 1, label: '896–1,304'",
    "classification: '4A', division: 2, label: '550–895'",
    "classification: '3A', division: 1, label: '367–549'",
    "classification: '3A', division: 2, label: '246–366.9'",
    "classification: '2A', division: 1, label: '175.6–245.9'",
    "classification: '2A', division: 2, label: '105–175.5'",
    "classification: '1A', division: 1, label: '57.6–104.9'",
    "classification: '1A', division: 2, label: '57.5 and below'",
    'https://www.uiltexas.org/athletics/conference-cutoffs',
    'uilFootballEnrollmentBand',
    'uilFootballConferenceBand',
  ]) requireText(enrollmentBands, marker, 'UIL football enrollment bands');

  for (const marker of [
    'UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28',
    'uilEnrollment',
    'uilSubmittedConference',
  ]) requireText(directory, marker, 'Football directory exact enrollment integration');

  for (const marker of [
    'UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28',
    'uilEnrollment:',
  ]) requireText(programProfileServer, marker, 'Football profile exact enrollment integration');

  for (const marker of [
    'Browse all 1,268 Texas high school football programs',
    "const CLASSIFICATIONS = ['6A', '5A', '4A', '3A', '2A', '1A']",
    'Every current UIL football program gets the same directory and profile treatment.',
    'All 1,268',
    '6A → 1A · enrollment classification',
    'A 6A school is listed above a 5A school because it is in the larger-enrollment classification',
    'Open school football profile →',
    'not because TexasDefined has rated its football program as better',
    'UIL enrollment band:',
    'Official UIL 2026–28 enrollment cutoffs ↗',
    'uilFootballConferenceBand',
    'uilEnrollment',
    'UIL enrollment',
  ]) requireText(uilDirectoryComponent, marker, 'All-UIL football directory');

  for (const marker of [
    'DISTRICT_BY_SLUG',
    'DISTRICT_BY_SLUG.size !== 192',
    'footballDistrictSlug',
    'footballDistrictProfilePath',
    'getFootballDistrictProfile',
    'getAllFootballDistricts',
    'footballDistrictSitemapEntries',
    'footballProgramProfilePath',
  ]) requireText(footballDistrictServer, marker, 'UIL football district index');

  for (const marker of [
    "createServerFn({ method: 'GET' })",
    "import('./football-districts.server')",
    'getFootballDistrictPage',
    'getFootballDistrictDirectoryPage',
  ]) requireText(footballDistrictFunctions, marker, 'UIL football district server functions');

  for (const marker of [
    'createFileRoute(canonicalPath)',
    "const canonicalPath = '/texas-high-school-football-districts'",
    'getFootballDistrictDirectoryPage',
    'all 192 current UIL football districts',
  ]) requireText(footballDistrictIndexRoute, marker, 'Football district directory route');

  for (const marker of [
    "createLazyFileRoute('/texas-high-school-football-districts')",
    'Texas high school football districts',
    'Browse all 192 current UIL football districts',
    'Search all 1,268 UIL programs',
  ]) requireText(footballDistrictIndexPage, marker, 'Football district directory page');

  for (const marker of [
    "createFileRoute('/texas-high-school-football-districts/$slug')",
    'getFootballDistrictPage',
    'CollectionPage',
    'ItemList',
    'High School Football Districts',
  ]) requireText(footballDistrictRoute, marker, 'Football district detail route');

  for (const marker of [
    "createLazyFileRoute('/texas-high-school-football-districts/$slug')",
    'Every current program',
    'Member order is alphabetical for research usability; it is not a ranking',
    'District is a competition group',
    'Open official UIL alignment ↗',
    'Enrollment band',
    'Official UIL 2026–28 enrollment cutoffs ↗',
    'uilFootballEnrollmentBand',
  ]) requireText(footballDistrictPage, marker, 'Football district detail page');

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
    'Open full district guide →',
    'districtPath',
    'UIL enrollment band',
    'Official UIL 2026–28 enrollment cutoffs ↗',
    'uilFootballEnrollmentBand',
    'UIL reported enrollment',
    'program.uilEnrollment',
    'Official UIL alphabetical enrollment listing ↗',
  ]) requireText(featuredProfilePage, marker, 'Football school profile page');

  requireText(finder, 'uilEnrollment', 'Football finder exact enrollment');
  requireText(finder, 'UIL enrollment', 'Football finder exact enrollment');

  requireText(finder, 'School profile, enrollment & mascot →', 'Football finder profile handoff');
  requireText(page, 'UilFootballProgramDirectory', 'Football finder all-UIL directory integration');
  requireText(page, 'all 1,268 current UIL football programs as the authoritative school universe', 'Football finder all-UIL scope');
  requireText(page, '6A, 5A, 4A, 3A, 2A, 1A', 'Football finder classification ordering');
  requireText(sitemap, 'footballProgramSitemapEntries', 'Football school profile sitemap');
  requireText(sitemap, 'privateFootballProgramSitemapEntries', 'Private football profile sitemap');
  requireText(sitemap, 'footballDistrictSitemapEntries', 'Football district sitemap');
  requireText(sitemap, '...footballDistrictEntries', 'Football district sitemap');
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
    '/texas-high-school-football-districts',
    'Browse all 192 UIL football districts',
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
  requireText(footballHub, '/texas-high-school-football-districts', 'Friday Night Lights district discovery');
  requireText(footballHub, '/article/texas-high-school-football-classifications-1a-6a', 'Friday Night Lights classification discovery');
  requireText(footballHub, '/article/texas-high-school-football-playoffs-explained', 'Friday Night Lights playoff discovery');
  requireText(footballHub, '/article/texas-six-man-football-rules-explained', 'Friday Night Lights six-man discovery');
  requireText(newcomerGuide, '/texas-high-school-football-teams', 'Newcomer football finder discovery');
  requireText(newcomerGuide, '/article/texas-high-school-football-classifications-1a-6a', 'Newcomer classification discovery');
  requireText(newcomerGuide, '/article/texas-high-school-football-playoffs-explained', 'Newcomer playoff discovery');
  requireText(classificationGuide, '/texas-high-school-football-teams', 'Classification guide football finder discovery');
  requireText(classificationGuide, '/texas-high-school-football-districts', 'Classification guide district discovery');
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
  requireText(footballHubSchema, '/texas-high-school-football-districts', 'Friday Night Lights schema district discovery');
  requireText(publicRoutes, '"/texas-high-school-football-teams"', 'Public route governance');
  requireText(publicRoutes, '"/texas-high-school-football-districts"', 'Football district public route governance');
  requireText(dataSources, "id:'uil-football-alignments'", 'Texas source registry');
  requireText(dataSources, "domain:'sports'", 'Texas source registry');
  requireText(dataSources, "id:'uil-football-enrollment-cutoffs'", 'Texas source registry');
  requireText(dataSources, 'https://www.uiltexas.org/athletics/conference-cutoffs', 'Texas source registry');

  for (const [file, source] of [
    [files[4], finder],
    [files[5], countyModule],
    [files[7], page],
    [files[8], schoolDistrict],
    [files[9], relocationFinder],
    [files[10], entityPage],
    [legacyMetadataFiles[4], featuredProfilePage],
    [uilDirectoryComponentPath, uilDirectoryComponent],
    [footballDistrictIndexPagePath, footballDistrictIndexPage],
    [footballDistrictPagePath, footballDistrictPage],
  ]) {
    if (
      source.includes('uil-football-alignments-2026.server')
      || source.includes('football-directory.server')
      || source.includes('uil-football-all-time-history.server')
      || source.includes('football-districts.server')
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
