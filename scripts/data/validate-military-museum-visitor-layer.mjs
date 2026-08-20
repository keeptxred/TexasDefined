import fs from 'node:fs';

const destinationPath = 'src/data/military-museum-destinations.ts';
const preservedPath = 'src/data/destination-preserved-catalog.ts';
const articlePath = 'src/data/fixtures/texas-military-museums-historic-sites-guide.ts';
const lazyPath = 'src/data/fixtures/lazy-newest-evergreen.ts';
const linksPath = 'src/data/fixtures/military-museum-links.ts';

const destinations = fs.readFileSync(destinationPath, 'utf8');
const preserved = fs.readFileSync(preservedPath, 'utf8');
const article = fs.readFileSync(articlePath, 'utf8');
const lazy = fs.readFileSync(lazyPath, 'utf8');
const links = fs.readFileSync(linksPath, 'utf8');
const failures = [];

const requiredDestinations = [
  {
    slug: 'uss-lexington-museum-corpus-christi',
    officialUrl: 'https://usslexington.com/',
    terms: ['USS Lexington Museum', 'Corpus Christi', 'World War II aircraft carrier', 'coordinates:', 'county: "Nueces"', 'areaGuide:', 'sourceCheckedAt: "2026-08-20"'],
  },
  {
    slug: 'national-wasp-wwii-museum-sweetwater',
    officialUrl: 'https://waspmuseum.org/',
    terms: ['National WASP WWII Museum', 'Avenger Field', 'Sweetwater', 'Women Airforce Service Pilots', 'county: "Nolan"', 'areaGuide:', 'sourceCheckedAt: "2026-08-20"'],
  },
  {
    slug: 'silent-wings-museum-lubbock',
    officialUrl: 'https://www.mylubbock.us/400/Silent-Wings-Museum',
    terms: ['Silent Wings Museum', 'South Plains Army Air Field', 'CG-4A', 'Lubbock', 'county: "Lubbock"', 'areaGuide:', 'sourceCheckedAt: "2026-08-20"'],
  },
];

for (const destination of requiredDestinations) {
  if (!destinations.includes(`slug: "${destination.slug}"`)) failures.push(`Missing destination: ${destination.slug}`);
  if (!destinations.includes(`officialUrl: "${destination.officialUrl}"`)) failures.push(`Missing official URL: ${destination.slug}`);
  for (const term of destination.terms) if (!destinations.includes(term)) failures.push(`Destination ${destination.slug} missing '${term}'`);
  if (!article.includes(`"${destination.slug}"`)) failures.push(`Guide does not connect destination: ${destination.slug}`);
}

for (const marker of [
  'import { militaryMuseumDestinations } from "./military-museum-destinations";',
  'militaryMuseumDestinations,',
]) if (!preserved.includes(marker)) failures.push(`Preserved destination catalog missing: ${marker}`);

for (const marker of [
  'slug: "texas-military-museums-historic-sites-guide"',
  'sourceName: "Texas Historical Commission"',
  'https://thc.texas.gov/learn/military-history',
  '/destination/uss-lexington-museum-corpus-christi',
  '/destination/national-wasp-wwii-museum-sweetwater',
  '/destination/silent-wings-museum-lubbock',
  '/destination/texas-military-forces-museum',
  '/destination/palo-alto-battlefield-national-historical-park',
  'National Museum of the Pacific War',
  'Fort Davis',
]) if (!article.includes(marker)) failures.push(`Military museums guide missing: ${marker}`);

const paragraphCount = (article.match(/\bp\("/g) ?? []).length;
const headingCount = (article.match(/\bh\("/g) ?? []).length;
if (paragraphCount < 20) failures.push(`Military museums guide too thin: ${paragraphCount} paragraphs`);
if (headingCount < 9) failures.push(`Military museums guide lacks depth: ${headingCount} headings`);

for (const marker of [
  'texas-military-museums-historic-sites-guide',
  'import("./texas-military-museums-historic-sites-guide")',
  'texasMilitaryMuseumsHistoricSitesGuideArticle',
  'import "./military-museum-links";',
]) if (!lazy.includes(marker)) failures.push(`Lazy article registry missing: ${marker}`);

for (const marker of [
  '"texas-military-history-timeline"',
  '"women-in-texas-military-history"',
  '"texas-world-war-ii-bases-pow-camps"',
  '"texas-national-guard-history"',
  '/destination/uss-lexington-museum-corpus-christi',
  '/destination/national-wasp-wwii-museum-sweetwater',
  '/destination/silent-wings-museum-lubbock',
  '/article/texas-military-museums-historic-sites-guide',
]) if (!links.includes(marker)) failures.push(`Reciprocal military visitor discovery missing: ${marker}`);

if (!destinations.includes('credit:')) failures.push('Military museum destinations lack image credits');
if (!destinations.includes('Public domain')) failures.push('Military museum destinations do not retain public-domain image sourcing');

if (failures.length) {
  console.error('Military museum visitor-layer validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Military museum visitor-layer validation passed: ${requiredDestinations.length} preserved Trip Planner destinations and one statewide authority guide retain official-source metadata, visitor planning depth, reciprocal discovery and rights-aware imagery.`);
