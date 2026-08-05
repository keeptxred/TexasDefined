import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/texas-resources.tsx'), 'utf8');
const errors = [];

for (const feature of [
  "'@type': 'CollectionPage'",
  "'@type': 'ItemList'",
  "'@type': 'BreadcrumbList'",
  'numberOfItems: itemListElement.length',
  "isPartOf: { '@id': `${siteUrl}/#website` }",
  'groups.flatMap((group) => group.links)',
  'aria-label="Breadcrumb"',
  'aria-current="page"',
]) {
  if (!route.includes(feature)) errors.push(`Texas resources SEO feature missing: ${feature}.`);
}

if (errors.length) {
  console.error('Texas resources SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Texas resources CollectionPage, ItemList, and breadcrumb validation passed.');
