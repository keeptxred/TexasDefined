import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { baselineFromLedger, buildChangePlan, REPRESENTATIVE_PATHS, PAGE_BUDGET } from './production-change-scope.mjs';
import { verifyChangedPages } from './verify-changed-production-pages.mjs';
import { createProductionPageFetch } from './reuse-production-page.mjs';
const policy = JSON.parse(readFileSync('scripts/ci/update-scan-policy.json', 'utf8'));
const text = file => readFileSync(file, 'utf8');
const head = 'a'.repeat(40), baseline = 'b'.repeat(40);

test('blanket deployment subscriptions and duplicate validation cannot return', () => {
  for (const name of policy.manualFeatureWorkflows) {
    const source = text(`.github/workflows/${name}.yml`);
    assert.doesNotMatch(source, /^  workflow_run:/m, name);
    assert.match(source, /^  workflow_dispatch:/m, name);
  }
  for (const name of policy.manualDiagnosticWorkflows) {
    const source = text(`.github/workflows/${name}.yml`);
    assert.doesNotMatch(source, /^  (push|pull_request|workflow_run|schedule):/m, name);
    assert.match(source, /^  workflow_dispatch:/m, name);
  }
  assert.doesNotMatch(text('.github/workflows/validate.yml'), /^  push:/m);
  assert.doesNotMatch(text('.github/workflows/site-quality-watchdog.yml'), /^  (push|pull_request):/m);
  assert.match(text('.github/workflows/site-quality-watchdog.yml'), /^  schedule:/m);
  const deploy = text('.github/workflows/deploy-production.yml');
  assert.doesNotMatch(deploy, /node scripts\/ci\/verify-production-surfaces.mjs/);
  for (const group of ['sports','foliage','discovery','events','financial','advertiser','images']) assert.ok(deploy.includes(`steps.change_scope.outputs.${group}`));
  for (const guard of ['verify-production-health.mjs','capture-active-worker-version.mjs','verified-worker-ledger.mjs record','verify-changed-production-pages.mjs']) assert.ok(deploy.includes(guard));
});

test('workflow-only changes select no public pages or feature crawls', () => {
  const plan = buildChangePlan({ baseline, head, changedFiles: ['.github/workflows/validate.yml'] });
  assert.deepEqual(plan.selectedPaths, []);
  assert.ok(Object.values(plan.groups).every(v => v === false));
});

test('one edited article selects that record, not its unchanged siblings', () => {
  const path = 'src/data/fixtures/lazy-core-articles.ts';
  const before = `const records = [{ slug: 'first-article', title: 'Old' }, { slug: 'second-article', title: 'Keep' }];`;
  const after = before.replace("title: 'Old'", "title: 'New'");
  const plan = buildChangePlan({ baseline, head, changedFiles: [path], sources: { [path]: { before, after } } });
  assert.deepEqual(plan.selectedPaths, ['/article/first-article']);
  assert.ok(Object.values(plan.groups).every(v => v === false));
});

test('static routes normalize TanStack trailing underscores and scope relevant gates', () => {
  const path = 'src/routes/fishing_.structure.tsx';
  const plan = buildChangePlan({ baseline, head, changedFiles: [path], sources: { [path]: { after: `createFileRoute('/fishing_/structure')({});` } } });
  assert.deepEqual(plan.selectedPaths, ['/fishing/structure']);
  assert.equal(plan.groups.financial, false);
});

test('shared runtime changes and missing baseline select representative coverage', () => {
  for (const args of [{ baseline, changedFiles: ['src/routes/__root.tsx'] }, { baseline: null, changedFiles: [] }]) {
    const plan = buildChangePlan({ ...args, head });
    assert.deepEqual(new Set(plan.selectedPaths), new Set(REPRESENTATIVE_PATHS));
    assert.ok(Object.values(plan.groups).every(Boolean));
  }
});

test('deleted feature files still select their native gate and large updates disclose sampling', () => {
  const path = 'src/data/articles-large.ts';
  const after = 'const a = [' + Array.from({ length: 80 }, (_, i) => `{ slug: 'article-${i}', title: 'New' }`).join(',') + '];';
  const plan = buildChangePlan({ baseline, head, changedFiles: [path, 'src/data/event-removed.ts'], sources: { [path]: { after } } });
  assert.equal(plan.groups.events, true);
  assert.equal(plan.selectedPaths.length, PAGE_BUDGET);
  assert.equal(plan.candidateCount, 80);
  assert.equal(plan.omittedCount, 40);
  assert.match(plan.coverage, /sample/);
});

test('a shared successful page response satisfies multiple assertions but refresh remains possible', async () => {
  let calls = 0;
  const fetchPage = createProductionPageFetch(async () => { calls++; return new Response('one page', { status: 200 }); });
  for (let i = 0; i < 10; i++) assert.equal(await (await fetchPage(`https://texasdefined.com/page?verify=${i}`)).text(), 'one page');
  assert.equal(calls, 1);
  await fetchPage('https://texasdefined.com/page?verify=retry', {}, true);
  assert.equal(calls, 2);
});

test('failed responses and edge challenges cannot poison the response cache', async () => {
  let calls = 0;
  const fetchPage = createProductionPageFetch(async () => { calls++; return new Response('blocked', { status: calls === 1 ? 500 : 200, headers: calls === 2 ? { 'cf-mitigated': 'challenge' } : {} }); });
  for (let i = 0; i < 4; i++) await fetchPage('https://texasdefined.com/page');
  assert.equal(calls, 3);
});

test('changed-page smoke verifies only selected pages and fails stale plans before HTTP', async () => {
  let calls = 0;
  const fetchImpl = async url => { calls++; return new Response(`<html><title>Page</title><link rel="canonical" href="https://texasdefined.com${url.pathname}"></html>`); };
  const plan = { head, selectedPaths: ['/article/changed'] };
  const results = await verifyChangedPages({ plan, head, fetchImpl });
  assert.deepEqual(results, [{ path: '/article/changed', passed: true, attempt: 1 }]);
  assert.equal(calls, 1);
  await assert.rejects(verifyChangedPages({ plan, head: baseline, fetchImpl }), /stale/);
  assert.equal(calls, 1);
});

test('bad canonical, missing HTML and failed status never pass; retries stay bounded', async () => {
  for (const response of [() => new Response('<html><title>Page</title></html>'), () => new Response('error', { status: 500 }), () => new Response('empty')]) {
    let calls = 0;
    const results = await verifyChangedPages({ plan: { head, selectedPaths: ['/example'] }, head, fetchImpl: async () => { calls++; return response(); } });
    assert.equal(results[0].passed, false);
    assert.equal(calls, 3);
  }
});


test('baseline lookup skips unverified releases and rejects invalid API evidence', async () => {
  const calls = [];
  const fetchImpl = async url => {
    calls.push(url);
    const value = url.includes('/1/statuses') ? [{ state: 'failure' }] : url.includes('/2/statuses') ? [{ state: 'success' }] : [{ id: 1, sha: head }, { id: 2, sha: baseline }];
    return Response.json(value);
  };
  assert.equal(await baselineFromLedger({ repo: 'owner/repo', token: 'fixture', fetchImpl }), baseline);
  assert.equal(calls.length, 3);
  await assert.rejects(baselineFromLedger({ repo: 'owner/repo', token: 'fixture', fetchImpl: async () => new Response('blocked', { status: 403 }) }), /lookup failed/);
  assert.equal(await baselineFromLedger({ repo: 'owner/repo', token: 'fixture', fetchImpl: async () => Response.json([]) }), null);
});


test('semantic query parameters remain separate pages in manual acceptance', async () => {
  let calls = 0;
  const fetchPage = createProductionPageFetch(async () => { calls++; return new Response('page'); });
  await fetchPage('https://texasdefined.com/fishing/plan?view=map&verify=1');
  await fetchPage('https://texasdefined.com/fishing/plan?view=list&verify=2');
  await fetchPage('https://texasdefined.com/fishing/plan?view=map&verify=3');
  assert.equal(calls, 2);
});
