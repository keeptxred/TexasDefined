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
  'const startItems = startHere.map(([name, path, copy])',
  'const everydayItems = everydayLife.map(([name, path, copy])',
  'const cultureItems = cultureGuides.map(([path, name, copy])',
  'const financeItems = financeGuides.map(([path, name, copy])',
  'const topicItems = [...startItems, ...everydayItems, ...cultureItems, ...financeItems].map',
  'startHere.map(([title, to, copy, cta])',
  'everydayLife.map(([title, to, copy])',
  'cultureGuides.map(([to, title, copy])',
  'financeGuides.map(([to, title, copy])',
  'articles.map((article, index)',
  'itemListElement: [...topicItems, ...articleItems]',
  'breadcrumb: { \'@id\': `${pageUrl}#breadcrumbs` }',
  '<DepartmentHero',
  'current="Texas Life"',
  'eyebrow="Texas Life"',
  'title="Living in Texas"',
  "title: 'Living in Texas: Cost, Homes & Everyday Life'",
  "name: 'Living in Texas'",
  "name: 'Living in Texas guides and resources'",
  "['Moving to Texas', '/moving-to-texas'",
  "['Homes & Land', '/real-estate'",
  "['Money & Property', '/decide/financial-tools'",
  "['Texas Resources', '/texas-resources'",
  "['/texas-food-history', 'Texas Food History'",
  "['/texas-natural-wonders-bucket-list', 'Texas Natural Wonders'",
  "['/texas-dance-halls-honky-tonks', 'Dance Halls & Honky-Tonks'",
  "['/german-czech-texas-towns', 'German & Czech Texas Towns'",
  "['/texas-homecoming-mums', 'Texas Homecoming Mums'",
  "['/texas-slang-explained', 'Texas Slang Explained'",
  "['/article/texas-utility-costs-guide', 'Estimate Texas utility costs'",
  "['/article/texas-closing-costs-guide', 'Understand closing costs and cash to close'",
  "['/article/salary-needed-to-buy-a-house-in-texas', 'Work backward from a sustainable home payment'",
  'What is living in Texas actually like?',
  'Use the right TexasDefined page',
  'Four clear paths replace a second site navigation menu',
  'the full culture library lives in Things That Define Texas',
]) {
  if (!route.includes(feature)) errors.push(`Texas Living SEO, structure or naming feature missing: ${feature}.`);
}

for (const feature of [
  'aria-label="Breadcrumb"',
  '<Link to="/"',
  'aria-current="page"',
]) {
  if (!departmentHero.includes(feature)) errors.push(`Shared Texas Life breadcrumb feature missing: ${feature}.`);
}

for (const staleFeature of [
  'title="Home, history and everyday life across Texas"',
  'Open section →',
  "['Explore', '/explore'",
  "['Guides', '/guides'",
  "['/texas-food-trail', 'Texas Food Trail'",
  "['/texas-breakfast-taco-guide', 'Texas Breakfast Tacos'",
  "['/texas-chili-con-carne-history', 'Texas Chili Con Carne'",
  "['/texas-chicken-fried-steak-guide', 'Texas Chicken-Fried Steak'",
]) {
  if (route.includes(staleFeature)) errors.push(`Texas Living route retains stale hub structure: ${staleFeature}.`);
}

if (errors.length) {
  console.error('Texas Living SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Texas Living now targets practical living intent, preserves CollectionPage/ItemList/breadcrumb schema, prioritizes moving/home/money/resources, limits culture to a focused selection, and keeps deeper hubs distinct.');
