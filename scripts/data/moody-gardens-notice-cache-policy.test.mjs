import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  MOODY_GARDENS_NOTICE_CACHE_WINDOW,
  shouldPreventMoodyGardensNoticeCaching,
  applyMoodyGardensNoticeCachePolicy,
} from "../../src/lib/moody-gardens-notice-cache-policy.ts";

const url = "https://texasdefined.com/destination/moody-gardens";
const active = Date.parse("2026-11-16T19:00:00Z");
const html = () => new Response("<!doctype html><title>Moody Gardens</title>", {
  status: 200,
  headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, s-maxage=86400", age: "123" },
});

test("cache guard protects the full event window and one-hour post-expiry boundary", () => {
  assert.equal(shouldPreventMoodyGardensNoticeCaching("/destination/moody-gardens", Date.parse("2026-11-12T23:59:59Z")), false);
  assert.equal(shouldPreventMoodyGardensNoticeCaching("/destination/moody-gardens", Date.parse(MOODY_GARDENS_NOTICE_CACHE_WINDOW.startsAt)), true);
  assert.equal(shouldPreventMoodyGardensNoticeCaching("/destination/moody-gardens", Date.parse("2026-11-17T05:59:59Z")), true);
  assert.equal(shouldPreventMoodyGardensNoticeCaching("/destination/moody-gardens", Date.parse("2026-11-17T06:00:00Z")), true);
  assert.equal(shouldPreventMoodyGardensNoticeCaching("/destination/moody-gardens", Date.parse(MOODY_GARDENS_NOTICE_CACHE_WINDOW.expiresAt)), false);
  assert.equal(shouldPreventMoodyGardensNoticeCaching("/destination/moody-gardens", NaN), false);
});

test("canonical HTML carries no-store headers to browsers and both CDN cache layers", async () => {
  const response = applyMoodyGardensNoticeCachePolicy(new Request(url), html(), active);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store, max-age=0");
  assert.equal(response.headers.get("cdn-cache-control"), "no-store");
  assert.equal(response.headers.get("cloudflare-cdn-cache-control"), "no-store");
  assert.equal(response.headers.get("age"), null);
  assert.match(await response.text(), /Moody Gardens/);
});

test("matching HEAD metadata is protected, but non-HTML errors are not modified", () => {
  const req = new Request(url, { method: "HEAD" });
  const ok = new Response(null, { status: 200, headers: { "content-type": "text/html", "cache-control": "public,max-age=3600" } });
  assert.match(applyMoodyGardensNoticeCachePolicy(req, ok, active).headers.get("cache-control") ?? "", /no-store/);
  const failed = new Response("Unavailable", { status: 404, headers: { "content-type": "text/html" } });
  assert.equal(applyMoodyGardensNoticeCachePolicy(new Request(url), failed, active), failed);
  const json = new Response("{}", { headers: { "content-type": "application/json" } });
  assert.equal(applyMoodyGardensNoticeCachePolicy(new Request(url), json, active), json);
});

test("other routes, methods and post-window responses retain their original cache policy", () => {
  const other = html();
  assert.equal(applyMoodyGardensNoticeCachePolicy(new Request("https://texasdefined.com/destination/texas-state-aquarium"), other, active), other);
  assert.equal(applyMoodyGardensNoticeCachePolicy(new Request(url + "/extra"), other, active), other);
  assert.equal(applyMoodyGardensNoticeCachePolicy(new Request(url, { method: "POST" }), other, active), other);
  assert.equal(applyMoodyGardensNoticeCachePolicy(new Request(url), other, Date.parse("2026-11-17T07:00:00Z")), other);
});

test("Worker HTML response processing is actually wired to the cache policy", () => {
  const entry = readFileSync("src/server.ts", "utf8");
  assert.match(entry, /import \{ applyMoodyGardensNoticeCachePolicy \} from "\.\/lib\/moody-gardens-notice-cache-policy"/);
  assert.match(entry, /const cacheSafeResponse = applyMoodyGardensNoticeCachePolicy\(request,/);
});

test("scheduled Nov 14-17 checks verify active/expired ordinary HTML and deduplicate alerts", () => {
  const workflow = readFileSync(".github/workflows/check-moody-gardens-authority.yml", "utf8");
  const acceptance = readFileSync("scripts/production/verify-moody-gardens-production.mjs", "utf8");
  assert.match(workflow, /cron: "10 14 14-16 11 \*"/);
  assert.match(workflow, /cron: "30 6 17 11 \*"/);
  assert.match(workflow, /Nov\. 16 advisory expires/);
  assert.match(workflow, /id: live_notice/);
  assert.match(workflow, /steps\.live_notice\.outcome == 'failure'/);
  assert.match(workflow, /node scripts\/production\/verify-moody-gardens-production\.mjs/);
  assert.match(acceptance, /const ordinary = await fetch\(rawUrl/);
  assert.match(acceptance, /ordinaryNoticeCorrect = earlyClosingNoticeActive/);
  assert.match(acceptance, /ordinary\.headers\.get\("cf-cache-status"\)/);
});
