import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync,spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const verifier = fileURLToPath(new URL('./validate-sitewide-rewrite.mjs',import.meta.url));
function run(repo,...args) {
  return spawnSync(process.execPath,[verifier,...args],{cwd:repo,encoding:'utf8'});
}
function makeRepo() {
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'td-editorial-rewrite-'));
  const git=(...args)=>execFileSync('git',args,{cwd:root,stdio:'pipe'});
  fs.mkdirSync(path.join(root,'src/data'),{recursive:true});
  fs.mkdirSync(path.join(root,'.artifacts'),{recursive:true});
  fs.mkdirSync(path.join(root,'ops/editorial/auto-rewrite-evidence'),{recursive:true});
  git('init');git('config','user.email','test@example.org');git('config','user.name','Test');
  fs.writeFileSync(path.join(root,'src/data/authority.ts'),
    'export const guidance = "Old museum access facts";\n');
  git('add','src/data/authority.ts');git('commit','-m','baseline');
  const quote='The historic grounds open to the public during published ranger programs.';
  const newCopy='Visitors should check the published ranger-program schedule before arrival.';
  fs.writeFileSync(path.join(root,'src/data/authority.ts'),
    'export const guidance = "'+newCopy+'";\n');
  const target={selected:{issue:123,page:'/destination/historic-site',
    sources:[{url:'https://www.nps.gov/example',excerpt:'Official park website: '+quote+' '+('Plan your trip. '.repeat(30))}]}};
  fs.writeFileSync(path.join(root,'.artifacts/sitewide-rewrite-target.json'),JSON.stringify(target));
  const evidence={issue:123,page:'/destination/historic-site',updatedAt:new Date().toISOString(),
    facts:[{sourceUrl:'https://www.nps.gov/example',sourceQuote:quote,newCopy}]};
  const evidencePath='ops/editorial/auto-rewrite-evidence/issue-123.json';
  fs.writeFileSync(path.join(root,evidencePath),JSON.stringify(evidence));
  git('add','-N',evidencePath);
  return {root,git,evidence,evidencePath,quote,newCopy};
}
test('small source-quoted changed factual copy passes a strict diff gate',t=>{
  const repo=makeRepo();
  t.after(()=>fs.rmSync(repo.root,{recursive:true,force:true}));
  const result=run(repo.root);
  assert.equal(result.status,0,result.stderr+' '+result.stdout);
  assert.match(result.stdout,/verifiedFacts/);
});
test('invented source quote is rejected',t=>{
  const repo=makeRepo();t.after(()=>fs.rmSync(repo.root,{recursive:true,force:true}));
  repo.evidence.facts[0].sourceQuote='An invented museum ticket policy that does not appear in the primary document.';
  fs.writeFileSync(path.join(repo.root,repo.evidencePath),JSON.stringify(repo.evidence));
  assert.notEqual(run(repo.root).status,0);
});
test('added prose must contain exact claimed new copy',t=>{
  const repo=makeRepo();t.after(()=>fs.rmSync(repo.root,{recursive:true,force:true}));
  repo.evidence.facts[0].newCopy='A fabricated new sentence that never appears in the changed page';
  fs.writeFileSync(path.join(repo.root,repo.evidencePath),JSON.stringify(repo.evidence));
  assert.notEqual(run(repo.root).status,0);
});
test('untracked code file cannot ride along outside the audited patch',t=>{
  const repo=makeRepo();t.after(()=>fs.rmSync(repo.root,{recursive:true,force:true}));
  fs.writeFileSync(path.join(repo.root,'src/data/hidden.ts'),'export const hidden = true;\n');
  assert.notEqual(run(repo.root).status,0);
});
test('changes to workflow or executable configuration are rejected',t=>{
  const repo=makeRepo();t.after(()=>fs.rmSync(repo.root,{recursive:true,force:true}));
  fs.mkdirSync(path.join(repo.root,'.github/workflows'),{recursive:true});
  fs.writeFileSync(path.join(repo.root,'.github/workflows/CI.yml'),'name: baseline\n');
  repo.git('add','.github/workflows/CI.yml');repo.git('commit','-m','workflow baseline');
  fs.writeFileSync(path.join(repo.root,'.github/workflows/CI.yml'),'name: bypassed\n');
  assert.notEqual(run(repo.root).status,0);
});

test('automatic prose rewriting cannot silently restamp source-review provenance',t=>{
  const repo=makeRepo();
  t.after(()=>fs.rmSync(repo.root,{recursive:true,force:true}));
  fs.appendFileSync(path.join(repo.root,'src/data/authority.ts'),
    'export const sourceCheckedAt = "2026-11-20";\n');
  const result=run(repo.root);
  assert.notEqual(result.status,0);
  assert.match(result.stderr,/prohibited code\/security\/indexing surface/);
});


test('missing editorial evidence timestamp cannot certify a rewrite', t => {
  const repo=makeRepo(); t.after(()=>fs.rmSync(repo.root,{recursive:true,force:true}));
  delete repo.evidence.updatedAt;
  fs.writeFileSync(path.join(repo.root,repo.evidencePath),JSON.stringify(repo.evidence));
  assert.match(run(repo.root).stderr,/Missing, stale or invented editorial update date/);
});
test('same-page repeat requires newer evidence and retains prior evidence in git', t => {
  const repo=makeRepo(); t.after(()=>fs.rmSync(repo.root,{recursive:true,force:true}));
  const previous = {...repo.evidence, updatedAt:new Date(Date.now()-86400000).toISOString()};
  fs.writeFileSync(path.join(repo.root,repo.evidencePath),JSON.stringify(previous));
  repo.git('add',repo.evidencePath); repo.git('commit','-m','previous verified ledger');
  fs.writeFileSync(path.join(repo.root,repo.evidencePath),JSON.stringify(repo.evidence));
  assert.equal(run(repo.root).status,0);
  const stale={...repo.evidence,updatedAt:previous.updatedAt};
  fs.writeFileSync(path.join(repo.root,repo.evidencePath),JSON.stringify(stale));
  assert.notEqual(run(repo.root).status,0);
});
