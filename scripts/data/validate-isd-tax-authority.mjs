import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const evidence = JSON.parse(readFileSync(new URL('../../src/data/property/hood-cad-isd-adopted.json', import.meta.url), 'utf8'));
const route = readFileSync(new URL('../../src/routes/property-tax.taxing-unit.$unit.tsx', import.meta.url), 'utf8');
const component = readFileSync(new URL('../../src/components/property/IsdTaxAuthority.tsx', import.meta.url), 'utf8');

const tolerance = 0.000002;
assert.equal(evidence.officialYear, 2026);
assert.match(evidence.verifiedOn, /^2026-\d{2}-\d{2}$/);
for (const field of ['sourceUrl', 'sourceDocumentsUrl', 'exemptionSourceUrl']) {
  assert.match(evidence[field], /^https:\/\/hoodcad\.net\//, field);
}
const districts = Object.entries(evidence.districts);
assert.equal(districts.length, 6, 'All six locally documented Hood CAD school districts must be covered');
for (const [slug, row] of districts) {
  assert.match(slug, /^[a-z0-9-]+-isd$/);
  assert.ok(row.name.endsWith(' ISD'));
  for (const field of ['totalRate', 'maintenanceOperationsRate', 'debtServiceRate']) {
    assert.ok(Number.isFinite(row[field]) && row[field] >= 0 && row[field] < 3, `${slug}: ${field} is invalid`);
  }
  assert.ok(Math.abs(row.maintenanceOperationsRate + row.debtServiceRate - row.totalRate) < tolerance, `${slug}: source components do not reconcile`);
}
assert.equal(evidence.districts['tolar-isd'].totalRate, 0.8944);
assert.equal(evidence.districts['tolar-isd'].maintenanceOperationsRate, 0.6128);
assert.equal(evidence.districts['tolar-isd'].debtServiceRate, 0.2816);
for (const [slug, records] of Object.entries(evidence.historicalComponents)) {
  assert.ok(evidence.districts[slug], 'Historical correction must be attributed to a known district');
  for (const [year, item] of Object.entries(records)) {
    assert.match(year, /^20\d{2}$/);
    assert.ok(Math.abs(item.maintenanceOperationsRate + item.debtServiceRate - item.totalRate) < tolerance);
    assert.ok(item.sourceUrl.startsWith('https://hoodcad.net/'));
  }
}
assert.deepEqual(Object.keys(evidence.historicalComponents['tolar-isd']).sort(), ['2021', '2023'], 'Never backfill disputed Tolar 2022 components');
assert.equal(Object.values(evidence.historicalComponents).reduce((total, item) => total + Object.keys(item).length, 0), 15, '15 year-specific components must be independently source-qualified');
assert.deepEqual(new Set(evidence.disputedData.filter((item) => item.year === 2022).map((item) => item.slug)), new Set(['tolar-isd', 'granbury-isd', 'lipan-isd']));
for (const { slug, year } of evidence.disputedData) {
  assert.ok(!evidence.historicalComponents[slug]?.[String(year)], `${slug}: ${year} cannot be treated as verified when the source conflicts`);
}
assert.match(route, /latest\.type === 'school-district' \? <Suspense/);
assert.match(route, /getVerifiedIsdHistoricalComponents/);
assert.match(route, /showSchoolAdoption/);
assert.match(route, /isdEvidence/);
assert.match(route, /getSchoolDistrictPeerRates/);
assert.match(route, /Not a Comptroller workbook row/);
assert.match(component, /\$140,000 general residence-homestead exemption/);
assert.match(component, /additional \$60,000 school exemption/);
assert.match(component, /not\s*<\/strong> a/);
assert.match(component, /school-taxable value/);
console.log(`Verified ${districts.length} locally adopted Hood CAD ISD rates, Tolar historical evidence, and shared school page guardrails.`);
