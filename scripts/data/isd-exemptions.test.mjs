import assert from 'node:assert/strict';
import { test } from 'node:test';
import { schoolHomesteadForTaxYear } from '../../src/data/property/isd-exemptions.ts';

test('each historically published school tax year uses its own general and age/disability exemptions', () => {
  const expected = [
    [2021, 25000, 10000],
    [2022, 40000, 10000],
    [2023, 100000, 10000],
    [2024, 100000, 10000],
    [2025, 140000, 60000],
    [2026, 140000, 60000],
  ];
  for (const [year, general, ageOrDisabilityAdditional] of expected) {
    assert.deepEqual(schoolHomesteadForTaxYear(year), { general, ageOrDisabilityAdditional });
    const taxable = Math.max(0, 300000 - general);
    assert.ok(taxable >= 0 && taxable <= 300000);
  }
  assert.equal(schoolHomesteadForTaxYear(2020), null);
  assert.equal(schoolHomesteadForTaxYear(2027), null,
    'Do not silently reuse 2026 exemption figures in a future tax year');
});

test('historical exemption differences remain material and cannot be treated as a single current-year constant', () => {
  assert.notEqual(schoolHomesteadForTaxYear(2024).general, schoolHomesteadForTaxYear(2025).general);
  assert.notEqual(schoolHomesteadForTaxYear(2022).general, schoolHomesteadForTaxYear(2023).general);
});
