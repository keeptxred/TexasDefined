#!/usr/bin/env node
// Fail-closed Batch015 certification proposal. No source/Worker/Chrome evidence -> no changes.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync,mkdtempSync,rmSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {B015_SLUGS,certifiedBatch015} from './verified-football-b015-certificate.mjs';

const REPO='keeptxred/TexasDefined', SRC='0621a3412f83ed207844af3159e96cfd7e0bd4ed';
const WORKER='94032994-ad0d-4655-8a6e-bd9afe0b0a1d', RUN=42495534916;
const ARTIFACT=13623152274, LEDGER=7637951033, DEPLOY_RUN=42494843680;
const CF_ID='6c12efe6-796f-47ac-a67b-15e344d3cd12';
const ARTIFACT_NAME='football-b015-25-school-live-chrome-evidence';
const ROOT='https://github.com/'+REPO;
const gh=p=>JSON.parse(execFileSync('gh',['api',p],{encoding:'utf8',timeout:40000,maxBuffer:1e7}));
const regPath='docs/football-authority/REGISTRY.json';
const reg=JSON.parse(readFileSync(regPath,'utf8'));
assert.equal(reg.schoolRecords.length,1292);
assert.equal(reg.batch?.number,15);
if(reg.completedBatches.some(b=>b.number===15)){
  assert.equal(certifiedBatch015(reg),true,'Prior Batch015 certified state invalid');
  console.log('Already certified; no changes.');
  process.exit(0);
}
assert.deepEqual(reg.batch.slugs,B015_SLUGS);
assert.equal(reg.schoolRecords.filter(r=>r.status==='VERIFIED').length,330);
assert.equal(reg.schoolRecords.filter(r=>r.status==='NOT_REVIEWED').length,962);
assert.equal(reg.schoolRecords.filter(r=>r.status==='IMPLEMENTED').length,0);
assert.equal(reg.schoolRecords.filter(r=>r.batch===15).length,25);
for(const slug of B015_SLUGS){
  const row=reg.schoolRecords.find(r=>r.slug===slug);
  assert.ok(row?.batch===15 && row.status==='NOT_REVIEWED' &&
    row.actualProductionVerified!==true,'Uncertifiable roster record: '+slug);
}
const run=gh('repos/'+REPO+'/actions/runs/'+RUN);
assert.equal(run.head_sha,SRC);
assert.equal(run.head_branch,'main');
assert.equal(run.status,'completed');
assert.equal(run.conclusion,'success');
const jobs=gh('repos/'+REPO+'/actions/runs/'+RUN+'/jobs?per_page=100').jobs;
const job=jobs.find(j=>j.name==='chrome'&&j.conclusion==='success');
assert.ok(job,'Actual non-skipped Chrome job absent');
for(const name of ['Resolve exact live Worker to verified GitHub source SHA',
 'Verify all Batch015 schools and counties in real Chrome',
 'Upload compact Batch015 machine evidence'])
 assert.ok(job.steps?.some(s=>s.name===name&&s.conclusion==='success'),
 'Mandatory production Chrome step absent: '+name);
const artifacts=gh('repos/'+REPO+'/actions/runs/'+RUN+'/artifacts?per_page=100').artifacts||[];
assert.ok(artifacts.some(a=>a.id===ARTIFACT&&a.name===ARTIFACT_NAME&&!a.expired),
 'Immutable 76-file Chrome artifact missing');
const production=gh('repos/'+REPO+'/actions/runs/'+DEPLOY_RUN);
assert.equal(production.head_sha,SRC);
assert.equal(production.conclusion,'success');
const dep=gh('repos/'+REPO+'/deployments/'+LEDGER);
const payload=typeof dep.payload==='string'?JSON.parse(dep.payload):dep.payload;
assert.equal(dep.sha,SRC);
assert.equal(dep.environment,'texasdefined-verified-worker');
assert.equal(payload?.worker_version,WORKER);
assert.equal(payload?.commit_sha,SRC);
assert.equal(Number(payload?.source_run_id),DEPLOY_RUN);
assert.equal(gh('repos/'+REPO+'/deployments/'+LEDGER+'/statuses?per_page=1')[0]?.state,
 'success','Source-matched verified Worker ledger missing');
assert.ok(Date.parse(payload.verified_at)<=Date.parse(job.started_at),
 'Ledger was signed too late for Chrome');
const account=process.env.CLOUDFLARE_ACCOUNT_ID;
const token=process.env.CLOUDFLARE_DEPLOY_API_TOKEN;
assert.ok(account&&token,'Existing read-only Cloudflare release verification secrets required');
const resp=await fetch('https://api.cloudflare.com/client/v4/accounts/'+account+
 '/workers/scripts/texasdefined-site/deployments?per_page=100&page=1',
 {headers:{Authorization:'Bearer '+token},signal:AbortSignal.timeout(16000)});
assert.equal(resp.status,200,'Cloudflare deployment read not authenticated');
const body=await resp.json();
assert.equal(body.success,true);
const deployments=[...(body.result?.deployments||[])].sort((a,b)=>
 Date.parse(b.created_on)-Date.parse(a.created_on));
const idx=deployments.findIndex(d=>d.id===CF_ID);
assert.ok(idx>=0,'Cloudflare source-matched deployment not found');
const cf=deployments[idx];
assert.deepEqual(cf.versions?.map(x=>[x.version_id,x.percentage]),[[WORKER,100]]);
const start=Date.parse(job.started_at),end=Date.parse(job.completed_at);
const published=Date.parse(cf.created_on);
const superseded=idx===0?Infinity:Date.parse(deployments[idx-1].created_on);
assert.ok(start>=published&&end>=start&&end<superseded,
 'Chrome screenshots do not correspond to this 100% Worker release');
const temp=mkdtempSync(join(tmpdir(),'football-b015-signed-'));
try{
  execFileSync('gh',['run','download',String(RUN),'--repo',REPO,
   '--name',ARTIFACT_NAME,'--dir',temp],{timeout:90000});
  const path=join(temp,'b015-chrome-report.json');
  assert.ok(existsSync(path),'Real Chrome JSON report absent');
  const p=JSON.parse(readFileSync(path,'utf8'));
  assert.equal(p.batch,15);
  assert.equal(p.technicalOnly,true);
  assert.equal(p.sourceCommit,SRC);
  assert.equal(p.workerVersion,WORKER);
  assert.deepEqual(p.schoolSlugs,B015_SLUGS);
  assert.deepEqual(p.failures,[]);
  assert.equal(p.schoolChecks?.length,75);
  assert.equal(p.countyChecks?.length,25);
  assert.equal(p.screenshots?.length,75);
  const views=new Set(),screens=new Set(),counties=new Set();
  for(const c of p.schoolChecks){
   assert.equal(c.pass,true);
   assert.ok(B015_SLUGS.includes(c.slug));
   assert.ok([1366,390,320].includes(c.width));
   assert.match(c.county,/^\/county\/[a-z0-9-]+\/?$/);
   assert.ok(!views.has(c.slug+'/'+c.width),'Duplicate viewport');
   views.add(c.slug+'/'+c.width);
  }
  for(const c of p.countyChecks){
   assert.equal(c.pass,true);
   assert.ok(B015_SLUGS.includes(c.slug));
   assert.ok(!counties.has(c.slug),'Duplicate county evidence');
   counties.add(c.slug);
   assert.equal(c.county,p.schoolChecks.find(x=>x.slug===c.slug&&x.width===1366)?.county);
  }
  for(const c of p.screenshots){
   assert.ok(B015_SLUGS.includes(c.slug));
   assert.ok([1366,390,320].includes(c.width));
   assert.ok(!screens.has(c.slug+'/'+c.width),'Duplicate screenshot');
   screens.add(c.slug+'/'+c.width);
  }
  for(const slug of B015_SLUGS){
   assert.ok(counties.has(slug),'County missing '+slug);
   for(const width of [1366,390,320]){
    assert.ok(views.has(slug+'/'+width),'Viewport missing '+slug+'/'+width);
    assert.ok(screens.has(slug+'/'+width),'Screenshot missing '+slug+'/'+width);
   }
  }
}finally{rmSync(temp,{recursive:true,force:true});}
const at=new Date().toISOString().slice(0,10);
const limitation='Automated browser technical acceptance only: no current scores, school photo rights, manual WCAG, human editorial review, or ADA/parking clearance.';
const proof={
 schoolCount:25,viewports:[1366,390,320],
 schoolCasesPassed:75,schoolCasesFailed:0,countyCasesPassed:25,countyCasesFailed:0,
 observedWorkerVersions:[WORKER],workerVersionMatchesDeploy:true,
 productionDeploymentGitSha:SRC,chromeRunId:RUN,chromeArtifactId:ARTIFACT,
 browserExecutionCount:1,githubWorkerLedgerDeploymentId:LEDGER,
 cloudflareDeploymentId:CF_ID,chromeRunUrl:ROOT+'/actions/runs/'+RUN,
 chromeArtifactUrl:ROOT+'/actions/runs/'+RUN+'/artifacts/'+ARTIFACT,
 cloudflareActiveFrom:cf.created_on,
 verificationObservationWindow:[{browserStartedAt:job.started_at,browserCompletedAt:job.completed_at,runId:RUN}],
 editorialHumanSignoffsClaimed:0,manualAccessibilityAccepted:false,
 schoolPhotoReuseRightsAccepted:false,limitation
};
for(const slug of B015_SLUGS){
 const row=reg.schoolRecords.find(r=>r.slug===slug);
 Object.assign(row,{status:'VERIFIED',actualProductionVerified:true,
  productionVerifiedAt:at,technicalBrowserRun:RUN,acceptanceEvidenceArtifact:ARTIFACT,
  productionWorkerVersion:WORKER,verifiedDeploymentGitSha:SRC,
  verifiedGithubWorkerLedgerDeploymentId:LEDGER,
  manualAccessibilityAccepted:false,schoolPhotoReuseRightsAccepted:false,
  editorialHumanSignoff:false,technicalCertificationNotes:limitation});
}
Object.assign(reg.batch,{
 state:'VERIFIED_BATCH_015_COMPLETE',individuallyVerified:25,
 remainingAssigned:0,implementedOnBranch:25,remainingToImplement:0,remainingToVerify:0,
 notes:'One verified signed 75+25 source-matched production Chrome run; technical certification only.',
 verifiedAt:at,technicalAcceptance:proof,noNextBatchAssigned:true,
 completionBasis:'One genuine non-skipped Chrome run with 75 screenshots and 25 reciprocal county links, exact signed release and authenticated Cloudflare Worker.'
});
reg.completedBatches.push(JSON.parse(JSON.stringify(reg.batch)));
assert.equal(reg.schoolRecords.filter(r=>r.status==='VERIFIED').length,355);
assert.equal(reg.schoolRecords.filter(r=>r.status==='NOT_REVIEWED').length,937);
assert.equal(reg.schoolRecords.filter(r=>r.status==='IMPLEMENTED').length,0);
assert.equal(certifiedBatch015(reg),true,'Complete strict Batch015 certificate refused');
writeFileSync(regPath,JSON.stringify(reg,null,2)+'\n');
const note='## '+at+' — Batch015 signed technical Chrome acceptance (25 schools)\n\n'+
 'Genuine non-skipped run '+ROOT+'/actions/runs/'+RUN+' passed 75/75 school viewports, '+
 '25/25 county reciprocal links, and saved 75 screenshots with zero failures. '+
 'Artifact '+ROOT+'/actions/runs/'+RUN+'/artifacts/'+ARTIFACT+
 '. Source '+SRC+', Worker '+WORKER+', signed ledger '+LEDGER+
 ', Cloudflare 100% deployment '+CF_ID+'. Preserve 330 historical verified records, '+
 'now 355 VERIFIED / 937 NOT_REVIEWED. No Batch016 assigned. '+
 limitation+' Protected evidence-only PR; not merged until required CI passes.\n\n';
const progress='docs/football-authority/PROGRESS.md';
writeFileSync(progress,note+readFileSync(progress,'utf8'));
console.log('READY evidence-only Batch015 graduation; protected PR required.');
