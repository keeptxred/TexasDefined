import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  assertTexasCulturePublication,
  TEXAS_CULTURE_PUBLICATION_MARKERS,
  TEXAS_ICON_PUBLICATION_EVIDENCE,
} from './verify-texas-culture-publication.mjs';
import { TEXAS_CULTURE_AUTHORITY_PAGES } from './production-change-scope.mjs';

const archive = '/what-does-chud-mean';
const render = (path, text = TEXAS_CULTURE_PUBLICATION_MARKERS[path], extra = '') =>
  '<html><head>' +
  (path === archive ? '<meta content="noindex, follow" name="robots">' : '') +
  '</head><body>' + text + (TEXAS_ICON_PUBLICATION_EVIDENCE[path] ?? []).join(' | ') + extra + '</body></html>';

test('the publication checker covers every revised Texas culture URL without unrelated crawl expansion', () => {
  assert.deepEqual(Object.keys(TEXAS_CULTURE_PUBLICATION_MARKERS), [...TEXAS_CULTURE_AUTHORITY_PAGES]);
  for (const path of TEXAS_CULTURE_AUTHORITY_PAGES) {
    assert.doesNotThrow(() => assertTexasCulturePublication(path, render(path), 'test'));
    assert.throws(
      () => assertTexasCulturePublication(path, render(path, 'old editorial content'), 'test'),
      /missing or stale/,
      path + ' must fail if the edge serves old article content',
    );
  }
});

test('every 2026-11-16 and 2026-11-17 chapter evidence canary fails closed on stale visitor and bypass responses', () => {
  assert.equal(Object.keys(TEXAS_ICON_PUBLICATION_EVIDENCE).length, 5);
  for (const [path, evidence] of Object.entries(TEXAS_ICON_PUBLICATION_EVIDENCE)) {
    assert.equal(evidence.length, 4, path + ' needs four independently identifying canaries including the latest revision');
    assert.doesNotThrow(() => assertTexasCulturePublication(path, render(path), 'visitor'));
    for (const missing of evidence) {
      const stale = render(path).replace(missing, '[previous-revision]');
      assert.throws(
        () => assertTexasCulturePublication(path, stale, 'bypass'),
        /entry evidence missing or stale/,
        path + ' should reject missing ' + missing,
      );
    }
  }
});

test('nine genuine Texas authority guides must be indexable, but the off-topic slang archive remains noindex', () => {
  for (const path of TEXAS_CULTURE_AUTHORITY_PAGES.filter(p => p !== archive)) {
    assert.throws(() => assertTexasCulturePublication(path,
      render(path).replace('</head>', '<meta name="robots" content="noindex, follow"></head>'), 'test'),
    /unexpectedly noindexed/, path);
  }
  assert.throws(() => assertTexasCulturePublication(archive,
    render(archive).replace('<meta content="noindex, follow" name="robots">', ''), 'test'),
  /incorrectly indexable/);
});

test('reintroduced unrelated government disclaimer or the old roadside count fails publication', () => {
  assert.throws(() => assertTexasCulturePublication(archive,
    render(archive, undefined, 'Current fees, eligibility, deadlines, appointments, rules and transactions'),
    'visitor'), /government services disclaimer/);
  assert.throws(() => assertTexasCulturePublication('/texas-roadside-oddities',
    render('/texas-roadside-oddities', undefined, '40 Texas roadside and small-town icons'),
    'visitor'), /count remains stale/);
  assert.doesNotThrow(() => assertTexasCulturePublication('/unrelated-page', 'irrelevant', 'test'));
});

test('off-topic CHUD source replaces the default index robots declaration instead of emitting conflicting directives', () => {
  const route = readFileSync('src/routes/what-does-chud-mean.tsx', 'utf8');
  assert.match(route, /head\.meta\.filter\(\(entry\) => entry\.name !== "robots"\)/);
  assert.match(route, /name: "robots", content: "noindex, follow"/);
  assert.doesNotMatch(route, /meta: \[\.\.\.head\.meta, \{ name: "robots", content: "noindex, follow" \}/);
});
