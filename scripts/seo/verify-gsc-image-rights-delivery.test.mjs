import assert from 'node:assert/strict';
import { test } from 'node:test';
import { imageRightsReviewPaths, assertPublishedImageRights } from './verify-gsc-image-rights-delivery.mjs';

const path = '/article/blue-bell-ice-cream-brenham-texas-history';
const canonical = 'https://texasdefined.com' + path;
const source = 'https://commons.wikimedia.org/wiki/File:Modern_Blue_Bell_Creameries_factory_located_in_Brenham,_Texas.jpg';
const image = {
  '@type': 'ImageObject', '@id': canonical + '#primaryimage',
  url: canonical + '/image.jpg', contentUrl: canonical + '/image.jpg',
  creator: { '@type': 'Person', name: 'Larry D. Moore' },
  creditText: 'Photo: Larry D. Moore · CC BY 4.0',
  copyrightNotice: '© 2008 Larry D. Moore',
  license: 'https://creativecommons.org/licenses/by/4.0/',
  acquireLicensePage: source,
};
function sample(node = image, meta = '') {
  return '<html><head><link rel="canonical" href="' + canonical + '">' + meta +
    '<script type="application/ld+json">' + JSON.stringify({ '@context': 'https://schema.org', '@graph': [node] }) +
    '</script></head><body><p>Photo: Larry D. Moore. This is the Blue Bell factory photo with a Commons credit.</p>' +
    '<p>' + 'Additional page context '.repeat(35) + '</p></body></html>';
}
test('read-only review is restricted to fourteen exact source-governed canonical page owners', () => {
  const pages = imageRightsReviewPaths();
  assert.equal(pages.length, 14);
  assert.equal(new Set(pages).size, 14);
  assert.ok(pages.includes(path));
  assert.ok(pages.includes('/destination/big-bend-ranch-state-park'));
  assert.ok(pages.includes('/article/texas-before-united-states-how-texas-began'));
});
test('real HTML parser accepts the correct source-locked rights and one canonical', () => {
  assert.doesNotThrow(() => assertPublishedImageRights(sample(), path));
});
test('fail closed on a replaced photo, wrong creator, missing copyright and stale license', () => {
  for (const edit of [
    { ...image, creator: { '@type': 'Person', name: 'Texas Defined' } },
    { ...image, copyrightNotice: undefined },
    { ...image, license: 'https://example.com/unverified' },
    { ...image, acquireLicensePage: 'https://example.com/unverified' },
  ]) assert.throws(() => assertPublishedImageRights(sample(edit), path), /ImageObject/);
});
test('fail closed on missing canonical, different canonical or Google-only noindex', () => {
  assert.throws(() => assertPublishedImageRights(sample().replace('rel="canonical"', 'rel="alternate"'), path), /canonical/);
  assert.throws(() => assertPublishedImageRights(sample().replace('href="' + canonical + '"', 'href="https://texasdefined.com/"'), path), /canonical/);
  assert.throws(() => assertPublishedImageRights(sample(image, '<meta name="googlebot" content="noindex">'), path), /noindex/);
  assert.throws(() => assertPublishedImageRights(sample(), path, 'googlebot: noindex'), /noindex/);
});
