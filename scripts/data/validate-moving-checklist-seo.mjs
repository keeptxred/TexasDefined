import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/moving-to-texas-checklist.tsx'), 'utf8');
const errors = [];

for (const feature of [
  "'@type': 'WebPage'",
  "'@type': 'HowTo'",
  "'@type': 'HowToSection'",
  "'@type': 'HowToStep'",
  "'@type': 'BreadcrumbList'",
  'step: howToSections',
  'groups.map((group, groupIndex)',
  'group.items.map((item, itemIndex)',
  'url: `${pageUrl}#step-${groupIndex + 1}-${itemIndex + 1}`',
  'id={`step-${groupIndex + 1}-${itemIndex + 1}`}',
  "isPartOf: { '@id': `${siteUrl}/#website` }",
  'aria-label="Breadcrumb"',
  'aria-current="page"',
]) {
  if (!route.includes(feature)) errors.push(`Moving checklist SEO feature missing: ${feature}.`);
}

if (/totalTime|estimatedCost|supply|tool/.test(route)) {
  errors.push('Moving checklist must not invent time, cost, supply, or tool claims.');
}

if (errors.length) {
  console.error('Moving checklist SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Moving checklist HowTo sections, anchored steps, and breadcrumbs validation passed.');
