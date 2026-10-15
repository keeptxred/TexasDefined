/**
 * Cheap, deterministic guard for feed items that are discovery pointers,
 * web housekeeping pages or transient score tickers rather than a substantive
 * original lifestyle report. Applies before ANY optional source fetch/AI spend.
 */
export function isTexasDefinedDirectEditorialSource(item) {
  const title = String(item?.title ?? '').trim();
  const link = String(item?.link ?? '').trim();
  if (!title || !link) return false;
  let parsed;
  try {
    parsed = new URL(link);
  } catch {
    return false;
  }
  if (!['https:', 'http:'].includes(parsed.protocol)) return false;
  const hostname = parsed.hostname.toLowerCase().replace(/^www\./, '');
  if (hostname === 'news.google.com') return false;
  if ((hostname === 'lrl.state.tx.us' || hostname === 'lrl.texas.gov')
    && (parsed.pathname.toLowerCase() === '/cl.cfm'
      || parsed.pathname.toLowerCase().startsWith('/currentissues/clips/'))) return false;
  const normalizedTitle = title.toLowerCase();
  // Such items should not be expanded into 750-word "original reporting".
  if (/\b(?:privacy policy|cookie policy|terms of (?:use|service)|accessibility statement|user agreement)\b/.test(normalizedTitle)) return false;
  if (/\b(?:live (?:updates?|scores?|blog)|scores? and schedule|scoreboard|up[- ]to[- ]the[- ]minute scores?|week\s*\d+ live scores?)\b/.test(normalizedTitle)) return false;
  return true;
}
