import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { corporateEventTexasToday, isUpcomingCorporateEventDate } from '../../src/data/corporate-event-dates.ts';

const now = new Date('2026-10-24T02:00:00.000Z'); // October 23, 9 PM Texas time.
assert.equal(corporateEventTexasToday(now), '2026-10-23');
assert.equal(isUpcomingCorporateEventDate('2026-10-23', now), true);
assert.equal(isUpcomingCorporateEventDate('2026-10-24', now), true);
assert.equal(isUpcomingCorporateEventDate('2026-10-22', now), false);
assert.equal(isUpcomingCorporateEventDate('2027-02-29', now), false);
assert.equal(isUpcomingCorporateEventDate('2028-02-29', now), true);
assert.equal(isUpcomingCorporateEventDate('2026-02-31', now), false);
assert.equal(isUpcomingCorporateEventDate('not-a-date', now), false);
assert.equal(isUpcomingCorporateEventDate('2026-13-01', now), false);
const api = readFileSync('src/data/corporate-events.functions.ts','utf8');
const page = readFileSync('src/routes/corporate-events.lazy.tsx','utf8');
const partner = readFileSync('src/components/events/GroupEventPartnerApplication.tsx','utf8');
const privacy = readFileSync('src/routes/privacy.lazy.tsx','utf8');
assert(api.includes('isUpcomingCorporateEventDate(data.eventDate)'), 'Server must reject past dates, not just client controls');
assert(!page.includes('/about#privacy-terms') && page.includes('href="/privacy"'), 'Planner privacy link must reach canonical policy');
assert(!partner.includes('/about#privacy-terms') && partner.includes('href="/privacy"'), 'Business applicant privacy link must reach canonical policy');
assert(privacy.includes('Company Event Planning and Venue Applications'));
assert(privacy.includes('does not automatically forward'), 'Planner PII must not be described as automatically shared');
assert(privacy.includes('Last updated October 23, 2026.'));
console.log('Corporate events: real Texas dates, disclosure and canonical privacy link PASS.');
