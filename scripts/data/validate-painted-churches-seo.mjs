import fs from 'node:fs';

const failures = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const exists = (path) => fs.existsSync(path);
const requireText = (content, token, label) => { if (!content.includes(token)) failures.push(`${label} missing ${token}`); };
const forbidText = (content, token, label) => { if (content.includes(token)) failures.push(`${label} contains stale ${token}`); };

const expanded = read('src/data/painted-churches-expanded.ts');
const census = read('src/data/painted-church-census.ts');
const hub = read('src/routes/explore.painted-churches.tsx');
const detailRoute = read('src/routes/explore.painted-churches.$slug.tsx');
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
const latestProfiles = read('src/data/painted-church-profiles-latest.ts');
const latestResearch = read('src/data/painted-church-research-latest.ts');
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
  'src/data/painted-church-profiles-latest.ts','src/data/painted-church-research-latest.ts',
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
];
for (const slug of promoted) {
  requireText(expanded, slug, 'Canonical collection');
  requireText(mapPoints, `slug: "${slug}"`, 'Map registry');
  requireText(visitor, `slug: "${slug}"`, 'Visitor-status registry');
  if (census.includes(`slug: "${slug}"`)) failures.push(`Promoted church still appears in candidate census: ${slug}`);
}
requireText(census, 'status: "candidate"', 'Census');
requireText(census, 'status: "excluded"', 'Census');

const mapCount = (mapPoints.match(/slug: "/g) ?? []).length;
if (mapCount !== 27) failures.push(`Expected 27 map points, found ${mapCount}.`);
const formalCount = (register.match(/nris: "/g) ?? []).length;
if (formalCount !== 14) failures.push(`Expected 14 formal National Register evidence records, found ${formalCount}.`);

const techniqueSlugs = ['stenciling','infill','freehand','marbling','graining','pouncing','gilding-metallic-accents','trompe-loeil-architectural-illusion','canvas-applied-decoration','decorative-murals'];
for (const slug of techniqueSlugs) requireText(techniques, `slug: "${slug}"`, 'Technique taxonomy');
const symbolSlugs = ['all-seeing-eye','ihs','lamb-of-god','holy-spirit-dove','maltese-cross','grapes-and-vines','wheat-and-eucharist','angels','marian-imagery','evangelist-symbols'];
for (const slug of symbolSlugs) requireText(symbols, `slug: "${slug}"`, 'Symbol taxonomy');
if ((people.match(/slug: "/g) ?? []).length < 14) failures.push('People authority layer dropped below 14 documented people.');
if ((heritage.match(/slug: "/g) ?? []).length < 7) failures.push('Heritage authority layer dropped below 7 contexts.');
if ((preservation.match(/slug: "/g) ?? []).length < 5) failures.push('Preservation authority layer dropped below 5 concepts.');
if ((glossary.match(/slug: "/g) ?? []).length < 11) failures.push('Glossary dropped below 11 terms.');
if ((itineraries.match(/slug: "/g) ?? []).length < 8) failures.push('Itinerary layer dropped below 8 routes.');

requireText(profileIndex, 'latestPaintedChurchProfileBySlug', 'Canonical profile resolver');
requireText(researchIndex, 'latestPaintedChurchResearchBySlug', 'Canonical research resolver');
requireText(detailRoute, 'import { canonicalPaintedChurchProfileBySlug } from "@/data/painted-church-profile-index";', 'Primary Painted Church detail resolver');
requireText(detailRoute, 'const profile = canonicalPaintedChurchProfileBySlug(params.slug);', 'Primary Painted Church detail resolver');
for (const token of [
  '@/data/painted-church-profiles-additional', '@/data/painted-church-profiles-additions',
  '@/data/painted-church-profiles-final', '@/data/painted-church-profiles-extended',
  '@/data/painted-church-profiles-statewide', '@/data/painted-church-profiles"',
]) forbidText(detailRoute, token, 'Primary Painted Church detail resolver');
for (const slug of ['castroville-st-louis-catholic-church','lacoste-our-lady-of-grace']) {
  requireText(latestProfiles, `slug: "${slug}"`, 'Latest profile layer');
  requireText(latestResearch, `slug: "${slug}"`, 'Latest research layer');
}

requireText(dossier, 'PaintedChurchThenAndNow', 'Church dossier');
requireText(dossier, 'PaintedChurchVisitorStatus', 'Church dossier');
requireText(dossier, 'PaintedChurchKnowledgeLinks', 'Church dossier');
requireText(gallery, '"@type": "ImageObject"', 'Image schema');
requireText(gallery, 'acquireLicensePage', 'Image licensing schema');
requireText(thenNow, 'expansionPaintedChurchArchivalImagesBySlug', 'Then & Now merge');
requireText(thenNowRoute, 'Rights-clearing queue', 'Then & Now authority page');
requireText(comparison, 'builtYear', 'Comparison intelligence');
requireText(comparison, 'paintedChurchSymbols', 'Comparison intelligence');
requireText(jsonData, 'schemaVersion: 4', 'JSON dataset');
requireText(jsonData, 'asOf: "2026-08-19"', 'JSON dataset freshness');
for (const token of ['map:', 'comparison:', 'routes:', 'thenAndNow:', 'media:', 'citationGuide:']) requireText(jsonData, token, 'JSON authority metadata');
requireText(csvData, 'documented_symbols', 'CSV dataset');

requireText(countyGuides, "import { expandedPaintedChurches }", 'County reciprocal links');
requireText(countyGuides, 'countyChurches = expandedPaintedChurches.filter', 'County reciprocal links');
requireText(countyGuides, 'Painted Churches in {entity.name}', 'County reciprocal links');
requireText(countyGuides, '/explore/painted-churches/map', 'County reciprocal links');

const authorityPaths = [
  '/explore/painted-churches/map','/explore/painted-churches/compare','/explore/painted-churches/how-many',
  '/explore/painted-churches/methodology','/explore/painted-churches/census','/explore/painted-churches/techniques',
  '/explore/painted-churches/symbols','/explore/painted-churches/people','/explore/painted-churches/heritage',
  '/explore/painted-churches/preservation','/explore/painted-churches/knowledge-graph','/explore/painted-churches/harwood-archive',
  '/explore/painted-churches/how-to-read','/explore/painted-churches/glossary','/explore/painted-churches/timeline',
  '/explore/painted-churches/routes','/explore/painted-churches/print-guide','/explore/painted-churches/media',
  '/explore/painted-churches/cite','/explore/painted-churches/then-and-now',
];
for (const path of authorityPaths) {
  // These are substantive self-canonical authority pages. Keep search discovery,
  // public-route governance and XML sitemap eligibility aligned so crawl signals
  // do not contradict the page-level canonical metadata.
  requireText(search, JSON.stringify(path), 'Global search');
  requireText(publicRoutes, JSON.stringify(path), 'Public-route registry');
  requireText(sitemap, JSON.stringify(path), 'Explore sitemap authority surface');
}
for (const path of ['/explore/painted-churches', '/explore/painted-churches/guides']) {
  requireText(sitemap, JSON.stringify(path), 'Explore sitemap canonical collection');
}
requireText(llms, 'currently contains 27 verified church profiles', 'llms.txt');
requireText(manifest, '27-verified-churches', 'Citation manifest');

if (failures.length) {
  console.error('Painted Churches authority validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('Painted Churches authority protected: 27 verified churches, 14 formal records, canonical detail-profile resolution, entity authority pages, archival comparisons, county reciprocal links, visitor freshness, JSON v4/CSV datasets, search, self-canonical sitemap coverage and citation surfaces.');
