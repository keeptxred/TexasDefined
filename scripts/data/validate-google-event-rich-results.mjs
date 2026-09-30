import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const eventPage = read('src/data/major-event-page.server.ts');
const eventRoute = read('src/routes/event.$slug.tsx');
const eventLazyRoute = read('src/routes/event.$slug.lazy.tsx');
const rootRoute = read('src/routes/__root.tsx');
const authorityBridge = read('src/data/major-event-authority.ts');
const registry = read('src/data/major-event-schema-enrichment.server.ts');
const eventsDirectory = read('src/data/major-event-directory.server.ts');
const sitemap = read('src/routes/sitemap[.]xml.ts');
const stateFair = read('src/routes/texas-state-fair.tsx');
const failures = [];

function requireText(source, needle, message) {
  if (!source.includes(needle)) failures.push(message);
}

function forbidText(source, needle, message) {
  if (source.includes(needle)) failures.push(message);
}

for (const [needle, message] of [
  ['"@type": "Event"', 'Dedicated event pages must emit Event JSON-LD.'],
  ['name: event.name', 'Event JSON-LD must include the event name.'],
  ['url: canonicalUrl', 'Event JSON-LD must include its canonical URL.'],
  ['startDate: window.startDate', 'Event JSON-LD must include startDate.'],
  ['endDate: window.endDate', 'Event JSON-LD must carry the occurrence endDate when known.'],
  ['eventStatus: eventSchemaStatusUrl(occurrenceEnrichment?.lifecycle?.status)', 'Event JSON-LD must publish lifecycle status.'],
  ['eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode"', 'Physical Texas events must publish OfflineEventAttendanceMode.'],
  ['description: event.whyItMatters', 'Event JSON-LD must include a useful event description.'],
  ['"@type": "Place"', 'Event location must be a Place.'],
  ['"@type": "PostalAddress"', 'Event location must include PostalAddress.'],
  ['addressLocality: event.city', 'Event location must include addressLocality.'],
  ['addressRegion: "TX"', 'Event location must include Texas as addressRegion.'],
  ['addressCountry: "US"', 'Event location must include addressCountry.'],
  ['...(occurrenceEnrichment?.image ? { image: [occurrenceEnrichment.image.url] } : {})', 'Event image must come only from governed occurrence enrichment.'],
  ['...(organizer ? { organizer } : {})', 'Verified organizers must be emitted when available.'],
  ['...(offers?.length ? { offers } : {})', 'Verified ticket offers must be emitted when available.'],
  ['...(performers?.length ? { performer: performers } : {})', 'Verified performers must be emitted when available.'],
]) requireText(eventPage, needle, message);

requireText(eventPage, 'previousStartDate: occurrenceEnrichment.lifecycle.previousStartDate', 'Rescheduled Event JSON-LD must support previousStartDate.');
requireText(eventPage, 'occurrenceEnrichment?.lifecycle?.status === "rescheduled"', 'previousStartDate must be gated to rescheduled events.');

for (const [needle, message] of [
  ['export function isValidEventSchemaEntity', 'Event entity validation must exist.'],
  ['export function isValidEventSchemaOffer', 'Event Offer validation must exist.'],
  ['offer.price < 0', 'Event offers must reject negative prices.'],
  ['validHttpsUrl(offer.url)', 'Event offers must require an HTTPS purchase URL.'],
  ['EVENT_OFFER_AVAILABILITY', 'Event offers must constrain supported Google availability values.'],
  ['validEventDateLike(offer.validFrom)', 'Offer validFrom must be ISO-date validated when present.'],
  ['validEventDateLike(offer.validThrough)', 'Offer validThrough must be ISO-date validated when present.'],
  ['lifecycle.status !== "rescheduled" && previous.length > 0', 'previousStartDate must be rejected outside EventRescheduled.'],
  ['const organizer = isValidEventSchemaEntity(record.organizer) ? record.organizer : undefined;', 'Invalid organizers must fail closed.'],
  ['const image = isCompliantMajorEventImage(record.image) ? record.image : undefined;', 'Invalid/noncompliant Event images must fail closed.'],
  ['?.filter(isValidEventSchemaOffer)', 'Invalid Event offers must fail closed.'],
  ['?.filter(isValidEventSchemaEntity)', 'Invalid performers must fail closed.'],
]) requireText(registry, needle, message);

for (const [needle, message] of [
  ['const canonicalPath = `/event/${page.slug}`', 'Event route must own a stable canonical path.'],
  ['links: [canonicalLink(texasDefinedBrand, canonicalPath)]', 'Event route must emit rel=canonical.'],
  ['robots: page.imageCompliant ? undefined : "noindex, follow, max-image-preview:large"', 'Event routes without compliant imagery must fail closed from indexing while preserving discovery.'],
]) requireText(eventRoute, needle, message);

for (const [needle, message] of [
  ['function eventBreadcrumbJsonLd', 'Dedicated Event pages must build breadcrumb JSON-LD.'],
  ['"@type": "BreadcrumbList"', 'Dedicated Event pages must expose BreadcrumbList schema.'],
  ['name: "Texas Events", item: `${SITE_URL}/events`', 'Event breadcrumbs must link through the canonical Events hub.'],
  ['dangerouslySetInnerHTML={{ __html: breadcrumbs }}', 'Event breadcrumb JSON-LD must be rendered with the SSR event component.'],
]) requireText(eventLazyRoute, needle, message);
for (const [needle, message] of [
  ['"@type": "Organization"', 'Root structured data must retain the Texas Defined Organization entity.'],
  ['"@id": `${siteUrl}/#organization`', 'Root Organization must retain its stable entity ID.'],
  ['"@type": "WebSite"', 'Root structured data must retain the Texas Defined WebSite entity.'],
  ['"@id": `${siteUrl}/#website`', 'Root WebSite must retain its stable entity ID.'],
  ['publisher: { "@id": `${siteUrl}/#organization` }', 'Root WebSite must remain linked to the publisher Organization.'],
]) requireText(rootRoute, needle, message);

for (const [needle, message] of [
  ['isRecurrenceDerivedMajorEventSlug(page.slug)', 'Recurrence-derived dates must suppress scheduled Event schema.'],
  ['hasExpiredConfirmedEventOccurrence(occurrence)', 'Expired confirmed occurrences must suppress stale Event schema.'],
  ['hasMultipleConfirmedOccurrenceWindows(occurrence)', 'Multi-window recurring guides must suppress Event schema until each occurrence has its own unique leaf URL.'],
  ['occurrence?.occurrenceWindows && occurrence.occurrenceWindows.length > 1', 'Multi-window detection must require more than one confirmed occurrence window.'],
  ['"@type": "WebPage"', 'Evergreen event guides without a single eligible occurrence must downgrade to WebPage schema.'],
]) requireText(authorityBridge, needle, message);

requireText(eventsDirectory, '"@type": "CollectionPage"', 'Events hub must remain CollectionPage markup.');
forbidText(eventsDirectory, '"@type": "Event"', 'Events hub must not pretend a filtered/listing page is an individual Event.');

for (const [needle, message] of [
  ['Major-event authority routes are permanent guides', 'Sitemap must document permanent event-guide ownership.'],
  ['.filter((event) => hasCompliantMajorEventImageServer(event.slug))', 'Only image-compliant permanent event guides should enter the sitemap.'],
]) requireText(sitemap, needle, message);
forbidText(sitemap, 'hasCurrentOrFutureConfirmedEventOccurrence', 'Permanent event guide sitemap discovery must not disappear merely because an annual occurrence ended.');

for (const [needle, message] of [
  ['createFileRoute("/texas-state-fair")', 'State Fair individual event route must retain its permanent URL.'],
  ['"@type": "Event"', 'State Fair individual page must retain Event JSON-LD.'],
  ['eventStatus: "https://schema.org/EventScheduled"', 'State Fair must publish scheduled status while current.'],
  ['eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode"', 'State Fair must publish offline attendance mode.'],
  ['"@type": "PostalAddress"', 'State Fair must publish a PostalAddress.'],
]) requireText(stateFair, needle, message);

if (failures.length) {
  console.error('Google Event rich-result validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Google Event rich-result contract protected: single-occurrence leaf pages own Event JSON-LD; collections, recurrence-derived guides, expired occurrences, and multi-window guides fail closed to WebPage until each qualifying occurrence has a unique leaf URL.');
