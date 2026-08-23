import fs from 'node:fs';

const failures = [];
const topicPaths = fs.readFileSync('src/components/editorial/ExploreTopicPaths.tsx', 'utf8');
const intentPaths = fs.readFileSync('src/components/editorial/ExploreIntentPaths.tsx', 'utf8');
const categoryPage = fs.readFileSync('src/components/editorial/CategoryPage.tsx', 'utf8');
const exploreRoute = fs.readFileSync('src/routes/explore.index.tsx', 'utf8');
const exploreHub = fs.readFileSync('src/routes/explore.index.lazy.tsx', 'utf8');
const regionalHub = fs.readFileSync('src/components/editorial/RegionalHubSections.tsx', 'utf8');

for (const slug of ['lakes-rivers','major-springs','state-parks','national-parks','caverns','beaches-coast','historic-sites','road-trips','small-towns','food-bbq','outdoors']) {
  if (!topicPaths.includes(`${JSON.stringify(slug)}:`) && !topicPaths.includes(`${slug}: [`)) failures.push(`Explore topical bridge missing for ${slug}.`);
}

for (const target of ['/explore/trip-planner','/explore/state-parks','/explore/road-trips','/explore/small-towns','/explore/food-bbq','/events','/texas-history']) {
  if (!topicPaths.includes(`to: ${JSON.stringify(target)}`)) failures.push(`Explore topical bridges must include ${target}.`);
}

for (const title of ['Water weekends','Park weekends','History routes','Small-town weekends','Below-ground Texas','Plan the whole trip']) {
  if (!intentPaths.includes(`title: ${JSON.stringify(title)}`)) failures.push(`Explore hub intent group missing: ${title}.`);
}
for (const target of ['/explore/lakes-rivers','/explore/major-springs','/explore/beaches-coast','/explore/state-parks','/explore/national-parks','/explore/outdoors','/explore/historic-sites','/explore/small-towns','/explore/road-trips','/explore/food-bbq','/explore/caverns','/explore/trip-planner','/browse/cities','/events']) {
  if (!intentPaths.includes(`to: ${JSON.stringify(target)}`)) failures.push(`Explore intent paths must include ${target}.`);
}

if (!categoryPage.includes('ExploreTopicPaths')) failures.push('Explore categories must render ExploreTopicPaths.');
if (!categoryPage.includes('belongsToExplore && (')) failures.push('Explore-only category guard must remain in place for deferred topical paths.');
if (!categoryPage.includes('<ExploreTopicPaths category={category} />')) failures.push('ExploreTopicPaths must receive the active Explore category.');
if (!exploreHub.includes('ExploreIntentPaths')) failures.push('The main Explore hub must render ExploreIntentPaths.');
if (!exploreRoute.includes('createFileRoute("/explore/")')) failures.push('The Explore route shell must preserve loader/head registration.');
if (exploreRoute.includes('ExploreIntentPaths') || exploreRoute.includes('component: ExplorePage')) failures.push('Explore presentation must stay out of the eager route shell.');
if (!regionalHub.includes('to="/explore/trip-planner"')) failures.push('Regional hubs must link directly to the Texas Trip Planner.');
if (!regionalHub.includes('actionTo={`/explore/${group.slug}`}')) failures.push('Regional subject groups must preserve statewide category links.');

if (failures.length) {
  console.error('Explore topical-authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Explore topic bridges, trip-intent clusters, regional-to-statewide paths and trip-planning pathways are protected.');
