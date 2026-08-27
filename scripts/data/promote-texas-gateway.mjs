import fs from "node:fs";
import path from "node:path";
import { buildGatewayProductionManifest } from "./texas-gateway-production-manifest.mjs";

const args = process.argv.slice(2);
const slug = args.find((arg) => !arg.startsWith("--"));
const write = args.includes("--write");
if (!slug) {
  console.error("Usage: node scripts/data/promote-texas-gateway.mjs <slug> [--write]");
  process.exit(1);
}

const root = process.cwd();
const readinessPath = path.join(root, "src/data/fixtures/texas-gateway-index-readiness.ts");
const stubsPath = path.join(root, "src/data/fixtures/texas-gateway-index-ready-stubs.ts");
const manifest = buildGatewayProductionManifest(root);
const entry = manifest.entries.find((candidate) => candidate.slug === slug);
if (!entry) {
  console.error(`Unknown gateway slug: ${slug}`);
  process.exit(1);
}
if (entry.readinessResult !== "pass") {
  console.error(`Refusing to promote ${slug}. Production readiness blockers:`);
  for (const blocker of entry.blockers) console.error(`- ${blocker}`);
  process.exit(1);
}
const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const stubs = fs.readFileSync(stubsPath, "utf8");
if (!new RegExp(`\\bslug\\s*:\\s*["']${escapedSlug}["']`).test(stubs)) {
  console.error(`Refusing to promote ${slug}: lightweight public-discovery stub is missing.`);
  process.exit(1);
}
const readiness = fs.readFileSync(readinessPath, "utf8");
const allowlistBody = readiness.match(/TEXAS_GATEWAY_INDEX_READY_SLUGS\s*=\s*new Set<string>\(\[([\s\S]*?)\]\)/)?.[1] ?? "";
if (new RegExp(`["']${escapedSlug}["']`).test(allowlistBody)) {
  console.log(`${slug} is already allowlisted.`);
  process.exit(0);
}
if (!write) {
  console.log(`${slug} passes the production readiness gate and has a discovery stub.`);
  console.log("Dry run only. Re-run with --write to add it to TEXAS_GATEWAY_INDEX_READY_SLUGS.");
  process.exit(0);
}
const updated = readiness.replace(
  /TEXAS_GATEWAY_INDEX_READY_SLUGS\s*=\s*new Set<string>\(\[([\s\S]*?)\]\)/,
  (match, body) => {
    const trimmed = body.trim();
    const nextBody = trimmed ? `${trimmed}\n  \"${slug}\",` : `\n  \"${slug}\",\n`;
    return `TEXAS_GATEWAY_INDEX_READY_SLUGS = new Set<string>([${nextBody}])`;
  },
);
if (updated === readiness) {
  console.error("Could not locate gateway allowlist declaration; no file changed.");
  process.exit(1);
}
fs.writeFileSync(readinessPath, updated);
console.log(`Promoted ${slug}. Run the gateway validation suite before committing.`);
