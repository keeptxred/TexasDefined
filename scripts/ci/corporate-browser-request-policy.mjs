/**
 * Browser-only verification policy for Cloudflare's first-party RUM beacon.
 *
 * A POST to /cdn-cgi/rum is instrumentation, not a corporate-events inquiry
 * or an admin mutation. This intentionally does not allow other paths, verbs,
 * query variants, or cross-origin requests. Do not broaden the exemption.
 */
export function isCloudflareRumTelemetryRequest(method, rawUrl, expectedOrigin) {
  if (method !== 'POST') return false;
  try {
    const url = new URL(rawUrl);
    const site = new URL(expectedOrigin);
    return url.origin === site.origin
      && url.pathname === '/cdn-cgi/rum'
      && url.search === ''
      && url.hash === '';
  } catch {
    return false;
  }
}
