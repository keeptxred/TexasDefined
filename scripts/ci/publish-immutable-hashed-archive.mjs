// Release-only, explicitly authorized KV prepublication orchestrator.
// Never executed by default. No namespace provisioning, Worker deploy, routing
// changes, GC or automatic paid plan. All output excludes credentials.
import { mkdir,writeFile } from 'node:fs/promises';
import { dirname,resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createImmutableKvRestTransport } from './immutable-hashed-asset-kv-rest.mjs';
import { prepareImmutableArchivePlan } from './prepare-immutable-hashed-asset-manifest.mjs';
import { publishImmutableArchive } from './immutable-hashed-asset-publisher.mjs';

const COMMIT=/^[a-f0-9]{40}$/;
const ID=/^[a-f0-9]{32}$/;
export async function prepublishApprovedImmutableAssets({
  env=process.env,now=Date.now(),archiveTransport,prepare=prepareImmutableArchivePlan,
  publish=publishImmutableArchive,outputPath='.artifacts/immutable-archive-publication.json',
}={}) {
  const sourceSha=env.GITHUB_SHA;
  if (env.TEXASDEFINED_IMMUTABLE_ARCHIVE_OWNER_APPROVED!=='true' ||
      env.TEXASDEFINED_IMMUTABLE_ARCHIVE_PUBLISH!=='true' ||
      !COMMIT.test(sourceSha || '') ||
      !ID.test(env.CLOUDFLARE_ACCOUNT_ID || '') ||
      !ID.test(env.TEXASDEFINED_IMMUTABLE_KV_NAMESPACE_ID || '') ||
      !env.CLOUDFLARE_KV_ARCHIVE_TOKEN)
    throw new Error('Missing protected, explicit immutable archive publication authorization');
  const writesToday=Number(env.TEXASDEFINED_KV_WRITES_TODAY);
  if (typeof env.TEXASDEFINED_KV_WRITES_TODAY!=='string' ||
      !/^\d+$/.test(env.TEXASDEFINED_KV_WRITES_TODAY) ||
      !Number.isSafeInteger(writesToday) || writesToday<0 || writesToday>1000)
    throw new Error('Cannot independently establish bounded KV writes-today budget');
  const archive=archiveTransport || createImmutableKvRestTransport({
    accountId:env.CLOUDFLARE_ACCOUNT_ID,
    namespaceId:env.TEXASDEFINED_IMMUTABLE_KV_NAMESPACE_ID,
    token:env.CLOUDFLARE_KV_ARCHIVE_TOKEN,
  });
  let report;
  try {
    const stored=await archive.listStoredRecords({now});
    const allowPartial=env.TEXASDEFINED_IMMUTABLE_ARCHIVE_BOOTSTRAP==='true';
    const {plan,readOriginalBytes}=await prepare({published:stored,
      sourceSha,now,writesToday,allowPartial});
    const result=await publish({plan,namespace:archive,readOriginalBytes});
    if (typeof result.fullyReadBack!=='boolean' ||
        result.readyForWorkerRouting!==false || result.globallyReplicated!==false)
      throw new Error('Publisher misrepresented immutable archive readiness');
    report={format:1,status:result.fullyReadBack?
      'original-bytes-prepublished-not-globally-certified':
      'partial-originals-prepublished-not-globally-certified',
      sourceSha,checkedAt:new Date(now).toISOString(),
      publishedOriginalCount:result.newlyPublished,
      previouslyPublishedCount:result.alreadyPresent,
      checkedOriginalCount:result.checked,
      deferredOriginalCount:result.deferredCount,
      bytesPublished:result.bytesPublished,
      allRecords:plan.allRecords.length,
      remainingDailyWrites:plan.remainingDailyWrites,
      noDelete:true,fullyReadBack:result.fullyReadBack,
      globallyReplicated:false,readyForWorkerRouting:false};
  } catch(e) {
    report={format:1,status:'blocked',sourceSha,
      checkedAt:new Date(now).toISOString(),error:String(e?.message || e),
      globallyReplicated:false,readyForWorkerRouting:false};
    await mkdir(dirname(outputPath),{recursive:true});
    await writeFile(outputPath,JSON.stringify(report,null,2)+'\n');
    throw e;
  }
  await mkdir(dirname(outputPath),{recursive:true});
  await writeFile(outputPath,JSON.stringify(report,null,2)+'\n');
  return report;
}
if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  if(process.argv[2]!=='--publish-approved')
    throw new Error('Explicit --publish-approved required');
  const report=await prepublishApprovedImmutableAssets();
  console.log('[immutable-prepublication] '+JSON.stringify({
    sourceSha:report.sourceSha,status:report.status,
    checkedOriginalCount:report.checkedOriginalCount,
    publishedOriginalCount:report.publishedOriginalCount,
    deferredOriginalCount:report.deferredOriginalCount,
    readyForWorkerRouting:report.readyForWorkerRouting,
  }));
}
