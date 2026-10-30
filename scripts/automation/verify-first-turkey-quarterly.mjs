#!/usr/bin/env node
// GitHub-only verification of the first actual January 2027 quarterly turkey refresh.
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const scheduledSourceDate = "2027-01-02";
export const firstScheduledWorkflow = "Refresh TPWD Turkey Authority Quarterly";
export const protectedFinisherWorkflow = "Finish Verified Turkey Authority Quarterly Refresh";
export const productionWorkflow = "Deploy TexasDefined production";
export const approvedFactPath = "src/data/hunting/turkey-quarterly-facts.json";
export const browserCases = ["desktop-canonical", "desktop-cache-bypassed", "mobile-390", "small-mobile-320"];

function command(cmd, args) {
  return execFileSync(cmd, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 20 * 1024 * 1024 }).trim();
}
function ghJson(args) { return JSON.parse(command("gh", args)); }
function api(route) { return ghJson(["api", route]); }
function runList(workflow, extra = []) {
  return ghJson(["run", "list", "--repo", process.env.GITHUB_REPOSITORY || "keeptxred/TexasDefined",
    "--workflow", workflow, "--limit", "100", "--json",
    "databaseId,createdAt,status,conclusion,headBranch,headSha,event", ...extra]);
}

export function selectActualScheduledRun(runs) {
  const matches = runs.filter(r => r.event === "schedule" && r.createdAt?.startsWith(scheduledSourceDate) && r.headBranch === "main");
  assert.ok(matches.length, "January 2, 2027 source workflow has no confirmed scheduled main-branch run");
  matches.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const source = matches[0];
  assert.equal(source.status, "completed", "January scheduled TPWD source run has not completed");
  assert.equal(source.conclusion, "success", "January scheduled TPWD source verification failed");
  assert.ok(Number.isInteger(source.databaseId) && source.databaseId > 0, "Scheduled source run needs real GitHub ID");
  return source;
}

export function validateQuarterlyPR(pr, sourceRunId, changedPaths) {
  assert.equal(pr.head?.ref, "automation/turkey-quarterly-" + sourceRunId, "Source-run branch mismatch");
  assert.equal(pr.base?.ref, "main", "Quarterly bot PR must target main");
  assert.equal(pr.title, "Refresh verified TPWD turkey public draws and survey", "Unexpected PR title");
  assert.equal(pr.user?.login, "github-actions[bot]", "Only the verified GitHub Actions bot may publish");
  assert.deepEqual(changedPaths, [approvedFactPath], "Quarterly PR must change only governed turkey facts");
  assert.ok(pr.merged_at && pr.merge_commit_sha, "Protected quarterly PR must actually merge");
}

export function checkBrowserEvidence(evidence, evidenceDir) {
  assert.equal(evidence.route, "https://texasdefined.com/hunting/turkey-hunting", "Wrong production page");
  assert.ok(Array.isArray(evidence.results) && evidence.results.length === 4, "Four Chrome variants required");
  assert.deepEqual(evidence.results.map(row => row.viewport), browserCases, "Missing desktop/cache-bypass/mobile Chrome variant");
  for (const row of evidence.results) {
    assert.ok(!row.failure, "Browser error " + row.viewport + ": " + row.failure);
    assert.equal(row.canonical, evidence.route, "Incorrect canonical on " + row.viewport);
    assert.ok(row.imageCount >= 3, "Photo/maps not decoded on " + row.viewport);
    assert.ok(row.links >= 14, "Missing source/internal links on " + row.viewport);
    assert.ok(row.layoutOverflowPx <= 3, "Horizontal overflow on " + row.viewport);
    assert.deepEqual(row.errors, [], "Runtime JS errors on " + row.viewport);
    for (const schema of ["Article", "FAQPage", "BreadcrumbList"]) {
      assert.ok(row.schemas.includes(schema), "Missing " + schema + " on " + row.viewport);
    }
    const screenshot = path.join(evidenceDir, row.viewport + ".png");
    assert.ok(existsSync(screenshot) && statSync(screenshot).size > 2048, "Missing full-page Chrome screenshot " + screenshot);
    assert.deepEqual([...readFileSync(screenshot).subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], "Not a PNG " + screenshot);
  }
  assert.equal(evidence.results[0].title, evidence.results[1].title, "Canonical/cache bypass title mismatch");
}

export function hasAncestor(ancestor, descendant) {
  const outcome = spawnSync("git", ["merge-base", "--is-ancestor", ancestor, descendant], { encoding: "utf8" });
  if (![0, 1].includes(outcome.status)) throw new Error("Cannot validate git ancestry: " + outcome.stderr);
  return outcome.status === 0;
}

function main() {
  const repo = process.env.GITHUB_REPOSITORY || "keeptxred/TexasDefined";
  assert.equal(repo, "keeptxred/TexasDefined", "Audit is restricted to TexasDefined GitHub repository");
  const now = new Date().toISOString().slice(0, 10);
  if (process.env.GITHUB_EVENT_NAME === "schedule") assert.ok(now >= "2027-01-03" && now <= "2027-01-05",
    "Historical January 2027 workflow is a no-op outside its one-time window");
  const outDir = process.env.TURKEY_AUDIT_OUTPUT || "artifacts/turkey-first-quarterly-2027";
  mkdirSync(outDir, { recursive: true });
  const result = { auditedAt: new Date().toISOString(), plannedScheduleDate: scheduledSourceDate, repository: repo };
  try {
    const source = selectActualScheduledRun(runList(firstScheduledWorkflow, ["--event", "schedule"]));
    result.sourceRun = source.databaseId;
    result.sourceUrl = "https://github.com/" + repo + "/actions/runs/" + source.databaseId;
    result.sourceConclusion = source.conclusion;
    const branch = "automation/turkey-quarterly-" + source.databaseId;
    const prs = api("repos/" + repo + "/pulls?state=all&head=" + encodeURIComponent("keeptxred:" + branch) + "&per_page=30");
    assert.ok(Array.isArray(prs) && prs.length <= 1, "Ambiguous quarterly source-run PR");
    const facts = JSON.parse(readFileSync(approvedFactPath, "utf8"));
    assert.ok(facts.checkedAt >= scheduledSourceDate, "Official turkey facts remain stale after January source verification");
    result.checkedAt = facts.checkedAt;

    if (!prs.length) {
      result.outcome = "source-verified-no-pr-required";
    } else {
      const pr = prs[0];
      const fileEntries = api("repos/" + repo + "/pulls/" + pr.number + "/files?per_page=100");
      validateQuarterlyPR(pr, source.databaseId, fileEntries.map(f => f.filename).sort());
      result.prNumber = pr.number;
      result.mergeSha = pr.merge_commit_sha;
      result.mergedAt = pr.merged_at;
      assert.ok(hasAncestor(pr.merge_commit_sha, "HEAD"), "Protected quarterly merge not in current main history");
      const finisher = runList(protectedFinisherWorkflow);
      assert.ok(finisher.some(r => r.status === "completed" && r.conclusion === "success" &&
        r.createdAt >= source.createdAt), "No successful source-verified quarterly finisher after scheduled run");
      const releases = runList(productionWorkflow, ["--branch", "main"]);
      const accepted = releases.filter(r => r.status === "completed" && r.conclusion === "success" &&
        r.createdAt >= pr.merged_at && r.headSha && hasAncestor(pr.merge_commit_sha, r.headSha));
      assert.ok(accepted.length, "No successful production deployment of the merged quarterly fact change");
      accepted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      const production = accepted[0];
      result.productionRun = production.databaseId;
      const statuses = api("repos/" + repo + "/commits/" + production.headSha + "/status").statuses || [];
      for (const context of ["texasdefined-production", "texasdefined-live"]) {
        assert.ok(statuses.some(s => s.context === context && s.state === "success"), "Missing successful " + context + " status");
      }
      const artifacts = api("repos/" + repo + "/actions/runs/" + production.databaseId + "/artifacts?per_page=100").artifacts || [];
      const artifactName = "hunting-hub-visual-" + production.databaseId;
      const proof = artifacts.find(a => a.name === artifactName && !a.expired && a.size_in_bytes > 2048);
      assert.ok(proof, "Actual exact-page Chrome artifact missing: a skipped-success step is not proof");
      const proofDir = path.join(outDir, "chrome");
      mkdirSync(proofDir, { recursive: true });
      command("gh", ["run", "download", String(production.databaseId), "--repo", repo,
        "--name", artifactName, "--dir", proofDir]);
      const evidenceDir = path.join(proofDir, "turkey");
      const evidence = JSON.parse(readFileSync(path.join(evidenceDir, "evidence.json"), "utf8"));
      checkBrowserEvidence(evidence, evidenceDir);
      assert.ok(evidence.sourceDate >= scheduledSourceDate, "Production Chrome used pre-quarterly source facts");
      result.outcome = "source-pr-finisher-merge-production-and-four-chrome-variants-verified";
      result.artifactName = artifactName;
      result.browserResults = evidence.results.map(v => ({viewport:v.viewport, images:v.imageCount, links:v.links, overflow:v.layoutOverflowPx, errors:v.errors}));
    }
    result.ok = true;
    writeFileSync(path.join(outDir, "result.json"), JSON.stringify(result, null, 2));
    console.log(JSON.stringify(result, null, 2));
    if (process.env.GITHUB_STEP_SUMMARY) writeFileSync(process.env.GITHUB_STEP_SUMMARY,
      "## January 2027 TPWD turkey quarterly acceptance: PASS\n\n" +
      "- Source run: " + result.sourceUrl + "\n" +
      "- Outcome: " + result.outcome + "\n" +
      (result.prNumber ? "- Protected PR: #" + result.prNumber + "\n- Deployed run: " + result.productionRun + "\n" : "- Facts already current; no PR required.\n") +
      "- Evidence is in the turkey-first-quarterly-2027 GitHub Actions artifact.\n", {flag:"a"});
  } catch (err) {
    result.ok = false;
    result.error = String(err.stack || err);
    writeFileSync(path.join(outDir, "result.json"), JSON.stringify(result, null, 2));
    console.error(result.error);
    process.exitCode = 1;
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main();
