import assert from "node:assert/strict";
import test from "node:test";

import { formatDate, formatDateRange } from "./format.ts";

test("formatDate preserves date-only ISO behavior", () => {
  assert.equal(formatDate("2026-08-21"), "August 21, 2026");
});

test("formatDate accepts Supabase ISO timestamps without shifting the calendar date", () => {
  assert.equal(
    formatDate("2026-08-21T19:42:57.218423+00:00"),
    "August 21, 2026",
  );
});

test("formatDate accepts PostgreSQL timestamp text", () => {
  assert.equal(
    formatDate("2026-08-21 19:42:57.218423+00"),
    "August 21, 2026",
  );
});

test("formatDateRange accepts full timestamps", () => {
  assert.equal(
    formatDateRange(
      "2026-08-21T19:42:57.218423+00:00",
      "2026-08-23T08:00:00+00:00",
    ),
    "August 21–23, 2026",
  );
});

test("formatDate degrades safely instead of crashing SSR on malformed input", () => {
  assert.equal(formatDate("not-a-date"), "not-a-date");
});
