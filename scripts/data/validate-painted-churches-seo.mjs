import fs from 'node:fs';

const failures = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const exists = (path) => fs.existsSync(path);

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
const symbols = read('src/data/painted-church-symbols.ts');
const people = read('src/data/painted-church-people.ts');
const heritage = read('src/data/painted-church-heritage.ts');
const preservation = read('src/data/painted-church-preservation.ts');
const glossary = read('src/data/painted-church-glossary.ts');
const itineraries = read('src/data/painted-church-itineraries.ts');
const visitorStatus = read('src/data/painted-church-visitor-status.ts');
const graph = read('src/data/painted-church-knowledge-graph.ts');
const knowledgeLinks = read('src/components/editorial/PaintedChurchKnowledgeLinks.tsx');
const techniqueHub = read('src/routes/explore.painted-churches.techniques.tsx');
const techniqueDetail = read('src/routes/explore.painted-churches.techniques.$slug.tsx');
const symbolHub = read('src/routes/explore.painted-churches.symbols.tsx');
const symbolDetail = read('src/routes/explore.painted-churches.symbols.$slug.tsx');
const peopleDetail = read('src/routes/explore.painted-churches.people.$slug.tsx');
const heritageDetail = read('src/routes/explore.painted-churches.heritage.$slug.tsx');
const preservationDetail = read('src/routes/explore.painted-churches.preservation.$slug.tsx');
const glossaryDetail = read('src/routes/explore.painted-churches.glossary.$slug.tsx');
const graphRoute = read('src/routes/explore.painted-churches.knowledge-graph.tsx');
const harwood = read('src/routes/explore.painted-churches.harwood-archive.tsx');
const howToRead = read('src/routes/explore.painted-churches.how-to-read.tsx');
const timeline = read('src/routes/explore.painted-churches.timeline.tsx');
const routeHub = read('src/routes/explore.painted-churches.routes.tsx');
const routeDetail = read('src/routes/explore.painted-churches.routes.$slug.tsx');
const printGuide = read('src/routes/explore.painted-churches.print-guide.tsx');
const checklist = read('src/routes/painted-churches-checklist[.]txt.ts');
const visitorPanel = read('src/components/editorial/PaintedChurchVisitorStatus.tsx');
const comparison = read('src/routes/explore.painted-churches.compare.tsx');
const jsonDataset = read('src/routes/painted-churches[.]json.ts');
const csvDataset = read('src/routes/painted-churches[.]csv.ts');

const staticAuthorityPaths = [
  '/explore/painted-churches/map',
  '/explore/painted-churches/compare',
  '/explore/painted-churches/how-many',
  '/explore/painted-churches/methodology',
  '/explore/painted-churches/census',
  '/explore/painted-churches/techniques',
  '/explore/painted-churches/symbols',
  '/explore/painted-churches/people',
  '/explore/painted-churches/heritage',
  '/explore/painted-churches/preservation',
  '/explore/painted-churches/knowledge-graph',
  '/explore/painted-churches/harwood-archive',
  '/explore/painted-churches/how-to-read',
  '/explore/painted-churches/glossary',
  '/explore/painted-churches/timeline',
  '/explore/painted-churches/routes',
  '/explore/painted-churches/print-guide',
];

const requiredFiles = [
  'src/routes/explore.painted-churches.symbols.tsx',
  'src/routes/explore.painted-churches.symbols.$slug.tsx',
  'src/routes/explore.painted-churches.people.tsx',
  'src/routes/explore.painted-churches.people.$slug.tsx',
  'src/routes/explore.painted-churches.heritage.tsx',
  'src/routes/explore.painted-churches.heritage.$slug.tsx',
  'src/routes/explore.painted-churches.preservation.tsx',
  'src/routes/explore.painted-churches.preservation.$slug.tsx',
  'src/routes/explore.painted-churches.knowledge-graph.tsx',
  'src/routes/explore.painted-churches.harwood-archive.tsx',
  'src/routes/explore.painted-churches.how-to-read.tsx',
  'src/routes/explore.painted-churches.glossary.tsx',
  'src/routes/explore.painted-churches.glossary.$slug.tsx',
  'src/routes/explore.painted-churches.timeline.tsx',
  'src/routes/explore.painted-churches.routes.tsx',
  'src/routes/explore.painted-churches.routes.$slug.tsx',
  'src/routes/explore.painted-churches.print-guide.tsx',
  'src/routes/painted-churches-checklist[.]txt.ts',
];
for (const path of requiredFiles) if (!exists(path)) failures.push(`Missing Painted Churches authority file: ${path}`);

if (!hub.includes('expandedPaintedChurches')) failures.push('Painted Churches hub must render the canonical expanded collection.');
if (!hub.includes('"@type": "CollectionPage"') || !hub.includes('"@type": "ItemList"')) failures.push('Painted Churches hub must retain CollectionPage + ItemList schema.');
if (!hub.includes('Quick answer')) failures.push('Painted Churches hub must keep answer-first content.');

for (const path of staticAuthorityPaths) {
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
if (!registerEvidence.includes('npgallery.nps.gov/AssetDetail/NRIS/') || !registerEvidence.includes('Churches with Decorative Interior Painting TR')) failures.push('National Register evidence must preserve NPS provenance and formal multiple-listing name.');
if (!dossier.includes('PaintedChurchRegisterEvidence')) failures.push('Church dossiers must render primary designation evidence.');

const techniqueSlugs = ['stenciling','infill','freehand','marbling','graining','pouncing','gilding-metallic-accents','trompe-loeil-architectural-illusion','canvas-applied-decoration','decorative-murals'];
for (const slug of techniqueSlugs) if (!techniques.includes(`slug: "${slug}"`)) failures.push(`Technique taxonomy missing ${slug}.`);
if (!techniqueHub.includes('DefinedTermSet') || !techniqueDetail.includes('"@type": "DefinedTerm"')) failures.push('Technique authority pages must publish DefinedTermSet/DefinedTerm schema.');

const symbolSlugs = ['all-seeing-eye','ihs','lamb-of-god','holy-spirit-dove','maltese-cross','grapes-and-vines','wheat-and-eucharist','angels','marian-imagery','evangelist-symbols'];
for (const slug of symbolSlugs) if (!symbols.includes(`slug: "${slug}"`)) failures.push(`Symbol taxonomy missing ${slug}.`);
if (!symbolHub.includes('DefinedTermSet') || !symbolDetail.includes('"@type": "DefinedTerm"')) failures.push('Symbol authority pages must publish DefinedTermSet/DefinedTerm schema.');

const personCount = (people.match(/slug: "/g) ?? []).length;
if (personCount < 12) failures.push(`People authority layer must retain at least 12 documented people; found ${personCount}.`);
if (!peopleDetail.includes('"@type": "Person"') || !people.includes('buie-harwood')) failures.push('People authority layer must publish Person schema and Buie Harwood profile.');

const heritageCount = (heritage.match(/slug: "/g) ?? []).length;
if (heritageCount < 5) failures.push(`Heritage authority layer must retain at least 5 contexts; found ${heritageCount}.`);
if (!heritageDetail.includes('about: heritage.churchSlugs')) failures.push('Heritage pages must link church entities in structured data.');

const preservationCount = (preservation.match(/slug: "/g) ?? []).length;
if (preservationCount < 5) failures.push(`Preservation authority layer must retain at least 5 concepts; found ${preservationCount}.`);
if (!preservationDetail.includes('"@type": "DefinedTerm"')) failures.push('Preservation detail pages must publish DefinedTerm schema.');

const glossaryCount = (glossary.match(/slug: "/g) ?? []).length;
if (glossaryCount < 11) failures.push(`Painted Church glossary must retain at least 11 terms; found ${glossaryCount}.`);
if (!glossaryDetail.includes('"@type": "DefinedTerm"')) failures.push('Glossary terms must have canonical DefinedTerm pages.');

if (!graph.includes('PaintedChurchKnowledgeEdge') || !graph.includes('person-uses-technique')) failures.push('Knowledge graph must retain typed nodes and evidence relationships.');
if (!graphRoute.includes('"@type": "Dataset"')) failures.push('Knowledge graph page must publish Dataset schema.');
if (!dossier.includes('PaintedChurchKnowledgeLinks') || !knowledgeLinks.includes('Painted Churches knowledge graph')) failures.push('Every church dossier must expose reciprocal knowledge-graph links.');

if (!harwood.includes('1,066') || !harwood.includes('txarchives.org/utaaa/finding_aids/00136.xml')) failures.push('Harwood archive authority page must retain slide scale and UT finding-aid provenance.');
if (!howToRead.includes('"@type": "HowTo"') || !howToRead.includes('Seven-step field method')) failures.push('How-to-read guide must retain HowTo schema and seven-step field method.');
if (!timeline.includes('Statewide chronology') || !timeline.includes('1983')) failures.push('Painted Churches timeline must retain statewide chronology and 1983 designation milestone.');

const itineraryCount = (itineraries.match(/slug: "/g) ?? []).length;
if (itineraryCount < 8) failures.push(`Painted Church itineraries must retain at least 8 routes; found ${itineraryCount}.`);
if (!routeHub.includes('TouristTrip') || !routeDetail.includes('"@type": "TouristTrip"')) failures.push('Itinerary hub/detail pages must publish TouristTrip schema.');
if (!sitemap.includes('paintedChurchItineraries') || !searchDocs.includes('itineraryDocuments')) failures.push('Itineraries must be emitted to sitemap and global search.');

if (!visitorStatus.includes('verify-before-travel') || !visitorStatus.includes('checkedAt')) failures.push('Visitor-status data must fail closed and retain freshness dates.');
if (!visitorPanel.includes('Visitor guidance checked') || !dossier.includes('PaintedChurchVisitorStatus')) failures.push('Every church must render dated visitor-status guidance.');

if (!printGuide.includes('window.print()') || !printGuide.includes('/painted-churches-checklist.txt')) failures.push('Printable guide must support browser Print/Save as PDF and checklist download.');
if (!checklist.includes('X-Robots-Tag') || !checklist.includes('noindex, follow')) failures.push('Plain-text checklist must remain noindex/follow.');
if (!publicRoutes.includes('"/painted-churches-checklist.txt"')) failures.push('Checklist distribution must be governed as non-indexable public path.');

if (!comparison.includes('builtYear') || !comparison.includes('paintedYear') || !comparison.includes('paintedChurchSymbols') || !comparison.includes('paintedChurchPeople')) failures.push('Comparison intelligence must expose construction/painting dates, symbols and people.');
if (!jsonDataset.includes('schemaVersion: 3') || !jsonDataset.includes('symbols: symbols.map') || !jsonDataset.includes('people: people.map') || !jsonDataset.includes('preservationTopics: preservation.map')) failures.push('JSON dataset must expose schema v3 authority relationships.');
if (!csvDataset.includes('documented_symbols') || !csvDataset.includes('connected_people') || !csvDataset.includes('preservation_topics')) failures.push('CSV dataset must expose expanded authority relationships.');

for (const datasetName of ['paintedChurchTechniques','paintedChurchSymbols','paintedChurchPeople','paintedChurchHeritage','paintedChurchPreservationTopics','paintedChurchGlossary','paintedChurchItineraries']) {
  if (!sitemap.includes(datasetName)) failures.push(`Sitemap must emit dynamic authority pages from ${datasetName}.`);
}
for (const docName of ['techniqueDocuments','symbolDocuments','peopleDocuments','heritageDocuments','preservationDocuments','glossaryDocuments','itineraryDocuments']) {
  if (!searchDocs.includes(docName)) failures.push(`Global search must include ${docName}.`);
}

if (!gallery.includes('"@type": "ImageObject"') || !gallery.includes('acquireLicensePage') || !gallery.includes('creditText')) failures.push('Painted Church galleries must preserve ImageObject licensing schema.');
if (!dossier.includes('Research methodology & corrections')) failures.push('Every Painted Church dossier must link methodology/corrections.');

if (failures.length) {
  console.error('Painted Churches authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Painted Churches authority validation protected phases 1–17: canonical census, primary records, techniques, symbols, people, heritage, preservation, knowledge graph, Harwood archive, field education, timeline, itineraries, visitor freshness, comparison intelligence, printable guide, datasets, search and sitemap.');
