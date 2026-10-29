#!/usr/bin/env node
// Pin Batch010 live Chrome to the EXACT commit that published the Worker now
// serving the canonical site. workflow_run.head_sha and schedule github.sha
// are not proof of the published build during overlapping releases.
import assert from 'node:assert/strict';
import { appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
export const SHA=/^[a-f0-9]{40}$/;
export const UUID=/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/;
export const REPO='keeptxred/TexasDefined';
export function selectLiveVerifiedRelease(deployments,activeVersion) {
  if(!UUID.test(activeVersion||''))return null;
  for(const d of deployments||[]) {
    let payload=d.payload;
    if(typeof payload==='string'){try{payload=JSON.parse(payload);}catch{continue;}}
    if(!payload||typeof payload!=='object')continue;
    if(d.environment!=='texasdefined-verified-worker' ||
      !SHA.test(d.sha||'') || d.sha!==payload.commit_sha ||
      payload.worker_version!==activeVersion ||
      !Number.isSafeInteger(d.id) || d.id<=0 ||
      !/^[1-9][0-9]*$/.test(String(payload.source_run_id||'')) ||
      !Number.isSafeInteger(Number(payload.source_run_id)) ||
      !Number.isFinite(Date.parse(payload.verified_at||'')))continue;
    return {sha:d.sha,worker:activeVersion,ledgerId:d.id,
      runId:Number(payload.source_run_id),verifiedAt:payload.verified_at};
  }
  return null;
}
async function main() {
  const out=process.env.GITHUB_OUTPUT;
  assert.ok(out,'GitHub output required: evidence pin must execute inside Actions');
  const write=(k,v)=>appendFileSync(out,k+'='+String(v)+'\n');
  write('ready','false');
  const token=process.env.GH_TOKEN;
  assert.ok(token,'GitHub read token required for authorized verified Worker ledger');
  const response=await fetch('https://texasdefined.com/texas-high-school-football-teams/college-station',
    {redirect:'manual',signal:AbortSignal.timeout(12000),headers:{'Cache-Control':'no-cache'}});
  if(response.status!==200) {
    console.log('DEFER: canonical football page is not HTTP 200; no false Chrome source attribution.');
    return;
  }
  const worker=response.headers.get('x-texasdefined-worker-version')?.trim()||'';
  if(!UUID.test(worker)){
    console.log('DEFER: canonical live response lacks trusted Worker version header.');
    return;
  }
  const headers={Authorization:'Bearer '+token,Accept:'application/vnd.github+json',
    'X-GitHub-Api-Version':'2022-11-28'};
  async function api(path){
    const res=await fetch('https://api.github.com/repos/'+REPO+path,
      {headers,signal:AbortSignal.timeout(12000)});
    assert.equal(res.status,200,'Required GitHub verified-source lookup failed: '+path);
    return res.json();
  }
  const ledger=await api('/deployments?environment=texasdefined-verified-worker&per_page=100');
  const candidate=selectLiveVerifiedRelease(ledger,worker);
  if(!candidate){
    console.log('DEFER: live Worker '+worker+' has no exact source-commit verified-release ledger yet.');
    return;
  }
  const statuses=await api('/deployments/'+candidate.ledgerId+'/statuses?per_page=1');
  if(!Array.isArray(statuses)||statuses[0]?.state!=='success'){
    console.log('DEFER: live Worker ledger has no successful production-verification status.');
    return;
  }
  const run=await api('/actions/runs/'+candidate.runId);
  if(run.status!=='completed'||run.conclusion!=='success'||run.head_sha!==candidate.sha ||
    run.head_branch!=='main'){
    console.log('DEFER: verified-source run has not fully succeeded for this commit.');
    return;
  }
  write('sha',candidate.sha);
  write('worker',candidate.worker);
  write('ledger_id',candidate.ledgerId);
  write('ready','true');
  console.log('Pinned published Worker '+worker+' to GitHub-verified source commit '+candidate.sha+
    ' and deployment ledger '+candidate.ledgerId+'.');
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1])
  main().catch(e=>{console.error('Release identity pin failed closed: '+e.message);process.exitCode=1;});
