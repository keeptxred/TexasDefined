import fs from 'node:fs';

const failures = [];
const topicPaths = fs.readFileSync('src/components/editorial/ExploreTopicPaths.tsx', 'utf8');
const categoryPage = fs.readFileSync('src/components/editorial/CategoryPage.tsx', 'utf8');
const regionalHub = fs.readFileSync('src/components/editorial/RegionalHubSections.tsx', 'utf8');

for (const slug of ['lakes-rivers','major-springs','state-parks','national-parks','caverns','beaches-coast','historic-sites','road-trips','small-towns','food-bbq','outdoors']) {
  if (!topicPaths.includes(`${JSON.stringify(slug)}:`) && !topicPaths.includes(`${slug}: [`)) failures.push(`Explore topical bridge missing for ${slug}.`);
}

for (const target of ['/explore/trip-planner','/explore/state-parks','/explore/road-trips','/explore/small-towns','/explore/food-bbq','/events','/texas-history']) {
  if (!topicPaths.includes(`to: ${JSON.stringify(target)}`)) failures.push(`Explore topical bridges must include ${target}.`);
}

if (!categoryPage.includes('ExploreTopicPaths')) failures.push('Explore categories must render ExploreTopicPaths.');
if (!categoryPage.includes('belongsToExplore && <ExploreTopicPaths')) failures.push('ExploreTopicPaths must stay limited to Explore category pages.');
if (!regionalHub.includes('to="/explore/trip-planner"')) failures.push('Regional hubs must link directly to the Texas Trip Planner.');
if (!regionalHub.includes('actionTo={`/explore/${group.slug}`}')) failures.push('Regional subject groups must preserve statewide category links.');

if (failures.length) {
  console.error('Explore topical-authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Explore topic bridges, regional-to-statewide paths and trip-planning pathways are protected.');
