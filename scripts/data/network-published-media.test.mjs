import test from 'node:test';
import assert from 'node:assert/strict';
import {writeImmutableNetworkPublishedImage} from '../../src/data/network-published-media.server.ts';

const path='11111111-1111-4111-8111-111111111111/featured-22222222/photo.webp';
const webp=(bytes)=>new Blob([Uint8Array.from(bytes)],{type:'image/webp'});

function fixture(){
 const saved=new Map(),calls=[];
 const storage={
  async upload(key,bytes,options){
   calls.push({kind:'upload',key,options});
   if(saved.has(key))return {error:{statusCode:'409',code:'KeyAlreadyExists'}};
   saved.set(key,new Blob([bytes],{type:options.contentType}));
   return {error:null};
  },
  async download(key){
   calls.push({kind:'download',key});
   return saved.has(key)?{data:saved.get(key),error:null}:{data:null,error:{statusCode:'404'}};
  },
 };
 return {saved,calls,storage};
}
test('new publication writes exactly once with upsert permanently disabled',async()=>{
 const f=fixture(),original=webp([82,73,70,70,1,2,3,4,87,69,66,80]);
 assert.equal(await writeImmutableNetworkPublishedImage(f.storage,path,original,'image/webp'),'created');
 assert.equal(f.calls.filter(x=>x.kind==='upload').length,1);
 assert.deepEqual(f.calls[0].options,{contentType:'image/webp',upsert:false});
 assert.equal(f.calls.filter(x=>x.kind==='download').length,0);
});
test('ambiguous retry validates existing identical bytes and preserves immutable object',async()=>{
 const f=fixture(),blob=webp([82,73,70,70,0,0,0,0,87,69,66,80]);
 await writeImmutableNetworkPublishedImage(f.storage,path,blob,'image/webp');
 const before=f.saved.get(path);
 assert.equal(await writeImmutableNetworkPublishedImage(f.storage,path,blob,'image/webp'),'verified-existing');
 assert.equal(f.saved.get(path),before,'existing public Blob is never replaced');
 assert.equal(f.calls.filter(x=>x.kind==='download').length,1);
 assert.ok(f.calls.filter(x=>x.kind==='upload').every(x=>x.options.upsert===false));
});
test('same target with different bytes fails closed and leaves approved image unchanged',async()=>{
 const f=fixture(),original=webp([82,73,70,70,1,2,3,4,87,69,66,80]);
 await writeImmutableNetworkPublishedImage(f.storage,path,original,'image/webp');
 const before=f.saved.get(path);
 await assert.rejects(writeImmutableNetworkPublishedImage(f.storage,path,webp([82,73,70,70,7,8,9,0,87,69,66,80]),'image/webp'),/differs/);
 assert.equal(f.saved.get(path),before);
});
test('upload failure without a pre-existing object is never reported as success',async()=>{
 const f=fixture();
 f.storage.upload=async()=>({error:{statusCode:'503'}});
 await assert.rejects(writeImmutableNetworkPublishedImage(f.storage,path,webp([1]),'image/webp'),/could not be verified/);
});
test('existing-object read error or content-type mismatch fails closed',async()=>{
 const f=fixture();
 f.saved.set(path,webp([1,2,3]));
 f.storage.download=async()=>({data:null,error:{statusCode:'503'}});
 await assert.rejects(writeImmutableNetworkPublishedImage(f.storage,path,webp([1,2,3]),'image/webp'),/could not be verified/);
 f.storage.download=async()=>({data:new Blob([Uint8Array.from([1,2,3])],{type:'image/png'}),error:null});
 await assert.rejects(writeImmutableNetworkPublishedImage(f.storage,path,webp([1,2,3]),'image/webp'),/could not be verified/);
});
test('a documented network outage after successful Storage commit reconciles identical content',async()=>{
 const f=fixture(),blob=webp([1,2,3]);
 f.saved.set(path,blob);
 f.storage.upload=async()=>({error:{statusCode:'503',message:'connection lost after commit'}});
 assert.equal(await writeImmutableNetworkPublishedImage(f.storage,path,blob,'image/webp'),'verified-existing');
});
test('untrusted media path, mime type and oversize are rejected before touching Storage',async()=>{
 const f=fixture();
 for(const [p,b,t] of [
  ['/absolute/image.webp',webp([1]),'image/webp'],
  ['../outside.webp',webp([1]),'image/webp'],
  ['',webp([1]),'image/webp'],
  [path,webp([1]),'image/svg+xml'],
  [path,new Blob([], {type:'image/webp'}),'image/webp'],
  [path,new Blob([new Uint8Array(3_000_001)],{type:'image/webp'}),'image/webp'],
 ])await assert.rejects(writeImmutableNetworkPublishedImage(f.storage,p,b,t),/Invalid approved/);
 assert.equal(f.calls.length,0);
});
