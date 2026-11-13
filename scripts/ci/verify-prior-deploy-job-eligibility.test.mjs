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
