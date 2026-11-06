import assert from "node:assert/strict";
import { test } from "node:test";
import { compareIncludesSource, protectedProductionState } from "./fishing-access-deployment-source.mjs";

test("only same or ahead commits qualify as source descendants", () => {
  assert.equal(compareIncludesSource({ status: "ahead", ahead_by: 1 }), true);
  assert.equal(compareIncludesSource({ status: "identical" }), true);
  for (const status of ["behind", "diverged", "unknown", "", null]) {
    assert.equal(compareIncludesSource({ status }), false);
  }
});
test("never mistake unrelated or incomplete checks for protected production", () => {
  assert.equal(protectedProductionState({state:"success",statuses:[]}), "missing");
  assert.equal(protectedProductionState({statuses:[{context:"test",state:"success"}]}), "missing");
  assert.equal(protectedProductionState({statuses:[{context:"texasdefined-production",state:"pending"}]}), "pending");
  assert.equal(protectedProductionState({statuses:[{context:"texasdefined-production",state:"failure"}]}), "failure");
  assert.equal(protectedProductionState({statuses:[{context:"texasdefined-production",state:"success"}]}), "success");
});
