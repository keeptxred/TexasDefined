import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/texas-paddling-guide.tsx'), 'utf8');
const lazyRoute = fs.readFileSync(path.join(root, 'src/routes/texas-paddling-guide.lazy.tsx'), 'utf8');
const topicPaths = fs.readFileSync(path.join(root, 'src/components/editorial/ExploreTopicPaths.tsx'), 'utf8');
const errors = [];

for (const marker of [
  'const canonicalPath = "/texas-paddling-guide";',
  'Texas Paddling Guide: 5 Official Trails to Plan',
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "Place"',
  '"@type": "BreadcrumbList"',
  'numberOfItems: itemListElement.length',
  'Lady Bird Lake Paddling Trail',
  'Buffalo Bayou Paddling Trail',
  'Bosque Bluffs & Brazos Bridges Paddling Trails',
  "Hell's Half Acre Paddling Trail",
  'Lighthouse Lakes Paddling Trail',
  'Lakes & Rivers',
]) {
  if (!route.includes(marker)) errors.push(`Texas paddling structured authority missing marker: ${marker}.`);
}

for (const marker of [
  'Texas Paddling Guide',
  "Choose the waterbody first, then verify today's conditions",
  'This is trip planning, not paddling instruction',
  'Paddling can result in drowning',
  'more than 100 certified paddling trails',
  'Lady Bird Lake Paddling Trail',
  'Buffalo Bayou Paddling Trail',
  'Bosque Bluffs & Brazos Bridges Paddling Trails',
  "Hell's Half Acre Paddling Trail",
  'Lighthouse Lakes Paddling Trail',
  'Source review: August 30, 2026.',
  'https://tpwd.texas.gov/boating/paddling-trails/',
  'https://tpwd.texas.gov/boating/paddling-trails/hill-country/lady-bird-lake/',
  'https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/',
  'https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/bosque-bluffs-and-brazos-bridges/',
  'https://tpwd.texas.gov/boating/paddling-trails/pineywoods/hells-half-acre/',
  'https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/lighthouse-lakes/',
  'to: "/explore/lakes-rivers"',
  'to: "/explore/outdoors"',
  'to: "/explore/state-parks"',
  'to: "/fishing"',
  'to: "/explore/beaches-coast"',
  'to: "/explore/trip-planner"',
]) {
  if (!lazyRoute.includes(marker)) errors.push(`Texas paddling visible authority missing marker: ${marker}.`);
}

const sourceCount = (lazyRoute.match(/href: "https:\/\//g) ?? []).length;
if (sourceCount < 6) errors.push(`Texas paddling guide needs at least 6 first-party source links; found ${sourceCount}.`);
const trailCount = (route.match(/name: "(?:Lady Bird Lake Paddling Trail|Buffalo Bayou Paddling Trail|Bosque Bluffs & Brazos Bridges Paddling Trails|Lighthouse Lakes Paddling Trail)"|name: "Hell's Half Acre Paddling Trail"/g) ?? []).length;
if (trailCount !== 5) errors.push(`Texas paddling collection must retain exactly five protected trails; found ${trailCount}.`);

const lakesStart = topicPaths.indexOf('"lakes-rivers": [');
const lakesEnd = lakesStart >= 0 ? topicPaths.indexOf('\n  ],', lakesStart) : -1;
const lakesSlice = lakesStart >= 0 ? topicPaths.slice(lakesStart, lakesEnd > lakesStart ? lakesEnd : undefined) : '';
if (!lakesSlice.includes('to: "/texas-paddling-guide"')) errors.push('Lakes & Rivers authority must retain direct discovery to the Texas paddling guide.');
const outdoorsStart = topicPaths.indexOf('outdoors: [');
const outdoorsEnd = outdoorsStart >= 0 ? topicPaths.indexOf('\n  ],', outdoorsStart) : -1;
const outdoorsSlice = outdoorsStart >= 0 ? topicPaths.slice(outdoorsStart, outdoorsEnd > outdoorsStart ? outdoorsEnd : undefined) : '';
if (!outdoorsSlice.includes('to: "/texas-paddling-guide"')) errors.push('Outdoors authority must retain direct discovery to the Texas paddling guide.');

if (errors.length) {
  console.error('Texas paddling authority validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Texas paddling guide retains five official trails, six first-party TPWD sources, current-condition safeguards, structured collection metadata, Lakes & Rivers discovery and Outdoors discovery.');
