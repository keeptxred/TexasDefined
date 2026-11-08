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
  assert.equal(VERIFIED_NOV8_ORIGINALS.length,4);
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
    assert.equal(report.unresolved.length,4);
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
    assert.equal(report.expired.length,4);
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
