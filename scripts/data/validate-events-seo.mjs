import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/events.tsx'), 'utf8');
const majorEventBoundary = fs.readFileSync(path.join(root, 'src/data/major-event-authority.ts'), 'utf8');
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

for (const feature of [
  'import { loadMajorEventPageServer } from "./major-event-page.server"',
  'createServerFn({ method: "GET" })',
  '.handler(async ({ data }) => loadMajorEventPageServer(data.slug))',
]) {
  if (!majorEventBoundary.includes(feature)) errors.push(`Major-event server boundary missing: ${feature}.`);
}
if (majorEventBoundary.includes('await import("./major-event-page.server")')) {
  errors.push('Major-event authority must not dynamically import its server helper; this leaks the authority corpus into the protected client bundle.');
}

if (errors.length) {
  console.error('Events SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Events CollectionPage, Event ItemList, breadcrumbs, and the server-only major-event authority boundary passed validation.');
