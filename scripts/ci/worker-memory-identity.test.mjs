import assert from 'node:assert/strict';
import test from 'node:test';
import { checkWorkerIdentity } from './worker-memory-identity.mjs';

const a = 'e88c387d-d8da-4256-ab71-3aadea941450';
const b = '4a327db9-3b4b-48dd-8527-10ec31d7d39e';

test('pins a source-verified UUID on first uncached SSR response', () => {
  assert.deepEqual(checkWorkerIdentity(a), { workerVersion: a, failure: '' });
});
test('accepts the same Worker across unrelated route and origin checks', () => {
  assert.equal(checkWorkerIdentity(a, a).failure, '');
});
test('rejects a mixed canonical/direct Worker version instead of masking a deploy transition', () => {
  assert.match(checkWorkerIdentity(b, a).failure, /mixed Worker/);
});
test('rejects missing or malformed Worker version even on otherwise healthy HTTP 200', () => {
  for (const v of [null, '', 'unknown', '12345', '<html>']) {
    assert.match(checkWorkerIdentity(v, a).failure, /missing or invalid/);
  }
});
test('refuses malformed externally pinned expected Worker identity', () => {
  assert.match(checkWorkerIdentity(a, 'not-a-worker').failure, /invalid expected/);
});
