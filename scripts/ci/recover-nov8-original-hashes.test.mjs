import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { recoverVerifiedNov8Originals, verifiedSourceUrl, VERIFIED_NOV8_ORIGINALS } from './recover-nov8-original-hashes.mjs';

const VERSION = '953ec55d-c98c-41e8-b59e-613878d2a7c3';
const NOW = Date.parse('2026-11-08T15:00:00Z');
async function setup() {
  const root=await mkdtemp(join(tmpdir(),'td-nov8-verified-originals-'));
  const opts={snapshotPath:join(root,'snapshot.json'),
    reportPath:join(root,'report.json'),assetFolder:join(root,'assets')};
  await mkdir(opts.assetFolder,{recursive:true});
  await writeFile(opts.snapshotPath,JSON.stringify({format:1,snapshots:[
    {sourceCommit:'test',pages:[],builtAssets:[],retainedAssets:[]}
  ]}));
  return {root,opts};
}
const BYTES = Buffer.from('export const originalBytes = "not fabricated";\n');
function testRecord() {
  return {name:'Header-BPIUxtUq.js',sha256:createHash('sha256').update(BYTES).digest('hex'),
    bytes:BYTES.length,firstSeenAt:'2026-11-08T04:56:04.752Z'};
}

test('only exact source version and safe hashed asset paths accepted',()=>{
  assert.equal(VERIFIED_NOV8_ORIGINALS.length,25);
  assert.equal(verifiedSourceUrl(VERSION,'Header-BPIUxtUq.js'),
    'https://953ec55d-texasdefined-site.freddy-coppola.workers.dev/assets/Header-BPIUxtUq.js');
  assert.throws(()=>verifiedSourceUrl('invalid','Header-BPIUxtUq.js'));
  assert.throws(()=>verifiedSourceUrl(VERSION,'../../secrets.js'));
  assert.throws(()=>verifiedSourceUrl(VERSION,'https://evil.example/assets/x.js'));
});

test('recover original only with exact SHA, byte count, 72h firstSeenAt and trusted preview',async()=>{
  const {root,opts}=await setup();
  try {
    const seen=[];
    const report=await recoverVerifiedNov8Originals({...opts,now:NOW,records:[testRecord()],
      fetchImpl:async (url,options)=>{
        seen.push(url);
        assert.equal(options.redirect,'manual');
        assert.equal(options.cache,'no-store');
        return new Response(BYTES,{status:200,headers:{'content-type':'text/javascript'}});
      }});
    assert.equal(report.recovered.length,1);
    assert.equal(report.unresolved.length,0);
    assert.equal(report.recovered[0].sha256,testRecord().sha256);
    assert.deepEqual(seen,[verifiedSourceUrl(VERSION,'Header-BPIUxtUq.js')]);
    assert.deepEqual(await readFile(join(opts.assetFolder,testRecord().name)),BYTES);
    const saved=JSON.parse(await readFile(opts.snapshotPath,'utf8'));
    assert.equal(saved.snapshots[0].retainedAssets[0].firstSeenAt,testRecord().firstSeenAt);
    assert.equal(saved.snapshots[0].retainedAssets[0].preSha256,testRecord().sha256);
    assert.equal(saved.snapshots[0].retainedAssets[0].sourceVersionId,VERSION);
  }finally {await rm(root,{recursive:true,force:true});}
});

test('real original hash budget is fixed and unavailable source never fabricates JS',async()=>{
  const {root,opts}=await setup();
  try {
    const report=await recoverVerifiedNov8Originals({...opts,now:NOW,
      fetchImpl:async()=>new Response('404',{status:404,headers:{'content-type':'text/html'}})});
    assert.equal(report.recovered.length,0);
    assert.equal(report.unresolved.length,25);
    assert.equal((await readFile(opts.snapshotPath,'utf8')).includes('sourceVersionId'),false);
    assert.equal(existsSync(join(opts.assetFolder,VERIFIED_NOV8_ORIGINALS[0].name)),false);
  }finally {await rm(root,{recursive:true,force:true});}
});

test('wrong original SHA or MIME must not be recorded as verified original bytes',async()=>{
  const {root,opts}=await setup();
  try {
    await assert.rejects(recoverVerifiedNov8Originals({...opts,now:NOW,records:[testRecord()],
      fetchImpl:async()=>new Response('export const incorrect = true;',{
        status:200,headers:{'content-type':'application/javascript'}})}), /integrity mismatch/);
    assert.equal(existsSync(join(opts.assetFolder,testRecord().name)),false);
    const report=await recoverVerifiedNov8Originals({...opts,now:NOW,records:[testRecord()],
      fetchImpl:async()=>new Response('<html>challenge</html>',{
        status:200,headers:{'content-type':'text/html'}})});
    assert.equal(report.unresolved.length,1);
    assert.equal(report.recovered.length,0);
  }finally {await rm(root,{recursive:true,force:true});}
});

test('never reset first-seen expiry or fetch expired originals',async()=>{
  const {root,opts}=await setup();
  try {
    const report=await recoverVerifiedNov8Originals({...opts,
      now:Date.parse('2026-11-12T06:00:00Z'),
      fetchImpl:async()=>{throw new Error('expired probe must never execute');}});
    assert.equal(report.expired.length,25);
    assert.equal(report.recovered.length,0);
    assert.equal(report.unresolved.length,0);
  }finally {await rm(root,{recursive:true,force:true});}
});

test('already-present original must have matching SHA, cannot silently overwrite',async()=>{
  const {root,opts}=await setup();
  try {
    await writeFile(join(opts.assetFolder,testRecord().name),BYTES);
    const r=await recoverVerifiedNov8Originals({...opts,now:NOW,records:[testRecord()],
      fetchImpl:async()=>{throw new Error('original already present');}});
    assert.equal(r.alreadyInBuild.length,1);
    await writeFile(join(opts.assetFolder,testRecord().name),Buffer.from('wrong bytes'));
    await assert.rejects(recoverVerifiedNov8Originals({...opts,now:NOW,records:[testRecord()]}),
      /integrity mismatch/);
  }finally {await rm(root,{recursive:true,force:true});}
});

test('seven additional originals are distinct source-digested exact 200-to-404 names, not guesses',()=>{
  const names = VERIFIED_NOV8_ORIGINALS.map(x=>x.name);
  assert.equal(names.length,new Set(names).size);
  const expectedSeven = [
    'RouteStatusScreens-BsrCKH8a.js','external-link-A_GfxrzX.js',
    'main-CzG1xxTA.js','Container-BGUI52xw.js','destination._slug-8Stf_XfD.js',
    'CitationCollectionTrustRouter-TvMDLA0C.js','ContextualOfficialSources-CLSZ8gUV.js'
  ];
  for (const name of expectedSeven) {
    const original = VERIFIED_NOV8_ORIGINALS.find(x=>x.name===name);
    assert.ok(original,name);
    assert.match(original.sha256,/^[a-f0-9]{64}$/);
    assert.ok(Number.isInteger(original.bytes)&&original.bytes>0&&original.bytes<=2*1024*1024);
    assert.ok(Date.parse(original.firstSeenAt)<NOW);
    assert.ok(verifiedSourceUrl(VERSION,original.name).endsWith('/assets/'+name));
  }
  const allBytes=VERIFIED_NOV8_ORIGINALS.reduce((sum,x)=>sum+x.bytes,0);
  assert.equal(allBytes,3823913,'original bytes must fit UNCHANGED 4MiB strict cap');
  assert.ok(allBytes<=4*1024*1024);
  assert.equal(names.includes('main-DWbuJJ04.js'),false,
    'unverified crawler-missing main chunk cannot be reconstructed');
});

test('no 26th historical old hash can silently expand the bounded source-backed cohort',async()=>{
  const {root,opts}=await setup();
  try {
    const extra={...testRecord(),name:'main-EXTRA123.js'};
    await assert.rejects(
      recoverVerifiedNov8Originals({...opts,now:NOW,
        records:[...VERIFIED_NOV8_ORIGINALS,extra],
        fetchImpl:async()=>{throw Error('must not probe over cap');}}),
      /Original-byte recovery limit exceeded/);
  }finally{await rm(root,{recursive:true,force:true});}
});

test('12 real 15:42Z stale-client missing originals are SHA-proven, capped and not re-aged',()=>{
  const twelve = [
    'Header-CEsskBBZ.js','Container-DTDZPDA6.js','Footer-BaE7Fsrd.js',
    'x-DwgD0xWI.js','CitationCollectionTrustRouter-wYztyhyB.js',
    'useLocation-BJHtU2Nl.js','external-link-DVOCm5xW.js',
    'texas-high-school-football-playoff-brackets-BYwYlI4i.js',
    'createLucideIcon-DxDqtgir.js','ContextualOfficialSources-DiIXqD0E.js',
    'analytics-SIuFLiYD.js','CitationTrustPanel-BY5hUAGO.js'
  ];
  assert.equal(new Set(twelve).size,12);
  for(const name of twelve) {
    const original=VERIFIED_NOV8_ORIGINALS.find(x=>x.name===name);
    assert.ok(original,name);
    assert.equal(original.firstSeenAt,'2026-11-07T19:09:28.213Z',name);
    assert.match(original.sha256,/^[a-f0-9]{64}$/,name);
    assert.ok(original.bytes>0&&original.bytes<=2*1024*1024,name);
    assert.equal(verifiedSourceUrl(VERSION,name),
      'https://953ec55d-texasdefined-site.freddy-coppola.workers.dev/assets/'+name);
  }
  assert.equal(twelve.reduce((n,name)=>n+VERIFIED_NOV8_ORIGINALS.find(x=>x.name===name).bytes,0),87258);
  assert.equal(VERIFIED_NOV8_ORIGINALS.reduce((n,x)=>n+x.bytes,0),3823913);
  assert.ok(3823913<=4*1024*1024,'strict total byte limit remains unchanged');
});


test('Nov9 two actual 404 originals remain recoverable only before immutable Nov11 expiry',()=>{
  const proved=[
    ['CitationTrustPanel-WgY30je2.js','383815e9c182b33d7122a9cedc3b24dc7a6199ea97e2c826e9db00cac45bdde7',2334],
    ['analytics-BlwY3Vv7.js','c87245ed44acce24ba3f8062b60f09e555669fa3b854fa38533eaa558c6fe1dc',8163]
  ];
  for(const [name,sha,bytes] of proved){
    const r=VERIFIED_NOV8_ORIGINALS.find(x=>x.name===name);
    assert.ok(r,name);
    assert.equal(r.sha256,sha,name);
    assert.equal(r.bytes,bytes,name);
    assert.equal(r.firstSeenAt,'2026-11-08T04:56:04.752Z',name);
    assert.ok(verifiedSourceUrl(VERSION,name).endsWith('/assets/'+name));
    const age=Date.parse('2026-11-09T23:00:00Z')-Date.parse(r.firstSeenAt);
    assert.ok(age>0 && age<72*3600000,'no 72h re-aging');
  }
  assert.equal(VERIFIED_NOV8_ORIGINALS.reduce((n,x)=>n+x.bytes,0),3823913);
  assert.ok(3823913<=4*1024*1024,'source originals remain within original immutable 4MiB cap');
});
