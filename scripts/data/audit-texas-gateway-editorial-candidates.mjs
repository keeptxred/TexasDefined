import { buildGatewayProductionManifest } from "./texas-gateway-production-manifest.mjs";

const manifest = buildGatewayProductionManifest(process.cwd());

const nonEditorialBlockers = (entry) => entry.blockers.filter((blocker) => !blocker.startsWith("editorial-status:"));

const productionReady = manifest.entries
  .filter((entry) => entry.editorialStatus === "index-ready" && entry.readinessResult === "pass" && nonEditorialBlockers(entry).length === 0)
  .map((entry) => ({
    slug: entry.slug,
    batch: entry.batch,
    qualityScore: entry.qualityScore,
    approvedAt: entry.promotion?.approvedAt,
    approvalBasis: entry.promotion?.basis,
    metrics: entry.metrics,
  }));

const promotedStillBlocked = manifest.entries
  .filter((entry) => entry.editorialStatus === "index-ready" && (entry.readinessResult !== "pass" || nonEditorialBlockers(entry).length > 0))
  .map((entry) => ({
    slug: entry.slug,
    batch: entry.batch,
    blockers: nonEditorialBlockers(entry),
  }));

if (promotedStillBlocked.length) {
  console.error("Gateway editorial candidate audit failed: one or more editorially promoted entries still have substantive production blockers.");
  for (const entry of promotedStillBlocked) console.error(`- ${entry.slug}: ${entry.blockers.join(", ") || entry.readinessResult}`);
  process.exit(1);
}

const candidates = manifest.entries
  .filter((entry) => entry.editorialStatus === "needs-expansion" && nonEditorialBlockers(entry).length === 0)
  .map((entry) => ({
    slug: entry.slug,
    batch: entry.batch,
    qualityScore: entry.qualityScore,
    editorialReason: entry.editorialReason,
    metrics: entry.metrics,
  }));

const stillBlocked = manifest.entries
  .filter((entry) => entry.editorialStatus === "needs-expansion" && nonEditorialBlockers(entry).length > 0)
  .map((entry) => ({
    slug: entry.slug,
    batch: entry.batch,
    blockers: nonEditorialBlockers(entry),
  }));

const intentionallyStaged = manifest.entries
  .filter((entry) => entry.editorialStatus === "remain-staged")
  .map((entry) => ({
    slug: entry.slug,
    batch: entry.batch,
    reason: entry.editorialReason,
    blockers: nonEditorialBlockers(entry),
  }));

const partitionedTotal = productionReady.length + candidates.length + stillBlocked.length + intentionallyStaged.length;
if (partitionedTotal !== manifest.summary.total) {
  console.error(`Gateway editorial candidate audit coverage failed: partitioned ${partitionedTotal} of ${manifest.summary.total} production-manifest entries.`);
  process.exit(1);
}

console.log(JSON.stringify({
  generatedAt: manifest.generatedAt,
  total: manifest.summary.total,
  productionReady: productionReady.length,
  editorialPromotionCandidates: candidates.length,
  needsExpansionStillBlocked: stillBlocked.length,
  intentionallyStaged: intentionallyStaged.length,
  productionReadyEntries: productionReady,
  candidates,
  stillBlocked,
  intentionallyStaged,
}, null, 2));
