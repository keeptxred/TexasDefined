import assert from 'node:assert/strict';
import test from 'node:test';
import { fetchLiveDistrict5Html } from './district5-transient-http.mjs';

const url = new URL('https://texasdefined.com/texas-high-school-football-districts/6a-district-5?district5_acceptance=test');

function timeout() {
  const error = new Error('The operation was aborted due to timeout');
  error.name = 'TimeoutError';
  return error;
}
const ok = (html = '<!doctype html><main>source-backed District 5 records</main>') => ({
  status: 200,
  text: async () => html,
});

test('retries a single transient timeout against the exact URL, then accepts valid HTML', async () => {
  const calls = [];
  const waits = [];
  const html = await fetchLiveDistrict5Html(url, url.origin, {
    fetchImpl: async (nextUrl, options) => {
      calls.push({ url: nextUrl.toString(), options });
      if (calls.length === 1) throw timeout();
      return ok();
    },
    sleep: async (ms) => { waits.push(ms); },
  });
  assert.match(html, /source-backed District 5 records/);
  assert.equal(calls.length, 2);
  assert.deepEqual(waits, [750]);
  assert.equal(calls[0].url, calls[1].url);
  assert.equal(calls[0].options.headers['cache-control'], 'no-cache');
  assert.equal(calls[1].options.headers['accept'], 'text/html');
});

test('does not retry an HTTP failure even if status is 503', async () => {
  let calls = 0;
  await assert.rejects(() => fetchLiveDistrict5Html(url, url.origin, {
    fetchImpl: async () => { calls++; return { status: 503 }; },
    sleep: async () => { throw new Error('HTTP failure must never sleep for retry'); },
  }), /returned 503/);
  assert.equal(calls, 1);
});

test('does not retry a non-transient application exception', async () => {
  let calls = 0;
  await assert.rejects(() => fetchLiveDistrict5Html(url, url.origin, {
    fetchImpl: async () => { calls++; throw new Error('invalid credential'); },
    sleep: async () => { throw new Error('unexpected retry'); },
  }), /invalid credential/);
  assert.equal(calls, 1);
});

test('retries an aborted response body, not just request headers', async () => {
  let calls = 0;
  const html = await fetchLiveDistrict5Html(url, url.origin, {
    fetchImpl: async () => {
      calls++;
      if (calls === 1) return { status: 200, text: async () => { throw timeout(); } };
      return ok('body accepted');
    },
    sleep: async () => {},
  });
  assert.equal(html, 'body accepted');
  assert.equal(calls, 2);
});

test('fails closed after at most three transient errors and preserves the cause', async () => {
  let calls = 0;
  const waits = [];
  await assert.rejects(() => fetchLiveDistrict5Html(url, url.origin, {
    fetchImpl: async () => { calls++; throw timeout(); },
    sleep: async (ms) => { waits.push(ms); },
  }), (error) => {
    assert.match(error.message, /after 3 attempt\(s\)/);
    assert.equal(error.cause.name, 'TimeoutError');
    return true;
  });
  assert.equal(calls, 3);
  assert.deepEqual(waits, [750, 1500]);
});

test('rejects an unbounded retry configuration before any requests', async () => {
  let calls = 0;
  await assert.rejects(() => fetchLiveDistrict5Html(url, url.origin, {
    attempts: 100,
    fetchImpl: async () => { calls++; return ok(); },
  }), /bounded between 1 and 3/);
  assert.equal(calls, 0);
});
