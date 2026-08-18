import fs from 'node:fs';

const listSource = fs.readFileSync('src/data/top-texas-attractions.ts', 'utf8');
const authoritySource = fs.readFileSync('src/data/destination-authority-top-attractions.ts', 'utf8');
const timelineSource = fs.readFileSync('src/data/destination-timelines-top-attractions.ts', 'utf8');
const componentSource = fs.readFileSync('src/components/editorial/DestinationAuthorityGuide.tsx', 'utf8');
const relationshipSource = fs.readFileSync('src/components/editorial/DestinationRelationships.tsx', 'utf8');
const destinationRouteSource = fs.readFileSync('src/routes/destination.$slug.tsx', 'utf8');
const hubSource = fs.readFileSync('src/routes/explore.top-attractions.tsx', 'utf8');
const checklistSource = fs.readFileSync('src/routes/top-25-texas-attractions-checklist[.]txt.ts', 'utf8');
const citationManifest = fs.readFileSync('public/citation-magnets.json', 'utf8');
const llmsSource = fs.readFileSync('src/routes/llms[.]txt.ts', 'utf8');

const slugs = [...listSource.matchAll(/\{ rank:\s*\d+, slug: "([^"]+)"/g)].map((match) => match[1]);
const failures = [];

if (slugs.length !== 25) failures.push(`Top attraction registry has ${slugs.length} slugs; expected 25.`);

for (const slug of slugs) {
  if (!authoritySource.includes(`"${slug}": {`)) failures.push(`Missing authority record for ${slug}.`);
}

const authorityKeys = [...authoritySource.matchAll(/^\s{2}"([a-z0-9-]+)": \{/gm)].map((match) => match[1]);
const extraKeys = authorityKeys.filter((slug) => !slugs.includes(slug));
if (extraKeys.length) failures.push(`Authority file has unregistered Top 25 keys: ${extraKeys.join(', ')}.`);
if (authorityKeys.length !== 25) failures.push(`Authority file has ${authorityKeys.length} attraction records; expected 25.`);

for (const feature of [
  'whyItMatters',
  'recommendedVisit',
  'physicalEffort',
  'weatherExposure',
  'planningLevel',
  'familyFit',
  'firstTimeValue',
  'itineraries',
  'sources',
  'applyTopAttractionAuthority',
]) {
  if (!authoritySource.includes(feature)) failures.push(`Authority data contract missing ${feature}.`);
}

const itineraryCalls = (authoritySource.match(/\bitinerary\(/g) ?? []).length - 1; // subtract helper declaration
if (itineraryCalls !== 75) failures.push(`Authority data has ${itineraryCalls} itinerary records; expected 75 (three per attraction).`);

const timelineSlugs = [
  'the-alamo',
  'space-center-houston',
  'sixth-floor-museum-at-dealey-plaza',
  'fort-worth-stockyards',
  'texas-state-capitol',
  'san-antonio-missions-national-historical-park',
  'fredericksburg-historic-district',
  'gruene-historic-district',
];
for (const slug of timelineSlugs) {
  if (!timelineSource.includes(`"${slug}": [`)) failures.push(`Missing sourced history timeline for ${slug}.`);
}
const timelineEvents = (timelineSource.match(/sourceUrl:/g) ?? []).length;
if (timelineEvents !== 24) failures.push(`Top attraction history timelines have ${timelineEvents} sourced events; expected 24.`);
for (const feature of ['topAttractionTimeline', 'sourceLabel', 'sourceUrl']) {
  if (!timelineSource.includes(feature)) failures.push(`Timeline data contract missing ${feature}.`);
}

for (const feature of [
  'Verified visitor information',
  'Editorial assessment',
  'Why it matters to Texas',
  'Three ways to visit',
  'Key dates',
  'in context',
  'Source:',
  'Traveler questions, answered',
  'Sources & verification',
  'Review log',
  'Texas Defined Editorial Desk',
  'a-hollis',
  '/citation-guide',
]) {
  if (!componentSource.includes(feature)) failures.push(`Authority component missing visible feature: ${feature}.`);
}

if (!relationshipSource.includes('<DestinationAuthorityGuide destination={destination} />')) {
  failures.push('Destination pages do not render the authority guide component.');
}

for (const feature of ['applyTopAttractionAuthority', 'authorityCitations', 'citation: authorityCitations', 'Texas Defined Editorial Desk', '/authors/a-hollis']) {
  if (!destinationRouteSource.includes(feature)) failures.push(`Destination structured authority layer missing ${feature}.`);
}

for (const feature of ['applyTopAttractionAuthority', 'assessment.recommendedVisit', 'assessment.physicalEffort', 'assessment.weatherExposure', 'assessment.planningLevel', 'Download Top 25 checklist']) {
  if (!hubSource.includes(feature)) failures.push(`Top 25 hub comparison layer missing ${feature}.`);
}

for (const feature of ['TOP_TEXAS_ATTRACTIONS', 'content-disposition', 'citation-guide', 'explore/top-attractions']) {
  if (!checklistSource.includes(feature)) failures.push(`Top 25 checklist contract missing ${feature}.`);
}

for (const source of [citationManifest, llmsSource]) {
  if (!source.includes('https://texasdefined.com/explore/top-attractions')) failures.push('Top 25 collection is missing from a citation/retrieval authority surface.');
}

if (failures.length) {
  console.error('Top 25 attraction authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Top 25 attraction authority validation passed: 25 authority records, 75 itineraries, 24 sourced timeline events, primary-source evidence, institutional author schema, review log, comparison fields, citation promotion and downloadable checklist are wired.');
