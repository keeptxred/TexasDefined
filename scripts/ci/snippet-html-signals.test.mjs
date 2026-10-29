import test from 'node:test';
import assert from 'node:assert/strict';
import { extractSnippetHtmlSignals } from './snippet-html-signals.mjs';

test('recognizes nested schema types, breadcrumbs and visible navigation', () => {
  const html = '<nav aria-label="Breadcrumb"><ol></ol></nav>' +
    '<script id="structured" type="application/ld+json">' +
    JSON.stringify({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebPage' }, { '@type': ['BreadcrumbList', 'ItemList'] },
    ] }) + '</script>';
  const signals = extractSnippetHtmlSignals(html);
  assert.equal(signals.jsonLdCount, 1);
  assert.equal(signals.invalidJsonLdCount, 0);
  assert.equal(signals.hasBreadcrumbSchema, true);
  assert.equal(signals.hasVisibleBreadcrumb, true);
  assert.deepEqual(signals.schemaTypes, ['BreadcrumbList', 'ItemList', 'WebPage']);
});

test('flags malformed JSON-LD without mistaking ordinary JS for schema', () => {
  const html = '<script>const a = 1</script>' +
    '<script type="application/ld+json">{bad json}</script>' +
    '<script type="application/ld+json">{"@type":"Event"}</script>';
  const signals = extractSnippetHtmlSignals(html);
  assert.equal(signals.jsonLdCount, 2);
  assert.equal(signals.invalidJsonLdCount, 1);
  assert.deepEqual(signals.schemaTypes, ['Event']);
  assert.equal(signals.hasBreadcrumbSchema, false);
});

test('empty pages have no inferred rich-result features', () => {
  const signals = extractSnippetHtmlSignals('<html><body>Hello</body></html>');
  assert.equal(signals.jsonLdCount, 0);
  assert.equal(signals.hasVisibleBreadcrumb, false);
  assert.equal(signals.hasBreadcrumbSchema, false);
});
