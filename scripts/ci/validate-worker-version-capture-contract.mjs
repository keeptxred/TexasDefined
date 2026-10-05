import assert from 'node:assert/strict';

import {
  evaluateCapturedVersion,
  parseTrafficVersions,
  parseWranglerDeployOutput,
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
  'Post-deploy identity must accept only the exact Wrangler-created version once active.',
);

assert.equal(
  evaluateCapturedVersion('post-deploy', OTHER, { baselineVersion: OLD }, NEW).capturedVersion,
  null,
  'Post-deploy identity must reject an active version that differs from Wrangler output.',
);

assert.deepEqual(
  evaluateCapturedVersion('post-verification', NEW, { deployedVersion: NEW }),
  { capturedVersion: NEW, detail: null },
  'Final verification must accept the exact deployed version while it remains active.',
);

assert.equal(
  evaluateCapturedVersion('post-verification', OTHER, { deployedVersion: NEW }).capturedVersion,
  null,
  'Final verification must fail closed if active Worker identity changes.',
);

assert.equal(
  parseTrafficVersions([
    { version_id: OLD, percentage: 50 },
    { version_id: NEW, percentage: 50 },
  ], 'validation fixture').versionId,
  null,
  'Split traffic must remain fail closed.',
);

console.log('Worker version capture contract passed: the exact Wrangler deploy version is the identity anchor, Cloudflare must activate that exact version, final verification must retain it, and ambiguous/split identities fail closed.');
