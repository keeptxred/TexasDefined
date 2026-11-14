import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const wf=readFileSync('.github/workflows/verify-football-b018-production.yml','utf8');
const script=readFileSync('scripts/ci/verify-football-b018-production.mjs','utf8');
const expected=[
  "name: Football Batch018 25-school live Chrome evidence (no graduation)",
  "branches: [main]", "github.event.workflow_run.conclusion == 'success'",
  "github.event.issue.number == 5794", "github.actor == 'keeptxred'",
  "/run-b018-chrome", "group: texasdefined-b018-production-acceptance",
  "cancel-in-progress: false", "pin-football-b010-production-release.mjs",
  "steps.release.outputs.sha", "steps.release.outputs.worker",
  "FOOTBALL_CHROME_SOURCE_SHA", "FOOTBALL_EXPECTED_WORKER_VERSION",
  "playwright-core@1.56.1", "/tmp/td-b018-chrome",
  "verify-football-b018-production.mjs", "artifacts/b018-chrome-report.json",
  "artifacts/b018-chrome-screenshots/*.png", "if-no-files-found: error",
  "statuses.every(status=>status==='IMPLEMENTED')",
  "github.event_name == 'schedule'", "cron: '20 8 * * *'",
];
for(const item of expected) assert.ok(wf.includes(item), 'Batch018 Chrome workflow missing fail-closed contract: '+item);
assert.ok(wf.includes('"fort-bend-kempner"') && wf.includes('"fabens"'));
assert.ok(script.includes('assert.equal(report.schoolChecks.length,75'));
assert.ok(script.includes('assert.equal(report.countyChecks.length,25'));
assert.ok(script.includes("assert.equal(report.screenshots.length,75"));
assert.ok(script.includes("assert.equal(closingWorker,worker"), "Closing public Worker identity must match original pin even if a deployment overlaps Chrome");
assert.ok(script.includes("report.closingProof"), "Closing Worker proof must be saved in evidence");
assert.ok(wf.includes('Batch018 not fully IMPLEMENTED; no Chrome evidence produced'), 'Partial cohorts must skip without claiming acceptance');
assert.ok(script.includes('googleIndexManifest'), 'Batch018 must follow the generated evidence-based Google eligibility manifest');
assert.ok(script.includes('report.googleDeliveryChecks.length,25'), 'All 25 browser pages need robot metadata proof');
assert.ok(script.includes('Google sitemap eligibility drift'), 'Google's primary sitemap must contain only 16 eligible schools');
assert.ok(script.includes('Bing supplemental eligibility drift'), 'Bing supplemental feed must contain exactly nine staged schools');
assert.ok(script.includes("'sitemap-index-policy'"), 'Sitemap mismatch must fail rather than silently graduate');
assert.ok(!wf.includes('continue-on-error: true'));
console.log('PASS Batch018 protected signed-source Chrome workflow contract; no production execution or graduation claimed');
