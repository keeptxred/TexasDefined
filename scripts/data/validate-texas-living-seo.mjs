import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/texas-living.tsx'), 'utf8');
const departmentHero = fs.readFileSync(path.join(root, 'src/components/editorial/DepartmentHero.tsx'), 'utf8');
const errors = [];

for (const feature of [
  "'@type': 'CollectionPage'",
  "'@type': 'ItemList'",
  "'@type': 'BreadcrumbList'",
  'numberOfItems: topicItems.length + articleItems.length',
  "isPartOf: { '@id': `${siteUrl}/#website` }",
  'const sectionItems = sections.map(([name, path, copy])',
  'const cultureItems = cultureGuides.map(([path, name, copy])',
  'const financeItems = financeGuides.map(([path, name, copy])',
  'const topicItems = [...sectionItems, ...cultureItems, ...financeItems].map',
  'sections.map(([title, to, copy], index)',
  'cultureGuides.map(([to, title, copy])',
  'financeGuides.map(([to, title, copy])',
  'articles.map((article, index)',
  'itemListElement: [...topicItems, ...articleItems]',
  'breadcrumb: { \'@id\': `${pageUrl}#breadcrumbs` }',
  '<DepartmentHero',
  'current="Texas Life"',
  'eyebrow="Texas Life"',
  "title: 'Texas Life'",
  "name: 'Texas Life'",
  "name: 'Texas Life departments and guides'",
  "['Things That Define Texas', '/things-unique-to-texas'",
  "['/texas-food-history', 'Texas Food History'",
  "['/texas-food-trail', 'Texas Food Trail'",
  "['/texas-breakfast-taco-guide', 'Texas Breakfast Tacos'",
  "['/texas-chili-con-carne-history', 'Texas Chili Con Carne'",
  "['/texas-chicken-fried-steak-guide', 'Texas Chicken-Fried Steak'",
  "['/texas-natural-wonders-bucket-list', 'Texas Natural Wonders'",
  "['/texas-brand-origin-stories', 'Texas Brand Origin Stories'",
  "['/dr-pepper-texas-history', 'Dr Pepper in Texas'",
  "['/article/texas-utility-costs-guide', 'Estimate Texas utility costs'",
  "['/article/texas-closing-costs-guide', 'Understand closing costs and cash to close'",
  "['/article/salary-needed-to-buy-a-house-in-texas', 'Work backward from a sustainable home payment'",
]) {
  if (!route.includes(feature)) errors.push(`Texas Life SEO or naming feature missing: ${feature}.`);
}

for (const feature of [
  'aria-label="Breadcrumb"',
  '<Link to="/"',
  'aria-current="page"',
]) {
  if (!departmentHero.includes(feature)) errors.push(`Shared Texas Life breadcrumb feature missing: ${feature}.`);
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

console.log('Texas Life metadata, CollectionPage, mixed department/culture/finance/article ItemList, expanded culture and finance discovery, shared visible breadcrumb, and JSON-LD naming are aligned.');
