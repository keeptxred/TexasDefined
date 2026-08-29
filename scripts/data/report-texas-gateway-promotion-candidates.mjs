import { validatePromotedGatewayArticles } from "./texas-gateway-production-manifest.mjs";

const { manifest } = validatePromotedGatewayArticles(process.cwd());

const technicalBlockers = (entry) => entry.blockers.filter((blocker) => !blocker.startsWith("editorial-status:"));
const isEditorialOnly = (entry) => technicalBlockers(entry).length === 0;

const candidates = manifest.entries
  .filter(isEditorialOnly)
  .sort((a, b) => b.qualityScore - a.qualityScore || a.batch - b.batch || a.slug.localeCompare(b.slug));

const closest = manifest.entries
  .map((entry) => ({ ...entry, technicalBlockers: technicalBlockers(entry) }))
  .sort((a, b) =>
    a.technicalBlockers.length - b.technicalBlockers.length ||
    b.qualityScore - a.qualityScore ||
    (b.metrics?.estimatedWords ?? 0) - (a.metrics?.estimatedWords ?? 0) ||
    a.slug.localeCompare(b.slug),
  );

const blockerCounts = new Map();
for (const entry of manifest.entries) {
  for (const blocker of technicalBlockers(entry)) {
    const key = blocker.split(":", 1)[0];
    blockerCounts.set(key, (blockerCounts.get(key) ?? 0) + 1);
  }
}

console.log(`Gateway promotion candidates: ${candidates.length} editorial-status-only of ${manifest.summary.total} total gateways.`);
console.log("Editorial status is ignored only for this diagnostic; all production gates remain unchanged.");

if (candidates.length) {
  console.log("\nEditorial-status-only candidates:");
  for (const entry of candidates) {
    console.log(`${String(entry.qualityScore).padStart(3)}  batch ${String(entry.batch).padStart(2)}  ${entry.slug}  [${entry.editorialStatus}/${entry.editorialReason}]`);
  }
} else {
  console.log("\nNo gateway is currently blocked only by editorial status.");
}

console.log("\nTop 30 closest technical remediation candidates:");
for (const entry of closest.slice(0, 30)) {
  const words = entry.metrics?.estimatedWords ?? 0;
  const links = entry.metrics?.internalLinkCount ?? 0;
  const related = entry.metrics?.relatedTargets ?? 0;
  console.log(`${String(entry.technicalBlockers.length).padStart(2)} blockers | ${String(words).padStart(4)} words | ${String(links).padStart(2)} links | ${String(related).padStart(2)} related | batch ${String(entry.batch).padStart(2)} | ${entry.slug} | ${entry.technicalBlockers.join(", ") || "technical-pass"}`);
}

console.log("\nRemaining technical blocker counts:");
for (const [key, count] of [...blockerCounts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) {
  console.log(`${String(count).padStart(3)}  ${key}`);
}
