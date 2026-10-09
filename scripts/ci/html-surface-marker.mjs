/**
 * Match an expected readable phrase in server-rendered HTML without confusing
 * HTML entity encoding with missing content.
 *
 * React correctly serializes an ampersand in a heading as &amp;. The live
 * verifier must recognize that serialization, but still require the entire
 * expected phrase. This is a text-matching helper, not a bypass for HTTP,
 * Cloudflare challenges, or other production gates.
 */
export function matchesExpectedSurface(html, needle) {
  if (html.includes(needle)) return true;
  if (!needle.includes('&')) return false;
  const withReadableAmpersands = html.replace(/&(?:amp|#0*38|#x0*26);/gi, '&');
  return withReadableAmpersands.includes(needle);
}
