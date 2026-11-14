import assert from 'node:assert/strict';
import { test } from 'node:test';
import { certifiedNewsArticleSchema } from './texasdefined-published-article-proof.mjs';
const url='https://texasdefined.com/news/verified-texas-museum-exhibit';
const source='https://museum.example.org/news/new-exhibit?origin=1&campaign=2';
const article = {
  '@type':'NewsArticle', '@id': url+'#article', url,
  mainEntityOfPage: {'@type':'WebPage','@id':url},
  citation: source, headline:'A verified Texas museum exhibit will open this weekend',
  description:'Original independently researched museum visitor report.',
  datePublished:'2026-11-11T13:00:00-06:00',
  image:{ url:'https://example.org/image.png',width:1200,height:800,
    caption:'Illustration of a stylized museum facade',
    creditText:'AI-generated editorial illustration · Not a documentary photograph · Cloudflare Workers AI'},
  author:{'@type':'Organization',url:'https://texasdefined.com/authors/a-dell'},
  publisher:{'@id':'https://texasdefined.com/#organization'}
};
const html = value => '<html><script type="application/ld+json">'+JSON.stringify({'@graph':[value]})+'</script></html>';
test('accepts a fully attributed exact-source NewsArticle graph', () => {
  assert.ok(certifiedNewsArticleSchema(html(article),url,source));
});
test('unrelated copied schema, wrong source, or missing image provenance are never accepted', () => {
  assert.equal(certifiedNewsArticleSchema('This page says NewsArticle',url,source),null);
  assert.equal(certifiedNewsArticleSchema(html({...article,citation:'https://another.example.org'}),url,source),null);
  assert.equal(certifiedNewsArticleSchema(html({...article,image:{...article.image, creditText:'Press photo'}}),url,source),null);
  assert.equal(certifiedNewsArticleSchema(html({...article,url:'https://texasdefined.com/news/other'}),url,source),null);
});
test('malformed JSON-LD and non-author byline are rejected', () => {
  assert.equal(certifiedNewsArticleSchema('<script type="application/ld+json">{</script>',url,source),null);
  assert.equal(certifiedNewsArticleSchema(html({...article,author:{url:'https://not-texasdefined.example/'}}),url,source),null);
});
