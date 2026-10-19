import test from 'node:test';
import assert from 'node:assert/strict';
import { SOURCES, stripPage, newRaceDateContexts } from './watch-horse-racing-schedules.mjs';

test('exactly four verified licensed live operator calendars, never a sitewide crawl', () => {
  assert.deepEqual(SOURCES.map(x => x.id), ['lone-star-park', 'sam-houston-race-park', 'retama-park', 'gillespie-county-fairgrounds']);
  assert.ok(SOURCES.every(x => x.url.startsWith('https://')));
});
test('only dated racing announcements trigger a human review, never generic dates', () => {
  const src = SOURCES.find(x => x.id === 'retama-park');
  const page = '<script>const filler = "December 30, 2027 racing";</script><p>September 5, 2027 county picnic</p><div>Live Quarter Horse racing on July 11, 2027 - gates open 11 AM.</div>';
  const dates = newRaceDateContexts(page, src, 2026);
  assert.deepEqual(dates.map(x => x.date), ['July 11, 2027']);
});
test('already sourced Sam Houston meet windows are suppressed', () => {
  const src = SOURCES.find(x => x.id === 'sam-houston-race-park');
  const html = '<div>Thoroughbred racing meet begins December 18, 2026 and closes April 3, 2027, while Quarter Horse racing starts April 15, 2027 and closes June 12, 2027.</div>';
  assert.deepEqual(newRaceDateContexts(html, src, 2026), []);
});
test('undated promises and last-year material do not trigger issues', () => {
  const src = SOURCES[0];
  assert.deepEqual(newRaceDateContexts('<p>2027 racing schedule coming soon</p><p>Quarter Horse racing May 12, 2025</p>', src, 2026), []);
});
test('remove scripts and styles before scanning dates', () => {
  assert.ok(!stripPage('<style>July 1, 2027 racing</style><script>May 1, 2027</script><p>Live racing</p>').includes('2027'));
});
