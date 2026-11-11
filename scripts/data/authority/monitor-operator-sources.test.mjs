import test from "node:test";
import assert from "node:assert/strict";
import {
  sourceIndex, normalizedSourceFingerprint, reconcile, reviewedAttractionMonitorRows,
} from "./monitor-operator-sources.mjs";

const html = (text) => "<html><body><main><h1>Operator experience</h1><p>" +
  text.repeat(10) + "</p><script>token=123</script></main></body></html>";

test("normalization ignores tracking scripts but detects meaningful visitor copy changes", () => {
  const base = html("Published tasting hours, prices, and group guidelines. ");
  assert.equal(normalizedSourceFingerprint(base),
    normalizedSourceFingerprint(base.replace("token=123", "token=456")));
  assert.notEqual(normalizedSourceFingerprint(base),
    normalizedSourceFingerprint(base.replace("group guidelines", "new booking requirement")));
});

test("shared source URL tracks earliest source approval instead of duplicating checks", () => {
  const rows = [
    { id: "a", sourceUrl: "https://winery.example/visit", checkedAt: "2026-11-02" },
    { id: "b", sourceUrl: "https://winery.example/visit", checkedAt: "2026-10-20" },
  ];
  assert.deepEqual(sourceIndex(rows, []), [{url:"https://winery.example/visit",checkedAt:"2026-10-20"}]);
});

test("first read is a baseline only, not a new factual verification", () => {
  const source = {url:"https://winery.example/visit",checkedAt:"2026-11-02"};
  const first = reconcile(null, source, "abc", "2026-11-09");
  assert.equal(first.event,"BASELINE");
  assert.equal(first.value.pendingReviewSince,null);
});

test("changed operator page stays in review until all dependent facts are rechecked", () => {
  const src = {url:"https://winery.example/visit",checkedAt:"2026-11-02"};
  const first = reconcile(null,src,"old","2026-11-02");
  const changed = reconcile(first.value,src,"new","2026-11-09");
  assert.equal(changed.event,"SOURCE_CHANGED");
  assert.equal(changed.value.pendingReviewSince,"2026-11-09");
  const same = reconcile(changed.value,src,"new","2026-11-16");
  assert.equal(same.event,"SOURCE_REVIEW");
  const approved = reconcile(same.value,{...src,checkedAt:"2026-11-17"},"new","2026-11-23");
  assert.equal(approved.event,"UNCHANGED");
  assert.equal(approved.value.pendingReviewSince,null);
  const unchangedWithoutApproval = reconcile(changed.value,{...src,checkedAt:"2026-11-09"},"new","2026-11-16");
  assert.equal(unchangedWithoutApproval.event,"SOURCE_REVIEW");
});

test("unverified or insecure source rows are rejected before network requests", () => {
  assert.throws(() => sourceIndex([{id:"x",sourceUrl:"http://example.com",checkedAt:"2026-11-02"}],[]));
});


test("three approved attraction sources are monitored from real canonical records", async () => {
  const { readFile } = await import("node:fs/promises");
  const source = await readFile(new URL("../../../src/data/reviewed-attraction-authorities.ts", import.meta.url), "utf8");
  const records = reviewedAttractionMonitorRows(source);
  assert.equal(records.length, 3);
  assert.deepEqual(records.map((r) => r.id).sort(), [
    "fort-worth-water-gardens", "houston-botanic-garden", "san-antonio-japanese-tea-garden",
  ]);
  for (const row of records) {
    assert.match(row.sourceUrl, /^https:\/\//);
    assert.match(row.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
  }
  assert.throws(() => reviewedAttractionMonitorRows("export const other = [];"), /missing/);
  assert.throws(() => reviewedAttractionMonitorRows(source.replace('"slug": "houston-botanic-garden"', '"slug": "other"')), /inventory changed/);
});
