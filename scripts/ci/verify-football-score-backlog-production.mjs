#!/usr/bin/env node
// Read-only production acceptance: each published registry result must be in
// its dated, opponent-specific public score row. Never treat a repository write
// or a passing source test as proof of deployment.
import {readFileSync} from 'node:fs';
import {mkdir,writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import {inventory} from '../data/inventory-statewide-football-scores.mjs';
function plain(value){return value.replace(/<[^>]*>/g,' ').replace(/&(?:amp|nbsp|ndash|mdash|quot|apos|#(?:x[0-9a-f]+|\d+));/gi,m=>{
 const n=m.match(/^&#(x[0-9a-f]+|\d+);$/i);return n?String.fromCodePoint(n[1][0]==='x'?parseInt(n[1].slice(1),16):parseInt(n[1],10)):({'&amp;':'&','&nbsp;':' ','&ndash;':'–','&mdash;':'—','&quot;':'"','&apos;':"'"})[m.toLowerCase()]??m;
}).replace(/\s+/g,' ').trim();}
const norm=s=>plain(s).replace(/[–—]/g,'-').toLowerCase();
export const expected=r=>r.outcome==='forfeit-win'?'W by forfeit':r.outcome==='forfeit-loss'?'L by forfeit':r.outcome==='not-played'?'Not played — bye week':r.outcome==='score-disputed-win'?'W reported scores differ ('+r.reportedScores.join(' / ')+')':(r.pointsFor>r.pointsAgainst?'W ':'L ')+r.pointsFor+'–'+r.pointsAgainst;

const visible=html=>html.replace(/<(script|style|template)\b[^>]*>[\s\S]*?<\/\1>/gi,' ').replace(/<!--[\s\S]*?-->/g,' ');
function attr(tag,key){
 const m=new RegExp('\\s'+key+'\\s*=\\s*(?:"([^"]*)"|\\x27([^\\x27]*)\\x27)','i').exec(tag);
 return m?(m[1]??m[2]):null;
}
export function auditHtml(html,path,rows){
 const clean=visible(html);
 const canonicals=[...clean.matchAll(/<link\b[^>]*>/gi)].map(m=>m[0]).filter(tag=>(attr(tag,'rel')??'').toLowerCase().split(/\s+/).includes('canonical'));
 if(canonicals.length!==1||attr(canonicals[0],'href')!=='https://texasdefined.com'+path)throw Error('missing, duplicate or incorrect canonical');
 const body=/<main\b[^>]*>[\s\S]*?<\/main>/i.exec(clean)?.[0];
 if(!body||!/<h1\b/i.test(body))throw Error('page body/main heading unavailable');
 const tableRows=[...body.matchAll(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi)].map(m=>[...m[0].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map(c=>c[1])).filter(c=>c.length===4);
 const missing=[];
 for(const r of rows){
   const date=r.playedDate??r.date,opponent=r.playedOpponent??r.opponent,expectedResult=expected(r);
   const candidates=tableRows.filter(c=>[...c[0].matchAll(/<time\b[^>]*>/gi)].some(m=>attr(m[0],'datetime')===date)&&norm(c[1]).replace(/\s*\*$/,'')===norm(opponent));
   const actual=candidates.length===1?norm(candidates[0][3]).replace(/\s*·\s*matchup\s*(?:→|&rarr;)$/,''):null;
   if(actual!==norm(expectedResult))missing.push({date,opponent,expected:expectedResult,found:candidates.map(c=>c.map(plain)).slice(0,3)});
 }
 if(path.endsWith('/alpine')&&!norm(body).includes('3-7 overall · 1-4 district'))missing.push({record:'3–7 overall · 1–4 district'});
 return missing;
}
// Release identity is grounded in the protected deploy's verified-worker
// ledger, not a workflow_run's default-branch GITHUB_SHA or a shared version
// observed on both origins. A consistent but older Worker must fail.
export async function resolveVerifiedRelease({sourceCommit,runId='',runAttempt='',get}){
 if(!/^[0-9a-f]{40}$/i.test(sourceCommit))throw Error('Invalid checked-out source commit');
 const deployments=await get('/deployments?environment=texasdefined-verified-worker&sha='+encodeURIComponent(sourceCommit)+'&per_page=30');
 if(!Array.isArray(deployments))throw Error('Invalid deployment ledger response');
 for(const d of deployments){
   let payload=d.payload;
   if(typeof payload==='string'){try{payload=JSON.parse(payload);}catch{continue;}}
   if(d.sha!==sourceCommit||d.environment!=='texasdefined-verified-worker'||payload?.commit_sha!==sourceCommit)continue;
   if(runId&&String(payload.source_run_id)!==String(runId))continue;
   if(runAttempt&&String(payload.source_run_attempt)!==String(runAttempt))continue;
   const version=String(payload.worker_version??'');
   if(!/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(version)||!/^\d+$/.test(String(d.id)))continue;
   const statuses=await get('/deployments/'+d.id+'/statuses?per_page=1');
   if(statuses?.[0]?.state!=='success')continue;
   return {sourceCommit,workerVersion:version,deploymentId:d.id,sourceRunId:String(payload.source_run_id??''),sourceRunAttempt:String(payload.source_run_attempt??'')};
 }
 throw Error('No successful verified-worker ledger record for the exact checked-out source and deployment attempt');
}
export function assertWorkerVersion(observed,expected){
 if(!expected||observed!==expected)throw Error('Wrong live Worker version: observed '+(observed??'missing')+'; expected '+(expected??'missing'));
}
async function githubGet(path){
 const repository=process.env.GITHUB_REPOSITORY,token=process.env.GH_TOKEN;
 if(!repository||!token)throw Error('GitHub repository and read-only ledger token are required');
 const response=await fetch('https://api.github.com/repos/'+repository+path,{headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'},signal:AbortSignal.timeout(20000)});
 if(!response.ok)throw Error('GitHub deployment ledger HTTP '+response.status);
 return response.json();
}

async function main(){
const sourceCommit=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
if(process.env.EXPECTED_SOURCE_SHA&&sourceCommit!==process.env.EXPECTED_SOURCE_SHA)throw Error('Checked-out source does not match the triggering production revision');
const release=await resolveVerifiedRelease({sourceCommit,runId:process.env.EXPECTED_DEPLOYMENT_RUN_ID,runAttempt:process.env.EXPECTED_DEPLOYMENT_ATTEMPT,get:githubGet});
const registry=JSON.parse(readFileSync('src/data/high-school-football/football-manually-verified-finals-2026.snapshot.json','utf8')).verifiedFinals;
const {coverage,summary}=inventory();
const origins=['https://texasdefined-site.freddy-coppola.workers.dev','https://texasdefined.com'];
const teams=new Map();
for(const r of registry){if(!teams.has(r.slug))teams.set(r.slug,[]);teams.get(r.slug).push(r);}
const pages=new Map(coverage.enrollment.map(p=>[p.page,p]));
for(const slug of teams.keys()){const page=origins[1]+'/texas-high-school-football-teams/'+slug;if(!pages.has(page))throw Error('Unenrolled registry team '+slug);}
const jobs=[...pages.values()].flatMap(p=>origins.map(origin=>({p,origin,path:new URL(p.page).pathname})));
const results=[];let next=0;
async function worker(){while(next<jobs.length){const j=jobs[next++],entry={page:j.p.page,origin:j.origin,kind:j.p.kind,rows:teams.get(j.p.slug)?.length??0};try{
 const resp=await fetch(j.origin+j.path,{redirect:'manual',headers:{'User-Agent':'Mozilla/5.0 TexasDefined score-acceptance'},signal:AbortSignal.timeout(25000)});
 entry.status=resp.status;entry.worker=resp.headers.get('x-texasdefined-worker-version');
 if(resp.status!==200||resp.headers.get('cf-mitigated')==='challenge'||!(resp.headers.get('content-type')??'').includes('text/html'))throw Error('HTTP '+resp.status+' or unexpected content');
 assertWorkerVersion(entry.worker,release.workerVersion);
 const html=await resp.text();entry.missing=auditHtml(html,j.path,teams.get(j.p.slug)??[]);entry.ok=entry.missing.length===0;
 }catch(e){entry.ok=false;entry.error=String(e);}results.push(entry);
}}
await Promise.all(Array.from({length:5},worker));
const versions=[...new Set(results.map(r=>r.worker).filter(Boolean))];
const failures=results.filter(r=>!r.ok);
const outcome={generatedAt:new Date().toISOString(),sourceCommit:release.sourceCommit,release,enrolledPages:pages.size,registryRows:registry.length,checks:results.length,versions,summary,failures,results};
await mkdir('artifacts/football-score-live',{recursive:true});await writeFile('artifacts/football-score-live/report.json',JSON.stringify(outcome,null,2)+'\n');
console.log(JSON.stringify({...outcome,results:undefined,failures:failures.slice(0,20)}));
if(failures.length||versions.length!==1||versions[0]!==release.workerVersion)process.exitCode=1;

}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)await main();
