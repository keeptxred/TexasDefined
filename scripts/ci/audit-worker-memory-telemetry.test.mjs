import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assessMemoryEvidence, unpackTelemetryResponse } from './audit-worker-memory-telemetry.mjs';

function result(count, events = []) {
  return { success: true, result: { run: { status: 'COMPLETED' }, events: { count, events } } };
}

test('requires actually completed logged observations; a blank log dataset cannot certify health', () => {
  assert.throws(() => assessMemoryEvidence(result(0), result(0)), /No actual .* invocation logs/);
  assert.deepEqual(assessMemoryEvidence(result(63, [{ $metadata: { id: 'sample' } }]), result(0)), {
    observedInvocations: 63,
    memoryExhaustionEvents: 0,
  });
});

test('a genuine memory-exhaustion match remains a hard failure', () => {
  assert.throws(() => assessMemoryEvidence(result(20), result(2, [{ source: { message: 'Dynamic import exceeded memory limits' } }])), /recurred: 2/);
});

test('rejects incomplete, unauthorized, empty and malformed query results without inferring zero', () => {
  for (const bad of [
    null,
    { success: false, errors: [{ message: 'No permission' }] },
    { success: true, result: { run: { status: 'STARTED' } } },
    { success: true, result: { run: { status: 'COMPLETED' }, events: null } },
    { success: true, result: { run: { status: 'COMPLETED' }, events: { count: -1, events: [] } } },
    { success: true, result: { run: { status: 'COMPLETED' }, events: { count: 0 } } },
  ]) {
    assert.throws(() => unpackTelemetryResponse(bad));
  }
});

test('zero matches with unobserved baseline is not a pass', () => {
  assert.throws(() => assessMemoryEvidence(result(0, []), result(0)), /cannot certify/);
});
