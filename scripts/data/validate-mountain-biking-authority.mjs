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
  'Texas Mountain Biking: 5 Public Trail Systems',
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
];
for (const marker of routeMarkers) {
  if (!route.includes(marker)) errors.push(`Texas mountain biking structured authority missing marker: ${marker}.`);
}

const visibleMarkers = [
  'Texas Mountain Biking Guide',
  'Five public systems show how different Texas riding can be',
  'This is trip planning, not riding instruction',
  'Mountain biking can result in serious injury.',
  'A bike trail may also be someone else\'s hiking or horse trail',
  'Electric-bike rules also deserve a current check instead of a statewide assumption.',
  'Franklin Mountains State Park',
  'Big Bend Ranch State Park',
  'Palo Duro Canyon State Park',
  'Hill Country State Natural Area',
  'Tyler State Park',
  'Source review: August 30, 2026.',
  'https://tpwd.texas.gov/state-parks/parks/things-to-do/biking-in-state-parks',
  'https://tpwd.texas.gov/state-parks/franklin-mountains',
  'https://tpwd.texas.gov/state-parks/big-bend-ranch',
  'https://tpwd.texas.gov/state-parks/palo-duro-canyon/trails-info',
  'https://tpwd.texas.gov/state-parks/hill-country',
  'https://tpwd.texas.gov/state-parks/tyler',
  'to: "/explore/outdoors"',
  'to: "/explore/state-parks"',
  'to: "/texas-natural-wonders-bucket-list"',
  'to: "/texas-rock-climbing-bouldering-guide"',
  'to: "/best-places-to-go-camping-in-texas"',
  'to: "/explore/trip-planner"',
];
for (const marker of visibleMarkers) {
  if (!lazyRoute.includes(marker)) errors.push(`Texas mountain biking visible authority missing marker: ${marker}.`);
}

const officialSourceCount = (lazyRoute.match(/href: "https:\/\//g) ?? []).length;
if (officialSourceCount < 6) errors.push(`Texas mountain biking guide needs at least 6 first-party source links; found ${officialSourceCount}.`);
const trailSystemCount = (route.match(/name: "(?:Franklin Mountains State Park|Big Bend Ranch State Park|Palo Duro Canyon State Park|Hill Country State Natural Area|Tyler State Park)"/g) ?? []).length;
if (trailSystemCount !== 5) errors.push(`Texas mountain biking collection must retain exactly five protected trail systems; found ${trailSystemCount}.`);

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

console.log('Texas mountain biking guide retains five public trail systems, six first-party TPWD sources, safe visitor-planning boundaries, structured collection metadata, indexable route ownership and Outdoors discovery.');
