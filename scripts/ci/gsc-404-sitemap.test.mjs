import assert from 'node:assert/strict';
import { test } from 'node:test';
import { GSC_SITEMAP_SEEDS, parseGscSitemapXml, identifyGscSitemapLeaks } from './gsc-404-sitemap.mjs';

test('sitemap URL set detects encoded and doubly encoded raw router tokens', () => {
  const xml = '<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    '<url><loc>https://texasdefined.com/explore/casinos/%24slug</loc></url>' +
    '<url><loc>https://www.texasdefined.com/events/%2524collection</loc></url>' +
    '<url><loc>https://other.test/poison</loc></url>' +
    '<url><loc>http://texasdefined.com/insecure</loc></url></urlset>';
  const parsed = parseGscSitemapXml(xml);
  assert.equal(parsed.kind, 'urlset');
  assert.deepEqual(parsed.paths, ['/explore/casinos/$slug', '/events/$collection']);
  assert.deepEqual(parsed.children, []);
});

test('sitemap indexes give bounded canonical same-host child XML paths', () => {
  const xml = '<sitemapindex><sitemap><loc>https://texasdefined.com/sitemap-explore.xml</loc></sitemap>' +
    '<sitemap><loc>https://texasdefined.com/sitemap-explore.xml</loc></sitemap>' +
    '<sitemap><loc>https://unrelated.test/bad.xml</loc></sitemap></sitemapindex>';
  const parsed = parseGscSitemapXml(xml);
  assert.deepEqual(parsed.children, ['/sitemap-explore.xml']);
  assert.deepEqual(parsed.paths, []);
  assert.deepEqual(GSC_SITEMAP_SEEDS, ['/sitemap.xml', '/sitemap-explore.xml']);
});

test('partial response, challenge HTML and ambiguous XML are never treated as complete evidence', () => {
  assert.throws(() => parseGscSitemapXml('<!DOCTYPE html><title>Challenge</title>'));
  assert.throws(() => parseGscSitemapXml('<urlset></urlset><sitemapindex/>'));
});

test('forbidden 404 and redirect source leaks are distinct from canonical published URLs', () => {
  const result = identifyGscSitemapLeaks(
    ['/shop/wildflower-house', '/article/texas-road-trip-rules', '/event/state-fair-of-texas'],
    ['/shop/wildflower-house', '/destination/chinati-mountains-state-natural-area'],
    ['/event/state-fair-of-texas', '/news/juan-seguin-tejano-texas-revolution'],
  );
  assert.deepEqual(result.forbiddenListed, ['/shop/wildflower-house']);
  assert.deepEqual(result.redirectSourceListed, ['/event/state-fair-of-texas']);
  assert.deepEqual(identifyGscSitemapLeaks([], [], []), { forbiddenListed: [], redirectSourceListed: [] });
});
