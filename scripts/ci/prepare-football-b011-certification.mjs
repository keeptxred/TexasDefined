#!/usr/bin/env node
// Protect a Batch011 graduation: five real successful Chrome jobs, machine-readable Chrome
// reports, same source SHA, one live Worker and matching successful release.
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
const COUNTIES=[3,5,2,4,4];
const EXPECTED_COUNTY_SLUGS=[
  ['mitchell','colorado','comal'],
  ['bexar','comal','comanche','kendall','hunt'],
  ['hopkins','montgomery'],
  ['montgomery','bexar','limestone','delta'],
  ['dallas','coryell','bexar','nueces'],
];
const VIEWPORT_WIDTHS={desktop:1366,mobile:390,narrow:320};
const SHA=/^[a-f0-9]{40}$/;
const UUID=/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/;
const ROOT='https://github.com/'+REPO;
const gh=(path)=>JSON.parse(execFileSync('gh',['api',path],
  {encoding:'utf8',maxBuffer:8*1024*1024,timeout:30000}));
const read=(path)=>JSON.parse(readFileSync(path,'utf8'));
const groupLabel=(i)=>NAMES[i]+'-five';
const artifactName=(i)=>'football-b011-'+groupLabel(i)+'-production-chrome';
const workflow=(i)=>'verify-football-b011-'+groupLabel(i)+'-production.yml';
function reports(dir){const files=[];function walk(d){for(const e of readdirSync(d,{withFileTypes:true})){
  const p=join(d,e.name);if(e.isDirectory())walk(p);else if(e.name==='report.json')files.push(p);
}}walk(dir);return files;}

export function verifyChromeReport(report,i,slugs,worker,sha) {
  assert.equal(report.version,1);
  assert.equal(report.technicalOnly,true);
  assert.ok(SHA.test(sha) && UUID.test(worker));
  assert.equal(report.sourceCommit,sha,'Browser SHA differs from the triggering production release');
  assert.deepEqual(report.workerVersions,[worker],'Every view must observe one real Worker');
  assert.deepEqual(report.failures,[],'Browser verifier reported failure');
  assert.deepEqual(report.sitemapMissing,[],'Sitemap coverage incomplete');
  assert.equal(report.schoolChecks?.length,15,'Five school pages times three viewports');
  assert.equal(report.countyChecks?.length,COUNTIES[i]);
  const count=new Map();
  for(const row of report.schoolChecks) {
    assert.equal(row.pass,true);
    assert.deepEqual(row.issues,[]);
    assert.ok(slugs.includes(row.slug),'Unassigned school in Chrome evidence');
    assert.ok(Object.hasOwn(VIEWPORT_WIDTHS,row.device),'Unexpected viewport device');
    assert.equal(row.width,VIEWPORT_WIDTHS[row.device],'Mismatched Chrome viewport width');
    const key=row.slug+'/'+row.device;
    count.set(key,(count.get(key)||0)+1);
  }
  for(const slug of slugs)
    assert.deepEqual(['desktop','mobile','narrow'].map(d=>count.get(slug+'/'+d)),
      [1,1,1],'Each school needs one 1366, 390 and 320 viewport');
  for(const row of report.countyChecks){assert.equal(row.pass,true);assert.deepEqual(row.issues,[]);}
  assert.deepEqual(report.countyChecks.map(row=>row.county).sort(),
    [...EXPECTED_COUNTY_SLUGS[i]].sort(),'Exact distinct linked counties required');
}

export function graduateBatch011(reg,groups,worker,sha,deployRun,at) {
  assert.equal(reg.batch?.number,11);
  assert.equal(reg.batch.slugs?.length,25);
  assert.equal(reg.completedBatches.some(b=>b.number===11),false);
  assert.equal(reg.schoolRecords.filter(s=>s.status==='VERIFIED').length,230);
  assert.equal(reg.schoolRecords.filter(s=>s.status==='IMPLEMENTED'&&s.batch===11).length,25);
  assert.equal(reg.schoolRecords.filter(s=>s.status==='NOT_REVIEWED').length,1037);
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
    assert.equal(g.workerVersion,worker);
    assert.ok(Number.isSafeInteger(g.runId)&&g.runId>0);
    assert.ok(Number.isSafeInteger(g.artifactId)&&g.artifactId>0);
    assert.equal(g.runUrl,ROOT+'/actions/runs/'+g.runId);
    assert.equal(g.artifactUrl,g.runUrl+'/artifacts/'+g.artifactId);
    for(const slug of slugs) {
      const s=reg.schoolRecords.find(x=>x.slug===slug);
      assert.ok(s && s.batch===11 && s.status==='IMPLEMENTED' &&
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
    schoolCasesPassed:75,schoolCasesFailed:0,countyCasesPassed:18,
    countyCasesFailed:0,sitemapUrlsPassed:25,
    observedWorkerVersions:[worker],workerVersionMatchesDeploy:true,
    productionDeploymentRun:deployRun,productionDeploymentGitSha:sha,
    groups,editorialHumanSignoffsClaimed:0,manualAccessibilityAccepted:false,
    schoolPhotoReuseRightsAccepted:false,
    limitation:'Published Chrome technical release only; not a manual WCAG, coach audit, media-rights approval, ticket inventory, ADA or licensed scores claim.'};
  reg.completedBatches.push({number:11,slugs:[...reg.batch.slugs],
    state:'VERIFIED_BATCH_011_COMPLETE',dateAssigned:reg.batch.dateAssigned,
    verifiedAt:at,individuallyVerified:25,remainingAssigned:0,remainingToVerify:0,
    remainingToImplement:0,implementedOnBranch:25,protectedSourcePr:null,sourceCohortScope:'Five protected school-source cohorts recorded in Batch011 dossiers',
    technicalAcceptance,completionBasis:'Five actual non-skipped Chrome cohorts and validated machine-readable reports, one matching Cloudflare Worker and successful source deployment.',
    noNextBatchAssigned:true});
  Object.assign(reg.batch,{state:'VERIFIED_BATCH_011_COMPLETE',
    individuallyVerified:25,remainingAssigned:0,remainingToVerify:0,
    remainingToImplement:0,currentSchool:null,nextSchool:null,verifiedAt:at,
    notes:'25/25 published-Chrome VERIFIED; Batch011 not yet assigned. Manual editorial, photographs, current scores and ADA access not certified.'});
  assert.equal(reg.schoolRecords.filter(s=>s.status==='VERIFIED').length,255);
  assert.equal(reg.schoolRecords.filter(s=>s.status==='IMPLEMENTED').length,0);
}
function findRuns(i) {
  // Query bounded report-bearing artifacts first: GitHub reports a green workflow
  // when the actual Chrome steps are SKIPPED. Avoid up to 90 unnecessary API
  // calls for green-but-skipped runs; they have no report-bearing artifacts.
  const artifacts=gh('repos/'+REPO+'/actions/artifacts?name='+
    encodeURIComponent(artifactName(i))+'&per_page=100');
  const proofByRun=new Map((artifacts.artifacts||[]).filter(a=>
    a.expired===false && a.name===artifactName(i) &&
    Number.isSafeInteger(a.id) && a.id>0 &&
    Number.isSafeInteger(a.workflow_run?.id)).map(a=>[a.workflow_run.id,a]));
  const data=gh('repos/'+REPO+'/actions/workflows/'+workflow(i)+'/runs?per_page=65');
  return (data.workflow_runs||[]).filter(r=>r.status==='completed'&&
    r.conclusion==='success'&&r.head_branch==='main'&&
    SHA.test(r.head_sha||'')&&proofByRun.has(r.id))
    .slice(0,8).map(run=>({...run,certificateArtifact:proofByRun.get(run.id)}));
}
// Prefer the newest release shared by all five cohorts, but never require
// each cohort's individually newest run to be from that release.
export function sharedReleaseShas(recent) {
  assert.equal(recent.length,5,'Exactly five independent Chrome cohorts required');
  const intersection=new Set(recent[0].map(r=>r.head_sha).filter(x=>SHA.test(x||'')));
  for(const cohort of recent.slice(1)) {
    const shas=new Set(cohort.map(r=>r.head_sha));
    for(const sha of intersection) if(!shas.has(sha))intersection.delete(sha);
  }
  return [...intersection].sort((a,b)=>{
    const stamp=(sha)=>Math.max(...recent.flat().filter(r=>r.head_sha===sha)
      .map(r=>Date.parse(r.created_at||'')||0));
    return stamp(b)-stamp(a);
  });
}
// Keep source SHA AND deployed Worker identity consistent. A GitHub workflow
// can republish the same commit to two different Worker versions, so choosing
// only the newest per cohort can conceal a complete earlier exact-version set.
export function selectCommonWorkerReports(options) {
  assert.equal(options.length,5,'Five Chrome cohort option lists are required');
  for(const first of options[0]) {
    if(!SHA.test(first.sha||'') || !UUID.test(first.worker||''))continue;
    const selected=[first];
    for(const cohort of options.slice(1)) {
      const matching=cohort.find(o=>o.sha===first.sha && o.worker===first.worker);
      if(!matching)break;
      selected.push(matching);
    }
    if(selected.length===5)return selected;
  }
  return null;
}
export function reportReleaseIdentity(report) {
  const sha=report?.sourceCommit, worker=report?.workerVersions?.[0];
  assert.ok(SHA.test(sha||''),'Chrome report requires an exact verified source commit');
  assert.ok(UUID.test(worker||''),'Chrome report requires a real observed Worker UUID');
  assert.equal(report?.workerVersions?.length,1,'Multiple Worker versions were observed');
  return {sha,worker};
}
export function trustedReleasePairs(deployments) {
  const pairs=new Set();
  for(const d of deployments||[]) {
    let p=d.payload;
    if(typeof p==='string'){try{p=JSON.parse(p);}catch{continue;}}
    if(d.environment==='texasdefined-verified-worker' && p &&
       SHA.test(d.sha||'') && d.sha===p.commit_sha &&
       UUID.test(p.worker_version||'') &&
       Number.isFinite(Date.parse(p.verified_at||''))) {
      pairs.add(d.sha+'|'+p.worker_version);
    }
  }
  return pairs;
}
function downloadActual(i,run,slugs,temp) {
  const a=run.certificateArtifact;
  assert.ok(a?.workflow_run?.id===run.id &&
    a.name===artifactName(i) && a.expired===false,
    'Chrome report artifact must originate from the exact successful run');
  if(!a)return null; // Green skipped jobs never emitted Chrome reports.
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
  // An action's triggering SHA can differ from the live-published source
  // during rapid deployments. The Chrome report must carry its independent
  // verified-Worker-ledger pinned source SHA; never substitute run.head_sha.
  const {sha,worker}=reportReleaseIdentity(report);
  verifyChromeReport(report,i,slugs,worker,sha);
  const verifyStep=jobs.jobs?.flatMap(j=>j.steps||[]).find(x=>
    x.name?.startsWith('Verify 5 school') && x.conclusion==='success');
  assert.ok(Number.isFinite(Date.parse(verifyStep?.started_at)) &&
    Number.isFinite(Date.parse(verifyStep?.completed_at)),
    'Actual Chrome verification step must have GitHub signed timestamps');
  return {sha,worker,
    browserStartedAt:verifyStep.started_at,
    browserCompletedAt:verifyStep.completed_at,
    group:{label:groupLabel(i),
    schoolSlugs:slugs,runId:run.id,artifactId:a.id,
    runUrl:ROOT+'/actions/runs/'+run.id,
    artifactUrl:ROOT+'/actions/runs/'+run.id+'/artifacts/'+a.id,
    schoolCasesPassed:15,countyCasesPassed:COUNTIES[i],
    workerVersion:worker}};
}
// A newer TexasDefined deploy does not erase proven browser acceptance of
// an older live release. Verify the historical 100% Cloudflare deployment
// window in which *all five actual Chrome steps ran*, not the current Worker.
export function attestWorkerWindow(deployments,worker,observations) {
  assert.ok(UUID.test(worker),'Worker ID must be a real UUID');
  assert.ok(Array.isArray(observations) && observations.length===5,
    'A complete 5-cohort Chrome observation set is required');
  const rows=[...deployments].sort((a,b)=>Date.parse(b.created_on)-Date.parse(a.created_on));
  for(let i=0;i<rows.length;i++){
    const deployment=rows[i];
    if(deployment.versions?.length!==1 ||
      deployment.versions[0].percentage!==100 ||
      deployment.versions[0].version_id!==worker)continue;
    const start=Date.parse(deployment.created_on);
    const next=i===0?Infinity:Date.parse(rows[i-1].created_on);
    if(!Number.isFinite(start)||!(next>start))continue;
    if(observations.every(x=>{
      const from=Date.parse(x.browserStartedAt);
      const to=Date.parse(x.browserCompletedAt);
      return Number.isFinite(from)&&Number.isFinite(to)&&
        from>=start&&to>=from&&to<next;
    }))return {id:deployment.id,createdOn:deployment.created_on,
      nextDeploymentAt:Number.isFinite(next)?new Date(next).toISOString():null,
      wasActiveAtVerification:true};
  }
  return null;
}

// The site's existing verified-worker deployment ledger is the source of truth
// for git SHA ↔ Worker version provenance. A Chrome job checks the public URL,
// but workflow_run.head_sha alone NEVER proves which commit built that Worker.
// The ledger is emitted by the actual production job only after its runtime
// validation succeeds, with both commit SHA and Wrangler version ID.
export function selectVerifiedWorkerLedger(deployments,sha,worker,oldestBrowserStart,activeFrom) {
  assert.ok(SHA.test(sha) && UUID.test(worker));
  const earliest=Date.parse(oldestBrowserStart);
  const published=Date.parse(activeFrom);
  if(!Number.isFinite(earliest)||!Number.isFinite(published) || earliest<published)
    return null;
  for(const d of deployments||[]) {
    let payload=d.payload;
    if(typeof payload==='string'){
      try{payload=JSON.parse(payload);}catch{continue;}
    }
    if(!payload || typeof payload!=='object')continue;
    if(d.sha!==sha || d.environment!=='texasdefined-verified-worker' ||
      payload.commit_sha!==sha || payload.worker_version!==worker ||
      !/^[1-9][0-9]*$/.test(String(payload.source_run_id||'')) ||
      !Number.isSafeInteger(Number(payload.source_run_id)) ||
      !Number.isSafeInteger(d.id) || d.id<=0)continue;
    const verified=Date.parse(payload.verified_at||'');
    // GitHub's attestation must happen after this Worker was actually
    // deployed, and before the first rendered Chrome verification began.
    if(Number.isFinite(verified) && verified>=published && verified<=earliest)
      return {ledgerDeploymentId:d.id,runId:Number(payload.source_run_id),
        verifiedAt:payload.verified_at};
  }
  return null;
}
async function matchingRelease(sha,worker,observations) {
  const account=process.env.CLOUDFLARE_ACCOUNT_ID;
  const token=process.env.CLOUDFLARE_DEPLOY_API_TOKEN;
  assert.ok(account&&token,'Cloudflare release-identity credentials unavailable');
  // One bounded history query; do not poll, reconnect or scan the account.
  const response=await fetch('https://api.cloudflare.com/client/v4/accounts/'+account+
    '/workers/scripts/texasdefined-site/deployments?per_page=100&page=1',
    {headers:{Authorization:'Bearer '+token},signal:AbortSignal.timeout(15000)});
  assert.equal(response.status,200,'Cloudflare deployments read unavailable');
  const cf=await response.json();
  assert.equal(cf.success,true,'Cloudflare deployments API returned an error');
  const window=attestWorkerWindow(cf.result?.deployments||[],worker,observations);
  if(!window){
    console.log('DEFER: five Chrome reports do not fit a historical 100% Cloudflare deployment window. Do not certify.');
    return null;
  }
  const oldest=Math.min(...observations.map(x=>Date.parse(x.browserStartedAt)));
  const ledgerData=gh('repos/'+REPO+
    '/deployments?environment=texasdefined-verified-worker&per_page=100');
  const ledger=selectVerifiedWorkerLedger(ledgerData,sha,worker,
    new Date(oldest).toISOString(),window.createdOn);
  if(!ledger){
    console.log('DEFER: actual production verified-Worker ledger does not prove the Chrome source SHA built that Worker.');
    return null;
  }
  const statuses=gh('repos/'+REPO+'/deployments/'+ledger.ledgerDeploymentId+
    '/statuses?per_page=1');
  if(!Array.isArray(statuses) || statuses[0]?.state!=='success'){
    console.log('DEFER: matching verified-Worker deployment status is not successful.');
    return null;
  }
  const run=gh('repos/'+REPO+'/actions/runs/'+ledger.runId);
  if(run?.head_sha!==sha || run?.head_branch!=='main' ||
     run?.status!=='completed' || run?.conclusion!=='success'){
    console.log('DEFER: verified-Worker ledger does not reference a successful exact-commit production run.');
    return null;
  }
  return {runId:ledger.runId,ledgerDeploymentId:ledger.ledgerDeploymentId,
    ledgerVerifiedAt:ledger.verifiedAt,cloudflare:window};
}

function section(at,worker,sha,deploy,groups,cloudflare,ledgerId) {
  return ['## '+at+' — Batch 011 technical Chrome certification complete (25/25)',
    '',
    'Five genuine, non-skipped Chrome cohorts independently checked all 75 school viewports',
    '(1366/390/320), 18 reciprocal county views and 25 sitemap URLs, with validated JSON evidence.',
    'Every report observed identical published Cloudflare Worker '+worker+'.',
    'The Cloudflare deployment '+cloudflare.id+' served it at 100% during all five',
    'real Chrome verification windows. GitHub verified-Worker ledger deployment '+ledgerId+
    ' independently binds the exact source commit to that Worker. Starting '+cloudflare.createdOn+
    (cloudflare.nextDeploymentAt?'; superseded '+cloudflare.nextDeploymentAt+'.':'; still latest in deployment history.'),
    'Successful protected [production deployment]('+ROOT+'/actions/runs/'+deploy+
    ') on commit '+sha+' completed before live browser checks.',
    'This is historical production evidence, not a claim that the Worker is still active.',
    '',
    ...groups.map(g=>'- '+g.label+': [Chrome run '+g.runId+']('+g.runUrl+
      '), [Chrome JSON evidence artifact '+g.artifactId+']('+g.artifactUrl+').'),
    '',
    'Registry: 255 technical VERIFIED / 0 IMPLEMENTED / 1,037 NOT_REVIEWED.',
    'This does NOT certify human fact-by-fact review, school photo/mark rights, manual WCAG,',
    'stadium admission/ADA, current score-feed licensing or historical-team affiliation.',
    'Batch 012 has not been assigned.', ''].join('\n');
}
export async function main() {
  const reg=read(REGISTRY);
  if(reg.completedBatches.some(b=>b.number===11)||reg.batch.number!==11) {
    console.log('Batch011 inactive or already certified; no duplicate PR');return;
  }
  assert.equal(reg.schoolRecords.filter(s=>s.batch===11&&s.status==='IMPLEMENTED').length,25);
  const open=gh('repos/'+REPO+'/pulls?state=open&per_page=100');
  if(open.some(p=>p.title==='Certify Batch 011 from five real Chrome artifacts')) {
    console.log('Existing certification PR awaits protected checks; no duplicate');return;
  }
  const temp=mkdtempSync(join(tmpdir(),'football-b011-certificate-'));
  try {
    // A workflow_run HEAD SHA is NOT the source of the public Worker during
    // overlapping releases. Select only actual artifacts whose REPORT pinned
    // source + observed Worker pair exists in the trusted GitHub ledger.
    // This also allows scheduled cohorts with different trigger SHAs to
    // correctly converge on the same deployed source.
    const ledger=gh('repos/'+REPO+
      '/deployments?environment=texasdefined-verified-worker&per_page=100');
    const trusted=trustedReleasePairs(ledger);
    if(!trusted.size){
      console.log('No verifiable published Worker/source ledger yet; no certificate');
      return;
    }
    const options=[];
    for(let i=0;i<5;i++){
      const slugs=reg.batch.slugs.slice(i*5,i*5+5);
      const valid=[];
      for(const run of findRuns(i)){
        try {
          const proof=downloadActual(i,run,slugs,temp);
          if(proof && trusted.has(proof.sha+'|'+proof.worker)) valid.push(proof);
        }catch(e){
          console.warn('Rejected cohort '+NAMES[i]+' run '+run.id+': '+
            String(e.message).slice(0,180));
        }
      }
      if(!valid.length){
        console.log('No verified-release matching Chrome reports for '+NAMES[i]+
          '; no status changed');
        return;
      }
      options.push(valid);
    }
    const chosen=selectCommonWorkerReports(options);
    if(!chosen){
      console.log('No common ledger-attested source commit AND Worker across five cohorts');
      return;
    }
    const {sha,worker}=chosen[0];
    const deployment=await matchingRelease(sha,worker,chosen);
    if(!deployment)return; // Expected release churn is not a failed certification.
    const at=new Date().toISOString().slice(0,10);
    const groups=chosen.map(x=>x.group);
    graduateBatch011(reg,groups,worker,sha,deployment.runId,at);
    const accepted=reg.completedBatches.find(x=>x.number===11);
    accepted.technicalAcceptance.cloudflareDeploymentId=deployment.cloudflare.id;
    accepted.technicalAcceptance.githubWorkerLedgerDeploymentId=deployment.ledgerDeploymentId;
    accepted.technicalAcceptance.githubWorkerLedgerVerifiedAt=deployment.ledgerVerifiedAt;
    accepted.technicalAcceptance.cloudflareActiveFrom=deployment.cloudflare.createdOn;
    accepted.technicalAcceptance.cloudflareReplacedAt=deployment.cloudflare.nextDeploymentAt;
    accepted.technicalAcceptance.verificationObservationWindow=chosen.map((x,i)=>({
      cohort:NAMES[i],browserStartedAt:x.browserStartedAt,
      browserCompletedAt:x.browserCompletedAt,runId:x.group.runId
    }));
    writeFileSync(REGISTRY,JSON.stringify(reg,null,2)+'\n');
    const newSection=section(at,worker,sha,deployment.runId,groups,deployment.cloudflare,
      deployment.ledgerDeploymentId);
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
