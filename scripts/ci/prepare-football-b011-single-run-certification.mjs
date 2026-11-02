#!/usr/bin/env node
// Single Chrome job acceptance: no five-independent-cohort gate or PNG count.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {graduateBatch011,verifyChromeReport,attestWorkerWindow,selectVerifiedWorkerLedger} from './prepare-football-b011-certification.mjs';
const repo='keeptxred/TexasDefined';
const gh=p=>JSON.parse(execFileSync('gh',['api',p],{encoding:'utf8',timeout:30000,maxBuffer:10e6}));
const regPath='docs/football-authority/REGISTRY.json';
const reg=JSON.parse(readFileSync(regPath,'utf8'));
if(reg.batch?.number!==11||reg.completedBatches.some(b=>b.number===11)){
  console.log('Batch011 not pending');process.exit(0);
}
const title='Certify Batch 011 from one real 25-school Chrome run';
const open=gh('repos/'+repo+'/pulls?state=open&per_page=100');
if(open.some(p=>p.title===title)){console.log('Evidence-only PR already pending');process.exit(0);}
const artifactName='football-b011-all-schools-production-chrome';
const artifacts=gh('repos/'+repo+'/actions/artifacts?name='+artifactName+'&per_page=100').artifacts||[];
const tmp=mkdtempSync(join(tmpdir(),'td-b011-single-'));
try{
  let accepted=null;
  for(const a of artifacts.filter(a=>!a.expired&&a.name===artifactName)){
    try{
      const run=gh('repos/'+repo+'/actions/runs/'+a.workflow_run.id);
      if(run.status!=='completed'||run.conclusion!=='success'||run.head_branch!=='main')continue;
      const jobs=gh('repos/'+repo+'/actions/runs/'+run.id+'/jobs?per_page=30').jobs||[];
      const step=jobs.flatMap(j=>j.steps||[]).find(s=>s.name?.startsWith('Verify all 25 schools')&&s.conclusion==='success');
      if(!step||!jobs.some(j=>j.conclusion==='success'&&j.steps?.some(s=>s.name?.startsWith('Install one isolated Chrome driver')&&s.conclusion==='success')))continue;
      const dir=join(tmp,String(run.id));
      execFileSync('gh',['run','download',String(run.id),'--repo',repo,'--name',artifactName,'--dir',dir],{timeout:60000});
      const summary=JSON.parse(readFileSync(join(dir,'b011-single-run-summary.json'),'utf8'));
      const sha=summary.sourceCommit,worker=summary.workerVersion;
      assert.match(sha,/^[a-f0-9]{40}$/);assert.match(worker,/^[a-f0-9-]{36}$/);
      assert.equal(summary.schoolCasesPassed,75);assert.equal(summary.countyCasesPassed,18);
      assert.deepEqual(summary.schoolSlugs,reg.batch.slugs);
      const groups=[];
      for(let i=0;i<5;i++){
        const name=['first','second','third','fourth','fifth'][i];
        const report=JSON.parse(readFileSync(join(dir,'b011-'+name+'-five-production-chrome/report.json'),'utf8'));
        const slugs=reg.batch.slugs.slice(i*5,(i+1)*5);
        verifyChromeReport(report,i,slugs,worker,sha);
        groups.push({label:name+'-five',schoolSlugs:slugs,runId:run.id,artifactId:a.id,
          runUrl:'https://github.com/'+repo+'/actions/runs/'+run.id,
          artifactUrl:'https://github.com/'+repo+'/actions/runs/'+run.id+'/artifacts/'+a.id,
          schoolCasesPassed:15,countyCasesPassed:[3,5,2,4,4][i],workerVersion:worker});
      }
      const cf=await fetch('https://api.cloudflare.com/client/v4/accounts/'+process.env.CLOUDFLARE_ACCOUNT_ID+'/workers/scripts/texasdefined-site/deployments?per_page=100&page=1',
        {headers:{Authorization:'Bearer '+process.env.CLOUDFLARE_DEPLOY_API_TOKEN},signal:AbortSignal.timeout(15000)});
      assert.equal(cf.status,200);
      const body=await cf.json();assert.equal(body.success,true);
      const observation={browserStartedAt:step.started_at,browserCompletedAt:step.completed_at};
      const window=attestWorkerWindow(body.result?.deployments||[],worker,Array(5).fill(observation));
      if(!window)continue;
      const ledgers=gh('repos/'+repo+'/deployments?environment=texasdefined-verified-worker&per_page=100');
      const ledger=selectVerifiedWorkerLedger(ledgers,sha,worker,step.started_at,window.createdOn);
      if(!ledger)continue;
      const statuses=gh('repos/'+repo+'/deployments/'+ledger.ledgerDeploymentId+'/statuses?per_page=1');
      if(statuses[0]?.state!=='success')continue;
      const sourceRun=gh('repos/'+repo+'/actions/runs/'+ledger.runId);
      if(sourceRun.head_sha!==sha||sourceRun.head_branch!=='main'||sourceRun.conclusion!=='success')continue;
      accepted={run,a,groups,sha,worker,window,ledger};break;
    }catch(e){console.warn('Rejected run '+a.workflow_run?.id+': '+String(e.message).slice(0,200));}
  }
  if(!accepted){console.log('DEFER: no genuine complete single-run source/Worker-attested Chrome proof');process.exit(0);}
  const {run,a,groups,sha,worker,window,ledger}=accepted;
  const date=new Date().toISOString().slice(0,10);
  graduateBatch011(reg,groups,worker,sha,ledger.runId,date);
  const done=reg.completedBatches.find(b=>b.number===11);
  done.completionBasis='ONE genuine non-skipped Chrome job covering all 25 schools, 75 viewports and 18 counties; authenticated exact source SHA/Worker release.';
  done.technicalAcceptance.browserExecutionCount=1;
  done.technicalAcceptance.cloudflareDeploymentId=window.id;
  done.technicalAcceptance.githubWorkerLedgerDeploymentId=ledger.ledgerDeploymentId;
  done.technicalAcceptance.verificationObservationWindow=[{browserStartedAt:run.created_at,browserCompletedAt:run.updated_at,runId:run.id}];
  writeFileSync(regPath,JSON.stringify(reg,null,2)+'\n');
  const section='## '+date+' — Batch011 production Chrome VERIFIED (25/25)\n\n'+
    'ONE genuine non-skipped Chrome job checked all 25 schools at 1366/390/320, 18 reciprocal counties and sitemap coverage. '+
    'Run '+run.id+', compact artifact '+a.id+', Worker '+worker+', source '+sha+
    ', protected production run '+ledger.runId+', GitHub verified Worker ledger '+ledger.ledgerDeploymentId+
    ', Cloudflare deployment '+window.id+'. No manual accessibility, score, media-rights or editorial signoff claimed.\n\n';
  for(const file of ['docs/football-authority/MASTER.md','docs/football-authority/PROGRESS.md']){
    const old=readFileSync(file,'utf8');const nl=old.indexOf('\n');
    writeFileSync(file,old.slice(0,nl+1)+'\n'+section+old.slice(nl+1));
  }
  console.log('READY: evidence-only protected graduation PR from run '+run.id);
}finally{rmSync(tmp,{recursive:true,force:true});}
