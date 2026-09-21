import { appendFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';

const host = process.env.BUILT_WORKER_SMOKE_HOST || '127.0.0.1';
const port = Number.parseInt(process.env.BUILT_WORKER_SMOKE_PORT || '8799', 10);
const origin = `http://${host}:${port}`;
const requiredText = process.env.BUILT_WORKER_SMOKE_REQUIRED_TEXT || 'Texas Defined';
const startupTimeoutMs = Math.max(5000, Number.parseInt(process.env.BUILT_WORKER_SMOKE_STARTUP_TIMEOUT_MS || '45000', 10) || 45000);
const requestTimeoutMs = Math.max(3000, Number.parseInt(process.env.BUILT_WORKER_SMOKE_REQUEST_TIMEOUT_MS || '10000', 10) || 10000);
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const artifactDir = '.artifacts';
const logPath = `${artifactDir}/built-worker-ssr-smoke.log`;

mkdirSync(artifactDir, { recursive: true });
writeFileSync(logPath, '');

const child = spawn(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  [
    '--no-install',
    'wrangler',
    'dev',
    '--config',
    'dist/server/wrangler.json',
    '--local',
    '--ip',
    host,
    '--port',
    String(port),
  ],
  {
    cwd: process.cwd(),
    env: {
      ...process.env,
      CI: 'true',
      NO_COLOR: '1',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  },
);

let captured = '';
const capture = (chunk) => {
  const text = chunk.toString();
  captured += text;
  appendFileSync(logPath, text);
  process.stdout.write(text);
};
child.stdout.on('data', capture);
child.stderr.on('data', capture);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function stopChild() {
  if (child.exitCode !== null) return;
  child.kill('SIGTERM');
  await Promise.race([
    new Promise((resolve) => child.once('exit', resolve)),
    sleep(3000),
  ]);
  if (child.exitCode === null) child.kill('SIGKILL');
}

let failure = '';
let responseStatus = 'not-run';

try {
  const startedAt = Date.now();
  let attempt = 0;

  while (Date.now() - startedAt < startupTimeoutMs) {
    attempt += 1;

    if (child.exitCode !== null) {
      failure = `Wrangler dev exited before the smoke request completed (exit ${child.exitCode}).`;
      break;
    }

    try {
      const url = new URL('/', origin);
      url.searchParams.set('built_worker_smoke', `${process.env.GITHUB_SHA || 'local'}-${attempt}`);
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        headers: {
          'cache-control': 'no-cache, no-store, max-age=0',
          pragma: 'no-cache',
          'user-agent': 'TexasDefined-CI-Built-Worker-Smoke/1.0',
        },
        signal: AbortSignal.timeout(requestTimeoutMs),
      });
      responseStatus = String(response.status);
      const body = await response.text();

      if (response.status === 200 && body.includes(requiredText)) {
        console.log(`Built Worker SSR smoke passed on attempt ${attempt}: HTTP 200 with required marker.`);
        if (summaryPath) appendFileSync(summaryPath, `| ✅ pass | Built Worker SSR smoke | HTTP 200 | ${attempt} attempt(s) |\n`);
        process.exitCode = 0;
        break;
      }

      failure = response.status !== 200
        ? `Built Worker returned HTTP ${response.status}.`
        : `Built Worker returned HTTP 200 without required marker: ${requiredText}`;
      console.log(`Built Worker SSR smoke attempt ${attempt} not ready: ${failure}`);
    } catch (error) {
      failure = error instanceof Error ? error.message : String(error);
      console.log(`Built Worker SSR smoke attempt ${attempt} not ready: ${failure}`);
    }

    await sleep(1000);
  }

  if (process.exitCode !== 0) {
    if (!failure) failure = `Built Worker did not become healthy within ${startupTimeoutMs}ms.`;
    if (summaryPath) appendFileSync(summaryPath, `| ❌ FAIL | Built Worker SSR smoke | ${responseStatus} | predeploy local runtime |\n`);
    console.error(`::error title=Built Worker SSR smoke failed::${failure}`);
    if (captured.trim()) {
      const tail = captured.trim().split('\n').slice(-80).join('\n');
      console.error('Wrangler local-runtime tail:');
      console.error(tail);
    }
    process.exitCode = 1;
  }
} finally {
  await stopChild();
}
