import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/texas-wildlife-watching-guide.tsx'), 'utf8');
const lazyRoute = fs.readFileSync(path.join(root, 'src/routes/texas-wildlife-watching-guide.lazy.tsx'), 'utf8');
const topicPaths = fs.readFileSync(path.join(root, 'src/components/editorial/ExploreTopicPaths.tsx'), 'utf8');
const publicRoutes = fs.readFileSync(path.join(root, 'src/lib/public-routes.ts'), 'utf8');
const errors = [];

for (const marker of [
  'const canonicalPath = "/texas-wildlife-watching-guide";',
  'Texas Wildlife Watching: 5 Regions to Explore',
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "Place"',
  '"@type": "BreadcrumbList"',
  'numberOfItems: itemListElement.length',
  'Far West Texas Wildlife Trail',
  'Upper Texas Coast Wildlife Trail',
  'Heart of Texas West Wildlife Trail',
  'Panhandle Plains Wildlife Trail',
  'Prairies and Pineywoods East Wildlife Trail',
  'Outdoors & Wildlife',
]) {
  if (!route.includes(marker)) errors.push(`Texas wildlife watching structured authority missing marker: ${marker}.`);
}

for (const marker of [
  'Texas Wildlife Watching Guide',
  'Use the habitat to choose the trip, then let wildlife keep its distance',
  'Watch wildlife without making yourself part of the encounter',
  'maintain a safe distance from wildlife',
  'Do not feed, touch, bait, call, lure, chase, corner or crowd wildlife.',
  'This guide does not teach wildlife handling, capture, trapping, relocation, rehabilitation, deterrence or dangerous-animal response.',
  'Far West Texas Wildlife Trail',
  'Upper Texas Coast Wildlife Trail',
  'Heart of Texas West Wildlife Trail',
  'Panhandle Plains Wildlife Trail',
  'Prairies and Pineywoods East Wildlife Trail',
  'Source review: August 30, 2026.',
  'https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/',
  'https://tpwd.texas.gov/state-parks/parks/things-to-do/wildlife-watching/',
  'https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/fwtx',
  'https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/utc',
  'https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/hotw',
  'https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/php/',
  'https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/ppwe',
  'to: "/explore/outdoors"',
  'to: "/texas-birds-guide"',
  'to: "/explore/state-parks"',
  'to: "/texas-natural-wonders-bucket-list"',
  'to: "/texas-stargazing-guide"',
  'to: "/explore/trip-planner"',
]) {
  if (!lazyRoute.includes(marker)) errors.push(`Texas wildlife watching visible authority missing marker: ${marker}.`);
}

const sourceCount = (lazyRoute.match(/href: "https:\/\//g) ?? []).length;
if (sourceCount < 7) errors.push(`Texas wildlife watching guide needs at least 7 first-party source links; found ${sourceCount}.`);
const regionCount = (route.match(/name: "(?:Far West Texas Wildlife Trail|Upper Texas Coast Wildlife Trail|Heart of Texas West Wildlife Trail|Panhandle Plains Wildlife Trail|Prairies and Pineywoods East Wildlife Trail)"/g) ?? []).length;
if (regionCount !== 5) errors.push(`Texas wildlife watching collection must retain exactly five protected regions; found ${regionCount}.`);
if (!publicRoutes.includes('"/texas-wildlife-watching-guide"')) errors.push('Texas wildlife watching canonical must remain in INDEXABLE_STATIC_PATHS.');
const outdoorsStart = topicPaths.indexOf('outdoors: [');
const outdoorsEnd = outdoorsStart >= 0 ? topicPaths.indexOf('\n  ],', outdoorsStart) : -1;
const outdoorsSlice = outdoorsStart >= 0 ? topicPaths.slice(outdoorsStart, outdoorsEnd > outdoorsStart ? outdoorsEnd : undefined) : '';
if (!outdoorsSlice.includes('to: "/texas-wildlife-watching-guide"')) errors.push('Outdoors authority must retain direct discovery to the Texas wildlife watching guide.');
if (!outdoorsSlice.includes('to: "/texas-birds-guide"')) errors.push('Outdoors authority must retain the distinct bird-specific guide beside broader wildlife watching.');

if (errors.length) {
  console.error('Texas wildlife watching authority validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Texas wildlife watching guide retains five regional wildlife systems, seven first-party TPWD sources, safe-observation boundaries, bird-guide distinction, structured collection metadata, indexable route ownership and Outdoors discovery.');
