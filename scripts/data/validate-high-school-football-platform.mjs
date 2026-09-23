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
const footballProgramIndexPath = 'src/data/high-school-football/football-program-index.server.ts';
const footballSitemapPath = 'src/data/high-school-football/football-sitemap.server.ts';
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
const footballChampionshipServerPath = 'src/data/high-school-football/football-championship-history.server.ts';
const footballChampionshipFunctionsPath = 'src/data/high-school-football/football-championship-history.functions.ts';
const footballChampionshipRoutePath = 'src/routes/texas-high-school-football-championship-history.tsx';
const footballChampionshipPagePath = 'src/routes/texas-high-school-football-championship-history.lazy.tsx';
const scoresSchedulesGuidePath = 'src/data/fixtures/texas-high-school-football-scores-schedules.ts';
const footballCalendarGuidePath = 'src/data/fixtures/texas-high-school-football-2026-calendar.ts';
const evergreenRegistryPath = 'src/data/fixtures/lazy-standalone-evergreen.ts';
const obsoleteSeedListComponentPath = 'src/components/sports/FeaturedFootballResearchList.tsx';
const productionSmokePath = 'scripts/ci/verify-friday-night-lights-production.mjs';
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
  footballProgramIndexPath,
  footballSitemapPath,
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
  footballChampionshipServerPath,
  footballChampionshipFunctionsPath,
  footballChampionshipRoutePath,
  footballChampionshipPagePath,
  scoresSchedulesGuidePath,
  footballCalendarGuidePath,
  evergreenRegistryPath,
  productionSmokePath,
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
  const footballProgramIndex = read(footballProgramIndexPath);
  const footballSitemap = read(footballSitemapPath);
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
  const footballChampionshipServer = read(footballChampionshipServerPath);
  const footballChampionshipFunctions = read(footballChampionshipFunctionsPath);
  const footballChampionshipRoute = read(footballChampionshipRoutePath);
  const footballChampionshipPage = read(footballChampionshipPagePath);
  const scoresSchedulesGuide = read(scoresSchedulesGuidePath);
  const footballCalendarGuide = read(footballCalendarGuidePath);
  const evergreenRegistry = read(evergreenRegistryPath);
  const productionSmoke = read(productionSmokePath);
  const legacyProgramMetadata = read(legacyMetadataFiles[0]);
  const schoolIdentities = read(legacyMetadataFiles[1]);
  const featuredProfileLoader = read(legacyMetadataFiles[2]);
  const featuredProfileRoute = read(legacyMetadataFiles[3]);
  const featuredProfilePage = read(legacyMetadataFiles[4]);
  const sitemap = read(legacyMetadataFiles[5]);

  for (const marker of [
    "name: 'Lubbock Cooper', classification: '5A', enrollment: '1,663'",
    "name: 'Huffman Hargrave', classification: '4A', enrollment: '1,168'",
    "name: 'Franklin', classification: '3A', enrollment: '435'",
    "name: 'Panhandle', classification: '2A', enrollment: '176.5'",
    "name: 'Abbott', classification: '1A', enrollment: '91'",
    'universalProfileCases',
    'universal football profile',
    'sitemap universal football profile',
    "const friscoProfilePath = '/texas-high-school-football-teams/frisco'",
    'Ford Center at The Star',
    '/sports-venue/ford-center-at-the-star',
    'Frisco ISD football programs use it for district games',
  ]) requireText(productionSmoke, marker, 'Cross-class universal football production smoke');

  for (const marker of [
    'if (katy.uilEnrollment !== 3401)',
    "await fetchVerified(katyProfilePath, 'Katy football school profile'",
    "'UIL reported enrollment'",
    "'3,401'",
  ]) requireText(productionSmoke, marker, 'Katy exact enrollment production contract');
  if (productionSmoke.includes("'UIL enrollment 3,401'")) {
    errors.push('Football finder shell smoke must not require Katy enrollment text that is hidden by the collapsed 6A directory; exact enrollment remains covered by API and profile checks.');
  }

  for (const marker of [
    'UIL_FOOTBALL_PROGRAM_COUNT !== 1268',
    "'1A': 159",
    "'2A': 205",
    "'3A': 204",
    "'4A': 205",
    "'5A': 246",
    "'6A': 249",
    "alignmentCycle: '2026-28'",
    'sourceSchoolName: string;',
    'sourceSchoolName,',
    'displayUilSchoolName(sourceSchoolName)',
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
    'showAllByDefault',
    'Show all {programs.length.toLocaleString()} matched programs',
    'Results stay ordered by UIL classification, with 6A before 5A through 1A.',
  ]) requireText(finder, marker, 'Football lookup component');
  if (finder.includes('Research list #')) errors.push('Football lookup must not expose seed-list rank or priority treatment.');

  for (const marker of [
    'Legacy source metadata from the user\'s original starter list.',
    'NOT the TexasDefined UIL school directory, ranking, priority list',
    'complete 1,268-program UIL 2026-28 alignment',
    'Numeric source positions must never be',
    'sourcePositions',
    'firstSourcePosition',
    'FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS',
    'SEARCH_NAME_OVERRIDES',
    'ASSOCIATION_OVERRIDES',
    'matchFeaturedFootballProgram',
    'featuredFootballProfilePath',
    '"Austin LBJ": "Austin Johnson"',
    '"Plano Senior": "Plano"',
    '"Calallen": "Corpus Christi Calallen"',
  ]) requireText(legacyProgramMetadata, marker, 'Legacy football alias/private-school metadata');
  if (legacyProgramMetadata.includes('sourceRanks')) errors.push('Legacy football seed metadata must use neutral sourcePositions terminology, not sourceRanks.');
  if (legacyProgramMetadata.includes('primaryRank')) errors.push('Legacy football seed metadata must use firstSourcePosition terminology, not primaryRank.');

  for (const marker of [
    'VERIFIED_FOOTBALL_SCHOOL_IDENTITIES',
    "slug: 'galena-park-north-shore'",
    "slug: 'cyp-ranch'",
    "slug: 'dallas-south-oak-cliff'",
    "slug: 'allen'",
    "slug: 'austin-lake-travis'",
    "slug: 'katy'",
    "slug: 'comal-smithson-valley'",
    "slug: 'rockwall'",
    "slug: 'texarkana-pleasant-grove'",
    "slug: 'willis'",
    "slug: 'san-antonio-johnson'",
    "slug: 'dripping-springs'",
    "slug: 'klein-collins'",
    "slug: 'rockwall-heath'",
    "slug: 'round-rock'",
    "slug: 'killeen-harker-heights'",
    "slug: 'n-richland-hills-richland'",
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
    "slug: 'clint-horizon'",
    "slug: 'el-paso-americas'",
    "slug: 'el-paso-bel-air'",
    "slug: 'el-paso-el-dorado'",
    "slug: 'el-paso-hanks'",
    "slug: 'el-paso-parkland'",
    "slug: 'abilene'",
    "slug: 'frenship-memorial'",
    "slug: 'lubbock'",
    "slug: 'lubbock-monterey'",
    "slug: 'wolfforth-frenship'",
    "slug: 'azle'",
    "slug: 'denton'",
    "slug: 'denton-ryan'",
    "slug: 'fw-chisholm-trail'",
    "slug: 'keller-fossil-ridge'",
    "slug: 'saginaw'",
    "slug: 'sherman'",
    "slug: 'ft-worth-arlington-hts'",
    "slug: 'ft-worth-north-side'",
    "slug: 'ft-worth-paschal'",
    "slug: 'ft-worth-polytechnic'",
    "slug: 'ft-worth-south-hills'",
    "slug: 'ft-worth-trimble-tech'",
    "slug: 'ft-worth-wyatt'",
    "slug: 'white-settlement-brewer'",
    "slug: 'frisco-centennial'",
    "slug: 'frisco-heritage'",
    "slug: 'frisco-lebanon-trail'",
    "slug: 'frisco-liberty'",
    "slug: 'frisco-reedy'",
    "slug: 'mckinney-north'",
    "slug: 'melissa'",
    "slug: 'carrollton-creekview'",
    "slug: 'carrollton-smith'",
    "slug: 'carrollton-turner'",
    "slug: 'dallas-highland-park'",
    "slug: 'garland-naaman-forest'",
    "slug: 'n-richland-hills-birdville'",
    "slug: 'n-richland-hills-richland'",
    "slug: 'crandall'",
    "slug: 'dallas-adams'",
    "slug: 'dallas-sunset'",
    "slug: 'dallas-white'",
    "slug: 'mesquite'",
    "slug: 'north-mesquite'",
    "slug: 'tyler'",
    "slug: 'west-mesquite'",
    "slug: 'burleson-centennial'",
    "slug: 'cedar-hill'",
    "slug: 'cleburne'",
    "slug: 'de-soto'",
    "slug: 'lancaster'",
    "slug: 'mansfield-legacy'",
    "slug: 'mansfield-summit'",
    "slug: 'midlothian'",
    "slug: 'weatherford'",
    "slug: 'ft-worth-boswell'",
    "slug: 'keller'",
    "slug: 'keller-central'",
    "slug: 'keller-timber-creek'",
    "slug: 'northwest'",
    "slug: 'northwest-eaton'",
    "slug: 'northwest-nelson'",
    "slug: 'denton-braswell'",
    "slug: 'frisco-wakeland'",
    "slug: 'lewisville-flower-mound'",
    "slug: 'lewisville-hebron'",
    "slug: 'lewisville-marcus'",
    "slug: 'little-elm'",
    "slug: 'mckinney'",
    "slug: 'mckinney-boyd'",
    "slug: 'princeton'",
    "slug: 'prosper-rock-hill'",
    "slug: 'plano'",
    "slug: 'lewisville-hebron'",
    "slug: 'lewisville-marcus'",
    "slug: 'dallas-jesuit'",
    "slug: 'plano-east'",
    "slug: 'plano-west'",
    "slug: 'richardson-berkner'",
    "slug: 'richardson-lake-highlands'",
    "slug: 'euless-trinity'",
    "slug: 'grand-prairie'",
    "slug: 'hurst-bell'",
    "slug: 'irving-macarthur'",
    "slug: 'irving-nimitz'",
    "slug: 'alief-elsik'",
    "slug: 'alief-hastings'",
    "slug: 'alief-taylor'",
    "slug: 'alvin'",
    "slug: 'alvin-shadow-creek'",
    "slug: 'austin'",
    "slug: 'austin-akins'",
    "slug: 'austin-bowie'",
    "slug: 'austin-vandegrift'",
    "slug: 'plano'",
    "slug: 'richardson'",
    "slug: 'richardson-pearce'",
    "slug: 'haltom-city-haltom'",
    "slug: 'irving'",
    "slug: 'south-grand-prairie'",
    "slug: 'garland'",
    "slug: 'garland-lakeview-cent'",
    "slug: 'garland-sachse'",
    "slug: 'wylie'",
    "slug: 'wylie-east'",
    "slug: 'prosper-walnut-grove'",
    "slug: 'garland-rowlett'",
    "slug: 'north-garland'",
    "slug: 'south-garland'",
    "slug: 'forney'",
    "slug: 'mesquite-horn'",
    "slug: 'royse-city'",
    "slug: 'tyler-legacy'",
    "slug: 'crowley'",
    "slug: 'mansfield'",
    "slug: 'ft-worth-boswell'",
    "slug: 'longview'",
    "slug: 'dallas-skyline'",
    "slug: 'mansfield-lake-ridge'",
    "slug: 'north-crowley'",
    "slug: 'red-oak'",
    "slug: 'bryan'",
    "slug: 'temple'",
    'sourceUrl',
    'verifiedAt',
  ]) requireText(schoolIdentities, marker, 'Football school identity data');
  const verifiedFootballIdentityCount = (schoolIdentities.match(/slug: '/g) ?? []).length;
  if (verifiedFootballIdentityCount < 178) {
    errors.push(`Football school identity data fell below 178 verified canonical UIL profiles; found ${verifiedFootballIdentityCount}.`);
  }

  const obsoleteIdentitySlugs = ["fort-worth-boswell","hebron","flower-mound-marcus","plano-senior","north-shore","cypress-ranch","ce-king","south-oak-cliff","desoto","randle","lake-travis","westlake","smithson-valley","summer-creek","atascocita","pleasant-grove","harker-heights","mt-pleasant","walnut-grove","richland","west-plains"];
  for (const slug of obsoleteIdentitySlugs) {
    if (schoolIdentities.includes(`slug: '${slug}'`)) {
      errors.push(`Football school identity data must use the canonical UIL slug instead of legacy alias: ${slug}.`);
    }
  }
  if (programProfileServer.includes('matchFeaturedFootballProgram')) {
    errors.push('Current UIL football profiles must resolve identity directly by canonical UIL slug, not through the former seed-list matcher.');
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
    "districtName: 'Clint ISD'",
    "districtName: 'Socorro ISD'",
    "districtName: 'Ysleta ISD'",
    "districtName: 'Abilene ISD'",
    "districtName: 'Lubbock ISD'",
    "districtName: 'Frenship ISD'",
    "districtName: 'Amarillo ISD'",
    "districtName: 'Azle ISD'",
    "districtName: 'Eagle Mountain-Saginaw ISD'",
    "districtName: 'Sherman ISD'",
    "districtName: 'Fort Worth ISD'",
    "districtName: 'White Settlement ISD'",
    "districtName: 'Melissa ISD'",
    "districtName: 'Carrollton-Farmers Branch ISD'",
    "districtName: 'Dallas ISD'",
    "districtName: 'Birdville ISD'",
    "districtName: 'Crandall ISD'",
    "districtName: 'Mesquite ISD'",
    "districtName: 'Tyler ISD'",
    "districtName: 'Burleson ISD'",
    "districtName: 'Cedar Hill ISD'",
    "districtName: 'Cleburne ISD'",
    "districtName: 'DeSoto ISD'",
    "districtName: 'Lancaster ISD'",
    "districtName: 'Midlothian ISD'",
    "districtName: 'Frisco ISD'",
    "districtName: 'Little Elm ISD'",
    "districtName: 'Princeton ISD'",
    'enrollmentUrl',
    'verifiedAt',
  ]) requireText(officialEnrollmentLinks, marker, 'Official football enrollment links');
  const verifiedEnrollmentLinkCount = (officialEnrollmentLinks.match(/districtName: '/g) ?? []).length;
  if (verifiedEnrollmentLinkCount < 59) {
    errors.push(`Official football enrollment-link data fell below 59 verified districts; found ${verifiedEnrollmentLinkCount}.`);
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
    'UIL_FOOTBALL_PROGRAMS_2026',
    'FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS',
    'normalizeFeaturedFootballName',
    'footballProgramProfilePath',
    'footballProgramSitemapEntries',
    'privateFootballProgramSitemapEntries',
    'footballDistrictSitemapEntries',
    'UIL football district sitemap expected 192 district profiles',
    '1,268 unique school profile paths',
  ]) requireText(footballSitemap, marker, 'Lightweight football sitemap generator');
  requireText(sitemap, 'football-sitemap.server', 'Primary sitemap lightweight football import');
  if (sitemap.includes('football-program-profile.server')) {
    errors.push('Primary sitemap must not import the full football program profile resolver.');
  }
  if (sitemap.includes('football-districts.server')) {
    errors.push('Primary sitemap must not import the full football district profile resolver.');
  }
  for (const forbidden of ['football-directory.server', 'football-venue-links.server', 'featured-program-profile.server', 'searchFootballPrograms']) {
    if (footballSitemap.includes(forbidden)) {
      errors.push(`Lightweight football sitemap generator must not import live/profile stack marker: ${forbidden}.`);
    }
  }

  for (const marker of [
    'VERIFIED_FOOTBALL_VENUE_RULES',
    'getVerifiedFootballVenueLinks',
    'getSportsVenueEnrichmentAll',
    "venueSlug: 'eagle-stadium-allen'",
    "venueSlug: 'ford-center-at-the-star'",
    "venueSlug: 'mckinney-isd-stadium'",
    "venueSlug: 'childrens-health-stadium-prosper'",
    "venueSlug: 'legacy-stadium-katy'",
    "venueSlug: 'ratliff-stadium'",
    "venueSlug: 'cy-fair-fcu-stadium'",
    "venueSlug: 'mesquite-memorial-stadium'",
    "relationship: 'district-football-venue'",
    'VERIFIED_FOOTBALL_VENUE_RELATIONSHIP_COUNT',
  ]) requireText(footballVenueLinks, marker, 'Football game venues');

  for (const marker of [
    "createServerFn({ method: 'GET' })",
    'loadFootballProgramProfile',
    'loadFootballProgramDirectory',
    "import('./football-program-profile.server')",
    "import('./football-program-index.server')",
    'getFootballProgramProfilePage',
    'getFootballProgramDirectoryPage',
  ]) requireText(programProfileFunctions, marker, 'Universal UIL football profile server functions');

  for (const marker of [
    'getAllUilFootballProgramIndexEntries',
    'ALL_UIL_FOOTBALL_PROGRAMS.length !== 1268',
    'UIL_FOOTBALL_EXPECTED_COUNTS',
    'UIL football index ordering regression',
    'UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28',
    'footballProgramProfilePath',
    'UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28[program.sourceSchoolName]',
  ]) requireText(footballProgramIndex, marker, 'Lightweight UIL football finder bootstrap');

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
    'UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28[program.sourceSchoolName]',
  ]) requireText(directory, marker, 'Football directory exact enrollment integration');

  for (const marker of [
    'UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28',
    'uilEnrollment:',
    'UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28[seed.sourceSchoolName]',
    'UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28[program.sourceSchoolName]',
  ]) requireText(programProfileServer, marker, 'Football profile exact enrollment integration');
  requireText(programProfileServer, 'getVerifiedFootballSchoolIdentity(canonicalSlug)', 'Canonical UIL identity precedence');
  requireText(programProfileServer, 'identity: getVerifiedFootballSchoolIdentity(canonicalSlug) ?? null', 'Canonical UIL identity ownership');


  for (const marker of [
    'Browse all 1,268 Texas high school football programs',
    "const CLASSIFICATIONS = ['6A', '5A', '4A', '3A', '2A', '1A']",
    'const INITIAL_PROGRAMS_PER_CLASS = 24',
    'expandedClasses',
    'displayedPrograms',
    'Show all {classPrograms.length.toLocaleString()} {item} programs',
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
    'UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28',
    'UIL_FOOTBALL_EXACT_ENROLLMENT_SOURCE',
    'uilEnrollment',
    'submittedConference',
    'enrollmentSourceUrl',
    'UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28[program.sourceSchoolName]',
  ]) requireText(footballDistrictServer, marker, 'UIL football district index');

  for (const [source, label] of [
    [footballProgramIndex, 'football finder bootstrap'],
    [directory, 'football directory'],
    [footballDistrictServer, 'football district index'],
    [programProfileServer, 'football profile resolver'],
  ]) {
    if (source.includes('UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28[program.schoolName]')) {
      errors.push(`${label} must join exact UIL enrollment by sourceSchoolName, not the display schoolName.`);
    }
  }
  if (programProfileServer.includes('UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28[seed.schoolName]')) {
    errors.push('Football profile resolver must join seed exact UIL enrollment by sourceSchoolName, not the display schoolName.');
  }

  for (const marker of [
    "createServerFn({ method: 'GET' })",
    "import('./football-districts.server')",
    "import('./football-program-index.server')",
    'getFootballDistrictPage',
    'getFootballDistrictDirectoryPage',
    'UIL football district directory expected 192 districts',
    "const classRank: Record<string, number> = { '1A': 1, '2A': 2, '3A': 3, '4A': 4, '5A': 5, '6A': 6 }",
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
    'Reported enrollment range',
    'UIL reported enrollment:',
    'Submitted conference:',
    'Enrollment figures are the UIL 2026–28 realignment snapshot used for classification.',
    'Open UIL enrollment listing ↗',
    'Official UIL 2026–28 enrollment cutoffs ↗',
    'uilFootballEnrollmentBand',
    '/article/texas-high-school-football-scores-schedules',
    'Follow scores & weekly schedules',
    'Current season',
    'Scores & weekly schedules',
    'https://www.uiltexas.org/maxpreps/',
    'UIL Texas Scoreboard gateway ↗',
    'the scoreboard is not currently an official district-standings table',
    'How to verify scores, schedules & standings →',
  ]) requireText(footballDistrictPage, marker, 'Football district detail page');
  requireText(footballDistrictPage, '/article/texas-high-school-football-2026-season-calendar', 'Football district calendar discovery');
  requireText(footballDistrictPage, '2026 UIL season calendar →', 'Football district calendar discovery');

  for (const marker of [
    'loadUilAllTimeFootballHistory',
    'loadUilRecentFootballHistory',
    'UIL_FOOTBALL_PROGRAMS_2026',
    'footballProgramProfilePath',
    'right.stateTitles - left.stateTitles',
    'https://www.uiltexas.org/football/all-time-appearances',
    'https://www.uiltexas.org/football/archives',
  ]) requireText(footballChampionshipServer, marker, 'Football championship history server');

  for (const marker of [
    "createServerFn({ method: 'GET' })",
    "import('./football-championship-history.server')",
    'getFootballChampionshipHistoryPage',
  ]) requireText(footballChampionshipFunctions, marker, 'Football championship history server function');

  for (const marker of [
    "const canonicalPath = '/texas-high-school-football-championship-history'",
    'getFootballChampionshipHistoryPage',
    'Texas High School Football State Championships: All-Time UIL History',
    "'@type': 'CollectionPage'",
  ]) requireText(footballChampionshipRoute, marker, 'Football championship history route');

  for (const marker of [
    "createLazyFileRoute('/texas-high-school-football-championship-history')",
    'Texas high school football state championship history',
    'History, not a power ranking',
    'Current programs with the most UIL state titles',
    'Every matched program with a UIL state-final appearance',
    'UIL history is the controlling record',
    '/texas-high-school-football-teams',
    '/texas-high-school-football-districts',
  ]) requireText(footballChampionshipPage, marker, 'Football championship history page');

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
    'District enrollment source last reviewed',
    'Official district enrollment link not yet available',
    'Every UIL school profile uses the same enrollment-source field.',
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
    'Football game venues',
    'Football venue details',
    'Venue details not yet available',
    'Every UIL school profile has the same game-venue field.',
    'Venue details last reviewed',
    'Identity last reviewed',
    'Mascot source not yet available',
    'Texas high schools often share district stadiums.',
    'Open TexasDefined stadium guide →',
    'Official venue source ↗',
    'Association placement not yet available',
    'Private-school football uses its association’s own alignment system.',
    "privateAlignment.sourceKind === 'official-association'",
    'privateAlignmentLabel',
    'All current UIL football programs use the same profile system.',
    'Open full district guide →',
    'districtPath',
    '/article/texas-high-school-football-scores-schedules',
    'Current scores & schedules',
    'UIL Texas Scoreboard gateway ↗',
    'the current scoreboard is not an official district-standings table',
    'UIL enrollment band',
    'Official UIL 2026–28 enrollment cutoffs ↗',
    'uilFootballEnrollmentBand',
    'UIL reported enrollment',
    'program.uilEnrollment',
    'Official UIL alphabetical enrollment listing ↗',
  ]) requireText(featuredProfilePage, marker, 'Football school profile page');
  for (const stale of [
    'Venue verification pending',
    'Mascot verification pending',
    'Official enrollment source verification pending',
    'Identity checked',
    'Verified football venue relationships',
    'Football venue research',
    'Association placement not yet verified',
  ]) {
    if (featuredProfilePage.includes(stale)) errors.push(`Football profile must not expose retired internal verification wording: ${stale}`);
  }
  requireText(featuredProfilePage, '/article/texas-high-school-football-2026-season-calendar', 'Football school profile calendar discovery');
  requireText(featuredProfilePage, '2026 UIL season calendar →', 'Football school profile calendar discovery');

  requireText(finder, 'uilEnrollment', 'Football finder exact enrollment');
  requireText(finder, 'UIL enrollment', 'Football finder exact enrollment');

  requireText(finder, 'School profile, enrollment & mascot →', 'Football finder profile handoff');
  requireText(page, 'UilFootballProgramDirectory', 'Football finder all-UIL directory integration');
  requireText(page, 'all 1,268 current UIL football programs as the authoritative school universe', 'Football finder all-UIL scope');
  requireText(page, '/article/texas-high-school-football-2026-season-calendar', 'Football finder calendar discovery');
  requireText(page, '6A, 5A, 4A, 3A, 2A, 1A', 'Football finder classification ordering');
  requireText(sitemap, 'footballProgramSitemapEntries', 'Football school profile sitemap');
  requireText(sitemap, 'privateFootballProgramSitemapEntries', 'Private football profile sitemap');
  requireText(sitemap, 'footballDistrictSitemapEntries', 'Football district sitemap');
  requireText(sitemap, '...footballDistrictEntries', 'Football district sitemap');
  requireText(sitemap, '...footballProfileEntries', 'Football school profile sitemap');
  requireText(sitemap, '...privateFootballProfileEntries', 'Private football profile sitemap');

  requireText(countyModule, 'High school football in', 'County football module');
  requireText(countyModule, 'countyName={countyName}', 'County football module');
  requireText(countyModule, 'showAllByDefault', 'County football module all-program default');

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
    '/texas-high-school-football-championship-history',
    'Browse UIL championship history',
    '/sports-venues/high-school-football',
    '/article/texas-high-school-football-playoffs-explained',
    '/article/texas-six-man-football-rules-explained',
    '/article/texas-high-school-football-scores-schedules',
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
  requireText(footballHub, '/texas-high-school-football-championship-history', 'Friday Night Lights championship-history discovery');
  requireText(footballHub, '/texas-high-school-football-districts', 'Friday Night Lights district discovery');
  requireText(footballHub, '/article/texas-high-school-football-classifications-1a-6a', 'Friday Night Lights classification discovery');
  requireText(footballHub, '/article/texas-high-school-football-playoffs-explained', 'Friday Night Lights playoff discovery');
  requireText(footballHub, '/article/texas-six-man-football-rules-explained', 'Friday Night Lights six-man discovery');
  requireText(footballHub, '/article/texas-high-school-football-scores-schedules', 'Friday Night Lights scores discovery');
  requireText(footballHub, '/article/texas-high-school-football-2026-season-calendar', 'Friday Night Lights calendar discovery');
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
  requireText(playoffGuide, '/article/texas-high-school-football-scores-schedules', 'Football playoff guide scores discovery');
  requireText(playoffGuide, '/article/texas-high-school-football-2026-season-calendar', 'Football playoff guide calendar discovery');
  for (const marker of [
    'Texas High School Football Scores & Schedules: How to Follow the 2026 Season',
    'https://www.uiltexas.org/athletics/uil-maxpreps',
    'UIL Texas Scoreboard',
    'scores and weekly schedules',
    'standings and stat leaderboards are planned additions',
    'District certification',
    'do not confuse incomplete live submissions with an official standings table',
    'December 16–19',
    '/texas-high-school-football-teams',
    '/texas-high-school-football-districts',
    '/article/texas-high-school-football-playoffs-explained',
  ]) requireText(scoresSchedulesGuide, marker, 'Football scores and schedules guide');
  requireText(scoresSchedulesGuide, '/article/texas-high-school-football-2026-season-calendar', 'Football scores guide calendar discovery');

  for (const marker of [
    'Texas High School Football 2026 Calendar: Every UIL Week, Playoff Round & State Final',
    'https://www.uiltexas.org/football',
    'Week One — August 27, 28 and 29',
    'Week Eleven — November 5, 6 and 7',
    'November 7 is the UIL district-certification deadline',
    'Playoff Week One — November 12, 13 and 14',
    'Playoff Week Three — November 26, 27 and 28',
    'December 16 through Saturday, December 19',
    '1A Division II at 11:00 a.m.',
    '6A Division I at 7:00 p.m.',
    '/article/texas-high-school-football-scores-schedules',
    '/article/texas-high-school-football-playoffs-explained',
    '/texas-high-school-football-teams',
    '/texas-high-school-football-districts',
  ]) requireText(footballCalendarGuide, marker, '2026 football season calendar guide');

  for (const marker of [
    'texasHighSchoolFootballScoresSchedulesStub',
    'texas-high-school-football-scores-schedules',
    'texasHighSchoolFootballScoresSchedulesArticle',
  ]) requireText(evergreenRegistry, marker, 'Football scores and schedules registry');
  for (const marker of [
    'texasHighSchoolFootball2026CalendarStub',
    'texas-high-school-football-2026-season-calendar',
    'texasHighSchoolFootball2026CalendarArticle',
  ]) requireText(evergreenRegistry, marker, '2026 football calendar registry');

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
  requireText(footballHubSchema, '/texas-high-school-football-championship-history', 'Friday Night Lights schema championship-history discovery');
  requireText(footballHubSchema, '/article/texas-high-school-football-scores-schedules', 'Friday Night Lights schema scores discovery');
  requireText(footballHubSchema, '/article/texas-high-school-football-2026-season-calendar', 'Friday Night Lights schema calendar discovery');
  requireText(publicRoutes, '"/texas-high-school-football-teams"', 'Public route governance');
  requireText(publicRoutes, '"/texas-high-school-football-districts"', 'Football district public route governance');
  requireText(publicRoutes, '"/texas-high-school-football-championship-history"', 'Football championship-history public route governance');
  requireText(dataSources, "id:'uil-football-alignments'", 'Texas source registry');
  requireText(dataSources, "domain:'sports'", 'Texas source registry');
  requireText(dataSources, "id:'uil-football-enrollment-cutoffs'", 'Texas source registry');
  requireText(dataSources, 'https://www.uiltexas.org/athletics/conference-cutoffs', 'Texas source registry');
  requireText(dataSources, "id:'uil-football-scoreboard'", 'Texas source registry');
  requireText(dataSources, 'https://www.uiltexas.org/athletics/uil-maxpreps', 'Texas source registry');
  requireText(dataSources, "id:'uil-football-calendar'", 'Texas source registry');
  requireText(dataSources, "title:'2026–27 UIL football calendar and season dates'", 'Texas source registry');

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
    [footballChampionshipPagePath, footballChampionshipPage],
  ]) {
    if (
      source.includes('uil-football-alignments-2026.server')
      || source.includes('football-directory.server')
      || source.includes('uil-football-all-time-history.server')
      || source.includes('football-districts.server')
      || source.includes('football-program-index.server')
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
