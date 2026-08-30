import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/texas-ohv-guide.tsx'), 'utf8');
const lazyRoute = fs.readFileSync(path.join(root, 'src/routes/texas-ohv-guide.lazy.tsx'), 'utf8');
const topicPaths = fs.readFileSync(path.join(root, 'src/components/editorial/ExploreTopicPaths.tsx'), 'utf8');
const publicRoutes = fs.readFileSync(path.join(root, 'src/lib/public-routes.ts'), 'utf8');
const errors = [];

for (const marker of [
  'const canonicalPath = "/texas-ohv-guide";',
  'Texas OHV Guide: 5 Legal Riding Areas & Decal Rules',
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "Place"',
  '"@type": "BreadcrumbList"',
  'numberOfItems: itemListElement.length',
  'Eisenhower State Park OHV Trails',
  'Barnwell Mountain Recreation Area',
  'Sam Houston National Forest Motorized Trails',
  'Lake Meredith National Recreation Area OHV Areas',
  'Escondido Draw Recreation Area',
  'Outdoors & Wildlife',
]) {
  if (!route.includes(marker)) errors.push(`Texas OHV structured authority missing marker: ${marker}.`);
}

for (const marker of [
  'Texas OHV Guide',
  'Legal OHV riding starts with the venue, not the vehicle',
  'Do not assume Texas state parks allow OHVs',
  'This is access planning, not off-road driving instruction',
  'OHV recreation can result in serious injury or death.',
  'Texas law also requires a current OHV decal',
  'Eisenhower State Park OHV Trails',
  'Barnwell Mountain Recreation Area',
  'Sam Houston National Forest Motorized Trails',
  'Lake Meredith National Recreation Area OHV Areas',
  'Escondido Draw Recreation Area',
  'Source review: August 30, 2026.',
  'https://tpwd.texas.gov/state-parks/texas-off-highway-program',
  'https://tpwd.texas.gov/state-parks/texas-off-highway-program/where-to-ride-ohvs-in-texas',
  'https://tpwd.texas.gov/state-parks/texas-off-highway-program/where-to-buy-a-texas-ohv-decal',
  'https://tpwd.texas.gov/state-parks/texas-off-highway-program/responsible-use-of-ohvs',
  'https://tpwd.texas.gov/state-parks/park-information/specialty-vehicles',
  'https://tpwd.texas.gov/state-parks/eisenhower/ohvs',
  'to: "/explore/outdoors"',
  'to: "/explore/state-parks"',
  'to: "/texas-mountain-biking-guide"',
  'to: "/texas-horseback-riding-guide"',
  'to: "/explore/road-trips"',
  'to: "/explore/trip-planner"',
]) {
  if (!lazyRoute.includes(marker)) errors.push(`Texas OHV visible authority missing marker: ${marker}.`);
}

const officialSourceCount = (lazyRoute.match(/href: "https:\/\//g) ?? []).length;
if (officialSourceCount < 6) errors.push(`Texas OHV guide needs at least 6 first-party source links; found ${officialSourceCount}.`);
const areaCount = (route.match(/name: "(?:Eisenhower State Park OHV Trails|Barnwell Mountain Recreation Area|Sam Houston National Forest Motorized Trails|Lake Meredith National Recreation Area OHV Areas|Escondido Draw Recreation Area)"/g) ?? []).length;
if (areaCount !== 5) errors.push(`Texas OHV collection must retain exactly five protected riding areas; found ${areaCount}.`);

if (!publicRoutes.includes('"/texas-ohv-guide"')) errors.push('Texas OHV canonical must remain in INDEXABLE_STATIC_PATHS.');
const outdoorsStart = topicPaths.indexOf('outdoors: [');
const outdoorsEnd = outdoorsStart >= 0 ? topicPaths.indexOf('\n  ],', outdoorsStart) : -1;
const outdoorsSlice = outdoorsStart >= 0 ? topicPaths.slice(outdoorsStart, outdoorsEnd > outdoorsStart ? outdoorsEnd : undefined) : '';
if (!outdoorsSlice.includes('to: "/texas-ohv-guide"')) errors.push('Outdoors authority must retain direct discovery to the Texas OHV guide.');

if (errors.length) {
  console.error('Texas OHV authority validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Texas OHV guide retains five legal riding destinations, six first-party TPWD sources, decal/state-park safeguards, structured collection metadata, indexable route ownership and Outdoors discovery.');
