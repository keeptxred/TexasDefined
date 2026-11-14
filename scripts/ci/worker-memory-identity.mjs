// Fail-closed identity check for uncached, memory-sensitive SSR probes.
// A successful HTTP 200 from a different Worker is not proof that one
// published version passed all routes during concurrent deployments.
const WORKER_UUID = /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i;

export function checkWorkerIdentity(header, pinnedVersion = '') {
  const observed = typeof header === 'string' ? header.trim() : '';
  if (!WORKER_UUID.test(observed)) {
    return { workerVersion: observed, failure: 'missing or invalid Worker version header' };
  }
  if (pinnedVersion && !WORKER_UUID.test(pinnedVersion)) {
    return { workerVersion: observed, failure: 'invalid expected Worker version' };
  }
  if (pinnedVersion && observed !== pinnedVersion) {
    return { workerVersion: observed, failure: 'mixed Worker versions within one production acceptance' };
  }
  return { workerVersion: observed, failure: '' };
}
