import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchTextWithRetry } from './audit-fetch.mjs';

const html = '<html><title>Texas ISDs</title><h1>Texas football by ISD</h1></html>';
const response = (status, body = html) => ({ status, text: async () => body });

test('retries one abort and then returns real HTML without masking a bad page', async () => {
  let calls = 0;
  const result = await fetchTextWithRetry('https://texasdefined.com/texas-high-school-football-isds', {
    attempts: 3, backoffMs: 0, timeoutMs: 100,
    fetchImpl: async () => {
      calls++;
      if (calls === 1) throw Object.assign(new Error('This operation was aborted'), { name: 'AbortError' });
      return response(200);
    },
  });
  assert.equal(calls, 2);
  assert.equal(result.response.status, 200);
  assert.match(result.body, /Texas football by ISD/);
});

test('does not retry a genuine 404 page', async () => {
  let calls = 0;
  const result = await fetchTextWithRetry('https://texasdefined.com/absent', {
    attempts: 3, backoffMs: 0,
    fetchImpl: async () => { calls++; return response(404, 'Not found'); },
  });
  assert.equal(calls, 1);
  assert.equal(result.response.status, 404);
});

test('retries one 503 and returns next successful HTML response', async () => {
  let calls = 0;
  const result = await fetchTextWithRetry('https://texasdefined.com/texas-high-school-football-isds', {
    attempts: 3, backoffMs: 0,
    fetchImpl: async () => response(++calls === 1 ? 503 : 200),
  });
  assert.equal(calls, 2);
  assert.equal(result.response.status, 200);
});

test('persistent timeout still fails after finite attempts', async () => {
  let calls = 0;
  await assert.rejects(() => fetchTextWithRetry('https://texasdefined.com/texas-high-school-football-isds', {
    attempts: 3, backoffMs: 0,
    fetchImpl: async () => { calls++; throw Object.assign(new Error('This operation was aborted'), { name: 'AbortError' }); },
  }), /aborted/);
  assert.equal(calls, 3);
});

test('persistent HTTP 503 remains visible as a failed HTTP response', async () => {
  let calls = 0;
  const result = await fetchTextWithRetry('https://texasdefined.com/texas-high-school-football-isds', {
    attempts: 3, backoffMs: 0,
    fetchImpl: async () => { calls++; return response(503, 'Service unavailable'); },
  });
  assert.equal(calls, 3);
  assert.equal(result.response.status, 503);
});
