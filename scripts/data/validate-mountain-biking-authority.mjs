import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/texas-mountain-biking-guide.tsx'), 'utf8');
const lazyRoute = fs.readFileSync(path.join(root, 'src/routes/texas-mountain-biking-guide.lazy.tsx'), 'utf8');
const topicPaths = fs.readFileSync(path.join(root, 'src/components/editorial/ExploreTopicPaths.tsx'), 'utf8');
const publicRoutes = fs.readFileSync(path.join(root, 'src/lib/public-routes.ts'), 'utf8');
const errors = [];

const routeMarkers = [
  'const canonicalPath = "/texas-mountain-biking-guide";',
  'Texas Mountain Biking: 5 Trail Systems, Maps & Rides',
  'Mountain Biking in Texas: 5 Public Trail Systems & Where to Ride',
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "Place"',
  '"@type": "BreadcrumbList"',
  'numberOfItems: itemListElement.length',
  'Franklin Mountains State Park',
  'Big Bend Ranch State Park',
  'Palo Duro Canyon State Park',
  'Hill Country State Natural Area',
  'Tyler State Park',
  'Outdoors & Wildlife',
  'stateParkHeroMap["franklin-mountains-state-park"]',
];
for (const marker of routeMarkers) {
  if (!route.includes(marker)) errors.push(`Texas mountain biking structured authority missing marker: ${marker}.`);
}

const visibleMarkers = [
  'Mountain Biking in Texas: 5 Public Trail Systems &amp; Where to Ride',
  'Five Texas trail systems at a glance',
  'Why these five?',
  'A statewide sampler, not five interchangeable parks',
  'More than 100 miles of trail',
  '238 miles of multiuse trail',
  'Capitol Peak: 3.5-mile loop',
  'Merrick Mile: 1.0 mile, easy-moderate',
  'A Loop: 2.6 miles, moderate',
  'B Loop: 3.1 miles, moderate',
  'Bikers clockwise on multiuse trails',
  'Four checks that matter more than a saved screenshot',
  'Official trail map &amp; details',
  'TexasDefined park guide',
  'Source review: September 30, 2026.',
  'https://tpwd.texas.gov/state-parks/parks/things-to-do/biking-in-state-parks',
  'https://tpwd.texas.gov/state-parks/franklin-mountains/plan-your-visit',
  'https://tpwd.texas.gov/state-parks/big-bend-ranch/activities/',
  'https://tpwd.texas.gov/state-parks/palo-duro-canyon/trails-info/',
  'https://tpwd.texas.gov/state-parks/hill-country/trails-map',
  'https://tpwd.texas.gov/state-parks/tyler/trails-info/',
  'to: "/explore/state-parks"',
  'to: "/best-places-to-go-camping-in-texas"',
  'to: "/explore/road-trips"',
  'to: "/explore/trip-planner"',
];
for (const marker of visibleMarkers) {
  if (!lazyRoute.includes(marker)) errors.push(`Texas mountain biking visible authority missing marker: ${marker}.`);
}

for (const destinationPath of [
  '/destination/franklin-mountains-state-park',
  '/destination/big-bend-ranch-state-park',
  '/destination/palo-duro-canyon-state-park',
  '/destination/hill-country-state-natural-area',
  '/destination/tyler-state-park',
]) {
  if (!lazyRoute.includes(`destinationPath: "${destinationPath}"`)) {
    errors.push(`Texas mountain biking guide must link directly to ${destinationPath}.`);
  }
}

for (const imageMarker of [
  'stateParkHeroMap["franklin-mountains-state-park"]',
  'stateParkHeroMap["big-bend-ranch-state-park"]',
  'stateParkHeroMap["palo-duro-canyon-state-park"]',
  'stateParkHeroMap["tyler-state-park"]',
  'import heroHillCountry from "@/assets/hero-hill-country.jpg";',
]) {
  if (!lazyRoute.includes(imageMarker)) errors.push(`Texas mountain biking guide missing location-relevant imagery marker: ${imageMarker}.`);
}

for (const bannedBoilerplate of [
  'This is trip planning, not riding instruction',
  'Mountain biking can result in serious injury.',
  'Safety boundary',
]) {
  if (lazyRoute.includes(bannedBoilerplate)) errors.push(`Texas mountain biking guide regressed to defensive template boilerplate: ${bannedBoilerplate}.`);
}

const officialSourceCount = (lazyRoute.match(/https:\/\/tpwd\.texas\.gov/g) ?? []).length;
if (officialSourceCount < 8) errors.push(`Texas mountain biking guide needs at least 8 first-party TPWD links; found ${officialSourceCount}.`);

const trailSystemCount = (route.match(/name: "(?:Franklin Mountains State Park|Big Bend Ranch State Park|Palo Duro Canyon State Park|Hill Country State Natural Area|Tyler State Park)"/g) ?? []).length;
if (trailSystemCount !== 5) errors.push(`Texas mountain biking collection must retain exactly five protected trail systems; found ${trailSystemCount}.`);

if (!lazyRoute.includes('<table')) errors.push('Texas mountain biking guide must retain the at-a-glance comparison table.');
if (!lazyRoute.includes('trailSystems.map((area, index)')) errors.push('Texas mountain biking guide must retain full per-system editorial sections.');
if (!publicRoutes.includes('"/texas-mountain-biking-guide"')) errors.push('Texas mountain biking canonical must remain in INDEXABLE_STATIC_PATHS.');
const outdoorsStart = topicPaths.indexOf('outdoors: [');
const outdoorsEnd = outdoorsStart >= 0 ? topicPaths.indexOf('\n  ],', outdoorsStart) : -1;
const outdoorsSlice = outdoorsStart >= 0 ? topicPaths.slice(outdoorsStart, outdoorsEnd > outdoorsStart ? outdoorsEnd : undefined) : '';
if (!outdoorsSlice.includes('to: "/texas-mountain-biking-guide"')) errors.push('Outdoors authority must retain direct discovery to the Texas mountain biking guide.');

if (errors.length) {
  console.error('Texas mountain biking authority validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Texas mountain biking guide retains five distinct public trail systems, comparison-first trip utility, specific route cues, first-party TPWD planning links, location-relevant imagery, structured collection metadata and Outdoors discovery without defensive template boilerplate.');
