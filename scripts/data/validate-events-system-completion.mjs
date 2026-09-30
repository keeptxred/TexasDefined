#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const failures = [];
const requireText = (file, text, label) => {
  const source = read(file);
  if (!source.includes(text)) failures.push(`${label} missing from ${file}: ${text}`);
};
const forbidText = (file, text, label) => {
  const source = read(file);
  if (source.includes(text)) failures.push(`${label} must not appear in ${file}: ${text}`);
};

const tranche = 'src/data/major-event-expanded-authority-tranche48.server.ts';
const registry = 'src/data/major-event-supplemental-registry.server.ts';
const temporal = 'src/data/event-temporal-collections.server.ts';
const eventRecord = 'src/data/events/texas-event-record.ts';
const eventRoute = 'src/routes/event.$slug.tsx';
const eventLazyRoute = 'src/routes/event.$slug.lazy.tsx';
const authority = 'src/data/major-event-authority.ts';
const schema = 'src/data/major-event-schema-enrichment.server.ts';
const page = 'src/data/major-event-page.server.ts';
const ticketmaster = 'src/data/events/ticketmaster-events.server.ts';
const sync = '.github/workflows/sync-texas-events.yml';
const syncScript = 'scripts/events/sync-texas-events-safe.mjs';
const editorialPackage = 'src/data/events/weekend-editorial-package.server.ts';
const sourceRegistry = 'ops/editorial/events-source-registry-2026-09-30.md';
const completionReport = 'ops/editorial/events-system-completion-2026-09-30.md';
const temporalWorkflow = '.github/workflows/verify-event-temporal-production.yml';

// 1-3: current Austin/San Antonio weekend depth and first-party source expansion.
const austinSlugs = ['austoberfest', 'boo-at-the-austin-zoo', 'ta-se-dhin-tak-tabla-festival'];
const sanAntonioSlugs = [
  'san-antonio-black-international-film-festival',
  'historic-market-square-car-show',
  'tejanos-at-the-alamo',
  'san-antonio-monarch-butterfly-pollinator-festival',
];
for (const slug of [...austinSlugs, ...sanAntonioSlugs]) {
  requireText(tranche, `slug: "${slug}"`, 'verified permanent event guide');
  requireText(registry, `"${slug}"`, 'supplemental event registry');
}
for (const marker of [
  'sourceCheckedAt: "2026-09-30"',
  'officialUrl:',
  'planningSections:',
  'relatedLinks:',
  'sources:',
]) requireText(tranche, marker, 'event authority quality contract');

// 4-6: geographic/category audits and fail-closed landing-page policy.
for (const marker of [
  '"austin-weekend": new Set(["Travis County", "Williamson County", "Hays County", "Bastrop County"])',
  '"san-antonio-weekend": new Set(["Bexar County", "Comal County", "Guadalupe County", "Kendall County"])',
  'minimumIndexableItems: 4',
  'indexPolicy: "qualified"',
  'temporarily noindex until enough verified guides qualify',
]) requireText(temporal, marker, 'temporal collection fail-closed contract');
for (const forbidden of [
  '/events/family-events-this-weekend',
  '/events/free-events-this-weekend',
  '/events/outdoor-events-this-weekend',
]) forbidText(temporal, forbidden, 'thin interest-page prevention');
for (const marker of ['Panhandle/High Plains', 'Big Bend/Far West', 'Interest/category coverage audit', 'at least six source-qualified permanent guides']) {
  requireText(sourceRegistry, marker, 'documented source/coverage audit');
}

// 7-8: collection and individual-event UX/content quality.
for (const marker of ['Current verified window:', 'planningTitle', 'planningPoints', 'relatedPaths']) requireText(temporal, marker, 'collection UX contract');
for (const marker of ['ParkingMapPanel', 'data-stay-nearby-slot', 'Planning your visit', 'hideFailedImageContainer']) requireText(eventLazyRoute, marker, 'individual-event UX contract');
for (const marker of ['buildMajorEventTicketingMarkupServer', 'Planning your visit', 'Official event links', 'data-event-discovery-tail']) requireText(page, marker, 'individual-event content contract');

// 9-10: image/indexability and social metadata fail closed.
for (const marker of ['verified-reusable', 'official-source-only', 'displayAllowed']) requireText(eventRecord, marker, 'event image-rights model');
for (const marker of ['approvedForCommercialUse === true', 'exactLocation', 'PROHIBITED_IMAGE_SOURCE_HOSTS', 'ai-generated']) requireText(schema, marker, 'major-event image provenance policy');
for (const marker of ['image: page.image', 'imageAlt: page.imageAlt', 'type: "article"', 'robots: page.imageCompliant ? undefined : "noindex, follow, max-image-preview:large"']) requireText(eventRoute, marker, 'event social/indexability contract');
requireText(authority, 'imageCompliant: hasCompliantMajorEventImageServer(data.slug)', 'authority image compliance bridge');

// 11: internal linking.
requireText(tranche, 'href: "/events/austin-this-weekend"', 'Austin weekend backlink');
requireText(tranche, 'href: "/events/san-antonio-this-weekend"', 'San Antonio weekend backlink');
for (const marker of ['/browse/counties#county-travis', '/browse/counties#county-bexar']) requireText(tranche, marker, 'county relationship link');

// 12-14: expired/recurring/lifecycle/cancellation governance.
for (const marker of ['scheduled', 'cancelled', 'postponed', 'rescheduled']) requireText(eventRecord, `"${marker}"`, 'canonical lifecycle state');
for (const marker of ['previousStartDate', 'EventCancelled', 'EventPostponed', 'EventRescheduled', 'sourceUrl', 'verifiedAt']) requireText(schema, marker, 'Event schema lifecycle contract');
requireText(ticketmaster, "['cancelled', 'postponed', 'rescheduled'].includes(event.status)", 'changed/cancelled commercial inventory suppression');
requireText(ticketmaster, '48 * 3600000', 'stale commercial inventory suppression');
requireText(registry, 'current occurrence can expire', 'evergreen expired-occurrence policy');
requireText(sourceRegistry, "Never infer a new annual date from last year's weekend", 'recurrence rollover source policy');

// 15: refresh reliability and independent live guard.
for (const marker of ['schedule:', 'cron: "17 11 * * *"', 'cancel-in-progress: false', 'Prevalidate generated refresh branch']) requireText(sync, marker, 'daily event refresh reliability contract');
for (const marker of ['readFile(OUTPUT_PATH, "utf8")', 'stableEventEquals', 'preservedCheckTimestamps']) requireText(syncScript, marker, 'idempotent/fail-safe event sync contract');
for (const marker of ['schedule:', 'workflow_run:', 'Verify temporal Event production surfaces']) requireText(temporalWorkflow, marker, 'independent live temporal guard');

// 16: event-specific GSC/indexation evidence and interpretation.
const gsc = JSON.parse(read('ops/seo/gsc-discovered-2026-09-13.json'));
if (gsc?.routeFamilyCounts?.events !== 69) failures.push('Expected latest stored GSC snapshot to contain 69 discovered-not-indexed event URLs.');
if (gsc?.routeFamilyCounts?.eventCollections !== 40) failures.push('Expected latest stored GSC snapshot to contain 40 discovered-not-indexed event-collection URLs.');
requireText(completionReport, 'crawl-demand signal', 'GSC/indexation interpretation');

// 17: event monetization must stay provider-neutral and fail-safe.
for (const marker of ['buildMajorEventTicketingMarkupServer', 'resolveEventTicketCta', 'HOTELS_COM_AFFILIATE_URL', 'data-affiliate-partner', 'sponsored nofollow']) requireText(page, marker, 'event monetization contract');
requireText(eventRecord, 'never stores checkout', 'provider-neutral ticketing model');

// 18: reusable newsletter/social package, deliberately send-neutral.
for (const marker of ['buildWeekendEditorialPackageServer', 'newsletterMarkdown', 'facebook', 'instagram', 'x:', 'sourcePaths', 'never sends, schedules or posts']) requireText(editorialPackage, marker, 'weekend editorial package contract');
for (const forbidden of ['sendEmail(', 'sendMail(', 'postToFacebook(', 'schedulePost(']) forbidText(editorialPackage, forbidden, 'send-neutral editorial package');

for (const marker of ['# TexasDefined Events system completion', 'Task 18', 'No new thin landing pages']) requireText(completionReport, marker, 'completion report');

if (failures.length) {
  console.error('Events system completion validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Events system completion validation passed: all 18 completion contracts are present and fail-closed safeguards remain enforced.');
