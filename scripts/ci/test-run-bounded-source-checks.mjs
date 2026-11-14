import assert from "node:assert/strict";
import { runBoundedSourceChecks } from "./run-bounded-source-checks.mjs";

const count = 31;
let active = 0;
let peak = 0;
const seen = [];
await runBoundedSourceChecks(Array.from({ length: count }, (_, i) => async () => {
  active++;
  peak = Math.max(peak, active);
  try {
    await Promise.resolve();
    await Promise.resolve();
    seen.push(i);
  } finally {
    active--;
  }
}), 4);
assert.equal(active, 0, "Workers must finish their tasks");
assert.equal(peak, 4, "Source review should use the bounded four-worker pool");
assert.equal(seen.length, count, "No source should be dropped");
assert.equal(new Set(seen).size, count, "No source should be checked twice");

const single = [];
await runBoundedSourceChecks([async () => single.push("one")], 4);
assert.deepEqual(single, ["one"], "Fewer tasks than workers must still be checked");
await runBoundedSourceChecks([], 4);

await assert.rejects(
  runBoundedSourceChecks([async () => { throw new Error("source assertion failed"); }], 4),
  /source assertion failed/,
  "A source-check exception must propagate to CI"
);
await assert.rejects(runBoundedSourceChecks([async () => {}], 0), /Invalid source-check/);
await assert.rejects(runBoundedSourceChecks([async () => {}], 9), /Invalid source-check/);
console.log("PASS: bounded concurrent source checks cover every URL, preserve source-check failures and enforce worker limit");
