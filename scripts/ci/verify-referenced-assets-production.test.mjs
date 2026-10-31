import assert from 'node:assert/strict';
import { test } from 'node:test';
import { nextSnapshotHistory, referencesFromHtml, validAssetResponse } from './verify-referenced-assets-production.mjs';

test('find only same-origin hashed JS/CSS from script, modulepreload and stylesheet', () => {
  const html = [
    '<script type="module" crossorigin src="/assets/main-LkbE9wUL.js"></script>',
    '<link rel="modulepreload" href="/assets/Container-Cz1cjZOJ.js">',
    '<link rel="stylesheet" href="/assets/entry-C82abc.css">',
    '<link rel="preload" as="script" href="/assets/Header-BsOq5IkK.js">',
    '<script src="https://other.example/assets/tracker-X.js"></script>',
    '<link rel="stylesheet" href="/favicon.ico">',
    '<script type="module">import("/assets/internal-A.js")</script>',
    '<script src="/assets/../../private.js"></script>',
    '<script src="/assets/main-LkbE9wUL.js"></script>',
  ].join('\n');
  assert.deepEqual(referencesFromHtml(html).map(x => x.path), [
    '/assets/main-LkbE9wUL.js',
    '/assets/Container-Cz1cjZOJ.js',
    '/assets/entry-C82abc.css',
    '/assets/Header-BsOq5IkK.js',
  ]);
});

test('a missing, challenged, empty or wrong-MIME asset fails closed', () => {
  const okJs = { status: 200, bytes: 123, mime: 'text/javascript; charset=utf-8', challenge: false };
  const okCss = { ...okJs, mime: 'text/css' };
  assert.equal(validAssetResponse('js', okJs), true);
  assert.equal(validAssetResponse('css', okCss), true);
  for (const response of [
    { ...okJs, status: 404 }, { ...okJs, status: 302 },
    { ...okJs, bytes: 0 }, { ...okJs, challenge: true },
    { ...okJs, mime: 'text/html' },
  ]) assert.equal(validAssetResponse('js', response), false);
  assert.equal(validAssetResponse('css', okJs), false);
});

test('retain only one older generation plus current, never grow indefinitely', () => {
  const fake = id => ({ format: 1, pages: [{ path: '/', assets: [{ path: '/assets/x-' + id + '.js', wasAvailable: true }] }] });
  const one = nextSnapshotHistory(null, fake(1));
  assert.equal(one.snapshots.length, 1);
  const two = nextSnapshotHistory(one, fake(2));
  assert.equal(two.snapshots.length, 2);
  const three = nextSnapshotHistory(two, fake(3));
  assert.deepEqual(three.snapshots.map(x => x.pages[0].assets[0].path), ['/assets/x-2.js', '/assets/x-3.js']);
});
