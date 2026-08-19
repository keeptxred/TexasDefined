import fs from 'node:fs';

const source = fs.readFileSync('src/data/things-unique-to-texas.ts', 'utf8');
const linksSource = fs.readFileSync('src/data/things-unique-to-texas-links.ts', 'utf8');
const referenceSource = fs.readFileSync('src/data/things-unique-to-texas-reference.ts', 'utf8');
const rootRoute = fs.readFileSync('src/routes/things-unique-to-texas.tsx', 'utf8');
const rootLazy = fs.readFileSync('src/routes/things-unique-to-texas.lazy.tsx', 'utf8');
const categoryRoute = fs.readFileSync('src/routes/things-unique-to-texas.$category.tsx', 'utf8');
const lazyRoute = fs.readFileSync('src/routes/things-unique-to-texas.$category.lazy.tsx', 'utf8');
const methodologyRoute = fs.readFileSync('src/routes/things-unique-to-texas.methodology.tsx', 'utf8');
const jsonRoute = fs.readFileSync('src/routes/things-that-define-texas[.]json.ts', 'utf8');
const csvRoute = fs.readFileSync('src/routes/things-that-define-texas[.]csv.ts', 'utf8');
const publicRoutes = fs.readFileSync('src/lib/public-routes.ts', 'utf8');
const trustRouter = fs.readFileSync('src/components/authority/CitationCollectionTrustRouter.tsx', 'utf8');
const productionSmoke = fs.readFileSync('.github/workflows/things-unique-to-texas-production-smoke.yml', 'utf8');
const evergreenComponent = fs.readFileSync('src/components/editorial/TexasEvergreenGuide.tsx', 'utf8');
const evergreenData = fs.readFileSync('src/data/texas-evergreen-guides.ts', 'utf8');
const evergreenBatch2 = fs.readFileSync('src/data/texas-evergreen-guides-batch2.ts', 'utf8');
const evergreenBatch3 = fs.readFileSync('src/data/texas-evergreen-guides-batch3.ts', 'utf8');
const evergreenBatch4 = fs.readFileSync('src/data/texas-evergreen-guides-batch4.ts', 'utf8');
const evergreenBatch5 = fs.readFileSync('src/data/texas-evergreen-guides-batch5.ts', 'utf8');
const failures = [];

const evergreenGuides = [
  ['/texas-food-trail', 'src/routes/texas-food-trail.tsx', 'texas-food-trail'],
  ['/texas-roadside-oddities', 'src/routes/texas-roadside-oddities.tsx', 'texas-roadside-oddities'],
  ['/texas-slang-explained', 'src/routes/texas-slang-explained.tsx', 'texas-slang-explained'],
  ['/texas-dance-halls-honky-tonks', 'src/routes/texas-dance-halls-honky-tonks.tsx', 'texas-dance-halls-honky-tonks'],
  ['/texas-homecoming-mums', 'src/routes/texas-homecoming-mums.tsx', 'texas-homecoming-mums'],
  ['/texas-natural-wonders-bucket-list', 'src/routes/texas-natural-wonders-bucket-list.tsx', 'texas-natural-wonders-bucket-list'],
  ['/german-czech-texas-towns', 'src/routes/german-czech-texas-towns.tsx', 'german-czech-texas-towns'],
  ['/texas-brand-origin-stories', 'src/routes/texas-brand-origin-stories.tsx', 'texas-brand-origin-stories'],
  ['/texas-chili-con-carne-history', 'src/routes/texas-chili-con-carne-history.tsx', 'texas-chili-con-carne-history'],
  ['/texas-chicken-fried-steak-guide', 'src/routes/texas-chicken-fried-steak-guide.tsx', 'texas-chicken-fried-steak-guide'],
  ['/texas-breakfast-taco-guide', 'src/routes/texas-breakfast-taco-guide.tsx', 'texas-breakfast-taco-guide'],
  ['/dr-pepper-texas-history', 'src/routes/dr-pepper-texas-history.tsx', 'dr-pepper-texas-history'],
  ['/texas-ranch-water-guide', 'src/routes/texas-ranch-water-guide.tsx', 'texas-ranch-water-guide'],
  ['/san-antonio-puffy-taco-history', 'src/routes/san-antonio-puffy-taco-history.tsx', 'san-antonio-puffy-taco-history'],
  ['/barbacoa-big-red-san-antonio', 'src/routes/barbacoa-big-red-san-antonio.tsx', 'barbacoa-big-red-san-antonio'],
];
const additionalSmokePaths = [
  '/article/kolache-or-klobasnek-texas-story',
  '/article/caddo-lake-cypress-morning',
  '/article/texas-wildlife-guide',
  '/article/texas-trees-guide',
  '/article/galveston-county-island-port-juneteenth-texas',
  '/texas-blue-norther-weather-guide',
  '/texas-symbols',
];

const ids = [...source.matchAll(/\bitem\((\d+),/g)].map((match) => Number(match[1]));
const categorySlugs = [...source.matchAll(/^\s{4}slug:\s*"([a-z0-9-]+)",/gm)].map((match) => match[1]);
const hrefs = [...source.matchAll(/\bhref:\s*"([^"]+)"/g)].map((match) => match[1]);
const canonicalIds = [...linksSource.matchAll(/^\s{2}(\d+):\s*"\/destination\/[^"]+",/gm)].map((match) => Number(match[1]));
const deepDiveIds = [...linksSource.matchAll(/^\s{2}(\d+):\s*"\/(?!destination\/)[^"]+",/gm)].map((match) => Number(match[1]));

if (ids.length !== 250) failures.push(`Expected 250 magazine entries; found ${ids.length}.`);
if (new Set(ids).size !== ids.length) failures.push('Magazine entry IDs must be unique.');
for (let id = 1; id <= 250; id += 1) if (!ids.includes(id)) failures.push(`Missing magazine entry ID ${id}.`);

if (categorySlugs.length !== 8) failures.push(`Expected 8 magazine categories; found ${categorySlugs.length}.`);
if (new Set(categorySlugs).size !== categorySlugs.length) failures.push('Magazine category slugs must be unique.');
for (const href of hrefs) {
  if (!href.startsWith('/')) failures.push(`Magazine internal href must be root-relative: ${href}`);
  if (href.startsWith('//')) failures.push(`Protocol-relative magazine href is not allowed: ${href}`);
}

if (canonicalIds.length < 42) failures.push(`Expected at least 42 canonical destination cross-links; found ${canonicalIds.length}.`);
if (deepDiveIds.length < 47) failures.push(`Expected at least 47 purpose-built/editorial deep-dive mappings; found ${deepDiveIds.length}.`);
if (canonicalIds.length + deepDiveIds.length < 89) failures.push(`Expected at least 89 protected deeper-guide relationships; found ${canonicalIds.length + deepDiveIds.length}.`);
if (new Set([...canonicalIds, ...deepDiveIds]).size !== canonicalIds.length + deepDiveIds.length) failures.push('Canonical and deep-dive cross-link IDs must be unique across registries.');
for (const id of [...canonicalIds, ...deepDiveIds]) if (!ids.includes(id)) failures.push(`Canonical/deep-dive cross-link refers to unknown magazine entry ID ${id}.`);
for (const [id, path] of [
  [14, '/san-antonio-puffy-taco-history'],
  [18, '/barbacoa-big-red-san-antonio'],
  [30, '/texas-ranch-water-guide'],
  [32, '/texas-breakfast-taco-guide'],
  [60, '/article/caddo-lake-cypress-morning'],
  [173, '/texas-chili-con-carne-history'],
  [185, '/article/galveston-county-island-port-juneteenth-texas'],
  [200, '/article/texas-wildlife-guide'],
  [204, '/article/texas-trees-guide'],
  [222, '/texas-slang-explained'],
  [225, '/texas-symbols'],
  [233, '/texas-blue-norther-weather-guide'],
  [234, '/texas-blue-norther-weather-guide'],
  [235, '/texas-blue-norther-weather-guide'],
]) {
  if (!linksSource.includes(`${id}: "${path}"`)) failures.push(`Magazine entry ${id} must retain deep-dive canonical link ${path}.`);
}
if (!linksSource.includes('249: "/destination/the-alamo"')) failures.push('Magazine entry 249 must retain exact destination guide /destination/the-alamo.');

for (const [name, routeSource] of [['schema route', categoryRoute], ['lazy route', lazyRoute]]) if (!routeSource.includes('texasIconCanonicalHref')) failures.push(`${name} must resolve canonical magazine links through texasIconCanonicalHref.`);
if (!categoryRoute.includes('...(href ? { url: `${origin}${href}` } : {})')) failures.push('Category JSON-LD must expose canonical URLs for linked magazine entries.');
for (const token of ['isBasedOn: methodologyUrl', 'Texas Defined Editorial Desk', 'dateModified: "2026-08-19"']) if (!categoryRoute.includes(token)) failures.push(`Category CollectionPage schema must retain provenance token: ${token}.`);
if (!lazyRoute.includes('to="/things-unique-to-texas/methodology"')) failures.push('Every magazine chapter must visibly link the collection methodology.');

if (!methodologyRoute.includes('createFileRoute("/things-unique-to-texas/methodology")')) failures.push('Magazine methodology route must remain canonical.');
for (const token of ['Inclusion standard', 'Official fact versus Texas folklore', 'Cross-link policy', 'Changing information', 'Data distributions', 'Corrections and maintenance']) if (!methodologyRoute.includes(token)) failures.push(`Magazine methodology must retain section: ${token}.`);
for (const download of ['/things-that-define-texas.csv', '/things-that-define-texas.json']) {
  if (!methodologyRoute.includes(`href="${download}"`)) failures.push(`Magazine methodology must link ${download}.`);
  if (!rootLazy.includes(`href="${download}"`)) failures.push(`Magazine collection must visibly link ${download}.`);
  if (!publicRoutes.includes(`"${download}"`)) failures.push(`Magazine download must remain explicitly governed as non-indexable: ${download}.`);
}
if (!publicRoutes.includes('"/things-unique-to-texas/methodology"')) failures.push('Magazine methodology must remain governed as an indexable static path.');
if (!rootLazy.includes('to="/things-unique-to-texas/methodology"')) failures.push('Magazine collection must visibly link its methodology.');
if (!rootRoute.includes('isBasedOn: methodologyUrl')) failures.push('Magazine CollectionPage schema must identify the methodology as its basis.');
if (!rootRoute.includes('dateModified: "2026-08-19"')) failures.push('Magazine collection schema must retain an explicit reviewed modification date.');
if (!rootRoute.includes('Texas Defined Editorial Desk')) failures.push('Magazine collection schema must retain editorial authorship.');
for (const token of ['"@type": "Dataset"', 'encodingFormat: "text/csv"', 'encodingFormat: "application/json"', 'contentUrl: csvUrl', 'contentUrl: jsonUrl']) if (!rootRoute.includes(token)) failures.push(`Magazine root schema must retain dataset distribution token: ${token}.`);

for (const token of ['TEXAS_ICON_CATEGORIES.flatMap', 'texasIconCanonicalHref(entry)', 'canonicalCollection', 'methodology', 'deeperGuide']) if (!referenceSource.includes(token)) failures.push(`Shared magazine reference rows must retain token: ${token}.`);
for (const [label, routeSource, routePath, contentType] of [
  ['JSON', jsonRoute, '/things-that-define-texas.json', 'application/json; charset=utf-8'],
  ['CSV', csvRoute, '/things-that-define-texas.csv', 'text/csv; charset=utf-8'],
]) {
  if (!routeSource.includes(`createFileRoute('${routePath}')`)) failures.push(`${label} route must remain canonical at ${routePath}.`);
  if (!routeSource.includes(`'content-type': '${contentType}'`)) failures.push(`${label} route must retain content type ${contentType}.`);
  if (!routeSource.includes("'x-robots-tag': 'noindex, follow'")) failures.push(`${label} route must remain noindex, follow.`);
  if (!routeSource.includes('TEXAS_ICON_REFERENCE_ROWS')) failures.push(`${label} route must use the shared reference rows.`);
}
for (const token of ['schemaVersion: 1', 'count: TEXAS_ICON_REFERENCE_ROWS.length', 'items: TEXAS_ICON_REFERENCE_ROWS', 'TEXAS_ICONS_METHODOLOGY_URL']) if (!jsonRoute.includes(token)) failures.push(`JSON distribution must retain token: ${token}.`);
for (const token of ["'deeper_guide'", "'canonical_collection'", "'methodology'"]) if (!csvRoute.includes(token)) failures.push(`CSV distribution must retain column: ${token}.`);

for (const path of ['/things-unique-to-texas', '/things-unique-to-texas/methodology']) if (!trustRouter.includes(`'${path}'`)) failures.push(`Collection trust router must cover ${path}.`);
if (!trustRouter.includes('Collection structure, methodology and canonical-link policy reviewed August 19, 2026.')) failures.push('Magazine trust layer must retain an explicit collection review date.');

for (const token of ['"@type": "Article"', '"@type": "WebPage"', '"@type": "ItemList"', '"@type": "BreadcrumbList"', 'publisher:', 'articleSection: isFoodHistoryChild ? "Texas Food History" : "Things That Define Texas"', 'citation: sources.length', 'Source notes', 'Where the historical claims come from']) if (!evergreenComponent.includes(token)) failures.push(`Shared evergreen guide schema/source layer must retain token: ${token}.`);
for (const sourceUrl of ['https://www.tshaonline.org/handbook/entries/san-antonio-tx','https://www.tshaonline.org/handbook/entries/gebhardt-mexican-foods-company','https://www.tshaonline.org/handbook/entries/chicken-fried-steak','https://drpeppermuseum.com/history/']) if (!evergreenComponent.includes(sourceUrl)) failures.push(`Evergreen source notes missing authoritative source ${sourceUrl}.`);
for (const slug of ['texas-ranch-water-guide', 'san-antonio-puffy-taco-history', 'barbacoa-big-red-san-antonio']) if (!evergreenComponent.includes(`"${slug}"`)) failures.push(`Shared Food History parent set missing batch 5 slug ${slug}.`);

const allEvergreenData = `${evergreenData}\n${evergreenBatch2}\n${evergreenBatch3}\n${evergreenBatch4}\n${evergreenBatch5}`;
for (const [path, routeFile, slug] of evergreenGuides) {
  if (!fs.existsSync(routeFile)) failures.push(`Missing evergreen route file ${routeFile}.`);
  const routeSource = fs.existsSync(routeFile) ? fs.readFileSync(routeFile, 'utf8') : '';
  if (!routeSource.includes(`const canonicalPath = "${path}"`)) failures.push(`${routeFile} must retain canonical path ${path}.`);
  if (!routeSource.includes('<TexasEvergreenGuide')) failures.push(`${routeFile} must render the shared TexasEvergreenGuide component.`);
  if (!publicRoutes.includes(`"${path}"`)) failures.push(`Evergreen guide must remain indexable in public route governance: ${path}.`);
  if (!rootLazy.includes(`to="${path}"`)) failures.push(`Things That Define Texas hub must visibly link evergreen guide ${path}.`);
  if (!productionSmoke.includes(`check_page '${path}'`)) failures.push(`Production smoke must verify evergreen guide ${path}.`);
  if (!allEvergreenData.includes(`slug: "${slug}"`)) failures.push(`Evergreen guide data missing slug ${slug}.`);
}
for (const path of additionalSmokePaths) if (!productionSmoke.includes(`check_page '${path}'`)) failures.push(`Production smoke must verify established related evergreen ${path}.`);

if (!productionSmoke.includes("workflows: ['Deploy TexasDefined production']")) failures.push('Magazine production smoke must remain chained to successful production deployments.');
const smokePaths = ['/things-unique-to-texas','/things-unique-to-texas/methodology',...categorySlugs.map((slug) => `/things-unique-to-texas/${slug}`)];
for (const path of smokePaths) if (!productionSmoke.includes(`'${path}'`)) failures.push(`Magazine production smoke must verify ${path}.`);
for (const token of ['.count == 250','(.items | length) == 250','wc -l','251','x-robots-tag:','/things-that-define-texas.json','/things-that-define-texas.csv','test "$json_deep_links" -ge 89','test "$csv_deep_links" -ge 89','Topical/evergreen authority routes checked: 23','at least 89 deeper-guide relationships']) if (!productionSmoke.includes(token)) failures.push(`Magazine production smoke must retain current authority/distribution token: ${token}.`);

if (failures.length) {
  console.error('Things That Define Texas validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Things That Define Texas validation passed: ${ids.length} entries, ${categorySlugs.length} categories, ${evergreenGuides.length} evergreen deep dives, ${canonicalIds.length} exact destination mappings, ${deepDiveIds.length} protected editorial/deep-dive mappings (${canonicalIds.length + deepDiveIds.length} protected relationships), five evergreen data batches, two shared data distributions, methodology/provenance/trust contracts, and ${smokePaths.length + evergreenGuides.length + additionalSmokePaths.length} HTML production smoke routes intact.`);
