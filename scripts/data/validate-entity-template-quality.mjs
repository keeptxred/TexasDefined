import fs from 'node:fs';

const errors = [];
const schema = fs.readFileSync('src/data/property/county-property-schema.ts', 'utf8');
const countyRoute = fs.readFileSync('src/routes/property-tax.county.$county.tsx', 'utf8');
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
  'COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady)',
  '`/property-tax/county/${county.slug}`',
]) {
  if (!sitemap.includes(feature)) errors.push(`Sitemap county-quality contract missing: ${feature}`);
}

if (sitemap.includes('loadTexasKnowledgeGraph()') || sitemap.includes('canonicalEntityPath(entity)')) {
  errors.push('Primary sitemap must not publish generic knowledge-graph entity URLs without a guaranteed page template.');
}

if (countyRoute.includes("dateModified: '2026-08-08'")) {
  errors.push('County pages must not use a hard-coded modified date.');
}

if (errors.length) {
  console.error('Entity template quality validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Thin county pages, verified county sitemap publication, truthful freshness, and generic entity URL suppression passed validation.');
