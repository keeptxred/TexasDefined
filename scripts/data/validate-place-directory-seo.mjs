import fs from 'node:fs';

const read = (file) => fs.readFileSync(file, 'utf8');
const readRouteSurface = (file) => {
  const eagerSource = read(file);
  const lazyFile = file.replace(/\.tsx$/, '.lazy.tsx');
  return fs.existsSync(lazyFile) ? `${eagerSource}\n${read(lazyFile)}` : eagerSource;
};

const cityEager = read('src/routes/browse.cities.tsx');
const cities = readRouteSurface('src/routes/browse.cities.tsx');
const counties = readRouteSurface('src/routes/browse.counties.tsx');
const countyLazy = read('src/routes/browse.counties.lazy.tsx');
const cityDirectory = read('src/components/directories/TexasPlaceDirectory.tsx');
const cityAuthorityIndex = read('src/data/city-authority-index.ts');
const cityMetroAuthority = read('src/data/city-metro-authority.ts');
const cityAuthorityProfiles = read('src/data/city-authority-profiles.ts');
const whirlyballHurst = read('src/data/whirlyball-hurst-destination.ts');
const hurstWhirlyballProductionVerifier = read('scripts/ci/verify-hurst-whirlyball-production.mjs');
const hurstWhirlyballProductionWorkflow = read('.github/workflows/hurst-whirlyball-production-smoke.yml');
const countyDirectory = read('src/components/directories/TexasCountyPropertyDirectory.tsx');
const propertyHub = read('src/routes/property.tsx');
const calculatorFramework = read('src/components/property/PropertyCalculatorFramework.tsx');
const countySelectorField = read('src/components/property/CountySelectorField.tsx');
const cityCountyRoute = read('src/routes/texas-data.city-county-relationships.tsx');
const cityCountyCsv = read('src/routes/texas-data.city-county-relationships[.]csv.ts');

const checks = [
  [cities, '"@type": "City"', 'City directory must declare City entities'],
  [cities, 'numberOfItems: cities.length', 'City directory must expose its complete loader-resolved item count'],
  [cityEager, 'await import("@/data/texas-places")', 'City directory must resolve the city registry behind its loader boundary'],
  [cities, 'cityAnchor(city.slug)', 'City schema must use stable page anchors'],
  [cities, 'CITY_AUTHORITY_SLUGS.has(city.slug)', 'City schema must gate canonical detail URLs on verified authority readiness'],
  [cities, 'absoluteUrl(texasDefinedBrand, cityAuthorityPath(city.slug))', 'Verified city schema entries must use canonical city URLs'],
  [cities, ': `${pageUrl}#${cityAnchor(city.slug)}`', 'Unverified city schema must stay anchored to the directory surface'],
  [counties, 'const verifiedPropertyCounties = COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady)', 'County directory must compute verified property-tax children'],
  [counties, 'numberOfItems: verifiedPropertyCounties.length', 'County property ItemList must count only verified child guides'],
  [counties, 'verifiedPropertyCounties.map((county, index)', 'County property schema must publish only verified child guides'],
  [counties, 'absoluteUrl(texasDefinedBrand, `/property-tax/county/${county.slug}`)', 'Verified county property children must use canonical URLs'],
  [counties, 'sameAs: county.officialDirectoryUrl', 'Verified county guide schema must retain official county references'],
  [counties, 'All 254 Texas counties are represented in the comparison and directory.', 'Visible county directory must explicitly describe all 254 Texas counties'],
  [countyDirectory, 'id={countyPropertyAnchor(county.slug)}', 'County guide anchors must exist in the DOM'],
  [countyDirectory, 'const hasVerifiedPropertyGuide = verified.has(county.slug)', 'County directory links must branch on verification readiness'],
  [countyDirectory, 'Open property-tax guide', 'Verified county property links must remain available'],
  [countyDirectory, 'Open county guide', 'Unverified counties must retain a substantive county path'],
  [cityDirectory, 'id={cityAnchor(city.slug)}', 'City schema anchors must exist in the DOM'],
  [cityDirectory, 'CITY_AUTHORITY_SLUGS.has(city.slug)', 'Visible city links must branch on verified city authority readiness'],
  [cityDirectory, 'params={{ kind: "city", slug: city.slug }}', 'Verified city authority links must use canonical entity routing'],
  [cityDirectory, 'from "@/data/city-authority-index"', 'City directory must reuse the shared verified-city authority index'],
  [cityAuthorityIndex, 'export const CITY_AUTHORITY_INDEX', 'Shared city authority index must remain explicit and reviewable'],
  [cityAuthorityIndex, 'export const CITY_AUTHORITY_SLUGS', 'Shared city authority slug set must derive from the authority index'],
  [cityAuthorityIndex, "{ name: 'Hurst', slug: 'hurst' }", 'Hurst must remain promoted in the verified city authority index'],
  [cityMetroAuthority, "hurst: {", 'Hurst must retain its city authority override'],
  [cityMetroAuthority, "'https://www.hursttx.gov/'", 'Hurst city authority must retain its official municipal source'],
  [cityAuthorityProfiles, "population2020: 40_413", 'Hurst city profile must retain its stable 2020 Census population reference'],
  [cityAuthorityProfiles, "href: '/destination/whirlyball-hurst'", 'Hurst city authority profile must retain the direct WhirlyBall cross-link'],
  [whirlyballHurst, 'href: "/city/hurst"', 'WhirlyBall Hurst must retain a reciprocal link to the verified Hurst city authority page'],
  [whirlyballHurst, 'href: "/county/tarrant"', 'WhirlyBall Hurst must retain broader Tarrant County context alongside the city link'],
  [whirlyballHurst, 'https://upload.wikimedia.org/wikipedia/commons/5/52/Whirlyball.jpg', 'WhirlyBall Hurst must use the stable direct Wikimedia file URL for its hero image'],
  [hurstWhirlyballProductionWorkflow, 'workflow_run:', 'Hurst/WhirlyBall production smoke must run after production deployments'],
  [hurstWhirlyballProductionWorkflow, 'workflows: ["Deploy TexasDefined production"]', 'Hurst/WhirlyBall production smoke must follow the canonical production deployment'],
  [hurstWhirlyballProductionWorkflow, "github.event.workflow_run.conclusion == 'success'", 'Hurst/WhirlyBall production smoke must run only after successful production deployment'],
  [hurstWhirlyballProductionWorkflow, 'node scripts/ci/verify-hurst-whirlyball-production.mjs', 'Hurst/WhirlyBall production workflow must execute the governed verifier'],
  [hurstWhirlyballProductionVerifier, "fetchLive('/browse/cities')", 'Hurst/WhirlyBall production verifier must check the live city directory'],
  [hurstWhirlyballProductionVerifier, "fetchLive('/city/hurst')", 'Hurst/WhirlyBall production verifier must check the live Hurst city authority page'],
  [hurstWhirlyballProductionVerifier, "fetchLive('/destination/whirlyball-hurst')", 'Hurst/WhirlyBall production verifier must check the live WhirlyBall destination page'],
  [hurstWhirlyballProductionVerifier, "fetchLive('/county/tarrant')", 'Hurst/WhirlyBall production verifier must check the live Tarrant County page'],
  [hurstWhirlyballProductionVerifier, "tarrant.includes('WhirlyBall Hurst')", 'Hurst/WhirlyBall production verifier must protect the county-to-attraction link'],
  [hurstWhirlyballProductionVerifier, "tarrant.includes('/destination/whirlyball-hurst')", 'Hurst/WhirlyBall production verifier must protect the canonical county-to-attraction URL'],
  [hurstWhirlyballProductionVerifier, "tarrant.includes('Arlington and Hurst')", 'Hurst/WhirlyBall production verifier must protect Hurst in Tarrant County structured communities'],
  [hurstWhirlyballProductionVerifier, "fetchLive('/sitemap.xml')", 'Hurst/WhirlyBall production verifier must inspect the live primary sitemap'],
  [hurstWhirlyballProductionVerifier, "sitemap.includes('https://texasdefined.com/city/hurst')", 'Hurst/WhirlyBall production verifier must protect Hurst city sitemap inclusion'],
  [hurstWhirlyballProductionVerifier, "sitemap.includes('https://texasdefined.com/destination/whirlyball-hurst')", 'Hurst/WhirlyBall production verifier must protect WhirlyBall sitemap inclusion'],
  [hurstWhirlyballProductionVerifier, 'Hurst has a Texas Defined city guide with official municipal sources', 'Hurst/WhirlyBall production verifier must reject stale directory-only Hurst copy'],
  [hurstWhirlyballProductionVerifier, "cache: 'no-store'", 'Hurst/WhirlyBall production verifier must bypass stale cache state'],
  [hurstWhirlyballProductionVerifier, 'Whirlyball.jpg', 'Hurst/WhirlyBall production verifier must protect the live hero source'],
  [hurstWhirlyballProductionVerifier, 'verifyLiveImage', 'Hurst/WhirlyBall production verifier must exercise the live image delivery path'],
  [hurstWhirlyballProductionVerifier, '/media/remote?url=', 'Hurst/WhirlyBall production verifier must check the governed same-origin image proxy'],
  [hurstWhirlyballProductionVerifier, "startsWith('image/')", 'Hurst/WhirlyBall production verifier must require an image content type'],
  [hurstWhirlyballProductionVerifier, 'body.byteLength > 10_000', 'Hurst/WhirlyBall production verifier must reject empty or trivial image responses'],
  [cities, '"@type": "BreadcrumbList"', 'City directory must declare breadcrumbs'],
  [counties, '"@type": "BreadcrumbList"', 'County directory must declare breadcrumbs'],
  [propertyHub, 'Texas Defined connects all 254 counties to local property-tax research.', 'Property hub must retain the statewide county completeness statement'],
  [calculatorFramework, "lazy(() => import('@/components/property/CountySelectorField')", 'Calculator framework must lazy-load county options'],
  [countySelectorField, "import { TEXAS_COUNTIES } from '@/data/texas-places'", 'Lazy county selector field must retain the canonical county registry'],
  [countySelectorField, 'TEXAS_COUNTIES.map((county)', 'Lazy county selector field must render every county option'],
  [cityCountyRoute, "await import('@/data/texas-places')", 'City-county dataset must load registries behind its route loader'],
  [cityCountyRoute, 'const { relationships } = Route.useLoaderData()', 'City-county dataset UI must consume loader-resolved relationships'],
  [cityCountyCsv, "await import('@/data/texas-places')", 'City-county CSV must load registries only inside its request handler'],
];

const failures = checks
  .filter(([source, needle]) => !source.includes(needle))
  .map(([, , message]) => message);

if (cityDirectory.includes('params={{ kind: "city", slug: city.slug }}') && !cityDirectory.includes('CITY_AUTHORITY_SLUGS.has(city.slug)')) {
  failures.push('Pending city directory entries must not advertise unverified /city detail pages.');
}
if (cities.includes('absoluteUrl(texasDefinedBrand, cityAuthorityPath(city.slug))') && !cities.includes('CITY_AUTHORITY_SLUGS.has(city.slug)')) {
  failures.push('City schema must not advertise canonical /city detail pages without verified authority gating.');
}
if (cityEager.includes('import { TEXAS_CITIES } from "@/data/texas-places"') || cityEager.includes("import { TEXAS_CITIES } from '@/data/texas-places'")) {
  failures.push('City directory route must not reintroduce the full city registry as an eager route import.');
}
if (counties.includes('numberOfItems: TEXAS_COUNTIES.length')) {
  failures.push('County property ItemList must not advertise all 254 property-tax child pages.');
}
if (countyLazy.includes('from "@/data/texas-places"') || countyLazy.includes("from '@/data/texas-places'")) {
  failures.push('Visible county directory must not reintroduce the Texas county registry into its lazy client surface just to describe statewide completeness.');
}
if (propertyHub.includes('@/data/texas-places')) {
  failures.push('Property hub must not import the full Texas places registry just to render the known 254-county completeness statement.');
}
if (calculatorFramework.includes('@/data/texas-places')) {
  failures.push('Shared calculator framework must not eagerly import the Texas places registry; county options belong in the lazy selector field.');
}
for (const [label, source] of [['city directory route', cityEager], ['city-county dataset route', cityCountyRoute], ['city-county CSV route', cityCountyCsv]]) {
  if (source.includes("import { TEXAS_CITIES") || source.includes('import { TEXAS_COUNTIES')) {
    failures.push(`${label} must not statically import the Texas places registry.`);
  }
}

if (failures.length) {
  console.error('Place directory SEO validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Place directory SEO validation passed: all cities/counties remain discoverable while verified child URLs stay readiness-gated, and the shared Texas places registry is kept behind route, request, or lazy-component boundaries instead of the eager main client graph.');
