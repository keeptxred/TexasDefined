import assert from 'node:assert/strict';
import test from 'node:test';

import {
  activeDeploymentFromPayload,
  evaluateCapturedVersion,
  parseTrafficVersions,
} from './capture-active-worker-version.mjs';

const OLD = '11111111-1111-4111-8111-111111111111';
const NEW = '22222222-2222-4222-8222-222222222222';
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

test('post-verification capture accepts only the version deployed by this run', () => {
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
