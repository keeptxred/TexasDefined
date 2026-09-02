import fs from 'node:fs';

const read = (file) => fs.readFileSync(file, 'utf8');
const readRouteSurface = (file) => {
  const eagerSource = read(file);
  const lazyFile = file.replace(/\.tsx$/, '.lazy.tsx');
  return fs.existsSync(lazyFile) ? `${eagerSource}\n${read(lazyFile)}` : eagerSource;
};

const cities = readRouteSurface('src/routes/browse.cities.tsx');
const counties = readRouteSurface('src/routes/browse.counties.tsx');
const cityDirectory = read('src/components/directories/TexasPlaceDirectory.tsx');
const cityAuthorityIndex = read('src/data/city-authority-index.ts');
const countyDirectory = read('src/components/directories/TexasCountyPropertyDirectory.tsx');

const checks = [
  [cities, '"@type": "City"', 'City directory must declare City entities'],
  [cities, 'numberOfItems: TEXAS_CITIES.length', 'City directory must expose its complete item count'],
  [cities, 'cityAnchor(city.slug)', 'City schema must use stable page anchors'],
  [cities, 'CITY_AUTHORITY_SLUGS.has(city.slug)', 'City schema must gate canonical detail URLs on verified authority readiness'],
  [cities, 'absoluteUrl(texasDefinedBrand, cityAuthorityPath(city.slug))', 'Verified city schema entries must use canonical city URLs'],
  [cities, ': `${pageUrl}#${cityAnchor(city.slug)}`', 'Unverified city schema must stay anchored to the directory surface'],
  [counties, 'const verifiedPropertyCounties = COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady)', 'County directory must compute verified property-tax children'],
  [counties, 'numberOfItems: verifiedPropertyCounties.length', 'County property ItemList must count only verified child guides'],
  [counties, 'verifiedPropertyCounties.map((county, index)', 'County property schema must publish only verified child guides'],
  [counties, 'absoluteUrl(texasDefinedBrand, `/property-tax/county/${county.slug}`)', 'Verified county property children must use canonical URLs'],
  [counties, 'sameAs: county.officialDirectoryUrl', 'Verified county guide schema must retain official county references'],
  [counties, 'TEXAS_COUNTIES.length.toLocaleString("en-US")', 'Visible county directory must still describe all Texas counties'],
  [countyDirectory, 'id={countyPropertyAnchor(county.slug)}', 'County guide anchors must exist in the DOM'],
  [countyDirectory, 'const hasVerifiedPropertyGuide = verified.has(county.slug)', 'County directory links must branch on verification readiness'],
  [countyDirectory, 'Open verified property guide', 'Verified county property links must remain available'],
  [countyDirectory, 'Open county reference', 'Unverified counties must retain a substantive county path'],
  [cityDirectory, 'id={cityAnchor(city.slug)}', 'City schema anchors must exist in the DOM'],
  [cityDirectory, 'CITY_AUTHORITY_SLUGS.has(city.slug)', 'Visible city links must branch on verified city authority readiness'],
  [cityDirectory, 'params={{ kind: "city", slug: city.slug }}', 'Verified city authority links must use canonical entity routing'],
  [cityDirectory, 'from "@/data/city-authority-index"', 'City directory must reuse the shared verified-city authority index'],
  [cityAuthorityIndex, 'export const CITY_AUTHORITY_INDEX', 'Shared city authority index must remain explicit and reviewable'],
  [cityAuthorityIndex, 'export const CITY_AUTHORITY_SLUGS', 'Shared city authority slug set must derive from the authority index'],
  [cities, '"@type": "BreadcrumbList"', 'City directory must declare breadcrumbs'],
  [counties, '"@type": "BreadcrumbList"', 'County directory must declare breadcrumbs'],
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
if (counties.includes('numberOfItems: TEXAS_COUNTIES.length')) {
  failures.push('County property ItemList must not advertise all 254 property-tax child pages.');
}

if (failures.length) {
  console.error('Place directory SEO validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Place directory SEO validation passed: all cities/counties remain discoverable on directory surfaces while verified city authority and county property child URLs are promoted only through shared publication-readiness gates.');
