import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/events.tsx'), 'utf8');
const lazyRoute = fs.readFileSync(path.join(root, 'src/routes/events.lazy.tsx'), 'utf8');
const visibleRoute = `${route}\n${lazyRoute}`;
const serverHead = fs.readFileSync(path.join(root, 'src/data/major-event-directory.server.ts'), 'utf8');
const eventLeaf = fs.readFileSync(path.join(root, 'src/data/major-event-page.server.ts'), 'utf8');
const wrapper = fs.readFileSync(path.join(root, 'src/data/major-event-directory.ts'), 'utf8');
const errors = [];

for (const feature of [
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "BreadcrumbList"',
  '"@type": "WebPage"',
  'isPartOf: { "@id": `${siteUrl}/#website` }',
  'mainEntity: { "@id": `${pageUrl}#events` }',
  'numberOfItems: eventItems.length',
  'buildMeta',
  'canonicalLink',
]) {
  if (!serverHead.includes(feature)) errors.push(`Server-owned Events SEO feature missing: ${feature}.`);
}

for (const feature of [
  '"@type": "Event"',
  'eventStatus: "https://schema.org/EventScheduled"',
  'eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode"',
  'description: event.whyItMatters',
  'startDate: window.startDate',
  'const defaultLocation = {',
  '"@type": "Place"',
  'const location = venueGuide',
  'location,',
]) {
  if (!eventLeaf.includes(feature)) errors.push(`Dedicated Event leaf SEO feature missing: ${feature}.`);
}

for (const feature of [
  'aria-label="Breadcrumb"',
  'aria-current="page"',
]) {
  if (!visibleRoute.includes(feature)) errors.push(`Visible Events SEO feature missing across eager/lazy route surfaces: ${feature}.`);
}

for (const feature of [
  'getEventsPageHead',
  'head: ({ loaderData }) => loaderData?.head ?? {}',
]) {
  if (!route.includes(feature)) errors.push(`Server-backed Events SEO feature missing from eager route: ${feature}.`);
}

for (const feature of [
  'getEventsPageHead',
  'buildEventsPageHeadServer',
  'await import("./major-event-directory.server")',
]) {
  if (!wrapper.includes(feature)) errors.push(`Events server-head bridge missing: ${feature}.`);
}

if (route.includes('"@type": "CollectionPage"') || route.includes('"@type": "ItemList"') || route.includes('"@type": "BreadcrumbList"')) {
  errors.push('Heavy Events structured-data assembly must remain server-owned rather than returning to the eager client route.');
}
if (serverHead.includes('"@type": "Event"') || serverHead.includes('eventStatus: "https://schema.org/EventScheduled"') || serverHead.includes('eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode"')) {
  errors.push('The Events hub must remain collection/discovery markup; Event rich-result occurrence markup belongs on dedicated /event/:slug pages.');
}

if (errors.length) {
  console.error('Events SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Events server-owned CollectionPage/WebPage ItemList, dedicated enriched Event leaf schema, canonical metadata, and eager/lazy visible breadcrumb validation passed.');