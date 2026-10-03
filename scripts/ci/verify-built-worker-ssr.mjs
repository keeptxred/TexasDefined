import { appendFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';

const host = process.env.BUILT_WORKER_SMOKE_HOST || '127.0.0.1';
const port = Number.parseInt(process.env.BUILT_WORKER_SMOKE_PORT || '8799', 10);
const origin = `http://${host}:${port}`;
const rootRequiredText = process.env.BUILT_WORKER_SMOKE_REQUIRED_TEXT || 'Texas Defined';
const startupTimeoutMs = Math.max(5000, Number.parseInt(process.env.BUILT_WORKER_SMOKE_STARTUP_TIMEOUT_MS || '60000', 10) || 60000);
const requestTimeoutMs = Math.max(3000, Number.parseInt(process.env.BUILT_WORKER_SMOKE_REQUEST_TIMEOUT_MS || '10000', 10) || 10000);
const coldStartRequestTimeoutMs = Math.max(
  requestTimeoutMs,
  Number.parseInt(process.env.BUILT_WORKER_SMOKE_COLD_START_REQUEST_TIMEOUT_MS || '45000', 10) || 45000,
);
const targetAttempts = Math.max(1, Number.parseInt(process.env.BUILT_WORKER_SMOKE_TARGET_ATTEMPTS || '3', 10) || 3);
const retryDelayMs = Math.max(0, Number.parseInt(process.env.BUILT_WORKER_SMOKE_RETRY_DELAY_MS || '750', 10) || 750);
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const artifactDir = '.artifacts';
const logPath = `${artifactDir}/built-worker-ssr-smoke.log`;

const smokeTargets = [
  { path: '/', requiredText: rootRequiredText, label: 'homepage' },
  { path: '/best-places-to-go-camping-in-texas', requiredText: 'Best Places to Go Camping in Texas', label: 'camping guide' },
  { path: '/fishing/plan?species=largemouth-bass&species=crappie&q=Lake%20Conroe&sort=best', requiredText: 'matching lake', label: 'fishing finder multi-species' },
  { path: '/fishing/plan?lat=29.76&lng=-95.37&origin=Houston&sort=closest&view=map', requiredText: 'Map of matching Texas fishing lakes', label: 'fishing finder closest map' },
  { path: '/fishing/plan?species=catfish&shore=1&boat=1&guide=1&report=1', requiredText: 'More filters', label: 'fishing finder verified filters' },
  { path: '/fishing/techniques/soft-plastics', requiredText: 'How to Fish Soft Plastics in Texas', label: 'soft-plastics technique detail route' },
  { path: '/fishing/techniques/soft-plastics', requiredText: 'Related Fishing Techniques', label: 'soft-plastics related technique links' },
  { path: '/fishing/techniques/soft-plastics', requiredText: '/fishing/techniques/crankbaits', label: 'soft-plastics related crankbaits link' },
  { path: '/fishing/techniques/soft-plastics', requiredText: '/fishing/structure', label: 'soft-plastics structure authority link' },
  { path: '/fishing/techniques/soft-plastics', requiredText: '/fishing/vegetation', label: 'soft-plastics vegetation authority link' },
  { path: '/fishing/techniques/soft-plastics', requiredText: 'Rigging at a glance', label: 'soft-plastics rigging visual section' },
  { path: '/fishing/techniques/soft-plastics', requiredText: '/images/fishing/rigs/texas-rig.svg', label: 'soft-plastics Texas rig image' },
  { path: '/fishing/techniques/soft-plastics', requiredText: '/images/fishing/rigs/carolina-rig.svg', label: 'soft-plastics Carolina rig image' },
  { path: '/fishing/techniques/soft-plastics', requiredText: '/images/fishing/rigs/drop-shot.svg', label: 'soft-plastics drop-shot image' },
  { path: '/fishing/techniques/soft-plastics', requiredText: '/images/fishing/rigs/wacky-rig.svg', label: 'soft-plastics wacky-rig image' },
  { path: '/fishing/structure', requiredText: 'Fishing Structure and Cover in Texas Lakes', label: 'fishing structure authority guide' },
  { path: '/fishing/vegetation', requiredText: 'Fishing Aquatic Vegetation in Texas', label: 'fishing vegetation authority guide' },
  { path: '/fishing/techniques/crankbaits', requiredText: 'How to Fish Crankbaits in Texas', label: 'crankbaits technique detail route' },
  { path: '/fishing/techniques/spinnerbaits', requiredText: 'How to Fish Spinnerbaits in Texas', label: 'spinnerbaits technique detail route' },
  { path: '/fishing/techniques/topwater', requiredText: 'How to Fish Topwater in Texas', label: 'topwater technique detail route' },
  { path: '/fishing/techniques/trolling', requiredText: 'How to Fish Trolling in Texas', label: 'trolling technique detail route' },
  { path: '/fishing/techniques/vertical-jigging', requiredText: 'How to Fish Vertical Jigging in Texas', label: 'vertical-jigging technique detail route' },
  { path: '/fishing/techniques/jigs-and-minnows', requiredText: 'How to Fish Jigs and Minnows in Texas', label: 'jigs-and-minnows technique detail route' },
  { path: '/fishing/techniques/live-bait', requiredText: 'How to Fish Live Bait in Texas', label: 'live-bait technique detail route' },
  { path: '/fishing/techniques/cut-bait', requiredText: 'How to Fish Cut Bait in Texas', label: 'cut-bait technique detail route' },
  { path: '/fishing/techniques/cut-bait', requiredText: 'What Cut Bait Is Legal in Texas?', label: 'cut-bait legal-bait authority content' },
  { path: '/fishing/techniques/cut-bait', requiredText: 'Three Useful Cut-Bait Rig Layouts', label: 'cut-bait rigging authority content' },
  { path: '/fishing/guides/submit', requiredText: 'Submit, claim or correct a Texas fishing-guide listing.', label: 'fishing guide submission child route' },
  { path: '/fishing/reports/submit', requiredText: 'Submit a dated fishing report for verification.', label: 'fishing report submission child route' },
  { path: '/fishing/lakes/o-h-ivie-lake', requiredText: 'O.H. Ivie Lake', label: 'O.H. Ivie complete fishing guide' },
  { path: '/fishing/lakes/lake-travis', requiredText: 'Lake Travis', label: 'Lake Travis complete fishing guide' },
  { path: '/fishing/lakes/lake-whitney', requiredText: 'Lake Whitney', label: 'Lake Whitney complete fishing guide' },
  { path: '/fishing/lakes/lake-tawakoni', requiredText: 'Lake Tawakoni', label: 'Lake Tawakoni complete fishing guide' },
  { path: '/fishing/lakes/falcon-international-reservoir', requiredText: 'Falcon International Reservoir', label: 'Falcon complete fishing guide' },
  { path: '/fishing/lakes/lake-travis/fish', requiredText: 'Lake Travis', label: 'Lake Travis shared fish section' },
  { path: '/fishing/plan?species=largemouth-bass&q=Austin&sort=best', requiredText: 'Lake Travis', label: 'wave-2 Austin largemouth finder' },
  { path: '/guides/citypass-texas', requiredText: 'CityPASS® is a bundle, not a magic discount.', label: 'guide child route body' },
  { path: '/explore/landscapes/hill-country', requiredText: 'The Hill Country is where the Edwards Plateau breaks into rounded hills', label: 'landscape child route body' },
  { path: '/sports/friday-night-lights', requiredText: 'Friday Night Lights, Defined', label: 'sports child route body' },
  { path: '/texas-data/county-growth', requiredText: 'Texas county population growth, 2020–2025', label: 'Texas Data child route body' },
];

const redirectTargets = [
  { path: '/fishing/fishing/techniques/soft-plastics?source=smoke', expectedStatus: 301, expectedPath: '/fishing/techniques/soft-plastics', expectedQuery: ['source', 'smoke'], label: 'duplicated fishing technique path normalization' },
];

const renderRouteGroups = [...smokeTargets.reduce((groups, target) => {
  const existing = groups.get(target.path);
  if (existing) existing.checks.push(target);
  else groups.set(target.path, { path: target.path, checks: [target] });
  return groups;
}, new Map()).values()];

mkdirSync(artifactDir, { recursive: true });
writeFileSync(logPath, '');

const wranglerExecutable = path.resolve(process.platform === 'win32' ? 'node_modules/.bin/wrangler.cmd' : 'node_modules/.bin/wrangler');
const child = spawn(wranglerExecutable, ['dev', '--config', 'dist/server/wrangler.json', '--local', '--ip', host, '--port', String(port)], {
  cwd: process.cwd(),
  env: { ...process.env, CI: 'true', NO_COLOR: '1' },
  stdio: ['ignore', 'pipe', 'pipe'],
  detached: process.platform !== 'win32',
});

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

function signalChild(signal) {
  if (child.exitCode !== null) return;
  try {
    if (process.platform !== 'win32' && child.pid) process.kill(-child.pid, signal);
    else child.kill(signal);
  } catch {
    child.kill(signal);
  }
}

async function stopChild() {
  if (child.exitCode !== null) return;
  signalChild('SIGTERM');
  await Promise.race([new Promise((resolve) => child.once('exit', resolve)), sleep(3000)]);
  if (child.exitCode === null) {
    signalChild('SIGKILL');
    await Promise.race([new Promise((resolve) => child.once('exit', resolve)), sleep(1000)]);
  }
}

async function waitForWranglerReady() {
  const startedAt = Date.now();
  while (Date.now() - startedAt < startupTimeoutMs) {
    if (child.exitCode !== null) return `Wrangler dev exited before readiness completed (exit ${child.exitCode}).`;
    if (captured.includes(`Ready on ${origin}`) || captured.includes('Ready on http://')) {
      console.log('Wrangler local runtime reported ready; beginning SSR route verification.');
      return '';
    }
    await sleep(100);
  }
  return `Wrangler dev did not report readiness within ${startupTimeoutMs}ms.`;
}

const lastStatus = new Map([...renderRouteGroups, ...redirectTargets].map((target) => [target.path, 'not-run']));

function smokeUrl(targetPath, attemptToken) {
  const url = new URL(targetPath, origin);
  url.searchParams.set('built_worker_smoke', `${process.env.GITHUB_SHA || 'local'}-${attemptToken}`);
  return url;
}

const requestHeaders = {
  'cache-control': 'no-cache, no-store, max-age=0',
  pragma: 'no-cache',
  'user-agent': 'TexasDefined-CI-Built-Worker-Smoke/1.0',
};

async function checkRenderRoute(group, attemptToken, timeoutMs = requestTimeoutMs) {
  try {
    const response = await fetch(smokeUrl(group.path, attemptToken), { redirect: 'follow', cache: 'no-store', headers: requestHeaders, signal: AbortSignal.timeout(timeoutMs) });
    lastStatus.set(group.path, String(response.status));
    const body = await response.text();
    if (response.status === 200) {
      const missingChecks = group.checks.filter((check) => !body.includes(check.requiredText));
      if (missingChecks.length) return `${group.path} returned HTTP 200 without required marker(s): ${missingChecks.map((check) => `${check.label}=${check.requiredText}`).join(', ')}`;
      return '';
    }
    return `${group.path} returned HTTP ${response.status}`;
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    lastStatus.set(group.path, 'network-error');
    return `${group.path} failed: ${detail}`;
  }
}

async function checkRedirectTarget(target, attemptToken) {
  try {
    const url = smokeUrl(target.path, attemptToken);
    const response = await fetch(url, { redirect: 'manual', cache: 'no-store', headers: requestHeaders, signal: AbortSignal.timeout(requestTimeoutMs) });
    lastStatus.set(target.path, String(response.status));
    const location = response.headers.get('location');
    const redirectedUrl = location ? new URL(location, url) : null;
    const queryMatches = redirectedUrl?.searchParams.get(target.expectedQuery[0]) === target.expectedQuery[1] && Boolean(redirectedUrl?.searchParams.get('built_worker_smoke'));
    if (response.status === target.expectedStatus && redirectedUrl?.pathname === target.expectedPath && queryMatches) return '';
    return `${target.label} (${target.path}) expected HTTP ${target.expectedStatus} -> ${target.expectedPath} with query preserved; got HTTP ${response.status} -> ${location || 'no location'}`;
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    lastStatus.set(target.path, 'network-error');
    return `${target.label} (${target.path}) failed: ${detail}`;
  }
}

async function verifyWithRetries(target, checker, label) {
  let failure = '';
  for (let attempt = 1; attempt <= targetAttempts; attempt += 1) {
    if (child.exitCode !== null) return `Wrangler dev exited during ${label} verification (exit ${child.exitCode}).`;
    const timeoutMs = target.path === '/' && attempt === 1 ? coldStartRequestTimeoutMs : requestTimeoutMs;
    failure = await checker(target, `${label.replaceAll(' ', '-')}-${attempt}`, timeoutMs);
    if (!failure) {
      if (attempt > 1) console.log(`${label} passed on retry ${attempt}/${targetAttempts}.`);
      return '';
    }
    if (attempt < targetAttempts) {
      console.log(`${label} attempt ${attempt}/${targetAttempts} failed: ${failure}. Retrying.`);
      await sleep(retryDelayMs);
    }
  }
  return failure;
}

try {
  const readinessFailure = await waitForWranglerReady();
  const failures = [];
  if (readinessFailure) {
    failures.push(readinessFailure);
  } else {
    for (const group of renderRouteGroups) {
      const label = `render route ${group.path}`;
      const failure = await verifyWithRetries(group, checkRenderRoute, label);
      if (failure) failures.push(failure);
      else console.log(`[route] verified (200): ${group.path} (${group.checks.length} marker check${group.checks.length === 1 ? '' : 's'})`);
    }
    for (const target of redirectTargets) {
      const label = `redirect route ${target.path}`;
      const failure = await verifyWithRetries(target, checkRedirectTarget, label);
      if (failure) failures.push(failure);
      else console.log(`[redirect] verified (${target.expectedStatus}): ${target.path} -> ${target.expectedPath}`);
    }
  }

  if (!failures.length) {
    console.log(`Built Worker SSR smoke passed: ${renderRouteGroups.length} unique render route(s), ${smokeTargets.length} marker check(s), and ${redirectTargets.length} redirect target(s) passed.`);
    if (summaryPath) appendFileSync(summaryPath, `| ✅ pass | Built Worker SSR smoke | ${renderRouteGroups.length} render routes / ${smokeTargets.length} marker checks + ${redirectTargets.length} redirect target(s) | per-route retries: ${targetAttempts} |\n`);
  } else {
    const failure = failures.join('; ');
    const statuses = [...renderRouteGroups, ...redirectTargets].map((target) => `${target.path}=${lastStatus.get(target.path)}`).join(', ');
    if (summaryPath) appendFileSync(summaryPath, `| ❌ FAIL | Built Worker SSR smoke | ${statuses} | predeploy local runtime |\n`);
    console.error(`::error title=Built Worker SSR smoke failed::${failure}`);
    if (captured.trim()) {
      const tail = captured.trim().split('\n').slice(-120).join('\n');
      console.error('Wrangler local-runtime tail:');
      console.error(tail);
    }
    process.exitCode = 1;
  }
} finally {
  await stopChild();
}
