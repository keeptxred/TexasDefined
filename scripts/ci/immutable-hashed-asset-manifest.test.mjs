import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, writeFile, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { scanImmutableAssetBuild } from './immutable-hashed-asset-manifest.mjs';
import { publishImmutableArchive } from './immutable-hashed-asset-publisher.mjs';

const now=Date.parse('2026-11-05T12:00:00Z');
const earlier=new Date(now-2*86400000).toISOString();
const commit='b'.repeat(40);
const hash=(buf)=>createHash('sha256').update(buf).digest('hex');
async function withFixture(fn) {
  const dir=await mkdtemp(join(tmpdir(),'td-immutable-archive-'));
  try { await fn(dir); } finally { await rm(dir,{recursive:true,force:true}); }
}

test('predeploy inventory derives original SHA from actual compiled bytes and preserves old first-seen',async()=>{
  await withFixture(async(dir)=>{
    const main=Buffer.from('console.log("previous release");');
    const css=Buffer.from('body{display:block}');
    await writeFile(join(dir,'main-ABCDEFGH.js'),main);
    await writeFile(join(dir,'property-tax.ABCDEFGH.css'),css);
    await writeFile(join(dir,'photo.jpg'),Buffer.from('not executable'));
    const old={path:'/assets/main-ABCDEFGH.js',
      preSha256:hash(main),firstSeenAt:earlier,bytes:main.length};
    const inventory=await scanImmutableAssetBuild({
      assetDirectory:dir,sourceSha:commit,now,requiredHistorical:[old],
    });
    assert.equal(inventory.manifest.sourceSha,commit);
    assert.equal(inventory.manifest.newRecordCount,2);
    assert.equal(inventory.manifest.skippedNonJsCss,1);
    assert.equal(inventory.plan.newWrites,2);
    assert.equal(inventory.manifest.records.find(x=>x.path===old.path).firstSeenAt,earlier);
    assert.deepEqual(await inventory.readOriginalBytes(old),main);

    const kvMap=new Map();
    const kv={
      getWithMetadata:async(k)=>kvMap.get(k)||{value:null,metadata:null},
      put:async(k,value,{metadata})=>{kvMap.set(k,{value,metadata});},
    };
    const publication=await publishImmutableArchive({
      plan:inventory.plan,namespace:kv,readOriginalBytes:inventory.readOriginalBytes,
    });
    assert.equal(publication.newlyPublished,2);
    assert.equal(publication.fullyReadBack,true);
    assert.equal(publication.readyForWorkerRouting,false);
  });
});

test('archive plan refuses to forget a previously verified unarchived hash',async()=>{
  await withFixture(async(dir)=>{
    const old={path:'/assets/old-ABCDEFGH.js',preSha256:hash('historical'),
      bytes:Buffer.byteLength('historical'),firstSeenAt:earlier};
    await assert.rejects(scanImmutableAssetBuild({
      assetDirectory:dir,sourceSha:commit,now,requiredHistorical:[old],
    }),/Previously healthy unarchived original bytes missing/);
    const published={...old,lastObservedAt:earlier};
    const inventory=await scanImmutableAssetBuild({
      assetDirectory:dir,sourceSha:commit,now,requiredHistorical:[old],
      published:[published],
    });
    assert.equal(inventory.plan.newWrites,0);
    assert.equal(inventory.manifest.archivedRecordCount,1);
  });
});

test('archive inventory rejects a previously verified path whose compiled bytes changed',async()=>{
  await withFixture(async(dir)=>{
    const file='main-ABCDEFGH.js';
    await writeFile(join(dir,file),'changed');
    await assert.rejects(scanImmutableAssetBuild({
      assetDirectory:dir,sourceSha:commit,now,
      requiredHistorical:[{path:'/assets/'+file,preSha256:hash('original'),firstSeenAt:earlier}],
    }),/Current build contradicts previously verified original bytes/);
  });
});

test('revalidate actual source bytes immediately before immutable publication',async()=>{
  await withFixture(async(dir)=>{
    const file=join(dir,'main-ABCDEFGH.js');
    await writeFile(file,'original');
    const inventory=await scanImmutableAssetBuild({assetDirectory:dir,sourceSha:commit,now});
    await writeFile(file,'malicious or accidental rebuild');
    await assert.rejects(inventory.readOriginalBytes(inventory.plan.toPublish[0]),
      /Original build changed after evidence capture/);
  });
});

test('fail closed on unhashed JS/CSS, nonregular files, and missing commit identity',async()=>{
  await withFixture(async(dir)=>{
    await writeFile(join(dir,'main.js'),'unhashed');
    await assert.rejects(scanImmutableAssetBuild({assetDirectory:dir,sourceSha:commit,now}),
      /Unhashed or unsafe JS\/CSS/);
    await rm(join(dir,'main.js'));
    await writeFile(join(dir,'target.txt'),'contents');
    await symlink(join(dir,'target.txt'),join(dir,'main-ABCDEFGH.js'));
    await assert.rejects(scanImmutableAssetBuild({assetDirectory:dir,sourceSha:commit,now}),
      /Refusing non-file or symlink/);
    await assert.rejects(scanImmutableAssetBuild({assetDirectory:dir,sourceSha:'not-a-sha',now}),
      /prerequisites missing/);
  });
});
