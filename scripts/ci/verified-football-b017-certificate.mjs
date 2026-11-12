// Immutable source/Worker-pinned Batch017 technical graduation witness.
// Do not infer Google indexing, licensed school photos, scores or human signoff.
export const B017_SLUGS=Object.freeze([
  "el-paso-eastlake",
  "el-paso-eastwood",
  "el-paso-el-dorado",
  "el-paso-franklin",
  "el-paso-hanks",
  "el-paso-irvin",
  "el-paso-jefferson",
  "el-paso-montwood",
  "el-paso-parkland",
  "el-paso-pebble-hills",
  "el-paso-riverside",
  "el-paso-socorro",
  "el-paso-ysleta",
  "eldorado",
  "electra",
  "elgin",
  "elkhart",
  "elysian-fields",
  "ennis",
  "era",
  "euless-trinity",
  "eustace",
  "evadale",
  "evant",
  "everman"
]);
const SIGNED=Object.freeze({
  runId:43323945805, artifactId:13992037938,
  artifactSha256:'d11710df24fbbf1fea7fb959664e3c02bafe393670c355cb54dd8738ebc05555',
  sourceSha:'61a59f98ed2507238d3bc8998dd3c80107e0abb4',
  worker:'329de1b4-1bf8-48a9-b4c5-7223c1d2c6cc', ledgerId:7751927416,
  cloudflareDeploymentId:'81948b24-7ca1-4f5c-bf0b-1210d02f2cb0',
});
export function certifiedBatch017(registry) {
  if(!SIGNED.runId || !SIGNED.artifactId || !SIGNED.ledgerId ||
     !/^[a-f0-9]{64}$/.test(SIGNED.artifactSha256) ||
     !/^[a-f0-9]{40}$/.test(SIGNED.sourceSha) ||
     !/^[a-f0-9-]{36}$/.test(SIGNED.worker) ||
     !/^[a-f0-9-]{36}$/.test(SIGNED.cloudflareDeploymentId))return false;
  const cert=registry.batch?.number===17?registry.batch:registry.completedBatches?.find(x=>x.number===17);
  const e=cert?.technicalAcceptance, rows=registry.schoolRecords;
  if(cert?.state!=='VERIFIED_BATCH_017_COMPLETE' || cert?.individuallyVerified!==25 ||
     cert?.remainingAssigned!==0 || cert?.remainingToImplement!==0 ||
     cert?.remainingToVerify!==0 || cert?.noNextBatchAssigned!==true ||
     JSON.stringify(cert?.slugs)!==JSON.stringify(B017_SLUGS) ||
     e?.schoolCount!==25 || e?.schoolCasesPassed!==75 || e?.schoolCasesFailed!==0 ||
     e?.countyCasesPassed!==25 || e?.countyCasesFailed!==0 ||
     e?.screenshotsSaved!==75 || e?.browserExecutionCount!==1 ||
     e?.workerVersionMatchesDeploy!==true ||
     JSON.stringify(e?.viewports)!==JSON.stringify([1366,390,320]) ||
     e?.chromeRunId!==SIGNED.runId || e?.chromeArtifactId!==SIGNED.artifactId ||
     e?.artifactSha256!==SIGNED.artifactSha256 ||
     e?.productionDeploymentGitSha!==SIGNED.sourceSha ||
     e?.observedWorkerVersions?.length!==1 || e.observedWorkerVersions[0]!==SIGNED.worker ||
     e?.githubWorkerLedgerDeploymentId!==SIGNED.ledgerId ||
     e?.cloudflareDeploymentId!==SIGNED.cloudflareDeploymentId ||
     e?.sitemapNotAssertedByThisChromeRun!==true ||
     e?.manualAccessibilityAccepted!==false ||
     e?.schoolPhotoReuseRightsAccepted!==false || e?.editorialHumanSignoffsClaimed!==0 ||
     rows?.length!==1292 || rows.filter(x=>x.batch===17).length!==25 ||
     rows.filter(x=>x.status==='VERIFIED'&&x.batch<17).length!==380 ||
     rows.filter(x=>x.status==='VERIFIED').length!==405 ||
     rows.filter(x=>x.status==='IMPLEMENTED').length!==0 ||
     rows.filter(x=>x.status==='NOT_REVIEWED').length!==887 ||
     rows.some(x=>x.status==='VERIFIED'&&x.batch>17))return false;
  return B017_SLUGS.every(slug=>{
    const x=rows.find(y=>y.slug===slug);
    return x?.batch===17 && x.status==='VERIFIED' && x.actualProductionVerified===true &&
      x.technicalBrowserRun===SIGNED.runId && x.acceptanceEvidenceArtifact===SIGNED.artifactId &&
      x.productionWorkerVersion===SIGNED.worker && x.verifiedDeploymentGitSha===SIGNED.sourceSha &&
      x.verifiedGithubWorkerLedgerDeploymentId===SIGNED.ledgerId &&
      x.manualAccessibilityAccepted===false && x.schoolPhotoReuseRightsAccepted===false &&
      x.editorialHumanSignoff===false;
  });
}
