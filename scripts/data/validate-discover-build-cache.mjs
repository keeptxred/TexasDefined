import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const workflow = readFileSync(".github/workflows/deploy-production.yml", "utf8");
const materializer = readFileSync("scripts/assets/materialize-discover-overrides.mjs", "utf8");

assert.match(workflow, /- name: Fingerprint governed Discover source registry/);
const fingerprintCommand = "node scripts/assets/materialize-discover-overrides.mjs --fingerprint";
assert.equal(workflow.split(fingerprintCommand).length - 1, 2,
  "both cache-restore and archive namespaces must fingerprint source URLs and output transform, not script implementation");
assert.match(materializer, /DERIVATIVE_TRANSFORM_CONTRACT = "webp-1600x900-center-crop-quality82-strip-v1"/);
assert.match(materializer, /JSON\.stringify\(\{ transform: DERIVATIVE_TRANSFORM_CONTRACT, entries \}\)/);
assert.match(materializer, /process\.argv\.includes\("--fingerprint"\)/);
const fpResult = spawnSync("node", ["scripts/assets/materialize-discover-overrides.mjs", "--fingerprint"], {encoding:"utf8"});
assert.equal(fpResult.status, 0, "registry fingerprint must be printable with no materialization or network calls");
assert.match(fpResult.stdout.trim(), /^[a-f0-9]{64}$/, "source/transform fingerprint must be SHA-256");
assert.match(workflow, /artifact_prefix="governed-discover-derivatives-\$\{source_fingerprint\}-"/);
assert.match(workflow, /select\(\.expired == false and \(\.name \| startswith\(\$prefix\)\)\)/);
assert.match(workflow, /- name: Preserve verified governed Discover derivatives for the next build/);
assert.match(workflow, /- name: Capture governed Discover derivatives after failed build/);
const explicitPrebuild = workflow.indexOf("npm run prebuild");
const discoverMaterialize = workflow.indexOf("\n          node scripts/assets/materialize-discover-overrides.mjs\n", explicitPrebuild);
const normalBuild = workflow.indexOf("npm run build", explicitPrebuild + 1);
assert.ok(explicitPrebuild > 0, "production deploy must explicitly generate prebuild-owned local image sources before Discover materialization");
assert.ok(discoverMaterialize > explicitPrebuild, "Discover materialization must run after explicit prebuild source generation");
assert.ok(normalBuild > discoverMaterialize, "normal npm build must remain after Discover materialization");

const fingerprintedArtifact = "governed-discover-derivatives-${{ steps.discover_fingerprint.outputs.sha }}-${{ github.run_id }}-${{ github.run_attempt }}";
assert.equal(workflow.split(fingerprintedArtifact).length - 1, 2, "successful and failed builds must use the same provenance-scoped artifact namespace");
assert.match(workflow, /- name: Preserve verified governed Discover derivatives for the next build[\s\S]*?if: \$\{\{ success\(\) && steps\.build\.outcome == 'success' \}\}/);
assert.match(workflow, /- name: Capture governed Discover derivatives after failed build[\s\S]*?steps\.build\.outcome == 'failure'/);
assert.match(materializer, /if \(!localSource \|\| !fsSync\.existsSync\(localSource\)\)/);
assert.match(materializer, /verifyDerivative\(slug, output\)/);
const deferredSourceGuard = materializer.indexOf("if (!localSource || !fsSync.existsSync(localSource))");
assert.ok(deferredSourceGuard > 0, "deferred local sources need an explicit guard");
assert.ok(materializer.indexOf("verifyDerivative(slug, output);", deferredSourceGuard) > deferredSourceGuard,
  "existing derivative must be dimension-verified before the build may reuse it");
assert.match(materializer, /if \(identify\.status !== 0 \|\| identify\.stdout\.trim\(\) !== "1600x900"\)/);
assert.match(materializer, /header\.toString\("ascii", 0, 4\) !== "RIFF"/);
assert.match(materializer, /header\.toString\("ascii", 8, 12\) !== "WEBP"/);
assert.match(materializer, /if \(!type\.toLowerCase\(\)\.startsWith\("image\/"\)\)/);
assert.match(workflow, /- name: Verify current direct Worker before deploy/);
assert.match(workflow, /- name: Verify current canonical domain before deploy/);

const health = readFileSync("scripts/ci/verify-production-health.mjs", "utf8");
const liveImages = readFileSync("scripts/ci/discover-production-asset-check.mjs", "utf8");
assert.match(health, /PRODUCTION_HEALTH_DISCOVER_ASSETS === 'true'/);
assert.match(health, /verifyGovernedDiscoverDelivery\(\{ origin \}\)/);
assert.match(health, /process\.exit\(1\)/);
assert.match(workflow, /PRODUCTION_HEALTH_LABEL: direct-worker\n\s+PRODUCTION_HEALTH_DISCOVER_ASSETS: \$\{\{ steps\.change_scope\.outputs\.images \}\}/);
assert.match(workflow, /PRODUCTION_HEALTH_LABEL: canonical-domain\n\s+PRODUCTION_HEALTH_DISCOVER_ASSETS: \$\{\{ steps\.change_scope\.outputs\.images \}\}/);
assert.match(liveImages, /public HTTP 404|HTTP /); // Verifies HTTP status is checked, not solely source-file presence
assert.match(liveImages, /webpBytes\(bytes\)/);

// The weekly audit must reuse only a successful production derivative artifact
// with the identical slug/source/transform fingerprint, then run the original
// strict materializer. A cache hit is not a substitute for byte validation.
const weeklyAudit = readFileSync(".github/workflows/audit-site-quality-local.yml", "utf8");
const weeklyCaller = readFileSync(".github/workflows/audit-whole-site-production.yml", "utf8");
assert.ok(weeklyCaller.includes("if (!fs.existsSync(file))"),
  "a failed audit may not replace the permanent authority ledger with zero-page placeholders");
assert.ok(weeklyCaller.includes("preserving the last valid authority ledger unchanged"),
  "missing artifact reporting must explicitly distinguish absent evidence from an empty crawl");
for (const source of [weeklyAudit, weeklyCaller]) {
  assert.ok(source.includes("actions: read"), "weekly audit caller and reusable workflow need least-privilege artifact-read access");
}
assert.ok(weeklyAudit.includes("steps.discover_fingerprint.outputs.sha"), "weekly audit cache key must use governed registry fingerprint");
assert.ok(weeklyAudit.includes("key: local-audit-discover-${{ runner.os }}-${{ steps.discover_fingerprint.outputs.sha }}"),
  "weekly audit must invalidate cached derivatives on any governed source or transformation change");
assert.ok(weeklyAudit.includes("steps.discover_cache.outputs.cache-hit != 'true'"), "artifact recovery must run only after a cache miss");
assert.ok(weeklyAudit.includes('prefix="governed-discover-derivatives-${SOURCE_FINGERPRINT}-"'),
  "weekly audit must use production's exact source fingerprint artifact namespace");
assert.ok(weeklyAudit.includes("select(.conclusion == \"success\")"),
  "weekly audit may restore artifacts from successful production deployments only");
assert.ok(weeklyAudit.includes("select(.expired == false)"), "expired production image artifacts may not be reused");
assert.ok(weeklyAudit.includes('gh run download "$run_id"'),
  "weekly audit must download exact matching production derivative files, not request all live URLs");
assert.ok(weeklyAudit.includes("node scripts/assets/materialize-discover-overrides.mjs\n          npm run build"),
  "strict image materialization/verification must always run before local Worker build");
assert.ok(!weeklyAudit.includes("restore-keys:"), "a cross-fingerprint cache fallback is prohibited");


// Cache repair belongs only to an actually successful production release.
// Cancelled pushes may be replaced while the next Worker static-asset manifest
// is still being uploaded; their workflow_run completed event is not a release.
const cacheWorkflow = readFileSync(".github/workflows/purge-authority-cache-after-deploy.yml", "utf8");
assert.ok(cacheWorkflow.includes("github.event.workflow_run.conclusion == 'success'"),
  "the cache purge must ignore cancelled and failed production deployments");
assert.ok(cacheWorkflow.includes("github.event.workflow_run.head_branch == 'main'"),
  "the cache purge must remain restricted to protected main releases");
assert.ok(cacheWorkflow.includes("github.event_name == 'workflow_dispatch'"),
  "authorized manual cache repair must remain available");
assert.ok(cacheWorkflow.includes("PURGE_OUTCOME") && cacheWorkflow.includes("!= 'success'"),
  "cache purge verification must still fail closed for successful production releases");

const purgeScript = readFileSync("scripts/ci/purge-cloudflare-cache.mjs", "utf8");
for (const route of [
  "texas-high-school-football-districts/6a-district-21",
  "fort-bend-austin", "fort-bend-bush", "fort-bend-clements",
  "fort-bend-elkins", "fort-bend-hightower", "fort-bend-ridge-point",
  "fort-bend-travis", "houston-strake-jesuit",
]) {
  assert.ok(purgeScript.includes(route), `District 21 HTML invalidation is missing: ${route}`);
}
assert.ok(purgeScript.includes("Discover image failed live post-purge binary verification"),
  "the required WebP response checks must not be bypassed by HTML cache repair");

console.log("Discover artifact cache provenance, fresh local assets, change-scoped full live WebP delivery, image validation and strict deployment gates verified.");
