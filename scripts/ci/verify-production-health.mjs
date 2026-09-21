import { appendFileSync } from 'node:fs';

const origin = String(process.env.PRODUCTION_HEALTH_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const label = process.env.PRODUCTION_HEALTH_LABEL || 'production';
const requiredText = process.env.PRODUCTION_HEALTH_REQUIRED_TEXT || 'Texas Defined';
const attempts = Math.max(2, Number.parseInt(process.env.PRODUCTION_HEALTH_ATTEMPTS || '18', 10) || 18);
const delayMs = Math.max(1000, Number.parseInt(process.env.PRODUCTION_HEALTH_DELAY_MS || '5000', 10) || 5000);
const timeoutMs = Math.max(3000, Number.parseInt(process.env.PRODUCTION_HEALTH_TIMEOUT_MS || '10000', 10) || 10000);
const requiredConsecutive = 2;
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const runId = process.env.GITHUB_RUN_ID || Date.now().toString();
const sha = process.env.GITHUB_SHA || 'local';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let consecutive = 0;
let lastStatus = 'not-run';
let lastReason = 'No request completed.';
let lastSample = '';

for (let attempt = 1; attempt <= attempts; attempt += 1) {
  const url = new URL('/', origin);
  url.searchParams.set('health_check', `${sha}-${runId}-${attempt}`);

  try {
    const response = await fetch(url, {
      redirect: 'follow',
      cache: 'no-store',
      headers: {
        'cache-control': 'no-cache, no-store, max-age=0',
        pragma: 'no-cache',
        'user-agent': 'TexasDefined-CI-Production-Health/1.0',
      },
      signal: AbortSignal.timeout(timeoutMs),
    });

    lastStatus = String(response.status);
    const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
    const body = await response.text();
    lastSample = body.slice(0, 600).replace(/\s+/g, ' ');
    const hasMarker = body.includes(requiredText);

    if (!challenged && response.status === 200 && hasMarker) {
      consecutive += 1;
      console.log(`[${label}] health attempt ${attempt}/${attempts}: HTTP 200 with required marker (${consecutive}/${requiredConsecutive} consecutive).`);
      if (consecutive >= requiredConsecutive) {
        if (summaryPath) appendFileSync(summaryPath, `| ✅ pass | ${label} health | HTTP 200 | ${attempt} attempt(s) |\n`);
        console.log(`[${label}] production health passed after ${attempt} attempt(s).`);
        process.exit(0);
      }
    } else {
      consecutive = 0;
      if (challenged) lastReason = 'Cloudflare returned cf-mitigated: challenge';
      else if (response.status !== 200) lastReason = `HTTP ${response.status}`;
      else lastReason = `HTTP 200 but required marker was missing: ${requiredText}`;
      console.log(`[${label}] health attempt ${attempt}/${attempts} failed: ${lastReason}.`);
    }
  } catch (error) {
    consecutive = 0;
    lastStatus = 'network-error';
    lastReason = error instanceof Error ? error.message : String(error);
    console.log(`[${label}] health attempt ${attempt}/${attempts} failed: ${lastReason}.`);
  }

  if (attempt < attempts) await sleep(delayMs);
}

if (summaryPath) {
  appendFileSync(summaryPath, `| ❌ FAIL | ${label} health | ${lastStatus} | ${attempts} attempt(s) |\n`);
}
console.error(`::error title=${label} production health failed::${lastReason}`);
if (lastSample) console.error(`[${label}] final response sample: ${lastSample}`);
process.exit(1);
