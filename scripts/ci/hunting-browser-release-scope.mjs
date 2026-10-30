import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

// Use the already verified-deployment baseline, not HEAD^, because bot
// auto-merges and concurrent main pushes may be grouped into one deployment.
export function shouldRunHuntingBrowser(plan) {
  if (!plan || !Array.isArray(plan.changedFiles) || !Array.isArray(plan.selectedPaths)) {
    throw new Error("Missing or malformed verified-baseline production change plan");
  }
  if (plan.selectedPaths.length > 40) throw new Error("Oversized production change plan");
  return plan.selectedPaths.includes("/hunting/turkey-hunting")
    || plan.changedFiles.some(path => [
      "scripts/ci/verify-turkey-hunting-browser.mjs",
      "scripts/ci/verify-hunting-hub-responsive-browser.mjs",
    ].includes(path));
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  const plan = JSON.parse(readFileSync(".artifacts/production-change-plan.json", "utf8"));
  if (shouldRunHuntingBrowser(plan)) {
    console.log("Run bounded hunting Chrome: turkey page or its verifier changed since last verified production");
  } else {
    console.log("Skip bounded hunting Chrome: no hunting change since last verified production");
    process.exitCode = 10;
  }
}
