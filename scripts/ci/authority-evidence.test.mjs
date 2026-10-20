import test from 'node:test';
import assert from 'node:assert/strict';
import { auditAuthorityEvidence, authorityFamilies } from './authority-evidence.mjs';

const html = (body) => `<!doctype html><html><body><header><a href="/">Home</a></header><main><h1>Example</h1>${body}</main></body></html>`;

test('school program uses specialist checklist; external navigation is evidence, not certification', () => {
  const evidence = auditAuthorityEvidence('https://texasdefined.com/texas-high-school-football-teams/spring',
    html('<h2>School and UIL evidence</h2><p>Current verified team context and sources.</p><a href="https://www.uiltexas.org/">UIL</a><a href="/county/harris">County</a><a href="/city/spring">Town</a><a href="/texas-high-school-football-districts/test">District</a><img alt="School football stadium at its documented campus">'));
  assert.equal(evidence.family, 'school-football');
  assert.equal(evidence.identifiablePrimarySourceHosts, 1);
  assert.ok(evidence.reviewChecklist.some(x => x.includes('UIL/TAPPS')));
  assert.equal(evidence.reviewFlags.includes('no-identifiable-primary-source-host'), false);
  assert.equal(evidence.editorialCertification, 'not-determined-by-automated-crawl');
});

test('missing primary evidence and incoming contextual links remain review flags, never fabricated facts', () => {
  const evidence = auditAuthorityEvidence('https://texasdefined.com/fishing/lake/example', html('<h2>Fishing</h2><p>Very generic lake content.</p>'));
  assert.equal(evidence.family, 'fishing');
  assert.ok(evidence.reviewFlags.includes('no-identifiable-primary-source-host'));
  assert.ok(evidence.reviewFlags.includes('contextual-internal-discovery-review'));
  assert.ok(evidence.reviewFlags.includes('time-sensitive-source-date-review'));
  assert.equal(evidence.editorialCertification, 'not-determined-by-automated-crawl');
});

test('source-bearing article with byline can still require independent review', () => {
  const evidence = auditAuthorityEvidence('https://texasdefined.com/article/texas-history',
    html('<h2>Sources and further reading</h2><p>By Alex Reporter. Sources checked October 12, 2026.</p><a href="https://www.tshaonline.org/handbook/entries/texas">TSHA</a><a href="/county/travis">County</a><a href="/county/comal">County</a><a href="/explore">Explore</a>'));
  assert.equal(evidence.family, 'article');
  assert.ok(evidence.visibleReviewDate);
  assert.ok(evidence.visibleAuthorship);
  assert.ok(evidence.visibleSourceSection);
  assert.equal(evidence.editorialCertification, 'not-determined-by-automated-crawl');
});

test('shop and calculator routes are exempt from irrelevant article evidence checks', () => {
  for (const path of ['/shop', '/texas-mortgage-calculator/houston']) {
    assert.equal(auditAuthorityEvidence('https://texasdefined.com'+path, html('<p>Interactive page</p>')).reviewFlags.length, 0);
  }
});
test('every content family has its own editorial checklist, without a word-count certification', () => {
  assert.ok(authorityFamilies.length >= 10);
  for (const family of authorityFamilies) assert.ok(family);
});
