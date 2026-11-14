// Fail-closed, immutable Batch018 technical certificate. Values are filled only
// from an independently opened, signed GitHub Actions release-pinned 75/25
// Chrome artifact. A missing witness deliberately cannot certify any school.
// This never certifies Google's index decision, human editorial approval,
// rights to school art, manual WCAG/ADA, ticket policies or current season data.
export const B018_SLUGS = Object.freeze([
  'fabens','fairfield','falfurrias','falls-city','farmersville',
  'farwell','ferris','first-baptist-dallas','flatonia','florence',
  'floresville','floydada','follett','forestburg','forney',
  'forsan','fort-bend-austin','fort-bend-bush','fort-bend-christian',
  'fort-bend-clements','fort-bend-crawford','fort-bend-dulles',
  'fort-bend-elkins','fort-bend-hightower','fort-bend-kempner'
]);
export const B018_SIGNED = Object.freeze({
  runId: 0,
  artifactId: 0,
  artifactSha256: '',
  sourceSha: '',
  worker: '',
  ledgerId: 0,
  closingWorkerVersion: '',
});
export function certifiedBatch018(registry) {
  const signed=B018_SIGNED;
  if(!Number.isSafeInteger(signed.runId)||signed.runId<=0||
     !Number.isSafeInteger(signed.artifactId)||signed.artifactId<=0||
     !Number.isSafeInteger(signed.ledgerId)||signed.ledgerId<=0||
     !/^[a-f0-9]{64}$/.test(signed.artifactSha256)||
     !/^[a-f0-9]{40}$/.test(signed.sourceSha)||
     !/^[a-f0-9-]{36}$/.test(signed.worker)||
     signed.closingWorkerVersion!==signed.worker) return false;
  const reg=registry;
  const cert=reg?.batch?.number===18?reg.batch:
    reg?.completedBatches?.find(x=>x.number===18);
  const e=cert?.technicalAcceptance,rows=reg?.schoolRecords;
  if(!Array.isArray(rows)||rows.length!==1292||
     reg?.counts?.VERIFIED!==430||reg?.counts?.IMPLEMENTED!==0||
     reg?.counts?.NOT_REVIEWED!==862||
     cert?.state!=='VERIFIED_BATCH_018_COMPLETE'||
     cert?.individuallyVerified!==25||cert?.remainingAssigned!==0||
     cert?.remainingToImplement!==0||cert?.remainingToVerify!==0||
     cert?.noNextBatchAssigned!==true||cert?.currentSchool!==null||
     cert?.nextSchool!==null||
     JSON.stringify(cert?.slugs)!==JSON.stringify(B018_SLUGS)||
     e?.schoolCount!==25||e?.schoolCasesPassed!==75||
     e?.schoolCasesFailed!==0||e?.countyCasesPassed!==25||
     e?.countyCasesFailed!==0||e?.screenshotsSaved!==75||
     e?.browserExecutionCount!==1||e?.workerVersionMatchesDeploy!==true||
     e?.closingWorkerVersion!==signed.worker||
     JSON.stringify(e?.viewports)!==JSON.stringify([1366,390,320])||
     e?.chromeRunId!==signed.runId||e?.chromeArtifactId!==signed.artifactId||
     e?.artifactSha256!==signed.artifactSha256||
     e?.productionDeploymentGitSha!==signed.sourceSha||
     e?.observedWorkerVersions?.length!==1||
     e.observedWorkerVersions[0]!==signed.worker||
     e?.githubWorkerLedgerDeploymentId!==signed.ledgerId||
     e?.sitemapNotAssertedByThisChromeRun!==true||
     e?.editorialHumanSignoffsClaimed!==0||
     e?.manualAccessibilityAccepted!==false||
     e?.schoolPhotoReuseRightsAccepted!==false||
     rows.filter(x=>x.status==='VERIFIED'&&x.batch<18).length!==405||
     rows.filter(x=>x.status==='VERIFIED').length!==430||
     rows.filter(x=>x.status==='IMPLEMENTED').length!==0||
     rows.filter(x=>x.status==='NOT_REVIEWED').length!==862||
     rows.filter(x=>x.batch===18).length!==25||
     rows.some(x=>x.status==='VERIFIED'&&x.batch>18))return false;
  return B018_SLUGS.every(slug=>{
    const row=rows.find(x=>x.slug===slug);
    return row?.batch===18&&row.status==='VERIFIED'&&
      row.actualProductionVerified===true&&
      row.technicalBrowserRun===signed.runId&&
      row.acceptanceEvidenceArtifact===signed.artifactId&&
      row.productionWorkerVersion===signed.worker&&
      row.verifiedDeploymentGitSha===signed.sourceSha&&
      row.verifiedGithubWorkerLedgerDeploymentId===signed.ledgerId&&
      row.manualAccessibilityAccepted===false&&
      row.schoolPhotoReuseRightsAccepted===false&&
      row.editorialHumanSignoff===false;
  });
}
