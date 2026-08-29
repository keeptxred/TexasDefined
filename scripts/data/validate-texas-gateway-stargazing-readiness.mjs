import { buildGatewayProductionManifest } from "./texas-gateway-production-manifest.mjs";

const SLUG = "best-texas-stargazing-weekend-trips";
const manifest = buildGatewayProductionManifest(process.cwd());
const entry = manifest.entries.find((candidate) => candidate.slug === SLUG);

if (!entry) {
  console.error(`Stargazing Gateway readiness validation failed: missing manifest entry for ${SLUG}.`);
  process.exit(1);
}

const nonEditorialBlockers = entry.blockers.filter((blocker) => !blocker.startsWith("editorial-status:"));
if (nonEditorialBlockers.length > 0) {
  console.error(`Stargazing Gateway readiness validation failed: ${nonEditorialBlockers.join(", ")}`);
  console.error(JSON.stringify(entry, null, 2));
  process.exit(1);
}

if ((entry.metrics?.estimatedWords ?? 0) < entry.targetMinimumWords) {
  console.error(`Stargazing Gateway readiness validation failed: ${entry.metrics?.estimatedWords ?? 0} words < ${entry.targetMinimumWords}.`);
  process.exit(1);
}

console.log(`Stargazing Gateway mechanical readiness passed: ${entry.metrics.estimatedWords} words, ${entry.metrics.paragraphCount} paragraphs, ${entry.metrics.headingCount} headings, ${entry.metrics.internalLinkCount} internal links and ${entry.metrics.relatedTargets} related targets; only editorial promotion state may remain.`);
