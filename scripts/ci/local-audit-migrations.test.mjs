import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createServer } from 'node:http';
import { LOCAL_QUALITY_AUDITS } from './local-quality-audit-catalog.mjs';

const run = promisify(execFile);
const read = path => readFileSync(path, 'utf8');
const migrated = [
  ['verify-sports-venue-heroes-production-all', 'venues', 'verify-sports-venue-heroes-production-all'],
  ['audit-all-editorial-production', 'counties', null],
  ['verify-rv-production-images', 'rv', 'verify-rv-production-images'],
  ['verify-live-fishing-authority', 'lakes', 'verify-live-fishing-authority'],
  ['friday-night-lights-production-smoke', 'football', 'verify-friday-night-lights-production'],
];

test('all nine local contracts remain available in source but weekly coordinator is disabled', () => {
  assert.equal(Object.keys(LOCAL_QUALITY_AUDITS).length, 9);
  const coordinator = read('.github/workflows/audit-whole-site-production.yml');
  const reusable = read('.github/workflows/audit-site-quality-local.yml');
  assert.doesNotMatch(coordinator, /^  schedule:/m);
  assert.match(coordinator, /audit-production:\n\s+# Defense in depth:[^\n]*\n\s+if: \$\{\{ false \}\}/);
  assert.match(reusable, /jobs:\n  audit:\n\s+# Reusable callers[^\n]*\n\s+if: \$\{\{ false \}\}/);
  assert.match(coordinator, /uses: \.\/\.github\/workflows\/audit-site-quality-local.yml/);
  assert.match(coordinator, /audit: all/);
  assert.match(coordinator, /needs: audit-production/);
  assert.match(coordinator, /local-site-quality-audit-all/);
  assert.match(coordinator, /if: needs.audit-production.result != 'success'/);
  assert.match(coordinator, /Local built-Worker audit/);
  assert.doesNotMatch(reusable, /^  (schedule|workflow_run|push|pull_request):/m);
  assert.match(reusable, /path: \$\{\{ env.LOCAL_AUDIT_REPORT_DIR \}\}/);
  // Job-level env cannot reference the step-only runner context.
  assert.doesNotMatch(reusable, /LOCAL_AUDIT_REPORT_DIR:\s*\$\{\{\s*runner\./);
  assert.match(reusable, /LOCAL_AUDIT_REPORT_DIR: \/tmp\/local-quality-reports-/);
  const runner = read('scripts/ci/run-local-quality-audits.mjs');
  assert.match(runner, /LOCAL_QUALITY_AUDITS as audits/);
  assert.match(runner, /results.push\(\{ name, passed: status === 0 \}\)/);
  assert.match(runner, /results.some\(result => !result.passed\)/);
});

test('the other migrated jobs retain manual/source checks without deployment or scheduled live fan-out', () => {
  for (const [workflow, selection, script] of migrated) {
    const source = read(`.github/workflows/${workflow}.yml`);
    assert.match(source, /^  workflow_dispatch:/m);
    assert.doesNotMatch(source, /^  (workflow_run|schedule|push):/m);
    assert.match(source, /uses: \.\/\.github\/workflows\/audit-site-quality-local.yml/);
    assert.ok(source.includes(`audit: ${selection}`));
    if (script) {
      const code = read(`scripts/ci/${script}.mjs`);
      assert.match(code, /createLocalAuditFetch\(\{ localOrigin: process.env.LOCAL_AUDIT_ORIGIN \}\)/);
      assert.match(code, /localAuditFetch.assertComplete\(\)/);
      assert.doesNotMatch(code, /\b(?:await|return) fetch\(/);
    }
  }
  assert.match(read('.github/workflows/audit-all-editorial-production.yml'), /^  pull_request:/m);
  assert.match(read('.github/workflows/verify-sports-venue-heroes-production-all.yml'), /--contract-only/);
  const whole = read('scripts/ci/audit-production-pages.mjs');
  assert.match(whole, /fetchImpl: localAuditFetch/);
  assert.match(whole, /localAuditFetch.assertComplete\(\)/);
});

test('all six migrated full checks refuse an accidental direct production invocation', async () => {
  const env = { ...process.env };
  delete env.LOCAL_AUDIT_ORIGIN;
  for (const selection of ['venues', 'counties', 'rv', 'lakes', 'whole', 'football']) {
    const [executable, script] = LOCAL_QUALITY_AUDITS[selection];
    await assert.rejects(run(executable === 'node' ? process.execPath : executable, [script], { env, timeout: 15_000 }), error => {
      assert.match(error.stderr, /Full-site audit refused/);
      return true;
    }, selection);
  }
});

test('sports PR source contract remains runnable without any HTTP runtime', async () => {
  const env = { ...process.env };
  delete env.LOCAL_AUDIT_ORIGIN;
  const { stdout } = await run(process.execPath, ['scripts/ci/verify-sports-venue-heroes-production-all.mjs', '--contract-only'], { env, timeout: 15_000 });
  assert.match(stdout, /PASS: production audit dynamically derives/);
});

test('county curl adapter preserves manual redirect, binary image MIME and followed page evidence on loopback', async t => {
  const received = [];
  const server = createServer((req, res) => {
    received.push(req.url);
    if (req.url === '/legacy') { res.writeHead(301, { location: 'https://texasdefined.com/county/travis' }); res.end(); }
    else if (req.url === '/photo') { res.setHeader('content-type', 'image/jpeg'); res.end(Buffer.from([0xff, 0xd8, 0xff, 0xd9])); }
    else { res.setHeader('content-type', 'text/html'); res.end('<h1>Travis County</h1>'); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());
  const env = { ...process.env, LOCAL_AUDIT_ORIGIN: `http://127.0.0.1:${server.address().port}` };
  const curl = (...args) => run(process.execPath, ['scripts/ci/local-audit-curl.mjs', ...args], { env, timeout: 10_000 });
  assert.equal((await curl('-sS', '-o', '/dev/null', '-w', '%{http_code}\\t%{redirect_url}', 'https://texasdefined.com/legacy')).stdout, '301\thttps://texasdefined.com/county/travis');
  assert.equal((await curl('-L', '-sS', '-o', '/dev/null', '-w', '%{http_code}\\t%{content_type}', 'https://texasdefined.com/legacy')).stdout, '200\ttext/html');
  assert.equal((await curl('-o', '/dev/null', '-w', '%{http_code}\\t%{content_type}', 'https://texasdefined.com/photo')).stdout, '200\timage/jpeg');
  assert.deepEqual(received, ['/legacy', '/legacy', '/county/travis', '/photo']);
});

test('all 254 county acceptance gates remain strict in the extracted shell contract', async () => {
  const source = read('scripts/ci/audit-county-pages-local.sh');
  await run('bash', ['-n', 'scripts/ci/audit-county-pages-local.sh']);
  for (const marker of ['-eq 254', 'local-audit-curl.mjs --validate', 'local-audit-curl.mjs "$@"', '"$words" -lt 1200', 'has_noindex', 'canonical-mismatch', 'image-mime=', 'legacy-redirect=', 'van-zandt', 'validate_county_section_order_and_depth', 'for attempt in $(seq 1 4)', 'exit 1']) {
    assert.ok(source.includes(marker), marker);
  }
  assert.doesNotMatch(source, /command curl|\/usr\/bin\/curl|https?:\/\/127\.0\.0\.1/);
});
