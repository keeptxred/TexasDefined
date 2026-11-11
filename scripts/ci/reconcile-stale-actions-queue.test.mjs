import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";
import { classifyQueuedRun, classifyOrphanedInProgressRun, shouldCancel, mayDeleteAfterBackend409, MIN_STALE_MS, SCHEDULE_EXPIRY_MS, ORPHANED_IN_PROGRESS_MS } from "./reconcile-stale-actions-queue.mjs";

const now = Date.UTC(2026, 10, 11, 22);
const current = "a".repeat(40);
const older = "b".repeat(40);
const deployed = "c".repeat(40);
const ctx = { now, mainSha: current, deployedSha: deployed,
  deployedAt: now - 10 * 60 * 1000, selfId: 55 };
const run = (event, age, extras = {}) => ({
  id: 10, event, status: "queued", head_sha: older,
  created_at: new Date(now - age).toISOString(), ...extras,
});

test("the old jobless McAllen workflow_run may be cancelled after newer verified deployment", () => {
  assert.equal(classifyQueuedRun(run("workflow_run", MIN_STALE_MS + 60000), ctx),
    "cancel:superseded-release");
});
test("never cancel active or current main jobs", () => {
  assert.equal(classifyQueuedRun(run("workflow_run", MIN_STALE_MS + 60000, { status: "in_progress" }), ctx), "not-queued");
  assert.equal(classifyQueuedRun(run("workflow_run", MIN_STALE_MS + 60000, { head_sha: current }), ctx), "current-main");
  assert.equal(classifyQueuedRun(run("workflow_run", 3000), ctx), "too-new");
  assert.equal(classifyQueuedRun(run("workflow_run", MIN_STALE_MS + 60000, { id: 55 }), ctx), "invalid-or-self");
});
test("no cleanup of runs created after last successful deploy", () => {
  assert.equal(classifyQueuedRun(run("workflow_run", MIN_STALE_MS + 60000), { ...ctx, deployedAt: now - 2 * 60 * 60 * 1000 }), "newer-than-verified-deployment");
});
test("open PR protected head must keep its required merge checks", () => {
  const old = run("pull_request", MIN_STALE_MS + 60000);
  assert.equal(classifyQueuedRun(old, ctx, { state: "open", head: { sha: older } }), "open-pr-protect");
  assert.equal(classifyQueuedRun(old, ctx, null), "pr-unresolved-protect");
});
test("closed or superseded PR checks may be removed only if jobless", () => {
  const old = run("pull_request", MIN_STALE_MS + 60000);
  assert.equal(classifyQueuedRun(old, ctx, { state: "closed", head: { sha: older } }), "cancel:closed-pr");
  assert.equal(classifyQueuedRun(old, ctx, { state: "open", head: { sha: current } }), "cancel:superseded-pr-head");
  assert.equal(shouldCancel("cancel:closed-pr", { total_count: 0, jobs: [] }), true);
  assert.equal(shouldCancel("cancel:closed-pr", { total_count: 1, jobs: [{ status: "queued" }] }), false);
  assert.equal(shouldCancel("cancel:closed-pr", {}), false);
});
test("issue-comment verification and recent schedules remain pending, not discarded", () => {
  assert.equal(classifyQueuedRun(run("issue_comment", MIN_STALE_MS + 60000), ctx), "issue-comment-work-must-be-recovered");
  assert.equal(classifyQueuedRun(run("schedule", MIN_STALE_MS + 60000), ctx), "unhandled-event-protect");
  assert.equal(classifyQueuedRun(run("schedule", SCHEDULE_EXPIRY_MS + 60000), ctx), "cancel:expired-schedule");
});
test("unconfirmed deployment or malformed timing protects all runs", () => {
  assert.equal(classifyQueuedRun(run("workflow_run", MIN_STALE_MS + 60000), { ...ctx, deployedSha: null }), "no-verified-successful-deployment");
  assert.equal(classifyQueuedRun(run("push", MIN_STALE_MS + 60000, { created_at: "unknown" }), ctx), "unknown-created-at");
});

test("only orphaned in-progress run with all job steps finished qualifies for separate cleanup", () => {
  const orphan = run("workflow_run", ORPHANED_IN_PROGRESS_MS + 60000, { status: "in_progress" });
  assert.equal(classifyOrphanedInProgressRun(orphan, ctx), "cancel:abandoned-completed-job");
  assert.equal(classifyOrphanedInProgressRun(
    run("workflow_run", MIN_STALE_MS + 60000, { status: "in_progress" }), ctx), "too-new");
  assert.equal(classifyOrphanedInProgressRun({ ...orphan, head_sha: current }, ctx), "current-main");
  assert.equal(classifyOrphanedInProgressRun({ ...orphan, event: "push" }, ctx), "non-workflow-run-protect");
  assert.equal(classifyOrphanedInProgressRun({ ...orphan, status: "completed" }, ctx), "not-in-progress");
});

test("permanent deletion is permitted only for proved jobless superseded queue records", () => {
  const orphan = run("workflow_run", MIN_STALE_MS + 60000);
  const noJobs = { total_count: 0, jobs: [] };
  assert.equal(mayDeleteAfterBackend409(orphan, "cancel:superseded-release", noJobs), true);
  assert.equal(mayDeleteAfterBackend409(orphan, "open-pr-protect", noJobs), false);
  assert.equal(mayDeleteAfterBackend409({ ...orphan, event: "issue_comment" }, "cancel:superseded-release", noJobs), false);
  assert.equal(mayDeleteAfterBackend409({ ...orphan, status: "in_progress" }, "cancel:superseded-release", noJobs), false);
  assert.equal(mayDeleteAfterBackend409(orphan, "cancel:superseded-release", { total_count: 1, jobs: [{ status: "queued" }] }), false);
});

test("automatic queue inventory is read-only until GitHub repairs its pre-queue 409/403 state", () => {
  const workflow = readFileSync(new URL("../../.github/workflows/reconcile-stale-actions-queue.yml", import.meta.url), "utf8");
  assert.match(workflow, /default: true/);
  assert.match(workflow, /if \[\[ "\$GITHUB_EVENT_NAME" != "workflow_dispatch" \]\]; then/);
  assert.match(workflow, /reconcile-stale-actions-queue\.mjs --inventory-only/);
  assert.doesNotMatch(workflow, /restore-mcallen:/);
});

test("read-only census returns before GitHub's inconsistent pagination and mutation paths", () => {
  const source = readFileSync(new URL("./reconcile-stale-actions-queue.mjs", import.meta.url), "utf8");
  const branchProbe = source.indexOf('const branch = await api("/branches/main")');
  const fastPath = source.indexOf('if (process.argv.includes("--inventory-only"))');
  const fullQueue = source.indexOf("const queue = await listQueued(api)");
  assert.ok(fastPath > 0 && fastPath < branchProbe && branchProbe < fullQueue);
  const census = source.slice(fastPath, branchProbe);
  assert.match(census, /Promise\.allSettled/);
  assert.match(census, /per_page=5/);
  assert.match(census, /return;/);
  assert.doesNotMatch(census, /method:\s*["'](?:DELETE|POST)["']/);
  assert.doesNotMatch(census, /cancelOrRemoveProvablyDeadRun/);
});
