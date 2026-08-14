import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const route = read('src/routes/texas-explained.tsx');
const articleRoute = read('src/routes/article.$slug.tsx');
const publicRoutes = read('src/lib/public-routes.ts');
const resources = read('src/routes/texas-resources.tsx');
const internalLinks = read('src/data/article-internal-links.ts');
const homepage = read('src/routes/index.tsx');
const brand = read('src/brand/texasdefined.ts');
const queries = read('src/data/queries.ts');
const searchRoute = read('src/routes/search.tsx');
const errors = [];

const pillars = [
  'texas-rivers-explained',
  'texas-lakes-reservoirs-explained',
  'texas-farm-to-market-roads-explained',
  'texas-courthouses-town-square',
  'texas-wildflowers-guide',
  'texas-trees-guide',
  'texas-home-architecture-regions',
  'buying-land-in-texas-guide',
  'texas-wildlife-guide',
  'texas-cultural-regions-explained',
];

const supportRing = [
  'texas-regions-explained',
  'why-texas-has-254-counties',
  'texas-hill-country-what-makes-it',
  'best-native-plants-texas-yard',
  'texas-barbecue-styles-explained',
];

const clusterExpectations = {
  'texas-rivers-explained': [
    '/article/texas-lakes-reservoirs-explained',
    '/article/texas-regions-explained',
    '/article/texas-wildlife-guide',
  ],
  'texas-lakes-reservoirs-explained': [
    '/article/texas-rivers-explained',
    '/article/texas-wildlife-guide',
    '/article/buying-land-in-texas-guide',
  ],
  'texas-farm-to-market-roads-explained': [
    '/article/texas-courthouses-town-square',
    '/article/why-texas-has-254-counties',
    '/article/texas-cultural-regions-explained',
  ],
  'texas-courthouses-town-square': [
    '/article/why-texas-has-254-counties',
    '/article/texas-farm-to-market-roads-explained',
    '/article/texas-home-architecture-regions',
  ],
  'texas-wildflowers-guide': [
    '/article/texas-trees-guide',
    '/article/texas-wildlife-guide',
    '/article/best-native-plants-texas-yard',
  ],
  'texas-trees-guide': [
    '/article/texas-regions-explained',
    '/article/best-native-plants-texas-yard',
    '/article/texas-wildflowers-guide',
  ],
  'texas-home-architecture-regions': [
    '/article/buying-land-in-texas-guide',
    '/article/texas-cultural-regions-explained',
    '/article/texas-regions-explained',
  ],
  'buying-land-in-texas-guide': [
    '/article/texas-regions-explained',
    '/article/texas-home-architecture-regions',
    '/article/muds-pids-hoas-special-districts-texas',
  ],
  'texas-wildlife-guide': [
    '/article/texas-trees-guide',
    '/article/texas-wildflowers-guide',
    '/article/texas-regions-explained',
  ],
  'texas-cultural-regions-explained': [
    '/article/texas-regions-explained',
    '/article/texas-towns-german-czech-mexican-roots',
    '/article/texas-home-architecture-regions',
  ],
};

function internalLinkBlock(slug) {
  const startMarker = `  "${slug}": [`;
  const start = internalLinks.indexOf(startMarker);
  const end = start >= 0 ? internalLinks.indexOf('\n  ],', start) : -1;
  return start >= 0 && end > start ? internalLinks.slice(start, end) : '';
}

function extractQuotedArray(source, pattern) {
  const match = source.match(pattern);
  return match ? [...match[1].matchAll(/["']([^"']+)["']/g)].map((entry) => entry[1]) : null;
}

for (const marker of [
  'createFileRoute("/texas-explained")',
  'buildEditorialCollectionHead',
  'collectionName: "Texas Explained"',
  'breadcrumbParentPath: "/texas-resources"',
  'items: loaderData.articles.map',
  'orderedPillars(catalog)',
  'Land and water',
  'Built Texas',
  'People and place',
  'Read together, the guides form a working explanation of the state.',
  'to="/explore"',
  'to="/texas-resources"',
]) {
  if (!route.includes(marker)) errors.push(`Texas Explained route contract missing: ${marker}.`);
}

const hubPillarOrder = extractQuotedArray(route, /const pillarSlugs = \[([\s\S]*?)\] as const;/);
const articlePillarOrder = extractQuotedArray(articleRoute, /const texasExplainedPillarOrder = \[([\s\S]*?)\] as const;/);
if (!hubPillarOrder) {
  errors.push('Texas Explained hub pillar order is missing.');
}
if (!articlePillarOrder) {
  errors.push('Texas Explained article guide order is missing.');
}
if (hubPillarOrder && JSON.stringify(hubPillarOrder) !== JSON.stringify(pillars)) {
  errors.push(`Texas Explained hub pillar order must match the canonical ten-guide order. Found: ${hubPillarOrder.join(', ')}`);
}
if (articlePillarOrder && JSON.stringify(articlePillarOrder) !== JSON.stringify(pillars)) {
  errors.push(`Texas Explained article guide order must match the canonical ten-guide order. Found: ${articlePillarOrder.join(', ')}`);
}
if (hubPillarOrder && articlePillarOrder && JSON.stringify(hubPillarOrder) !== JSON.stringify(articlePillarOrder)) {
  errors.push('Texas Explained hub order and article Guide N of 10 order have drifted apart.');
}
if (!articleRoute.includes('const texasExplainedPillarSlugs = new Set<string>(texasExplainedPillarOrder);')) {
  errors.push('Texas Explained schema membership must derive from the canonical article guide order.');
}

for (const marker of [
  'const quickAnswers = [',
  'Quick answers',
  'Five Texas questions, answered before you dive deeper',
  'Why are most Texas lakes man-made?',
  'What is a farm-to-market road?',
  'Why do so many Texas towns have courthouse squares?',
  'Why does Texas feel so different from one region to another?',
  'Why do Texas homes and land decisions depend so much on location?',
]) {
  if (!route.includes(marker)) errors.push(`Texas Explained quick-answer layer missing: ${marker}.`);
}

for (const marker of [
  'const supportingExplainers = [',
  'Go deeper',
  'Five supporting explainers',
  'These sit outside the core 10-guide series',
  '/article/texas-regions-explained',
  '/article/why-texas-has-254-counties',
  '/article/texas-hill-country-what-makes-it',
  '/article/best-native-plants-texas-yard',
  '/article/texas-barbecue-styles-explained',
]) {
  if (!route.includes(marker)) errors.push(`Texas Explained outward support-ring discovery missing: ${marker}.`);
}

const articleSchemaStart = articleRoute.indexOf('const articleSchema = {');
const articleSchemaEnd = articleSchemaStart >= 0 ? articleRoute.indexOf('const breadcrumbItems = [', articleSchemaStart) : -1;
const articleSchemaBlock = articleSchemaStart >= 0 && articleSchemaEnd > articleSchemaStart
  ? articleRoute.slice(articleSchemaStart, articleSchemaEnd)
  : '';
for (const marker of [
  'texasExplainedPillarSlugs.has(article.slug)',
  'isPartOf:',
  '"@type": "CollectionPage"',
  '/texas-explained#collection',
  'name: "Texas Explained"',
  '/texas-explained`',
]) {
  if (!articleSchemaBlock.includes(marker)) errors.push(`Texas Explained Article → CollectionPage schema contract missing: ${marker}.`);
}

for (const marker of [
  'const texasExplainedPillarPosition = texasExplainedPillarOrder.findIndex',
  'const isTexasExplainedPillar = texasExplainedPillarPosition >= 0;',
  'const previousTexasExplainedSlug = texasExplainedPillarPosition > 0',
  'const nextTexasExplainedSlug = texasExplainedPillarPosition >= 0 && texasExplainedPillarPosition < texasExplainedPillarOrder.length - 1',
  'aria-label="Texas Explained series"',
  'Texas Explained · Guide {texasExplainedPillarPosition + 1} of {texasExplainedPillarOrder.length}',
  'Part of our 10-guide series on the systems, landscapes and people that explain how Texas works.',
  'aria-label="Texas Explained guide navigation"',
  'params={{ slug: previousTexasExplainedSlug }}',
  '← Guide {texasExplainedPillarPosition} of {texasExplainedPillarOrder.length}',
  'All 10 guides',
  'params={{ slug: nextTexasExplainedSlug }}',
  'Guide {texasExplainedPillarPosition + 2} of {texasExplainedPillarOrder.length} →',
  'to="/texas-explained"',
  'See all 10 guides →',
]) {
  if (!articleRoute.includes(marker)) errors.push(`Texas Explained visible article-series orientation/navigation missing: ${marker}.`);
}

for (const slug of pillars) {
  if (!route.includes(`"${slug}"`)) errors.push(`Texas Explained collection is missing pillar slug: ${slug}.`);
  if (!internalLinks.includes(`"${slug}"`)) errors.push(`Texas Explained reciprocal linking is missing pillar key: ${slug}.`);

  const block = internalLinkBlock(slug);

  if (!block.includes('texasExplainedLink')) {
    errors.push(`Texas Explained pillar must keep its collection backlink: ${slug}.`);
  }

  for (const href of clusterExpectations[slug] ?? []) {
    if (!block.includes(`href: "${href}"`)) {
      errors.push(`Texas Explained pillar cluster is missing ${href} from ${slug}.`);
    }
  }
}

for (const slug of supportRing) {
  const block = internalLinkBlock(slug);
  if (!block) {
    errors.push(`Texas Explained support ring is missing related-reading block: ${slug}.`);
    continue;
  }
  if (!block.includes('texasExplainedLink')) {
    errors.push(`Texas Explained support page must link back to the collection: ${slug}.`);
  }
  if (!route.includes(`/article/${slug}`)) {
    errors.push(`Texas Explained hub must link outward to support page: ${slug}.`);
  }
}

if (!publicRoutes.includes('"/texas-explained"')) {
  errors.push('Texas Explained must remain an indexable static public route.');
}

if (!resources.includes("['Texas Explained', '/texas-explained']")) {
  errors.push('Start Here must keep a visible link to Texas Explained.');
}

for (const marker of [
  'const texasExplainedLink',
  'href: "/texas-explained"',
  'Explore the full Texas Explained collection',
]) {
  if (!internalLinks.includes(marker)) errors.push(`Texas Explained reciprocal-link contract missing: ${marker}.`);
}

for (const marker of [
  'const texasExplainedPicks',
  'eyebrow="Texas Explained"',
  'title="Why Texas works the way it does"',
  'actionLabel="Read all 10 guides"',
  'actionTo="/texas-explained"',
]) {
  if (!homepage.includes(marker)) errors.push(`Homepage Texas Explained discovery contract missing: ${marker}.`);
}

for (const marker of [
  '{ label: "Texas Explained", to: "/texas-explained" }',
  'title: "Read & Use"',
]) {
  if (!brand.includes(marker)) errors.push(`Persistent Texas Explained navigation contract missing: ${marker}.`);
}

for (const marker of [
  'id: "collection:texas-explained"',
  'kind: "collection"',
  'title: "Texas Explained: 10 Guides to How the State Works"',
  'summary: "Ten connected guides to why Texas works the way it does:',
  '"why Texas"',
  '"Texas geography"',
  '"Texas regions"',
  '"Texas counties"',
  '"Texas nature"',
  '"Texas infrastructure"',
  '"Texas culture"',
  '"Texas settlement"',
  'href: "/texas-explained"',
  'for (const document of staticSearchDocuments)',
]) {
  if (!queries.includes(marker)) errors.push(`Texas Explained search-discovery and broad-intent contract missing: ${marker}.`);
}

for (const marker of [
  'to="/texas-explained"',
  'Want the why behind Texas?',
  'Read all 10 guides →',
  'rivers, reservoirs, roads, towns, plants, wildlife, homes, land and migration patterns',
]) {
  if (!searchRoute.includes(marker)) errors.push(`Texas Explained zero-query search discovery contract missing: ${marker}.`);
}

if (errors.length) {
  console.error('Texas Explained validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Texas Explained collection, synchronized Guide N of 10 ordering with previous/next navigation, exact ten-pillar Article → CollectionPage schema membership, visible article-series orientation, sitemap ownership, Start Here discovery, reciprocal collection backlinks, pillar-to-pillar topic clusters, bidirectional five-page supporting authority ring, five-question AEO quick-answer layer, broad-intent site-search vocabulary, homepage promotion, persistent footer navigation, site-search indexing and zero-query search discovery are protected.');
