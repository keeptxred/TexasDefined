import fs from 'node:fs';

const errors = [];
const schema = fs.readFileSync('src/data/property/county-property-schema.ts', 'utf8');
const countyRoute = fs.readFileSync('src/routes/property-tax.county.$county.tsx', 'utf8');
const entityRelationships = fs.readFileSync('src/data/knowledge-graph/relationships.ts', 'utf8');
const entityRoute = fs.readFileSync('src/routes/$kind.$slug.tsx', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');

for (const feature of [
  'isCountyPropertyIndexReady',
  'record.lastVerifiedAt',
  'localPropertySources.length >= 2',
]) {
  if (!schema.includes(feature)) errors.push(`County quality gate missing: ${feature}`);
}

for (const feature of [
  'isCountyPropertyIndexReady(county)',
  "robots: indexReady ? undefined : 'noindex, follow'",
  "...(county.lastVerifiedAt ? { dateModified: county.lastVerifiedAt } : {})",
]) {
  if (!countyRoute.includes(feature)) errors.push(`County route quality contract missing: ${feature}`);
}

for (const feature of [
  'export function isIndexableEntityPage',
  "['active', 'seasonal'].includes(entity.status)",
  'description.length < 180',
  '!entity.sourceCheckedAt',
  "['official', 'high'].includes(entity.sourceConfidence)",
  'hasEntitySpecificOfficialUrl(entity)',
  'NON_SPECIFIC_OFFICIAL_URLS',
  "'https://www.texas.gov/texas-county-websites.html'",
  'LOCAL_GOVERNMENT_KINDS.has(entity.kind)',
  "entity.sourceConfidence !== 'official'",
  "entity.status !== 'active'",
  'contextSignals >= 3',
]) {
  if (!entityRelationships.includes(feature)) errors.push(`Generic entity quality gate missing: ${feature}`);
}

for (const feature of [
  'isIndexableEntityPage(loaderData.entity)',
  "robots: indexable ? undefined : 'noindex, follow, max-image-preview:large'",
]) {
  if (!entityRoute.includes(feature)) errors.push(`Generic entity route quality contract missing: ${feature}`);
}

for (const feature of [
  'COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady)',
  '`/property-tax/county/${county.slug}`',
  'graph.filter(isIndexableEntityPage)',
  'canonicalEntityPath(entity)',
]) {
  if (!sitemap.includes(feature)) errors.push(`Sitemap quality contract missing: ${feature}`);
}

if (countyRoute.includes("dateModified: '2026-08-08'")) {
  errors.push('County pages must not use a hard-coded modified date.');
}

if (errors.length) {
  console.error('Entity template quality validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('County and generated entity quality gates, source specificity, noindex behavior, and qualified sitemap publication passed validation.');
