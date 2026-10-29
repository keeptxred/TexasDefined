import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const requireText = (source, text, label) => {
  if (!source.includes(text)) throw new Error(`Hunting authority validation failed: ${label}`);
};
const requireRouteLiteral = (source, routePath, label) => {
  if (!source.includes(`"${routePath}"`) && !source.includes(`'${routePath}'`)) {
    throw new Error(`Hunting authority validation failed: ${label}`);
  }
};

const authority = read('src/data/hunting/authority.ts');
const authorityV2 = read('src/data/hunting/authority-v2.ts');
const deer = read('src/data/hunting/authority-deer.ts');
const turkey = read('src/data/hunting/turkey-guide.ts');
const turkeyTable = read('src/components/hunting/TurkeySeasonGuide.tsx');
const turkeyMonitor = read('scripts/data/check-turkey-regulations.mjs');
const turkeyWorkflow = read('.github/workflows/check-turkey-regulations.yml');
const turkeyCalendar = read('src/data/hunting/turkey-season-calendar.json');
const turkeyDateUpdater = read('scripts/data/refresh-turkey-season-calendar.mjs');
const turkeyDateTests = read('scripts/data/refresh-turkey-season-calendar.test.mjs');
const turkeyUpdateWorkflow = read('.github/workflows/refresh-turkey-season-calendar.yml');
const turkeyFinishWorkflow = read('.github/workflows/finish-turkey-season-calendar.yml');
const deerSeasonDates = read('src/data/hunting/deer-season-dates.json');
const deerSeasonSync = read('scripts/data/sync-texas-deer-seasons.mjs');
const deerCheck = read('scripts/data/verify-texas-deer-regulations.mjs');
const deerWorkflow = read('.github/workflows/verify-texas-deer-regulations.yml');
const huntingMonitorWorkflow = read('.github/workflows/monitor-hunting-tpwd-sources.yml');
const huntingMonitor = read('scripts/data/refresh-hunting-official-facts.mjs');
const accessFacts = read('src/data/hunting/public-access-facts.json');
const allAuthority = `${authority}\n${authorityV2}`;
const freshness = read('src/data/hunting/freshness.ts');
const sitemap = read('src/data/hunting/sitemap.ts');
const huntingRoute = read('src/routes/hunting.$slug.tsx');
const huntingLazyRoute = read('src/routes/hunting.lazy.tsx');
const huntingTopicRoute = read('src/routes/hunting.$slug.lazy.tsx');
const huntingTopicPage = read('src/components/hunting/HuntingTopicPage.tsx');
const huntingHub = read('src/components/hunting/HuntingAuthority.tsx');
const speciesCalendar = JSON.parse(read('src/data/hunting/species-season-calendar.json'));
const speciesMonitor = read('scripts/data/refresh-hunting-species-seasons.mjs');
const speciesWorkflow = read('.github/workflows/refresh-hunting-species-calendar.yml');
const speciesFinisher = read('.github/workflows/finish-hunting-species-calendar.yml');
const boundedLive = read('scripts/data/monitor-hunting-live-freshness.mjs');
const boundedLiveWorkflow = read('.github/workflows/monitor-hunting-live-freshness.yml');
const destinationBooking = read('src/components/editorial/DestinationViatorBooking.tsx');
const huntingSearch = read('src/data/hunting/search.ts');
const queries = read('src/data/queries.ts');
const searchRuntime = read('src/data/search-documents-runtime.ts');
const searchImplementation = `${queries}\n${searchRuntime}`;
const publicRoutes = read('src/lib/public-routes.ts');
const leafOnlyParentRoutes = read('src/lib/leaf-only-parent-routes.tsx');
const wildlife = read('src/routes/explore.wildlife.lazy.tsx');
const resources = read('src/routes/texas-resources.lazy.tsx');
const fishing = read('src/components/fishing/FishingHub.tsx');
const search = read('src/routes/search.lazy.tsx');
const outdoors = read('src/routes/explore.$category.lazy.tsx');
const productionSmokeWorkflow = read('.github/workflows/verify-hunting-production.yml');
const productionSmoke = read('scripts/data/verify-hunting-production.mjs');
const deployPageSelection = read('scripts/ci/production-change-scope.mjs');

const expectedTopics = [
  'texas-hunting-license', 'hunter-education', 'public-hunting', 'annual-public-hunting-permit',
  'drawn-hunts', 'hunting-seasons', 'bag-limits', 'archery-hunting', 'youth-hunting',
  'texas-deer-hunting', 'mule-deer', 'dove-hunting', 'turkey-hunting', 'quail-hunting',
  'waterfowl-hunting', 'javelina-hunting', 'feral-hogs', 'exotic-game',
  'squirrel-hunting', 'rabbit-hare-hunting', 'pheasant-hunting', 'chachalaca-hunting',
  'pronghorn-hunting', 'alligator-hunting', 'migratory-game-birds', 'goose-hunting',
  'teal-hunting', 'sandhill-crane-hunting', 'other-migratory-game-birds', 'trapping-furbearers',
];
const v2Topics = [
  'youth-hunting', 'squirrel-hunting', 'rabbit-hare-hunting', 'pheasant-hunting', 'chachalaca-hunting',
  'pronghorn-hunting', 'alligator-hunting', 'migratory-game-birds', 'goose-hunting', 'teal-hunting',
  'sandhill-crane-hunting', 'other-migratory-game-birds', 'trapping-furbearers',
];

for (const slug of expectedTopics) requireText(allAuthority, `"${slug}"`, `missing topic ${slug}`);
for (const slug of v2Topics) requireText(authorityV2, `"${slug}"`, `missing v2 topic ${slug}`);
for (const slug of expectedTopics) requireRouteLiteral(sitemap, `/hunting/${slug}`, `sitemap missing ${slug}`);

requireText(authority, '"texas-deer-hunting": TEXAS_DEER_AUTHORITY_TOPIC', 'deer guide still using generic species template');
requireText(authority, '"turkey-hunting": TURKEY_HUNTING_TOPIC', 'turkey not dedicated guide');
for (const term of ['2026–27', 'Matagorda and Wharton', 'mandatory harvest reporting', 'unbearded', 'November 1, 2026', 'reviewedOn: TURKEY_GUIDE_LAST_VERIFIED']) requireText(turkey, term, 'turkey guide missing ' + term);
requireText(turkeyTable, 'TURKEY_SEASONS_2026_27.map', 'turkey season table missing');
requireText(turkeyTable, 'Robert Burton', 'turkey photo attribution missing');
requireText(turkeyTable, 'turkeyCalendar.checkedAt', 'date provenance missing');
requireText(huntingHub, '<TurkeySeasonGuide />', 'turkey table not rendered');
requireText(turkeyMonitor, 'process.exit(2)', 'TPWD legal monitor missing');
requireText(turkeyWorkflow, 'schedule:', 'legal source monitor not scheduled');
requireText(turkeyCalendar, '"spring-youth-north"', 'governed turkey season data missing');
requireText(turkey, 'turkeyCalendar.rows', 'turkey guide not using governed seasons');
for (const expected of ['TPWD: public hunt Area / Legal Game Search', 'TPWD: official turkey harvest data by county', 'Hagerman NWR', 'Lower Rio Grande Valley NWR', '2027', 'Using TPWD turkey harvest numbers responsibly']) requireText(turkey, expected, 'turkey public-access authority missing ' + expected);
for (const expected of ['Two verified 2027 public turkey draw opportunities', 'tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/search.phtml', 'tpwd.texas.gov/huntwild/wild/game_management/turkey/turkeyData.phtml']) requireText(turkeyTable, expected, 'turkey public-hunt guidance not displayed ' + expected);

requireText(turkeyDateUpdater, 'checkCompanion', 'TPWD date dual-source check missing');
requireText(turkeyDateUpdater, 'YEAR_ROLLOVER', 'new season must fail closed');
requireText(turkeyDateTests, 'conflicting TPWD source dates stop publication', 'date source safety test missing');
requireText(turkeyUpdateWorkflow, 'cron:', 'scheduled TPWD season refresh missing');
requireText(turkeyFinishWorkflow, 'dispatch-validate-branch.sh', 'protected TPWD PR finisher missing');
requireText(turkeyFinishWorkflow, '--check-only --strict-check-only', 'protected TPWD finisher must fail closed if source transport fails');
requireText(turkeyDateTests, 'protected finisher fails closed when TPWD is unavailable', 'strict TPWD merge safety test missing');
requireText(deer, 'reviewedOn: "2026-10-28"', 'deer-specific review metadata missing');
requireText(deer, 'deerSeasonRange(', 'deer guide does not use centralized TPWD dates');
requireText(deerSeasonDates, '"generalNorth"', 'deer date dataset must include North Zone');
requireText(deerSeasonSync, 'parseDeerPage', 'official deer date synchronizer missing');
requireText(deerSeasonSync, 'parseRegulatoryFacts', 'official deer regulatory fact parser missing');
requireText(deerSeasonSync, 'currentCalendarUrl', 'automated TPWD season-year rollover missing');
requireText(deerSeasonDates, '"regulations"', 'structured current deer legal facts missing');
for (const text of ['county', 'antler', 'regulations.reportingHours', 'regulations.specialAntlerSpreadInches', 'public hunting', 'rut', 'CWD']) {
  requireText(deer, text, 'deer guide missing useful authority depth: ' + text);
}
requireText(huntingHub, 'function DeerSeasonTable()', 'deer season table missing');
requireText(huntingHub, 'topic.slug === "texas-deer-hunting"', 'deer-specific table rendering missing');
requireText(huntingHub, 'topic?.reviewedLabel', 'deer review date not displayed correctly');
requireText(deerCheck, 'const pageUrl', 'deer monitoring source contract missing');
requireText(deerWorkflow, 'schedule:', 'weekly TPWD monitoring not scheduled');
requireText(allAuthority, 'https://tpwd.texas.gov/', 'TPWD official-source links missing');
requireText(authorityV2, 'fur-bearing-animal-regulations', 'fur-bearer authority source missing');
requireText(authorityV2, 'migratory-game-bird-regulations', 'migratory game bird authority source missing');
requireText(authorityV2, 'youth-only', 'youth-only authority source missing');
requireText(freshness, 'seasonYear: "2026–27"', '2026–27 season-year marker missing');
if (!/lastVerified:\s*"20\d{2}-\d{2}-\d{2}"/.test(freshness)) throw new Error('Hunting authority validation failed: source review date must be ISO and independent of editorial dates');
requireText(freshness, 'editorialUpdatedLabel:', 'editorial update date marker missing');
requireText(freshness, 'not the legal authority', 'independence/legal-authority disclaimer missing');
requireText(sitemap, 'HUNTING_AUTHORITY_PATHS', 'hunting sitemap paths missing');
requireText(huntingRoute, 'getHuntingAuthorityTopicV2', 'v2 route lookup missing');
requireText(huntingHub, 'HUNTING_V2_HUB_GROUPS', 'v2 hub grouping missing');
requireText(huntingHub, 'HUNTING_AUTHORITY_TOPICS_V2', 'v2 hub topic registry missing');
requireText(huntingHub, 'Four decisions before choosing a hunting spot', 'practical access decision framework missing');
requireText(huntingHub, '<HuntingSeasonPlanner />', 'source-driven season planner not mounted on hub');
requireText(huntingHub, 'id="hunting-guides"', 'guide jump anchor missing');
requireText(read('src/components/hunting/HuntingSeasonPlanner.tsx'), 'speciesCalendar.sections', 'TPWD species calendar not reused by planner');
requireText(read('src/components/hunting/HuntingSeasonPlanner.tsx'), 'deerCalendar.rows', 'verified deer dates not reused by planner');
requireText(read('src/components/hunting/HuntingSeasonPlanner.tsx'), 'turkeyCalendar.rows', 'verified turkey dates not reused by planner');
requireText(read('src/components/hunting/HuntingSeasonPlanner.tsx'), 'windowStatus(row, today)', 'source window status handling missing');
requireText(read('src/data/hunting/season-window-status.mjs'), 'return "unknown"', 'unparseable source windows must fail closed');
requireText(huntingHub, 'publicAccessFacts.aphPermitUsd', 'source-backed public hunting permit prices missing');
requireText(huntingHub, 'Matagorda and Wharton', '2026 season change notice missing');
requireText(huntingHub, 'Muzzleloader definition', '2026 revised means-and-methods notice missing');
requireText(huntingHub, 'last season for the printed Public Hunting Lands Map Booklet', 'final printed APH map-booklet advisory missing');
requireText(huntingHub, 'topic.faq.length > 0', 'empty FAQs must not be emitted');
requireText(read('src/components/hunting/HuntingSchema.tsx'), 'topic.faq.length', 'empty FAQPage schema must not be emitted');
requireText(authority, '"texas-deer-hunting": TEXAS_DEER_AUTHORITY_TOPIC', 'researched deer source overwritten');
requireText(authority, 'no hunting license is required', 'private-land feral hog exception missing');
requireText(authorityV2, 'faq: []', 'unreviewed generic species FAQ generation not disabled');
requireText(read('src/brand/texasdefined.ts'), 'label: "Hunting", to: "/hunting"', 'Hunting missing from site navigation');
requireText(huntingMonitorWorkflow, 'schedule:', 'automated TPWD official source checks missing');
requireText(huntingMonitorWorkflow, 'node --test scripts/data/refresh-hunting-official-facts.test.mjs', 'official source contract tests not run');
requireText(huntingMonitorWorkflow, 'gh pr merge --auto --squash', 'safe permit updates must use protected GitHub PR');
requireText(huntingMonitor, 'season-year rollover detected', 'season rollover must fail closed');
requireText(huntingMonitor, 'checkOtherOfficialSources', 'legal-change monitor missing');
requireText(accessFacts, '"aphPermitUsd": 48', 'official APH price source data missing');
requireText(huntingSearch, 'HUNTING_AUTHORITY_TOPICS_V2', 'v2 search registration missing');
requireText(searchImplementation, 'buildHuntingSearchDocuments', 'search document registration missing');
requireText(queries, 'await import("./search-documents-runtime")', 'lazy search runtime registration missing');
requireText(publicRoutes, '"/hunting"', 'indexable /hunting route missing');
requireText(leafOnlyParentRoutes, 'import { Route as huntingRoute } from "@/routes/hunting";', 'hunting leaf-only parent route import missing');
requireText(leafOnlyParentRoutes, '  huntingRoute,', 'hunting parent route is not registered for child Outlet rendering');
requireText(huntingLazyRoute, 'useChildMatches', 'hunting lazy parent must inspect child matches after lazy route loading');
requireText(huntingLazyRoute, 'if (childMatches.length > 0) return <Outlet />;', 'hunting lazy parent must yield child routes at runtime');
requireText(huntingLazyRoute, 'return <HuntingHubPage />;', 'hunting lazy parent must preserve the hub on the leaf /hunting route');

for (const [source, label] of [
  [wildlife, 'wildlife'],
  [resources, 'Texas resources'],
  [fishing, 'fishing'],
  [search, 'search'],
  [outdoors, 'outdoors'],
]) requireRouteLiteral(source, '/hunting', `${label} reciprocal hunting link missing`);
requireText(search, 'Texas Hunting', 'search hunting starting-point label missing');

requireText(huntingTopicRoute, 'createLazyFileRoute("/hunting/$slug")', 'hunting topic route is not lazy');
requireText(huntingTopicPage, 'function HuntingPublicLandDiscovery()', 'public-land discovery bridge missing');
for (const slug of ['public-hunting', 'annual-public-hunting-permit', 'drawn-hunts']) requireText(huntingTopicPage, `"${slug}"`, `WMA discovery missing from ${slug}`);
requireText(huntingTopicPage, 'https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/search.phtml', 'WMA discovery must use official legal-game finder');
if (huntingTopicPage.includes('/search?q=Wildlife%20Management%20Area')) throw new Error('Misleading broad WMA search was reintroduced.');
requireRouteLiteral(huntingTopicPage, '/explore/outdoors', 'WMA discovery lacks canonical Outdoors path');
requireRouteLiteral(huntingTopicPage, '/hunting/annual-public-hunting-permit', 'WMA discovery lacks APH return path');
requireRouteLiteral(huntingTopicPage, '/hunting/public-hunting', 'WMA discovery lacks public-hunting return path');
if (huntingTopicPage.includes('destination-query-runtime') || huntingTopicPage.includes('wildlife-management-area-destinations-wave')) {
  throw new Error('Hunting authority validation failed: WMA discovery reintroduced a destination catalog dependency into the hunting client chunk');
}

requireText(destinationBooking, 'destination.id.startsWith("texas-wma-")', 'destination lazy chunk lacks WMA identity guard');
requireText(destinationBooking, 'function WmaHuntingLinks()', 'WMA reciprocal links are not contained by the existing destination lazy chunk');
for (const routePath of ['/hunting/public-hunting', '/hunting/annual-public-hunting-permit', '/hunting/drawn-hunts']) {
  requireRouteLiteral(destinationBooking, routePath, `WMA destination lacks reciprocal route ${routePath}`);
}

requireText(deployPageSelection, '...huntingAuthorityPages, ...corporateEventPages', 'hunting canaries must precede generic sample budget overflow');
requireText(deployPageSelection, "'/hunting/public-hunting', '/hunting/texas-deer-hunting'", 'bounded hunting canary paths missing');
requireText(productionSmokeWorkflow, 'workflow_dispatch:', 'production acceptance must remain manually available');
requireText(productionSmokeWorkflow, 'pull_request:', 'verifier-only PR changes must test against production before merge');
requireText(productionSmokeWorkflow, "'scripts/data/verify-hunting-production.mjs'", 'production smoke script changes must self-test on main');
requireText(productionSmokeWorkflow, 'node scripts/data/verify-hunting-production.mjs', 'production workflow must execute decoded Node verifier');
requireText(productionSmoke, 'await fetch(', 'production smoke must use decoded Node fetch');
requireText(productionSmoke, 'response.text()', 'production smoke must decode response bodies as text');
requireText(productionSmoke, 'function assertNulsOnlyInsideScripts', 'production smoke must distinguish framework script delimiters from document corruption');
requireText(productionSmoke, 'function extractVisibleText', 'production smoke must assert rendered visible text rather than raw SSR source');
requireText(productionSmoke, ".replace(/<script\\b[^>]*>[\\s\\S]*?<\\/script>/gi, ' ')", 'production smoke must exclude hydration/router script state from visible-text assertions');
requireText(productionSmoke, ".replace(/<style\\b[^>]*>[\\s\\S]*?<\\/style>/gi, ' ')", 'production smoke must exclude style blocks from visible-text assertions');
requireText(productionSmoke, ".replace(/<!--[\\s\\S]*?-->/g, ' ')", 'production smoke must remove hydration comments before visible-text assertions');
requireText(productionSmoke, 'function decodeHtmlEntities', 'production smoke must decode HTML entities before visible-text assertions');
requireText(productionSmoke, "startsWith('<!DOCTYPE html>')", 'production smoke must require an HTML document envelope');
requireText(productionSmoke, "includes('text/html')", 'production smoke must require HTML content type for page checks');
requireText(productionSmoke, 'missing expected rendered text', 'production smoke must fail on absent rendered content');
requireText(productionSmoke, 'More Texas game & small-game coverage', 'production smoke must verify v2 small-game hub group');
requireText(productionSmoke, 'Migratory game bird depth', 'production smoke must verify v2 migratory hub group');
requireText(productionSmoke, 'Fur-bearing animals & trapping', 'production smoke must verify v2 fur-bearer hub group');
for (const slug of v2Topics) requireRouteLiteral(productionSmoke, `/hunting/${slug}`, `production smoke missing v2 route ${slug}`);

for (const redirectOnly of ['/explore/wildlife-management-areas', '/explore/texas-state-parks-guide']) {
  for (const source of [allAuthority, huntingTopicPage, destinationBooking]) {
    if (source.includes(`href: "${redirectOnly}"`) || source.includes(`to="${redirectOnly}"`) || source.includes(`"${redirectOnly}"`)) {
      throw new Error(`Hunting authority validation failed: redirect-only internal route ${redirectOnly} reintroduced`);
    }
  }
}

if (speciesCalendar.sections.length !== 17 || speciesCalendar.sections.reduce((n, s) => n + s.rows.length, 0) !== 37) throw new Error('Species TPWD season calendar missing 17 groups / 37 dates');
if (new Set(speciesCalendar.sections.map(s => s.heading)).size !== 17) throw new Error('Duplicate TPWD season headings');
requireText(huntingHub, '<SpeciesSeasonSnapshot slug={topic.slug} />', 'governed TPWD species dates not visible in guide');
requireText(huntingHub, 'rulesReviewedForSameSeason', '2027 historical legal text requires warning');
requireText(speciesMonitor, 'yearAt(date)', 'season-year boundary not governed');
requireText(speciesMonitor, 'changed zone or season identity', 'TPWD zone drift must fail closed');
requireText(speciesWorkflow, 'schedule:', 'species season dates not scheduled');
requireText(speciesWorkflow, 'gh pr merge --auto --squash', 'verified date-only PR not automatically merged');
requireText(speciesFinisher, 'workflow_run:', 'GitHub token-created date PRs need a trusted automatic finisher');
requireText(speciesFinisher, 'dispatch-validate-branch.sh', 'date-only PRs must run protected exact-branch CI');
requireText(speciesFinisher, 'gh workflow run deploy-production.yml', 'protected date PR merge must dispatch production');
requireText(boundedLiveWorkflow, 'schedule:', 'bounded live hunting checker not scheduled');
requireText(boundedLive, 'cache-bypass', 'canonical/cache-bypass freshness check missing');
for (const workflowSource of [speciesWorkflow, speciesFinisher, boundedLiveWorkflow]) {
  if (/\$\{\s+github\./.test(workflowSource)) throw new Error('Malformed GitHub Actions expression in hunting workflow');
  requireText(workflowSource, '${{ github.', 'hunting workflow lacks valid GitHub Actions expression opening delimiter');
}
console.log(`Hunting authority validation passed: hub + ${expectedTopics.length} topics, v2 coverage, freshness, TPWD sourcing, search/sitemap governance, lazy child-route rendering, reciprocal discovery links, bundle-safe WMA discovery and rendered-text v2 production smoke governance.`);
