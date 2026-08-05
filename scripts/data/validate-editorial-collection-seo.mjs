import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const seo = fs.readFileSync(path.join(root, 'src/lib/seo.ts'), 'utf8');
const routes = [
  ['Texas history', 'src/routes/texas-history.tsx', '/texas-history'],
  ['Moving to Texas', 'src/routes/moving-to-texas.tsx', '/moving-to-texas'],
  ['Real estate', 'src/routes/real-estate.tsx', '/real-estate'],
  ['Home and garden', 'src/routes/home-garden.tsx', '/home-garden'],
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
    'breadcrumbParentName: "Explore"',
    'breadcrumbParentPath: "/explore"',
    'return { articles, destinations }',
  ]) {
    if (!route.includes(feature)) errors.push(`${label} collection SEO feature missing: ${feature}.`);
  }
}

if (errors.length) {
  console.error('Editorial collection SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Standalone editorial CollectionPage, ItemList, image, and breadcrumb validation passed.');
