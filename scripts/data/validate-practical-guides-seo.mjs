import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const guides = [
  {
    label: 'First-time homebuyer',
    filename: 'src/routes/texas-first-time-homebuyer-programs.tsx',
    canonicalPath: '/texas-first-time-homebuyer-programs',
    collection: 'checklist',
    stepPrefix: 'homebuyer-step-',
  },
  {
    label: 'Sales tax',
    filename: 'src/routes/texas-sales-tax-explained.tsx',
    canonicalPath: '/texas-sales-tax-explained',
    collection: 'checklist',
    stepPrefix: 'sales-tax-step-',
  },
  {
    label: 'Vehicle registration',
    filename: 'src/routes/find-my-dmv.tsx',
    canonicalPath: '/find-my-dmv',
    collection: 'steps',
    stepPrefix: 'vehicle-step-',
  },
  {
    label: 'School district lookup',
    filename: 'src/routes/find-my-school-district.tsx',
    canonicalPath: '/find-my-school-district',
    collection: 'steps',
    stepPrefix: 'school-step-',
  },
];
const errors = [];

for (const guide of guides) {
  const route = fs.readFileSync(path.join(root, guide.filename), 'utf8');
  for (const feature of [
    "'@type': 'HowTo'",
    "'@type': 'HowToStep'",
    "'@type': 'BreadcrumbList'",
    `${guide.collection}.map((text, index)`,
    'position: index + 1',
    `canonicalPath = '${guide.canonicalPath}'`,
    `url: \`${'${pageUrl}'}#${guide.stepPrefix}${'${index + 1}'}\``,
    `id={\`${guide.stepPrefix}${'${index + 1}'}\`}`,
    'isPartOf: { \'@id\': `${siteUrl}/#website` }',
    'aria-label="Breadcrumb"',
    'aria-current="page"',
  ]) {
    if (!route.includes(feature)) errors.push(`${guide.label} guide SEO feature missing: ${feature}.`);
  }
  if (route.includes('totalTime:') || route.includes('estimatedCost:') || route.includes('supply:') || route.includes('tool:')) {
    errors.push(`${guide.label} guide must not invent time, cost, supplies, or tools.`);
  }
}

if (errors.length) {
  console.error('Practical guide SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Practical guide HowTo, anchored steps, and breadcrumb validation passed.');
