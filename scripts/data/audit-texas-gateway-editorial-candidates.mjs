import { buildGatewayProductionManifest } from "./texas-gateway-production-manifest.mjs";
import { classifyGatewayEditorialEntries, nonEditorialBlockers } from "./texas-gateway-editorial-candidates-lib.mjs";

const manifest = buildGatewayProductionManifest(process.cwd());
const classified = classifyGatewayEditorialEntries(manifest.entries);

const contentReadyStaged = classified.contentReadyStaged.map((entry) => ({
  slug: entry.slug,
  batch: entry.batch,
  qualityScore: entry.qualityScore,
  editorialReason: entry.editorialReason,
  metrics: entry.metrics,
}));

const needsRemediation = classified.needsRemediation.map((entry) => ({
  slug: entry.slug,
  batch: entry.batch,
  blockers: nonEditorialBlockers(entry),
}));

const intentionallyStaged = classified.intentionallyStaged.map((entry) => ({
  slug: entry.slug,
  batch: entry.batch,
  reason: entry.editorialReason,
  blockers: nonEditorialBlockers(entry),
}));

const productionReady = classified.productionReady.map((entry) => ({
  slug: entry.slug,
  batch: entry.batch,
  qualityScore: entry.qualityScore,
}));

const unexpected = classified.unexpected.map((entry) => ({
  slug: entry.slug,
  batch: entry.batch,
  editorialStatus: entry.editorialStatus,
  readinessResult: entry.readinessResult,
  blockers: entry.blockers,
}));

const partitionedTotal = contentReadyStaged.length + needsRemediation.length + intentionallyStaged.length + productionReady.length + unexpected.length;
if (partitionedTotal !== manifest.summary.total) {
  console.error(`Gateway editorial audit coverage failed: partitioned ${partitionedTotal} of ${manifest.summary.total} production-manifest entries.`);
  process.exit(1);
}

console.log(JSON.stringify({
  generatedAt: manifest.generatedAt,
  total: manifest.summary.total,
  contentReadyEditoriallyStaged: contentReadyStaged.length,
  needsReadinessRemediation: needsRemediation.length,
  intentionallyStaged: intentionallyStaged.length,
  productionReady: productionReady.length,
  unexpected: unexpected.length,
  contentReadyStaged,
  needsRemediation,
  intentionallyStaged,
  productionReady,
  unexpected,
}, null, 2));
