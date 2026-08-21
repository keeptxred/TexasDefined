import fs from 'node:fs';

const destinationPath = 'src/data/national-cemetery-destinations.ts';
const preservedPath = 'src/data/destination-preserved-catalog.ts';
const articlePath = 'src/data/fixtures/texas-military-cemeteries-memorials-guide.ts';
const lazyPath = 'src/data/fixtures/lazy-newest-evergreen.ts';
const linksPath = 'src/data/fixtures/national-cemetery-links.ts';

const destinations = fs.readFileSync(destinationPath, 'utf8');
const preserved = fs.readFileSync(preservedPath, 'utf8');
const article = fs.readFileSync(articlePath, 'utf8');
const lazy = fs.readFileSync(lazyPath, 'utf8');
const links = fs.readFileSync(linksPath, 'utf8');
const failures = [];

const requiredDestinations = [
  {
    slug: 'fort-sam-houston-national-cemetery',
    officialUrl: 'https://www.cem.va.gov/CEM/cems/nchp/ftsamhouston.asp',
    terms: ['Fort Sam Houston National Cemetery', 'San Antonio', 'sunrise to sunset', 'county: "Bexar"', 'coordinates:', 'areaGuide:', 'sourceCheckedAt: "2026-08-21"'],
  },
  {
    slug: 'houston-national-cemetery',
    officialUrl: 'https://www.cem.va.gov/CEM/cems/nchp/houston.asp',
    terms: ['Houston National Cemetery', 'hemicycle', '6 a.m.–9 p.m.', 'county: "Harris"', 'coordinates:', 'areaGuide:', 'sourceCheckedAt: "2026-08-21"'],
  },
  {
    slug: 'dallas-fort-worth-national-cemetery',
    officialUrl: 'https://www.cem.va.gov/cems/nchp/DallasFtWorth.asp',
    terms: ['Dallas–Fort Worth National Cemetery', 'Mountain Creek', 'sunrise to sunset', 'county: "Dallas"', 'coordinates:', 'areaGuide:', 'sourceCheckedAt: "2026-08-21"'],
  },
];

for (const destination of requiredDestinations) {
  if (!destinations.includes(`slug: "${destination.slug}"`)) failures.push(`Missing national cemetery destination: ${destination.slug}`);
  if (!destinations.includes(`officialUrl: "${destination.officialUrl}"`)) failures.push(`Missing official VA URL: ${destination.slug}`);
  for (const term of destination.terms) if (!destinations.includes(term)) failures.push(`Destination ${destination.slug} missing '${term}'`);
  if (!article.includes(`"${destination.slug}"`)) failures.push(`Statewide cemetery guide does not connect destination: ${destination.slug}`);
}

for (const marker of [
  'import { nationalCemeteryDestinations } from "./national-cemetery-destinations";',
  'nationalCemeteryDestinations,',
]) if (!preserved.includes(marker)) failures.push(`Preserved destination catalog missing: ${marker}`);

for (const marker of [
  'slug: "texas-military-cemeteries-memorials-guide"',
  'sourceName: "U.S. Department of Veterans Affairs · National Cemetery Administration"',
  'https://www.cem.va.gov/find-cemetery/state.asp',
  '/destination/fort-sam-houston-national-cemetery',
  '/destination/houston-national-cemetery',
  '/destination/dallas-fort-worth-national-cemetery',
  'Veterans Legacy Memorial',
  'a national cemetery is not a park',
  'Build a remembrance visit, not a sightseeing checklist',
]) if (!article.includes(marker)) failures.push(`National cemetery guide missing: ${marker}`);

const paragraphCount = (article.match(/\bp\("/g) ?? []).length;
const headingCount = (article.match(/\bh\("/g) ?? []).length;
if (paragraphCount < 20) failures.push(`National cemetery guide too thin: ${paragraphCount} paragraphs`);
if (headingCount < 8) failures.push(`National cemetery guide lacks depth: ${headingCount} headings`);

for (const marker of [
  'texas-military-cemeteries-memorials-guide',
  'import("./texas-military-cemeteries-memorials-guide")',
  'texasMilitaryCemeteriesMemorialsGuideArticle',
  'import "./national-cemetery-links";',
]) if (!lazy.includes(marker)) failures.push(`Lazy cemetery guide registry missing: ${marker}`);

for (const marker of [
  '"texas-military-history-timeline"',
  '"texas-medal-of-honor-heroes"',
  '"texas-national-guard-history"',
  '"san-antonio-military-aviation-history"',
  '"texas-recent-wars-military-history"',
  '/destination/fort-sam-houston-national-cemetery',
  '/destination/houston-national-cemetery',
  '/destination/dallas-fort-worth-national-cemetery',
  '/article/texas-military-cemeteries-memorials-guide',
]) if (!links.includes(marker)) failures.push(`Reciprocal cemetery discovery missing: ${marker}`);

for (const marker of [
  'active national cemetery',
  'place of burial',
  'funeral',
  'grieving families',
  'not a conventional attraction',
]) if (!destinations.includes(marker)) failures.push(`Cemetery dignity/visitor safeguard missing: ${marker}`);

if (!destinations.includes('credit: "U.S. Department of Veterans Affairs · Public domain"')) failures.push('National cemetery destinations lack VA public-domain image credit');
if (destinations.includes('/article/texas-medal-of-honor-stories')) failures.push('National cemetery destinations must use the canonical /article/texas-medal-of-honor-heroes route.');
if (article.includes('/article/texas-medal-of-honor-stories')) failures.push('National cemetery guide must use the canonical /article/texas-medal-of-honor-heroes route.');

if (failures.length) {
  console.error('National cemetery visitor-layer validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`National cemetery visitor-layer validation passed: ${requiredDestinations.length} VA destinations and one statewide remembrance guide retain official sourcing, cemetery-specific visitor safeguards, reciprocal discovery and rights-aware imagery.`);
