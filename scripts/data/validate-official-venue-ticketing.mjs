import assert from 'node:assert/strict';
import { getOfficialVenueEventSnapshots } from '../../src/data/events/official-venue-events.server.ts';
import { resolveEventTicketCta } from '../../src/data/events/ticketing.ts';

// Independent stadium pages verify the game identities; the GoFan URL
// presently supplied by the venue is a COMMON school catalog, not a unique
// game checkout. Never portray that portal as an exact admission link.
const confirmed = new Map([
  ['2026-10-08', ['Martin vs. Sam Houston', 'martin-vs-sam-houston-20261008']],
  ['2026-10-16', ['Lamar vs. Sam Houston', 'lamar-vs-sam-houston-20261016']],
  ['2026-10-23', ['Arlington vs. Bowie', 'arlington-vs-bowie-20261023']],
  ['2026-10-30', ['Aledo vs. Sam Houston', 'aledo-vs-sam-houston-20261030']],
  ['2026-11-05', ['Sam Houston vs. Bowie', 'sam-houston-vs-bowie-20261105']],
]);
const records = getOfficialVenueEventSnapshots();
assert.equal(records.length, confirmed.size, '2026 Choctaw regular-season fixture count changed without organizer review');
assert.equal(new Set(records.map((item) => item.id)).size, records.length, 'duplicate Choctaw fixture ID');
for (const event of records) {
  const verified = confirmed.get(event.startDate);
  assert.ok(verified, 'unreviewed Choctaw occurrence: ' + event.startDate);
  assert.equal(event.title, verified[0], 'game/opponent attribution changed');
  assert.equal(event.officialEventUrl, 'https://www.choctawstadium.com/event/' + verified[1] + '/');
  assert.equal(event.venueName, 'Choctaw Stadium');
  assert.equal(event.city, 'Arlington');
  assert.equal(event.startTime, '7:00 PM');
  assert.ok(event.summary.includes('shared GoFan school listing'), 'must explain the official venue selector honestly');
  assert.ok(!event.ticketing?.links?.length,
    'general GoFan school catalog cannot masquerade as a game-specific ticket CTA: ' + event.id);
  assert.equal(resolveEventTicketCta(event.ticketing), null, 'misleading Choctaw ticket CTA rendered');
  assert.equal(event.status, 'scheduled');
}
assert.equal(confirmed.has('2026-10-30'), true);
assert.equal(confirmed.has('2026-11-05'), true);
console.log('PASS: five Choctaw source-qualified games retain exact official event links; no shared GoFan catalog is presented as game-specific admission, inventory, or price.');
