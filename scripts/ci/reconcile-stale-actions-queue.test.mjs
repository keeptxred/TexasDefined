import test from "node:test";
import assert from "node:assert/strict";
import { classifyQueuedRun, classifyOrphanedInProgressRun, shouldCancel, MIN_STALE_MS, SCHEDULE_EXPIRY_MS, ORPHANED_IN_PROGRESS_MS } from "./reconcile-stale-actions-queue.mjs";

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
