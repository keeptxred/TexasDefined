import test from "node:test";
import assert from "node:assert/strict";
import { applyHashedModuleDocumentCachePolicy } from "./hashed-asset-document-cache-policy.ts";

const html = (status = 200) => new Response("<html>TexasDefined</html>", {
  status,
  headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=120",
    "CDN-Cache-Control": "public, max-age=3600", "Age": "55" },
});
const req = (path, method = "GET") => new Request("https://texasdefined.com" + path, { method });

test("property tax pages always return version-fresh HTML regardless of browser or crawler", async () => {
  for (const path of ["/property-tax/taxing-unit/little-elm-isd", "/property-tax/counties",
    "/property-tax/taxing-unit/ennis-isd"]) {
    const result = applyHashedModuleDocumentCachePolicy(req(path), html());
    assert.equal(result.headers.get("Cache-Control"), "no-store, max-age=0");
    assert.equal(result.headers.get("CDN-Cache-Control"), "no-store");
    assert.equal(result.headers.get("Cloudflare-CDN-Cache-Control"), "no-store");
    assert.equal(result.headers.get("age"), null);
    assert.equal(await result.text(), "<html>TexasDefined</html>");
  }
});

test("football team HTML uses no-store without affecting SEO or source content", async () => {
  const result = applyHashedModuleDocumentCachePolicy(req("/texas-high-school-football-teams/shepherd"), html());
  assert.equal(result.headers.get("Cache-Control"), "no-store, max-age=0");
  assert.equal(result.headers.get("X-Robots-Tag"), null);
  assert.equal(await result.text(), "<html>TexasDefined</html>");
});

test("other pages, non-HTML responses, non-200 status, and POST retain original cache semantics", () => {
  const other = html();
  assert.strictEqual(applyHashedModuleDocumentCachePolicy(req("/article/example"), other), other);
  const asset = new Response("export const a=1", { headers: { "Content-Type": "text/javascript",
    "Cache-Control": "public, max-age=31536000, immutable" } });
  assert.strictEqual(applyHashedModuleDocumentCachePolicy(req("/property-tax/taxing-unit/ennis-isd"), asset), asset);
  const missing = html(404);
  assert.strictEqual(applyHashedModuleDocumentCachePolicy(req("/property-tax/taxing-unit/ennis-isd"), missing), missing);
  const post = html();
  assert.strictEqual(applyHashedModuleDocumentCachePolicy(req("/property-tax/taxing-unit/ennis-isd", "POST"), post), post);
});
