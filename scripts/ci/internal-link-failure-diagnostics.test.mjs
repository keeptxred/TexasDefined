import assert from 'node:assert/strict';
import test from 'node:test';
import { classifyFailedInternalTarget, summarizeInternalTargetFailures } from './internal-link-failure-diagnostics.mjs';

test('HTTP 404 remains a strict broken target and is not labeled transport', () => {
  assert.deepEqual(classifyFailedInternalTarget('/real-404', { status: 404 }, new Set(['/b', '/a'])), {
    target: '/real-404', status: 404, failureKind: 'http', sources: ['/a', '/b'],
  });
});

test('status-zero timeout keeps its reason, distinct from an HTTP 404', () => {
  const multilineError = ['AbortError: request timed out', 'after 25s'].join(String.fromCharCode(10));
  const result = classifyFailedInternalTarget('/slow-isd', { status: 0, error: multilineError }, ['/team']);
  assert.equal(result.status, 0);
  assert.equal(result.failureKind, 'transport');
  assert.equal(result.error, 'AbortError: request timed out after 25s');
});

test('absent response is recorded as an unresolved transport failure', () => {
  const result = classifyFailedInternalTarget('/unresolved', undefined, ['/source']);
  assert.equal(result.failureKind, 'transport');
  assert.match(result.error, /No HTTP response/);
});

test('a successful target is not classified as broken', () => {
  assert.equal(classifyFailedInternalTarget('/healthy', { status: 200 }, ['/source']), null);
});

test('counts preserve strict total while separating transport from real HTTP errors', () => {
  const failures = [
    classifyFailedInternalTarget('/a', { status: 0, error: 'timeout' }, ['/source']),
    classifyFailedInternalTarget('/b', { status: 404 }, ['/source']),
    classifyFailedInternalTarget('/c', { status: 500 }, ['/source']),
  ];
  const counts = summarizeInternalTargetFailures(failures);
  assert.deepEqual(counts, { transportFailures: 1, httpErrorTargets: 2 });
  assert.equal(counts.transportFailures + counts.httpErrorTargets, failures.length);
});
