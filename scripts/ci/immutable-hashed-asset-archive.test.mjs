import test from 'node:test';
import { publishImmutableArchive } from './immutable-hashed-asset-publisher.mjs';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import {
  MAX_KV_BYTES, FREE_KV_WRITES_PER_DAY, immutableAssetPath, immutableAssetKey,
  verifyArchiveRecord, planImmutablePublication, proposeGarbageCollection, archivedAssetResponse,
  serveHashedAssetWithArchive,
} from './immutable-hashed-asset-archive.mjs';
const epoch=Date.parse('2026-11-04T12:00:00Z');
const iso=(n)=>new Date(n).toISOString();
const sha=(body)=>createHash('sha256').update(body).digest('hex');
const record=(path, body,first=epoch,last=first)=>({
  path,preSha256:sha(body),bytes:Buffer.byteLength(body),
  firstSeenAt:iso(first),lastObservedAt:iso(last),
});
test('only exact immutable JS/CSS paths; never arbitrary paths or HTML',()=>{
  for(const p of ['/assets/main-BmrHq_-j.js','/assets/article._slug-DsyPOW_g.js','/assets/styles-QWER1234.css',
    '/assets/property-tax.ABCDEFGH.js'])
    assert.ok(immutableAssetPath(p),p);
  for(const p of ['/foo.js','/assets/main.js','/assets/../../secret.js','/assets/app-12345678.html',
    '/assets/main-ABCDEFGH.js?token=x','/assets/main-ABCDEFGH.js/','/assets/main-ABCDEFGH.svg',
    '/assets/property-tax.ABCDEFG.js','/assets/main-ABCDEFGH.js/../x', '/assets/unhashed.css'])
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
  assert.throws(()=>planImmutablePublication({incoming,now:epoch,maxTotalBytes:MAX_KV_BYTES+1}),
    /Cannot override account/);
  assert.throws(()=>planImmutablePublication({incoming,now:epoch,maxDailyWrites:1001}),
    /Cannot override account/);
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
    return {value:data,metadata:{version:1,path,bytes:body.length,sha256:sha(body),
      firstSeenAt:iso(epoch),contentType:'text/javascript'}};
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

test('idempotent original-byte publication and rollback: readback verified; not globally certified',async()=>{
  const p='/assets/main-ABCDEFGH.js',body=Buffer.from('immutable original');
  const r=record(p,body.toString());
  const plan=planImmutablePublication({incoming:[r],now:epoch});
  const data=new Map();let puts=0;
  const kv={
    async getWithMetadata(key){return data.get(key)||{value:null,metadata:null};},
    async put(key,bytes,{metadata}){puts++;data.set(key,{value:bytes,metadata});},
  };
  const publish=()=>publishImmutableArchive({plan,namespace:kv,
    readOriginalBytes:async()=>body});
  const first=await publish();
  assert.equal(first.newlyPublished,1);
  assert.equal(first.fullyReadBack,true);
  assert.equal(first.globallyReplicated,false);
  assert.equal(first.readyForWorkerRouting,false);
  const second=await publish();
  assert.equal(second.newlyPublished,0);
  assert.equal(second.alreadyPresent,1);
  assert.equal(puts,1,'No rewrite of an already published immutable key');
  const old=await archivedAssetResponse(new Request('https://texasdefined.com'+p),kv);
  assert.equal(old.status,200);assert.equal(await old.text(),body.toString());
});
test('publisher cannot silently replace a tampered object or invented original',async()=>{
  const p='/assets/main-ABCDEFGH.js',body=Buffer.from('verified body');
  const r=record(p,body.toString());
  const plan=planImmutablePublication({incoming:[r],now:epoch});
  const fake={getWithMetadata:async()=>({value:Buffer.from('evil').buffer,
    metadata:{version:1,path:p,bytes:r.bytes,sha256:r.preSha256,
      firstSeenAt:r.firstSeenAt,contentType:'text/javascript'}}),put:async()=>{throw Error('MUST NOT overwrite');}};
  await assert.rejects(publishImmutableArchive({plan,namespace:fake,
    readOriginalBytes:async()=>body}),/original-byte SHA mismatch/);
  const blank={getWithMetadata:async()=>({value:null,metadata:null}),
    put:async()=>{throw Error('SHOULD NOT PUBLISH');}};
  await assert.rejects(publishImmutableArchive({plan,namespace:blank,
    readOriginalBytes:async()=>Buffer.from('wrong body')}),/Original-byte source failed SHA-256/);
});
test('interrupted write cannot be certified and a later idempotent run recovers',async()=>{
  const p='/assets/main-ABCDEFGH.js',body=Buffer.from('previous original');
  const plan=planImmutablePublication({incoming:[record(p,body.toString())],now:epoch});
  const data=new Map();let fail=true;
  const kv={
    async getWithMetadata(k){return data.get(k)||{value:null,metadata:null};},
    async put(k,value,{metadata}){if(fail){fail=false;throw Error('network interruption');}
      data.set(k,{value,metadata});},
  };
  const publisher=()=>publishImmutableArchive({plan,namespace:kv,readOriginalBytes:async()=>body});
  await assert.rejects(publisher(),/network interruption/);
  const success=await publisher();
  assert.equal(success.newlyPublished,1);
  assert.equal(success.readyForWorkerRouting,false);
});

test('Worker-first adapter honors live static assets before any archive fallback',async()=>{
  const path='/assets/main-ABCDEFGH.js',url='https://texasdefined.com'+path;
  let archiveReads=0;
  const kv={getWithMetadata:async()=>{archiveReads++;throw Error('Must never be read');}};
  const current=new Response('new release',{status:200,headers:{'content-type':'text/javascript'}});
  const response=await serveHashedAssetWithArchive(new Request(url),{fetch:async()=>current},kv);
  assert.equal(response.status,200);
  assert.equal(await response.text(),'new release');
  assert.equal(archiveReads,0);
  const broken=new Response('upstream broken',{status:500});
  const failure=await serveHashedAssetWithArchive(new Request(url),{fetch:async()=>broken},kv);
  assert.equal(failure.status,500,'Never hide a current static asset 5xx behind stale bytes');
  assert.equal(archiveReads,0);
});
test('Worker-first adapter recovers an exact old hash ONLY on genuine current 404',async()=>{
  const path='/assets/property-tax.ABCDEFGH.css',url='https://texasdefined.com'+path;
  const body=Buffer.from('body { color: black; }');
  const ab=body.buffer.slice(body.byteOffset,body.byteOffset+body.byteLength);
  const kv={getWithMetadata:async(k)=>{
    assert.equal(k,immutableAssetKey(path));
    return {value:ab,metadata:{version:1,path,bytes:body.length,sha256:sha(body),
      firstSeenAt:iso(epoch),contentType:'text/css'}};
  }};
  let fetches=0;
  const assets={fetch:async()=>{fetches++;return new Response('missing',{status:404});}};
  const get=await serveHashedAssetWithArchive(new Request(url),assets,kv);
  assert.equal(get.status,200);
  assert.equal(get.headers.get('content-type'),'text/css');
  assert.equal(await get.text(),body.toString());
  const head=await serveHashedAssetWithArchive(new Request(url,{method:'HEAD'}),assets,kv);
  assert.equal(head.status,200);
  assert.equal(head.headers.get('content-length'),String(body.length));
  assert.equal(await head.text(),'');
  assert.equal(fetches,2);
});
test('Worker-first archive never affects HTML, APIs, images, POST, or missing old hashes',async()=>{
  const url='https://texasdefined.com/assets/main-ABCDEFGH.js';
  const missing=new Response('original static not found',{status:404});
  let fetches=0;
  const assets={fetch:async()=>{fetches++;return missing;}};
  const absent={getWithMetadata:async()=>({value:null,metadata:null})};
  const unchanged=await serveHashedAssetWithArchive(new Request(url),assets,absent);
  assert.equal(unchanged.status,404);
  assert.equal(await unchanged.text(),'original static not found');
  assert.equal(await serveHashedAssetWithArchive(
    new Request('https://texasdefined.com/explore'),assets,absent),null);
  assert.equal(await serveHashedAssetWithArchive(
    new Request('https://texasdefined.com/api/data'),assets,absent),null);
  assert.equal(await serveHashedAssetWithArchive(
    new Request('https://texasdefined.com/assets/photo-ABCDEFGH.webp'),assets,absent),null);
  assert.equal(await serveHashedAssetWithArchive(new Request(url,{method:'POST'}),assets,absent),null);
  assert.equal(fetches,1);
});
test('Worker-first adapter fails closed when static binding unavailable; archive corruption is not silently hidden',async()=>{
  const url='https://texasdefined.com/assets/main-ABCDEFGH.js';
  assert.equal((await serveHashedAssetWithArchive(new Request(url),null,null)).status,503);
  assert.equal((await serveHashedAssetWithArchive(new Request(url),
    {fetch:async()=>{throw Error('ASSETS binding failed');}},null)).status,503);
  const bad={getWithMetadata:async()=>({value:Uint8Array.from([1,2,3]).buffer,
    metadata:{version:1,path:'/assets/main-ABCDEFGH.js',bytes:3,sha256:'a'.repeat(64),
      firstSeenAt:iso(epoch),contentType:'text/javascript'}})};
  assert.equal((await serveHashedAssetWithArchive(new Request(url),
    {fetch:async()=>new Response('not found',{status:404})},bad)).status,503);
});
test('publisher refuses re-creating previously published keys outside the planned write budget',async()=>{
  const p='/assets/main-ABCDEFGH.js';
  const body=Buffer.from('old immutable bytes'),r=record(p,body.toString());
  const plan=planImmutablePublication({stored:[r],now:epoch});
  assert.equal(plan.newWrites,0);
  let puts=0;
  await assert.rejects(publishImmutableArchive({
    plan,
    namespace:{getWithMetadata:async()=>({value:null,metadata:null}),
      put:async()=>{puts++;}},
    readOriginalBytes:async()=>body,
  }),/Previously published immutable object is missing/);
  assert.equal(puts,0);
});
test('publisher rejects forged missing or invalid firstSeenAt metadata without writes',async()=>{
  const p='/assets/main-ABCDEFGH.js',body=Buffer.from('good original bytes');
  const r=record(p,body.toString()),plan=planImmutablePublication({incoming:[r],now:epoch});
  let puts=0;
  const namespace={
    getWithMetadata:async()=>({value:body,metadata:{version:1,path:p,bytes:body.length,
      sha256:r.preSha256,contentType:'text/javascript'}}),
    put:async()=>{puts++;},
  };
  await assert.rejects(publishImmutableArchive({plan,namespace,
    readOriginalBytes:async()=>body}),/Existing archive metadata conflicts/);
  assert.equal(puts,0);
});

test('immutable archive survives multi-year cached browser versions without resetting first-seen',()=>{
  const p='/assets/main-ABCDEFGH.js';
  const first=Date.parse('2020-01-01T00:00:00Z');
  const later=Date.parse('2026-11-05T12:00:00Z');
  const historic=record(p,'unchanged original',first,first);
  const reused=record(p,'unchanged original',later,later);
  const proof=verifyArchiveRecord({...historic,lastObservedAt:iso(later)},later);
  assert.equal(proof.firstSeenAt,iso(first));
  assert.equal(proof.lastObservedAt,iso(later));
  const plan=planImmutablePublication({stored:[historic],incoming:[reused],now:later});
  assert.equal(plan.newWrites,0);
  assert.equal(plan.allRecords[0].firstSeenAt,iso(first));
  assert.equal(plan.allRecords[0].lastObservedAt,iso(later));
  assert.throws(()=>verifyArchiveRecord({...historic,lastObservedAt:iso(first-1000)},later),
    /Invalid original observation window/);
});

test('1,295 historical originals bootstrap in quota-bounded day slices without dropping any',()=>{
  const incoming=Array.from({length:1295},(_,i)=>{
    const p='/assets/Chunk-'+String(i).padStart(4,'0')+'-ABCDEFGH.js';
    return record(p,'release-original-'+i);
  });
  assert.throws(()=>planImmutablePublication({incoming,now:epoch,writesToday:0}),
    /daily KV write quota/);
  const first=planImmutablePublication({incoming,now:epoch,writesToday:0,allowPartial:true});
  assert.equal(first.allRecords.length,1295);
  assert.equal(first.newWrites,1000);
  assert.equal(first.deferredPaths.length,295);
  assert.equal(first.archiveComplete,false);
  assert.equal(first.remainingDailyWrites,0);
  assert.equal(new Set([...first.toPublish.map(x=>x.path),...first.deferredPaths]).size,1295);
  const noBudget=planImmutablePublication({incoming,now:epoch,writesToday:1000,allowPartial:true});
  assert.equal(noBudget.newWrites,0);
  assert.equal(noBudget.deferredPaths.length,1295);
  assert.equal(noBudget.archiveComplete,false);
  const second=planImmutablePublication({
    stored:first.toPublish,incoming,now:epoch+86400000,writesToday:0,allowPartial:true,
  });
  assert.equal(second.newWrites,295);
  assert.equal(second.deferredPaths.length,0);
  assert.equal(second.archiveComplete,true);
  assert.equal(second.allRecords.length,1295);
  assert.equal(second.remainingDailyWrites,705);
  assert.throws(()=>planImmutablePublication({incoming,now:epoch,
    writesToday:1001,allowPartial:true}),/Invalid trusted daily KV write budget/);
});
