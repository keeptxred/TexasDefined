import test from "node:test";
import assert from "node:assert/strict";
import { assessFishingCanonical, decodeFishingHtml } from "./fishing-canonical-policy.mjs";

const url = "https://texasdefined.com/fishing/lakes";
const assess = (canonical, noindex = false) =>
  assessFishingCanonical({ canonical, expectedUrl: url, noindex });

test("indexable page requires an exact self-canonical", () => {
  assert.deepEqual(assess(url), { critical: [], warnings: [] });
  assert.deepEqual(assess(""), { critical: ["self_canonical_mismatch"], warnings: [] });
  assert.deepEqual(assess("https://texasdefined.com/fishing"),
    { critical: ["self_canonical_mismatch"], warnings: [] });
});

test("intentional noindex submission forms may omit canonical", () => {
  assert.deepEqual(assess("", true), { critical: [], warnings: [] });
  assert.deepEqual(assess(url, true), { critical: [], warnings: [] });
});

test("nonself canonical on noindex pages is reviewed, not silently trusted", () => {
  assert.deepEqual(assess("https://texasdefined.com/fishing", true),
    { critical: [], warnings: ["noindex_nonself_canonical_review"] });
});

test("React-escaped apostrophes and ampersands match exact published metadata", () => {
  assert.equal(decodeFishingHtml("TPWD&#x27;s &amp; Austin&#39;s &apos;waters&apos;"), "TPWD's & Austin's 'waters'");
  assert.equal(decodeFishingHtml("&amp;#x27;"), "&#x27;");
  assert.equal(decodeFishingHtml("Texas fishing &amp; travel"), "Texas fishing & travel");
});
