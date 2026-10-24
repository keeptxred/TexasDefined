import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

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
assert(panel.includes('const filtered = queue.items.filter(') && panel.includes('const pageSize = 24') &&
  panel.includes('filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)'),
  'Bounded staff page size must not hide the other 98+ valid venue source records');
assert(panel.includes('setPageIndex(currentPage + 1)') &&
  panel.includes('setPageIndex(currentPage - 1)') &&
  panel.includes('Page {currentPage} of {pageCount}'),
  'Every page of public directory source-review work must remain navigable');
assert(panel.includes('item.provider.city === city') &&
  panel.includes('item.status === urgency') &&
  panel.includes('searchTerm.trim().toLowerCase()'),
  'Private operator must filter by city, review urgency and public business identity');
assert(panel.includes('setPageIndex(1)') && panel.includes('const currentPage = Math.min(pageIndex, pageCount)'),
  'Filter changes and shrinking matches must reset or clamp staff pagination');
assert(panel.includes('role="status" aria-live="polite"') &&
  panel.includes('aria-label="Venue source review pagination"'),
  'Staff must receive readable match counts and accessible navigation');
assert(!panel.includes('queue.items.slice(0, 24)'),
  'Do not silently strand the other venue entries behind an unchangeable first-page preview');
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
const invitations = spawnSync(process.execPath,
  ['--experimental-strip-types', '--test', 'scripts/data/corporate-event-partner-invitations.test.mjs'],
  { cwd: process.cwd(), stdio: 'inherit', shell: false });
assert.equal(invitations.status, 0, 'Protected operator invitation contract must remain read-only, source-grounded and noncommercial until signed');
console.log('Corporate event staff source governance: cited review links, bounded due dates, privacy and entire venue catalog PASS');
