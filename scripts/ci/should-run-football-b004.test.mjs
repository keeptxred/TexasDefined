import assert from 'node:assert/strict';
import { B004, shouldRunB004, assessGit } from './should-run-football-b004.mjs';

const registry=(change={})=>{
  const schools=[...B004].map(slug=>({slug,status:'VERIFIED'}));
  schools.push({slug:'big-spring',status:change.bigSpringStatus||'NOT_REVIEWED'});
  if(change.austinStatus)schools.find(x=>x.slug==='austin').status=change.austinStatus;
  return JSON.stringify({completedBatches:[{number:4,slugs:[...B004]}],schoolRecords:schools,batch:{currentSchool:change.next||'big-spring'},contentVersion:change.version||1});
};
const editorial=(change={})=>`export type FootballProgramEditorial = { overview: string[] };
const PROGRAM_EDITORIAL: Record<string, FootballProgramEditorial> = {
  "austin": {
    "overview": ["${change.austin||'Austin'}"]
  },
  "big-spring": {
    "overview": ["${change.bigSpring||'Big Spring'}"]
  },
  "bishop": {
    "overview": ["${change.bishop||'Bishop'}"]
  },
};
export function getProgramEditorial(slug: string) { return PROGRAM_EDITORIAL[slug] }
`;
const reg='docs/football-authority/REGISTRY.json',ed='src/data/high-school-football/program-editorial.ts';
assert.equal(shouldRunB004([reg],{[reg]:registry()},{[reg]:registry({bigSpringStatus:'IMPLEMENTED',next:'bishop'})}),false);
assert.equal(shouldRunB004([reg],{[reg]:registry()},{[reg]:registry({austinStatus:'REVIEWED'})}),true);
assert.equal(shouldRunB004([reg],{[reg]:registry()},{[reg]:registry({version:2})}),true);
assert.equal(shouldRunB004([ed],{[ed]:editorial()},{[ed]:editorial({bigSpring:'New guide',bishop:'New Bishop'})}),false);
assert.equal(shouldRunB004([ed],{[ed]:editorial()},{[ed]:editorial({austin:'Changed Austin'})}),true);
assert.equal(shouldRunB004([reg,ed],{[reg]:registry(),[ed]:editorial()},{[reg]:registry({bigSpringStatus:'IMPLEMENTED'}),[ed]:editorial({bigSpring:'New'})}),false);
assert.equal(shouldRunB004([reg,ed,'docs/football-authority/PROGRESS.md','docs/football-authority/schools/big-spring.md'],{[reg]:registry(),[ed]:editorial()},{[reg]:registry({bigSpringStatus:'IMPLEMENTED'}),[ed]:editorial({bigSpring:'Updated'})}),false,'Real Batch006 edits to registry, editorial, ledger and dossier must skip Batch004');
assert.equal(shouldRunB004(['docs/football-authority/PROGRESS.md'],{},{}),false,'Progress-only update must skip');
assert.equal(shouldRunB004(['docs/football-authority/schools/bishop.md'],{},{}),false,'Other batch school dossier must skip');
assert.equal(shouldRunB004(['docs/football-authority/schools/austin.md'],{},{}),true,'Batch004 dossier change must run');
assert.equal(shouldRunB004(['docs/football-authority/schools/austin.txt'],{},{}),true,'Unexpected extension fails closed');
assert.equal(shouldRunB004(['src/routes/texas-high-school-football-teams_.$slug.lazy.tsx'],{},{}),true);
assert.equal(shouldRunB004(['.github/workflows/audit-football-b004-final-evidence.yml'],{},{}),true);
assert.equal(shouldRunB004([],{},{ }),false);
assert.equal(assessGit('invalid-base').relevant,true,'Fail closed for invalid SHA');
console.log('B004 scope classification passed: unchanged earlier batches skip, changed earlier batches fail closed, shared routing stays covered');
