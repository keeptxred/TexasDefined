import fs from 'node:fs';

const entityIndex = fs.readFileSync('src/data/knowledge-graph/index.ts', 'utf8');
const primarySitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const exploreSitemap = fs.readFileSync('src/routes/sitemap-explore[.]xml.ts', 'utf8');
const countyRoute = fs.readFileSync('src/routes/property-tax.county.$county.tsx', 'utf8');
const failures = [];

const forbiddenDynamicFreshness = [
  "sourceCheckedAt: localGovernment.countyWebsiteUrl ? new Date().toISOString().slice(0, 10) : geographic.sourceCheckedAt",
  "sourceCheckedAt: office.lastUpdated ?? new Date().toISOString().slice(0, 10)",
];
for (const forbidden of forbiddenDynamicFreshness) {
  if (entityIndex.includes(forbidden)) failures.push(`Request-time freshness stamp must not return: ${forbidden}`);
}

for (const required of [
  'sourceCheckedAt: geographic.sourceCheckedAt',
  'sourceCheckedAt: office.lastUpdated ?? entity.sourceCheckedAt',
]) {
  if (!entityIndex.includes(required)) failures.push(`Stable entity freshness contract missing: ${required}`);
}

if (!primarySitemap.includes('lastmod: toDate(entity.sourceCheckedAt)')) {
  failures.push('Primary sitemap entity lastmod must remain tied to the governed sourceCheckedAt field.');
}
if (!exploreSitemap.includes('entry(`/destination/${item.slug}`, item.sourceCheckedAt)')) {
  failures.push('Explore sitemap destination lastmod must remain tied to sourceCheckedAt rather than request time.');
}
if (!countyRoute.includes('...(county.lastVerifiedAt ? { dateModified: county.lastVerifiedAt } : {})')) {
  failures.push('County structured-data dateModified must remain conditional on a real lastVerifiedAt value.');
}
if (countyRoute.includes("dateModified: '2026-08-08'")) {
  failures.push('Hard-coded county dateModified values must not return.');
}

if (failures.length) {
  console.error('Freshness signal validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Freshness signal validation passed: sitemap and structured-data dates are source-backed and request-time enrichment cannot manufacture daily modification signals.');
