import test from 'node:test';
import assert from 'node:assert/strict';
import { parseAustinCadRateTable, parseDistrictResolutionUrl, parseSignedResolution } from './refresh-austin-esd3-adopted.mjs';

const rateTable = `<table><thead><tr><th>Tax Jurisdiction</th><th>2026</th><th>2025</th><th>2024</th></tr></thead><tbody><tr><td>Austin County</td><td>.34900</td><td>.35423</td><td>.36300</td></tr><tr><td>Austin County ESD#3</td><td>.07490</td><td>.07592</td><td>0.08174</td></tr></tbody></table>`;
const resolutions = `<table><tr><th>Worksheets</th><th>Resolutions</th></tr><tr><td><a href="/2026-worksheet.pdf">2026</a></td><td><a href="/wp-content/uploads/2026/10/2026-Tax-Rate-Resolution.pdf">2026</a></td></tr></table>`;
const signed = `RESOLUTION ADOPTING THE 2026 AD VALOREM TAX RATES FOR AUSTIN COUNTY EMERGENCY SERVICES DISTRICT NO.3 On September 21, 2026, the governing body adopted the following tax rates. Maintenance and Operation Rate $ $0.07490/100 Debt Service Rate $ 0.00000/$100 Total of Adopted Tax Rates $ $0.07490/100`;

test('Austin CAD rate parser isolates exact ESD #3 and the latest reported year', () => {
  assert.deepEqual(parseAustinCadRateTable(rateTable), [{year:2026,rate:.0749}]);
  assert.throws(()=>parseAustinCadRateTable(rateTable.replace('ESD#3','ESD#2')), /Could not identify/);
});
test('district PDF link requires exact year and second source column', () => {
  assert.equal(parseDistrictResolutionUrl(resolutions,2026,'https://austincountyesd3.org/tax-rate-worksheets/'),
    'https://austincountyesd3.org/wp-content/uploads/2026/10/2026-Tax-Rate-Resolution.pdf');
  assert.throws(()=>parseDistrictResolutionUrl(resolutions,2027,'https://austincountyesd3.org/tax-rate-worksheets/'), /No year-specific/);
});
test('signed resolution proves components, jurisdiction, year and adoption date', () => {
  assert.deepEqual(parseSignedResolution(signed,2026),{totalRate:.0749,maintenanceOperationsRate:.0749,debtServiceRate:0,adoptedOn:'2026-09-21'});
  assert.throws(()=>parseSignedResolution(signed.replace('0.00000/$100','0.01200/$100'),2026),/do not add/);
  assert.throws(()=>parseSignedResolution(signed,2027), /does not identify/);
});
