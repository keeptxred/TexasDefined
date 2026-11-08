import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const data = JSON.parse(readFileSync(new URL('../../src/data/property/tea-isd-history.generated.json', import.meta.url), 'utf8'));
const server = readFileSync(new URL('../../src/data/property/isd-authority.ts', import.meta.url), 'utf8');
const api = readFileSync(new URL('../../src/data/property/texas-tax-rates.functions.ts', import.meta.url), 'utf8');
const page = readFileSync(new URL('../../src/components/property/TaxingUnitRatePage.tsx', import.meta.url), 'utf8');

assert.equal(data.dataVersion, 1);
assert.equal(data.sourceUrl, 'https://tea.texas.gov/about-tea/state-funding/additional-finance-resources/school-district-adopted-tax-rates-1.xlsx');
assert.match(data.sourceSha256, /^[a-f0-9]{64}$/);
assert.equal(data.records.length, 3006);
assert.deepEqual(data.coverage, {
  conflictExcluded: 33, exact: 2546, lowerPrecision: 460, missingDistrictExcluded: 4,
});
assert.equal(Object.values(data.coverage).reduce((sum, n) => sum + n, 0), 3043);
const keySet = new Set();
let exact = 0, rounded = 0;
for (const record of data.records) {
  assert.match(record.slug, /^[a-z0-9-]+-isd$/);
  assert.match(record.cdn, /^\d{6}$/);
  assert.ok([2021, 2022, 2023].includes(record.year));
  assert.ok(!keySet.has(`${record.slug}:${record.year}`));
  keySet.add(`${record.slug}:${record.year}`);
  const mo = Number(record.mo), debt = Number(record.debt), total = Number(record.total), delta = Number(record.delta);
  assert.ok([mo, debt, total, delta].every(Number.isFinite));
  assert.ok(mo >= 0 && debt >= 0 && mo < 3 && debt < 3);
  assert.ok(Math.abs(Math.abs(mo + debt - total) - delta) <= 0.000002);
  if (record.precision === 'exact') {
    exact++;
    assert.ok(delta <= 0.000002);
  } else {
    rounded++;
    assert.equal(record.precision, 'rounded_source_difference');
    assert.ok(delta > 0.000002 && delta <= 0.0001);
  }
}
assert.equal(exact, 2546);
assert.equal(rounded, 460);
assert.match(server, /hasMatchingTeaCdn\(officialIds, entry\.cdn\)/);
assert.match(server, /Math\.abs\(Number\(entry\.total\) - statewideTotal\) > 0\.000002/);
assert.match(server, /precisionStatus: exact \? 'exact'/);
assert.match(api, /getVerifiedIsdHistoricalComponents\(item\.slug, item\.year, item\.totalRate, item\.officialTaxingUnitIds\)/);
assert.match(page, /verifiedHistoryComponentPrecision === 'lower-precision'/);
assert.match(page, /No component was adjusted to force agreement/);
console.log(`Validated ${data.records.length} source-identified TEA ISD history observations (${exact} exact, ${rounded} precision-qualified) and 37 excluded conflicts/misses.`);
