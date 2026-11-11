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
  const prCache = new Map();
  const report = {
    runId: context.selfId, checkedAt: new Date(context.now).toISOString(),
    dryRun, mainSha, successfulDeployment: { id: deployed.id, sha: deployed.head_sha,
      completed: deployed.updated_at }, originalQueued: queue.length,
    cancelled: [], selectedDryRun: [], protected: [], errors: [],
  };

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
      await api("/actions/runs/" + run.id + "/cancel", { method: "POST" });
      report.cancelled.push({ id: run.id, reason, name: run.name });
      console.log("Cancellation requested for verified jobless superseded run " + run.id + ": " + reason);
    } catch (err) {
      report.errors.push({ id: run.id, stage: "cancel", error: String(err) });
      console.error("Failed to cancel obsolete run " + run.id + ": " + String(err));
    }
  }

  await mkdir("artifacts/actions-queue-recovery", { recursive: true });
  await writeFile(OUT, JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify({
    total: queue.length, cancellationRequests: report.cancelled.length,
    dryRunSelections: report.selectedDryRun.length, protected: report.protected.length,
    errors: report.errors.length, report: OUT,
  }));
  if (report.errors.length) process.exitCode = 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error); process.exitCode = 1; });
}
