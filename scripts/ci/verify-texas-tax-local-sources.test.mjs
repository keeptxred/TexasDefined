import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkVerifiedLocalRate } from './verify-texas-tax-local-sources.mjs';

const local = {
  tax_year:2025,unit_type:'city',slug:'post-oak-bend',
  official_unit_id:'129-110-03-129-129',total_rate:'0.00000000',
  maintenance_operations_rate:null,debt_service_rate:null,
  status:'verified',source_url:'https://postoakbend.org/mayor/',
  source_agency:'City of Post Oak Bend',
};
const official = {
  year:2025,type:'city',slug:'post-oak-bend',
  official_taxing_unit_ids:['129-110-03-129-129'],total_rate:null,
  source_status:'not-reported',rate_unavailable:true,
};
test('verified zero city rate is display-only supplement, not inferred from null',()=>{
  assert.equal(checkVerifiedLocalRate(local,[official]),'supplement');
});
test('genuine cross-source disagreement remains explicitly classified',()=>{
  const l={...local,tax_year:2022,slug:'city-of-union-valley',
    official_unit_id:'116-111-03',source_url:'https://hunt-cad.org/wp-content/uploads/2022/10/2022-Tax-Rates.pdf'};
  const r={...official,year:2022,slug:l.slug,
    official_taxing_unit_ids:[l.official_unit_id],total_rate:'0.287248',
    source_status:'reported-final',rate_unavailable:false};
  assert.equal(checkVerifiedLocalRate(l,[r]),'conflict');
  assert.throws(()=>checkVerifiedLocalRate(l,[{...r,total_rate:'0.287249'}]),
    /NEW official\/local rate disagreement/);
  assert.throws(()=>checkVerifiedLocalRate({...l,source_url:'https://hunt-cad.org.evil.test/fake'},[r]),
    /NEW official\/local rate disagreement/);
  assert.throws(()=>checkVerifiedLocalRate({...l,official_unit_id:'116-111-03-999'},
    [{...r,official_taxing_unit_ids:['116-111-03-999']}]),
    /NEW official\/local rate disagreement/);
});
test('numeric corroboration is separate from absent official records',()=>{
  const l={...local,total_rate:'0.340447',
    maintenance_operations_rate:'0.263594',debt_service_rate:'0.076853'};
  const r={...official,total_rate:'0.340447',source_status:'reported-final',rate_unavailable:false};
  assert.equal(checkVerifiedLocalRate(l,[r]),'corroborated');
});
test('an official-unit identity drift fails closed after the monthly import',()=>{
  assert.throws(()=>checkVerifiedLocalRate(local,[{...official,official_taxing_unit_ids:['other-id']}]),
    /no longer matches/);
});
test('missing source record and duplicate source record both fail closed',()=>{
  assert.throws(()=>checkVerifiedLocalRate(local,[]),/exactly one/);
  assert.throws(()=>checkVerifiedLocalRate(local,[official,official]),/exactly one/);
});
test('nonreconciling components, unsafe provenance and inconsistent null state fail closed',()=>{
  assert.throws(()=>checkVerifiedLocalRate({...local,
    maintenance_operations_rate:'0.3',debt_service_rate:'0.2'},[official]),/components do not reconcile/);
  assert.throws(()=>checkVerifiedLocalRate({...local,source_url:'http://unverified.test'},[official]),/primary-source attribution/);
  assert.throws(()=>checkVerifiedLocalRate(local,[{...official,rate_unavailable:false}]),/inconsistent source status/);
});

test('a newly conflicting previously not-reported city rate fails the monthly audit without mutating either source',()=>{
  const l={...local,total_rate:'0.492123',slug:'van-horn',
    official_unit_id:'055-101-03-055-055',source_url:'https://culbersoncad.org/rates.pdf'};
  const r={...official,type:'city',slug:'van-horn',
    official_taxing_unit_ids:['055-101-03-055-055'],total_rate:'0.493000',
    source_status:'reported-final',rate_unavailable:false};
  assert.throws(()=>checkVerifiedLocalRate(l,[r]),/NEW official\/local rate disagreement/);
  assert.equal(l.total_rate,'0.492123');
  assert.equal(r.total_rate,'0.493000');
});
