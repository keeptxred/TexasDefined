import fs from 'node:fs';

const failures = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const requireText = (content, token, label) => {
  if (!content.includes(token)) failures.push(`${label} missing ${token}`);
};
const forbidText = (content, token, label) => {
  if (content.includes(token)) failures.push(`${label} must not contain ${token}`);
};
const count = (content, token) => content.split(token).length - 1;

const manifest = JSON.parse(read('src/data/painted-church-preindex-manifest.json'));
const publication = read('src/lib/painted-church-publication.ts');
const seo = read('src/lib/seo.ts');
const sitemap = read('src/routes/sitemap-explore[.]xml.ts');
const deploy = read('.github/workflows/deploy-production.yml');
const detail = read('src/routes/explore.painted-churches.$slug.tsx');
const visitorIndex = read('src/data/painted-church-visitor-status.ts');
const visitorLegacy = read('src/data/painted-church-visitor-status-legacy.ts');
const visitorPreindex = read('src/data/painted-church-visitor-status-preindex.ts');
const mapLegacy = read('src/data/painted-church-map-points-legacy.ts');
const mapPreindex = read('src/data/painted-church-map-points-preindex.ts');
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

if (manifest.schemaVersion < 1) failures.push('Pre-index manifest schemaVersion must be present.');
if (manifest.publicationState !== 'pre-index-review') failures.push('Painted Churches must remain in pre-index-review state until explicit publication approval.');
if (manifest.verifiedChurchCount !== 31) failures.push(`Expected 31 verified churches in pre-index manifest, found ${manifest.verifiedChurchCount}.`);
if (!Array.isArray(manifest.churchSlugs) || manifest.churchSlugs.length !== manifest.verifiedChurchCount) failures.push('Manifest churchSlugs must exactly match verifiedChurchCount.');
if (new Set(manifest.churchSlugs).size !== manifest.churchSlugs.length) failures.push('Manifest churchSlugs contains duplicates.');
if (manifest.requirements?.searchIndexingEnabled !== false) failures.push('Manifest searchIndexingEnabled must remain false during pre-index review.');

requireText(publication, 'PAINTED_CHURCHES_SEARCH_INDEXING_ENABLED = false', 'Publication control');
requireText(publication, 'shouldIndexPaintedChurchPath', 'Publication control');
requireText(publication, '/explore/painted-churches/preindex-readiness', 'Permanent audit noindex');
requireText(seo, 'PAINTED_CHURCHES_PREINDEX_ROBOTS = "noindex, follow', 'SEO pre-index hold');
requireText(seo, 'shouldIndexPaintedChurchPath(page.canonicalPath)', 'SEO pre-index hold');
requireText(sitemap, 'shouldIndexPaintedChurchPath(normalized)', 'Explore sitemap publication hold');
requireText(deploy, "PUBLIC_INDEXING_ENABLED", 'Production indexing release gate');
requireText(deploy, "Notify IndexNow", 'Production indexing release gate');

requireText(detail, 'canonicalPaintedChurchProfileBySlug', 'Canonical church page');
requireText(detail, 'canonicalPaintedChurchGalleryBySlug', 'Canonical church page');
for (const legacyImport of [
  'painted-church-profiles-additional',
  'painted-church-profiles-additions',
  'painted-church-profiles-final',
  'painted-church-profiles-extended',
  'painted-church-profiles-statewide',
]) forbidText(detail, legacyImport, 'Canonical church page');
if (count(detail, '<PaintedChurchGallery') > 0) failures.push('Detail route must not render a second PaintedChurchGallery; the dossier owns the canonical gallery rendering.');

requireText(visitorIndex, 'throw new Error(`Missing explicit visitor-status research', 'Visitor evidence gate');
forbidText(visitorIndex, 'Texas Defined does not currently have a church-controlled public-access guarantee', 'Visitor evidence gate');
const visitorCorpus = `${visitorLegacy}\n${visitorPreindex}`;
for (const slug of manifest.churchSlugs) requireText(visitorCorpus, `slug: "${slug}"`, `Visitor evidence for ${slug}`);

const mapCorpus = `${mapLegacy}\n${mapPreindex}`;
for (const slug of manifest.churchSlugs) requireText(mapCorpus, `slug: "${slug}"`, `Map provenance for ${slug}`);

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

requireText(profileIndex, 'supplementalPreindexPaintedChurchProfileBySlug', 'Supplemental profile integration');
requireText(researchIndex, 'supplementalPreindexPaintedChurchResearchBySlug', 'Supplemental dossier integration');
requireText(peopleIndex, 'canonicalPaintedChurchContributors', 'Canonical contributor graph');
requireText(peopleRoute, 'canonicalPaintedChurchContributorBySlug', 'Contributor authority route');
forbidText(peopleRoute, 'sameAs:', 'Contributor structured-data evidence semantics');
forbidText(symbolRoute, 'sameAs: symbol.sourceUrl', 'Symbol structured-data evidence semantics');

if (failures.length) {
  console.error('Painted Churches pre-index readiness validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Painted Churches pre-index gate protected: ${manifest.verifiedChurchCount} verified churches, explicit noindex+sitemap hold, gated IndexNow release, canonical profile/gallery/research renderers, complete visitor/map records, source registry, contributor graph, and resolved 1982 15-vs-current-14 thematic distinction.`);
