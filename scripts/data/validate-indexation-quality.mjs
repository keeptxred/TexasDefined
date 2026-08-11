import fs from 'node:fs';

const registry = fs.readFileSync('src/lib/public-routes.ts', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const news = fs.readFileSync('src/routes/news.tsx', 'utf8');
const entityRoute = fs.readFileSync('src/routes/$kind.$slug.tsx', 'utf8');
const countyRoute = fs.readFileSync('src/routes/property-tax.county.$county.tsx', 'utf8');
const failures = [];

const section = (name) => registry.match(new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\] as const;`))?.[1] ?? '';
const always = section('INDEXABLE_STATIC_PATHS');
const conditional = section('CONDITIONAL_INDEXABLE_PUBLIC_PATHS');
const nonIndexable = section('NON_INDEXABLE_PUBLIC_PATHS');
const redirects = section('REDIRECT_ONLY_PATHS');

if (always.includes('"/news"')) failures.push('/news must not be unconditionally indexable.');
if (!conditional.includes('"/news"')) failures.push('/news must be registered as conditionally indexable.');
if (!news.includes('robots: hasStories ? undefined : "noindex, follow"')) failures.push('/news must noindex its empty state.');
if (!sitemap.includes('...(articles.length ? [{ path: "/news" }] : [])')) failures.push('Primary sitemap must publish /news only when live articles exist.');

for (const path of ['/search', '/explore/search', '/shop/cart', '/shop/checkout-return']) {
  if (!nonIndexable.includes(`"${path}"`)) failures.push(`${path} must remain explicitly non-indexable.`);
  if (always.includes(`"${path}"`)) failures.push(`${path} must not be in the always-indexable registry.`);
}

for (const path of ['/tax-calculator', '/texas-financial-tools', '/texas-property-tax-increase-calculator', '/texas-property-tax-protest-guide']) {
  if (!redirects.includes(`"${path}"`)) failures.push(`${path} must remain redirect-only.`);
  if (always.includes(`"${path}"`) || conditional.includes(`"${path}"`)) failures.push(`${path} must not be indexable.`);
}

for (const feature of ['isIndexableEntityPage', 'robots: indexable ? undefined : "noindex, follow"']) {
  if (!entityRoute.includes(feature)) failures.push(`Generic entity indexation gate missing: ${feature}`);
}
for (const feature of ['isCountyPropertyIndexReady', 'robots: indexReady ? undefined : "noindex, follow"']) {
  if (!countyRoute.includes(feature)) failures.push(`County indexation gate missing: ${feature}`);
}
for (const feature of ['graph.filter(isIndexableEntityPage)', 'COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady)', 'auditDestination(destination).readyForIndexing']) {
  if (!sitemap.includes(feature)) failures.push(`Sitemap quality gate missing: ${feature}`);
}

if (failures.length) {
  console.error('Indexation quality validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('Indexation quality validation passed: conditional hubs, noindex utilities, redirects, and generated-page sitemap gates are aligned.');
