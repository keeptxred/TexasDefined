import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchFishingParityText } from './fishing-parity-http.mjs';

const url = 'https://texasdefined.com/sitemap-index.xml';
const timeout = () => Object.assign(new Error('operation timed out'), { name: 'TimeoutError' });

test('one transient transport timeout retries once and keeps original sitemap bytes unchanged', async () => {
  let attempts = 0;
  const retries = [];
  const text = await fetchFishingParityText(url, {
    fetchImpl: async (_url, opts) => {
      attempts++;
      assert.equal(_url, url);
      assert.equal(opts.headers['user-agent'], 'TexasDefinedProductionAcceptance/1.0');
      assert.ok(opts.signal);
      if (attempts === 1) throw timeout();
      return new Response('<sitemapindex><loc>https://texasdefined.com/sitemap.xml</loc></sitemapindex>', {status: 200});
    },
    sleep: async () => {},
    onRetry: (event) => retries.push(event),
  });
  assert.equal(attempts, 2);
  assert.match(text, /<sitemapindex>/);
  assert.deepEqual(retries, [{ url, attempt: 1, reason: 'timeout', maxAttempts: 2 }]);
});

test('second timeout fails closed with exact URL and no unbounded retry', async () => {
  let attempts = 0;
  await assert.rejects(() => fetchFishingParityText(url, {
    fetchImpl: async () => { attempts++; throw timeout(); },
    sleep: async () => {},
  }), /sitemap-index\.xml: timed out on attempt 2\/2/);
  assert.equal(attempts, 2);
});

test('HTTP 404, 500 and malformed successful content never get a transport retry or fabricated replacement', async () => {
  for (const status of [404, 500]) {
    let attempts = 0;
    await assert.rejects(() => fetchFishingParityText(url, {
      fetchImpl: async () => { attempts++; return new Response('no', {status}); },
      sleep: async () => {},
    }), new RegExp('HTTP ' + status));
    assert.equal(attempts, 1);
  }
  let attempts = 0;
  assert.equal(await fetchFishingParityText(url, {
    fetchImpl: async () => { attempts++; return new Response('<html>incorrect sitemap</html>', {status: 200}); },
  }), '<html>incorrect sitemap</html>');
  assert.equal(attempts, 1, 'the caller retains strict sitemap, robots and canonical content assertions');
});

test('response body abort permits only one fresh timeout retry', async () => {
  let attempts = 0;
  const text = await fetchFishingParityText(url, {
    fetchImpl: async () => {
      attempts++;
      return {
        ok: true,
        text: async () => {
          if (attempts === 1) throw Object.assign(new Error('aborted'), { name: 'AbortError' });
          return '<ok/>';
        },
      };
    },
    sleep: async () => {},
  });
  assert.equal(text, '<ok/>');
  assert.equal(attempts, 2);
});
