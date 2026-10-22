import { test } from 'node:test';
import assert from 'node:assert/strict';
import {checkYearSpecificTaxRateRow} from './tax-history-row-contract.mjs';

function history(rows){
  return '<h2>Annual tax rates, with source distinctions</h2>'+
    '<table><thead><tr><th>Year</th><th>Total / $100</th><th>Operations</th>'+
    '<th>Debt</th><th>Status / source</th><th>Reported levy</th></tr></thead>'+
    '<tbody>'+rows.map(r=>'<tr><td>'+r.year+'</td><td>'+r.rate+
    '</td><td>—</td><td>—</td><td>'+r.source+'</td><td>—</td></tr>').join('')+'</tbody></table>';
}
const source='Locally verified; absent from statewide file. City of Post Oak Bend report ↗';
test('correct year, agency and display-only municipal total must share the same row',()=>{
  const html=history([
    {year:2024,rate:'0.000000',source},
    {year:2025,rate:'0.000000',source}
  ]);
  assert.deepEqual(checkYearSpecificTaxRateRow(html,{year:2024,rate:'0.000000',agency:'City of Post Oak Bend'}),{ok:true,reason:null});
  assert.deepEqual(checkYearSpecificTaxRateRow(html,{year:2025,rate:'0.000000',agency:'City of Post Oak Bend'}),{ok:true,reason:null});
});
test('agency in a different tax year must not validate the requested row',()=>{
  const html=history([
    {year:2024,rate:'0.000000',source:'Not reported'},
    {year:2025,rate:'0.000000',source}
  ]);
  assert.match(checkYearSpecificTaxRateRow(html,{year:2024,rate:'0.000000',agency:'City of Post Oak Bend'}).reason,/does not identify/);
});
test('rate elsewhere on the page cannot validate the target annual row',()=>{
  const html=history([{year:2024,rate:'0.500000',source}])+
    '<p>Unrelated 0.000000 example in the footnotes</p>';
  assert.match(checkYearSpecificTaxRateRow(html,{year:2024,rate:'0.000000',agency:'City of Post Oak Bend'}).reason,/does not match/);
});
test('2022 Union Valley conflict remains source-qualified and cannot mask statewide value',()=>{
  const conflict='Local and statewide reports disagree (local 0.000000 vs statewide 0.287248); statewide record retained. Hunt County Appraisal District report ↗';
  const good=history([{year:2022,rate:'0.287248',source:conflict}]);
  assert.equal(checkYearSpecificTaxRateRow(good,{year:2022,rate:'0.000000',agency:'Hunt County Appraisal District',conflict:true}).ok,true);
  const wrong=history([{year:2022,rate:'0.287248',source:'Locally corroborated. Hunt County Appraisal District report ↗'}]);
  assert.match(checkYearSpecificTaxRateRow(wrong,{year:2022,rate:'0.000000',agency:'Hunt County Appraisal District',conflict:true}).reason,/not disclosed/);
});
test('missing, duplicated year rows and missing locally verified label fail closed',()=>{
  const expected={year:2024,rate:'0.410001',agency:'Bell County Appraisal District'};
  assert.match(checkYearSpecificTaxRateRow(history([]),expected).reason,/found 0/);
  const source2='Locally verified; absent from statewide file. Bell County Appraisal District report ↗';
  const row={year:2024,rate:'0.410001',source:source2};
  assert.match(checkYearSpecificTaxRateRow(history([row,row]),expected).reason,/found 2/);
  assert.match(checkYearSpecificTaxRateRow(history([{...row,source:'Bell County Appraisal District report ↗'}]),expected).reason,/not labeled/);
});
test('seven-digit official precision is preserved within the correct year',()=>{
  const html=history([{year:2025,rate:'0.1330247',source:'Locally verified; absent from statewide file. Culberson County Appraisal District report ↗'}]);
  assert.equal(checkYearSpecificTaxRateRow(html,{year:2025,rate:'0.1330247',agency:'Culberson County Appraisal District'}).ok,true);
  assert.equal(checkYearSpecificTaxRateRow(html,{year:2025,rate:'0.133025',agency:'Culberson County Appraisal District'}).ok,false);
});
