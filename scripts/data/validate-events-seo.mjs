import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const layoutRoute = fs.readFileSync(path.join(root, 'src/routes/events.tsx'), 'utf8');
const layoutLazyRoute = fs.readFileSync(path.join(root, 'src/routes/events.lazy.tsx'), 'utf8');
const route = fs.readFileSync(path.join(root, 'src/routes/events.index.tsx'), 'utf8');
const lazyRoute = fs.readFileSync(path.join(root, 'src/routes/events.index.lazy.tsx'), 'utf8');
const visibleRoute = `${route}\n${lazyRoute}`;
const serverHead = fs.readFileSync(path.join(root, 'src/data/major-event-directory.server.ts'), 'utf8');
const eventLeaf = fs.readFileSync(path.join(root, 'src/data/major-event-page.server.ts'), 'utf8');
const eventLeafRoute = fs.readFileSync(path.join(root, 'src/routes/event.$slug.tsx'), 'utf8');
const temporalCollections = fs.readFileSync(path.join(root, 'src/data/event-temporal-collections.server.ts'), 'utf8');
const weekendDigest = fs.readFileSync(path.join(root, 'src/data/texas-this-weekend.server.ts'), 'utf8');
const collectionRoute = fs.readFileSync(path.join(root, 'src/routes/events.$collection.tsx'), 'utf8');
const authorityBridge = fs.readFileSync(path.join(root, 'src/data/major-event-authority.ts'), 'utf8');
const dateConfidence = fs.readFileSync(path.join(root, 'src/data/major-event-date-confidence.ts'), 'utf8');
const enrichmentRegistry = fs.readFileSync(path.join(root, 'src/data/major-event-schema-enrichment.server.ts'), 'utf8');
const normalizedEventRecord = fs.readFileSync(path.join(root, 'src/data/events/texas-event-record.ts'), 'utf8');
const normalizedEventRecordsServer = fs.readFileSync(path.join(root, 'src/data/events/texas-event-records.server.ts'), 'utf8');
const enrichmentBatchFiles = fs.readdirSync(path.join(root, 'src/data'))
  .filter((name) => /^major-event-schema-enrichment-batch\d+\.server\.ts$/.test(name))
  .sort();
const enrichment = [
  enrichmentRegistry,
  ...enrichmentBatchFiles.map((name) => fs.readFileSync(path.join(root, 'src/data', name), 'utf8')),
].join('\n');
const eventIndex = fs.readFileSync(path.join(root, 'src/data/major-event-index.ts'), 'utf8');
const supplementalRegistry = fs.readFileSync(path.join(root, 'src/data/major-event-supplemental-registry.server.ts'), 'utf8');
const wrapper = fs.readFileSync(path.join(root, 'src/data/major-event-directory.ts'), 'utf8');
const errors = [];

if (!layoutRoute.includes('createFileRoute("/events")')) errors.push('Events layout route must remain the /events parent.');
if (layoutRoute.includes('loader:') || layoutRoute.includes('head:')) errors.push('Events layout route must not own landing loader/head state.');
if (!layoutLazyRoute.includes('createLazyFileRoute("/events")') || !layoutLazyRoute.includes('<Outlet />')) errors.push('Events layout must unconditionally render its child Outlet.');
if (layoutLazyRoute.includes('useRouterState') || layoutLazyRoute.includes('What’s happening across Texas')) errors.push('Events layout must not choose landing vs child content from pathname state.');
if (!route.includes('createFileRoute("/events/")')) errors.push('Events statewide landing must remain an explicit /events/ index child.');
if (!lazyRoute.includes('createLazyFileRoute("/events/")')) errors.push('Events statewide UI must remain on the explicit /events/ index child.');


const scalableEventLandingSlugs = [
  'this-weekend',
  'october-events',
  'november-events',
  'december-events',
  'houston-area-events',
  'dallas-fort-worth-events',
  'austin-area-events',
  'san-antonio-area-events',
  'houston-this-weekend',
  'dallas-this-weekend',
  'austin-this-weekend',
  'san-antonio-this-weekend',
];
for (const slug of scalableEventLandingSlugs) {
  if (!temporalCollections.includes(`slug: "${slug}"`)) errors.push(`Scalable event landing missing: ${slug}.`);
}
for (const marker of [
  'minimumIndexableItems: 4',
  'indexPolicy: "qualified"',
  'definition.filterKind.endsWith("-weekend")',
  'case "austin-area"',
  'case "san-antonio-area"',
  'case "houston-weekend"',
  'case "dfw-weekend"',
  'case "austin-weekend"',
  'case "san-antonio-weekend"',
]) {
  if (!temporalCollections.includes(marker)) errors.push(`Event landing thin-page/rolling guard missing: ${marker}.`);
}
for (const marker of [
  'loadTexasThisWeekendDigestServer',
  'pickDistinct',
  'Best Things to Do in Texas This Weekend',
  'metroEditionPaths',
  'regionalEditionPaths',
  'interestSectionIds',
  'emailSubject',
  'socialSummary',
  'topEventLinks',
  '/events/houston-this-weekend',
  '/events/dallas-this-weekend',
  '/events/austin-this-weekend',
  '/events/san-antonio-this-weekend',
  'id: "gulf-coast"',
  'id: "hill-country"',
  'id: "east-texas"',
  'id: "west-texas"',
  'id: "family"',
  'id: "outdoors"',
  'id: "free"',
  'id: "worth-the-drive"',
  'freeSignal.test(event.name)',
  '!majorMetroCounties.has(event.countyName ?? "")',
]) {
  if (!weekendDigest.includes(marker)) errors.push(`Texas This Weekend reusable selection contract missing: ${marker}.`);
}
for (const marker of [
  'page.weekendDigest',
  'Top 5 this weekend',
  'Events already featured in the Top 5 are removed here',
  'Make a weekend of it',
  'See all {page.items.length} verified event guides',
  'How Texas Defined chooses and verifies weekend events',
  '"data-entity-id": trackId',
  'weekend:${section.id}:${event.slug}',
  'weekend:top-five:${event.slug}',
]) {
  if (!collectionRoute.includes(marker)) errors.push(`Texas This Weekend collection UX missing: ${marker}.`);
}
for (const marker of [
  'getMajorEventSchemaEnrichmentServer',
  'image: eventImage?.url',
  'imageAlt: eventImage?.alt',
]) {
  if (!authorityBridge.includes(marker)) errors.push(`Major-event governed social-image bridge missing: ${marker}.`);
}
for (const marker of [
  'image: page.image',
  'imageAlt: page.imageAlt',
  'type: "article"',
]) {
  if (!eventLeafRoute.includes(marker)) errors.push(`Major-event Open Graph/Twitter metadata wiring missing: ${marker}.`);
}

const recurrenceDerivedDateSlugs = [
  'dallas-holiday-parade',
  'schulenburg-festival',
  'westfest',
  'luling-watermelon-thump',
  'national-polka-festival',
  'sweetwater-rattlesnake-roundup',
  'granbury-founders-day-jubilee',
  'come-and-take-it-celebration',
  'hopkins-county-stew-contest',
  'texas-state-championship-fiddlers-frolics',
];

for (const feature of [
  'export const recurrenceDerivedMajorEventSlugs = new Set([',
  'export function isRecurrenceDerivedMajorEventSlug',
]) {
  if (!dateConfidence.includes(feature)) errors.push(`Shared major-event date confidence registry missing: ${feature}.`);
}
for (const slug of recurrenceDerivedDateSlugs) {
  if (!dateConfidence.includes(`"${slug}"`)) errors.push(`Recurrence-derived Event slug missing from shared date confidence registry: ${slug}.`);
}

for (const feature of [
  'isRecurrenceDerivedMajorEventSlug',
  'function applyEventSchemaConfidencePolicy',
  '"@type": "WebPage"',
  '"@type": "Thing"',
  'page ? applyEventSchemaConfidencePolicy(page) : page',
]) {
  if (!authorityBridge.includes(feature)) errors.push(`Recurrence-derived Event schema confidence policy missing: ${feature}.`);
}
const policyStart = authorityBridge.indexOf('function applyEventSchemaConfidencePolicy');
const policyEnd = authorityBridge.indexOf('const loadMajorEventPage');
if (policyStart < 0 || policyEnd <= policyStart) {
  errors.push('Could not isolate the recurrence-derived Event schema confidence policy block.');
} else {
  const policyBlock = authorityBridge.slice(policyStart, policyEnd);
  for (const forbidden of ['"@type": "Event"', 'https://schema.org/EventScheduled', 'startDate', 'endDate']) {
    if (policyBlock.includes(forbidden)) errors.push(`Recurrence-derived Event schema confidence policy must not emit ${forbidden}.`);
  }
}

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
  'isRecurrenceDerivedMajorEventSlug',
  'Recurrence-derived planning window',
  'majorEventGuides: loadMajorEventGuideDirectoryServer().filter((event) => (event.endDate || event.startDate) >= today)',
]) {
  if (!serverHead.includes(feature)) errors.push(`Server-owned Events SEO feature missing: ${feature}.`);
}

for (const feature of [
  '"@type": "Event"',
  'eventStatus: eventSchemaStatusUrl(occurrenceEnrichment?.lifecycle?.status)',
  'previousStartDate: occurrenceEnrichment.lifecycle.previousStartDate',
  'eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode"',
  'description: event.whyItMatters',
  'startDate: window.startDate',
  'const defaultLocation = {',
  '"@type": "Place"',
  'const location = venueGuide',
  'location,',
  'getMajorEventSchemaEnrichmentServer',
  'getMajorEventSchemaOccurrenceEnrichmentServer',
  '"@type": "Offer"',
  '...(occurrenceEnrichment?.image ? { image:',
  '...(organizer ? { organizer } : {})',
  '...(offers?.length ? { offers } : {})',
  '...(performers?.length ? { performer: performers } : {})',
  'Event details',
  'Last reviewed',
]) {
  if (!eventLeaf.includes(feature)) errors.push(`Dedicated Event leaf SEO feature missing: ${feature}.`);
}

for (const feature of [
  'export interface MajorEventSchemaEnrichment',
  'export type EventSchemaLifecycleStatus = "scheduled" | "cancelled" | "postponed" | "rescheduled"',
  'export interface EventSchemaLifecycle',
  'sourceUrl: string',
  'previousStartDate?: string | string[]',
  'export function eventSchemaStatusUrl',
  'https://schema.org/EventCancelled',
  'https://schema.org/EventPostponed',
  'https://schema.org/EventRescheduled',
  'export function isValidEventSchemaLifecycle',
  'export function getMajorEventSchemaEnrichmentServer',
  'export function getMajorEventSchemaOccurrenceEnrichmentServer',
  'verifiedAt:',
  'organizer:',
  'offers:',
  'performers:',
]) {
  if (!enrichment.includes(feature)) errors.push(`Verified Event enrichment registry feature missing: ${feature}.`);
}

for (const feature of [
  'TexasEventLifecycleStatus = "scheduled" | "cancelled" | "postponed" | "rescheduled"',
]) {
  if (!normalizedEventRecord.includes(feature)) errors.push(`Normalized event lifecycle contract missing: ${feature}.`);
}

for (const feature of [
  'status: lifecycle?.status ?? "scheduled"',
  'statuses: query.statuses ?? ["scheduled", "postponed", "rescheduled"]',
  'getMajorEventSchemaOccurrenceEnrichmentServer(authoritySlug, occurrenceLabel)?.lifecycle',
]) {
  if (!normalizedEventRecordsServer.includes(feature)) errors.push(`Normalized event lifecycle propagation missing: ${feature}.`);
}

for (const batchFile of enrichmentBatchFiles) {
  const batchNumber = batchFile.match(/batch(\d+)\.server\.ts$/)?.[1];
  if (!batchNumber) continue;
  const exportName = `majorEventSchemaEnrichmentBatch${batchNumber}`;
  if (!enrichmentRegistry.includes(`import { ${exportName} } from "./major-event-schema-enrichment-batch${batchNumber}.server";`)) {
    errors.push(`Event enrichment registry does not import ${batchFile}.`);
  }
  if (!enrichmentRegistry.includes(`...${exportName},`)) {
    errors.push(`Event enrichment registry does not register ${batchFile}.`);
  }
}

const enrichedSlugs = [...enrichment.matchAll(/\n\s+slug: "([a-z0-9-]+)",/g)].map((match) => match[1]);
const indexedSlugs = [...eventIndex.matchAll(/\{\s*slug: "([a-z0-9-]+)"/g)].map((match) => match[1]);
const supplementalSlugs = [...supplementalRegistry.matchAll(/\n\s+"([a-z0-9-]+)",/g)].map((match) => match[1]);
const enrichedSet = new Set(enrichedSlugs);
const indexedSet = new Set(indexedSlugs);
const supplementalSet = new Set(supplementalSlugs);
const knownLeafSet = new Set([...indexedSet, ...supplementalSet]);

for (const slug of enrichedSlugs) {
  if (!knownLeafSet.has(slug)) errors.push(`Event enrichment exists without a registered event leaf: ${slug}.`);
}

for (const slug of indexedSlugs) {
  if (!enrichedSet.has(slug)) errors.push(`Indexed major event lacks schema enrichment: ${slug}.`);
}

for (const slug of supplementalSlugs) {
  if (!enrichedSet.has(slug)) errors.push(`Supplemental major event lacks schema enrichment: ${slug}.`);
}

if (!wrapper.includes('createServerFn({ method: "GET" })')) errors.push('Major-event directory client wrapper must remain server-function backed.');
if (!wrapper.includes('import("./major-event-directory.server")')) errors.push('Major-event directory wrapper must dynamically import the server-only module.');
if (wrapper.includes('major-event-index')) errors.push('Major-event directory wrapper must not statically import major-event index data into the client graph.');

if (errors.length) {
  console.error('Events SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Events SEO validation passed (${indexedSlugs.length} indexed guides, ${supplementalSlugs.length} supplemental guides, ${enrichedSlugs.length} enrichment records).`);
