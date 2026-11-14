/** Read-only disposition policy for supplemental Oct 31 Crawl stats 404 paths.
 * This is NOT the separate 99-path Page indexing incident disposition policy.
 * An old 404 observation is not proof that today's deliberate 404 is an error.
 */
export const EXTRA_GSC_CRAWLSTATS_COUNT = 42;

export function parseSupplementalPaths(raw, existing99) {
  const extract = (s) => s.split(/\r?\n/).map((v) => v.trim()).filter((v) => v && !v.startsWith('#'));
  const paths = extract(raw);
  const previous = new Set(extract(existing99));
  if (paths.length !== EXTRA_GSC_CRAWLSTATS_COUNT || new Set(paths).size !== EXTRA_GSC_CRAWLSTATS_COUNT)
    throw new Error('Supplemental sample must contain 42 unique historic paths');
  for (const p of paths) {
    if (!p.startsWith('/') || p.startsWith('//') || p.includes('?') || p.includes('#') || /[\r\n]/.test(p))
      throw new Error('Unsafe or non-path historical URL: ' + p);
    if (previous.has(p)) throw new Error('Do not repeat previously certified 99-path GSC case: ' + p);
  }
  return paths;
}

export function isLiteralRouteLeak(path) {
  let p = path;
  for (let i = 0; i < 3; i++) {
    let value;
    try { value = decodeURIComponent(p); } catch { return true; }
    if (value === p) break;
    p = value;
  }
  return p.split('/').some((part) => part.startsWith('$') || part === 'undefined' || /^\{[-+]?\$/.test(part));
}

function sameCleanCanonical(url, expected) {
  if (!url) return false;
  try {
    const normalized = new URL(url);
    return normalized.href === expected && normalized.protocol === 'https:' && normalized.hostname === 'texasdefined.com';
  } catch { return false; }
}

/** Never blindly restore a closed park, deleted store item or invalid route.
 * HTTP404 cases require source-backed editorial review, not automatic 301s.
 */
export function classifySupplementalResponse({ path, firstStatus, finalStatus, finalUrl, canonical, robots = '', contentType = '', enforcePublishedCanonical = false, error }) {
  if (error) return { review: 'transport-or-redirect-review', blocking: true };
  if (firstStatus == null || finalStatus == null) return { review: 'missing-http-evidence', blocking: true };
  if (firstStatus >= 500 || finalStatus >= 500) return { review: 'server-error', blocking: true };
  if (firstStatus >= 300 && firstStatus < 400 && (finalStatus === 404 || finalStatus === 410))
    return { review: 'redirect-to-missing', blocking: true };
  if (isLiteralRouteLeak(path))
    return { review: firstStatus === 404 || firstStatus === 410 ? 'correct-invalid-route-404' : 'route-template-leak', blocking: firstStatus !== 404 && firstStatus !== 410 };
  if (finalStatus === 404 || finalStatus === 410)
    return { review: 'currently-missing-editorial-review', blocking: false };
  if (finalStatus === 200) {
    // Apple association JSON is an auxiliary machine resource, not an HTML page.
    if (path === '/apple-app-site-association' && /application\/(json|pkcs7-mime)/i.test(contentType || ''))
      return { review: 'valid-apple-association-resource', blocking: false };
    const url = new URL(finalUrl);
    if (url.pathname === '/' && path !== '/') return { review: 'generic-homepage-soft404-risk', blocking: true };
    const content = canonical?.trim();
    if (!sameCleanCanonical(content, url.href)) return { review: 'missing-or-mismatched-final-canonical', blocking: true };
    if (/\bnoindex\b/i.test(robots || '')) {
      // Historical alias maps to source-verified, active TPWD visitor page.
      // Only enforce after a protected release; PR checks against still-old
      // production must remain observational, never require unshipped code.
      if (enforcePublishedCanonical && path === '/destination/seminole-canyon-state-park-and-historic-site')
        return { review: 'seminole-indexability-regression', blocking: true };
      return { review: 'google-indexability-review', blocking: false };
    }
    return { review: firstStatus >= 300 && firstStatus < 400 ? 'valid-canonical-redirect' : 'served-self-canonical-200', blocking: false };
  }
  return { review: 'unexpected-http-response', blocking: true };
}
