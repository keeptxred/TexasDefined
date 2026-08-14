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

if (errors.length) {
  console.error('Texas Explained validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Texas Explained collection, ten-pillar membership, sitemap ownership, Start Here discovery, reciprocal article links, homepage promotion, persistent footer navigation and site-search discovery are protected.');