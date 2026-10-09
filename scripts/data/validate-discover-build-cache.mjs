import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const workflow = readFileSync(".github/workflows/deploy-production.yml", "utf8");
const materializer = readFileSync("scripts/assets/materialize-discover-overrides.mjs", "utf8");

assert.match(workflow, /- name: Fingerprint governed Discover source registry/);
assert.match(workflow, /sha256sum scripts\/assets\/materialize-discover-overrides\.mjs/);
assert.match(workflow, /artifact_prefix="governed-discover-derivatives-\$\{source_fingerprint\}-"/);
assert.match(workflow, /select\(\.expired == false and \(\.name \| startswith\(\$prefix\)\)\)/);
assert.match(workflow, /- name: Preserve verified governed Discover derivatives for the next build/);
assert.match(workflow, /- name: Capture governed Discover derivatives after failed build/);

const fingerprintedArtifact = "governed-discover-derivatives-${{ steps.discover_fingerprint.outputs.sha }}-${{ github.run_id }}-${{ github.run_attempt }}";
assert.equal(workflow.split(fingerprintedArtifact).length - 1, 2, "successful and failed builds must use the same provenance-scoped artifact namespace");
assert.match(workflow, /- name: Preserve verified governed Discover derivatives for the next build[\s\S]*?if: \$\{\{ success\(\) && steps\.build\.outcome == 'success' \}\}/);
assert.match(workflow, /- name: Capture governed Discover derivatives after failed build[\s\S]*?steps\.build\.outcome == 'failure'/);
assert.match(materializer, /if \(!source\.startsWith\("\/"\) && fsSync\.existsSync\(output\)\) continue;/);
assert.match(materializer, /if \(identify\.status !== 0 \|\| identify\.stdout\.trim\(\) !== "1600x900"\)/);
assert.match(materializer, /if \(!type\.toLowerCase\(\)\.startsWith\("image\/"\)\)/);
assert.match(workflow, /- name: Verify current direct Worker before deploy/);
assert.match(workflow, /- name: Verify current canonical domain before deploy/);

console.log("Discover artifact cache provenance, fresh local assets, image validation and strict deployment gates verified.");
