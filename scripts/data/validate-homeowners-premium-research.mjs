import assert from 'node:assert/strict';
import fs from 'node:fs';
const data = JSON.parse(fs.readFileSync('src/data/research-homeowners-premiums.json', 'utf8'));
const csv = fs.readFileSync('public/texas-data/research/texas-homeowners-premiums-vs-coverage.csv','utf8').trim().split(/\r?\n/);
const years = data.years;
assert.equal(years.length,10);
assert.deepEqual(years.map(x=>x.year),Array.from({length:10},(_,i)=>2016+i));
assert.equal(years.filter(x=>x.preliminary).length,1);
assert.equal(years.at(-1).preliminary,true);
for(const row of years){assert.ok(Number.isFinite(row.average_annual_premium_usd)&&row.average_annual_premium_usd>0);assert.ok(Number.isFinite(row.average_coverage_usd)&&row.average_coverage_usd>0)}
// Anchor every published chart value to the primary TDI source, so matching edits
// to JSON and CSV cannot silently alter the original statewide figures.
// Source: https://tdi.texas.gov/general/texas-homeowners-insurance-market-overview.html
const tdiAnnualPremiums = [1791, 1860, 1916, 1961, 1987, 2124, 2374, 2795, 3291, 3489];
const tdiAverageCoverage = [252000, 262300, 275700, 287900, 294900, 317200, 354300, 387200, 408500, 432800];
years.forEach((row, i) => {
  assert.equal(row.average_annual_premium_usd, tdiAnnualPremiums[i], `TDI premium chart mismatch in ${row.year}`);
  assert.equal(row.average_coverage_usd, tdiAverageCoverage[i], `TDI coverage chart mismatch in ${row.year}`);
});
assert.equal(csv.length,11,'CSV should have header and ten data rows');
const header=csv[0].split(',');
const ix=Object.fromEntries(header.map((x,i)=>[x,i]));
for(const key of ['year','average_annual_premium_usd','average_coverage_usd','source_status']) assert.ok(key in ix,key);
years.forEach((r,i)=>{const cells=csv[i+1].split(',');assert.equal(Number(cells[ix.year]),r.year);assert.equal(Number(cells[ix.average_annual_premium_usd]),r.average_annual_premium_usd);assert.equal(Number(cells[ix.average_coverage_usd]),r.average_coverage_usd)});
const close = (actual, expected, precision=0.011) => assert.ok(Math.abs(actual-expected)<precision, `Expected ${expected}, received ${actual}`);
years.forEach((r,i)=>{
 const cells=csv[i+1].split(',');
 const previous=years[i-1];
 assert.equal(cells[ix.source_status],r.preliminary?'preliminary':'published');
 assert.equal(cells[ix.last_verified],'2026-10-10');
 assert.equal(cells[ix.source_url],data.source_url);
 if(!previous) {
   for(const key of ['premium_yoy_change_usd','premium_yoy_change_percent','coverage_yoy_change_usd','coverage_yoy_change_percent']) assert.equal(cells[ix[key]],'',`First-year ${key} must be blank`);
 } else {
   close(Number(cells[ix.premium_yoy_change_usd]),r.average_annual_premium_usd-previous.average_annual_premium_usd);
   close(Number(cells[ix.coverage_yoy_change_usd]),r.average_coverage_usd-previous.average_coverage_usd);
   close(Number(cells[ix.premium_yoy_change_percent]),100*(r.average_annual_premium_usd/previous.average_annual_premium_usd-1));
   close(Number(cells[ix.coverage_yoy_change_percent]),100*(r.average_coverage_usd/previous.average_coverage_usd-1));
 }
 close(Number(cells[ix.premium_per_100k_coverage_usd]),100000*r.average_annual_premium_usd/r.average_coverage_usd);
});
const route='/texas-data/research/texas-homeowners-premiums-vs-coverage';
assert.ok(fs.readFileSync('src/lib/public-routes.ts','utf8').includes('"'+route+'"'));
assert.ok(fs.readFileSync('src/routes/texas-data.lazy.tsx','utf8').includes(route));
console.log('Homeowners premium research data, CSV, route governance and hub reference validated.');
