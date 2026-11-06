import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkHomepageHtml, verifyHomepageProduction } from './verify-homepage-fresh-production.mjs';

const valid = [
  '<!doctype html><html><head>',
  '<link rel="canonical" href="https://texasdefined.com/">',
  '<meta name="robots" content="index, follow"></head><body><main>',
  '<h1>The places, stories &amp; life of Texas</h1>',
  '<p>Share a correction or firsthand Texas tip →</p>',
  '<details><summary>Explore more outdoor, river, city and regional guides</summary></details>',
  '<p>CASI Terlingua International Chili Championship at Rancho CASI de los Chisos</p>',
  '</main></body></html>',
].join('');

test('a fresh source-rendered homepage passes visible editorial and indexability markers', () => {
  assert.deepEqual(checkHomepageHtml(valid, 'text/html; charset=utf-8').failures, []);
});

test('rejects cached previous layout, generic Terlingua copy, noindex and wrong canonical', () => {
  const previous = valid.replace('Share a correction or firsthand Texas tip →', 'Old homepage')
    .replace('Explore more outdoor, river, city and regional guides', 'Need a Texas answer, not another destination?')
    .replace('Rancho CASI de los Chisos', 'Major annual event in Terlingua')
    .replace('https://texasdefined.com/', 'https://example.com/')
    .replace('index, follow', 'noindex, follow');
  const errors = checkHomepageHtml(previous, 'text/html').failures;
  for (const expected of ['editorialContact', 'compactDisclosure', 'noDuplicateBand',
    'canonical', 'indexable', 'noUnfixedCasi']) assert.ok(errors.includes(expected), expected);
});

test('checks fresh origins with bounded cache-busted requests and a persisted audit report', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'td-home-live-'));
  try {
    const requests = [];
    const result = await verifyHomepageProduction({
      origins: ['https://texasdefined.com', 'https://direct.example.com'],
      probe: 'test-commit', attempts: 1, reportPath: join(dir, 'report.json'),
      fetchImpl: async (url, opts) => {
        requests.push({ url: String(url), opts });
        return new Response(valid, { status: 200, headers: { 'Content-Type': 'text/html' } });
      },
    });
    assert.equal(result.state, 'verified');
    assert.equal(requests.length, 2);
    assert.ok(requests.every(r => r.url.includes('_td_homepage_fresh=test-commit-1')));
    assert.ok(requests.every(r => r.opts.headers['Cache-Control'].includes('no-cache')));
    assert.equal(JSON.parse(readFileSync(join(dir, 'report.json'))).checks.length, 2);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('never treats an old HTML snapshot or unavailable origin as a successful release', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'td-home-live-'));
  try {
    const reportPath = join(dir, 'report.json');
    await assert.rejects(() => verifyHomepageProduction({
      origins: ['https://texasdefined.com'], reportPath, attempts: 2,
      fetchImpl: async () => new Response('<html><h1>Old homepage</h1></html>', {
        status: 200, headers: { 'Content-Type': 'text/html' },
      }),
    }), /Live homepage parity failed/);
    const report = JSON.parse(readFileSync(reportPath));
    assert.equal(report.state, 'failed');
    assert.equal(report.checks.length, 2);
    assert.ok(report.checks.every(r => r.failures.includes('editorialContact')));
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('daily watchdog fails closed on homepage live and field-vitals check failures', () => {
  const workflow = readFileSync('.github/workflows/site-quality-watchdog.yml', 'utf8');
  const match = workflow.match(/      - name: Fail workflow when any quality check fails\n        if: ([^\n]+)\n        run: \|/);
  assert.ok(match, 'missing explicit final watchdog failure gate');
  for (const check of ['quality', 'homepage_live', 'homepage_vitals']) {
    assert.ok(match[1].includes(`steps.${check}.outcome == 'failure'`),
      `${check} failure must mark the job failed`);
  }
  const issuePosition = workflow.indexOf('      - name: Open or update watchdog issue');
  const gatePosition = workflow.indexOf('      - name: Fail workflow when any quality check fails');
  assert.ok(issuePosition !== -1 && gatePosition > issuePosition,
    'write the linked diagnostic issue before failing the job');
});
