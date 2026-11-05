import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { prepareImmutableArchivePlan } from './prepare-immutable-hashed-asset-manifest.mjs';

const sourceSha='c'.repeat(40);
const now=Date.parse('2026-11-05T12:00:00Z');
const firstSeenAt=new Date(now-86400000).toISOString();
const path='/assets/main-ABCDEFGH.js';
const body=Buffer.from('console.log("known working binary")');
const digest=createHash('sha256').update(body).digest('hex');

async function fixture(fn) {
  const root=await mkdtemp(join(tmpdir(),'td-immutable-predeploy-'));
  const assets=join(root,'assets'),snapshot=join(root,'snapshot.json');
  const report=join(root,'report.json'),output=join(root,'plan.json');
  await mkdir(assets);
  const history={snapshots:[{capturedAt:new Date(now).toISOString(),
    pages:[{assets:[{path,preSha256:digest,firstSeenAt,wasAvailable:true}]}]}]};
  const retention={copied:[],alreadyInBuildDetails:[],omittedDetails:[],
    unavailable:[],ignoredOld:0};
  await writeFile(snapshot,JSON.stringify(history));
  await writeFile(report,JSON.stringify(retention));
  try { await fn({root,assets,snapshot,report,output,history,retention}); }
  finally {await rm(root,{recursive:true,force:true});}
}

test('dry-run predeploy plan faithfully reconciles original healthy Worker proof and disk bytes',async()=>{
  await fixture(async({assets,snapshot,report,output})=>{
    await writeFile(join(assets,'main-ABCDEFGH.js'),body);
    const result=await prepareImmutableArchivePlan({
      assetDirectory:assets,snapshotPath:snapshot,retentionReportPath:report,
      outputPath:output,sourceSha,now,historicalProof:[],
    });
    assert.equal(result.manifest.sourceSha,sourceSha);
    assert.equal(result.manifest.mode,'PREDEPLOY_DRY_RUN_ONLY');
    assert.equal(result.manifest.archivePublished,false);
    assert.equal(result.manifest.globallyReplicated,false);
    assert.equal(result.manifest.readyForWorkerRouting,false);
    assert.equal(result.manifest.historicalProofCount,1);
    assert.equal(result.plan.newWrites,1);
    assert.equal(result.manifest.records[0].firstSeenAt,firstSeenAt);
    assert.equal(result.manifest.records[0].preSha256,digest);
    assert.deepEqual(await result.readOriginalBytes(result.plan.toPublish[0]),body);
    const saved=JSON.parse(await readFile(output,'utf8'));
    assert.deepEqual(saved,result.manifest);
  });
});

test('dry-run fails closed if any previously healthy hash is absent from the build or archive',async()=>{
  await fixture(async({assets,snapshot,report,output})=>{
    await assert.rejects(prepareImmutableArchivePlan({
      assetDirectory:assets,snapshotPath:snapshot,retentionReportPath:report,
      outputPath:output,sourceSha,now,historicalProof:[],
    }),/Previously healthy unarchived original bytes missing/);
  });
});

test('dry-run refuses incomplete prior-retention reports rather than silently dropping a file',async()=>{
  await fixture(async({assets,snapshot,report,output,retention})=>{
    await writeFile(join(assets,'main-ABCDEFGH.js'),body);
    await writeFile(report,JSON.stringify({...retention,unavailable:[{path,status:404}]}));
    await assert.rejects(prepareImmutableArchivePlan({
      assetDirectory:assets,snapshotPath:snapshot,retentionReportPath:report,
      outputPath:output,sourceSha,now,historicalProof:[],
    }),/omitted or unavailable/);
  });
});

test('dry-run detects contradiction between current build bytes and handoff original SHA',async()=>{
  await fixture(async({assets,snapshot,report,output})=>{
    await writeFile(join(assets,'main-ABCDEFGH.js'),'changed after last successful Worker');
    await assert.rejects(prepareImmutableArchivePlan({
      assetDirectory:assets,snapshotPath:snapshot,retentionReportPath:report,
      outputPath:output,sourceSha,now,historicalProof:[],
    }),/Current build contradicts previously verified original bytes/);
  });
});

test('dry-run rejects malformed original retention proof rather than filtering it away',async()=>{
  await fixture(async({assets,snapshot,report,output,retention})=>{
    await writeFile(join(assets,'main-ABCDEFGH.js'),body);
    await writeFile(report,JSON.stringify({...retention,copied:[{path,firstSeenAt}]}));
    await assert.rejects(prepareImmutableArchivePlan({
      assetDirectory:assets,snapshotPath:snapshot,retentionReportPath:report,
      outputPath:output,sourceSha,now,historicalProof:[],
    }),/Malformed original-byte proof/);
  });
});
