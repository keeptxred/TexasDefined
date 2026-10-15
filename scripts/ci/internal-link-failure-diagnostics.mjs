// Pure diagnostics for strict internal-link audits. Transport errors are failures,
// but must not be reported as HTTP 404s when no response was received.
export function classifyFailedInternalTarget(target, check, sources) {
  const status = Number(check?.status) || 0;
  if (status > 0 && status < 400) return null;
  const failureKind = status === 0 ? 'transport' : 'http';
  const failure = { target, status, failureKind, sources: [...sources].sort() };
  if (failureKind === 'transport') {
    failure.error = String(check?.error || 'No HTTP response was recorded')
      .replace(/\s+/g, ' ').trim().slice(0, 400);
  }
  return failure;
}

export function summarizeInternalTargetFailures(failures) {
  const transportFailures = failures.filter((failure) => failure.failureKind === 'transport').length;
  return { transportFailures, httpErrorTargets: failures.length - transportFailures };
}
