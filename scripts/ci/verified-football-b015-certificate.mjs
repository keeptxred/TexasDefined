// Read-only certificate guard: never promote a school or infer human review.
// Historical same-release Chrome evidence anchored to run #42489867924.
export const B015_SLUGS = Object.freeze([
  'dell-city','denison','denton','denton-braswell','denton-guyer',
  'denton-ryan','denver-city','detroit','devine','deweyville',
  'dhanis','diana-new-diana','diboll','dickinson','dilley',
  'dimmitt','donna','donna-north','dripping-springs','dublin',
  'dumas','duncanville','eagle-mountain','eagle-pass','eagle-pass-winn',
]);
const SIGNED = Object.freeze({
  runId: 42489867924,
  artifactId: 13620254465,
  sourceSha: '009f3a57431e1aa8363a431fbccbfcba5b5181c9',
  worker: 'e7e01826-b492-48fa-8770-73fa641a852f',
  ledgerId: 7637169740,
  cloudflareDeploymentId: 'ba1af4a8-e970-4ad5-a23e-33bbb52ab32b',
});
export function certifiedBatch015(registry) {
  const cert = registry.batch?.number === 15 ? registry.batch : registry.completedBatches?.find(c => c.number === 15);
  const e = cert?.technicalAcceptance;
  if (cert?.state !== 'VERIFIED_BATCH_015_COMPLETE' || cert?.individuallyVerified !== 25 ||
      cert?.remainingAssigned !== 0 || cert?.remainingToImplement !== 0 ||
      cert?.remainingToVerify !== 0 || cert?.noNextBatchAssigned !== true ||
      JSON.stringify(cert?.slugs) !== JSON.stringify(B015_SLUGS) ||
      e?.schoolCount !== 25 || e?.schoolCasesPassed !== 75 || e?.schoolCasesFailed !== 0 ||
      e?.countyCasesPassed !== 25 || e?.countyCasesFailed !== 0 ||
      e?.browserExecutionCount !== 1 || e?.workerVersionMatchesDeploy !== true ||
      JSON.stringify(e?.viewports) !== JSON.stringify([1366,390,320]) ||
      e?.chromeRunId !== SIGNED.runId || e?.chromeArtifactId !== SIGNED.artifactId ||
      e?.productionDeploymentGitSha !== SIGNED.sourceSha ||
      e?.observedWorkerVersions?.length !== 1 || e?.observedWorkerVersions[0] !== SIGNED.worker ||
      e?.githubWorkerLedgerDeploymentId !== SIGNED.ledgerId ||
      e?.cloudflareDeploymentId !== SIGNED.cloudflareDeploymentId ||
      e?.manualAccessibilityAccepted !== false || e?.schoolPhotoReuseRightsAccepted !== false ||
      e?.editorialHumanSignoffsClaimed !== 0) return false;
  const rows = registry.schoolRecords;
  if (rows.length !== 1292 || rows.filter(r => r.batch === 15).length !== 25 ||
      rows.filter(r => r.status === 'VERIFIED' && r.batch !== 15).length !== 330 ||
      rows.filter(r => r.status === 'VERIFIED').length !== 355 ||
      rows.filter(r => r.status === 'NOT_REVIEWED').length !== 937 ||
      rows.some(r => r.status === 'IMPLEMENTED')) return false;
  return B015_SLUGS.every(slug => {
    const row = rows.find(r => r.slug === slug);
    return row?.batch === 15 && row?.status === 'VERIFIED' && row?.actualProductionVerified === true &&
      row?.technicalBrowserRun === SIGNED.runId && row?.acceptanceEvidenceArtifact === SIGNED.artifactId &&
      row?.verifiedDeploymentGitSha === SIGNED.sourceSha && row?.productionWorkerVersion === SIGNED.worker &&
      row?.verifiedGithubWorkerLedgerDeploymentId === SIGNED.ledgerId &&
      row?.manualAccessibilityAccepted === false && row?.schoolPhotoReuseRightsAccepted === false &&
      row?.editorialHumanSignoff === false;
  });
}
