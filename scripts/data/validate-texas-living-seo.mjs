import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/texas-living.tsx'), 'utf8');
const errors = [];

for (const feature of [
  "'@type': 'CollectionPage'",
  "'@type': 'ItemList'",
  "'@type': 'BreadcrumbList'",
  'numberOfItems: itemListElement.length',
  "isPartOf: { '@id': `${siteUrl}/#website` }",
  'sections.map(([name, path, copy], index)',
  'aria-label="Breadcrumb"',
  'aria-current="page"',
  "title: 'Living Here'",
  "name: 'Living Here'",
  "name: 'Guides for living here'",
  '>Living Here</li>',
  '<p className="eyebrow mt-8 text-primary">Living Here</p>',
]) {
  if (!route.includes(feature)) errors.push(`Texas living SEO or naming feature missing: ${feature}.`);
}

for (const staleLabel of [
  "title: 'Living in Texas'",
  "name: 'Living in Texas'",
  "name: 'Living in Texas guides'",
  '>Living in Texas</li>',
]) {
  if (route.includes(staleLabel)) errors.push(`Texas living route retains stale naming: ${staleLabel}.`);
}

if (errors.length) {
  console.error('Texas living SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Living Here metadata, CollectionPage, ItemList, visible breadcrumb, and JSON-LD naming are aligned.');
