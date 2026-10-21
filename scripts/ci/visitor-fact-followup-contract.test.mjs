import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const workflow = fs.readFileSync(".github/workflows/destination-visitor-fact-freshness.yml", "utf8");

test("source research is weekly and PR checks remain strictly read only", () => {
  assert.match(workflow, /cron: '31 13 \* \* 1'/);
  assert.match(workflow, /pull_request:/);
  assert.match(workflow, /permissions:\n  contents: read/);
  const reviewer = workflow.split("  editorial-followup:")[1];
  assert.ok(reviewer, "research reviewer job must exist");
  assert.match(reviewer, /if: github\.event_name == 'schedule' \|\| github\.event_name == 'workflow_dispatch'/);
  assert.match(reviewer, /    permissions:\n      contents: read\n      issues: write/);
});

test("expired operator answers create one deduplicated issue, without changing verification dates", () => {
  const reviewer = workflow.split("  editorial-followup:")[1];
  assert.match(reviewer, /node scripts\/data\/validate-destination-visitor-fact-catalog\.mjs/);
  assert.match(reviewer, /2>&1 \| tee/, "stale facts are emitted on stderr and must be captured");
  assert.match(reviewer, /gh issue list --state all/);
  assert.match(reviewer, /gh issue edit/);
  assert.match(reviewer, /gh issue reopen/);
  assert.match(reviewer, /gh issue close/);
  assert.match(reviewer, /gh issue create/);
  assert.match(reviewer, /grep -q '\^STALE '/);
  assert.match(reviewer, /already suppressed/);
  assert.doesNotMatch(reviewer, /(?:sed -i|perl -i|git push|npm version)/);
});
