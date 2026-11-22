import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { auditCountyHolidayCoverage, formatCountyHolidayIssue } from "./audit-county-holiday-coverage.mjs";

test("all county pages get distinct seasonal research status; a past event does not become upcoming", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "td-county-holidays-"));
  const put = (p, content) => {
    fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true });
    fs.writeFileSync(path.join(root, p), content);
  };
  const tick = String.fromCharCode(96);
  try {
    put("src/data/texas-places.ts", "const COUNTY_NAMES = " + tick
      + "Gregg|Rusk|Upshur" + tick + ".split('|');");
    put("src/data/major-event-index.ts", 