import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/texas-horseback-riding-guide.tsx'), 'utf8');
const lazyRoute = fs.readFileSync(path.join(root, 'src/routes/texas-horseback-riding-guide.lazy.tsx'), 'utf8');
const topicPaths = fs.readFileSync(path.join(root, 'src/components/editorial/ExploreTopicPaths.tsx'), 'utf8');
const publicRoutes = fs.readFileSync(path.join(root, 'src/lib/public-routes.ts'), 'utf8');
const errors = [];

for (const marker of [
  'const canonicalPath = "/texas-horseback-riding-guide";',
  'Texas Horseback Riding: 5 Public-Land Destinations',
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "Place"',
  '"@type": "BreadcrumbList"',
  'numberOfItems: itemListElement.length',
  'Big Bend Ranch State Park',
  'Hill Country State Natural Area',
  'Palo Duro Canyon State Park',
  'Caprock Canyons State Park & Trailway',
  'Dinosaur Valley State Park',
  'Outdoors & Wildlife',
]) {
  if (!route.includes(marker)) errors.push(`Texas horseback riding structured authority missing marker: ${marker}.`);
}

for (const marker of [
  'Texas Horseback Riding Guide',
  'Start with the paperwork, then choose the landscape',
  'This is trip planning, not horsemanship instruction',
  'Horseback riding can result in serious injury.',
  'negative Equine Infectious Anemia test within the previous 12 months',
  'Many Texas horse trails are also hiking and biking trails',
  'Big Bend Ranch State Park',
  'Hill Country State Natural Area',
  'Palo Duro Canyon State Park',
  'Caprock Canyons State Park & Trailway',
  'Dinosaur Valley State Park',
  'Source review: August 30, 2026.',
  'https://tpwd.texas.gov/state-parks/parks/things-to-do/equestrian',
  'https://tpwd.texas.gov/state-parks/big-bend-ranch/horseback-riding',
  'https://tpwd.texas.gov/state-parks/hill-country',
  'https://tpwd.texas.gov/state-parks/palo-duro-canyon',
  'https://tpwd.texas.gov/state-parks/caprock-canyons',
  'https://tpwd.texas.gov/state-parks/dinosaur-valley',
  'to: "/explore/outdoors"',
  'to: "/explore/state-parks"',
  'to: "/texas-mountain-biking-guide"',
  'to: "/texas-natural-wonders-bucket-list"',
  'to: "/best-places-to-go-camping-in-texas"',
  'to: "/explore/trip-planner"',
]) {
  if (!lazyRoute.includes(marker)) errors.push(`Texas horseback riding visible authority missing marker: ${marker}.`);
}

const officialSourceCount = (lazyRoute.match(/href: "https:\/\//g) ?? []).length;
if (officialSourceCount < 6) errors.push(`Texas horseback riding guide needs at least 6 first-party source links; found ${officialSourceCount}.`);
const ridingAreaCount = (route.match(/name: "(?:Big Bend Ranch State Park|Hill Country State Natural Area|Palo Duro Canyon State Park|Caprock Canyons State Park & Trailway|Dinosaur Valley State Park)"/g) ?? []).length;
if (ridingAreaCount !== 5) errors.push(`Texas horseback riding collection must retain exactly five protected riding areas; found ${ridingAreaCount}.`);

if (!publicRoutes.includes('"/texas-horseback-riding-guide"')) errors.push('Texas horseback riding canonical must remain in INDEXABLE_STATIC_PATHS.');
const outdoorsStart = topicPaths.indexOf('outdoors: [');
const outdoorsEnd = outdoorsStart >= 0 ? topicPaths.indexOf('\n  ],', outdoorsStart) : -1;
const outdoorsSlice = outdoorsStart >= 0 ? topicPaths.slice(outdoorsStart, outdoorsEnd > outdoorsStart ? outdoorsEnd : undefined) : '';
if (!outdoorsSlice.includes('to: "/texas-horseback-riding-guide"')) errors.push('Outdoors authority must retain direct discovery to the Texas horseback riding guide.');

if (errors.length) {
  console.error('Texas horseback riding authority validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Texas horseback riding guide retains five public riding destinations, six first-party TPWD sources, Coggins/access safeguards, structured collection metadata, indexable route ownership and Outdoors discovery.');
