import fs from 'node:fs';

const failures = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const exists = (path) => fs.existsSync(path);
const requireText = (content, token, label) => { if (!content.includes(token)) failures.push(`${label} missing ${token}`); };

const expanded = read('src/data/painted-churches-expanded.ts');
const census = read('src/data/painted-church-census.ts');
const hub = read('src/routes/explore.painted-churches.tsx');
const sitemap = read('src/routes/sitemap-explore[.]xml.ts');
const search = read('src/data/painted-church-search.ts');
const publicRoutes = read('src/lib/public-routes.ts');
const mapPoints = read('src/data/painted-church-map-points.ts');
const visitor = read('src/data/painted-church-visitor-status.ts');
const register = read('src/data/painted-church-register-evidence.ts');
const techniques = read('src/data/painted-church-techniques.ts');
const symbols = read('src/data/painted-church-symbols.ts');
const people = read('src/data/painted-church-people.ts');
const heritage = read('src/data/painted-church-heritage.ts');
const preservation = read('src/data/painted-church-preservation.ts');
const glossary = read('src/data/painted-church-glossary.ts');
const itineraries = read('src/data/painted-church-itineraries.ts');
const profileIndex = read('src/data/painted-church-profile-index.ts');
const researchIndex = read('src/data/painted-church-research-index.ts');
const detail = read('src/routes/explore.painted-churches.$slug.tsx');
const dossier = read('src/components/editorial/PaintedChurchResearchDossier.tsx');
const gallery = read('src/components/editorial/PaintedChurchGallery.tsx');
const thenNow = read('src/components/editorial/PaintedChurchThenAndNow.tsx');
const thenNowRoute = read('src/routes/explore.painted-churches.then-and-now.tsx');
const comparison = read('src/routes/explore.painted-churches.compare.tsx');
const jsonData = read('src/routes/painted-churches[.]json.ts');
const csvData = read('src/routes/painted-churches[.]csv.ts');
const llms = read('src/routes/llms[.]txt.ts');
const manifest = read('public/citation-magnets.json');
const countyGuides = read('src/components/content/CountyGuideSections.tsx');
const thematic = read('src/data/painted-church-thematic-nomination.ts');
const sourceRegistry = read('src/data/painted-church-source-registry.ts');
const publication = read('src/lib/painted-church-publication.ts');

const requiredFiles = [
  'src/routes/explore.painted-churches.symbols.tsx','src/routes/explore.painted-churches.symbols.$slug.tsx',
  'src/routes/explore.painted-churches.people.tsx','src/routes/explore.painted-churches.people.$slug.tsx',
  'src/routes/explore.painted-churches.heritage.tsx','src/routes/explore.painted-churches.heritage.$slug.tsx',
  'src/routes/explore.painted-churches.preservation.tsx','src/routes/explore.painted-churches.preservation.$slug.tsx',
  'src/routes/explore.painted-churches.knowledge-graph.tsx','src/routes/explore.painted-churches.harwood-archive.tsx',
  'src/routes/explore.painted-churches.how-to-read.tsx','src/routes/explore.painted-churches.glossary.tsx',
  'src/routes/explore.painted-churches.glossary.$slug.tsx','src/routes/explore.painted-churches.timeline.tsx',
  'src/routes/explore.painted-churches.routes.tsx','src/routes/explore.painted-churches.routes.$slug.tsx',
  'src/routes/explore.painted-churches.print-guide.tsx','src/routes/explore.painted-churches.media.tsx',
  'src/routes/explore.painted-churches.cite.tsx','src/routes/explore.painted-churches.then-and-now.tsx',
  'src/routes/explore.painted-churches.national-register-study.tsx','src/routes/explore.painted-churches.bibliography.tsx',
  'src/routes/explore.painted-churches.features.tsx','src/routes/explore.painted-churches.count-concordance.tsx',
  'src/routes/explore.painted-churches.inscriptions.tsx','src/routes/explore.painted-churches.stained-glass.tsx',
  'src/routes/explore.painted-churches.sacred-furnishings.tsx','src/routes/explore.painted-churches.sources.tsx',
  'src/routes/explore.painted-churches.preindex-readiness.tsx',
  'src/data/painted-church-thematic-nomination.ts','src/data/painted-church-count-concordance.ts',
  'src/data/painted-church-bibliography.ts','src/data/painted-church-source-registry.ts',
  'src/data/painted-church-evidence-ledger.ts','src/data/painted-church-preindex-readiness.ts',
];
for (const path of requiredFiles) if (!exists(path)) failures.push(`Missing authority file ${path}`);

requireText(hub, 'expandedPaintedChurches', 'Hub');
requireText(hub, '"@type": "CollectionPage"', 'Hub schema');
requireText(hub, 'Quick answer', 'Hub AEO');
if (expanded.includes('originalPaintedChurches.push(') || expanded.includes('church.image = override')) failures.push('Canonical collection must remain side-effect free.');
for (const token of ['classification:', 'interiorIntegrity:', 'culturalHeritage:', 'techniques:']) requireText(expanded, token, 'Canonical model');

const promoted = [
  'corpus-christi-sacred-heart-catholic-church','san-antonio-st-joseph-catholic-church',
  'anderson-st-stanislaus-kostka','castroville-st-louis-catholic-church','lacoste-our-lady-of-grace',
  'galveston-st-joseph-church',
];
for (const slug of promoted) {
  requireText(expanded, slug, 'Canonical collection');
  requireText(mapPoints, `slug: "${slug}"`, 'Map registry');
  requireText(visitor, `"${slug}"`, 'Visitor-status registry');
  if (census.includes(`slug: "${slug}"`)) failures.push(`Promoted church still appears in candidate census: ${slug}`);
}
requireText(census, 'status: "candidate"', 'Census');
requireText(census, 'status: "excluded"', 'Census');

const mapCount = (mapPoints.match(/slug: "/g) ?? []).length;
if (mapCount !== 28) failures.push(`Expected 28 map points, found ${mapCount}.`);
const formalCount = (register.match(/nris: "/g) ?? []).length;
if (formalCount !== 14) failures.push(`Expected 14 current THC MPS evidence records, found ${formalCount}.`);
requireText(thematic, 'originalChurchCount: 15', 'Original thematic study');
requireText(thematic, 'currentThcMpsIndexCount: 14', 'Current THC MPS distinction');
requireText(thematic, 'galveston-st-joseph-church', 'Historical fifteenth church');

const techniqueSlugs = ['stenciling','infill','freehand','marbling','graining','pouncing','gilding-metallic-accents','trompe-loeil-architectural-illusion','canvas-applied-decoration','decorative-murals'];
for (const slug of techniqueSlugs) requireText(techniques, `slug: "${slug}"`, 'Technique taxonomy');
const symbolSlugs = ['all-seeing-eye','ihs','lamb-of-god','holy-spirit-dove','maltese-cross','grapes-and-vines','wheat-and-eucharist','angels','marian-imagery','evangelist-symbols'];
for (const slug of symbolSlugs) requireText(symbols, `slug: "${slug}"`, 'Symbol taxonomy');
if ((people.match(/slug: "/g) ?? []).length < 20) failures.push('People authority layer dropped below 20 documented people.');
if ((heritage.match(/slug: "/g) ?? []).length < 7) failures.push('Heritage authority layer dropped below 7 contexts.');
if ((preservation.match(/slug: "/g) ?? []).length < 5) failures.push('Preservation authority layer dropped below 5 concepts.');
if ((glossary.match(/slug: "/g) ?? []).length < 11) failures.push('Glossary dropped below 11 terms.');
if ((itineraries.match(/slug: "/g) ?? []).length < 8) failures.push('Itinerary layer dropped below 8 routes.');

requireText(profileIndex, 'authorityPaintedChurchProfileBySlug', 'Canonical profile resolver');
requireText(profileIndex, 'latestPaintedChurchProfileBySlug', 'Canonical profile resolver');
requireText(researchIndex, 'authorityPaintedChurchResearchBySlug', 'Canonical research resolver');
requireText(researchIndex, 'latestPaintedChurchResearchBySlug', 'Canonical research resolver');
requireText(detail, 'canonicalPaintedChurchProfileBySlug', 'Detail route canonical profile');
requireText(detail, 'canonicalPaintedChurchGalleryBySlug', 'Detail route canonical gallery');
if (detail.includes('paintedChurchProfileBySlug(params.slug) ??')) failures.push('Legacy profile chain returned to detail route.');

requireText(dossier, 'PaintedChurchThenAndNow', 'Church dossier');
requireText(dossier, 'PaintedChurchVisitorStatus', 'Church dossier');
requireText(dossier, 'PaintedChurchKnowledgeLinks', 'Church dossier');
requireText(gallery, '"@type": "ImageObject"', 'Image schema');
requireText(gallery, 'acquireLicensePage', 'Image licensing schema');
requireText(thenNow, 'expansionPaintedChurchArchivalImagesBySlug', 'Then & Now merge');
requireText(thenNowRoute, 'Rights-clearing queue', 'Then & Now authority page');
requireText(comparison, 'useState', 'Interactive comparison');
requireText(comparison, 'canonicalPaintedChurchContributors', 'Comparison contributor graph');
requireText(comparison, 'Rights-cleared image', 'Comparison image filter');
requireText(jsonData, 'schemaVersion: 4', 'JSON dataset');
for (const token of ['map:', 'comparison:', 'routes:', 'thenAndNow:', 'media:', 'citationGuide:']) requireText(jsonData, token, 'JSON authority metadata');
requireText(csvData, 'documented_symbols', 'CSV dataset');
requireText(sourceRegistry, 'paintedChurchSourcesForChurch', 'Canonical source registry');

requireText(countyGuides, "import { expandedPaintedChurches }", 'County reciprocal links');
requireText(countyGuides, 'countyChurches = expandedPaintedChurches.filter', 'County reciprocal links');
requireText(countyGuides, 'Painted Churches in {entity.name}', 'County reciprocal links');

const authorityPaths = [
  '/explore/painted-churches/map','/explore/painted-churches/compare','/explore/painted-churches/how-many',
  '/explore/painted-churches/methodology','/explore/painted-churches/census','/explore/painted-churches/techniques',
  '/explore/painted-churches/symbols','/explore/painted-churches/people','/explore/painted-churches/heritage',
  '/explore/painted-churches/preservation','/explore/painted-churches/knowledge-graph','/explore/painted-churches/harwood-archive',
  '/explore/painted-churches/how-to-read','/explore/painted-churches/glossary','/explore/painted-churches/timeline',
  '/explore/painted-churches/routes','/explore/painted-churches/print-guide','/explore/painted-churches/media',
  '/explore/painted-churches/cite','/explore/painted-churches/then-and-now',
  '/explore/painted-churches/national-register-study','/explore/painted-churches/bibliography',
  '/explore/painted-churches/features','/explore/painted-churches/count-concordance',
  '/explore/painted-churches/inscriptions','/explore/painted-churches/stained-glass',
  '/explore/painted-churches/sacred-furnishings','/explore/painted-churches/sources',
];
for (const path of authorityPaths) {
  requireText(publicRoutes, JSON.stringify(path), 'Public-route registry');
}
// During deliberate pre-index review, the XML sitemap should withhold Painted Churches paths.
requireText(sitemap, 'shouldIndexPaintedChurchPath', 'Explore sitemap pre-index hold');
requireText(publication, 'PAINTED_CHURCHES_SEARCH_INDEXING_ENABLED = false', 'Publication hold');
requireText(llms, '/explore/painted-churches/knowledge-graph', 'llms authority graph');
requireText(manifest, 'https://texasdefined.com/explore/painted-churches', 'Citation manifest collection resource');

if (failures.length) {
  console.error('Painted Churches authority validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('Painted Churches authority protected: 28 verified churches, historical 15/current 14 register distinction, canonical profile/gallery/source systems, entity authority pages, archival comparisons, visitor evidence, interactive comparison, datasets, noindex/sitemap hold and citation surfaces.');
