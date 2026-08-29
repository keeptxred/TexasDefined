import { buildGatewayProductionManifest } from "./texas-gateway-production-manifest.mjs";
import { classifyGatewayEditorialEntries, nonEditorialBlockers } from "./texas-gateway-editorial-candidates-lib.mjs";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const synthetic = classifyGatewayEditorialEntries([
  { slug: "ready-staged", editorialStatus: "needs-expansion", readinessResult: "blocked", blockers: ["editorial-status:needs-expansion"] },
  { slug: "thin-staged", editorialStatus: "needs-expansion", readinessResult: "blocked", blockers: ["editorial-status:needs-expansion", "depth:900<1200"] },
  { slug: "intentional", editorialStatus: "remain-staged", readinessResult: "blocked", blockers: ["editorial-status:remain-staged", "depth:700<1200"] },
  { slug: "live", editorialStatus: "index-ready", readinessResult: "pass", blockers: [] },
]);

assert(synthetic.contentReadyStaged.map((entry) => entry.slug).join() === "ready-staged", "Editorial-only staged pages must be classified as content-ready staged.");
assert(synthetic.needsRemediation.map((entry) => entry.slug).join() === "thin-staged", "Needs-expansion pages with substantive blockers must remain in remediation.");
assert(synthetic.intentionallyStaged.map((entry) => entry.slug).join() === "intentional", "Remain-staged governance must stay intentionally staged even when quality blockers exist.");
assert(synthetic.productionReady.map((entry) => entry.slug).join() === "live", "Only index-ready entries that pass the existing readiness contract may be production-ready.");

const manifest = buildGatewayProductionManifest(process.cwd());
const classified = classifyGatewayEditorialEntries(manifest.entries);
const partitioned = Object.values(classified).reduce((sum, entries) => sum + entries.length, 0);
assert(partitioned === manifest.entries.length, `Editorial audit must classify every gateway entry exactly once (${partitioned}/${manifest.entries.length}).`);
assert(classified.contentReadyStaged.every((entry) => entry.editorialStatus === "needs-expansion" && nonEditorialBlockers(entry).length === 0), "Content-ready staged cohort must have no non-editorial readiness blockers.");
assert(classified.needsRemediation.every((entry) => entry.editorialStatus === "needs-expansion" && nonEditorialBlockers(entry).length > 0), "Remediation cohort must have objective non-editorial readiness blockers.");
assert(classified.productionReady.every((entry) => entry.editorialStatus === "index-ready" && entry.readinessResult === "pass" && entry.blockers.length === 0), "Production-ready classification must preserve the existing readiness gate.");
assert(classified.unexpected.length === 0, `Unexpected editorial/readiness states: ${classified.unexpected.map((entry) => `${entry.slug}:${entry.editorialStatus}/${entry.readinessResult}`).join(", ")}`);

console.log(`Gateway editorial audit semantics validated: ${classified.contentReadyStaged.length} content-ready staged, ${classified.needsRemediation.length} need remediation, ${classified.intentionallyStaged.length} intentionally staged, ${classified.productionReady.length} production-ready.`);
