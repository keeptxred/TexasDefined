import {test} from 'node:test';
import assert from 'node:assert/strict';
import {summarizeUnreportedRates,markdownSourceGapReport} from './report-texas-tax-source-gaps.mjs';

const official=[
 {year:2024,type:'city',name:'Town A',slug:'town-a',source_status:'not-reported',total_rate:null,official_taxing_unit_ids:['id-a']},
 {year:2025,type:'city',name:'Town B',slug:'town-b',source_status:'not-reported',total_rate:null,official_taxing_unit_ids:['id-b']},
 {year:2025,type:'special-district',name:'District 1',slug:'district-1',source_status:'not-reported',total_rate:null,official_taxing_unit_ids:['id-c']}
];
const local=[{tax_year:2024,unit_type:'city',slug:'town-a',official_unit_id:'id-a',status:'verified'}];
test('group missing Comptroller rows without inventing zero numeric rates',()=>{
 const r=summarizeUnreportedRates(official,local);
 assert.equal(r.total,3);
 assert.equal(r.covered,1);
 assert.deepEqual(r.groups.map(g=>[g.year,g.city,g['special-district'],g.verified,g.stillMissing]),[
  [2025,1,1,0,2],[2024,1,0,1,0]]);
 assert.deepEqual(r.candidates.map(c=>c.slug),['town-b']);
});
test('publish missing status and clearly separate verified local data from calculator inputs',()=>{
 const r=summarizeUnreportedRates(official,local);
 const markdown=markdownSourceGapReport(r);
 assert.match(markdown,/not reported/);
 assert.match(markdown,/not zero rates/);
 assert.match(markdown,/calculator input/);
 assert.match(markdown,/2025 \| 1 \| 0 \| 0 \| 1 \| 0 \| 2/);
 assert.match(markdown,/Town B/);
 assert.doesNotMatch(markdown,/Town A \(town-a\)/);
});
test('fail closed on wrong official source status, ID drift and duplicate gap keys',()=>{
 assert.throws(()=>summarizeUnreportedRates([{...official[0],total_rate:0}],local),/Unexpected official/);
 assert.throws(()=>summarizeUnreportedRates(official,[{...local[0],official_unit_id:'wrong'}]),/mismatched source ID/);
 assert.throws(()=>summarizeUnreportedRates([official[0],official[0]],local),/Duplicate official source gap/);
});
test('a separate state-vs-local disagreement is not treated as missing or overwritten',()=>{
 const conflict={...official[0],source_status:'reported-final',total_rate:0.287248};
 assert.throws(()=>summarizeUnreportedRates([conflict],[]),/Unexpected official missing-rate/);
});
