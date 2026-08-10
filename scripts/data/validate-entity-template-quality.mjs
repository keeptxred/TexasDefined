import fs from 'node:fs';

const errors = [];
const schema = fs.readFileSync('src/data/property/county-property-schema.ts', 'utf8');
const countyRoute = fs.readFileSync('src/routes/property-tax.county.$county.tsx', 'utf8');
const entityRelationships = fs.readFileSync('src/data/knowledge-graph/relationships.ts', 'utf8');
const entityRoute = fs.readFileSync('src/routes/$kind.$slug.tsx', 'utf8');
const entityIndex = fs.readFileSync('src/data/knowledge-graph/index.ts', 'utf8');
const countyProfile = fs.readFileSync('src/data/county-profile.ts', 'utf8');
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
  'pageDescription(loaderData.entity)',
  'relatedForDisplay(entity, related)',
  'statusHeading(entity.kind)',
  'statusMessage(entity)',
  'sourceStatus(entity)',
  'officialLinkLabel(entity.kind)',
  'relatedHeading(entity.kind)',
  "'appraisal-district': 'Property Appraisal'",
  "'tax-office': 'County Tax Office'",
  'This county guide is being expanded',
  'Office details are being verified',
  'Service details are being verified',
]) {
  if (!entityRoute.includes(feature)) errors.push(`Generic entity route quality contract missing: ${feature}`);
}

for (const forbiddenCopy of [
  'A closer look at ${entity.name}, where to find it, and what else is worth seeing nearby.',
  'What to know about ${loaderData.entity.name}, where it is, and what is nearby.',
]) {
  if (entityRoute.includes(forbiddenCopy)) errors.push(`Generic placeholder copy must not return: ${forbiddenCopy}`);
}

for (const feature of [
  'loadCountyProfile(entity.slug, entity.name)',
  'countyProfileDescription(entity.name, profile)',
  "if (entity.kind !== 'county') return entity",
  'coordinates,',
]) {
  if (!entityIndex.includes(feature)) errors.push(`County entity enrichment missing: ${feature}`);
}

for (const feature of [
  'https://www.tsl.texas.gov/ref/abouttx/countyseats.html',
  'https://api.census.gov/data/2020/dec/pl',
  'https://api.census.gov/data/2020/geoinfo',
  'fetchCountySeat',
  'fetchPopulation',
  'fetchGeography',
  'countySeat',
  'population2020',
  'landAreaSquareMiles',
  'majorCommunities',
  'countyProfileDescription',
]) {
  if (!countyProfile.includes(feature)) errors.push(`County profile data contract missing: ${feature}`);
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

console.log('County and generated entity quality gates, kind-aware presentation, authoritative county profile enrichment, source specificity, noindex behavior, and qualified sitemap publication passed validation.');
