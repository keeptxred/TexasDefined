import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  operatorVisibleText,
  validateOperatorEvidence,
  validateEditorialReview,
  validateOperatorEarlyClosureNotice,
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
  const content = "<h2>Galveston Children&#8217;s Museum</h2><p>Now open daily during attraction hours, with 9 to 10 AM reserved for museum members.</p><p>Audience Recognition Theater downstairs</p><p>Guests age 2 and older need a museum admission ticket, or a ticket that includes Galveston Children&#39;s Museum admission.</p>";
  assert.deepEqual(validateOperatorEvidence(discovery, html(content)), []);
});

test("a new members-only time must be rechecked if the operator no longer publishes it", () => {
  const content = "<h2>Galveston Children's Museum</h2><p>Now open daily during attraction hours.</p><p>Audience Recognition Theater downstairs</p>";
  const errors = validateOperatorEvidence(discovery, html(content));
  assert.ok(errors.some((message) => message.includes("9 to 10 AM reserved for museum members")));
});

test("museum inclusion must be reviewed when the operator no longer confirms it", () => {
  const content = "<h2>Galveston Children's Museum</h2><p>Now open daily during attraction hours, with 9 to 10 AM reserved for museum members.</p><p>Audience Recognition Theater downstairs</p><p>Guests age 2 and older must buy separate admission.</p>";
  const errors = validateOperatorEvidence(discovery, html(content));
  assert.ok(errors.some((message) => message.includes("ticket that includes Galveston Children's Museum admission")));
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

const sourceNotice = readFileSync("src/data/moody-gardens-visit-notice.ts", "utf8");
const closingHtml = (entry = "1:00 PM", date = "Monday, November 16, 2026") =>
  html(`<div role="status"><h2>Early Closure Notice: Monday, November 16</h2>
  <p>Moody Gardens has scheduled maintenance beginning at 2:00 PM on ${date}.
  Attractions close early (last entry at ${entry}).</p></div>`);

test("official early closing is reflected in a matching, time-limited editorial notice", () => {
  assert.deepEqual(
    validateOperatorEarlyClosureNotice(closingHtml(), sourceNotice, Date.parse("2026-11-14T00:00:00Z")), [],
  );
});

test("official last-entry time change triggers an editor review", () => {
  const issues = validateOperatorEarlyClosureNotice(closingHtml("12:00 PM"), sourceNotice, Date.parse("2026-11-14T00:00:00Z"));
  assert.ok(issues.some((issue) => issue.includes("last-entry time changed")));
});

test("operator date change triggers review, even when the attraction names remain", () => {
  const issues = validateOperatorEarlyClosureNotice(
    closingHtml("1:00 PM", "Tuesday, November 17, 2026"),
    sourceNotice,
    Date.parse("2026-11-14T00:00:00Z"),
  );
  assert.ok(issues.some((issue) => issue.includes("different date")));
});

test("the operator's stale notice is ignored after it expires, without resurrecting old copy", () => {
  assert.deepEqual(validateOperatorEarlyClosureNotice(closingHtml(), "", Date.parse("2026-11-19T00:00:00Z")), []);
  assert.deepEqual(validateOperatorEarlyClosureNotice(html("<p>Regular daily hours</p>"), "", Date.now()), []);
});

test("an undated operator closure notice fails closed", () => {
  const issues = validateOperatorEarlyClosureNotice(
    html("<h2>Early Closure Notice: Please check before visiting</h2><p>Last entry 1:00 PM.</p>"),
    sourceNotice,
    Date.parse("2026-11-14T00:00:00Z"),
  );
  assert.ok(issues.some((issue) => issue.includes("could not be verified")));
});

test("an operator cancellation/removal must fail while a timed editorial alert remains visible", () => {
  const officialHtml = html("<h2>Daily hours</h2><p>Regular attraction admission hours. Aquarium and Rainforest Pyramids.</p>");
  const noticeCode = [
    'heading: "Monday, Nov. 16: attractions close early"',
    'startsAt: "2026-11-13T00:00:00Z"',
    'expiresAt: "2026-11-17T06:00:00Z"',
  ].join("\n");
  const errors = validateOperatorEarlyClosureNotice(
    officialHtml, noticeCode, Date.parse("2026-11-14T17:00:00Z"),
  );
  assert.ok(errors.some((message) => message.includes("removed its early-closure announcement")));
});

test("the operator removal no longer triggers an alert after the announcement expires", () => {
  const officialHtml = html("<h2>Daily hours</h2><p>Regular admission hours.</p>");
  const noticeCode = 'startsAt: "2026-11-13T00:00:00Z"\nexpiresAt: "2026-11-17T06:00:00Z"';
  assert.deepEqual(
    validateOperatorEarlyClosureNotice(officialHtml, noticeCode, Date.parse("2026-11-17T06:00:00Z")), [],
  );
  assert.deepEqual(
    validateOperatorEarlyClosureNotice(officialHtml, noticeCode, Date.parse("2026-11-12T18:00:00Z")), [],
  );
});

test("missing or invalid alert dates cannot invent a currently displayed notice", () => {
  const officialHtml = html("<h2>Daily hours</h2>");
  assert.deepEqual(validateOperatorEarlyClosureNotice(officialHtml, "", Date.now()), []);
  assert.deepEqual(validateOperatorEarlyClosureNotice(officialHtml, 'startsAt: "2026-99-99"', Date.now()), []);
});
