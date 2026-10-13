import fs from "node:fs";
import path from "node:path";

/**
 * A route name added to the guide directory cannot be silently exempted by
 * writing "registered" into JSON. Existing legacy routes remain visible while
 * the editorial remediation issue tracks their factual/image/crosslink gaps.
 */
const read = (name) => JSON.parse(fs.readFileSync(name, "utf8"));
const baseline = read("docs/editorial/guide-route-baseline-20261012.json");
const registry = read("docs/editorial/guide-route-registry.json");
const existing = new Set(baseline.legacyRoutes);
const errors = [];
const seen = new Set();
const isDate = (v) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));
const isHttps = (v) => typeof v === "string" && /^https:\/\/[^\s]+$/.test(v);
for (const item of registry.routes) {
  if (seen.has(item.routeFile)) errors.push("Duplicate guide route: " + item.routeFile);
  seen.add(item.routeFile);
  if (!fs.existsSync(path.resolve(item.routeFile))) errors.push("Missing route source file: " + item.routeFile);
  if (existing.has(item.routeFile)) continue; // Legacy is unverified, NOT certified.
  if (item.type === "excluded-utility") {
    errors.push("New route " + item.routeFile + " cannot skip new-guide acceptance by claiming legacy utility exclusion.");
    continue;
  }
  const review = item.releaseReview;
  if (item.certification !== "accepted" || !review) {
    errors.push("New guide " + item.routeFile + " requires an accepted, evidence-backed editorial release review.");
    continue;
  }
  if (!isDate(review.verifiedAt) || !isDate(review.approvedAt) || !review.editor || !review.methodologyReviewed ||
    !review.imageRightsReviewed || !review.contextualLinksReviewed || !review.mobileAndAccessibilityQA ||
    !review.canonicalAndSchemaQA || !review.productionLikeRenderQA) {
    errors.push("New guide " + item.routeFile + " has incomplete editorial, rights, SEO or browser signoff.");
  }
  if (!Array.isArray(review.sources) || review.sources.length === 0 ||
    !review.sources.every((x) => isHttps(x.url) && isDate(x.checkedAt) && x.supportedClaims?.length > 0)) {
    errors.push("New guide " + item.routeFile + " lacks individually reviewed source-to-claim records.");
  }
  if (!Array.isArray(review.media) || !review.media.length ||
    !review.media.every((x) => x.src && x.alt && x.creator && isHttps(x.sourceUrl) && isHttps(x.licenseUrl))) {
    errors.push("New guide " + item.routeFile + " lacks documented rights for each intended image; don't guess or mark reused imagery free.");
  }
  if (!Array.isArray(review.relatedPages) || review.relatedPages.length === 0 ||
    !review.relatedPages.every((x) => typeof x === "string" && x.startsWith("/"))) {
    errors.push("New guide " + item.routeFile + " needs contextual internal link targets that have been checked.");
  }
}
for (const legacy of baseline.legacyRoutes) {
  if (!seen.has(legacy) && fs.existsSync(legacy)) errors.push("Legacy guide route disappeared from source registry: " + legacy);
}
if (errors.length) {
  console.error("Sitewide guide publication gate failed:\n" + errors.map((x) => "- " + x).join("\n"));
  process.exit(1);
}
console.log("Sitewide guide route publication gate passed: " + existing.size + " legacy guides remain in remediation, " +
  (seen.size - existing.size) + " added routes independently documented for release.");
