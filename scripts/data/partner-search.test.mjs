import assert from 'node:assert/strict';
import test from 'node:test';
import { parsePartnerSearch } from '../../src/lib/partner-search.ts';

const canonical = 'https://texasdefined.com/partner-with-us';

test('sports venue links retain their form defaults but do not create extra query keys', () => {
  const raw = Object.fromEntries(new URL(canonical + '?type=sports-travel&source=%2Fsports-venues').searchParams);
  const result = parsePartnerSearch(raw);
  assert.equal(result.type, 'sports-travel');
  assert.equal(result.source, '/sports-venues');
  assert.equal(Object.hasOwn(result, 'partnershipType'), false);
  assert.equal(Object.hasOwn(result, 'sourcePath'), false);
  const normalized = new URLSearchParams(Object.entries(result).filter(([, value]) => value !== undefined));
  assert.equal(normalized.toString(), 'type=sports-travel&source=%2Fsports-venues');
});

test('GSC-reported duplicate query returns exactly one type and source', () => {
  const raw = Object.fromEntries(new URL(canonical + '?type=sports-travel&source=%2Fsports-venues&partnershipType=sports-travel&sourcePath=%2Fsports-venues').searchParams);
  const result = parsePartnerSearch(raw);
  assert.equal(result.type, 'sports-travel');
  assert.equal(result.source, '/sports-venues');
  assert.equal(Object.hasOwn(result, 'partnershipType'), false);
  assert.equal(Object.hasOwn(result, 'sourcePath'), false);
});

test('legacy alias-only links remain functional', () => {
  const result = parsePartnerSearch({ partnershipType: 'brand-retail', sourcePath: '/things-unique-to-texas/texas-brands', focus: 'contact' });
  assert.equal(result.type, 'brand-retail');
  assert.equal(result.source, '/things-unique-to-texas/texas-brands');
  assert.equal(result.focus, 'contact');
});

test('football sponsor package preselection context survives the query normalization', () => {
  const result = parsePartnerSearch({ type: 'sports-travel', source: '/texas-high-school-football-teams/katy', focus: 'contact', billing: 'monthly' });
  assert.equal(result.source, '/texas-high-school-football-teams/katy');
  assert.equal(result.billing, 'monthly');
  assert.equal(result.focus, 'contact');
});

test('disallowed external and path-injection sources are never retained', () => {
  for (const source of ['https://example.com', '//evil.test', '/sports-venues/../../admin', '/?redirect=external']) {
    assert.equal(parsePartnerSearch({ source }).source, '/partner-with-us');
  }
  assert.equal(parsePartnerSearch({ source: '/horse-racing' }).source, '/horse-racing');
});

test('invalid prefill values do not enter partner form state', () => {
  const result = parsePartnerSearch({ type: 'unexpected', source: 'javascript:alert(1)', tier: 'free', billing: 'weekly', focus: 'secret' });
  assert.equal(result.type, undefined);
  assert.equal(result.source, '/partner-with-us');
  assert.equal(result.tier, undefined);
  assert.equal(result.billing, undefined);
  assert.equal(result.focus, undefined);
});
