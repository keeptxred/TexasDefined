import assert from "node:assert/strict";
import { readFile, appendFile } from "node:fs/promises";

const registry = JSON.parse(await readFile("ops/editorial/texas-culture-outdoors-review-groups.json", "utf8"));
const argv = new Set(process.argv.slice(2));
const scopeFlag = process.argv.find(value => value.startsWith("--scope="));
const scope = scopeFlag?.slice(8) || "all";
const today = new Date().toISOString().slice(0, 10);
const problems = [];
const rows = [];

assert.equal(registry.schemaVersion, 1);
assert.equal(registry.groups.length, 5);
assert.equal(new Set(registry.groups.map(group => group.path)).size, 5);
assert.deepEqual(registry.groups.map(group => group.path), [
  "/texas-tall-tales-folklore",
  "/texas-dance-halls-honky-tonks",
  "/texas-homecoming-mums",
  "/texas-natural-wonders-bucket-list",
  "/texas-rock-climbing-bouldering-guide",
]);

const selected = registry.groups.filter(group => scope === "all" || group.cadence === scope);
assert.ok(selected.length, "Invalid or empty scope " + scope);
for (const group of registry.groups) {
  assert.ok(["monthly", "quarterly"].includes(group.cadence));
  assert.ok(group.reviewedAt <= today, "Future review date " + group.path);
  assert.ok(group.maxReviewAgeDays >= 25 && group.maxReviewAgeDays <= 120);
  assert.ok(group.sourceFiles.length && group.primarySources.length);
  const contents = (await Promise.all(group.sourceFiles.map(file => readFile(file, "utf8")))).join("\n");
  for (const marker of group.requiredMarkers) {
    assert.ok(contents.includes(marker), group.path + " missing editorial/safety fact: " + marker);
  }
  for (const url of group.primarySources) {
    assert.ok(url.startsWith("https://"), group.path + " official source requires HTTPS");
    assert.ok(contents.includes(url), group.path + " primary source not linked: " + url);
  }
  const ageDays = Math.floor((Date.parse(today + "T00:00:00Z") - Date.parse(group.reviewedAt + "T00:00:00Z")) / 86400000);
  rows.push({ path: group.path, cadence: group.cadence, lastFactReview: group.reviewedAt, ageDays, maxAgeDays: group.maxReviewAgeDays });
  if (argv.has("--watch") && selected.includes(group) && ageDays > group.maxReviewAgeDays) {
    problems.push(group.path + ": factual source review is overdue by " + (ageDays - group.maxReviewAgeDays) + " days. Review primary facts, then commit a new verified review date; HTTP 200 does not count.");
  }
}
console.log("FIVE_GUIDE_STATIC_PASS " + JSON.stringify(rows));
if (argv.has("--watch")) {
  async function probe(url, description, marker) {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        headers: { "User-Agent": "TexasDefined-Five-Guides-Source-Monitor/1.0" },
        signal: AbortSignal.timeout(14000),
      });
      if (!response.ok) {
        problems.push(description + ": official/live response HTTP " + response.status + " at " + url);
        return;
      }
      if (marker) {
        const html = await response.text();
        if (!html.toLowerCase().includes(marker.toLowerCase())) problems.push(description + ": expected public content not visible: " + marker + " at " + url);
      } else {
        await response.body?.cancel();
      }
    } catch (error) {
      problems.push(description + ": source not verified (" + String(error).slice(0, 130) + ") at " + url);
    }
  }
  // Bounded concurrency: no whole-site scan, no Cloudflare API calls, no content mutations.
  const checks = [];
  const publicProof = {
    "/texas-tall-tales-folklore": "Pecos Bill",
    "/texas-dance-halls-honky-tonks": "Gruene Hall",
    "/texas-homecoming-mums": "homecoming mum",
    "/texas-natural-wonders-bucket-list": "Big Bend",
    "/texas-rock-climbing-bouldering-guide": "Enchanted Rock",
  };
  for (const group of selected) {
    checks.push([ "https://texasdefined.com" + group.path, group.path, publicProof[group.path] ]);
    for (const url of group.primarySources) checks.push([url, group.path + " primary source", null]);
  }
  let next = 0;
  await Promise.all(Array.from({length: Math.min(3, checks.length)}, async () => {
    while (next < checks.length) {
      const [url, description, marker] = checks[next++];
      await probe(url, description, marker);
    }
  }));
  console.log("FIVE_GUIDE_WATCH " + checks.length + " bounded checks for " + scope);
}
const summary = [
  "## TexasDefined five-guide authority verification (" + scope + ")",
  "",
  "| Guide | Last factual review | Days | Maximum days |",
  "|---|---|---:|---:|",
  ...rows.filter(row => scope === "all" || row.cadence === scope)
    .map(row => "| " + row.path + " | " + row.lastFactReview + " | " + row.ageDays + " | " + row.maxAgeDays + " |"),
  "",
  problems.length ? "### Action required\n" + problems.map(problem => "- " + problem).join("\n") : "No selected source reachability/age alerts.",
  "",
  "HTTP success does **not** certify factual accuracy. Do not alter reviewedAt until a person or verified research workflow actually rechecks facts.",
  "",
].join("\n");
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
if (problems.length) {
  for (const problem of problems) console.error("FIVE_GUIDE_REVIEW_REQUIRED " + problem);
  process.exitCode = 1;
} else console.log("FIVE_GUIDE_AUTHORITY_CHECK_PASS");
