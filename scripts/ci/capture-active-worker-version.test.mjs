import assert from 'node:assert/strict';
import test from 'node:test';

import {
  activeDeploymentFromPayload,
  evaluateCapturedVersion,
  parseTrafficVersions,
  parseWranglerDeployOutput,
} from './capture-active-worker-version.mjs';

const OLD = '11111111-1111-4111-8111-111111111111';
const NEW = '22222222-2222-4222-8222-222222222222';
const OTHER = '33333333-3333-4333-8333-333333333333';
const UUID_V7 = '0199b5a2-7b1c-7def-8abc-1234567890ab';

test('Cloudflare active deployment is the first deployment returned, not the newest timestamp', () => {
  const parsed = activeDeploymentFromPayload({
    success: true,
    result: {
      deployments: [
        {
          created_on: '2026-10-05T08:00:00Z',
          versions: [{ version_id: NEW, percentage: 100 }],
        },
        {
          created_on: '2026-10-05T09:00:00Z',
          versions: [{ version_id: OLD, percentage: 100 }],
        },
      ],
    },
  });

  assert.deepEqual(parsed, { versionId: NEW, detail: null });
});

test('legacy array-shaped deployment result still uses the first active deployment', () => {
  const parsed = activeDeploymentFromPayload({
    success: true,
    result: [
      { versions: [{ version_id: NEW, percentage: '100' }] },
      { versions: [{ version_id: OLD, percentage: 100 }] },
    ],
  });

  assert.deepEqual(parsed, { versionId: NEW, detail: null });
});

test('one 100 percent version plus zero-traffic history resolves deterministically', () => {
  const parsed = parseTrafficVersions([
    { version_id: OLD, percentage: 0 },
    { version_id: NEW, percentage: 100 },
  ], 'fixture');

  assert.deepEqual(parsed, { versionId: NEW, detail: null });
});

test('split traffic fails closed', () => {
  const parsed = parseTrafficVersions([
    { version_id: OLD, percentage: 50 },
    { version_id: NEW, percentage: 50 },
  ], 'fixture');

  assert.equal(parsed.versionId, null);
  assert.match(parsed.detail, /Expected exactly one 100% active Worker version/);
});

test('malformed deployment traffic fails closed', () => {
  const parsed = parseTrafficVersions([
    { version_id: 'not-a-version-id', percentage: 100 },
  ], 'fixture');

  assert.equal(parsed.versionId, null);
  assert.match(parsed.detail, /invalid active-traffic entry/);
});

test('Cloudflare UUIDv7-shaped Worker version IDs are accepted', () => {
  const parsed = parseTrafficVersions([
    { version_id: UUID_V7, percentage: 100 },
  ], 'fixture');

  assert.deepEqual(parsed, { versionId: UUID_V7, detail: null });
});

test('Wrangler deploy JSONL exposes the exact Worker version created by this run', () => {
  const output = [
    JSON.stringify({ type: 'wrangler-session', version: 1 }),
    JSON.stringify({
      type: 'deploy',
      version: 1,
      worker_name: 'texasdefined-site',
      version_id: NEW,
      targets: ['https://texasdefined-site.freddy-coppola.workers.dev'],
    }),
  ].join('\n');

  assert.deepEqual(parseWranglerDeployOutput(output, 'texasdefined-site'), {
    versionId: NEW,
    detail: null,
  });
});

test('Wrangler deploy capture fails closed on missing or duplicate deploy records', () => {
  const missing = parseWranglerDeployOutput(
    JSON.stringify({ type: 'wrangler-session', version: 1 }),
    'texasdefined-site',
  );
  assert.equal(missing.versionId, null);
  assert.match(missing.detail, /found 0/);

  const duplicate = parseWranglerDeployOutput([
    JSON.stringify({ type: 'deploy', worker_name: 'texasdefined-site', version_id: NEW }),
    JSON.stringify({ type: 'deploy', worker_name: 'texasdefined-site', version_id: OTHER }),
  ].join('\n'), 'texasdefined-site');
  assert.equal(duplicate.versionId, null);
  assert.match(duplicate.detail, /found 2/);
});

test('Wrangler deploy capture rejects the wrong worker and malformed output', () => {
  const wrongWorker = parseWranglerDeployOutput(
    JSON.stringify({ type: 'deploy', worker_name: 'another-worker', version_id: NEW }),
    'texasdefined-site',
  );
  assert.equal(wrongWorker.versionId, null);
  assert.match(wrongWorker.detail, /found 0/);

  const malformed = parseWranglerDeployOutput('{not-json}', 'texasdefined-site');
  assert.equal(malformed.versionId, null);
  assert.match(malformed.detail, /not valid JSON/);
});

test('post-deploy capture requires Cloudflare active identity to equal exact Wrangler deploy identity', () => {
  const state = { baselineVersion: OLD };

  const matched = evaluateCapturedVersion('post-deploy', NEW, state, NEW);
  assert.deepEqual(matched, { capturedVersion: NEW, detail: null });

  const stale = evaluateCapturedVersion('post-deploy', OLD, state, NEW);
  assert.equal(stale.capturedVersion, null);
  assert.match(stale.detail, new RegExp(`pre-deploy Worker ${OLD}.*Wrangler deployed ${NEW}`));

  const wrong = evaluateCapturedVersion('post-deploy', OTHER, state, NEW);
  assert.equal(wrong.capturedVersion, null);
  assert.match(wrong.detail, new RegExp(`reports ${OTHER} active, but this run deployed ${NEW}`));
});

test('post-verification capture accepts only the exact version deployed by this run', () => {
  const matched = evaluateCapturedVersion('post-verification', NEW, { deployedVersion: NEW });
  assert.deepEqual(matched, { capturedVersion: NEW, detail: null });

  const mismatched = evaluateCapturedVersion('post-verification', OLD, { deployedVersion: NEW });
  assert.equal(mismatched.capturedVersion, null);
  assert.match(mismatched.detail, new RegExp(`reports ${OLD} active, but this run deployed ${NEW}`));
});

test('empty deployment history fails closed', () => {
  const parsed = activeDeploymentFromPayload({ success: true, result: { deployments: [] } });
  assert.equal(parsed.versionId, null);
  assert.match(parsed.detail, /returned no deployments/);
});
