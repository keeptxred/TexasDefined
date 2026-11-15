import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import {
  sourceForFishingGuideReview,
  PINNED_FISHING_OPERATOR_SOURCE_SLUGS,
} from "./fishing-operator-source-witnesses.mjs";

const guides = JSON.parse(fs.readFileSync("src/data/fishing/curated-fishing-guide-businesses.json", "utf8"));

test("two researched operators have pinned, same-origin official detail witnesses", () => {
  assert.deepEqual([...PINNED_FISHING_OPERATOR_SOURCE_SLUGS].sort(), [
    "captain-steve-barnes-texoma", "reel-um-n-sam-rayburn-guide",
  ]);
  for (const slug of PINNED_FISHING_OPERATOR_SOURCE_SLUGS) {
    const guide = guides.find((candidate) => candidate.slug === slug);
    assert.ok(guide, slug + ": missing independently curated operator");
    const result = sourceForFishingGuideReview(guide);
    assert.equal(new URL(result.url).origin, new URL(guide.url).origin);
    assert.notEqual(result.url, guide.url, "detail witness must be more specific than an unreliable homepage");
    assert.ok(result.identity.length >= 3);
    assert.ok(result.identity.includes(guide.phone), "operator phone must corroborate identity");
  }
});

test("changed homepage or untrusted operator identity fails closed", () => {
  for (const slug of PINNED_FISHING_OPERATOR_SOURCE_SLUGS) {
    const guide = guides.find((candidate) => candidate.slug === slug);
    assert.throws(
      () => sourceForFishingGuideReview({ ...guide, url: "https://untrusted.example/" }),
      /identity drift/,
    );
    assert.throws(() => sourceForFishingGuideReview({ ...guide, url: guide.url + "?changed=1" }), /identity drift/);
  }
  assert.throws(() => sourceForFishingGuideReview(null), /requires an identified operator/);
});

test("other operator sites retain exact independent homepage verification", () => {
  for (const guide of guides.filter((g) => !PINNED_FISHING_OPERATOR_SOURCE_SLUGS.includes(g.slug))) {
    assert.deepEqual(sourceForFishingGuideReview(guide), { url: guide.url, identity: [] });
  }
});
