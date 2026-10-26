import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { corporateEventProviders } from '../../src/data/corporate-events.ts';
import { classifyCorporateSourceStatus, providerSourceAgeDays, corporateSourceReviewWindowDays } from './audit-corporate-event-sources.mjs';

assert.equal(classifyCorporateSourceStatus(200, 'https://example.com/venue', null).state, 'reachable');
assert.equal(classifyCorporateSourceStatus(204, 'https://example.com/venue', null).state, 'reachable');
assert.equal(classifyCorporateSourceStatus(301, 'https://example.com', null).state, 'manual-review');
assert.equal(classifyCorporateSourceStatus(403, 'https://example.com', null).state, 'manual-review');
assert.equal(classifyCorporateSourceStatus(429, 'https://example.com', null).state, 'manual-review');
assert.equal(classifyCorporateSourceStatus(404, 'https://example.com', null).state, 'broken');
assert.equal(classifyCorporateSourceStatus(410, 'https://example.com', null).state, 'broken');
assert.equal(classifyCorporateSourceStatus(200, 'http://example.com/venue', null).state, 'broken');
assert.equal(classifyCorporateSourceStatus(null, 'https://example.com', 'timeout').state, 'manual-review');
assert.equal(providerSourceAgeDays('2026-10-23', new Date('2026-10-24T12:00:00Z')), 1);
assert(providerSourceAgeDays('2026-10-23', new Date('2027-02-01T12:00:00Z')) > 90);
const today = new Date('2026-10-24T12:00:00Z');
assert.equal(corporateSourceReviewWindowDays({startingPricePerPerson: 35}),30);
assert.equal(corporateSourceReviewWindowDays({startingPricePerPerson: null}),60);
assert.equal(corporateSourceReviewWindowDays({startingPricePerPerson: 0}),30,
  'Only genuinely recorded numeric prices are 30-day source candidates, never inferred a rate');
assert.equal(providerSourceAgeDays('2026-10-24', today),0);
assert.equal(providerSourceAgeDays('2026-10-24', new Date('2026-10-24T09:17:00Z')),0,
  'On-day source evidence is valid during Monday 09:17 UTC workflow, not future-dated until noon');
assert.equal(providerSourceAgeDays('2026-09-24', new Date('2026-10-24T09:17:00Z')),30,
  'Thirty complete calendar days elapsed regardless of launch hour');
assert.equal(providerSourceAgeDays('2026-08-25', new Date('2026-10-24T09:17:00Z')),60,
  'Sixty complete calendar days elapsed regardless of UTC time');
assert.equal(providerSourceAgeDays('2026-10-25', today),null,'Future editorial verification must fail closed');
assert.equal(providerSourceAgeDays('2026-02-31', today),null,'Invalid rolled-over calendar days must fail closed');
assert.equal(providerSourceAgeDays('2026-13-01', today),null);
assert.equal(providerSourceAgeDays('', today),null);
assert.equal(providerSourceAgeDays('2026-09-24', today),30,
  'Published numeric prices are due on their 30th calendar day');
assert.equal(providerSourceAgeDays('2026-08-25', today),60,
  'Other venues are due on their 60th calendar day');
assert(corporateEventProviders.length >= 30);
for (const item of corporateEventProviders) {
  assert(item.officialUrl.startsWith('https://') && item.sourceUrl.startsWith('https://'));
}
const source = readFileSync('scripts/data/audit-corporate-event-sources.mjs','utf8');
assert(source.includes("redirect: 'manual'"), 'Do not automatically follow unexpected redirects');
assert(source.includes('i += 3'), 'Bound source-check concurrency');
assert(source.includes('ageDays >= reviewWindowDays'), 'Detect official-source review due on 30th or 60th day, not after 90');
assert(source.includes('reviewOverdue: ageDays === null || ageDays >= reviewWindowDays'),
  'Expose due status without automatically claiming freshness');
assert(!source.includes('const staleDays = 90'), 'Do not regress to a 90-day source audit after adopting 30/60-day governance');
assert(source.includes('a successful link check does not prove published price'), 'Do not falsely reverify price/capacity');
assert(!source.includes("verifiedOn: new Date()"), 'Source checks must not silently alter editorial review dates');
console.log('Editorial source integrity checks, bounded URL audit and manual-review distinctions PASS.');
