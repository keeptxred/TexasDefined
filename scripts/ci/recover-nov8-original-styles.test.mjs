import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {existsSync} from 'node:fs';
import {mkdtemp,mkdir,readFile,rm,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {recoverOriginalCss,originalCssUrl,VERIFIED_STYLES} from './recover-nov8-original-styles.mjs';

const V='953ec55d-c98c-41e8-b59e-613878d2a7c3';
const NOW=Date.parse('2026-11-08T15:45:00Z');
const CONTENT=Buffer.from('.verified-old-style{color:inherit}');
const fixture={name:'styles-Example123.css',sha256:createHash('sha256').update(CONTENT).digest('hex'),
  bytes:CONTENT.length,firstSeenAt:'2026-11-08T14:00:00.000Z'};
async function setup(){
  const root=await mkdtemp(join(tmpdir(),'td-source-css-'));
  const opts={snapshotPath:join(root,'snapshot.json'),
    reportPath:join(root,'report.json'),assetFolder:join(root,'assets')};
  await mkdir(opts.assetFolder,{recursive:true});
  await writeFile(opts.snapshotPath,JSON.stringify({snapshots:[
    {sourceCommit:'test',pages:[],builtAssets:[],retainedAssets:[]}
  ]}));
  return {root,opts};
}
test('two documented original CSS files use archived digest and original timestamps',()=>{
  assert.equal(VERIFIED_STYLES.length,2);
  assert.equal(VERIFIED_STYLES[0].name,'styles-Ckztjzs1.css');
  assert.equal(VERIFIED_STYLES[0].sha256,'a76c72bfdfbed25c3c915f0ea73df00714f0d567754f9dd1a13409a4319fdad0');
  assert.equal(VERIFIED_STYLES[1].sha256,'c247699ef384ddc47cbc767310b6008c5a95fd025756c3cbcf55f02e9b599785');
  assert.equal(VERIFIED_STYLES.reduce((n,x)=>n+x.bytes,0),285405);
  for (const file of VERIFIED_STYLES) {
    assert.ok(file.bytes>0&&file.bytes<=256*1024);
    assert.match(file.sha256,/^[a-f0-9]{64}$/);
    assert.ok(Date.parse(file.firstSeenAt)<NOW);
  }
  assert.ok(285405<512*1024);
  assert.equal(originalCssUrl(V,VERIFIED_STYLES[0].name),
    'https://953ec55d-texasdefined-site.freddy-coppola.workers.dev/assets/styles-Ckztjzs1.css');
  for (const [version,name] of [['invalid',VERIFIED_STYLES[0].name],
    [V,'../../private.css'],[V,'Header-ABCDE123.js'],[V,'styles-EXAMPLE.css?x=1']])
    assert.throws(()=>originalCssUrl(version,name));
});
test('restore exact original CSS byte-for-byte and preserve original firstSeenAt',async()=>{
  const {root,opts}=await setup();
  try{
    const seen=[];
    const r=await recoverOriginalCss({...opts,now:NOW,records:[fixture],fetchImpl:async (url,o)=>{
      seen.push(url);
      assert.equal(o.redirect,'manual');
      return new Response(CONTENT,{status:200,headers:{'content-type':'text/css; charset=utf-8'}});
    }});
    assert.equal(r.recovered.length,1);
    assert.equal(r.unresolved.length,0);
    assert.equal(r.recovered[0].sha256,fixture.sha256);
    assert.deepEqual(seen,[originalCssUrl(V,fixture.name)]);
    assert.deepEqual(await readFile(join(opts.assetFolder,fixture.name)),CONTENT);
    const saved=JSON.parse(await readFile(opts.snapshotPath,'utf8'));
    assert.equal(saved.snapshots[0].retainedAssets[0].kind,'css');
    assert.equal(saved.snapshots[0].retainedAssets[0].firstSeenAt,fixture.firstSeenAt);
    assert.equal(saved.snapshots[0].retainedAssets[0].preSha256,fixture.sha256);
  }finally{await rm(root,{recursive:true,force:true});}
});
test('HTTP404 and HTML challenges remain explicitly unresolved, never CSS',async()=>{
  const {root,opts}=await setup();
  try{
    for(const [status,mime] of [[404,'text/html'],[200,'text/html']]){
      const r=await recoverOriginalCss({...opts,now:NOW,records:[fixture],
        fetchImpl:async()=>new Response('not-CSS',{status,headers:{'content-type':mime}})});
      assert.equal(r.recovered.length,0);
      assert.equal(r.unresolved.length,1);
    }
    assert.equal(existsSync(join(opts.assetFolder,fixture.name)),false);
  }finally{await rm(root,{recursive:true,force:true});}
});
test('incorrect original SHA causes fail-closed before writing fake CSS',async()=>{
  const {root,opts}=await setup();
  try{
    await assert.rejects(recoverOriginalCss({...opts,now:NOW,records:[fixture],
      fetchImpl:async()=>new Response('h1{display:none}',{status:200,headers:{'content-type':'text/css'}})}),
      /Immutable original CSS SHA\/length mismatch/);
    assert.equal(existsSync(join(opts.assetFolder,fixture.name)),false);
  }finally{await rm(root,{recursive:true,force:true});}
});
test('72h age limit uses immutable earliest time and blocks expired copy',async()=>{
  const {root,opts}=await setup();
  try{
    const r=await recoverOriginalCss({...opts,now:Date.parse('2026-11-11T20:00:00Z'),
      records:VERIFIED_STYLES,
      fetchImpl:async()=>{throw Error('expired original must not fetch')}});
    assert.equal(r.expired.length,2);
    assert.equal(r.unresolved.length,0);
    assert.equal(r.recovered.length,0);
  }finally{await rm(root,{recursive:true,force:true});}
});
test('two-file and 512KiB strict budgets cannot silently expand',async()=>{
  const {root,opts}=await setup();
  try{
    await assert.rejects(recoverOriginalCss({...opts,now:NOW,
      records:[fixture,fixture,fixture],fetchImpl:async()=>{throw Error('no fetch')}}),
      /original CSS recovery budget exceeded/i);
    const over={...fixture,bytes:512*1024};
    await assert.rejects(recoverOriginalCss({...opts,now:NOW,
      records:[over],fetchImpl:async()=>{throw Error('no fetch')}}),
      /original CSS recovery budget exceeded|Invalid SHA or original CSS byte count/i);
  }finally{await rm(root,{recursive:true,force:true});}
});
