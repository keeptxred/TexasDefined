import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createLocalAuditFetch } from './local-audit-fetch.mjs';
import { createAuditWorkerFetch } from './local-audit-worker-fetch.mjs';

test('full-site transport refuses missing, remote, credentialed and malformed local origins', () => {
  for (const localOrigin of [undefined, 'https://texasdefined.com', 'https://texasdefined-site.freddy-coppola.workers.dev', 'http://127.0.0.1.evil.test:8080', 'http://user@127.0.0.1:8080', 'http://127.0.0.1:8080/path']) {
    assert.throws(() => createLocalAuditFetch({ localOrigin }), /Full-site audit refused/);
  }
});

test('canonical and preview URLs reach only localhost, including absolute production redirects', async t => {
  const received = [];
  const server = createServer((req, res) => {
    received.push(req.url);
    if (req.url === '/old') { res.writeHead(301, { location: 'https://texasdefined.com/new' }); res.end(); }
    else { res.writeHead(200, { 'content-type': 'text/html' }); res.end('<link rel="canonical" href="https://texasdefined.com/new">'); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());
  const transport = createLocalAuditFetch({ localOrigin: `http://127.0.0.1:${server.address().port}` });
  const response = await transport('https://texasdefined.com/old');
  assert.equal(response.url, 'https://texasdefined.com/new');
  assert.match(await response.text(), /https:\/\/texasdefined.com\/new/);
  await transport('https://texasdefined-site.freddy-coppola.workers.dev/check?q=1');
  assert.deepEqual(received, ['/old', '/new', '/check?q=1']);
});

test('manual redirects stay visible and external redirects back to the site also stay local', async () => {
  const calls = [];
  const transport = createLocalAuditFetch({ localOrigin: 'http://127.0.0.1:8801', fetchImpl: async url => {
    calls.push(url.href);
    return calls.length === 1 ? new Response(null, { status: 302, headers: { location: 'https://texasdefined.com/images/photo.webp' } }) : new Response('image');
  }});
  assert.equal((await transport('https://images.example.org/photo')).status, 200);
  assert.deepEqual(calls, ['https://images.example.org/photo', 'http://127.0.0.1:8801/images/photo.webp']);
  const manual = createLocalAuditFetch({ localOrigin: 'http://127.0.0.1:8801', fetchImpl: async () => new Response(null, { status: 301, headers: { location: '/new' } }) });
  assert.equal((await manual('https://texasdefined.com/old', { redirect: 'manual' })).status, 301);
});

test('budgets include retries and redirects; swallowed exhaustion cannot produce a passing report', async () => {
  let requests = 0;
  const transport = createLocalAuditFetch({ localOrigin: 'http://127.0.0.1:8801', maxRequests: 2, fetchImpl: async () => { requests++; return new Response(null, { status: 302, headers: { location: '/again' } }); } });
  await assert.rejects(transport('https://texasdefined.com/again'), /budget exhausted/);
  assert.equal(requests, 2);
  assert.throws(() => transport.assertComplete(), /partial passing report/);
  await assert.rejects(transport('https://texasdefined.com/', { method: 'POST' }), /read-only/);
});

test('SSR self-fetches use local ASSETS; direct and redirected production dynamic fetches are blocked', async () => {
  const network = [];
  const assetRequests = [];
  const fetchLocal = createAuditWorkerFetch(async request => {
    network.push(request.url);
    return new Response(null, { status: 302, headers: { location: 'https://texasdefined.com/api/high-school-football' } });
  }, () => ({ fetch: async request => { assetRequests.push(request.url); return new Response('local article'); } }));
  assert.equal(await (await fetchLocal('https://texasdefined.com/content/guide.html')).text(), 'local article');
  assert.deepEqual(assetRequests, ['https://texasdefined.com/content/guide.html']);
  assert.deepEqual(network, []);
  await assert.rejects(fetchLocal('https://texasdefined.com/api/high-school-football'), /blocked production subrequest/);
  await assert.rejects(fetchLocal('https://other.example/redirect'), /blocked production subrequest/);
  assert.deepEqual(network, ['https://other.example/redirect']);
  await assert.rejects(fetchLocal('https://keeptxred.com/'), /blocked production subrequest/);
});

test('all complete crawlers run unchanged content assertions against loopback fixture pages', async t => {
  const dir = await mkdtemp(path.join(tmpdir(), 'td-local-audit-'));
  const requests = [];
  const server = createServer((req, res) => {
    requests.push(req.url);
    if (req.url === '/robots.txt') { res.end('Sitemap: https://texasdefined.com/sitemap.xml\n'); return; }
    if (req.url === '/sitemap.xml' || req.url === '/sitemap-explore.xml') {
      const slug = req.url === '/sitemap.xml' ? 'a' : 'b';
      res.setHeader('content-type', 'application/xml');
      res.end(`<urlset><url><loc>https://texasdefined.com/article/${slug}</loc></url></urlset>`); return;
    }
    if (req.url === '/images/test.png') {
      const png = Buffer.alloc(24); png.set([0x89, 0x50, 0x4e, 0x47]); png.writeUInt32BE(1200, 16); png.writeUInt32BE(900, 20);
      res.setHeader('content-type', 'image/png'); res.end(png); return;
    }
    res.setHeader('content-type', 'text/html');
    res.end(`<html><head><title>Texas guide ${req.url}</title><link rel="canonical" href="https://texasdefined.com${req.url}"><meta name="robots" content="index, follow, max-image-preview:large"><meta property="og:image" content="https://texasdefined.com/images/test.png"><meta property="og:image:alt" content="Texas guide photograph"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="900"><meta name="twitter:image" content="https://texasdefined.com/images/test.png"><meta name="twitter:card" content="summary_large_image"></head><body><main><h1>Texas guide</h1><a href="/article/a">Guide A</a><a href="/article/b">Guide B</a></main></body></html>`);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(async () => { server.close(); await rm(dir, { recursive: true, force: true }); });
  for (const script of ['audit-internal-link-graph-production', 'audit-sitemap-page-indexability', 'verify-image-discover-production']) {
    await promisify(execFile)(process.execPath, [path.resolve(`scripts/ci/${script}.mjs`)], {
      cwd: dir, timeout: 15_000,
      env: { ...process.env, LOCAL_AUDIT_ORIGIN: `http://127.0.0.1:${server.address().port}`, INTERNAL_LINK_AUDIT_STRICT: '1', IMAGE_AUDIT_STRICT: '1' },
    });
  }
  assert.ok(requests.includes('/article/a'));
  assert.ok(requests.includes('/article/b'));
  assert.ok(requests.includes('/images/test.png'));
});

test('all three complete audits are local-only and no longer fan out after deployments', () => {
  for (const [workflow, script, selection] of [
    ['audit-internal-link-graph-production', 'audit-internal-link-graph-production', 'links'],
    ['audit-sitemap-page-indexability', 'audit-sitemap-page-indexability', 'sitemap'],
    ['audit-image-discover-production', 'verify-image-discover-production', 'images'],
  ]) {
    const yaml = readFileSync(`.github/workflows/${workflow}.yml`, 'utf8');
    assert.match(yaml, /workflow_dispatch:/);
    assert.match(yaml, /uses: \.\/\.github\/workflows\/audit-site-quality-local.yml/);
    assert.ok(yaml.includes(`audit: ${selection}`));
    assert.doesNotMatch(yaml, /^  (workflow_run|schedule|push|pull_request):/m);
    const source = readFileSync(`scripts/ci/${script}.mjs`, 'utf8');
    assert.match(source, /createLocalAuditFetch\(\{ localOrigin: process.env.LOCAL_AUDIT_ORIGIN \}\)/);
    assert.match(source, /localAuditFetch.assertComplete\(\)/);
    assert.doesNotMatch(source, /\bawait fetch\(/);
  }
  const scheduled = readFileSync('.github/workflows/audit-site-quality-local.yml', 'utf8');
  assert.doesNotMatch(scheduled, /schedule:/);
  const coordinator = readFileSync('.github/workflows/audit-whole-site-production.yml', 'utf8');
  assert.doesNotMatch(coordinator, /^  schedule:/m);
  assert.match(coordinator, /audit-production:\n\s+# Defense in depth:[^\n]*\n\s+if: \$\{\{ false \}\}/);
  assert.match(scheduled, /jobs:\n  audit:\n\s+# Reusable callers[^\n]*\n\s+if: \$\{\{ false \}\}/);
  assert.match(coordinator, /audit: all/);
  assert.match(scheduled, /run-local-quality-audits.mjs/);
  assert.doesNotMatch(scheduled, /workflow_run:|secrets\.|secrets: inherit/);
  const runner = readFileSync('scripts/ci/run-local-quality-audits.mjs', 'utf8');
  for (const marker of ["'--local'", 'delete config.ai', 'delete config.analytics_engine_datasets', 'Remote binding refused', 'local-audit-worker.mjs', 'INTERNAL_LINK_AUDIT_STRICT', 'IMAGE_AUDIT_STRICT']) assert.ok(runner.includes(marker), marker);
});
