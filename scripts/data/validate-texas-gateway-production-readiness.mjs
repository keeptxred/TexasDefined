import { validatePromotedGatewayArticles } from "./texas-gateway-production-manifest.mjs";

const { manifest, failures } = validatePromotedGatewayArticles(process.cwd());

if (manifest.summary.total !== 140) {
  console.error(`Gateway production-readiness validation failed: expected 140 gateway articles, found ${manifest.summary.total}.`);
  process.exit(1);
}

if (failures.length) {
  console.error("Gateway production-readiness validation failed for promoted articles:");
  for (const entry of failures) console.error(`- ${entry.slug}: ${entry.blockers.join(", ")}`);
  process.exit(1);
}

console.log(`Gateway production-readiness validation passed: ${manifest.summary.total} articles audited, ${manifest.summary.allowlisted} allowlisted, ${manifest.summary.depthBlocked} depth-blocked, ${manifest.summary.authorityBlocked} authority-source-blocked, ${manifest.summary.duplicationBlocked} duplication/cannibalization-blocked.`);
