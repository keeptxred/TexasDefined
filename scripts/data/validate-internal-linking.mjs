import fs from 'node:fs';

const errors = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const required = [
  'src/platform/internal-linking.ts','src/platform/internal-link-coverage.ts','src/platform/internal-link-memory.ts','src/platform/analytics.ts',
  'src/components/content/AutoEntityLinks.tsx','src/components/editorial/ArticleBody.tsx','src/components/guides/PropertyTaxGuidePage.tsx','src/components/admin/InternalLinkMemoryCard.tsx',
  'src/routes/api.internal-links.ts','src/routes/api.internal-link-coverage.ts','src/routes/article.$slug.tsx','src/routes/destination.$slug.tsx','src/routes/$kind.$slug.tsx','src/routes/admin.platform-health.tsx',
];
for (const file of required) if (!fs.existsSync(file)) errors.push(`Missing Phase 2 file: ${file}`);

const resolver = read('src/platform/internal-linking.ts');
const coverage = read('src/platform/internal-link-coverage.ts');
const memory = read('src/platform/internal-link-memory.ts');
const analytics = read('src/platform/analytics.ts');
const memoryCard = read('src/components/admin/InternalLinkMemoryCard.tsx');
const component = read('src/components/content/AutoEntityLinks.tsx');
const articleBody = read('src/components/editorial/ArticleBody.tsx');
const guide = read('src/components/guides/PropertyTaxGuidePage.tsx');
const previewApi = read('src/routes/api.internal-links.ts');
const coverageApi = read('src/routes/api.internal-link-coverage.ts');
const article = read('src/routes/article.$slug.tsx');
const destination = read('src/routes/destination.$slug.tsx');
const entity = read('src/routes/$kind.$slug.tsx');
const health = read('src/routes/admin.platform-health.tsx');

for (const feature of ['resolveInternalEntityLinks','InternalLinkPolicy','excludedKinds','existingHrefs','linkedEntityIds','rejectedAmbiguous','rejectedOverlap','entityPriority','internalLinkCoverage','minimumScore','ambiguityMargin','contextWindow','InternalLinkTopic','TOPIC_KINDS','CONTEXT_HINTS','scoreCandidate','disambiguated','rejectedLowQuality','averageScore']) if (!resolver.includes(feature)) errors.push(`Internal-link resolver feature missing: ${feature}`);
for (const feature of ['INTERNAL_LINK_SURFACES','internalLinkCoverageSummary','coveragePercent','eligibleSurfaces','activeSurfaces']) if (!coverage.includes(feature)) errors.push(`Internal-link coverage feature missing: ${feature}`);
for (const surface of ['articles','destinations','property-tax-guides','entity-pages','county-directory','city-directory']) if (!coverage.includes(`id:'${surface}'`)) errors.push(`Internal-link surface missing: ${surface}`);
for (const feature of ['MEMORY_KEY','MAX_ENTITIES = 250','MAX_COUNT = 1000','recordInternalLinkExposure','exposurePenalty','internalLinkMemorySummary']) if (!memory.includes(feature)) errors.push(`Internal-link memory feature missing: ${feature}`);
for (const feature of ['data-entity-id','data-entity-kind','data-link-score','data-link-reasons','resolveInternalEntityLinks']) if (!component.includes(feature)) errors.push(`Internal-link component feature missing: ${feature}`);
for (const feature of ['internal_link_shown','internal_link_clicked','IntersectionObserver','recordInternalLinkExposure','entityKind','score']) if (!analytics.includes(feature)) errors.push(`Internal-link analytics feature missing: ${feature}`);
for (const feature of ['internalLinkMemorySummary','Tracked entities','Link impressions','Local click-through rate']) if (!memoryCard.includes(feature)) errors.push(`Internal-link memory health feature missing: ${feature}`);
for (const feature of ["topic: 'travel'","minimumScore: 9",'preferredKinds']) if (!articleBody.includes(feature)) errors.push(`Travel topic policy missing: ${feature}`);
for (const feature of ["topic: 'property-tax'","minimumScore: 9",'appraisal-district','tax-office','data-link-score']) if (!guide.includes(feature)) errors.push(`Property-tax topic policy missing: ${feature}`);
for (const feature of ["createFileRoute('/api/internal-links')",'50000','diagnostics','cache-control']) if (!previewApi.includes(feature)) errors.push(`Internal-link diagnostics API feature missing: ${feature}`);
for (const feature of ["createFileRoute('/api/internal-link-coverage')",'internalLinkCoverageSummary','x-robots-tag','no-store']) if (!coverageApi.includes(feature)) errors.push(`Internal-link coverage API feature missing: ${feature}`);
if (!article.includes('ArticleBody blocks={article.body} entities={graph}')) errors.push('Article internal linking is not active.');
for (const feature of ['AutoEntityLinks','loadTexasKnowledgeGraph','excludedEntityIds']) if (!destination.includes(feature)) errors.push(`Destination internal linking feature missing: ${feature}`);
for (const feature of ['TEXAS_ENTITY_REGISTRY','remainingLinks = 12','linkedEntityIds','resolveInternalEntityLinks','data-entity-id']) if (!guide.includes(feature)) errors.push(`Guide internal linking feature missing: ${feature}`);
for (const feature of ['AutoEntityLinks','relatedEntities','excludedEntityIds: [entity.id]']) if (!entity.includes(feature)) errors.push(`Generated entity internal linking feature missing: ${feature}`);
for (const feature of ['internalLinkCoverageSummary','INTERNAL_LINK_SURFACES','Internal-link coverage','InternalLinkMemoryCard']) if (!health.includes(feature)) errors.push(`Platform health internal-link feature missing: ${feature}`);

if (errors.length) {
  console.error('Phase 2 internal-linking validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('Phase 2 intelligent internal linking, bounded cross-page memory, topic policies, analytics, and coverage reporting are protected.');
