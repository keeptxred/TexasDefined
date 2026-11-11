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
const maxAttempts = 300; // Up to 50 minutes for the full protected production asset-continuity gate.
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
  } else if (state === "failure" || state === "error") {
    console.error("The current main " + main + " failed protected production; do not mask deployment failure.");
    process.exit(1);
  }
  if (attempt < maxAttempts) await new Promise(resolve => setTimeout(resolve, 10000));
}
console.error("No successful protected descendant deployment after " + maxAttempts + " attempts: " + last);
process.exit(1);
