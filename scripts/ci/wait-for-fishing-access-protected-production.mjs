/**
 * Wait for a protected deploy that includes this fishing-access change.
 * A prior deploy can be superseded before release. We only accept SUCCESS
 * on current main after proving ancestry from the exact source commit.
 * Real Chrome checks the ordinary public URL after this gate.
 */
import { compareIncludesSource, protectedProductionState } from "./fishing-access-deployment-source.mjs";

const sha = process.env.PRODUCTION_COMMIT_SHA || process.env.GITHUB_SHA;
const repository = process.env.GITHUB_REPOSITORY;
const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
if (!/^[a-f0-9]{40}$/i.test(sha || "") || !/^[^/]+\/[^/]+$/.test(repository || "") || !token) {
  console.error("Missing source SHA, repository or authenticated Actions token.");
  process.exit(2);
}
const origin = "https://api.github.com/repos/" + repository;
const headers = {
  Authorization: "Bearer " + token,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};
async function github(path) {
  const response = await fetch(origin + path, { headers, signal: AbortSignal.timeout(25000) });
  if (!response.ok) throw new Error("GitHub " + path + " HTTP " + response.status + ": " + (await response.text()).slice(0, 300));
  return response.json();
}
let last = "missing";
let previousMain = "";
let ancestry = false;
// A busy main can advance through protected merges while its latest deployment
// is still queued. An already-successful protected ancestor that includes the
// source is eligible for the downstream *release-pinned* Chrome checks. Those
// checks must still prove the live Worker/source identity and fail closed.
async function findSuccessfulProtectedAncestor(main, source) {
  const commits = await github("/commits?sha=" + main + "&per_page=100");
  for (const commit of commits) {
    const candidate = commit.sha;
    if (candidate === source || compareIncludesSource(await github("/compare/" + source + "..." + candidate))) {
      const state = protectedProductionState(await github("/commits/" + candidate + "/status"));
      if (state === "success") return candidate;
    } else {
      // First commit older than the source: no older ancestor can include it.
      break;
    }
  }
  return null;
}
const maxAttempts = 144; // 24 minutes of bounded serial deployment queue time.
for (let attempt = 1; attempt <= maxAttempts; attempt++) {
  const main = (await github("/branches/main")).commit?.sha;
  if (!/^[a-f0-9]{40}$/i.test(main || "")) throw new Error("Could not resolve protected main SHA");
  if (main !== previousMain) {
    ancestry = main === sha || compareIncludesSource(await github("/compare/" + sha + "..." + main));
    if (!ancestry) {
      console.error("Main " + main + " is not a descendant of fishing source " + sha + "; refusing verification.");
      process.exit(1);
    }
    previousMain = main;
  }
  const state = protectedProductionState(await github("/commits/" + main + "/status"));
  last = main + ":" + state;
  console.log("Fishing access protected production " + attempt + "/" + maxAttempts + ": source=" + sha + " main=" + last);
  if (state === "success") {
    const confirmedMain = (await github("/branches/main")).commit?.sha;
    if (confirmedMain === main) {
      console.log("Protected production descendant accepted: source=" + sha + ", deployed=" + main);
      process.exit(0);
    }
    console.log("Main changed during acceptance; re-evaluating latest main.");
  } else if (state === "pending" || state === "missing") {
    // Do not strand a source-specific browser gate behind unrelated newer
    // merges. Require an actual successful protected descendant, never a
    // pending/failed status; downstream Chrome independently pins live release.
    const deployed = await findSuccessfulProtectedAncestor(main, sha);
    if (deployed) {
      const confirmedMain = (await github("/branches/main")).commit?.sha;
      if (confirmedMain === main) {
        console.log("Protected successful deployed ancestor accepted for release-pinned Chrome: source=" + sha + ", protected=" + deployed + ", main=" + main);
        process.exit(0);
      }
    }
  } else if (state === "failure" || state === "error") {
    console.error("The current main " + main + " failed protected production; do not mask deployment failure.");
    process.exit(1);
  }
  if (attempt < maxAttempts) await new Promise(resolve => setTimeout(resolve, 10000));
}
console.error("No successful protected descendant deployment after " + maxAttempts + " attempts: " + last);
process.exit(1);
