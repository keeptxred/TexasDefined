import assert from "node:assert/strict";
import test from "node:test";
import { resolveEventSnippet } from "./event-snippet-lifecycle.ts";

const heart = {
  canonicalPath: "/event/heart-o-texas-fair-rodeo",
  title: "Heart O' Texas Fair & Rodeo 2026: Dates, Schedule & Tickets",
  description: "The 2026 Heart O' Texas Fair & Rodeo runs Oct. 8-18 in Waco.",
  eventName: "Heart O' Texas Fair & Rodeo",
  eventOccurrenceEndDate: "2026-10-18",
};

test("confirmed end date remains current through Texas-local final event day", () => {
  assert.deepEqual(resolveEventSnippet(heart, "2026-10-18"), {
    title: heart.title,
    description: heart.description,
  });
});

test("expired event edition is not advertised as upcoming", () => {
  const result = resolveEventSnippet(heart, "2026-10-19");
  assert.equal(result.title, "Heart O' Texas Fair & Rodeo: Visitor Guide & Next Dates");
  assert.doesNotMatch(result.description, /2026|Oct\. 8-18/);
  assert.match(result.description, /confirm the next schedule/);
});

test("already-ended Floresville multi-window edition loses the 2026 ticket claim", () => {
  const source = {
    canonicalPath: "/event/floresville-peanut-festival",
    title: "Floresville Peanut Festival 2026: Dates, Schedule & Tickets",
    description: "Plan the 2026 Floresville Peanut Festival with tickets.",
    eventName: "Floresville Peanut Festival",
    eventOccurrenceEndDate: "2026-10-10",
  };
  const snippet = resolveEventSnippet(source, "2026-10-14");
  assert.equal(snippet.title, "Floresville Peanut Festival: Visitor Guide & Next Dates");
  assert.doesNotMatch(snippet.description, /2026|tickets/i);
});

test("a documented future edition retains its current year and description", () => {
  const future = {
    ...heart,
    title: "Heart O' Texas Fair & Rodeo 2027: Dates & Guide",
    description: "The 2027 edition has organizer-confirmed dates.",
    eventOccurrenceEndDate: "2027-10-17",
  };
  assert.deepEqual(resolveEventSnippet(future, "2026-10-19"), {
    title: future.title, description: future.description,
  });
});

test("projected next-year wording survives an expired previous occurrence", () => {
  const projected = {
    ...heart,
    title: "Heart O' Texas Fair & Rodeo 2027: Projected Dates & Guide",
    description: "The projected 2027 planning window is not confirmed.",
  };
  assert.deepEqual(resolveEventSnippet(projected, "2026-10-19"), {
    title: projected.title, description: projected.description,
  });
});

test("non-event editorial pages and events without known end dates are untouched", () => {
  const editorial = { ...heart, canonicalPath: "/article/texas-rivers-explained" };
  const missingDate = { ...heart, eventOccurrenceEndDate: null };
  assert.deepEqual(resolveEventSnippet(editorial, "2026-10-19"), { title: heart.title, description: heart.description });
  assert.deepEqual(resolveEventSnippet(missingDate, "2026-10-19"), { title: heart.title, description: heart.description });
});

test("State Fair standalone route remains correct after October 18", () => {
  const stateFair = {
    canonicalPath: "/texas-state-fair",
    title: "State Fair of Texas 2026: Dates, Hours, Schedule & Tickets",
    description: "State Fair of Texas 2026 runs Sept. 25-Oct. 18.",
  };
  assert.deepEqual(resolveEventSnippet(stateFair, "2026-10-18"), {
    title: stateFair.title, description: stateFair.description,
  });
  const ended = resolveEventSnippet(stateFair, "2026-10-19");
  assert.equal(ended.title, "State Fair of Texas: Visitor Guide & Next Dates");
  assert.doesNotMatch(ended.description, /2026|Sept\. 25-Oct\. 18/);
});
