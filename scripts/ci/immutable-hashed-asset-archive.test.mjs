import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import {
  MAX_KV_BYTES, FREE_KV_WRITES_PER_DAY, immutableAssetPath, immutableAssetKey,
  verifyArchiveRecord, planImmutablePublication, proposeGarbageCollection, archivedAssetResponse,
} from './immutable-hashed-asset-archive.mjs';
const epoch=Date.parse('2026-11-04T12:00:00Z');
const iso=(n)=>new Date(n).toISOString();
const sha=(body)=>createHash('sha256').update(body).digest('hex');
const record=(path, body,first=epoch,last=first)=>({
  path,preSha256:sha(body),bytes:Buffer.byteLength(body),
  firstSeenAt:iso(first),lastObservedAt:iso(last),
});
test('only exact immutable JS/CSS paths; never arbitrary paths or HTML',()=>{
  for(const p of ['/assets/main-BmrHq_-j.js','/assets/article._slug-DsyPOW_g.js','/assets/styles-QWER1234.css'])
    assert.ok(immutableAssetPath(p),p);
  for(const p of ['/foo.js','/assets/main.js','/assets/../../secret.js','/assets/app-12345678.html',
    '/assets/main-ABCDEFGH.js?token=x','/assets/main-ABCDEFGH.js/','/assets/main-ABCDEFGH.svg'])
    assert.equal(immutableAssetPath(p),false,p);
  assert.equal(immutableAssetKey('/assets/main-BmrHq_-j.js'),'immutable:v1:/assets/main-BmrHq_-j.js');
});
test('same path different original SHA is permanently forbidden',()=>{
  const p='/assets/main-ABCDEFGH.js';
  assert.throws(()=>planImmutablePublication({stored:[record(p,'a')],incoming:[record(p,'b')],now:epoch+1000}),
    /Immutable filename collision/);
  assert.throws(()=>verifyArchiveRecord({...record(p,'a'),preSha256:'0'},epoch),/SHA-256/);
});
test('same original bytes never refresh firstSeenAt on repeated releases or rollback',()=>{
  const p='/assets/main-ABCDEFGH.js';
  const original=record(p,'old',epoch,epoch);
  const repeated=record(p,'old',epoch+86400000,epoch+86400000);
  const plan=planImmutablePublication({stored:[original],incoming:[repeated],now:epoch+86400000});
  assert.equal(plan.newWrites,0);
  assert.equal(plan.allRecords[0].firstSeenAt,iso(epoch));
  assert.equal(plan.allRecords[0].lastObservedAt,iso(epoch+86400000));
});
test('simulate ten days of releases: no deleted hashes, bounded cost and original timestamps',()=>{
  let known=[], totalWritten=0;
  for(let day=0;day<10;day++) {
    let writesToday=0;
    for(let release=0;release<2;release++) {
      const moment=epoch+(day*24+release*3)*3600000;
      const incoming=Array.from({length:70},(_,i)=>{
        const path='/assets/Chunk-'+String(day).padStart(2,'0')+String(release)+String(i).padStart(3,'0')+'Hash1234.js';
        return record(path,'export const v='+path,moment);
      });
      // Same existing hash as the oldest release is still required in a cached tab.
      if(known.length) incoming.push({...known[0],lastObservedAt:iso(moment)});
      const plan=planImmutablePublication({stored:known,incoming,now:moment,writesToday});
      assert.equal(plan.newWrites,70);
      writesToday+=plan.newWrites;
      assert.ok(writesToday<=FREE_KV_WRITES_PER_DAY);
      assert.ok(plan.totalBytes<MAX_KV_BYTES);
      known=plan.allRecords;
      totalWritten+=plan.newWrites;
    }
  }
  assert.equal(totalWritten,1400);
  assert.equal(known.length,1400);
  assert.equal(known[0].firstSeenAt,iso(epoch));
  assert.deepEqual(proposeGarbageCollection({stored:known,now:epoch+40*86400000}),[]);
});
test('fail closed before exceeding free-tier quota or storage',()=>{
  const incoming=Array.from({length:70},(_,i)=>record('/assets/Q'+String(i).padStart(3,'0')+'-ABCD1234.js','x'));
  assert.throws(()=>planImmutablePublication({incoming,now:epoch,writesToday:960}),/daily KV write quota/);
  assert.throws(()=>planImmutablePublication({incoming,now:epoch,maxTotalBytes:30}),/storage budget/);
});
test('garbage collection needs two signed release absences and 30 days of quiet, never deletes itself',()=>{
  const p='/assets/main-ABCDEFGH.js',current=epoch+40*86400000;
  const item=record(p,'old',epoch,epoch);
  const proofs=[1,2].map((n)=>({signed:true,workerVersion:'worker-'+n,sourceSha:'a'.repeat(40),
    capturedAt:iso(current-n*86400000),referencedPaths:[]}));
  assert.equal(proposeGarbageCollection({stored:[item],now:current,absenceProofs:proofs}).length,1);
  assert.equal(proposeGarbageCollection({stored:[item],now:current,absenceProofs:proofs,
    activeReferencePaths:[p]}).length,0);
  assert.equal(proposeGarbageCollection({stored:[item],now:epoch+20*86400000,absenceProofs:proofs}).length,0);
  assert.equal(proposeGarbageCollection({stored:[item],now:current,absenceProofs:proofs.slice(0,1)}).length,0);
});
test('exact original bytes served for GET and HEAD from release-independent binding',async()=>{
  const path='/assets/main-ABCDEFGH.js',body=Buffer.from('console.log("original")');
  const data=body.buffer.slice(body.byteOffset,body.byteOffset+body.byteLength);
  const namespace={getWithMetadata:async(key,type)=>{
    assert.equal(key,immutableAssetKey(path)); assert.equal(type,'arrayBuffer');
    return {value:data,metadata:{version:1,path,bytes:body.length,sha256:sha(body),contentType:'text/javascript'}};
  }};
  const url='https://texasdefined.com'+path;
  const get=await archivedAssetResponse(new Request(url),namespace);
  assert.equal(get.status,200);assert.equal(await get.text(),body.toString());
  assert.match(get.headers.get('cache-control'),/immutable/);
  const head=await archivedAssetResponse(new Request(url,{method:'HEAD'}),namespace);
  assert.equal(head.status,200);assert.equal(await head.text(),'');
});
test('missing, mismatched, corrupted or unavailable archives never fake a healthy response',async()=>{
  const url='https://texasdefined.com/assets/main-ABCDEFGH.js';
  assert.equal(await archivedAssetResponse(new Request(url),null),null);
  assert.equal(await archivedAssetResponse(new Request(url),{getWithMetadata:async()=>({value:null,metadata:null})}),null);
  const bytes=Uint8Array.from([1,2,3]).buffer;
  const corrupt={getWithMetadata:async()=>({value:bytes,
    metadata:{version:1,path:'/assets/main-ABCDEFGH.js',bytes:3,sha256:'a'.repeat(64),contentType:'text/javascript'}})};
  assert.equal((await archivedAssetResponse(new Request(url),corrupt)).status,503);
  assert.equal((await archivedAssetResponse(new Request(url),{getWithMetadata:async()=>{throw Error('KV down');}})).status,503);
  assert.equal(await archivedAssetResponse(new Request(url,{method:'POST'}),corrupt),null);
});
