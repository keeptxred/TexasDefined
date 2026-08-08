import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/texas-living.tsx'), 'utf8');
const errors = [];

for (const feature of [
  "'@type': 'CollectionPage'",
  "'@type': 'ItemList'",
  "'@type': 'BreadcrumbList'",
  'numberOfItems: topicItems.length + articleItems.length',
  "isPartOf: { '@id': `${siteUrl}/#website` }",
  'sections.map(([name, path, copy], index)',
  'articles.map((article, index)',
  'itemListElement: [...topicItems, ...articleItems]',
  'breadcrumb: { \'@id\': `${pageUrl}#breadcrumbs` }',
  'aria-label="Breadcrumb"',
  'aria-current="page"',
  "title: 'Texas Life'",
  "name: 'Texas Life'",
  "name: 'Texas Life departments and guides'",
  '>Texas Life</li>',
  '<p className="eyebrow text-primary">Texas Life</p>',
]) {
  if (!route.includes(feature)) errors.push(`Texas Life SEO or naming feature missing: ${feature}.`);
}

for (const staleLabel of [
  "title: 'Living Here'",
  "name: 'Living Here'",
  "name: 'Guides for living here'",
  '>Living Here</li>',
  "title: 'Living in Texas'",
  "name: 'Living in Texas'",
  '>Living in Texas</li>',
]) {
  if (route.includes(staleLabel)) errors.push(`Texas Life route retains stale naming: ${staleLabel}.`);
}

if (errors.length) {
  console.error('Texas Life SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Texas Life metadata, CollectionPage, mixed ItemList, visible breadcrumb, and JSON-LD naming are aligned.');
