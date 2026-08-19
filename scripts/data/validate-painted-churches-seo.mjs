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
const comparison = read('src/routes/explore.painted-churches.compare.tsx');
const jsonDataset = read('src/routes/painted-churches[.]json.ts');
const csvDataset = read('src/routes/painted-churches[.]csv.ts');
const citationGuide = read('src/routes/citation-guide.tsx');
const citationManifest = JSON.parse(read('public/citation-magnets.json'));
const llms = read('src/routes/llms[.]txt.ts');
const trustRouter = read('src/components/authority/CitationCollectionTrustRouter.tsx');

const supportRoutes = [
  'src/routes/explore.painted-churches.map.tsx',
  'src/routes/explore.painted-churches.compare.tsx',
  'src/routes/explore.painted-churches.how-many.tsx',
  'src/routes/explore.painted-churches.methodology.tsx',
];
const supportPaths = [
  '/explore/painted-churches/map',
  '/explore/painted-churches/compare',
  '/explore/painted-churches/how-many',
  '/explore/painted-churches/methodology',
];
const authorityPaths = ['/explore/painted-churches', ...supportPaths];

for (const path of supportRoutes) {
  if (!fs.existsSync(path)) failures.push(`Missing Painted Churches authority route: ${path}`);
}

if (!hub.includes('expandedPaintedChurches')) failures.push('Painted Churches hub must render the expanded verified collection.');
if (hub.includes('paintedChurches.map((church)')) failures.push('Painted Churches hub must not fall back to the original 18-church collection.');
if (!hub.includes('"@type": "CollectionPage"')) failures.push('Painted Churches hub must publish CollectionPage schema.');
if (!hub.includes('"@type": "ItemList"')) failures.push('Painted Churches hub must publish ItemList schema.');
if (!hub.includes('Quick answer')) failures.push('Painted Churches hub must keep a visible answer-first section.');
if (!hub.includes('How many Painted Churches are there?')) failures.push('Painted Churches hub must answer the count question directly.');
if (!hub.includes('Collection reviewed August 18, 2026')) failures.push('Painted Churches hub must expose a visible review date.');

for (const path of supportPaths) {
  if (!sitemap.includes(JSON.stringify(path))) failures.push(`Explore sitemap must include ${path}.`);
  if (!publicRoutes.includes(JSON.stringify(path))) failures.push(`Indexable public-route registry must include ${path}.`);
  if (!searchDocs.includes(JSON.stringify(path))) failures.push(`Global search must expose ${path}.`);
  if (!hub.includes(path)) failures.push(`Painted Churches hub must link to ${path}.`);
}

if (!sitemap.includes('expandedPaintedChurches')) failures.push('Explore sitemap must emit individual churches from the expanded collection.');
if (!searchDocs.includes('...collectionDocuments, ...churchDocuments')) failures.push('Global search must include collection resources and individual church documents.');
if (!gallery.includes('"@type": "ImageObject"')) failures.push('Painted Church galleries must publish ImageObject schema.');
if (!gallery.includes('acquireLicensePage')) failures.push('Painted Church image schema must expose source/license pages.');
if (!gallery.includes('creditText')) failures.push('Painted Church image schema must preserve creator credit.');
if (!dossier.includes('Research methodology & corrections')) failures.push('Every Painted Church dossier must link to the methodology/corrections page.');
if (!dossier.includes('Verified church, visible source trail.')) failures.push('Every Painted Church dossier must expose the editorial-standard authority panel.');

if (!comparison.includes('"@type": "Dataset"')) failures.push('Painted Churches comparison must publish Dataset schema.');
if (!comparison.includes('/painted-churches.csv') || !comparison.includes('/painted-churches.json')) failures.push('Painted Churches comparison must link both machine-readable distributions.');
if (!jsonDataset.includes('primarySourceUrl') || !jsonDataset.includes('sourceCheckedAt')) failures.push('Painted Churches JSON must preserve provenance and source-check dates.');
if (!jsonDataset.includes('X-Robots-Tag') || !jsonDataset.includes('noindex, follow')) failures.push('Painted Churches JSON must stay noindex/follow.');
if (!csvDataset.includes('primary_source_url') || !csvDataset.includes('source_checked_at')) failures.push('Painted Churches CSV must preserve provenance and source-check dates.');
if (!csvDataset.includes('X-Robots-Tag') || !csvDataset.includes('noindex, follow')) failures.push('Painted Churches CSV must stay noindex/follow.');
for (const download of ['/painted-churches.csv', '/painted-churches.json']) {
  if (!publicRoutes.includes(JSON.stringify(download))) failures.push(`Public-route governance must register machine-readable distribution ${download}.`);
}

const manifestUrls = new Set(citationManifest.resources.map((resource) => resource.url));
for (const path of authorityPaths) {
  const url = `https://texasdefined.com${path}`;
  if (!manifestUrls.has(url)) failures.push(`Citation manifest must promote ${url}.`);
  if (!llms.includes(url)) failures.push(`llms.txt must explicitly prioritize ${url}.`);
  if (!trustRouter.includes(`'${path}'`)) failures.push(`Citation trust router must cover ${path}.`);
}
if (!citationGuide.includes("title: 'Painted Churches of Texas'")) failures.push('Citation guide must expose a dedicated Painted Churches reference family.');
if (!citationGuide.includes('Painted Churches source hierarchy')) failures.push('Citation guide must explain Painted Churches source precedence.');
if (!citationGuide.includes('/explore/painted-churches/how-many')) failures.push('Citation guide must link the Painted Churches count explainer.');
if (!llms.includes('## Painted Churches of Texas')) failures.push('llms.txt must include a dedicated Painted Churches retrieval section.');
if (!llms.includes('Do not treat “Schulenburg cluster,” “National Register decorative-interior group” and “broader Painted Churches tradition” as interchangeable labels.')) failures.push('llms.txt must preserve Painted Churches definition separation.');

for (const marker of ['plantersville-st-marys-catholic-church','corn-hill-holy-trinity-catholic-church','palestine-sacred-heart-catholic-church','bandera-st-stanislaus-catholic-church']) {
  if (!expanded.includes(marker)) failures.push(`Expanded collection must retain verified addition ${marker}.`);
}

if (failures.length) {
  console.error('Painted Churches SEO/AEO/authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Painted Churches hub, authority cluster, indexing policy, search discovery, image schema, citation manifest, llms guidance, trust panels, machine-readable datasets and methodology links are protected.');
