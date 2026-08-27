import fs from "node:fs";
import path from "node:path";
import { validatePromotedGatewayArticles } from "./texas-gateway-production-manifest.mjs";

const args = process.argv.slice(2);
const writeIndex = args.indexOf("--write");
const writePath = writeIndex >= 0 ? args[writeIndex + 1] : null;
const enforcePromoted = args.includes("--enforce-promoted");
const jsonOnly = args.includes("--json");
const slugIndex = args.indexOf("--slug");
const slug = slugIndex >= 0 ? args[slugIndex + 1] : null;

const { manifest, failures } = validatePromotedGatewayArticles(process.cwd());
const filtered = slug ? { ...manifest, entries: manifest.entries.filter((entry) => entry.slug === slug) } : manifest;

if (writePath) {
  const target = path.resolve(process.cwd(), writePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(manifest, null, 2)}\n`);
}

if (jsonOnly) {
  console.log(JSON.stringify(filtered, null, 2));
} else {
  console.log(`Gateway production readiness: ${manifest.summary.total} total, ${manifest.summary.pass} pass, ${manifest.summary.blocked} blocked, ${manifest.summary.allowlisted} allowlisted.`);
  console.log(`Blocker cohorts: ${manifest.summary.depthBlocked} depth, ${manifest.summary.authorityBlocked} authority-source, ${manifest.summary.duplicationBlocked} duplication/cannibalization.`);
  if (slug) {
    const entry = filtered.entries[0];
    if (!entry) {
      console.error(`Unknown gateway slug: ${slug}`);
      process.exitCode = 1;
    } else {
      console.log(JSON.stringify(entry, null, 2));
    }
  } else {
    const ranked = [...manifest.entries].sort((a, b) => b.qualityScore - a.qualityScore || a.slug.localeCompare(b.slug));
    console.log("\nTop 20 closest to production readiness:");
    for (const entry of ranked.slice(0, 20)) console.log(`${String(entry.qualityScore).padStart(3)}  ${entry.slug}  [${entry.blockers.join(", ") || "pass"}]`);
    console.log("\n20 most blocked:");
    for (const entry of ranked.slice(-20).reverse()) console.log(`${String(entry.qualityScore).padStart(3)}  ${entry.slug}  [${entry.blockers.join(", ")}]`);
  }
  if (writePath) console.log(`\nWrote production manifest: ${writePath}`);
}

if (enforcePromoted && failures.length) {
  console.error("\nGateway promotion gate failed. Allowlisted slugs must pass the production readiness contract:");
  for (const entry of failures) console.error(`- ${entry.slug}: ${entry.blockers.join(", ")}`);
  process.exitCode = 1;
}
