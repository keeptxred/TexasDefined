import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const errors = [];
const requireText = (source, marker, label) => {
  if (!source.includes(marker)) errors.push(`${label} missing: ${marker}`);
};
const forbidText = (source, marker, label) => {
  if (source.includes(marker)) errors.push(`${label} must not include retired copy: ${marker}`);
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
const footballProfileContentPath = 'src/data/high-school-football/football-profile-content.ts';
const footballIdentityAccentPath = 'src/data/high-school-football/football-identity-accent.ts';
const footballTeamSeasonOverlayPath = 'src/data/high-school-football/football-team-season-overlay.ts';
const footballProgramEditorialPath = 'src/data/high-school-football/program-editorial.ts';
const footballBatch008EditorialPath = 'src/data/high-school-football/program-editorial-b008.ts';
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
const productionSurfaceSmokePath = 'scripts/ci/verify-production-surfaces.mjs';
const footballAuthorityRegistryPath = 'docs/football-authority/REGISTRY.json';
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
  footballProfileContentPath,
  footballProgramEditorialPath,
  footballBatch008EditorialPath,
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
  productionSurfaceSmokePath,
  footballAuthorityRegistryPath,
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
  // In production JavaScript object literals, quoted and unquoted county keys
  // identify the same property. A later research batch silently overwrote
  // eleven earlier county groups (including Bullard, Burton, Bushland and
  // Bridgeport). Keep every researched school's reciprocal link reachable.
  const countyLinkMaps = [
    'batch002FootballCountyLinks',
    'supplementalFootballCountyLinks',
  ];
  const countyLinkKeysByMap = new Map();
  for (const mapName of countyLinkMaps) {
    const startMarker = 'const ' + mapName + ':';
    const mapBody = entityPage.split(startMarker)[1]?.split(/\n};/)[0];
    if (!mapBody) {
      errors.push('Football reciprocal county map missing: ' + mapName);
      continue;
    }
    const keys = [...mapBody.matchAll(/^  (?:'([^']+)'|([a-z-]+)):\s*\[/gm)]
      .map(match => match[1] || match[2]);
    const seen = new Set();
    const repeated = [];
    for (const county of keys) {
      if (seen.has(county)) repeated.push(county);
      seen.add(county);
    }
    if (repeated.length) errors.push('Duplicate campus county keys in ' + mapName + ': ' + [...new Set(repeated)].join(', '));
    countyLinkKeysByMap.set(mapName, seen);
  }
  for (const marker of [
    'const researchedFootballCountyLinks =',
    '...(batch002FootballCountyLinks[entity.slug] ?? [])',
    '...(supplementalFootballCountyLinks[entity.slug] ?? [])',
    'researchedFootballCountyLinks.map((school)',
  ]) requireText(entityPage, marker, 'Merged campus county reciprocal football links');
  for (const slug of ['bullard','burton','bushland','bridgeport','calvert','brenham','canyon-randall','brownsboro','buda-johnson']) {
    requireText(entityPage, "slug: '" + slug + "'", 'Research school county link ' + slug);
  }
  const footballHub = read(files[11]);
  const footballProfileContent = read(footballProfileContentPath);
const footballIdentityAccent = read(footballIdentityAccentPath);
const footballTeamSeasonOverlay = read(footballTeamSeasonOverlayPath);
  const footballProgramEditorial = read(footballProgramEditorialPath);
  const footballBatch008Editorial = read(footballBatch008EditorialPath);
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
  const featuredProfileServer = read('src/data/high-school-football/featured-program-profile.server.ts');
  for (const [code, name] of [[programProfileServer, 'UIL detail'], [featuredProfileServer, 'legacy featured detail']]) {
    requireText(code, 'loadRemoteSources: false', name + ' SSR must avoid external cold fetches');
  }
  requireText(directory, 'loadRemoteSources?: boolean;', 'Football directory optional external dependency');
  requireText(directory, 'options.loadRemoteSources === false', 'Football profile offline-safe UIL fallback');
  requireText(directory, 'loadTeaSchoolDirectory()', 'Directory search must retain optional live TEA data');
  requireText(directory, 'loadUilRecentFootballHistory()', 'Directory search must retain optional official UIL history');
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
  const productionSurfaceSmoke = read(productionSurfaceSmokePath);
  const footballAuthorityRegistry = JSON.parse(read(footballAuthorityRegistryPath));
  const legacyProgramMetadata = read(legacyMetadataFiles[0]);
  const schoolIdentities = read(legacyMetadataFiles[1]);
  // Sparse identity arrays throw on .find(identity => identity.slug) for all
  // unlisted teams after the first hole. One accidental double comma previously
  // made non-Batch008 UIL team pages respond HTTP 500. Validate source AND
  // preserve a defensive lookup for future malformed rows.
  if (/}\s*,\s*,/.test(schoolIdentities)) {
    errors.push('Football verified identity records contain a sparse array entry (double separator)');
  }
  requireText(schoolIdentities,
    'identity?.slug === slug',
    'Fail-safe verified football identity lookup against missing array entries');
  const identitySlugs = [...schoolIdentities.matchAll(/slug:\s*['"]([^'"]+)['"]/g)]
    .map((match) => match[1]);
  const verifiedIdentitySlugs = new Set(identitySlugs);
  if (verifiedIdentitySlugs.size !== identitySlugs.length) {
    const seen = new Set();
    const duplicateSlugs = identitySlugs.filter((slug) => {
      if (seen.has(slug)) return true;
      seen.add(slug);
      return false;
    });
    errors.push('Football identities duplicate canonical school slugs: ' + [...new Set(duplicateSlugs)].join(', '));
  }
  const researchedFootballRecords = footballAuthorityRegistry.schoolRecords.filter((record) =>
    ['VERIFIED', 'DEPLOYED', 'MERGED', 'IMPLEMENTED'].includes(record.status),
  );
  const researchedProgramsMissingVerifiedIdentity = researchedFootballRecords
    .filter((record) => !verifiedIdentitySlugs.has(record.slug))
    .map((record) => record.slug)
    .sort();
  if (researchedProgramsMissingVerifiedIdentity.length) {
    errors.push(
      `Researched/deployed football programs missing verified mascot identity records: ${researchedProgramsMissingVerifiedIdentity.join(', ')}`,
    );
  }
  // NCES campus 481206000703 is in Cherokee County, not the default
  // Bullard ISD / Smith County match. Keep canonical school context accurate.
  requireText(programProfileServer,
    "canonicalSlug === 'bullard' ? { ...matchedProgram, countyName: 'Cherokee County' }",
    'Bullard exact campus-county exception');
  const featuredProfileLoader = read(legacyMetadataFiles[2]);
  const featuredProfileRoute = read(legacyMetadataFiles[3]);
  const featuredProfilePage = read(legacyMetadataFiles[4]);
  // School-specific football FAQs sometimes cite original district ticket and
  // athletics URLs inline. Keep those safe sources clickable instead of showing
  // unlinked raw URLs, without altering the underlying FAQ JSON-LD answer text.
  for (const required of [
    'function renderFootballFaqAnswer(answer: string)',
    "if (!part.startsWith('https://')) return part;",
    'rel="noopener noreferrer nofollow"',
    '{renderFootballFaqAnswer(item.answer)}',
  ]) requireText(featuredProfilePage, required, 'Clickable HTTPS football FAQ source');
  const sitemap = read(legacyMetadataFiles[5]);

  for (const marker of [
    "const seoName = program?.schoolName || displayName",
    'const defaultTitle = program',
    '`${teamName} Football: 2026 District & Team Guide`',
    '`${teamName} Football: ${privateAlignment.association} Team Guide`',
    '`${teamName} Football: ${governingBodyHint} Team Guide`',
    '`${teamName} Football: Texas Team Guide`',
    'title: editorial?.seo?.title ?? defaultTitle',
    "const description = editorial?.seo?.description ?? (program",
    'non-UIL programs are not forced into UIL classifications',
    'const sportsTeamDescription = program || privateAlignment || governingBodyHint',
  ]) requireText(featuredProfileRoute, marker, 'Football profile unique SEO metadata');
  if (featuredProfileRoute.includes('announced 2026 football-season cancellation')) {
    errors.push('Football SportsTeam schema must not infer season cancellation from a generic editorial notice.');
  }
  if (featuredProfileRoute.includes('program?.officialSchoolName || displayName')) {
    errors.push('Football schema must use the canonical public UIL school name instead of raw TEA campus names.');
  }
  if (featuredProfileRoute.includes('slug === "ben-bolt-palito-blanco"')) errors.push("Football profile SEO must not override individually authored Ben Bolt title");

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
    "const willsPointProfilePath = '/texas-high-school-football-teams/wills-point'",
    "await fetchVerified(willsPointProfilePath, 'Wills Point football school profile'",
    "'Wills Point Tigers Football'",
    "'4A Division II'",
    "'786'",
    "'/texas-high-school-football-districts/4a-division-ii-district-7'",
    '"O\'Bryant Primary"',
    "const bryanFinderApiPath = '/api/high-school-football?q=Bryan&limit=25'",
    "await fetchVerified(bryanFinderApiPath, 'Bryan football matcher regression API'",
    "bryan.uilEnrollment !== 2267",
    "/o['’]?bryant\\s+primary/i",
  ]) requireText(productionSmoke, marker, 'Wills Point and Bryan football production regression protection');


  for (const marker of [
    "const shamrockProfilePath = '/texas-high-school-football-teams/shamrock'",
    "await fetchVerified(shamrockProfilePath, 'Shamrock football authority profile'",
    "'Shamrock Fighting Irish Football'",
    "'Nate Skelton'",
    "'100.5'",
    "'Enrollment and football placement are different here.'",
    "'Final football placement'",
    "'2026 results &amp; schedule'",
    "'Record when checked'",
    "'1–4'",
    "'El Paso Field'",
    "'Shamrock ISD 2026 football schedule'",
    "texas-high-school-football-teams/shamrock</loc>",
  ]) requireText(productionSmoke, marker, 'Shamrock football live production contract');

  for (const marker of [
    "['football-district8-v2-hub', '/texas-high-school-football-districts/5a-division-ii-district-8'",
    "['football-katy-district22-v2-hub', '/texas-high-school-football-districts/6a-district-22'",
    "['football-katy-district22-6a-format', '/texas-high-school-football-districts/6a-district-22'",
    "['football-1a-d1-district14-v2-hub', '/texas-high-school-football-districts/1a-division-i-district-14'",
    "['football-1a-d1-district14-six-man', '/texas-high-school-football-districts/1a-division-i-district-14'",
    "['football-1a-d1-district14-abbott-link', '/texas-high-school-football-districts/1a-division-i-district-14'",
  ]) requireText(productionSurfaceSmoke, marker, 'Always-on football district variant production guards');

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
    "const UIL_FOOTBALL_ARCHIVE_URL = 'https://www.uiltexas.org/football/archives/'",
    "const UIL_FOOTBALL_ARCHIVE_FALLBACK_URL = 'https://wwwprod.uiltexas.org/football/archives/'",
    "const HISTORY_START_SEASON = '2018-2019'",
    "const HISTORY_END_SEASON = '2025-2026'",
    'ARCHIVE_PAGE_OFFSETS',
    'for (const baseUrl of [UIL_FOOTBALL_ARCHIVE_URL, UIL_FOOTBALL_ARCHIVE_FALLBACK_URL])',
    'lastError',
    ".replace(/&#(\\d+);/g",
    'stateTitles',
    'stateFinalAppearances',
    "matchMethod: 'exact-normalized-uil-name'",
    'recentFootballHistoryFromLoaded',
  ]) requireText(history, marker, 'UIL recent football history');

  for (const marker of [
    "const UIL_FOOTBALL_ALL_TIME_APPEARANCES_URL = 'https://www.uiltexas.org/football/all-time-appearances'",
    "const UIL_FOOTBALL_ALL_TIME_FALLBACK_URL = 'https://wwwprod.uiltexas.org/football/all-time-appearances'",
    'for (const sourceUrl of [UIL_FOOTBALL_ALL_TIME_APPEARANCES_URL, UIL_FOOTBALL_ALL_TIME_FALLBACK_URL])',
    'lastError',
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
    'Open team football guide →',
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
    "slug: 'copperas-cove'",
    "slug: 'killeen-chaparral'",
    "slug: 'conroe'",
    "slug: 'conroe-caney-creek'",
    "slug: 'conroe-grand-oaks'",
    "slug: 'conroe-oak-ridge'",
    "slug: 'conroe-the-woodlands'",
    'sourceUrl',
    'verifiedAt',
  ]) requireText(schoolIdentities, marker, 'Football school identity data');
  const verifiedFootballIdentityCount = (schoolIdentities.match(/slug: '/g) ?? []).length;
  if (verifiedFootballIdentityCount < 185) {
    errors.push(`Football school identity data fell below 185 verified canonical UIL profiles; found ${verifiedFootballIdentityCount}.`);
  }

  const obsoleteIdentitySlugs = ["fort-worth-boswell","hebron","flower-mound-marcus","plano-senior","north-shore","cypress-ranch","ce-king","south-oak-cliff","desoto","randle","lake-travis","westlake","smithson-valley","summer-creek","atascocita","pleasant-grove","harker-heights","mt-pleasant","walnut-grove","richland","west-plains"];
  for (const slug of obsoleteIdentitySlugs) {
    if (schoolIdentities.includes(`slug: '${slug}'`)) {
      errors.push(`Football school identity data must use the canonical UIL slug instead of legacy alias: ${slug}.`);
    }
  }
  requireText(schoolIdentities, "slug: 'wills-point'", 'Wills Point verified football identity');
  requireText(schoolIdentities, "mascot: 'Tigers'", 'Wills Point verified football identity');
  for (const marker of [
    'colorsSourceUrl?: string',
    'colorsSourceLabel?: string',
    'colorsVerifiedAt?: string',
    "slug: 'center'",
    "colors: 'Purple and Gold'",
    "slug: 'chester'",
    "slug: 'celina'",
    "colors: 'Orange and White'",
    "slug: 'celeste'",
    "colors: 'Royal Blue and White'",
    'slug: "castroville-medina-valley"',
    'colors: "Orange and Black"',
  ]) requireText(schoolIdentities, marker, 'Football school color provenance');

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

  const exactEnrollmentBySchool = new Map(
    [...exactEnrollments.matchAll(/^\s*"([^"]+)": \{"enrollment":([0-9.]+),"submittedConference":"([1-6]A)"\},?$/gm)]
      .map((match) => [match[1], { enrollment: Number(match[2]), submittedConference: match[3] }]),
  );
  const enrollmentBandSpecs = [
    ['6A', null, 2215, null],
    ['5A', 1, 1870, 2214],
    ['5A', 2, 1305, 1869],
    ['4A', 1, 896, 1304],
    ['4A', 2, 550, 895],
    ['3A', 1, 367, 549],
    ['3A', 2, 246, 366.9],
    ['2A', 1, 175.6, 245.9],
    ['2A', 2, 105, 175.5],
    ['1A', 1, 57.6, 104.9],
    ['1A', 2, null, 57.5],
  ];
  const alignmentEnrollmentExceptions = [];
  const submittedConferenceExceptions = [];
  const missingEnrollmentRows = [];
  for (const block of alignment.matchAll(/\{\s*classification:'([1-6]A)',\s*division:(1|2|null),\s*footballType:'[^']+',\s*sourceUrl:'[^']+',\s*districts:\[([\s\S]*?)\]\s*\}/g)) {
    const classification = block[1];
    const division = block[2] === 'null' ? null : Number(block[2]);
    const districtRows = [...block[3].matchAll(/'([^']*)'|"([^"]*)"/g)].map((match) => match[1] ?? match[2]);
    for (const districtRow of districtRows) {
      for (const school of districtRow.split(';').map((value) => value.trim()).filter(Boolean)) {
        const exact = exactEnrollmentBySchool.get(school);
        if (!exact) {
          missingEnrollmentRows.push(school);
          continue;
        }
        const band = enrollmentBandSpecs.find(([bandClass, bandDivision]) => bandClass === classification && bandDivision === division);
        if (band) {
          const [, , min, max] = band;
          const fits = (min == null || exact.enrollment >= min) && (max == null || exact.enrollment <= max);
          if (!fits) alignmentEnrollmentExceptions.push(school);
        }
        if (exact.submittedConference !== classification) submittedConferenceExceptions.push(school);
      }
    }
  }
  if (missingEnrollmentRows.length) errors.push(`UIL alignment schools missing exact enrollment rows: ${missingEnrollmentRows.join(', ')}`);
  if (alignmentEnrollmentExceptions.length !== 49) errors.push(`Expected 49 UIL programs whose enrollment falls outside the normal final-placement cutoff band; found ${alignmentEnrollmentExceptions.length}.`);
  if (submittedConferenceExceptions.length !== 7) errors.push(`Expected 7 UIL programs whose submitted conference differs from final football classification; found ${submittedConferenceExceptions.length}.`);
  for (const school of ['Shamrock', 'Boys Ranch', 'Garland', 'San Antonio Houston']) {
    if (!alignmentEnrollmentExceptions.includes(school)) errors.push(`Known enrollment-placement exception missing from statewide guard: ${school}`);
  }

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
    'uilEnrollmentFallsWithinBand',
    'uilFootballEnrollmentBandForEnrollment',
  ]) requireText(enrollmentBands, marker, 'UIL football enrollment bands');

  for (const marker of [
    'UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28',
    'uilEnrollment',
    'uilSubmittedConference',
    'UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28[program.sourceSchoolName]',
  ]) requireText(directory, marker, 'Football directory exact enrollment integration');
  for (const marker of [
    'normalizeUilProgramName',
    'contextualMatchScore',
    'matcher.bySchoolToken.get(token)',
    'programTokens.every((token) => row.contextMatchTokens.has(token))',
    'programTokens.length === 1 && !row.schoolMatchTokens.has(programTokens[0])',
    'score >= 90 && score === bestScore',
    'suppressDuplicateTeaAssignments',
    'program.teaSchoolNumber',
  ]) requireText(directory, marker, 'Fail-closed TEA football school matching');
  if (directory.includes('function fuzzyMatchScore')) {
    errors.push('Football directory must not use the retired permissive fuzzy school matcher.');
  }

  for (const marker of [
    'UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28',
    'uilEnrollment:',
    'UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28[seed.sourceSchoolName]',
    'UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28[program.sourceSchoolName]',
  ]) requireText(programProfileServer, marker, 'Football profile exact enrollment integration');
  requireText(programProfileServer, 'getVerifiedFootballSchoolIdentity(canonicalSlug)', 'Canonical UIL identity precedence');
  requireText(programProfileServer, 'const identity = getVerifiedFootballSchoolIdentity(canonicalSlug) ?? null', 'Canonical UIL identity ownership');


  for (const marker of [
    'Browse all 1,268 Texas high school football programs',
    "const CLASSIFICATIONS = ['6A', '5A', '4A', '3A', '2A', '1A']",
    'const INITIAL_PROGRAMS_PER_CLASS = 24',
    'expandedClasses',
    'displayedPrograms',
    'Show all {classPrograms.length.toLocaleString()} {item} programs',
    'Every current UIL football program gets the same directory and profile treatment.',
    'All 1,268',
    '6A → 1A · final UIL classification',
    'UIL classifications generally reflect enrollment',
    'the final UIL alignment controls football placement',
    'some programs fall outside the normal published cutoff band',
    'A 6A school is listed above a 5A school because of its final UIL classification',
    'Open team football guide →',
    'not because TexasDefined has rated its football program as better',
    'Normal UIL enrollment band:',
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
    "buckholts:",
    "'buda-hays':",
    "'buda-johnson':",
    "getBatch008FootballProgramEditorial",
    "Varsity Opponent",
    "Mark Torres",
    "Sam Carlin",
    "buffalo:",
    "bullard:",
    "buna:",
    "Trent Jones",
    "Colton Bradford",
    "Kevin Terrier",
    "Mildred final not independently verified",
    "Buna 46",
    "burkburnett:",
    "burkeville:",
    "burleson:",
    "Jody Littleton",
    "Keith Hendrix",
    "Phillip Tanner",
    "SETXsports reports 12-61",
    "Midlothian Heritage",
    "'burleson-centennial':",
    "burnet:",
    "burton:",
    "Blake Meyer",
    "Ben Speer",
    "Jason Hodde",
    "Lancaster",
    "Bremond",
    "bushland:",
    "bynum:",
    "'caddo-mills':",
    "William Rabson",
    "C. Morgan",
    "Kodi Crane",
    "Ferris 53-35",
    "Hereford 57-21",
    "caldwell:",
    "callisburg:",
    "calvert:",
    "Sean Witherwax",
    "Eddie Gill",
    "Marcus Wortham",
    "Franklin",
    "Brazos Valley",
    "'cameron-yoe':",
    "campbell:",
    "canadian:",
    "Aaron Babino",
    "Preston Compton",
    "Andy Cavalier",
    "canton:",
    "canutillo:",
    "canyon:",
    "'canyon-randall':",
    "Heath Ragle",
    "Scott Brooks",
    "Matt Lovorn",
    "Dan Sherwood",
    "Chapin",
    "Randall beat Canyon 24-21",
  ]) requireText(footballBatch008Editorial, marker, 'Football Batch 008 editorial overlay');

  for (const marker of [
    "import { footballMatchups } from './football-matchups';",
    "import { applyFootballMatchupSnapshot } from './football-team-season-overlay';",
    'applyFootballMatchupSnapshot(aubreyAdjustedEditorial, canonicalSlug, footballMatchups)',
  ]) requireText(programProfileServer, marker, 'Statewide football matchup overlay wiring');

  for (const marker of [
    "recordLabel: 'Verified snapshot record'",
    "game.result && row.result && game.result !== row.result",
    "editorial ?? { slug: teamSlug, overview: [], faq: [] }",
    "game.status !== 'final'",
  ]) requireText(footballTeamSeasonOverlay, marker, 'Statewide football matchup overlay safeguards');

  forbidText(footballProgramEditorial, "footballMatchups", 'Base football editorial registry must not own runtime matchup reconciliation');

  requireText(programProfileServer, "import { loadBatch008FootballProgramEditorial } from './program-editorial-b008-loader.server';", 'Football Batch 008 lazy loader');
  requireText(programProfileServer, "(await loadBatch008FootballProgramEditorial(canonicalSlug)) ?? getFootballProgramEditorial(canonicalSlug)", 'Football Batch 008 editorial precedence');
  forbidText(programProfileServer, "import { getBatch008FootballProgramEditorial } from './program-editorial-b008';", 'Football Batch 008 eager import');
  const batch008Loader = read('src/data/high-school-football/program-editorial-b008-loader.server.ts');
  requireText(batch008Loader, "await import('./program-editorial-b008')", 'Football Batch 008 conditional import');
  requireText(batch008Loader, "if (!BATCH008_FOOTBALL_SLUGS.has(slug)) return undefined;", 'Avoid loading Batch 008 for unrelated school profiles');
  const publishedBatch008Slugs = [...footballBatch008Editorial.matchAll(/^  ((?:'[^']+'|[a-z][a-z0-9-]*)):\s*\{/gm)]
    .map((match) => match[1].replaceAll("'", ''));
  const loaderBatch008Slugs = [...batch008Loader.matchAll(/^  '([a-z0-9-]+)',?$/gm)].map((match) => match[1]);
  if (publishedBatch008Slugs.length !== 25 || loaderBatch008Slugs.length !== 25
    || publishedBatch008Slugs.some((slug) => !loaderBatch008Slugs.includes(slug))) {
    errors.push('Conditional Batch 008 loader must retain all and only the 25 researched school slugs');
  }

  for (const marker of [
    "createLazyFileRoute('/texas-high-school-football-districts')",
    'Texas high school football districts',
    'Browse all 192 current UIL football districts',
    'Search all 1,268 UIL programs',
  ]) requireText(footballDistrictIndexPage, marker, 'Football district directory page');

  forbidText(footballDistrictIndexPage, 'research profile', 'Football district directory page');
  forbidText(classificationGuide, 'research profile', 'Football classifications guide');
  forbidText(footballChampionshipPage, 'research profile', 'Football championship history page');
  forbidText(scoresSchedulesGuide, 'research profile', 'Football scores and schedules guide');
  forbidText(footballHub, 'research profile', 'Friday Night Lights hub');

  for (const marker of [
    "createFileRoute('/texas-high-school-football-districts/$slug')",
    'getFootballDistrictPage',
    'CollectionPage',
    'ItemList',
    'High School Football Districts',
  ]) requireText(footballDistrictRoute, marker, 'Football district detail route');

  for (const marker of [
    "createLazyFileRoute('/texas-high-school-football-districts/$slug')",
    'data-football-district-hub="v2"',
    'data-football-district-section="teams"',
    'data-football-district-section="game-week"',
    'data-football-district-section="alignment"',
    'data-football-district-section="explore"',
    'data-football-district-section="official-sources"',
    'district.programs.map((program, index)',
    'href={program.profilePath}',
    'uilEnrollmentFallsWithinBand',
    'placementExceptionPrograms',
    'Normal enrollment band:',
    'final UIL football alignment controls competition placement',
    'Placement exception',
    'program.uilEnrollment',
    'uilFootballEnrollmentBand',
    'https://www.uiltexas.org/maxpreps/',
    '/article/texas-high-school-football-2026-season-calendar',
    '/article/texas-high-school-football-playoffs-explained',
    '/article/texas-high-school-football-scores-schedules',
    '/texas-high-school-football-teams',
    '/texas-high-school-football-districts',
    '/texas-high-school-football-championship-history',
    '/sports/friday-night-lights',
    'district.sourceUrl',
    'district.enrollmentSourceUrl',
    'UIL_FOOTBALL_ENROLLMENT_BANDS_SOURCE.url',
  ]) requireText(footballDistrictPage, marker, 'Football district detail page durable contract');
  forbidText(footballDistrictPage, 'research usability', 'Football district detail page');

  for (const marker of [
    'loadUilAllTimeFootballHistory',
    'loadUilRecentFootballHistory',
    'UIL_FOOTBALL_PROGRAMS_2026',
    'footballProgramProfilePath',
    'right.stateTitles - left.stateTitles',
    'https://www.uiltexas.org/football/all-time-appearances',
    'https://www.uiltexas.org/football/archives',
    'Promise.allSettled',
    "allTimeResult.status !== 'fulfilled'",
    'historyAvailable: false',
    'recentArchiveAvailable',
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
    'loaderData.historyAvailable',
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
    'Official history source temporarily unavailable',
    'We do not replace the official record with guessed or partial totals.',
    'data.historyAvailable',
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
    'defaultTitle',
  ]) requireText(featuredProfileRoute, marker, 'Football school profile route');
  requireText(featuredProfileRoute, "'@type': 'SportsTeam'", 'Football school profile SportsTeam schema');
  requireText(featuredProfileRoute, "'@type': 'FAQPage'", 'Football school profile FAQ schema');
  requireText(featuredProfilePage, "const footballName = identity?.mascot ?", 'Verified mascot precedence over editorial SEO title');
  forbidText(featuredProfilePage, 'const footballName = authoredFootballH1 || (identity?.mascot', 'Do not prefer stale authored mascot title');
  // Older campus-county PR #5401 became stale while the complete canonical
  // map was already shipped. Retain its useful regression protections without
  // overwriting newer team/editorial data.
  for (const marker of [
    'const researchedCountyLink = researchedCampusCounty[slug]',
    "'abbott': 'hill'",
    "'abernathy': 'hale'",
    "'alief-hastings': 'harris'",
    "'katy': 'fort-bend'",
    "'fort-davis': 'jeff-davis'",
    "'southlake-carroll': 'tarrant'",
    "'bruceville-eddy': 'mclennan'",
  ]) requireText(featuredProfilePage, marker, 'Canonical school-slug campus-county mapping');
  const countyLookupStart = featuredProfilePage.indexOf('const researchedCountyLink = researchedCampusCounty[slug]');
  const countyLookupEnd = featuredProfilePage.indexOf('const associationLabel', countyLookupStart);
  const countyLookup = countyLookupStart >= 0 && countyLookupEnd > countyLookupStart
    ? featuredProfilePage.slice(countyLookupStart, countyLookupEnd)
    : '';
  requireText(countyLookup, 'const countyPath = researchedCountyLink', 'Campus-county path from canonical slug');
  for (const retired of [
    "editorial?.slug ? researchedCampusCounty[editorial.slug]",
    "schoolName === 'Alief Hastings'",
    "schoolName === 'Abilene Wylie'",
    "schoolName === 'Katy'",
    "schoolName === 'Fort Davis'",
    "schoolName === 'Southlake Carroll'",
  ]) forbidText(countyLookup, retired, 'Do not infer campus county from display name inside the county resolver');


  for (const marker of [
    'footballIdentityAccentFromColors',
    "editorial?.theme?.accentHex ? undefined : footballIdentityAccentFromColors(identity?.colors)",
    "accentHex={identityPanelAccent}",
    "verifiedColors={verifiedIdentityAccent ? identity?.colors : undefined}",
    'it is not an official school brand hex',
  ]) requireText(featuredProfilePage, marker, 'Verified football identity accent rendering');

  for (const marker of [
    'These values are intentionally editorial approximations, not school brand hex',
    'Neutral-only color labels return undefined',
    'raw identity strings',
    "/\\b(?:texas burnt orange|burnt orange)\\b/i",
    "/\\b(?:navy blue|navy)\\b/i",
    "/\\b(?:hunter green|forest green)\\b/i",
    "/\\b(?:panther blue|roo blue|frenship blue|bright blue|blue)\\b/i",
  ]) requireText(footballIdentityAccent, marker, 'Football identity accent palette safeguards');

  if (featuredProfilePage.includes('borderTopColor: identity?.colors')) {
    errors.push('Football profile must never pass the raw school color label directly into CSS.');
  }

  for (const marker of [
    "createLazyFileRoute('/texas-high-school-football-teams/$slug')",
    'School enrollment and football eligibility',
    'Official district enrollment',
    '((program && enrollmentLink) || (!program && privateAdmissions))',
    'District enrollment source last reviewed',
     'Official school admissions',
    'Start with {admissions.sourceLabel} ↗',
    'Start with {enrollmentLink.sourceLabel} ↗',
    'Mascot & identity',
    'All-time UIL state-final record',
    'Use the district’s current registration process',
    'Football eligibility is a separate question from school admission.',
    'UIL eligibility standards ↗',
    'UIL detailed eligibility rules ↗',
    'Current district',
    'Every opponent links to the same school-profile system.',
    'Football game venues',
    'venueLinks.length > 0',
    'Venue details last reviewed',
    'Mascot evidence last reviewed',
    'School-color evidence last reviewed',
    'color evidence may have a separate source and review date',
    'School color source ↗',
    'Mascot and colors appear only when TexasDefined has a named source it can cite',
    'identity &&',
    'Texas high schools often share district stadiums.',
    'Open TexasDefined stadium guide →',
    'Official venue source ↗',
    'Non-UIL football program',
    'Private-school football uses its association’s own alignment system.',
    "privateAlignment.sourceKind === 'official-association'",
    'privateAlignmentLabel',
    'Related href="/texas-high-school-football-teams"',
    'Open full district guide →',
    'districtPath',
    '/article/texas-high-school-football-scores-schedules',
    'Current scores & schedules',
    'Live scores & schedule links',
    'TexasDefined does not publish an unverified team-specific schedule.',
    'UIL Texas Scoreboard gateway ↗',
    'it is not an official district-standings table',
    'UIL enrollment band',
    'Official UIL 2026–28 enrollment cutoffs ↗',
    'uilFootballEnrollmentBand',
    'uilFootballEnrollmentBandForEnrollment',
    'Enrollment-based cutoff band',
    'Enrollment and football placement are different here.',
    'Final football placement',
    'UIL reported enrollment',
    'program.uilEnrollment',
    'Official UIL alphabetical enrollment listing ↗',
    'Quick answers',
    'Source trail',
    'Coach source ↗',
    'Campus source ↗',
    'Team schedule source ↗',
    'Season snapshot source ↗',
    'Team venue source ↗',
    'Football FAQ',
    'profileSummary',
    'quickFacts',
    'faq',
    "new Intl.DateTimeFormat('en-US'",
    'formatFootballDate',
    '<time dateTime={game.date}>{formatFootballDate(game.date)}</time>',
    '<time dateTime={identity.verifiedAt}>{formatFootballDate(identity.verifiedAt)}</time>',
    '<time dateTime={colorsVerifiedAt}>{formatFootballDate(colorsVerifiedAt)}</time>',
  ]) requireText(featuredProfilePage, marker, 'Football school profile page');
  for (const forbidden of [
    'Mascot and colors are published only from a school or district source.',
    '<td className="px-3 py-3 font-semibold">{game.date}</td>',
    'Research beyond the score',
    'What families should check next',
    'Freshman, JV and varsity path',
    '2026 schedule & results sources',
    'TexasDefined does not publish a team-specific schedule here unless',
    'All ${program.districtName} football programs →',
    'TEA directory match pending',
    'Exact UIL enrollment pending',
    'Venue details not yet available',
    'Mascot source not yet available',
    'Association not yet verified',
    'Association placement not yet available',
    'No district label in source',
    'Not specified by source',
    'has not yet verified a dedicated current enrollment URL',
    'Association placement not yet verified',
  ]) {
    if (featuredProfilePage.includes(forbidden)) errors.push(`Football profile contains a statewide regression marker: ${forbidden}`);
  }

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

  requireText(
    footballProfileContent,
    "TexasDefined's current sourced coach record identifies",
    'Football coach FAQ source attribution',
  );
  for (const marker of [
    "What is ${displayName}'s 2026–28 UIL football alignment?",
    "Why does ${displayName}'s UIL enrollment not match its final football placement?",
    "Does ${displayName} play six-man football?",
    "Classification, division and district are combined here instead of repeated as separate FAQ answers.",
  ]) requireText(footballProfileContent, marker, 'Compact football FAQ generator');

  for (const retired of [
    "What classification is ${displayName} football in for 2026–28?",
    "What football district is ${displayName} in?",
    "What enrollment does UIL list for ${displayName}?",
    "What school district is ${displayName} in?",
    "Does ${displayName} play six-man or eleven-man football?",
  ]) {
    if (footballProfileContent.includes(retired)) {
      errors.push(`Football FAQ generator still contains retired repetitive template: ${retired}`);
    }
  }
  if (footballProfileContent.includes('The current school-source entry used by TexasDefined')) {
    errors.push('Football coach FAQ must not label third-party coach evidence as a school-source entry.');
  }

  for (const marker of [
    'buildFootballProfileSummary',
    'buildFootballProfileQuickFacts',
    'buildFootballProfileFaq',
    'uilFootballEnrollmentBandForEnrollment',
    'The final alignment controls competition placement',
    'if (enrollmentFitsFinalBand === false)',
    'Why does ${displayName}\'s UIL enrollment not match its final football placement?',
    'Classification is not a quality ranking.',
    'That enrollment falls outside the normal published cutoff for',
    'the final UIL football alignment controls competition placement.',
    'Use the cited ${editorial.schedule.label} linked on this page',

  ]) requireText(footballProfileContent, marker, 'Football profile answer layer');
  forbidText(footballProfileContent, 'Use the school-published ${editorial.schedule.label} linked on this page', 'Football profile schedule-source attribution');
  for (const marker of [
    'profileSummary: buildFootballProfileSummary',
    'quickFacts: buildFootballProfileQuickFacts',
    'faq: buildFootballProfileFaq',
  ]) requireText(programProfileServer, marker, 'Football profile server answer generation');
  requireText(footballProfileContent, "return 'Non-UIL football program';", 'Football profile non-UIL fail-closed label');
  for (const marker of [
    "slug: 'spring'",
    "name: 'KaRon Coleman Sr.'",
    "name: 'Planet Ford Stadium'",
    "label: '2026–27 football schedule'",
  ]) requireText(footballProgramEditorial, marker, 'Spring High football editorial');


  for (const marker of [
    '"shamrock": {',
    '"name": "Nate Skelton"',
    '"record": "1–4"',
    '"name": "El Paso Field"',
    '"question": "Why is Shamrock in 2A Division II with a UIL enrollment of 100.5?"',
  ]) requireText(footballProgramEditorial, marker, 'Shamrock football authority editorial');

  requireText(finder, 'uilEnrollment', 'Football finder exact enrollment');
  requireText(finder, 'UIL enrollment', 'Football finder exact enrollment');

  requireText(finder, 'Open team football guide →', 'Football finder profile handoff');
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
  requireText(route, "|| undefined : undefined", 'Football finder canonical empty-search normalization');
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
    'What does bi-district mean in Texas high school football?',
    'It does not mean a team won two district championships.',
    '/texas-high-school-football-playoff-brackets',
    'first round in 5A and 6A',
    '/texas-high-school-football-teams',
  ]) requireText(playoffGuide, marker, 'Football playoff guide');
  // Qualification facts are presented once in the responsive comparison and
  // illustrated enrollment-split reference, rather than duplicated in body copy.
  // Assert the public-facing, composed page's source retains each UIL rule.
  const playoffReference = read('src/components/content/FootballPlayoffsReference.tsx');
  for (const [marker, label] of [
    ['["1A six-man", "Top two"', '1A district advances top two'],
    ['["2A–5A", "Top four"', '2A–5A district advances top four'],
    ['["6A", "Top four"', '6A district advances top four'],
    ['Two larger qualifiers to I; two smaller to II', '6A two larger qualifiers enter Division I'],
    ['Only the four qualifying schools are compared.', '6A division selection is limited to qualifiers'],
    ['Division I · larger qualifiers', '6A larger qualifiers visual'],
    ['Division II · smaller qualifiers', '6A smaller qualifiers visual'],
  ]) requireText(playoffReference, marker, 'Football playoff guide: ' + label);
  requireText(playoffGuide, '/article/texas-six-man-football-rules-explained', 'Football playoff guide six-man discovery');
  requireText(playoffGuide, '/article/texas-high-school-football-scores-schedules', 'Football playoff guide scores discovery');
  requireText(playoffGuide, '/article/texas-high-school-football-2026-season-calendar', 'Football playoff guide calendar discovery');
  requireText(read('src/routes/texas-high-school-football-playoff-brackets.tsx'), 'to="/article/texas-high-school-football-playoffs-explained"', 'Football brackets reciprocal playoff explainer discovery');
  for (const marker of [
    'Texas High School Football Scores 2026: Schedules & UIL Scoreboard',
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

  // Small, source-dated Batch 006 contract: never resurrect a stale coach roster
  // merely because a third-party site still advertises a historical appointment.
  // This parses four existing school objects; it makes no network calls or crawls.
  const footballEditorialRecord = (slug) => {
    const marker = '  "' + slug + '": {';
    const pos = footballProgramEditorial.indexOf(marker);
    if (pos === -1) {
      errors.push('Missing school-specific football editorial record: ' + slug);
      return null;
    }
    const start = footballProgramEditorial.indexOf('{', pos);
    let depth = 0;
    let quoted = false;
    let escaped = false;
    for (let i = start; i < footballProgramEditorial.length; i++) {
      const ch = footballProgramEditorial[i];
      if (quoted) {
        if (escaped) escaped = false;
        else if (ch === '\\') escaped = true;
        else if (ch === '"') quoted = false;
      } else if (ch === '"') quoted = true;
      else if (ch === '{') depth++;
      else if (ch === '}' && --depth === 0) {
        try {
          return JSON.parse(footballProgramEditorial.slice(start, i + 1));
        } catch (error) {
          errors.push('Invalid JSON-like football editorial for ' + slug + ': ' + error.message);
          return null;
        }
      }
    }
    errors.push('Unterminated school-specific football editorial: ' + slug);
    return null;
  };

  const batch006IdentityContracts = [
    ['big-sandy-harmony', 'Eagles'],
    ['big-spring', 'Steers'],
    ['bishop', 'Badgers'],
    ['blackwell', 'Hornets'],
    ['blanco', 'Panthers'],
    ['blanket', 'Tigers'],
    ['blooming-grove', 'Lions'],
    ['bloomington', 'Bobcats'],
    ['blue-ridge', 'Tigers'],
    ['bluff-dale', 'Bobcats'],
    ['blum', 'Bobcats'],
    ['boerne', 'Greyhounds'],
    ['boerne-champion', 'Chargers'],
    ['bogata-rivercrest', 'Rebels'],
    ['boling', 'Bulldogs'],
    ['bonham', 'Purple Warriors'],
    ['booker', 'Kiowas'],
    ['borden-county', 'Coyotes'],
    ['borger', 'Bulldogs'],
    ['bosqueville', 'Bulldogs'],
    ['bovina', 'Mustangs'],
    ['bowie', 'Jackrabbits'],
    ['bowie-gold-burg', 'Bears'],
    ['boyd', 'Yellowjackets'],
    ['boys-ranch', 'Roughriders'],
  ];
  for (const [slug, mascot] of batch006IdentityContracts) {
    requireText(
      schoolIdentities,
      `slug: '${slug}', mascot: '${mascot}'`,
      'Batch 006 verified school/district mascot identity',
    );
  }

  const batch006VenueContracts = [
    ['bishop', 'George Luna Stadium', 'bhs.bishopcisd.net/'],
    ['blooming-grove', 'Lion Stadium', 'bgisd.org/apps/events/2026/10/'],
    ['blue-ridge', 'Tiger Stadium', 'brisd.net/o/brisd/page/athletics'],
  ];
  for (const [slug, venueName, sourceFragment] of batch006VenueContracts) {
    const program = footballEditorialRecord(slug);
    if (!program) continue;
    if (program.venue?.name !== venueName) {
      errors.push('Batch 006 first-party venue identity missing or changed: ' + slug);
    }
    if (!program.venue?.sourceUrl?.includes(sourceFragment)) {
      errors.push('Batch 006 venue must retain its school/district source: ' + slug);
    }
    if (!/gate|entrance/i.test(program.venue?.note || '')) {
      errors.push('Batch 006 venue qualification must preserve entrance/gate limitations: ' + slug);
    }
  }

  const bishop = footballEditorialRecord('bishop');
  if (bishop) {
    const bishopMilestones = Array.isArray(bishop.milestones) ? bishop.milestones : [];
    if (!bishopMilestones.some((milestone) =>
      milestone?.title === 'Badger Stadium renamed George Luna Stadium' &&
      milestone?.sourceUrl === 'https://www.kztv10.com/news/local-news/badger-stadium-renamed-after-former-bishop-athletic-director-george-luna'
    )) {
      errors.push('Bishop must retain the sourced George Luna Stadium renaming milestone.');
    }
    const bishopFaq = Array.isArray(bishop.faq) ? bishop.faq : [];
    const bishopTicketAnswer = bishopFaq.find((item) => item?.question === 'Where can I check Bishop CISD football tickets for homecoming?')?.answer || '';
    for (const source of [
      'https://www.bishopcisd.net/athletics/ticket-sales',
      'https://www.bishopcisd.net/parents-students/tickets-sales',
    ]) {
      if (!bishopTicketAnswer.includes(source)) {
        errors.push('Bishop ticket FAQ must retain first-party source: ' + source);
      }
    }
  }

  for (const token of [
    "slug: 'blanket', mascot: 'Tigers', colors: 'Black and gold'",
    "slug: 'borden-county', mascot: 'Coyotes', colors: 'Columbia blue, red and white'",
  ]) requireText(schoolIdentities, token, 'Official Batch 006 school colors');

  requireText(read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx'), 'game.date >= todayTexas', 'Prevent stale next football fixture');
  forbidText(read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx'), 'game.date >= editorial.season.verifiedAt', 'Do not use the old editorial snapshot date for next fixture');
  const currentCoachContracts = [
    ['big-sandy-harmony', 'Brian Mauk', 'kltv.com/story/26056195/harmony-eagles/'],
    ['bishop', 'Keith Talbert', 'maxpreps.com/tx/bishop/bishop-badgers/football/staff/'],
    ['blackwell', 'Clint Linman', 'sports.yahoo.com/articles/blackwell-hornets-hire-football-coach-234440740.html'],
    ['bogata-rivercrest', 'Laytner Kennedy', 'maxpreps.com/tx/bogata/rivercrest-rebels/football/staff/'],
    ['boys-ranch', 'Louis Kelley III', 'boysranchisd.org/132207_2'],
    ['boerne', 'Brett Sawyer', 'boernestar.com/article/14105'],
    ['blanco', 'Kent Walker', 'maxpreps.com/tx/blanco/blanco-panthers/football/staff/'],
    ['bloomington', 'Lane Shands', 'texasfootball.com/article/2026/02/05/which-districts-have-the-best-head-coaches-after-realignment'],
    ['bovina', 'Wade Wilson', 'newschannel10.com/2026/08/13/2026-countdown-kickoff-bovina-mustangs/'],
    ['boyd', 'Shawn Sparks', 'ntxvarsitysports.com/boyd-looking-to-build-on-breakthrough-season/'],
    ['borden-county', 'Trey Richey', 'pressreporter.com/issues/2026-08-18/pages/25/'],
    ['bowie-gold-burg', 'Austin Norman', 'bowienewsonline.com/2026/10/gold-burg-gives-it-a-go-falls-to-perrin-35-32/'],
    ['borger', 'Jesus A. Villaseñor', 'borgerisd.net/69574_2'],
    ['bosqueville', 'Reggie Patrick', 'kwtx.com/2026/10/07/classroom-champions-bosquevilles-dax-pharris/'],
  ];
  for (const [slug, expectedCoach, sourceFragment] of currentCoachContracts) {
    const program = footballEditorialRecord(slug);
    if (!program) continue;
    if (program.coach?.name !== expectedCoach) {
      errors.push('Outdated or unsupported Batch 006 coach: ' + slug
        + '; expected sourced ' + expectedCoach + ', got ' + (program.coach?.name || 'none'));
    }
    if (!program.coach?.sourceUrl?.includes(sourceFragment)) {
      errors.push('Batch 006 coach attribution missing dated football source: ' + slug);
    }
    const faq = program.faq?.find(({ question }) => /coach|staff|athletic.director/i.test(question));
    if (!faq || !faq.answer.includes(expectedCoach)) {
      errors.push('Batch 006 coach FAQ contradicts current sourced coach: ' + slug);
    }
  }
  // The 2026 MaxPreps history still names Travis McClain at Rivercrest,
  // despite the AFCA's Oct 8, 2026 profile documenting his Mount Vernon
  // appointment in January 2025. Never promote that stale 2026 history field
  // over the separately dated August 29 varsity staff list.
  const rivercrest = footballEditorialRecord('bogata-rivercrest');
  if (rivercrest?.coach?.name === 'Travis McClain') {
    errors.push('Stale Rivercrest history must not identify Mount Vernon coach Travis McClain as Rivercrest 2026 head coach.');
  }
  const harmony = footballEditorialRecord('big-sandy-harmony');
  if (harmony?.coach?.name === 'Jeremy Jenkins'
      || harmony?.coach?.sourceUrl?.includes('maxpreps.com/tx/big-sandy/harmony-eagles/football/staff/')) {
    errors.push('Stale MaxPreps Harmony roster must not identify deceased former coach Jeremy Jenkins as the 2026 current head coach.');
  }
  // Bounded Batch 006 regression check; a <25-program> audit, not a site crawl.
  // Use the existing registry assignment rather than a second school roster.
  const footballRegistry = JSON.parse(read('docs/football-authority/REGISTRY.json'));
  const footballBatch006 = footballRegistry.batch?.number === 6
    ? footballRegistry.batch
    : footballRegistry.completedBatches?.find(({ number }) => number === 6);
  if (!footballBatch006 || footballBatch006.slugs?.length !== 25) {
    errors.push('Batch 006 canonical football assignment must retain all 25 original school slugs');
  } else {
    const todayUtc = new Date().toISOString().slice(0, 10);
    const batchSeoTitles = new Set();
    for (const slug of footballBatch006.slugs) {
      const program = footballEditorialRecord(slug);
      if (!program) continue;
      // Bounded metadata budget: keep each school and year legible in search,
      // while preserving unique program identity (Bowie versus Gold-Burg, etc.).
      const seoTitle = (program.seo?.title || '').trim();
      const seoDescription = (program.seo?.description || '').trim();
      if (!seoTitle || seoTitle.length > 70 || !seoTitle.includes('2026')) {
        errors.push('Batch 006 school SEO title absent, oversized or missing season: ' + slug);
      }
      if (batchSeoTitles.has(seoTitle)) {
        errors.push('Batch 006 duplicate school-specific SEO title: ' + slug);
      }
      batchSeoTitles.add(seoTitle);
      if (!seoDescription || seoDescription.length > 160 || !seoDescription.includes('2026')) {
        errors.push('Batch 006 SEO description absent, over 160 characters, or missing 2026 season: ' + slug);
      }
      const played = program.season?.games?.filter(({ result }) => Boolean(result)) || [];
      const wins = played.filter(({ result }) => result.startsWith('W ')).length;
      const losses = played.filter(({ result }) => result.startsWith('L ')).length;
      const record = program.season?.record?.match(/^(\d+)[–-](\d+)/);
      if (!record || Number(record[1]) !== wins || Number(record[2]) !== losses) {
        errors.push('Batch 006 2026 W-L summary contradicts scored game rows: ' + slug);
      }
      // A verified result must be directly traceable from the public school page.
      // The school UI renders "Verify latest recorded final" only if this link
      // is populated; without it, the date-qualified score has no per-result CTA.
      // A 2026 final may link to its dated report or current 2026 team result ledger,
      // not a prior-season MaxPreps /25-26/ schedule.
      if (played.length > 0 && (!/^https:\/\//.test(program.season?.latestResultSourceUrl || '')
        || /\/25-26\//.test(program.season?.latestResultSourceUrl || ''))) {
        errors.push('Batch 006 completed season lacks current clickable latest-result evidence: ' + slug);
      }
      // A dated W–L claim in a search snippet must equal the played-game ledger.
      // Evergreen descriptions without a W–L claim remain valid; do not parse
      // historic state titles, district identifiers or reported point scores.
      const seoRecord = seoDescription.match(/\b(\d+)[–-](\d+)\s+through\s+(?:Oct\.?|October|Sept\.?|September|Nov\.?|November)\b/i);
      if (seoRecord && (Number(seoRecord[1]) !== wins || Number(seoRecord[2]) !== losses)) {
        errors.push('Batch 006 dated SEO W-L contradicts completed 2026 games: ' + slug);
      }
      const games = program.season?.games || [];
      if (games.length < 7) errors.push('Batch 006 researched games unexpectedly sparse: ' + slug);
      for (let i = 0; i < games.length; i++) {
        const game = games[i];
        if (!/^\d{4}-\d\d-\d\d$/.test(game.date || '') || !game.opponent) {
          errors.push('Batch 006 fixture has invalid ISO date or unnamed opponent: ' + slug);
        }
        if (i > 0 && games[i - 1].date >= game.date) {
          errors.push('Batch 006 games out of date order or duplicate date: ' + slug);
        }
        if (game.result && (!/^[WL]\s/.test(game.result) || game.date > todayUtc)) {
          errors.push('Batch 006 scored fixture has malformed or future-dated result: ' + slug);
        }
      }
      // A milestone dated 2026 must never send readers to MaxPreps' prior
      // 2025–26 season. Older 2025 history may still legitimately use that URL.
      for (const milestone of program.milestones || []) {
        if (/^2026(?:$|[-–])/.test(milestone.date || '') && /\/25-26\//.test(milestone.sourceUrl || '')) {
          errors.push('Batch 006 2026 milestone links to an obsolete 2025 season: ' + slug);
        }
        if (!/^https:\/\//.test(milestone.sourceUrl || '')) {
          errors.push('Batch 006 historical milestone lacks a clickable source URL: ' + slug);
        }
      }
      if ((program.faq || []).length < 5) {
        errors.push('Batch 006 source-backed school FAQ unexpectedly missing: ' + slug);
      }
      if ((program.faq || []).some(({ question }) => (question || '').includes(' for ' + slug + ' against '))) {
        errors.push('Batch 006 public football FAQ exposes raw lowercase slug instead of school name: ' + slug);
      }
      const normalized = (program.faq || []).map(({ question }) => (question || '').trim().toLowerCase());
      if (new Set(normalized).size !== normalized.length) {
        errors.push('Batch 006 duplicate questions within a school profile: ' + slug);
      }
      // Prevent prior-year varsity schedules from masquerading as evidence
      // for the current 2026 season. Keep actual 2025 history links intact.
      for (const milestone of program.milestones || []) {
        if (/^2026(?:$|[-/])/.test(milestone.date || '')
            && (milestone.sourceUrl || '').includes('/25-26/schedule/')) {
          errors.push('Batch 006 2026 milestone cites prior season schedule: ' + slug
            + ' / ' + milestone.title);
        }
      }
      // School-owned/press photo assets require affirmative provenance.
      // Original CSS/SVG data visualizations are not documentary photos.
      if (program.photo && (!program.photo.license || !program.photo.sourceUrl
          || !program.photo.credit || !program.photo.alt)) {
        errors.push('Batch 006 football photo lacks reuse rights/credit/alt evidence: ' + slug);
      }
    }
  }

  // These source-dated October 16 results already exist in the game ledgers.
  // Protect the human-readable overview/FAQ too: correct table data is not
  // sufficient when a search answer still calls a completed game "upcoming".
  const october16NarrativeChecks = [
    {
      slug: 'big-sandy-harmony',
      opponent: 'Edgewood',
      score: 'L 0–48',
      overview: ['Edgewood', '48–0'],
      faq: ['0–8', 'October 16', 'Edgewood'],
      rejected: ['The latest completed result independently checked was an October 9 loss to Quitman'],
    },
    {
      slug: 'booker',
      opponent: 'White Deer',
      score: 'L 22–38',
      overview: ['White Deer', '38–22', '4–4'],
      rejected: ['White Deer, Wildorado and Boys Ranch are subsequent fixtures'],
    },
    {
      slug: 'borden-county',
      opponent: 'Westbrook',
      score: 'W 54–28',
      overview: ['Westbrook', '54–28', '7–0', 'August 18'],
      rejected: ['Westbrook, Klondike, Ira and Sands are fixtures with no independently certified scores'],
    },
    {
      slug: 'blanco',
      opponent: 'Karnes City',
      score: 'W 54–6',
      overview: ['Karnes City', '54–6', '5–3'],
      rejected: ['Remaining fixtures are schedules, not predicted outcomes.'],
    },
    {
      slug: 'bloomington',
      opponent: 'Danbury',
      score: 'W 42–0',
      overview: ['Danbury', '42–0', '3–5'],
      rejected: [],
    },
  ];
  for (const { slug, opponent, score, overview, faq = [], rejected } of october16NarrativeChecks) {
    const program = footballEditorialRecord(slug);
    if (!program) continue;
    const match = (program.season?.games || []).find((game) =>
      game.date === '2026-10-16' && game.opponent === opponent);
    if (!match || match.result !== score) {
      errors.push('Batch 006 October 16 game source changed or disappeared: ' + slug);
    }
    const overviewText = (program.overview || []).join(' ');
    const faqText = (program.faq || []).map(({ question, answer }) => question + ' ' + answer).join(' ');
    for (const phrase of overview) {
      if (!overviewText.includes(phrase)) errors.push('Batch 006 October 16 overview stale: ' + slug + ' missing ' + phrase);
    }
    for (const phrase of faq) {
      if (!faqText.includes(phrase)) errors.push('Batch 006 October 16 FAQ stale: ' + slug + ' missing ' + phrase);
    }
    for (const phrase of rejected) {
      if ((overviewText + ' ' + faqText).includes(phrase)) {
        errors.push('Batch 006 October 16 prose still contains superseded snapshot: ' + slug);
      }
    }
  }

  // The Bluff Dale school-issued 2026 calendar corrects an incomplete
  // third-party season feed. Keep all three published varsity fixtures visible;
  // each may gain a score later without breaking this source-integrity test.
  const bluffDale = footballEditorialRecord('bluff-dale');
  if (bluffDale) {
    const originalCalendar = 'bdisd.smartsiteshost.com/page/page_calendar?calID=136451';
    if (!bluffDale.schedule?.sourceUrl?.includes(originalCalendar)) {
      errors.push('Bluff Dale 2026 season schedule must cite the first-party ISD calendar');
    }
    const originalVarsityFixtures = [
      ['2026-10-23', 'Milford', 'Away', true],
      ['2026-10-29', 'Pinnacle Christian', 'Home', false],
      ['2026-11-05', 'Avalon', 'Home', true],
    ];
    for (const [date, opponent, site, district] of originalVarsityFixtures) {
      const game = bluffDale.season?.games?.find(g => g.date === date && g.opponent === opponent);
      if (!game || game.site !== site || Boolean(game.district) !== district) {
        errors.push('Bluff Dale official 2026 game missing/misidentified: ' + date + ' ' + opponent);
      }
    }
    const narrative = [
      ...(bluffDale.overview || []),
      ...(bluffDale.faq || []).map(({ answer }) => answer),
    ].join(' ');
    if (!narrative.includes('October 23') || !narrative.includes('October 22')) {
      errors.push('Bluff Dale must preserve school-versus-specialist Milford date discrepancy');
    }
  }

  const outdatedCoachCaveats = [
    ['boerne', 'rather than assuming an unverified coach'],
    ['boerne', 'should not be mistaken for a formally verified current head-coach appointment'],
    ['bloomington', 'but the distinct football appointment has not been confirmed with a district hiring announcement'],
    ['blanco', 'Fans seeking an up-to-the-minute coach or staffing contact should use Blanco ISD Athletics rather than an undated index'],
  ];
  for (const [slug, outdatedPhrase] of outdatedCoachCaveats) {
    const program = footballEditorialRecord(slug);
    if (!program) continue;
    const narrative = [...(program.overview || []), ...(program.faq || []).map(({ answer }) => answer)].join(' ');
    if (narrative.includes(outdatedPhrase)) {
      errors.push('Batch 006 rendered coach narrative still contains superseded caveat: ' + slug);
    }
  }

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


function batch009Cohort(registry) {
  return registry.batch.number === 9
    ? registry.batch
    : registry.completedBatches.find(x=>x.number===9 && x.state==='VERIFIED_BATCH_009_COMPLETE');
}

// The five scheduled Chrome cohorts complete independently, sometimes after
// the fifth-numbered cohort's completion event. The collector must be invoked
// by whichever cohort finishes last; a green collector with a missing ZIP is
// only a safe no-change result, never acceptance evidence. A single protected
// workflow-file push trigger allows this repair to use already retained
// technical evidence without creating another site-wide browser audit.
const batch010CollectorWorkflow = read('.github/workflows/certify-football-b010-from-chrome.yml');
for(const label of ['first','second','third','fourth','fifth']){
  if(!batch010CollectorWorkflow.includes(
    'Football Batch 010 '+label+'-five live production acceptance'))
    errors.push('Batch010 certificate runner must listen for '+label+'-five completion');
}
if(!batch010CollectorWorkflow.includes("push:") ||
   !batch010CollectorWorkflow.includes("'.github/workflows/certify-football-b010-from-chrome.yml'") ||
   !batch010CollectorWorkflow.includes("github.event_name == 'push'") ||
   !batch010CollectorWorkflow.includes('cancel-in-progress: false'))
  errors.push('Batch010 missing bounded protected source-push recovery/serialized real-evidence collector');

// The 25 Batch009 schools may be marked VERIFIED only after five real Chrome jobs,
// retained evidence artifacts, exact deployed SHA and a single published Worker.
// Never conflate this technical certification with photo rights or human signoff.
const batch009Certification = JSON.parse(read('docs/football-authority/REGISTRY.json'));
const batch009Certified = batch009Cohort(batch009Certification)?.state === 'VERIFIED_BATCH_009_COMPLETE';
const batch010Certification = batch009Certification.completedBatches.find(b => b.number === 10 && b.state === 'VERIFIED_BATCH_010_COMPLETE');
const batch010Certified = Boolean(batch010Certification);
// The certified Batch010 is immutable historical evidence once Batch011 is
// assigned; the active registry pointer must be allowed to move forward.
// This is a read-only validation view, not a rewrite of the signed archive.
const batch010View=(registry)=>{
  if(registry.batch.number===10)return registry;
  if(registry.batch.number!==11 || !batch010Certified) {
    errors.push('Batch011 may become active only after fully archived Batch010 technical certification.');
    return registry;
  }
  return {...registry,batch:{...batch010Certification,currentSchool:null,nextSchool:null}};
};
const batch010ExpectedUnreviewed = 1062 -
  batch009Certification.schoolRecords.filter(x=>
    x.batch>10 && x.status!=='NOT_REVIEWED').length;

const batch010ExpectedStatus = batch010Certified ? 'VERIFIED' : 'IMPLEMENTED';
const batch010ExpectedProduction = batch010Certified;
const batch010ExpectedTotalVerified = batch010Certified ? 230 : 205;
const batch010ExpectedImplemented = batch010Certified ? 0 : 25;
const batch010ExpectedRemaining = batch010Certified ? 0 : 25;
if (batch010Certified) {
  const r = batch010View(batch009Certification);
  const proof = batch010Certification.technicalAcceptance;
  const cohorts = ['first-five','second-five','third-five','fourth-five','fifth-five'];
  const counties = [5,5,3,5,4];
  const shots = [20,26,21,20,19];
  const validSha = /^[a-f0-9]{40}$/;
  const validWorker = /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/;
  const recordedWorker = proof?.observedWorkerVersions?.[0];
  const sourceCommit = proof?.productionDeploymentGitSha;
  const deploymentRun = proof?.productionDeploymentRun;
  const groups = proof?.groups;
  const observedWindow=proof?.verificationObservationWindow;
  const from=Date.parse(proof?.cloudflareActiveFrom||'');
  const replaced=proof?.cloudflareReplacedAt===null ? Infinity :
    Date.parse(proof?.cloudflareReplacedAt||'');
  const ledgerVerified=Date.parse(proof?.githubWorkerLedgerVerifiedAt||'');
  if(!validWorker.test(proof?.cloudflareDeploymentId||'') ||
     !Number.isSafeInteger(proof?.githubWorkerLedgerDeploymentId) ||
     proof.githubWorkerLedgerDeploymentId<=0 ||
     !Number.isFinite(from) || !(replaced>from) ||
     !Number.isFinite(ledgerVerified) || ledgerVerified<from ||
     !Array.isArray(observedWindow) || observedWindow.length!==5)
    errors.push('Batch010 historical Cloudflare 100%-active production window missing or invalid');
  for(let i=0;i<5;i++) {
    const w=observedWindow?.[i], g=groups?.[i];
    const start=Date.parse(w?.browserStartedAt||''),end=Date.parse(w?.browserCompletedAt||'');
    if(w?.cohort!==cohorts[i].split('-')[0] || w?.runId!==g?.runId ||
       !Number.isFinite(start) || !Number.isFinite(end) ||
       start<from || start<ledgerVerified || end<start || end>=replaced)
      errors.push('Batch010 cohort Chrome timing is outside matching Cloudflare deployment: '+cohorts[i]);
  }
  if (r.batch.number !== 10 || r.batch.slugs.length !== 25 ||
      r.batch.individuallyVerified !== 25 || r.batch.remainingToVerify !== 0 ||
      r.batch.remainingAssigned !== 0 || r.batch.remainingToImplement !== 0 ||
      r.schoolRecords.filter(x=>x.status==='VERIFIED').length !== 230 ||
      r.schoolRecords.filter(x=>x.status==='IMPLEMENTED' && x.batch===10).length !== 0 ||
      r.schoolRecords.filter(x=>x.status==='NOT_REVIEWED').length !== batch010ExpectedUnreviewed ||
      r.schoolRecords.filter(x=>x.status==='VERIFIED' && x.batch!==10).length !== 205 ||
      batch010Certification.individuallyVerified !== 25 ||
      batch010Certification.remainingToVerify !== 0 ||
      batch010Certification.slugs.length !== 25 ||
      JSON.stringify(batch010Certification.slugs) !== JSON.stringify(r.batch.slugs) ||
      proof?.schoolCount !== 25 || proof?.schoolCasesPassed !== 75 ||
      proof?.schoolCasesFailed !== 0 || proof?.countyCasesPassed !== 22 ||
      proof?.countyCasesFailed !== 0 || proof?.screenshotsSaved !== 106 ||
      proof?.sitemapUrlsPassed !== 25 || proof?.workerVersionMatchesDeploy !== true ||
      proof?.observedWorkerVersions?.length !== 1 || !validWorker.test(recordedWorker || '') ||
      !validSha.test(sourceCommit || '') || !Number.isSafeInteger(deploymentRun) || deploymentRun <= 0 ||
      proof?.editorialHumanSignoffsClaimed !== 0 || proof?.manualAccessibilityAccepted !== false ||
      proof?.schoolPhotoReuseRightsAccepted !== false || !Array.isArray(groups) || groups.length !== 5) {
    errors.push('Batch010 certification requires all 25 sourced schools, 75 browser cases, 22 counties, 106 screenshots and a single real deployed Worker.');
  }
  for (let i=0;i<5;i++) {
    const group = groups?.[i];
    const slugs = r.batch.slugs.slice(i*5,(i+1)*5);
    const runId = group?.runId;
    const artifactId = group?.artifactId;
    if(group?.label !== cohorts[i] || !Number.isSafeInteger(runId) || runId<=0 ||
       !Number.isSafeInteger(artifactId) || artifactId<=0 ||
       group?.schoolCasesPassed !== 15 || group?.countyCasesPassed !== counties[i] ||
       group?.screenshotsSaved !== shots[i] || group?.workerVersion !== recordedWorker ||
       JSON.stringify(group?.schoolSlugs) !== JSON.stringify(slugs) ||
       group?.runUrl !== 'https://github.com/keeptxred/TexasDefined/actions/runs/'+runId ||
       group?.artifactUrl !== group?.runUrl+'/artifacts/'+artifactId) {
      errors.push('Batch010 cohort lacks exact archived Chrome acceptance metadata: '+cohorts[i]);
    }
    for (const slug of slugs) {
      const row = r.schoolRecords.find(x => x.slug===slug);
      if(!row || row.batch !== 10 || row.status !== 'VERIFIED' ||
         row.actualProductionVerified !== true || row.technicalBrowserRun !== runId ||
         row.acceptanceEvidenceArtifact !== artifactId ||
         row.productionWorkerVersion !== recordedWorker ||
         row.verifiedDeploymentRun !== deploymentRun ||
         row.verifiedDeploymentGitSha !== sourceCommit ||
         row.manualAccessibilityAccepted !== false ||
         row.schoolPhotoReuseRightsAccepted !== false ||
         row.editorialHumanSignoff !== false) {
        errors.push('Batch010 school lacks matching published Chrome and release evidence: '+slug);
      }
    }
  }
}
const batch009ExpectedStatus = batch009Certified ? 'VERIFIED' : 'IMPLEMENTED';
const batch009ExpectedProduction = batch009Certified;
const batch009ExpectedTotalVerified = batch009Certified ? batch010ExpectedTotalVerified : 180;
const batch009ExpectedImplemented = batch009Certified ? 0 : 25;
const batch009ExpectedPending = batch009Certified ? 0 : 25;
if(batch009Certified) {
  const r = batch009Certification;
  const historical009 = batch009Cohort(r);
  const sha = '50cbde86199b5bfa0dd1f83142f0f9f95656aedf';
  const version = 'ec1fdfd7-2e11-42e4-ae63-15befca2bc52';
  const deployRun = 40606053728;
  const proof = [
    {offset:0,run:40607160511,artifact:12781656104,counties:4,shots:31},
    {offset:5,run:40607160473,artifact:12781066252,counties:5,shots:29},
    {offset:10,run:40607160531,artifact:12781706017,counties:4,shots:22},
    {offset:15,run:40607160523,artifact:12781521222,counties:5,shots:20},
    {offset:20,run:40607160611,artifact:12781081268,counties:5,shots:20},
  ];
  const cohorts = r.completedBatches.filter(x => x.number === 9);
  const completed = cohorts[0], evidence = completed?.technicalAcceptance;
  if(cohorts.length!==1 || completed.state!=='VERIFIED_BATCH_009_COMPLETE' ||
      completed.individuallyVerified!==25 || historical009.individuallyVerified!==25 ||
      historical009.remainingToVerify!==0 || historical009.remainingAssigned!==0 ||
      historical009.remainingToImplement!==0 || historical009.slugs.length!==25 ||
      evidence.schoolCount!==25 || evidence.schoolCasesPassed!==75 ||
      evidence.schoolCasesFailed!==0 || evidence.countyCasesPassed!==23 ||
      evidence.countyCasesFailed!==0 || evidence.screenshotsSaved!==122 ||
      evidence.sitemapUrlsPassed!==25 || !evidence.workerVersionMatchesDeploy ||
      evidence.observedWorkerVersions?.length!==1 ||
      evidence.observedWorkerVersions[0]!==version ||
      evidence.productionDeploymentRun!==deployRun ||
      evidence.productionDeploymentGitSha!==sha ||
      evidence.editorialHumanSignoffsClaimed!==0 ||
      evidence.manualAccessibilityAccepted!==false ||
      evidence.schoolPhotoReuseRightsAccepted!==false ||
      evidence.groups?.length!==5) {
    errors.push('Batch009 Chrome certification requires five exact successful evidence-backed groups and one deployed Worker.');
  }
  for (const [i,p] of proof.entries()) {
    const group = evidence?.groups?.[i];
    const slugs = historical009.slugs.slice(p.offset,p.offset+5);
    if(group?.runId!==p.run || group?.artifactId!==p.artifact ||
        group?.schoolCasesPassed!==15 || group?.countyCasesPassed!==p.counties ||
        group?.screenshotsSaved!==p.shots || group?.workerVersion!==version ||
        JSON.stringify(group?.schoolSlugs)!==JSON.stringify(slugs) ||
        !group?.runUrl?.endsWith('/actions/runs/'+p.run) ||
        !group?.artifactUrl?.endsWith('/artifacts/'+p.artifact)) {
      errors.push('Batch009 exact Chrome cohort report mismatch: group '+(i+1));
    }
    for(const slug of slugs) {
      const record = r.schoolRecords.find(x=>x.slug===slug);
      if(!record || record.status!=='VERIFIED' ||
         record.actualProductionVerified!==true ||
         record.batch!==9 || record.technicalBrowserRun!==p.run ||
         record.acceptanceEvidenceArtifact!==p.artifact ||
         record.productionWorkerVersion!==version ||
         record.verifiedDeploymentRun!==deployRun ||
         record.verifiedDeploymentGitSha!==sha ||
         record.manualAccessibilityAccepted!==false ||
         record.schoolPhotoReuseRightsAccepted!==false ||
         record.editorialHumanSignoff!==false) {
        errors.push('Batch009 school lacks published-Chrome evidence or retains unsupported claims: '+slug);
      }
    }
  }
  if(r.schoolRecords.filter(x=>x.status==='VERIFIED').length!==batch009ExpectedTotalVerified ||
     r.schoolRecords.filter(x=>x.status==='IMPLEMENTED'&&x.batch===9).length!==0 ||
     r.schoolRecords.filter(x=>x.status==='NOT_REVIEWED').length!==(1087-
       r.schoolRecords.filter(x=>x.batch>=10&&x.status!=='NOT_REVIEWED').length) ||
     r.schoolRecords.filter(x=>x.status==='VERIFIED'&&x.batch!==9).length!==(batch010Certified?205:180) ||
     r.counts.total!==1292) errors.push('Batch009 technical certification must preserve all historical verified and unreviewed schools.');
}

/** Batch 009 incremental source guard. Preserve all 180 previously technical-VERIFIED school records. */
{
  const registry = JSON.parse(read('docs/football-authority/REGISTRY.json'));
  const batch009 = read('src/data/high-school-football/program-editorial-b009.ts');
  const loader009 = read('src/data/high-school-football/program-editorial-b009-loader.server.ts');
  const profile009 = read('src/data/high-school-football/football-program-profile.server.ts');
  const initial = ['canyon-west-plains', 'carrizo-springs', 'carrollton-creekview', 'carrollton-ranchview', 'carrollton-smith'];
  const schools = registry.schoolRecords;
  if (batch009Cohort(registry).number !== 9 || batch009Cohort(registry).slugs.length !== 25) errors.push('Batch 009 must reserve exactly 25 canonical schools.');
  if (schools.filter((school) => school.status === 'VERIFIED').length !== batch009ExpectedTotalVerified) errors.push('Batch 009 must preserve all 180 independently production VERIFIED schools.');
  if (batch009Cohort(registry).individuallyVerified !== (batch009Certified ? 25 : 0) || batch009Cohort(registry).remainingToVerify !== batch009ExpectedPending) errors.push('Batch 009 cannot claim verified schools before strict postdeploy browser checks.');
  if (!profile009.includes('loadBatch009FootballProgramEditorial(canonicalSlug)')) errors.push('Batch 009 SSR conditional editorial loader not wired.');
  for (const slug of initial) {
    const school = schools.find((entry) => entry.slug === slug);
    if (!school || school.status !== batch009ExpectedStatus || school.batch !== 9 || school.actualProductionVerified !== batch009ExpectedProduction) errors.push('Batch 009 school must be IMPLEMENTED but not VERIFIED: ' + slug);
    if (!batch009.includes('"'+slug+'": {') || !loader009.includes('"'+slug+'"')) errors.push('Batch 009 per-school editorial loader missing: ' + slug);
    const audit = read('docs/football-authority/schools/' + slug + '.md');
    if (!audit.includes('Not merged, deployed or browser VERIFIED') || !audit.includes('https://')) errors.push('Batch 009 individual researched dossier/release caveat missing: ' + slug);
  }
}


/** Batch 009 campus structure: promote only source-backed school/campus
 * locations and keep them explicitly separate from stadium/gate claims. */
{
  const editorial = read('src/data/high-school-football/program-editorial-b009.ts');
  const campusEvidence = [
    ['chester', '273 Yellowjacket Dr, Chester, TX 75936', 'https://www.chesterisd.com/'],
    ['chillicothe', '1610 S. 6th Street, Chillicothe, TX 79225', 'https://www.cisd-tx.net/'],
    ['center-point', '207 China Street, Center Point, TX 78010', 'https://www.cpisd.net/employee-resources'],
    ['centerville', '813 South Commerce, Centerville, TX 75833', 'https://www.centerville.k12.tx.us/63130_2'],
    ['channelview', '1100 Sheldon Road, Channelview, TX 77530', 'https://www.cvisd.org/o/chs'],
    ['cedar-hill', '1 Longhorn Blvd., Cedar Hill, TX 75104', 'https://chhs.chisd.net/contact'],
    ['celina', '3455 N. Preston Road, Celina, TX 75009', 'https://chs.celinaisd.com/about-us'],
    ['charlotte', '70 Trojan Drive, Charlotte, TX 78011', 'https://www.charlotteisd.net/pages/uploaded_files/CISD%20Student%20Handbook%202024_2025.pdf'],
  ];
  for (const [slug, address, sourceUrl] of campusEvidence) {
    const start = editorial.indexOf('"'+slug+'": {');
    const next = editorial.indexOf('\n  "', start + 4);
    const section = start >= 0 ? editorial.slice(start, next > start ? next : editorial.length) : '';
    if (!section.includes('"campus": {')) errors.push('Batch 009 verified campus block missing: '+slug);
    if (!section.includes(address)) errors.push('Batch 009 verified campus address missing: '+slug);
    if (!section.includes(sourceUrl)) errors.push('Batch 009 verified campus source missing: '+slug);
    if (!/not a (?:verified )?(?:spectator entrance|stadium gate|game-day gate)|verify event entrance separately|access is separate/.test(section)) {
      errors.push('Batch 009 campus must remain explicitly distinct from football spectator access: '+slug);
    }
  }
}

/** Second Batch 009 group: preserve source qualification, TAPPS separation
 * and no pre-deployment VERIFIED promotion. */
{
  const registry = JSON.parse(read('docs/football-authority/REGISTRY.json'));
  const editorial = read('src/data/high-school-football/program-editorial-b009.ts');
  const loader = read('src/data/high-school-football/program-editorial-b009-loader.server.ts');
  const profile = read('src/data/high-school-football/football-program-profile.server.ts');
  const slugs = ['carrollton-turner','carthage','castle-hills','castroville-medina-valley','cayuga'];
  if (batch009Cohort(registry).implementedOnBranch !== 25 || batch009Cohort(registry).remainingToImplement !== 0) errors.push('Batch 009 all twenty-five individually sourced implementation records must match the planned cohort.');
  for (const slug of slugs) {
    const record = registry.schoolRecords.find(s => s.slug === slug);
    if (!record || record.status !== batch009ExpectedStatus || record.actualProductionVerified !== batch009ExpectedProduction) errors.push('Second group falsely promoted or missing: '+slug);
    requireText(editorial, '"'+slug+'": {', 'Second group specific football profile');
    requireText(loader, '"'+slug+'"', 'Second group conditional football profile loader');
    const dossier = read('docs/football-authority/schools/'+slug+'.md');
    requireText(dossier, 'not merged, deployed or browser VERIFIED', 'Second group release limitation');
    requireText(dossier, 'https://', 'Second group researched source');
  }
  if (!profile.includes('loadBatch009FootballProgramEditorial(legacy.featured.slug)')) errors.push('Castle Hills private-program SSR must load sourced Batch 009 editorial separately from UIL');
  for (const key of ['Wheatley Heights Sports Complex','TAPPS Six-Man Division I District 3','not UIL']) {
    requireText(editorial, key, 'Castle Hills private-school identity');
  }
}

/** First/second Batch009 workflow contracts. These are the two workflow files
 * that previously acquired duplicated step blocks and cross-cohort copy/paste
 * paths. Validate both syntax-adjacent structure and cohort-specific semantics. */
{
  const contracts = [
    {
      label: 'first-five',
      workflowPath: '.github/workflows/verify-football-b009-first-five-production.yml',
      workflowName: 'Football Batch 009 first-five live production acceptance',
      verifierPath: 'scripts/ci/verify-football-b009-first-five-production.mjs',
      artifactPath: 'artifacts/b009-first-five-production-chrome/',
      verifierOut: "const out = 'artifacts/b009-first-five-production-chrome';",
      scopeVerifierToken: 'verify-football-b009-first-five-production[.]mjs',
      scopeWorkflowToken: 'verify-football-b009-first-five-production[.]yml',
      countyCount: 4,
      forbidden: ['verify-football-b009-next-five-production.mjs', 'artifacts/b009-next-five-production-chrome/'],
    },
    {
      label: 'second-five',
      workflowPath: '.github/workflows/verify-football-b009-next-five-production.yml',
      workflowName: 'Football Batch 009 second-five live production acceptance',
      verifierPath: 'scripts/ci/verify-football-b009-next-five-production.mjs',
      artifactPath: 'artifacts/b009-next-five-production-chrome/',
      verifierOut: "const out = 'artifacts/b009-next-five-production-chrome';",
      scopeVerifierToken: 'verify-football-b009-next-five-production[.]mjs',
      scopeWorkflowToken: 'verify-football-b009-next-five-production[.]yml',
      countyCount: 5,
      forbidden: ['verify-football-b009-first-five-production.mjs', 'artifacts/b009-first-five-production-chrome/'],
    },
  ];
  for (const contract of contracts) {
    const wf = read(contract.workflowPath);
    const verifier = read(contract.verifierPath);
    const count = (needle) => wf.split(needle).length - 1;
    const detect = wf.indexOf('if grep -Eq');
    const nextStep = wf.indexOf('      - uses: actions/setup-node@v4', detect);
    const scopeShell = detect >= 0 && nextStep > detect ? wf.slice(detect, nextStep) : '';
    if (count('      - uses: actions/setup-node@v4') !== 1
        || count('      - name: Install isolated Chrome driver') !== 1
        || count('      - name: Verify 5 school pages') !== 1
        || !scopeShell.includes('echo "run=true" >> "$GITHUB_OUTPUT"')
        || !scopeShell.includes('echo "run=false" >> "$GITHUB_OUTPUT"')
        || !scopeShell.includes('          fi')
        || !scopeShell.includes(contract.scopeVerifierToken)
        || !scopeShell.includes(contract.scopeWorkflowToken)
        || /\n\s*- uses: actions\//.test(scopeShell)) {
      errors.push('Batch009 '+contract.label+' production workflow scope or Chrome job malformed/duplicated.');
    }
    for (const exact of [
      'name: '+contract.workflowName,
      "workflows: ['Deploy TexasDefined production']",
      "github.event.workflow_run.conclusion == 'success'",
      'ref: ${{ github.event.workflow_run.head_sha || github.sha }}',
      'run: node '+contract.verifierPath,
      'path: '+contract.artifactPath,
      contract.countyCount+' counties',
    ]) if (!wf.includes(exact)) errors.push('Batch009 '+contract.label+' live acceptance safety missing '+exact);
    for (const forbidden of contract.forbidden) {
      if (wf.includes(forbidden)) errors.push('Batch009 '+contract.label+' workflow contains cross-cohort copy/paste reference '+forbidden);
    }
    if (!verifier.includes(contract.verifierOut)
        || !verifier.includes('report.countyChecks.length!=='+contract.countyCount)
        || !verifier.includes('versions.size!==1')) {
      errors.push('Batch009 '+contract.label+' verifier output/county/Worker contract does not match its workflow.');
    }
  }
}

/** Third individually researched five-school cohort; no premature verified status. */
{
  const registry=JSON.parse(read('docs/football-authority/REGISTRY.json'));
  const editorial=read('src/data/high-school-football/program-editorial-b009.ts');
  const loader=read('src/data/high-school-football/program-editorial-b009-loader.server.ts');
  const county=read(files[10]);
  const third=['cedar-hill','cedar-park','cedar-park-vista-ridge','celeste','celina'];
  if(registry.schoolRecords.filter(s=>s.status==='VERIFIED' && s.batch!==9).length!==(batch010Certified?205:180)) errors.push('Do not demote the independently VERIFIED 180 older schools or the 25 validly certified Batch010 schools.');
  for(const slug of third) {
    const school=registry.schoolRecords.find(s=>s.slug===slug);
    if(!school||school.status!==batch009ExpectedStatus||school.actualProductionVerified!==batch009ExpectedProduction)errors.push('Batch 009 third cohort unverified status missing: '+slug);
    requireText(loader, '"'+slug+'"', 'Batch 009 third cohort lazy route');
    requireText(editorial, '"'+slug+'": {', 'Batch 009 third cohort original editorial');
    const dossier=read('docs/football-authority/schools/'+slug+'.md');
    requireText(dossier,'not merged, deployed or browser VERIFIED','Third cohort acceptance not yet proved');
    requireText(dossier,'https://','Third cohort evidence');
    requireText(county,"slug: '"+slug+"'","Third cohort reciprocal county link");
  }
  for(const marker of ['Marc Bindel','2015','Chad Scott','Nicholas Ward','Demetrius Rector']) requireText(editorial,marker,'Third cohort individual coaching/title research');
}

/** Prevent silent object-literal overwrites of researched county football links.
 * Duplicate keys inside either map can suppress valid programs. Reusing a county
 * key across the base and supplemental maps is intentional because render-time
 * concatenation preserves both independently researched cohorts. */
{
  const entityPage = read(files[10]);
  const baseStart = entityPage.indexOf('const batch002FootballCountyLinks:');
  const supplementalStart = entityPage.indexOf('const supplementalFootballCountyLinks:', baseStart);
  const end = entityPage.indexOf('\nconst siteUrl = ', supplementalStart);
  if (baseStart < 0 || supplementalStart < 0 || end < 0) {
    errors.push('Football county reciprocal base/supplemental link objects missing.');
  } else {
    const sections = [
      ['base', entityPage.slice(baseStart, supplementalStart)],
      ['supplemental', entityPage.slice(supplementalStart, end)],
    ];
    for (const [label, section] of sections) {
      const keys = [...section.matchAll(/^  (?:'([^']+)'|([a-z-]+)):\s*\[/gm)].map((m) => m[1] || m[2]);
      const duplicates = keys.filter((key, index) => keys.indexOf(key) !== index);
      if (duplicates.length) errors.push('Duplicate football county link keys inside '+label+' map would suppress school links: ' + [...new Set(duplicates)].join(', '));
    }
    const combined = sections.map(([, section]) => section).join('\n');
    for (const slug of ['canyon-west-plains','carrizo-springs','carrollton-creekview','carrollton-ranchview','carrollton-smith','celeste','celina']) {
      requireText(combined, "slug: '" + slug + "'", 'Batch 009 reciprocal football county link');
    }
    for (const marker of [
      '...(batch002FootballCountyLinks[entity.slug] ?? [])',
      '...(supplementalFootballCountyLinks[entity.slug] ?? [])',
    ]) requireText(entityPage, marker, 'Football county link maps must concatenate rather than overwrite');
  }
}

// The post-deploy Batch009 third-five acceptance must be a syntactically
// contiguous, single-copy workflow, not merely a present filename. Duplicated
// steps inside a shell run: block silently disable the actual Chrome job.
{
  const wf = read('.github/workflows/verify-football-b009-third-five-production.yml');
  const count = (needle) => wf.split(needle).length - 1;
  const detect = wf.indexOf('if grep -Eq');
  const nextStep = wf.indexOf('      - uses: actions/setup-node@v4', detect);
  const scopeShell = detect >= 0 && nextStep > detect ? wf.slice(detect, nextStep) : '';
  if (count('      - uses: actions/setup-node@v4') !== 1
      || count('      - name: Install isolated Chrome driver') !== 1
      || count('      - name: Verify 5 school pages') !== 1
      || !scopeShell.includes('echo "run=true" >> "$GITHUB_OUTPUT"')
      || !scopeShell.includes('echo "run=false" >> "$GITHUB_OUTPUT"')
      || !scopeShell.includes('          fi')
      || /\n\s*- uses: actions\//.test(scopeShell)) {
    errors.push('Batch009 third-five production workflow scope or Chrome job malformed/duplicated.');
  }
  for (const exact of [
    'verify-football-b009-third-five-production.mjs',
    'path: artifacts/b009-third-five-production-chrome/',
    "github.event.workflow_run.conclusion == 'success'",
    'ref: ${{ github.event.workflow_run.head_sha || github.sha }}',
  ]) if (!wf.includes(exact)) errors.push('Batch009 third-five live acceptance safety missing ' + exact);
}

// Batch009 fourth-five contract: strict editorial and technical evidence,
// including unresolved coach titles. Protected prior schools remain immutable.
{
  const reg = JSON.parse(read('docs/football-authority/REGISTRY.json'));
  const authored = read('src/data/high-school-football/program-editorial-b009.ts');
  const loader = read('src/data/high-school-football/program-editorial-b009-loader.server.ts');
  const identities = read('src/data/high-school-football/school-identities.ts');
  const route = read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
  const county = read('src/routes/$kind.$slug.lazy.tsx');
  const accepting = read('scripts/ci/verify-football-b009-fourth-five-production.mjs');
  const wf = read('.github/workflows/verify-football-b009-fourth-five-production.yml');
  const targets = [
    ['center','shelby','Jack Alvarez'],
    ['center-point','kerr','Mario Laque'],
    ['centerville','leon','Kyle Hardee'],
    ['channelview','harris','Averion Hurts'],
    ['charlotte','atascosa','Timothy Williams'],
  ];
  if (batch009Cohort(reg).number !== 9 || batch009Cohort(reg).slugs.length !== 25 || batch009Cohort(reg).implementedOnBranch !== 25 ||
      batch009Cohort(reg).remainingToImplement !== 0 || batch009Cohort(reg).remainingToVerify !== batch009ExpectedPending ||
      reg.schoolRecords.filter(x=>x.status==='VERIFIED').length!==batch009ExpectedTotalVerified ||
      reg.schoolRecords.filter(x=>x.status==='IMPLEMENTED'&&x.batch===9).length!==batch009ExpectedImplemented ||
      reg.schoolRecords.filter(x=>x.status==='NOT_REVIEWED').length!==(1087-
      reg.schoolRecords.filter(x=>x.batch>=10&&x.status!=='NOT_REVIEWED').length)) {
    errors.push('Batch009 verified-only cohort invariant: 180 VERIFIED / 25 IMPLEMENTED / 1,087 NOT_REVIEWED before Chrome acceptance.');
  }
  const graphicList = route.split('const FOOTBALL_SOURCE_GRAPHIC_SCHOOLS = new Set([')[1]?.split(']);')[0] || '';
  for (const [slug,countySlug,fact] of targets) {
    const row = reg.schoolRecords.find(x=>x.slug===slug);
    if (!row || row.batch!==9 || row.status!==batch009ExpectedStatus || row.actualProductionVerified!==batch009ExpectedProduction)
      errors.push('Fourth-five school not strictly IMPLEMENTED: '+slug);
    for (const [source,needle,label] of [
      [authored,'"'+slug+'": {','source-backed editorial'],
      [loader,'"'+slug+'"','lazy server loader'],
      [identities,"slug: '"+slug+"'","school identity"],
      [route,"'"+slug+"': '"+countySlug+"'","exact campus county"],
      [county,"slug: '"+slug+"'","reciprocal county link"],
      [accepting,"'"+slug+"'","production Chrome suite"],
      [authored,fact,"distinct sourced school fact"],
    ]) if (!source.includes(needle)) errors.push('Missing '+label+' for '+slug);
    const dossier = read('docs/football-authority/schools/'+slug+'.md');
    if(dossier.length<600 || !dossier.includes('https://') || !dossier.includes('IMPLEMENTED'))
      errors.push('Fourth-five source dossier insufficient for '+slug);
    if(graphicList.includes("'"+slug+"'")) errors.push('Do not render fictitious 2026 results graphic for '+slug);
  }
  for(const phrase of ['Brent Beadle','Mario Laque','conflict','Timothy Williams']) {
    if(!authored.includes(phrase)) errors.push('Conflicting current coach information was not retained: '+phrase);
  }
  if(!wf.includes("workflows: ['Deploy TexasDefined production']") ||
     !wf.includes("github.event.workflow_run.conclusion == 'success'") ||
     !wf.includes('ref: ${{ github.event.workflow_run.head_sha || github.sha }}') ||
     !wf.includes('path: artifacts/b009-fourth-five-production-chrome/') ||
     !wf.includes('scripts/ci/verify-football-b009-fourth-five-production.mjs') ||
     !wf.includes('echo "run=true" >> "$GITHUB_OUTPUT"') ||
     !wf.includes('echo "run=false" >> "$GITHUB_OUTPUT"') ||
     (wf.split('      - uses: actions/setup-node@v4').length-1)!==1 ||
     (wf.split('      - name: Verify 5 school pages').length-1)!==1)
    errors.push('Fourth-five deployed-Chrome workflow must be intact and exact-SHA scoped.');
  if(!accepting.includes('report.schoolChecks.length!==15') ||
     !accepting.includes('report.countyChecks.length!==5') ||
     !accepting.includes('report.screenshots!==20') ||
     !accepting.includes('Original TexasDefined typographic football identity panel'))
    errors.push('Fourth-five production Chrome acceptance must cover 15 views, 5 counties and 20 screenshots.');
}

// Final-five Batch009 source and exact-deployment Chrome contract. Do not
// confuse authored school editorial with a completed verified football season.
{
  const reg = JSON.parse(read('docs/football-authority/REGISTRY.json'));
  const editorial = read('src/data/high-school-football/program-editorial-b009.ts');
  const loader = read('src/data/high-school-football/program-editorial-b009-loader.server.ts');
  const identities = read('src/data/high-school-football/school-identities.ts');
  const team = read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
  const county = read('src/routes/$kind.$slug.lazy.tsx');
  const checker = read('scripts/ci/verify-football-b009-fifth-five-production.mjs');
  const wf = read('.github/workflows/verify-football-b009-fifth-five-production.yml');
  const targets = [
    ['cherokee','san-saba','Iredell'],
    ['chester','tyler','Coleman Butter'],
    ['chico','wise','California'],
    ['childress','childress','Bo Helm'],
    ['chillicothe','hardeman','Zack Ryan'],
  ];
  if (batch009Cohort(reg).number !== 9 || batch009Cohort(reg).slugs.length !== 25 ||
      batch009Cohort(reg).implementedOnBranch !== 25 || batch009Cohort(reg).remainingToImplement !== 0 || batch009Cohort(reg).remainingToVerify !== batch009ExpectedPending ||
      reg.schoolRecords.filter(x=>x.status==='VERIFIED').length!==batch009ExpectedTotalVerified ||
      reg.schoolRecords.filter(x=>x.status==='IMPLEMENTED'&&x.batch===9).length!==batch009ExpectedImplemented ||
      reg.schoolRecords.filter(x=>x.status==='NOT_REVIEWED').length!==(1087-
      reg.schoolRecords.filter(x=>x.batch>=10&&x.status!=='NOT_REVIEWED').length)) errors.push('Final-five Batch009 must preserve 180 VERIFIED / 25 IMPLEMENTED / 1,087 NOT_REVIEWED until real Chrome.');
  const graphicList = team.split('const FOOTBALL_SOURCE_GRAPHIC_SCHOOLS = new Set([')[1]?.split(']);')[0] || '';
  for (const [slug,countySlug,fact] of targets) {
    const record=reg.schoolRecords.find(x=>x.slug===slug);
    if (!record || record.status!==batch009ExpectedStatus || record.actualProductionVerified!==batch009ExpectedProduction || record.batch!==9)
      errors.push('Final-five school must be IMPLEMENTED, not technically VERIFIED: '+slug);
    for (const [content,needle,label] of [
      [editorial,'"'+slug+'": {','source-specific school editorial'],
      [editorial,fact,'documented school-specific fact'],
      [loader,'"'+slug+'"','conditional server load'],
      [identities,"slug: '"+slug+"'",'school identity'],
      [team,"'"+slug+"': '"+countySlug+"'",'campus county'],
      [county,"slug: '"+slug+"'",'reciprocal county card'],
      [checker,"'"+slug+"'",'live-Chrome target'],
    ]) if (!content.includes(needle)) errors.push('Final-five '+label+' missing: '+slug);
    const dossier=read('docs/football-authority/schools/'+slug+'.md');
    if(dossier.length<800 || !dossier.includes('IMPLEMENTED') || !dossier.includes('https://'))
      errors.push('Final-five researched school dossier missing/insufficient: '+slug);
    if(graphicList.includes("'"+slug+"'")) errors.push('Do not invent a scored-2026 timeline graphic for '+slug);
  }
  for(const required of ['Chillicothe ISD','25/26','Zack Ryan','California','Bo Helm','Coleman Butter'])
    if(!editorial.includes(required)) errors.push('Final-five source conflict or official role lost: '+required);
  for(const marker of [
    "workflows: ['Deploy TexasDefined production']",
    "github.event.workflow_run.conclusion == 'success'",
    'ref: ${{ github.event.workflow_run.head_sha || github.sha }}',
    'scripts/ci/verify-football-b009-fifth-five-production.mjs',
    'path: artifacts/b009-fifth-five-production-chrome/',
    'echo "run=true" >> "$GITHUB_OUTPUT"',
    'echo "run=false" >> "$GITHUB_OUTPUT"',
  ]) if(!wf.includes(marker)) errors.push('Fifth-five exact-deployment scoped workflow missing: '+marker);
  if((wf.split('      - uses: actions/setup-node@v4').length-1)!==1 ||
     (wf.split('      - name: Verify 5 school pages').length-1)!==1 ||
     !checker.includes('report.schoolChecks.length!==15') ||
     !checker.includes('report.countyChecks.length!==5') ||
     !checker.includes('report.screenshots!==20') ||
     !checker.includes('versions.size!==1')) errors.push('Final-five browser verifier must require 15 school checks, 5 counties, 20 screenshots, and one Worker version.');
}

// Stadium names and school campuses are not public spectator street addresses.
// Preserve first-party venue relationships while omitting invented city-only
// directions that look like fully verified stadium addresses.
{
  const footballEditorial = read('src/data/high-school-football/program-editorial.ts');
  const gameNight = read('src/components/sports/FootballGameNightGuide.tsx');
  const schoolPage = read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
  if(!footballEditorial.includes('address?: string;') || !gameNight.includes('address?: string;'))
    errors.push('Venue address must remain optional when only venue name is verified.');
  if(!gameNight.includes('venue.address ? <> — {venue.address}</> : null') ||
     !schoolPage.includes('editorial.venue.address && <Snapshot label="Address"'))
    errors.push('Public football game-night and school pages may show venue street only when verified.');
  const matches = [...footballEditorial.matchAll(/"venue":\s*\{[\s\S]*?\n\s*\}/g)];
  for (const [index, match] of matches.entries()) {
    const address = match[0].match(/"address":\s*"([^"]+)"/)?.[1];
    if (address && !/\d/.test(address)) errors.push('Venue '+index+' contains city/notice prose masquerading as street address: '+address);
  }
}

// Current school-authored venue names are useful to visitors without
// converting a campus mailing address or a city-only label into a gate address.
// The source rows are public school sites; no school marks or photo rights follow.
{
  const editor = read('src/data/high-school-football/program-editorial.ts');
  const venues = [
    ['blanket','Tiger Stadium','blanketisd.org','901 Avenue H, Blanket, TX 76432'],
    ['borger','Bulldog Stadium','borgerisd.net',null],
    ['bosqueville','Bulldog Stadium','bosquevilleisd.org',null],
    ['bovina','Mustang Stadium','bovinaisd.org',null],
    ['bowie','Jackrabbit Stadium','bowieisd.net',null],
  ];
  for (const [slug,name,domain,verifiedAddress] of venues) {
    const start = editor.indexOf('  "'+slug+'": {');
    const end = editor.indexOf('\n  "',start+8);
    const school = start>=0 ? editor.slice(start,end<0?editor.length:end) : '';
    if (!school.includes('"venue": {') || !school.includes('"name": "'+name+'"') ||
        !school.includes(domain) || !school.includes('"verifiedAt": "2026-10-27"'))
      errors.push('Source-based football venue missing or unattributed: '+slug);
    const venuePart = school.split('"venue": {')[1]?.split('\n    },')[0] || '';
    if (verifiedAddress) {
      if (!venuePart.includes('"address": "'+verifiedAddress+'"')) errors.push('Officially mapped Blanket stadium address lost');
    } else if (venuePart.includes('"address":')) errors.push('Unsourced public spectator address added for '+slug);
    if (!venuePart.includes('gate') && !venuePart.includes('entry') && !venuePart.includes('entrance')) errors.push('Venue entry-access caution missing for '+slug);
  }
}

// A cron stanza does not run Chrome if the top-level job gate excludes schedule.
// Keep this regression check in protected football CI: a green workflow with
// skipped Chrome and no screenshot artifact is not technical certification.
for (const cohort of ['first','second','third','fourth','fifth']) {
  const workflow = read(`.github/workflows/verify-football-b010-${cohort}-five-production.yml`);
  const jobGate = workflow.split('jobs:\n  chrome:\n    if: ${{ ')[1]?.split(' }}')[0] ?? '';
  for (const required of [
    "github.event_name == 'workflow_dispatch'",
    "github.event_name == 'schedule'",
    "github.event.workflow_run.conclusion == 'success'",
  ]) {
    if (!jobGate.includes(required)) errors.push(`Batch010 ${cohort} Chrome job-level event gate excludes: ${required}`);
  }
  if (!workflow.includes("SCHEDULED_ACCEPTANCE: ${{ github.event_name == 'schedule' }}") ||
      !workflow.includes('scripts/data/validate-high-school-football-platform[.]mjs') ||
      !workflow.includes('scripts/ci/prepare-football-b010-certification[.]mjs') ||
      !workflow.includes('node scripts/ci/pin-football-b010-production-release.mjs') ||
      !workflow.includes("ref: ${{ steps.release.outputs.sha }}") ||
      !workflow.includes("FOOTBALL_CHROME_SOURCE_SHA: ${{ steps.release.outputs.sha }}") ||
      !workflow.includes("FOOTBALL_EXPECTED_WORKER_VERSION: ${{ steps.release.outputs.worker }}") ||
      !read(`scripts/ci/verify-football-b010-${cohort}-five-production.mjs`).includes('process.env.FOOTBALL_CHROME_SOURCE_SHA') ||
      !read(`scripts/ci/verify-football-b010-${cohort}-five-production.mjs`).includes('process.env.FOOTBALL_EXPECTED_WORKER_VERSION') ||
      !workflow.includes("steps.release.outputs.ready == 'true'") ||
      !workflow.includes('if: steps.scope.outputs.run == \'true\''))
    errors.push(`Batch010 ${cohort} must retain pending-school scope on scheduled Chrome verification`);
}


// Batch011 is an assignment of exactly the next 25 canonical candidates,
// NOT new technical or editorial certification. Prior 230 schools stay
// VERIFIED and each assigned future school remains NOT_REVIEWED until
// original primary-source editorial and protected release are complete.
{
  const r=batch009Certification;
  if(r.batch.number===11){
    const expected=[
      'colorado-city-colorado','columbus','comal-canyon','comal-canyon-lake',
      'comal-davenport','comal-pieper','comal-smithson-valley','comanche',
      'comfort','commerce','como-pickton','conroe','conroe-caney-creek',
      'conroe-grand-oaks','conroe-oak-ridge','conroe-the-woodlands',
      'conroe-woodlands-college-park','converse-judson','coolidge','cooper',
      'coppell','copperas-cove','cornerstone-christian',
      'corpus-christi-calallen','corpus-christi-carroll'
    ];
    const firstFive=expected.slice(0,5);
    const implemented=expected.filter(slug=>r.schoolRecords.find(x=>x.slug===slug)?.status==='IMPLEMENTED').length;
    const sourceReady=implemented>=5;
    if(![0,5,10,15,20].includes(implemented) ||
       r.batch.state!=='IN_PROGRESS' || r.batch.slugs.length!==25 ||
       JSON.stringify(r.batch.slugs)!==JSON.stringify(expected) ||
       r.batch.individuallyVerified!==0 ||
       r.batch.remainingToImplement!==25-implemented ||
       r.batch.remainingAssigned!==25-implemented ||
       r.batch.remainingToVerify!==25 ||
       r.batch.implementedOnBranch!==implemented ||
       r.batch.currentSchool!==expected[implemented] ||
       r.schoolRecords.filter(x=>x.status==='VERIFIED'&&x.batch<=10).length!==230 ||
       r.schoolRecords.filter(x=>x.status==='VERIFIED'&&x.batch===11).length!==0)
      errors.push('Batch011 must advance in complete 5-school cohorts, keeping 230 previous VERIFIED');
    for(const [i,slug] of expected.entries()) {
      const school=r.schoolRecords.find(x=>x.slug===slug);
      const expectedStatus=sourceReady&&i<implemented?'IMPLEMENTED':'NOT_REVIEWED';
      if(!school || school.status!==expectedStatus || school.batch!==11 ||
        school.actualProductionVerified===true ||
        school.schoolPhotoReuseRightsAccepted===true ||
        school.manualAccessibilityAccepted===true)
        errors.push('Batch011 missing safe status or falsely certified: '+slug);
      if(sourceReady&&i<implemented&&
         (!school.audit || !school.implementedOnBranch || !school.researchCompletedAt ||
          !school.implementationNotes || school.editorialHumanSignoff!==false ||
          school.schoolPhotoReuseRightsAccepted!==false ||
          school.manualAccessibilityAccepted!==false))
        errors.push('Batch011 first-five lacks individualized source-implementation audit: '+slug);
    }

  // First Batch011 cohort is a real source-authored change, NOT live Chrome
  // certification. Guard separate school content, exact campus geography,
  // original identity, and a narrow bound on eventual real 18-PNG evidence.
  if(r.batch.implementedOnBranch>=5){
    const loader=read('src/data/high-school-football/program-editorial-b011-loader.server.ts');
    const src=read('src/data/high-school-football/program-editorial-b011.ts');
    const profile=read('src/data/high-school-football/football-program-profile.server.ts');
    const identity=read('src/data/high-school-football/school-identities.ts');
    const team=read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
    const countyPage=read('src/routes/$kind.$slug.lazy.tsx');
    const verifier=read('scripts/ci/verify-football-b011-first-five-production.mjs');
    const workflow=read('.github/workflows/verify-football-b011-first-five-production.yml');
    const first=[
      ['colorado-city-colorado','mitchell','Daniel Mejia'],
      ['columbus','colorado','Matt Schobel'],
      ['comal-canyon','comal','Sean McAuliffe'],
      ['comal-canyon-lake','comal','Lawrence Parker'],
      ['comal-davenport','comal','Zimmerhanzel']
    ];
    if(!profile.includes('loadBatch011FootballProgramEditorial(canonicalSlug)') ||
       !loader.includes("import('./program-editorial-b011')") ||
       !workflow.includes('Deploy TexasDefined production') ||
       !workflow.includes('steps.release.outputs.sha') ||
       !workflow.includes('node scripts/ci/pin-football-b010-production-release.mjs') ||
       !workflow.includes('path: artifacts/b011-first-five-production-chrome/') ||
       !verifier.includes('report.schoolChecks.length!==15') ||
       !verifier.includes('report.countyChecks.length!==3') ||
       !verifier.includes('report.screenshots!==18') ||
       !verifier.includes('process.env.FOOTBALL_CHROME_SOURCE_SHA') ||
       !verifier.includes('process.env.FOOTBALL_EXPECTED_WORKER_VERSION'))
      errors.push('Batch011 first-five original source loader or strict 18-screenshot Chrome contract absent');
    for(const [slug,physicalCounty,person] of first) {
      const dossier=read('docs/football-authority/schools/'+slug+'.md');
      if(!src.includes('"'+slug+'": {') || !src.includes(person) ||
         !identity.includes("slug: '"+slug+"'") ||
         !loader.includes("'"+slug+"'") ||
         !team.includes("'"+slug+"': '"+physicalCounty+"'") ||
         !countyPage.includes("slug: '"+slug+"'") ||
         !verifier.includes("'"+slug+"'") ||
         dossier.length<1500 || !dossier.includes('https://'))
        errors.push('Batch011 missing individually sourced school/coach/identity/county/dossier: '+slug);
    }
    if(!src.includes('The 2026 Lone Star Cup') && !src.includes('Lone Star Cup'))
      errors.push('Davenport all-sports cup must not be confused with football championship');
  }
  // Batch011 second-five governance: independent source-specific dossiers,
  // school identities, physical counties, isolated Chrome and evidence path.
  // No status is accepted as technically VERIFIED until independent proof merges.
  if(r.batch.implementedOnBranch>=10){
    const loader=read('src/data/high-school-football/program-editorial-b011-loader.server.ts');
    const src=read('src/data/high-school-football/program-editorial-b011.ts');
    const identities=read('src/data/high-school-football/school-identities.ts');
    const team=read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
    const counties=read('src/routes/$kind.$slug.lazy.tsx');
    const chrome=read('scripts/ci/verify-football-b011-second-five-production.mjs');
    const flow=read('.github/workflows/verify-football-b011-second-five-production.yml');
    const cases=[
      ['comal-pieper','bexar','Eduardo (Eddie) Salas'],
      ['comal-smithson-valley','comal','Larry Hill'],
      ['comanche','comanche','Jake Escobar'],
      ['comfort','kendall','Jay Rieken'],
      ['commerce','hunt','John McSheffery']
    ];
    for(const [slug,county,name] of cases){
      const dossier=read('docs/football-authority/schools/'+slug+'.md');
      if(!src.includes('"'+slug+'": {') || !src.includes(name) ||
         !identities.includes("slug: '"+slug+"'") || !loader.includes("'"+slug+"'") ||
         !team.includes("'"+slug+"': '"+county+"'") ||
         !counties.includes("slug: '"+slug+"'") ||
         dossier.length<2000 || !dossier.includes('https://'))
        errors.push('Batch011 second-five source, county, coach-role or dossier absent: '+slug);
    }
    for(const token of ['report.schoolChecks.length!==15',
      'report.countyChecks.length!==5','report.screenshots!==20',
      'process.env.FOOTBALL_CHROME_SOURCE_SHA',
      'process.env.FOOTBALL_EXPECTED_WORKER_VERSION'])
      if(!chrome.includes(token)) errors.push('Second-five strict Chrome evidence guard missing: '+token);
    for(const token of ['Deploy TexasDefined production','steps.release.outputs.sha',
      'pin-football-b010-production-release.mjs',
      'path: artifacts/b011-second-five-production-chrome/'])
      if(!flow.includes(token)) errors.push('Second-five deployment/source verification workflow missing: '+token);
    if(src.includes('"comfort":') && /"comfort"\s*:\s*\{[^]*?"coach"\s*:\s*\{/.test(src.slice(src.indexOf('"comfort":'),src.indexOf('"commerce":'))))
      errors.push('Comfort 2025 HFC interview cannot be mislabeled confirmed 2026 coaching appointment');
  }
  if(r.batch.implementedOnBranch>=15){
    const loader=read('src/data/high-school-football/program-editorial-b011-loader.server.ts');
    const src=read('src/data/high-school-football/program-editorial-b011.ts');
    const ids=read('src/data/high-school-football/school-identities.ts');
    const team=read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
    const county=read('src/routes/$kind.$slug.lazy.tsx');
    const verify=read('scripts/ci/verify-football-b011-third-five-production.mjs');
    const workflow=read('.github/workflows/verify-football-b011-third-five-production.yml');
    const cases=[
      ['como-pickton','hopkins','Jeremy Griffin'],
      ['conroe','montgomery','Cedric Hardeman'],
      ['conroe-caney-creek','montgomery','Taylor Cobb'],
      ['conroe-grand-oaks','montgomery','Shaun McDowell'],
      ['conroe-oak-ridge','montgomery','Tyler Blackshire']
    ];
    for(const [slug,campus,person] of cases){
      const dossier=read('docs/football-authority/schools/'+slug+'.md');
      if(!src.includes('"'+slug+'": {') ||
         !src.includes(person) || !loader.includes("'"+slug+"'") ||
         !ids.includes("slug: '"+slug+"'") ||
         !team.includes("'"+slug+"': '"+campus+"'") ||
         !county.includes("slug: '"+slug+"'") ||
         dossier.length<2000 || !dossier.includes('https://'))
        errors.push('Batch011 third-five distinct school-source, campus county or dossier missing: '+slug);
    }
    for(const t of ['report.schoolChecks.length!==15',
      'report.countyChecks.length!==2','report.screenshots!==17',
      'process.env.FOOTBALL_CHROME_SOURCE_SHA',
      'process.env.FOOTBALL_EXPECTED_WORKER_VERSION',
      '/tmp/td-b011-third-chrome/node_modules/playwright-core'])
      if(!verify.includes(t)) errors.push('Third-five real Chrome evidence guard missing '+t);
    for(const t of ['Deploy TexasDefined production','steps.release.outputs.sha',
      'pin-football-b010-production-release.mjs','artifacts/b011-third-five-production-chrome/'])
      if(!workflow.includes(t)) errors.push('Third-five exact production release or evidence workflow missing '+t);
    if(/"como-pickton"\s*:\s*\{[^]*?"coach"\s*:\s*\{/.test(src.slice(src.indexOf('"como-pickton":'),src.indexOf('"conroe":'))))
      errors.push('Como-Pickton 2025 head football coach role is not 2026 first-party confirmed');
  }

  if(r.batch.implementedOnBranch===20){
    const source=read('src/data/high-school-football/program-editorial-b011.ts');
    const identities=read('src/data/high-school-football/school-identities.ts');
    const loader=read('src/data/high-school-football/program-editorial-b011-loader.server.ts');
    const school=read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
    const county=read('src/routes/$kind.$slug.lazy.tsx');
    const chrome=read('scripts/ci/verify-football-b011-fourth-five-production.mjs');
    const workflow=read('.github/workflows/verify-football-b011-fourth-five-production.yml');
    const cases=[
      ['conroe-the-woodlands','montgomery','Jim (James) Rapp'],
      ['conroe-woodlands-college-park','montgomery','Michael Buro'],
      ['converse-judson','bexar','Vernon Hughes'],
      ['coolidge','limestone','six-man'],
      ['cooper','delta','Bruce Silman']
    ];
    for(const [slug,physicalCounty,person] of cases){
      const dossier=read('docs/football-authority/schools/'+slug+'.md');
      if(!source.includes('"'+slug+'": {')||!source.includes(person)||
         !identities.includes("slug: '"+slug+"'")||
         !loader.includes("'"+slug+"'")||
         !school.includes("'"+slug+"': '"+physicalCounty+"'")||
         !county.includes("slug: '"+slug+"'")||
         dossier.length<2000||!dossier.includes('https://'))
        errors.push('Fourth five sourced school profile, staff, six-man identity or county link missing: '+slug);
    }
    for(const marker of ['report.schoolChecks.length!==15','report.countyChecks.length!==4',
      'report.screenshots!==19','process.env.FOOTBALL_CHROME_SOURCE_SHA',
      'process.env.FOOTBALL_EXPECTED_WORKER_VERSION',
      '/tmp/td-b011-fourth-chrome/node_modules/playwright-core'])
      if(!chrome.includes(marker)) errors.push('Fourth-five independent real browser evidence guard missing: '+marker);
    for(const marker of ['Deploy TexasDefined production','steps.release.outputs.sha',
      'pin-football-b010-production-release.mjs','artifacts/b011-fourth-five-production-chrome/'])
      if(!workflow.includes(marker)) errors.push('Fourth-five pinned live Worker workflow or artifact hold missing: '+marker);
    for(const slug of ['coolidge','cooper']){
      const next=source.slice(source.indexOf('"'+slug+'":'),source.indexOf('"'+slug+'":')+4500);
      if(/"coach"\s*:\s*\{/.test(next)) errors.push('Unconfirmed 2026 head football coach must not be asserted: '+slug);
    }
  }

    if(!r.completedBatches.some(x=>x.number===10 &&
      x.state==='VERIFIED_BATCH_010_COMPLETE' &&
      x.technicalAcceptance?.screenshotsSaved===106))
      errors.push('Batch011 assignment cannot weaken archived 106-screenshot Batch010 certificate');
  } else if(r.batch.number!==10){
    errors.push('Football authority active assignment must be certified Batch010 or pending Batch011.');
  }
}

// Batch010 first-five sourced contract. Do not confuse implementation with
// successful published Chrome acceptance or official source rights.
{
  const reg=batch010View(JSON.parse(read('docs/football-authority/REGISTRY.json')));
  const first = ['chilton','china-spring','christoval','cibolo-steele','cisco'];
  const counties = ['falls','mclennan','tom-green','guadalupe','eastland'];
  const facts = ['Bennie Huitt','Josh Gregory','Tanner McLean','David Saenz','Kevin Stennett'];
  const editorial = read('src/data/high-school-football/program-editorial-b010.ts');
  const loader = read('src/data/high-school-football/program-editorial-b010-loader.server.ts');
  const profile = read('src/data/high-school-football/football-program-profile.server.ts');
  const identities = read('src/data/high-school-football/school-identities.ts');
  const team = read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
  const county = read('src/routes/$kind.$slug.lazy.tsx');
  const checker = read('scripts/ci/verify-football-b010-first-five-production.mjs');
  const wf = read('.github/workflows/verify-football-b010-first-five-production.yml');
  if(reg.batch.number!==10 || reg.batch.slugs.length!==25 || reg.batch.implementedOnBranch!==25 ||
     reg.batch.individuallyVerified!==(batch010Certified?25:0) || reg.batch.remainingToImplement!==0 || reg.batch.remainingToVerify!==batch010ExpectedRemaining ||
     reg.schoolRecords.filter(x=>x.status==='VERIFIED').length!==batch010ExpectedTotalVerified ||
     reg.schoolRecords.filter(x=>x.status==='IMPLEMENTED'&&x.batch===10).length!==batch010ExpectedImplemented ||
     reg.schoolRecords.filter(x=>x.status==='NOT_REVIEWED').length!==batch010ExpectedUnreviewed ||
     reg.schoolRecords.filter(x=>x.status==='VERIFIED'&&x.batch!==10).length!==205 ||
     reg.completedBatches.find(x=>x.number===9)?.individuallyVerified!==25) {
     errors.push('Batch010 protected third-cohort registry must preserve 205 VERIFIED / twenty-five individually IMPLEMENTED / 1,062 NOT_REVIEWED and archived Batch009 evidence.');
  }
  if(!profile.includes('loadBatch010FootballProgramEditorial(canonicalSlug)')) errors.push('Batch010 isolated SSR editorial precedence missing.');
  const graphicList = team.split('const FOOTBALL_SOURCE_GRAPHIC_SCHOOLS = new Set([')[1]?.split(']);')[0] ?? '';
  for(let i=0;i<first.length;i++) {
    const slug = first[i], row=reg.schoolRecords.find(x=>x.slug===slug);
    if(!row || row.batch!==10 || row.status!==batch010ExpectedStatus || row.actualProductionVerified!==batch010ExpectedProduction) errors.push('Batch010 school must be source IMPLEMENTED but technically pending: '+slug);
    for(const [source,marker,label] of [
      [editorial,'"'+slug+'": {','unique school editorial'],
      [editorial,facts[i],'distinct first-party coaching evidence'],
      [loader,"'"+slug+"'",'conditional SSR loader'],
      [identities,"slug: '"+slug+"'",'source-backed school mascot'],
      [team,"'"+slug+"': '"+counties[i]+"'",'school campus physical county'],
      [county,"slug: '"+slug+"'",'reciprocal county card'],
      [checker,"'"+slug+"'",'actual Chrome school target'],
    ]) if(!source.includes(marker)) errors.push('Batch010 missing '+label+': '+slug);
    const dossier=read('docs/football-authority/schools/'+slug+'.md');
    if(dossier.length<500 || !dossier.includes('https://') || !dossier.includes('NOT')) errors.push('Batch010 source dossier incomplete or falsely certified: '+slug);
    if(graphicList.includes("'"+slug+"'")) errors.push('Do not invent source-scored 2026 timeline graphic for Batch010 '+slug);
  }
  for(const exact of [
    "workflows: ['Deploy TexasDefined production']",
    "github.event.workflow_run.conclusion == 'success'",
    'ref: ${{ github.event.workflow_run.head_sha || github.sha }}',
    'scripts/ci/verify-football-b010-first-five-production.mjs',
    'path: artifacts/b010-first-five-production-chrome/',
    'echo "run=true" >> "$GITHUB_OUTPUT"',
    'echo "run=false" >> "$GITHUB_OUTPUT"',
  ]) if(!wf.includes(exact)) errors.push('Batch010 protected live Chrome workflow contract missing: '+exact);
  if((wf.split('      - uses: actions/setup-node@v4').length-1)!==1 ||
     (wf.split('      - name: Verify 5 school pages').length-1)!==1 ||
     !checker.includes('report.schoolChecks.length!==15') ||
     !checker.includes('report.countyChecks.length!==5') ||
     !checker.includes('report.screenshots!==20') ||
     !checker.includes('versions.size!==1')) errors.push('Batch010 must require 15 school views, five county pages, 20 archived screenshots and one Worker.');
}


// Batch 010 second five: independent published-source records, correct 1A
// six-man classification, original score graphics only for reported finals,
// and dedicated non-skipped production browser acceptance.
{
 const reg=batch010View(JSON.parse(read('docs/football-authority/REGISTRY.json')));
 const editorial=read('src/data/high-school-football/program-editorial-b010.ts');
 const loader=read('src/data/high-school-football/program-editorial-b010-loader.server.ts');
 const identity=read('src/data/high-school-football/school-identities.ts');
 const route=read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
 const county=read('src/routes/$kind.$slug.lazy.tsx');
 const checker=read('scripts/ci/verify-football-b010-second-five-production.mjs');
 const wf=read('.github/workflows/verify-football-b010-second-five-production.yml');
 const five=[
   ['clarendon','donley','Brenton Whitaker'],
   ['clarksville','red-river','Thavis Miller'],
   ['claude','armstrong','Brantlee Lemons'],
   ['cleburne','johnson','AJ Sheppard'],
   ['cleveland','liberty','Ajani Sanders']
 ];
 const graphic=route.split('const FOOTBALL_SOURCE_GRAPHIC_SCHOOLS = new Set([')[1]?.split(']);')[0]??'';
 if(reg.batch.number!==10||reg.batch.slugs.length!==25||reg.batch.implementedOnBranch!==25||
   reg.batch.remainingToImplement!==0||reg.batch.remainingToVerify!==batch010ExpectedRemaining||
   reg.schoolRecords.filter(s=>s.status==='VERIFIED').length!==batch010ExpectedTotalVerified)
   errors.push('Batch010 second-five registry must preserve all 205 previously verified school profiles and no remaining Batch010 source assignments');
 for(const [slug,countySlug,coach] of five){
   const row=reg.schoolRecords.find(s=>s.slug===slug);
   if(!row||row.batch!==10||row.status!==batch010ExpectedStatus||row.actualProductionVerified!==batch010ExpectedProduction)
     errors.push('Second five not source-IMPLEMENTED or falsely certified: '+slug);
   for(const [body,marker,label] of [
     [editorial,'"'+slug+'": {','individualized original football profile'],
     [editorial,coach,'school-specific sourced coaching'],
     [loader,"'"+slug+"'",'server-only slug loader'],
     [identity,"slug: '"+slug+"'",'school identity'],
     [route,"'"+slug+"': '"+countySlug+"'",'physical campus county'],
     [county,"slug: '"+slug+"'",'reciprocal county school link'],
     [checker,"'"+slug+"'",'actual postdeploy Chrome target']
   ]) if(!body.includes(marker))errors.push('Batch010 second five '+label+' missing: '+slug);
   const dossier=read('docs/football-authority/schools/'+slug+'.md');
   if(dossier.length<500||!dossier.includes('https://')||!dossier.includes('NOT merged'))
     errors.push('School-specific pending evidence dossier missing: '+slug);
   if(['clarksville','cleburne'].includes(slug)!==graphic.includes("'"+slug+"'"))
     errors.push('Dated 2026 original-score graphics must be restricted to two source-backed schools: '+slug);
 }
 if(!editorial.includes('2026-10-24')||!editorial.includes('2026-10-23'))
   errors.push('Date-specific October results evidence missing from Batch010 second five');
 if(!editorial.includes('six-man Class 1A Division I')||!editorial.includes('2000 E Houston St')&& !editorial.includes('1600 E Houston St'))
   errors.push('Claude six-man or Cleveland actual campus identity missing');
 for(const token of ["workflows: ['Deploy TexasDefined production']","github.event.workflow_run.conclusion == 'success'",
 'scripts/ci/verify-football-b010-second-five-production.mjs','path: artifacts/b010-second-five-production-chrome/',
 'echo "run=true" >> "$GITHUB_OUTPUT"','echo "run=false" >> "$GITHUB_OUTPUT"'])
    if(!wf.includes(token))errors.push('Strict second-five production workflow contract absent: '+token);
 for(const token of ['report.schoolChecks.length!==15','report.countyChecks.length!==5','report.screenshots!==26','versions.size!==1'])
    if(!checker.includes(token))errors.push('Second-five non-skippable acceptance counts/Worker consistency missing: '+token);
}

// Third Batch010 school-specific cohort: preserve protected 205 historical schools
// and require independently sourced 2026 coaching, correct Clint campus splits,
// one date-scoped result graphic and exact-version browser acceptance.
{
 const reg=batch010View(JSON.parse(read('docs/football-authority/REGISTRY.json')));
 const editorial=read('src/data/high-school-football/program-editorial-b010.ts');
 const loader=read('src/data/high-school-football/program-editorial-b010-loader.server.ts');
 const identity=read('src/data/high-school-football/school-identities.ts');
 const route=read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
 const county=read('src/routes/$kind.$slug.lazy.tsx');
 const checker=read('scripts/ci/verify-football-b010-third-five-production.mjs');
 const wf=read('.github/workflows/verify-football-b010-third-five-production.yml');
 const five=[
 ['cleveland-tarkington','liberty','Jake Howard'],
 ['clifton','bosque','Brent Finney'],
 ['clint','el-paso','Rosuel Martinez'],
 ['clint-horizon','el-paso','Omar Garcia'],
 ['clint-mountain-view','el-paso','DJ Check']
 ];
 const graphic=route.split('const FOOTBALL_SOURCE_GRAPHIC_SCHOOLS = new Set([')[1]?.split(']);')[0]??'';
 if(reg.batch.number!==10||reg.batch.slugs.length!==25||reg.batch.implementedOnBranch!==25||
    reg.batch.remainingToImplement!==0||reg.batch.remainingToVerify!==batch010ExpectedRemaining||
    reg.schoolRecords.filter(s=>s.status==='VERIFIED').length!==batch010ExpectedTotalVerified)
   errors.push('Batch010 third five registry must retain 205 protected VERIFIED and zero NOT_REVIEWED assigned schools');
 for(const [slug,countySlug,coach] of five){
   const row=reg.schoolRecords.find(s=>s.slug===slug);
   if(!row||row.batch!==10||row.status!==batch010ExpectedStatus||row.actualProductionVerified!==batch010ExpectedProduction)
     errors.push('Batch010 third five unverified source-implementation status missing: '+slug);
   for(const [source,term,label] of [
     [editorial,'"'+slug+'": {','original researched editorial'],
     [editorial,coach,'source-qualified 2026 head coaching'],
     [loader,"'"+slug+"'",'conditional server-only profile'],
     [identity,"slug: '"+slug+"'",'verified campus mascot identity'],
     [route,"'"+slug+"': '"+countySlug+"'",'independently sourced campus county'],
     [county,"slug: '"+slug+"'",'county reciprocity'],
     [checker,"'"+slug+"'",'non-skipped Chrome school acceptance']
   ])if(!source.includes(term))errors.push('Batch010 third five '+label+' missing: '+slug);
   const dossier=read('docs/football-authority/schools/'+slug+'.md');
   if(dossier.length<800||!dossier.includes('https://')||!dossier.includes('NOT merged'))
     errors.push('School-specific third cohort research dossier absent: '+slug);
   if((slug==='clint-mountain-view')!==graphic.includes("'"+slug+"'"))
     errors.push('Source-backed 2026 result graphic must be restricted to Mountain View among new schools: '+slug);
 }
 for(const marker of ['2026-10-23','2026-10-28','2026–28','A. L. Nelson Stadium','Rosuel Martinez','Omar Garcia','DJ Check','Brent Finney'])
   if(!editorial.includes(marker))errors.push('Third-cohort individual source and date evidence missing: '+marker);
 for(const marker of ["workflows: ['Deploy TexasDefined production']","github.event.workflow_run.conclusion == 'success'",
    'scripts/ci/verify-football-b010-third-five-production.mjs','path: artifacts/b010-third-five-production-chrome/'])
   if(!wf.includes(marker))errors.push('Third-five scoped Chrome workflow missing: '+marker);
 for(const marker of ['report.schoolChecks.length!==15','report.countyChecks.length!==3','report.screenshots!==21','versions.size!==1'])
   if(!checker.includes(marker))errors.push('Third five acceptance counts and one-worker guard missing: '+marker);
}

// Batch010 fourth cohort: five newly researched, separately sourced programs.
// A prepared GitHub branch is not proof of a published release or non-skipped Chrome.
{
 const reg=batch010View(JSON.parse(read('docs/football-authority/REGISTRY.json')));
 const editorial=read('src/data/high-school-football/program-editorial-b010.ts');
 const loader=read('src/data/high-school-football/program-editorial-b010-loader.server.ts');
 const identities=read('src/data/high-school-football/school-identities.ts');
 const team=read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
 const county=read('src/routes/$kind.$slug.lazy.tsx');
 const verifier=read('scripts/ci/verify-football-b010-fourth-five-production.mjs');
 const wf=read('.github/workflows/verify-football-b010-fourth-five-production.yml');
 const schools=[
   ['clute-brazoswood','brazoria','Eric Luster'],
   ['clyde','callahan','Danny Dudgeon'],
   ['coahoma','howard','Chris Joslin'],
   ['coldspring-oakhurst','san-jacinto','Chad Allen'],
   ['coleman','coleman','Zach Edington']
 ];
 const totals=reg.schoolRecords.reduce((a,row)=>(a[row.status]=(a[row.status]||0)+1,a),{});
 if(reg.batch.number!==10||reg.batch.slugs.length!==25||reg.batch.implementedOnBranch!==25||
   reg.batch.remainingToImplement!==0||reg.batch.nextSchool!==null||
   reg.batch.remainingToVerify!==batch010ExpectedRemaining||totals.VERIFIED!==batch010ExpectedTotalVerified||(totals.IMPLEMENTED||0)!==(batch010ExpectedImplemented+reg.schoolRecords.filter(x=>x.batch>10&&x.status==='IMPLEMENTED').length)||
   totals.NOT_REVIEWED!==batch010ExpectedUnreviewed)
   errors.push('Batch010 fourth cohort must maintain 205 VERIFIED / 25 IMPLEMENTED / 1062 NOT_REVIEWED, all assigned schools authored');
 const graphicList=team.split('const FOOTBALL_SOURCE_GRAPHIC_SCHOOLS = new Set([')[1]?.split(']);')[0]??'';
 for(const [slug,countySlug,coach] of schools) {
   const row=reg.schoolRecords.find(r=>r.slug===slug);
   if(!row||row.batch!==10||row.status!==batch010ExpectedStatus||row.actualProductionVerified!==batch010ExpectedProduction)
     errors.push('Fourth-cohort school must be IMPLEMENTED, not production VERIFIED: '+slug);
   const dossier=read('docs/football-authority/schools/'+slug+'.md');
   if(dossier.length<950||!dossier.includes('https://')||!dossier.includes('NOT merged'))
     errors.push('Fourth-cohort independently researched dossier missing: '+slug);
   for(const [source,marker,label] of [
     [editorial,'"'+slug+'": {','individual original source-backed editorial'],
     [editorial,coach,'coach verification with role caveats'],
     [loader,"'"+slug+"'","conditional server-only profile import"],
     [identities,"slug: '"+slug+"'","independently sourced school mascot"],
     [team,"'"+slug+"': '"+countySlug+"'","campus-county outbound navigation"],
     [county,"slug: '"+slug+"'","reciprocal county school card"],
     [verifier,"'"+slug+"'","strict postdeployment Chrome school target"]
   ])if(!source.includes(marker))errors.push('Fourth cohort '+label+' missing: '+slug);
   if(graphicList.includes("'"+slug+"'"))
     errors.push('Fourth cohort unverified 2026 final-score illustration forbidden: '+slug);
 }
 for(const marker of ["workflows: ['Deploy TexasDefined production']",
    "github.event.workflow_run.conclusion == 'success'",
    "scripts/ci/verify-football-b010-fourth-five-production.mjs",
    "path: artifacts/b010-fourth-five-production-chrome/",
    "SCHEDULED_ACCEPTANCE",
    "github.event_name == 'workflow_dispatch'"])
   if(!wf.includes(marker))errors.push('Fourth-cohort protected Chrome workflow missing: '+marker);
 for(const marker of ['report.schoolChecks.length!==15','report.countyChecks.length!==5',
   'report.screenshots!==20','versions.size!==1'])
   if(!verifier.includes(marker))errors.push('Fourth-cohort 15 viewport / 5 county / 20 screenshot / one Worker guard missing: '+marker);
 if(!editorial.includes('Hopper Field')||!editorial.includes('interim')||
   !editorial.includes('Clyde')||!editorial.includes('Coahoma Community College'))
   errors.push('Fourth cohort venue, interim-coach, district and similar-name evidence missing');
}

// Batch010 final fifth cohort. All 25 have distinct source-backed authored
// profiles, but none can become technically VERIFIED from a green skipped job.
{
 const reg=batch010View(JSON.parse(read('docs/football-authority/REGISTRY.json')));
 const editorial=read('src/data/high-school-football/program-editorial-b010.ts');
 const loader=read('src/data/high-school-football/program-editorial-b010-loader.server.ts');
 const identities=read('src/data/high-school-football/school-identities.ts');
 const team=read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
 const county=read('src/routes/$kind.$slug.lazy.tsx');
 const verifier=read('scripts/ci/verify-football-b010-fifth-five-production.mjs');
 const wf=read('.github/workflows/verify-football-b010-fifth-five-production.yml');
 const five=[
  ['college-station','brazos','Stoney Pryor'],
  ['college-station-a-and-m-consolidated','brazos','Brandon Schmidt'],
  ['colleyville-heritage','tarrant','Jerry Edwards'],
  ['collinsville','grayson','Garrett Patterson'],
  ['colmesneil','tyler','Chad Coker']
 ];
 const counts=reg.schoolRecords.reduce((a,row)=>(a[row.status]=(a[row.status]||0)+1,a),{});
 if(reg.batch.number!==10||reg.batch.slugs.length!==25||reg.batch.implementedOnBranch!==25||
    reg.batch.remainingToImplement!==0||reg.batch.nextSchool!==null||
    reg.batch.remainingToVerify!==batch010ExpectedRemaining||counts.VERIFIED!==batch010ExpectedTotalVerified||
    (counts.IMPLEMENTED||0)!==(batch010ExpectedImplemented+reg.schoolRecords.filter(x=>x.batch>10&&x.status==='IMPLEMENTED').length)||counts.NOT_REVIEWED!==batch010ExpectedUnreviewed)
   errors.push('Batch010 final source-only state must retain 205 VERIFIED / 25 IMPLEMENTED / 1062 NOT_REVIEWED; no new batch assigned before live acceptance');
 const graphicList=team.split('const FOOTBALL_SOURCE_GRAPHIC_SCHOOLS = new Set([')[1]?.split(']);')[0]??'';
 for(const [slug,countySlug,coach] of five){
  const rec=reg.schoolRecords.find(x=>x.slug===slug);
  if(!rec||rec.status!==batch010ExpectedStatus||rec.batch!==10||rec.actualProductionVerified!==batch010ExpectedProduction)
    errors.push('Batch010 fifth-cohort school is not safely pending verification: '+slug);
  const dossier=read('docs/football-authority/schools/'+slug+'.md');
  if(dossier.length<950||!dossier.includes('https://')||!dossier.includes('NOT merged'))
    errors.push('Missing fifth cohort individual source dossier '+slug);
  for(const [src,mark,label] of [
    [editorial,'"'+slug+'": {','unique source-backed editorial'],
    [editorial,coach,'qualified coach role'],
    [loader,"'"+slug+"'","conditional server-only loader"],
    [identities,"slug: '"+slug+"'","mascot identity source"],
    [team,"'"+slug+"': '"+countySlug+"'","outbound school-to-campus county link"],
    [county,"slug: '"+slug+"'","county-to-school reciprocal card"],
    [verifier,"'"+slug+"'","strict live Chrome target"]
  ])if(!src.includes(mark))errors.push('Batch010 fifth cohort '+label+' missing for '+slug);
  if(graphicList.includes("'"+slug+"'"))errors.push('Fifth cohort invented final-score graphic forbidden: '+slug);
 }
 const tylerSupplement=county.split('const supplementalFootballCountyLinks:')[1]?.split('\n};')[0]??'';
 if((tylerSupplement.match(/'tyler': \[/g)||[]).length!==1||!tylerSupplement.includes("slug: 'chester'")||
    !tylerSupplement.includes("slug: 'colmesneil'"))
   errors.push('Adding Colmesneil must preserve existing Chester county football link without duplicate Tyler keys');
 for(const marker of ["workflows: ['Deploy TexasDefined production']",
    "github.event.workflow_run.conclusion == 'success'",
    "scripts/ci/verify-football-b010-fifth-five-production.mjs",
    "path: artifacts/b010-fifth-five-production-chrome/",
    "SCHEDULED_ACCEPTANCE"])
    if(!wf.includes(marker))errors.push('Batch010 fifth cohort scoped workflow protection missing: '+marker);
 for(const marker of ['report.schoolChecks.length!==15','report.countyChecks.length!==4','report.screenshots!==19','versions.size!==1'])
    if(!verifier.includes(marker))errors.push('Fifth-cohort 15 school / four county / 19 screenshot / Worker identity guard missing: '+marker);
 if(!verifier.includes('/tmp/td-b010-fifth-chrome/node_modules/playwright-core') ||
    verifier.includes('/tmp/td-b010-third-chrome/node_modules/playwright-core'))
   errors.push('Fifth-cohort verifier must import its own Playwright install; third-cohort dependency forbidden');
 if(!editorial.includes('Stoney Pryor')||!editorial.includes('Brandon Schmidt')||
    !editorial.includes('Jerry Edwards')||!editorial.includes('Garrett Patterson')||
    !editorial.includes('Chad Coker')||!editorial.includes('Chris Hicks')||
    !editorial.includes('Collinsville Kahoks'))
    errors.push('Fifth-cohort distinct school/coach and predecessor evidence absent');
}


// Finalized GSC 2026-09-29–10-26: generic "UIL 6A football districts"
// searched the individual District 6-6A page instead of the state directory.
// Preserve local district pages but make the full 6A list clearly discoverable.
const sixADirectorySeo = read(footballDistrictIndexRoutePath);
const sixADirectoryBody = read(footballDistrictIndexPagePath);
const districtDetailBody = read(footballDistrictPagePath);
for (const marker of [
  'including every Texas 6A district plus 5A–1A six-man',
]) requireText(sixADirectorySeo, marker, 'Complete UIL 6A search intent owner');
for (const marker of [
  'uil-6a-districts',
  'The complete 2026–28 UIL 6A football district list is below',
  'This is the statewide 6A directory',
]) requireText(sixADirectoryBody, marker, '6A directory section intent and anchor');
for (const marker of [
  'district.classification === "6A"',
  '/texas-high-school-football-districts#uil-6a-districts',
  'All UIL 6A football districts',
]) requireText(districtDetailBody, marker, 'Specific 6A district-to-statewide-list contextual navigation');

if (errors.length) {
  console.error('High-school football platform validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('High-school football platform validation passed.');
