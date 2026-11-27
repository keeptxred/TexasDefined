/**
 * Pinned first-party operator detail-page witnesses for individually reviewed fishing businesses.
 * Never treat an unrelated site, generic search result or HTTP-200 challenge as
 * sufficient source evidence; source URL changes require individual review.
 * The public listing's operator homepage is deliberately preserved.
 */
const reviewed = Object.freeze({
  "captain-steve-barnes-texoma": Object.freeze({
    homepage: "https://txfishingguide.com/",
    witness: "https://wildlifedepartment.com/fishing/fishing-guides",
    sourceKind: "oklahoma-licensed-guide-list",
    identity: Object.freeze(["Capt.Steve Barnes Guide Servic", "(940)841-0910", "Steve L Barnes"]),
  }),
  "adventure-texoma-guide": Object.freeze({
    homepage: "https://adventuretex.com/",
    witness: "https://wildlifedepartment.com/fishing/fishing-guides",
    sourceKind: "oklahoma-licensed-guide-list",
    identity: Object.freeze(["Adventure Texoma", "(903)744-6169", "Lake Texoma"]),
  }),
  "reel-um-n-sam-rayburn-guide": Object.freeze({
    homepage: "https://www.rayburncountry.com/",
    witness: "https://tpwd.texas.gov/fishboat/fish/action/reptform2.php?Submit=Go&archive=wholeyear&lake=SAM+RAYBURN&yearcat=current",
    sourceKind: "tpwd-attributed-fishing-report",
    identity: Object.freeze(["Sam Rayburn Fishing Report", "Report by Captain Lynn Atkinson, Reel Um N Guide Service", "Feb 25, 2026"]),
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
  const governmentLicense = proof.sourceKind === "oklahoma-licensed-guide-list";
  const governmentReport = proof.sourceKind === "tpwd-attributed-fishing-report";
  const approvedOrigin = governmentReport
    ? (guide.slug === "reel-um-n-sam-rayburn-guide" && witness.origin === "https://tpwd.texas.gov")
    : governmentLicense
    ? (["captain-steve-barnes-texoma", "adventure-texoma-guide"].includes(guide.slug) && witness.origin === "https://wildlifedepartment.com")
    : homepage.origin === witness.origin;
  if (guide.url !== proof.homepage || homepage.protocol !== "https:"
      || witness.protocol !== "https:" || !approvedOrigin
      || proof.identity.length < 3 || proof.identity.some((text) => !text.trim())) {
    throw new Error("Reviewed fishing operator homepage/witness identity drift: " + guide.slug);
  }
  return { url: proof.witness, identity: [...proof.identity],
    sourceKind: governmentReport ? "government-report-identity-only" : governmentLicense ? "government-license" : "operator-detail" };
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

/** An official licensing entry must be one exact table row, never words from
 * multiple unrelated business records on an aggregated public roster. */
export function officialFishingGuideSingleRowMatches(html, evidence) {
  if (typeof html !== "string" || !Array.isArray(evidence) || evidence.length < 3) return false;
  const simplify = (s) => s.replace(/<[^>]+>/g, " ").replace(/&(?:nbsp|amp);/gi, " ")
    .normalize("NFKD").toLowerCase().replace(/[^a-z0-9]/g, "");
  const rows = html.match(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi) ?? [];
  return rows.filter(row => evidence.every(text => simplify(row).includes(simplify(text)))).length === 1;
}
