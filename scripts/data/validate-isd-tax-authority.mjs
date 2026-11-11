import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const evidence = JSON.parse(readFileSync(new URL('../../src/data/property/hood-cad-isd-adopted.json', import.meta.url), 'utf8'));
const tea = JSON.parse(readFileSync(new URL('../../src/data/property/tea-isd-historical-verified.json', import.meta.url), 'utf8'));
const teaHelper = readFileSync(new URL('../../src/data/property/tea-isd-components.server.ts', import.meta.url), 'utf8');
const route = readFileSync(new URL('../../src/routes/property-tax.taxing-unit.$unit.tsx', import.meta.url), 'utf8');
const historyFunction = readFileSync(new URL('../../src/data/property/texas-tax-rates.functions.ts', import.meta.url), 'utf8');
const detail = readFileSync(new URL('../../src/components/property/TaxingUnitRatePage.tsx', import.meta.url), 'utf8');
const component = readFileSync(new URL('../../src/components/property/IsdTaxAuthority.tsx', import.meta.url), 'utf8');
const schoolExemptions = readFileSync(new URL('../../src/data/property/isd-exemptions.ts', import.meta.url), 'utf8');

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
    assert.ok(item.sourceUrl.startsWith('https://hoodcad.net/') || (slug === 'granbury-isd' && year === '2022' && item.sourceUrl.startsWith('https://www.granburyisd.org/')) || (slug === 'tolar-isd' && year === '2022' && item.sourceUrl === 'https://iswdataclient.azurewebsites.net/pubs/HOODCAD/TAX%20RATE-POSTING%20PER%20SEC.%2026.16/Copy_of_26.16_POSTING_OF_TAX_RATES.pdf'), 'Each historical rate must cite its verified district or Hood CAD source');
  }
}
assert.deepEqual(Object.keys(evidence.historicalComponents['tolar-isd']).sort(), ['2021', '2022', '2023'], 'The primary Hood CAD 2022 posting resolves Tolar components');
assert.deepEqual(evidence.historicalComponents['tolar-isd']['2022'], { totalRate: 1.228782, maintenanceOperationsRate: 0.9471, debtServiceRate: 0.281682, sourceUrl: 'https://iswdataclient.azurewebsites.net/pubs/HOODCAD/TAX%20RATE-POSTING%20PER%20SEC.%2026.16/Copy_of_26.16_POSTING_OF_TAX_RATES.pdf' });
assert.equal(Object.values(evidence.historicalComponents).reduce((total, item) => total + Object.keys(item).length, 0), 17, '17 year-specific components must be independently source-qualified');
assert.deepEqual(Object.keys(evidence.historicalComponents['granbury-isd']).sort(), ['2021', '2022', '2023']);
assert.match(evidence.historicalComponents['granbury-isd']['2022'].sourceUrl, /^https:\/\/www\.granburyisd\.org\//, '2022 Granbury components must have independent district verification');
assert.deepEqual(new Set(evidence.disputedData.filter((item) => item.year === 2022).map((item) => item.slug)), new Set(), 'No Hood CAD 2022 dispute remains unresolved after original adopted-rate posting');
assert.ok(tea.districts['lipan-isd']?.['2022'], 'Lipan 2022 must be independently TEA verified before clearing its dispute');
for (const { slug, year } of evidence.disputedData) {
  assert.ok(!evidence.historicalComponents[slug]?.[String(year)], `${slug}: ${year} cannot be treated as verified when the source conflicts`);
}
assert.equal(tea.sourceAgency, 'Texas Education Agency');
assert.match(tea.sourceUrl, /^https:\/\/tea\.texas\.gov\//);
assert.match(tea.sourceSha256, /^[0-9a-f]{64}$/);
const teaMatches = Object.values(tea.districts).flatMap((years) => Object.values(years));
assert.equal(teaMatches.length, 2494, 'The verified TEA snapshot must not silently lose source-matched observations');
assert.equal(Object.keys(tea.districts).length, 940);
assert.equal(teaMatches.filter((item) => item.year === 2021).length, 850);
assert.equal(teaMatches.filter((item) => item.year === 2022).length, 804);
assert.equal(teaMatches.filter((item) => item.year === 2023).length, 840);
for (const [slug, years] of Object.entries(tea.districts)) {
  assert.match(slug, /^[a-z0-9-]+$/);
  for (const [year, item] of Object.entries(years)) {
    assert.equal(item.year, Number(year));
    assert.match(item.officialDistrictId, /^\d{6}$/);
    assert.ok(item.name && /\b(?:ISD|CISD|CSD|MSD)\b/i.test(item.name), 'Source must name the school district');
    assert.equal(item.sourceUrl, tea.sourceUrl);
    assert.ok(Math.abs(item.maintenanceOperationsRate + item.debtServiceRate - item.totalRate) < 0.000002,
      slug + '/' + year + ': TEA components must reconcile exactly with the existing published total');
  }
}
assert.match(teaHelper, /officialTaxingUnitIds/);
assert.ok(teaHelper.includes(String.raw`/^\d{6}$/`), 'TEA CDN validator must recognize six real numeric district IDs');
assert.ok(teaHelper.includes(String.raw`/-\d+$/`), 'TEA match must strip the official county/district suffix safely');
assert.match(teaHelper, /Math\.abs\(item\.totalRate - statewideTotal\)/);
assert.match(historyFunction, /getVerifiedTeaIsdHistoricalComponents/);
assert.match(route, /TaxingUnitRatePage = lazy/);
assert.match(detail, /latest\.type === 'school-district' \? <Suspense/);
assert.match(historyFunction, /getVerifiedIsdHistoricalComponents/);
assert.match(route, /showSchoolAdoption/);
assert.match(detail, /showSchoolAdoption/);
assert.match(route, /isdEvidence/);
assert.match(historyFunction, /getSchoolDistrictPeerRatesServer/);
assert.match(route, /getTaxingUnitRateHistory/);
assert.match(detail, /Not a Comptroller workbook row/);
assert.match(component, /\$140,000 general residence-homestead exemption/);
assert.match(component, /additional \$60,000 school exemption/);
assert.match(component, /not\s*<\/strong> a/);
assert.match(component, /school-taxable value/);
assert.match(component, /schoolHomesteadForTaxYear/);
assert.match(component, /homesteadTaxableValue \* sample \/ 100/);
assert.match(detail, /showLocallyAdoptedSchoolHistoryRow/);
assert.match(detail, /Not a Comptroller workbook row/);
for (const year of [2021, 2022, 2023, 2024, 2025, 2026]) {
  assert.match(schoolExemptions, new RegExp(String(year) + ': \\{ general: [0-9]+'));
}
assert.match(schoolExemptions, /return HISTORICAL_SCHOOL_EXEMPTIONS\[year\] \?\? null/);
console.log(`Verified ${districts.length} locally adopted Hood CAD ISD rates, Tolar/Granbury historical evidence, historical school exemptions, and shared school page guardrails and ${teaMatches.length} source-qualified TEA historical components.`);
