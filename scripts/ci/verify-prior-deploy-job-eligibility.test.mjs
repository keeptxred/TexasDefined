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
