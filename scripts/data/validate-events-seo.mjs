import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/events.tsx'), 'utf8');
const errors = [];

for (const feature of [
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "BreadcrumbList"',
  '"@type": "Event"',
  'eventStatus: "https://schema.org/EventScheduled"',
  'eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode"',
  'isPartOf: { "@id": `${siteUrl}/#website` }',
  'mainEntity: { "@id": `${pageUrl}#events` }',
  'numberOfItems: eventItems.length',
  'aria-label="Breadcrumb"',
  'aria-current="page"',
]) {
  if (!route.includes(feature)) errors.push(`Events SEO feature missing: ${feature}.`);
}

if (errors.length) {
  console.error('Events SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Events CollectionPage, Event ItemList, and breadcrumb validation passed.');
