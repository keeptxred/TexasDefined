// Full-site audits must execute the built Worker on the runner, never the edge.
const OWN_HOSTS = new Set(['texasdefined.com', 'www.texasdefined.com', 'texasdefined-site.freddy-coppola.workers.dev']);
const REDIRECTS = new Set([301, 302, 303, 307, 308]);

export function createLocalAuditFetch({ localOrigin, fetchImpl = fetch, maxRequests = 100_000 } = {}) {
  const local = new URL(localOrigin || 'https://invalid.local-audit-origin');
  if (local.protocol !== 'http:' || local.hostname !== '127.0.0.1' || !local.port || local.username || local.password || local.pathname !== '/' || local.search || local.hash) {
    throw new Error('Full-site audit refused: LOCAL_AUDIT_ORIGIN must be http://127.0.0.1:<port>. Run scripts/ci/run-local-quality-audits.mjs.');
  }
  if (!Number.isSafeInteger(maxRequests) || maxRequests < 1 || maxRequests > 100_000) throw new Error('Invalid local audit request budget');
  let requests = 0;
  let exhausted = false;
  const auditFetch = async (input, options = {}) => {
    let logical = new URL(input);
    const method = (options.method || 'GET').toUpperCase();
    if (!['GET', 'HEAD'].includes(method)) throw new Error('Full-site audits are read-only');
    for (let hop = 0; hop <= 8; hop += 1) {
      if (++requests > maxRequests) {
        exhausted = true;
        throw new Error(`Local audit request budget exhausted (${maxRequests}); report is incomplete`);
      }
      const transport = new URL(logical);
      if (OWN_HOSTS.has(logical.hostname)) {
        transport.protocol = local.protocol;
        transport.host = local.host;
      } else if (logical.origin !== local.origin && (!['https:', 'http:'].includes(logical.protocol) || /(?:^|\.)texasdefined\.com$|(?:^|\.)workers\.dev$/.test(logical.hostname))) {
        throw new Error(`Unmapped site origin refused: ${logical.origin}`);
      }
      const response = await fetchImpl(transport, { ...options, redirect: 'manual' });
      // Keep canonical URLs in link graphs and reports even though bytes came from loopback.
      Object.defineProperty(response, 'url', { value: logical.href, configurable: true });
      if (!REDIRECTS.has(response.status) || options.redirect === 'manual') return response;
      if (options.redirect === 'error') throw new Error(`Unexpected redirect: ${logical.href}`);
      const location = response.headers.get('location');
      if (!location) return response;
      await response.body?.cancel();
      logical = new URL(location, logical);
    }
    throw new Error('Local audit redirect limit exceeded');
  };
  auditFetch.assertComplete = () => {
    if (exhausted) throw new Error('Local audit request budget exhausted; refusing a partial passing report');
  };
  return auditFetch;
}
