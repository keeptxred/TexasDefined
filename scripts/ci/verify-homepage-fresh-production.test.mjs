import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkHomepageHtml, verifyHomepageProduction, extractLexingtonReadingMinutes, EXPECTED_LEXINGTON_READING_MINUTES } from './verify-homepage-fresh-production.mjs';

const valid = [
  '<!doctype html><html><head>',
  '<link rel="canonical" href="https://texasdefined.com/">',
  '<meta name="robots" content="index, follow"></head><body><main>',
  '<h1>The places, stories &amp; life of Texas</h1>',
  '<section><h2>USS Lexington (CV-16): The Blue Ghost, World War II Aircraft Carrier and Corpus Christi Museum</h2>',
  '<a href="/article/uss-lexington-cv16-history-visitor-guide">Read the story</a>',
  `<p>About ${EXPECTED_LEXINGTON_READING_MINUTES} minutes</p></section>`,
  '<p>Share a correction or firsthand Texas tip →</p>',
  '<details><summary>Explore more outdoor, river, city and regional guides</summary></details>',
  '<p>CASI Terlingua International Chili Championship at Rancho CASI de los Chisos</p>',
  '</main></body></html>',
].join('');
const validArticle = [
  '<!doctype html><html><head><title>USS Lexington</title></head><body><main>',
  '<h1>USS Lexington (CV-16): The Blue Ghost, World War II Aircraft Carrier and Corpus Christi Museum</h1>',
  `<p>By Texas Defined History &amp; Heritage Desk · About ${EXPECTED_LEXINGTON_READING_MINUTES} minutes</p>`,
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
        return new Response(url.pathname.startsWith('/article/') ? validArticle : valid, {
          status: 200, headers: { 'Content-Type': 'text/html' },
        });
      },
    });
    assert.equal(result.state, 'verified');
    assert.equal(requests.length, 4);
    assert.equal(requests.filter(r => r.url.includes('_td_homepage_fresh=test-commit-1')).length, 2);
    assert.equal(requests.filter(r => r.url.includes('_td_lexington_fresh=test-commit-1')).length, 2);
    assert.ok(requests.every(r => r.opts.headers['Cache-Control'].includes('no-cache')));
    const entries = JSON.parse(readFileSync(join(dir, 'report.json'))).checks;
    assert.equal(entries.length, 2);
    assert.ok(entries.every(r => r.homepageLexingtonReadingMinutes === EXPECTED_LEXINGTON_READING_MINUTES));
    assert.ok(entries.every(r => r.article?.readingMinutes === EXPECTED_LEXINGTON_READING_MINUTES));
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

test('reading time extraction anchors to USS Lexington heading, not unrelated cards or JSON', () => {
  assert.equal(extractLexingtonReadingMinutes(valid), EXPECTED_LEXINGTON_READING_MINUTES);
  assert.equal(extractLexingtonReadingMinutes(validArticle), EXPECTED_LEXINGTON_READING_MINUTES);
  assert.equal(extractLexingtonReadingMinutes('<h2>Other story</h2><p>About 9 minutes</p>'), null);
  assert.ok(checkHomepageHtml(valid.replace(
    `About ${EXPECTED_LEXINGTON_READING_MINUTES} minutes`, 'About 18 minutes',
  )).failures.includes('lexingtonHomepageReadTime'));
});

test('rejects a mismatched USS Lexington article even when the homepage checks pass', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'td-lexington-live-'));
  try {
    const reportPath = join(dir, 'report.json');
    await assert.rejects(verifyHomepageProduction({
      origins: ['https://texasdefined.com'], attempts: 1, reportPath,
      fetchImpl: async (url) => new Response(
        url.pathname.startsWith('/article/')
          ? validArticle.replace(
            `About ${EXPECTED_LEXINGTON_READING_MINUTES} minutes`,
            'About 18 minutes',
          )
          : valid,
        { status: 200, headers: { 'Content-Type': 'text/html' } },
      ),
    }), /lexington-article-reading-time/);
    const report = JSON.parse(readFileSync(reportPath));
    assert.equal(report.state, 'failed');
    assert.equal(report.checks[0].article.readingMinutes, 18);
    assert.ok(report.checks[0].failures.includes('lexington-reading-time-disagreement'));
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('never accepts an outdated 18-minute homepage even if its linked article is current', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'td-lexington-home-'));
  try {
    const requests = [];
    await assert.rejects(verifyHomepageProduction({
      origins: ['https://texasdefined.com'], attempts: 1,
      reportPath: join(dir, 'report.json'),
      fetchImpl: async url => {
        requests.push(String(url));
        return new Response(valid.replace(
          `About ${EXPECTED_LEXINGTON_READING_MINUTES} minutes`,
          'About 18 minutes',
        ), { status: 200, headers: { 'Content-Type': 'text/html' } });
      },
    }), /lexingtonHomepageReadTime/);
    assert.equal(requests.length, 1, 'skip the article fetch when homepage parity already fails');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('editorial homepage rotation can hide USS Lexington without failing live health', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'td-lexington-rotation-'));
  try {
    const rotated = valid.replace(
      'USS Lexington (CV-16): The Blue Ghost, World War II Aircraft Carrier and Corpus Christi Museum',
      'A different Texas history feature',
    );
    assert.equal(checkHomepageHtml(rotated).failures.length, 0);
    const requests = [];
    const result = await verifyHomepageProduction({
      origins: ['https://texasdefined.com'], attempts: 1,
      reportPath: join(dir, 'report.json'),
      fetchImpl: async url => {
        requests.push(String(url));
        return new Response(rotated, { status: 200, headers: { 'Content-Type': 'text/html' } });
      },
    });
    assert.equal(result.state, 'verified');
    assert.equal(result.checks[0].lexingtonFeatured, false);
    assert.equal(requests.length, 1, 'no article fetch for an unfeatured article');
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
