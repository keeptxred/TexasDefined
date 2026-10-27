import assert from 'node:assert/strict';
import test from 'node:test';
import {reportedCount,reportedDecimal,normalizeDailyImpactRows} from './impact-performance-normalize.mjs';

test('distinguish missing from zero and safely validate provider numbers',()=>{
  assert.equal(reportedCount('', 'Clicks'),null);
  assert.equal(reportedCount('0', 'Clicks'),0);
  assert.equal(reportedCount('42','Clicks'),42);
  assert.equal(reportedDecimal('0E-18','Total_Cost'),0);
  assert.equal(reportedDecimal('3.2578','Total_Cost'),3.2578);
  for(const bad of ['-1','Infinity','NaN','120.0000001usd','1e400'])assert.throws(()=>reportedDecimal(bad,'Total_Cost'));
  assert.throws(()=>reportedCount('3.5','Clicks'));
});

test('financial values not stored without verified currency; date exact',()=>{
  const raw={sort_date:'2026-10-26',Clicks:'12',Impressions:'',Actions:'1',Sales:'1',Total_Cost:'7.50',Action_Cost:'7.25',customer_email:'PII'};
  const row=normalizeDailyImpactRows([raw],'2026-10-26');
  assert.equal(row.reported_clicks,12);
  assert.equal(row.reported_impressions,null);
  assert.equal(row.reported_total_cost,null);
  assert.equal(row.currency_code,null);
  assert.equal(JSON.stringify(row).includes('PII'),false);
  assert.equal(normalizeDailyImpactRows([raw],'2026-10-26',{currencyCode:'USD'}).reported_total_cost,7.5);
  assert.throws(()=>normalizeDailyImpactRows([raw],'2026-10-25'),/date/);
  assert.equal(normalizeDailyImpactRows([],'2026-10-26'),null);
  assert.throws(()=>normalizeDailyImpactRows([raw,raw],'2026-10-26'),/grouping/);
});
