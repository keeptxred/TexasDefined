import fs from 'node:fs';
import path from 'node:path';

const failures = [];
const notes = [];
const read = (file) => fs.readFileSync(file, 'utf8');
const exists = (file) => fs.existsSync(file);
const requireText = (content, token, label) => {
  if (!content.includes(token)) failures.push(`${label} missing ${token}`);
};
const forbidText = (content, token, label) => {
  if (content.includes(token)) failures.push(`${label} must not contain ${token}`);
};
const count = (content, token) => content.split(token).length - 1;
const dataDir = 'src/data';
const dataFiles = fs.readdirSync(dataDir);
const concatMatching = (predicate) => dataFiles
  .filter((name) => predicate(name))
  .map((name) => read(path.join(dataDir, name)))
  .join('\n');
const slugsFrom = (content) => [...content.matchAll(/(?:churchSlug|slug):\s*"([^"]+)"/g)].map((m) => m[1]);

const manifest = JSON.parse(read('src/data/painted-church-preindex-manifest.json'));
const publication = read('src/lib/painted-church-publication.ts');
const seo = read('src/lib/seo.ts');
const sitemap = read('src/routes/sitemap-explore[.]xml.ts');
const deploy = read('.github/workflows/deploy-production.yml');
const detail = read('src/routes/explore.painted-churches.$slug.tsx');
const visitorIndex = read('src/data/painted-church-visitor-status.ts');
const profileIndex = read('src/data/painted-church-profile-index.ts');
const researchIndex = read('src/data/painted-church-research-index.ts');
const churchIndex = read('src/data/painted-churches-expanded.ts');
const featureIndex = read('src/data/painted-church-feature-index.ts');
const galleryIndex = read('src/data/painted-church-gallery-index.ts');
const peopleIndex = read('src/data/painted-church-contributor-index.ts');
const thematic = read('src/data/painted-church-thematic-nomination.ts');
const sourceRegistry = read('src/data/painted-church-source-registry.ts');
const readiness = read('src/data/painted-church-preindex-readiness.ts');
const readinessRoute = read('src/routes/explore.painted-churches.preindex-readiness.tsx');
const peopleRoute = read('src/routes/explore.painted-churches.people.$slug.tsx');
const symbolRoute = read('src/routes/explore.painted-churches.symbols.$slug.tsx');

const catalogCorpus = concatMatching((name) =>
  name === 'painted-churches.ts' ||
  name.startsWith('painted-churches-expanded') ||
  name.startsWith('painted-churches-preindex') ||
  name.startsWith('painted-churches-authority')
);
const profileCorpus = concatMatching((name) => name.startsWith('painted-church-profiles') && name.endsWith('.ts'));
const researchCorpus = concatMatching((name) => name.startsWith('painted-church-research') && name.endsWith('.ts'));
const featureCorpus = concatMatching((name) => name.startsWith('painted-church-features') && name.endsWith('.ts'));
const visitorCorpus = concatMatching((name) => name.startsWith('painted-church-visitor-status') && name !== 'painted-church-visitor-status.ts');
const mapCorpus = concatMatching((name) => name.startsWith('painted-church-map-points') && name !== 'painted-church-map-points.ts');
const peopleCorpus = concatMatching((name) =>
  (name.startsWith('painted-church-people') || name.startsWith('painted-church-contributors')) && name.endsWith('.ts')
);

if (manifest.schemaVersion < 1) failures.push('Pre-index manifest schemaVersion must be present.');
if (manifest.publicationState !== 'pre-index-review') failures.push('Painted Churches must remain in pre-index-review state until explicit publication approval.');
if (!Number.isInteger(manifest.verifiedChurchCount) || manifest.verifiedChurchCount < 1) failures.push('Manifest verifiedChurchCount must be a positive integer.');
if (!Array.isArray(manifest.churchSlugs) || manifest.churchSlugs.length !== manifest.verifiedChurchCount) failures.push('Manifest churchSlugs must exactly match verifiedChurchCount.');
if (new Set(manifest.churchSlugs).size !== manifest.churchSlugs.length) failures.push('Manifest churchSlugs contains duplicates.');
if (manifest.requirements?.searchIndexingEnabled !== false) failures.push('Manifest searchIndexingEnabled must remain false during pre-index review.');

for (const slug of manifest.churchSlugs) {
  requireText(catalogCorpus, `slug: "${slug}"`, `Catalog coverage for ${slug}`);
  requireText(profileCorpus, `slug: "${slug}"`, `Profile coverage for ${slug}`);
  requireText(researchCorpus, `slug: "${slug}"`, `Research coverage for ${slug}`);
  requireText(visitorCorpus, `slug: "${slug}"`, `Visitor evidence for ${slug}`);
  requireText(mapCorpus, `slug: "${slug}"`, `Map provenance for ${slug}`);
  requireText(featureCorpus, `churchSlug: "${slug}"`, `Object-level feature coverage for ${slug}`);
}

const visitorSlugs = new Set(slugsFrom(visitorCorpus));
const mapSlugs = new Set(slugsFrom(mapCorpus));
const manifestSet = new Set(manifest.churchSlugs);
const extraVisitorSlugs = [...visitorSlugs].filter((slug) => !manifestSet.has(slug));
const extraMapSlugs = [...mapSlugs].filter((slug) => !manifestSet.has(slug));
if (visitorSlugs.size !== manifest.verifiedChurchCount) failures.push(`Visitor registry must resolve exactly ${manifest.verifiedChurchCount} unique verified churches; found ${visitorSlugs.size}.`);
if (mapSlugs.size !== manifest.verifiedChurchCount) failures.push(`Map registry must resolve exactly ${manifest.verifiedChurchCount} unique verified churches; found ${mapSlugs.size}.`);
if (extraVisitorSlugs.length) failures.push(`Visitor registry contains non-manifest slugs: ${extraVisitorSlugs.join(', ')}.`);
if (extraMapSlugs.length) failures.push(`Map registry contains non-manifest slugs: ${extraMapSlugs.join(', ')}.`);
for (const match of mapCorpus.matchAll(/slug:\s*"([^"]+)"[\s\S]{0,260}?precision:\s*"(near-property|community)"/g)) {
  notes.push(`Map stretch: ${match[1]} remains ${match[2]}.`);
}

requireText(publication, 'PAINTED_CHURCHES_SEARCH_INDEXING_ENABLED = false', 'Publication control');
requireText(publication, 'shouldIndexPaintedChurchPath', 'Publication control');
requireText(publication, '/explore/painted-churches/preindex-readiness', 'Permanent audit noindex');
requireText(seo, 'PAINTED_CHURCHES_PREINDEX_ROBOTS = "noindex, follow', 'SEO pre-index hold');
requireText(seo, 'shouldIndexPaintedChurchPath(page.canonicalPath)', 'SEO pre-index hold');
requireText(sitemap, 'shouldIndexPaintedChurchPath(normalized)', 'Explore sitemap publication hold');
requireText(deploy, 'PUBLIC_INDEXING_ENABLED', 'Production indexing release gate');
requireText(deploy, "env.PUBLIC_INDEXING_ENABLED == 'true'", 'Production indexing release gate');
requireText(deploy, 'Notify IndexNow', 'Production indexing release gate');

requireText(detail, 'canonicalPaintedChurchProfileBySlug', 'Canonical church page');
requireText(detail, 'canonicalPaintedChurchGalleryBySlug', 'Canonical church page');
for (const legacyImport of ['painted-church-profiles-additional','painted-church-profiles-additions','painted-church-profiles-final','painted-church-profiles-extended','painted-church-profiles-statewide']) {
  forbidText(detail, legacyImport, 'Canonical church page');
}
if (count(detail, '<PaintedChurchGallery') > 0) failures.push('Detail route must not render a second PaintedChurchGallery; the dossier owns the canonical gallery rendering.');
requireText(visitorIndex, 'throw new Error(`Missing explicit visitor-status research', 'Visitor evidence gate');
forbidText(visitorIndex, 'Texas Defined does not currently have a church-controlled public-access guarantee', 'Visitor evidence gate');

requireText(thematic, 'originalChurchCount: 15', '1982 thematic study');
requireText(thematic, 'currentThcMpsIndexCount: 14', 'Current THC MPS reconciliation');
requireText(thematic, 'galveston-st-joseph-church', 'Historic fifteenth church reconciliation');
requireText(churchIndex, 'preindexVerifiedPaintedChurches', 'Canonical verified corpus');

for (const requirement of [
  'canonicalPaintedChurchProfileBySlug',
  'canonicalPaintedChurchResearchBySlug',
  'canonicalPaintedChurchFeaturesBySlug',
  'canonicalPaintedChurchGalleryBySlug',
  'paintedChurchVisitorStatusBySlug',
  'paintedChurchMapPointBySlug',
]) requireText(readiness, requirement, 'Readiness model');
requireText(readiness, 'requiredForIndexLaunch: true', 'Readiness launch floor');
requireText(readiness, 'Original Texas Defined fieldwork', 'Authority ceiling transparency');
requireText(readinessRoute, 'Passing this audit does not automatically submit the collection.', 'Readiness publication separation');

for (const token of [
  'canonicalPaintedChurchProfileBySlug',
  'canonicalPaintedChurchResearchBySlug',
  'canonicalPaintedChurchFeaturesBySlug',
  'paintedChurchVisitorStatusBySlug',
  'paintedChurchMapPointBySlug',
  'paintedChurchRegisterRecordBySlug',
  'paintedChurchBibliography',
]) requireText(sourceRegistry, token, 'Canonical provenance registry');
requireText(sourceRegistry, 'paintedChurchSourcesForChurch', 'Canonical provenance registry');

requireText(profileIndex, 'canonicalPaintedChurchProfileBySlug', 'Canonical profile integration');
requireText(researchIndex, 'canonicalPaintedChurchResearchBySlug', 'Canonical dossier integration');
requireText(featureIndex, 'canonicalPaintedChurchFeaturesBySlug', 'Canonical feature integration');
requireText(galleryIndex, 'canonicalPaintedChurchGalleryBySlug', 'Canonical gallery integration');
requireText(peopleIndex, 'canonicalPaintedChurchContributors', 'Canonical contributor graph');
requireText(peopleRoute, 'canonicalPaintedChurchContributorBySlug', 'Contributor authority route');
forbidText(peopleRoute, 'sameAs:', 'Contributor structured-data evidence semantics');
forbidText(symbolRoute, 'sameAs: symbol.sourceUrl', 'Symbol structured-data evidence semantics');

for (const contributorRef of [...featureCorpus.matchAll(/contributorSlugs:\s*\[([^\]]+)\]/g)].flatMap((m) =>
  [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1])
)) requireText(peopleCorpus, `slug: "${contributorRef}"`, `Feature contributor graph ${contributorRef}`);

for (const file of [
  'src/routes/explore.painted-churches.national-register-study.tsx',
  'src/routes/explore.painted-churches.bibliography.tsx',
  'src/routes/explore.painted-churches.features.tsx',
  'src/routes/explore.painted-churches.count-concordance.tsx',
  'src/routes/explore.painted-churches.inscriptions.tsx',
  'src/routes/explore.painted-churches.stained-glass.tsx',
  'src/routes/explore.painted-churches.sacred-furnishings.tsx',
  'src/routes/explore.painted-churches.sources.tsx',
  'src/routes/explore.painted-churches.preindex-readiness.tsx',
  'src/routes/explore.painted-churches.fieldwork-protocol.tsx',
  'src/data/painted-church-fieldwork-protocol.ts',
  'src/data/painted-church-evidence-ledger.ts',
  'src/components/editorial/PaintedChurchEvidenceLedger.tsx',
  'src/data/painted-church-editorial-status.ts',
  'src/components/editorial/PaintedChurchEditorialStatus.tsx',
]) if (!exists(file)) failures.push(`Missing pre-index authority asset: ${file}.`);

const fieldwork = read('src/data/painted-church-fieldwork-protocol.ts');
requireText(fieldwork, 'No audio/video recording without explicit participant permission.', 'Fieldwork consent protocol');
requireText(fieldwork, 'No fieldwork checkbox may be marked complete from web research', 'Fieldwork evidence boundary');
requireText(fieldwork, 'Transcribe exactly as visible before translating', 'Fieldwork inscription protocol');
const fieldworkRoute = read('src/routes/explore.painted-churches.fieldwork-protocol.tsx');
requireText(fieldworkRoute, 'HowTo', 'Fieldwork structured data');

const knowledgeLinks = read('src/components/editorial/PaintedChurchKnowledgeLinks.tsx');
requireText(knowledgeLinks, 'PaintedChurchEvidenceLedger', 'Church evidence UI');
requireText(knowledgeLinks, 'PaintedChurchEditorialStatus', 'Church editorial-status UI');
const editorial = read('src/data/painted-church-editorial-status.ts');
requireText(editorial, 'fieldworkStatus: "not-yet-field-verified"', 'Fieldwork disclosure');
requireText(editorial, 'expertReviewStatus: "not-claimed"', 'Expert-review disclosure');

if (notes.length) {
  console.log('Painted Churches pre-index stretch notes:');
  notes.forEach((note) => console.log(`- ${note}`));
}
if (failures.length) {
  console.error(`Painted Churches pre-index readiness validation failed (${failures.length} blocker${failures.length === 1 ? '' : 's'}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(`Painted Churches pre-index gate protected: ${manifest.verifiedChurchCount} verified churches, canonical profile/research/feature coverage, explicit visitor/map evidence, noindex+sitemap hold, gated IndexNow release, source registry, contributor graph, evidence/editorial disclosures, fieldwork protocol, and resolved 1982 15-vs-current-14 thematic distinction.`);
