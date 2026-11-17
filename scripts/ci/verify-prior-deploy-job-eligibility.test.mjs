import test from 'node:test';
import assert from 'node:assert/strict';
import { qualifyPriorDeployJob } from './verify-prior-deploy-job-eligibility.mjs';

const required = [
  'Deploy TexasDefined Worker',
  'Capture deployed Worker version',
  'Verify direct Worker health',
  'Verify canonical production health',
  'Verify current and previous release JS/CSS on both public origins',
];
const failing = 'Verify ticketing and Christmas pages at mobile and desktop widths';
function evidence({ runId = 43440830866, jobId = 131937683043,
  failure = failing, omit = null, additional = [] } = {}) {
  const steps = required.filter(name => name !== omit)
    .map(name => ({ name, conclusion: 'success' }));
  if (failure) steps.push({ name: failure, conclusion: 'failure' });
  steps.push(...additional.map(name => ({ name, conclusion: 'failure' })));
  return { jobs: [{ id: jobId, run_id: runId, name: 'deploy',
    conclusion: 'failure', steps }] };
}

test('exact Nov15 published McKinney Worker handoff requires source-correct 2027 dates and no invented admission', () => {
  const good = qualifyPriorDeployJob(evidence({
    runId: 43734261983,
    jobId: 132873261043,
    failure: 'Verify Event structured-data production',
  }));
  assert.equal(good.eligible, true);
  assert.equal(good.mode, 'exact-nov15-mckinney-2027-original-assets-only');
  assert.equal(good.exactRun, 43734261983);
  assert.equal(good.requiredSourceSha, 'b6a73701a69e5efeee3ed5ec605cdc420c7386df');
  assert.equal(good.requiredWorkerVersion, 'ea33ec3d-842c-4c1b-9ff3-bb4bd292d7cb');
  assert.equal(good.criticalChecks, 5);
  assert.deepEqual(good.permittedFailures, ['Verify Event structured-data production']);
});

test('failed Nov15 McKinney original-byte exception never widens to other runs, jobs, failures, or failed Worker safety', () => {
  const baseline = {
    runId: 43734261983,
    jobId: 132873261043,
    failure: 'Verify Event structured-data production',
  };
  for (const mutation of [
    { runId: 43734261984 },
    { jobId: 132873261044 },
    { failure: 'Verify base production surfaces' },
    { additional: ['Verify base production surfaces'] },
    { additional: ['Verify current and previous release JS/CSS on both public origins'] },
    ...required.map(omit => ({ omit })),
  ]) {
    assert.throws(
      () => qualifyPriorDeployJob(evidence({ ...baseline, ...mutation })),
      /Required published-Worker safety gate not successful|Nov15 McKinney Worker original assets reject alternate run\/job\/failure evidence|Failed deploy job includes unapproved or missing failure evidence/,
    );
  }
});

test('exact Nov15 active Worker may supply its original-byte asset history only after the visible recurrence assertion is source-repaired', () => {
  const qualified = qualifyPriorDeployJob(evidence({
    runId: 43730208415,
    jobId: 132860785220,
    failure: 'Verify Event structured-data production',
  }));
  assert.equal(qualified.eligible, true);
  assert.equal(qualified.mode, 'exact-nov15-event-recurrence-original-assets-only');
  assert.equal(qualified.exactRun, 43730208415);
  assert.equal(qualified.requiredSourceSha, '5508828580552fdca812f1527428b3ad5b609fd5');
  assert.equal(qualified.requiredWorkerVersion, 'f45399ba-e9e8-4052-8450-bf858841b9ba');
  assert.equal(qualified.criticalChecks, 5);
  assert.deepEqual(qualified.permittedFailures, ['Verify Event structured-data production']);
});

test('Nov15 original-asset exception rejects altered job/run, extra page failures and missing safety gates', () => {
  const baseline = {
    runId: 43730208415,
    jobId: 132860785220,
    failure: 'Verify Event structured-data production',
  };
  for (const changed of [
    { runId: 43730208416 },
    { jobId: 132860785221 },
    { failure: 'Verify base production surfaces' },
    { additional: ['Verify base production surfaces'] },
    ...required.map(omit => ({ omit })),
  ]) {
    assert.throws(
      () => qualifyPriorDeployJob(evidence({ ...baseline, ...changed })),
      /Required published-Worker safety gate not successful|Nov15 original assets reject alternate run\/job\/failure evidence/,
    );
  }
});

test('exact Nov 13 published Worker can supply immutable original assets but not release certification', () => {
  const qualified = qualifyPriorDeployJob(evidence());
  assert.equal(qualified.eligible, true);
  assert.equal(qualified.mode, 'exact-nov13-active-worker-original-assets-only');
  assert.equal(qualified.exactRun, 43440830866);
  assert.equal(qualified.criticalChecks, 5);
  assert.equal(qualified.requiredSourceSha, 'f3e92256e6659d25d03ba2b938f99e09b8702805');
  assert.equal(qualified.requiredWorkerVersion, '14cd9057-b9e3-4cf6-b2f8-3e103afe7657');
  assert.deepEqual(qualified.permittedFailures, [failing]);
});

test('the historical asset qualification rejects different runs, jobs, and failure signatures', () => {
  for (const altered of [
    { runId: 43440830867 },
    { jobId: 131937683044 },
    { failure: 'Verify direct Worker health' },
    { failure: 'Deploy TexasDefined Worker' },
    { failure: 'Verify base production surfaces' },
    { failure: failing, additional: ['Verify base production surfaces'] },
    ...required.map(omit => ({ omit })),
  ]) {
    assert.throws(() => qualifyPriorDeployJob(evidence(altered)),
      /Required published-Worker safety gate not successful|Failed deploy job includes unapproved or missing failure evidence/);
  }
});

test('future failed runs may not silently inherit the Nov13 one-time asset exception', () => {
  assert.throws(() => qualifyPriorDeployJob(evidence({
    runId: 43440839999, jobId: 131939999999, failure: failing,
  })), /Failed deploy job includes unapproved or missing failure evidence/);
});

test('exact published 1e9c Worker after turkey-only transport timeout may seed original assets only', () => {
  const source = evidence({
    runId: 43447328975, jobId: 131960103008,
    failure: 'Verify hunting hub and turkey guide in desktop/mobile Chrome',
  });
  const accepted = qualifyPriorDeployJob(source);
  assert.equal(accepted.mode, 'exact-nov13-turkey-timeout-original-assets-only');
  assert.equal(accepted.exactRun, 43447328975);
  assert.equal(accepted.requiredSourceSha, '3cd9851671f9077f9f57e4bc7d648816826002f2');
  assert.equal(accepted.requiredWorkerVersion, '1e9cbeec-7e97-470f-9531-91ce2ab0946b');
  assert.equal(accepted.criticalChecks, 5);
  assert.deepEqual(accepted.permittedFailures, ['Verify hunting hub and turkey guide in desktop/mobile Chrome']);
});

test('turkey timeout handoff rejects any other run, job, failure or unsafe original-byte step', () => {
  for (const altered of [
    { runId: 43447328976 },
    { jobId: 131960103009 },
    { failure: 'Verify base production surfaces' },
    { additional: ['Verify base production surfaces'] },
    ...required.map(omit => ({ omit })),
  ]) {
    assert.throws(() => qualifyPriorDeployJob(evidence({
      runId: 43447328975, jobId: 131960103008,
      failure: 'Verify hunting hub and turkey guide in desktop/mobile Chrome',
      ...altered,
    })), /Required published-Worker safety gate not successful|Failed deploy job includes unapproved or missing failure evidence/);
  }
});

test('exact Nov13 MSR and District21 page-check failures permit only proven original assets', () => {
  const original = evidence({
    runId: 43460115327,
    jobId: 132004453072,
    failure: 'Verify MSR Houston responsive visitor page and licensed photo',
    additional: ['Verify District 21 hub and eight team scorecards on production'],
  });
  const qualified = qualifyPriorDeployJob(original);
  assert.equal(qualified.eligible, true);
  assert.equal(qualified.mode, 'exact-nov13-msr-district21-original-assets-only');
  assert.equal(qualified.criticalChecks, 5);
  assert.equal(qualified.exactRun, 43460115327);
  assert.equal(qualified.requiredSourceSha, '3836f5f8d492b970ba6a6e7edb10679309250479');
  assert.equal(qualified.requiredWorkerVersion, '6f58c413-3ace-4666-9fd3-dba3afb7d5da');
  assert.deepEqual(qualified.permittedFailures, [
    'Verify MSR Houston responsive visitor page and licensed photo',
    'Verify District 21 hub and eight team scorecards on production',
  ]);
});

test('MSR/District21 original asset rescue rejects any alternate job, extra failure or failed safety step', () => {
  const baseline = {
    runId: 43460115327,
    jobId: 132004453072,
    failure: 'Verify MSR Houston responsive visitor page and licensed photo',
    additional: ['Verify District 21 hub and eight team scorecards on production'],
  };
  for (const mutation of [
    { runId: 43460115328 },
    { jobId: 132004453073 },
    { additional: ['Verify District 21 hub and eight team scorecards on production', 'Verify base production surfaces'] },
    { failure: 'Verify Event structured-data production' },
    // A falsified MSR-only transcript must NOT fall through to the generic
    // previously allowed postdeploy MSR visual-only exception.
    { additional: [] },
    { omit: 'Verify direct Worker health' },
    { omit: 'Verify canonical production health' },
    { omit: 'Verify current and previous release JS/CSS on both public origins' },
    { omit: 'Deploy TexasDefined Worker' },
    { omit: 'Capture deployed Worker version' },
  ]) {
    assert.throws(() => qualifyPriorDeployJob(evidence({ ...baseline, ...mutation })),
      /Required published-Worker safety gate not successful|Failed deploy job includes unapproved or missing failure evidence/);
  }
});

test('exact District16 published attempt 1 supplies old bytes only after narrow retry source fix', () => {
  const original = evidence({
    runId:43509240362, jobId:132174849722,
    failure:'Verify District 16 mobile and desktop rendered layout'
  });
  original.jobs[0].run_attempt=1;
  const qualified=qualifyPriorDeployJob(original);
  assert.equal(qualified.eligible,true);
  assert.equal(qualified.mode,'exact-nov13-district16-transport-original-assets-only');
  assert.equal(qualified.criticalChecks,5);
  assert.equal(qualified.exactRun,43509240362);
  assert.equal(qualified.requiredSourceSha,'9019a46c4317fbbbd69ceb348fc2f02d2e589498');
  assert.equal(qualified.requiredWorkerVersion,'79902b61-3641-48db-a400-ddc81e71a162');
  assert.deepEqual(qualified.permittedFailures,['Verify District 16 mobile and desktop rendered layout']);
});
test('District16 failed Worker rejects retry attempt, wrong job, wrong failure and any missing asset gate', () => {
  for(const mutation of [
    {run_attempt:2},{run_id:43509240363},{id:132174849723},
    {failure:'Verify base production surfaces'},
    {additional:['Verify base production surfaces']},
    ...required.map(omit=>({omit}))
  ]){
    const sample=evidence({
      runId:43509240362,jobId:132174849722,
      failure:'Verify District 16 mobile and desktop rendered layout',
      additional:mutation.additional||[],
      omit:mutation.omit||null
    });
    Object.assign(sample.jobs[0],Object.fromEntries(
      Object.entries(mutation).filter(([key])=>!['failure','omit','additional'].includes(key))));
    if(mutation.failure)sample.jobs[0].steps.at(-1).name=mutation.failure;
    if(sample.jobs[0].run_attempt===undefined)sample.jobs[0].run_attempt=1;
    assert.throws(()=>qualifyPriorDeployJob(sample),
      /Required published-Worker safety gate not successful|Failed deploy job includes unapproved or missing failure evidence/);
  }
});

test('exact published 7d Worker may seed only original bytes after District 5 transport-only publication failure', () => {
  const original=evidence({
    runId:43524206406,jobId:132225789491,
    failure:'Verify District 5-6A scorecard on direct Worker and canonical domain',
  });
  const x=qualifyPriorDeployJob(original);
  assert.equal(x.eligible,true);
  assert.equal(x.mode,'exact-nov13-district5-transport-original-assets-only');
  assert.equal(x.requiredSourceSha,'4d9b10c7ada94b9843202d0400d59f8ad7b6eec1');
  assert.equal(x.requiredWorkerVersion,'7d2202c2-619a-458f-be72-ce21eee8c61b');
  assert.equal(x.exactRun,43524206406);
  assert.equal(x.criticalChecks,5);
  assert.deepEqual(x.permittedFailures,['Verify District 5-6A scorecard on direct Worker and canonical domain']);
});

test('published District 5 asset handoff rejects fabricated IDs or extra/live-critical failures', () => {
  const baseline={runId:43524206406,jobId:132225789491,
    failure:'Verify District 5-6A scorecard on direct Worker and canonical domain'};
  for(const alteration of [
    {runId:43524206407},{jobId:132225789492},
    {failure:'Verify base production surfaces'},
    {additional:['Verify base production surfaces']},
    {additional:['Verify direct Worker health']},
    ...required.map(omit=>({omit}))
  ]){
    assert.throws(()=>qualifyPriorDeployJob(evidence({...baseline,...alteration})),
      /Required published-Worker safety gate not successful|Failed deploy job includes unapproved or missing failure evidence/);
  }
});

test('exact current 4a67 Worker can supply original bytes after repaired Moody HTML apostrophe parsing, NOT page certification', () => {
  const caseData = evidence({
    runId: 43629450047, jobId: 132552595374,
    failure: 'Verify Moody Gardens production authority',
  });
  const certified = qualifyPriorDeployJob(caseData);
  assert.equal(certified.eligible, true);
  assert.equal(certified.mode, 'exact-nov14-moody-entity-original-assets-only');
  assert.equal(certified.exactRun, 43629450047);
  assert.equal(certified.criticalChecks, 5);
  assert.equal(certified.requiredWorkerVersion, '4a67cc9a-616c-4707-9097-541b8fce2138');
  assert.equal(certified.requiredSourceSha, '9afb27020d3152c52aed3f2f3241e93330e303bf');
  assert.deepEqual(certified.permittedFailures, ['Verify Moody Gardens production authority']);
});

test('Moody HTML entity handoff fails closed on every wrong provenance or asset/runtime failure', () => {
  const baseline = {
    runId: 43629450047, jobId: 132552595374,
    failure: 'Verify Moody Gardens production authority',
  };
  for (const mutation of [
    {runId: 43629450048}, {jobId: 132552595375},
    {failure: 'Verify canonical production health'},
    {failure: 'Verify current and previous release JS/CSS on both public origins'},
    {additional: ['Verify base production surfaces']},
    ...required.map(omit => ({ omit })),
  ]) {
    assert.throws(() => qualifyPriorDeployJob(evidence({...baseline, ...mutation})),
      /Required published-Worker safety gate not successful|Failed deploy job includes unapproved or missing failure evidence|Moody entity source-verified active Worker has unexpected run\/job\/failure evidence/);
  }
});

test('published Nov14 Moody Worker may supply exact original bytes only after hydration repair', () => {
  const payload=evidence({
    runId:43608793638,jobId:132489033467,
    failure:'Verify Moody Gardens four-viewport browser authority and layout',
  });
  const answer=qualifyPriorDeployJob(payload);
  assert.equal(answer.eligible,true);
  assert.equal(answer.mode,'exact-nov14-moody-posthydration-original-assets-only');
  assert.equal(answer.exactRun,43608793638);
  assert.equal(answer.criticalChecks,5);
  assert.equal(answer.requiredSourceSha,'5f80e24f9791b86ec8ab87e9f2fb910cca21521f');
  assert.equal(answer.requiredWorkerVersion,'695cd863-f891-4b2b-8c60-22f722f7cc0e');
  assert.deepEqual(answer.permittedFailures,['Verify Moody Gardens four-viewport browser authority and layout']);
});

test('Moody asset handoff rejects wrong job, run, extra failure or a failed critical asset/runtime gate', () => {
  const original={runId:43608793638,jobId:132489033467,
    failure:'Verify Moody Gardens four-viewport browser authority and layout'};
  for (const mutation of [
    {runId:43608793639},{jobId:132489033468},
    {failure:'Verify canonical production health'},
    {failure:'Verify current and previous release JS/CSS on both public origins'},
    {additional:['Verify base production surfaces']},
    ...required.map(omit=>({omit})),
  ]) {
    assert.throws(()=>qualifyPriorDeployJob(evidence({...original,...mutation})),
      /Required published-Worker safety gate not successful|Failed deploy job includes unapproved or missing failure evidence|Moody source-verified published Worker has unexpected failure/);
  }
});

test('Nov15 7f0231fa Worker passes all five original-byte safety gates but only the repaired deer ALT-only failure can seed retained assets', () => {
  const observed = evidence({
    runId: 43744754206,
    jobId: 132905483302,
    failure: 'Verify hunting hub and turkey guide in desktop/mobile Chrome',
  });
  const accepted = qualifyPriorDeployJob(observed);
  assert.equal(accepted.eligible, true);
  assert.equal(accepted.mode, 'exact-nov15-deer-full-alt-original-assets-only');
  assert.equal(accepted.exactRun, 43744754206);
  assert.equal(accepted.criticalChecks, 5);
  assert.equal(accepted.requiredSourceSha, '172e2a38415fb3a64fa81f48d1732e660510d76f');
  assert.equal(accepted.requiredWorkerVersion, '7f0231fa-6b09-4457-9c27-855392484141');
  assert.deepEqual(accepted.permittedFailures, ['Verify hunting hub and turkey guide in desktop/mobile Chrome']);
});

test('the 7f0231fa original-byte exception rejects wrong publication, substituted failure and every missing critical check', () => {
  const exact = {
    runId: 43744754206, jobId: 132905483302,
    failure: 'Verify hunting hub and turkey guide in desktop/mobile Chrome',
  };
  for (const mutation of [
    {runId: 43744754207}, {jobId: 132905483303},
    {failure: 'Verify base production surfaces'},
    {additional: ['Verify base production surfaces']},
    {additional: ['Verify current and previous release JS/CSS on both public origins']},
    ...required.map(omit => ({omit})),
  ]) {
    assert.throws(
      () => qualifyPriorDeployJob(evidence({...exact, ...mutation})),
      /Required published-Worker safety gate not successful|Nov15 deer original asset handoff rejects altered run\/job\/failed-step evidence|Failed deploy job includes unapproved or missing failure evidence/,
    );
  }
});

test('Nov16 published Conroe Worker may seed exactly its verified original assets after #7288 source repair, not false-green camping', () => {
  const accepted = qualifyPriorDeployJob(evidence({
    runId: 43940147723, jobId: 133555201659,
    failure: 'Verify fishing lake robots and sitemap publication parity',
  }));
  assert.equal(accepted.eligible, true);
  assert.equal(accepted.mode, 'exact-nov16-conroe-failed-parity-original-assets-only');
  assert.equal(accepted.exactRun, 43940147723);
  assert.equal(accepted.criticalChecks, 5);
  assert.equal(accepted.requiredSourceSha, '347ab475a0566b52cfaa4fa8d7d918978466aa0a');
  assert.equal(accepted.requiredWorkerVersion, '49b9c790-d1e6-41f6-bf69-0c47cc9a9871');
  assert.deepEqual(accepted.permittedFailures, ['Verify fishing lake robots and sitemap publication parity']);
});

test('new no-network Conroe camping SSR tightens, never bypasses, the immutable predecessor asset guard', () => {
  const source = readFileSync('scripts/ci/verify-prior-deploy-job-eligibility.mjs', 'utf8');
  assert.ok(source.includes('const campingPathSafe = staticCampingPageData < 0 || ('));
  assert.ok(source.includes("loader.includes('await getLakeConroeCampingPageData()')"));
  assert.ok(source.includes("loader.includes(': await getLakeConroePageData()')"));
  assert.ok(source.includes("campingServer.includes('...loadLakeConroePageDataServer()')"));
  assert.ok(source.includes("campingServer.includes('liveLakeLevel: null')"));
  assert.ok(source.includes("campingServer.includes('await import(\"./live-lake-level-fetch.server\")')"));
  assert.ok(source.includes('unconditionalCatalog < conditionalCatalog || !campingPathSafe'));
  // The old failed release cannot obtain a general success or a 200 waiver.
  const accepted = qualifyPriorDeployJob(evidence({
    runId: 43940147723, jobId: 133555201659,
    failure: 'Verify fishing lake robots and sitemap publication parity',
  }));
  assert.equal(accepted.mode, 'exact-nov16-conroe-failed-parity-original-assets-only');
});

test('Nov16 Conroe old-asset handoff fails closed for wrong job/run, added failure or any unhealthy hash gate', () => {
  const exact = {
    runId: 43940147723, jobId: 133555201659,
    failure: 'Verify fishing lake robots and sitemap publication parity',
  };
  for (const mutation of [
    {runId:43940147724}, {jobId:133555201660},
    {failure:'Verify current and previous release JS/CSS on both public origins'},
    {failure:'Verify base production surfaces'},
    {additional:['Verify base production surfaces']},
    {additional:['Verify current and previous release JS/CSS on both public origins']},
    ...required.map(omit=>({omit})),
  ]) {
    assert.throws(() => qualifyPriorDeployJob(evidence({...exact,...mutation})),
      /Required published-Worker safety gate not successful|Nov16 Conroe original-byte handoff rejects altered run\/job\/failure evidence|Failed deploy job includes unapproved or missing failure evidence/);
  }
});


test('exact Nov16 GSC recovery published Worker can seed only source-proven original bytes with strict Conroe parity still failing', () => {
  const accepted = qualifyPriorDeployJob(evidence({
    runId: 43985214547,
    jobId: 133711496581,
    failure: 'Verify fishing lake robots and sitemap publication parity',
  }));
  assert.equal(accepted.eligible, true);
  assert.equal(accepted.mode, 'exact-nov16-gsc-conroe-original-assets-only');
  assert.equal(accepted.exactRun, 43985214547);
  assert.equal(accepted.requiredSourceSha, '6124fed0ab5f1b2e0478f180058394b423f7f4c3');
  assert.equal(accepted.requiredWorkerVersion, 'f7213d8b-d327-4a3a-9112-c3cc02b1bdab');
  assert.equal(accepted.criticalChecks, 5);
  assert.deepEqual(accepted.permittedFailures, ['Verify fishing lake robots and sitemap publication parity']);
});

test('GSC Conroe prior Worker handoff rejects any changed failure, identity, or missing original asset or health gate', () => {
  const exact = {
    runId: 43985214547,
    jobId: 133711496581,
    failure: 'Verify fishing lake robots and sitemap publication parity',
  };
  for (const mutation of [
    { runId: 43985214548 }, { jobId: 133711496582 },
    { failure: 'Verify direct Worker health' },
    { failure: 'Verify current and previous release JS/CSS on both public origins' },
    { additional: ['Verify canonical production health'] },
    { additional: ['Verify base production surfaces'] },
    ...required.map(omit => ({ omit })),
  ]) {
    assert.throws(() => qualifyPriorDeployJob(evidence({...exact, ...mutation})),
      /Required published-Worker safety gate not successful|Nov16 GSC Conroe original-byte handoff rejects altered run\/job\/failure evidence|Failed deploy job includes unapproved or missing failure evidence/);
  }
});

test('Nov16 published category Worker original bytes qualify only after strict one-reset source repair', () => {
  const answer = qualifyPriorDeployJob(evidence({
    runId: 43948840401, jobId: 133585600321,
    failure: 'Verify base production surfaces',
  }));
  assert.equal(answer.eligible, true);
  assert.equal(answer.mode, 'exact-nov16-category-transport-original-assets-only');
  assert.equal(answer.exactRun, 43948840401);
  assert.equal(answer.requiredSourceSha, 'ac29989a09dcf04317b386283f3019947138bf13');
  assert.equal(answer.requiredWorkerVersion, 'cb71c303-a15d-4873-a2a4-8f02f787a6f6');
  assert.equal(answer.criticalChecks, 5);
  assert.deepEqual(answer.permittedFailures, ['Verify base production surfaces']);
});

test('Nov16 category Worker original bytes reject altered run/job/failed steps and missing asset or runtime proof', () => {
  const original = { runId: 43948840401, jobId: 133585600321, failure: 'Verify base production surfaces' };
  for (const mutation of [
    {runId: 43948840402}, {jobId: 133585600322},
    {failure: 'Verify fishing lake robots and sitemap publication parity'},
    {additional: ['Verify sports venue editorial production']},
    {additional: ['Verify current and previous release JS/CSS on both public origins']},
    ...required.map(omit => ({omit})),
  ]) {
    assert.throws(() => qualifyPriorDeployJob(evidence({...original, ...mutation})),
      /Required published-Worker safety gate not successful|Nov16 category transport original-byte handoff rejects altered run\/job\/failure evidence|Failed deploy job includes unapproved or missing failure evidence/);
  }
});
