import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseSupplementalPaths, isLiteralRouteLeak, classifySupplementalResponse } from './gsc-crawlstats-404-extra-policy.mjs';

test('supplemental source is exactly 42 unique new paths; never repeats protected 99', () => {
  const extra = readFileSync('ops/seo/gsc-crawlstats-404-extra-2026-10-31-paths.txt', 'utf8');
  const original = readFileSync('ops/seo/gsc-404-2026-11-13-paths.txt', 'utf8');
  const paths = parseSupplementalPaths(extra, original);
  assert.equal(paths.length, 42);
  assert.ok(paths.includes('/shop/product/6a6ec7148aec8d3bec05f72d'));
  assert.ok(paths.includes('/explore/painted-churches_/guides_/undefined'));
  assert.ok(!paths.includes('/city/del-rio'));
  assert.throws(() => parseSupplementalPaths(extra.replace('/apple-app-site-association', '/city/del-rio'), original), /Do not repeat/);
});
test('literal serialized route tokens stay missing; never become fake content', () => {
  for (const p of ['/explore/painted-churches_/guides_/undefined', '/explore/$slug', '/explore/%2524slug']) {
    assert.equal(isLiteralRouteLeak(p), true);
    assert.deepEqual(classifySupplementalResponse({ path:p, firstStatus:404, finalStatus:404 }), {review:'correct-invalid-route-404', blocking:false});
    assert.equal(classifySupplementalResponse({ path:p, firstStatus:307, finalStatus:200, finalUrl:'https://texasdefined.com/', canonical:'https://texasdefined.com/' }).blocking, true);
  }
});
test('historical missing non-template page requires judgment; never blanket restore', () => {
  assert.deepEqual(classifySupplementalResponse({path:'/destination/davis-hill-state-park',firstStatus:404,finalStatus:404}), {review:'currently-missing-editorial-review',blocking:false});
  assert.equal(classifySupplementalResponse({path:'/destination/valid-old',firstStatus:301,finalStatus:404}).review, 'redirect-to-missing');
  assert.equal(classifySupplementalResponse({path:'/destination/valid-old',firstStatus:301,finalStatus:404}).blocking, true);
});
test('working redirect must land on exact self-canonical authority, never homepage', () => {
  const good = {path:'/destination/port-isabel-lighthouse-state-park',firstStatus:301,finalStatus:200,finalUrl:'https://texasdefined.com/destination/port-isabel-lighthouse',canonical:'https://texasdefined.com/destination/port-isabel-lighthouse'};
  assert.deepEqual(classifySupplementalResponse(good), {review:'valid-canonical-redirect',blocking:false});
  assert.equal(classifySupplementalResponse({...good,canonical:'https://texasdefined.com/'}).blocking, true);
  assert.equal(classifySupplementalResponse({...good,finalUrl:'https://texasdefined.com/',canonical:'https://texasdefined.com/'}).blocking, true);
  assert.deepEqual(classifySupplementalResponse({...good,robots:'googlebot: noindex'}),{review:'google-indexability-review',blocking:false});
});
test('unexpected 5xx or transport failure remains blocking',()=>{
  assert.equal(classifySupplementalResponse({path:'/state-park/garner-state-park',firstStatus:503,finalStatus:503}).blocking,true);
  assert.equal(classifySupplementalResponse({path:'/state-park/garner-state-park',error:'Timeout'}).blocking,true);
});
