import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/texas-stargazing-guide.tsx'), 'utf8');
const lazyRoute = fs.readFileSync(path.join(root, 'src/routes/texas-stargazing-guide.lazy.tsx'), 'utf8');
const topicPaths = fs.readFileSync(path.join(root, 'src/components/editorial/ExploreTopicPaths.tsx'), 'utf8');
const publicRoutes = fs.readFileSync(path.join(root, 'src/lib/public-routes.ts'), 'utf8');
const errors = [];

for (const marker of [
  'const canonicalPath = "/texas-stargazing-guide";',
  'Texas Stargazing: 5 International Dark Sky Parks',
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "Place"',
  '"@type": "BreadcrumbList"',
  'numberOfItems: itemListElement.length',
  'Big Bend Ranch State Park',
  'Caprock Canyons State Park & Trailway',
  'Copper Breaks State Park',
  'Enchanted Rock State Natural Area',
  'South Llano River State Park',
  'Outdoors & Wildlife',
]) {
  if (!route.includes(marker)) errors.push(`Texas stargazing structured authority missing marker: ${marker}.`);
}

for (const marker of [
  'Texas Stargazing Guide',
  'A Dark Sky designation is the starting point, not the forecast',
  'Protect the darkness you came to see',
  'This guide is trip planning, not astronomy or astrophotography instruction.',
  'Never look directly at the sun',
  'Bortle Class 1',
  'Big Bend Ranch State Park',
  'Caprock Canyons State Park & Trailway',
  'Copper Breaks State Park',
  'Enchanted Rock State Natural Area',
  'South Llano River State Park',
  'Source review: August 30, 2026.',
  'https://tpwd.texas.gov/state-parks/parks/things-to-do/stargazing-in-state-parks',
  'https://tpwd.texas.gov/state-parks/big-bend-ranch/dark-skies',
  'https://tpwd.texas.gov/state-parks/copper-breaks/stargazing',
  'https://tpwd.texas.gov/state-parks/enchanted-rock/more-info/dark-skies/',
  'https://tpwd.texas.gov/state-parks/south-llano-river/dark-skies',
  'https://tpwd.texas.gov/newsmedia/releases/?req=20260107a',
  'to: "/explore/outdoors"',
  'to: "/explore/state-parks"',
  'to: "/texas-natural-wonders-bucket-list"',
  'to: "/best-places-to-go-camping-in-texas"',
  'to: "/explore/road-trips"',
  'to: "/explore/trip-planner"',
]) {
  if (!lazyRoute.includes(marker)) errors.push(`Texas stargazing visible authority missing marker: ${marker}.`);
}

const sourceCount = (lazyRoute.match(/href: "https:\/\//g) ?? []).length;
if (sourceCount < 6) errors.push(`Texas stargazing guide needs at least 6 first-party source links; found ${sourceCount}.`);
const parkCount = (route.match(/name: "(?:Big Bend Ranch State Park|Caprock Canyons State Park & Trailway|Copper Breaks State Park|Enchanted Rock State Natural Area|South Llano River State Park)"/g) ?? []).length;
if (parkCount !== 5) errors.push(`Texas stargazing collection must retain exactly five protected dark-sky parks; found ${parkCount}.`);
if (!publicRoutes.includes('"/texas-stargazing-guide"')) errors.push('Texas stargazing canonical must remain in INDEXABLE_STATIC_PATHS.');
const outdoorsStart = topicPaths.indexOf('outdoors: [');
const outdoorsEnd = outdoorsStart >= 0 ? topicPaths.indexOf('\n  ],', outdoorsStart) : -1;
const outdoorsSlice = outdoorsStart >= 0 ? topicPaths.slice(outdoorsStart, outdoorsEnd > outdoorsStart ? outdoorsEnd : undefined) : '';
if (!outdoorsSlice.includes('to: "/texas-stargazing-guide"')) errors.push('Outdoors authority must retain direct discovery to the Texas stargazing guide.');

if (errors.length) {
  console.error('Texas stargazing authority validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Texas stargazing guide retains five International Dark Sky Parks, six first-party TPWD sources, Bortle/moon/weather stewardship safeguards, structured collection metadata, indexable route ownership and Outdoors discovery.');
