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
