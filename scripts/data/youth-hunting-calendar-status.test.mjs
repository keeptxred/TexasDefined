import { test } from "node:test";
import assert from "node:assert/strict";
import { youthSeasonWindows, texasTodayKey } from "../../src/data/hunting/youth-hunting-status.ts";

const day = (y, m, d) => y * 10000 + m * 100 + d;

test("status transitions on start and end days, inclusive", () => {
  const date = "Oct. 30–Nov. 1, 2026";
  assert.equal(youthSeasonWindows(date, day(2026, 10, 28))[0].status, "Upcoming");
  assert.equal(youthSeasonWindows(date, day(2026, 10, 30))[0].status, "In progress");
  assert.equal(youthSeasonWindows(date, day(2026, 11, 1))[0].status, "In progress");
  assert.equal(youthSeasonWindows(date, day(2026, 11, 2))[0].status, "Ended");
});
test("each multi-window turkey opportunity remains independently useful", () => {
  const windows = youthSeasonWindows("Oct. 30–Nov. 1, 2026; Jan. 4–17, 2027", day(2026, 12, 1));
  assert.deepEqual(windows.map(w => w.status), ["Ended", "Upcoming"]);
});
test("single-month and cross-year windows are handled correctly", () => {
  assert.equal(youthSeasonWindows("Sept. 25–27, 2026", day(2026, 10, 28))[0].status, "Ended");
  assert.equal(youthSeasonWindows("Dec. 30–Jan. 2, 2027", day(2026, 12, 31))[0].status, "In progress");
});
test("unrecognized agency formats fail visually closed instead of guessing", () => {
  assert.equal(youthSeasonWindows("TBD by TPWD", day(2026, 10, 28))[0].status, "Verify with TPWD");
});
test("Texas local day is independent of server's UTC boundary", () => {
  assert.equal(texasTodayKey(new Date("2026-10-29T02:00:00Z")), day(2026, 10, 28));
});
