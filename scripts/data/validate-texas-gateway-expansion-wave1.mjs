import { buildGatewayProductionManifest } from "./texas-gateway-production-manifest.mjs";

const WAVE1_SLUGS = [
  "things-to-know-before-visiting-texas",
  "things-nobody-tells-you-before-moving-to-texas",
  "things-texas-does-differently-than-every-other-state",
  "texas-foods-you-need-to-try",
  "places-everyone-should-visit-in-texas",
  "things-to-know-before-camping-in-texas",
  "things-to-know-before-state-fair-of-texas",
  "things-that-define-texas",
];

const PROMOTION_ONLY_PREFIXES = ["editorial-status:", "cannibalization:"];
const manifest = buildGatewayProductionManifest(process.cwd());
const bySlug = new Map(manifest.entries.map((entry) => [entry.slug, entry]));
const errors = [];

for (const slug of WAVE1_SLUGS) {
  const entry = bySlug.get(slug);
  if (!entry) {
    errors.push(`${slug}: missing from production-readiness manifest`);
    continue;
  }

  if (entry.allowlisted) {
    errors.push(`${slug}: expansion wave must remain staged/noindex until the separate promotion review`);
  }
  if (entry.editorialStatus !== "needs-expansion") {
    errors.push(`${slug}: editorial status changed before the separate promotion review (${entry.editorialStatus})`);
  }

  const contentBlockers = entry.blockers.filter((blocker) => !PROMOTION_ONLY_PREFIXES.some((prefix) => blocker.startsWith(prefix)));
  if (contentBlockers.length) {
    errors.push(`${slug}: remaining content-readiness blockers: ${contentBlockers.join(", ")}`);
  }
}

if (errors.length) {
  console.error("Gateway expansion wave 1 validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Gateway expansion wave 1 clears the content-quality contract and remains deliberately staged for separate canonical/promotion review.");
for (const slug of WAVE1_SLUGS) {
  const entry = bySlug.get(slug);
  const promotionBlockers = entry.blockers.filter((blocker) => PROMOTION_ONLY_PREFIXES.some((prefix) => blocker.startsWith(prefix)));
  console.log(`- ${slug}: ${entry.metrics.estimatedWords} words, ${entry.metrics.internalLinkCount} internal links, ${entry.metrics.relatedTargets} related targets, promotion-only=${promotionBlockers.join(",") || "none"}`);
}
