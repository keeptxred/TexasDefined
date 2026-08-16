import fs from 'node:fs';

const cities = fs.readFileSync('src/routes/browse.cities.tsx', 'utf8');
const counties = fs.readFileSync('src/routes/browse.counties.tsx', 'utf8');
const cityDirectory = fs.readFileSync('src/components/directories/TexasPlaceDirectory.tsx', 'utf8');
const countyDirectory = fs.readFileSync('src/components/directories/TexasCountyPropertyDirectory.tsx', 'utf8');

const checks = [
  [cities, '"@type": "City"', 'City directory must declare City entities'],
  [cities, 'numberOfItems: TEXAS_CITIES.length', 'City directory must expose its complete item count'],
  [cities, 'cityAnchor(city.slug)', 'City schema must use stable page anchors'],
  [cities, 'url: `${pageUrl}#${cityAnchor(city.slug)}`', 'Unverified city schema must stay anchored to the directory surface'],
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
  [cities, '"@type": "BreadcrumbList"', 'City directory must declare breadcrumbs'],
  [counties, '"@type": "BreadcrumbList"', 'County directory must declare breadcrumbs'],
];

const failures = checks
  .filter(([source, needle]) => !source.includes(needle))
  .map(([, , message]) => message);

if (cityDirectory.includes('params={{ kind: "city", slug: city.slug }}')) {
  failures.push('Pending city directory entries must not advertise unverified /city detail pages.');
}
if (counties.includes('numberOfItems: TEXAS_COUNTIES.length')) {
  failures.push('County property ItemList must not advertise all 254 property-tax child pages.');
}

if (failures.length) {
  console.error('Place directory SEO validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Place directory SEO validation passed: all cities/counties remain discoverable on directory surfaces while city detail and county property child URLs are promoted only when publication-ready.');
