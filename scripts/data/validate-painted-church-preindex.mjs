import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
const concat = (files) => files.filter(exists).map(read).join("\n");
const failures = [];
const notes = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

const manifest = JSON.parse(read("src/data/painted-church-preindex-manifest.json"));
const expectedSlugs = manifest.churchSlugs;
assert(manifest.verifiedChurchCount === 31, `Pre-index manifest must declare 31 verified churches; found ${manifest.verifiedChurchCount}.`);
assert(expectedSlugs.length === 31, `Pre-index manifest must contain 31 church slugs; found ${expectedSlugs.length}.`);
assert(new Set(expectedSlugs).size === expectedSlugs.length, "Pre-index manifest church slugs must be unique.");
assert(manifest.publicationState === "pre-index-review", "Painted Churches must remain in pre-index-review until explicit publication approval.");
assert(manifest.requirements?.searchIndexingEnabled === false, "Pre-index manifest must keep search indexing disabled.");

const catalogSource = concat([
  "src/data/painted-churches.ts",
  "src/data/painted-churches-expanded-legacy.ts",
  "src/data/painted-churches-preindex-expansion.ts",
]);
const profileSource = concat([
  "src/data/painted-church-profiles.ts",
  "src/data/painted-church-profiles-extended.ts",
  "src/data/painted-church-profiles-statewide.ts",
  "src/data/painted-church-profiles-final.ts",
  "src/data/painted-church-profiles-additions.ts",
  "src/data/painted-church-profiles-expansion.ts",
  "src/data/painted-church-profiles-latest.ts",
  "src/data/painted-church-profiles-authority.ts",
  "src/data/painted-church-profiles-preindex.ts",
]);
const researchSource = concat([
  "src/data/painted-church-research.ts",
  "src/data/painted-church-research-statewide.ts",
  "src/data/painted-church-research-additions.ts",
  "src/data/painted-church-research-expansion.ts",
  "src/data/painted-church-research-latest.ts",
  "src/data/painted-church-research-authority.ts",
  "src/data/painted-church-research-preindex.ts",
]);
const visitorSource = concat([
  "src/data/painted-church-visitor-status-legacy.ts",
  "src/data/painted-church-visitor-status-preindex.ts",
]);
const mapSource = concat([
  "src/data/painted-church-map-points-legacy.ts",
  "src/data/painted-church-map-points-preindex.ts",
]);
const featureSource = concat([
  "src/data/painted-church-features.ts",
  "src/data/painted-church-features-authority.ts",
  "src/data/painted-church-features-preindex.ts",
  "src/data/painted-church-features-preindex-expansion.ts",
]);
const peopleSource = concat([
  "src/data/painted-church-people-legacy.ts",
  "src/data/painted-church-people-preindex.ts",
  "src/data/painted-church-contributors-authority.ts",
]);
const gallerySource = concat([
  "src/data/painted-church-gallery.ts",
  "src/data/painted-church-gallery-extra.ts",
  "src/data/painted-church-gallery-supplemental.ts",
]);
const censusSource = concat([
  "src/data/painted-church-census.ts",
  "src/data/painted-church-census-legacy.ts",
]);

for (const slug of expectedSlugs) {
  assert(catalogSource.includes(`slug: "${slug}"`), `${slug}: missing canonical catalog input.`);
  assert(profileSource.includes(`slug: "${slug}"`), `${slug}: missing canonical narrative profile.`);
  assert(researchSource.includes(`slug: "${slug}"`), `${slug}: missing research dossier.`);
  assert(visitorSource.includes(`slug: "${slug}"`), `${slug}: missing explicit visitor/access research.`);
  assert(mapSource.includes(`slug: "${slug}"`), `${slug}: missing sourced map point.`);
  assert(featureSource.includes(`churchSlug: "${slug}"`), `${slug}: missing object-level artwork/interior feature evidence.`);
}

const visitorSlugs = [...visitorSource.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const mapSlugs = [...mapSource.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
assert(visitorSlugs.length === expectedSlugs.length, `Expected exactly ${expectedSlugs.length} visitor records; found ${visitorSlugs.length}.`);
assert(mapSlugs.length === expectedSlugs.length, `Expected exactly ${expectedSlugs.length} map records; found ${mapSlugs.length}.`);
assert(new Set(visitorSlugs).size === visitorSlugs.length, "Visitor registry contains duplicate church slugs.");
assert(new Set(mapSlugs).size === mapSlugs.length, "Map registry contains duplicate church slugs.");
const nonExact = [...mapSource.matchAll(/slug:\s*"([^"]+)"[^\n]+precision:\s*"(near-property|community)"/g)].map((match) => `${match[1]} (${match[2]})`);
if (nonExact.length) notes.push(`Map precision stretch queue: ${nonExact.join(", ")}`);

const detailRoute = read("src/routes/explore.painted-churches.$slug.tsx");
assert(detailRoute.includes("canonicalPaintedChurchProfileBySlug"), "Detail route must use canonical profile resolver.");
assert(detailRoute.includes("canonicalPaintedChurchGalleryBySlug"), "Detail route must use canonical merged gallery resolver.");
assert(!detailRoute.includes("paintedChurchProfileBySlug(params.slug) ??"), "Legacy profile chain must not return to detail route.");
assert(!detailRoute.includes("paintedChurchGalleryBySlug(church.slug)"), "Detail route must not use the base-only gallery path.");
assert(read("src/data/painted-church-profile-index.ts").includes("preindexPaintedChurchProfileBySlug"), "Canonical profile index must include pre-index authority profiles.");
assert(read("src/data/painted-church-research-index.ts").includes("preindexPaintedChurchResearchBySlug"), "Canonical research index must include pre-index authority dossiers.");
assert(read("src/data/painted-church-feature-index.ts").includes("paintedChurchPreindexExpansionFeatures"), "Canonical feature index must include pre-index expansion evidence.");

for (const type of ["mural", "symbol", "ornament", "faux-finish", "stained-glass", "inscription", "altar-reredos", "pulpit", "organ", "furnishing", "restoration-evidence"]) {
  assert(read("src/data/painted-church-features.ts").includes(`| "${type}"`) || read("src/data/painted-church-features.ts").includes(`  | "${type}"`), `Feature model must support ${type}.`);
}

const extractListRefs = (text, field) => {
  const refs = [];
  const re = new RegExp(`${field}:\\s*\\[([^\\]]*)\\]`, "g");
  for (const match of text.matchAll(re)) for (const item of match[1].matchAll(/"([^"]+)"/g)) refs.push(item[1]);
  return [...new Set(refs)];
};
const personSlugs = new Set([...peopleSource.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]));
const techniqueText = read("src/data/painted-church-techniques.ts");
const techniqueSlugs = new Set([...techniqueText.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]));
const symbolText = read("src/data/painted-church-symbols.ts");
const symbolSlugs = new Set([...symbolText.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]));
for (const contributor of extractListRefs(featureSource, "contributorSlugs")) assert(personSlugs.has(contributor), `Object graph references unresolved contributor entity: ${contributor}.`);
for (const technique of extractListRefs(featureSource, "techniqueSlugs")) assert(techniqueSlugs.has(technique), `Object graph references unresolved technique entity: ${technique}.`);
for (const symbol of extractListRefs(featureSource, "symbolSlugs")) assert(symbolSlugs.has(symbol), `Object graph references unresolved symbol entity: ${symbol}.`);

const baseChurchSource = read("src/data/painted-churches.ts");
const legacyExpanded = read("src/data/painted-churches-expanded-legacy.ts");
const preindexExpanded = read("src/data/painted-churches-preindex-expansion.ts");
const hasHeroImageForSlug = (source, slug) => {
  const marker = `slug: "${slug}"`;
  const start = source.indexOf(marker);
  if (start < 0) return false;
  const next = source.indexOf('slug: "', start + marker.length);
  return source.slice(start, next < 0 ? source.length : next).includes("image:");
};
const missingCurrentImages = expectedSlugs.filter((slug) =>
  !gallerySource.includes(`"${slug}"`) &&
  !hasHeroImageForSlug(baseChurchSource, slug) &&
  !hasHeroImageForSlug(legacyExpanded, slug) &&
  !hasHeroImageForSlug(preindexExpanded, slug)
);
assert(missingCurrentImages.length === 0, `Rights-cleared current photography missing: ${missingCurrentImages.join(", ") || "none"}.`);

const sourceRegistry = read("src/data/painted-church-source-registry.ts");
assert(sourceRegistry.includes("paintedChurchSourcesForChurch"), "Source registry must support per-church provenance retrieval.");
assert(sourceRegistry.includes("canonicalPaintedChurchFeaturesBySlug"), "Source registry must ingest object-level feature provenance.");
for (const tier of ["primary-official", "archive-register", "scholarly-public-history", "current-organization", "secondary-discovery"]) assert(sourceRegistry.includes(`"${tier}"`), `Source registry missing provenance tier ${tier}.`);

const thematic = read("src/data/painted-church-thematic-nomination.ts");
assert(thematic.includes("originalChurchCount: 15"), "Original thematic nomination model must preserve the historical fifteen-church study.");
assert(thematic.includes("currentThcMpsIndexCount: 14"), "Thematic model must preserve the current fourteen-entry THC MPS distinction.");
assert(thematic.includes("galveston-st-joseph-church"), "Thematic model must preserve Galveston as the historical fifteenth church.");
const concordance = read("src/data/painted-church-count-concordance.ts");
for (const required of ["6 churches", "14 associated entries", "15 churches", "More than 20", "32 remain", "Up to 35 surviving churches"]) assert(concordance.includes(required), `Count concordance must preserve published count: ${required}.`);

for (const promoted of ["palestine-first-presbyterian-church", "houston-annunciation-catholic-church", "waco-st-francis-on-the-brazos"]) {
  assert(read("src/data/painted-church-census.ts").includes(`"${promoted}"`), `Census wrapper must explicitly remove promoted church ${promoted}.`);
}
for (const unresolved of ["ellinger-st-marys-catholic-church", "rockne-sacred-heart-catholic-church", "san-antonio-san-fernando-cathedral", "galveston-first-presbyterian-church", "san-antonio-st-sophia-greek-orthodox"]) {
  assert(censusSource.includes(`slug: "${unresolved}"`), `Research census must retain unresolved lead ${unresolved}.`);
}

for (const file of [
  "src/routes/explore.painted-churches.national-register-study.tsx",
  "src/routes/explore.painted-churches.bibliography.tsx",
  "src/routes/explore.painted-churches.features.tsx",
  "src/routes/explore.painted-churches.count-concordance.tsx",
  "src/routes/explore.painted-churches.inscriptions.tsx",
  "src/routes/explore.painted-churches.stained-glass.tsx",
  "src/routes/explore.painted-churches.sacred-furnishings.tsx",
  "src/routes/explore.painted-churches.sources.tsx",
  "src/routes/explore.painted-churches.preindex-readiness.tsx",
  "src/data/painted-church-preindex-readiness.ts",
  "src/data/painted-church-evidence-ledger.ts",
  "src/components/editorial/PaintedChurchEvidenceLedger.tsx",
  "src/data/painted-church-editorial-status.ts",
  "src/components/editorial/PaintedChurchEditorialStatus.tsx"
]) assert(exists(file), `Missing pre-index authority asset: ${file}.`);

const knowledgeLinks = read("src/components/editorial/PaintedChurchKnowledgeLinks.tsx");
assert(knowledgeLinks.includes("PaintedChurchEvidenceLedger"), "Every church page must expose the claim-level evidence ledger.");
assert(knowledgeLinks.includes("PaintedChurchEditorialStatus"), "Every church page must disclose research/fieldwork status.");
const editorial = read("src/data/painted-church-editorial-status.ts");
assert(editorial.includes('fieldworkStatus: "not-yet-field-verified"'), "Fieldwork must remain explicitly unclaimed until original Texas Defined visits are documented.");
assert(editorial.includes('expertReviewStatus: "not-claimed"'), "Expert review must remain explicitly unclaimed until documented.");

const symbolRoute = read("src/routes/explore.painted-churches.symbols.$slug.tsx");
assert(!symbolRoute.includes("sameAs: symbol.sourceUrl"), "Supporting symbol sources must not be modeled as identity-equivalent sameAs URLs.");
assert(symbolRoute.includes("subjectOf"), "Symbol schema must expose evidence through subjectOf rather than false identity equivalence.");

const publication = read("src/lib/painted-church-publication.ts");
assert(publication.includes("PAINTED_CHURCHES_SEARCH_INDEXING_ENABLED = false"), "Painted Churches publication hold must remain explicit.");
const deploy = read(".github/workflows/deploy-production.yml");
assert(deploy.includes("PUBLIC_INDEXING_ENABLED"), "Production workflow must preserve explicit indexing flag.");
assert(deploy.includes("env.PUBLIC_INDEXING_ENABLED == 'true'"), "IndexNow must remain conditional on explicit PUBLIC_INDEXING_ENABLED=true.");

if (notes.length) {
  console.log("Painted Churches pre-index stretch notes:");
  for (const note of notes) console.log(`- ${note}`);
}
if (failures.length) {
  console.error(`Painted Churches pre-index authority gate FAILED (${failures.length} blocker${failures.length === 1 ? "" : "s"}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Painted Churches pre-index authority gate passed for ${expectedSlugs.length} verified churches: canonical profiles/research/gallery reads, explicit visitor evidence, sourced map points, object-level features, graph integrity, source provenance, rights-cleared current photography and deliberate indexing hold are intact.`);
