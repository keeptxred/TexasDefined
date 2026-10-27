import test from 'node:test';
import assert from 'node:assert/strict';
import {completedTexasDate, reportRecords, safeResponseShape, verifyResponse} from './impact-readonly-sample.mjs';

test('use prior Texas local day, including UTC local-date rollover',()=>{
  assert.equal(completedTexasDate(new Date('2026-10-27T03:00:00Z')),'2026-10-25');
  assert.equal(completedTexasDate(new Date('2026-10-27T21:00:00Z')),'2026-10-26');
});

test('return only allowed field names, never amounts, payout or buyer values',()=>{
  const sample={'@numpages':'1',Records:[{sort_date:'2026-10-26',Clicks:'75',Actions:'2',Total_Cost:'16.33',customer_email:'secret@private.test',Currency:'USD'}]};
  const result=safeResponseShape(sample);
  assert.deepEqual(result,{empty:false,hasRows:true,fields:['Actions','Clicks','Currency','Total_Cost','sort_date'],dateFieldPresent:true,hasReportCurrency:true});
  assert.doesNotMatch(JSON.stringify(result),/16\.33|75|secret|private|2026-10-26/);
});

test('reject incomplete pagination and unexpected responses',()=>{
  assert.throws(()=>reportRecords({'@numpages':2,Records:[]}),/additional pages/);
  assert.throws(()=>reportRecords({}),/Records array/);
  assert.deepEqual(safeResponseShape({Records:[]}).fields,[]);
});

test('only two GET reports for one local completed date; no public revenue',async()=>{
  let count=0;
  const mock=async(url,options)=>{
    count++;
    assert.equal(options.method,'GET');
    assert.ok(url.includes('/Mediapartners/IR123456/Reports/'));
    assert.equal(new URL(url).searchParams.get('START_DATE'),'2026-10-26');
    assert.equal(new URL(url).searchParams.get('END_DATE'),'2026-10-26');
    return {ok:true,status:200,headers:{get:()=>null},text:async()=>JSON.stringify({Records:[{Clicks:'200',Sale_Cost:'99.99',Campaign:'Private Brand'}]})};
  };
  const result=await verifyResponse({IMPACT_ACCOUNT_SID:'IR123456',IMPACT_AUTH_TOKEN:'PRIVATE'},mock,new Date('2026-10-27T21:00:00Z'));
  assert.equal(count,2);
  assert.equal(result.results.length,2);
  assert.doesNotMatch(JSON.stringify(result),/99.99|Private Brand|200/);
});

test('zero pages with zero records are legitimate empty historical provider days',()=>{
  assert.deepEqual(reportRecords({'@numpages':'0','@total':'0',Records:[]}),[]);
  assert.throws(()=>reportRecords({'@numpages':'0','@total':'1',Records:[]}),/additional pages/);
  assert.throws(()=>reportRecords({'@numpages':'0','@total':'0',Records:[{Clicks:'1'}]}),/additional pages/);
  assert.throws(()=>reportRecords({'@numpages':'2','@total':'20001',Records:[{Clicks:'1'}]}),/additional pages/);
  assert.deepEqual(reportRecords({'@numpages':'1',Records:[{Clicks:'1'}]}),[{Clicks:'1'}]);
});
