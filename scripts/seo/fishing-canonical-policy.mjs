/**
 * Canonical policy for live fishing SEO screening.
 * Indexable pages require a self-referencing canonical. An intentionally
 * noindex page may omit canonical entirely; if one exists and differs from
 * the page URL, flag review rather than incorrectly treating omission as a defect.
 */
export function assessFishingCanonical({ canonical, expectedUrl, noindex }) {
  if (!noindex && canonical !== expectedUrl) {
    return { critical: ["self_canonical_mismatch"], warnings: [] };
  }
  if (noindex && canonical && canonical !== expectedUrl) {
    return { critical: [], warnings: ["noindex_nonself_canonical_review"] };
  }
  return { critical: [], warnings: [] };
}

// Decode HTML attribute values once, including React's apostrophe escaping.
export function decodeFishingHtml(value) {
  return value.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[0-9a-f]+);/gi, entity => {
    const token = entity.slice(1, -1).toLowerCase();
    const named = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">" };
    if (Object.hasOwn(named, token)) return named[token];
    const code = token.startsWith("#x") ? parseInt(token.slice(2), 16) : Number(token.slice(1));
    return Number.isInteger(code) && code >= 0 && code <= 0x10ffff ? String.fromCodePoint(code) : entity;
  });
}
