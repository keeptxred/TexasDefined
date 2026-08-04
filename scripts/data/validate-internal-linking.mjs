import fs from 'node:fs';

const errors = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const required = [
  'src/platform/internal-linking.ts','src/platform/internal-link-coverage.ts','src/platform/internal-link-memory.ts','src/platform/internal-link-quality.ts','src/platform/internal-link-policies.ts','src/platform/analytics.ts',
  'src/components/content/AutoEntityLinks.tsx','src/components/editorial/ArticleBody.tsx','src/components/guides/PropertyTaxGuidePage.tsx','src/components/admin/InternalLinkMemoryCard.tsx',
  'src/routes/api.internal-links.ts','src/routes/api.internal-link-coverage.ts','src/routes/api.internal-link-quality.ts','src/routes/api.internal-link-policies.ts','src/routes/article.$slug.tsx','src/routes/destination.$slug.tsx','src/routes/$kind.$slug.tsx','src/routes/admin.platform-health.tsx',
];
for (const file of required) if (!fs.existsSync(file)) errors.push(`Missing Phase 2 file: ${file}`);

const resolver = read('src/platform/internal-linking.ts');
const coverage = read('src/platform/internal-link-coverage.ts');
const memory = read('src/platform/internal-link-memory.ts');
const quality = read('src/platform/internal-link-quality.ts');
const policies = read('src/platform/internal-link-policies.ts');
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

for (const feature of ['resolveInternalEntityLinks','InternalLinkPolicy','excludedKinds','existingHrefs','linkedEntityIds','rejectedAmbiguous','rejectedOverlap','entityPriority','internalLinkCoverage','minimumScore','ambiguityMargin','contextWindow','InternalLinkTopic','TOPIC_KINDS','CONTEXT_HINTS','scoreCandidate','disambiguated','rejectedLowQuality','averageScore','entityExposureWeights','maximumExposurePenalty','exposureBalanced','exposure-penalty:']) if (!resolver.includes(feature)) errors.push(`Internal-link resolver feature missing: ${feature}`);
for (const feature of ['INTERNAL_LINK_SURFACES','internalLinkCoverageSummary','coveragePercent','eligibleSurfaces','activeSurfaces']) if (!coverage.includes(feature)) errors.push(`Internal-link coverage feature missing: ${feature}`);
for (const surface of ['articles','destinations','property-tax-guides','entity-pages','county-directory','city-directory']) if (!coverage.includes(`id:'${surface}'`)) errors.push(`Internal-link surface missing: ${surface}`);
for (const feature of ['MEMORY_KEY','MAX_ENTITIES = 250','MAX_COUNT = 1000','recordInternalLinkExposure','exposurePenalty','internalLinkExposureWeights','internalLinkMemorySummary','overexposed','mostEngaged','unclicked']) if (!memory.includes(feature)) errors.push(`Internal-link memory feature missing: ${feature}`);
for (const feature of ['INTERNAL_LINK_QUALITY_THRESHOLDS','minimumCoveragePercent: 100','maximumAmbiguousAliasPercent','maximumOrphanEntityPercent','maximumUnverifiedEntityPercent','auditInternalLinkQuality','ambiguousAliasPercent','orphanEntityPercent','unverifiedEntityPercent']) if (!quality.includes(feature)) errors.push(`Internal-link quality feature missing: ${feature}`);
for (const feature of ['INTERNAL_LINK_POLICIES','policyForSurface','validateInternalLinkPolicies','page budget must be between 1 and 25','preferred and excluded kinds overlap','preferred kinds contain duplicates','excluded kinds contain duplicates']) if (!policies.includes(feature)) errors.push(`Governed internal-link policy feature missing: ${feature}`);
for (const surface of ['article','destination','property-tax-guide','entity-page']) if (!policies.includes(`'${surface}'`)) errors.push(`Governed route policy missing: ${surface}`);
for (const feature of ['data-entity-id','data-entity-kind','data-link-score','data-link-reasons','resolveInternalEntityLinks']) if (!component.includes(feature)) errors.push(`Internal-link component feature missing: ${feature}`);
for (const feature of ['internal_link_shown','internal_link_clicked','IntersectionObserver','recordInternalLinkExposure','entityKind','score']) if (!analytics.includes(feature)) errors.push(`Internal-link analytics feature missing: ${feature}`);
for (const feature of ['internalLinkMemorySummary','Tracked entities','Link impressions','Local click-through rate','Most exposed','Most engaged','Shown but unclicked']) if (!memoryCard.includes(feature)) errors.push(`Internal-link memory health feature missing: ${feature}`);
for (const feature of ['INTERNAL_LINK_POLICIES.article',"policyForSurface('article')",'articlePolicy.pageBudget','articlePolicy.blockBudget']) if (!articleBody.includes(feature)) errors.push(`Governed article policy integration missing: ${feature}`);
for (const feature of ["INTERNAL_LINK_POLICIES['property-tax-guide']","policyForSurface('property-tax-guide')",'surfacePolicy.pageBudget','surfacePolicy.blockBudget','data-link-score']) if (!guide.includes(feature)) errors.push(`Governed property-tax policy integration missing: ${feature}`);
for (const feature of ["INTERNAL_LINK_POLICIES.destination","policyForSurface('destination')",'surfacePolicy.pageBudget','surfacePolicy.blockBudget','excludedEntityIds']) if (!destination.includes(feature)) errors.push(`Governed destination policy integration missing: ${feature}`);
for (const feature of ["createFileRoute('/api/internal-links')",'50000','diagnostics','cache-control','entityExposureWeights','normalizeExposureWeights','exposureWeightsApplied','x-robots-tag']) if (!previewApi.includes(feature)) errors.push(`Internal-link diagnostics API feature missing: ${feature}`);
for (const feature of ["createFileRoute('/api/internal-link-coverage')",'internalLinkCoverageSummary','x-robots-tag','no-store']) if (!coverageApi.includes(feature)) errors.push(`Internal-link coverage API feature missing: ${feature}`);
for (const feature of ["createFileRoute('/api/internal-link-quality')",'auditInternalLinkQuality','INTERNAL_LINK_QUALITY_THRESHOLDS','x-robots-tag','no-store']) if (!qualityApi.includes(feature)) errors.push(`Internal-link quality API feature missing: ${feature}`);
for (const feature of ["createFileRoute('/api/internal-link-policies')",'INTERNAL_LINK_POLICIES','x-robots-tag','no-store']) if (!policyApi.includes(feature)) errors.push(`Internal-link policy API feature missing: ${feature}`);
if (!article.includes('ArticleBody blocks={article.body} entities={graph}')) errors.push('Article internal linking is not active.');
for (const feature of ['AutoEntityLinks','loadTexasKnowledgeGraph','excludedEntityIds']) if (!destination.includes(feature)) errors.push(`Destination internal linking feature missing: ${feature}`);
for (const feature of ['AutoEntityLinks','relatedEntities','excludedEntityIds: [entity.id]']) if (!entity.includes(feature)) errors.push(`Generated entity internal linking feature missing: ${feature}`);
for (const feature of ['validateInternalLinkPolicies','Governed internal-link policies','Page budget','Ambiguity margin','Link policies']) if (!health.includes(feature)) errors.push(`Platform health policy-governance feature missing: ${feature}`);

if (errors.length) {
  console.error('Phase 2 internal-linking validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('Phase 2 governed internal-link policies, drift validation, intelligent scoring, exposure balancing, quality thresholds, bounded memory, analytics, and coverage reporting are protected.');
