import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const workflow = readFileSync(".github/workflows/audit-whole-site-production.yml", "utf8");

test("whole-site audit reuses only the canonical authority backlog issue", () => {
  assert.match(workflow, /const issueNumber = 4704;/);
  assert.match(workflow, /github\.rest\.issues\.get\(\{owner,repo,issue_number:issueNumber\}\)/);
  assert.match(workflow, /github\.rest\.issues\.update\(\{/);
  assert.doesNotMatch(workflow, /github\.rest\.issues\.create\(/);
  assert.doesNotMatch(workflow, /state:'open', per_page:100/);
});

test("a previously closed authority ledger is reopened, not duplicated", () => {
  assert.match(workflow, /existing\.state === 'closed'/);
  assert.match(workflow, /state:'open',state_reason:'reopened'/);
  assert.match(workflow, /existing\.title !== title/);
  assert.ok(workflow.includes('Do **not** close this issue'));
});
