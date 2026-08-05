import fs from 'node:fs';

const cities = fs.readFileSync('src/routes/browse.cities.tsx', 'utf8');
const counties = fs.readFileSync('src/routes/browse.counties.tsx', 'utf8');
const directory = fs.readFileSync('src/components/directories/TexasPlaceDirectory.tsx', 'utf8');

const checks = [
  [cities, '"@type": "City"', 'City directory must declare City entities'],
  [cities, 'numberOfItems: TEXAS_CITIES.length', 'City directory must expose its complete item count'],
  [cities, 'cityAnchor(city.slug)', 'City schema must use stable page anchors'],
  [counties, '"@type": "AdministrativeArea"', 'County directory must declare administrative areas'],
  [counties, 'numberOfItems: TEXAS_COUNTIES.length', 'County directory must expose all 254 counties'],
  [counties, 'countyAnchor(county.slug)', 'County schema must use stable page anchors'],
  [directory, 'id={countyAnchor(county.slug)}', 'County schema anchors must exist in the DOM'],
  [directory, 'id={cityAnchor(city.slug)}', 'City schema anchors must exist in the DOM'],
  [cities, '"@type": "BreadcrumbList"', 'City directory must declare breadcrumbs'],
  [counties, '"@type": "BreadcrumbList"', 'County directory must declare breadcrumbs'],
];

const failures = checks
  .filter(([source, needle]) => !source.includes(needle))
  .map(([, , message]) => message);

if (failures.length) {
  console.error('Place directory SEO validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Place directory SEO validation passed.');
