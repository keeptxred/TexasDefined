import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchPlayoffGuideHtml } from './playoff-guide-http.mjs';

const url = 'https://texasdefined-site.freddy-coppola.workers.dev/article/texas-high-school-football-playoffs-explained';
const timeout = (name = 'TimeoutError') => Object.assign(new Error('timeout'), { name });

test('one direct Worker timeout retries exactly once and keeps headers and original HTML', async () => {
  let calls = 0;
  const retries = [];
  const { response, html, attempts } = await fetchPlayoffGuideHtml(url, {
    fetchImpl: async (requestedUrl, options) => {
      calls++;
      assert.equal(requestedUrl, url);
      assert.equal(options.cache, 'no-store');
      assert.equal(options.headers.Accept, 'text/html');
      assert.equal(options.redirect, 'follow');
      assert.ok(options.signal);
      if (calls === 1) throw timeout();
      return new Response('Updated November 6, 2026', {
        status: 200,
        headers: { 'cache-control': 'no-store, max-age=0' },
      });
    },
    onRetry: (event) => retries.push(event),
    sleep: async () => {},
  });
  assert.equal(calls, 2);
  assert.equal(attempts, 2);
  assert.equal(html, 'Updated November 6, 2026');
  assert.match(response.headers.get('cache-control'), /no-store/);
  assert.deepEqual(retries, [{ url, attempt: 1, reason: 'timeout', maxAttempts: 2 }]);
});

test('second timeout fails closed with the requested URL and bounded attempt count', async () => {
  let calls = 0;
  await assert.rejects(() => fetchPlayoffGuideHtml(url, {
    fetchImpl: async () => { calls++; throw timeout(); },
    sleep: async () => {},
  }), /timed out on attempt 2\/2/);
  assert.equal(calls, 2);
});

test('non-timeout HTTP response and incorrect article content remain unchanged for caller assertions', async () => {
  let calls = 0;
  const { response, html, attempts } = await fetchPlayoffGuideHtml(url, {
    fetchImpl: async () => {
      calls++;
      return new Response('outdated guide', {status: 503, headers: {'cache-control':'no-store'}});
    },
    sleep: async () => {},
  });
  assert.equal(calls, 1);
  assert.equal(attempts, 1);
  assert.equal(response.status, 503);
  assert.equal(html, 'outdated guide');
  assert.notEqual(response.status, 200);
});

test('response body AbortError also gets one new request but no more', async () => {
  let calls = 0;
  const result = await fetchPlayoffGuideHtml(url, {
    fetchImpl: async () => {
      calls++;
      return {
        ok: true, status: 200, headers: new Headers({ 'cache-control': 'no-store' }),
        text: async () => { if (calls === 1) throw timeout('AbortError'); return 'correct body'; },
      };
    },
    sleep: async () => {},
  });
  assert.equal(calls, 2);
  assert.equal(result.html, 'correct body');
});
