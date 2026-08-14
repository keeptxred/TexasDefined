import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const route = read('src/routes/texas-explained.tsx');
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

for (const slug of pillars) {
  if (!route.includes(`"${slug}"`)) errors.push(`Texas Explained collection is missing pillar slug: ${slug}.`);
  if (!internalLinks.includes(`"${slug}"`)) errors.push(`Texas Explained reciprocal linking is missing pillar key: ${slug}.`);

  const startMarker = `  "${slug}": [`;
  const start = internalLinks.indexOf(startMarker);
  const end = start >= 0 ? internalLinks.indexOf('\n  ],', start) : -1;
  const block = start >= 0 && end > start ? internalLinks.slice(start, end) : '';

  if (!block.includes('texasExplainedLink')) {
    errors.push(`Texas Explained pillar must keep its collection backlink: ${slug}.`);
  }

  for (const href of clusterExpectations[slug] ?? []) {
    if (!block.includes(`href: "${href}"`)) {
      errors.push(`Texas Explained pillar cluster is missing ${href} from ${slug}.`);
    }
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
  'href: "/texas-explained"',
  'for (const document of staticSearchDocuments)',
]) {
  if (!queries.includes(marker)) errors.push(`Texas Explained search-discovery contract missing: ${marker}.`);
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

console.log('Texas Explained collection, ten-pillar membership, sitemap ownership, Start Here discovery, reciprocal collection backlinks, pillar-to-pillar topic clusters, homepage promotion, persistent footer navigation, site-search indexing and zero-query search discovery are protected.');
