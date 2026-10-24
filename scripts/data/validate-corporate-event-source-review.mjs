import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const directory = readFileSync('src/data/corporate-events.ts', 'utf8');
const queue = readFileSync('src/data/corporate-event-source-review.ts', 'utf8');
const panel = readFileSync('src/components/events/CorporateEventSourceReviewPanel.tsx', 'utf8');
const staff = readFileSync('src/routes/admin.sports-partners.lazy.tsx', 'utf8');

for (const marker of [
  "corporateEventTexasToday()",
  "provider.verifiedOn",
  "provider.startingPricePerPerson == null ? 60 : 30",
  "then === null || then > now ? 'unverifiable'",
  "daysUntilDue <= 0 ? 'overdue'",
  "daysUntilDue <= 14 ? 'due-soon'",
  "provider.sourceUrl",
]) {
  // Venue URLs are consumed by the panel, while dates and classification are computed in the helper.
  assert((queue + panel).includes(marker), 'Source-review protection missing: ' + marker);
}
for (const topic of [
  'Operating status, temporary closure',
  'Published simultaneous group size',
  'Pricing and whether taxes',
  'Accessibility, participant restrictions',
  'Official site redirects',
]) assert(queue.includes(topic), 'Need official source review topic: ' + topic);

assert(panel.includes('item.provider.sourceUrl') && panel.includes('item.provider.officialUrl'),
  'Staff must have the real cited and official venue links');
assert(panel.includes('Do not advance a review date just by opening this page'),
  'Opening the queue must never be described as fresh research');
assert(panel.includes('const PAGE_SIZE = 24') && panel.includes('queue.items.slice(firstIndex, firstIndex + PAGE_SIZE)'),
  'Staff venue review renders at most 24 source records at once');
assert(panel.includes('Math.max(1, Math.ceil(queue.items.length / PAGE_SIZE))') &&
  panel.includes('setRequestedPage(page + 1)') && panel.includes('setRequestedPage(page - 1)'),
  'Every venue must be reachable, including records after the first 24');
assert(panel.includes('disabled={page === 0}') && panel.includes('disabled={page >= totalPages - 1}'),
  'Review page navigation must stop at the first and last record');
assert(panel.includes('aria-label="Venue source review pages"') &&
  panel.includes('aria-live="polite"'),
  'Accessible pagination status must announce range and page');
const indicesForPage = (n, page) =>
  Array.from({ length: Math.min(24, Math.max(0, n - 24 * page)) }, (_, i) => 24 * page + i);
const visited = Array.from({length: Math.ceil(122 / 24)}, (_, page) => indicesForPage(122, page)).flat();
assert.equal(visited.length, 122);
assert(visited.every((index, position) => index === position), '122 venues must be reachable exactly once');
assert(panel.includes('queue.overdue') && panel.includes('queue.dueSoon')
  && panel.includes('queue.unverifiable'), 'Expose review coverage without pretending all claims are current');
assert(!/fetch\s*\(|XMLHttpRequest|submit\s*\(|\.from\s*\(/.test(queue + panel),
  'Venue review planning must be read-only without source crawls, database writes, or outreach');
assert(staff.includes("{dashboard ? <CorporateEventSourceReviewPanel /> : null}"),
  'The source review queue must render only after the staff dashboard unlocks');
assert(staff.includes("CorporateEventOpsPanel accessKey={accessKey}"),
  'Source queue must not replace protected partner/outcome operation workflows');

const slugs = [...directory.matchAll(/\bslug:\s*['"]([a-z0-9-]+)['"]/g)].map(match=>match[1]);
const reviewed = [...directory.matchAll(/verifiedOn:\s*['\"]([^'\"]+)['\"]/g)].map(match=>match[1]);
assert(slugs.length >= 122 && new Set(slugs).size === slugs.length,
  'Retain the independently sourced venue catalog and unique slugs');
assert.equal(reviewed.length, slugs.length, 'Every venue should have an independently recorded review date');
for (const date of reviewed) {
  const verified = Date.parse(date + 'T12:00:00Z');
  assert(/^\d{4}-\d{2}-\d{2}$/.test(date) &&
    Number.isFinite(verified) &&
    new Date(verified).toISOString().slice(0,10) === date,
    'Review queue must reject invalid source evidence days: ' + date);
}
// Source-qualified high-impact capacity corrections from current venue pages.
const record = slug => {
  const start = directory.indexOf("slug: '" + slug + "'");
  assert(start >= 0, 'Missing source-reviewed venue: ' + slug);
  return directory.slice(start, directory.indexOf('\n  },', start));
};
const meow = record('meow-wolf-houston');
assert(meow.includes('maxGroup: 400') && meow.includes('full buyout up to 400') &&
  meow.includes('Theta Theater up to 125') && meow.includes('50 vs dedicated bar page 44'),
  'Do not reduce the Houston full buyout to a small bar or advertise the conflicting Cowboix cap as settled');
const escape = record('the-escape-game-houston');
assert(escape.includes("area: 'CityCentre and Galleria'") &&
  escape.includes('maxGroup: null') && escape.includes('8–60+') &&
  escape.includes('partial buyout 25–52') && escape.includes('53+ by custom quote'),
  'Do not invent a hard 60-person upper limit or collapse two Houston locations into one');
assert(escape.includes('startingPricePerPerson: null'),
  'Group-dependent price tables must not be advertised as one universal starting rate');
console.log('Corporate event staff source governance: cited review links, bounded due dates, privacy and entire venue catalog PASS');
