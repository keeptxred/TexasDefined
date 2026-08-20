import fs from 'node:fs';

const failures = [];
const notes = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const exists = (path) => fs.existsSync(path);
const concat = (paths) => paths.filter(exists).map(read).join('\n');
const requireText = (content, token, label) => { if (!content.includes(token)) failures.push(`${label} missing ${token}`); };
const forbidText = (content, token, label) => { if (content.includes(token)) failures.push(`${label} must not contain ${token}`); };
const count = (content, token) => content.split(token).length - 1;

const manifest = JSON.parse(read('src/data/painted-church-preindex-manifest.json'));
const publication = read('src/lib/painted-church-publication.ts');
const seo = read('src/lib/seo.ts');
const sitemap = read('src/routes/sitemap-explore[.]xml.ts');
const deploy = read('.github/workflows/deploy-production.yml');
const detail = read('src/routes/explore.painted-churches.$slug.tsx');
const visitorIndex = read('src/data/painted-church-visitor-status.ts');
const visitorCorpus = concat(['src/data/painted-church-visitor-status-legacy.ts','src/data/painted-church-visitor-status-preindex.ts']);
const mapCorpus = concat(['src/data/painted-church-map-points-legacy.ts','src/data/painted-church-map-points-preindex.ts']);
const catalogCorpus = concat(['src/data/painted-churches.ts','src/data/painted-churches-expanded-legacy.ts','src/data/painted-churches-preindex-expansion.ts']);
const profileCorpus = concat([
  'src/data/painted-church-profiles.ts','src/data/painted-church-profiles-extended.ts','src/data/painted-church-profiles-statewide.ts',
  'src/data/painted-church-profiles-final.ts','src/data/painted-church-profiles-additions.ts','src/data/painted-church-profiles-expansion.ts',
  'src/data/painted-church-profiles-latest.ts','src/data/painted-church-profiles-authority.ts','src/data/painted-church-profiles-preindex.ts',
  'src/data/painted-church-profiles-preindex-supplemental.ts',
]);
const researchCorpus = concat([
  'src/data/painted-church-research.ts','src/data/painted-church-research-statewide.ts','src/data/painted-church-research-additions.ts',
  'src/data/painted-church-research-expansion.ts','src/data/painted-church-research-latest.ts','src/data/painted-church-research-authority.ts',
  'src/data/painted-church-research-preindex.ts','src/data/painted-church-research-preindex-supplemental.ts',
]);
const featureCorpus = concat([
  'src/data/painted-church-features.ts','src/data/painted-church-features-authority.ts','src/data/painted-church-features-preindex.ts',
  'src/data/painted-church-features-preindex-expansion.ts',
]);
const peopleCorpus = concat([
  'src/data/painted-church-people-legacy.ts','src/data/painted-church-people-preindex.ts','src/data/painted-church-people-preindex-supplemental.ts',
  'src/data/painted-church-contributors-authority.ts',
]);
const galleryCorpus = concat(['src/data/painted-church-gallery.ts','src/data/painted-church-gallery-extra.ts','src/data/painted-church-gallery-supplemental.ts','src/data/painted-church-gallery-preindex.ts']);
const thematic = read('src/data/painted-church-thematic-nomination.ts');
const sourceRegistry = read('src/data/painted-church-source-registry.ts');
const readiness = read('src/data/painted-church-preindex-readiness.ts');
const readinessRoute = read('src/routes/explore.painted-churches.preindex-readiness.tsx');
const peopleIndex = read('src/data/painted-church-contributor-index.ts');
const peopleRoute = read('src/routes/explore.painted-churches.people.$slug.tsx');
const symbolRoute = read('src/routes/explore.painted-churches.symbols.$slug.tsx');
const profileIndex = read('src/data/painted-church-profile-index.ts');
const researchIndex = read('src/data/painted-church-research-index.ts');
const churchIndex = read('src/data/painted-churches-expanded.ts');
const featureIndex = read('src/data/painted-church-feature-index.ts');

if (manifest.schemaVersion < 1) failures.push('Pre-index manifest schemaVersion must be present.');
if (manifest.publicationState !== 'pre-index-review') failures.push('Painted Churches must remain in pre-index-review state until explicit publication approval.');
if (manifest.verifiedChurchCount !== 31) failures.push(`Expected 31 verified churches in pre-index manifest, found ${manifest.verifiedChurchCount}.`);
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
const visitorSlugs = [...visitorCorpus.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const mapSlugs = [...mapCorpus.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
if (new Set(visitorSlugs).size !== manifest.verifiedChurchCount) failures.push(`Visitor registry must resolve exactly ${manifest.verifiedChurchCount} unique verified churches; found ${new Set(visitorSlugs).size}.`);
if (new Set(mapSlugs).size !== manifest.verifiedChurchCount) failures.push(`Map registry must resolve exactly ${manifest.verifiedChurchCount} unique verified churches; found ${new Set(mapSlugs).size}.`);
for (const match of mapCorpus.matchAll(/slug:\s*"([^"]+)"[^\n]+precision:\s*"(near-property|community)"/g)) notes.push(`Map stretch: ${match[1]} remains ${match[2]}.`);

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
for (const legacyImport of ['painted-church-profiles-additional','painted-church-profiles-additions','painted-church-profiles-final','painted-church-profiles-extended','painted-church-profiles-statewide']) forbidText(detail, legacyImport, 'Canonical church page');
if (count(detail, '<PaintedChurchGallery') > 0) failures.push('Detail route must not render a second PaintedChurchGallery; the dossier owns the canonical gallery rendering.');
requireText(visitorIndex, 'throw new Error(`Missing explicit visitor-status research', 'Visitor evidence gate');
forbidText(visitorIndex, 'Texas Defined does not currently have a church-controlled public-access guarantee', 'Visitor evidence gate');

requireText(thematic, 'originalChurchCount: 15', '1982 thematic study');
requireText(thematic, 'currentThcMpsIndexCount: 14', 'Current THC MPS reconciliation');
requireText(thematic, 'galveston-st-joseph-church', 'Historic fifteenth church reconciliation');
requireText(churchIndex, 'preindexVerifiedPaintedChurches', 'Canonical verified corpus');

for (const requirement of ['canonicalPaintedChurchProfileBySlug','canonicalPaintedChurchResearchBySlug','canonicalPaintedChurchFeaturesBySlug','canonicalPaintedChurchGalleryBySlug','paintedChurchVisitorStatusBySlug','paintedChurchMapPointBySlug']) requireText(readiness, requirement, 'Readiness model');
requireText(readiness, 'requiredForIndexLaunch: true', 'Readiness launch floor');
requireText(readiness, 'Original Texas Defined fieldwork', 'Authority ceiling transparency');
requireText(readinessRoute, 'Passing this audit does not automatically submit the collection.', 'Readiness publication separation');

for (const token of ['canonicalPaintedChurchProfileBySlug','canonicalPaintedChurchResearchBySlug','canonicalPaintedChurchFeaturesBySlug','paintedChurchVisitorStatusBySlug','paintedChurchMapPointBySlug','paintedChurchRegisterRecordBySlug','paintedChurchBibliography']) requireText(sourceRegistry, token, 'Canonical provenance registry');
requireText(sourceRegistry, 'paintedChurchSourcesForChurch', 'Canonical provenance registry');

requireText(profileIndex, 'supplementalPreindexPaintedChurchProfileBySlug', 'Supplemental profile integration');
requireText(researchIndex, 'supplementalPreindexPaintedChurchResearchBySlug', 'Supplemental dossier integration');
requireText(featureIndex, 'paintedChurchPreindexExpansionFeatures', 'Pre-index feature integration');
requireText(peopleIndex, 'canonicalPaintedChurchContributors', 'Canonical contributor graph');
requireText(peopleRoute, 'canonicalPaintedChurchContributorBySlug', 'Contributor authority route');
forbidText(peopleRoute, 'sameAs:', 'Contributor structured-data evidence semantics');
forbidText(symbolRoute, 'sameAs: symbol.sourceUrl', 'Symbol structured-data evidence semantics');

for (const contributor of ['joseph-bleicke','dudley-and-dudley','joseph-frederick-wolff','gt-scott','palestine-presbyterian-unidentified-german-painter','edmond-fatjo','oidtmann-studios']) requireText(peopleCorpus, `slug: "${contributor}"`, `Contributor registry ${contributor}`);
for (const contributorRef of [...featureCorpus.matchAll(/contributorSlugs:\s*\[([^\]]+)\]/g)].flatMap((m) => [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]))) requireText(peopleCorpus, `slug: "${contributorRef}"`, `Feature contributor graph ${contributorRef}`);

for (const file of [
  'src/routes/explore.painted-churches.national-register-study.tsx','src/routes/explore.painted-churches.bibliography.tsx','src/routes/explore.painted-churches.features.tsx',
  'src/routes/explore.painted-churches.count-concordance.tsx','src/routes/explore.painted-churches.inscriptions.tsx','src/routes/explore.painted-churches.stained-glass.tsx',
  'src/routes/explore.painted-churches.sacred-furnishings.tsx','src/routes/explore.painted-churches.sources.tsx','src/routes/explore.painted-churches.preindex-readiness.tsx',
  'src/data/painted-church-evidence-ledger.ts','src/components/editorial/PaintedChurchEvidenceLedger.tsx','src/data/painted-church-editorial-status.ts','src/components/editorial/PaintedChurchEditorialStatus.tsx',
]) if (!exists(file)) failures.push(`Missing pre-index authority asset: ${file}.`);

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
console.log(`Painted Churches pre-index gate protected: ${manifest.verifiedChurchCount} verified churches, canonical profile/research/feature coverage, explicit visitor/map evidence, noindex+sitemap hold, gated IndexNow release, source registry, contributor graph, evidence/editorial disclosures, and resolved 1982 15-vs-current-14 thematic distinction.`);
