import fs from 'node:fs';

const failures = [];
const read = (path) => fs.readFileSync(path, 'utf8');

const hub = read('src/routes/explore.painted-churches.tsx');
const sitemap = read('src/routes/sitemap-explore[.]xml.ts');
const publicRoutes = read('src/lib/public-routes.ts');
const searchDocs = read('src/data/painted-church-search.ts');
const gallery = read('src/components/editorial/PaintedChurchGallery.tsx');
const dossier = read('src/components/editorial/PaintedChurchResearchDossier.tsx');
const expanded = read('src/data/painted-churches-expanded.ts');
const census = read('src/data/painted-church-census.ts');
const registerEvidence = read('src/data/painted-church-register-evidence.ts');
const canonicalRecord = read('src/components/editorial/PaintedChurchCanonicalRecord.tsx');
const techniques = read('src/data/painted-church-techniques.ts');
const techniqueHub = read('src/routes/explore.painted-churches.techniques.tsx');
const techniqueDetail = read('src/routes/explore.painted-churches.techniques.$slug.tsx');
const comparison = read('src/routes/explore.painted-churches.compare.tsx');
const jsonDataset = read('src/routes/painted-churches[.]json.ts');
const csvDataset = read('src/routes/painted-churches[.]csv.ts');

const supportRoutes = [
  'src/routes/explore.painted-churches.map.tsx',
  'src/routes/explore.painted-churches.compare.tsx',
  'src/routes/explore.painted-churches.how-many.tsx',
  'src/routes/explore.painted-churches.methodology.tsx',
  'src/routes/explore.painted-churches.census.tsx',
  'src/routes/explore.painted-churches.techniques.tsx',
  'src/routes/explore.painted-churches.techniques.$slug.tsx',
];
const staticSupportPaths = [
  '/explore/painted-churches/map',
  '/explore/painted-churches/compare',
  '/explore/painted-churches/how-many',
  '/explore/painted-churches/methodology',
  '/explore/painted-churches/census',
  '/explore/painted-churches/techniques',
];

for (const path of supportRoutes) if (!fs.existsSync(path)) failures.push(`Missing Painted Churches authority route: ${path}`);

if (!hub.includes('expandedPaintedChurches')) failures.push('Painted Churches hub must render the expanded verified collection.');
if (!hub.includes('"@type": "CollectionPage"')) failures.push('Painted Churches hub must publish CollectionPage schema.');
if (!hub.includes('"@type": "ItemList"')) failures.push('Painted Churches hub must publish ItemList schema.');
if (!hub.includes('Quick answer')) failures.push('Painted Churches hub must keep a visible answer-first section.');

for (const path of staticSupportPaths) {
  if (!sitemap.includes(JSON.stringify(path))) failures.push(`Explore sitemap must include ${path}.`);
  if (!publicRoutes.includes(JSON.stringify(path))) failures.push(`Indexable public-route registry must include ${path}.`);
  if (!searchDocs.includes(JSON.stringify(path))) failures.push(`Global search must expose ${path}.`);
}

for (const token of ['classification:', 'interiorIntegrity:', 'culturalHeritage:', 'techniques:', 'modern-decorative-campaign', 'reconstructed-from-evidence']) {
  if (!expanded.includes(token)) failures.push(`Canonical Painted Church collection missing ${token}`);
}
if (expanded.includes('originalPaintedChurches.push(') || expanded.includes('church.image = override')) failures.push('Canonical collection must not mutate the original church array or records.');
for (const marker of ['plantersville-st-marys-catholic-church','corn-hill-holy-trinity-catholic-church','palestine-sacred-heart-catholic-church','bandera-st-stanislaus-catholic-church']) if (!expanded.includes(marker)) failures.push(`Expanded collection must retain ${marker}.`);
if (!census.includes('status: "candidate"') || !census.includes('status: "excluded"')) failures.push('Master census must retain candidates and explicit exclusions.');
if (!canonicalRecord.includes('Interior integrity') || !canonicalRecord.includes('Collection classification')) failures.push('Church pages must expose canonical classification and integrity.');

const nrisMatches = registerEvidence.match(/nris: "/g) ?? [];
if (nrisMatches.length !== 14) failures.push(`National Register evidence must contain 14 formal records; found ${nrisMatches.length}.`);
if (!registerEvidence.includes('npgallery.nps.gov/AssetDetail/NRIS/')) failures.push('National Register evidence must link NPS digital assets.');
if (!registerEvidence.includes('Churches with Decorative Interior Painting TR')) failures.push('National Register evidence must preserve the formal multiple-listing name.');
if (!dossier.includes('PaintedChurchRegisterEvidence')) failures.push('Church dossiers must render primary designation evidence.');

const techniqueSlugs = ['stenciling','infill','freehand','marbling','graining','pouncing','gilding-metallic-accents','trompe-loeil-architectural-illusion','canvas-applied-decoration','decorative-murals'];
for (const slug of techniqueSlugs) {
  if (!techniques.includes(`slug: "${slug}"`)) failures.push(`Technique taxonomy missing ${slug}.`);
  if (!sitemap.includes('paintedChurchTechniques')) failures.push('Explore sitemap must generate technique detail routes.');
}
if (!techniqueHub.includes('DefinedTermSet')) failures.push('Technique hub must publish DefinedTermSet schema.');
if (!techniqueDetail.includes('"@type": "DefinedTerm"')) failures.push('Technique detail pages must publish DefinedTerm schema.');
if (!techniqueDetail.includes('Churches connected to this technique')) failures.push('Technique detail pages must link documented church examples.');
if (!searchDocs.includes('...collectionDocuments, ...techniqueDocuments, ...churchDocuments')) failures.push('Global search must include collection, technique and church documents.');

if (!comparison.includes('interiorIntegrity') || !comparison.includes('culturalHeritage') || !comparison.includes('church.techniques')) failures.push('Comparison must expose canonical integrity, heritage and technique fields.');
if (!jsonDataset.includes('classification: church.classification') || !jsonDataset.includes('nationalRegisterEvidence')) failures.push('JSON dataset must expose canonical classification and register provenance.');
if (!csvDataset.includes('interior_integrity') || !csvDataset.includes('documented_techniques')) failures.push('CSV dataset must expose canonical integrity and techniques.');
if (!gallery.includes('"@type": "ImageObject"') || !gallery.includes('acquireLicensePage') || !gallery.includes('creditText')) failures.push('Painted Church galleries must preserve ImageObject licensing schema.');
if (!dossier.includes('Research methodology & corrections')) failures.push('Every Painted Church dossier must link methodology/corrections.');

if (failures.length) {
  console.error('Painted Churches phases 1–3 validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Painted Churches phases 1–3 protected: canonical census, 14-record National Register evidence layer, technique authority pages, search, sitemap, datasets and image provenance.');
