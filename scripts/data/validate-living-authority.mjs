import fs from 'node:fs';

const failures = [];
const read = (file) => fs.readFileSync(file, 'utf8');

const paths = read('src/components/editorial/LivingAuthorityPaths.tsx');
const explorePaths = read('src/components/editorial/ExploreTopicPaths.tsx');
const category = read('src/components/editorial/CategoryPage.tsx');
const directory = read('src/components/directories/TexasPlaceDirectory.tsx');
const moneyHub = read('src/routes/decide.financial-tools.tsx');
const propertyHub = read('src/routes/property.tsx');
const calculatorPage = read('src/components/calculators/CalculatorPage.tsx');
const funnel = read('src/components/monetization/EvergreenNextSteps.tsx');
const analytics = read('src/platform/analytics.ts');
const relocationHub = read('src/routes/moving-to-texas.lazy.tsx');
const relocationDataCenter = [
  read('src/routes/moving-to-texas_.data.tsx'),
  read('src/routes/moving-to-texas_.data.lazy.tsx'),
].join('\n');
const relocationLab = read('src/components/relocation/RelocationAuthorityLab.tsx');
const metroRelocationAuthority = read('src/components/relocation/MetroRelocationAuthority.tsx');
const articleBody = read('src/components/editorial/ArticleBody.tsx');
const relocationData = read('src/data/relocation-authority.ts');
const relocationAddress = read('src/data/relocation-address.ts');
const relocationAddressServer = read('src/data/relocation-address.server.ts');
const dataCenter = read('src/data/texas-data-center.ts');
const movingChecklist = read('src/routes/moving-to-texas-checklist.tsx');

for (const target of [
  '/browse/cities',
  '/texas-cost-of-living-calculator',
  '/texas-salary-comparison-by-city',
  '/texas-moving-cost-calculator',
  '/texas-utility-cost-calculator',
  '/property',
  '/texas-homeownership-cost-calculator',
  '/texas-home-insurance-calculator',
  '/browse/counties',
  '/find-my-school-district',
  '/moving-to-texas/data',
  '/texas-data',
  '/moving-to-texas-checklist',
]) {
  if (!paths.includes(`to: \"${target}\"`)) failures.push(`Living authority paths must include ${target}.`);
}

if (!category.includes('LivingAuthorityPaths')) failures.push('Category pages must integrate LivingAuthorityPaths.');
if (!category.includes('<LivingAuthorityPaths currentCategory={category} />')) failures.push('LivingAuthorityPaths must receive the active category.');
if (!paths.includes('currentCategory !== \"moving-to-texas\" && currentCategory !== \"real-estate\"')) failures.push('LivingAuthorityPaths must stay limited to moving and real-estate authority surfaces.');

for (const target of ['/moving-to-texas','/property','/decide/financial-tools','/texas-utility-cost-calculator','/texas-homeownership-cost-calculator']) {
  if (!directory.includes(`to=\"${target}\"`)) failures.push(`Place directory must link to ${target}.`);
}
for (const target of ['/texas-salary-comparison-by-city','/texas-cost-of-living-calculator','/texas-data']) {
  if (!directory.includes(`to=\"${target}\"`)) failures.push(`City records must expose ${target}.`);
}
if (!directory.includes('Relocation research →')) failures.push('City directory cards must expose relocation research.');

for (const target of ['/texas-cost-of-living-calculator','/texas-salary-comparison-by-city','/texas-moving-cost-calculator','/texas-utility-cost-calculator','/texas-home-insurance-calculator','/browse/counties','/browse/cities','/moving-to-texas']) {
  if (!moneyHub.includes(target)) failures.push(`Money & Property hub must retain ${target}.`);
}
for (const target of ['/learn/property-taxes','/decide/property-taxes','/browse/counties','/texas-homeownership-cost-calculator','/texas-home-affordability-calculator']) {
  if (!propertyHub.includes(target)) failures.push(`Property hub must retain ${target}.`);
}

if (!calculatorPage.includes('<EvergreenNextSteps title={title} />')) failures.push('Shared calculator pages must expose the evergreen next-step funnel.');
if (!paths.includes('<EvergreenNextSteps category={currentCategory} />')) failures.push('Moving and real-estate guide hubs must expose the evergreen next-step funnel.');
if (!explorePaths.includes('<EvergreenNextSteps category={category} />')) failures.push('Explore guide hubs must expose the evergreen next-step funnel.');

for (const envName of [
  'VITE_TEXASDEFINED_INSURANCE_PARTNER_URL',
  'VITE_TEXASDEFINED_MORTGAGE_PARTNER_URL',
  'VITE_TEXASDEFINED_REAL_ESTATE_PARTNER_URL',
  'VITE_TEXASDEFINED_MOVING_PARTNER_URL',
  'VITE_TEXASDEFINED_TRAVEL_PARTNER_URL',
]) {
  if (!funnel.includes(envName)) failures.push(`Evergreen funnel must support ${envName}.`);
}

for (const requirement of [
  'url.protocol === "https:"',
  'partners.length > 0',
  'rel="sponsored nofollow noopener noreferrer"',
  'data-commercial-partner={partner.id}',
  'Texas Defined may receive compensation',
]) {
  if (!funnel.includes(requirement)) failures.push(`Evergreen funnel safeguard missing: ${requirement}.`);
}

if (!analytics.includes("| 'partner_referral_clicked'")) failures.push('Analytics must distinguish commercial partner referral clicks.');
if (!analytics.includes('anchor.dataset.commercialPartner')) failures.push('Analytics must read commercial partner identifiers from funnel links.');
if (!analytics.includes("trackTexasDefinedOutcome('partner_referral_clicked'")) failures.push('Analytics must record commercial partner referral clicks.');

for (const requirement of [
  '<RelocationAuthorityLab />',
  '/moving-to-texas/data',
  '/texas-data/texas-population-and-migration-2025',
  '/texas-data/where-new-texans-came-from-2024',
  '/texas-data/texas-homeowners-premium-history',
  '/texas-data/texas-metro-payrolls-june-2026',
  '/texas-data/texas-traffic-monitoring-coverage',
]) {
  if (!relocationHub.includes(requirement)) failures.push(`Moving hub authority surface missing: ${requirement}.`);
}

for (const requirement of [
  "createFileRoute('/moving-to-texas/data')",
  "const canonicalPath = '/moving-to-texas/data'",
  "'@type': ['CollectionPage', 'DataCatalog']",
  "'texas-population-and-migration-2025'",
  "'texas-population-and-migration-2024'",
  "'where-new-texans-came-from-2024'",
  "'texas-homeowners-premium-history'",
  "'texas-metro-payrolls-june-2026'",
  "'texas-traffic-monitoring-coverage'",
  'TDI county premium map',
  'homeowners-losses-by-county.html',
  'TWIA wind coverage can apply in 14 coastal counties and parts of Harris County',
  'hidden “best city” score',
  'RELOCATION_METROS',
  'relocationSources.censusPopulation',
  'relocationSources.censusMigration',
  'relocationSources.censusCountyMigration',
  'relocationSources.blsMetro',
  'relocationSources.tdiInsurance',
  'relocationSources.teaSchools',
  'relocationSources.comptrollerProperty',
  'relocationSources.txdotTraffic',
  'relocationSources.pucUtilities',
  'relocationSources.femaFlood',
  '/texas-cost-of-living-calculator',
  '/texas-salary-comparison-by-city',
  '/texas-homeownership-cost-calculator',
  '/moving-to-texas-checklist',
]) {
  if (!relocationDataCenter.includes(requirement)) failures.push(`Relocation Data Center safeguard missing: ${requirement}.`);
}

for (const requirement of [
  'Where should you research first?',
  'Research this Texas address',
  'matched.length',
  'RELOCATION_RESEARCH_STEPS',
  'RELOCATION_SOURCES',
  'resolveRelocationAddress',
  'no secret “best places” score',
]) {
  if (!relocationLab.includes(requirement)) failures.push(`Relocation decision lab safeguard missing: ${requirement}.`);
}

for (const city of [
  'Dallas', 'Fort Worth', 'Frisco', 'Plano', 'McKinney', 'Denton', 'Arlington',
  'Houston', 'Katy', 'Sugar Land', 'The Woodlands', 'Pearland', 'Cypress',
  'Austin', 'Round Rock', 'Georgetown', 'Cedar Park', 'Pflugerville',
  'San Antonio', 'New Braunfels', 'Boerne', 'El Paso', 'Corpus Christi',
  'Lubbock', 'Amarillo', 'Waco', 'College Station', 'Tyler', 'Brownsville', 'McAllen',
]) {
  if (!relocationData.includes(`name: \"${city}\"`)) failures.push(`Relocation place research layer must include ${city}.`);
}

for (const sourceKey of ['censusMigration', 'censusCountyMigration', 'censusPopulation', 'blsMetro', 'tdiInsurance', 'teaSchools', 'comptrollerProperty', 'txdotTraffic', 'txdotDiscos', 'pucUtilities', 'femaFlood']) {
  if (!relocationData.includes(`${sourceKey}:`)) failures.push(`Relocation source registry missing ${sourceKey}.`);
}

for (const requirement of ['createServerFn({ method: "POST" })', 'slice(0, 240)', 'resolveRelocationAddressServer']) {
  if (!relocationAddress.includes(requirement)) failures.push(`Relocation address client/server boundary missing: ${requirement}.`);
}
for (const requirement of ['geocoding.geo.census.gov', 'Public_AR_Current', 'Current_Current', 'state !== "TX"', '/School Districts.*Unified|Unified School District/i']) {
  if (!relocationAddressServer.includes(requirement)) failures.push(`Census relocation geocoder safeguard missing: ${requirement}.`);
}

for (const slug of [
  'texas-population-and-migration-2025',
  'texas-population-and-migration-2024',
  'where-new-texans-came-from-2024',
  'texas-homeowners-premium-history',
  'texas-metro-payrolls-june-2026',
  'texas-traffic-monitoring-coverage',
]) {
  if (!dataCenter.includes(`slug: '${slug}'`)) failures.push(`Texas Data Desk must retain relocation dataset ${slug}.`);
}
for (const domain of ['census.gov', 'tdi.texas.gov', 'bls.gov', 'txdot.gov']) {
  if (!dataCenter.includes(domain)) failures.push(`Relocation Data Desk must retain authoritative source ${domain}.`);
}

for (const officialSource of [
  'moversguide.usps.com',
  'tea.texas.gov',
  'txdmv.gov',
  'dps.texas.gov',
  'votetexas.gov',
  'comptroller.texas.gov',
  'tdi.texas.gov',
]) {
  if (!movingChecklist.includes(officialSource)) failures.push(`Moving checklist must link directly to ${officialSource}.`);
}
if (!movingChecklist.includes('Official source ·')) failures.push('Moving checklist must visibly label official-source links.');
if (!movingChecklist.includes("verifiedLabel = 'Verified Aug. 26, 2026'")) failures.push('Moving checklist must expose its source verification date.');

for (const guidePath of [
  '/article/moving-to-dallas-fort-worth-guide',
  '/article/moving-to-houston-address-checklist',
  '/article/moving-to-austin-guide',
  '/article/moving-to-san-antonio-guide',
  '/article/moving-to-el-paso-guide',
]) {
  if (!relocationData.includes(`guideHref: \"${guidePath}\"`)) failures.push(`Relocation metro registry must retain canonical guide ${guidePath}.`);
  if (!articleBody.includes(`\"${guidePath}\"`)) failures.push(`Article body must lazy-gate metro relocation authority on ${guidePath}.`);
}

for (const requirement of [
  'lazy(() => import("@/components/relocation/MetroRelocationAuthority")',
  'useRouterState',
  'showMetroRelocationAuthority',
  '<MetroRelocationAuthority articlePath={pathname} />',
]) {
  if (!articleBody.includes(requirement)) failures.push(`Metro relocation lazy-render safeguard missing: ${requirement}.`);
}

for (const requirement of [
  'RELOCATION_METROS',
  'RELOCATION_SOURCES',
  'RELOCATION_SOURCE_VERIFIED',
  'metro.guideHref === articlePath',
  'different datasets and vintages',
  'composite “best city” score',
  '/moving-to-texas#address-research-desk',
  '/moving-to-texas/data',
  '/texas-cost-of-living-calculator',
  '/texas-salary-comparison-by-city',
  '/texas-home-insurance-calculator',
  '/texas-homeownership-cost-calculator',
  '/texas-data/texas-population-and-migration-2025',
  '/texas-data/texas-population-and-migration-2024',
  '/texas-data/where-new-texans-came-from-2024',
  '/texas-data/texas-homeowners-premium-history',
  '/texas-data/texas-metro-payrolls-june-2026',
  '/texas-data/texas-traffic-monitoring-coverage',
  'RELOCATION_SOURCES.censusPopulation',
  'RELOCATION_SOURCES.censusCountyMigration',
  'RELOCATION_SOURCES.blsMetro',
  'RELOCATION_SOURCES.tdiInsurance',
  'RELOCATION_SOURCES.txdotTraffic',
  'RELOCATION_SOURCES.teaSchools',
  'RELOCATION_SOURCES.comptrollerProperty',
]) {
  if (!metroRelocationAuthority.includes(requirement)) failures.push(`Metro relocation authority surface missing: ${requirement}.`);
}

if (failures.length) {
  console.error('Texas living/property/relocation authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Moving, relocation data center, metro guides, city, county, property, address research, travel and partner-ready evergreen pathways are protected.');