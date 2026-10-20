import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const scriptUrl = pathToFileURL(resolve('scripts/ci/wait-for-cloudflare-git-build.mjs')).href;

// Exercise the real module in separate Node processes. Never contact GitHub,
// Cloudflare or other networks: every request is replaced with a mock.
const harness = `
const replies = JSON.parse(process.env.MOCK_CHECK_RESPONSES);
let calls = 0;
globalThis.fetch = async () => {
  const result = replies[Math.min(calls++, replies.length - 1)];
  if (result === 'network') throw new Error('temporary network failure');
  return {
    ok: result === 200, status: result, statusText: 'mock response',
    json: async () => ({
      check_runs: [{
        name: 'Workers Builds: texasdefined-site',
        app: { slug: 'cloudflare-workers-and-pages' },
        id: 123, status: 'completed', conclusion: 'success',
      }],
    }),
  };
};
globalThis.setTimeout = (callback) => { queueMicrotask(callback); return 0; };
// The production module legitimately calls process.exit(0) once all Cloudflare
// checks settle. Capture the request count before that exit terminates the
// child process, so a successful path is fully asserted, not misread as NaN.
const { writeSync } = await import('node:fs');
const exitProcess = process.exit.bind(process);
process.exit = (code) => {
  // process.exit can discard buffered console output on piped stdout.
  writeSync(1, 'MOCK_FETCH_CALLS=' + calls + String.fromCharCode(10));
  exitProcess(code);
};
try {
  await import(process.env.MOCK_WAIT_SCRIPT_URL);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  console.log('MOCK_FETCH_CALLS=' + calls);
}
`;

function runMock(replies) {
  const result = spawnSync(process.execPath, ['--input-type=module', '--eval', harness], {
    encoding: 'utf8',
    timeout: 10_000,
    env: {
      ...process.env,
      GITHUB_EVENT_NAME: 'push',
      GITHUB_REPOSITORY: 'keeptxred/TexasDefined',
      GITHUB_SHA: '1234567890123456789012345678901234567890',
      GITHUB_TOKEN: 'mock-only-token',
      MOCK_WAIT_SCRIPT_URL: scriptUrl,
      MOCK_CHECK_RESPONSES: JSON.stringify(replies),
      CLOUDFLARE_GIT_BUILD_DISCOVERY_MS: '30000',
      CLOUDFLARE_GIT_BUILD_SETTLE_MS: '30000',
    },
  });
  assert.equal(result.error, undefined, String(result.error));
  const calls = Number(result.stdout.match(/MOCK_FETCH_CALLS=(\d+)/)?.[1]);
  return { ...result, calls };
}

test('a temporary GitHub HTTP 500 recovers and still checks Cloudflare completion', () => {
  const result = runMock([500, 200, 200]);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.calls, 3);
  assert.match(result.stdout, /Cloudflare Git build settled before protected deployment/);
});

test('rate limiting retries without skipping external-build serialization', () => {
  const result = runMock([429, 200, 200]);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.calls, 3);
});

test('temporary network failure retries then validates the Cloudflare check', () => {
  const result = runMock(['network', 200, 200]);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.calls, 3);
});

test('persistent HTTP 500 fails closed after four attempts', () => {
  const result = runMock([500, 500, 500, 500]);
  assert.equal(result.status, 1, result.stdout);
  assert.equal(result.calls, 4);
  assert.match(result.stderr, /HTTP 500/);
});

test('non-transient HTTP 403 fails immediately without retrying', () => {
  const result = runMock([403]);
  assert.equal(result.status, 1, result.stdout);
  assert.equal(result.calls, 1);
  assert.match(result.stderr, /HTTP 403/);
});
