import test from 'node:test';
import assert from 'node:assert/strict';
import { retainVerifiedOfficialEvents } from './retain-verified-official-events.mjs';

const clock = new Date('2026-10-28T02:00:00Z');
const today = '2026-10-28';
const horizon = '2028-04-28';
const event = { key: 'wurstfest', name: 'Wurstfest', city: 'New Braunfels',
  url: 'https://wurstfest.com/', category: 'food', score: 94 };
const verified = { id: 'official:wurstfest:2026-11-06', name: event.name, city: event.city,
  startDate: '2026-11-06', endDate: '2026-11-15', officialUrl: event.url,
  sourceCheckedAt: '2026-10-21T15:58:55.685Z',
  category: event.category, confidenceScore: 94, editorialScore: 94,
  status: 'published', autoPublish: true };
const take = (current, old, defs = [event], options = {}) =>
  retainVerifiedOfficialEvents(current, old, defs,
    { today, horizon, now: clock, ...options });

test('preserves organizer-verified Wurstfest November 6–15 during temporary parser failure', () => {
  assert.deepEqual(take([], [verified]), [verified]);
  assert.equal(take([], [verified])[0].sourceCheckedAt, verified.sourceCheckedAt);
});
test('replaces prior occurrence with a newly verified edition, without duplicates', () => {
  const newYear = { ...verified, id: 'official:wurstfest:2027-11-05',
    startDate: '2027-11-05', endDate: '2027-11-14', sourceCheckedAt: clock.toISOString() };
  assert.deepEqual(take([newYear], [verified]), [newYear]);
  assert.deepEqual(take([verified], [verified]), [verified]);
});
test('fails closed for expired, too-old, mismatched, invented, and undated occurrences', () => {
  const variants = [
    { endDate: '2026-10-27' },
    { sourceCheckedAt: '2026-05-01T00:00:00Z' },
    { name: 'Different Festival' },
    { city: 'Dallas' },
    { officialUrl: 'https://wurstfest-fake.example/' },
    { category: 'music' },
    { id: 'official:wurstfest:2027-11-06' },
    { startDate: '2026-11-31' },
    { endDate: '2026-11-31' },
    { sourceCheckedAt: '2026-11-10T00:00:00Z' },
    { sourceCheckedAt: '' },
    { status: 'pending' },
    { autoPublish: false },
    { confidenceScore: 88 },
    { editorialScore: 88 },
  ];
  for (const bad of variants) assert.deepEqual(take([], [{ ...verified, ...bad }]), [], JSON.stringify(bad));
  assert.deepEqual(take([], [verified], [ { ...event, url: 'https://unknown.example' } ]), []);
  assert.deepEqual(take([], [verified], [event], { today: '2026-11-16' }), []);
});
test('keeps original sort order and never extends stale rows into a subsequent year', () => {
  const future = { ...verified, id: 'official:fiesta:2027-04-01',
    name: 'Fiesta', startDate: '2027-04-01', endDate: '2027-04-03', city: 'San Antonio' };
  assert.deepEqual(take([future], [verified]).map(x => x.name), ['Wurstfest', 'Fiesta']);
  assert.deepEqual(take([], [verified], [event], { today: '2027-10-28' }), []);
});
