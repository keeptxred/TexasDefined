import test from 'node:test';
import assert from 'node:assert/strict';
import { parseOfficialFacts, refresh } from './refresh-texas-reference-facts.mjs';

const homestead = amount =>
  '<html><body>Tax Code Section 11.13(b) requires school districts to provide a $' +
  amount + ' exemption on a residence homestead.</body></html>';
const traffic = (short, continuous) =>
  '<html><body>The statewide traffic monitoring program conducts over ' + short +
  ' short-term traffic counts each year. Additionally, over ' + continuous +
  ' continuous traffic count stations collect data 24 hours a day.</body></html>';
const original = {
  verifiedAt: '2026-10-27',
  homestead: { generalSchoolUsd: 140000, sourceUrl: 'https://comptroller.texas.gov/taxes/property-tax/exemptions/' },
  txdot: { shortTermCountsLowerBound: 75000, continuousStationsLowerBound: 350,
    sourceUrl: 'https://www.txdot.gov/data-maps/traffic-count-maps.html' },
};
const registry = [
  "{ slug: 'homestead-exemption-history', updated: '2026-07-30' },",
  "{ slug: 'texas-traffic-monitoring-coverage', updated: '2026-08-26' },",
].join('\n');

test('Parse the official mandatory school exemption and both approximate TxDOT thresholds', () => {
  assert.deepEqual(parseOfficialFacts(homestead('140,000'), traffic('75,000', '350')),
    { homestead: 140000, shortTerm: 75000, stations: 350 });
  assert.throws(() => parseOfficialFacts(homestead('140,000').replace('requires school districts', 'possibly permits schools'),
    traffic('75,000', '350')), /missing/);
  assert.throws(() => parseOfficialFacts(homestead('140,000'), traffic('75,000', '350')
    .replace('over 350 continuous', 'approximately 350 continuous')), /missing/);
  assert.throws(() => parseOfficialFacts(homestead('140,000') +
    homestead('150,000'), traffic('75,000', '350')), /contradictory/);
});

test('Do not commit or alter dates when official reference values are unchanged', async () => {
  const writes = new Map();
  const changed = await refresh({
    fetchHtml: async url => url.includes('comptroller') ? homestead('140,000') : traffic('75,000', '350'),
    read: async name => name.endsWith('.json') ? JSON.stringify(original) : registry,
    write: async (name, body) => writes.set(name, body),
  });
  assert.equal(changed, false);
  assert.equal(writes.size, 0);
});

test('A source-verified change updates only the two governed files', async () => {
  const writes = new Map();
  const changed = await refresh({
    fetchHtml: async url => url.includes('comptroller') ? homestead('150,000') : traffic('82,000', '400'),
    read: async name => name.endsWith('.json') ? JSON.stringify(original) : registry,
    write: async (name, body) => writes.set(name, body),
    checkedAt: '2027-02-13',
  });
  assert.equal(changed, true);
  assert.equal(writes.size, 2);
  const data = JSON.parse(writes.get('src/data/generated/texas-reference-facts-current.json'));
  assert.equal(data.homestead.generalSchoolUsd, 150000);
  assert.equal(data.txdot.shortTermCountsLowerBound, 82000);
  assert.equal(data.txdot.continuousStationsLowerBound, 400);
  assert.match(writes.get('src/data/texas-data-center.ts'), /homestead-exemption-history', updated: '2027-02-13'/);
  assert.match(writes.get('src/data/texas-data-center.ts'), /texas-traffic-monitoring-coverage', updated: '2027-02-13'/);
});

test('Source errors or implausible thresholds fail closed before any write', async () => {
  const writes = [];
  const args = {
    read: async name => name.endsWith('.json') ? JSON.stringify(original) : registry,
    write: async (name, value) => writes.push([name, value]),
  };
  await assert.rejects(() => refresh({ ...args, fetchHtml: async url => {
    if (url.includes('txdot')) throw new Error('upstream blocked');
    return homestead('150,000');
  }}), /blocked/);
  await assert.rejects(() => refresh({ ...args,
    fetchHtml: async url => url.includes('comptroller') ? homestead('950,000') : traffic('75,000', '350'),
  }), /Unusually large/);
  assert.equal(writes.length, 0);
});
