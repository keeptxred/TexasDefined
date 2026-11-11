/**
 * Clear genuinely obsolete GitHub Actions queue entries without erasing pending work.
 * In particular, do not cancel live PR gates or issue-comment certification runs.
 * A jobless queued run from a superseded production release is safe to cancel
 * only after a newer real production deployment has succeeded.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

export const MIN_STALE_MS = 45 * 60 * 1000;
export const SCHEDULE_EXPIRY_MS = 30 * 24 * 60 * 60 * 1000;

export const ORPHANED_IN_PROGRESS_MS = 7 * 24 * 60 * 60 * 1000;
export function classifyOrphanedInProgressRun(run, context) {
  if (!run || run.status !== "in_progress") return "not-in-progress";
  if (!Number.isSafeInteger(run.id) || run.id === context.selfId) return "invalid-or-self";
  const created = Date.parse(run.created_at || "");
  if (!Number.isFinite(created)) return "unknown-created-at";
  if (context.now - created < ORPHANED_IN_PROGRESS_MS) return "too-new";
  if (run.head_sha === context.mainSha) return "current-main";
  if (!context.deployedSha || !Number.isFinite(context.deployedAt)) return "no-verified-successful-deployment";
  if (created >= context.deployedAt) return "newer-than-verified-deployment";
  if (run.event === "workflow_run") return "cancel:abandoned-completed-job";
  return "non-workflow-run-protect";
}

const MAX_RUNS = 1000;
const OUT = "artifacts/actions-queue-recovery/report.json";

export function classifyQueuedRun(run, context, pr = null) {
  const { now, mainSha, deployedSha, deployedAt, selfId } = context;
  if (!run || run.status !== "queued") return "not-queued";
  if (!Number.isSafeInteger(run.id) || run.id === selfId) return "invalid-or-self";
  const created = Date.parse(run.created_at || "");
  if (!Number.isFinite(created)) return "unknown-created-at";
  const age = now - created;
  if (age < MIN_STALE_MS) return "too-new";
  if (run.head_sha === mainSha) return "current-main";
  if (!deployedSha || !Number.isFinite(deployedAt)) return "no-verified-successful-deployment";
  if (created >= deployedAt) return "newer-than-verified-deployment";
  if (run.event === "workflow_run" || run.event === "push") return "cancel:superseded-release";
  if (run.event === "pull_request") {
    if (!pr) return "pr-unresolved-protect";
    if (pr.state === "closed") return "cancel:closed-pr";
    if (pr.state === "open" && pr.head?.sha && pr.head.sha !== run.head_sha) return "cancel:superseded-pr-head";
    return "open-pr-protect";
  }
  if (run.event === "schedule" && age > SCHEDULE_EXPIRY_MS) return "cancel:expired-schedule";
  if (run.event === "issue_comment") return "issue-comment-work-must-be-recovered";
  return "unhandled-event-protect";
}

export function shouldCancel(reason, jobs) {
  return reason.startsWith("cancel:") && jobs?.total_count === 0 &&
    Array.isArray(jobs.jobs) && jobs.jobs.length === 0;
}

export function mayDeleteAfterBackend409(run, reason, jobs) {
  return shouldCancel(reason, jobs) &&
    ["workflow_run", "pull_request", "schedule"].includes(run.event) &&
    run.status === "queued";
}

function isPreQueueConflict(error) {
  return /HTTP 409/.test(String(error)) && /not been queued yet/i.test(String(error));
}

async function cancelOrRemoveProvablyDeadRun(api, run, reason, jobs) {
  const path = "/actions/runs/" + run.id;
  try {
    await api(path + "/cancel", { method: "POST" });
    return "cancel-requested";
  } catch (normalError) {
    if (!isPreQueueConflict(normalError)) throw normalError;
  }
  // Official documented fallback after normal cancellation fails.
  try {
    await api(path + "/force-cancel", { method: "POST" });
    return "force-cancel-requested";
  } catch (forceError) {
    if (!isPreQueueConflict(forceError)) throw forceError;
  }
  if (!mayDeleteAfterBackend409(run, reason, jobs))
    throw new Error("Backend pre-queue deadlock; deletion not authorized for run " + run.id);

  // Last-resort deletion is ONLY for a run with zero created jobs and
  // independent proof that its source is obsolete. No logs or output exist.
  await api(path, { method: "DELETE" });
  for (let retry = 0; retry < 3; retry++) {
    try { await api(path); }
    catch (error) {
      if (/HTTP 404/.test(String(error))) return "deletion-verified";
      throw error;
    }
    await new Promise(done => setTimeout(done, 800));
  }
  throw new Error("DELETE accepted but run " + run.id + " remains visible; inspect GitHub backend before retrying");
}

function apiFactory(repo, token) {
  return async (route, opts = {}) => {
    const method = opts.method || "GET";
    for (let attempt = 0; attempt < 3; attempt++) {
      let response;
      try {
        response = await fetch("https://api.github.com/repos/" + repo + route, {
          method,
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "TexasDefined-Stale-Actions-Reconciler",
          },
          signal: AbortSignal.timeout(20000),
        });
      } catch (err) {
        if (attempt === 2) throw err;
        await new Promise(done => setTimeout(done, 800 * (attempt + 1)));
        continue;
      }
      if (!response.ok) {
        if ([429, 500, 502, 503, 504].includes(response.status) && attempt < 2) {
          await new Promise(done => setTimeout(done, 800 * (attempt + 1)));
          continue;
        }
        throw new Error(method + " " + route + ": HTTP " + response.status +
          " " + (await response.text()).slice(0, 220));
      }
      if (response.status === 204 || response.status === 202) return { accepted: true };
      return response.json();
    }
    throw new Error("Exhausted API retries for " + route);
  };
}

async function listQueued(api) {
  const runs = [];
  for (let page = 1; page <= Math.ceil(MAX_RUNS / 100); page++) {
    const result = await api("/actions/runs?status=queued&per_page=100&page=" + page);
    if (!Array.isArray(result.workflow_runs) || !Number.isInteger(result.total_count))
      throw new Error("Queued workflow list is incomplete or malformed");
    if (result.total_count > MAX_RUNS)
      throw new Error("Queue exceeds bounded " + MAX_RUNS + " run audit; no cancellation attempted");
    runs.push(...result.workflow_runs);
    if (runs.length >= result.total_count || result.workflow_runs.length < 100) return runs;
  }
  throw new Error("Queue audit reached maximum page count; no cancellation attempted");
}

async function main() {
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY;
  const dryRun = process.argv.includes("--dry-run");
  if (!token || !/^[\w.-]+\/[\w.-]+$/.test(repo || ""))
    throw new Error("Missing scoped GITHUB_TOKEN or repository name");
  const api = apiFactory(repo, token);

  // Read-only scheduled monitoring must never depend on complete pagination,
  // runner state coherence, a recent deploy, or mutation permissions. GitHub
  // has returned inconsistent queued/in_progress counts and refused to cancel
  // its own pre-queue ghost records (409) or delete them (403).
  if (process.argv.includes("--inventory-only")) {
    const checks = [
      { label: "queued", route: "/actions/runs?status=queued&per_page=5" },
      { label: "inProgress", route: "/actions/runs?status=in_progress&per_page=5" },
      { label: "stuckMcAllen", route: "/actions/runs/43095110357" },
    ];
    const responses = await Promise.allSettled(checks.map(({ route }) => api(route)));
    const report = {
      checkedAt: new Date().toISOString(),
      mode: "read-only",
      explanation: "GitHub API rejects cancellation of jobless queued runs with 409 and deletion with 403",
      counts: {},
      samples: {},
      warnings: [],
    };
    for (let i = 0; i < checks.length; i++) {
      const label = checks[i].label;
      const result = responses[i];
      if (result.status !== "fulfilled") {
        report.warnings.push(label + ": " + String(result.reason));
        continue;
      }
      const payload = result.value;
      if (label === "stuckMcAllen") {
        report.stuckMcAllen = {
          id: payload.id,
          status: payload.status,
          conclusion: payload.conclusion,
          createdAt: payload.created_at,
          updatedAt: payload.updated_at,
        };
      } else {
        report.counts[label] = Number.isInteger(payload.total_count) ? payload.total_count : null;
        report.samples[label] = Array.isArray(payload.workflow_runs)
          ? payload.workflow_runs.map(run => ({
            id: run.id, status: run.status, event: run.event, createdAt: run.created_at,
          }))
          : [];
        if (!Number.isInteger(payload.total_count) || !Array.isArray(payload.workflow_runs))
          report.warnings.push(label + ": GitHub returned an incomplete listing");
      }
    }
    await mkdir("artifacts/actions-queue-recovery", { recursive: true });
    await writeFile(OUT, JSON.stringify(report, null, 2) + "\n");
    console.log("Read-only GitHub Actions queue census: " + JSON.stringify({
      counts: report.counts, stuckMcAllen: report.stuckMcAllen?.status ?? "unavailable",
      warnings: report.warnings.length, report: OUT,
    }));
    return;
  }

  const branch = await api("/branches/main");
  const mainSha = branch.commit?.sha;
  if (!/^[0-9a-f]{40}$/i.test(mainSha || "")) throw new Error("Cannot establish current main SHA");

  const deployments = await api("/actions/workflows/deploy-production.yml/runs?branch=main&per_page=30");
  const deployed = deployments.workflow_runs?.find(x =>
    x.name === "Deploy TexasDefined production" && x.status === "completed" &&
    x.conclusion === "success" && /^[0-9a-f]{40}$/i.test(x.head_sha || ""));
  if (!deployed) throw new Error("No independently successful canonical production deployment; refusing cleanup");
  const context = {
    now: Date.now(), mainSha, deployedSha: deployed.head_sha,
    deployedAt: Date.parse(deployed.updated_at),
    selfId: Number(process.env.GITHUB_RUN_ID) || -1,
  };
  if (!Number.isFinite(context.deployedAt)) throw new Error("Unparseable successful deploy timestamp");

  // Read the complete original queue before mutations. Pagination while
  // cancelling would skip entries as GitHub shifts its result pages.
  const queue = await listQueued(api);
  const active = await api("/actions/runs?status=in_progress&per_page=100");
  if (!Number.isInteger(active.total_count) || !Array.isArray(active.workflow_runs) ||
      active.total_count > 100 || active.total_count !== active.workflow_runs.length)
    throw new Error("Cannot establish complete bounded in-progress queue; no cancellation attempted");
  const prCache = new Map();
  const report = {
    runId: context.selfId, checkedAt: new Date(context.now).toISOString(),
    dryRun, mainSha, successfulDeployment: { id: deployed.id, sha: deployed.head_sha,
      completed: deployed.updated_at }, originalQueued: queue.length, orphanedInProgressScanned: active.workflow_runs.length,
    cancelled: [], deleted: [], selectedDryRun: [], protected: [], errors: [],
    platformBlocked: null,
  };

  // Probe the user's concrete stuck McAllen run first. If the backend rejects
  // BOTH cancellation and deletion, stop rather than repeat 125 identical 409s.
  queue.sort((a, b) => (a.id === 43095110357 ? -1 : b.id === 43095110357 ? 1 : 0));
  for (const run of queue) {
    let pr = null;
    if (run.event === "pull_request" && Array.isArray(run.pull_requests) &&
        run.pull_requests.length === 1 && Number.isInteger(run.pull_requests[0].number)) {
      const num = run.pull_requests[0].number;
      if (!prCache.has(num)) {
        try { prCache.set(num, await api("/pulls/" + num)); }
        catch (err) { prCache.set(num, null); report.errors.push({ id: run.id, stage: "pr", error: String(err) }); }
      }
      pr = prCache.get(num);
    }
    const reason = classifyQueuedRun(run, context, pr);
    if (!reason.startsWith("cancel:")) {
      report.protected.push({ id: run.id, reason, event: run.event });
      continue;
    }

    try {
      const jobs = await api("/actions/runs/" + run.id + "/jobs?per_page=1");
      if (!shouldCancel(reason, jobs)) {
        report.protected.push({ id: run.id, reason: "runner-job-present-or-unverifiable", event: run.event });
        continue;
      }
      const latest = await api("/actions/runs/" + run.id);
      if (latest.status !== "queued" || latest.head_sha !== run.head_sha) {
        report.protected.push({ id: run.id, reason: "state-changed-before-cancel", event: run.event });
        continue;
      }
      if (dryRun) {
        report.selectedDryRun.push({ id: run.id, reason, name: run.name });
        continue;
      }
      const outcome = await cancelOrRemoveProvablyDeadRun(api, run, reason, jobs);
      const entry = { id: run.id, reason, name: run.name, outcome };
      if (outcome === "deletion-verified") report.deleted.push(entry);
      else report.cancelled.push(entry);
      console.log("Resolved jobless superseded Actions run " + run.id + " via " + outcome);
    } catch (err) {
      report.errors.push({ id: run.id, stage: "cancel-force-delete", error: String(err) });
      report.platformBlocked = { id: run.id, reason, error: String(err) };
      console.error("GitHub backend refused normal cancellation, force-cancellation, or safe deletion for " + run.id + "; stopping further mutations: " + String(err));
      break;
    }
  }

  // The October 22 zombie is a workflow marked in progress despite every job
  // having finished successfully. Never cancel an actually running job.
  for (const run of report.platformBlocked ? [] : active.workflow_runs) {
    const reason = classifyOrphanedInProgressRun(run, context);
    if (!reason.startsWith("cancel:")) {
      report.protected.push({ id: run.id, reason, event: run.event });
      continue;
    }
    try {
      const jobs = await api("/actions/runs/" + run.id + "/jobs?per_page=100");
      const everyJobFinished = Number.isInteger(jobs.total_count) &&
        jobs.total_count > 0 && jobs.total_count === jobs.jobs?.length &&
        jobs.jobs.every(job => job.status === "completed");
      if (!everyJobFinished) {
        report.protected.push({ id: run.id, reason: "active-or-unverifiable-job", event: run.event });
        continue;
      }
      const latest = await api("/actions/runs/" + run.id);
      if (latest.status !== "in_progress" || latest.head_sha !== run.head_sha) {
        report.protected.push({ id: run.id, reason: "state-changed-before-cancel", event: run.event });
        continue;
      }
      if (dryRun) {
        report.selectedDryRun.push({ id: run.id, reason, name: run.name });
        continue;
      }
      await api("/actions/runs/" + run.id + "/cancel", { method: "POST" });
      report.cancelled.push({ id: run.id, reason, name: run.name });
      console.log("Cancellation requested for orphaned fully-finished old workflow " + run.id);
    } catch (err) {
      report.errors.push({ id: run.id, stage: "cancel-finished-orphan", error: String(err) });
    }
  }

  await mkdir("artifacts/actions-queue-recovery", { recursive: true });
  await writeFile(OUT, JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify({
    total: queue.length, orphanedInProgressScanned: active.workflow_runs.length, cancellationRequests: report.cancelled.length,
    verifiedDeleted: report.deleted.length,
    dryRunSelections: report.selectedDryRun.length, protected: report.protected.length,
    errors: report.errors.length, report: OUT,
  }));
  if (report.errors.length) process.exitCode = 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error); process.exitCode = 1; });
}
