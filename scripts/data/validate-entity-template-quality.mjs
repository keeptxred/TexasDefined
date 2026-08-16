import fs from 'node:fs';

const errors = [];
const schema = fs.readFileSync('src/data/property/county-property-schema.ts', 'utf8');
const countyRoute = fs.readFileSync('src/routes/property-tax.county.$county.tsx', 'utf8');
const entityRelationships = fs.readFileSync('src/data/knowledge-graph/relationships.ts', 'utf8');
const entityRoute = fs.readFileSync('src/routes/$kind.$slug.tsx', 'utf8');
const countyGuide = fs.readFileSync('src/components/content/CountyGuideSections.tsx', 'utf8');
const countyIdentity = fs.readFileSync('src/components/content/CountyIdentitySection.tsx', 'utf8');
const countyStatewide = fs.readFileSync('src/components/content/CountyStatewideContextSection.tsx', 'utf8');
const countyComparison = fs.readFileSync('src/data/county-comparison.ts', 'utf8');
const countyComparisonTable = fs.readFileSync('src/components/counties/TexasCountyComparisonTable.tsx', 'utf8');
const entityIndex = fs.readFileSync('src/data/knowledge-graph/index.ts', 'utf8');
const countyProfile = fs.readFileSync('src/data/county-profile.ts', 'utf8');
const localGovernmentProfile = fs.readFileSync('src/data/local-government-profile.ts', 'utf8');
const dataSources = fs.readFileSync('src/data/texas-data-sources.ts', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const exploreSitemap = fs.readFileSync('src/routes/sitemap-explore[.]xml.ts', 'utf8');

for (const feature of [
  'isCountyPropertyIndexReady',
  'record.lastVerifiedAt',
  'COUNTY_PROPERTY_VERIFICATION_MAX_AGE_DAYS',
  'hasFreshCountyPropertyVerification',
  'new Set([',
  'localPropertySources.size >= 2',
]) {
  if (!schema.includes(feature)) errors.push(`County quality gate missing: ${feature}`);
}
for (const feature of ['isCountyPropertyIndexReady(county)',"robots: indexReady ? undefined : 'noindex, follow'","...(county.lastVerifiedAt ? { dateModified: county.lastVerifiedAt } : {})"]) {
  if (!countyRoute.includes(feature)) errors.push(`County route quality contract missing: ${feature}`);
}
for (const feature of ['export function isIndexableEntityPage',"['active', 'seasonal'].includes(entity.status)",'description.length < 180','!entity.sourceCheckedAt',"['official', 'high'].includes(entity.sourceConfidence)",'hasEntitySpecificOfficialUrl(entity)','NON_SPECIFIC_OFFICIAL_URLS',"'https://www.texas.gov/texas-county-websites.html'",'LOCAL_GOVERNMENT_KINDS.has(entity.kind)',"entity.sourceConfidence !== 'official'","entity.status !== 'active'",'contextSignals >= 3']) {
  if (!entityRelationships.includes(feature)) errors.push(`Generic entity quality gate missing: ${feature}`);
}
for (const feature of ['const entityCounty = countyContext(entity)','const sameCounty = Boolean(entityCounty && candidateCounty && entityCounty === candidateCounty)',"score += 120; reasons.push('direct relationship')","score += 70; reasons.push('same county')",'const miles = distanceMiles(entity, candidate)',"miles <= 25","miles <= 75","miles <= 150",'sharedTags.length * 6','LOCAL_GOVERNMENT_KINDS.has(entity.kind) && !sameCounty && !directlyRelated && !incomingRelated','proximityTieBreak(entity, a.entity, b.entity)','function distanceMiles(a: TexasEntityRecord, b: TexasEntityRecord)']) {
  if (!entityRelationships.includes(feature)) errors.push(`Related-entity ranking contract missing: ${feature}`);
}
for (const forbiddenRanking of ['if (entity.kind === candidate.kind) score += 3',"if (entity.kind === candidate.kind) { score += 3"]) {
  if (entityRelationships.includes(forbiddenRanking)) errors.push(`Alphabetical same-kind fallback must not return: ${forbiddenRanking}`);
}
for (const feature of ['isIndexableEntityPage(loaderData.entity)',"robots: indexable ? undefined : 'noindex, follow, max-image-preview:large'",'loadCountyProfile(entity.slug, entity.name)','loadLocalGovernmentProfile(entity.slug, entity.name)','<CountyGuideSections entity={entity} profile={countyProfile} localGovernment={localGovernment} related={related} />',"entity.kind !== 'county' && entity.tags?.length","entity.kind !== 'county' && visibleRelated.length",'2020 Census population','Official county website']) {
  if (!entityRoute.includes(feature)) errors.push(`Rich county route contract missing: ${feature}`);
}
for (const feature of ['At a glance','The county in numbers','Where it is','A sense of place','County seat & communities','Places on the map','What to know','How to use this guide','Property & county services','Official local resources','Nearby places','Keep exploring','profile.population2020','profile.landAreaSquareMiles','profile.majorCommunities','localGovernment.appraisalDistrict','localGovernment.taxOffice','localGovernment.countyWebsiteUrl','CountyIdentitySection','profile.populationDensityPerSquareMile','profile.waterSharePercent','How densely populated is','propertyTaxPath','getCountyPropertyRecordBySlug','isCountyPropertyIndexReady']) {
  if (!countyGuide.includes(feature)) errors.push(`County guide section missing: ${feature}`);
}
for (const feature of ['Verified county profile','What the data says about','populationDensityPerSquareMile','waterSharePercent','Dividing those two Census figures','structured place directory','not a claim that the list contains every incorporated place','CountyStatewideContextSection','countySlug(countyName)']) {
  if (!countyIdentity.includes(feature)) errors.push(`County identity uniqueness contract missing: ${feature}`);
}
for (const feature of ['Statewide context','Where {countyName} sits in the county data','buildCountyStatewideContext','loadTexasCountyComparison','of {fact.comparedCount} counties with source data','missing source values are excluded rather than estimated']) {
  if (!countyStatewide.includes(feature)) errors.push(`County statewide context missing: ${feature}`);
}
for (const feature of ['populationDensityPerSquareMile','waterSharePercent','buildCountyStatewideContext','metricRank','landAreaSquareMiles','difference || a.name.localeCompare(b.name)']) {
  if (!countyComparison.includes(feature)) errors.push(`County comparison uniqueness contract missing: ${feature}`);
}
for (const feature of ['Density','Water share','row.populationDensityPerSquareMile','row.waterSharePercent','derived values shown for comparison']) {
  if (!countyComparisonTable.includes(feature)) errors.push(`County comparison table uniqueness contract missing: ${feature}`);
}
for (const forbiddenCopy of ['A closer look at ${entity.name}, where to find it, and what else is worth seeing nearby.','What to know about ${loaderData.entity.name}, where it is, and what is nearby.','This county guide is being expanded']) {
  if (entityRoute.includes(forbiddenCopy)) errors.push(`Generic placeholder copy must not return: ${forbiddenCopy}`);
}

for (const feature of [
  'const countyEntries = graph.filter((entity) => entity.kind === \'county\')',
  'Promise.all(countyEntries.map(enrichCountyGeographyEntity))',
  'async function enrichCountyGeographyEntity',
  'enrichLocalOfficeEntityFromSnapshot',
  'getCountyPropertyRecordBySlug',
  'isCountyPropertyIndexReady',
  "status: 'active'",
  'const readyForPublication = hasVerifiedWebsite && hasUsefulContact && description.length >= 180',
  "status: readyForPublication ? 'active' : entity.status",
  'loadLocalGovernmentProfile(entity.countySlug, countyName)',
]) {
  if (!entityIndex.includes(feature)) errors.push(`Existing generated-page remediation missing: ${feature}`);
}

for (const feature of [
  'countySeatsPromise',
  'countyCensusFactsPromise',
  'fetchCountySeats',
  'fetchCountyCensusFacts',
  'Census2020/State_County/MapServer/1/query',
  "url.searchParams.set('where', \"STATE='48'\")",
  "url.searchParams.set('outFields', 'COUNTY,POP100,AREALAND,AREAWATER,INTPTLAT,INTPTLON')",
  'population2020: censusFacts.population2020',
  'landAreaSquareMiles: censusFacts.landAreaSquareMiles',
  'waterAreaSquareMiles: censusFacts.waterAreaSquareMiles',
  'populationDensityPerSquareMile',
  'waterSharePercent',
  'density(censusFacts.population2020, censusFacts.landAreaSquareMiles)',
  'waterShare(censusFacts.landAreaSquareMiles, censusFacts.waterAreaSquareMiles)',
  'roughly ${formatDensity(densityValue)} residents per square mile',
  'Broader community coverage is added only when a place-to-county relationship is present',
  'majorCommunities',
  'countyProfileDescription',
]) {
  if (!countyProfile.includes(feature)) errors.push(`Statewide county profile remediation missing: ${feature}`);
}
for (const forbiddenLegacyCensusSource of ['api.census.gov/data/2020/dec/pl','api.census.gov/data/2020/geoinfo']) {
  if (countyProfile.includes(forbiddenLegacyCensusSource)) errors.push(`Retired Census Data API dependency must not return: ${forbiddenLegacyCensusSource}`);
}
for (const forbiddenPerCountyFetch of ['fetchCountySeat(baseName)','fetchPopulation(countyCode)','fetchGeography(countyCode)']) {
  if (countyProfile.includes(forbiddenPerCountyFetch)) errors.push(`Per-county source fanout must not return: ${forbiddenPerCountyFetch}`);
}
if (countyProfile.includes('will expand as additional local sources are verified')) {
  errors.push('County descriptions must not fall back to the old repeated expansion sentence.');
}

for (const feature of ['https://comptroller.texas.gov/taxes/property-tax/county-directory/','https://www.county.org','fetchCountyWebsite','findComptrollerCountyUrl','fetchComptrollerDirectory',"parseOfficeSection(page, 'Appraisal District', 'Tax Assessor/Collector')","parseOfficeSection(page, 'Tax Assessor/Collector')",'websiteUrl','phone','email','address','lastUpdated','localOfficeDescription']) {
  if (!localGovernmentProfile.includes(feature)) errors.push(`Local-government verification contract missing: ${feature}`);
}
for (const feature of ["authority:'Texas Association of Counties'","url:'https://www.county.org/county-information-map'","id:'comptroller-appraisal-districts'","id:'txdmv-tax-offices'"]) {
  if (!dataSources.includes(feature)) errors.push(`Authoritative local-government source contract missing: ${feature}`);
}
for (const feature of ['COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady)','`/property-tax/county/${county.slug}`','graph.filter(isIndexableEntityPage)','canonicalEntityPath(entity)']) {
  if (!sitemap.includes(feature)) errors.push(`Primary sitemap quality contract missing: ${feature}`);
}
for (const feature of ['isPrimaryTripPlannerDestination','auditDestination','const indexableDestinations =','auditDestination(destination).readyForIndexing']) {
  if (!exploreSitemap.includes(feature)) errors.push(`Explore sitemap quality contract missing: ${feature}`);
}
if (countyRoute.includes("dateModified: '2026-08-08'")) errors.push('County pages must not use a hard-coded modified date.');

if (errors.length) {
  console.error('Entity template quality validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('County, destination and generated entity quality gates, statewide batch remediation, county uniqueness signals and ranks, snapshot-backed office promotion, authoritative enrichment, geographic/semantic ranking, rich county-guide sections, source specificity, noindex behavior, and partitioned qualified sitemap publication passed validation.');
