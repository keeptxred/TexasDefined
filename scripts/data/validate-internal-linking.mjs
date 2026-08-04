import fs from 'node:fs';

const errors = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const required = [
  'src/platform/internal-linking.ts',
  'src/platform/internal-link-coverage.ts',
  'src/platform/internal-link-memory.ts',
  'src/platform/internal-link-quality.ts',
  'src/platform/internal-link-policies.ts',
  'src/platform/internal-link-policy-history.ts',
  'src/platform/analytics.ts',
  'src/components/content/AutoEntityLinks.tsx',
  'src/components/editorial/ArticleBody.tsx',
  'src/components/guides/PropertyTaxGuidePage.tsx',
  'src/components/admin/InternalLinkMemoryCard.tsx',
  'src/routes/api.internal-links.ts',
  'src/routes/api.internal-link-coverage.ts',
  'src/routes/api.internal-link-quality.ts',
  'src/routes/api.internal-link-policies.ts',
  'src/routes/article.$slug.tsx',
  'src/routes/destination.$slug.tsx',
  'src/routes/$kind.$slug.tsx',
  'src/routes/admin.platform-health.tsx',
];
for (const file of required) if (!fs.existsSync(file)) errors.push(`Missing Phase 2 file: ${file}`);
if (errors.length) fail();

const resolver = read('src/platform/internal-linking.ts');
const coverage = read('src/platform/internal-link-coverage.ts');
const memory = read('src/platform/internal-link-memory.ts');
const quality = read('src/platform/internal-link-quality.ts');
const policies = read('src/platform/internal-link-policies.ts');
const history = read('src/platform/internal-link-policy-history.ts');
const analytics = read('src/platform/analytics.ts');
const memoryCard = read('src/components/admin/InternalLinkMemoryCard.tsx');
const component = read('src/components/content/AutoEntityLinks.tsx');
const articleBody = read('src/components/editorial/ArticleBody.tsx');
const guide = read('src/components/guides/PropertyTaxGuidePage.tsx');
const previewApi = read('src/routes/api.internal-links.ts');
const coverageApi = read('src/routes/api.internal-link-coverage.ts');
const qualityApi = read('src/routes/api.internal-link-quality.ts');
const policyApi = read('src/routes/api.internal-link-policies.ts');
const article = read('src/routes/article.$slug.tsx');
const destination = read('src/routes/destination.$slug.tsx');
const entity = read('src/routes/$kind.$slug.tsx');
const health = read('src/routes/admin.platform-health.tsx');

requireSymbols(resolver, ['resolveInternalEntityLinks','InternalLinkPolicy','minimumScore','ambiguityMargin','contextWindow','InternalLinkTopic','scoreCandidate','rejectedAmbiguous','rejectedLowQuality','entityExposureWeights','maximumExposurePenalty','exposureBalanced'], 'resolver');
requireSymbols(coverage, ['INTERNAL_LINK_SURFACES','internalLinkCoverageSummary','coveragePercent','eligibleSurfaces','activeSurfaces'], 'coverage');
for (const surface of ['articles','destinations','property-tax-guides','entity-pages','county-directory','city-directory']) requireText(coverage, `id:'${surface}'`, `coverage surface ${surface}`);
requireSymbols(memory, ['MEMORY_KEY','MAX_ENTITIES = 250','MAX_COUNT = 1000','recordInternalLinkExposure','internalLinkExposureWeights','internalLinkMemorySummary','overexposed','mostEngaged','unclicked'], 'memory');
requireSymbols(quality, ['INTERNAL_LINK_QUALITY_THRESHOLDS','minimumCoveragePercent: 100','maximumAmbiguousAliasPercent','maximumOrphanEntityPercent','maximumUnverifiedEntityPercent','auditInternalLinkQuality'], 'quality');
requireSymbols(policies, ['INTERNAL_LINK_POLICY_VERSION','INTERNAL_LINK_POLICY_REVIEWED_AT','INTERNAL_LINK_POLICIES','policyForSurface','validateInternalLinkPolicies','internalLinkPolicyFingerprint','pageBudget','blockBudget','minimumScore','ambiguityMargin'], 'policies');
for (const surface of ['article','destination','property-tax-guide','entity-page']) requireText(policies, `'${surface}'`, `governed route policy ${surface}`);
requireSymbols(history, ['INTERNAL_LINK_POLICY_HISTORY','currentInternalLinkPolicyRelease','validateInternalLinkPolicyHistory','changeType','fingerprint: internalLinkPolicyFingerprint()'], 'policy history');
requireSymbols(component, ['data-entity-id','data-entity-kind','data-link-score','data-link-reasons','resolveInternalEntityLinks'], 'link component');
requireSymbols(analytics, ['internal_link_shown','internal_link_clicked','IntersectionObserver','recordInternalLinkExposure'], 'analytics');
requireSymbols(memoryCard, ['internalLinkMemorySummary','Tracked entities','Link impressions','Most exposed','Most engaged','Shown but unclicked'], 'memory health card');
requireSymbols(articleBody, ['INTERNAL_LINK_POLICIES.article',"policyForSurface('article')",'articlePolicy.pageBudget','articlePolicy.blockBudget'], 'article policy integration');
requireSymbols(guide, ["INTERNAL_LINK_POLICIES['property-tax-guide']","policyForSurface('property-tax-guide')",'surfacePolicy.pageBudget','surfacePolicy.blockBudget','data-link-score'], 'property-tax policy integration');
requireSymbols(destination, ["INTERNAL_LINK_POLICIES.destination","policyForSurface('destination')",'surfacePolicy.pageBudget','surfacePolicy.blockBudget','excludedEntityIds'], 'destination policy integration');
requireSymbols(previewApi, ["createFileRoute('/api/internal-links')",'50000','diagnostics','entityExposureWeights','exposureWeightsApplied','x-robots-tag'], 'preview API');
requireSymbols(coverageApi, ["createFileRoute('/api/internal-link-coverage')",'internalLinkCoverageSummary','x-robots-tag','no-store'], 'coverage API');
requireSymbols(qualityApi, ["createFileRoute('/api/internal-link-quality')",'auditInternalLinkQuality','INTERNAL_LINK_QUALITY_THRESHOLDS','x-robots-tag','no-store'], 'quality API');
requireSymbols(policyApi, ["createFileRoute('/api/internal-link-policies')",'INTERNAL_LINK_POLICY_HISTORY','currentInternalLinkPolicyRelease','validateInternalLinkPolicyHistory','x-robots-tag','no-store'], 'policy API');
requireText(article, 'ArticleBody blocks={article.body} entities={graph}', 'article internal-link activation');
requireSymbols(destination, ['AutoEntityLinks','loadTexasKnowledgeGraph','excludedEntityIds'], 'destination linking');
requireSymbols(entity, ['AutoEntityLinks','relatedEntities','excludedEntityIds: [entity.id]'], 'entity-page linking');
requireSymbols(health, ['validateInternalLinkPolicies','Governed internal-link policies','Page budget','Ambiguity margin','Link policies'], 'Platform Health policy governance');

if (errors.length) fail();
console.log('Phase 2 internal linking, governed policy releases, intelligent scoring, exposure balancing, quality thresholds, bounded memory, analytics, and coverage reporting are protected.');

function requireSymbols(source, symbols, area) {
  for (const symbol of symbols) if (!source.includes(symbol)) errors.push(`${area} feature missing: ${symbol}`);
}
function requireText(source, text, label) {
  if (!source.includes(text)) errors.push(`Missing ${label}.`);
}
function fail() {
  console.error('Phase 2 internal-linking validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
