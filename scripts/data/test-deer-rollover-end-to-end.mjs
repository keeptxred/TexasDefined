#!/usr/bin/env node
/** End-to-end OFFLINE TPWD annual rollover test.
 * Runs the real synchronizer with isolated 2027–28 official-source fixtures.
 * Never contacts TPWD, opens a PR, mutates repository data, or publishes.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'../..');
const baseline=JSON.parse(fs.readFileSync(path.join(root,'src/data/hunting/deer-season-dates.json'),'utf8'));
const finisher=fs.readFileSync(path.join(root,'.github/workflows/finish-texas-deer-season-sync.yml'),'utf8');
const sourceWorkflow=fs.readFileSync(path.join(root,'.github/workflows/verify-texas-deer-regulations.yml'),'utf8');
for(const phrase of [
  'src/data/hunting/deer-season-dates.json',
  'dispatch-validate-branch.sh',
  'gh pr merge',
  'gh workflow run deploy-production.yml',
  'new_year > old_year + 1',
])assert.ok(finisher.includes(phrase),'Protected release gate missing '+phrase);
assert.ok(sourceWorkflow.includes('gh pr create'));
assert.ok(sourceWorkflow.includes('gh workflow run')||finisher.includes('gh workflow run'));
assert.equal(baseline.startYear,2026,'Fixture expects 2026–27 baseline; refresh its fixture when genuinely published');

const dates=[
 ['Oct. 3 - Nov. 6, 2027','2027-10-03','2027-11-06'],
 ['Nov. 7, 2027 - Jan. 3, 2028','2027-11-07','2028-01-03'],
 ['Nov. 7, 2027 - Jan. 17, 2028','2027-11-07','2028-01-17'],
 ['Oct. 30 - Nov. 1, 2027','2027-10-30','2027-11-01'],
 ['Jan. 4 - 17, 2028','2028-01-04','2028-01-17'],
 ['Jan. 4 - 17, 2028','2028-01-04','2028-01-17'],
 ['Jan. 4 - 17, 2028','2028-01-04','2028-01-17'],
 ['Jan. 18 - 31, 2028','2028-01-18','2028-01-31'],
];
const deer=[
 'White-tailed Deer 2027-2028 Seasons & Regulations',
 'Season Dates & County Regulations',
 'Archery Only All counties with an open season '+dates[0][0],
 'General Season North Zone '+dates[1][0]+' South Zone '+dates[2][0],
 'Youth-Only North Zone '+dates[3][0]+' '+dates[4][0]+' South Zone '+dates[3][0],
 'Muzzleloader '+dates[5][0]+' Special Late North Zone '+dates[6][0]+' South Zone '+dates[7][0],
 'View White-tailed Deer hunting regulations for your county.',
 '251 of 254 counties have White-tailed Deer seasons.',
 'Statewide Bag Limits No person may exceed the annual bag limit of six white-tailed deer, no more than four of which may be bucks.',
 'Mandatory Harvest Reporting These deer must be reported within 36 hours of harvest.',
 'Counties with mandatory buck and antlerless deer harvest reporting: Bexar, Zavala.',
 'Counties with mandatory antlerless deer harvest reporting: Austin, Bastrop.',
 'Special Antler Restrictions legal buck has inside spread of 15 inches or greater.',
 'Chronic Wasting Disease In counties with a Special Late Season, harvest is restricted to antlerless and unbranched antlered deer.',
 'Additional official TPWD wildlife information. '.repeat(70),
].join(' ');
const calendar=['2027 2028 White-tailed Deer',...dates.map(x=>x[0]),'Upland Game Birds',
  'Statewide official Texas hunting calendar source notes. '.repeat(60)].join(' ');

async function verify(badCalendar,index){
  const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'txdeer-rollover-'));
  const dataDir=path.join(tmp,'src/data/hunting');
  fs.mkdirSync(dataDir,{recursive:true});
  const target=path.join(dataDir,'deer-season-dates.json');
  fs.writeFileSync(target,JSON.stringify(baseline,null,2)+'\n');
  const originalCwd=process.cwd(),originalFetch=globalThis.fetch,originalOutput=process.env.GITHUB_OUTPUT;
  const logFile=path.join(tmp,'github-output');
  process.chdir(tmp);
  process.env.GITHUB_OUTPUT=logFile;
  globalThis.fetch=async url=>{
    const source=String(url);
    const body=source.includes('white-tailed-deer')?deer:
      badCalendar?calendar.replace(dates[7][0],'Feb. 1 - 14, 2028'):calendar;
    if(!source.startsWith('https://tpwd.texas.gov/'))throw Error('Unexpected non-TPWD fixture URL '+source);
    return {ok:true,status:200,url:source,text:async()=>body};
  };
  let rejected=false;
  try {
    await import(new URL('./sync-texas-deer-seasons.mjs?fixture='+index,import.meta.url));
  }catch(e){
    if(!badCalendar)throw e;
    rejected=true;
    assert.match(String(e),/conflicts with deer page/);
  }finally{
    process.chdir(originalCwd);
    globalThis.fetch=originalFetch;
    if(originalOutput===undefined)delete process.env.GITHUB_OUTPUT;
    else process.env.GITHUB_OUTPUT=originalOutput;
  }
  const actual=JSON.parse(fs.readFileSync(target,'utf8'));
  if(badCalendar){
    assert.ok(rejected,'Contradictory statewide calendar must stop publication');
    assert.deepEqual(actual,baseline,'Contradictory data must leave last verified published file intact');
  }else{
    assert.equal(actual.startYear,2027);
    assert.equal(actual.seasonYear,'2027–28');
    assert.equal(actual.regulations.annualBagMax,6);
    assert.equal(actual.regulations.annualBuckMax,4);
    assert.equal(actual.regulations.reportingHours,36);
    assert.equal(actual.regulations.specialAntlerSpreadInches,15);
    assert.match(actual.regulations.buckAndAntlerlessReportingCounties,/Zavala/);
    assert.ok(actual.officialCalendarUrl.endsWith('/2027-2028-hunting-season-dates'));
    assert.deepEqual(actual.rows.map(x=>[x.start,x.end]),dates.map(x=>x.slice(1)));
    assert.match(fs.readFileSync(logFile,'utf8'),/changed=true/);
    const oldShape={...baseline,sourceCheckedAt:null,startYear:null,seasonYear:null,officialCalendarUrl:null,regulations:null,rows:baseline.rows.map(x=>({...x,start:null,end:null}))};
    const newShape={...actual,sourceCheckedAt:null,startYear:null,seasonYear:null,officialCalendarUrl:null,regulations:null,rows:actual.rows.map(x=>({...x,start:null,end:null}))};
    assert.deepEqual(newShape,oldShape,'Bot must preserve all non-approved metadata and row identities');
  }
  fs.rmSync(tmp,{recursive:true,force:true});
}
await verify(false,1);
await verify(true,2);
console.log('Automated 2027–28 deer rollover, legal fact refresh, dual-source rejection, protected-PR metadata and exact release contract validated offline.');
