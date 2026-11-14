import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { INTENTIONAL_MISSING, expectedGscDisposition, verifyGscExpectedResponse } from './gsc-404-dispositions.mjs';

const paths=readFileSync('ops/seo/gsc-404-2026-11-13-paths.txt','utf8')
  .split(/\r?\n/).filter(v=>v.startsWith('/')).map(v=>v.trim());
const fake=(path, status, options={})=>({
  path,
  firstStatus:status,
  finalStatus:options.finalStatus??status,
  redirectCount:options.redirectCount??0,
  finalUrl:options.finalUrl??'https://texasdefined.com'+path,
  canonical:options.canonical??'https://texasdefined.com'+path,
  outcome:'test',
  error:options.error??null,
});

test('exact 99 historical URLs have one deliberate decision; 16 invalid router templates, 13 researched intentional absences',()=>{
  assert.equal(paths.length,99);
  assert.equal(new Set(paths).size,99);
  assert.equal(Object.keys(INTENTIONAL_MISSING).length,13);
  for(const path of Object.keys(INTENTIONAL_MISSING)){
    assert.ok(paths.includes(path),'no undeclared historic missing path: '+path);
    assert.ok(INTENTIONAL_MISSING[path].length>=45,'reason must be substantive: '+path);
  }
  const values=paths.map(expectedGscDisposition);
  assert.equal(values.filter(v=>v.category==='invalid-router-template').length,16);
  assert.equal(values.filter(v=>v.category==='deliberate-unpublished-or-closed').length,13);
  assert.equal(values.filter(v=>v.expected==='recover-to-200').length,70);
  assert.equal(values.filter(v=>v.expected==='direct-missing').length,29);
});

test('invalid template returned 404 is correct; historical 307-to-encoded-dollar-slug fails',()=>{
  for(const path of paths.filter(p=>p.includes('$'))){
    assert.equal(verifyGscExpectedResponse(fake(path,404)).pass,true,path);
    const chain=verifyGscExpectedResponse(fake(path,307,{finalStatus:404,
      finalUrl:'https://texasdefined.com'+path.replace('$','%24'),redirectCount:1}));
    assert.equal(chain.code,'MISSING_ROUTE_NOT_DIRECT');
    assert.equal(chain.pass,false);
  }
});

test('no fake football, unapproved staged icon, dormant shop, composite county or closed park page',()=>{
  for(const path of Object.keys(INTENTIONAL_MISSING)){
    assert.equal(verifyGscExpectedResponse(fake(path,404)).pass,true,path);
    assert.equal(verifyGscExpectedResponse(fake(path,200)).pass,false,path);
    assert.equal(verifyGscExpectedResponse(fake(path,301,{finalStatus:404,redirectCount:1})).pass,false,path);
  }
});

test('valuable content must return real HTTP200 and final self-canonical, not just a redirect chain',()=>{
  const path='/article/texas-road-trip-rules';
  assert.equal(expectedGscDisposition(path).expected,'recover-to-200');
  assert.equal(verifyGscExpectedResponse(fake(path,200)).pass,true);
  assert.equal(verifyGscExpectedResponse(fake(path,404)).code,'RECOVERY_NOT_HTTP_200');
  assert.equal(verifyGscExpectedResponse(fake(path,301,{
    finalStatus:200,redirectCount:1,finalUrl:'https://texasdefined.com/article/texas-road-trip-rules',
  })).pass,true);
  assert.equal(verifyGscExpectedResponse(fake(path,307,{
    finalStatus:200,redirectCount:1,
  })).code,'TEMPORARY_LEGACY_REDIRECT');
  assert.equal(verifyGscExpectedResponse(fake(path,200,{
    canonical:'https://texasdefined.com/article/other-guide',
  })).code,'CANONICAL_NOT_SELF');
});

test('canonical URL must be HTTPS same host and path, and not include a tracking query',()=>{
  const path='/destination/fort-leaton-state-historic-site';
  for(const canonical of [
    'http://texasdefined.com'+path,
    'https://other-example.com'+path,
    'https://texasdefined.com'+path+'?utm_campaign=foo',
    'https://texasdefined.com/county/val-verde',
  ]) assert.equal(verifyGscExpectedResponse(fake(path,200,{canonical})).pass,false,canonical);
});

test('transport, HTTP500 and missing canonical are not healthy and cannot be relabeled a GSC indexing problem',()=>{
  const path='/city/del-rio';
  for(const item of [
    fake(path,null,{error:'fetch failed'}),
    fake(path,500,{finalStatus:500}),
    fake(path,200,{canonical:''}),
  ]) assert.equal(verifyGscExpectedResponse(item).pass,false);
});
