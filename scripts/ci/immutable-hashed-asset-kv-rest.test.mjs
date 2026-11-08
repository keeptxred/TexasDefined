import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createImmutableKvRestTransport } from './immutable-hashed-asset-kv-rest.mjs';
import { immutableAssetKey } from './immutable-hashed-asset-archive.mjs';
import { publishImmutableArchive } from './immutable-hashed-asset-publisher.mjs';
import { planImmutablePublication } from './immutable-hashed-asset-archive.mjs';

const accountId='a'.repeat(32),namespaceId='b'.repeat(32),token='example-test-only-not-a-secret';
const now=Date.parse('2026-11-05T13:00:00Z');
const seen=new Date(now-86400000).toISOString();
const path='/assets/main-ABCDEFGH.js',original=Buffer.from('console.log("immutable original");');
const sha=createHash('sha256').update(original).digest('hex');
const record={path,preSha256:sha,bytes:original.length,firstSeenAt:seen,lastObservedAt:seen};
const metadata={version:1,path,sha256:sha,bytes:original.length,
  firstSeenAt:seen,contentType:'text/javascript'};
const key=immutableAssetKey(path);
const ok=(result)=>Response.json({success:true,errors:[],messages:[],result});
const root='https://api.cloudflare.com/client/v4/accounts/'+accountId+
  '/storage/kv/namespaces/'+namespaceId;

test('KV REST transport refuses missing authority before any fetch',()=>{
  let network=0;
  assert.throws(()=>createImmutableKvRestTransport({
    accountId:'?',namespaceId,token,fetchImpl:async()=>{network++;},
  }),/Dedicated KV/);
  assert.equal(network,0);
});
test('KV REST listing preserves original metadata, cursor pagination, no expiration',async()=>{
  const key2=immutableAssetKey('/assets/styles-IJKL1234.css');
  const metadata2={...metadata,path:'/assets/styles-IJKL1234.css',
    contentType:'text/css',sha256:'c'.repeat(64)};
  const queried=[];
  const kv=createImmutableKvRestTransport({
    accountId,namespaceId,token,
    fetchImpl:async (url,opts)=>{
      const u=new URL(url), cursor=u.searchParams.get('cursor');
      queried.push({url:u,opts});
      assert.equal(u.origin,'https://api.cloudflare.com');
      assert.equal(opts.headers.Authorization,'Bearer '+token);
      assert.equal(opts.redirect,'error');
      assert.equal(u.searchParams.get('prefix'),'immutable:v1:/assets/');
      assert.equal(u.searchParams.get('limit'),'1000');
      if(!cursor) return Response.json({success:true,result:[{name:key,metadata}],
        result_info:{cursor:'opaque-next-token'}});
      assert.equal(cursor,'opaque-next-token');
      return Response.json({success:true,result:[{name:key2,metadata:metadata2}],
        result_info:{}});
    },
  });
  const records=await kv.listStoredRecords({now});
  assert.equal(records.length,2);
  assert.equal(records.find(x=>x.path===path).preSha256,sha);
  assert.equal(records.find(x=>x.path===path).firstSeenAt,seen);
  assert.equal(queried.length,2);
});
test('publish flow uses encoded key path, multipart metadata, binary bytes and readback',async()=>{
  let object=null;const requests=[];
  const kv=createImmutableKvRestTransport({accountId,namespaceId,token,
    fetchImpl:async (url,opts)=>{
      const u=new URL(url);requests.push({u,method:opts.method});
      assert.equal(opts.headers.Authorization,'Bearer '+token);
      assert.equal(u.pathname.includes('%3A'),true,'KV key colon must be URL-encoded');
      if(opts.method==='PUT') {
        assert.ok(opts.body instanceof FormData);
        assert.equal(opts.headers['Content-Type'],undefined,'FormData must set multipart boundary itself');
        const meta=JSON.parse(opts.body.get('metadata'));
        const value=Buffer.from(await opts.body.get('value').arrayBuffer());
        assert.deepEqual(value,original);
        assert.deepEqual(meta,metadata);
        object={value,metadata:meta};
        return ok({});
      }
      if(u.pathname.includes('/metadata/'))
        return object?ok(object.metadata):new Response('missing',{status:404});
      return object?new Response(object.value,{status:200}):
        new Response('missing',{status:404});
    },
  });
  const plan=planImmutablePublication({incoming:[record],now});
  const first=await publishImmutableArchive({
    plan,namespace:kv,readOriginalBytes:async()=>original,
  });
  assert.equal(first.newlyPublished,1);
  assert.equal(first.fullyReadBack,true);
  assert.equal(first.readyForWorkerRouting,false);
  const second=await publishImmutableArchive({
    plan,namespace:kv,readOriginalBytes:async()=>original,
  });
  assert.equal(second.newlyPublished,0);
  assert.equal(second.alreadyPresent,1);
  assert.equal(requests.filter(x=>x.method==='PUT').length,1,
    'Immutable same-key bytes must never be rewritten on replay');
});
test('REST adapter does not silently hide forbidden, throttled or corrupt metadata',async()=>{
  for(const code of [403,429,500]) {
    const kv=createImmutableKvRestTransport({accountId,namespaceId,token,
      fetchImpl:async()=>new Response('denied',{status:code})});
    await assert.rejects(kv.getWithMetadata(key,'arrayBuffer'),new RegExp('HTTP '+code));
  }
  const kv=createImmutableKvRestTransport({accountId,namespaceId,token,
    fetchImpl:async url=>new URL(url).pathname.includes('/metadata/')?
      ok(null):new Response(original,{status:200})});
  await assert.rejects(kv.getWithMetadata(key,'arrayBuffer'),
    /missing KV metadata/);
});
test('listing rejects missing, expiring, duplicate or contradictory archive metadata',async()=>{
  for(const entry of [
    {name:key},
    {name:key,metadata,expiration:Math.floor(now/1000)+60},
    {name:key,metadata:{...metadata,sha256:'x'}},
  ]) {
    const kv=createImmutableKvRestTransport({accountId,namespaceId,token,
      fetchImpl:async()=>ok([entry])});
    await assert.rejects(kv.listStoredRecords({now}),/Invalid|conflicts|SHA-256/);
  }
  const kv=createImmutableKvRestTransport({accountId,namespaceId,token,
    fetchImpl:async()=>Response.json({success:true,
      result:[{name:key,metadata},{name:key,metadata}],result_info:{}})});
  await assert.rejects(kv.listStoredRecords({now}),/duplicated/);
});
test('listing rejects non-progressing opaque cursors and unauthenticated reads',async()=>{
  const kv=createImmutableKvRestTransport({accountId,namespaceId,token,
    fetchImpl:async()=>Response.json({success:true,result:[],result_info:{cursor:'same'}})});
  await assert.rejects(kv.listStoredRecords({now}),/repeated KV listing cursor/);
  const blocked=createImmutableKvRestTransport({accountId,namespaceId,token,
    fetchImpl:async()=>Response.json({success:false,errors:[{code:10000}]},{status:403})});
  await assert.rejects(blocked.listStoredRecords({now}),/HTTP 403/);
});

test('direct KV transport refuses same-length tampered bytes before any network write',async()=>{
  let requests=0;
  const kv=createImmutableKvRestTransport({accountId,namespaceId,token,
    fetchImpl:async()=>{requests++;return ok({});}});
  const altered=Buffer.from(original);
  altered[0]=altered[0]===33?34:33;
  assert.equal(altered.length,original.length);
  await assert.rejects(
    kv.put(key,altered,{metadata}),
    /Refuse original-byte SHA mismatch/,
  );
  assert.equal(requests,0);
  await assert.rejects(
    kv.put(key,original,{metadata:{...metadata,sha256:'0'.repeat(64)}}),
    /Refuse original-byte SHA mismatch/,
  );
  assert.equal(requests,0);
});
