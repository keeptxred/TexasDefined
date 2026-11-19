import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assessMemoryEvidence, assessWindowEdgeCoverage, classifyMemoryObservation, unpackTelemetryResponse } from './audit-worker-memory-telemetry.mjs';

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


test('short clean postdeploy samples never count as six-hour incident clearance', () => {
  const evidence = { observedInvocations: 2, memoryExhaustionEvents: 0 };
  assert.deepEqual(classifyMemoryObservation(0, 86_000, evidence), {
    observationDurationMs: 86_000,
    sixHourWindowSatisfied: false,
    certificationStatus: 'SHORT_WINDOW_ONLY',
  });
});

test('a six-hour positive, zero-error window is distinguished from brief checks', () => {
  const evidence = { observedInvocations: 63, memoryExhaustionEvents: 0 };
  assert.deepEqual(classifyMemoryObservation(0, 6 * 60 * 60 * 1000, evidence, { beginningInvocations: 2, endingInvocations: 3 }), {
    observationDurationMs: 6 * 60 * 60 * 1000,
    sixHourWindowSatisfied: true,
    certificationStatus: 'SIX_HOUR_WINDOW_OBSERVED',
  });
  assert.equal(classifyMemoryObservation(0, 6 * 60 * 60 * 1000 - 1, evidence, { beginningInvocations: 2, endingInvocations: 3 }).sixHourWindowSatisfied, false);
});

test('a six-hour status cannot be generated from missing or failed evidence', () => {
  assert.throws(() => classifyMemoryObservation(0, 6 * 60 * 60 * 1000, { observedInvocations: 0, memoryExhaustionEvents: 0 }), /positive observations/);
  assert.throws(() => classifyMemoryObservation(0, 6 * 60 * 60 * 1000, { observedInvocations: 3, memoryExhaustionEvents: 1 }), /zero exceptions/);
  assert.throws(() => classifyMemoryObservation(1, 0, { observedInvocations: 3, memoryExhaustionEvents: 0 }), /Invalid .* window/);
});

test('six-hour query without positive same-version invocation logs at both edges remains unverified', () => {
  const good = { observedInvocations: 2, memoryExhaustionEvents: 0 };
  const fullWindow = 6 * 60 * 60 * 1000;
  assert.equal(classifyMemoryObservation(0, fullWindow, good).certificationStatus, 'SIX_HOUR_COVERAGE_INCOMPLETE');
  assert.equal(classifyMemoryObservation(0, fullWindow, good, { beginningInvocations: 0, endingInvocations: 2 }).sixHourWindowSatisfied, false);
  assert.equal(classifyMemoryObservation(0, fullWindow, good, { beginningInvocations: 2, endingInvocations: 0 }).sixHourWindowSatisfied, false);
  assert.equal(classifyMemoryObservation(0, fullWindow, good, { beginningInvocations: 2, endingInvocations: 2 }).sixHourWindowSatisfied, true);
  assert.deepEqual(assessWindowEdgeCoverage(result(4, [{}]), result(5, [{}])), { beginningInvocations: 4, endingInvocations: 5 });
  assert.throws(() => assessWindowEdgeCoverage(result(1), { success: true, result: { run: { status: 'STARTED' } } }), /not completed/);
});
