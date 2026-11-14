import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
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
  assert.equal(GSC_SITEMAP_SEEDS.length, 6);
  assert.ok(GSC_SITEMAP_SEEDS.includes('/sitemap-index.xml'));
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

test('all publicly advertised XML sitemaps and children of the canonical index are audited', () => {
  const robots = readFileSync('public/robots.txt', 'utf8');
  const xml = readFileSync('public/sitemap-index.xml', 'utf8');
  const parsedIndex = parseGscSitemapXml(xml);
  assert.equal(parsedIndex.kind, 'index');
  const indexed = parsedIndex.children.slice().sort();
  const checked = GSC_SITEMAP_SEEDS.filter((path) => path !== '/sitemap-index.xml').sort();
  assert.deepEqual(checked, indexed, 'Static sitemap index must match the bounded GSC XML audit inputs');
  for (const path of GSC_SITEMAP_SEEDS) {
    assert.ok(robots.includes('Sitemap: https://texasdefined.com' + path),
      'A publicly advertised XML sitemap is absent from robots.txt: ' + path);
  }
  const robotsXml = [...robots.matchAll(/^Sitemap: https:\/\/texasdefined\.com(\/sitemap[^\s]+\.xml)$/gm)]
    .map((match) => match[1]).sort();
  assert.deepEqual(robotsXml, GSC_SITEMAP_SEEDS.slice().sort(),
    'All canonical XML sitemap entries in robots.txt require audit coverage');
});
