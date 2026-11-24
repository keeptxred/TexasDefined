#!/usr/bin/env node
// Read-only production acceptance: each published registry result must be in
// its dated, opponent-specific public score row. Never treat a repository write
// or a passing source test as proof of deployment.
import {readFileSync} from 'node:fs';
import {mkdir,writeFile} from 'node:fs/promises';
import {inventory} from '../data/inventory-statewide-football-scores.mjs';
const registry=JSON.parse(readFileSync('src/data/high-school-football/football-manually-verified-finals-2026.snapshot.json','utf8')).verifiedFinals;
const {coverage,summary}=inventory();
const origins=['https://texasdefined-site.freddy-coppola.workers.dev','https://texasdefined.com'];
const teams=new Map();
for(const r of registry){if(!teams.has(r.slug))teams.set(r.slug,[]);teams.get(r.slug).push(r);}
const pages=new Map(coverage.enrollment.map(p=>[p.page,p]));
for(const slug of teams.keys()){const page=origins[1]+'/texas-high-school-football-teams/'+slug;if(!pages.has(page))throw Error('Unenrolled registry team '+slug);}
function plain(value){return value.replace(/<[^>]*>/g,' ').replace(/&(?:amp|nbsp|ndash|mdash|quot|apos|#(?:x[0-9a-f]+|\d+));/gi,m=>{
 const n=m.match(/^&#(x[0-9a-f]+|\d+);$/i);return n?String.fromCodePoint(n[1][0]==='x'?parseInt(n[1].slice(1),16):parseInt(n[1],10)):({'&amp;':'&','&nbsp;':' ','&ndash;':'–','&mdash;':'—','&quot;':'"','&apos;':"'"})[m.toLowerCase()]??m;
}).replace(/\s+/g,' ').trim();}
const norm=s=>plain(s).replace(/[–—]/g,'-').toLowerCase();
const expected=r=>r.outcome==='forfeit-win'?'W by forfeit':r.outcome==='forfeit-loss'?'L by forfeit':r.outcome==='not-played'?'Not played — bye week':r.outcome==='score-disputed-win'?'W reported scores differ ('+r.reportedScores.join(' / ')+')':(r.pointsFor>r.pointsAgainst?'W ':'L ')+r.pointsFor+'–'+r.pointsAgainst;
function auditHtml(html,path,rows){
 if(!html.includes('https://texasdefined.com'+path))throw Error('canonical missing');
 if(!/<h1\b/i.test(html)||!/<main\b/i.test(html))throw Error('page body/main heading unavailable');
 const tr=[...html.matchAll(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi)].map(m=>m[0]);
 const missing=[];
 for(const r of rows){const date=r.playedDate??r.date,opponent=r.playedOpponent??r.opponent,expectedResult=expected(r);const candidates=tr.filter(row=>new RegExp('datetime=["\\x27]'+date+'["\\x27]','i').test(row)&&norm(row).includes(norm(opponent)));
   if(candidates.length!==1||!norm(candidates[0]).includes(norm(expectedResult)))missing.push({date,opponent,expected:expectedResult,found:candidates.map(plain).slice(0,3)});
 }
 if(path.endsWith('/alpine')&&!norm(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ')).includes('3-7 overall'))missing.push({record:'3–7 overall · 1–4 district'});
 return missing;
}
const jobs=[...pages.values()].flatMap(p=>origins.map(origin=>({p,origin,path:new URL(p.page).pathname})));
const results=[];let next=0;
async function worker(){while(next<jobs.length){const j=jobs[next++],entry={page:j.p.page,origin:j.origin,kind:j.p.kind,rows:teams.get(j.p.slug)?.length??0};try{
 const resp=await fetch(j.origin+j.path,{redirect:'manual',headers:{'User-Agent':'Mozilla/5.0 TexasDefined score-acceptance'},signal:AbortSignal.timeout(25000)});
 entry.status=resp.status;entry.worker=resp.headers.get('x-texasdefined-worker-version');
 if(resp.status!==200||resp.headers.get('cf-mitigated')==='challenge'||!(resp.headers.get('content-type')??'').includes('text/html'))throw Error('HTTP '+resp.status+' or unexpected content');
 if(!entry.worker)throw Error('Missing live Worker version');
 const html=await resp.text();entry.missing=auditHtml(html,j.path,teams.get(j.p.slug)??[]);entry.ok=entry.missing.length===0;
 }catch(e){entry.ok=false;entry.error=String(e);}results.push(entry);
}}
await Promise.all(Array.from({length:5},worker));
const versions=[...new Set(results.map(r=>r.worker).filter(Boolean))];
const failures=results.filter(r=>!r.ok);
const outcome={generatedAt:new Date().toISOString(),sourceCommit:process.env.GITHUB_SHA??null,enrolledPages:pages.size,registryRows:registry.length,checks:results.length,versions,summary,failures,results};
await mkdir('artifacts/football-score-live',{recursive:true});await writeFile('artifacts/football-score-live/report.json',JSON.stringify(outcome,null,2)+'\n');
console.log(JSON.stringify({...outcome,results:undefined,failures:failures.slice(0,20)}));
if(failures.length||versions.length!==1)process.exitCode=1;
