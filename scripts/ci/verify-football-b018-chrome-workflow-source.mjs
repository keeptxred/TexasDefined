import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const wf=readFileSync('.github/workflows/verify-football-b018-production.yml','utf8');
const script=readFileSync('scripts/ci/verify-football-b018-production.mjs','utf8');
const expected=[
  "name: Football Batch018 25-school live Chrome evidence (no graduation)",
  "branches: [main]", "github.event.workflow_run.conclusion == 'success'",
  "github.event.issue.number == 5794", "github.actor == 'keeptxred'",
  "/run-b018-chrome", "group: texasdefined-production",
  "cancel-in-progress: false", "pin-football-b010-production-release.mjs",
  "steps.release.outputs.sha", "steps.release.outputs.worker",
  "FOOTBALL_CHROME_SOURCE_SHA", "FOOTBALL_EXPECTED_WORKER_VERSION",
  "playwright-core@1.56.1", "/tmp/td-b018-chrome",
  "verify-football-b018-production.mjs", "artifacts/b018-chrome-report.json",
  "artifacts/b018-chrome-screenshots/*.png", "if-no-files-found: error",
  "statuses.every(status=>status==='IMPLEMENTED')",
];
for(const item of expected) assert.ok(wf.includes(item), 'Batch018 Chrome workflow missing fail-closed contract: '+item);
assert.ok(wf.includes('"fort-bend-kempner"') && wf.includes('"fabens"'));
assert.ok(script.includes('assert.equal(report.schoolChecks.length,75'));
assert.ok(script.includes('assert.equal(report.countyChecks.length,25'));
assert.ok(script.includes("assert.equal(report.screenshots.length,75"));
assert.ok(wf.includes('Batch018 not fully IMPLEMENTED; no Chrome evidence produced'), 'Partial cohorts must skip without claiming acceptance');
assert.ok(!wf.includes('continue-on-error: true'));
console.log('PASS Batch018 protected signed-source Chrome workflow contract; no production execution or graduation claimed');
