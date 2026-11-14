import assert from 'node:assert/strict';
import test from 'node:test';
import { fetchLiveHtmlWithRetry } from './fetch-live-html-with-retry.mjs';

const instant = async () => {};

test('recovers once from network timeout and returns the actual successful HTML', async () => {
  let calls = 0;
  const result = await fetchLiveHtmlWithRetry('https://example.invalid/sitemap-index.xml', {
    sleep: instant, attempts: 3,
    fetchImpl: async () => {
      calls++;
      if (calls === 1) throw new DOMException('Request timed out', 'TimeoutError');
      return new Response('<urlset><loc>real source</loc></urlset>', { status: 200 });
    },
  });
  assert.equal(result.attempt, 2);
  assert.equal(result.response.status, 200);
  assert.match(result.html, /real source/);
  assert.equal(calls, 2);
});

test('retries a transient 503 but never changes a 404 into a success', async () => {
  let calls = 0;
  const recovered = await fetchLiveHtmlWithRetry('https://example.invalid', {
    sleep: instant,
    fetchImpl: async () => new Response(++calls === 1 ? 'unavailable' : 'real page', {
      status: calls === 1 ? 503 : 200,
    }),
  });
  assert.equal(recovered.attempt, 2);
  assert.equal(recovered.html, 'real page');
  calls = 0;
  const missing = await fetchLiveHtmlWithRetry('https://example.invalid/missing', {
    sleep: instant,
    fetchImpl: async () => { calls++; return new Response('missing', { status: 404 }); },
  });
  assert.equal(missing.response.status, 404);
  assert.equal(calls, 1);
});

test('retries body-read timeouts and fails closed after the bounded budget', async () => {
  let reads = 0;
  const result = await fetchLiveHtmlWithRetry('https://example.invalid/article', {
    sleep: instant,
    fetchImpl: async () => ({
      status: 200,
      async text() {
        reads++;
        if (reads === 1) throw new DOMException('slow body', 'TimeoutError');
        return 'fresh page';
      },
    }),
  });
  assert.equal(result.html, 'fresh page');
  assert.equal(reads, 2);

  let calls = 0;
  await assert.rejects(fetchLiveHtmlWithRetry('https://example.invalid/timeout', {
    sleep: instant, attempts: 3,
    fetchImpl: async () => {
      calls++;
      throw new DOMException('always timed out', 'TimeoutError');
    },
  }), /always timed out/);
  assert.equal(calls, 3);
});

test('rejects unbounded requests and does not retry non-network programming errors', async () => {
  await assert.rejects(fetchLiveHtmlWithRetry('https://example.invalid', {
    attempts: 10, fetchImpl: async () => new Response('ok'),
  }), /bounded/);
  let calls = 0;
  await assert.rejects(fetchLiveHtmlWithRetry('https://example.invalid', {
    sleep: instant,
    fetchImpl: async () => { calls++; throw new Error('invalid parser state'); },
  }), /invalid parser state/);
  assert.equal(calls, 1);
});
