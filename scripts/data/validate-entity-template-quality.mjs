import fs from 'node:fs';

const errors = [];
const schema = fs.readFileSync('src/data/property/county-property-schema.ts', 'utf8');
const countyRoute = fs.readFileSync('src/routes/property-tax.county.$county.tsx', 'utf8');
const entityRelationships = fs.readFileSync('src/data/knowledge-graph/relationships.ts', 'utf8');
const entityRoute = fs.readFileSync('src/routes/$kind.$slug.tsx', 'utf8');
const entityIndex = fs.readFileSync('src/data/knowledge-graph/index.ts', 'utf8');
const countyProfile = fs.readFileSync('src/data/county-profile.ts', 'utf8');
const localGovernmentProfile = fs.readFileSync('src/data/local-government-profile.ts', 'utf8');
const dataSources = fs.readFileSync('src/data/texas-data-sources.ts', 'utf8');
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
  'const entityCounty = countyContext(entity)',
  'const sameCounty = Boolean(entityCounty && candidateCounty && entityCounty === candidateCounty)',
  "score += 120; reasons.push('direct relationship')",
  "score += 70; reasons.push('same county')",
  'const miles = distanceMiles(entity, candidate)',
  "miles <= 25",
  "miles <= 75",
  "miles <= 150",
  "score += 18;",
  'sharedTags.length * 6',
  "entity.kind === candidate.kind && (sameCounty || miles != null",
  'LOCAL_GOVERNMENT_KINDS.has(entity.kind) && !sameCounty && !directlyRelated && !incomingRelated',
  'score = 0;',
  'proximityTieBreak(entity, a.entity, b.entity)',
  'function countyContext(entity: TexasEntityRecord)',
  "relationship.targetId.startsWith('county:')",
  'function distanceMiles(a: TexasEntityRecord, b: TexasEntityRecord)',
]) {
  if (!entityRelationships.includes(feature)) errors.push(`Related-entity ranking contract missing: ${feature}`);
}

for (const forbiddenRanking of [
  'if (entity.kind === candidate.kind) score += 3',
  "if (entity.kind === candidate.kind) { score += 3",
]) {
  if (entityRelationships.includes(forbiddenRanking)) errors.push(`Alphabetical same-kind fallback must not return: ${forbiddenRanking}`);
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
  'loadLocalGovernmentProfile(entity.slug, entity.name)',
  'enrichLocalOfficeEntity(entity)',
  "entity.kind === 'appraisal-district' || entity.kind === 'tax-office'",
  'localOfficeDescription(countyName, entity.kind, office)',
  'officialUrl: localGovernment.countyWebsiteUrl ?? entity.officialUrl',
  'coordinates,',
]) {
  if (!entityIndex.includes(feature)) errors.push(`County/local-office entity enrichment missing: ${feature}`);
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
  'https://comptroller.texas.gov/taxes/property-tax/county-directory/',
  'https://www.county.org',
  'fetchCountyWebsite',
  'findComptrollerCountyUrl',
  'fetchComptrollerDirectory',
  "parseOfficeSection(page, 'Appraisal District', 'Tax Assessor/Collector')",
  "parseOfficeSection(page, 'Tax Assessor/Collector')",
  'websiteUrl',
  'phone',
  'email',
  'address',
  'lastUpdated',
  'localOfficeDescription',
]) {
  if (!localGovernmentProfile.includes(feature)) errors.push(`Local-government verification contract missing: ${feature}`);
}

for (const feature of [
  "authority:'Texas Association of Counties'",
  "url:'https://www.county.org/county-information-map'",
  "id:'comptroller-appraisal-districts'",
  "id:'txdmv-tax-offices'",
]) {
  if (!dataSources.includes(feature)) errors.push(`Authoritative local-government source contract missing: ${feature}`);
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

console.log('County and generated entity quality gates, authoritative county and local-office enrichment, geographic/semantic related ranking, kind-aware presentation, source specificity, noindex behavior, and qualified sitemap publication passed validation.');
