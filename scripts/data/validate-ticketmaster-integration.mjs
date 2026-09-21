import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server = await createServer({ configFile: false, appType: 'custom', logLevel: 'error', server: { middlewareMode: true } });
try {
  const { loadTicketmasterEventsServer } = await server.ssrLoadModule('/src/data/events/ticketmaster-events.server.ts');
  const { buildTexasEventCarouselItemsServer } = await server.ssrLoadModule('/src/data/events/texas-event-calendar.server.ts');
  const now = new Date();
  const date = now.toISOString().slice(0, 10);
  const event = { id: 'fixture', name: 'Example event', startDate: date, city: 'San Antonio', venue: 'Frost Bank Center', officialUrl: 'https://www.ticketmaster.com/event/ABC123', affiliateUrl: 'https://ticketmaster.evyy.net/c/7758914/264167/4272?u=https%3A%2F%2Fwww.ticketmaster.com%2Fevent%2FABC123', status: 'onsale', segment: 'Sports', genre: '' };
  const catalog = { fetchedAt: now.toISOString(), events: [event] };
  const records = loadTicketmasterEventsServer(catalog, now);
  assert.equal(records.length, 1);
  assert.equal(records[0].venueId, 'sports-venue:frost-bank-center');
  const cta = buildTexasEventCarouselItemsServer(records)[0].ticketCta;
  assert.equal(cta.isAffiliate, true);
  assert.equal(cta.label, 'Find Tickets →');
  assert.ok(cta.rel.includes('sponsored'));
  assert.ok(cta.disclosure);
  assert.deepEqual(loadTicketmasterEventsServer(catalog, new Date(now.getTime() + 49 * 3600000)), []);
  assert.deepEqual(loadTicketmasterEventsServer({ ...catalog, events: [{ ...event, status: 'cancelled' }] }, now), []);
  assert.deepEqual(loadTicketmasterEventsServer({ ...catalog, events: [{ ...event, city: 'Unknown city' }] }, now), []);
  const offsale = loadTicketmasterEventsServer({ ...catalog, events: [{ ...event, status: 'offsale' }] }, now);
  assert.equal(buildTexasEventCarouselItemsServer(offsale)[0].ticketCta, null);
  console.log('PASS: Ticketmaster records use shared venue/calendar CTA, disclosure, and stale inventory safeguards.');
} finally { await server.close(); }
