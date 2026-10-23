import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { corporateEventProviders } from '../../src/data/corporate-events.ts';
import { classifyCorporateSourceStatus, providerSourceAgeDays } from './audit-corporate-event-sources.mjs';

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
assert(corporateEventProviders.length >= 30);
for (const item of corporateEventProviders) {
  assert(item.officialUrl.startsWith('https://') && item.sourceUrl.startsWith('https://'));
}
const source = readFileSync('scripts/data/audit-corporate-event-sources.mjs','utf8');
assert(source.includes("redirect: 'manual'"), 'Do not automatically follow unexpected redirects');
assert(source.includes('i += 3'), 'Bound source-check concurrency');
assert(source.includes('ageDays > staleDays'), 'Flag stale editorial review dates');
assert(source.includes('a successful link check does not prove published price'), 'Do not falsely reverify price/capacity');
assert(!source.includes("verifiedOn: new Date()"), 'Source checks must not silently alter editorial review dates');
console.log('Editorial source integrity checks, bounded URL audit and manual-review distinctions PASS.');
