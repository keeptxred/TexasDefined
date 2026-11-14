import test from "node:test";
import assert from "node:assert/strict";
import { shouldRunHuntingBrowser } from "./hunting-browser-release-scope.mjs";

const plan = (changedFiles, selectedPaths) => ({
  baseline: "previous-verified-deployment",
  head: "newer-main-commit",
  changedFiles,
  selectedPaths,
});

test("catches turkey changes even when latest commit only changed events", () => {
  // Reproduces a bot merge followed by an unrelated main commit.
  assert.equal(shouldRunHuntingBrowser(plan(
    ["src/routes/hunting.$slug.tsx", "scripts/events/check-november-event-sources.mjs"],
    ["/hunting/turkey-hunting", "/events/november-events"]
  )), true);
});

test("checks the exact guide when only its browser audit script changes", () => {
  assert.equal(shouldRunHuntingBrowser(plan(
    ["scripts/ci/verify-turkey-hunting-browser.mjs"], []
  )), true);
  assert.equal(shouldRunHuntingBrowser(plan(
    ["scripts/ci/verify-hunting-hub-responsive-browser.mjs"], []
  )), true);
});

test("does not trigger Chrome audit on unrelated pages", () => {
  assert.equal(shouldRunHuntingBrowser(plan(
    ["scripts/events/check-november-event-sources.mjs"], ["/events/november-events"]
  )), false);
});

test("never silently skips on malformed production change plans", () => {
  assert.throws(() => shouldRunHuntingBrowser(null), /Missing or malformed/);
  assert.throws(() => shouldRunHuntingBrowser({ selectedPaths: [] }), /Missing or malformed/);
  assert.throws(() => shouldRunHuntingBrowser(plan([], Array(41).fill("/x"))), /Oversized/);
});
