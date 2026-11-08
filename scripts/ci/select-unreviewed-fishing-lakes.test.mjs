import test from "node:test";
import assert from "node:assert/strict";
import { selectUnreviewedFishingLakes } from "./select-unreviewed-fishing-lakes.mjs";

test("exclude curated and already source-reviewed network access dossiers", () => {
  const definitions = `
  { slug: "lake-known", name: "Known", tpwdSlug: "known", access: "Yes" },
  { slug: "lake-published", accessReviewedAt: "2026-10-12", tpwdSlug: "published",
    accessPoints: [{ name: "Ramp" }] },
  { slug: "lake-needs-review", tpwdSlug: "review" },
  { slug: "lake-date-only", accessReviewedAt: "2026-10-12", tpwdSlug: "date_only", access: "summary" },
  { slug: "lake-points-only", tpwdSlug: "points_only",
    accessPoints: [{ name: "Unconfirmed" }] },
  { slug: "lake-needs-review", tpwdSlug: "review" }`;
  const selected = selectUnreviewedFishingLakes(definitions, ["lake-known", "curated-outside-network"]);
  assert.deepEqual(selected.lakes, [
    { lakeId: "lake-needs-review", tpwd: "review" },
    { lakeId: "lake-date-only", tpwd: "date_only" },

  ]);
  assert.equal(selected.reviewedLakeGroups, 1);
  assert.equal(selected.existingAccessWithoutExplicitDate, 1);
  assert.equal(selected.networkLakeDefinitions, 5);
  assert.equal(selected.totalDistinctKnownLakes, 6);
});

test("no outstanding unreviewed lake is valid and does not justify duplicate discovery", () => {
  const onlyReviewed = `{ slug: "lake-done", accessReviewedAt: "2026-11-08", tpwdSlug: "done",
    accessPoints: [{ name: "Real ramp" }] }`;
  const selected = selectUnreviewedFishingLakes(onlyReviewed, []);
  assert.deepEqual(selected.lakes, []);
  assert.equal(selected.reviewedLakeGroups, 1);
  assert.equal(selected.existingAccessWithoutExplicitDate, 0);
});
