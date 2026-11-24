import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/texas-paddling-guide.tsx'), 'utf8');
const lazyRoute = fs.readFileSync(path.join(root, 'src/routes/texas-paddling-guide.lazy.tsx'), 'utf8');
const topicPaths = fs.readFileSync(path.join(root, 'src/components/editorial/ExploreTopicPaths.tsx'), 'utf8');
const errors = [];
// Retain the research-backed 95+ remediation, not just prior general place names.
const additional95PlusEvidence = [
  "const paddlingAccessMap = [",
  "paddle-access-map",
  "Terry Hershy Park access",
  "USGS-08096500",
  "8775083",
  "TPWD access-point map",
  "30.2911,-97.7879",
  "29.7694,-95.6434",
  "31.5628, -97.1293",
  "32.6942,-94.1758",
  "27.8691,-97.0834",
  "about five miles"
];
for (const marker of additional95PlusEvidence) {
  if (!lazyRoute.includes(marker)) errors.push('Missing detailed trailhead, permit, launch or sky-planning evidence: ' + marker);
}

// Keep horizontally scrolling comparison tables keyboard-operable and named for screen readers.
if (!lazyRoute.includes('role="region" tabIndex={0} aria-label="Five official Texas paddling trails comparison table"')) {
  errors.push('Comparison table must remain a keyboard-focusable, explicitly labelled scroll region.');
}

// Guard additional place-specific access, source and visitor-planning improvements.
for (const marker of [
  "waterConditionDesk",
  "waterConditionDesk[index].decision",
  "waterdata.usgs.gov/state/texas",
  "www.weather.gov/crp/marine",
  "under 13"
]) {
  if (!lazyRoute.includes(marker)) errors.push('Missing verified 2026 authority detail: ' + marker);
}


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
  'Check the route, weather and exit plan before launching',
  'Confirm the legal put-in and takeout, shuttle plan',
  'thunderstorms, flood flows, strong wind, tides, water quality, heat, poor visibility or access conditions',
  '100 certified paddling trails',
  'Lady Bird Lake Paddling Trail',
  'Buffalo Bayou Paddling Trail',
  'Bosque Bluffs & Brazos Bridges Paddling Trails',
  "Hell's Half Acre Paddling Trail",
  'Lighthouse Lakes Paddling Trail',
  'Official TPWD trail pages cross-checked November 18, 2026;',
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

for (const bannedBoilerplate of [
  'This is trip planning, not paddling instruction',
  'Paddling can result in drowning',
  'Safety boundary',
  'This guide does not teach',
]) {
  if (lazyRoute.includes(bannedBoilerplate)) errors.push(`Texas paddling guide regressed to defensive template boilerplate: ${bannedBoilerplate}.`);
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

for (const marker of ['verifiedTrips.map((trip)', 'verifiedTrips[index].official']) {
  if (!lazyRoute.includes(marker)) errors.push('Missing 2026 visitor-planning upgrade: ' + marker);
}

// The licensed real-place photograph must be a visible, correctly attributed
// visitor asset as well as an image-rights assertion in the JSON-LD head.
for (const marker of [
  'const editorialHeroImage =',
  'Recreational_kayakers_paddling_on_the_surface_of_Lady_Bird_Lake.jpg',
  'creator: "Oleg Yunakov"',
  'license: "https://creativecommons.org/licenses/by-sa/4.0/"',
  'acquireLicensePage: editorialHeroImage.source',
  'const deliveredEditorialHeroUrl = absoluteUrl(texasDefinedBrand, editorialImageSrc(editorialHeroImage.url));',
  'contentUrl: deliveredEditorialHeroUrl',
  'image: deliveredEditorialHeroUrl',
  'copyrightNotice:',
  'imageAlt: editorialHeroImage.alt',
]) if (!route.includes(marker)) errors.push('Missing paddling photo provenance in head: ' + marker);
for (const marker of [
  'Recreational_kayakers_paddling_on_the_surface_of_Lady_Bird_Lake.jpg',
  'Oleg Yunakov',
  'CC BY-SA 4.0',
  'https://creativecommons.org/licenses/by-sa/4.0/',
  'editorialImageSrc(',
  'import { editorialImageSrc } from "@/lib/editorial-image-delivery";',
  'Display crop only',
  'fetchPriority="high"',
]) if (!lazyRoute.includes(marker)) errors.push('Missing paddling photo rights or visible media: ' + marker);


for (const marker of ["aria-label=\"Mobile comparison summary\"","hidden overflow-x-auto border border-border md:block","aria-labelledby=\"paddle-launch-selection\"","Buffalo Bayou (west to east)","Lady Bird Lake (west to east)","29.7647, -95.3592","30.2483, -97.7278"]) {
  if (!lazyRoute.includes(marker)) errors.push('Missing source-backed mobile comparison or access planning: ' + marker);
}

// The published coordinate index is the source of every plotted marker and map link.
const rawAccess = lazyRoute.match(/const plottedPaddlingAccess = (\[[\s\S]*?\n\]) as const;/);
try {
  if (!rawAccess) throw new Error("No access-point records");
  const groups = JSON.parse(rawAccess[1]);
  const expectedCounts = [10, 8, 3, 1, 4];
  if (groups.length !== 5 || groups.some((group, index) => group.points.length !== expectedCounts[index])) throw new Error("Missing TPWD access-point group or entries");
  const points = groups.flatMap(group => group.points);
  if (new Set(points.map(point => point.coordinate)).size !== 26 ||
      points.some(point => !/^\d{2}\.\d{4}, -\d{2}\.\d{4}$/.test(point.coordinate))) throw new Error("Missing or malformed decimal access coordinates");
  if (!lazyRoute.includes('plottedPaddlingAccess.map((group)') || !lazyRoute.includes('numbered access point locations') || !lazyRoute.includes('labelX:') || !lazyRoute.includes('labelY:')) throw new Error("The responsive map must render every group with separated marker callouts");
} catch (error) {
  errors.push('Paddling access diagram: ' + error.message);
}

if (!lazyRoute.includes('aria-labelledby="extended-trip-planning"') || !lazyRoute.includes('to="/texas-mountain-biking-guide"')) errors.push('Missing expanded visitor planning or contextual reciprocal outdoor guide link.');

if (errors.length) {
  console.error('Texas paddling authority validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Texas paddling guide retains five official trails, six first-party TPWD sources, current-condition and launch-planning safeguards, structured collection metadata, Lakes & Rivers discovery and Outdoors discovery without defensive template boilerplate.');
