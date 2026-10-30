import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = file => readFileSync(file, "utf8");
const refresher = read(".github/workflows/refresh-turkey-authority-quarterly.yml");
const finisher = read(".github/workflows/finish-turkey-authority-quarterly.yml");
const scheduled = read(".github/workflows/monitor-hunting-live-freshness.yml");
const deploy = read(".github/workflows/deploy-production.yml");

test("scheduled quarterly turkey refresh is eligible for exactly the protected source event allowlist", () => {
  const eventGate = finisher.match(/\[\[\s+"\$source_event"\s+=~\s+\^\(([^)]+)\)\$\s+\]\]/);
  assert.ok(eventGate, "must extract the executable Bash source_event gate, not just a comment");
  const allowlist = new RegExp("^(" + eventGate[1] + ")$");
  for (const expected of ["push", "schedule", "workflow_dispatch"]) {
    assert.equal(allowlist.test(expected), true, "source event must be allowed: " + expected);
  }
  for (const rejected of ["pull_request", "workflow_run", "delete", "repository_dispatch", "schedule_untrusted", ""]) {
    assert.equal(allowlist.test(rejected), false, "untrusted event must not auto-merge: " + rejected);
  }
  assert.match(refresher, /cron:\s*['"]17 15 2 1,4,7,10 \*['"]/, "quarterly schedule must be configured");
  assert.match(refresher, /branches:\s*\[main\]/, "main-only publishing source");
  assert.ok(finisher.includes("source=\"$(gh run view"), "source event must come from actual GitHub run");
  assert.ok(finisher.includes("headBranch' <<< \"$source\")\" == 'main'"), "source run must be on protected main");
  assert.ok(finisher.includes("'Refresh TPWD Turkey Authority Quarterly'"), "source workflow identity pinned");
  assert.ok(finisher.includes("check-turkey-regulations.mjs"), "recheck official TPWD legal rules before merge");
  assert.ok(finisher.includes("refresh-turkey-authority-quarterly.mjs --check-only"), "recheck facts before merge");
  assert.ok(finisher.includes("changed\" == 'src/data/hunting/turkey-quarterly-facts.json'"), "only approved fact file may merge");
  assert.ok(finisher.includes("--match-head-commit"), "merge pinned to validated SHA");
});

test("exact turkey Chrome audit must run on relevant production deployments and scheduled freshness checks", () => {
  assert.ok(deploy.includes('node scripts/ci/verify-turkey-hunting-browser.mjs'), "protected deployment must run browser audit");
  assert.ok(deploy.includes("verify-turkey-hunting-browser\\.mjs"), "changing the audit must trigger the deployment gate");
  assert.ok(scheduled.includes("cron: '13 15 * * 2,5'"), "bounded twice-weekly check remains scheduled");
  assert.ok(scheduled.includes("id: turkey_browser"), "separate observed browser outcome");
  assert.ok(scheduled.includes("steps.turkey_browser.outcome == 'failure'"), "browser failure raises GitHub issue and fails closed");
  assert.ok(scheduled.includes("node scripts/ci/verify-turkey-hunting-browser.mjs"), "browser script executed automatically");
  assert.ok(scheduled.includes("artifacts/hunting-hub-responsive/turkey/"), "screenshot evidence retained");
});
