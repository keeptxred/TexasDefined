import assert from "node:assert/strict";
import { fetchCachedRemoteJsonRows } from "../../src/data/remote-read-cache.server.ts";

const originalFetch = globalThis.fetch;
const originalNow = Date.now;
let now = 1_000_000;
Date.now = () => now;

function read(testCase) {
  return fetchCachedRemoteJsonRows({
    cacheKey: "regression-" + testCase,
    url: "https://example.invalid/rest/v1/" + testCase,
    headers: { apikey: "test" },
    timeoutMs: 2500,
    errorLabel: testCase,
  });
}

try {
  let calls = 0;
  globalThis.fetch = async (_url, init) => {
    calls += 1;
    assert.ok(init.signal instanceof AbortSignal, "upstream reads must remain abortable");
    return { ok: true, json: async () => ({ message: "not a PostgREST row array" }) };
  };
  await assert.rejects(read("malformed"), /invalid row collection/);
  await assert.rejects(read("malformed"), /backed off/);
  assert.equal(calls, 1, "bad responses must not trigger immediate retries");

  let resolveResponse;
  calls = 0;
  globalThis.fetch = (_url, init) => {
    calls += 1;
    assert.ok(init.signal instanceof AbortSignal);
    return new Promise((resolve) => { resolveResponse = resolve; });
  };
  const first = read("coalesce");
  const second = read("coalesce");
  assert.equal(calls, 1, "identical in-flight requests should share one fetch");
  resolveResponse({ ok: true, json: async () => [{ slug: "example" }] });
  assert.deepEqual(await Promise.all([first, second]), [[{ slug: "example" }], [{ slug: "example" }]]);
  assert.deepEqual(await read("coalesce"), [{ slug: "example" }]);
  assert.equal(calls, 1, "a fresh cached result should not re-fetch");

  calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return calls === 1
      ? { ok: true, json: async () => [{ slug: "previously-verified" }] }
      : { ok: false, status: 503 };
  };
  assert.equal((await read("stale"))[0].slug, "previously-verified");
  now += 5 * 60 * 1000 + 1;
  assert.equal((await read("stale"))[0].slug, "previously-verified", "transient failures may serve verified stale content");
  assert.equal(calls, 2);
  await read("stale");
  assert.equal(calls, 2, "failure backoff must prevent another fetch");
  now += 30 * 60 * 1000 + 1;
  await assert.rejects(read("stale"), /failed: 503/, "expired stale content must not be served indefinitely");

  console.log("Remote-read cache regression checks passed: malformed payload, coalescing, caching, abort signal, stale fallback, failure backoff, stale expiry.");
} finally {
  globalThis.fetch = originalFetch;
  Date.now = originalNow;
}
