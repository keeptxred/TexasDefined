import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server = await createServer({ configFile: false, appType: 'custom', logLevel: 'error', server: { middlewareMode: true } });
try {
  const { loadTicketmasterEventsServer, ticketmasterAuthorityGuidePath } = await server.ssrLoadModule('/src/data/events/ticketmaster-events.server.ts');
  const { mergeEventTicketing } = await server.ssrLoadModule('/src/data/events/ticketing.ts');
  const { hasCompliantMajorEventImageServer } = await server.ssrLoadModule('/src/data/major-event-schema-enrichment.server.ts');
  const { buildTexasEventCarouselItemsServer, buildGlobalEventCalendarServer } = await server.ssrLoadModule('/src/data/events/texas-event-calendar.server.ts');
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
  assert.equal(ticketmasterAuthorityGuidePath('Fiesta De Palmas - Presented By The City Of Mcallen', 'McAllen'), '/event/fiesta-de-palmas');
  assert.equal(ticketmasterAuthorityGuidePath('South Pole Illuminated Festival 2026 - McAllen Convention Center', 'McAllen'), '/event/south-pole-illuminated-festival');
  assert.equal(ticketmasterAuthorityGuidePath('Bands Of America: San Antonio Super Regional Championship Prelims', 'San Antonio'), '/event/bands-of-america-san-antonio-super-regional');
  assert.equal(ticketmasterAuthorityGuidePath('El Paso Film Festival - Late Night Shorts', 'El Paso'), '/event/el-paso-film-festival');
  assert.equal(ticketmasterAuthorityGuidePath('Way Out West Festival Featuring Cole Swindell', 'El Paso'), '/event/way-out-west-festival-el-paso');
  assert.equal(ticketmasterAuthorityGuidePath('State Fair Classic', 'Dallas'), '/event/state-fair-classic');
  assert.equal(ticketmasterAuthorityGuidePath('Beaumont Comic Con', 'Beaumont'), '/event/beaumont-comic-con');
  assert.equal(ticketmasterAuthorityGuidePath('Eagle Fest Featuring ZZ Top', 'The Woodlands'), '/event/eagle-fest-the-woodlands');
  assert.equal(ticketmasterAuthorityGuidePath('Austin City Limits Festival', 'Austin'), '/event/austin-city-limits-music-festival');
  assert.equal(ticketmasterAuthorityGuidePath('Austin Food + Wine Festival', 'Austin'), '/event/austin-food-wine-festival');
  assert.equal(ticketmasterAuthorityGuidePath('Red Steagall Cowboy Gathering', 'Fort Worth'), '/event/red-steagall-cowboy-gathering');
  assert.equal(ticketmasterAuthorityGuidePath('Nutcracker Market General Admission: Good for ONE Entry', 'Houston'), '/event/houston-ballet-nutcracker-market');
  assert.equal(ticketmasterAuthorityGuidePath('San Antonio Stock Show & Rodeo Haunted Hayrides', 'San Antonio'), '/event/san-antonio-stock-show-rodeo');
  assert.equal(ticketmasterAuthorityGuidePath('Beer Around The World 2026 - Fiesta De Palmas McAllen TX', 'McAllen'), '/event/fiesta-de-palmas');
  assert.equal(ticketmasterAuthorityGuidePath('Bill Pickett Invitational Rodeo', 'Fort Worth'), '/event/bill-pickett-rodeo-fort-worth');
  assert.equal(ticketmasterAuthorityGuidePath('Hollydays Market Corpus Christi Fri. 11-6 through Sun. 11-8, 2026', 'Corpus Christi'), '/event/hollydays-market-corpus-christi');
  assert.equal(ticketmasterAuthorityGuidePath('Example concert', 'San Antonio'), undefined);
  for (const slug of [
    'fiesta-de-palmas',
    'south-pole-illuminated-festival',
    'bands-of-america-san-antonio-super-regional',
    'big-12-football-championship',
    'el-paso-film-festival',
    'way-out-west-festival-el-paso',
    'state-fair-classic',
    'beaumont-comic-con',
    'eagle-fest-the-woodlands',
    'bill-pickett-rodeo-fort-worth',
    'hollydays-market-corpus-christi',
  ]) assert.equal(hasCompliantMajorEventImageServer(slug), true, `${slug} must remain indexable with rights-cleared hero provenance`);
  assert.equal(hasCompliantMajorEventImageServer('mcallen-holiday-parade'), false, 'Holiday parade must remain fail-closed until an exact-location or governed AI hero is approved');

  const editorialTicketing = {
    links: [{
      provider: 'official',
      officialTicketUrl: 'https://example.org/tickets',
      saleStatus: 'unknown',
      source: { kind: 'official-event', name: 'Official organizer', url: 'https://example.org/tickets' },
      lastVerifiedAt: now.toISOString(),
    }],
    offers: [],
  };
  const mergedTicketing = mergeEventTicketing(editorialTicketing, records[0].ticketing);
  assert.equal(mergedTicketing.links.length, 2);
  const mergedCta = buildTexasEventCarouselItemsServer([{ ...records[0], ticketing: mergedTicketing }])[0].ticketCta;
  assert.equal(mergedCta.isAffiliate, true);
  assert.equal(mergedCta.provider, 'ticketmaster');
  const largeCatalog = [...Array.from({ length: 300 }, (_, index) => ({ ...records[0], id: `other-${index}`, city: 'Austin' })), ...records];
  const view = buildGlobalEventCalendarServer(largeCatalog, { featured: '', location: 'city:San Antonio', start: '', end: '', category: '', venue: '' });
  assert.equal(view.results.length, 1);
  assert.equal(view.results[0].id, records[0].id);
  const all = buildGlobalEventCalendarServer(largeCatalog, { featured: '', location: '', start: '', end: '', category: '', venue: '' });
  assert.equal(all.results.length, 48);
  assert.equal(all.totalCount, 301);
  assert.deepEqual(loadTicketmasterEventsServer(catalog, new Date(now.getTime() + 49 * 3600000)), []);
  assert.deepEqual(loadTicketmasterEventsServer({ ...catalog, events: [{ ...event, status: 'cancelled' }] }, now), []);
  assert.deepEqual(loadTicketmasterEventsServer({ ...catalog, events: [{ ...event, city: 'Unknown city' }] }, now), []);
  const offsale = loadTicketmasterEventsServer({ ...catalog, events: [{ ...event, status: 'offsale' }] }, now);
  assert.equal(buildTexasEventCarouselItemsServer(offsale)[0].ticketCta, null);
  console.log('PASS: Ticketmaster records use shared venue/calendar CTA, disclosure, and stale inventory safeguards.');
} finally { await server.close(); }
