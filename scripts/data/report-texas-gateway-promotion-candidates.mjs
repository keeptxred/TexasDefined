import { validatePromotedGatewayArticles } from "./texas-gateway-production-manifest.mjs";

const { manifest } = validatePromotedGatewayArticles(process.cwd());

const isEditorialOnly = (entry) =>
  entry.blockers.length === 1 && entry.blockers[0].startsWith("editorial-status:");

const candidates = manifest.entries
  .filter(isEditorialOnly)
  .sort((a, b) => b.qualityScore - a.qualityScore || a.batch - b.batch || a.slug.localeCompare(b.slug));

const blockerCounts = new Map();
for (const entry of manifest.entries) {
  for (const blocker of entry.blockers) {
    const key = blocker.split(":", 1)[0];
    blockerCounts.set(key, (blockerCounts.get(key) ?? 0) + 1);
  }
}

console.log(`Gateway promotion candidates: ${candidates.length} editorial-status-only of ${manifest.summary.total} total gateways.`);
console.log("These pages have no remaining depth, authority-source, linking, image, duplication or cannibalization blocker under the production-readiness contract.");

if (candidates.length) {
  console.log("\nEditorial-status-only candidates:");
  for (const entry of candidates) {
    console.log(`${String(entry.qualityScore).padStart(3)}  batch ${String(entry.batch).padStart(2)}  ${entry.slug}  [${entry.editorialStatus}/${entry.editorialReason}]`);
  }
} else {
  console.log("\nNo gateway is currently blocked only by editorial status.");
}

console.log("\nRemaining blocker counts:");
for (const [key, count] of [...blockerCounts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) {
  console.log(`${String(count).padStart(3)}  ${key}`);
}
