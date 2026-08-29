import { buildGatewayProductionManifest } from "./texas-gateway-production-manifest.mjs";

const manifest = buildGatewayProductionManifest(process.cwd());

const nonEditorialBlockers = (entry) => entry.blockers.filter((blocker) => !blocker.startsWith("editorial-status:"));

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

const partitionedTotal = candidates.length + stillBlocked.length + intentionallyStaged.length;
if (partitionedTotal !== manifest.summary.total) {
  console.error(`Gateway editorial candidate audit coverage failed: partitioned ${partitionedTotal} of ${manifest.summary.total} production-manifest entries.`);
  process.exit(1);
}

console.log(JSON.stringify({
  generatedAt: manifest.generatedAt,
  total: manifest.summary.total,
  editorialPromotionCandidates: candidates.length,
  needsExpansionStillBlocked: stillBlocked.length,
  intentionallyStaged: intentionallyStaged.length,
  candidates,
  stillBlocked,
  intentionallyStaged,
}, null, 2));
