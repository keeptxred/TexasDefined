import assert from 'node:assert/strict';
import { fetchText } from './indexnow-lib.mjs';

let timeoutAttempts = 0;
const recovered = await fetchText('https://example.test/sitemap.xml', {
  fetchImpl: async () => {
    timeoutAttempts += 1;
    if (timeoutAttempts === 1) throw new TypeError('fetch failed: ETIMEDOUT');
    return { ok: true, status: 200, text: async () => '<urlset></urlset>' };
  },
});
assert.equal(recovered, '<urlset></urlset>');
assert.equal(timeoutAttempts, 2, 'Transient network failure should be retried once');

let fatalAttempts = 0;
await assert.rejects(
  fetchText('https://example.test/sitemap.xml', {
    fetchImpl: async () => {
      fatalAttempts += 1;
      return { ok: false, status: 403, text: async () => 'Forbidden' };
    },
  }),
  /returned HTTP 403/,
);
assert.equal(fatalAttempts, 1, 'Permanent HTTP 403 must never be masked or retried');

let serverAttempts = 0;
const recovered503 = await fetchText('https://example.test/robots.txt', {
  fetchImpl: async () => {
    serverAttempts += 1;
    return serverAttempts === 1
      ? { ok: false, status: 503, text: async () => '' }
      : { ok: true, status: 200, text: async () => 'User-agent: Bingbot' };
  },
});
assert.equal(serverAttempts, 2);
assert.equal(recovered503, 'User-agent: Bingbot');
console.log('IndexNow transient network retry contract passed; permanent HTTP errors fail immediately.');
