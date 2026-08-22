import fs from 'node:fs';

const failures = [];
const read = (file) => fs.readFileSync(file, 'utf8');
const requireText = (content, token, label) => {
  if (!content.includes(token)) failures.push(`${label} missing ${token}`);
};
const forbidText = (content, token, label) => {
  if (content.includes(token)) failures.push(`${label} must not contain ${token}`);
};

const manifest = JSON.parse(read('src/data/painted-church-preindex-manifest.json'));
const readiness = read('src/data/painted-church-preindex-readiness.ts');
const readinessRoute = read('src/routes/explore.painted-churches.preindex-readiness.tsx');
const sourceRegistry = read('src/data/painted-church-source-registry.ts');
const sourceRoute = read('src/routes/explore.painted-churches.sources.tsx');
const methodology = read('src/routes/explore.painted-churches.methodology.tsx');
const editorialStatus = read('src/data/painted-church-editorial-status.ts');
const editorialStatusUi = read('src/components/editorial/PaintedChurchEditorialStatus.tsx');
const knowledgeLinks = read('src/components/editorial/PaintedChurchKnowledgeLinks.tsx');
const seoWorkflow = read('.github/workflows/painted-churches-seo.yml');
const runtimeWorkflow = read('.github/workflows/painted-churches-preindex-runtime.yml');
const runtimeValidator = read('scripts/data/validate-painted-church-runtime-readiness.mjs');
const publication = read('src/lib/painted-church-publication.ts');
const deploy = read('.github/workflows/deploy-production.yml');

if (manifest.verifiedChurchCount !== 33) failures.push(`Strict pre-index baseline expects 33 verified churches; manifest reports ${manifest.verifiedChurchCount}. Update this assertion deliberately with the census when the corpus changes.`);
if (manifest.schemaVersion < 2) failures.push('Pre-index manifest must use schemaVersion 2 or newer so quantitative release floors are machine-readable.');
if (manifest.publicationState !== 'pre-index-review') failures.push('Publication state must remain pre-index-review.');
if (manifest.requirements?.searchIndexingEnabled !== false) failures.push('Manifest must explicitly keep searchIndexingEnabled false.');
if (manifest.requirements?.minimumDistinctSources !== 3) failures.push('Manifest must require three distinct normalized sources per church.');
if (manifest.requirements?.minimumAuthoritySources !== 2) failures.push('Manifest must require two non-discovery authority sources per church.');
if (manifest.requirements?.minimumObjectLevelFeatures !== 2) failures.push('Manifest must require at least two object-level features per church.');
if (manifest.requirements?.rightsClearedCurrentPhotography !== true) failures.push('Manifest must require rights-cleared current photography before index launch.');

requireText(readiness, 'sourceUrls.size >= 3', 'Readiness three-source floor');
requireText(readiness, 'authoritySourceUrls.size >= 2', 'Readiness authority-source floor');
requireText(readiness, 'features.length >= 2', 'Readiness multi-object floor');
requireText(readiness, 'gallery.length > 0 || Boolean(church.image)', 'Readiness rights-cleared image floor');
requireText(readiness, 'paintedChurchSourcesForChurch', 'Readiness canonical provenance integration');
requireText(readinessRoute, 'at least three distinct normalized source URLs', 'Readiness public explanation');
requireText(readinessRoute, 'at least two non-discovery authority sources', 'Readiness public explanation');
requireText(readinessRoute, 'at least two object-level interior features', 'Readiness public explanation');

for (const field of ['creator?: string', 'date?: string', 'checkedAt?: string', 'citationNote?: string']) requireText(sourceRegistry, field, 'Source provenance model');
for (const field of ['source.creator', 'source.date', 'source.checkedAt', 'source.citationNote']) requireText(sourceRoute, field, 'Source provenance UI');
requireText(sourceRoute, 'dateModified: "2026-08-20"', 'Source registry freshness');
requireText(methodology, 'const checkedAt = "2026-08-20"', 'Methodology freshness');
requireText(methodology, 'Search indexing remains intentionally disabled during authority review.', 'Methodology publication disclosure');

requireText(editorialStatus, 'authoredBy: "Texas Defined Editorial Research"', 'Visible organizational authorship');
requireText(editorialStatus, 'revisions: PaintedChurchEditorialRevision[]', 'Review and revision history model');
requireText(editorialStatus, 'fieldworkStatus: "not-yet-field-verified"', 'Fieldwork disclosure');
requireText(editorialStatus, 'expertReviewStatus: "not-claimed"', 'Expert review disclosure');
requireText(editorialStatusUi, 'Editorial authorship', 'Visible authorship UI');
requireText(editorialStatusUi, 'Review & revision history', 'Visible revision-history UI');
requireText(knowledgeLinks, '<PaintedChurchEditorialStatus slug={slug} />', 'Church-page editorial disclosure integration');

requireText(seoWorkflow, '33-church authority contract', 'Static authority workflow');
requireText(seoWorkflow, 'validate-painted-church-preindex-readiness.mjs', 'Static authority workflow');
forbidText(seoWorkflow, '31-church authority contract', 'Static authority workflow');
forbidText(seoWorkflow, '32-church authority contract', 'Static authority workflow');
requireText(runtimeWorkflow, 'Painted Churches Pre-Index Runtime Gate', 'Runtime authority workflow');
requireText(runtimeWorkflow, 'validate-painted-church-runtime-readiness.mjs', 'Runtime authority workflow');
requireText(runtimeValidator, 'paintedChurchIndexLaunchReady', 'Runtime authority validator');
requireText(runtimeValidator, 'miss one or more required authority dimensions', 'Runtime authority validator blocker reporting');

requireText(publication, 'PAINTED_CHURCHES_SEARCH_INDEXING_ENABLED = false', 'Search release hold');
requireText(deploy, "vars.PUBLIC_INDEXING_ENABLED == 'true'", 'IndexNow explicit release gate');

if (failures.length) {
  console.error(`Painted Churches strict pre-index standard failed (${failures.length} issue${failures.length === 1 ? '' : 's'}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Painted Churches strict pre-index standard protected: 33-church baseline, 3-source/2-authority/2-object/image launch floor, provenance metadata, visible authorship/revision disclosures, runtime execution gate, current methodology, and search indexing disabled.');
