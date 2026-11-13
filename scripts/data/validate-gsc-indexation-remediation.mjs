import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const exploreSitemap = fs.readFileSync('src/routes/sitemap-explore[.]xml.ts', 'utf8');
const partnerRoute = fs.readFileSync('src/routes/partner-with-us.tsx', 'utf8');
const partnerForm = fs.readFileSync('src/routes/partner-with-us.lazy.tsx', 'utf8');
const publicRoutes = fs.readFileSync('src/lib/public-routes.ts', 'utf8');
const eventsRoute = fs.readFileSync('src/routes/events.index.tsx', 'utf8');
const eventsHead = fs.readFileSync('src/data/major-event-directory.ts', 'utf8');
const eventsServerHead = fs.readFileSync('src/data/major-event-directory.server.ts', 'utf8');
const eventsUi = fs.readFileSync('src/components/events/EventsLandingPage.tsx', 'utf8');
const eventsStyles = fs.readFileSync('src/components/events/events-landing.css', 'utf8');
const corporateEvents = fs.readFileSync('src/routes/corporate-events.tsx', 'utf8');
const taxEstimator = fs.readFileSync('src/routes/texas-property-tax-estimator.tsx', 'utf8');
const relocationDocs = fs.readFileSync('docs/relocation-tools.md', 'utf8');
const failures = [];

function requireText(source, marker, message) {
  if (!source.includes(marker)) failures.push(message);
}

requireText(
  sitemap,
  'const indexableLocalArticles = articles.filter((article) => !isLegacyCountySeriesArticle(article.slug) && isArticleIndexReady(article));',
  'Primary sitemap must create its local article cohort from the strict full-page index-readiness gate.',
);
requireText(
  sitemap,
  '...indexableLocalArticles.map((article) => ({ path: `/article/${article.slug}`',
  'Primary sitemap must publish the strict index-ready local article cohort.',
);
requireText(
  sitemap,
  'const discoveryOnlyLocalArticlePaths = [',
  'Primary sitemap must retain an explicit diagnostic cohort for discovery-ready but non-index-ready articles.',
);
requireText(
  sitemap,
  'Primary sitemap omitted ${discoveryOnlyLocalArticlePaths.length} discovery-only article URLs that are not fully index-ready.',
  'Primary sitemap must make discovery-only URL pruning observable in server logs.',
);

const entriesBlock = sitemap.match(/const entries: SitemapEntry\[\] = \[([\s\S]*?)\n\s*\];/)?.[1] ?? '';
if (!entriesBlock) failures.push('Could not parse the primary sitemap entries block.');
else {
  if (entriesBlock.includes('isArticleDiscoveryReady')) {
    failures.push('Discovery-only article readiness must never be used directly inside the primary sitemap entries block.');
  }
  if (entriesBlock.includes('discoveryOnlyLocalArticlePaths')) {
    failures.push('Discovery-only article diagnostic paths must not be submitted in the primary sitemap.');
  }
}

requireText(
  exploreSitemap,
  '+ indexableDestinations.filter((destination) => destination.category === slug).length',
  'Explore category sitemap readiness must count only index-ready destination profiles.',
);
if (exploreSitemap.includes('+ destinations.filter((destination) => destination.category === slug).length')) {
  failures.push('Explore category sitemap readiness must not be inflated by destination profiles that fail the indexing quality gate.');
}

// The October GSC example included both type/source and partnershipType/sourcePath.
// Route validation must preserve form attribution but avoid manufacturing alias
// query keys. All variants must point to the same clean, indexable canonical URL.
requireText(partnerRoute, "const canonicalPath = '/partner-with-us'", 'Partner route must own the clean canonical path.');
requireText(partnerRoute, 'links: [canonicalLink(texasDefinedBrand, canonicalPath)]', 'Partner route must emit an explicit clean canonical in SSR head.');
requireText(partnerRoute, 'validateSearch: parsePartnerSearch', 'Partner route must use the normalized query parser.');
requireText(partnerForm, 'search.type', 'Partner inquiry form must read the canonical type query key.');
requireText(partnerForm, 'search.source', 'Partner inquiry form must read the canonical source query key.');
requireText(publicRoutes, '"/partner-with-us"', 'Public route registry must retain the clean partner URL.');
if (partnerForm.includes('search.partnershipType') || partnerForm.includes('search.sourcePath')) {
  failures.push('Partner form must not reuse the redundant legacy query aliases.');
}
if (sitemap.includes('/partner-with-us?') || exploreSitemap.includes('/partner-with-us?')) {
  failures.push('Do not publish parameterized partner inquiry URLs in a sitemap.');
}
const partnerQueryTests = spawnSync(
  process.execPath,
  ['--experimental-strip-types', '--test', 'scripts/data/partner-search.test.mjs'],
  { encoding: 'utf8' },
);
if (partnerQueryTests.status !== 0) {
  failures.push('Partner query normalization regression tests failed: ' + (partnerQueryTests.stderr || partnerQueryTests.stdout || partnerQueryTests.error?.message || 'unknown failure').slice(-1800));
}

// GSC 'Alternate page with proper canonical tag' samples are intentional filter
// and planner prefill URLs, not 500 missing articles. Keep the clean landing
// canonical and prevent the events calendar from publishing thousands of
// crawlable daily/month/venue combinations through SSR anchor links.
for (const [source, token, label] of [
  [eventsRoute, 'filtered: hasEventSearch(normalizedSearch)', 'Event filter detection'],
  [eventsHead, 'content: "noindex, follow"', 'Filtered events indexability'],
  [eventsServerHead, 'links: [canonicalLink(texasDefinedBrand, canonicalPath)]', 'Events canonical'],
  [corporateEvents, "const canonicalPath = '/corporate-events'", 'Corporate-events canonical'],
  [taxEstimator, "const canonicalPath='/texas-property-tax-estimator'", 'Tax-estimator canonical'],
  [relocationDocs, 'The canonical hub is \`/moving-to-texas\`', 'Relocation canonical policy'],
  [eventsUi, 'function CalendarNavigationButton(', 'Non-crawlable calendar navigation'],
  [eventsUi, 'onClick={() => window.location.assign(href)}', 'Shareable calendar deep links'],
  [eventsUi, 'aria-current={current ? "date" : undefined}', 'Accessible selected calendar day'],
  [eventsUi, 'calendarView.calendarDays.map((day) => <CalendarNavigationButton', 'Calendar days must be controls'],
  [eventsUi, '<CalendarNavigationButton href={calendarView.previousHref}', 'Previous-month controls'],
  [eventsUi, '<CalendarNavigationButton href={calendarView.nextHref}', 'Next-month controls'],
  [eventsUi, 'event.guidePath?.startsWith("/events?") ? <CalendarNavigationButton', 'Filtered event result navigation'],
  [eventsStyles, '.ev-day:focus-visible', 'Keyboard focus on calendar dates'],
]) requireText(source, token, label + ' must remain intact.');
for (const forbidden of ['<a href={calendarView.previousHref}', '<a href={calendarView.nextHref}', '<a key={day.date} href={day.href}', '<a href={calendarView.nextEventHref}']) {
  if (eventsUi.includes(forbidden)) failures.push('Unbounded crawlable event filter link reintroduced: ' + forbidden);
}
if (sitemap.includes('/events?') || exploreSitemap.includes('/events?') || sitemap.includes('/corporate-events?')) {
  failures.push('Do not list filtered event or corporate event URLs in the sitemap.');
}

if (failures.length) {
  console.error('GSC indexation remediation validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('GSC indexation remediation validation passed: strict sitemap readiness, clean partner canonical, and query attribution regression tests.');
