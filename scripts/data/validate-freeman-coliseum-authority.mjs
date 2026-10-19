import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const read = (path) => readFileSync(path, 'utf8');
const page = read('src/components/sports/SportsVenueGuidePage.tsx');
const authority = read('src/components/sports/FreemanColiseumAuthoritySections.tsx');
const guide = read('src/data/sports-venue-guide-wave4.ts');
const remediation = read('src/data/sports-venue-content-remediation-wave7.ts');
const times = read('src/data/events/texas-event-calendar.server.ts');
const photos = read('src/components/sports/SportsVenueGuidePilotContent.tsx');
const map = read('public/images/parking-maps/freeman-coliseum.svg');
const mapRegistry = read('src/data/parking-maps-batch6.ts');

const mustHave = (text, fragments, name) => {
  for (const fragment of fragments) assert.ok(text.includes(fragment), `${name}: missing ${fragment}`);
};

mustHave(page, [
  'FreemanColiseumAuthoritySections',
  'fallbackImageUrl={fallbackPhotoSrc}',
  'guide.canonicalPath !== "/sports-venue/freeman-coliseum"',
  '"Primary uses"',
], 'Venue page integration');
mustHave(photos, [
  'fallbackPhotoSrc={photo?.imageUrl}',
  'imageUrl: `/api/sports-venue-hero?slug=${encodeURIComponent(slug)}`',
], 'Licensed image fallbacks');
mustHave(guide, [
  "'freeman-coliseum': {",
  "reviewedAt: '2026-10-10'",
  "eventScheduleUrl: 'https://freemancoliseum.com/events-list/'",
  'faqs: [',
  'freeman_expo_grounds_map_2026.pdf',
  'ADA_Freeman_Coliseum.pdf',
  'ticket-box-office',
  'timeline-v',
], 'Official visitor guide');
mustHave(authority, [
  'id="freeman-campus"',
  'id="freeman-visit"',
  'id="freeman-tickets"',
  'id="freeman-history"',
  'October 24, 2026',
  'Galen College Graduation',
  'Expo Hall 2',
  'Section 27',
  'Section 18',
  'Section 11',
  'Lot 9',
  '12 × 6 × 12',
  'Will Call',
  'Garin Baker',
  '/county/bexar',
], 'Freeman authority research');
mustHave(remediation, [
  "    sourceReview: { reviewedAt: '2026-10-10', authoritativeSources: sources.freeman }",
  'The official 2026 grounds map',
  'The official ADA guide directs Coliseum mobility drop-off to Gate B',
], 'Reviewed parking and accessibility');
mustHave(map, [
  'LOT 1', 'LOT 2', 'LOT 3', 'LOT 4', 'LOT 5',
  'LOT 6', 'LOT 7', 'LOT 8', 'LOT 9',
  'EXPO HALL 2', 'FROST BANK', 'NOT TO SCALE',
  'official 2026 grounds map',
], 'Parking orientation schematic');
mustHave(mapRegistry, [
  "id: 'parking-map:freeman-coliseum:2026-10'",
  "verifiedAt: '2026-10-10'",
  'freeman_expo_grounds_map_2026.pdf',
], 'Parking registry');
mustHave(times, [
  'function formatEventStartTime',
  'const time = formatEventStartTime(event.startTime);',
  'return `${hour % 12 || 12}:${match[2]} ${hour < 12 ? "AM" : "PM"}`;',
], 'Shared event time formatter');
assert.ok((guide.match(/question: '/g) ?? []).length >= 11, 'The guide must retain substantial FAQ coverage.');
assert.ok((authority.match(/date: '/g) ?? []).length >= 8, 'Source-backed chronology incomplete.');

console.log('Freeman Coliseum authority source and integration contracts passed.');
