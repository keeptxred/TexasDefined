import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const seo = fs.readFileSync(path.join(root, 'src/lib/seo.ts'), 'utf8');
const routes = [
  ['Texas history', 'src/routes/texas-history.tsx', '/texas-history'],
  ['Moving to Texas', 'src/routes/moving-to-texas.tsx', '/moving-to-texas'],
  ['Real estate', 'src/routes/real-estate.tsx', '/real-estate'],
  ['Home and garden', 'src/routes/home-garden.tsx', '/home-garden'],
  ['Texas sports', 'src/routes/sports.tsx', '/sports'],
];
const errors = [];

for (const feature of [
  'export function buildEditorialCollectionHead',
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "BreadcrumbList"',
  'numberOfItems: itemListElement.length',
  'isPartOf: { "@id": `${siteUrl}/#website` }',
  'absoluteUrl(brand, item.url)',
  'absoluteUrl(brand, item.image)',
]) {
  if (!seo.includes(feature)) errors.push(`Editorial collection SEO builder feature missing: ${feature}.`);
}

for (const [label, filename, canonicalPath] of routes) {
  const route = fs.readFileSync(path.join(root, filename), 'utf8');
  for (const feature of [
    'buildEditorialCollectionHead(texasDefinedBrand',
    `canonicalPath: "${canonicalPath}"`,
    'loaderData.articles.map',
    'loaderData.destinations.map',
    'type: "Article" as const',
    'type: "TouristAttraction" as const',
  ]) {
    if (!route.includes(feature)) errors.push(`${label} collection SEO feature missing: ${feature}.`);
  }
  if (!/return\s*\{\s*articles\s*,\s*destinations\s*(?::|[,}])/.test(route)) {
    errors.push(`${label} collection SEO feature missing: loader must return articles plus destinations.`);
  }
  // Department breadcrumb parent may vary per collection, but must be present and internal.
  if (!/breadcrumbParentName: "[^"]+"/.test(route) || !/breadcrumbParentPath: "\/[^"]*"/.test(route)) {
    errors.push(`${label} collection SEO feature missing: breadcrumb parent name and path.`);
  }
}

if (errors.length) {
  console.error('Editorial collection SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Standalone editorial CollectionPage, ItemList, image, and breadcrumb validation passed.');
