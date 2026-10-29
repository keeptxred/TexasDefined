import test from "node:test";
import assert from "node:assert/strict";
import { loadSeasonContract, rolloverStatus } from "./check-hunting-season-rollover.mjs";
const contract = loadSeasonContract('seasonYear: "2026–27", validFrom: "2026-09-01", validThrough: "2027-08-31"');
test("rollover warning is early, bounded and fail-closed", () => {
  assert.equal(rolloverStatus(contract, "2027-07-16").state, "upcoming");
  assert.equal(rolloverStatus(contract, "2027-07-15").state, "current");
  assert.equal(rolloverStatus(contract, "2027-08-31").state, "upcoming");
  assert.equal(rolloverStatus(contract, "2027-09-01").state, "expired");
  assert.throws(() => loadSeasonContract('seasonYear: "2026–27", validFrom: "2026-09-01", validThrough: "2028-08-31"'), /disagree/);
});
