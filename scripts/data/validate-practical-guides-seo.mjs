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
    lazyFilename: 'src/routes/find-my-dmv.lazy.tsx',
    canonicalPath: '/find-my-dmv',
    collection: 'steps',
    stepPrefix: 'vehicle-step-',
  },
  {
    label: 'School district lookup',
    filename: 'src/routes/find-my-school-district.tsx',
    lazyFilename: 'src/routes/find-my-school-district.lazy.tsx',
    canonicalPath: '/find-my-school-district',
    collection: 'steps',
    stepPrefix: 'school-step-',
  },
];
const errors = [];

for (const guide of guides) {
  const route = [guide.filename, guide.lazyFilename]
    .filter(Boolean)
    .map((filename) => fs.readFileSync(path.join(root, filename), 'utf8'))
    .join('\n');
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

const countyFinder = [
  'src/routes/find-my-county.tsx',
  'src/routes/find-my-county.lazy.tsx',
  'src/routes/api.find-my-county.ts',
].map((filename) => fs.readFileSync(path.join(root, filename), 'utf8')).join('\n');

for (const feature of [
  "canonicalPath = '/find-my-county'",
  "'@type': 'WebApplication'",
  "'@type': 'BreadcrumbList'",
  "createFileRoute('/api/find-my-county')",
  "POST: async ({ request })",
  "benchmark', 'Public_AR_Current'",
  "vintage', 'Current_Current'",
  "layers', 'Counties'",
  "stateCode !== '48'",
  'TEXAS_COUNTIES.find',
  "'cache-control': 'private, no-store, max-age=0'",
  "fetch('/api/find-my-county'",
  "method: 'POST'",
  '/county/${record.slug}',
  'U.S. Census Bureau Geocoding Services',
  'does not write the submitted address or the lookup result to the site database',
]) {
  if (!countyFinder.includes(feature)) errors.push(`Find My Texas County contract missing: ${feature}.`);
}

const countyPublicRoutes = fs.readFileSync(path.join(root, 'src/lib/public-routes.ts'), 'utf8');
if (!countyPublicRoutes.includes('"/find-my-county"')) errors.push('Find My Texas County must remain in INDEXABLE_STATIC_PATHS.');

const countyLinks = [
  'src/routes/find-my-dmv.lazy.tsx',
  'src/routes/browse.counties.lazy.tsx',
  'src/routes/texas-resources.lazy.tsx',
].map((filename) => fs.readFileSync(path.join(root, filename), 'utf8')).join('\n');
if ((countyLinks.match(/\/find-my-county/g) ?? []).length < 3) {
  errors.push('Find My Texas County needs durable internal links from the DMV guide, county directory, and Texas resources hub.');
}

if (errors.length) {
  console.error('Practical guide SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Practical guide HowTo, county-finder utility, anchored steps, breadcrumb, privacy, and source validation passed.');