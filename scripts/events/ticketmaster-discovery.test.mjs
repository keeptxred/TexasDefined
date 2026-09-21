import test from 'node:test';
import assert from 'node:assert/strict';
import {
  fetchTexasEvents,
  normalizeDiscoveryEvent,
  officialTicketmasterUrl,
  ticketmasterEventRejectionReason,
  ticketmasterUrlRejectionReason,
} from './ticketmaster-discovery.mjs';

const base = 'https://ticketmaster.evyy.net/c/7758914/264167/4272?subId1=texasdefined&partnerpropertyid=8837726&MediaPartnerPropertyId=8837726';
const event = {
  id: 'example',
  name: 'Example concert',
  url: 'https://www.ticketmaster.com/example/event/ABC123?tracking=old',
  dates: { start: { localDate: '2026-10-14' }, status: { code: 'onsale' } },
  _embedded: {
    venues: [{
      name: 'Example venue',
      city: { name: 'Austin' },
      state: { stateCode: 'TX' },
      country: { countryCode: 'US' },
    }],
  },
};

test('only verified US Ticketmaster event destinations are wrapped with the approved publisher', () => {
  const row = normalizeDiscoveryEvent(event, base);
  const link = new URL(row.affiliateUrl);
  assert.equal(link.pathname, '/c/7758914/264167/4272');
  assert.equal(link.searchParams.get('u'), 'https://www.ticketmaster.com/example/event/ABC123');

  assert.equal(
    officialTicketmasterUrl('https://www.ticketmaster.com/example/event/G5diZfkn0B-bh/?foo=bar#seatmap'),
    'https://www.ticketmaster.com/example/event/G5diZfkn0B-bh',
  );

  assert.equal(
    officialTicketmasterUrl('http://ticketmaster.com/example/event/ABC123?foo=bar'),
    'https://ticketmaster.com/example/event/ABC123',
  );

  const affiliateApiUrl = `${base}&u=${encodeURIComponent('https://www.ticketmaster.com/example/event/ABC123?utm_source=api')}`;
  assert.equal(ticketmasterUrlRejectionReason(affiliateApiUrl), null);
  assert.equal(
    officialTicketmasterUrl(affiliateApiUrl),
    'https://www.ticketmaster.com/example/event/ABC123',
  );
  const affiliateRow = normalizeDiscoveryEvent({ ...event, url: affiliateApiUrl }, base);
  const rebuilt = new URL(affiliateRow.affiliateUrl);
  assert.equal(rebuilt.pathname, '/c/7758914/264167/4272');
  assert.equal(rebuilt.searchParams.get('u'), 'https://www.ticketmaster.com/example/event/ABC123');
  assert.equal(rebuilt.searchParams.get('subId1'), 'texasdefined');

  const ticketWebDestination = 'https://www.ticketweb.com/event/la-flor-escondida-hard-rock-cafe-tickets/14859023';
  const ticketWebApiUrl = `${base}&u=${encodeURIComponent(ticketWebDestination)}&utm_medium=affiliate`;
  assert.equal(ticketmasterUrlRejectionReason(ticketWebApiUrl), null);
  assert.equal(officialTicketmasterUrl(ticketWebApiUrl), ticketWebDestination);
  const ticketWebRow = normalizeDiscoveryEvent({ ...event, url: ticketWebApiUrl }, base);
  const rebuiltTicketWeb = new URL(ticketWebRow.affiliateUrl);
  assert.equal(rebuiltTicketWeb.pathname, '/c/7758914/264167/4272');
  assert.equal(rebuiltTicketWeb.searchParams.get('u'), ticketWebDestination);
  assert.equal(rebuiltTicketWeb.searchParams.get('subId1'), 'texasdefined');
  assert.equal(
    ticketmasterUrlRejectionReason(ticketWebDestination),
    'host-www.ticketweb.com',
  );
  assert.equal(
    ticketmasterUrlRejectionReason(
      `https://ticketmaster.evyy.net/c/7758914/264167/4272?u=${encodeURIComponent('https://www.ticketweb.com/browse/14859023')}`,
    ),
    'impact-destination-ticketweb-event-path-shape',
  );

  assert.equal(ticketmasterUrlRejectionReason('https://tickets.example.test/event/ABC'), 'host-tickets.example.test');
  assert.equal(ticketmasterUrlRejectionReason('https://www.ticketmaster.com/browse'), 'missing-event-segment');
  assert.equal(
    ticketmasterUrlRejectionReason(
      `https://ticketmaster.evyy.net/c/9999999/264167/4272?u=${encodeURIComponent('https://www.ticketmaster.com/example/event/ABC123')}`,
    ),
    'impact-path-shape',
  );
  assert.equal(
    ticketmasterUrlRejectionReason(
      `https://ticketmaster.evyy.net/c/7758914/264167/4272?u=${encodeURIComponent('https://evil.test/event/ABC123')}`,
    ),
    'impact-destination-host-evil.test',
  );
  assert.equal(
    ticketmasterUrlRejectionReason(
      `http://ticketmaster.evyy.net/c/7758914/264167/4272?u=${encodeURIComponent('https://www.ticketmaster.com/example/event/ABC123')}`,
    ),
    'impact-scheme',
  );

  for (const url of [
    'https://ticketmaster.com.evil.test/event/ABC',
    'https://user@www.ticketmaster.com/event/ABC',
    'https://www.ticketmaster.com/browse',
    'javascript:alert(1)',
  ]) assert.equal(officialTicketmasterUrl(url), null);

  assert.equal(normalizeDiscoveryEvent({ ...event, test: true }, base), null);
  assert.equal(normalizeDiscoveryEvent({ ...event, dates: { start: { dateTBD: true } } }, base), null);
  assert.equal(normalizeDiscoveryEvent({ ...event, _embedded: { venues: [] } }, base), null);
  assert.equal(
    ticketmasterEventRejectionReason({ ...event, url: 'https://tickets.example.test/event/ABC' }),
    'ticket-url-host-tickets.example.test',
  );
});

test('refresh paginates, deduplicates, restricts geography and never emits credentials', async () => {
  let requests = 0;
  const result = await fetchTexasEvents({
    apiKey: 'private-test-key',
    trackingBase: base,
    now: new Date('2026-09-21T00:00:00Z'),
    pause: async () => {},
    fetchImpl: async url => {
      requests++;
      assert.equal(url.searchParams.get('stateCode'), 'TX');
      assert.equal(url.searchParams.get('countryCode'), 'US');
      assert.equal(url.searchParams.has('source'), false);
      return {
        ok: true,
        json: async () => ({
          page: { totalPages: 2, totalElements: 201 },
          _embedded: {
            events: Array.from({ length: url.searchParams.get('page') === '0' ? 200 : 1 }, () => event),
          },
        }),
      };
    },
  });
  assert.equal(requests, 26);
  assert.equal(result.events.length, 1);
  assert.ok(!JSON.stringify(result).includes('private-test-key'));
});

test('busy windows split before deep paging and partial pages fail closed', async () => {
  let splits = 0;
  const options = {
    apiKey: 'test-key',
    trackingBase: base,
    now: new Date('2026-09-21T00:00:00Z'),
    pause: async () => {},
  };
  const result = await fetchTexasEvents({
    ...options,
    fetchImpl: async url => {
      assert.equal(url.searchParams.get('page'), '0');
      const width = Date.parse(url.searchParams.get('endDateTime')) - Date.parse(url.searchParams.get('startDateTime'));
      const busy = width > 4 * 86400000;
      if (busy) splits++;
      return {
        ok: true,
        json: async () => ({
          page: { totalPages: busy ? 6 : 1, totalElements: busy ? 1001 : 1 },
          _embedded: { events: [event] },
        }),
      };
    },
  });
  assert.ok(splits > 0);
  assert.equal(result.events.length, 1);

  await assert.rejects(
    fetchTexasEvents({
      ...options,
      fetchImpl: async () => ({
        ok: true,
        json: async () => ({
          page: { totalPages: 1, totalElements: 2 },
          _embedded: { events: [event] },
        }),
      }),
    }),
    /Incomplete/,
  );
});

test('empty or rejected API inventories fail closed with safe diagnostics', async () => {
  const options = {
    apiKey: 'test-key',
    trackingBase: base,
    now: new Date('2026-09-21T00:00:00Z'),
    pause: async () => {},
  };

  await assert.rejects(
    fetchTexasEvents({
      ...options,
      fetchImpl: async () => ({
        ok: true,
        json: async () => ({ page: { totalPages: 0, totalElements: 0 } }),
      }),
    }),
    /received 0 API events/,
  );

  const rejectedEvent = { ...event, url: 'https://tickets.example.test/event/ABC' };
  await assert.rejects(
    fetchTexasEvents({
      ...options,
      fetchImpl: async () => ({
        ok: true,
        json: async () => ({
          page: { totalPages: 1, totalElements: 1 },
          _embedded: { events: [rejectedEvent] },
        }),
      }),
    }),
    /ticket-url-host-tickets\.example\.test=13/,
  );
});

test('API failure fails closed without leaking request secrets', async () => {
  await assert.rejects(
    fetchTexasEvents({
      apiKey: 'private-test-key',
      trackingBase: base,
      pause: async () => {},
      fetchImpl: async () => {
        throw new Error('private-test-key');
      },
    }),
    error => !error.message.includes('private-test-key') && /preserved/.test(error.message),
  );
  await assert.rejects(fetchTexasEvents({ apiKey: '', trackingBase: base }), /required/);
});
