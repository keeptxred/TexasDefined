#!/usr/bin/env node
import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyChromeReport, graduateBatch010 } from './prepare-football-b010-certification.mjs';
const worker='123e4567-e89b-42d3-a456-426614174000';
const sha='f'.repeat(40);
const slugs=Array.from({length:25},(_,i)=>'school-'+i);
const mock=()=>({
  batch:{number:10,slugs,state:'IN_PROGRESS',individuallyVerified:0,
    remainingToVerify:25,remainingAssigned:25,remainingToImplement:0,
    dateAssigned:'2026-10-27'},
  completedBatches:[{number:9}],
  schoolRecords:[
    ...Array.from({length:205},(_,i)=>({slug:'prior-'+i,status:'VERIFIED',batch:9})),
    ...slugs.map(slug=>({slug,batch:10,status:'IMPLEMENTED',actualProductionVerified:false})),
    ...Array.from({length:1062},(_,i)=>({slug:'pending-'+i,status:'NOT_REVIEWED'}))
  ]
});
const groups=()=>[5,5,3,5,4].map((counties,i)=>({
  label:['first-five','second-five','third-five','fourth-five','fifth-five'][i],
  schoolSlugs:slugs.slice(i*5,(i+1)*5),runId:8000+i,artifactId:9000+i,
  runUrl:'https://github.com/keeptxred/TexasDefined/actions/runs/'+(8000+i),
  artifactUrl:'https://github.com/keeptxred/TexasDefined/actions/runs/'+(8000+i)+'/artifacts/'+(9000+i),
  schoolCasesPassed:15,countyCasesPassed:counties,
  screenshotsSaved:[20,26,21,20,19][i],workerVersion:worker
}));
test('graduation requires 25 sourced and preserves 205 historical records',()=>{
  const r=mock();
  graduateBatch010(r,groups(),worker,sha,777,'2026-10-29');
  assert.equal(r.schoolRecords.filter(s=>s.status==='VERIFIED').length,230);
  assert.equal(r.schoolRecords.filter(s=>s.status==='IMPLEMENTED').length,0);
  assert.equal(r.schoolRecords.filter(s=>s.status==='NOT_REVIEWED').length,1062);
  assert.equal(r.completedBatches[1].technicalAcceptance.screenshotsSaved,106);
  assert.equal(r.batch.remainingToVerify,0);
  assert.equal(r.schoolRecords[205].technicalBrowserRun,8000);
  assert.equal(r.schoolRecords[229].technicalBrowserRun,8004);
  assert.equal(r.schoolRecords[205].schoolPhotoReuseRightsAccepted,false);
});
test('cannot graduate an unresearched or previously verified Batch010 school',()=>{
  const r=mock();r.schoolRecords[205].status='NOT_REVIEWED';
  assert.throws(()=>graduateBatch010(r,groups(),worker,sha,777,'2026-10-29'));
});
test('cannot claim technical certification without real artifact IDs',()=>{
  const r=mock(),g=groups();g[4].artifactId=0;
  assert.throws(()=>graduateBatch010(r,g,worker,sha,777,'2026-10-29'),/artifactId/);
});
const goodReport=()=>({
  version:1,technicalOnly:true,sourceCommit:sha,workerVersions:[worker],
  failures:[],sitemapMissing:[],screenshots:20,
  schoolChecks:slugs.slice(0,5).flatMap(slug=>
    [['desktop',1366],['mobile',390],['narrow',320]].map(([device,width])=>
      ({slug,device,width,pass:true,issues:[]}))),
  countyChecks:['falls','mclennan','tom-green','guadalupe','eastland']
    .map(county=>({county,pass:true,issues:[]}))
});
test('accept Chrome report only when all three views and PNG files exist',()=>{
  const report=goodReport();
  verifyChromeReport(report,0,slugs.slice(0,5),worker,sha,20);
  assert.throws(()=>verifyChromeReport(report,0,slugs.slice(0,5),worker,sha,0),
    /screenshot/);
  assert.throws(()=>verifyChromeReport(report,0,slugs.slice(0,5),worker,'e'.repeat(40),20),
    /SHA differs/);
});
test('reject green-but-skipped and incomplete browser evidence',()=>{
  const report=goodReport();
  report.schoolChecks[2].pass=false;
  assert.throws(()=>verifyChromeReport(report,0,slugs.slice(0,5),worker,sha,20));
  report.schoolChecks[2].pass=true;
  report.schoolChecks[2].slug='unassigned';
  assert.throws(()=>verifyChromeReport(report,0,slugs.slice(0,5),worker,sha,20));
  report.schoolChecks[2].slug=slugs[0];
  report.schoolChecks[2].width=390;
  assert.throws(()=>verifyChromeReport(report,0,slugs.slice(0,5),worker,sha,20),
    /viewport width/);
});
