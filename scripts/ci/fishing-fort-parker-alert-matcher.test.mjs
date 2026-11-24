import test from "node:test";
import assert from "node:assert/strict";
import { matchesFortParkerAlertText } from "./fishing-fort-parker-alert-matcher.mjs";

const currentAlert = [
  "Boat Ramp Closure",
  "The Navasota River boat ramp will be closed from Oct. 19, 2026 to Jan. 10, 2027 for road work.",
  "Fishing Piers Closed",
  "Jan. 7, 2025 - Both fishing piers are closed.",
].join(" ");

test("preserves both TPWD Fort Parker closures with exact official dates", () => {
  assert.equal(matchesFortParkerAlertText(currentAlert), true);
});

test("missing or changed date, pier closure or wrong river fails closed", () => {
  for (const stale of [
    currentAlert.replace("Oct. 19, 2026", "Oct. 20, 2026"),
    currentAlert.replace("Jan. 10, 2027", "Jan. 11, 2027"),
    currentAlert.replace("Both fishing piers are closed", "Both fishing piers are now open"),
    currentAlert.replace("Navasota River boat ramp", "Lake Fort Parker boat ramp"),
    "The park is open and fishing is allowed.",
  ]) {
    assert.equal(matchesFortParkerAlertText(stale), false, stale);
  }
});
