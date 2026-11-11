// Read-only certificate guard: never promote a school or infer human review.
// Run #42495534916 was executed AFTER 19 school identity-source changes, on deployed source
// 0621a341 and matched the exact 100%-traffic Worker and signed GitHub release ledger.
// Graduation is fail-closed on these immutable evidence identities and all 25 row checks.
export const B015_SLUGS = Object.freeze([
  'dell-city','denison','denton','denton-braswell','denton-guyer',
  'denton-ryan','denver-city','detroit','devine','deweyville',
  'dhanis','diana-new-diana','diboll','dickinson','dilley',
  'dimmitt','donna','donna-north','dripping-springs','dublin',
  'dumas','duncanville','eagle-mountain','eagle-pass','eagle-pass-winn',
]);
const SIGNED = Object.freeze({
  runId: 42495534916,
  artifactId: 13623152274,
  sourceSha: '0621a3412f83ed207844af3159e96cfd7e0bd4ed',
  worker: '94032994-ad0d-4655-8a6e-bd9afe0b0a1d',
  ledgerId: 7637951033,
  cloudflareDeploymentId: '6c12efe6-796f-47ac-a67b-15e344d3cd12',
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
  // Historical Batch015 proof remains valid after a separately signed Batch016
  // graduation. No unrelated school can become VERIFIED without the active
  // batch's independent certificate guard in validate-high-school-football-platform.
  const nextCertified=registry.batch?.number===16 && registry.batch?.state==='VERIFIED_BATCH_016_COMPLETE';
  if (rows.length !== 1292 || rows.filter(r => r.batch === 15).length !== 25 ||
      rows.filter(r => r.status === 'VERIFIED' && r.batch !== 15 && r.batch !== 16).length !== 330 ||
      rows.filter(r => r.status === 'VERIFIED' && r.batch===15).length !== 25 ||
      rows.filter(r => r.status === 'VERIFIED').length !== (nextCertified?380:355) ||
      rows.filter(r => r.status === 'NOT_REVIEWED').length !== (nextCertified?912:937) ||
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
