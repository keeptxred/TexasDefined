// Dry-run only: deterministically materialize the predeployment archive
// evidence from the existing protected asset handoff and built client bytes.
// This has no Cloudflare credentials and must not be interpreted as publication.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { retentionCandidates } from './retain-critical-hashed-assets.mjs';
import { INCIDENT_OMITTED_PROOFS } from './incident-omitted-hashed-assets-20261102.mjs';
import { scanImmutableAssetBuild } from './immutable-hashed-asset-manifest.mjs';

const DEFAULT_SNAPSHOT='.artifacts/asset-handoff-snapshot.json';
const DEFAULT_RETENTION='.artifacts/retained-critical-assets-report.json';
const DEFAULT_OUTPUT='.artifacts/immutable-hashed-asset-plan.json';

export async function prepareImmutableArchivePlan({
  snapshotPath=DEFAULT_SNAPSHOT,
  retentionReportPath=DEFAULT_RETENTION,
  assetDirectory='dist/client/assets',
  outputPath=DEFAULT_OUTPUT,
  sourceSha=process.env.GITHUB_SHA,
  now=Date.now(),
  published=[],
  historicalProof=INCIDENT_OMITTED_PROOFS,
  writesToday=0, allowPartial=false,
}={}) {
  const [rawHistory,rawReport]=await Promise.all([
    readFile(snapshotPath,'utf8'),readFile(retentionReportPath,'utf8'),
  ]);
  const history=JSON.parse(rawHistory),report=JSON.parse(rawReport);
  if (!Array.isArray(history?.snapshots) || history.snapshots.length<1 ||
      !Array.isArray(report?.copied) || !Array.isArray(report?.unavailable))
    throw new Error('Missing required original Worker asset handoff evidence');
  if (report.failure || Number(report.ignoredOld || 0)>0 ||
      report.unavailable.length>0)
    throw new Error('Prior healthy assets were omitted or unavailable; archive plan cannot certify release');
  const candidateEvidence=retentionCandidates(history,now,historicalProof);
  const extraEvidence=[
    ...(report.copied||[]),
    ...(report.alreadyInBuildDetails||[]),
    ...(report.omittedDetails||[]),
  ];
  if (extraEvidence.some(x=>!x || !x.preSha256 || !x.path || !x.firstSeenAt))
    throw new Error('Malformed original-byte proof in prior-retention report; refusing omission');
  const inventory=await scanImmutableAssetBuild({
    assetDirectory,sourceSha,now,writesToday,published,allowPartial,
    requiredHistorical:[...candidateEvidence,...extraEvidence],
  });
  const manifest={
    ...inventory.manifest,
    mode:'PREDEPLOY_DRY_RUN_ONLY',
    archivePublished:false,
    globallyReplicated:false,
    readyForWorkerRouting:false,
    historicalProofCount:candidateEvidence.length+extraEvidence.length,
    remainingDailyWrites:inventory.plan.remainingDailyWrites,
    deferredRecordCount:inventory.plan.deferredPaths.length,
    archiveComplete:inventory.plan.archiveComplete,
    remainingBytes:inventory.plan.remainingBytes,
  };
  await mkdir(dirname(outputPath),{recursive:true});
  await writeFile(outputPath,JSON.stringify(manifest,null,2)+'\n');
  return {manifest,plan:inventory.plan,readOriginalBytes:inventory.readOriginalBytes};
}

if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  if (process.argv[2]!=='--plan') throw new Error('Expected --plan');
  const result=await prepareImmutableArchivePlan();
  console.log('[immutable-archive-plan] DRY RUN ONLY; no KV writes; source='+result.manifest.sourceSha+
    '; archived records='+result.manifest.archivedRecordCount+
    '; new writes required='+result.manifest.newRecordCount+
    '; historical proofs='+result.manifest.historicalProofCount);
}
