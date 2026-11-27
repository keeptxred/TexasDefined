import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import {
  sourceForFishingGuideReview,
  PINNED_FISHING_OPERATOR_SOURCE_SLUGS,
  isSameOperatorOrigin,
  officialFishingGuideSingleRowMatches,
} from "./fishing-operator-source-witnesses.mjs";

const guides = JSON.parse(fs.readFileSync("src/data/fishing/curated-fishing-guide-businesses.json", "utf8"));

test("individually researched fishing sources retain strict operator or government authority witnesses", () => {
  assert.deepEqual([...PINNED_FISHING_OPERATOR_SOURCE_SLUGS].sort(), [
    "adventure-texoma-guide", "captain-steve-barnes-texoma", "reel-um-n-sam-rayburn-guide",
  ]);
  for (const slug of PINNED_FISHING_OPERATOR_SOURCE_SLUGS) {
    const guide = guides.find((candidate) => candidate.slug === slug);
    assert.ok(guide, slug + ": missing independently curated operator");
    const result = sourceForFishingGuideReview(guide);
    if (["captain-steve-barnes-texoma", "adventure-texoma-guide"].includes(slug)) {
      assert.equal(new URL(result.url).origin, "https://wildlifedepartment.com");
      assert.equal(result.sourceKind, "government-license");
    } else if (slug === "reel-um-n-sam-rayburn-guide") {
      assert.equal(new URL(result.url).origin, "https://tpwd.texas.gov");
      assert.equal(result.sourceKind, "government-report-identity-only");
      assert.ok(result.identity.includes("Report by Captain Lynn Atkinson, Reel Um N Guide Service"));
      assert.ok(result.identity.includes("Sam Rayburn Fishing Report"));
    } else {
      assert.equal(new URL(result.url).origin, new URL(guide.url).origin);
      assert.equal(result.sourceKind, "operator-detail");
    }
    assert.notEqual(result.url, guide.url, "detail witness must be more specific than an unreliable homepage");
    assert.ok(result.identity.length >= 3);
    const digits = (s) => s.replace(/[^0-9]/g, "");
    if (result.sourceKind !== "government-report-identity-only") {
      assert.ok(result.identity.some(value => digits(value).includes(digits(guide.phone))), "phone must corroborate identity");
    } else {
      assert.ok(!result.identity.some(value => digits(value).includes(digits(guide.phone))), "historical government attribution is not a phone verification");
    }
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

test("reject any HTTP downgrade, untrusted redirect or malformed operator verification URL", () => {
  const origin = "https://txfishingguide.com/trips-and-charters/lake-texoma-striper-trips/";
  assert.equal(isSameOperatorOrigin(origin, origin + "?campaign=editorial"), true);
  assert.equal(isSameOperatorOrigin(origin, "http://txfishingguide.com/trips-and-charters/"), false);
  assert.equal(isSameOperatorOrigin(origin, "https://txfishingguide.com.evil.test/"), false);
  assert.equal(isSameOperatorOrigin(origin, "not-a-url"), false);
  assert.equal(isSameOperatorOrigin("not-a-url", origin), false);
});

test("government licensed fishing guide must match all identity clues in ONE official table row", () => {
  const row = "<tr><td>Capt.Steve Barnes Guide Servic</td><td>(940)841-0910</td><td>Steve L Barnes</td></tr>";
  const proof = ["Capt.Steve Barnes Guide Servic", "(940)841-0910", "Steve L Barnes"];
  assert.equal(officialFishingGuideSingleRowMatches("<table>" + row + "</table>", proof), true);
  for (const html of [
    "",
    "<table><tr><td>unrelated</td></tr>" + row.replace("940", "941") + "</table>",
    row.replace("Steve L Barnes", "Different Guide"),
    row.replace("Steve L Barnes", "Different Guide") + "<tr><td>Steve L Barnes</td></tr>",
    row + row,
    "<script>Capt.Steve Barnes Guide Servic (940)841-0910 Steve L Barnes</script>",
  ]) assert.equal(officialFishingGuideSingleRowMatches(html, proof), false);
});

test("Adventure Texoma is distinct from similarly named Adventure Texoma Outdoors", () => {
  const proof = sourceForFishingGuideReview(guides.find(g => g.slug === "adventure-texoma-guide")).identity;
  const matching = "<tr><td>Adventure Texoma</td><td>(903)744-6169</td><td>Lake Texoma</td></tr>";
  const unrelated = "<tr><td>Adventure Texoma Outdoors</td><td>(903)814-5566</td><td>Lake Texoma</td></tr>";
  assert.equal(officialFishingGuideSingleRowMatches(matching + unrelated, proof), true);
  assert.equal(officialFishingGuideSingleRowMatches(unrelated, proof), false);
});
