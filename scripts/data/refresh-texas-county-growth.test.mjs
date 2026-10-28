import test from 'node:test';
import assert from 'node:assert/strict';
import { parseTexasCountyGrowth, validateRollover, refresh, sourceUrl } from './refresh-texas-county-growth.mjs';

const fixture = ({ vintage = 2025, count = 254, dup = false, wrongSum = false, malformed = false } = {}) => {
  const header = ['SUMLEV','STATE','COUNTY','CTYNAME','ESTIMATESBASE2020','POPESTIMATE' + vintage];
  const counties = Array.from({ length: count }, (_, index) => [
    '050', '48', dup && index === 1 ? '001' : String(index * 2 + 1).padStart(3, '0'),
    'Test ' + index + ' County', malformed && index === 2 ? '' : String(100000 + index),
    String(101000 + index),
  ]);
  const total = count * 101000 + count * (count - 1) / 2 + (wrongSum ? 1 : 0);
  return [header.join(','), ['040','48','000','Texas','25400000',String(total)].join(','),
    ...counties.map(row => row.join(','))].join('\n');
};

test('Census URL follows the official annually advancing county vintage', () => {
  assert.match(sourceUrl(2026), /2020-2026\/counties\/totals\/co-est2026-alldata.csv$/);
});
test('exact 254 counties reconcile and preserve county identity', () => {
  const data = parseTexasCountyGrowth(fixture(), 2025);
  assert.equal(data.rows.length, 254);
  assert.equal(data.rows[0].fips, '48001');
  assert.equal(data.rows[253].fips, '48507');
  assert.equal(data.rows[0].populationChange, 1000);
});
test('no partial, duplicate, missing-value or state-inconsistent publication', () => {
  assert.throws(() => parseTexasCountyGrowth(fixture({count:253}),2025));
  assert.throws(() => parseTexasCountyGrowth(fixture({dup:true}),2025), /Duplicate/);
  assert.throws(() => parseTexasCountyGrowth(fixture({malformed:true}),2025), /Invalid/);
  assert.throws(() => parseTexasCountyGrowth(fixture({wrongSum:true}),2025), /reconcile/);
});
test('vintages cannot skip or cross decennial methodology boundaries', () => {
  const previous = parseTexasCountyGrowth(fixture(),2025);
  assert.throws(() => validateRollover(parseTexasCountyGrowth(fixture({vintage:2027}),2027),previous),/skipped/);
  assert.throws(() => parseTexasCountyGrowth(fixture({vintage:2030}),2030), /methodology/);
});
test('not-yet-published next vintage does not mutate the prior verified release', async () => {
  const old = { ...parseTexasCountyGrowth(fixture(),2025), verifiedAt:'2026-08-27' };
  const checked = [], written = [];
  const changed = await refresh({
    read: async () => JSON.stringify(old),
    write: async (...args) => written.push(args),
    fetchSource: async year => { checked.push(year); return year === 2026 ? null : fixture(); },
    now: new Date('2026-10-28T12:00:00Z'),
  });
  assert.equal(changed,false);
  assert.deepEqual(checked,[2026,2025]);
  assert.equal(written.length,0);
});
test('initial official release writes only fully validated county snapshot', async () => {
  const written = [];
  const changed = await refresh({
    read: async () => {const e=new Error('missing'); e.code='ENOENT';throw e;},
    write: async (...args) => written.push(args),
    fetchSource: async year => {assert.equal(year,2025);return fixture();},
    now: new Date('2026-10-28T12:00:00Z'),
  });
  assert.equal(changed,true);
  const snapshot = JSON.parse(written[0][1]);
  assert.equal(snapshot.rows.length,254);
  assert.equal(snapshot.verifiedAt,'2026-10-28');
});
