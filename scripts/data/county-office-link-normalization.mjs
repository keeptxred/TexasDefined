// Pure, bounded canonicalizer for the public office links listed by the
// Texas Comptroller. A successful HTTPS redirect is not proof that the
// destination is a usable public office homepage (e.g. UserLockedOut).
//
// Only two known vendor-hosted property-search systems synthesize a changing
// `time` cache-buster. Keep their county-specific dbkey, and discard *only*
// that volatile time parameter. Do not strip query strings generically.
const vendorHosts = new Set([
  'iswdataclient.azurewebsites.net',
  'www.southwestdatasolution.com',
]);

export function normalizeVerifiedCountyOfficeUrl(raw) {
  let url;
  try { url = new URL(raw); } catch { return null; }
  if (url.protocol !== 'https:' || url.username || url.password) return null;
  const host = url.hostname.toLowerCase();
  if (!host.includes('.') || host.includes(':') ||
      /^(?:localhost|127\.|10\.|192\.168\.|169\.254\.|0\.0\.0\.0|172\.(?:1[6-9]|2\d|3[01])\.)/i.test(host)) return null;

  // Maintenance, account lockout, access challenge and login redirects
  // are not publicly verified appraisal/tax office landing pages.
  if (/(?:^|\/)(?:userlockedout|accessdenied|forbidden|unauthorized|login|logon|signin|error)(?:\/|$)/i.test(url.pathname)) {
    return null;
  }

  if (vendorHosts.has(host) && url.pathname.toLowerCase() === '/webindex.aspx') {
    const key = url.searchParams.get('dbkey');
    const time = url.searchParams.get('time');
    if (time !== null) {
      if (!key || !/^[a-z0-9_-]{4,32}$/i.test(key) ||
          !/^\d{12,18}$/.test(time) || url.searchParams.getAll('time').length !== 1) return null;
      url.searchParams.delete('time');
    }
  }
  url.hash = '';
  return url.toString();
}

/**
 * A number of genuine county-government sites reject anonymous HEAD (403)
 * yet expose a public homepage on GET. Only these explicit status codes
 * justify a bounded second request. Final HTTPS URL, public-path and
 * HTTP-success checks remain mandatory. Do not retry 404, 429 or 5xx as
 * permission to re-verify an office.
 */
export function retryPublicOfficeGetAfterHeadStatus(status) {
  return status === 403 || status === 405 || status === 501;
}
