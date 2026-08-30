import fs from 'node:fs';

const failures = [];
const read = (file) => fs.readFileSync(file, 'utf8');
const readRouteSurface = (file) => {
  const eagerSource = read(file);
  const lazyFile = file.replace(/\.tsx$/, '.lazy.tsx');
  return fs.existsSync(lazyFile) ? `${eagerSource}\n${read(lazyFile)}` : eagerSource;
};
const topicPaths = read('src/components/editorial/ExploreTopicPaths.tsx');
const intentPaths = read('src/components/editorial/ExploreIntentPaths.tsx');
const categoryPage = read('src/components/editorial/CategoryPage.tsx');
const exploreHub = readRouteSurface('src/routes/explore.index.tsx');
const regionalHub = read('src/components/editorial/RegionalHubSections.tsx');
const publicRoutes = read('src/lib/public-routes.ts');
const oldWestHub = readRouteSurface('src/routes/texas-old-west.tsx');
const sacredPlacesHub = readRouteSurface('src/routes/texas-sacred-places.tsx');
const historyHub = readRouteSurface('src/routes/texas-history.tsx');
const topAttractionsHub = readRouteSurface('src/routes/explore.top-attractions.tsx');
const musicAuthority = read('src/data/texas-music.ts');

for (const slug of ['lakes-rivers','major-springs','state-parks','national-parks','caverns','beaches-coast','historic-sites','road-trips','small-towns','food-bbq','outdoors','events']) {
  if (!topicPaths.includes(`${JSON.stringify(slug)}:`) && !topicPaths.includes(`${slug}: [`)) failures.push(`Explore topical bridge missing for ${slug}.`);
}

const requiredTopicalTargets = [
  '/explore/trip-planner',
  '/explore/state-parks',
  '/explore/road-trips',
  '/explore/small-towns',
  '/explore/food-bbq',
  '/events',
  '/texas-history',
  '/fishing',
  '/texas-birds-guide',
  '/texas-natural-wonders-bucket-list',
  '/texas-roadside-oddities',
  '/texas-food-trail',
  '/texas-food-history',
  '/texas-dance-halls-honky-tonks',
  '/things-unique-to-texas/roadside-small-towns',
  '/sports-venues',
];
for (const target of requiredTopicalTargets) {
  if (!topicPaths.includes(`to: ${JSON.stringify(target)}`)) failures.push(`Explore topical bridges must include ${target}.`);
}

for (const title of [
  'Water weekends',
  'Park weekends',
  'Wildlife & conservation',
  'History routes',
  'Sacred & spiritual heritage',
  'Old West & ranch country',
  'Music & culture',
  'Texas flavors',
  'Family attractions',
  'Small-town weekends',
  'Roadside & only-in-Texas',
  'Landscapes & scenery',
  'Below-ground Texas',
  'Sports weekends',
  'Plan the whole trip',
]) {
  if (!intentPaths.includes(`title: ${JSON.stringify(title)}`)) failures.push(`Explore hub intent group missing: ${title}.`);
}

const requiredIntentTargets = [
  '/explore/lakes-rivers',
  '/explore/major-springs',
  '/explore/beaches-coast',
  '/explore/state-parks',
  '/explore/national-parks',
  '/explore/outdoors',
  '/explore/historic-sites',
  '/explore/small-towns',
  '/explore/road-trips',
  '/explore/food-bbq',
  '/explore/caverns',
  '/explore/trip-planner',
  '/explore/top-attractions',
  '/explore/attractions-comparison',
  '/browse/cities',
  '/browse/counties',
  '/events',
  '/fishing',
  '/texas-history',
  '/texas-old-west',
  '/texas-sacred-places',
  '/texas-music',
  '/texas-music-venues',
  '/texas-birds-guide',
  '/texas-natural-wonders-bucket-list',
  '/texas-food-trail',
  '/texas-food-history',
  '/texas-roadside-oddities',
  '/texas-dance-halls-honky-tonks',
  '/things-unique-to-texas',
  '/things-unique-to-texas/roadside-small-towns',
  '/things-unique-to-texas/culture-music',
  '/sports',
  '/sports-venues',
  '/sports-venues/college-sports',
  '/sports-venues/rodeo-western',
];
for (const target of requiredIntentTargets) {
  if (!intentPaths.includes(`to: ${JSON.stringify(target)}`)) failures.push(`Explore intent paths must include ${target}.`);
}

const staticAuthorityTargets = [
  '/explore/trip-planner',
  '/explore/top-attractions',
  '/explore/attractions-comparison',
  '/browse/cities',
  '/browse/counties',
  '/events',
  '/fishing',
  '/texas-history',
  '/texas-old-west',
  '/texas-sacred-places',
  '/texas-music',
  '/texas-music-venues',
  '/texas-birds-guide',
  '/texas-natural-wonders-bucket-list',
  '/texas-food-trail',
  '/texas-food-history',
  '/texas-roadside-oddities',
  '/texas-dance-halls-honky-tonks',
  '/things-unique-to-texas',
  '/things-unique-to-texas/roadside-small-towns',
  '/things-unique-to-texas/culture-music',
  '/sports',
  '/sports-venues',
  '/sports-venues/college-sports',
  '/sports-venues/rodeo-western',
  '/texas-state-fair',
];
for (const target of staticAuthorityTargets) {
  if (!publicRoutes.includes(JSON.stringify(target))) failures.push(`Explore authority target must remain an explicitly indexable public route: ${target}.`);
}

for (const [name, path, source] of [
  ['Texas Old West', '/texas-old-west', oldWestHub],
  ['Sacred Places in Texas', '/texas-sacred-places', sacredPlacesHub],
]) {
  if (!source.includes(`canonicalPath = ${JSON.stringify(path)}`)) failures.push(`${name} must define its exact canonical path.`);
  for (const schemaType of ['CollectionPage', 'ItemList', 'BreadcrumbList']) {
    if (!source.includes(`\"@type\": ${JSON.stringify(schemaType)}`)) failures.push(`${name} must emit ${schemaType} structured data.`);
  }
  if (!source.includes('dateModified: "2026-08-30"')) failures.push(`${name} must carry an explicit source-backed launch modification date.`);
  if (!source.includes('to="/explore/trip-planner"')) failures.push(`${name} must hand visitors into the Texas Trip Planner.`);
  if (!source.includes('to="/texas-history"')) failures.push(`${name} must link back to the Texas History authority hub.`);
}

for (const marker of [
  'https://thc.texas.gov/historic-sites',
  'https://tpwd.texas.gov/state-parks/park-information/wildlife/official-state-longhorn',
  'https://www.nps.gov/subjects/buffalosoldiers/about.htm',
]) {
  if (!oldWestHub.includes(marker)) failures.push(`Texas Old West must retain official authority source: ${marker}`);
}
for (const marker of [
  'https://www.nps.gov/saan/index.htm',
  'https://thc.texas.gov/historic-sites',
  'https://www.cem.va.gov/find-cemetery/state.asp?STATE=TX',
]) {
  if (!sacredPlacesHub.includes(marker)) failures.push(`Sacred Places must retain official authority source: ${marker}`);
}
for (const target of ['/texas-old-west', '/texas-sacred-places', '/texas-music', '/article/texas-national-cemeteries-guide']) {
  if (!historyHub.includes(target)) failures.push(`Texas History heritage architecture must surface ${target}.`);
}
for (const target of ['/texas-old-west', '/texas-sacred-places']) {
  if (!musicAuthority.includes(`href: ${JSON.stringify(target)}`)) failures.push(`Texas Music related authority must surface ${target}.`);
}

for (const marker of [
  'Family attraction planning',
  'Family-attraction source review: August 30, 2026.',
  'https://www.sixflags.com/overtexas',
  'https://www.sixflags.com/schlitterbahnnewbraunfels',
  'https://www.fortworthzoo.org/',
  'https://www.texasstateaquarium.org/',
  'https://spacecenter.org/visitor-information',
  'https://www.perotmuseum.org/visit/',
  'https://www.cmhouston.org/visiting/admission',
  'https://sabgtx.org/',
  'name: "Texas family attractions"',
]) {
  if (!topAttractionsHub.includes(marker)) failures.push(`Top attractions family authority missing protected marker: ${marker}`);
}
for (const target of ['/explore/attractions-comparison', '/browse/cities', '/events', '/explore/trip-planner']) {
  if (!topAttractionsHub.includes(`to: ${JSON.stringify(target)}`)) failures.push(`Top attractions family planning must surface ${target}.`);
}

if (!categoryPage.includes('ExploreTopicPaths')) failures.push('Explore categories must render ExploreTopicPaths.');
if (!categoryPage.includes('belongsToExplore && (')) failures.push('Explore-only category guard must remain in place for deferred topical paths.');
if (!categoryPage.includes('<ExploreTopicPaths category={category} />')) failures.push('ExploreTopicPaths must receive the active Explore category.');
if (!exploreHub.includes('ExploreIntentPaths')) failures.push('The main Explore hub must render ExploreIntentPaths.');
if (!regionalHub.includes('to="/explore/trip-planner"')) failures.push('Regional hubs must link directly to the Texas Trip Planner.');
if (!regionalHub.includes('actionTo={`/explore/${group.slug}`}')) failures.push('Regional subject groups must preserve statewide category links.');

if (failures.length) {
  console.error('Explore topical-authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Explore topic bridges, family-attraction authority, Phase 2 heritage hubs, authority clusters, trip-intent groups, indexable authority targets, regional-to-statewide paths and trip-planning pathways are protected.');
