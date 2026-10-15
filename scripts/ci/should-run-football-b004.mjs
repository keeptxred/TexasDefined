/**
 * Fail-closed scope classifier for the expensive Batch004 external GIS / real Chrome / sources audit.
 * Shared editor and registry paths are changed for EVERY subsequent school; only run
 * this Batch004 suite if its own records or shared logic changed. The mandatory
 * canonical premerge Merge Gate is completely separate and always runs.
 */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const B004 = new Set(['arp','aspermont','athens','atlanta','aubrey','austin','austin-achieve','austin-akins','austin-anderson','austin-bowie','austin-crockett','austin-eastside','austin-johnson','austin-lake-travis','austin-lasa','austin-mccallum','austin-navarro','austin-northeast','austin-travis','austin-vandegrift','austin-westlake','avalon','axtell','azle','baird']);
const REGISTRY='docs/football-authority/REGISTRY.json';
const EDITORIAL='src/data/high-school-football/program-editorial.ts';

function relevantRegistry(text) {
  const r=JSON.parse(text);
  assert(Array.isArray(r.schoolRecords),'Missing football registry schoolRecords');
  assert(Array.isArray(r.completedBatches),'Missing completedBatches');
  const {schoolRecords,completedBatches,batch,...global}=r;
  const b004=completedBatches.find(x=>x.number===4);
  assert(b004&&Array.isArray(b004.slugs),'Missing immutable Batch004 roster');
  assert.deepEqual([...b004.slugs].sort(),[...B004].sort(),'Unexpected Batch004 roster');
  const schoolRows=schoolRecords.filter(x=>B004.has(x.slug));
  assert.equal(schoolRows.length,B004.size,'Batch004 school count mismatch');
  return JSON.stringify({global,completedBatch:b004,schoolRows});
}
function relevantEditorial(text) {
  assert(text.includes('const PROGRAM_EDITORIAL: Record<string, FootballProgramEditorial> = {'),'Missing program editorial object');
  let count=0;
  const result=text.replace(/^  "([^"]+)": \{\r?\n[\s\S]*?^  \},?\r?\n/gm,(block,slug)=>{
    count++;
    return B004.has(slug)?block:'';
  });
  assert(count>=3,'Unexpected editorial file structure; run full scope');
  return result;
}
export function shouldRunB004(paths,before,after) {
  const modified=new Set(paths.filter(Boolean));
  if(!modified.size)return false;
  for(const p of modified){
    if(p===REGISTRY||p===EDITORIAL||p==='docs/football-authority/PROGRESS.md')continue;
    if(p.startsWith('docs/football-authority/schools/')&&p.endsWith('.md')){
      const slug=p.slice('docs/football-authority/schools/'.length,-3);
      if(/^[a-z0-9-]+$/.test(slug)&&!B004.has(slug))continue;
    }
    // Shared templates, evidence scripts, Batch004 dossiers, unexpected paths,
    // and changes to the workflow itself always require the full audit.
    return true;
  }
  if(modified.has(REGISTRY)&&relevantRegistry(before[REGISTRY])!==relevantRegistry(after[REGISTRY]))return true;
  if(modified.has(EDITORIAL)&&relevantEditorial(before[EDITORIAL])!==relevantEditorial(after[EDITORIAL]))return true;
  return false;
}
function git(...args) {return execFileSync('git',args,{encoding:'utf8',maxBuffer:20*1024*1024}).trimEnd();}
export function assessGit(base,head='HEAD') {
  try {
    assert(/^[a-f0-9]{40}$/.test(base),'Missing or invalid base commit');
    const paths=git('diff','--name-only',base,head,'--').split('\n').filter(Boolean);
    const before={},after={};
    for(const path of paths.filter(p=>p===REGISTRY||p===EDITORIAL)){
      before[path]=git('show',base+':'+path);
      after[path]=git('show',head+':'+path);
    }
    return {relevant:shouldRunB004(paths,before,after),reason:paths.join(', ')||'No changes'};
  } catch(error){
    // Fail closed: unknown diffs, deleted files, malformed old/new registries or
    // unmatched file shape MUST run the audit rather than treat evidence as passed.
    return {relevant:true,reason:'Fail-closed scope detection: '+String(error).slice(0,300)};
  }
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
  const event=process.env.GITHUB_EVENT_NAME||'';
  const base=process.env.B004_BASE_SHA||'';
  const result=event==='workflow_dispatch'?{relevant:true,reason:'Manually dispatched'}:assessGit(base);
  console.log('B004 scope',JSON.stringify(result));
  if(process.env.GITHUB_OUTPUT)appendFileSync(process.env.GITHUB_OUTPUT,'relevant='+String(result.relevant)+'\n');
}
