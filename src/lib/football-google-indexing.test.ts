import assert from 'node:assert/strict';
import test from 'node:test';
import { applyGoogleFootballIsolation, isGoogleFootballIsolationPath } from './football-google-indexing.ts';

const footballPrefixes = [
  '/texas-high-school-football-teams',
  '/texas-high-school-football-districts',
  '/texas-high-school-football-isds',
  '/texas-high-school-football-matchups',
  '/texas-high-school-football-playoff-brackets',
  '/texas-high-school-football-championship-history',
];

const html = (status = 200) => new Response('<html><head></head><body>sample</body></html>', {
  status,
  headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=30' },
});

test('Google-only noindex applies to all six football route families and descendants', async () => {
  for (const prefix of footballPrefixes) {
    for (const path of [prefix, prefix + '/', prefix + '/example-slug']) {
      assert.equal(isGoogleFootballIsolationPath(path), true, path);
      const request = new Request('https://texasdefined.com' + path + '?ref=example');
      const response = applyGoogleFootballIsolation(request, html());
      assert.equal(response.headers.get('x-robots-tag'), 'googlebot: noindex', path);
      assert.equal(response.headers.get('cache-control'), 'public, max-age=30');
      assert.match(await response.text(), /sample/);
    }
  }
});

test('non-football routes and prefix lookalikes are untouched', () => {
  for (const path of [
    '/', '/sports', '/news', '/article/texas-high-school-football-playoffs-explained',
    '/texas-high-school-football-teams-extra', '/texas-high-school-football-district',
    '/api/high-school-football', '/sitemap.xml', '/robots.txt',
  ]) {
    assert.equal(isGoogleFootballIsolationPath(path), false, path);
    const response = applyGoogleFootballIsolation(new Request('https://texasdefined.com' + path), html());
    assert.equal(response.headers.has('x-robots-tag'), false, path);
  }
});

test('does not tag non-HTML, non-200, POST, or error responses', () => {
  const url = 'https://texasdefined.com/texas-high-school-football-teams/katy';
  assert.equal(applyGoogleFootballIsolation(new Request(url), new Response('{}', {
    headers: { 'content-type': 'application/json' },
  })).headers.has('x-robots-tag'), false);
  assert.equal(applyGoogleFootballIsolation(new Request(url), html(404)).headers.has('x-robots-tag'), false);
  assert.equal(applyGoogleFootballIsolation(new Request(url), html(500)).headers.has('x-robots-tag'), false);
  assert.equal(applyGoogleFootballIsolation(new Request(url, { method: 'POST' }), html()).headers.has('x-robots-tag'), false);
});

test('keeps prior response directives while adding Google-specific noindex', () => {
  const url = 'https://texasdefined.com/texas-high-school-football-districts/6a-district-5';
  const source = html();
  source.headers.set('x-robots-tag', 'max-image-preview:large');
  const response = applyGoogleFootballIsolation(new Request(url), source);
  assert.match(response.headers.get('x-robots-tag') ?? '', /max-image-preview:large/);
  assert.match(response.headers.get('x-robots-tag') ?? '', /googlebot: noindex/);
  assert.equal(response.status, 200);
});

test('HEAD requests receive the same Google-only directive', () => {
  const url = 'https://texasdefined.com/texas-high-school-football-isds';
  const source = new Response(null, { headers: { 'content-type': 'text/html; charset=utf-8' } });
  const response = applyGoogleFootballIsolation(new Request(url, { method: 'HEAD' }), source);
  assert.equal(response.headers.get('x-robots-tag'), 'googlebot: noindex');
});
