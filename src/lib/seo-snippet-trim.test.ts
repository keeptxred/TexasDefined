import assert from "node:assert/strict";
import test from "node:test";
import { cleanMetaDescription } from "./seo-snippet-trim.ts";

test("preserves an existing concise snippet unchanged", () => {
  const value = "The Llano River guide covers fishing, paddling and visitor access.";
  assert.equal(cleanMetaDescription(value), value);
});

test("removes dangling clause words caused by the 160-character budget", () => {
  const input = "Texas makes electric plan shopping tricky. Compare the real electricity rate, check your usage and read the contract before signing for a utility plan that may include bill credits and extra fees you must account for.";
  const snippet = cleanMetaDescription(input);
  assert.ok(snippet.length <= 160);
  assert.doesNotMatch(snippet, /\b(?:a|and|the|of|for|with|onto)\.$/i);
});

test("signals continuation rather than turning 'and' into a full sentence", () => {
  const input = "Outdoor summer travel in Texas can be rewarding, but preparation matters: water, heat, weather, trailheads, campsites, park rules, schedules, land access and other context should be checked in advance.";
  const snippet = cleanMetaDescription(input, 142);
  assert.ok(snippet.length <= 142);
  assert.doesNotMatch(snippet, /\b(?:and|the|of|for|with)\.$/i);
});

test("leaves protected GSC description candidate intact when already within the budget", () => {
  const description = "Find Texas's major and boundary rivers by region, including the Rio Grande, Pecos, Brazos, Colorado, Trinity and Sabine, with maps and waterway context.";
  assert.equal(cleanMetaDescription(description), description);
});

test("normalizes whitespace and stays under 160 characters", () => {
  const result = cleanMetaDescription("  Explore Texas stories and   local planning information  from a broad catalog, including official links and practical travel resources that people can use before each trip; all content is carefully checked for accuracy.  ");
  assert.ok(result.length <= 160);
  assert.ok(!/\s{2}/.test(result));
});
