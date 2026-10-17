import test from 'node:test';
import assert from 'node:assert/strict';
import { enrichAuthorityLinkGraph } from './authority-link-graph.mjs';
import { auditAuthorityEvidence } from './authority-evidence.mjs';

const origin = 'https://texasdefined.com';
function page(path, family, linked) {
  const url = origin + path;
  const anchors = linked.map(dest => '<a href="' + dest + '">Contextually useful nearby source</a>').join('');
  const html = '<!doctype html><main><h1>Unique page</h1><h2>Research links</h2>' + anchors + '</main><footer><a href="/article/uncounted-footer">Footer nav</a></footer>';
  return { url, issues:[], authority:auditAuthorityEvidence(url,html) };
}

test('live main-content anchors supply actual inbound and reciprocal evidence; footer-only links do not', () => {
  const a=page('/destination/enchanted-rock',['destination'],['/county/gillespie','/explore/region/hill-country']);
  const b=page('/county/gillespie',['community'],['/destination/enchanted-rock']);
  const c=page('/explore/region/hill-country',['explore'],[]);
  const output=enrichAuthorityLinkGraph([a,b,c]);
  assert.equal(a.authority.inboundContextualPages,1);
  assert.equal(a.authority.outboundSitemapPageLinks,2);
  assert.equal(a.authority.reciprocalContextualPages,1);
  assert.equal(b.authority.reciprocalContextualPages,1);
  assert.equal(c.authority.inboundContextualPages,1);
  assert.equal(output.totals.noInbound,0);
  assert.equal(output.totals.pagesWithUnsitemappedLinks,0);
});

test('orphan and off-sitemap links are review signals, not invented publication defects', () => {
  const x=page('/article/researched-river','article',['/article/researched-river','/destination/does-not-exist','https://outside.example.com/route']);
  const y=page('/fishing/lakes/travis','fishing',[]);
  const out=enrichAuthorityLinkGraph([x,y]);
  assert.equal(out.totals.noInbound,2);
  assert.equal(x.authority.inboundContextualPages,0);
  assert.deepEqual(x.authority.outgoingNotInSitemapPaths,['/destination/does-not-exist']);
  assert.ok(x.authority.linkGraphFlags.includes('no-main-content-inbound-anchor-from-sitemap-pages'));
  assert.equal(x.authority.editorialCertification,'not-determined-by-automated-crawl');
});

test('a single contextual source page counts once even when the anchor repeats', () => {
  const a=page('/article/fishing',['article'],['/fishing/lakes/conroe','/fishing/lakes/conroe']);
  const b=page('/fishing/lakes/conroe',['fishing'],['/article/fishing#section']);
  enrichAuthorityLinkGraph([a,b]);
  assert.equal(b.authority.inboundContextualPages,1);
  assert.equal(a.authority.reciprocalContextualPages,1);
});
