import fs from 'node:fs';

const errors = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const readRouteSurface = (file) => {
  const eagerSource = read(file);
  const lazyFile = file.replace(/\.tsx$/, '.lazy.tsx');
  return fs.existsSync(lazyFile) ? `${eagerSource}\n${read(lazyFile)}` : eagerSource;
};
const required = [
  'src/platform/internal-linking.ts','src/platform/internal-link-coverage.ts','src/platform/internal-link-memory.ts','src/platform/internal-link-quality.ts','src/platform/internal-link-policies.ts','src/platform/internal-link-policy-history.ts','src/platform/internal-link-policy-diff.ts','src/platform/analytics.ts',
  'src/components/content/AutoEntityLinks.tsx','src/components/editorial/ArticleBody.tsx','src/components/guides/PropertyTaxGuidePage.tsx','src/components/directories/TexasPlaceDirectory.tsx','src/components/admin/InternalLinkMemoryCard.tsx','src/components/admin/InternalLinkPolicyHistory.tsx','src/components/admin/InternalLinkRollbackPreview.tsx','src/components/events/EventsLandingPage.tsx',
  'src/routes/api.internal-links.ts','src/routes/api.internal-link-coverage.ts','src/routes/api.internal-link-quality.ts','src/routes/api.internal-link-policies.ts','src/routes/api.internal-link-policy-rollback.ts','src/routes/article.$slug.tsx','src/routes/destination.$slug.tsx','src/routes/$kind.$slug.tsx','src/routes/county.tsx','src/routes/county.lazy.tsx','src/routes/events.tsx','src/routes/events.lazy.tsx','src/routes/guides.tsx','src/routes/admin.platform-health.tsx','src/routes/admin.platform-health.lazy.tsx','src/routes/admin.internal-link-rollback.tsx','src/routes/admin.internal-link-rollback.lazy.tsx',
  'src/components/fishing/FishingHub.tsx','src/components/fishing/ShowcaseLakeGuide.tsx','src/components/fishing/FishingSpeciesProfile.tsx','src/components/fishing/FishingTechniqueProfile.tsx','src/routes/moving-to-texas.lazy.tsx','src/routes/texas-vs.$state.tsx','src/routes/compare-texas-cities_.$pair.lazy.tsx',
];
for (const file of required) if (!fs.existsSync(file)) errors.push(`Missing Phase 2 file: ${file}`);
if (errors.length) fail();

const files = Object.fromEntries(required.map((path) => [path, read(path)]));
const resolver = files['src/platform/internal-linking.ts'];
const coverage = files['src/platform/internal-link-coverage.ts'];
const memory = files['src/platform/internal-link-memory.ts'];
const quality = files['src/platform/internal-link-quality.ts'];
const policies = files['src/platform/internal-link-policies.ts'];
const history = files['src/platform/internal-link-policy-history.ts'];
const diff = files['src/platform/internal-link-policy-diff.ts'];
const analytics = files['src/platform/analytics.ts'];
const component = files['src/components/content/AutoEntityLinks.tsx'];
const articleBody = files['src/components/editorial/ArticleBody.tsx'];
const guide = files['src/components/guides/PropertyTaxGuidePage.tsx'];
const cityDirectory = files['src/components/directories/TexasPlaceDirectory.tsx'];
const memoryCard = files['src/components/admin/InternalLinkMemoryCard.tsx'];
const historyCard = files['src/components/admin/InternalLinkPolicyHistory.tsx'];
const rollbackCard = files['src/components/admin/InternalLinkRollbackPreview.tsx'];
const previewApi = files['src/routes/api.internal-links.ts'];
const coverageApi = files['src/routes/api.internal-link-coverage.ts'];
const qualityApi = files['src/routes/api.internal-link-quality.ts'];
const policyApi = files['src/routes/api.internal-link-policies.ts'];
const rollbackApi = files['src/routes/api.internal-link-policy-rollback.ts'];
const article = files['src/routes/article.$slug.tsx'];
const destination = files['src/routes/destination.$slug.tsx'];
const entity = readRouteSurface('src/routes/$kind.$slug.tsx');
const countyIndex = readRouteSurface('src/routes/county.tsx');
const eventsHub = `${readRouteSurface('src/routes/events.index.tsx')}\n${files['src/components/events/EventsLandingPage.tsx']}`;
const guidesIndex = readRouteSurface('src/routes/guides.tsx');
const health = `${files['src/routes/admin.platform-health.tsx']}\n${files['src/routes/admin.platform-health.lazy.tsx']}`;
const rollbackPage = `${files['src/routes/admin.internal-link-rollback.tsx']}\n${files['src/routes/admin.internal-link-rollback.lazy.tsx']}`;
const fishingHub = files['src/components/fishing/FishingHub.tsx'];
const fishingLake = files['src/components/fishing/ShowcaseLakeGuide.tsx'];
const fishingSpecies = files['src/components/fishing/FishingSpeciesProfile.tsx'];
const fishingTechnique = files['src/components/fishing/FishingTechniqueProfile.tsx'];
const relocationHub = files['src/routes/moving-to-texas.lazy.tsx'];
const relocationState = files['src/routes/texas-vs.$state.tsx'];
const relocationPair = files['src/routes/compare-texas-cities_.$pair.lazy.tsx'];

requireSymbols(resolver, ['resolveInternalEntityLinks','InternalLinkPolicy','minimumScore','ambiguityMargin','contextWindow','scoreCandidate','countyLabelHasExplicitContext','rejectedAmbiguous','rejectedLowQuality','entityExposureWeights','maximumExposurePenalty','exposureBalanced'], 'resolver');
requireSymbols(coverage, ['INTERNAL_LINK_SURFACES','internalLinkCoverageSummary','coveragePercent','eligibleSurfaces','activeSurfaces'], 'coverage');
requireSymbols(memory, ['MAX_ENTITIES = 250','MAX_COUNT = 1000','recordInternalLinkExposure','internalLinkExposureWeights','internalLinkMemorySummary','overexposed','mostEngaged','unclicked'], 'memory');
requireSymbols(quality, ['INTERNAL_LINK_QUALITY_THRESHOLDS','minimumCoveragePercent: 100','auditInternalLinkQuality'], 'quality');
requireSymbols(policies, ['INTERNAL_LINK_POLICY_VERSION','INTERNAL_LINK_POLICY_REVIEWED_AT','INTERNAL_LINK_POLICIES','policyForSurface','validateInternalLinkPolicies','internalLinkPolicyFingerprint'], 'policies');
requireSymbols(history, ['POLICY_2_0_0_SNAPSHOT','snapshot: POLICY_2_0_0_SNAPSHOT',"fingerprint: 'fnv1a-",'fingerprintSnapshot(release.snapshot)','policySnapshotForVersion','rollbackContextForVersion','cloneSnapshot'], 'immutable policy history');
if (history.includes('fingerprint: internalLinkPolicyFingerprint()')) errors.push('Policy history still recomputes a historical fingerprint from active policies.');
requireSymbols(diff, ['diffInternalLinkPolicySnapshots','previewInternalLinkPolicyRollback','changeCount','targetSnapshot','structuredClone'], 'rollback diff service');
requireSymbols(component, ['data-entity-id','data-entity-kind','data-link-score','data-link-reasons'], 'link component');
requireSymbols(analytics, ['internal_link_shown','internal_link_clicked','IntersectionObserver','recordInternalLinkExposure'], 'analytics');
requireSymbols(memoryCard, ['Tracked entities','Link impressions','Most exposed','Most engaged','Shown but unclicked'], 'memory health card');
requireSymbols(historyCard, ['Current release','Change class','fingerprintMatches'], 'policy history card');
requireSymbols(rollbackCard, ['previewInternalLinkPolicyRollback','Internal-link policy rollback preview','preview only','changeCount'], 'rollback preview card');
requireSymbols(articleBody, ['INTERNAL_LINK_POLICIES.article',"policyForSurface('article')",'articlePolicy.pageBudget','countyLabelHasExplicitContext'], 'article integration');
requireSymbols(guide, ["INTERNAL_LINK_POLICIES['property-tax-guide']","policyForSurface('property-tax-guide')",'surfacePolicy.pageBudget'], 'guide integration');
requireSymbols(destination, ['INTERNAL_LINK_POLICIES.destination','policyForSurface','destinationPolicy','excludedEntityIds','surfacePolicy.pageBudget'], 'destination integration');
requireSymbols(previewApi, ["createFileRoute('/api/internal-links')",'50000','entityExposureWeights','x-robots-tag'], 'preview API');
requireSymbols(coverageApi, ["createFileRoute('/api/internal-link-coverage')",'no-store'], 'coverage API');
requireSymbols(qualityApi, ["createFileRoute('/api/internal-link-quality')",'no-store'], 'quality API');
requireSymbols(policyApi, ["createFileRoute('/api/internal-link-policies')",'INTERNAL_LINK_POLICY_HISTORY','no-store'], 'policy API');
requireSymbols(rollbackApi, ["createFileRoute('/api/internal-link-policy-rollback')",'preview-only','previewInternalLinkPolicyRollback','no-store','noindex, nofollow'], 'rollback preview API');
requireText(article, 'ArticleBody blocks={article.body} entities={graph}', 'article internal-link activation');
requireSymbols(destination, ['AutoEntityLinks','loadTexasKnowledgeGraph'], 'destination linking');
requireSymbols(entity, ['AutoEntityLinks','relatedEntities','excludedEntityIds: [entity.id]'], 'entity linking');
requireSymbols(health, ['InternalLinkPolicyHistory','Governed internal-link policies','Rollback operations','/admin/internal-link-rollback','Preview rollback'], 'Platform Health rollback governance');
requireSymbols(rollbackPage, ["createFileRoute('/admin/internal-link-rollback')",'InternalLinkRollbackPreview','noindex,nofollow','read-only','/admin/platform-health','Return to Platform Health'], 'rollback admin page');

const expectedActiveSurfaces = [
  'articles',
  'destinations',
  'property-tax-guides',
  'entity-pages',
  'county-guides',
  'city-directory',
  'county-directory',
  'event-guides',
  'events-hub',
  'guide-index',
  'fishing-hub',
  'fishing-lake-guides',
  'fishing-species-guides',
  'fishing-technique-guides',
  'relocation-hub',
  'relocation-state-comparisons',
  'relocation-city-comparisons',
];
const activeSurfaceIds = [...coverage.matchAll(/id:'([^']+)'[^\n]+status:'active'/g)].map((match) => match[1]);
for (const id of expectedActiveSurfaces) {
  if (!activeSurfaceIds.includes(id)) errors.push(`Sitewide semantic-link coverage must count active surface: ${id}`);
}
if (activeSurfaceIds.length < expectedActiveSurfaces.length) errors.push(`Sitewide semantic-link coverage tracks only ${activeSurfaceIds.length} active surfaces; expected at least ${expectedActiveSurfaces.length}.`);
for (const staleRoute of ["routePattern:'/city'", "routePattern:'/category'", "routePattern:'/browse/counties/all'", "routePattern:'/browse/towns/all'"]) {
  if (coverage.includes(staleRoute)) errors.push(`Internal-link coverage inventory references stale or nonexistent route ${staleRoute.replace('routePattern:', '')}.`);
}
const notApplicableIds = [...coverage.matchAll(/id:'([^']+)'[^\n]+status:'not-applicable'/g)].map((match) => match[1]);
for (const id of notApplicableIds) {
  if (!['shop', 'admin'].includes(id)) errors.push(`Public authority surface ${id} must not be hidden from the coverage denominator as not-applicable.`);
}

requireSymbols(cityDirectory, [
  'countySlugForCity',
  'TEXAS_COUNTIES.find',
  'to="/$kind/$slug"',
  'params={{ kind: "county", slug: countySlugForCity(city.county) }}',
  'Explore {city.county} County →',
], 'city → county authority linking');
requireSymbols(countyIndex, [
  'createLazyFileRoute("/county")',
  'TEXAS_COUNTIES',
  'params={{ kind: "county", slug: county.slug }}',
  'All 254 Texas county guides',
], 'county authority index');
requireSymbols(eventsHub, [
  'majorEventGuides.map',
  'to="/event/$slug"',
  'eventTopicLinks.map',
  'eventRegionLinks.map',
  'Major Texas event guides',
], 'events authority hub');
requireSymbols(guidesIndex, [
  'createFileRoute("/guides")',
], 'guide index');

requireSymbols(fishingHub, [
  'to="/fishing/species"',
  'to="/fishing/lakes"',
  'href="/fishing/techniques"',
  'href="/fishing/reports"',
  'href="/fishing/access"',
  'href="/fishing/guides"',
], 'fishing hub linking');
requireSymbols(fishingLake, [
  'fishingFoundationAnchor("species"',
  'fishingTechniqueCanonicalPath',
  'pageData.sections.map',
  'section === "reports"',
  'section === "guides"',
  'Explore More Texas Fishing Lakes',
  'to="/fishing/lakes"',
], 'fishing lake guide linking');
requireSymbols(fishingSpecies, [
  'Find lakes for',
  'data.lakes.map',
  '/fishing/techniques/',
  'data.relatedSpecies.map',
  'href="/fishing/reports"',
  'href="/fishing/regulations"',
], 'fishing species linking');
requireSymbols(fishingTechnique, [
  'Texas Lakes Covered in This Guide',
  'fishingFoundationAnchor("lake"',
  'fishingFoundationAnchor("species"',
  'relatedTechniques.map',
  'href="/fishing/reports"',
  'href="/fishing/seasons"',
], 'fishing technique linking');
requireSymbols(relocationHub, [
  'priorityOriginStates',
  'RELOCATION_CITY_PAIRS.map',
  'to="/browse/cities"',
  'href="/browse/counties"',
  'to="/texas-moving-cost-calculator"',
  'to="/texas-home-affordability-calculator"',
], 'relocation hub linking');
requireSymbols(relocationState, [
  'relatedStates.map',
  'to="/texas-vs/$state"',
  'to="/moving-to-texas-checklist"',
  'to="/compare-texas-cities"',
  'to="/browse/cities"',
  'to="/browse/counties"',
], 'relocation state comparison linking');
requireSymbols(relocationPair, [
  'RELOCATION_CITY_PAIRS.filter',
  'relocationCityPairPath',
  'to="/compare-texas-cities"',
  'to="/moving-to-texas"',
  'to="/browse/cities"',
  'to="/browse/counties"',
], 'relocation city comparison linking');

if (errors.length) fail();
console.log('Phase 2 internal linking, honest sitewide semantic-surface coverage, city-to-county authority edges, county and events hubs, immutable policy releases, discoverable read-only rollback previews, intelligent scoring, explicit county context, exposure balancing, analytics, and quality governance are protected.');

function requireSymbols(source, symbols, area) { for (const symbol of symbols) if (!source.includes(symbol)) errors.push(`${area} feature missing: ${symbol}`); }
function requireText(source, text, label) { if (!source.includes(text)) errors.push(`Missing ${label}.`); }
function fail() { console.error('Phase 2 internal-linking validation failed:'); for (const error of errors) console.error(`- ${error}`); process.exit(1); }
