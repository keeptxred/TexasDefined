import test from "node:test";
import assert from "node:assert/strict";
import {
  operatorVisibleText,
  validateOperatorEvidence,
  validateEditorialReview,
  targetSources,
} from "./check-moody-gardens-official.mjs";

const discovery = targetSources[0];
const html = (content) => `<!doctype html><head><title>Moody Gardens</title><script>const hidden="now open";</script></head><body><main>${content}</main></body>`;

test("normalizes public HTML entities and removes script false positives", () => {
  const text = operatorVisibleText(html("<h2>Galveston Children&#39;s Museum</h2><p>Now open daily</p>"));
  assert.match(text, /Galveston Children's Museum/);
  assert.match(text, /Now open daily/);
  assert.doesNotMatch(text, /const hidden/);
});

test("accepts a current museum statement in rendered operator copy", () => {
  const content = "<h2>Galveston Children&#8217;s Museum</h2><p>Now open daily during attraction hours.</p><p>Audience Recognition Theater downstairs</p>";
  assert.deepEqual(validateOperatorEvidence(discovery, html(content)), []);
});

test("a generic navigation 'now open' cannot hide a museum closure", () => {
  const content = "<nav>Now open today</nav><h2>Galveston Children's Museum</h2><p>Temporarily closed during renovation; check for reopening.</p><p>Audience Recognition Theater downstairs</p>";
  assert.ok(validateOperatorEvidence(discovery, html(content)).some((error) => error.includes("no longer clearly")));
  assert.ok(validateOperatorEvidence(discovery, html(content)).some((error) => error.includes("conflicting closure")));
});

test("a source losing museum context fails even if the theater survives", () => {
  const content = "<h2>Galveston Children's Museum</h2><p>Renovation dates to be announced</p><p>Audience Recognition Theater remains open</p>";
  assert.ok(validateOperatorEvidence(discovery, html(content)).some((error) => error.includes("clearly identifies")));
});

test("age, future-dated review and expired holiday copy are independently gated", () => {
  const curation = 'sourceCheckedAt: "2026-11-09"\nHoliday in the Gardens is scheduled from November 21, 2026';
  assert.deepEqual(validateEditorialReview(curation, Date.parse("2026-11-11T12:00:00Z")), []);
  assert.ok(validateEditorialReview(curation, Date.parse("2027-01-04T12:00:00Z")).some((e) => e.includes("seasonal copy")));
  assert.ok(validateEditorialReview(curation, Date.parse("2026-12-15T12:00:00Z")).some((e) => e.includes("days old")));
  assert.ok(validateEditorialReview(curation, Date.parse("2026-11-06T00:00:00Z")).some((e) => e.includes("days old")));
  assert.ok(validateEditorialReview('sourceCheckedAt: "2026-99-99"', Date.parse("2026-11-11T12:00:00Z")).some((e) => e.includes("invalid")));
});
