// Fail-closed Batch016 graduation contract. Fill immutable identities ONLY
// after a successful source/Worker-pinned 75-view + 25-county real Chrome run.
import { certifiedBatch015 } from './verified-football-b015-certificate.mjs';
export const B016_SLUGS=Object.freeze([
  'early','earth-springlake','east-bernard','east-chambers','eastland',
  'edcouch-elsa','eden','edgewood','edinburg','edinburg-economedes',
  'edinburg-north','edinburg-vela','edna','el-campo','el-maton-tidehaven',
  'el-paso','el-paso-americas','el-paso-andress','el-paso-austin','el-paso-bel-air',
  'el-paso-bowie','el-paso-burges','el-paso-chapin','el-paso-coronado','el-paso-del-valle',
]);
const SIGNED=Object.freeze({
  // Immutable 2026-11-11 release, GitHub source-to-Worker verified ledger and Chrome artifact.
  runId:42973704827, artifactId:13834158441, sourceSha:'14047a3934631991008361e77cd68401be493138', worker:'71fbb9a5-0dba-403a-abce-20c76dc20f8d', ledgerId:7703563654, cloudflareDeploymentId:'ce0ba0e5-4680-46e4-a6b7-acdb087d8b78',
});
export function certifiedBatch016(registry) {
  if (!SIGNED.runId || !SIGNED.artifactId || !SIGNED.ledgerId ||
      !/^[a-f0-9]{40}$/.test(SIGNED.sourceSha) ||
      !/^[a-f0-9-]{36}$/.test(SIGNED.worker) ||
      !/^[a-f0-9-]{36}$/.test(SIGNED.cloudflareDeploymentId)) return false;
  if(!certifiedBatch015(registry))return false;
  const cert=registry.batch?.number===16?registry.batch:registry.completedBatches?.find(x=>x.number===16);
  const e=cert?.technicalAcceptance;
  if(cert?.state!=='VERIFIED_BATCH_016_COMPLETE' || cert?.individuallyVerified!==25 ||
     cert?.remainingAssigned!==0 || cert?.remainingToImplement!==0 ||
     cert?.remainingToVerify!==0 || cert?.noNextBatchAssigned!==true ||
     JSON.stringify(cert?.slugs)!==JSON.stringify(B016_SLUGS) ||
     e?.schoolCount!==25 || e?.schoolCasesPassed!==75 || e?.schoolCasesFailed!==0 ||
     e?.countyCasesPassed!==25 || e?.countyCasesFailed!==0 ||
     e?.browserExecutionCount!==1 || e?.workerVersionMatchesDeploy!==true ||
     JSON.stringify(e?.viewports)!==JSON.stringify([1366,390,320]) ||
     e?.chromeRunId!==SIGNED.runId || e?.chromeArtifactId!==SIGNED.artifactId ||
     e?.productionDeploymentGitSha!==SIGNED.sourceSha ||
     e?.observedWorkerVersions?.length!==1 || e.observedWorkerVersions[0]!==SIGNED.worker ||
     e?.githubWorkerLedgerDeploymentId!==SIGNED.ledgerId ||
     e?.cloudflareDeploymentId!==SIGNED.cloudflareDeploymentId ||
     e?.manualAccessibilityAccepted!==false || e?.schoolPhotoReuseRightsAccepted!==false ||
     e?.editorialHumanSignoffsClaimed!==0) return false;
  const rows=registry.schoolRecords;
  if(rows.length!==1292 || rows.filter(x=>x.batch===16).length!==25 ||
     rows.filter(x=>x.status==='VERIFIED'&&x.batch!==16).length!==355 ||
     rows.filter(x=>x.status==='VERIFIED').length!==380 ||
     rows.filter(x=>x.status==='NOT_REVIEWED'||x.status==='IMPLEMENTED').length!==912 ||
     rows.some(x=>x.status==='IMPLEMENTED' && !(x.batch>16 && x.actualProductionVerified!==true)) ||
     rows.some(x=>x.status==='VERIFIED' && x.batch>16))return false;
  return B016_SLUGS.every(slug=>{
    const x=rows.find(row=>row.slug===slug);
    return x?.batch===16 && x.status==='VERIFIED' && x.actualProductionVerified===true &&
      x.technicalBrowserRun===SIGNED.runId && x.acceptanceEvidenceArtifact===SIGNED.artifactId &&
      x.productionWorkerVersion===SIGNED.worker && x.verifiedDeploymentGitSha===SIGNED.sourceSha &&
      x.verifiedGithubWorkerLedgerDeploymentId===SIGNED.ledgerId &&
      x.manualAccessibilityAccepted===false && x.schoolPhotoReuseRightsAccepted===false &&
      x.editorialHumanSignoff===false;
  });
}
