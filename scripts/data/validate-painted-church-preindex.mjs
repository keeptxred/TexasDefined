import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
const failures = [];
const notes = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

const expectedSlugs = [
  "high-hill-nativity-of-mary", "ammannsville-st-john-the-baptist", "praha-st-marys-assumption", "dubina-saints-cyril-methodius",
  "moravia-ascension-of-our-lord", "st-john-texas-st-john-the-baptist", "wallis-guardian-angel", "wesley-brethren-church",
  "amarillo-first-baptist-church", "umbarger-st-marys-catholic-church", "paris-first-united-methodist-church", "lindsay-st-peters-catholic-church",
  "fredericksburg-st-marys-catholic-church", "sweet-home-queen-of-peace", "st-marys-immaculate-conception-lavaca", "shiner-saints-cyril-methodius",
  "serbin-st-paul-lutheran-church", "panna-maria-immaculate-conception", "plantersville-st-marys-catholic-church", "corn-hill-holy-trinity-catholic-church",
  "palestine-sacred-heart-catholic-church", "bandera-st-stanislaus-catholic-church", "corpus-christi-sacred-heart-catholic-church", "san-antonio-st-joseph-catholic-church",
  "anderson-st-stanislaus-kostka", "castroville-st-louis-catholic-church", "lacoste-our-lady-of-grace", "galveston-st-joseph-church",
];

const detailRoute = read("src/routes/explore.painted-churches.$slug.tsx");
assert(detailRoute.includes("canonicalPaintedChurchProfileBySlug"), "Detail route must use canonical profile resolver.");
assert(detailRoute.includes("canonicalPaintedChurchGalleryBySlug"), "Detail route must use canonical merged gallery resolver.");
assert(!detailRoute.includes("paintedChurchProfileBySlug(params.slug) ??"), "Legacy profile resolver chain must not return to detail route.");
assert(!detailRoute.includes("paintedChurchGalleryBySlug(church.slug)"), "Detail route must not render the base-only gallery path.");

const seo = read("src/lib/seo.ts");
assert(seo.includes("PAINTED_CHURCHES_PREINDEX_ROBOTS"), "Shared SEO helper must contain Painted Churches pre-index robots policy.");
assert(seo.includes('"noindex, follow'), "Painted Churches pre-index robots policy must be noindex, follow.");

const deploy = read(".github/workflows/deploy-production.yml");
assert(deploy.includes("PUBLIC_INDEXING_ENABLED"), "Production workflow must gate search-engine submission behind PUBLIC_INDEXING_ENABLED.");
assert(deploy.includes("submit-indexnow.mjs"), "Production workflow must retain explicit IndexNow orchestration.");

const expanded = read("src/data/painted-churches-expanded.ts");
assert(expanded.includes("galveston-st-joseph-church"), "Canonical collection must include St. Joseph's Galveston.");
assert(expanded.includes("historical-thematic-nomination-member"), "Galveston/thematic-nomination distinction must be represented in the canonical model.");

const thematic = read("src/data/painted-church-thematic-nomination.ts");
assert(thematic.includes("galveston-st-joseph-church"), "Original thematic nomination model must include Galveston.");
assert(thematic.includes("originalChurchCount: 15"), "Original thematic nomination model must preserve the historical fifteen-church study.");
assert(thematic.includes("currentThcMpsIndexCount: 14"), "Thematic model must preserve the current fourteen-entry THC MPS index distinction.");

const concordance = read("src/data/painted-church-count-concordance.ts");
for (const required of ["6 churches", "14 associated entries", "15 churches", "More than 20", "32 remain", "Up to 35 surviving churches"]) assert(concordance.includes(required), `Count concordance must preserve published count: ${required}`);

const mapSource = read("src/data/painted-church-map-points.ts");
const mapSlugs = new Set([...mapSource.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]));
for (const slug of expectedSlugs) assert(mapSlugs.has(slug), `Missing map point for ${slug}.`);
assert(mapSlugs.size === expectedSlugs.length, `Expected ${expectedSlugs.length} map slugs; found ${mapSlugs.size}.`);
const nonExact = [...mapSource.matchAll(/slug:\s*"([^"]+)"[^\n]+precision:\s*"(near-property|community)"/g)].map((match) => `${match[1]} (${match[2]})`);
if (nonExact.length) notes.push(`Map precision stretch queue: ${nonExact.join(", ")}`);

const visitorSource = read("src/data/painted-church-visitor-status.ts");
for (const slug of expectedSlugs) assert(visitorSource.includes(`"${slug}"`), `Missing explicit visitor research for ${slug}.`);
assert(!visitorSource.includes("Texas Defined does not currently have a church-controlled public-access guarantee"), "Generic visitor-status fallback must not return for verified churches.");

const featureSource = `${read("src/data/painted-church-features.ts")}\n${read("src/data/painted-church-features-authority.ts")}`;
const featureSlugs = new Set([...featureSource.matchAll(/churchSlug:\s*"([^"]+)"/g)].map((match) => match[1]));
const missingFeatureSlugs = expectedSlugs.filter((slug) => !featureSlugs.has(slug));
assert(missingFeatureSlugs.length === 0, `Object-level feature inventory missing: ${missingFeatureSlugs.join(", ") || "none"}.`);
for (const type of ["mural", "symbol", "ornament", "faux-finish", "stained-glass", "inscription", "altar-reredos", "pulpit", "organ", "restoration-evidence"]) assert(featureSource.includes(`"${type}"`), `Feature inventory must support ${type}.`);
assert(read("src/data/painted-church-feature-index.ts").includes("canonicalPaintedChurchFeatures"), "Canonical feature registry must exist.");

const contributorSource = `${read("src/data/painted-church-contributors.ts")}\n${read("src/data/painted-church-contributors-authority.ts")}`;
for (const contributor of ["o-kramer", "frank-bohlmann", "jacob-wagner", "frank-a-ludewig", "j-carlander", "schnoor-company", "elmer-witter-van-slyke", "clyde-h-woodruff", "rev-louis-netardus", "arthur-fatjo", "nicholas-j-clayton", "charles-sebastian-ott", "joseph-frederick-wolff"]) assert(contributorSource.includes(`slug: "${contributor}"`), `Contributor registry missing ${contributor}.`);
assert(read("src/data/painted-church-contributor-index.ts").includes("canonicalPaintedChurchContributors"), "Canonical contributor registry must exist.");

for (const file of [
  "src/routes/explore.painted-churches.national-register-study.tsx", "src/routes/explore.painted-churches.bibliography.tsx",
  "src/routes/explore.painted-churches.features.tsx", "src/routes/explore.painted-churches.count-concordance.tsx",
  "src/routes/explore.painted-churches.inscriptions.tsx", "src/routes/explore.painted-churches.stained-glass.tsx",
  "src/routes/explore.painted-churches.sacred-furnishings.tsx", "src/routes/explore.painted-churches.preindex-readiness.tsx",
  "src/data/painted-church-preindex-readiness.ts", "src/data/painted-church-evidence-ledger.ts",
  "src/components/editorial/PaintedChurchEvidenceLedger.tsx", "src/data/painted-church-source-registry.ts",
  "src/routes/explore.painted-churches.sources.tsx", "src/data/painted-church-editorial-status.ts",
  "src/components/editorial/PaintedChurchEditorialStatus.tsx",
]) assert(exists(file), `Missing pre-index authority asset: ${file}`);

const knowledgeLinks = read("src/components/editorial/PaintedChurchKnowledgeLinks.tsx");
assert(knowledgeLinks.includes("PaintedChurchEvidenceLedger"), "Every church page must expose the claim-level evidence ledger.");
assert(knowledgeLinks.includes("PaintedChurchEditorialStatus"), "Every church page must disclose research/fieldwork status.");

const ledger = read("src/data/painted-church-evidence-ledger.ts");
for (const category of ["identity", "classification", "chronology", "designation", "location", "visitor", "interior-feature"]) assert(ledger.includes(`"${category}"`), `Evidence ledger must support ${category} claims.`);
assert(ledger.includes('"accepted" | "qualified" | "unresolved"'), "Evidence ledger must preserve accepted/qualified/unresolved status states.");

const sourceRegistry = read("src/data/painted-church-source-registry.ts");
for (const tier of ["primary-official", "archive-register", "scholarly-public-history", "current-organization", "secondary-discovery"]) assert(sourceRegistry.includes(`"${tier}"`), `Source registry missing provenance tier ${tier}.`);
assert(sourceRegistry.includes("paintedChurchSourcesForChurch"), "Source registry must support per-church provenance retrieval.");

const editorial = read("src/data/painted-church-editorial-status.ts");
assert(editorial.includes('fieldworkStatus: "not-yet-field-verified"'), "Fieldwork must remain explicitly unclaimed until original Texas Defined visits are documented.");
assert(editorial.includes('expertReviewStatus: "not-claimed"'), "Expert review must remain explicitly unclaimed until documented.");

const census = read("src/data/painted-church-census.ts");
for (const slug of ["palestine-first-presbyterian-church", "houston-annunciation-catholic-church", "galveston-first-presbyterian-church", "waco-st-francis-on-the-brazos", "san-antonio-st-sophia-greek-orthodox"]) assert(census.includes(slug), `Expanded statewide census missing ${slug}.`);
for (const status of ["candidate", "research-lead", "scope-review", "historic-loss", "excluded"]) assert(census.includes(`"${status}"`), `Census must support ${status} disposition.`);

const comparison = read("src/routes/explore.painted-churches.compare.tsx");
for (const control of ["Classification", "Interior integrity", "Technique", "Denomination", "Rights-cleared image", "Sort"]) assert(comparison.includes(control), `Interactive comparison missing ${control} control.`);
assert(comparison.includes("canonicalPaintedChurchContributors"), "Comparison must use canonical contributor authority registry.");
assert(comparison.includes("function MobileCard"), "Comparison must provide mobile cards.");
assert(!comparison.includes("MobileCard({ row }: { row: ReturnType<typeof buildRowType> }) { return null"), "Comparison mobile cards must not regress to placeholder implementation.");

const symbolRoute = read("src/routes/explore.painted-churches.symbols.$slug.tsx");
assert(!symbolRoute.includes("sameAs: symbol.sourceUrl"), "Supporting symbol sources must not be modeled as identity-equivalent sameAs URLs.");
assert(symbolRoute.includes("subjectOf"), "Symbol schema must expose source/church evidence through subjectOf.");

const bibliography = read("src/data/painted-church-bibliography.ts");
for (const source of ["nps-thematic-1982", "harwood-archive", "harwood-decorating-texas", "austin-pbs-documentary", "head-field-research", "macatee-2026"]) assert(bibliography.includes(`id: "${source}"`), `Bibliography missing ${source}.`);

const candidateProfiles = read("src/data/painted-church-profiles-authority.ts");
const candidateResearch = read("src/data/painted-church-research-authority.ts");
const extraGallery = read("src/data/painted-church-gallery-extra.ts");
for (const slug of ["palestine-first-presbyterian-church", "houston-annunciation-catholic-church"]) {
  assert(candidateProfiles.includes(`slug: "${slug}"`), `High-priority candidate missing full authority profile: ${slug}.`);
  assert(candidateResearch.includes(`slug: "${slug}"`), `High-priority candidate missing research dossier: ${slug}.`);
  assert(featureSource.includes(`churchSlug: "${slug}"`), `High-priority candidate missing object inventory: ${slug}.`);
  assert(extraGallery.includes(`"${slug}"`), `High-priority candidate missing rights-cleared photography: ${slug}.`);
}

if (notes.length) {
  console.log("Painted Churches pre-index stretch notes:");
  for (const note of notes) console.log(`- ${note}`);
}

if (failures.length) {
  console.error(`Painted Churches pre-index authority gate FAILED (${failures.length} issue${failures.length === 1 ? "" : "s"}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Painted Churches pre-index authority gate passed for ${expectedSlugs.length} verified churches; high-priority candidate packages are preserved separately until canonical promotion.`);
