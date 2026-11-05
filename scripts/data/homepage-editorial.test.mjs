import assert from "node:assert/strict";
import test from "node:test";
import { selectHomepageEditorPicks, selectHomepageMoreStories } from "../../src/lib/homepage-editorial.ts";

const article = (id, category) => ({ id, category });

test("homepage preserves hero and selects distinct categories when available", () => {
  const featured = [
    article("hero", "texas-history"),
    article("history-2", "texas-history"),
    article("history-3", "texas-history"),
    article("history-4", "texas-history"),
  ];
  const latest = [
    article("history-2", "texas-history"),
    article("road", "road-trips"),
    article("water", "lakes-rivers"),
    article("homes", "real-estate"),
    article("more", "texas-history"),
  ];
  const picks = selectHomepageEditorPicks(featured, latest);
  assert.deepEqual(picks.map((item) => item.id), ["road", "water", "homes"]);
  assert.equal(featured[0].id, "hero");
  const more = selectHomepageMoreStories(latest, featured, picks);
  assert.deepEqual(more.map((item) => item.id), ["history-2", "more"]);
  assert.ok(!more.some((item) => picks.some((pick) => pick.id === item.id)));
});

test("editorial selection gracefully fills missing diversity, deduplicates, and respects limits", () => {
  const featured = [article("hero", "history"), article("a", "history"), article("a", "history"), article("b", "history")];
  const latest = [article("b", "history"), article("c", "history")];
  assert.deepEqual(selectHomepageEditorPicks(featured, latest, 2).map((x) => x.id), ["a", "b"]);
  assert.deepEqual(selectHomepageMoreStories(latest, featured, [featured[1]], 1).map((x) => x.id), ["b"]);
  assert.deepEqual(selectHomepageEditorPicks(featured, latest, 0), []);
  assert.deepEqual(selectHomepageEditorPicks([], [], 3), []);
});
