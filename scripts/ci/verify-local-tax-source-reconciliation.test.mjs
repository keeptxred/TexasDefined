import { test } from 'node:test';
import assert from 'node:assert/strict';
import { reconcileLocalTaxRate } from './verify-local-tax-source-reconciliation.mjs';

const local=(year=2025,slug='van-horn',rate=0.492123)=>({
  tax_year:year,unit_type:'city',slug,official_unit_id:'055-101-03-055-055',
  total_rate:rate,maintenance_operations_rate:null,debt_service_rate:null,
  source_url:'https://culbersoncad.org/official-rates.pdf',
});
const official=(year=2025,slug='van-horn',rate=null)=>({
  year,type:'city',slug,official_taxing_unit_ids:['055-101-03-055-055'],
  total_rate:rate,source_status:rate===null?'not-reported':'reported-final',
  rate_unavailable:rate===null,
});

test('unavailable Comptroller record keeps verified local supplement independent',()=>{
  assert.equal(reconcileLocalTaxRate(local(),official()).status,'supplement');
});
test('previously missing value published by Comptroller can be corroborated exactly',()=>{
  assert.equal(reconcileLocalTaxRate(local(),official(2025,'van-horn',0.492123)).status,'corroborated');
});
test('newly changed official value must alert rather than silently override local evidence',()=>{
  const found=reconcileLocalTaxRate(local(),official(2025,'van-horn',0.493));
  assert.equal(found.status,'new-conflict');
  assert.equal(found.key,'2025:city:van-horn');
});
test('known 2022 Hunt CAD Union Valley disagreement remains documented not silently reconciled',()=>{
  const loc={...local(2022,'city-of-union-valley',0),
    official_unit_id:'116-111-03',source_url:'https://hunt-cad.org/wp-content/uploads/2022/10/2022-Tax-Rates.pdf'};
  const off={...official(2022,'city-of-union-valley',0.287248),
    official_taxing_unit_ids:['116-111-03']};
  assert.equal(reconcileLocalTaxRate(loc,off).status,'documented-conflict');
  assert.equal(reconcileLocalTaxRate({...loc,total_rate:0.01},off).status,'new-conflict');
  assert.equal(reconcileLocalTaxRate(loc,{...off,total_rate:0.28}).status,'new-conflict');
});
test('taxing unit identifiers and null component semantics must be preserved',()=>{
  assert.equal(reconcileLocalTaxRate(local(),{...official(),official_taxing_unit_ids:['different']}).status,'invalid-identity');
  assert.equal(reconcileLocalTaxRate({...local(),maintenance_operations_rate:0.2},official()).status,'invalid-local-components');
  assert.equal(reconcileLocalTaxRate({...local(),source_url:'http://untrusted.test'},official()).status,'invalid-local-evidence');
});
test('no false conflict for seven-decimal equivalent local and state rates',()=>{
  const county={...local(2025,'culberson-county',0.1330247),
    unit_type:'county',official_unit_id:'055-000-00-055-055'};
  const off={...official(2025,'culberson-county',0.1330247),
    type:'county',official_taxing_unit_ids:['055-000-00-055-055']};
  assert.equal(reconcileLocalTaxRate(county,off).status,'corroborated');
  assert.equal(reconcileLocalTaxRate(county,{...off,total_rate:0.133025}).status,'new-conflict');
});
