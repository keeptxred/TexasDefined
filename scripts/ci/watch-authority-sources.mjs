// Central, budgeted source-freshness orchestration. Never updates editorial facts or review dates.
// Reuses the Top-25 and MSR Houston checks; other source registries can join without
// creating one scheduled workflow per article.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = process.cwd();
const DAY = 86400000;
const MAX_EXTRA_PER_RUN = 24;
const REPORT_DIR = path.join(ROOT, 'artifacts');
const REVIEW_REGISTRY = 'ops/authority-monitor/additional-sources.json';
const CORE_REGISTRY = 'src/data/source-governance.ts';

function assert(condition, message) { if (!condition) throw new Error(message); }
function validDate(s) {
  return /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s + 'T00:00:00Z')) &&
    new Date(s + 'T00:00:00Z').toISOString().slice(0, 10) === s;
}
function ageDays(s, now) { return Math.floor((Date.parse(now + 'T00:00:00Z') - Date.parse(s + 'T00:00:00Z')) / DAY); }
function texasDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const obj = Object.fromEntries(parts.map(p => [p.type, p.value]));
  return [obj.year, obj.month, obj.day].join('-');
}
function coreSources(text) {
  const section = text.split('export const AUTHORITATIVE_SOURCES: AuthoritativeSource[] = [')[1]?.split('];')[0];
  assert(section, 'Missing source-governance registry');
  const rows = [];
  for (const line of section.split('\n')) {
    const id = line.match(/\bid:\s*'([^']+)'/)?.[1];
    if (!id) continue;
    const url = line.match(/\burl:\s*'(https:\/\/[^']+)'/)?.[1];
    const reviewedAt = line.match(/\blastReviewed:\s*'([^']+)'/)?.[1];
    const reviewEveryDays = Number(line.match(/\breviewEveryDays:\s*(\d+)/)?.[1]);
    assert(url && validDate(reviewedAt) && Number.isInteger(reviewEveryDays) && reviewEveryDays > 0, 'Malformed source-governance row ' + id);
    rows.push({ id, url, reviewedAt, reviewEveryDays, page: 'governed-source:' + id });
  }
  assert(rows.length >= 6, 'Source registry unexpectedly shrank');
  return rows;
}
function extraSources(text) {
  const entries = JSON.parse(text);
  assert(Array.isArray(entries), 'Additional-source registry must be a JSON array');
  const ids = new Set();
  for (const item of entries) {
    assert(typeof item.id === 'string' && /^[a-z0-9-]{3,90}$/.test(item.id), 'Invalid source ID');
    assert(!ids.has(item.id), 'Duplicate source ID ' + item.id);
    ids.add(item.id);
    const url = new URL(item.url);
    assert(url.protocol === 'https:' && !url.username && !url.password, 'Expected public HTTPS source: ' + item.id);
    assert(validDate(item.reviewedAt), 'Invalid reviewedAt for ' + item.id);
    assert(Number.isInteger(item.reviewEveryDays) && item.reviewEveryDays >= 7 && item.reviewEveryDays <= 365, 'Invalid interval for ' + item.id);
    assert(typeof item.page === 'string' && item.page.startsWith('/') && !item.page.startsWith('//'), 'Invalid canonical page path for ' + item.id);
  }
  return entries;
}
// This 2-slot-per-week sequence visits one fixed-size source batch each Monday/Thursday.
// It requires no database and does not accidentally fetch the entire registry at once.
function scheduledBatch(records, today) {
  const batches = Math.max(1, Math.ceil(records.length / MAX_EXTRA_PER_RUN));
  const date = new Date(today + 'T12:00:00Z');
  const anchor = Date.parse('2026-10-05T12:00:00Z');
  const weeks = Math.floor((date.getTime() - anchor) / (7 * DAY));
  const day = date.getUTCDay();
  const slot = day >= 4 ? 1 : 0;
  const index = ((weeks * 2 + slot) % batches + batches) % batches;
  const sorted = [...records].sort((a, b) => a.id.localeCompare(b.id));
  return { selected: sorted.slice(index * MAX_EXTRA_PER_RUN, (index + 1) * MAX_EXTRA_PER_RUN), batches, index };
}
function runScript(script, env = {}) {
  const result = spawnSync(process.execPath, [script], { cwd: ROOT, encoding: 'utf8',
    env: { ...process.env, ...env }, timeout: 9 * 60 * 1000, maxBuffer: 5 * 1024 * 1024 });
  return {
    id: script, passed: result.status === 0, exitCode: result.status ?? 1,
    log: [result.stdout, result.stderr, result.error?.message].filter(Boolean).join('\n').slice(-6500),
  };
}
async function checkUrl(item) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 14000);
  try {
    const response = await fetch(item.url, {
      method: 'GET', redirect: 'follow', signal: controller.signal,
      headers: { 'user-agent': 'TexasDefinedAuthorityMonitoring/1.0 (+https://texasdefined.com)', accept: 'text/html,*/*;q=0.5' },
    });
    await response.body?.cancel();
    // Anti-bot/rate restriction is inconclusive, not evidence a source disappeared.
    const restricted = [401, 403, 405, 406, 409, 418, 429].includes(response.status);
    return { status: response.status, state: restricted ? 'restricted' : response.ok ? 'reachable' : 'failure',
      finalUrl: response.url };
  } catch (error) {
    return { status: 0, state: 'failure', error: String(error).slice(0, 350) };
  } finally { clearTimeout(timeout); }
}
async function probeSources(rows, now) {
  const results = [];
  const queue = [...rows];
  async function worker() {
    while (queue.length) {
      const item = queue.shift();
      if (!item) break;
      const probe = await checkUrl(item);
      const daysOld = ageDays(item.reviewedAt, now);
      const overdue = daysOld > item.reviewEveryDays;
      results.push({ ...item, ...probe, daysOld, overdue });
    }
  }
  await Promise.all(Array.from({ length: Math.min(3, rows.length) }, worker));
  return results.sort((a,b) => a.id.localeCompare(b.id));
}
function selfTest(core, extra) {
  assert(validDate('2026-10-10') && !validDate('2026-02-30'), 'Invalid date handling');
  assert(ageDays('2026-10-01', '2026-10-10') === 9, 'Review-age arithmetic failed');
  const fake = Array.from({ length: 50 }, (_,i) => ({ id: 'test-' + i }));
  const monday = scheduledBatch(fake, '2026-10-12');
  const thursday = scheduledBatch(fake, '2026-10-15');
  assert(monday.selected.length === 24 && thursday.selected.length === 24 && monday.index !== thursday.index, 'Rotation or cap failed');
  assert(extra.length <= 100000 && core.length >= 6, 'Unbounded or missing input registry');
  console.log('PASS central authority monitor self-tests: core registry, review dates, bounded rotation, and manifest');
}
async function main() {
  const core = coreSources(fs.readFileSync(path.join(ROOT, CORE_REGISTRY), 'utf8'));
  const extra = extraSources(fs.readFileSync(path.join(ROOT, REVIEW_REGISTRY), 'utf8'));
  assert(new Set([...core, ...extra].map(x => x.id)).size === core.length + extra.length, 'Core/additional ID collision');
  selfTest(core, extra);
  if (process.argv.includes('--self-test')) {
    const result = spawnSync(process.execPath, ['scripts/ci/watch-msr-houston-sources.mjs','--self-test'], { cwd:ROOT, encoding:'utf8' });
    assert(result.status === 0, 'MSR adapter self-test failed: ' + (result.stderr || result.stdout));
    console.log('PASS MSR adapter parser test');
    return;
  }
  const today = texasDate();
  const batch = scheduledBatch(extra, today);
  const results = await probeSources([...core, ...batch.selected], today);
  // Top-25 deep reachability is weekly (Monday) and on explicit --full runs;
  // MSR and the official source-governance subset are checked twice weekly.
  const deepCheck = new Date(today + 'T12:00:00Z').getUTCDay() === 1 || process.argv.includes('--full');
  const checks = [runScript('scripts/ci/watch-msr-houston-sources.mjs')];
  if (deepCheck) {
    checks.push(runScript('scripts/data/validate-top-attraction-review-freshness.mjs'));
    checks.push(runScript('scripts/data/check-top-attraction-source-health.mjs', { TOP25_SOURCE_HEALTH_REPORT: 'artifacts/top25-source-health.json' }));
  }
  const failures = [
    ...results.filter(x => x.state === 'failure').map(x => x.id + ': official source returned HTTP ' + x.status + (x.error ? ' (' + x.error + ')' : '')),
    ...results.filter(x => x.overdue).map(x => x.id + ': editorial review overdue by ' + (x.daysOld - x.reviewEveryDays) + ' days (last verified ' + x.reviewedAt + ')'),
    ...checks.filter(x => !x.passed).map(x => x.id + ': source check failed; see log and artifact'),
  ];
  const summary = ['# TexasDefined centralized authority source monitoring', '',
    'Date (Texas): ' + today,
    'Core official-source records: ' + core.length,
    'Extra monitored source records: ' + extra.length,
    'Selected extra batch: ' + (batch.index + 1) + '/' + batch.batches + ' (' + batch.selected.length + ' sources)',
    'Existing specialist adapters: MSR Houston (1 guide) and Top 25 attractions (25 guides; deep check this run: ' + deepCheck + ')',
    'Official HTTP checks: ' + results.length,
    'Reachable: ' + results.filter(x => x.state === 'reachable').length,
    'Restricted / unconfirmed: ' + results.filter(x => x.state === 'restricted').length,
    'Editorial reviews overdue: ' + results.filter(x => x.overdue).length,
    'Source failures: ' + failures.length, '',
    '## Checks', '',
    '| Check | Result |',
    '|---|---|',
    ...checks.map(x => '| ' + x.id + ' | ' + (x.passed ? 'PASS' : 'REVIEW') + ' |'),
    '', '## Findings', '',
    ...(failures.length ? failures.map(x => '- ' + x) : ['No actionable drift or overdue source review found.']),
    '', 'Restricted HTTP responses are inconclusive and never treated as fact changes.',
    'No source dates or page claims are updated automatically.',
    'This covers registered sources, not all TexasDefined pages; the existing site-wide quality watchdog remains separate.',
  ].join('\n');
  fs.mkdirSync(REPORT_DIR, {recursive:true});
  const report = { schemaVersion:1,checkedAt:new Date().toISOString(),texasDate:today,
    coverage:{msrGuides:1,top25Guides:25,coreOfficialSources:core.length,extraRegisteredSources:extra.length,
      extraBatch:batch.index + 1,extraBatchCount:batch.batches,extraSourcesChecked:batch.selected.length},
    sources:results,adapters:checks,deepCheck,alerts:failures,needsReview:failures.length > 0 };
  fs.writeFileSync(path.join(REPORT_DIR,'authority-source-health.json'),JSON.stringify(report,null,2)+'\n');
  fs.writeFileSync(path.join(REPORT_DIR,'authority-source-health.md'),summary+'\n');
  if(process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,summary+'\n');
  console.log(summary);
  if(failures.length) process.exitCode=1;
}
await main().catch(error=>{console.error('CENTRAL AUTHORITY WATCH FAILED: '+String(error));process.exitCode=1});
