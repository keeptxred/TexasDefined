/**
 * Pinned first-party operator detail-page witnesses for two fishing businesses.
 * Never treat an unrelated site, generic search result or HTTP-200 challenge as
 * sufficient source evidence; source URL changes require individual review.
 * The public listing's operator homepage is deliberately preserved.
 */
const reviewed = Object.freeze({
  "captain-steve-barnes-texoma": Object.freeze({
    homepage: "https://txfishingguide.com/",
    witness: "https://txfishingguide.com/trips-and-charters/lake-texoma-striper-trips/",
    identity: Object.freeze(["Steve Barnes", "940-841-0910", "Lake Texoma", "striped bass"]),
  }),
  "reel-um-n-sam-rayburn-guide": Object.freeze({
    homepage: "https://www.rayburncountry.com/",
    witness: "https://www.rayburncountry.com/prices/",
    identity: Object.freeze(["Lynn Atkinson", "979-220-0251", "Bass Fishing", "Crappie"]),
  }),
});

export function sourceForFishingGuideReview(guide) {
  if (!guide || typeof guide.slug !== "string" || typeof guide.url !== "string") {
    throw new Error("Source review requires an identified operator and existing homepage");
  }
  const proof = reviewed[guide.slug];
  if (!proof) return { url: guide.url, identity: [] };
  const homepage = new URL(guide.url);
  const witness = new URL(proof.witness);
  if (guide.url !== proof.homepage || homepage.protocol !== "https:"
      || witness.protocol !== "https:" || homepage.origin !== witness.origin
      || proof.identity.length < 3 || proof.identity.some((text) => !text.trim())) {
    throw new Error("Reviewed fishing operator homepage/witness identity drift: " + guide.slug);
  }
  return { url: proof.witness, identity: [...proof.identity] };
}

export const PINNED_FISHING_OPERATOR_SOURCE_SLUGS = Object.freeze(Object.keys(reviewed));

/** A followed URL must remain the exact operator origin, never a third-party page. */
export function isSameOperatorOrigin(requestUrl, responseUrl) {
  try {
    const requested = new URL(requestUrl);
    const received = new URL(responseUrl);
    return requested.protocol === "https:" && received.protocol === "https:"
      && requested.origin === received.origin;
  } catch {
    return false;
  }
}
