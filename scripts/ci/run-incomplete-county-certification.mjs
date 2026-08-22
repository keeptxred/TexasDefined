import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const county = process.argv[2];
if (!county) {
  console.error('Usage: node scripts/ci/run-incomplete-county-certification.mjs <county>');
  process.exit(2);
}

const configPath = 'scripts/ci/incomplete-county-certification-config.json';
const configs = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const config = configs[county];
if (!config) {
  console.error(`Unknown incomplete county certification: ${county}`);
  process.exit(2);
}

const markerPath = `.github/certification/${county}-county.json`;
const detail = [];
const evidence = {
  county,
  display_name: config.displayName,
  status: 'fail',
  stage: 'startup',
  county_commit: config.targetSha || '',
  tested_main: '',
  detail: '',
  hero_http: '',
  hero_mime: '',
  hero_bytes: 0,
  page_http: '',
  legacy_http: '',
  legacy_location: '',
  recorded_at_utc: '',
};

const log = (message) => {
  const text = String(message ?? '');
  detail.push(text);
  console.log(text);
};

const tail = (text, max = 12000) => String(text ?? '').slice(-max);

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    timeout: options.timeout ?? 15 * 60 * 1000,
    env: process.env,
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (options.logOutput) {
    if (result.stdout) detail.push(tail(result.stdout));
    if (result.stderr) detail.push(tail(result.stderr));
  }
  return result;
};

const requireSuccess = (stage, command, args, options = {}) => {
  const result = run(command, args, options);
  if (result.status !== 0) {
    const error = new Error(`${command} ${args.join(' ')} failed with exit ${result.status}`);
    error.stage = stage;
    error.output = tail(`${result.stdout ?? ''}\n${result.stderr ?? ''}`);
    throw error;
  }
  return result;
};

const gitText = (...args) => {
  const result = spawnSync('git', args, { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(`git ${args.join(' ')} failed: ${tail(result.stderr)}`);
  return result.stdout.trim();
};

const parseHeader = (text, name) => {
  const prefix = `${name.toLowerCase()}:`;
  const values = String(text)
    .split(/\r?\n/)
    .filter((line) => line.toLowerCase().startsWith(prefix))
    .map((line) => line.slice(line.indexOf(':') + 1).trim());
  return values.at(-1) ?? '';
};

const curlAsset = (url, label) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `td-${county}-${label}-`));
  const headers = path.join(dir, 'headers');
  const body = path.join(dir, 'body');
  try {
    const result = spawnSync('curl', [
      '-A', 'TexasDefinedCountyVerifier/1.0 (+https://texasdefined.com)',
      '-L', '--retry', '5', '--retry-all-errors', '--retry-delay', '2',
      '--max-time', '90', '-sS', '-D', headers, '-o', body, '-w', '%{http_code}', url,
    ], { encoding: 'utf8', timeout: 120000 });
    const headerText = fs.existsSync(headers) ? fs.readFileSync(headers, 'utf8') : '';
    const status = result.stdout.trim();
    const mime = parseHeader(headerText, 'content-type').split(';')[0].trim();
    const bytes = fs.existsSync(body) ? fs.statSync(body).size : 0;
    log(`${label}: HTTP=${status} MIME=${mime} bytes=${bytes}`);
    if (status !== '200' || !/^image\/(jpeg|png|webp)$/.test(mime) || bytes <= 50000) {
      const error = new Error(`${label} failed HTTP=${status} MIME=${mime} bytes=${bytes}`);
      error.stage = label;
      throw error;
    }
    return { status, mime, bytes };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
};

const curlPage = (url) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `td-${county}-page-`));
  const body = path.join(dir, 'body');
  try {
    const result = spawnSync('curl', [
      '-A', 'TexasDefinedCountyVerifier/1.0 (+https://texasdefined.com)',
      '--retry', '3', '--retry-all-errors', '--retry-delay', '2',
      '--max-time', '60', '-sS', '-o', body, '-w', '%{http_code}', url,
    ], { encoding: 'utf8', timeout: 90000 });
    return {
      status: result.stdout.trim(),
      body: fs.existsSync(body) ? fs.readFileSync(body, 'utf8') : '',
    };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
};

const curlRedirect = (url) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `td-${county}-redirect-`));
  const headers = path.join(dir, 'headers');
  try {
    const result = spawnSync('curl', [
      '-A', 'TexasDefinedCountyVerifier/1.0 (+https://texasdefined.com)',
      '--max-redirs', '0', '--max-time', '60', '-sS', '-D', headers,
      '-o', '/dev/null', '-w', '%{http_code}', url,
    ], { encoding: 'utf8', timeout: 90000 });
    const headerText = fs.existsSync(headers) ? fs.readFileSync(headers, 'utf8') : '';
    return { status: result.stdout.trim(), location: parseHeader(headerText, 'location') };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let exitCode = 1;
try {
  requireSuccess('source', 'git', ['fetch', 'origin', 'main']);
  requireSuccess('source', 'git', ['reset', '--hard', 'origin/main']);
  const testedMain = gitText('rev-parse', 'HEAD');
  evidence.tested_main = testedMain;
  const target = config.targetSha || testedMain;
  evidence.county_commit = target;

  if (config.targetSha) {
    const ancestry = run('git', ['merge-base', '--is-ancestor', target, 'HEAD']);
    if (ancestry.status !== 0) {
      const error = new Error(`${config.displayName} target commit ${target} is not in current main ancestry`);
      error.stage = 'source';
      throw error;
    }
  }

  if (!fs.existsSync(config.fixture)) {
    const error = new Error(`Fixture missing: ${config.fixture}`);
    error.stage = 'source';
    throw error;
  }

  for (const requirement of config.sourceRequirements ?? []) {
    if (!fs.existsSync(requirement.file)) {
      const error = new Error(`Required source file missing: ${requirement.file}`);
      error.stage = 'source';
      throw error;
    }
    const source = fs.readFileSync(requirement.file, 'utf8');
    for (const needle of requirement.includes ?? []) {
      if (!source.includes(needle)) {
        const error = new Error(`Required source marker missing in ${requirement.file}: ${needle}`);
        error.stage = 'source';
        throw error;
      }
    }
    for (const needle of requirement.forbidden ?? []) {
      if (source.includes(needle)) {
        const error = new Error(`Forbidden historical-regression marker found in ${requirement.file}: ${needle}`);
        error.stage = 'source';
        throw error;
      }
    }
  }

  for (const file of config.canonicalScanFiles ?? []) {
    const source = fs.readFileSync(file, 'utf8');
    if (source.includes('www.texasdefined.com')) {
      const error = new Error(`Noncanonical www TexasDefined hostname found in ${file}`);
      error.stage = 'canonical-host';
      throw error;
    }
  }

  requireSuccess('source', 'git', ['diff', '--check']);

  const sourceHero = curlAsset(config.heroUrl, 'hero-source');
  evidence.hero_http = sourceHero.status;
  evidence.hero_mime = sourceHero.mime;
  evidence.hero_bytes = sourceHero.bytes;

  log('=== npm run validate ===');
  requireSuccess('validation', 'npm', ['run', 'validate'], { logOutput: true, timeout: 20 * 60 * 1000 });

  requireSuccess('main-moved-after-validation', 'git', ['fetch', 'origin', 'main']);
  const afterValidation = gitText('rev-parse', 'origin/main');
  if (afterValidation !== testedMain) {
    const error = new Error(`main moved after validation: ${testedMain} -> ${afterValidation}`);
    error.stage = 'main-moved-after-validation';
    throw error;
  }

  log('=== npm run deploy ===');
  requireSuccess('deployment', 'npm', ['run', 'deploy'], { logOutput: true, timeout: 20 * 60 * 1000 });

  requireSuccess('main-moved-after-deployment', 'git', ['fetch', 'origin', 'main']);
  const afterDeploy = gitText('rev-parse', 'origin/main');
  if (afterDeploy !== testedMain) {
    const error = new Error(`main moved during deployment: ${testedMain} -> ${afterDeploy}`);
    error.stage = 'main-moved-after-deployment';
    throw error;
  }

  let pageStatus = '';
  let pagePassed = false;
  for (let attempt = 1; attempt <= 12; attempt += 1) {
    const page = curlPage(`https://texasdefined.com/county/${county}?verify=${target}-${process.env.GITHUB_RUN_ID ?? 'manual'}-${attempt}`);
    pageStatus = page.status;
    if (page.status === '200' && (config.pageMarkers ?? []).every((marker) => page.body.includes(marker))) {
      pagePassed = true;
      break;
    }
    if (attempt < 12) await sleep(5000);
  }
  evidence.page_http = pageStatus;
  if (!pagePassed) {
    const error = new Error(`Live county page failed: HTTP=${pageStatus} or expected structured/editorial markers missing`);
    error.stage = 'live-page';
    throw error;
  }

  const liveHero = curlAsset(config.heroUrl, 'live-hero');
  evidence.hero_http = liveHero.status;
  evidence.hero_mime = liveHero.mime;
  evidence.hero_bytes = liveHero.bytes;

  const legacy = config.legacy ?? { mode: 'none' };
  if (legacy.mode !== 'none') {
    const result = curlRedirect(`https://texasdefined.com${legacy.path}`);
    evidence.legacy_http = result.status;
    evidence.legacy_location = result.location;
    log(`legacy: HTTP=${result.status} location=${result.location}`);
    if (legacy.mode === 'not-200') {
      if (result.status === '200') {
        const error = new Error('Unexpected live legacy county-series article page exists');
        error.stage = 'legacy';
        throw error;
      }
    } else if (legacy.mode === 'redirect') {
      const status = Number(result.status);
      if (!(legacy.statuses ?? [301, 308]).includes(status)) {
        const error = new Error(`Legacy redirect status mismatch: HTTP=${result.status}`);
        error.stage = 'legacy-redirect';
        throw error;
      }
      if (legacy.locationExact && result.location !== legacy.locationExact) {
        const error = new Error(`Legacy redirect location mismatch: ${result.location}`);
        error.stage = 'legacy-redirect';
        throw error;
      }
      if (legacy.locationContains && !result.location.includes(legacy.locationContains)) {
        const error = new Error(`Legacy redirect location mismatch: ${result.location}`);
        error.stage = 'legacy-redirect';
        throw error;
      }
    }
  }

  requireSuccess('main-moved-during-live-verification', 'git', ['fetch', 'origin', 'main']);
  const afterLive = gitText('rev-parse', 'origin/main');
  if (afterLive !== testedMain) {
    const error = new Error(`main moved during live verification: ${testedMain} -> ${afterLive}`);
    error.stage = 'main-moved-during-live-verification';
    throw error;
  }

  evidence.status = 'pass';
  evidence.stage = 'complete';
  log(`PASS ${config.displayName}: validate=PASS deploy=PASS page=200 hero=${evidence.hero_http} mime=${evidence.hero_mime} bytes=${evidence.hero_bytes}`);
  exitCode = 0;
} catch (error) {
  evidence.status = 'fail';
  evidence.stage = error.stage || 'unexpected';
  log(`FAIL ${config.displayName} at ${evidence.stage}: ${error.message}`);
  if (error.output) detail.push(error.output);
  exitCode = 1;
} finally {
  evidence.detail = tail(detail.join('\n'));
  evidence.recorded_at_utc = new Date().toISOString();
  fs.mkdirSync(path.dirname(markerPath), { recursive: true });
  fs.writeFileSync(markerPath, `${JSON.stringify(evidence, null, 2)}\n`, 'utf8');
  console.log(`Certification evidence written to ${markerPath}`);
}

process.exit(exitCode);
