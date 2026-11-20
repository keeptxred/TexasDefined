import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/texas-stargazing-guide.tsx'), 'utf8');
const lazyRoute = fs.readFileSync(path.join(root, 'src/routes/texas-stargazing-guide.lazy.tsx'), 'utf8');
const topicPaths = fs.readFileSync(path.join(root, 'src/components/editorial/ExploreTopicPaths.tsx'), 'utf8');
const publicRoutes = fs.readFileSync(path.join(root, 'src/lib/public-routes.ts'), 'utf8');
const errors = [];
// Keep horizontally scrolling comparison tables keyboard-operable and named for screen readers.
if (!lazyRoute.includes('role="region" tabIndex={0} aria-label="Five certified Texas dark sky state parks comparison table"')) {
  errors.push('Comparison table must remain a keyboard-focusable, explicitly labelled scroll region.');
}

// Guard additional place-specific access, source and visitor-planning improvements.
for (const marker of [
  "afterDarkDesk",
  "afterDarkDesk[index].site",
  "aa.usno.navy.mil/data/RS_OneYear",
  "science.nasa.gov/moon/moon-phases",
  "night-planning"
]) {
  if (!lazyRoute.includes(marker)) errors.push('Missing verified 2026 authority detail: ' + marker);
}


for (const marker of [
  'const canonicalPath = "/texas-stargazing-guide";',
  'Texas Stargazing: 5 Certified Dark Sky State Parks',
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
  'current astronomy event calendar',
  'Bortle Class 1',
  'Five certified state parks, not every Texas dark-sky destination',
  'Big Bend National Park',
  'https://www.nps.gov/bibe/planyourvisit/stargazing.htm',
  'https://darksky.org/places/big-bend-national-park-dark-sky-park/',
  'Big Bend Ranch State Park',
  'Caprock Canyons State Park & Trailway',
  'Copper Breaks State Park',
  'Enchanted Rock State Natural Area',
  'South Llano River State Park',
  'TPWD park ratings, designations and stargazing guidance cross-checked November 18, 2026.',
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

for (const marker of ['skyComparison.map((item)', 'skyComparison[index].official']) {
  if (!lazyRoute.includes(marker)) errors.push('Missing 2026 visitor-planning upgrade: ' + marker);
}

// The licensed real-place photograph must be a visible, correctly attributed
// visitor asset as well as an image-rights assertion in the JSON-LD head.
for (const marker of [
  'const editorialHeroImage =',
  'Copper_Breaks_State_Park_with_the_Milky_Way_Galaxy.jpg',
  'creator: "Matthew T Rader"',
  'license: "https://creativecommons.org/licenses/by-sa/4.0/"',
  'acquireLicensePage: editorialHeroImage.source',
  'const deliveredEditorialHeroUrl = absoluteUrl(texasDefinedBrand, editorialImageSrc(editorialHeroImage.url));',
  'contentUrl: deliveredEditorialHeroUrl',
  'image: deliveredEditorialHeroUrl',
  'copyrightNotice:',
  'imageAlt: editorialHeroImage.alt',
]) if (!route.includes(marker)) errors.push('Missing stargazing photo provenance in head: ' + marker);
for (const marker of [
  'Copper_Breaks_State_Park_with_the_Milky_Way_Galaxy.jpg',
  'Matthew T Rader',
  'CC BY-SA 4.0',
  'https://creativecommons.org/licenses/by-sa/4.0/',
  'editorialImageSrc(',
  'import { editorialImageSrc } from "@/lib/editorial-image-delivery";',
  'MatthewTRader.com',
  'Display crop only',
  'fetchPriority="high"',
]) if (!lazyRoute.includes(marker)) errors.push('Missing stargazing photo rights or visible media: ' + marker);

if (errors.length) {
  console.error('Texas stargazing authority validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Texas stargazing guide retains five International Dark Sky Parks, six first-party TPWD sources, Bortle/moon/weather stewardship safeguards, structured collection metadata, indexable route ownership and Outdoors discovery.');
