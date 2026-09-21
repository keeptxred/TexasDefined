import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchTexasEvents, normalizeDiscoveryEvent, officialTicketmasterUrl } from './ticketmaster-discovery.mjs';

const base = 'https://ticketmaster.evyy.net/c/7758914/264167/4272?subId1=texasdefined&partnerpropertyid=8837726&MediaPartnerPropertyId=8837726';
const event = { id: 'example', name: 'Example concert', url: 'https://www.ticketmaster.com/example/event/ABC123?tracking=old', dates: { start: { localDate: '2026-10-14' }, status: { code: 'onsale' } }, _embedded: { venues: [{ name: 'Example venue', city: { name: 'Austin' }, state: { stateCode: 'TX' }, country: { countryCode: 'US' } }] } };

test('only verified US Ticketmaster event destinations are wrapped with the approved publisher', () => {
  const row = normalizeDiscoveryEvent(event, base);
  const link = new URL(row.affiliateUrl);
  assert.equal(link.pathname, '/c/7758914/264167/4272');
  assert.equal(link.searchParams.get('u'), 'https://www.ticketmaster.com/example/event/ABC123');
  for (const url of ['https://ticketmaster.com.evil.test/event/ABC', 'http://www.ticketmaster.com/event/ABC', 'https://user@www.ticketmaster.com/event/ABC', 'https://www.ticketmaster.com/browse', 'javascript:alert(1)']) assert.equal(officialTicketmasterUrl(url), null);
  assert.equal(normalizeDiscoveryEvent({ ...event, test: true }, base), null);
  assert.equal(normalizeDiscoveryEvent({ ...event, dates: { start: { dateTBD: true } } }, base), null);
  assert.equal(normalizeDiscoveryEvent({ ...event, _embedded: { venues: [] } }, base), null);
});

test('refresh paginates, deduplicates, restricts geography and never emits credentials', async () => {
  let requests = 0;
  const result = await fetchTexasEvents({ apiKey: 'private-test-key', trackingBase: base, now: new Date('2026-09-21T00:00:00Z'), pause: async () => {}, fetchImpl: async url => {
    requests++;
    assert.equal(url.searchParams.get('stateCode'), 'TX');
    assert.equal(url.searchParams.get('countryCode'), 'US');
    assert.equal(url.searchParams.get('source'), 'ticketmaster');
    return { ok: true, json: async () => ({ page: { totalPages: 2, totalElements: 201 }, _embedded: { events: [event] } }) };
  } });
  assert.equal(requests, 26);
  assert.equal(result.events.length, 1);
  assert.ok(!JSON.stringify(result).includes('private-test-key'));
});

test('API failure fails closed without leaking request secrets', async () => {
  await assert.rejects(fetchTexasEvents({ apiKey: 'private-test-key', trackingBase: base, pause: async () => {}, fetchImpl: async () => { throw new Error('private-test-key'); } }), error => !error.message.includes('private-test-key') && /preserved/.test(error.message));
  await assert.rejects(fetchTexasEvents({ apiKey: '', trackingBase: base }), /required/);
});
