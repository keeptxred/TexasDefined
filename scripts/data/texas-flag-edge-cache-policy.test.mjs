import test from "node:test";
import assert from "node:assert/strict";
import { applyTexasFlagEdgeCachePolicy } from "../../src/lib/texas-flag-edge-cache-policy.ts";

const flagUrls = [
  "https://texasdefined.com/texas-flag",
  "https://texasdefined.com/article/history-of-the-texas-flag",
];

test("both ordinary public Texas flag HTML routes prohibit shared CDN caching", async () => {
  for (const url of flagUrls) {
    const request = new Request(url);
    const response = new Response("Updated November 19, 2026", {
      headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=3600", "age": "86400" },
    });
    const result = applyTexasFlagEdgeCachePolicy(request, response);
    assert.equal(await result.text(), "Updated November 19, 2026");
    assert.equal(result.headers.get("cache-control"), "no-store, max-age=0");
    assert.equal(result.headers.get("cdn-cache-control"), "no-store");
    assert.equal(result.headers.get("cloudflare-cdn-cache-control"), "no-store");
    assert.equal(result.headers.get("age"), null);
  }
});
test("cache prevention also covers query-bearing HTML and HEAD", () => {
  for (const url of flagUrls) {
    const request = new Request(url + "?campaign=direct", { method: "HEAD" });
    const result = applyTexasFlagEdgeCachePolicy(request,
      new Response(null, { headers: { "content-type": "text/html" } }));
    assert.equal(result.headers.get("cdn-cache-control"), "no-store");
  }
});
test("other pages and non-HTML responses retain their existing cache semantics", () => {
  for (const [url, mime] of [
    ["https://texasdefined.com/texas-history", "text/html"],
    [flagUrls[0], "application/json"],
    ["https://texasdefined.com/texas-flag.svg", "image/svg+xml"],
  ]) {
    const response = new Response("original", {
      headers: { "content-type": mime, "cache-control": "public, max-age=3600", age: "60" },
    });
    const result = applyTexasFlagEdgeCachePolicy(new Request(url), response);
    assert.strictEqual(result, response);
    assert.equal(result.headers.get("age"), "60");
  }
});
test("non-reading methods do not change HTTP response cache policy", () => {
  const response = new Response("plain", { headers: { "content-type": "text/html", "cache-control": "private" } });
  assert.strictEqual(applyTexasFlagEdgeCachePolicy(new Request(flagUrls[0], { method: "POST" }), response), response);
});
