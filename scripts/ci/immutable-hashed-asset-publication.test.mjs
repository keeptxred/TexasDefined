import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp,readFile,writeFile,rm } from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {prepublishApprovedImmutableAssets} from './publish-immutable-hashed-archive.mjs';
import {immutableAssetKey,planImmutablePublication} from './immutable-hashed-asset-archive.mjs';
import {publishImmutableArchive} from './immutable-hashed-asset-publisher.mjs';

const now=Date.parse('2026-11-05T13:00:00Z');
const sourceSha='c'.repeat(40);
const env={GITHUB_SHA:sourceSha,
  TEXASDEFINED_IMMUTABLE_ARCHIVE_OWNER_APPROVED:'true',
  TEXASDEFINED_IMMUTABLE_ARCHIVE_PUBLISH:'true',
  CLOUDFLARE_ACCOUNT_ID:'a'.repeat(32),
  TEXASDEFINED_IMMUTABLE_KV_NAMESPACE_ID:'b'.repeat(32),
  CLOUDFLARE_KV_ARCHIVE_TOKEN:'only-in-test-fixture',
  TEXASDEFINED_KV_WRITES_TODAY:'100',
};
const path='/assets/main-ABCDEFGH.js';
const body=Buffer.from('original bytes');
const firstSeenAt=new Date(now-86400000).toISOString();
const rec={path,preSha256:createHash('sha256').update(body).digest('hex'),
  bytes:body.length,firstSeenAt,lastObservedAt:firstSeenAt};
async function fixture(fn) {
  const dir=await mkdtemp(join(tmpdir(),'immutable-archive-publish-'));
  try{return await fn(join(dir,'report.json'));}finally{await rm(dir,{force:true,recursive:true});}
}

test('release publisher fails before touching KV when approval, namespace or quota state absent',async()=>{
  await fixture(async(outputPath)=>{
    let called=0;
    const archiveTransport={listStoredRecords:async()=>{called++;return[];}};
    for(const changed of [
      {TEXASDEFINED_IMMUTABLE_ARCHIVE_OWNER_APPROVED:'false'},
      {TEXASDEFINED_IMMUTABLE_ARCHIVE_PUBLISH:'false'},
      {TEXASDEFINED_IMMUTABLE_KV_NAMESPACE_ID:''},
      {CLOUDFLARE_KV_ARCHIVE_TOKEN:''},
    ]) {
      await assert.rejects(prepublishApprovedImmutableAssets({
        env:{...env,...changed},now,outputPath,archiveTransport,
      }),/Missing protected/);
    }
    for(const changed of [
      {TEXASDEFINED_KV_WRITES_TODAY:''},
      {TEXASDEFINED_KV_WRITES_TODAY:'unknown'},
      {TEXASDEFINED_KV_WRITES_TODAY:'1001'},
    ]) await assert.rejects(prepublishApprovedImmutableAssets({
      env:{...env,...changed},now,outputPath,archiveTransport,
    }),/writes-today budget/);
    assert.equal(called,0);
  });
});
test('protected publisher verifies original bytes, idempotent put and emits no-routing evidence',async()=>{
  await fixture(async(outputPath)=>{
    const memory=new Map();let puts=0;
    const archiveTransport={
      listStoredRecords:async()=>[...memory.entries()].map(([key,obj])=>({
        path:key.slice('immutable:v1:'.length),preSha256:obj.metadata.sha256,
        bytes:obj.metadata.bytes,firstSeenAt:obj.metadata.firstSeenAt,
        lastObservedAt:obj.metadata.firstSeenAt,
      })),
      getWithMetadata:async(key)=>memory.get(key)||{value:null,metadata:null},
      put:async(key,value,{metadata})=>{puts++;memory.set(key,{value,metadata});},
    };
    const prepare=async ({published,sourceSha,now,writesToday})=>{
      assert.equal(sourceSha,env.GITHUB_SHA);
      assert.equal(now,Date.parse('2026-11-05T13:00:00Z'));
      return {plan:planImmutablePublication({
        stored:published,incoming:[rec],now,writesToday,
      }),readOriginalBytes:async()=>body};
    };
    const first=await prepublishApprovedImmutableAssets({
      env,now,outputPath,archiveTransport,prepare,
    });
    assert.equal(first.status,'original-bytes-prepublished-not-globally-certified');
    assert.equal(first.publishedOriginalCount,1);
    assert.equal(first.fullyReadBack,true);
    assert.equal(first.readyForWorkerRouting,false);
    assert.equal(first.globallyReplicated,false);
    assert.equal(puts,1);
    const saved=JSON.parse(await readFile(outputPath,'utf8'));
    assert.equal(saved.sourceSha,sourceSha);
    assert.equal(saved.noDelete,true);
    const second=await prepublishApprovedImmutableAssets({
      env,now,outputPath,archiveTransport,prepare,
    });
    assert.equal(second.publishedOriginalCount,0);
    assert.equal(second.previouslyPublishedCount,1);
    assert.equal(puts,1);
  });
});
test('publication failures produce explicit blocked report and never claim global visibility',async()=>{
  await fixture(async(outputPath)=>{
    const archiveTransport={
      listStoredRecords:async()=>[],
      getWithMetadata:async()=>({value:null,metadata:null}),
      put:async()=>{throw Error('protected storage unavailable');},
    };
    const prepare=async ({now,writesToday})=>({
      plan:planImmutablePublication({incoming:[rec],now,writesToday}),
      readOriginalBytes:async()=>body,
    });
    await assert.rejects(prepublishApprovedImmutableAssets({
      env,now,outputPath,archiveTransport,prepare,
    }),/protected storage unavailable/);
    const saved=JSON.parse(await readFile(outputPath,'utf8'));
    assert.equal(saved.status,'blocked');
    assert.equal(saved.readyForWorkerRouting,false);
    assert.equal(saved.globallyReplicated,false);
    assert.equal(saved.error,'protected storage unavailable');
  });
});
test('publication denies a fabricated success that claims the archive is globally safe',async()=>{
  await fixture(async(outputPath)=>{
    const archiveTransport={listStoredRecords:async()=>[]};
    const prepare=async()=>({plan:{},readOriginalBytes:async()=>body});
    await assert.rejects(prepublishApprovedImmutableAssets({
      env,now,outputPath,archiveTransport,prepare,
      publish:async()=>({fullyReadBack:true,readyForWorkerRouting:true,
        globallyReplicated:true}),
    }),/misrepresented immutable archive readiness/);
    const saved=JSON.parse(await readFile(outputPath,'utf8'));
    assert.equal(saved.status,'blocked');
  });
});
