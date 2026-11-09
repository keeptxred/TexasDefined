import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspectRenderedBingSeo, assertRenderedBingSeo } from './rendered-bing-seo.mjs';

const doc = (head, body) => '<!doctype html><html><head>' + head + '</head><body>' + body + '</body></html>';

test('rendered title, semantic ALT and explicit empty decorative ALT pass', () => {
  const html = doc('<title>Texas Lakes &amp; Rivers | Texas Defined</title>',
    '<img alt="Caddo Lake cypress trees" src="/lake.jpg"><img src="/logo.svg" alt="">');
  const audit = assertRenderedBingSeo(html, 'https://texasdefined.com/');
  assert.equal(audit.title, 'Texas Lakes & Rivers | Texas Defined');
  assert.equal(audit.imageCount, 2);
  assert.equal(audit.missingAltCount, 0);
  assert.equal(audit.titleLength, 36);
});

test('actual rendered missing ALT fails, even when data-alt exists', () => {
  const html = doc('<title>Texas Lake Guide</title>',
    '<img data-alt="not the actual alt" src="/lake.jpg"><img alt="" src="/decorative.svg">');
  const result = inspectRenderedBingSeo(html);
  assert.equal(result.missingAltCount, 1);
  assert.match(result.findings.join(' '), /lack ALT/);
  assert.throws(() => assertRenderedBingSeo(html, 'https://texasdefined.com/fishing/lakes'),
    /Bing rendered SEO.*fishing\/lakes/);
});

test('missing values and boolean ALT are not accepted as rendered ALT', () => {
  for (const image of ['<img src="/x.jpg">', '<img src="/x.jpg" alt>', '<img src="/x.jpg" data-alt="some text">']) {
    assert.equal(inspectRenderedBingSeo(doc('<title>Texas</title>', image)).missingAltCount, 1);
  }
});

test('quoted > in attribute does not defeat image scan', () => {
  const html = doc('<title>Texas</title>', '<IMG SRC="/lake>river.jpg" CLASS="cover">');
  assert.equal(inspectRenderedBingSeo(html).missingAltCount, 1);
});

test('scripts, styles and comments with image-looking text are not counted', () => {
  const html = doc('<title>Texas</title>',
    '<!-- <img src="/comment"> --><script>const html = "<img src=/inline>";</script>'
    + '<style>.a:before { content: "<img src=/css>"; }</style><img src="/real.jpg" alt="A river">');
  assert.equal(inspectRenderedBingSeo(html).imageCount, 1);
  assert.equal(inspectRenderedBingSeo(html).missingAltCount, 0);
});

test('titles longer than governed 68 rendered characters fail and count HTML entities as characters', () => {
  const html = doc('<title>' + 'Texas '.repeat(12) + '&amp; Guides</title>', '<main></main>');
  const result = inspectRenderedBingSeo(html);
  assert.equal(result.titleLength, 80);
  assert.match(result.findings.join(' '), /rendered title has 80 characters/);
});

test('empty and duplicate rendered title tags fail closed', () => {
  assert.match(inspectRenderedBingSeo(doc('', '<main></main>')).findings.join(' '), /exactly one/);
  assert.match(inspectRenderedBingSeo(doc('<title> </title>', '<main></main>')).findings.join(' '), /nonempty/);
  assert.match(inspectRenderedBingSeo(doc('<title>Texas</title><title>Other</title>', '<main></main>')).findings.join(' '), /exactly one/);
});
