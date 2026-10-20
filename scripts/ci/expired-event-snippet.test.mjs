import assert from "node:assert/strict";
import test from "node:test";
import { expiredEventSnippetIssues } from "./expired-event-snippet.mjs";

const floresville = {
  url: "https://texasdefined.com/event/floresville-peanut-festival",
  title: "Floresville Peanut Festival 2026: Dates, Schedule & Tickets | Texas Defined",
  description: "Plan the 2026 Floresville Peanut Festival with schedule and tickets.",
  renderedText: "Texas Events Floresville Peanut Festival October 6–10, 2026 · Floresville Texas Latest confirmed occurrence has ended. These are the most recent organizer-confirmed dates on file.",
};

test("flags production-style ended Floresville title and description", () => {
  assert.deepEqual(expiredEventSnippetIssues(floresville).map(x => x.code), [
    "expired-event-title", "expired-event-description",
  ]);
});

test("preserves projected next edition rather than confusing it with the last confirmed year", () => {
  const nextYear = {
    ...floresville,
    title: "Floresville Peanut Festival 2027: Projected Dates | Texas Defined",
    description: "Projected 2027 event date; not yet organizer-confirmed.",
  };
  assert.deepEqual(expiredEventSnippetIssues(nextYear), []);
});

test("does not flag dates for a still-current event", () => {
  assert.deepEqual(expiredEventSnippetIssues({
    ...floresville, renderedText: "Floresville October 6–10, 2026 · Published event window",
  }), []);
});

test("does not flag an explicitly historical recap", () => {
  assert.deepEqual(expiredEventSnippetIssues({
    ...floresville, title: "Floresville 2026 Festival Recap: Dates and Memories",
  }).filter(x => x.code === "expired-event-title"), []);
});

test("does not mistake ordinary non-event pages for annual events", () => {
  assert.deepEqual(expiredEventSnippetIssues({
    ...floresville, url: "https://texasdefined.com/article/floresville-festival-history",
  }), []);
});

test("recognizes the Date status / Last confirmed occurrence alternative", () => {
  const result = expiredEventSnippetIssues({
    ...floresville,
    renderedText: "Event name October 6–10, 2026 · Floresville Date status Last confirmed occurrence About the event",
  });
  assert.ok(result.some(x => x.code === "expired-event-title"));
});
