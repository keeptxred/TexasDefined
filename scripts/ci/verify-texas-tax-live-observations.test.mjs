import {test} from 'node:test';
import assert from 'node:assert/strict';
import {formatRate,classifyLiveObservation,validateLiveObservation} from './verify-texas-tax-live-observations.mjs';

const source='https://kaufman-cad.org/wp-content/uploads/2023/07/2023-Certified-Totals-Partial-Exemption-List.pdf';
const local={
  tax_year:2023,unit_type:'city',slug:'poetry',official_unit_id:'129-112-03',
  total_rate:'0.00000000',maintenance_operations_rate:null,debt_service_rate:null,
  source_url:source,component_source_url:null,
  source_agency:'Kaufman County Appraisal District',verified_on:'2026-10-22',
  evidence_note:'Certified totals document shows a zero city rate.',status:'verified',
};
const official={
  year:2023,type:'city',slug:'poetry',official_taxing_unit_ids:['129-112-03'],
  total_rate:null,source_status:'not-reported',rate_unavailable:true,
};
const rateTable=(year,rate,sourceCell)=>`
  <h2>Annual tax rates, with source distinctions</h2>
  <table><thead><tr><th>Reported levy</th></tr></thead>
  <tbody><tr><td>${year}</td><td>${rate}</td><td>—</td><td>—</td><td>${sourceCell}</td><td>—</td></tr></tbody></table>`;

test('dynamic observation format never rounds seven or eight decimal official source evidence',()=>{
  assert.equal(formatRate('0.13302470'),'0.1330247');
  assert.equal(formatRate('0.12345678'),'0.12345678');
  assert.equal(formatRate('0.00000000'),'0.000000');
  assert.throws(()=>formatRate('NaN'),/Invalid/);
});

test('newly verified year-specific zero city tax keeps source identity and evidence',()=>{
  const item=classifyLiveObservation(local,[official]);
  assert.equal(item.mode,'supplement');
  assert.equal(item.zeroCity,true);
  const html=rateTable(2023,'0.000000','Locally verified; absent from statewide file. Kaufman County Appraisal District report') +
    '<div>How the locally sourced rates were verified</div>'+
    '<p>Evidence last checked by Texas Defined 2026-10-22 and display-only.</p>'+
    '<div>A zero <strong>city</strong> rate does not mean a parcel has no taxes.</div>'+
    '<link href="https://texasdefined.com/property-tax/taxing-unit/poetry"/>'+
    '<a href="'+source+'">Kaufman County Appraisal District report</a>';
  assert.deepEqual(validateLiveObservation(html,item),{ok:true,reason:null});
  assert.match(validateLiveObservation(html.replace(source,'https://untrusted.test'),item).reason,/primary government source link missing/);
  assert.match(validateLiveObservation(html.replace('2026-10-22','2026-10-20'),item).reason,/source-qualified details/);
});

test('corroboration and known contradiction have distinct year-row expectations',()=>{
  const c=classifyLiveObservation(local,[{...official,total_rate:'0.000000',source_status:'reported-final',rate_unavailable:false}]);
  assert.equal(c.mode,'corroborated');
  let html=rateTable(2023,'0.000000','Locally corroborated. Kaufman County Appraisal District report');
  html+='How the locally sourced rates were verified Evidence last checked by Texas Defined 2026-10-22 display-only https://texasdefined.com/property-tax/taxing-unit/poetry '+source;
  assert.equal(validateLiveObservation(html,c).ok,true);
  assert.match(validateLiveObservation(html.replace('Locally corroborated.','Locally verified; absent from statewide file.'),c).reason,/classification/);
  const union={...local,tax_year:2022,slug:'city-of-union-valley',official_unit_id:'116-111-03',
    source_url:'https://hunt-cad.org/wp-content/uploads/2022/10/2022-Tax-Rates.pdf',
    source_agency:'Hunt County Appraisal District'};
  const diff=classifyLiveObservation(union,[{...official,year:2022,slug:union.slug,
    official_taxing_unit_ids:['116-111-03'],total_rate:'0.287248',source_status:'reported-final',rate_unavailable:false}]);
  assert.equal(diff.mode,'conflict');
  assert.equal(diff.statewideRate,'0.287248');
  assert.throws(()=>classifyLiveObservation({...union,source_url:'https://invalid.example/2022.pdf'},
    [{...official,year:2022,slug:union.slug,official_taxing_unit_ids:['116-111-03'],total_rate:'0.287248',source_status:'reported-final',rate_unavailable:false}]),/NEW official\/local rate disagreement/);
});

test('undated local records, mismatched identities, and partial component totals fail closed',()=>{
  assert.throws(()=>classifyLiveObservation({...local,verified_on:null},[official]),/dated official evidence/);
  assert.throws(()=>classifyLiveObservation(local,[{...official,official_taxing_unit_ids:['unknown']}]),/no longer matches/);
  assert.throws(()=>classifyLiveObservation({...local,total_rate:'0.5',maintenance_operations_rate:'0.4',
    debt_service_rate:'0.2'},[official]),/do not reconcile/);
});
