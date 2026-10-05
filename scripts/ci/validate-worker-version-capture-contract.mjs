import assert from 'node:assert/strict';

import {
  evaluateCapturedVersion,
  parseTrafficVersions,
  parseWranglerDeployOutput,
  supersedingActiveVersion,
} from './capture-active-worker-version.mjs';

const OLD = '11111111-1111-4111-8111-111111111111';
const NEW = '22222222-2222-4222-8222-222222222222';
const OTHER = '33333333-3333-4333-8333-333333333333';

const deployOutput = [
  JSON.stringify({ type: 'wrangler-session', version: 1 }),
  JSON.stringify({
    type: 'deploy',
    version: 1,
    worker_name: 'texasdefined-site',
    version_id: NEW,
    targets: ['https://texasdefined-site.freddy-coppola.workers.dev'],
  }),
].join('\n');

assert.deepEqual(
  parseWranglerDeployOutput(deployOutput, 'texasdefined-site'),
  { versionId: NEW, detail: null },
  'Wrangler deploy output must identify the exact created Worker version.',
);

assert.equal(
  parseWranglerDeployOutput(
    JSON.stringify({ type: 'deploy', worker_name: 'another-worker', version_id: NEW }),
    'texasdefined-site',
  ).versionId,
  null,
  'A deploy record for another Worker must fail closed.',
);

assert.equal(
  parseWranglerDeployOutput([
    JSON.stringify({ type: 'deploy', worker_name: 'texasdefined-site', version_id: NEW }),
    JSON.stringify({ type: 'deploy', worker_name: 'texasdefined-site', version_id: OTHER }),
  ].join('\n'), 'texasdefined-site').versionId,
  null,
  'Multiple deploy records for the production Worker must fail closed.',
);

assert.deepEqual(
  evaluateCapturedVersion('post-deploy', NEW, { baselineVersion: OLD }, NEW),
  { capturedVersion: NEW, detail: null },
  'Post-deploy identity must accept the exact Wrangler-created version once active.',
);

assert.equal(
  evaluateCapturedVersion('post-deploy', OTHER, { baselineVersion: OLD }, NEW).capturedVersion,
  null,
  'The strict post-deploy identity matcher must not pretend an unrelated active version is the Wrangler-created version.',
);

assert.equal(
  supersedingActiveVersion('post-deploy', OTHER, { baselineVersion: OLD }, NEW),
  OTHER,
  'A third active version must be recognized as a superseding production deployment instead of an identity-capture failure.',
);
assert.equal(
  supersedingActiveVersion('post-deploy', OLD, { baselineVersion: OLD }, NEW),
  null,
  'The pre-deploy baseline is propagation lag, not a superseding deployment.',
);
assert.equal(
  supersedingActiveVersion('post-deploy', NEW, { baselineVersion: OLD }, NEW),
  null,
  'The Wrangler-created version is the normal successful post-deploy identity.',
);

assert.deepEqual(
  evaluateCapturedVersion('post-verification', NEW, { deployedVersion: NEW }),
  { capturedVersion: NEW, detail: null },
  'Final verification must accept the effective production version retained after post-deploy identity capture.',
);

assert.equal(
  evaluateCapturedVersion('post-verification', OTHER, { deployedVersion: NEW }).capturedVersion,
  null,
  'Strict identity comparison must still reject an unexpected version change.',
);

assert.equal(
  parseTrafficVersions([
    { version_id: OLD, percentage: 50 },
    { version_id: NEW, percentage: 50 },
  ], 'validation fixture').versionId,
  null,
  'Split traffic must remain fail closed.',
);

console.log('Worker version capture contract passed: Wrangler identity stays exact, propagation lag stays fail closed, a distinct 100% active Worker is treated as a superseding production deployment, and ambiguous/split traffic remains fail closed.');
