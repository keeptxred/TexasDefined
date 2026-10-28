#!/usr/bin/env node
// Protect a Batch010 graduation: five real successful Chrome jobs, retained PNG
// artifacts, same source SHA, one live Worker and matching successful release.
// No roster, scored season, manual accessibility, media-rights or ADA claim.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
const REPO='keeptxred/TexasDefined';
const REGISTRY='docs/football-authority/REGISTRY.json';
const NAMES=['first','second','third','fourth','fifth'];
const COUNTIES=[5,5,3,5,4],SHOTS=[20,26,21,20,19];
const SHA=/^[a-f0-9]{40}$/;
const UUID=/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/;
const ROOT='https://github.com/'+REPO;
const gh=(path)=>JSON.parse(execFileSync('gh',['api',path],
  {encoding:'utf8',maxBuffer:8*1024*1024,timeout:30000}));
const read=(path)=>JSON.parse(readFileSync(path,'utf8'));
const groupLabel=(i)=>NAMES[i]+'-five';
const artifactName=(i)=>'football-b010-'+groupLabel(i)+'-production-chrome';
const workflow=(i)=>'verify-football-b010-'+groupLabel(i)+'-production.yml';
function pngs(dir){return readdirSync(dir,{withFileTypes:true}).reduce((n,e)=>n+
  (e.isDirectory()?pngs(join(dir,e.name)):(e.name.endsWith('.png')?1:0)),0);}
function reports(dir){const files=[];function walk(d){for(const e of readdirSync(d,{withFileTypes:true})){
  const p=join(d,e.name);if(e.isDirectory())walk(p);else if(e.name==='report.json')files.push(p);
}}walk(dir);return files;}

export function verifyChromeReport(report,i,slugs,worker,sha,screenshots) {
  assert.equal(report.version,1);
  assert.equal(report.technicalOnly,true);
  assert.ok(SHA.test(sha) && UUID.test(worker));
  assert.equal(report.sourceCommit,sha,'Browser SHA differs from the triggering production release');
  assert.deepEqual(report.workerVersions,[worker],'Every view must observe one real Worker');
  assert.deepEqual(report.failures,[],'Browser verifier reported failure');
  assert.deepEqual(report.sitemapMissing,[],'Sitemap coverage incomplete');
  assert.equal(report.schoolChecks?.length,15,'Five school pages times three viewports');
  assert.equal(report.countyChecks?.length,COUNTIES[i]);
  assert.equal(report.screenshots,SHOTS[i]);
  assert.equal(screenshots,SHOTS[i],'Real screenshot files are missing');
  const count=new Map();
  for(const row of report.schoolChecks) {
    assert.equal(row.pass,true);
    assert.deepEqual(row.issues,[]);
    assert.ok(slugs.includes(row.slug),'Unassigned school in Chrome evidence');
    count.set(row.slug,(count.get(row.slug)||0)+1);
  }
  assert.deepEqual(slugs.map(slug=>count.get(slug)),[3,3,3,3,3]);
  for(const row of report.countyChecks){assert.equal(row.pass,true);assert.deepEqual(row.issues,[]);}
  assert.equal(new Set(report.countyChecks.map(row=>row.county)).size,COUNTIES[i]);
}

export function graduateBatch010(reg,groups,worker,sha,deployRun,at) {
  assert.equal(reg.batch?.number,10);
  assert.equal(reg.batch.slugs?.length,25);
  assert.equal(reg.completedBatches.some(b=>b.number===10),false);
  assert.equal(reg.schoolRecords.filter(s=>s.status==='VERIFIED').length,205);
  assert.equal(reg.schoolRecords.filter(s=>s.status==='IMPLEMENTED'&&s.batch===10).length,25);
  assert.equal(reg.schoolRecords.filter(s=>s.status==='NOT_REVIEWED').length,1062);
  assert.equal(reg.batch.individuallyVerified,0);
  assert.equal(reg.batch.remainingToVerify,25);
  assert.ok(groups.length===5 && SHA.test(sha) && UUID.test(worker));
  assert.ok(Number.isSafeInteger(deployRun)&&deployRun>0);
  for(let i=0;i<5;i++) {
    const g=groups[i],slugs=reg.batch.slugs.slice(i*5,(i+1)*5);
    assert.equal(g.label,groupLabel(i));
    assert.deepEqual(g.schoolSlugs,slugs);
    assert.equal(g.schoolCasesPassed,15);
    assert.equal(g.countyCasesPassed,COUNTIES[i]);
    assert.equal(g.screenshotsSaved,SHOTS[i]);
    assert.equal(g.workerVersion,worker);
    assert.ok(Number.isSafeInteger(g.runId)&&g.runId>0);
    assert.ok(Number.isSafeInteger(g.artifactId)&&g.artifactId>0);
    assert.equal(g.runUrl,ROOT+'/actions/runs/'+g.runId);
    assert.equal(g.artifactUrl,g.runUrl+'/artifacts/'+g.artifactId);
    for(const slug of slugs) {
      const s=reg.schoolRecords.find(x=>x.slug===slug);
      assert.ok(s && s.batch===10 && s.status==='IMPLEMENTED' &&
        s.actualProductionVerified===false,'Cannot graduate an unsourced school: '+slug);
      Object.assign(s,{status:'VERIFIED',actualProductionVerified:true,
        productionVerifiedAt:at,technicalBrowserRun:g.runId,
        acceptanceEvidenceArtifact:g.artifactId,productionWorkerVersion:worker,
        verifiedDeploymentRun:deployRun,verifiedDeploymentGitSha:sha,
        manualAccessibilityAccepted:false,schoolPhotoReuseRightsAccepted:false,
        editorialHumanSignoff:false});
    }
  }
  const technicalAcceptance={schoolCount:25,viewports:[1366,390,320],
    schoolCasesPassed:75,schoolCasesFailed:0,countyCasesPassed:22,
    countyCasesFailed:0,screenshotsSaved:106,sitemapUrlsPassed:25,
    observedWorkerVersions:[worker],workerVersionMatchesDeploy:true,
    productionDeploymentRun:deployRun,productionDeploymentGitSha:sha,
    groups,editorialHumanSignoffsClaimed:0,manualAccessibilityAccepted:false,
    schoolPhotoReuseRightsAccepted:false,
    limitation:'Published Chrome technical release only; not a manual WCAG, coach audit, media-rights approval, ticket inventory, ADA or licensed scores claim.'};
  reg.completedBatches.push({number:10,slugs:[...reg.batch.slugs],
    state:'VERIFIED_BATCH_010_COMPLETE',dateAssigned:reg.batch.dateAssigned,
    verifiedAt:at,individuallyVerified:25,remainingAssigned:0,remainingToVerify:0,
    remainingToImplement:0,implementedOnBranch:25,protectedSourcePr:6204,
    technicalAcceptance,completionBasis:'Five actual non-skipped Chrome cohorts and archived PNG evidence, one matching Cloudflare Worker and successful source deployment.',
    noNextBatchAssigned:true});
  Object.assign(reg.batch,{state:'VERIFIED_BATCH_010_COMPLETE',
    individuallyVerified:25,remainingAssigned:0,remainingToVerify:0,
    remainingToImplement:0,currentSchool:null,nextSchool:null,verifiedAt:at,
    notes:'25/25 published-Chrome VERIFIED; Batch011 not yet assigned. Manual editorial, photographs, current scores and ADA access not certified.'});
  assert.equal(reg.schoolRecords.filter(s=>s.status==='VERIFIED').length,230);
  assert.equal(reg.schoolRecords.filter(s=>s.status==='IMPLEMENTED').length,0);
}
function findRuns(i) {
  const data=gh('repos/'+REPO+'/actions/workflows/'+workflow(i)+'/runs?per_page=65');
  return (data.workflow_runs||[]).filter(r=>r.status==='completed'&&
    r.conclusion==='success'&&r.head_branch==='main'&&SHA.test(r.head_sha||'')).slice(0,18);
}
function downloadActual(i,run,slugs,temp) {
  const data=gh('repos/'+REPO+'/actions/runs/'+run.id+'/artifacts');
  const a=data.artifacts?.find(a=>a.name===artifactName(i)&&a.expired===false&&
    Number.isSafeInteger(a.id)&&a.id>0);
  if(!a)return null; // Green skipped jobs never emitted PNG artifacts.
  const jobs=gh('repos/'+REPO+'/actions/runs/'+run.id+'/jobs?per_page=30');
  const performed=jobs.jobs?.some(job=>job.conclusion==='success' &&
    job.steps?.some(s=>s.name==='Install isolated Chrome driver'&&s.conclusion==='success') &&
    job.steps?.some(s=>s.name?.startsWith('Verify 5 school')&&s.conclusion==='success') &&
    job.steps?.some(s=>s.name==='Preserve success or failure evidence'&&s.conclusion==='success'));
  if(!performed)return null;
  const dir=join(temp,groupLabel(i)+'-'+run.id);
  execFileSync('gh',['run','download',String(run.id),'--repo',REPO,'--name',
    artifactName(i),'--dir',dir],{timeout:60000,maxBuffer:1024*1024});
  const found=reports(dir);
  assert.equal(found.length,1,'One distinct report.json per actual browser run');
  const report=read(found[0]);
  if(report.workerVersions?.length!==1)return null;
  const worker=report.workerVersions[0];
  verifyChromeReport(report,i,slugs,worker,run.head_sha,pngs(dir));
  return {sha:run.head_sha,worker,group:{label:groupLabel(i),
    schoolSlugs:slugs,runId:run.id,artifactId:a.id,
    runUrl:ROOT+'/actions/runs/'+run.id,
    artifactUrl:ROOT+'/actions/runs/'+run.id+'/artifacts/'+a.id,
    schoolCasesPassed:15,countyCasesPassed:COUNTIES[i],
    screenshotsSaved:SHOTS[i],workerVersion:worker}};
}
async function matchingRelease(sha,worker) {
  const data=gh('repos/'+REPO+'/actions/workflows/deploy-production.yml/runs?per_page=100');
  const matching=data.workflow_runs?.find(r=>r.head_sha===sha &&
    r.head_branch==='main'&&r.status==='completed'&&r.conclusion==='success');
  assert.ok(matching,'Cannot identify successful protected production deployment for Chrome source SHA');
  const account=process.env.CLOUDFLARE_ACCOUNT_ID;
  const token=process.env.CLOUDFLARE_DEPLOY_API_TOKEN;
  assert.ok(account&&token,'Cloudflare deployment identity credentials absent');
  const response=await fetch('https://api.cloudflare.com/client/v4/accounts/'+account+
    '/workers/scripts/texasdefined-site/deployments',{headers:{Authorization:'Bearer '+token},
      signal:AbortSignal.timeout(15000)});
  assert.equal(response.status,200,'Cloudflare deployment attestation endpoint not authorized');
  const dataCf=await response.json();
  assert.equal(dataCf.success,true);
  const latest=dataCf.result?.deployments?.[0];
  assert.equal(latest?.versions?.length,1);
  assert.equal(latest.versions[0].percentage,100);
  assert.equal(latest.versions[0].version_id,worker,
    'Cloudflare active published release differs from browser evidence');
  const live=await fetch('https://texasdefined.com/texas-high-school-football-teams/college-station',
    {redirect:'manual',signal:AbortSignal.timeout(15000)});
  assert.equal(live.status,200);
  assert.equal(live.headers.get('x-texasdefined-worker-version'),worker,
    'Live site identity does not match Cloudflare and Chrome reports');
  return matching.id;
}
function section(at,worker,sha,deploy,groups) {
  return ['## '+at+' — Batch 010 technical Chrome certification complete (25/25)',
    '',
    'Five genuine, non-skipped Chrome cohorts independently checked all 75 school viewports',
    '(1366/390/320), 22 reciprocal county views, 25 sitemap URLs, and preserved 106 PNG screenshots.',
    'Every report observed identical published Cloudflare Worker '+worker+'.',
    'A successful protected [production deployment]('+ROOT+'/actions/runs/'+deploy+
    ') on commit '+sha+' matches the active Cloudflare Worker and live canonical response.',
    '',
    ...groups.map(g=>'- '+g.label+': [Chrome run '+g.runId+']('+g.runUrl+
      '), [retained screenshot artifact '+g.artifactId+']('+g.artifactUrl+'); '+g.screenshotsSaved+' images.'),
    '',
    'Registry: 230 technical VERIFIED / 0 IMPLEMENTED / 1,062 NOT_REVIEWED.',
    'This does NOT certify human fact-by-fact review, school photo/mark rights, manual WCAG,',
    'stadium admission/ADA, current score-feed licensing or historical-team affiliation.',
    'Batch 011 has not been assigned.', ''].join('\n');
}
export async function main() {
  const reg=read(REGISTRY);
  if(reg.completedBatches.some(b=>b.number===10)||reg.batch.number!==10) {
    console.log('Batch010 inactive or already certified; no duplicate PR');return;
  }
  assert.equal(reg.schoolRecords.filter(s=>s.batch===10&&s.status==='IMPLEMENTED').length,25);
  const open=gh('repos/'+REPO+'/pulls?state=open&per_page=100');
  if(open.some(p=>p.title==='Certify Batch 010 from five real Chrome artifacts')) {
    console.log('Existing certification PR awaits protected checks; no duplicate');return;
  }
  const temp=mkdtempSync(join(tmpdir(),'football-b010-certificate-'));
  try {
    const chosen=[];
    for(let i=0;i<5;i++) {
      const slugs=reg.batch.slugs.slice(i*5,(i+1)*5);
      let found=null;
      for(const run of findRuns(i)) {
        try {found=downloadActual(i,run,slugs,temp);if(found)break;}
        catch(e){console.warn('Rejected '+NAMES[i]+' run '+run.id+': '+String(e.message).slice(0,180));}
      }
      if(!found){console.log('Waiting on real '+NAMES[i]+' Chrome and retained artifacts; no changes');return;}
      chosen.push(found);
    }
    if(chosen.some(x=>x.sha!==chosen[0].sha||x.worker!==chosen[0].worker)) {
      console.log('Five cohorts do not share one deployed source SHA and Worker; no changes');return;
    }
    const {sha,worker}=chosen[0];
    const deployment=await matchingRelease(sha,worker);
    const at=new Date().toISOString().slice(0,10);
    const groups=chosen.map(x=>x.group);
    graduateBatch010(reg,groups,worker,sha,deployment,at);
    writeFileSync(REGISTRY,JSON.stringify(reg,null,2)+'\n');
    const newSection=section(at,worker,sha,deployment,groups);
    for(const file of ['docs/football-authority/MASTER.md','docs/football-authority/PROGRESS.md']){
      const original=readFileSync(file,'utf8');
      const nl=original.indexOf('\n');
      assert.ok(nl>0&&original.startsWith('# '));
      writeFileSync(file,original.slice(0,nl+1)+'\n'+newSection+'\n'+original.slice(nl+1));
    }
    console.log('Ready to submit certification PR based on Chrome evidence from runs '+
      groups.map(x=>x.runId).join(','));
  } finally {rmSync(temp,{recursive:true,force:true});}
}
if(process.argv[1] && fileURLToPath(import.meta.url)===process.argv[1])
  main().catch(e=>{console.error('Technical certification rejected: '+e.message);process.exitCode=1;});
